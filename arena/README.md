# 🏆 HỆ THỐNG ĐẤU TRƯỜNG TIN HỌC TOÀN TRƯỜNG (`arena/`)
> **Phân khu:** Minigame Đua Top Bảng Vàng Toàn Trường  
> **Trạng thái:** Độc lập hoàn toàn với slide bài học (`khoi-1` - `khoi-5`) và mini-games hỗ trợ tiết dạy (`games/`).  
> **Kiến trúc:** 100% Offline-First & Đồng bộ Google Sheets qua Google Apps Script Web App.

---

## 🎯 1. NGUYÊN TẮC THIẾT KẾ CỐT LÕI

1. **Phân tách ranh giới độc lập:**
   * Không sửa đổi thư mục `games/` và hệ thống bài giảng `khoi-1` - `khoi-5` (trang chủ gốc `index.html` đã được gỡ bỏ). Không tự ý gắn link dẫn từ `games/` hay bài giảng sang `arena/`.
   * Toàn bộ mã nguồn minigame mới nằm gọn trong `arena/`.
2. **Kế thừa bộ lõi dùng chung (`arena/shared/`):**
   * `config.js`: Lưu cấu hình tập trung (`GAS_ENDPOINT`, `CSV_LEADERBOARD_URL`, `SECRET_SALT`, `SCHOOL_YEAR`).
   * `student-picker.js`: Chọn Khối -> Lớp -> Tên học sinh từ `assets/data/students_${khoi}_${SCHOOL_YEAR}.json`, giữ nguyên hậu tố `(1)`, `(2)`, hỗ trợ `?khoi=X`, lưu `sessionStorage`.
   * `rank-api.js`: Nộp điểm có chữ ký SHA-256 (`ten + lop + gameId + score + SECRET_SALT`), gửi POST `text/plain` tránh CORS preflight OPTIONS, Optimistic UI qua `localStorage`.
   * `rank-board.js`: Bục vinh danh Top 3 🥇🥈🥉, bộ lọc Toàn Trường / Khối / Lớp, highlight học sinh đang đăng nhập.
   * `arena.css`: CSS dùng chung với font nội bộ `Baloo 2` và `Be Vietnam Pro` từ `assets/fonts/`.

---

## 📅 2. QUY CHUẨN ĐÓNG SỔ THEO NĂM HỌC (SEASON RESET & ARCHIVE PROTOCOL)

> ⚠️ **QUY TẮC BẮT BUỘC:** Tuyệt đối **KHÔNG load chung điểm số giữa các năm học vào cùng một bảng xếp hạng**, mà coi mỗi năm học là **MỘT MÙA GIẢI (SEASON) ĐỘC LẬP**.

### 2.1 Ba lý do thực tế bắt buộc phải đóng sổ:
1. **Lệch khối & lớp:** Học sinh lớp 3/2 năm nay sang năm sẽ lên lớp 4/x, còn học sinh lớp 5 thì đã ra trường. Nếu dồn chung thì bảng xếp hạng năm mới vẫn hiện tên các anh chị lớp 5 đã tốt nghiệp hoặc điểm cũ từ hồi còn học lớp dưới.
2. **Mất động lực đua top:** Học sinh đầu năm vào chơi thấy Top 1 toàn điểm kỷ lục tích lũy từ năm ngoái của các anh chị khóa trước sẽ nản lòng, không còn hào hứng cày điểm nữa.
3. **Nặng file CSV theo thời gian:** Nếu dồn điểm qua nhiều năm, file Google Sheets sẽ phình lên hàng chục nghìn dòng, làm chậm tốc độ tải CSV và làm đơ trình duyệt của học sinh.

---

### 2.2 Quy trình 2 phút "Đóng sổ mùa giải" vào đầu tháng 9 hằng năm:

#### Bước 1: Thao tác trên Google Drive / Google Sheets
* **Cuối năm học (Tháng 5):** Nhân bản (Duplicate) file Google Sheet hiện tại thành một bản lưu trữ, ví dụ: `Rank_TinHoc_2026_2027` để lưu giữ kỷ niệm, tổng kết thi đua và phát thưởng.
* **Đầu năm học mới (Tháng 9):** Mở file Google Sheet đang chạy chính thức, **xóa sạch dữ liệu cũ trong tab `Raw_Scores`** (chỉ chừa lại hàng 1 tiêu đề cột).
  * *Lợi ích:* Giữ nguyên cấu trúc cột và code Apps Script bên trong, **KHÔNG CẦN deploy lại URL Web App mới**, `GAS_ENDPOINT` vẫn giữ nguyên 100%!

#### Bước 2: Thao tác trên GitHub Pages (`arena/shared/config.js`)
* Đổi biến niên khóa sang năm học mới:
  ```javascript
  SCHOOL_YEAR: '2027_2028',
  ```
* Bỏ bộ file dữ liệu học sinh mới `students_X_2027_2028.json` (Khối 1 đến Khối 5) vào thư mục `assets/data/`.

---

### 2.3 Mở rộng: Khu Vực Vinh Danh Lưu Trữ (Hall of Fame / Archive)
Khi triển khai tính năng lưu trữ lịch sử:
* Tại trang chủ `arena/index.html`, có thể bố trí thêm một nút nhỏ hoặc dropdown:
  **"🏛️ Bảng Vàng Mùa Cũ (Lưu trữ 2026–2027)"**
* Nút này sẽ nạp link CSV từ file Google Sheet năm cũ đã đóng sổ (được Publish to web riêng).
* Bảng xếp hạng chính thức (`current season`) thì **luôn luôn reset trắng 100%** theo từng năm học để đón chào lứa học sinh mới đua tài!

---

## 🌟 3. HỆ THỐNG 2 TẦNG BẢNG XẾP HẠNG (2-TIER LEADERBOARD SYSTEM)

Do thang điểm của mỗi minigame hoàn toàn khác nhau (ví dụ: game gõ phím tính theo WPM tầm 15–50 điểm, còn game bắn phi thuyền hay giải đố có thể lên tới 5.000–10.000 điểm), hệ thống **tuyệt đối không cộng gộp điểm thô**, mà chia thành **2 tầng bảng xếp hạng** thông minh từ **1 file CSV duy nhất**:

### 3.1 Tầng 1: Bảng Rank riêng của từng Game (Single-Game Leaderboard)
* **Vị trí hiển thị:** Ngay trong màn hình kết thúc của game đó hoặc nút `[🏆 Bảng Vàng]` trên topbar của game.
* **Nguyên tắc High Score:** Dữ liệu lọc đúng theo `GameID`. Hệ thống **chỉ lấy Điểm cao nhất (High Score)** của mỗi học sinh trong game đó để xếp hạng (triệt tiêu tình trạng một em cày 30 ván cộng dồn điểm để vượt bạn khác).
* **Bộ lọc 3 cấp:** Học sinh dễ dàng chuyển tab ngay tại chỗ: **🌐 Toàn Trường** | **🏫 Theo Khối** | **🎒 Theo Lớp mình**.

### 3.2 Tầng 2: Bảng Vàng Tổng Hợp Toàn Trường (All-Game Hall of Fame)
* **Vị trí hiển thị:** Trang cổng `arena/index.html`.
* **Cơ chế Quy đổi Sao Danh Vọng (Arena Stars ⭐):**
  Thay vì cộng điểm thô, hệ thống tự động quy đổi thứ hạng đạt được ở từng minigame thành **Sao Danh Vọng**:
  * 🥇 **Top 1:** Thưởng **100 ⭐**
  * 🥈 **Top 2:** Thưởng **80 ⭐**
  * 🥉 **Top 3:** Thưởng **60 ⭐**
  * 🌟 **Top 4 – 5:** Thưởng **40 ⭐**
  * 🎖️ **Top 6 – 10:** Thưởng **25 ⭐**
  * 🎮 **Tham gia hoàn thành:** Thưởng **10 ⭐**
* **Ý nghĩa sư phạm:** 
  * Tạo sự công bằng tuyệt đối giữa các game có thang điểm chênh lệch.
  * Kích thích học sinh không chỉ cày 1 game mà tích cực vào chơi thử thách đều tất cả các minigames trong trường để gom nhiều Sao nhất.

### 3.3 Kiến trúc Google Sheets & CSV Duy Nhất (Single Source of Truth)
* Trên Google Sheets, chỉ cần **1 tab `Leaderboard` chung** có cột `GameID` được Publish ra 1 link CSV duy nhất:
  ```excel
  =QUERY(Raw_Scores!A:G, "SELECT B, C, D, E, MAX(F) WHERE B IS NOT NULL AND B != 'Họ và Tên' GROUP BY B, C, D, E ORDER BY E, MAX(F) DESC LABEL B 'Họ và Tên', C 'Lớp', D 'Khối', E 'Mã Game', MAX(F) 'Điểm Số'")
  ```
* Khi tải CSV về trình duyệt:
  * Khi gọi `RankAPI.fetchLeaderboard({ gameId: 'speed_click' })`: Frontend tự lọc các dòng của game đó và xếp hạng High Score.
  * Khi gọi `RankAPI.fetchLeaderboard({ gameId: 'overall' })`: Frontend tự tính toán ma trận Sao Danh Vọng của từng em qua tất cả các game.
  * Sau này có thêm 20–30 minigames mới thì hệ thống **hoàn toàn tự động co giãn**, không cần sửa backend hay tạo thêm tab Sheet mới!

---

## 🚀 4. HƯỚNG DẪN NHÂN BẢN MINIGAME MỚI

Khi muốn tạo một game mới đua top trong `arena/`:
1. Sao chép thư mục `arena/_template/` thành `arena/<ten-game-moi>/` (ví dụ `arena/ban-tao/`).
2. Mở file `arena/<ten-game-moi>/game.js`, đổi hằng số:
   ```javascript
   const GAME_ID = 'ban_tao'; // Mã duy nhất không dấu
   ```
3. Khai báo thêm game vào danh mục `GAMES` trong `arena/shared/config.js`.
4. Viết luật chơi, tính điểm và gọi:
   ```javascript
   RankAPI.submit({ gameId: GAME_ID, score: finalScore, meta: { ... } });
   ```
5. Khi người chơi muốn xem xếp hạng, gọi:
   ```javascript
   RankBoard.showModal({ gameId: GAME_ID, title: 'BẢNG VÀNG: ...' });
   ```
