# Antigravity & Gemini Workspace Rules

Tất cả chỉ thị bắt buộc và quy chuẩn kỹ thuật/sư phạm của repo này được quy định đầy đủ tại:
👉 **[AGENTS.md](./AGENTS.md)** và **[STANDARDS.md](./STANDARDS.md)**.

Mọi AI Agent khi làm việc trong workspace này bắt buộc phải nạp và tuân thủ tuyệt đối các nguyên tắc trong hai tệp trên.

---

## 🏆 QUY CHUẨN PHÁT TRIỂN PHÂN KHU ĐẤU TRƯỜNG TOÀN TRƯỜNG (`arena/*`)

### 1. Phân Tách Ranh Giới Độc Lập
* Phân khu `arena/` hoạt động hoàn toàn độc lập với hệ thống slide bài học (`khoi-1` đến `khoi-5`) và mini-games hỗ trợ tiết dạy (`games/`).
* **TUYỆT ĐỐI KHÔNG SỬA ĐỔI:** Giữ nguyên 100% thư mục `games/` và hệ thống bài giảng `khoi-1` đến `khoi-5` khi phát triển `arena/` (trang chủ gốc `index.html` đã được gỡ bỏ). Không tự ý gắn link từ `games/` hay bài giảng sang `arena/`.
* Mọi minigame đua top toàn trường mới đều phải nằm gọn trong thư mục con của `arena/` (ví dụ: `arena/_template/`, `arena/speed-click/`...).
* Code backend của hệ thống đua top nằm tập trung tại `backend-gas/Code.gs`.

### 2. Kế Thừa Bộ Lõi Dùng Chung (`arena/shared/`)
Mọi minigame trong `arena/` BẮT BUỘC phải nhúng và sử dụng các thư viện chuẩn trong `arena/shared/`:
* `arena/shared/config.js`: Lưu trữ tập trung `GAS_ENDPOINT`, `CSV_LEADERBOARD_URL`, `SECRET_SALT`, `SCHOOL_YEAR`.
* `arena/shared/student-picker.js`: Component chọn học sinh Khối -> Lớp -> Tên học sinh từ `assets/data/students_${khoi}_${SCHOOL_YEAR}.json`.
  - Giữ nguyên 100% hậu tố trùng tên `(1)`, `(2)`.
  - Hỗ trợ tham số URL `?khoi=X` để tự động chọn khối.
  - Lưu vào `sessionStorage` để học sinh chỉ cần chọn 1 lần duy nhất khi chơi nhiều minigame.
* `arena/shared/rank-api.js`:
  - `RankAPI.submit({ gameId, score, meta })`: Tự động lấy học sinh từ `StudentPicker`, tạo chữ ký băm SHA-256 từ `ten + lop + gameId + score + SECRET_SALT` (Web Crypto API).
  - Gửi POST với `Content-Type: text/plain` (JSON stringified bên trong) lên `GAS_ENDPOINT` để triệt tiêu lỗi CORS preflight với Google Apps Script.
  - Lưu tạm điểm vào `localStorage` (Optimistic UI) để giao diện hiển thị ngay lập tức.
  - `RankAPI.fetchLeaderboard({ gameId, scope, filterValue })`: Tải CSV từ `CSV_LEADERBOARD_URL` (kèm `?t=Date.now()`), tự động trộn với điểm Optimistic trong `localStorage` để bù trừ độ trễ 3-5 phút của Google CDN.
* `arena/shared/rank-board.js`: Component render Bảng vàng danh dự với bục Top 3 🥇🥈🥉, tab lọc Toàn Trường / Khối / Lớp, và highlight học sinh đang đăng nhập.
* `arena/shared/arena.css`: CSS dùng chung, nạp font ngoại tuyến `Baloo 2` và `Be Vietnam Pro` từ `assets/fonts/`.

### 3. Backend Google Apps Script (`backend-gas/Code.gs`)
* Sử dụng `LockService.getScriptLock()` với thời gian chờ 30 giây để chống xung đột race-condition khi cả phòng 40 máy nộp điểm cùng lúc.
* Kiểm tra chữ ký SHA-256 khớp tuyệt đối mới cho phép `appendRow` vào tab `Raw_Scores`.
* Tab `Leaderboard` trên Google Sheets sử dụng công thức `QUERY` / `MAX` để tổng hợp điểm cao nhất theo học sinh, sau đó Publish to web dưới dạng CSV.

### 4. Quy Trình Nhân Bản Minigame Mới
* Khi tạo một game mới đua top trong `arena/`:
  1. Sao chép toàn bộ thư mục `arena/_template/` thành thư mục game mới (ví dụ `arena/game-moi/`).
  2. Đổi hằng số `GAME_ID` trong `game.js` thành mã game mới duy nhất.
  3. Xây dựng luật chơi, tính điểm và gọi `RankAPI.submit({ gameId, score, meta })` khi hết giờ.

### 5. Quy Chuẩn Đóng Sổ Theo Năm Học (Season Reset & Archive Protocol)
* **Tuyệt đối KHÔNG load dồn điểm giữa các năm học:** Tránh lệch khối/lớp khi học sinh lên lớp hoặc ra trường, tránh làm học sinh mới mất động lực đua top, và tránh phình to dung lượng file CSV.
* **Mỗi năm học là một mùa giải (Season) độc lập:**
  - Đầu tháng 9 hằng năm: Nhân bản Google Sheets cũ lưu trữ (ví dụ `Rank_TinHoc_2026_2027`), xóa sạch dữ liệu tab `Raw_Scores` của file Sheet chính đang chạy (giữ nguyên cấu trúc cột và URL Web App).
  - Đổi biến `SCHOOL_YEAR` trong `arena/shared/config.js` sang năm học mới và nạp danh sách học sinh JSON mới.
  - Bảng rank chính thức luôn reset trắng 100% đầu năm; có thể mở rộng nút "Bảng Vàng Lưu Trữ" ở `arena/index.html` trỏ về CSV của mùa cũ.
  - Xem tài liệu hướng dẫn chi tiết tại 👉 **[arena/README.md](./arena/README.md)**.

### 6. Quy Chuẩn 2 Tầng Bảng Xếp Hạng & Sao Danh Vọng (2-Tier Leaderboard)
* **Tầng 1 (Từng Game riêng biệt):** Lọc theo `gameId`, **chỉ lấy High Score (điểm cao nhất)** của mỗi học sinh để xếp hạng (Top Trường / Khối / Lớp). Tuyệt đối không cộng dồn nhiều ván chơi.
* **Tầng 2 (Bảng Vàng Tổng Hợp `arena/index.html`):** Tuyệt đối **không cộng điểm thô** giữa các game khác nhau (do lệch thang điểm). Hệ thống tự động **quy đổi thứ hạng từng game thành Sao Danh Vọng ⭐** (Top 1: 100⭐, Top 2: 80⭐, Top 3: 60⭐, Top 4-5: 40⭐, Top 6-10: 25⭐, tham gia: 10⭐) và cộng tổng Sao để vinh danh.
* **1 Nguồn Dữ Liệu Duy Nhất:** Google Sheets chỉ cần duy nhất 1 tab `Leaderboard` chung có cột `GameID` xuất ra 1 file CSV. Frontend `RankAPI` tự động phân tách và tính toán theo `gameId`.




