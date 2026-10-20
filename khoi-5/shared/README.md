# THƯ MỤC DÙNG CHUNG KHỐI 5 (`khoi-5/shared`)

Thư mục này được đổi tên từ `theme` và nâng cấp toàn diện để gom chung **toàn bộ tài nguyên, giao diện và logic tương tác** của tất cả các bài giảng từ **Tiết 01 đến Tiết 35** trong Khối 5.

---

## 📁 Cấu Trúc Thư Mục

```
khoi-5/shared/
├── style.css       # Toàn bộ CSS dùng chung (Design tokens, Notebook chép bài, Scoreboard, Gacha, Modals, Responsive)
├── core.js         # Gói JavaScript All-in-One (Tích hợp Audio, Slides, Notebook, Scoreboard, Students, Excel, Gacha, Utils)
├── audio.js        # Web Audio API Engine (Âm thanh đúng/sai, còi phạt, tăng giảm điểm, túi mù, click - 100% offline)
├── slides.js       # Slide & Notebook Engine (Chuyển slide, phím tắt mũi tên/Space, tự cập nhật ngày tháng tiếng Việt)
├── scoreboard.js   # Scoreboard Engine (Quản lý điểm số, đội/dãy bàn, phạt mất trật tự, bảng vinh danh xếp hạng)
├── students.js     # Student Engine (Nạp lớp 5/1 -> 5/6 từ JSON, đọc file Excel thông minh, gọi tên ngẫu nhiên)
├── gacha.js        # Gacha Engine (Minigame bốc Túi Mù may mắn, tỉ lệ thưởng cân bằng sư phạm)
├── utils.js        # Utilities (Toast thông báo nổi, flash chớp viền màn hình, pháo hoa ăn mừng, xuất Excel)
├── template.html   # File HTML bài giảng mẫu chuẩn Khối 5 (Chỉ cần sao chép để tạo tiết học mới)
└── README.md       # Tài liệu hướng dẫn sử dụng
```

---

## 🌟 Hai Điểm Gom Chung Cốt Lõi Vừa Được Bổ Sung

### 1. Vở Chép Bài Dùng Chung (Notebook Component)
- **Tự động hóa ngày tháng**: Hàm `formatTodayDate()` tự động điền `"Thứ..., ngày... tháng... năm..."` theo thời gian thực (hỗ trợ cả `.today-date`, `.currentDateDisplay`, `#lessonDate`).
- **Giao diện chuẩn**: Tích hợp sẵn CSS đường viền gáy lò xo, tiêu đề môn học, và vùng soạn thảo `contenteditable="true"` để giáo viên có thể chỉnh sửa trực tiếp trên lớp.

### 2. Logic Import Danh Sách Học Sinh Thông Minh (Kép: JSON + Excel)
- **Nguồn 1 (JSON)**: Nạp tự động từ file trường `assets/data/students_5_2026_2027.json` theo mã lớp (`5_1` đến `5_6`).
- **Nguồn 2 (File Excel)**: Hàm `Khoi5Students.handleExcelUpload(event)` tự động quét và nhận diện thông minh cột *"Họ và tên"*, *"Họ tên"* hoặc cặp cột *"Họ lót" + "Tên"* trong file `.xlsx`, `.xls`, `.csv` do giáo viên tải lên.

---

## 🚀 Cách Sử Dụng Trong Bài Giảng

```html
<head>
  <!-- CSS dùng chung -->
  <link rel="stylesheet" href="../shared/style.css" />
  <!-- (Tùy chọn) Thư viện đọc Excel & Pháo hoa -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>
  <!-- JS All-in-One dùng chung Khối 5 -->
  <script src="../shared/core.js"></script>
</head>
```

---

## 📋 Trạng Thái Áp Dụng Trong Khối 5

- **Tiết 03, 04, 05**: Đã chuyển đổi liên kết sang `../shared/style.css`.
- **Tiết 06, 07**: Đã kết nối đầy đủ `../shared/style.css` và `../shared/core.js`.
- **Tiết 08 đến 35**: Khi bắt đầu soạn bài mới, chỉ cần nhân bản file [`template.html`](template.html) vào thư mục tiết tương ứng.
