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

### 1. Quy cách đặt tên file chuẩn thống nhất (Đưa Ngày lên trước Giờ để tự động sort theo tên):
```text
KetQua_TinHoc{Khoi}_Lop_{Lop}_Tiet_{Tiet}_Ngay_{YYYY}-{MM}-{DD}_{HH}h{MM}p{SS}s.csv
```
- **Khối**: `1`, `2`, `3`, `4`, `5`.
- **Lớp**: Ký tự `/` hoặc `_` được chuẩn hóa thành `-` an toàn (ví dụ: `3/2` hay `3_2` thành `3-2`).
- **Tiết**: Định dạng 2 chữ số (ví dụ: `Tiet_06`, `Tiet_08`).
- **Ngày (Năm-Tháng-Ngày ISO)**: `Ngay_{YYYY}-{MM}-{DD}` (ví dụ: `Ngay_2026-10-31`, `Ngay_2026-11-03`).
- **Thời gian (Giờ-Phút-Giây 24h)**: `{HH}h{MM}p{SS}s` (ví dụ: `14h30p25s`, `16h45p10s`).
- *Lợi ích:* Tên file tự động sắp xếp theo thứ tự thời gian từ cũ đến mới (hoặc mới đến cũ) khi sắp xếp theo Tên (Name) trong Windows File Explorer hoặc Google Drive.
- *Ví dụ mẫu:*
  - `KetQua_TinHoc2_Lop_2-2_Tiet_09_Ngay_2026-11-03_16h45p10s.csv`
  - `KetQua_TinHoc3_Lop_3-2_Tiet_06_Ngay_2026-10-31_14h30p25s.csv`
  - `KetQua_TinHoc5_Lop_5-1_Tiet_07_Ngay_2026-10-31_09h15p40s.csv`

### 2. Các hàm dùng chung (Đã tích hợp trong `shared/js/core.js`, `shared/js/prevent-reload.js` và `components.js` của từng khối):
- **`window.buildExportFileName({ grade, classId, lesson, prefix, ext })`**: Sinh tên file chuẩn theo quy cách trên.
- **`window.exportToCsv(data, fileName, options)`**: Xuất dữ liệu bảng hoặc dữ liệu nhiều phần (multi-section) ra file CSV UTF-8 có BOM.
- **`window.uploadCsvToDrive(data, fileName, options)`**: Gửi Base64 CSV đồng bộ về Google Apps Script Web App và Google Drive, tự động fallback tải file về máy giáo viên nếu offline.
- **`window.uploadExcelToDrive`**: Bridge tương thích ngược, tự động gọi `uploadCsvToDrive` để đảm bảo không gãy code cũ.
- **Báo cáo nhiều bảng/sheet**: Được phân chia tự động và trực quan bằng tiêu đề `=== TÊN PHẦN ===`, mở tốt trên mọi phần mềm bảng tính.

---

## 📜 Ngân Hàng Câu Hỏi: Duy Nhất 1 File `quests.js` (Offline-First & DRY)

- Toàn bộ ngân hàng câu hỏi, thử thách, vụ án trắc nghiệm được tách riêng đặt tại **DUY NHẤT 1 file `quests.js`** (`window.QUESTS_DATA = [...]`) nằm ngay cạnh `index.html`.
- Bỏ hẳn file `quests.json` để triệt tiêu lỗi không đồng bộ dữ liệu (DRY) và tránh hoàn toàn lỗi chặn CORS khi mở bằng giao thức tệp `file:///...`.

---

## ⚡ Hệ thống Tự Động Lưu LocalStorage & Phục Hồi Khi Cúp Điện (Crash Recovery)

Phòng máy tính tiểu học thường xuyên gặp sự cố cúp điện đột ngột hoặc học sinh/giáo viên lỡ tắt tab trình duyệt. Hệ thống giải quyết triệt để:
1. **100% file HTML tự động lưu (Auto-Save)**:
   - Điểm số của từng tổ/học sinh, chuỗi thắng (dây streak), tiến trình slide/câu hỏi, danh sách học sinh đã gọi / còn lại, nhật ký telemetry được lưu ngay vào `localStorage` mỗi khi có thay đổi.
   - Cú pháp key độc nhất: `bgtieu_hoc_k{Khoi}_tiet_{Tiet}_{Lop}_state` (hoặc `bgtieu_hoc_game_{GameId}_state`).
2. **Tự động khôi phục (Resume Session)**:
   - Khi mở lại file HTML sau khi có điện lại hoặc mở lại trình duyệt, hệ thống tự động nhận diện phiên học dở dang và khôi phục toàn vẹn dữ liệu kèm Toast thông báo.
3. **Nút "Xóa dữ liệu phiên" (Clear Session) an toàn**:
   - Mọi file HTML đều có nút xóa dữ liệu đặt tại vị trí trực quan, có hộp thoại `confirm()` xác nhận trước khi xóa, và chỉ xóa đúng key của tiết đó (tuyệt đối không làm ảnh hưởng bài khác).

---

## ✏️ Cơ Chế Can Thiệp Sửa Điểm, Dây Thắng (Streak) Khi Bấm Nhầm

Để tránh tâm lý ức chế cho học sinh khi bấm nhầm chuột hoặc giáo viên cộng nhầm điểm:
1. **Sửa nhanh tại chỗ (Click-to-Edit)**: Nhấp trực tiếp vào số điểm hoặc chuỗi dây streak để nhập con số mong muốn.
2. **Bộ nút tăng/giảm nhanh**: Các nút `+50`, `+100`, `-50`, `-100` và nút reset về sàn 1000đ.
3. **Đồng bộ tự động tức thì**: Bảng xếp hạng (Rank, Đồng hạng Tie-Ranking), LocalStorage và báo cáo CSV tự động tính toán lại ngay khi điểm số được điều chỉnh.

---

## 🎓 Khung Kiến Trúc Sư Phạm & Trải Nghiệm Học Sinh Tiểu Học (Universal Primary Pedagogy & UX)

Áp dụng đồng bộ cho toàn bộ 5 khối (Khối 1 đến Khối 5) và 100% chủ đề bài học:
1. **Flow bài dạy 4 pha chuẩn mực**:
   - **Pha 1 — Khởi động & Tạo tâm thế (The Hook)**: Bắt đầu bằng tình huống có vấn đề, câu chuyện, câu đố hoặc minigame ngắn để học sinh *tự khám phá và phát biểu mục tiêu bài*, tuyệt đối không áp đặt lý thuyết ngay đầu giờ.
   - **Pha 2 & 3 — Khám phá & Thực hành có Chuyển tiếp mượt mà (Transitions)**: Bắt buộc có câu nối mang tính nhân quả/logic giữa các chặng bài học, duy trì dòng chảy nhận thức tự nhiên của trẻ.
   - **Pha 4 — Chốt kiến thức 5 phút cuối (Active Recall)**: Dành trọn 5 phút cuối tiết để học sinh tự nhớ lại và nói ra các bài học cốt lõi trước, giáo viên bổ sung và chốt thẻ ghi nhớ trước khi vinh danh. Luôn chuẩn bị đủ số lượng câu hỏi/lượt củng cố cho **TẤT CẢ các tổ đang chơi** để đảm bảo công bằng điểm số.
2. **Ghi chép tối giản nhận thức & CẤM Timer khi chép bài**:
   - Chỉ chép các từ khóa/công thức hành động cốt lõi nhất (sách giáo khoa đã in đầy đủ).
   - **TUYỆT ĐỐI CẤM** đặt đồng hồ đếm ngược (Timer) khi học sinh chép bài để tránh ức chế tâm lý và hoảng loạn.
   - Khung chép bài nền trắng tinh khiết, chữ siêu to, chuẩn 1 nút Zoom / 1 nút Tắt duy nhất.
3. **Nguyên lý Trực quan hóa (Concrete over Abstract) & Đối chiếu SGK**:
   - Cụ thể hóa mọi khái niệm trừu tượng thành ẩn dụ đời sống quen thuộc (thư mục như ngăn kéo, thuật toán như công thức bánh...); cụ thể hóa thao tác vật lý bằng so sánh cơ thể và mã màu thị giác, tránh dùng số liệu cơ học khô khan.
   - Luôn gắn badge đối chiếu tài liệu `📖 Xem Hình X - Trang Y (SGK)` ở các nội dung chi tiết để học sinh kết hợp màn chiếu lớn và sách in trên bàn.
4. **Tương tác 100% Không Đạo Cụ & Gacha Thông Minh Theo Tổ**:
   - **Tương tác Thể chất Không Đạo Cụ (Zero-Prop):** Triệt tiêu hoàn toàn đạo cụ giấy tờ (bảng con, hoa xoay ABCD...). Học sinh biểu quyết bằng cử chỉ tay trực quan (giơ 1-2-3-4 ngón tay tương ứng A-B-C-D, hai tay chữ X / vòng tay chữ O, thả tim / Like) kết hợp Gacha bốc thăm trên màn hình lớn.
   - **Gacha linh hoạt theo Tổ:** Khi đấu theo tổ, giáo viên vẫn dùng nút Gacha bình thường (bấm quay liên tục đến khi ra học sinh thuộc tổ đang tới lượt thì chốt) hoặc chọn nhanh từ dropdown.
   - **Linh hoạt 2 đến 6 Tổ:** UI có sẵn nút `[+ Thêm Tổ]` / `[- Bớt Tổ]` để điều chỉnh sĩ số tổ thi đấu linh hoạt đầu giờ.
   - **Widget chọn học sinh ở MỌI vị trí phát biểu:** Bố trí ô chọn tên + nút Gacha ở mọi hoạt động. Phân định rõ: phát biểu tự do chỉ log Telemetry cá nhân (không cộng điểm tổ); chỉ khi vào Game/Đấu trường chính thức mới tính điểm vào Tổ thi đua.
   - **Khẩu lệnh giáo viên rõ ràng, dứt khoát** (*"Hành động + Đối tượng + Thời điểm"*); cấm câu hỏi ngược do dự ("phải không?").
5. **Dàn dựng Bàn phím Máy tính Ảo Chuẩn Công Thái Học (Realistic ANSI Layout)**:
   - Khi dựng bàn phím trên HTML/CSS: Bắt buộc đúng chuẩn độ thụt lùi hàng thực tế (Q thụt so với 1, A thụt so với Q, Z thụt so với A).
   - Canh đều tuyệt đối 2 bên mép (mép trái phẳng tắp, mép phải phẳng tắp 100%, tỷ lệ tổng $15\text{U}$ mỗi hàng).

---

## 😈 Cơ Chế Phe Quỷ: Bất Công Công Khai (Chỉ Dành Riêng Cho Khối 5 / Lớp 5)

Áp dụng **ĐỘC QUYỀN CHO KHỐI 5** khi gặp các lớp cá biệt có học sinh tiền dậy thì cố tình phá bĩnh, chống đối (`shared/js/demon-mode.js`). *Tuyệt đối không áp dụng cho Khối 1, 2, 3, 4 vì tâm lý học sinh còn nhỏ, chỉ nên giáo dục tích cực.*:
1. **Triết lý Bất Công Công Khai:** Tuyên bố thẳng trên UI: *"Tổ Quỷ luôn chịu sự bất công của hệ thống"*. Triệt tiêu tư tưởng "tôn vinh ngầm" hay xem việc vào Phe Quỷ là đặc quyền VIP.
2. **Bãi bỏ hoàn toàn "Quỷ Vương cầm máy":** Xóa bỏ đặc quyền lên bục giảng cầm chuột điều khiển máy chiếu và toàn bộ quy trình 3 bậc xét duyệt rườm rà. Học sinh quậy phá không được nắm quyền lực điều khiển lớp.
3. **Hệ số Bất Công (Hardcore Handicap):**
   - **Đúng:** Chỉ nhận **50% điểm thưởng** (+50đ thay vì +100đ, hoặc chỉ dùng chuộc tội, trần điểm tối đa không vượt sàn 1000đ).
   - **Sai / Phạt trật tự:** Phạt **gấp đôi (-200đ)**, số điểm bị trừ được **bơm thẳng vào Quỹ Cứu Trợ** chia cho các tổ Loài Người.
   - **Gacha Bất Lợi:** Tỷ lệ gặp sự cố/virus trong game may rủi bị nâng lên **60% – 80%** (so với 20% – 30% của tổ thường).
4. **Ngưỡng Phạt Rớt Sàn (< 800đ) & Nút Hoàn Lương (Ân Xá):**
   - Bỏ cơ chế "Quỷ hút máu Quỷ" phức tạp gây tranh cãi.
   - Rớt dưới mốc 800 Xu cuối tiết: Xếp loại TT27 mức **C (Chưa hoàn thành)**, phạt chép phạt bài học và thông báo GVCN/phụ huynh.
   - Nút Ân Xá: Em nào ngồi im chép bài đủ, nghiêm túc không vi phạm suốt 15–20 phút được giáo viên bấm nút "Ân xá" trở về tổ gốc kèm điểm thưởng cho tổ.
