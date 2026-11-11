# 📙 CẨM NANG & QUY CHUẨN DÙNG CHUNG KHỐI 4 (LỚP 4)
> **Dự án:** Slide bài giảng tương tác Tin học Lớp 4 (Tiết 01 – Tiết 35)  
> **Khối:** 4 | **Đối tượng học sinh:** 9 tuổi (Lớp 4)  
> **Nguyên tắc:** 100% Offline-First · An toàn dữ liệu phòng máy · Tư duy công nghệ & Tình huống thực tế

---

## 🎯 1. NGUYÊN TẮC THIẾT KẾ & BẢN SẮC KHỐI 4 (GRADE 4 IDENTITY)

Học sinh Khối 4 (9 tuổi) đã có tư duy logic phát triển, khả năng đọc hiểu nhanh và bắt đầu tiếp cận các chủ đề công nghệ có chiều sâu (Bản quyền phần mềm, An toàn thông tin, Thư mục và tệp, Tìm kiếm thông tin trên Internet, Soạn thảo văn bản nâng cao):

| Tiêu chí | Quy chuẩn Khối 4 | Ghi chú kỹ thuật |
| :--- | :--- | :--- |
| **Font chữ bắt buộc** | `'Be Vietnam Pro', sans-serif` | Nạp offline file `.woff2` từ `assets/fonts/` qua `shared/css/core.css`. Thiết kế chuẩn mực, hiện đại, trang nhã. |
| **Bảng màu chủ đạo** | Xanh Navy (`#14213d`), Nền kem ngà (`#f4efe6`), Đỏ san hô (`#e63946`), Xanh lá (`#16a34a`) | Trưởng thành, chuyên nghiệp, tạo phong thái "Chuyên gia công nghệ nhí". |
| **Bố cục chuẩn** | Header Tab điều hướng trên đỉnh + Grid 2 cột (Khu vực hoạt động & Sidebar quản lý) | Hiện đại, khoa học, tối ưu quan sát trên TV màn chiếu 16:9. |
| **Bài giảng mẫu (Benchmark)** | **Tiết 03** & **Tiết 11** *(Bài 6: Sử dụng phần mềm khi được phép)* | Chuẩn về dàn dựng tình huống vụ án công nghệ, câu hỏi phân tích và cơ chế bảo vệ bản quyền số. |

---

## 📂 2. CẤU TRÚC THƯ MỤC `khoi-4/shared/` & THÀNH PHẦN

```text
khoi-4/
├── shared/
│   ├── components.js     # Chống reload, Toast UI chuẩn Khối 4, upload CSV đồng bộ Drive
│   └── README.md         # Cẩm nang kiến trúc và quy chuẩn Khối 4 (File này)
├── theme/
│   └── style.css         # Theme CSS định danh chuẩn Khối 4 (Be Vietnam Pro, Navy, Grid 2 cột)
├── tiet-01/ ... tiet-35/ # Thư mục từng tiết học (index.html, quests.js)
```

### Thành phần có sẵn trong `components.js`:
1. **Module Chống Reload Tự Động (`prevent-reload`):** Tự động khóa phím `F5`, `Ctrl+R`, `Alt+Mũi tên`, `Backspace` ngoài ô nhập, và khóa chuột phải. Cung cấp hàm `window.allowPageReload()` khi cần làm mới trang có chủ đích.
2. **Hệ thống Toast Khối 4:**
   - `window.toast(message, duration, background)`: Hiển thị thông báo bo tròn viên thuốc nổi bật trên đầu màn hình với font *Be Vietnam Pro*.
   - `window.showToast(message, type)`: Hiển thị nhanh theo type (`ok`, `warn`, `bad`, `info`).
3. **Đồng bộ CSV lên Google Drive:**
   - `window.uploadCsvToDrive(data, fileName)`: Tự động mã hóa Base64 và đẩy lên Google Apps Script Web App, fallback tự tải file về máy giáo viên nếu offline.
   - `window.uploadExcelToDrive`: Bridge tương thích ngược, tự động gọi `uploadCsvToDrive`.

---

## 🛡️ 3. BỘ QUY TẮC AN TOÀN & BẢO VỆ PHÒNG MÁY

1. **100% Offline-First — TUYỆT ĐỐI CẤM CDN NGOÀI:**
   - Hoạt động trơn tru 100% khi double-click mở trực tiếp `file:///...` trong phòng máy không có internet.
   - Âm thanh: 100% Web Audio API synthesizer nội bộ.
   - Hiệu ứng pháo hoa: Canvas HTML5 nội bộ (`../../shared/js/confetti.js`).
2. **Auto-Save LocalStorage & Phục hồi khi cúp điện (Crash Recovery):**
   - Mọi biến động (điểm số các tổ, chuỗi streak, tiến trình câu hỏi, học sinh đã tham gia) tự động ghi vào `localStorage`.
   - Key chuẩn: `bgtieu_hoc_k4_tiet_{Tiet}_{Lop}_state` *(Ví dụ: `bgtieu_hoc_k4_tiet_11_4-1_state`)*.
   - Phục hồi nguyên vẹn phiên học khi mở lại trang kèm Toast xanh lá: *"⚡ Đã tự động khôi phục dữ liệu phiên học trước!"*.
   - BẮT BUỘC nút **"🗑️ Xóa dữ liệu phiên"** an toàn (kèm `confirm()`, chỉ xóa đúng key của tiết).
3. **Quests & Vụ án: Duy Nhất 1 File `quests.js` (DRY):**
   - Khai báo ngân hàng câu hỏi/vụ án qua `window.QUESTS_DATA = [...]` trong file `quests.js` nằm cạnh `index.html`.
   - Bỏ hẳn `quests.json` để triệt tiêu lỗi bất đồng bộ và chống lỗi chặn CORS trên `file:///`.

---

## 🎓 4. KHUNG SƯ PHẠM ĐẶC THÙ CHO HỌC SINH LỚP 4

1. **Khởi động bằng Vụ án & Tình huống có vấn đề (Problem-based Hook):**
   - Học sinh Lớp 4 rất hào hứng với vai trò "Thám tử công nghệ", "Chuyên gia an toàn mạng".
   - Mở đầu bằng một vụ án thực tế (ví dụ: máy tính bị dính mã độc do tải phần mềm lậu, nghịch lý bản quyền, sự cố thất lạc tài liệu) để học sinh *tự thảo luận, phát hiện mâu thuẫn và tự phát biểu mục tiêu bài học*.
2. **Trang Ghi bài vào vở (Notebook Writing Slide):**
   - Nền trắng tinh khiết (`#ffffff`), chữ siêu to nhìn rõ từ cự ly 8–10m cuối lớp.
   - Chỉ ghi: Thứ ngày Tiếng Việt tự động (`updateVietnameseDate()`) + Môn: *Tin học 4* + *Tên bài*.
   - **Ghi chép tối giản:** Chắt lọc 1–2 công thức hành động cốt lõi, không bắt chép dài làm mất giờ thực hành máy tính.
   - **TUYỆT ĐỐI CẤM Đồng hồ đếm ngược (Timer) khi chép bài:** Tránh áp lực thời gian khiến học sinh hoảng loạn.
   - **Chuẩn Fullscreen Pop-up Modal:** 1 nút Zoom phóng to che kín 100% màn hình TV (`100vw x 100vh`) và chỉ 1 nút tắt `✖ Thu nhỏ (Esc)` ở góc trên bên phải.
3. **Tương tác 100% Không Đạo Cụ (Zero-Prop):**
   - Biểu quyết tập thể bằng cử chỉ tay (1-2-3-4 ngón tay tương ứng ABCD, hai tay chữ X / vòng tay chữ O, Like / Thả tim).
   - Giáo viên quét mắt 2 giây bao quát toàn bộ học sinh trong phòng máy, sau đó bấm `🎲 Gacha` bốc 1 em lên chốt đáp án trên máy chiếu.
4. **Chốt kiến thức 5 phút cuối (Active Recall):**
   - Đặt trước Slide Bảng vàng vinh danh. Thiết kế 2–4 card to rõ, ít chữ.
   - Học sinh tự nhớ lại và phát biểu trước, các bạn bổ sung, giáo viên bấm mở chốt bài sau.
   - Chuẩn bị đủ số lượng câu hỏi/lượt củng cố cho **TẤT CẢ các tổ đang tham gia** để đảm bảo công bằng điểm số.
5. **Kỷ luật tích cực (KHÔNG áp dụng Phe Quỷ / Ma Vương):**
   - Khối 4 **tuyệt đối không áp dụng chế độ Phe Quỷ hay Ma Vương** (chế độ này chỉ dành riêng cho Khối 5). Khi học sinh mất trật tự, giáo viên nhắc nhở, trừ điểm thi đua nhẹ hoặc điều chỉnh chuỗi streak để rèn luyện ý thức tích cực.

---

## 🎲 5. VÒNG ĐỜI GỌI TÊN, ĐIỂM SÀN 1000Đ & TIE-RANKING

1. **Nguyên tắc "Chọn là chọn, làm xong mới tính" (Picked ≠ Done):**
   - Bấm `🎲 Gacha` hiện Pop-up tên học sinh siêu to lên màn chiếu.
   - Nếu em được gọi chưa sẵn sàng: Bấm lại Gacha để quay tiếp bạn khác mà không làm mất lượt của bạn cũ.
   - Chỉ khi học sinh hoàn thành câu trả lời / thử thách, em đó mới chính thức chuyển sang danh sách "Đã hoàn thành".
2. **Điểm Sàn 1000đ & Bố trí 2–6 Tổ linh hoạt:**
   - Điểm số khởi đầu: `STARTING_SCORE = 1000;` để chống điểm âm, duy trì tinh thần cạnh tranh lành mạnh.
   - UI có sẵn nút `[+ Thêm Tổ]` / `[- Bớt Tổ]` (hỗ trợ linh hoạt từ 2 đến 6 tổ).
   - Có công cụ cho Giáo viên **sửa điểm / sửa chuỗi thắng (streak)** ngay tại chỗ khi lỡ tay bấm nhầm.
3. **Xếp hạng Đồng hạng Chuẩn Sư phạm (Tie-Ranking):**
   - Bằng điểm nhau $\rightarrow$ Cùng thứ hạng, cùng nhận cúp vàng 🥇 và danh hiệu `🏆 ĐỒNG QUÁN QUÂN`. Tuyệt đối không phân biệt đối xử khi bằng điểm.

---

## 📊 6. XUẤT BÁO CÁO CSV CHUẨN UTF-8 CÓ BOM

* Xuất file định dạng **CSV chuẩn UTF-8 có BOM (`\uFEFF`)**, mở trực tiếp trên Excel không bao giờ bị lỗi font Tiếng Việt.
* **Cú pháp tên file chuẩn theo thứ tự Năm-Tháng-Ngày-Giờ-Phút-Giây:**
  ```text
  KetQua_TinHoc4_Lop_{Lop}_Tiet_{Tiet}_Ngay_{YYYY}-{MM}-{DD}_{HH}h{MM}p{SS}s.csv
  ```
  *(Ví dụ: `KetQua_TinHoc4_Lop_4-1_Tiet_11_Ngay_2026-11-12_14h30p25s.csv`)*
* Cấu trúc Multi-Section phân tách bằng dòng tiêu đề `=== TÊN PHẦN ===`:
  1. `=== PHẦN 1: BẢNG XẾP HẠNG TỔ ===` (Có cột Đồng hạng, cột Huy chương bằng chữ thuần: *Huy chương Vàng*, *Huy chương Bạc*, *Huy chương Đồng*).
  2. `=== PHẦN 2: THEO DÕI ĐÁNH GIÁ HỌC SINH (TT27 / SMAS) ===` (Tự động xếp loại T / H / C kèm nhận xét sư phạm).
* Tự động gửi ngầm lên Google Drive qua `window.uploadCsvToDrive(data, fileName)`, fallback tự động tải về máy giáo viên nếu không có internet.

---

## 🚀 7. KHUNG MẪU HTML CHUẨN CHO BÀI HỌC KHỐI 4

Khi tạo tiết học mới cho Khối 4 (ví dụ: `khoi-4/tiet-12/index.html`):

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bài X: [Tên Bài Học] (Tiết ...) – Tin học 4</title>

    <!-- 100% OFFLINE-FIRST LIBRARIES & ASSETS -->
    <link rel="stylesheet" href="../../shared/css/core.css">
    <link rel="stylesheet" href="../theme/style.css">
    <script src="../../shared/js/confetti.js"></script>
    <script src="../../shared/js/prevent-reload.js"></script>
    <script src="../shared/components.js"></script>
    <script src="../../shared/js/core.js"></script>

    <!-- QUESTS DATA OFFLINE-FIRST -->
    <script src="quests.js"></script>
</head>
<body>
    <!-- Bố cục chuẩn Khối 4: Header Tab đỉnh + Grid 2 cột -->
    ...
</body>
</html>
```
