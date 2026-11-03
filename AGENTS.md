# BỘ QUY CHUẨN & CHỈ THỊ BẮT BUỘC DÀNH CHO AI AGENT (AGENTS.md)
> **Dự án:** Slide bài giảng tương tác Tin học Tiểu học (Khối 1 - Khối 5) & Mini-games  
> **Áp dụng cho:** Tất cả các AI Agent (Antigravity, Claude Code, Cursor, Copilot...) khi thao tác, sửa đổi hoặc sinh mới bất kỳ bài giảng nào trong kho mã nguồn này.
> **Tính chất:** Tài liệu sống (Living Document) — Sẵn sàng tiếp nhận cập nhật, bổ sung quy tắc mới từ Giáo viên bất cứ lúc nào.

---

## 🎯 1. NGUYÊN TẮC TỐI THƯỢNG (THE PRIME DIRECTIVES)

Mọi mã nguồn do AI sinh ra hoặc chỉnh sửa BẮT BUỘC phải tuân thủ tuyệt đối các nguyên tắc sau:

### 1. 100% "Offline-First" — TUYỆT ĐỐI CẤM CDN NGOÀI
* **CẤM:** Không được nhúng bất kỳ thư viện bên ngoài nào qua CDN (ví dụ: `cdnjs`, `jsdelivr`, `unpkg`, `xlsx.full.min.js`, `canvas-confetti`, FontAwesome...).
* **LÝ DO:** Phòng máy tính trường tiểu học thường xuyên mất mạng hoặc tường lửa chặn CDN. Trang web phải mở bằng file trực tiếp (`file:///...`) và hoạt động trơn tru 100% khi không có internet.
* **GIẢI PHÁP NỘI BỘ:**
  * Xuất CSV: Dùng thuần JavaScript có sẵn trong `shared/js/core.js`.
  * Hiệu ứng pháo hoa Confetti: Dùng Canvas HTML5 nội bộ (tham khảo mẫu Khối 2 Tiết 09).
  * Âm thanh (SFX): Dùng 100% Web Audio API synthesizer sinh sóng âm, không dùng file `.mp3` ngoài.
  * Font chữ & Google Material Symbols: Lưu trữ 100% offline file `.woff2` tại `assets/fonts/` và nạp qua `shared/css/core.css`. Tuyệt đối không dùng CDN font ngoài và không để thiếu font làm rơi về font mặc định Segoe UI.

### 2. An toàn & Chống mất dữ liệu (`prevent-reload`)
* Mọi file HTML của tiết học bắt buộc phải nhúng file bảo vệ trong thẻ `<head>`:
  ```html
  <script src="../../shared/js/prevent-reload.js"></script>
  <script src="../../shared/js/core.js"></script>
  ```
* Hệ thống tự động chặn: `F5`, `Ctrl+R`, `Alt+Mũi tên`, `Backspace` ngoài ô nhập, và chuột phải.
* Khi giáo viên chủ động muốn làm lại/tải lại trang: Phải gọi hàm `window.allowPageReload()` trước khi gọi `location.reload()`.

### 3. Quy chuẩn Ghi bài: Xé nhỏ theo từng chặng (Progressive Chunking)
* **Slide 1 (Đầu giờ):** 
  * Chỉ hiển thị **Khung tiêu đề tối giản** gồm: Thứ ngày tháng Tiếng Việt tự động (`updateVietnameseDate()`) + Môn: *Tin học* + *Tên bài học*.
  * CẤM bắt học sinh ghi chép dài dòng vào đầu giờ. Học sinh chỉ ghi đúng 1 dòng thứ ngày và tên bài để ổn định lớp.
* **Xuyên suốt tiết học (Sau mỗi hoạt động khám phá/thực hành):**
  * Tách nhỏ kiến thức cần nhớ thành các thẻ ghi nhớ ngắn gọn (`.memo-card` / `.note-box`).
  * Mỗi thẻ chỉ chứa **1–2 câu ngắn, in đậm từ khóa**. Học sinh thực hành xong mới mở thẻ này để ghi nhanh 1 dòng vào vở.

### 4. Vòng đời Gọi tên (Turn Lifecycle: Picked ≠ Done) & Cơ chế Gacha
Trạng thái học sinh tuân theo chu trình 3 bước:
$$\text{Chờ (Waiting)} \xrightarrow{\text{Bốc thăm Gacha / Chọn}} \text{Lên máy (Staged)} \xrightarrow{\text{Thực hiện xong}} \text{Đã hoàn thành (Done)}$$
* **Nguyên tắc "Chọn là chọn, làm xong mới tính" (Picked ≠ Done):**
  * Gacha bản chất là thao tác chọn (select) ngẫu nhiên một em và **bật Pop-up siêu to (Giant Modal)** lên màn chiếu để cả lớp cùng thấy và hào hứng.
  * **KHÔNG tạo thêm nút "Đổi em khác" rườm rà:** Nếu học sinh được gọi vắng mặt, chưa sẵn sàng, hoặc chưa thuộc tổ đang đến lượt: Giáo viên chỉ cần **bấm lại nút Gacha** để hệ thống quay tiếp ra tên em khác.
  * Việc bấm Gacha nhiều lần không làm mất lượt của học sinh. Học sinh chỉ chính thức chuyển sang danh sách **Đã hoàn thành (Done)** và ghi nhận vào lịch sử / CSV khi đã **nhập đáp án, tấn công, hoàn thành bài, hoặc giáo viên bấm Xác nhận**.
* **Ứng dụng linh hoạt theo chế độ:**
  * **Chế độ Toàn lớp / Cá nhân:** Bấm Gacha để quay ngẫu nhiên cả lớp, ưu tiên em chưa tham gia.
  * **Chế độ Thi đua Theo Tổ:** Vẫn cho dùng Gacha bình thường. Giáo viên bấm nút Gacha liên tục cho đến khi quay trúng tên một em thuộc Tổ đang tới lượt thì dừng lại và chốt em đó lên bảng.

### 5. Bộ đo lường hành vi (Telemetry) theo Vai trò người điều khiển (`Actor-based`)
* **Trường hợp A: Học sinh trực tiếp thao tác trên máy (`Actor: Student`)**
  * Bật toàn bộ cảm biến Telemetry: Bấm trượt (misclicks), nhầm chuột phải, spam click, thời gian di chuột (giây), phím chữ sai trong ô số, số lần xóa sửa (backspace).
  * Tự động tính toán xếp loại Thông tư 27 (**T** - Hoàn thành tốt, **H** - Hoàn thành, **C** - Chưa hoàn thành) và tự sinh câu nhận xét SMAS sư phạm.
* **Trường hợp B: Giáo viên điều khiển máy / Đấu theo tổ (`Actor: Teacher`)**
  * **Vô hiệu hóa việc đếm thao tác vật lý** (không đếm click trượt/phím sai của giáo viên).
  * Chỉ track nhật ký sư phạm: Tổ nào, Em nào trả lời, Câu hỏi, Đúng/Sai, Thời gian suy nghĩ, Biến động điểm (+/-), Đánh giá.

### 6. Xuất Báo cáo CSV Chuẩn UTF-8 có BOM (`\uFEFF`) & Đảo thứ tự thời gian Sort
* **100% CSV UTF-8 có BOM (`\uFEFF`)**, không dùng định dạng `.xlsx`.
* **Cú pháp tên file chuẩn theo thứ tự Năm-Tháng-Ngày-Giờ-Phút-Giây (Dễ sort trong thư mục):**
  ```text
  KetQua_TinHoc{Khoi}_Lop_{Lop}_Tiet_{Tiet}_Ngay_{YYYY}-{MM}-{DD}_{HH}h{MM}p{SS}s.csv
  ```
  *(Ví dụ: `KetQua_TinHoc2_Lop_2-2_Tiet_09_Ngay_2026-11-03_16h45p10s.csv`)*
  * **Lợi ích:** Tên file tự động sắp xếp theo thứ tự thời gian từ cũ đến mới (hoặc mới đến cũ) khi sắp xếp theo Tên (Name) trong Windows File Explorer hoặc Google Drive.
* **Cấu trúc multi-section:** Phân chia các sheet/bảng bằng dòng tiêu đề `=== TÊN PHẦN ===`.
* **Cơ chế gửi:** Sử dụng hàm `window.uploadCsvToDrive(data, fileName)` gửi ngầm lên Google Apps Script Web App. Nếu mất mạng hoặc lỗi kết nối, hệ thống **tự động fallback** tải file CSV trực tiếp về máy giáo viên.

### 7. Dữ liệu Học sinh Đồng bộ Toàn Trường
* Nạp tự động từ thư mục dữ liệu gốc:
  `../../assets/data/students_{khoi}_2026_2027.json` (hoặc đường dẫn tương đối phù hợp).
* Luôn có biến dự phòng `FALLBACK_STUDENTS` trong code để đề phòng trường hợp mở file HTML độc lập bị chặn chính sách CORS.
* Luôn cung cấp Modal hoặc ô cho giáo viên thêm nhanh/bổ sung học sinh vãng lai khi cần.

### 8. Định danh Typography & Bản sắc theo từng Khối (Grade Identity)
Sự khác biệt giữa các khối là **chủ đích thiết kế**, nhưng **TRONG CÙNG MỘT KHỐI PHẢI ĐỒNG NHẤT 100%**:

| Khối | Font chữ Bắt buộc | Bảng màu chủ đạo | Bố cục chuẩn |
| :--- | :--- | :--- | :--- |
| **Khối 1** | `'Baloo 2', 'Nunito', sans-serif` | Cam tươi (`#f97316`), Vàng chanh, Xanh lá | Sân khấu chính + Sidebar mini học sinh |
| **Khối 2** | `'Nunito', sans-serif` | Xanh dương (`#0284c7`), Đỏ chiến đấu, Vàng sao | Slide cuộn flexbox + Bottom Navbar chân trang |
| **Khối 3** | `'Quicksand', sans-serif` | Xanh tím (`#4361ee`), Vàng cam (`#ffb703`), Xám vỏ PC | 2 cột: Màn hình chính (`.main`) + Sidebar ráp PC |
| **Khối 4** | `'Be Vietnam Pro', sans-serif`| Xanh Navy (`#14213d`), Trắng ngà, Cam đất | Header tab trên đỉnh + Grid 2 cột |
| **Khối 5** | `'Be Vietnam Pro', sans-serif`| Xanh ngọc Mint (`#16b89a`), Xanh dương, Xám đậm | Web Components chuẩn Tiết 07 (`<khoi5-...>`) |

* Khi code bài mới cho Khối X, BẮT BUỘC dùng đúng font và style của Khối X. Tuyệt đối không lấy style Khối này cắm vào Khối kia.

### 9. Kích thước & Tối ưu Màn chiếu TV Lớp học
* **Tiêu đề Slide:** `2.4rem` – `3.5rem` (đậm `800`–`900`), nhìn rõ từ khoảng cách 8 mét cuối lớp.
* **Chữ nội dung:** `1.3rem` – `1.6rem` (độ đậm tối thiểu `600`–`700`).
* **Nút bấm / Thao tác:** Tối thiểu `1.2rem` – `1.5rem`, có hiệu ứng hover và active nhún nút rõ ràng.
* **Chân trang:** Bắt buộc có khoảng đệm chân trang (`padding-bottom: 120px` đến `140px`) để không bao giờ bị thanh điều hướng che khuất nội dung.
* **Tỷ lệ:** Thiết kế co giãn linh hoạt (responsive flex), tối ưu cho tỷ lệ 16:9 của TV lớp học (độ phân giải 1366x768 hoặc 1920x1080).

### 10. Chuẩn đặt tên LocalStorage — Tránh xung đột
Key lưu trạng thái tiết học vào `localStorage` phải tuân theo cú pháp an toàn:
```javascript
const STORAGE_KEY = `bgtieu_hoc_k${grade}_tiet_${lesson}_${classId}_state`;
// Ví dụ: bgtieu_hoc_k2_tiet_09_2-2_state
```
Tuyệt đối không dùng tên chung chung như `state`, `game_data`, `tv_data` gây ghi đè dữ liệu giữa các bài giảng khác nhau.

### 11. Quyền kiểm soát dữ liệu đã lưu
* Bất kỳ bài học hoặc mini-game nào lưu dữ liệu học tập/trạng thái vào `localStorage` hoặc `sessionStorage` phải có nút **Xóa dữ liệu đã lưu** dễ tìm để giáo viên chủ động làm mới.
* Nút phải chỉ xóa các key do chính bài học/game đó quản lý; không được gọi `localStorage.clear()` hoặc xóa dữ liệu của bài khác.
* Trước khi xóa, cần xác nhận rõ thao tác; sau khi xóa, cập nhật giao diện/trạng thái phù hợp và thông báo kết quả.
* Nếu dữ liệu lưu tự động, giao diện cần giúp giáo viên nhận biết rằng có dữ liệu phiên đang được lưu.

### 12. Điểm Khởi Đầu Mặc Định 1000đ (Base Score)
* **Phạm vi áp dụng:** Chỉ setup ở những tiết học hoặc mini-game có hệ thống tính điểm thi đua (đấu tổ, trả lời câu hỏi cộng/trừ điểm, đấu trường đối kháng, minigame cá cược/mua sắm...). KHÔNG áp dụng gượng ép cho các tiết thuần túy tích lũy linh kiện, checkbox hay bài tập đúng/sai không dùng thang điểm số.
* **Giá trị mặc định:** `const STARTING_SCORE = 1000;` (mỗi tổ hoặc học sinh bắt đầu với 1000 điểm sàn).
* **Mục đích sư phạm:**
  * Tạo tâm lý phấn khởi, tự tin ngay từ đầu giờ học ("mỗi đội đều có sẵn vốn 1000 điểm năng lượng/khởi nghiệp").
  * **Chống điểm âm:** Khi học sinh bị trừ điểm hoặc phạt vi phạm (-20đ, -50đ, -100đ...), tổng điểm vẫn giữ ở mức dương, không làm các em nản lòng hay tự ti.
  * Giáo viên luôn có công cụ can thiệp nhanh (+/- điểm, reset về 1000đ) để điều tiết nhịp độ lớp học linh hoạt.

### 13. Cơ Chế Xếp Rank Đồng Hạng & Vinh Danh Công Bằng (Tie-Ranking)
* **Ý nghĩa sư phạm:** Học sinh tiểu học rất nhạy cảm với việc phân định thứ hạng. Khi các tổ hoặc học sinh bằng điểm nhau, **TUYỆT ĐỐI CẤM** dùng thứ tự ngẫu nhiên hoặc chỉ số mảng để ép một bên xuống hạng dưới.
* **Quy chuẩn Xếp hạng & Vinh danh (Standard Competition Ranking):**
  * Sắp xếp danh sách điểm giảm dần (`sort((a, b) => b.score - a.score)`).
  * Nếu điểm của tổ hiện tại bằng điểm tổ trước đó $\to$ giữ nguyên thứ hạng (`rank`), không tăng thứ hạng giả tạo.
  * Khi có từ 2 đội trở lên cùng điểm số, tự động chuyển danh hiệu vinh danh sang thể thức **ĐỒNG HẠNG**:
    * Cùng điểm cao nhất: **"ĐỒNG QUÁN QUÂN"** (cùng nhận cúp vàng 🥇, banner vinh danh ghi rõ tên cả hai tổ: `🏆 ĐỒNG QUÁN QUÂN: TỔ 1 & TỔ 2 (CÙNG ĐẠT 1050 ĐIỂM)! 🏆`).
    * Bằng điểm thứ nhì: **"ĐỒNG Á QUÂN"** 🥈.
    * Bằng điểm thứ ba: **"ĐỒNG HẠNG BA"** 🥉.
    * Các thứ hạng sau: **"KHUYẾN KHÍCH"** 🌟 / **"NỖ LỰC"** 🎖️.
* **Đồng bộ Báo cáo CSV:** Bảng xếp hạng trong file CSV phải có cột *"Đồng Hạng"* (`Có (Đồng điểm)` / `Không`) và hiển thị thứ hạng chuẩn (`Hạng 1`, `Hạng 1`, `Hạng 3`...), tuyệt đối không phân biệt đối xử khi bằng điểm.

---

## 🛠️ 2. QUY TRÌNH 5 BƯỚC KHI TẠO HOẶC CHỈNH SỬA TIẾT HỌC MỚI

Khi nhận được yêu cầu viết tiết học mới từ người dùng (ví dụ: *"Tạo Tiết 10 Khối 2: Bài 7 - ..."*), AI phải thực hiện đúng 5 bước:

1. **Bước 1 — Xác định Khối & Bản sắc:** Đọc bảng ở Mục 1.8 để chọn đúng Font chữ, Theme CSS, và Bố cục của Khối đó.
2. **Bước 2 — Nạp Khung sườn Chuẩn (Boilerplate):** 
   * Kiểm tra xem khối đó đã có `template.html` chưa. Nếu có, nhân bản từ `template.html` của khối.
   * Chèn đúng 2 file bảo vệ: `../../shared/js/prevent-reload.js` và `../../shared/js/core.js`.
3. **Bước 3 — Nạp Dữ liệu Học sinh & Thiết lập Chế độ:**
   * Trỏ đúng file JSON `../../assets/data/students_{khoi}_2026_2027.json`.
   * Xác định tiết này là **Chế độ Toàn lớp cá nhân** (gacha tự động, bật full telemetry) hay **Chế độ Đấu theo tổ** (chọn tên thủ công, ghi log sư phạm).
   * **Nếu tiết học có tính điểm:** Khởi tạo điểm sàn mặc định `STARTING_SCORE = 1000` và tích hợp hàm tính thứ hạng xử lý đồng hạng (`calculateRankings`).
4. **Bước 4 — Thiết kế Nội dung Slide & Ghi bài chặng:**
   * Slide 1: Khung tiêu đề ngày tháng Tiếng Việt tự động + Tên bài.
   * Các slide khám phá/trò chơi: Nội dung sinh động, kích thước chữ lớn, chia các thẻ ghi nhớ nhỏ gọn (1-2 dòng) ở cuối mỗi phần.
5. **Bước 5 — Tích hợp Xuất Báo cáo CSV:**
   * Gắn nút xuất CSV / Đồng bộ Drive ở màn hình tổng kết sử dụng `window.LessonExport` hoặc `window.uploadCsvToDrive` (đảm bảo bảng xếp hạng thể hiện đúng cơ chế đồng hạng).

---

## 📋 3. BẢNG TỰ KIỂM TRA TRƯỚC KHI BÀN GIAO (PRE-FLIGHT CHECKLIST)

Trước khi gửi phản hồi hoàn thành cho Giáo viên, AI phải tự rà soát:
- [ ] Không có link CDN bên ngoài nào (`cdnjs`, `jsdelivr`, `unpkg`,...) trong mã nguồn?
- [ ] Đã nhúng `prevent-reload.js` và `core.js` chưa?
- [ ] Font chữ có đúng chuẩn của Khối đó không?
- [ ] Slide 1 có ngày tháng Tiếng Việt và không bị nhồi nhét quá nhiều chữ ghi bài?
- [ ] Logic gọi tên có đảm bảo nguyên tắc: *Trả lời xong mới tính là hoàn thành* (Picked ≠ Done)?
- [ ] Cảm biến đo thao tác (Telemetry) có đặt đúng ngữ cảnh (chỉ bật khi học sinh trực tiếp bấm máy)?
- [ ] Điểm khởi đầu mặc định có được thiết lập 1000đ (đối với các tiết/game có hệ thống tính điểm) không?
- [ ] Bảng xếp hạng và xuất CSV có cơ chế xử lý đồng hạng (bằng điểm $\to$ cùng hạng, cùng cúp/huy chương, danh hiệu "Đồng Quán quân / Đồng Á quân") không?
- [ ] Tên file CSV xuất ra có đúng quy cách `KetQua_TinHoc{Khoi}_Lop_{Lop}_Tiet_{Tiet}...` không?
- [ ] Key LocalStorage có tiền tố `bgtieu_hoc_k{Khoi}_...` không?
- [ ] Mọi nơi dùng LocalStorage/SessionStorage có nút xóa dữ liệu đúng phạm vi, có xác nhận và thông báo không?

---

## 🔄 4. GIAO THỨC CẬP NHẬT QUY CHUẨN (LIVING DOCUMENT PROTOCOL)

* `AGENTS.md` và `STANDARDS.md` là **Tài liệu sống**.
* Bất cứ khi nào Giáo viên nói: *"Cập nhật quy chuẩn mới...", "Thêm quy tắc...", "Đổi cách làm này..."*, AI Agent phải:
  1. Lắng nghe và xác nhận chính xác ý định sư phạm / kỹ thuật của Giáo viên.
  2. Lập tức cập nhật trực tiếp vào cả hai tệp `AGENTS.md` và `STANDARDS.md`.
  3. Áp dụng quy chuẩn mới này cho các tác vụ tiếp theo mà không cần nhắc lại.
