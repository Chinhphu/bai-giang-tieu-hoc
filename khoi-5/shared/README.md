# Tài nguyên dùng chung Khối 5

Các bài giảng có cùng khung lớp học theo chuẩn Tiết 07. Nội dung slide và hoạt động riêng của từng tiết vẫn nằm trong `tiet-XX/index.html`; những phần khung lặp lại được cung cấp từ thư mục này.

## Thành phần hiện có

- `style.css`: giao diện cơ sở và kiểu cho khung cài đặt, sidebar, slide, bảng điểm, modal và màn hình tổng kết.
- `components.js`: Web Components dùng cho cài đặt (`<khoi5-setup>`), sidebar (`<khoi5-sidebar>`), modal danh sách học sinh (`<khoi5-student-modal>`) và màn hình tổng kết (`<khoi5-summary>`); đồng thời cung cấp `toast(message, duration, background)` dùng chung.
- `audio.js`, `slides.js`, `scoreboard.js`, `students.js`, `gacha.js`, `utils.js`, `tracker.js`: các module chức năng độc lập. Chỉ sử dụng module khi trang nạp trực tiếp tệp đó và tích hợp đúng API của module; `core.js` hiện là bundle độc lập, không tự được các trang nạp.
- `template.html`: khung tạo tiết mới; thay thông tin bài học và nội dung slide, không sao chép lại markup cài đặt/sidebar.

## Cách dùng component

Nạp CSS và component script trong `<head>` của trang tiết:

```html
<link rel="stylesheet" href="../shared/style.css">
<script src="../shared/components.js"></script>
```

Đặt component cài đặt trong `<body>`. Thuộc tính nội dung cho phép cấu hình nhãn và lựa chọn mặc định theo từng tiết:

```html
<khoi5-setup
  heading="TIN HỌC 5 · BÀI ..."
  description="TÊN BÀI HỌC (TIẾT ...)"
  team-label="Số lượng tổ (Tối đa 6):"
  team-unit="Tổ"
  default-class="5_2"
  default-teams="4">
</khoi5-setup>
```

Các thuộc tính tùy chọn: `starting-score-label`, `start-label`. Component giữ nguyên các ID `s-class`, `s-teams`, `excel-file-setup` và `setup-excel-status` để tương thích với logic khởi tạo/import của bài.

Đặt sidebar bên trong `#app`. Sidebar tạo vùng `#teams`, nút thêm học sinh, nút tổng kết và điều hướng slide:

```html
<khoi5-sidebar></khoi5-sidebar>
```

Các thuộc tính tùy chọn: `title`, `quick-action="gacha"`, `gold-board`, `navigation="false"`, `page-indicator`. Nút chỉ được thêm khi thuộc tính tương ứng được khai báo.

Modal và màn hình tổng kết cũng cấu hình qua thuộc tính để giữ lại các hàm/ID riêng của từng bài:

```html
<khoi5-student-modal
  textarea-id="hs-input"
  close-handler="closeAddHs"
  save-handler="saveAddHs">
</khoi5-student-modal>
<khoi5-summary heading="📋 Quản lí học sinh các tổ"></khoi5-summary>
```

Modal chấp nhận `cancel-label`; summary chấp nhận `export-label` và `gold-board` cho nút xem bảng vàng.

## Trạng thái áp dụng

- Tiết 03–07 dùng chung component cài đặt, sidebar, modal học sinh, màn hình tổng kết và thông báo toast; mỗi trang vẫn giữ nguyên hoạt động và nội dung slide đặc thù.
- Tiết 07 là trang tham chiếu về bố cục và cách tổ chức bài; template cũng dùng các component này.
- Các tiết chưa có nội dung vẫn để trống. Khi tạo bài mới, sao chép template vào thư mục tiết, đổi thông tin cấu hình và bổ sung nội dung bài học.
