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

### 3. Quy chuẩn Trang Ghi bài vào vở — Thực Hành Tối Đa, Lý Thuyết & Chép Bài Tối Thiểu (Chép 1 Lần Duy Nhất)
* **Ý nghĩa sư phạm cốt lõi môn Tin học (CTGDPT 2018):**
  * Thời lượng tiết học Tin học tiểu học chỉ có **35 phút**. Bản chất môn Tin học là môn học rèn luyện **năng lực và kỹ năng thực hành** (thao tác chuột, bàn phím, tương tác phần mềm, tư duy giải quyết vấn đề). Toàn bộ lý thuyết, hình ảnh minh họa và các bước thực hiện 1-2-3-4 đều đã in rất đẹp và đầy đủ trong Sách giáo khoa (SGK).
  * Học sinh tiểu học viết chữ rất chậm. Nếu bắt học sinh chép bài dài hoặc chia nhỏ bắt chép bài nhiều lần trong tiết học, các em sẽ mất 10–15 phút chỉ để tìm bút, mở vở, loay hoay chép bài → xé nát mạch tư duy công nghệ và cướp mất hơn một nửa thời gian quý báu được chạm tay vào máy tính.
* **Quy chuẩn Vàng: GHI BÀI ĐÚNG 1 LẦN DUY NHẤT:**
  * **1. Cấu trúc nội dung ghi bài chuẩn mực:**
    * **Thứ, ngày ... tháng ... năm ...** (Tiếng Việt tự động qua `updateVietnameseDate()`)
    * **Môn: Tin học**
    * **Tên bài học (Tiết mấy)**: Ví dụ: *Bài 6: Định dạng kí tự và bố trí hình ảnh trong văn bản (Tiết 1)*.
    * **Nội dung lý thuyết cốt lõi (Nếu là Tiết 1 / Tiết mở đầu):** Cho học sinh chép **ĐÚNG 1 LẦN DUY NHẤT** ngay trang ghi bài đầu giờ, nội dung cô đọng tối đa chỉ **1 đoạn vài chữ ngắn gọn** (ví dụ: *Định dạng kí tự trong nhóm Font (thẻ Home); bố trí hình ảnh bằng nút Layout Options (Square).*). **TUYỆT ĐỐI KHÔNG ghi thêm tiêu đề "Nội dung ghi bài"** rườm rà. Dùng dấu mũi tên Unicode (`→`), cấm dùng mã LaTeX (`$\to$`). Chép xong trong 1–2 phút đầu giờ → học sinh **cất vở vào ngăn bàn** để toàn bộ thời gian còn lại tập trung 100% vào khám phá và thực hành trên máy tính!
    * **Nếu là Tiết 2 trở đi (Tiết thực hành / luyện tập):** Học sinh chỉ ghi Thứ ngày + Môn + Tên bài (Tiết 2) → **TUYỆT ĐỐI KHÔNG BẮT CHÉP THÊM LÝ THUYẾT NÀO NỮA**, dành trọn vẹn 30–35 phút cho học sinh luyện tập thực hành trên máy tính!
  * **2. BÃI BỎ Cơ Chế "Ghi Bài Chặng" (Progressive Chunking Writing):**
    * **TUYỆT ĐỐI CẤM** việc học xong một hoạt động lại bắt dừng máy, lôi vở ra chép 1-2 dòng rồi lại cất vở nhiều lần trong một tiết học. Việc đổi qua đổi lại liên tục giữa chuột/bàn phím và bút viết làm gián đoạn nghiêm trọng sự hứng thú và làm giảm hiệu suất thực hành của học sinh.
    * Xuyên suốt bài giảng, các thẻ `.memo-card` / `.note-box` chỉ đóng vai trò là **mỏ neo trực quan (Visual Anchor)** trên màn chiếu để học sinh đối chiếu hoặc đọc lướt, **tuyệt đối không bắt học sinh dừng tay để mở vở chép lại**.
  * **3. Tiêu chuẩn Kỹ thuật Trang Ghi Bài:**
    * **Chữ phải đủ to cho học sinh cuối lớp (8–10m):** Tựa bài $\ge 44\text{px} - 60\text{px}$, Thứ ngày $\ge 28\text{px} - 34\text{px}$, Nội dung ghi $\ge 30\text{px} - 38\text{px}$, in đậm từ khóa quan trọng.
    * **Thiết kế tối giản, sạch sẽ:** Nền trắng tinh khiết (`#ffffff`), TUYỆT ĐỐI CẤM trang trí cầu kỳ, không kẻ hoa văn/ô ly rườm rà gây rối mắt khi máy chiếu mờ, không bóng đổ phức tạp. Chữ phân cấp màu sắc rõ ràng (Thứ ngày xám/xanh dịu, Môn học xanh dương, Tên bài đỏ/đậm).
    * **TUYỆT ĐỐI CẤM Đồng hồ đếm ngược (Timer) khi chép bài:** Không tạo áp lực thời gian khiến học sinh hoảng loạn chép ẩu. Để học sinh chép với nhịp độ tự nhiên dưới sự quan sát của giáo viên.
    * **BẮT BUỘC có nút Chế độ Toàn Màn Hình (Fullscreen Toggle) — Chuẩn Pop-up Toàn Màn Hình (Full-screen Overlay Modal) 1 Nút Zoom / 1 Nút Tắt Duy Nhất:**
      * **Bản chất kỹ thuật:** Tuyệt đối **không phụ thuộc vào API browser fullscreen (F11)** vốn hay bị trình duyệt chặn, hỏi quyền cấp phép hoặc lỗi zoom trên màn chiếu TV. Màn hình chép bài toàn màn hình phải được thiết kế dưới dạng một **Pop-up Modal Toàn Màn Hình (Full-screen Overlay Modal)** ghim cố định trùm kín 100% diện tích màn hình TV (`position: fixed; inset: 0; width: 100vw; height: 100vh; z-index: 9999999; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; padding: 100px 40px 60px; overflow-y: auto; box-sizing: border-box;`). Bắt buộc cho phép cuộn trang (`overflow-y: auto`) và phần đệm trên (`padding-top: 90px - 100px`) phải lớn hơn vị trí của nút tắt (`top: 20px - 24px`) để nội dung không bao giờ bị nút đóng che khuất khi chữ nhiều hoặc màn hình có chiều cao hạn chế.
      * **Khi bình thường:** Chỉ hiển thị **DUY NHẤT 1 NÚT ZOOM** `⛶ Chế độ toàn màn hình chép bài`. Nút tắt `✖ Thu nhỏ (Esc)` phải ẩn hoàn toàn (`display: none !important;`).
      * **Khi bật Pop-up phóng to:** Pop-up ghi bài chiếm trọn 100% màn hình TV (`100vw x 100vh`), che phủ hoàn toàn sidebar và các thanh điều khiển gây phân tâm. Chữ tự động phóng to tối đa theo chuẩn nhìn xa. Chỉ hiển thị **DUY NHẤT 1 NÚT TẮT** `✖ Thu nhỏ (Esc)` ghim cố định ở góc trên bên phải màn hình (`position: fixed; top: 20px; right: 28px; z-index: 10000000;`). Nút Zoom ban đầu tự động ẩn đi (`display: none !important;`), TUYỆT ĐỐI CẤM đổi tên nút zoom thành nút tắt thứ hai gây thừa thãi lặp lại.
      * Hỗ trợ phím `Esc` để đóng Pop-up quay về bình thường bất cứ lúc nào.

### 4. Vòng đời Gọi tên (Turn Lifecycle: Picked ≠ Done) & Cơ chế Gacha
Trạng thái học sinh tuân theo chu trình 3 bước:
$$\text{Chờ (Waiting)} \xrightarrow{\text{Bốc thăm Gacha / Chọn}} \text{Lên máy (Staged)} \xrightarrow{\text{Thực hiện xong}} \text{Đã hoàn thành (Done)}$$
* **Nguyên tắc "Chọn là chọn, làm xong mới tính" (Picked ≠ Done):**
  * Gacha bản chất là thao tác chọn (select) ngẫu nhiên một em và **bật Pop-up siêu to (Giant Modal)** lên màn chiếu để cả lớp cùng thấy và hào hứng.
  * **KHÔNG tạo thêm nút "Đổi em khác" rườm rà:** Nếu học sinh được gọi vắng mặt, chưa sẵn sàng, hoặc chưa thuộc tổ đang đến lượt: Giáo viên chỉ cần **bấm lại nút Gacha** để hệ thống quay tiếp ra tên em khác.
  * Việc bấm Gacha nhiều lần không làm mất lượt của học sinh. Học sinh chỉ chính thức chuyển sang danh sách **Đã hoàn thành (Done)** và ghi nhận vào lịch sử / CSV khi đã **nhập đáp án, tấn công, hoàn thành bài, hoặc giáo viên bấm Xác nhận**.
* **BẮT BUỘC Có Ô Chọn Học Sinh + Gacha Ở MỌI Phân Đoạn Có Phát Biểu:**
  * Bất cứ chỗ nào trong tiết học cần học sinh giơ tay phát biểu (Khởi động, Khám phá kiến thức, Vấn đáp gợi mở, Chốt bài hay Game): **LUÔN PHẢI CÓ Ô CHỌN TÊN HỌC SINH + NÚT GACHA** để giáo viên chủ động chọn đúng em hoặc quay ngẫu nhiên.
* **Phân Tách Rạch Ròi: Log Telemetry Cá Nhân vs Điểm Số Thi Đua Của Tổ:**
  * **1. Khi phát biểu tự do (Khởi động, Khám phá, Vấn đáp giữa giờ, Chốt bài):** Thao tác chọn học sinh **CHỈ DÙNG ĐỂ GHI NHẬN (LOG) DỮ LIỆU CÁ NHÂN** (ghi nhận em đó đã tham gia, đúng/sai, xếp loại TT27 để xuất CSV cuối tiết). **TUYỆT ĐỐI KHÔNG tự động cộng/trừ điểm vào Tổ** để tránh làm loãng hoặc mất cân bằng bảng điểm thi đua.
  * **2. Chỉ khi bước vào VÒNG ĐẤU GAME / THỬ THÁCH CHÍNH THỨC:** Điểm số câu trả lời mới được kích hoạt cộng/trừ vào điểm số của Tổ thi đua!
* **Ứng dụng linh hoạt theo chế độ & Quy chuẩn "Gacha tới khi trúng thì thôi":**
  * **Thực tế lớp học & Lý do tuyệt đối KHÔNG gán tổ cố định:** Mỗi lần giáo viên gặp lại bất kỳ lớp nào thì lớp đó lại đổi chỗ ngồi một lần (do GVCN xếp lại chỗ hoặc học sinh tự đổi vị trí trong phòng máy). Do đó, hệ thống **QUYẾT ĐỊNH KHÔNG GÁN TỔ NGAY TỪ ĐẦU** cho học sinh trong dữ liệu JSON hay danh sách lớp.
  * **Chế độ Toàn lớp / Cá nhân:** Bấm Gacha để quay ngẫu nhiên cả lớp, ưu tiên em chưa tham gia.
  * **Chế độ Thi đua Theo Tổ ("Gacha tới khi nào trúng thì thôi"):** 
    * Việc lượt thi của Tổ này nhưng quay Gacha lại trúng học sinh đang ngồi ở Tổ khác là **HOÀN TOÀN BÌNH THƯỜNG VÀ ĐÚNG CHỦ ĐÍCH THIẾT KẾ**, tuyệt đối **KHÔNG PHẢI LÀ LỖI (NOT A BUG)**. AI Agent TUYỆT ĐỐI KHÔNG tự ý ép buộc gán cứng học sinh vào tổ hay khóa bộ lọc Gacha theo tổ giả định trong code.
    * Khi đến lượt một Tổ, Giáo viên chỉ cần **bấm nút Gacha liên tục cho đến khi quay trúng tên một em thuộc Tổ đang tới lượt thì dừng lại và chốt em đó lên bảng** (*"Gacha tới khi nào trúng thì thôi"*).
    * Nhờ nguyên tắc *Picked ≠ Done*, việc bấm Gacha lướt qua nhiều bạn hoàn toàn không làm mất lượt của các bạn đó.
    * Ngoài ra, nếu có em trong tổ xung phong giơ tay, Giáo viên có thể chọn trực tiếp tên em đó từ danh sách dropdown.

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
* **Danh sách phẳng — Tuyệt đối KHÔNG gán tổ cố định:** Do học sinh đổi chỗ ngồi liên tục sau mỗi tuần/buổi học, tệp JSON chỉ lưu trữ danh sách họ tên phẳng của lớp, TUYỆT ĐỐI KHÔNG gán cứng thuộc tính tổ (`team`). Việc bốc thăm theo tổ vận hành theo cơ chế *"Gacha tới khi nào trúng thì thôi"*.
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
* **Linh hoạt Menu điều khiển & Nút Hamburger (`☰`):** Dù bố cục từng khối có nét đặc trưng riêng (Sidebar mini, Flexbox, 2 cột, Header Tab hay Web Components), **tất cả các menu điều khiển, thanh công cụ Giáo viên (Teacher Toolbar), bảng điều khiển quản trị hoặc sidebar điều hướng ĐỀU CHO PHÉP thiết kế ẩn/hiện bằng nút Hamburger (`☰`)** (ví dụ dạng Side Drawer trượt ra/vào). Điều này giúp tối ưu 100% diện tích màn chiếu cho học sinh tập trung vào bài giảng.

### 9. Kích thước & Tối ưu Màn chiếu TV Lớp học (Tối Ưu Cho Học Sinh Cuối Lớp 8–10m)
* **Tối thiểu hóa element & Cho mọi thứ to lên:** Không nhồi nhét quá nhiều chi tiết vụn vặt, icon trang trí hoặc văn bản nhỏ. Tận dụng cơ chế cuộn trang dọc tự nhiên (`overflow-y: auto`) để mở rộng không gian và phóng to toàn bộ phần tử lên mức tối đa.
* **Tiêu đề Slide:** `2.4rem` – `3.5rem` (`36px` – `48px`, đậm `800`–`900`), nhìn rõ từ khoảng cách 8–10 mét cuối lớp.
* **Chữ nội dung & câu hỏi:** `1.3rem` – `1.6rem` (`19px` – `24px`, độ đậm tối thiểu `700`–`800`, line-height `1.6`).
* **Bảng điểm Tổ trên Sidebar:** Tên tổ $\ge 20\text{px} - 22\text{px}$, Điểm số $\ge 24\text{px} - 28\text{px}$ đậm nét nổi bật. Chiều rộng sidebar khi mở đạt $340\text{px} - 360\text{px}$ để các phần tử to rõ không bị co rúm.
* **Nút bấm / Thao tác:** Tối thiểu `1.2rem` – `1.5rem` (`16px` – `20px`), padding tối thiểu `10px 20px`, có hiệu ứng hover và active nhún nút rõ ràng.
* **Chân trang:** Bắt buộc có khoảng đệm chân trang (`padding-bottom: 120px` đến `140px`) để không bao giờ bị thanh điều hướng che khuất nội dung.
* **Tối ưu không gian bằng Menu Hamburger / Toggle (`☰`):** Cho phép ẩn/hiện thanh công cụ/sidebar để nhường 100% diện tích màn chiếu cho bài giảng khi cần.
* **Tỷ lệ:** Thiết kế co giãn linh hoạt (responsive flex), tối ưu cho tỷ lệ 16:9 của TV lớp học (độ phân giải 1366x768 hoặc 1920x1080).

### 10. Bắt Buộc Lưu Trạng Thái Vào LocalStorage (Auto-Save & Phục Hồi Khi Cúp Điện / Sập Nguồn)
* **100% File HTML / Tiết học / Mini-game BẮT BUỘC tự động lưu trạng thái (Auto-Save):**
  * Trong phòng máy tính trường tiểu học, sự cố cúp điện đột ngột, sập aptomat, vấp dây nguồn máy tính hoặc học sinh/giáo viên vô tình tắt nhầm tab/trình duyệt xảy ra rất thường xuyên.
  * Mọi biến động trạng thái (điểm số các tổ/cá nhân, chuỗi thắng/dây streak, tiến trình slide/câu hỏi hiện tại, danh sách học sinh đã gọi / còn lại, nhật ký telemetry) **phải được tự động ghi ngay vào `localStorage`**.
  * **Cơ chế Tự Động Phục Hồi (Crash Recovery):** Khi mở lại file HTML (sau khi có điện trở lại hoặc mở lại trình duyệt), hệ thống tự động kiểm tra `localStorage`. Nếu thấy có phiên học đang dở dang, lập tức khôi phục chính xác toàn bộ trạng thái và hiện Toast thông báo màu xanh ngọc: *"⚡ Đã tự động khôi phục dữ liệu phiên học trước do sự cố tắt máy/cúp điện!"*.
* **Cú pháp Key an toàn — Tránh xung đột giữa các bài:**
  ```javascript
  const STORAGE_KEY = `bgtieu_hoc_k${grade}_tiet_${lesson}_${classId}_state`;
  // Ví dụ: bgtieu_hoc_k2_tiet_09_2-2_state hoặc bgtieu_hoc_game_caro_state
  ```
  Tuyệt đối không dùng tên chung chung như `state`, `game_data`, `tv_data` gây ghi đè dữ liệu giữa các bài giảng khác nhau.

### 11. Bắt Buộc Nút Xóa Dữ Liệu Tiết Học (Clear Session Button) Cho Mọi File HTML
* **Phạm vi áp dụng:** BẮT BUỘC có mặt trên **100% file HTML của bài học và mini-game**.
* **Vị trí & Thiết kế:**
  * Nút đặt ở vị trí trực quan, dễ tìm (Sidebar, thanh công cụ Giáo viên hoặc góc trên màn hình), có nhãn rõ ràng: `🗑️ Xóa dữ liệu phiên` hoặc `🔄 Làm mới tiết học`.
  * **Cơ chế xác nhận an toàn:** Khi bấm, BẮT BUỘC hiển thị hộp thoại xác nhận `confirm()`: *"Bạn có chắc chắn muốn xóa dữ liệu đã lưu của tiết này để bắt đầu lớp mới không?"*.
  * **Xóa đúng phạm vi:** Chỉ xóa đúng key `STORAGE_KEY` của chính bài học/game đó; sau đó reset trạng thái và thông báo *"✅ Đã xóa dữ liệu phiên học thành công!"*.
  * **TUYỆT ĐỐI CẤM:** Không được gọi `localStorage.clear()` hoặc xóa dữ liệu của bài học khác trên cùng máy tính.

### 12. Điểm Khởi Đầu 1000đ, Cấu Hình 2–6 Tổ & Quy Chuẩn Bảng Điểm Tối Giản (Click Sửa Điểm & Phạt 10% Khi Ồn)
* **Phạm vi áp dụng:** Chỉ setup ở những tiết học hoặc mini-game có hệ thống tính điểm thi đua (đấu tổ, trả lời câu hỏi cộng/trừ điểm, đấu trường đối kháng, minigame cá cược/mua sắm...). KHÔNG áp dụng gượng ép cho các tiết thuần túy tích lũy linh kiện, checkbox hay bài tập đúng/sai không dùng thang điểm số.
* **Giá trị mặc định:** `const STARTING_SCORE = 1000;` (mỗi tổ hoặc học sinh bắt đầu với 1000 điểm sàn).
* **Linh hoạt từ 2 đến 6 Tổ:** UI luôn có sẵn các nút `[+ Thêm Tổ]` / `[- Bớt Tổ]` ở đầu giờ trước khi vào trận để giáo viên linh hoạt cấu hình theo sĩ số lớp (từ 2 đến 6 tổ) hoặc kích hoạt thêm Tổ Quỷ (đối với Khối 5).
* **Mục đích sư phạm:**
  * Tạo tâm lý phấn khởi, tự tin ngay từ đầu giờ học ("mỗi đội đều có sẵn vốn 1000 điểm năng lượng/khởi nghiệp").
  * **Chống điểm âm:** Khi học sinh bị trừ điểm hoặc phạt vi phạm (-20đ, -50đ, -100đ...), tổng điểm vẫn giữ ở mức dương, không làm các em nản lòng hay tự ti.
* **QUY CHUẨN BẢNG ĐIỂM TỔ TỐI GIẢN (MINIMALIST SCOREBOARD — TRÁNH RÁC UI):**
  * **TUYỆT ĐỐI CẤM:** Không được nhồi nhét hàng loạt nút bấm mini `+50`, `+100`, `-50`, `-100`, `🔄 1000`... trên từng thẻ tổ. Việc này làm giao diện chật chội, rối mắt và tạo quá nhiều phần tử dư thừa trên màn hình/sidebar.
  * **Cơ chế Sửa điểm Trực tiếp Bằng Ô Nhập Liệu (Inline Input Field — Không Dùng Prompt, Không Emoji Bút):**
    * Mỗi thẻ tổ chỉ hiển thị Tên tổ to rõ ($\ge 20\text{px}$) và Con số điểm to rõ ($\ge 24\text{px} - 28\text{px}$).
    * **TUYỆT ĐỐI CẤM:** Không dùng hộp thoại `prompt()` của trình duyệt (dễ bị chặn, giao diện thô cứng). TUYỆT ĐỐI KHÔNG gắn emoji cây bút chì `✏️` thừa thãi trên màn hình.
    * **Biến đổi trực tiếp thành ô nhập liệu tại chỗ:** Khi Giáo viên click vào con số điểm (`.team-card-score`), phần tử điểm số lập tức biến thành một ô `<input type="number">` ngay trên thẻ tổ (`kiểu ô nhập liệu`), tự động focus và bôi đen số điểm cũ.
    * **Thao tác nhanh bàn phím:** Giáo viên gõ điểm mới rồi nhấn phím `Enter` (hoặc nhấp chuột ra ngoài) → lưu ngay điểm mới, cập nhật bảng điểm và lưu `localStorage`. Nhấn phím `Esc` → hủy sửa điểm, giữ nguyên số cũ.
  * **Tính năng Phạt ồn 1-chạm (Noise Penalty — Trừ 10% khi ồn ào/mất trật tự):**
    * Khi học sinh các tổ nói chuyện riêng, gây ồn hoặc hò hét mất trật tự trong lớp: Trên mỗi thẻ tổ có **DUY NHẤT 1 nút phạt ồn nhỏ gọn** (`🤫 -10%`).
    * **Cơ chế tính phạt:** Trừ chính xác 10% trên tổng số điểm hiện tại của tổ đó:  
      $$\text{Điểm trừ} = \text{round}(\text{Score} \times 0.1), \quad \text{Score mới} = \max(0, \text{Score} - \text{Điểm trừ})$$
    * **BẮT BUỘC có Toast thông báo răn đe trên màn chiếu:** Khi bấm phạt, hệ thống kích hoạt âm thanh cảnh báo ngắn (`playNoiseAlert()`) và hiện thông báo Toast rõ ràng:  
      *Ví dụ: `📢 [Tổ 1] Mất trật tự / ồn ào: Đã bị trừ 10% (-100 Xu), điểm hiện tại còn: 900 Xu! 🤫`*  
      Cả lớp nhìn thấy thông báo trên màn hình lớn sẽ lập tức tự giác nhắc nhau trật tự, giúp giáo viên quản lý lớp hiệu quả mà không cần lớn tiếng nhắc nhở.
    * Tự động lưu lịch sử trừ phạt vào nhật ký telemetry và `localStorage`.

### 13. Cơ Chế Xếp Rank Đồng Hạng & Vinh Danh Công Bằng (Tie-Ranking)
* **Ý nghĩa sư phạm:** Học sinh tiểu học rất nhạy cảm với việc phân định thứ hạng. Khi các tổ hoặc học sinh bằng điểm nhau, **TUYỆT ĐỐI CẤM** dùng thứ tự ngẫu nhiên hoặc chỉ số mảng để ép một bên xuống hạng dưới.
* **Quy chuẩn Xếp hạng & Vinh danh (Standard Competition Ranking):**
  * Sắp xếp danh sách điểm giảm dần (`sort((a, b) => b.score - a.score)`).
  * Nếu điểm của tổ hiện tại bằng điểm tổ trước đó → giữ nguyên thứ hạng (`rank`), không tăng thứ hạng giả tạo.
  * Khi có từ 2 đội trở lên cùng điểm số, tự động chuyển danh hiệu vinh danh sang thể thức **ĐỒNG HẠNG**:
    * Cùng điểm cao nhất: **"ĐỒNG QUÁN QUÂN"** (cùng nhận cúp vàng 🥇, banner vinh danh ghi rõ tên cả hai tổ: `🏆 ĐỒNG QUÁN QUÂN: TỔ 1 & TỔ 2 (CÙNG ĐẠT 1050 ĐIỂM)! 🏆`).
    * Bằng điểm thứ nhì: **"ĐỒNG Á QUÂN"** 🥈.
    * Bằng điểm thứ ba: **"ĐỒNG HẠNG BA"** 🥉.
    * Các thứ hạng sau: **"KHUYẾN KHÍCH"** 🌟 / **"NỖ LỰC"** 🎖️.
* **Đồng bộ Báo cáo CSV:** Bảng xếp hạng trong file CSV phải có cột *"Đồng Hạng"* (`Có (Đồng điểm)` / `Không`), hiển thị thứ hạng chuẩn (`Hạng 1`, `Hạng 1`, `Hạng 3`...) và cột "Huy Chương" dùng văn bản thuần (`Huy chương Vàng`, `Huy chương Bạc`, `Huy chương Đồng`), tuyệt đối không phân biệt đối xử khi bằng điểm.

### 14. Màn Hình Chốt Kiến Thức / Ghi Nhớ Cuối Tiết (Summary Screen before Leaderboard)
* **Vị trí bắt buộc:** Cuối bất cứ tiết học nào, **ngay trước slide Bảng vàng vinh danh**, BẮT BUỘC có một màn hình để chốt lại những kiến thức trọng tâm đã học của tiết đó (kiểu "Em ghi nhớ" / "Chốt kiến thức").
* **Quy trình Sư phạm 5 Phút Vàng Cuối Tiết (Active Recall & Consolidation Flow):**
  * **Bắt buộc dành trọn 5 phút cuối tiết** cho khâu củng cố, tuyệt đối không dạy lấn giờ hoặc cắt xén phần này.
  * **Học sinh tự nhớ lại trước (Active Recall) $\rightarrow$ Giáo viên bổ sung & Chốt lại sau:** Giáo viên đặt câu hỏi gợi mở để học sinh tự tóm tắt lại 2–3 bài học/kỹ năng quan trọng nhất hôm nay (ví dụ: *"Hôm nay chúng mình đã khám phá được những bí kíp quan trọng nào?"*). Chỉ khi học sinh tự nói ra và các bạn cùng lớp bổ sung đầy đủ, giáo viên mới bấm mở các thẻ tóm tắt trên slide để khắc sâu kiến thức.
  * **Đủ câu hỏi lấy điểm công bằng cho TẤT CẢ các tổ:** Nếu khâu chốt kiến thức có phần câu hỏi củng cố / ghi nhớ lấy điểm thi đua, **BẮT BUỘC phải thiết kế đủ số lượng câu hỏi/lượt củng cố cho TẤT CẢ các tổ đang chơi** (ví dụ lớp có 4 tổ thì có tối thiểu 4 câu hoặc mỗi tổ 1 lượt), đảm bảo mọi tổ đều có cơ hội ghi điểm công bằng trước khi tổng kết bảng vàng vinh danh.
* **Nguyên tắc thiết kế:**
  * Design đơn giản, nền sạch sẽ, ít chữ, chữ rất lớn (nhìn rõ từ xa 8–10m).
  * Bố cục lưới thẻ trực quan: Chia thành **2, 3 hoặc 4 card** (`.summary-card-grid.grid-2`, `.grid-3`, `.grid-4`) tùy thuộc số lượng ý trọng tâm cần nhớ của bài.
  * Mỗi card chỉ gồm: Nhãn/Icon + Tiêu đề ngắn + 1 đến 2 câu chốt cô đọng, in đậm từ khóa quan trọng.
* **Luồng chuyển slide:** Học sinh và giáo viên cùng đọc to chốt bài xong → Bấm nút *"🏆 Xem Bảng Vàng Vinh Danh ▶"* để sang màn hình vinh danh và kết thúc tiết.

### 15. Quản Lý Quests & Câu Hỏi Bằng File `quests.js` Duy Nhất (Single Quests File - DRY)
* **CẤM:** Tuyệt đối KHÔNG nhúng cứng (hardcode) hàng chục hoặc hàng trăm dòng mảng dữ liệu câu hỏi, tình huống, vụ án, thẻ bài trực tiếp vào file HTML/JS của bài giảng.
* **Quy chuẩn DUY NHẤT 1 file `quests.js` (Bỏ hẳn `quests.json`):**
  * Việc duy trì song song 2 file (`quests.json` và `quests.js`) vi phạm nguyên tắc DRY, dễ dẫn đến tình trạng sửa file `.json` nhưng quên sửa file `.js`, khi chạy offline bằng `file:///...` sẽ vẫn ăn dữ liệu cũ.
  * Toàn bộ ngân hàng câu hỏi, thử thách, kịch bản phải được đặt trong **DUY NHẤT 1 file `quests.js`** nằm ngay cạnh `index.html`:
    ```javascript
    window.QUESTS_DATA = [
      { id: 1, question: "...", options: ["A", "B", "C", "D"], answer: 0, points: 100 }
    ];
    ```
  * Nhúng file qua `<script src="quests.js"></script>` trong `<head>`: 100% không bao giờ dính lỗi CORS trên `file:///`, giáo viên mở sửa trực tiếp như JSON mà không phải đồng bộ 2 nơi.

### 16. Quy Chuẩn Tính Năng Ẩn: Cơ Chế "Phe Quỷ" Bất Công Công Khai (Chỉ Dành Riêng Cho Khối 5 / Lớp 5)
* **Đặc Quyền Dành Riêng Cho Khối 5 (Lớp 5):**
  * Cơ chế Phe Quỷ (`shared/js/demon-mode.js`) được thiết kế **ĐỘC QUYỀN DÀNH RIÊNG CHO HỌC SINH KHỐI 5** (học sinh 10–11 tuổi có cá tính mạnh, bắt đầu có tâm lý nổi loạn tiền dậy thì, thích thể hiện cái tôi và quậy phá theo nhóm).
  * **TUYỆT ĐỐI CẤM ÁP DỤNG cho Khối 1, 2, 3, 4:** Học sinh các khối 1–4 còn quá nhỏ, tâm lý nhạy cảm, dễ tủi thân và tiêu cực nếu bị gắn mác "Phe Quỷ" hay chịu chế độ phạt nặng. Ở các khối 1–4 chỉ áp dụng kỷ luật tích cực, nhắc nhở nhẹ nhàng và động viên sự tiến bộ.
* **Triết Lý "Bất Công Công Khai" (Đập Bỏ Tôn Vinh Ngầm):**
  * Thực tế lớp học đã chứng minh: cho Phe Quỷ giao diện ngầu, sấm sét tím và phần thưởng "Quỷ Vương lên cầm chuột máy giáo viên" sẽ phản tác dụng — học sinh coi đó là đặc quyền VIP để quậy phá.
  * Hệ thống tuyên bố thẳng thắn trên UI và trong luật: **"Tổ Quỷ luôn chịu sự bất công của hệ thống"**.
* **Bộ Luật Bất Công (Hardcore Handicap):**
  1. **Trả lời đúng:** Chỉ nhận **50% điểm thưởng** (+50đ thay vì +100đ), hoặc chỉ được dùng để "chuộc tội" giảm án phạt, trần điểm tối đa không vượt sàn 1000đ.
  2. **Trả lời sai / Vi phạm trật tự:** Bị phạt **gấp đôi (-200đ)** và số điểm bị trừ này được **bơm thẳng vào "Quỹ Cứu Trợ"** chia cho các tổ Loài Người (hoặc cộng cho tổ Loài Người đang thấp điểm nhất).
  3. **Gacha Bất Lợi:** Trong các game có yếu tố may rủi (như *IT Tycoon*), tỷ lệ gặp sự cố/virus của Tổ Quỷ mặc định bị nâng lên **60% – 80%** thay vì 30% như tổ thường.
* **Bãi Bỏ Hoàn Toàn Danh Hiệu "Quỷ Vương Cầm Máy":**
  * Xóa bỏ hoàn toàn phần thưởng cho phép học sinh cá biệt lên bục giảng điều khiển máy chiếu tiết sau và toàn bộ quy trình 3 bậc xét duyệt rườm rà (so lỗi vi phạm, soi vở tại chỗ, đấu Gacha 1-1).
  * Học sinh quậy phá tuyệt đối không được trao bất kỳ quyền lực điều khiển lớp học nào.
* **Đơn Giản Hóa Bảng Điểm, Ngưỡng Rớt Sàn (< 800đ) & Nút Hoàn Lương (Ân Xá):**
  * Bỏ cơ chế "Zero-Sum Quỷ hút máu Quỷ" phức tạp (tốn thời gian giải thích luật và dễ gây cãi vã).
  * **Ngưỡng phạt rớt sàn (< 800 Xu):** Bất kỳ con Quỷ nào kết thúc tiết học với tổng điểm dưới 800 Xu sẽ bị xếp loại TT27 là **C (Chưa hoàn thành)**, nhận hình phạt kỷ luật nghiêm khắc (chép phạt bài học 3–5 lần, trực nhật dọn phòng máy, tước quyền thao tác máy tiết sau, và gửi biên bản cho GVCN/phụ huynh).
  * **Nút Hoàn Lương (Thanh Tẩy / Ân Xá):** Em nào ngồi im chép bài đủ, không bị trừ điểm trong suốt 15–20 phút thì được giáo viên bấm nút "Ân xá" trả về tổ gốc, mang theo 100đ – 200đ tài trợ cho tổ cũ.
* **Báo cáo CSV Riêng Biệt & Nhận Xét Nghiêm Khắc (Anti-Sugarcoating):**
  * **TUYỆT ĐỐI CẤM** dùng các câu khen ngợi tích cực sáo rỗng cho học sinh thuộc Phe Quỷ.
  * Tách riêng bảng danh sách trong file CSV: `=== THEO DÕI HÀNH VI & KỶ LUẬT (PHE QUỶ) ===`.
  * Xếp loại TT27: Mặc định là **C (Chưa hoàn thành)** hoặc **H (Hoàn thành nhưng cần rèn luyện thêm ý thức)** kèm nhận xét chi tiết, trung thực để làm việc với GVCN và phụ huynh.
* **Phương thức kích hoạt ẩn (Zero Overhead):**
  * Kích hoạt qua file wrapper `tiet-X/index-mavuong.html` (`index.html?mode=mavuong`) hoặc phím tắt ẩn của Giáo viên (`Ctrl + Alt + D` hoặc click 4 lần vào logo) ngay trong `index.html` của Khối 5.

### 17. Cơ Chế Can Thiệp Sửa Điểm, Dây Thắng (Streak) & Xếp Hạng Thủ Công Khi Bấm Nhầm (Manual Score & Streak Override)
* **Ý nghĩa sư phạm:** Trong giờ học thực tế, học sinh hoặc giáo viên rất dễ bấm nhầm: học sinh lỡ tay nhấp nhầm đáp án, giáo viên bấm nhầm nút cộng/trừ điểm hoặc chấm nhầm tổ, chuột bị double-click, v.v. Nếu hệ thống cứng nhắc không cho sửa, học sinh sẽ ức chế, tranh cãi, làm gián đoạn tiết học.
* **Quy tắc bắt buộc:**
  * Mọi chỉ số quyết định thứ hạng thi đua (Điểm số của tổ, Điểm cá nhân, Chuỗi thắng/dây streak, Số sao/huy hiệu) **BẮT BUỘC phải cho phép Giáo viên can thiệp chỉnh sửa nhanh chóng**.
  * **Hình thức can thiệp trực quan:**
    * **Chỉnh sửa nhanh trực tiếp (Click-to-Edit):** Cho phép Giáo viên nhấp vào con số điểm/streak (hoặc nút icon sửa `✏️`) để mở popup hoặc hộp thoại nhập lại giá trị chính xác.
    * **Bộ nút điều chỉnh nhanh (+/-):** Cung cấp các nút bấm tăng/giảm nhanh (`+50`, `+100`, `-50`, `-100`, `Đặt lại sàn 1000đ`).
  * **Tự động tính toán lại và đồng bộ tức thì:**
    * Ngay sau khi can thiệp sửa giá trị: Hàm tính toán thứ hạng (`calculateRankings`) phải chạy lại ngay, tự động cập nhật lại danh hiệu (Quán quân, Đồng hạng, huy chương 🥇🥈🥉).
    * Tự động lưu giá trị mới vào `localStorage` ngay lập tức để bảo vệ dữ liệu nếu cúp điện.
    * Đồng bộ số liệu chính xác vào dữ liệu xuất file CSV cuối tiết.

### 18. Khung Kiến Trúc Sư Phạm & Thiết Kế Trải Nghiệm Học Sinh Tiểu Học (Universal Primary Pedagogy & UX - Khối 1 đến Khối 5)
Áp dụng cho 100% tiết học ở tất cả các chủ đề (Lý thuyết, Phần cứng, Luyện kỹ năng, Ứng dụng văn phòng, Lập trình Scratch, Đồ họa, An toàn số):

* **1. Khâu Khởi động & Tạo tâm thế (The Hook / Lead-in) — CẤM vào bài trực diện:**
  * **Mục đích:** Kích hoạt trí tò mò tự nhiên và tâm thế chủ động của học sinh trước khi tiếp cận tri thức mới.
  * **Quy chuẩn:** Mọi bài học bắt buộc khởi đầu bằng 1 tình huống có vấn đề trong đời sống, câu chuyện/nhân vật dẫn dắt, hình ảnh so sánh đối lập, câu đố gợi mở hoặc minigame ngắn để học sinh *tự khám phá và tự phát biểu mục tiêu bài học*. Cấm tuyệt đối mở đầu áp đặt một chiều: *"Hôm nay chúng ta học bài..."*.
* **2. Cầu nối Chuyển tiếp Sư phạm (Seamless Pedagogical Transitions):**
  * **Mục đích:** Đảm bảo tính mạch lạc, liền mạch và phát triển nhận thức tự nhiên của học sinh tiểu học.
  * **Quy chuẩn:** Giữa các chặng/hoạt động (từ Khám phá sang Luyện tập, từ Thao tác sang Vận dụng, từ Lý thuyết sang Thực hành), kịch bản slide và lời dẫn giáo viên bắt buộc có **câu nối mang tính nhân quả/logic sư phạm**. Tuyệt đối không chuyển slide đột ngột khiến học sinh bị hẫng và đứt mạch tư duy.
* **3. Nguyên lý Trực quan hóa Khái niệm & Kỹ năng (Concrete over Abstract):**
  * **Mục đích:** Phù hợp với đặc điểm tâm lý lứa tuổi tiểu học (giai đoạn tư duy thao tác cụ thể — Jean Piaget).
  * **Quy chuẩn:**
    * **Cấm:** Không dùng các thông số kỹ thuật khô khan, số đo cơ học trừu tượng, hay định nghĩa mang tính giáo điều hàn lâm.
    * **Giải pháp chuyển thể:**
      * *Khái niệm trừu tượng:* Cụ thể hóa bằng phép ẩn dụ đời sống quen thuộc (ví dụ: Thư mục như ngăn kéo tủ, Dung lượng như bình chứa nước, Thuật toán như công thức làm bánh, Mạng Internet như mạng lưới đường giao thông).
      * *Kỹ năng & Thao tác vật lý:* Cụ thể hóa bằng vật thể trực quan (thước đo cơ thể như sải tay/gang tay thay vì số đo cm; mã màu/nhãn dán thị giác trên phím và thiết bị thay vì chỉ gọi tên; làm mẫu trực quan hành vi đúng/sai để học sinh tự so sánh).
* **4. Nguyên tắc Kết hợp Đa phương tiện & Sách giáo khoa (Multimodal SGK Scaffolding):**
  * **Mục đích:** Khắc phục rào cản phòng máy (màn hình xa, lóa sáng) và rèn thói quen sử dụng tài liệu học tập chuẩn.
  * **Quy chuẩn:** Slide màn chiếu đóng vai trò trực quan hóa và gamification, không thay thế hoàn toàn SGK. Khi xuất hiện sơ đồ chi tiết, hình ảnh giải phẫu, văn bản dài hoặc bài thực hành: Slide luôn có badge đối chiếu rõ ràng: `📖 Xem Hình X - Trang Y (SGK)` để học sinh kết hợp nhịp nhàng giữa màn chiếu lớn và sách in trên bàn.
* **5. Tương tác 100% Không Đạo Cụ Vật Lý (Zero-Prop Physical Interaction):**
  * **Mục đích:** Triệt tiêu hoàn toàn mô hình thụ động "1 em được gọi trả lời, cả lớp ngồi nhìn/mất trật tự".
  * **Triết lý Zero-Effort (100% Web-based):**
    * **TUYỆT ĐỐI CẤM:** Không yêu cầu hay gợi ý giáo viên/học sinh mang vác chuẩn bị đạo cụ vật lý rườm rà (bông hoa xoay trắc nghiệm ABCD, bảng con, thẻ màu tín hiệu, phấn viết...). Toàn bộ giáo án vận hành trơn tru theo triết lý "Zero-Effort" (chỉ cần màn chiếu TV và máy tính).
    * **Cử chỉ Ký hiệu Tay (Hand Gestures & Body Language):**
      * **Chọn A - B - C - D:** Cả lớp cùng suy nghĩ và đồng loạt giơ **1 - 2 - 3 - 4 ngón tay** biểu quyết đáp án tương ứng.
      * **Đúng / Sai & Tán thành / Phản đối:** Giơ chéo hai tay tạo chữ **X** (Sai / Không đồng ý) hoặc vòng hai tay tạo chữ **O** (Đúng / Tán thành), làm biểu tượng Thả tim hoặc Giơ ngón cái (Like).
      * **Đồng loạt 100% động não:** Giáo viên chỉ mất 2 giây quét mắt quanh phòng máy là nắm bắt chính xác mức độ hiểu bài của toàn thể học sinh (Formative Assessment) mà không tốn công phát/thu/dọn dẹp đạo cụ.
    * **Kết hợp Gacha Màn Hình Lớn:** Sau khi cả lớp biểu quyết bằng cử chỉ tay, giáo viên bấm nút Gacha bốc 1 em lên chốt đáp án trên máy.
* **6. Nghệ thuật Khẩu lệnh Sư phạm Dứt khoát (Decisive Classroom Directives):**
  * **Mục đích:** Thiết lập kỷ luật tích cực và sự tập trung cao độ trong phòng máy.
  * **Quy chuẩn:** Giáo viên là người làm chủ và điều phối nhịp độ. Khẩu lệnh đưa ra phải ngắn gọn, mang tính định hướng hành động dứt khoát (*"Hành động + Đối tượng + Thời điểm"*). Tuyệt đối tránh các câu hỏi đuôi do dự, hỏi ngược nước đôi ("phải không?"). Nội dung hiển thị trên slide phải là các câu khẳng định chuẩn xác, truyền cảm hứng.

### 19. Quy Chuẩn Dàn Dựng Bàn Phím Máy Tính Ảo Chuẩn Công Thái Học (Realistic ANSI Keyboard Layout)
* **Phạm vi áp dụng:** Bất kỳ bài học nào (đặc biệt Khối 1, 2, 3 làm quen bàn phím, gõ 10 ngón, nhận diện các hàng phím) hoặc mini-game luyện gõ phím có giao diện bàn phím mô phỏng trên HTML/CSS.
* **1. ĐÚNG CHUẨN ĐỘ THỤT HÀNG THỰC TẾ (Standard Key Staggering):**
  * TUYỆT ĐỐI CẤM xếp các phím thẳng tưng như bảng tính Excel hoặc lộn xộn khiến học sinh hiểu sai cấu tạo bàn phím thật.
  * Các hàng phím BẮT BUỘC phải thụt lùi chuẩn xác theo công thái học bàn phím vật lý tiêu chuẩn (ANSI):
    * **Hàng 1 (Hàng phím số):** Bắt đầu bằng `~`, `1` đến `0`, `-`, `=`, kết thúc bằng phím `Backspace` rộng ($2\text{U}$).
    * **Hàng 2 (Hàng phím chữ trên - QWERTY):** Bắt đầu bằng phím `Tab` rộng ($1.5\text{U}$) $\rightarrow$ đẩy phím `Q` **thụt vào trong** so với phím `1`.
    * **Hàng 3 (Hàng phím cơ sở - Home Row ASDF):** Bắt đầu bằng phím `Caps Lock` rộng ($1.75\text{U}$) $\rightarrow$ đẩy phím `A` **thụt sâu hơn** phím `Q`. Phím `Enter` lớn ($2.25\text{U}$) ở cuối hàng.
    * **Hàng 4 (Hàng phím chữ dưới - Bottom Row ZXCV):** Bắt đầu bằng phím `Shift Trái` rộng ($2.25\text{U}$) $\rightarrow$ đẩy phím `Z` **thụt sâu hơn** phím `A`. Phím `Shift Phải` lớn ($2.75\text{U}$) ở cuối hàng.
    * **Hàng 5 (Hàng phím chức năng đáy - Spacebar):** Bắt đầu bằng `Ctrl` ($1.25\text{U}$), `Win` ($1.25\text{U}$), `Alt` ($1.25\text{U}$), phím `Space` dài ở giữa ($6.25\text{U}$), khép lại bằng `Alt`, `Win`, `Menu`, `Ctrl`.
* **2. CANH ĐỀU TUYỆT ĐỐI 2 BÊN MÉP (Justified Flat Edges - 100% Width):**
  * **CẤM:** Không được để mép ngoài của các hàng phím thò thụt, lồi lõm xộc xệch kỳ lạ.
  * **Quy chuẩn CSS:** Mỗi hàng phím (`.kb-row`) phải có tổng tỷ lệ phím tương đương chính xác 15 units ($15\text{U}$) và luôn chiếm trọn `width: 100%` (dùng Flexbox với `flex: var(--u, 1)` hoặc CSS Grid tỷ lệ). Mép trái thẳng tắp và mép phải phẳng tắp 100%!

### 20. Quy Chuẩn Nút Hamburger (`☰`) & Điều Khiển Sidebar / Menu: Nút Vuông Độc Lập Ở Cạnh Trên Bên Trái
* **Bối cảnh & Ý nghĩa sư phạm trên màn chiếu TV:**
  * Màn hình TV và máy chiếu tại các phòng máy tiểu học thường có chiều cao và tỷ lệ hiển thị giới hạn (16:9 hoặc độ phân giải 1366x768 / 1920x1080). Ưu tiên số một của giao diện là **dành 100% diện tích cho sân khấu bài giảng**, giúp cỡ chữ nội dung luôn đạt độ lớn tối ưu ($\ge 1.3\text{rem} - 1.6\text{rem}$), hình ảnh trực quan rõ nét để học sinh ngồi ở cuối lớp (khoảng cách 8–10m) nhìn rõ và tập trung hoàn toàn.
  * Việc ghim cố định các thanh công cụ điều khiển hoặc sidebar có thể làm chật chội sân khấu và gây phân tâm thị giác cho học sinh. Vì vậy, hệ thống cho phép ẩn/hiện Sidebar hoặc Menu công cụ bằng Nút Hamburger.
* **Quy chuẩn Thiết Kế Nút Hamburger Chuẩn Mực:**
  * **1. Nút Vuông Độc Lập (Không Chữ):**
    * Nút Hamburger BẮT BUỘC là một **nút vuông đơn lẻ (Square button tỷ lệ 1:1, kích thước $44\text{px} \times 44\text{px}$ hoặc $48\text{px} \times 48\text{px}$)**, bo góc nhẹ ($8\text{px} - 10\text{px}$).
    * **TUYỆT ĐỐI KHÔNG có chữ:** Chỉ hiển thị icon duy nhất (`☰` khi đang đóng, `◀` hoặc `✕` khi đang mở). TUYỆT ĐỐI CẤM gắn thêm chữ rườm rà như *"Ẩn Sidebar"*, *"Hiện Bảng Điểm"*, *"Menu Giáo Viên"*...
  * **2. Luôn Hiển Thị Cố Định Ở Cạnh Trên Bên Trái:**
    * Nút ghim cố định ở góc trên bên trái màn hình (`position: fixed; top: 12px - 14px; left: 12px - 14px; z-index: 9999;`).
    * **TUYỆT ĐỐI CẤM lồng nút vào container hay thanh khác:** Không được nhét nút này vào bên trong thanh `header-topbar`, thanh header, thanh tab hay bất kỳ khung chứa nào. Nút phải đứng độc lập ở góc màn hình.
  * **3. Nút Điều Khiển Duy Nhất (Single Master Toggle) — TUYỆT ĐỐI CẤM Nút Ẩn Riêng Trong Sidebar:**
    * Nút vuông cạnh trên bên trái chính là **công tắc duy nhất** để điều khiển trạng thái mở/đóng của Sidebar:
      * Khi Sidebar đang mở: Nhấn nút vuông này → Sidebar thu gọn/ẩn về bên trái (icon đổi thành `☰`).
      * Khi Sidebar đang ẩn: Nhấn nút vuông này → Sidebar trượt/mở ra (icon đổi thành `◀` hoặc `✕`).
    * **CẤM sinh thêm nút ẩn/thu gọn riêng bên trong Sidebar:** Không tạo nút *"◀ Thu gọn"* hay nút đóng riêng bên trong header của Sidebar gây thừa thãi lặp lại.
  * **4. Trải nghiệm mượt mà & Không đè phần tử:**
    * Khi Sidebar mở: Header của Sidebar có phần đệm lề trái (`padding-left: 52px - 54px`) để tiêu đề Sidebar đứng ngay cạnh nút vuông mà không bị đè lên nhau.
    * Khi Sidebar đóng: Thanh topbar (hoặc nội dung slide bên phải) tự động đệm lề trái (`padding-left: 60px - 64px`) để các huy hiệu/nội dung không bị nút vuông che khuất.
  * **Benchmark tham khảo:** Chuẩn Tiết 11 Khối 5 (`khoi-5/tiet-11/index.html`) với `.btn-hamburger-toggle` cố định top-left, tự động co giãn không gian trình chiếu.

### 21. Quy Chuẩn Luồng Giảng Dạy Tương Tác: Lên Lần Lượt Từng Em Trên Bảng — CẤM "Chấm Hàng Loạt"
* **Bản chất tiết học tương tác tiểu học:** 
  * Tiết dạy trên màn chiếu TV / bảng tương tác vận hành theo mô hình: **Giáo viên gọi lần lượt từng em học sinh lên bảng** (thông qua dropdown chọn tên hoặc bốc thăm ngẫu nhiên bằng Gacha) để trực tiếp thao tác, trả lời câu hỏi, giải quyết tình huống săn bug, hoặc tương tác với phần mềm.
* **TUYỆT ĐỐI CẤM chức năng "Chấm Hàng Loạt" (Batch Auto-grader):**
  * Không bao giờ thêm các tính năng như nộp file zip, upload hàng loạt 35 file docx/pptx của cả lớp để chấm tự động trên slide bài giảng của giáo viên.
  * Học sinh tiểu học học theo nhịp độ trực quan trên lớp, không phải hình thức thi trắc nghiệm nộp bài đại trà. Việc nhồi nhét tính năng chấm hàng loạt làm rối giao diện, gây hiểu lầm cho giáo viên và đi ngược hoàn toàn luồng sư phạm thực tế.

### 22. Quy Chuẩn Vấn Đáp Quy Trình Thao Tác (Khám Phá): Show Bước Lộn Xộn & Chọn Thứ Tự Trắc Nghiệm
* **Bản chất tâm lý & Sư phạm:** Học sinh tiểu học chưa có khả năng diễn đạt lưu loát từng bước thao tác kỹ thuật dài dòng. Nếu bắt học sinh đứng lên trả lời miệng hoặc học vẹt 4 bước thực hiện, các em sẽ lúng túng, ngập ngừng, làm chùng không khí lớp học.
* **Quy chuẩn Trắc nghiệm Sắp xếp Thứ tự (Scrambled Steps):**
  * Đối với các câu hỏi khám phá quy trình/thao tác (ví dụ 3–4 bước thao tác trên phần mềm):
  * **1. Hiển thị các bước xáo trộn (Scrambled Cards):** Chiếu 4 thẻ bước lộn xộn, đánh mã `(A), (B), (C), (D)`.
  * **2. Gọi học sinh đứng lên chọn thứ tự:** Giáo viên dùng ô chọn học sinh + nút Gacha `🎲` để gọi một em đứng lên lựa chọn.
  * **3. Cung cấp 4 phương án trắc nghiệm thứ tự:** Các phương án thứ tự to rõ (ví dụ: `1️⃣ (A) → (B) → (D) → (C)`, `2️⃣ (B) → (D) → (C) → (A)`...).
  * **4. Nhấp chọn & Phản hồi trực quan:** Giáo viên hoặc học sinh nhấp vào phương án được chọn → Nút đổi màu (Xanh nếu đúng, Đỏ nếu sai), phát âm thanh khen thưởng `playWin()` / `playFail()`, hiển thị lời giải thích sư phạm cốt lõi (nhấn mạnh thao tác nào luôn phải làm đầu tiên, ví dụ: *Luôn chọn bôi đen trước!*) và tự động ghi nhận Telemetry (T / H) cho học sinh.

---

## 🛠️ 2. QUY TRÌNH 5 BƯỚC KHI TẠO HOẶC CHỈNH SỬA TIẾT HỌC MỚI

Khi nhận được yêu cầu viết tiết học mới từ người dùng (ví dụ: *"Tạo Tiết 10 Khối 2: Bài 7 - ..."*), AI phải thực hiện đúng 5 bước:

1. **Bước 1 — Xác định Khối & Bản sắc:** Đọc bảng ở Mục 1.8 để chọn đúng Font chữ, Theme CSS, và Bố cục của Khối đó. Lưu ý: Cho phép thiết kế menu điều khiển & thanh công cụ giáo viên dạng ẩn/hiện bằng nút Hamburger (`☰`) để giải phóng tối đa không gian màn chiếu TV cho học sinh.
2. **Bước 2 — Nạp Khung sườn Chuẩn (Boilerplate):** 
   * Kiểm tra xem khối đó đã có `template.html` chưa. Nếu có, nhân bản từ `template.html` của khối.
   * Chèn đúng 2 file bảo vệ: `../../shared/js/prevent-reload.js` và `../../shared/js/core.js`.
3. **Bước 3 — Nạp Dữ liệu Học sinh & Thiết lập Chế độ:**
   * Trỏ đúng file JSON `../../assets/data/students_{khoi}_2026_2027.json`.
   * Xác định tiết này là **Chế độ Toàn lớp cá nhân** (gacha tự động, bật full telemetry) hay **Chế độ Đấu theo tổ** (chọn tên thủ công hoặc `spinGacha(teamId)`, ghi log sư phạm).
   * **Bố trí Widget chọn học sinh:** Bất kỳ slide/hoạt động nào có học sinh phát biểu đều bố trí dropdown chọn tên + nút Gacha (chỉ log telemetry, không cộng điểm tổ khi phát biểu tự do; chỉ cộng điểm khi vào game chính thức).
   * **Nếu tiết học có tính điểm:** Khởi tạo điểm sàn mặc định `STARTING_SCORE = 1000`, hỗ trợ nút linh hoạt từ 2 đến 6 tổ (`[+ Thêm Tổ]` / `[- Bớt Tổ]`), và tích hợp hàm tính thứ hạng xử lý đồng hạng (`calculateRankings`). Đồng thời cung cấp công cụ sửa điểm/chuỗi streak khi bấm nhầm.
   * **Tự động lưu LocalStorage & Nút Clear:** Thiết lập cơ chế tự động lưu trạng thái (Auto-Save) vào LocalStorage với key chuẩn để phục hồi sau khi cúp điện, kèm nút Xóa dữ liệu phiên có xác nhận `confirm()`.
   * **Quests & Câu hỏi:** Đặt toàn bộ ngân hàng câu hỏi/vụ án vào **DUY NHẤT 1 file `quests.js`** (`window.QUESTS_DATA = [...]`), tuyệt đối KHÔNG dùng `quests.json` và không hardcode vào HTML.
4. **Bước 4 — Thiết kế Flow Bài Dạy Sư Phạm & Ghi Bài Chặng:**
   * **Khởi động (Hook Slide):** Bắt đầu bằng tình huống/câu đố gợi mở, không áp đặt dạy bài mới ngay.
   * **Slide ghi bài đầu giờ:** Nền trắng tinh khiết, chữ siêu to, có nút phóng to 100% toàn màn hình (`⛶`), KHÔNG đặt đồng hồ đếm ngược (Timer), nội dung ghi tối giản chắt lọc từ khóa.
   * **Hoạt động Khám phá & Thực hành:** Có câu chuyển tiếp mượt mà giữa các chặng, có badge đối chiếu `📖 Hình X - Trang Y SGK`, tương tác 100% không đạo cụ (Zero-Prop ký hiệu tay), chuyển hóa khái niệm/kỹ năng thành hình ảnh trực quan đời sống. Nếu có bàn phím ảo phải canh đều 2 mép và thụt hàng ANSI chuẩn. Chia thẻ ghi nhớ ngắn gọn ở cuối mỗi hoạt động.
   * **Chốt kiến thức 5 phút cuối:** Bắt buộc đặt ngay trước Slide Bảng vàng vinh danh (thiết kế 2-3-4 card to, rõ, ít chữ; quy trình Active Recall: học sinh tự nhớ lại trước, giáo viên bổ sung sau; thiết kế đủ câu hỏi cho tất cả các tổ tham gia thi đua).
5. **Bước 5 — Tích hợp Xuất Báo cáo CSV:**
   * Gắn nút xuất CSV / Đồng bộ Drive ở màn hình tổng kết sử dụng `window.LessonExport` hoặc `window.uploadCsvToDrive` (đảm bảo bảng xếp hạng thể hiện đúng cơ chế đồng hạng).

---

## 📋 3. BẢNG TỰ KIỂM TRA TRƯỚC KHI BÀN GIAO (PRE-FLIGHT CHECKLIST)

Trước khi gửi phản hồi hoàn thành cho Giáo viên, AI phải tự rà soát:
- [ ] Không có link CDN bên ngoài nào (`cdnjs`, `jsdelivr`, `unpkg`,...) trong mã nguồn?
- [ ] Đã nhúng `prevent-reload.js` và `core.js` chưa?
- [ ] Font chữ có đúng chuẩn của Khối đó không?
- [ ] Các menu điều khiển, thanh công cụ giáo viên (Teacher Toolbar / Drawer) nếu có: Cho phép ẩn/hiện linh hoạt bằng nút Hamburger (`☰`) để tối ưu 100% diện tích màn chiếu cho học sinh quan sát bài giảng?
- [ ] Mọi chỗ có học sinh phát biểu đều có ô chọn học sinh + nút Gacha chưa? (Chỉ log telemetry, không cộng điểm tổ khi phát biểu tự do)
- [ ] Nếu đấu theo tổ: Đã hỗ trợ cơ chế bốc thăm linh hoạt (học sinh đổi chỗ ngồi mỗi tuần nên không gán tổ cố định; giáo viên bấm Gacha nhiều lần tới khi nào trúng bạn thuộc tổ đang tới lượt thì chốt hoặc chọn nhanh từ danh sách, không xem việc ra bạn tổ khác là lỗi) chưa?
- [ ] UI thi đua có nút linh hoạt từ 2 đến 6 tổ (`[+ Thêm Tổ]` / `[- Bớt Tổ]`) chưa?
- [ ] Tương tác 100% không đạo cụ (Zero-Prop): Sử dụng ký hiệu tay (ngón tay 1-2-3-4 cho ABCD, X/O, thả tim) + Gacha, không dùng bảng con/hoa xoay/đạo cụ giấy tờ?
- [ ] Có Slide khởi động (Hook) khơi gợi tò mò đầu giờ chưa? (Không mở đầu áp đặt một chiều)
- [ ] Có câu chuyển tiếp logic, mượt mà giữa các hoạt động/chặng trong bài chưa?
- [ ] Trang ghi bài vào vở có nền trắng tinh khiết, chữ đủ to cho học sinh cuối lớp và có nút toàn màn hình (`⛶`) không?
- [ ] Ghi bài đúng 1 lần duy nhất ở đầu giờ (Tiết 1 tóm gọn 1-2 câu ngắn, Tiết 2+ chỉ ghi tựa bài; tuyệt đối KHÔNG bắt chép lắt nhắt nhiều chặng để dành tối đa thời gian thực hành máy tính)?
- [ ] TUYỆT ĐỐI KHÔNG có đồng hồ đếm ngược (Timer) ở phần chép bài? Nội dung chép có chắt lọc từ khóa tối giản chưa?
- [ ] Có badge đối chiếu tài liệu Sách giáo khoa (`📖 SGK Trang...`) ở các nội dung chi tiết không?
- [ ] Khái niệm trừu tượng/kỹ năng có được trực quan hóa gần gũi với lứa tuổi (so sánh đời sống, mã màu, làm mẫu) thay vì số liệu khô khan không?
- [ ] Nếu có bàn phím ảo: Đã canh đều phẳng 2 bên mép và đúng độ thụt hàng công thái học ANSI (Q thụt so với 1, A thụt so với Q, Z thụt so với A) chưa?
- [ ] Khẩu lệnh và lời dẫn sư phạm có dứt khoát, mang tính định hướng hành động rõ ràng không? (Không hỏi ngược nước đôi)
- [ ] Trước bảng vinh danh đã có slide chốt kiến thức / ghi nhớ (2-3-4 card, ít chữ, chữ lớn, dành trọn 5 phút cuối cho học sinh Active Recall) chưa? Có đủ câu hỏi củng cố cho tất cả các tổ tham gia không?
- [ ] Toàn bộ quests / câu hỏi đã được tách ra DUY NHẤT 1 file `quests.js` (`window.QUESTS_DATA = [...]`) bên cạnh, KHÔNG dùng `quests.json` và không tích hợp vào HTML chưa?
- [ ] Logic gọi tên có đảm bảo nguyên tắc: *Trả lời xong mới tính là hoàn thành* (Picked ≠ Done)?
- [ ] Cảm biến đo thao tác (Telemetry) có đặt đúng ngữ cảnh (chỉ bật khi học sinh trực tiếp bấm máy)?
- [ ] Điểm khởi đầu mặc định có được thiết lập 1000đ (đối với các tiết/game có hệ thống tính điểm) không?
- [ ] Bảng điểm tổ tối giản: Không có nút +/- 50, +/- 100 rác UI? Đã hỗ trợ click trực tiếp vào điểm để nhập sửa điểm và nút phạt ồn `🤫 -10%` kèm Toast thông báo chưa?
- [ ] Luồng bài dạy là gọi học sinh lên bảng lần lượt từng em, tuyệt đối KHÔNG có tính năng "Chấm hàng loạt" gây dư thừa trên UI?
- [ ] Bảng xếp hạng và xuất CSV có cơ chế xử lý đồng hạng (bằng điểm → cùng hạng, cùng cúp/huy chương, danh hiệu "Đồng Quán quân / Đồng Á quân") không?
- [ ] Nếu là Khối 5 và kích hoạt Phe Quỷ: Đã tuân thủ cơ chế Bất Công Công Khai (chỉ áp dụng Khối 5, tuyệt đối không áp dụng Khối 1-4; không trao quyền Quỷ Vương cầm máy, đúng +50% max 1000đ, sai/phạt -200đ vào Quỹ Cứu Trợ, rớt sàn <800đ, ân xá hoàn lương) chưa?
- [ ] Tên file CSV xuất ra có đúng quy cách `KetQua_TinHoc{Khoi}_Lop_{Lop}_Tiet_{Tiet}...` không?
- [ ] 100% file HTML đã có cơ chế tự động lưu LocalStorage (Auto-Save) phòng cúp điện/sập nguồn chưa?
- [ ] 100% file HTML đã có nút Xóa dữ liệu phiên (Clear Session Button) có xác nhận confirm và thông báo chưa?

---

## 🔄 4. GIAO THỨC CẬP NHẬT QUY CHUẨN (LIVING DOCUMENT PROTOCOL)

* `AGENTS.md` và `STANDARDS.md` là **Tài liệu sống**.
* Bất cứ khi nào Giáo viên nói: *"Cập nhật quy chuẩn mới...", "Thêm quy tắc...", "Đổi cách làm này..."*, AI Agent phải:
  1. Lắng nghe và xác nhận chính xác ý định sư phạm / kỹ thuật của Giáo viên.
  2. Lập tức cập nhật trực tiếp vào cả hai tệp `AGENTS.md` và `STANDARDS.md`.
  3. Áp dụng quy chuẩn mới này cho các tác vụ tiếp theo mà không cần nhắc lại.
