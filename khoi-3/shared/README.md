# Tài nguyên dùng chung Khối 3

Các bài giảng Tin học khối 3 có cùng khung lớp học theo chuẩn giao diện của **Tiết 06 (Xưởng Ráp PC)**: font chữ Quicksand tươi sáng, thẻ card bo góc thân thiện với học sinh lớp 3, cơ chế lắp ráp linh kiện PC, hệ thống quà tặng và tổng kết Kanban. Những phần khung lặp lại được đóng gói dùng chung trong thư mục này.

## Thành phần hiện có

- `style.css`: Giao diện cơ sở định nghĩa theo Tiết 06 (Quicksand, màu sắc tươi sáng: `--primary: #4361ee`, `--secondary: #ffb703`, `--navy: #101b35`, `--green: #2a9d8f`, `--red: #e63946`, ...), bố cục `.main` và `.side`, các thẻ `.tcard`, linh kiện 4 ô `.core-slots-grid`, kho đồ cuộn ngang `.inv-scroll`, modal, toast và Kanban.
- `components.js`: Web Components cho cài đặt đầu giờ (`<khoi3-setup>`), sidebar (`<khoi3-sidebar>`), modal thêm học sinh (`<khoi3-student-modal>`) và màn hình tổng kết (`<khoi3-summary>`); đồng thời cung cấp hàm `toast(msg)` và **`uploadExcelToDrive(wb, fileName)`** tự động bắn file nhật ký lên Google Drive.
- `students.js`: Quản lý danh sách học sinh Khối 3 nạp trực tiếp tự động từ JSON (`assets/data/students_3_2026_2027.json`). Hoàn toàn không dùng import Excel, chỉ dùng JSON và cho phép giáo viên thêm nhanh học sinh bằng tay.
- `tracker.js`: Ghi nhật ký chi tiết theo thời gian thực, tính toán thứ hạng chuẩn sư phạm (xử lý đồng hạng) và xuất báo cáo 3 sheets (Bảng Xếp Hạng, Nhật Ký Chi Tiết, Danh Sách Học Sinh) tự động đồng bộ về Google Drive.
- `audio.js`: Phát âm thanh Web Audio API (trả lời đúng, chiến thắng, phạt mất trật tự, click, quay gacha), 100% offline không cần mp3 ngoài.
- `slides.js`: Quản lý chuyển đổi màn hình và slide trình chiếu.
- `scoreboard.js`: Quản lý tổ/đội, 4 linh kiện PC cốt lõi (Thân máy, Màn hình, Bàn phím, Chuột), phụ kiện công nghệ và phạt ồn.
- `gacha.js`: Hệ thống 6 thùng hàng bí mật và hiệu ứng mở quà.
- `utils.js`: Các hàm tiện ích: toast, confetti bắn pháo hoa, timer, xáo trộn câu hỏi và xuất Excel.
- `template.html`: Khung tạo bài học mới cho Khối 3.

## Cơ chế Xuất Báo Cáo CSV & Đồng Bộ Google Drive

Toàn bộ hệ thống xuất file báo cáo ở định dạng **CSV chuẩn UTF-8 có BOM (`\uFEFF`)**:
1. **Quy cách đặt tên file chuẩn thống nhất:**
   `KetQua_TinHoc3_Lop_{Lop}_Tiet_{Tiet}_{HH}h{MM}p{SS}s_Ngay_{DD}-{MM}-{YYYY}.csv`
   *(Ví dụ: `KetQua_TinHoc3_Lop_3-2_Tiet_06_14h30p25s_Ngay_31-10-2026.csv`)*
2. Khi giáo viên bấm nút **"📥 Xuất CSV báo cáo"** ở màn hình tổng kết:
3. Hệ thống sử dụng hàm `uploadCsvToDrive(csvDataOrSections, fileName)` (cung cấp sẵn từ `../shared/components.js`, với alias tương thích `uploadExcelToDrive`).
4. Với báo cáo nhiều phần (Bảng Xếp Hạng, Nhật Ký Chi Tiết, Danh Sách Học Sinh), hệ thống tự động gộp thành định dạng multi-section CSV ngăn cách bởi tiêu đề `=== TÊN PHẦN ===`, lưu giữ trọn vẹn dữ liệu.
5. Dữ liệu CSV được mã hóa Base64 với MIME `text/csv;charset=utf-8` và gửi qua POST request đến Google Apps Script Web App:
   `https://script.google.com/macros/s/AKfycbywqn9mgeON9fTqp3xmnGbuqWW-eChABhvaotV4qHezosaqlYuWpF0c4vnB7APkuXBSRw/exec`
6. Dữ liệu được lưu trực tiếp vào thư mục Drive lưu trữ log tiết học của nhà trường.
7. **Cơ chế dự phòng (Fallback):** Nếu mất mạng hoặc không kết nối được Google Apps Script, hệ thống sẽ tự động kích hoạt tải trực tiếp tệp CSV về máy giáo viên qua `window.LessonExport.download(...)`.

## Cách dùng Web Components

Nạp CSS và script trong thẻ `<head>` của từng tiết:

```html
<link rel="stylesheet" href="../shared/style.css">
<script src="../shared/components.js"></script>
```

Đặt các component trong `<body>`:

```html
<!-- Màn hình cài đặt đầu giờ -->
<khoi3-setup
  heading="🛠️ XƯỞNG RÁP PC 🛠️"
  description="Điệp vụ lắp ráp máy tính — đội nào gom đủ 4 linh kiện sẽ vô địch!"
  default-class="3_2"
  default-teams="4">
</khoi3-setup>

<div class="main">
  <!-- Nội dung hoạt động riêng của tiết học -->
  ...
  <!-- Màn hình tổng kết -->
  <khoi3-summary heading="📊 Tổng kết & Xếp hạng"></khoi3-summary>
</div>

<!-- Sidebar quản lý đội -->
<khoi3-sidebar title="🛠️ Bảng đội"></khoi3-sidebar>

<!-- Modal thêm học sinh -->
<khoi3-student-modal textarea-id="hs-input" close-handler="closeAddHs" save-handler="saveAddHs"></khoi3-student-modal>
```

