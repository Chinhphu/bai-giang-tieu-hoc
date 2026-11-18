/**
 * ==========================================================================================
 * ĐẤU TRƯỜNG TIN HỌC TIỂU HỌC - BACKEND GOOGLE APPS SCRIPT (Code.gs)
 * ==========================================================================================
 * Tự động ghi nhận điểm số từ học sinh, kiểm tra chữ ký SHA-256 chống gian lận
 * và hỗ trợ xuất bản Bảng Vàng trực tiếp qua Google Sheets CSV.
 * ==========================================================================================
 * 
 * 📖 HƯỚNG DẪN THIẾT LẬP CHI TIẾT (DÀNH CHO GIÁO VIÊN):
 * 
 * BƯỚC 1: TẠO GOOGLE SPREADSHEET
 * 1. Truy cập https://sheets.new để tạo một bảng tính mới.
 * 2. Đổi tên bảng tính thành: "DauTruong_TinHoc_DiemSo_2026_2027".
 * 
 * BƯỚC 2: TẠO 2 TAB (TRANG TÍNH)
 * 1. Tab 1: Đổi tên thành: "Raw_Scores"
 *    - Hàng 1 (Tiêu đề cột):
 *      A1: Thời Gian | B1: Họ và Tên | C1: Lớp | D1: Khối | E1: Mã Game | F1: Điểm Số | G1: Chi Tiết | H1: Chữ Ký
 * 
 * 2. Tab 2: Tạo trang tính mới và đổi tên thành: "Leaderboard"
 *    - Tại ô A1 của tab "Leaderboard", dán công thức QUERY sau để tự động lấy điểm cao nhất của mỗi em:
 *      =QUERY(Raw_Scores!A:G, "SELECT B, C, D, E, MAX(F) WHERE B IS NOT NULL AND B != 'Họ và Tên' GROUP BY B, C, D, E ORDER BY MAX(F) DESC LABEL B 'Họ và Tên', C 'Lớp', D 'Khối', E 'Mã Game', MAX(F) 'Điểm Số'")
 * 
 * BƯỚC 3: XUẤT BẢN TAB LEADERBOARD RA ĐỊNH DẠNG CSV
 * 1. Trên Google Sheets, chọn menu: Tệp (File) -> Chia sẻ (Share) -> Xuất bản lên web (Publish to web).
 * 2. Tại mục "Liên kết" (Link):
 *    - Chọn tab "Leaderboard" (thay vì "Toàn bộ tài liệu").
 *    - Chọn định dạng "Giá trị phân tách bằng dấu phẩy (.csv)" (thay vì "Trang web").
 * 3. Nhấp "Xuất bản" (Publish) và xác nhận.
 * 4. Sao chép liên kết được tạo và dán vào biến `CSV_LEADERBOARD_URL` trong file `arena/shared/config.js`.
 * 
 * BƯỚC 4: TRIỂN KHAI APPS SCRIPT LÀM WEB APP NHẬN ĐIỂM
 * 1. Trên Google Sheets, chọn menu: Tiện ích mở rộng (Extensions) -> Apps Script.
 * 2. Xóa toàn bộ mã mặc định và dán toàn bộ nội dung file `Code.gs` này vào.
 * 3. Nhấp vào nút "Triển khai" (Deploy) ở góc trên bên phải -> chọn "Triển khai mới" (New deployment).
 * 4. Nhấp vào biểu tượng bánh răng bên cạnh "Chọn loại" -> chọn "Ứng dụng web" (Web app).
 * 5. Cấu hình triển khai:
 *    - Mô tả: "Arena Score Receiver v1"
 *    - Thực thi dưới tên (Execute as): "Tôi (email_cua_ban@gmail.com)" (BẮT BUỘC)
 *    - Ai có quyền truy cập (Who has access): "Bất kỳ ai" (Anyone) (BẮT BUỘC để học sinh không cần đăng nhập Google vẫn nộp được điểm)
 * 6. Nhấp "Triển khai" -> Chọn "Ủy quyền truy cập" (Authorize access) và chấp thuận tài khoản Google của bạn.
 * 7. Sao chép URL ứng dụng web (có đuôi `/exec`) và dán vào biến `GAS_ENDPOINT` trong file `arena/shared/config.js`.
 * 
 * ==========================================================================================
 */

// KHÓA BÍ MẬT BẮT BUỘC PHẢI KHỚP 100% VỚI SECRET_SALT TRONG arena/shared/config.js
var SECRET_SALT = 'TieuHoc_Arena_SecretSalt_2026_2027_SafeHashKey!@#';
var RAW_SHEET_NAME = 'Raw_Scores';

/**
 * Xử lý yêu cầu POST gửi điểm từ minigame học sinh
 */
function doPost(e) {
  // 1. Khóa ScriptLock để chống xung đột race-condition khi 40 máy trong phòng nộp điểm cùng lúc
  var lock = LockService.getScriptLock();
  var hasLock = lock.tryLock(30000); // Đợi tối đa 30 giây

  if (!hasLock) {
    return createJsonResponse({
      status: 'error',
      message: 'Hệ thống đang bận ghi nhận điểm, vui lòng thử lại sau vài giây!'
    });
  }

  try {
    // 2. Kiểm tra dữ liệu đầu vào
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({
        status: 'error',
        message: 'Dữ liệu gửi lên trống (No payload)!'
      });
    }

    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return createJsonResponse({
        status: 'error',
        message: 'Dữ liệu không đúng định dạng JSON hợp lệ: ' + parseErr.toString()
      });
    }

    var ten = String(data.ten || '').trim();
    var lop = String(data.lop || '').trim();
    var khoi = Number(data.khoi) || 0;
    var gameId = String(data.gameId || '').trim();
    var score = Number(data.score) || 0;
    var signature = String(data.signature || '').trim().toLowerCase();
    var meta = data.meta || {};

    if (!ten || !lop || !gameId) {
      return createJsonResponse({
        status: 'error',
        message: 'Thiếu thông tin bắt buộc (Họ tên, Lớp hoặc Mã trò chơi)!'
      });
    }

    // 3. Kiểm tra tính hợp lệ của chữ ký SHA-256 (ten + lop + gameId + score + SECRET_SALT)
    var signString = "" + ten + lop + gameId + score + SECRET_SALT;
    var expectedSignature = computeSha256(signString).toLowerCase();

    if (signature !== expectedSignature) {
      return createJsonResponse({
        status: 'error',
        message: 'Chữ ký bảo mật không khớp! Yêu cầu nộp điểm bị từ chối.'
      });
    }

    // 4. Mở hoặc khởi tạo trang tính Raw_Scores
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(RAW_SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(RAW_SHEET_NAME);
      sheet.appendRow([
        'Thời Gian',
        'Họ và Tên',
        'Lớp',
        'Khối',
        'Mã Game',
        'Điểm Số',
        'Chi Tiết',
        'Chữ Ký'
      ]);
      // Định dạng hàng tiêu đề
      var headerRange = sheet.getRange(1, 1, 1, 8);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#3b82f6');
      headerRange.setFontColor('#ffffff');
    }

    // Thêm ký tự ' trước tên lớp để Google Sheets không tự động biến thành ngày tháng (VD: '2/2)
    var lopText = "'" + lop;

    sheet.appendRow([
      new Date(),
      ten,
      lopText,
      khoi,
      gameId,
      score,
      JSON.stringify(meta),
      signature
    ]);

    return createJsonResponse({
      status: 'success',
      message: 'Ghi nhận điểm số thành công!',
      ten: ten,
      lop: lop,
      score: score
    });

  } catch (err) {
    return createJsonResponse({
      status: 'error',
      message: 'Lỗi máy chủ nội bộ: ' + err.toString()
    });
  } finally {
    // 5. Giải phóng khóa ScriptLock cho máy tiếp theo
    lock.releaseLock();
  }
}

/**
 * Xử lý yêu cầu GET: Kiểm tra trạng thái hoạt động của Web App
 */
function doGet(e) {
  return createJsonResponse({
    status: 'ok',
    message: 'Hệ thống Đấu Trường Tin Học API đang hoạt động bình thường!',
    time: new Date().toISOString()
  });
}

/**
 * Tính toán chữ ký SHA-256 trả về chuỗi Hex chữ thường
 */
function computeSha256(message) {
  var bytes = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    message,
    Utilities.Charset.UTF_8
  );
  var hexString = '';
  for (var i = 0; i < bytes.length; i++) {
    var b = bytes[i];
    if (b < 0) b += 256;
    var byteHex = b.toString(16);
    if (byteHex.length === 1) byteHex = '0' + byteHex;
    hexString += byteHex;
  }
  return hexString;
}

/**
 * Tiện ích xuất dữ liệu chuẩn JSON
 */
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
