# 📘 CẨM NANG & QUY CHUẨN DÙNG CHUNG KHỐI 2 (LỚP 2)
> **Dự án:** Slide bài giảng tương tác Tin học Lớp 2 (Tiết 01 – Tiết 35)  
> **Khối:** 2 | **Đối tượng học sinh:** 7 tuổi (Lớp 2)  
> **Nguyên tắc:** 100% Offline-First · An toàn dữ liệu phòng máy · Chuẩn sư phạm trực quan

---

## 🎯 1. NGUYÊN TẮC THIẾT KẾ & BẢN SẮC KHỐI 2 (GRADE 2 IDENTITY)

Sự khác biệt của Khối 2 so với các khối khác là chủ đích thiết kế, nhưng **trong toàn bộ Khối 2 phải đồng nhất 100%**:

| Tiêu chí | Quy chuẩn Khối 2 | Ghi chú kỹ thuật |
| :--- | :--- | :--- |
| **Font chữ bắt buộc** | `'Nunito', sans-serif` | Nạp offline file `.woff2` từ `assets/fonts/` qua `shared/css/core.css`. Bo tròn, ấm áp, thân thiện với học sinh 7 tuổi. |
| **Bảng màu chủ đạo** | Xanh dương (`#0284c7`), Vàng sao (`#f59e0b` / `#fbbf24`), Đỏ hành động (`#dc2626`) | Tươi vui, kích thích vận động nhận thức, độ tương phản cao trên máy chiếu TV. |
| **Bố cục chuẩn** | Slide cuộn flexbox (`.slide.active`) + Bottom Navbar chân trang + Sidebar mini học sinh (Hoặc Drawer Menu Giáo viên ẩn/hiện bằng nút Hamburger `☰` như Tiết 10) | Đệm chân trang bắt buộc `padding-bottom: 120px - 140px` để không bị thanh điều hướng che lấp; cho phép menu điều khiển ẩn/hiện linh hoạt bằng nút Hamburger. |
| **Bài giảng mẫu (Benchmark)** | **Tiết 09** *(Bài 6: Vui học Toán cùng máy tính)* & **Tiết 10** | Chuẩn về nhịp độ sư phạm, màn hình chép bài, đấu trường toán/chuột và hiệu ứng pháo hoa Canvas. |

---

## 🛡️ 2. BỘ QUY TẮC AN TOÀN & BẢO VỆ PHÒNG MÁY

1. **100% Offline-First — TUYỆT ĐỐI CẤM CDN NGOÀI:**
   - Mở và chạy trơn tru khi nhấp đúp file trực tiếp bằng giao thức `file:///...`.
   - Pháo hoa: Dùng Canvas HTML5 nội bộ (`confetti.js` hoặc Canvas vẽ hạt trong trang).
   - Âm thanh: 100% Web Audio API synthesizer sinh sóng âm (chuông đúng, còi sai, fanfare chiến thắng), không dùng file `.mp3` ngoài.
   - Nạp file bảo vệ và thư viện cốt lõi trong `<head>`:
     ```html
     <script src="../../shared/js/prevent-reload.js"></script>
     <script src="../../shared/js/core.js"></script>
     ```
2. **Chống mất dữ liệu (`prevent-reload.js`):**
   - Tự động chặn: `F5`, `Ctrl+R`, `Alt+Mũi tên`, `Backspace` ngoài ô nhập liệu, và khóa chuột phải.
   - Khi cần tải lại trang có chủ đích: Phải gọi `window.allowPageReload()` trước `location.reload()`.
3. **Auto-Save LocalStorage & Phục hồi khi cúp điện (Crash Recovery):**
   - Mọi biến động (điểm số, tiến trình câu hỏi, học sinh đã gọi, telemetry) tự động lưu vào `localStorage`.
   - Key chuẩn duy nhất: `bgtieu_hoc_k2_tiet_{Tiet}_{Lop}_state` *(Ví dụ: `bgtieu_hoc_k2_tiet_09_2-2_state`)*.
   - Tự động nhận diện phiên học dở dang và phục hồi nguyên vẹn kèm Toast thông báo xanh ngọc.
   - BẮT BUỘC có nút **"🗑️ Xóa dữ liệu phiên"** an toàn (kèm xác nhận `confirm()`, chỉ xóa đúng key của bài).

---

## 🎓 3. QUY TRÌNH SƯ PHẠM ĐẶC THÙ CHO HỌC SINH LỚP 2

Học sinh lớp 2 (7 tuổi) vừa qua giai đoạn tập đọc tập viết, khả năng tập trung có hạn, thao tác tay với chuột và bàn phím đang trong giai đoạn định hình:

1. **Khởi động (The Hook):**
   - Bắt đầu bằng câu đố hình ảnh, nhân vật hoạt hình gặp sự cố ngộ nghĩnh, hoặc trò chơi đố vui ngắn để học sinh *tự nói ra tên bài học*.
   - TUYỆT ĐỐI CẤM vào bài một chiều: *"Hôm nay chúng ta học bài..."*.
2. **Trang Ghi bài vào vở (Notebook Writing):**
   - Nền trắng tinh khiết (`#ffffff`), chữ siêu to nhìn rõ từ khoảng cách 8–10m (Tựa bài $\ge 50\text{px}$, nội dung $\ge 30\text{px}$).
   - **Ghi chép tối giản:** Chỉ ghi Thứ ngày Tiếng Việt tự động (`updateVietnameseDate()`) + Môn: *Tin học 2* + *Tên bài*. Không ép chép dài dòng chiếm giờ thực hành máy tính.
   - **TUYỆT ĐỐI CẤM Đồng hồ đếm ngược (Timer) khi chép bài:** Tránh gây áp lực hoảng sợ, viết ẩu.
   - **Chuẩn Fullscreen Pop-up Modal:** 1 nút Zoom mở modal phủ kín 100% màn hình TV (`100vw x 100vh`) và chỉ 1 nút tắt `✖ Thu nhỏ (Esc)` ở góc trên bên phải.
3. **Ghi bài xé nhỏ (Progressive Chunking):**
   - Sau mỗi hoạt động khám phá/thực hành, chỉ mở 1 thẻ ghi nhớ nhỏ (`.memo-card`) chứa đúng **1–2 câu ngắn, in đậm từ khóa quan trọng**.
4. **Tương tác 100% Không Đạo Cụ (Zero-Prop):**
   - Trẻ biểu quyết đáp án bằng ngón tay: giơ 1-2-3-4 ngón tương ứng A-B-C-D; vòng 2 tay tạo chữ O (Đúng), bắt chéo tay tạo chữ X (Sai), làm biểu tượng Thả tim / Like.
   - Giáo viên quét mắt 2 giây nắm bắt cả lớp, sau đó bấm `🎲 Gacha` bốc 1 em lên chốt đáp án trên máy.
5. **Chốt kiến thức 5 phút cuối (Active Recall):**
   - Bắt buộc đặt trước Slide Bảng vàng vinh danh. Thiết kế 2–3 card to rõ, ít chữ. Học sinh tự nhớ lại và nói trước, giáo viên bấm mở chốt sau.
6. **Kỷ luật tích cực (KHÔNG áp dụng Phe Quỷ / Ma Vương):**
   - Lớp 2 **tuyệt đối không áp dụng chế độ Phe Quỷ hay Ma Vương** (chỉ dành riêng cho Khối 5). Khi học sinh mất trật tự, giáo viên nhắc nhở nhẹ nhàng hoặc trừ điểm tổ/cá nhân tượng trưng để động viên rèn luyện.

---

## 🎲 4. VÒNG ĐỜI GỌI TÊN & HỆ THỐNG TÍNH ĐIỂM

1. **Nguyên tắc "Chọn là chọn, làm xong mới tính" (Picked ≠ Done) & "Gacha tới khi nào trúng thì thôi":**
   - **Thực tế lớp học & Không gán tổ cố định:** Học sinh đổi chỗ ngồi liên tục sau mỗi tuần/buổi học, do đó danh sách học sinh phẳng, **tuyệt đối không gán sẵn tổ cố định**. AI Agent không được tự ý ép gán cứng tổ cho học sinh trong code.
   - **Gacha tới khi trúng thì thôi (Không phải lỗi):** Khi đến lượt thi của một Tổ, việc bấm Gacha ra bạn đang ngồi ở Tổ khác là hoàn toàn bình thường và đúng thiết kế (KHÔNG PHẢI LỖI). Giáo viên chỉ cần bấm Gacha liên tục cho tới khi trúng bạn thuộc tổ đang tới lượt thì chốt.
   - Bấm `🎲 Gacha` bật pop-up tên học sinh siêu to lên màn hình.
   - Nếu em đó vắng hoặc chưa sẵn sàng: Bấm lại Gacha để quay tiếp bạn khác mà không làm mất lượt của bạn cũ.
   - Chỉ khi học sinh **nhập đáp án, click vượt ải, hoặc giáo viên bấm Xác nhận**, em đó mới chuyển sang danh sách "Đã tham gia" (`playedStudents`).
2. **Điểm Sàn 1000đ & Bố trí 2–6 Tổ linh hoạt:**
   - Điểm số khởi đầu: `STARTING_SCORE = 1000;` để chống điểm âm, tạo tâm thế phấn khởi tự tin.
   - UI có sẵn nút `[+ Thêm Tổ]` / `[- Bớt Tổ]` (hỗ trợ linh hoạt từ 2 đến 6 tổ).
   - Có công cụ cho Giáo viên **sửa điểm / sửa chuỗi thắng (streak)** ngay tại chỗ khi lỡ tay bấm nhầm.
3. **Xếp hạng Đồng hạng Chuẩn Sư phạm (Tie-Ranking):**
   - Bằng điểm nhau $\rightarrow$ Cùng thứ hạng, cùng nhận cúp vàng 🥇 và danh hiệu `🏆 ĐỒNG QUÁN QUÂN`. Tuyệt đối không dùng thứ tự ngẫu nhiên để ép một bên xuống hạng nhì.

---

## 📊 5. XUẤT BÁO CÁO CSV CHUẨN UTF-8 CÓ BOM

* Xuất định dạng **CSV chuẩn UTF-8 có BOM (`\uFEFF`)**, mở trực tiếp bằng Microsoft Excel không bao giờ bị lỗi font Tiếng Việt.
* **Cú pháp tên file chuẩn theo thứ tự Năm-Tháng-Ngày-Giờ-Phút-Giây:**
  ```text
  KetQua_TinHoc2_Lop_{Lop}_Tiet_{Tiet}_Ngay_{YYYY}-{MM}-{DD}_{HH}h{MM}p{SS}s.csv
  ```
  *(Ví dụ: `KetQua_TinHoc2_Lop_2-2_Tiet_09_Ngay_2026-11-03_16h45p10s.csv`)*
* Cấu trúc Multi-Section phân tách bởi tiêu đề `=== TÊN PHẦN ===`:
  1. `=== PHẦN 1: BẢNG XẾP HẠNG TỔ ===` (Có cột Đồng hạng, cột Huy chương bằng chữ thuần: *Huy chương Vàng*, *Huy chương Bạc*, *Huy chương Đồng*).
  2. `=== PHẦN 2: THEO DÕI ĐÁNH GIÁ HỌC SINH (TT27 / SMAS) ===` (Tự động xếp loại T / H / C kèm nhận xét sư phạm).
* Tự động gửi ngầm lên Google Drive qua `window.uploadCsvToDrive(data, fileName)`, fallback tự động tải về máy giáo viên nếu không có internet.

---

## 🚀 6. KHUNG MẪU HTML CHUẨN CHO BÀI HỌC KHỐI 2

Khi tạo tiết học mới cho Khối 2 (ví dụ: `khoi-2/tiet-11/index.html`):

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bài X: [Tên Bài Học] - Tin học Lớp 2</title>

    <!-- Style chuẩn khối 2 và bộ bảo vệ offline -->
    <link rel="stylesheet" href="../theme/style.css">
    <script src="../../shared/js/prevent-reload.js"></script>
    <script src="../../shared/js/core.js"></script>

    <!-- Quests duy nhất 1 file JS bên cạnh -->
    <script src="quests.js"></script>
</head>
<body>
    <!-- Giao diện bài học chuẩn Khối 2: Sidebar trái + Vùng trình chiếu + Bottom bar điều hướng -->
    ...
</body>
</html>
```
