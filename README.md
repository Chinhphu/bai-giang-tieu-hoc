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

---

## 📊 Quy chuẩn Xuất Dữ Liệu Báo Cáo (CSV) Toàn Repo

Toàn bộ hệ thống bài giảng (tất cả các khối 1, 2, 3, 4, 5 và games) chuyển đổi toàn diện sang định dạng **CSV chuẩn UTF-8 có BOM (`\uFEFF`)** thay cho định dạng `.xlsx`:

### 1. Quy cách đặt tên file chuẩn thống nhất:
```text
KetQua_TinHoc{Khoi}_Lop_{Lop}_Tiet_{Tiet}_{HH}h{MM}p{SS}s_Ngay_{DD}-{MM}-{YYYY}.csv
```
- **Khối**: `1`, `2`, `3`, `4`, `5`.
- **Lớp**: Ký tự `/` hoặc `_` được chuẩn hóa thành `-` an toàn (ví dụ: `3/2` hay `3_2` thành `3-2`).
- **Tiết**: Định dạng 2 chữ số (ví dụ: `Tiet_06`, `Tiet_08`).
- **Thời gian**: Giờ, phút, giây 24h đầy đủ: `{HH}h{MM}p{SS}s` (ví dụ: `14h30p25s`).
- **Ngày**: Ngày, tháng, năm đầy đủ: `Ngay_{DD}-{MM}-{YYYY}` (ví dụ: `Ngay_31-10-2026`).
- *Ví dụ mẫu:*
  - `KetQua_TinHoc3_Lop_3-2_Tiet_06_14h30p25s_Ngay_31-10-2026.csv`
  - `KetQua_TinHoc5_Lop_5-1_Tiet_07_09h15p40s_Ngay_31-10-2026.csv`

### 2. Các hàm dùng chung (Đã tích hợp trong `shared/js/core.js`, `shared/js/prevent-reload.js` và `components.js` của từng khối):
- **`window.buildExportFileName({ grade, classId, lesson, prefix, ext })`**: Sinh tên file chuẩn theo quy cách trên.
- **`window.exportToCsv(data, fileName, options)`**: Xuất dữ liệu bảng hoặc dữ liệu nhiều phần (multi-section) ra file CSV UTF-8 có BOM.
- **`window.uploadCsvToDrive(data, fileName, options)`**: Gửi Base64 CSV đồng bộ về Google Apps Script Web App và Google Drive, tự động fallback tải file về máy giáo viên nếu offline.
- **`window.uploadExcelToDrive`**: Bridge tương thích ngược, tự động gọi `uploadCsvToDrive` để đảm bảo không gãy code cũ.
- **Báo cáo nhiều bảng/sheet**: Được phân chia tự động và trực quan bằng tiêu đề `=== TÊN PHẦN ===`, mở tốt trên mọi phần mềm bảng tính.
