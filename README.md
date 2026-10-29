# bai-giang-tieu-hoc
Slide bài giảng HTML/CSS/JS cho khối 1, 2, 3, 4, 5 và Kho mini-games.

## 🛡️ Hệ thống chống tải lại trang & bảo vệ dữ liệu tiết học (`prevent-reload`)

Để đảm bảo học sinh không vô tình thao tác làm mất điểm số, danh sách học sinh và dữ liệu bài giảng, toàn bộ hệ thống đã được tích hợp bộ bảo vệ tự động:

### 1. Các hành vi bị cấm / vô hiệu hóa:
- **Phím F5, Ctrl + F5, Shift + F5**: Bị chặn ngay lập tức, hiển thị thông báo nhắc nhở màu đỏ.
- **Phím Ctrl + R, Ctrl + Shift + R, Cmd + R, Cmd + Shift + R**: Bị chặn ngay lập tức.
- **Phím Alt + Mũi tên trái / Alt + Mũi tên phải**: Bị chặn để ngăn quay lại (back/forward) trang trước.
- **Phím Backspace ngoài ô nhập liệu**: Bị chặn (chỉ cho phép xóa chữ khi đang gõ trong `input` hoặc `textarea`).
- **Chuột phải (Context menu)**: Bị khóa để tránh học sinh bấm nhầm vào menu chuột phải chọn *"Tải lại"* hoặc nghịch mã nguồn (*Giáo viên nếu cần mở menu ngữ cảnh gốc chỉ cần giữ phím `Shift + Chuột phải`*).

### 2. Hành vi duy nhất được phép tải lại:
- **Bấm nút Reload trên thanh địa chỉ của trình duyệt**: Khi bấm nút này, trình duyệt sẽ kích hoạt sự kiện `beforeunload` và bật hộp thoại cảnh báo xác nhận (*"Bạn có chắc muốn rời khỏi/tải lại trang này? Dữ liệu chưa lưu có thể bị mất"*).
  - Nếu học sinh vô tình bấm nhầm: Bấm **Hủy / Stay** để tiếp tục tiết học mà không mất dữ liệu.
  - Nếu giáo viên chủ động muốn tải lại: Bấm **Tải lại / Reload**.

### 3. Quy ước dùng chung cho các file HTML tạo mới sau này:
1. **Nếu tạo từ template khối** (`khoi-3/shared/template.html`, `khoi-5/shared/template.html`): File đã tích hợp sẵn cả script độc lập lẫn `components.js`, tự động được bảo vệ.
2. **Nếu tạo HTML độc lập**: Chỉ cần chèn thẻ script sau vào trong `<head>`:
   ```html
   <!-- Chèn theo đúng độ sâu thư mục -->
   <script src="../../shared/js/prevent-reload.js"></script>
   ```
3. **Nếu trang có import `components.js` hoặc `common.js`**: Đã được nhúng sẵn module bảo vệ dự phòng, tự động kích hoạt.
4. **Hàm JavaScript hỗ trợ (nếu có nút Làm lại / Reset game có chủ đích)**:
   ```javascript
   window.allowPageReload(); // Cho phép reload trang mà không hiện cảnh báo
   location.reload();
   ```
