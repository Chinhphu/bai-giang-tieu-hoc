# Tài nguyên dùng chung Khối 3

Các bài giảng Tin học khối 3 có cùng khung lớp học theo chuẩn giao diện của **Tiết 06 (Xưởng Ráp PC)**: font chữ Quicksand tươi sáng, thẻ card bo góc thân thiện với học sinh lớp 3, cơ chế lắp ráp linh kiện PC, hệ thống quà tặng và tổng kết Kanban. Những phần khung lặp lại được đóng gói dùng chung trong thư mục này.

## Thành phần hiện có

- `style.css`: Giao diện cơ sở định nghĩa theo Tiết 06 (Quicksand, màu sắc tươi sáng: `--primary: #4361ee`, `--secondary: #ffb703`, `--navy: #101b35`, `--green: #2a9d8f`, `--red: #e63946`, ...), bố cục `.main` và `.side` (cho phép menu điều khiển, thanh công cụ hoặc sidebar ẩn/hiện bằng nút Hamburger `☰` để tối ưu diện tích màn chiếu), các thẻ `.tcard`, linh kiện 4 ô `.core-slots-grid`, kho đồ cuộn ngang `.inv-scroll`, modal, toast và Kanban.
- Tiện ích & Web Components dùng chung được hợp nhất tại gốc repo (`../../shared/js/core.js`, `../../shared/js/ui-components.js`, `../../shared/js/prevent-reload.js`, `../../shared/template.html`).

## Cơ chế Xuất Báo Cáo CSV & Đồng Bộ Google Drive

Toàn bộ hệ thống xuất file báo cáo ở định dạng **CSV chuẩn UTF-8 có BOM (`\uFEFF`)**:
1. **Quy cách đặt tên file chuẩn thống nhất (Đưa Ngày lên trước Giờ để tự động sort theo tên):**
   `KetQua_TinHoc{Khoi}_Lop_{Lop}_Tiet_{Tiet}_Ngay_{YYYY}-{MM}-{DD}_{HH}h{MM}p{SS}s.csv`
   *(Ví dụ: `KetQua_TinHoc3_Lop_3-2_Tiet_06_Ngay_2026-10-31_14h30p25s.csv`)*
   *(Khi dạy chéo khối/đảo bài: Tự động cập nhật Khối và Lớp theo lớp thực tế, ví dụ chọn lớp 4/2 thì tên file sẽ là `KetQua_TinHoc4_Lop_4-2_...`)*
2. Khi giáo viên bấm nút **"📥 Xuất CSV báo cáo"** ở màn hình tổng kết:
3. Hệ thống sử dụng hàm `uploadCsvToDrive(csvDataOrSections, fileName)` (cung cấp sẵn từ `../shared/components.js`, với alias tương thích `uploadExcelToDrive`).
4. Với báo cáo nhiều phần (Bảng Xếp Hạng, Nhật Ký Chi Tiết, Danh Sách Học Sinh), hệ thống tự động gộp thành định dạng multi-section CSV ngăn cách bởi tiêu đề `=== TÊN PHẦN ===`, lưu giữ trọn vẹn dữ liệu.
5. Dữ liệu CSV được mã hóa Base64 với MIME `text/csv;charset=utf-8` và gửi qua POST request đến Google Apps Script Web App:
   `https://script.google.com/macros/s/AKfycbywqn9mgeON9fTqp3xmnGbuqWW-eChABhvaotV4qHezosaqlYuWpF0c4vnB7APkuXBSRw/exec`
6. Dữ liệu được lưu trực tiếp vào thư mục Drive lưu trữ log tiết học của nhà trường.
7. **Cơ chế dự phòng (Fallback):** Nếu mất mạng hoặc không kết nối được Google Apps Script, hệ thống sẽ tự động kích hoạt tải trực tiếp tệp CSV về máy giáo viên qua `window.LessonExport.download(...)`.

## 🎲 Quy Chuẩn Gọi Tên & Gacha Thi Đua Theo Tổ ("Gacha tới khi trúng thì thôi")

1. **Không gán tổ cố định ngay từ đầu:**
   - Trong thực tế giảng dạy, mỗi lần gặp lại bất kỳ lớp nào (sau mỗi tuần/buổi học) thì học sinh lớp đó lại đổi chỗ ngồi một lần.
   - Do đó, danh sách học sinh (`students_3_2026_2027.json`) là danh sách phẳng, **hoàn toàn KHÔNG gán sẵn tổ cố định**. AI Agent tuyệt đối không tự ý gán cứng tổ cho học sinh trong code hay chia mảng cố định.
2. **Cơ chế "Gacha tới khi nào trúng thì thôi":**
   - Khi bước vào vòng thi đấu theo Tổ (lắp ráp linh kiện, câu hỏi thi đua...), việc bấm Gacha quay ngẫu nhiên cả lớp mà ra tên bạn đang ngồi ở Tổ khác là **hoàn toàn bình thường và đúng chủ đích thiết kế, KHÔNG PHẢI LỖI (NOT A BUG)**.
   - Giáo viên chỉ cần **bấm nút Gacha liên tục cho tới khi nào quay trúng tên một em đang ngồi ở Tổ đang tới lượt** thì dừng lại và chốt em đó lên bảng.
   - Tuân thủ nguyên tắc *Picked ≠ Done*: Bấm Gacha lướt qua nhiều em hoàn toàn không làm mất lượt của các em đó. Em nào thực hiện xong thử thách mới tính là hoàn thành. Giáo viên cũng có thể chọn trực tiếp từ danh sách dropdown nếu có bạn xung phong.

## Cách dùng Web Components

Nạp CSS và script trong thẻ `<head>` của từng tiết:

```html
<link rel="stylesheet" href="../shared/style.css">
<script src="../../shared/js/core.js"></script>
<script src="../../shared/js/ui-components.js"></script>
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

