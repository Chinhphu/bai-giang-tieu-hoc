# THƯ MỤC DÙNG CHUNG KHỐI 5 (`khoi-5/shared`)

Thư mục này được đổi tên từ `theme` và nâng cấp toàn diện để gom chung **toàn bộ tài nguyên, giao diện và logic tương tác** của tất cả các bài giảng trong Khối 5.

---

## 📁 Cấu Trúc Thư Mục

```
khoi-5/shared/
├── style.css       # Toàn bộ CSS dùng chung (Design tokens, Slides, Notebook, Scoreboard, Gacha, Modals, Responsive)
├── core.js         # Gói JavaScript All-in-One (Tổng hợp Audio, Slides, Scoreboard, Students, Gacha, Utils)
├── audio.js        # Web Audio API Engine (Âm thanh đúng/sai, còi phạt, tăng giảm điểm, túi mù, click - 100% offline)
├── slides.js       # Slide Engine (Chuyển slide, phím tắt mũi tên/Space, tự cập nhật ngày tháng tiếng Việt)
├── scoreboard.js   # Scoreboard Engine (Quản lý điểm số, đội/dãy bàn, phạt mất trật tự, bảng vinh danh xếp hạng)
├── students.js     # Student Engine (Tải danh sách lớp 5/1 - 5/6 từ JSON, gọi tên ngẫu nhiên, thêm học sinh)
├── gacha.js        # Gacha Engine (Minigame bốc Túi Mù may mắn, tỉ lệ thưởng cân bằng sư phạm)
├── utils.js        # Utilities (Toast thông báo nổi, flash chớp viền màn hình, pháo hoa ăn mừng, xuất Excel)
├── template.html   # File HTML bài giảng mẫu chuẩn Khối 5 (Chỉ cần sao chép để tạo tiết học mới)
└── README.md       # Tài liệu hướng dẫn sử dụng này
```

---

## 🚀 Cách Sử Dụng Trong Tiết Học Mới

### 1. Nhúng thư viện vào `<head>` và cuối `<body>`
```html
<head>
  <!-- CSS dùng chung -->
  <link rel="stylesheet" href="../shared/style.css" />
  <!-- (Tùy chọn) Thư viện pháo hoa khi kết bài -->
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>
</head>
<body>
  ...
  <!-- JS All-in-One (chỉ cần 1 dòng duy nhất!) -->
  <script src="../shared/core.js"></script>
</body>
```

### 2. Các hàm JavaScript có sẵn gọi được ngay

| Nhóm | Tên hàm | Chức năng |
|---|---|---|
| **Âm thanh** | `playCorrectSound()` | Tiếng chuông vui tươi khi trả lời đúng |
| | `playPenaltySound()` | Tiếng còi cảnh báo tụt dốc khi bị trừ điểm / phạt trật tự |
| | `playSuccessSound()` | Hợp âm Đô trưởng ăn mừng khi chiến thắng / kết bài |
| | `playScoreSound(delta)` | Tiếng bíp khi tăng/giảm điểm (+ ramp lên, - ramp xuống) |
| | `playGachaSound()` | Tiếng ting ting khi lật mở túi mù |
| **Slide** | `goToSlide(targetId)` | Chuyển đến slide theo ID (ví dụ: `'slide-2'`) |
| | `nextSlide()` | Sang slide kế tiếp (hỗ trợ phím `▶`, `Space`, `PageDown`) |
| | `prevSlide()` | Lùi về slide trước (hỗ trợ phím `◀`, `PageUp`) |
| | `formatTodayDate()` | Tự động điền "Thứ..., ngày... tháng... năm..." vào vở chép bài |
| **Bảng điểm** | `Khoi5Scoreboard.init({ teamCount, layout })` | Khởi tạo bảng điểm (topbar hoặc sidebar) |
| | `updateScore(teamId, delta)` | Cộng/trừ điểm và tự phát âm thanh |
| | `penalizeTeam(teamId, amount)` | Phạt mất trật tự (trừ điểm + còi hú + thông báo) |
| | `renderRankings('rankings-list')` | Tự động tính điểm và vinh danh Quán quân 🥇, Á quân 🥈... |
| **Học sinh** | `Khoi5Students.loadStudents('5_2')` | Nạp danh sách học sinh từ file JSON theo lớp |
| | `Khoi5Students.getRandomStudent(teamId)` | Gọi ngẫu nhiên một học sinh đại diện dãy |
| | `getStudentDisplayName(st)` | Rút gọn họ tên đẹp mắt |
| **Túi mù** | `openGacha(targetTeamId)` | Mở bảng 4 túi mù cho học sinh bốc thăm may mắn |
| | `closeGacha()` | Đóng bảng túi mù |
| **Tiện ích** | `toast('Nội dung', 2500, 'var(--mint)')` | Thông báo nổi trên đầu màn hình |
| | `flashStage(isCorrect)` | Chớp viền màn hình xanh lá (đúng) hoặc đỏ (sai) |
| | `triggerConfetti()` | Bắn pháo hoa giấy chúc mừng |
| | `exportExcel('filename.xlsx', ...)` | Xuất kết quả bài học ra file Excel |

---

## 💡 Soạn Bài Mới Siêu Nhanh
Khi cần soạn bài cho các tiết tiếp theo (`tiet-08` đến `tiet-35`):
1. Copy file `khoi-5/shared/template.html` vào thư mục của tiết cần làm (ví dụ: `khoi-5/tiet-08/index.html`).
2. Mở file và chỉnh sửa tên bài, nội dung vở ghi bài và các câu hỏi thử thách.
3. Toàn bộ logic giao diện, bảng điểm, âm thanh, học sinh và túi mù đã hoạt động tự động!

