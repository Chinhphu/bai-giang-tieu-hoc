# CẨM NANG QUY CHUẨN KỸ THUẬT & SƯ PHẠM TOÀN HỆ THỐNG (STANDARDS.md)
> **Dự án:** Slide bài giảng tương tác Tin học Tiểu học (Khối 1 - Khối 5)  
> **Phiên bản:** 2.0 (Chuẩn hóa toàn diện 2026-2027)  
> **Trạng thái:** Tài liệu sống (Living Document) — Sẵn sàng mở rộng và cập nhật theo yêu cầu của Giáo viên.

---

## 📑 MỤC LỤC
1. [Kiến trúc Tổng thể & Cấu trúc Thư mục](#1-kiến-trúc-tổng-thể--cấu-trúc-thư-mục)
2. [Bộ Quy tắc An toàn Tiết học & Chống Reload](#2-bộ-quy-tắc-an-toàn-tiết-học--chống-reload)
3. [Quy chuẩn Sư phạm: Flow Bài Dạy, UX Tiểu Học, Ghi Bài & Chốt Kiến Thức](#3-quy-chuẩn-sư-phạm-flow-bài-dạy-ux-tiểu-học-ghi-bài--chốt-kiến-thức)
4. [Vòng đời Gọi tên (Turn Lifecycle) & Phân luồng Gacha](#4-vòng-đời-gọi-tên-turn-lifecycle--phân-luồng-gacha)
5. [Hệ thống Đo lường Hành vi (Telemetry) & Đánh giá TT27 / SMAS](#5-hệ-thống-đo-lường-hành-vi-telemetry--đánh-giá-tt27--smas)
6. [Hệ thống Báo cáo CSV Chuẩn UTF-8 BOM & Đồng bộ Drive](#6-hệ-thống-báo-cáo-csv-chuẩn-utf-8-bom--đồng-bộ-drive)
7. [Design System & Bản sắc Typography theo Khối](#7-design-system--bản-sắc-typography-theo-khối)
8. [Hệ thống Âm thanh Web Audio API (Offline Synthesizer)](#8-hệ-thống-âm-thanh-web-audio-api-offline-synthesizer)
9. [Hệ thống Lưu trữ LocalStorage Bắt Buộc & Phục Hồi Khi Cúp Điện (Crash Recovery & Auto-Save)](#9-hệ-thống-lưu-trữ-localstorage-bắt-buộc--phục-hồi-khi-cúp-điện-crash-recovery--auto-save)
10. [Hệ thống Điểm Khởi Đầu 1000đ, Xếp Rank Đồng Hạng & Can Thiệp Sửa Điểm/Chuỗi Dây Khi Thao Tác Nhầm](#10-hệ-thống-điểm-khởi-đầu-1000đ-xếp-rank-đồng-hạng--can-thiệp-sửa-điểmchuỗi-dây-khi-thao-tác-nhầm)
11. [Hệ thống Quản lý Quests & Câu hỏi Tách rời File JSON](#11-hệ-thống-quản-lý-quests--câu-hỏi-tách-rời-file-json)
12. [Hệ thống Tính Năng Ẩn: Cơ Chế "Phe Quỷ" / "Đấu Trường Ma Vương" (Demon Faction & Anti-Griefing Mechanism)](#12-hệ-thống-tính-năng-ẩn-cơ-chế-phe-quỷ--đấu-trường-ma-vương-demon-faction--anti-griefing-mechanism)
13. [Hệ thống Dàn Dựng Bàn Phím Máy Tính Ảo Chuẩn Công Thái Học (Realistic ANSI Keyboard Layout)](#13-hệ-thống-dàn-dựng-bàn-phím-máy-tính-ảo-chuẩn-công-thái-học-realistic-ansi-keyboard-layout)
14. [Giao thức Cập nhật Quy chuẩn (Living Document Protocol)](#14-giao-thức-cập-nhật-quy-chuẩn-living-document-protocol)

---

## 1. KIẾN TRÚC TỔNG THỂ & CẤU TRÚC THƯ MỤC

### 1.1 Cây thư mục dự án
```text
bai-giang-tieu-hoc/
├── AGENTS.md                  # Chỉ thị tối cao cho AI Agent
├── STANDARDS.md               # Cẩm nang kỹ thuật & sư phạm toàn diện (File này)
├── README.md                  # Hướng dẫn nhanh cho người dùng
├── assets/
│   ├── data/                  # Danh sách học sinh toàn trường niên khóa 2026-2027
│   │   ├── students_1_2026_2027.json
│   │   ├── students_2_2026_2027.json
│   │   ├── students_3_2026_2027.json
│   │   ├── students_4_2026_2027.json
│   │   └── students_5_2026_2027.json
│   ├── fonts/                 # Bộ font Google Fonts & Material Symbols (.woff2) chạy 100% offline
│   └── images/                # Hình ảnh, icon dùng chung
├── shared/
│   ├── css/
│   │   └── core.css           # CSS cơ bản toàn hệ thống
│   └── js/
│       ├── core.js            # Xuất CSV UTF-8 BOM, đồng bộ GAS, helper toàn hệ thống
│       └── prevent-reload.js  # Bộ bảo vệ chống bấm nhầm phím/chuột làm mất dữ liệu
├── khoi-1/ ... khoi-5/        # Thư mục bài giảng 5 khối lớp
│   ├── shared/                # Thành phần dùng chung của khối (template.html, components.js, style.css)
│   ├── theme/                 # Theme CSS đặc thù của khối
│   ├── tiet-01/               # Bài học Tiết 1
│   │   └── index.html
│   └── tiet-35/
└── games/                     # Kho mini-games hỗ trợ tiết dạy (caro, gõ phím, lật thẻ...)
```

### 1.2 Nguyên tắc "100% Offline-First"
* Mọi file HTML của tiết học phải chạy trơn tru khi mở bằng giao thức tệp trực tiếp `file:///...`.
* **CẤM tuyệt đối việc nhúng CDN bên ngoài** (`cdnjs`, `jsdelivr`, `unpkg`, font awesome...).
* Tất cả hiệu ứng Confetti, âm thanh, xuất CSV phải hoàn toàn xử lý bằng JavaScript nội bộ.
* Toàn bộ Google Fonts (Baloo 2, Nunito, Quicksand, Be Vietnam Pro) và Google Material Symbols được lưu trữ cục bộ dưới dạng file `.woff2` tại `assets/fonts/` và khai báo `@font-face` trong `shared/css/core.css`. Tuyệt đối không dùng CDN font ngoài và không để thiếu font làm rơi về font mặc định Segoe UI.

---

## 2. BỘ QUY TẮC AN TOÀN TIẾT HỌC & CHỐNG RELOAD

### 2.1 File nạp bắt buộc trong `<head>`
```html
<!-- Bộ chống reload và Helper xuất file CSV đồng bộ Google Drive chuẩn toàn hệ thống -->
<script src="../../shared/js/prevent-reload.js"></script>
<script src="../../shared/js/core.js"></script>
```

### 2.2 Các hành vi bị vô hiệu hóa tự động
1. **Phím Reload:** `F5`, `Ctrl+F5`, `Shift+F5`, `Ctrl+R`, `Cmd+R` $\to$ Chặn tức thì, hiện toast cảnh báo màu đỏ trên cùng màn hình.
2. **Phím Điều hướng lùi:** `Alt+Mũi tên trái`, `Alt+Mũi tên phải`, `Backspace` ngoài ô input/textarea $\to$ Chặn để tránh bị back về trang trước làm mất điểm số.
3. **Chuột phải (Context menu):** Bị khóa để tránh học sinh bấm nhầm *"Tải lại"* hoặc mở kiểm tra mã nguồn (*Giáo viên nếu cần mở menu chuột phải gốc: giữ `Shift + Chuột phải`*).

### 2.3 Cơ chế cho phép Reload có chủ đích (Bypass)
Khi giáo viên bấm nút "Làm lại từ đầu" hoặc "Bắt đầu tiết mới", code JavaScript PHẢI gọi hàm bypass trước:
```javascript
window.allowPageReload(); // Mở khóa cảnh báo beforeunload
location.reload();
```

---

## 3. QUY CHUẨN SƯ PHẠM: FLOW BÀI DẠY, UX TIỂU HỌC, GHI BÀI & CHỐT KIẾN THỨC
*(Áp dụng nhất quán cho toàn bộ 5 khối lớp từ Khối 1 đến Khối 5 và mọi chủ đề bài học)*

### 3.1 Khâu Khởi Động & Tạo Tâm Thế Học Tập (The Hook / Lead-in)
* **Bản chất sư phạm:**
  * Học sinh tiểu học chỉ tiếp thu tốt nhất khi trí tò mò được kích hoạt và có nhu cầu tự thân muốn tìm hiểu kiến thức mới.
  * **TUYỆT ĐỐI CẤM:** Không được vừa bước vào tiết là mở slide bài mới, đọc tựa bài hoặc truyền thụ lý thuyết một chiều.
* **Quy chuẩn thiết kế Slide Khởi động (Hook Slide):**
  * BẮT BUỘC khởi đầu bằng một tình huống có vấn đề, câu đố gợi mở, hình ảnh so sánh đối lập, câu chuyện nhân vật hoặc minigame ngắn để học sinh *tự quan sát, tự phán đoán và tự gọi tên chủ đề/mục tiêu của bài học*.
  * **Định hướng theo lứa tuổi:**
    * *Khối 1 & Khối 2:* Nhân vật hoạt hình gặp tình huống rắc rối, câu đố hình ảnh, đoán bóng đồ vật, bài vần tương tác.
    * *Khối 3:* Tình huống so sánh đúng/sai trong đời sống, thử thách phán đoán nhanh, câu đố logic trực quan.
    * *Khối 4 & Khối 5:* Vụ án công nghệ thực tế, tình huống giả định cần giải cứu/tối ưu hệ thống, nghịch lý an toàn mạng hoặc bài toán cần công cụ tin học giải quyết.

### 3.2 Cầu Nối Chuyển Tiếp Sư Phạm Giữa Các Hoạt Động (Seamless Pedagogical Transitions)
* **Bản chất sư phạm:**
  * Duy trì dòng chảy nhận thức xuyên suốt (Flow state), tránh để bài học bị "gãy khúc" hoặc tạo cảm giác rời rạc giữa các phần.
* **Quy chuẩn chuyển tiếp:**
  * Giữa các chặng trong tiết học (từ Khám phá sang Luyện tập, từ Thao tác cá nhân sang Thi đua tổ đội, từ Lý thuyết sang Thực hành máy), slide và kịch bản sư phạm BẮT BUỘC có **1–2 câu dẫn mang tính nhân quả/logic phát triển kiến thức**.
  * Câu chuyển tiếp phải trả lời được cho học sinh: *Tại sao sau khi biết kiến thức A, chúng mình lại cần khám phá tiếp kỹ năng B? Hoạt động trước đã giúp ích gì để giải quyết thử thách tiếp theo?*

### 3.3 Trang Ghi bài vào vở — Tối Giản Tải Nhận Thức & Chuẩn UX Màn Chiếu
Học sinh tiểu học cần nhìn rõ từ khoảng cách xa (8–10m cuối lớp) để hạ bút chép đúng tựa bài và kiến thức vào vở:
* **Nền trắng tinh khiết (`#ffffff`):**
  * TUYỆT ĐỐI CẤM trang trí rườm rà (không kẻ hoa văn, không kẻ ô ly gây rối mắt khi chiếu máy chiếu mờ, không đổ bóng lòe loẹt).
  * Chữ có thể tô màu phân cấp nổi bật trên nền trắng (Thứ ngày: xám/xanh dịu, Môn học: xanh dương đậm, Tên bài: đỏ/cam nổi bật).
* **Typography Siêu To (Super-sized Typography):**
  * Thứ ngày tháng: `28px` – `34px` (đậm `700`).
  * Tên môn học: `36px` – `44px` (đậm `900`, in hoa).
  * Tựa đề bài học: `50px` – `64px` (đậm `900`, in hoa).
  * Dòng ghi nhớ/tóm tắt: `30px` – `38px` (đậm `800`, giãn dòng `1.6`).
* **Ghi chép tối giản — Chắt lọc từ khóa cốt lõi:**
  * Sách giáo khoa đã in đầy đủ nội dung bài học. Học sinh tiểu học viết chữ rất chậm, nếu ép chép đoạn văn dài sẽ ngốn hết thời gian thực hành máy tính và biến giờ Tin học thành giờ chép chính tả.
  * Chỉ cho học sinh ghi chép những từ khóa, công thức hành động hoặc quy tắc thật sự cốt lõi cần nhớ lâu dài.
* **TUYỆT ĐỐI CẤM đặt Đồng hồ đếm ngược (Timer) khi học sinh chép bài:**
  * Cấm kỵ tuyệt đối việc ra khẩu lệnh: *"Các em có đúng 3 phút chép bài"* kèm widget đồng hồ đếm ngược tích tắc nhảy giây trên màn hình.
  * Áp lực thời gian khiến vỏ não trẻ bị ức chế, học sinh hoảng sợ cắm đầu chép vội chép vàng cho kịp giờ, chữ viết nguệch ngoạc và hoàn toàn triệt tiêu khả năng ghi nhớ dài hạn. Giáo viên điều phối nhịp độ chép bài bằng cách quan sát thực tế trong lớp.
* **BẮT BUỘC có nút Chế độ Toàn Màn Hình (Fullscreen Toggle) — Quy Chuẩn 1 Nút Zoom / 1 Nút Tắt Duy Nhất:**
  * **Trạng thái bình thường:** Chỉ hiển thị **DUY NHẤT 1 NÚT ZOOM** `⛶ Chế độ toàn màn hình chép bài` (`.btn-fs-toggle`). Nút tắt `btn-fs-close` bắt buộc ẩn hoàn toàn (`display: none !important;`).
  * **Trạng thái toàn màn hình:** Khung ghi bài phóng to chiếm trọn 100% màn hình TV (`100vw x 100vh`), ẩn hoàn toàn sidebar và các thanh điều hướng. Chỉ hiển thị **DUY NHẤT 1 NÚT TẮT** `✖ Thu nhỏ (Esc)` (`.btn-fs-close`) ghim cố định ở góc trên bên phải màn hình (`position: fixed; top: 20px; right: 28px; z-index: 1000000;`).
  * **TUYỆT ĐỐI CẤM:** Không được đổi tên nút Zoom thành nút tắt thứ hai (`btn.innerHTML = '✖ Thu nhỏ'`). Khi ở chế độ phóng to, nút Zoom ban đầu bắt buộc phải tự động ẩn đi (`display: none !important;`) để trên màn hình không bao giờ xuất hiện 2 nút tắt thừa thãi.

Mẫu HTML chuẩn:
```html
<div class="notebook clean" id="notebook-box">
    <button type="button" class="btn-fs-close" onclick="toggleNotebookFullscreen()">
        ✖ Thu nhỏ (Esc)
    </button>
    <div class="nb-date"><span class="notebookDateDisplay" id="current-date-line">Đang cập nhật ngày...</span></div>
    <div class="nb-subject">Môn: Tin học [Khối]</div>
    <div class="nb-title">BÀI X: [TÊN BÀI HỌC]</div>
    <div class="nb-content">
        ✍️ <b>Kiến thức cốt lõi:</b> [1-2 dòng ngắn gọn cần chép vào vở]
    </div>
</div>
```

Script cập nhật ngày tháng Tiếng Việt chuẩn thời gian thực & Fullscreen Toggle:
```javascript
function updateVietnameseDate() {
    const now = new Date();
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const dayName = days[now.getDay()];
    const date = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    const dateStr = `${dayName}, ngày ${date} tháng ${month} năm ${year}`;
    document.querySelectorAll('.currentDateDisplay, .notebookDateDisplay, #current-date-line').forEach(el => el.innerText = dateStr);
}
updateVietnameseDate();

function toggleNotebookFullscreen() {
    const target = document.getElementById('notebook-box');
    if (!target) return;
    const isFs = target.classList.toggle('fullscreen-mode');
    const btn = document.getElementById('btn-toggle-fs');
    if (btn) btn.style.display = isFs ? 'none' : 'inline-flex';
    
    if (isFs && target.requestFullscreen) target.requestFullscreen().catch(() => {});
    else if (!isFs && document.fullscreenElement) document.exitFullscreen().catch(() => {});
}
```

### 3.4 Quy tắc "Ghi bài xé nhỏ" (Progressive Chunking)
* Học sinh tiểu học sẽ rất chán nản nếu bắt chép một đoạn văn dài một lần.
* Sau mỗi phần hoạt động/khám phá kiến thức mới, chỉ xuất hiện **1 thẻ ghi nhớ nhỏ** (`.memo-card`):
```html
<div class="memo-card">
    <div class="memo-badge">✍️ Em ghi nhớ:</div>
    <p class="memo-text">
        [1-2 câu cô đọng, in đậm <b>từ khóa quan trọng</b>]
    </p>
</div>
```
* Giáo viên cho học sinh thực hành/thảo luận xong mới bấm hiển thị thẻ này, các em hạ bút viết đúng 1-2 dòng vào vở rồi chuyển hoạt động.

### 3.5 Nguyên Lý Trực Quan Hóa Khái Niệm & Kỹ Năng (Concrete over Abstract)
* **Bản chất tâm lý học lứa tuổi:**
  * Học sinh tiểu học (6–11 tuổi) đang ở giai đoạn tư duy thao tác cụ thể (Jean Piaget). Các em không thể tiếp thu tốt các khái niệm thông qua số đo cơ học trừu tượng, thông số kỹ thuật khô khan hay định nghĩa hàn lâm.
* **Chiến lược chuyển thể trực quan:**
  1. **Ẩn dụ đời sống quen thuộc (Real-world Analogies):**
     * Thư mục $\rightarrow$ Ngăn kéo tủ đựng tài liệu có dán nhãn.
     * Tệp (file) $\rightarrow$ Từng cuốn vở/bức tranh bỏ vào ngăn kéo.
     * Dung lượng (MB, GB) $\rightarrow$ Kích thước bình chứa nước/balo đi học.
     * Thuật toán $\rightarrow$ Công thức từng bước làm bánh hoặc cách pha một ly sữa.
     * Mạng Internet $\rightarrow$ Mạng lưới đường giao thông kết nối các ngôi nhà.
  2. **Thị giác hóa & Mã màu (Color-coding & Visual Landmarks):**
     * Dùng màu sắc và biểu tượng trực quan thay cho việc gọi tên khô khan (ví dụ: gán mã màu cho phím, dán sticker màu phân biệt nút thiết bị, dùng icon minh họa chức năng phần mềm).
  3. **Thao tác mẫu thực tế & Đối chiếu hành vi (Visual Demonstration):**
     * Thay vì đưa ra các con số khoảng cách trừu tượng (như `20cm`, `50cm`), giáo viên dùng thước đo cơ thể gần gũi (gang tay, sải tay, tầm mắt) hoặc làm mẫu trực quan hành vi đúng và hành vi sai để học sinh tự quan sát và phân tích tại chỗ.

### 3.6 Nguyên Tắc Kết Hợp Đa Phương Tiện & Sách Giáo Khoa (Multimodal SGK Scaffolding)
* **Bản chất sư phạm:**
  * Slide màn chiếu TV giải quyết tính tương tác, dẫn dắt câu chuyện và trò chơi hóa (gamification).
  * Sách giáo khoa (SGK) trên bàn học sinh là điểm tựa tri thức chuẩn mực và bền vững.
* **Quy chuẩn đối chiếu:**
  * Trong điều kiện phòng máy tính rộng hoặc màn hình TV bị lóa sáng ban ngày, học sinh ngồi xa sẽ khó nhìn rõ các chi tiết nhỏ hoặc sơ đồ phức tạp.
  * Bất cứ khi nào xuất hiện sơ đồ chi tiết, bảng dữ liệu, văn bản đọc hiểu hoặc nhiệm vụ thực hành: Slide luôn có badge hoặc dòng nhắc đối chiếu rõ ràng:
    ```html
    <div class="sgk-pill">📖 Xem Hình X - Trang Y (SGK)</div>
    ```
  * Giáo viên rèn luyện cho học sinh thói quen kết hợp nhịp nhàng giữa quan sát màn hình chung và tự đối chiếu trên tài liệu cá nhân.

### 3.7 Quản Lý Lớp & Khai Thác Tài Nguyên Tương Tác 100% Đồng Loạt
* **Chống mô hình thụ động "1 em trả lời — cả lớp ngồi xem":**
  * Trong giờ học tương tác, nếu giáo viên chỉ gọi từng em phát biểu thì 30–35 em còn lại sẽ dễ mất tập trung, nói chuyện riêng hoặc chơi game ngoài luồng.
* **Tương tác 100% đồng loạt qua Đồ dùng học tập (DCHT) — Khuyến khích & Ưu tiên:**
  * **Tính chất:** Ưu tiên khai thác khi phòng máy/lớp học có sẵn trang bị, KHÔNG bắt buộc cứng nhắc nếu lớp không có.
  * *Khi lớp có sẵn đồ dùng (bông hoa xoay trắc nghiệm ABCD, bảng con, thẻ màu tín hiệu...):* Yêu cầu cả lớp cùng suy nghĩ và đồng loạt giơ đáp án $\rightarrow$ 100% học sinh đều phải động não. Giáo viên chỉ mất 3 giây quét mắt quanh phòng là nắm bắt chính xác mức độ hiểu bài của toàn bộ học sinh (Formative Assessment).
  * *Khi lớp không có đồ dùng:* Giáo viên linh hoạt thay thế bằng hình thức giơ tay, hô đáp án đồng thanh hoặc tương tác trực tiếp qua câu hỏi trên màn chiếu TV.
* **Khuếch đại trực quan bằng công nghệ lớp học (nếu có trang bị):**
  * Tận dụng Đèn chiếu vật thể (Document Camera) hoặc tính năng chia sẻ màn hình máy chủ để chiếu phóng to các thao tác mẫu tinh vi (thao tác ngón tay trên phím/chuột, cấu tạo linh kiện phần cứng, mẫu sản phẩm đồ họa/Scratch/soạn thảo) lên màn hình lớn cho toàn bộ lớp quan sát rõ nét.
* **Nghệ thuật Khẩu lệnh Sư phạm Dứt khoát (Decisive Directives):**
  * Giáo viên là người làm chủ không gian phòng máy. Khẩu lệnh đưa ra phải ngắn gọn, dứt khoát và định hướng hành động rõ ràng (*"Hành động + Đối tượng + Thời điểm"*, ví dụ: *"Cả lớp mở sách trang 20"*, *"Hai tay đặt lên bàn phím"*).
  * **TUYỆT ĐỐI CẤM** dùng những câu hỏi ngược lại học sinh mang tính do dự, nước đôi (*"Hình này phải không các em?", "Làm vậy đúng không ta?"*). Slide và kịch bản sư phạm phải dùng các câu khẳng định chuẩn xác, truyền sự tự tin cho học sinh.

### 3.8 Màn Hình Chốt Kiến Thức & Quy Trình 5 Phút Vàng (Consolidation Flow)
* **Vị trí bắt buộc:** Liền trước slide Bảng vàng vinh danh (Slide kế cuối).
* **Quy trình Sư phạm 5 Phút Vàng Cuối Tiết:**
  * BẮT BUỘC dành trọn vẹn 5 phút cuối giờ để củng cố kiến thức, tuyệt đối không dạy lấn giờ hoặc cắt xén phần này.
  * **Quy tắc: Học sinh tự nhớ lại trước (Active Recall) $\rightarrow$ Giáo viên bổ sung & Chốt lại sau:** Giáo viên đặt câu hỏi mở gợi ý để học sinh tự tóm tắt lại 2–3 bài học/kỹ năng quan trọng nhất hôm nay (ví dụ: *"Hôm nay chúng mình đã khám phá được những bí kíp quan trọng nào?"*). Khi học sinh nêu đúng và đủ, cả lớp vỗ tay; nếu còn thiếu, giáo viên gợi mở cho bạn khác bổ sung rồi mới bấm hiển thị các thẻ ghi nhớ trên màn hình.
  * **Đủ câu hỏi lấy điểm thi đua cho TẤT CẢ các tổ:** Nếu phần chốt bài có lồng ghép các câu hỏi củng cố / ghi nhớ lấy điểm thi đua, **BẮT BUỘC phải chuẩn bị đủ số lượng câu hỏi/lượt củng cố cho TẤT CẢ các tổ đang tham gia** (ví dụ lớp có 4 tổ thì có tối thiểu 4 câu hỏi, chia đều mỗi tổ 1 lượt). Đảm bảo mọi tổ đều có cơ hội cộng điểm công bằng trước khi tổng kết bảng vàng chung cuộc.
* **Nguyên tắc thiết kế Slide chốt:**
  * Design tối giản, ít chữ, chữ lớn (tiêu đề `28px` – `34px`, nội dung `22px` – `26px`, in đậm).
  * Phân bố dạng lưới **2, 3 hoặc 4 card** (`.summary-card-grid.grid-2`, `.grid-3`, `.grid-4`):
```html
<section class="slide fs" id="slide-summary">
    <div class="tag" style="background:#10b981; color:#fff;">💡 Ghi nhớ bài học · Chốt kiến thức</div>
    <h1>💡 EM GHI NHỚ ([X] QUY TẮC CỐT LÕI)</h1>

    <div class="summary-card-grid grid-3">
        <!-- Card 1 -->
        <div class="summary-card" style="border-top-color: #d97706;">
            <div class="sc-badge" style="background:#fef3c7; color:#b45309;">Ý 1</div>
            <div class="sc-title" style="color:#b45309;">TIÊU ĐỀ NGẮN 1</div>
            <div class="sc-desc">Nội dung 1-2 câu chốt, in đậm <b>từ khóa quan trọng</b>.</div>
        </div>
        <!-- Card 2 -->
        <div class="summary-card" style="border-top-color: #2563eb;">
            <div class="sc-badge" style="background:#dbeafe; color:#1d4ed8;">Ý 2</div>
            <div class="sc-title" style="color:#1d4ed8;">TIÊU ĐỀ NGẮN 2</div>
            <div class="sc-desc">Nội dung 1-2 câu chốt, in đậm <b>từ khóa quan trọng</b>.</div>
        </div>
        <!-- Card 3 -->
        <div class="summary-card" style="border-top-color: #7c3aed;">
            <div class="sc-badge" style="background:#ede9fe; color:#6d28d9;">Ý 3</div>
            <div class="sc-title" style="color:#6d28d9;">TIÊU ĐỀ NGẮN 3</div>
            <div class="sc-desc">Nội dung 1-2 câu chốt, in đậm <b>từ khóa quan trọng</b>.</div>
        </div>
    </div>

    <div style="margin-top: 24px;">
        <button class="btn-action mint" onclick="goSlide(1)">
            🏆 XEM BẢNG VÀNG VINH DANH ▶
        </button>
    </div>
</section>
```

---

## 4. VÒNG ĐỜI GỌI TÊN (TURN LIFECYCLE) & CƠ CHẾ GACHA

### 4.1 Mô hình 3 trạng thái của Học sinh
$$\text{1. Chờ (Waiting)} \xrightarrow[\text{Bấm Gacha lại để quay tiếp}]{Bốc\ thăm\ Gacha\ /\ Chọn} \text{2. Lên máy (Staged)} \xrightarrow{Trả\ lời\ xong\ /\ Xác\ nhận} \text{3. Đã hoàn thành (Done)}$$

* **Bản chất của Gacha:** Gacha thực chất là hành động chọn (select) ngẫu nhiên một em học sinh và **bật Pop-up siêu to (Giant Modal)** lên màn chiếu để tạo không khí sôi nổi cho cả lớp.
* **KHÔNG tạo nút "Đổi em khác" rườm rà:** 
  * Nút bấm Gacha luôn sẵn sàng trên thanh điều khiển.
  * Nếu học sinh được gọi vắng mặt, chưa sẵn sàng, hoặc chưa đúng em mong muốn: Giáo viên chỉ cần **bấm lại nút Gacha** để hệ thống bốc tiếp bạn khác.
* **Nguyên tắc "Làm xong mới tính" (Picked ≠ Done):**
  * Việc bấm Gacha nhiều lần để chọn người hoàn toàn không làm mất lượt của học sinh.
  * Chỉ khi học sinh **nhập đáp án, click tấn công hoặc giáo viên bấm Xác nhận kết quả**, hệ thống mới chính thức chuyển em đó sang mảng `playedStudents` (Done) và ghi nhận vào lịch sử / CSV.

### 4.2 Ứng dụng Gacha theo Chế độ Tiết học
1. **Chế độ Toàn lớp / Cá nhân (Đấu quái toán, Luyện chuột, Gõ phím tiếp sức):**
   * Bấm Gacha tự động bốc ngẫu nhiên từ mảng học sinh chưa tham gia (`remainingStudents`).
   * Pop-up hiện tên thật to để cả lớp cùng quan sát bạn bước lên máy tính.
2. **Chế độ Thi đua Theo Tổ (Nhóm ráp PC, Trắc nghiệm đồng đội):**
   * **Vẫn hỗ trợ dùng Gacha bình thường:** Do giáo viên không thể nhớ hết danh sách từng em thuộc tổ nào, giáo viên có thể bấm nút Gacha liên tục cho đến khi hiện ra tên một em thuộc **Tổ đang đến lượt** thì chốt em đó lên bảng.
   * Hoặc giáo viên có thể chọn trực tiếp từ danh sách tổ nếu có em xung phong giơ tay.

### 4.3 Bố Trí Widget Chọn Học Sinh & Phân Tách Điểm Số (Logging vs Team Scoring)
* **Widget Chọn Học Sinh Ở MỌI Vị Trí Phát Biểu:**
  * Bất cứ hoạt động nào cần học sinh giơ tay phát biểu (Khởi động, Khám phá kiến thức mới, Vấn đáp gợi mở, Chốt bài hay Minigame): BẮT BUỘC luôn bố trí cụm Widget:
    * Ô chọn tên nhanh (Dropdown/Select hoặc Input autocomplete) + Nút `🎲 Gacha` quay ngẫu nhiên.
* **Phân Tách Rạch Ròi: Log Telemetry Cá Nhân vs Điểm Số Tổ Thi Đua:**
  * **1. Khi phát biểu tự do (Khởi động, Khám phá, Vấn đáp giữa giờ, Chốt bài):** Thao tác chọn học sinh và ghi nhận câu trả lời **CHỈ DÙNG ĐỂ GHI NHẬN (LOG) VÀO TELEMETRY CÁ NHÂN** (ghi nhận em đó đã phát biểu, đúng/sai, xếp loại TT27 để xuất file CSV cuối tiết). **TUYỆT ĐỐI KHÔNG tự động cộng/trừ điểm vào Tổ** để giữ cho thang điểm thi đua không bị loãng hoặc mất cân bằng.
  * **2. Chỉ khi bước vào VÒNG ĐẤU GAME / THỬ THÁCH CHÍNH THỨC:** Điểm số câu trả lời mới được kích hoạt cộng/trừ vào điểm số của Tổ thi đua!

---

## 5. HỆ THỐNG ĐO LƯỜNG HÀNH VI (TELEMETRY) & ĐÁNH GIÁ TT27 / SMAS

### 5.1 Phân luồng Actor-based Tracking
Hệ thống phải tự nhận biết ai đang là người điều khiển máy:

| Tiêu chí | Trường hợp A: Học sinh lên máy (`Actor: Student`) | Trường hợp B: Giáo viên bấm máy (`Actor: Teacher`) |
| :--- | :--- | :--- |
| **Bối cảnh** | Tiết luyện thao tác chuột, gõ số/tính toán, vượt ải cá nhân | Tiết thi đua theo tổ, giảng bài chung, câu hỏi toàn lớp |
| **Đo thao tác vật lý** | **BẬT FULL:** Bấm trượt, nhầm chuột phải, spam click, thời gian di chuột, phím sai, backspaces | **TẮT HOÀN TOÀN** (Không đo thao tác vật lý của giáo viên) |
| **Nhật ký sư phạm** | Ghi nhận câu trả lời, đúng/sai, số lỗi kỹ năng | Ghi nhận Tổ nào, Em nào, Câu hỏi, Đúng/Sai, Điểm số |
| **Đánh giá TT27** | Tự động sinh mức **T / H / C** và câu nhận xét SMAS chi tiết | Đánh giá theo mức độ tham gia và câu trả lời đúng |

### 5.2 Thuật toán phân loại Thông tư 27 (Cho Học sinh thao tác máy)
```javascript
function evaluateTT27({ isCorrect, misclicks, rightClicks, spamClicks, invalidKeys, backspaces, mouseTime }) {
    const errorCount = misclicks + rightClicks + spamClicks + invalidKeys;
    
    // 1. Hoàn thành Tốt (T)
    if (isCorrect && errorCount <= 1 && backspaces <= 1) {
        return {
            rating: 'T',
            comment: 'Nắm chắc kiến thức, thao tác chuột và bàn phím rất chuẩn xác, nhanh nhẹn.'
        };
    }
    
    // 2. Hoàn thành (H)
    if (isCorrect || errorCount <= 4) {
        let note = 'Thực hiện được yêu cầu bài học';
        if (misclicks > 1) note += ', cần rèn thêm kỹ năng cầm chuột ngắm chuẩn';
        if (invalidKeys > 0) note += ', chú ý nhìn đúng hàng phím số';
        return {
            rating: 'H',
            comment: note + '.'
        };
    }
    
    // 3. Chưa hoàn thành (C)
    return {
        rating: 'C',
        comment: 'Thao tác còn ngập ngừng, bấm nhầm phím/chuột nhiều lần, cần giáo viên hướng dẫn thêm.'
    };
}
```

---

## 6. HỆ THỐNG BÁO CÁO CSV CHUẨN UTF-8 BOM & ĐỒNG BỘ DRIVE

### 6.1 Định dạng tên file chuẩn thống nhất (Sắp xếp thời gian tự nhiên)
```text
KetQua_TinHoc{Khoi}_Lop_{Lop}_Tiet_{Tiet}_Ngay_{YYYY}-{MM}-{DD}_{HH}h{MM}p{SS}s.csv
```
* **Khối:** `1`, `2`, `3`, `4`, `5`.
* **Lớp:** Ký tự `/` hoặc `_` tự động đổi thành dấu `-` (Ví dụ: `2/2` thành `2-2`).
* **Tiết:** Định dạng 2 chữ số (Ví dụ: `Tiet_09`).
* **Thời gian & Ngày chuẩn ISO:** `Ngay_{YYYY}-{MM}-{DD}_{HH}h{MM}p{SS}s` (Ví dụ: `Ngay_2026-11-03_16h45p10s`).
* **Lợi thế:** Khi giáo viên mở thư mục trên Windows hoặc Google Drive và bấm sắp xếp theo Tên (Sort by Name), toàn bộ các file báo cáo sẽ tự động xếp theo đúng trình tự thời gian tăng dần hoặc giảm dần một cách chuẩn xác 100%.

### 6.2 Cấu trúc Multi-Section CSV (UTF-8 có BOM `\uFEFF`)
Để mở trực tiếp trên Excel Tiếng Việt không bao giờ bị lỗi font và không cần SheetJS `.xlsx`:
```text
"=== PHẦN 1: BẢNG XẾP HẠNG TỔ ==="
"Thứ Hạng","Huy Chương","Danh Hiệu","Tổ / Đội","Điểm Số","Đồng Hạng","Ghi Chú"
"Hạng 1","🥇","ĐỒNG QUÁN QUÂN","TỔ 1","1100","Có (Đồng điểm)","Xuất sắc"
"Hạng 1","🥇","ĐỒNG QUÁN QUÂN","TỔ 3","1100","Có (Đồng điểm)","Xuất sắc"
"Hạng 3","🥉","HẠNG BA","TỔ 2","1050","Không","Hoàn thành tốt"

"=== PHẦN 2: ĐÁNH GIÁ THEO DÕI HỌC SINH (TT27 / SMAS) ==="
"STT","Họ và Tên","Lớp","Câu hỏi","Kết quả","Bấm trượt","Di chuột (s)","Đánh giá TT27","Nhận xét SMAS"
"1","Nguyễn Văn A","2-2","60 - 20 = 40","Đúng","0","2.3","T","Nắm chắc kiến thức, thao tác chuột rất chuẩn xác."
```

### 6.3 Hàm API dùng chung (`shared/js/core.js`)
* `window.buildExportFileName({ grade, classId, lesson, prefix, date })`
* `window.exportToCsv(dataOrSections, fileName)`: Tải trực tiếp file CSV UTF-8 có BOM về máy giáo viên.
* `window.uploadCsvToDrive(dataOrSections, fileName)`: Mã hóa Base64 và bắn ngầm lên Google Apps Script Web App. Tự động chuyển hướng tải file về máy giáo viên nếu offline / mất mạng.

---

## 7. DESIGN SYSTEM & BẢN SẮC TYPOGRAPHY THEO KHỐI

### 7.1 Ma trận Nhận diện từng Khối
Sự khác biệt giữa các khối là **chủ đích thiết kế**, nhưng **TRONG NỘI BỘ MỘT KHỐI PHẢI ĐỒNG NHẤT 100%**:

| Khối | Font chữ Chuẩn | Màu Chủ Đạo | Màu Điểm Nhấn | Layout / Khung Slide |
| :--- | :--- | :--- | :--- | :--- |
| **Khối 1** | `'Baloo 2', 'Nunito', sans-serif` | Cam tươi `#f97316` | Vàng chanh, Xanh lá | Sân khấu chính + Mini Sidebar |
| **Khối 2** | `'Nunito', sans-serif` | Xanh dương `#0284c7` | Vàng `#f59e0b`, Đỏ `#dc2626` | Slide cuộn `.slide.active` + Bottom Navbar chân trang |
| **Khối 3** | `'Quicksand', sans-serif`| Xanh tím `#4361ee` | Vàng cam `#ffb703` | 2 cột: Màn hình chính (`.main`) + Sidebar ráp PC |
| **Khối 4** | `'Be Vietnam Pro', sans-serif` | Xanh Navy `#14213d` | Cam đất, Xanh lá | Header Tab đỉnh + Grid 2 cột |
| **Khối 5** | `'Be Vietnam Pro', sans-serif` | Xanh mint `#16b89a` | Xanh dương `#3178f6` | Web Components chuẩn Tiết 07 |

### 7.2 Thông số Kỹ thuật Màn chiếu TV Lớp học
* **Tiêu đề Slide (`.slide-title`):** Cỡ `2.4rem` – `3.5rem`, `font-weight: 800 - 900`.
* **Chữ Nội dung (`p`, `.desc`):** Cỡ `1.3rem` – `1.6rem`, `font-weight: 600 - 700`, `line-height: 1.5`.
* **Nút bấm Hành động (`button`):** Cỡ `1.2rem` – `1.6rem`, độ dày `800`, padding tối thiểu `12px 24px`, bo góc `12px – 999px`.
* **Đệm chân trang (Padding-bottom):** Bắt buộc chừa tối thiểu `120px` đến `140px` ở đáy trang để không bị thanh điều hướng che lấp nội dung.
* **Tương phản:** Nền sáng dịu mắt (xanh nhạt/kem/trắng xám), chữ tối màu (xanh navy đậm/đen xám), không dùng viền neon tương phản gắt làm mỏi mắt học sinh.

---

## 8. HỆ THỐNG ÂM THANH WEB AUDIO API (OFFLINE SYNTHESIZER)

100% hiệu ứng âm thanh được tổng hợp từ Web Audio API nội bộ trong trình duyệt, không dùng file `.mp3`:
* **Đúng / Khen thưởng (`playCorrect`):** Hợp âm chuông vang Đô - Mi - Sol (C5 - E5 - G5, 523Hz - 659Hz - 784Hz sóng Sine).
* **Sai / Báo lỗi (`playWrong` / `playBuzzer`):** Âm trầm giật 130Hz - 90Hz (sóng Sawtooth).
* **Chiến thắng (`playVictoryFanfare`):** Chuỗi nốt kèn trumpet mừng thắng cuộc.
* **Cảnh báo mất trật tự (`playNoiseAlert`):** Hai xung âm tút ngắn nhắc nhở cả lớp giữ im lặng.
* **Click / Thao tác nhẹ (`playClick`):** Xung âm 800Hz trong 0.05 giây.
* **Nút Mute:** Luôn hỗ trợ phím tắt hoặc nút góc để giáo viên tắt tiếng nhanh khi cần giảng bài.

---

## 9. HỆ THỐNG LƯU TRỮ LOCALSTORAGE BẮT BUỘC & PHỤC HỒI KHI CÚP ĐIỆN (CRASH RECOVERY & AUTO-SAVE)

### 9.1 Nguyên tắc "100% HTML Auto-Save & Crash Recovery"
* **Bối cảnh thực tế tại trường tiểu học:** Phòng máy vi tính tại trường tiểu học thường xuyên đối mặt với sự cố cúp điện đột ngột, aptomat tự ngắt khi quá tải, học sinh vấp dây nguồn làm sập máy, hoặc vô tình tắt nhầm tab/trình duyệt. Nếu dữ liệu điểm số, danh sách học sinh và tiến trình đang học bị mất sạch, Giáo viên và học sinh sẽ vô cùng hụt hẫng và tiết học bị đổ vỡ.
* **Quy chuẩn bắt buộc:**
  * **100% file HTML của bài học và mini-game** BẮT BUỘC phải cài đặt cơ chế tự động lưu trữ (Auto-Save) vào `localStorage`.
  * Mỗi khi có bất kỳ sự thay đổi trạng thái nào (điểm số các tổ/cá nhân, chuỗi dây streak thắng, slide hiện tại, học sinh đã được gọi, câu hỏi đã hoàn thành, telemetry), hệ thống phải tự động serialize và ghi ngay vào `localStorage`.
  * Khi trang web được mở lại (sau khi có điện trở lại hoặc mở lại trình duyệt), hệ thống tự động kiểm tra `localStorage`. Nếu phát hiện phiên học đang dang dở, hệ thống **tự động phục hồi nguyên trạng thái (Restore Session)** và hiển thị Toast màu xanh ngọc:
    ```text
    ⚡ Đã tự động khôi phục dữ liệu phiên học trước do sự cố tắt máy/cúp điện!
    ```

### 9.2 Quy ước cấu trúc Key
Mọi dữ liệu lưu phiên làm việc trên trình duyệt bắt buộc phải có tiền tố định danh đầy đủ, tuyệt đối không dùng tên chung chung (`state`, `game_data`) gây ghi đè chéo:
```text
bgtieu_hoc_k{Khoi}_tiet_{Tiet}_{Lop}_state
```
*Ví dụ:* `bgtieu_hoc_k2_tiet_09_2-2_state`, `bgtieu_hoc_k3_tiet_06_3-1_state`, `bgtieu_hoc_game_caro_state`.

### 9.3 Schema dữ liệu lưu trữ tiêu chuẩn
```json
{
  "grade": "2",
  "lesson": "09",
  "classId": "2_2",
  "updatedAt": "2026-11-03T16:30:00.000Z",
  "currentSlideIndex": 3,
  "teams": [
    { "id": 1, "name": "Tổ 1", "score": 1150, "streak": 2 },
    { "id": 2, "name": "Tổ 2", "score": 1050, "streak": 0 },
    { "id": 3, "name": "Tổ 3", "score": 1150, "streak": 1 },
    { "id": 4, "name": "Tổ 4", "score": 1000, "streak": 0 }
  ],
  "playedStudents": ["Nguyễn Văn A", "Trần Thị B"],
  "remainingStudents": ["Lê Văn C", "Phạm Thị D"],
  "completedQuests": [1, 2],
  "telemetryRecords": [
    {
      "studentName": "Nguyễn Văn A",
      "question": "60 - 20",
      "isCorrect": true,
      "rating": "T",
      "comment": "Nắm chắc kiến thức, thao tác chuột chuẩn xác."
    }
  ]
}
```

### 9.4 Bắt buộc Nút Xóa Dữ Liệu Phiên Học (Clear Session Button) Cho Mọi Trang HTML
* **Phạm vi áp dụng:** BẮT BUỘC có mặt trên **100% file HTML** (bài giảng và mini-game).
* **Vị trí & Thiết kế UI:**
  * Nút đặt tại Sidebar, thanh điều khiển chân trang hoặc Menu công cụ Giáo viên (Teacher Toolbar).
  * Nhãn nút rõ ràng: `🗑️ Xóa dữ liệu phiên` hoặc `🔄 Làm mới tiết học` (kèm tooltip giải thích: *"Xóa điểm và dữ liệu đã lưu để dạy lớp mới"*).
* **Quy trình Xác nhận An toàn:**
  1. Khi Giáo viên bấm nút, BẮT BUỘC hiển thị hộp thoại xác nhận `confirm()`:
     ```javascript
     if (confirm("⚠️ Bạn có chắc chắn muốn xóa toàn bộ điểm số và dữ liệu đã lưu của tiết này để bắt đầu lớp mới không?")) {
         // Thực hiện xóa đúng key
     }
     ```
  2. **Xóa chính xác phạm vi:** Chỉ xóa đúng key `STORAGE_KEY` của bài học/game đó (`localStorage.removeItem(STORAGE_KEY)`).
  3. **TUYỆT ĐỐI CẤM:** Không được gọi `localStorage.clear()` vì sẽ xóa sạch dữ liệu của các bài học hoặc khối lớp khác đang lưu trên máy tính phòng máy.
  4. Sau khi xóa, đặt lại trạng thái ban đầu (hoặc gọi `window.allowPageReload(); location.reload()`) và hiển thị thông báo: *"✅ Đã xóa dữ liệu phiên học thành công!"*.

### 9.5 Mẫu Code Quản Lý State Chuẩn Hóa
```javascript
const STORAGE_KEY = `bgtieu_hoc_k${CURRENT_GRADE}_tiet_${CURRENT_LESSON}_${CURRENT_CLASS}_state`;

// 1. Tự động lưu
function saveSessionState() {
    try {
        const state = {
            teams: STATE.teams,
            playedStudents: STATE.playedStudents,
            remainingStudents: STATE.remainingStudents,
            currentSlide: STATE.currentSlideIndex,
            telemetry: STATE.telemetryRecords,
            updatedAt: new Date().toISOString()
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
        console.warn('Không thể lưu LocalStorage:', e);
    }
}

// 2. Tự động khôi phục khi cúp điện / mở lại trang
function restoreSessionState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return false;
        const data = JSON.parse(raw);
        if (data && data.teams) {
            STATE.teams = data.teams;
            STATE.playedStudents = data.playedStudents || [];
            STATE.remainingStudents = data.remainingStudents || [];
            STATE.currentSlideIndex = data.currentSlide || 0;
            STATE.telemetryRecords = data.telemetry || [];
            
            // Cập nhật giao diện
            renderTeams();
            goToSlide(STATE.currentSlideIndex);
            
            // Toast thông báo cho Giáo viên
            if (typeof window.showToast === 'function') {
                window.showToast('⚡ Đã tự động khôi phục dữ liệu phiên học trước do sự cố tắt máy/cúp điện!', 'ok');
            }
            return true;
        }
    } catch (e) {
        console.warn('Lỗi khi nạp LocalStorage:', e);
    }
    return false;
}

// 3. Nút xóa dữ liệu an toàn
function clearSessionData() {
    if (confirm('⚠️ Bạn có chắc muốn xóa dữ liệu đã lưu của tiết học này để bắt đầu lớp mới không?')) {
        localStorage.removeItem(STORAGE_KEY);
        if (typeof window.showToast === 'function') {
            window.showToast('✅ Đã xóa dữ liệu phiên học thành công!', 'ok');
        }
        setTimeout(() => {
            if (window.allowPageReload) window.allowPageReload();
            location.reload();
        }, 800);
    }
}
```

---

## 10. HỆ THỐNG ĐIỂM KHỞI ĐẦU (1000Đ), XẾP RANK ĐỒNG HẠNG & CAN THIỆP SỬA ĐIỂM/CHUỖI DÂY KHI THAO TÁC NHẦM

### 10.1 Điểm Khởi Đầu Mặc Định 1000đ (Base Score)
* **Phạm vi áp dụng:**
  * Áp dụng cho các tiết học hoặc mini-game có hệ thống tính điểm thi đua: đấu tổ, trả lời trắc nghiệm/vấn đáp cộng-trừ điểm, đấu trường đối kháng, mô hình đầu tư/startup (ví dụ: Khối 5 Shark Tank IT, Khối 4 Đấu trường, Khối 3 Cắt cáp...).
  * **KHÔNG** bắt buộc ở những tiết chỉ tính số lượng linh kiện thu thập được, đếm số màn chơi hoàn thành, hoặc câu hỏi checkbox Đạt / Chưa đạt.
* **Cú pháp hằng số chuẩn:**
  ```javascript
  const STARTING_SCORE = 1000;
  // Khởi tạo điểm cho các tổ
  const initialTeams = [
    { id: 1, name: 'Tổ 1', score: STARTING_SCORE, color: '#3b82f6' },
    { id: 2, name: 'Tổ 2', score: STARTING_SCORE, color: '#10b981' },
    { id: 3, name: 'Tổ 3', score: STARTING_SCORE, color: '#f59e0b' },
    { id: 4, name: 'Tổ 4', score: STARTING_SCORE, color: '#ec4899' }
  ];
  ```
* **Ý nghĩa sư phạm:**
  1. **Tạo tâm thế tích cực ngay đầu giờ:** Học sinh không bắt đầu từ con số 0 tròn trĩnh mà bước vào giờ học với tâm lý hãnh diện vì mỗi đội đều đã sở hữu một số vốn khởi điểm 1000 điểm tài nguyên/năng lượng.
  2. **Triệt tiêu nguy cơ điểm âm:** Khi học sinh trả lời sai hoặc bị trừ điểm trật tự (-20đ, -50đ, -100đ), tổng điểm vẫn là một số dương an toàn. Các em không bị cảm giác rơi vào "bế tắc" hay chán nản bỏ cuộc.
  3. **Công cụ điều phối lớp học:** Giáo viên luôn có thanh công cụ can thiệp nhanh: các nút `+50đ`, `+100đ`, `-20đ`, `-50đ`, hoặc nút *Đặt lại sàn 1000đ* để điều tiết không khí sôi nổi của lớp.

### 10.2 Cơ Chế Xếp Rank Đồng Hạng Chuẩn Sư Phạm (Tie-Ranking Algorithm)
* **Triết lý Sư phạm cốt lõi:**
  * Trẻ em tiểu học có lòng tự trọng và tinh thần thi đua rất cao nhưng cũng rất dễ bị tổn thương tâm lý.
  * Khi hai hoặc nhiều tổ/học sinh cùng đạt điểm số ngang nhau (ví dụ: cả Tổ 1 và Tổ 3 cùng đạt 1150đ), việc xếp Tổ 1 đứng trên Tổ 3 chỉ vì số thứ tự hay thứ tự mảng JavaScript là hoàn toàn **thiếu công bằng**.
  * Quy tắc bắt buộc: **Bằng điểm $\rightarrow$ Cùng thứ hạng, cùng danh hiệu, cùng nhận huy chương/cúp vinh danh**.

* **Thuật toán Xếp hạng Tiêu chuẩn (Standard Competition Ranking):**
  ```javascript
  function calculateRankings(teamList) {
    if (!teamList || !teamList.length) return [];

    // 1. Sắp xếp điểm giảm dần
    const sorted = [...teamList].sort((a, b) => (Number(b.score) || 0) - (Number(a.score) || 0));

    const rankTemplates = [
      { rank: 1, medal: '🥇', title: 'QUÁN QUÂN', sharedTitle: 'ĐỒNG QUÁN QUÂN', themeClass: 'rank-1', border: '#facc15' },
      { rank: 2, medal: '🥈', title: 'Á QUÂN', sharedTitle: 'ĐỒNG Á QUÂN', themeClass: 'rank-2', border: '#94a3b8' },
      { rank: 3, medal: '🥉', title: 'HẠNG BA', sharedTitle: 'ĐỒNG HẠNG BA', themeClass: 'rank-3', border: '#d97706' },
      { rank: 4, medal: '🌟', title: 'KHUYẾN KHÍCH', sharedTitle: 'KHUYẾN KHÍCH', themeClass: 'rank-4', border: '#3b82f6' },
      { rank: 5, medal: '🎖️', title: 'NỖ LỰC', sharedTitle: 'NỖ LỰC', themeClass: 'rank-5', border: '#10b981' },
      { rank: 6, medal: '🎗️', title: 'GẮN KẾT', sharedTitle: 'GẮN KẾT', themeClass: 'rank-6', border: '#64748b' }
    ];

    let currentRankIdx = 0;
    return sorted.map((team, idx, arr) => {
      const score = Number(team.score) || 0;

      // Nếu bằng điểm đội trước đó: giữ nguyên thứ hạng
      if (idx > 0 && score === (Number(arr[idx - 1].score) || 0)) {
        // Cùng thứ hạng với đội trước
      } else {
        currentRankIdx = idx;
      }

      // Kiểm tra có đội khác cùng điểm hay không
      const isShared = arr.filter(item => (Number(item.score) || 0) === score).length > 1;
      const tpl = rankTemplates[currentRankIdx] || rankTemplates[rankTemplates.length - 1];
      const title = isShared && currentRankIdx < 3 ? tpl.sharedTitle : tpl.title;

      return {
        ...team,
        score,
        rank: currentRankIdx + 1,
        isShared,
        medal: tpl.medal,
        title: title,
        border: tpl.border,
        badgeText: isShared ? `Đồng Hạng ${tpl.rank}` : `Hạng ${tpl.rank}`
      };
    });
  }
  ```

* **Hiển thị Vinh Danh trên Màn chiếu TV Lớp học:**
  * **Banner chúc mừng chiến thắng (`winnerBanner`):**
    * Khi có 1 đội nhất: `🏆 CHÚC MỪNG TỔ 1 LÀ QUÁN QUÂN (1200 ĐIỂM)! 🏆`
    * Khi có từ 2 đội đồng điểm cao nhất: `🏆 ĐỒNG QUÁN QUÂN: TỔ 1 & TỔ 3 (CÙNG ĐẠT 1200 ĐIỂM)! 🏆`
  * **Thẻ xếp hạng (`rank-card`):**
    * Hiển thị cùng huy chương 🥇, cùng màu viền vàng `#facc15`, và huy hiệu ghi rõ: `👑 ĐỒNG QUÁN QUÂN` hoặc `Đồng Hạng Nhất`.

* **Đồng bộ Dữ liệu Báo cáo CSV:**
  * Phần bảng xếp hạng trong file CSV bắt buộc phản ánh chuẩn xác cơ chế đồng hạng:
    ```csv
    "Thứ Hạng","Huy Chương","Danh Hiệu","Tổ / Đội","Điểm Số","Đồng Hạng","Ghi Chú"
    "Hạng 1","🥇","ĐỒNG QUÁN QUÂN","TỔ 1","1100","Có (Đồng điểm)","Xuất sắc"
    "Hạng 1","🥇","ĐỒNG QUÁN QUÂN","TỔ 3","1100","Có (Đồng điểm)","Xuất sắc"
    "Hạng 3","🥉","HẠNG BA","TỔ 2","1050","Không","Hoàn thành tốt"
    ```

### 10.3 Cơ Chế Can Thiệp Sửa Điểm, Chuỗi Dây (Streak) & Thứ Hạng Khi Thao Tác Nhầm (Manual Score & Streak Correction)
* **Ý nghĩa sư phạm & Thực tiễn lớp học:**
  * Trong một tiết học sôi động với 30-40 học sinh tiểu học, việc xảy ra nhầm lẫn là điều khó tránh khỏi:
    * Học sinh cuống tay bấm nhầm chuột vào ô đáp án sai hoặc trượt câu hỏi.
    * Giáo viên bấm nhầm nút cộng điểm cho Tổ 2 thay vì Tổ 1.
    * Nhấp đúp chuột vô tình kích hoạt cộng điểm 2 lần liên tiếp.
    * Chuỗi thắng liên tục (dây streak / combo) bị đứt oan hoặc tăng nhầm.
  * Nếu hệ thống không cho phép sửa điểm hay chuỗi thắng tại chỗ, học sinh sẽ có cảm giác bất công, ấm ức, làm phân tâm và gián đoạn không khí học tập.
* **Quy chuẩn kỹ thuật bắt buộc:**
  Mọi bài học có hệ thống tính điểm, xếp hạng hoặc chuỗi streak BẮT BUỘC phải cung cấp công cụ cho phép Giáo viên can thiệp nhanh:
  1. **Click-to-Edit trực tiếp (Chỉnh sửa tại chỗ):**
     * Cho phép Giáo viên nhấp trực tiếp vào con số điểm hoặc con số streak trên Sidebar (hoặc nút icon bút chì `✏️` cạnh điểm số).
     * Bật hộp thoại `prompt` nhập số (hoặc pop-up chỉnh sửa):
       ```javascript
       function handleEditScore(teamId) {
           const team = STATE.teams.find(t => t.id === teamId);
           if (!team) return;
           const input = prompt(`✏️ Nhập điểm mới cho ${team.name}:`, team.score);
           if (input === null) return; // Người dùng bấm Hủy
           const newScore = parseInt(input, 10);
           if (!isNaN(newScore)) {
               team.score = newScore;
               onScoreUpdated();
           }
       }
       ```
  2. **Bộ nút điều chỉnh nhanh (+/-):**
     * Thiết kế cụm nút nhỏ gọn: `+50`, `+100`, `-50`, `-100`, và nút reset về sàn 1000đ (`🔄 1000đ`).
  3. **Tự động tính toán lại và đồng bộ tức thì:**
     * Ngay khi điểm hoặc chuỗi streak được chỉnh sửa:
       1. Gọi lại `window.calculateRankings(STATE.teams)` để cập nhật lại tức thì bảng xếp hạng, huy chương 🥇🥈🥉, và danh hiệu vinh danh.
       2. Gọi `saveSessionState()` để tự động lưu ngay vào `localStorage` (đề phòng cúp điện).
       3. Cập nhật dữ liệu chuẩn bị xuất file CSV cuối tiết.
       4. Hiển thị Toast thông báo: *"✅ Đã cập nhật lại điểm số của [Tên Tổ] thành [X] điểm!"*.

---

## 11. HỆ THỐNG QUẢN LÝ QUESTS & CÂU HỎI TÁCH RỜI FILE JSON (`quests.json` / `questions.json`)

### 11.1 Nguyên tắc "Không nhồi nhét câu hỏi vào HTML"
* **Vấn đề thực tế:** Khi ngân hàng câu hỏi, thử thách, tình huống vụ án dài hàng trăm dòng được nhúng trực tiếp vào giữa mã nguồn file `index.html`, Giáo viên gặp khó khăn rất lớn khi muốn đọc, tìm kiếm hoặc sửa đổi nhanh nội dung câu hỏi trước giờ lên lớp.
* **Quy chuẩn bắt buộc:**
  * Toàn bộ câu hỏi, vụ án, tình huống, bài tập trắc nghiệm bắt buộc phải được tách riêng thành file `quests.json` (hoặc `questions.json`) đặt cùng thư mục với `index.html`.
  * File HTML chỉ giữ lại khung giao diện và logic điều khiển; toàn bộ dữ liệu câu hỏi được nạp động từ file JSON bên cạnh.

### 11.2 Cơ chế Nạp 100% Offline-First (Tránh lỗi CORS khi mở `file:///`)
Để đảm bảo bài giảng chạy mượt mà cả khi chạy qua local server (VS Code Live Server) lẫn khi mở trực tiếp file HTML bằng double-click trong Windows Explorer (`file:///...`):
1. **File `quests.json` (hoặc `questions.json`):** Chứa cấu trúc JSON tiêu chuẩn để Giáo viên mở sửa dễ dàng.
2. **File `quests.js` (hoặc `questions.js`):** Chứa đúng nội dung dữ liệu đó gán vào biến toàn cục:
   ```javascript
   window.QUESTS_DATA = { /* Cùng cấu trúc với quests.json */ };
   ```
3. **Mã nguồn trong `index.html`:**
   Nhúng file JS trong thẻ `<head>`:
   ```html
   <script src="quests.js"></script>
   ```
   Hàm nạp linh hoạt ưu tiên `fetch` và fallback sang biến toàn cục:
   ```javascript
   let QUESTION_BANK = (window.QUESTS_DATA && window.QUESTS_DATA.cases) ? window.QUESTS_DATA.cases : [];

   async function loadQuestsFromJSON() {
       try {
           const res = await fetch('quests.json');
           if (res.ok) {
               const data = await res.json();
               if (Array.isArray(data.cases) && data.cases.length > 0) {
                   QUESTION_BANK = data.cases;
                   console.log('✅ Đã nạp thành công ngân hàng câu hỏi từ quests.json!');
               }
           }
       } catch (err) {
           console.warn('Đang dùng dữ liệu từ quests.js (offline file://):', err);
       }
   }
   loadQuestsFromJSON();
   ```

---

## 12. HỆ THỐNG CHẾ ĐỘ CHƠI DÙNG CHUNG: CƠ CHẾ "PHE QUỶ" / "ĐẤU TRƯỜNG MA VƯƠNG" (SHARED DEMON MODE)

### 12.1 Bản chất Toàn Hệ Thống (Shared Mode / Component)
* **Không phải tính năng riêng lẻ tạm thời:** Cơ chế Phe Quỷ là một **chế độ chơi dùng chung toàn hệ thống** được đóng gói tại `shared/js/demon-mode.js` và CSS tại `shared/css/core.css`.
* **Phạm vi áp dụng:** Bất kỳ tiết học nào thuộc bất kỳ khối lớp nào (Khối 1 - Khối 5) đều có thể nạp và kích hoạt khi lớp học có học sinh cá biệt (qua query URL `?mode=mavuong`, sessionStorage hoặc phím tắt `Ctrl + Alt + D`).

### 12.2 Bối cảnh Sư phạm & Triết lý Thiết kế
* **Nỗi đau thực tế trong lớp học (Hiện tượng "Griefing / Trolling"):**
  * Trong các hoạt động thi đua theo tổ, ở các lớp cá biệt (đặc biệt lứa tuổi Khối 4, Khối 5 bước vào giai đoạn tiền dậy thì), thường có 1 hoặc vài học sinh có tâm lý chống đối hoặc mặc cảm tự ti.
  * Các em này thường tìm kiếm sự chú ý tiêu cực (*Negative Attention*) bằng cách: cố tình phá bĩnh, nói leo, làm ồn hoặc cố tình chọn đáp án sai bét nhè để "kéo cả tổ chết chùm".
  * Hậu quả: Các bạn cùng tổ bức xúc, cãi vã, đổ lỗi và cô lập bạn; không khí lớp học trở nên căng thẳng, mất trật tự và giáo viên tốn nhiều thời gian xử lý tranh chấp.
* **Giải pháp "Tâm lý Nghịch đảo" (Reverse Psychology & Peer-Policing):**
  * Thay vì trách phạt nặng nề hay dán nhãn tiêu cực công khai, hệ thống thiết kế cơ chế **"Phe Quỷ" / "Đấu Trường Ma Vương"** dưới dạng một tính năng game hóa thú vị.
  * Đánh trúng tâm lý **háo thắng, sĩ diện, thích làm tâm điểm** của tuổi mới lớn: Gom các cá nhân chống đối vào một phe riêng biệt để các em tự cạnh tranh sinh tồn và **tự kiềm chế, kiểm soát lẫn nhau** (*Quỷ kiểm soát Quỷ*).

### 12.3 Cơ chế Cách ly & Cạnh tranh Sinh tồn (Zero-Sum Cannibalism: "Quỷ ăn thịt Quỷ")
* **Trục xuất và bảo vệ Loài Người:**
  * Học sinh quậy phá bị chuyển ra khỏi tổ gốc, đưa vào danh sách **"Phe Quỷ" (Tổ Ma Vương)**.
  * Các tổ bình thường (Loài Người: Tổ 1, 2, 3, 4...) ngay lập tức được giải tỏa áp lực, không còn lo bị bạn kéo tụt điểm số.
* **Bảng điểm Cá nhân Độc lập:**
  * Khác với các tổ Loài Người (điểm số là tài sản chung của tổ), Phe Quỷ là **tập hợp của các cá nhân độc lập**. Mỗi con Quỷ có một thanh điểm riêng (bắt đầu sàn `1000đ`).
* **Quy luật Trả lời Đúng (Hút điểm sinh tồn — Độc Đạo Làm Giàu):**
  * Trả lời đúng **KHÔNG** được hệ thống tự in thêm điểm mới.
  * Số điểm thưởng (+100đ) sẽ được **trực tiếp rút/hút từ quỹ điểm của những con Quỷ còn lại** chia đều (Zero-Sum). Càng trả lời đúng nhiều, con Quỷ đó càng trở nên hùng mạnh trên nỗi đau của các đồng bọn. Muốn giàu chỉ có con đường tự giác học bài và trả lời đúng!
* **Quy luật Vi phạm & Phạt trật tự (Hủy Diệt Điểm — Khóa Chặt "Chiến Thuật Namikaze"):**
  * **Cấm tiệt đường "Hiến máu nhân đạo":** Nếu một con Quỷ làm ồn, vi phạm kỷ luật, không chép bài hoặc cố ý trả lời sai: Giáo viên bấm phạt `-100đ` (hoặc `-50đ`, `-200đ`).
  * **TUYỆT ĐỐI CẤM chia điểm phạt này cho những con Quỷ còn lại:** Triệt tiêu hoàn toàn kịch bản liên minh/thông đồng ngầm (2–3 em cố tình quậy phá và chọn sai để "bơm điểm" nuôi 1 em lên Quỷ Vương).
  * **Hủy diệt điểm vào Hư Vô hoặc Chuyển vào Quỹ Cứu Trợ:** Toàn bộ số điểm bị phạt này sẽ bị **HỦY DIỆT (bay vào Hư Vô)** HOẶC chuyển thẳng vào **"Quỹ Cứu Trợ"** cho tổ Loài Người có điểm số thấp nhất. Kẻ quậy phá chỉ làm hại chính mình và "tiếp tế quà" cho đối thủ!

### 12.4 Khóa Chặn "Lối Thoát Tự Nguyện Sang Phe Quỷ" (Anti-Voluntary Defection — "Cửa Vào Dễ, Cái Giá Cực Đắt")
* **Không phải khu vui chơi / giải trí:** Học sinh thường thấy Phe Quỷ có giao diện ngầu, hiệu ứng sấm sét bắt mắt nên tò mò xin: *"Thầy cho con qua Tổ 5 luôn đi!"*. Giáo viên và hệ thống phải lập tức quán triệt luật sắt để dập tắt tư tưởng này.
* **Mất toàn bộ quyền bảo hộ đồng đội:** Sang Phe Quỷ là trở thành cá nhân độc lập chiến đấu sinh tồn, không còn tổ đội chở che, không ai được phép nhắc bài, sai là tự chịu phạt một mình.
* **Hồ sơ đen gửi thẳng GVCN & Phụ huynh:** Cuối tiết, toàn bộ danh sách Phe Quỷ bị đưa vào sheet theo dõi kỷ luật riêng trong file CSV (`=== PHẦN 3: HỒ SƠ THEO DÕI HÀNH VI & KỶ LUẬT (PHE QUỶ) ===`), xếp loại TT27 mặc định C/H kèm ghi nhận chi tiết hành vi gửi GVCN và phụ huynh.
* **Ngưỡng phạt rớt sàn (< 800 Xu):**
  * Đứa nào ở Phe Quỷ mà tổng điểm cuối tiết **dưới mốc sàn 800 Xu** (hoặc bị điểm âm): Bị xếp loại TT27 là **C (Chưa hoàn thành)**, nhận hình phạt kỷ luật nghiêm khắc (chép phạt bài học 3–5 lần, đứng góc lớp tiết sau, hoặc dọn vệ sinh phòng máy / mất quyền chạm máy tính tiết sau).
  * Chỉ duy nhất 1 Quỷ Vương (vừa điểm cao nhất, vừa phải chép vở 100% đầy đủ) mới được vinh danh cầm máy điều khiển. Tất cả những con Quỷ còn lại đều phải chịu sự giám sát kỷ luật chặt chẽ!

### 12.5 Vòng Xoay Lượt Chơi & Gacha Bắt Buộc (Turn Rotation & Enforced Gacha)
* **Xếp lượt ngang hàng:**
  * Tổ Ma Vương được xếp như một tổ thi đấu ngang hàng trong vòng quay câu hỏi:
    $$\text{Tổ 1} \longrightarrow \text{Tổ 2} \longrightarrow \text{Tổ 3} \longrightarrow \text{Tổ 4} \longrightarrow \mathbf{\text{Tổ Ma Vương (Phe Quỷ)}} \longrightarrow \dots$$
* **CẤM Giơ tay tự do ở Lượt Quỷ:**
  * Ở lượt của Phe Quỷ, giao diện đổi sang tông màu tím huyền bí (hoặc đỏ thẫm).
  * Hệ thống khóa quyền xung phong tự do để triệt tiêu tình trạng lẩn trốn hoặc tranh giành ồn ào.
  * Giáo viên bắt buộc bấm nút `🎲 Gacha Quỷ Vương` để hệ thống tự động bốc ngẫu nhiên một con Quỷ trong danh sách lên sàn đấu.

### 12.6 Xử Lý Trường Hợp Lớp Chỉ Có 1 Con Quỷ (Độc Hành Ma Thần)
Khi một lớp chỉ có duy nhất 1 học sinh cá biệt bị đưa vào Phe Quỷ:
* **Cơ chế "Boss Hư Vô":** Khi trả lời đúng, em hút điểm từ "Hệ thống AI / Boss Ảo" (khởi tạo 1000đ).
* **Quỹ Cứu Trợ Loài Người:** Nếu em vi phạm hoặc trả lời sai, toàn bộ số điểm bị trừ sẽ biến thành **"Quỹ Cứu Trợ"** chuyển thẳng cho tổ Loài Người có điểm số thấp nhất.
* *Tác động:* Em cá biệt sẽ không dám cố tình quậy phá, vì hành vi phá hoại lúc này trực tiếp biến mình thành "người biếu quà" cho chính những tổ mà mình đang đối đầu.

### 12.7 Ngai Vàng Quỷ Vương & Điều Kiện Tiên Quyết (100% Chép Bài)
* **Đăng quang Quỷ Vương:**
  * Cuối tiết học, con Quỷ tích lũy được số điểm cá nhân cao nhất sẽ được hệ thống xướng tên đăng quang **"Quỷ Vương Tiết Học"** 👑😈.
* **Đặc quyền Tối Thượng:**
  * Được quyền lên bục giảng đứng cạnh Giáo viên, cầm chuột và bấm điều khiển slide máy chiếu trong toàn bộ tiết học tuần kế tiếp (thỏa mãn mong muốn được chú ý và khẳng định bản thân trước cả lớp).
* **Điều kiện Tiên quyết Khắt khe (The Iron Rule):**
  * Quỷ Vương chỉ chính thức được cầm máy nếu **Vở ghi bài được Giáo viên kiểm tra và đạt 100% đầy đủ nội dung bài học**.
  * Nếu thiếu dù chỉ 1 dòng ghi nhớ $\longrightarrow$ Tước vương miện ngay đầu giờ, chuyển quyền cho Quỷ xếp thứ hai hoặc hủy bỏ. Điều này ép các em cá biệt dù ngang bướng đến đâu cũng phải nghiêm túc hạ bút chép bài.
* **Cơ Chế Xử Lý Khi Bằng Điểm (Tie-Breaking) & Ghi Rõ Lý Do Sắc Phong:**
  * **BẮT BUỘC hiển thị Lý do Sắc phong trên màn hình:** Khung vinh danh Quỷ Vương (`.demon-king-spotlight`) phải có một hộp lý do nổi bật (`.dk-reason-box`), ghi rõ tường tận nguyên do sắc phong để cả lớp và cá nhân học sinh đều hiểu rõ và phục.
  * **Bộ lọc 3 bậc phân định công bằng:**
    1. **Bậc 1 — So Kỷ luật (`violations`):** Nếu có từ 2 con Quỷ bằng điểm cao nhất, hệ thống tự động so số lần nhắc nhở vi phạm. Em nào **ít bị phạt hơn** sẽ đăng quang. Màn hình ghi: *"Đồng điểm cao nhất (X Xu), nhưng đăng quang nhờ Ý THỨC KỶ LUẬT TỐT HƠN (chỉ Y lần nhắc nhở, ít hơn Z lần của bạn B)!"*.
    2. **Bậc 2 — Giáo viên Soi Vở Ghi Bài tại chỗ:** Nếu hòa cả điểm lẫn số lần phạt, màn hình hiển thị lời nhắc Giáo viên kiểm tra trực tiếp vở chép bài. Giáo viên bấm nút xác nhận em có vở đạt 100% sạch đẹp hơn. Lý do cập nhật: *"Chiến thắng sau vòng duyệt Vở Ghi Bài 100% sạch đẹp của Giáo viên!"*.
    3. **Bậc 3 — Hòa tuyệt đối 100%:** Giáo viên có 2 tùy chọn linh hoạt:
       * **Song Ma Vương (Đồng Hạng):** Cả 2 cùng lên bục giảng tuần sau, mỗi em quản trò 15 phút.
       * **Vòng Quay Đoạt Vương (1 vs 1):** Bấm nút Gacha 1-1 để máy bốc ngẫu nhiên 1 Quỷ Vương, em còn lại làm Tả Hữu Hộ Pháp.
  * **Các thứ hạng khác trong Phe Quỷ:** Nếu bằng điểm nhau ở các bậc sau thì tính **Đồng Hạng** theo chuẩn Tie-ranking, ghi rõ trong CSV: `Hạng X (Đồng điểm)`.

### 12.8 Trừng Phạt "Túi Kinh Nghiệm" (Loot Goblin) & Giáng Cấp Slime Câm Lặng
* **Hành vi Vi phạm khi cầm máy:**
  * Nếu Quỷ Vương được trao quyền cầm máy mà thao tác lóng ngóng, bấm linh tinh, quản trò lôm côm hoặc cố tình phá hoại tiết dạy:
* **Kích hoạt Đòn Phản Phệ:**
  * Giáo viên bấm nút bí mật `💥 Phản Phệ Ma Vương!`.
  * **Nổ điểm (Loot Goblin Explosion):** Toàn bộ điểm số tích lũy của Quỷ Vương phát nổ tung toé trên màn hình (hiệu ứng nổ + âm thanh sấm sét), trở thành "mỏ điểm" chia đều cho 4 tổ Loài Người ăn mừng.
  * **Giáng cấp thành Slime:** Quỷ Vương bị giáng thẳng xuống danh hiệu **"Slime Xanh Nhầy Nhụa" (Green Slime)**.
  * **Hiệu ứng Câm Lặng (Silence Curse):** Giao diện khóa avatar với biểu tượng chiếc khóa mồm `🔇 Câm Lặng`: Tước mọi quyền phát biểu, hủy tư cách Quỷ Vương và trục xuất vĩnh viễn khỏi bàn giáo viên trong tiết học đó.

### 12.9 Con Đường Hoàn Lương / Thanh Tẩy (Redemption & Purification)
* **Ý nghĩa Nhân văn:** Không bao giờ dán nhãn tiêu cực vĩnh viễn cho học sinh tiểu học. Mọi lỗi lầm đều phải có con đường phục thiện để quay về.
* **Nghi thức Thanh Tẩy:**
  * Nếu một con Quỷ hoàn thành xuất sắc vai trò Quỷ Vương (quản trò nghiêm túc, vở sạch chữ đẹp) HOẶC đạt chuỗi 3 tiết học liên tiếp không bị trừ điểm kỷ luật:
  * Giáo viên trao quyền lựa chọn:
    1. Tiếp tục giữ Ngai Vàng để dẫn dắt Phe Quỷ.
    2. Kích hoạt **"Thanh Tẩy / Chuyển Sinh Làm Người"**: Trở về tổ cũ với danh hiệu **"Hiệp Sĩ Hoàn Lương"**, mang theo 200 điểm tài trợ tặng lại cho tổ cũ trong tiếng vỗ tay chào đón của cả lớp.

### 12.10 Kiến Trúc Kỹ Thuật & Phương Thức Kích Hoạt Ẩn
Để đảm bảo mã nguồn gọn gàng, không bị nhân bản code và dễ dàng bảo trì:
1. **Truy cập trực tiếp qua GitHub Pages (`index-mavuong.html`):**
   * Trong thư mục tiết học (ví dụ: `khoi-5/tiet-10/`), tạo file phụ `index-mavuong.html` siêu nhẹ đóng vai trò redirect/bridge:
     ```html
     <!DOCTYPE html>
     <html lang="vi">
     <head>
         <meta charset="UTF-8">
         <title>Triệu Hồi Đấu Trường Ma Vương</title>
         <script>
             sessionStorage.setItem('bg_demon_mode', 'true');
             location.replace('index.html?mode=mavuong');
         </script>
     </head>
     <body>Đang nạp Đấu Trường Ma Vương...</body>
     </html>
     ```
2. **Kích hoạt thông qua URL Query Parameter:**
   * Trong file chính `index.html`:
     ```javascript
     const urlParams = new URLSearchParams(window.location.search);
     const IS_DEMON_MODE = urlParams.get('mode') === 'mavuong' || sessionStorage.getItem('bg_demon_mode') === 'true';
     ```
3. **Phím tắt ẩn của Giáo viên (Bật/Tắt tức thì trong lớp):**
   * Giáo viên có thể bấm tổ hợp phím `Ctrl + Alt + D` (Demon Mode) hoặc click nhanh 4 lần vào Logo môn học ở góc trên bên trái để mở modal quản lý Phe Quỷ:
     * Nút bật/tắt hiển thị Phe Quỷ trên màn hình.
     * Bảng danh sách chọn nhanh các em cần "Trục xuất sang Phe Quỷ" hoặc "Thanh tẩy trở về".
     * Nút kích hoạt đòn phản phệ `💥 Phản Phệ Slime`.

### 12.11 Báo Cáo CSV Riêng Biệt & Hệ Thống Nhận Xét Nghiêm Khắc (Anti-Sugarcoating)
* **Nguyên tắc "Không tô hồng" (Zero Sugarcoating):**
  * Những học sinh bị đưa vào Phe Quỷ đã có những hành vi phá bĩnh, cố ý trả lời sai hoặc làm mất trật tự nghiêm trọng. Do đó, trong file báo cáo CSV xuất ra, **TUYỆT ĐỐI CẤM** áp dụng các câu khen ngợi tích cực sáo rỗng thông thường (*"Ngoan ngoãn", "Chăm chỉ", "Nhanh nhẹn", "Hoàn thành tốt"*...).
  * Dữ liệu phải phản ánh trung thực và khách quan hiện trạng hành vi để Giáo viên bộ môn có bằng chứng xác thực làm việc với Giáo viên Chủ nhiệm (GVCN) và Phụ huynh học sinh.
* **Tách riêng Section Báo cáo trong File CSV:**
  Hệ thống tự động bổ sung một sheet/bảng độc lập ở cuối file CSV xuất ra:
  ```text
  "=== PHẦN 3: HỒ SƠ THEO DÕI HÀNH VI & KỶ LUẬT (PHE QUỶ) ==="
  "STT","Họ và Tên","Tổ Gốc","Điểm Cuối Tiết","Danh Hiệu","Số Lần Phạt","Chép Vở","Đánh Giá TT27","Nhận Xét Kỷ Luật / SMAS"
  "1","Nguyễn Văn X","Tổ 2","1150","Quỷ Vương","1","Chưa đủ","H","Có khả năng tiếp thu nhưng ý thức kỷ luật chưa tốt; chưa hoàn thành việc chép bài vào vở, chưa đủ điều kiện nhận thưởng."
  "2","Trần Văn Y","Tổ 1","850","Quỷ Con","3","Không chép","C","Còn hiện tượng nói chuyện riêng, cố ý làm ảnh hưởng thi đua chung; không ghi chép bài, cần GVCN và gia đình nhắc nhở."
  "3","Lê Văn Z","Tổ 4","0","Slime Câm Lặng","5","Không chép","C","Ý thức kỷ luật kém, lơ là thiếu tập trung, có hành vi cố ý phá hoại tiết dạy; bị phong ấn máy, cần giám sát chặt chẽ."
  ```
* **Ma trận Sinh Câu Nhận Xét Kỷ Luật Tự Động:**
  Hệ thống tự động ánh xạ dựa trên hành vi ghi nhận trong tiết:
  1. **Bị giáng cấp thành Slime:**
     * Đánh giá TT27: **C (Chưa hoàn thành)**.
     * Nhận xét: *"Ý thức kỷ luật kém, không chấp hành nội quy điều khiển máy tính; bị tước quyền thao tác, cần sự phối hợp chấn chỉnh từ gia đình và GVCN."*
  2. **Quỷ Con (Nhiều lần bị phạt trừ điểm / Không chép bài):**
     * Đánh giá TT27: **C (Chưa hoàn thành)**.
     * Nhận xét: *"Chưa tập trung chú ý nghe giảng, còn hiện tượng nói chuyện và quậy phá làm ảnh hưởng đến tổ; chưa hoàn thành việc ghi bài vào vở."*
  3. **Quỷ Con rớt dưới mốc sàn (< 800 Xu):**
     * Đánh giá TT27: **C (Chưa hoàn thành)**.
     * Nhận xét: *"Tổng điểm cuối tiết dưới mức sàn 800 Xu do vi phạm kỷ luật hoặc không học bài; chưa hoàn thành yêu cầu tiết học, phạt chép phạt nội dung bài học và cần gia đình phối hợp nhắc nhở."*
  4. **Quỷ Vương nhưng không chép đủ bài:**
     * Đánh giá TT27: **H (Hoàn thành)**.
     * Nhận xét: *"Có tiến bộ về mặt kiến thức và điểm số nhưng chưa rèn được tính cẩn thận; chưa chép bài đầy đủ vào vở theo yêu cầu của giáo viên."*
  5. **Có biểu hiện cố ý trả lời sai để phá bĩnh:**
     * Đánh giá TT27: **C (Chưa hoàn thành)**.
     * Nhận xét: *"Thái độ học tập chưa nghiêm túc, có biểu hiện cố tình chọn sai đáp án gây mất đoàn kết nội bộ tổ; cần rèn luyện tinh thần tập thể."*

---

## 13. HỆ THỐNG DÀN DỰNG BÀN PHÍM MÁY TÍNH ẢO CHUẨN CÔNG THÁI HỌC (REALISTIC ANSI KEYBOARD LAYOUT)

### 13.1 Tầm Quan Trọng Sư Phạm & Thị Giác
* Trong chương trình Tin học Tiểu học (đặc biệt Khối 1, Khối 2, Khối 3), việc nhận biết khu vực bàn phím, phân biệt các hàng phím (Hàng số, Hàng phím chữ trên, Hàng phím cơ sở, Hàng phím chữ dưới) và rèn luyện kỹ năng gõ 10 ngón là nội dung cốt lõi.
* Nếu giao diện bàn phím mô phỏng trên HTML/CSS bị dựng sai lệch (các phím xếp thẳng tưng như bảng tính Excel, hoặc các hàng phím thò thụt lồi lõm không đều), học sinh sẽ hình thành nhận thức thị giác sai lệch so với bàn phím vật lý thực tế trước mặt.

### 13.2 Quy Chuẩn Độ Thụt Lùi Hàng Phím Tiêu Chuẩn (Physical Key Staggering - Chuẩn ANSI)
Mỗi hàng phím trên bàn phím máy tính thực tế đều có tỷ lệ đơn vị (Unit - $1\text{U}$ tương ứng độ rộng 1 phím chữ tiêu chuẩn). Tổng độ rộng của mỗi hàng là $15\text{U}$:

1. **Hàng 1 (Hàng phím số):**
   * Bắt đầu bằng phím `~` ($1\text{U}$), các phím số `1` đến `0`, `-`, `=` (mỗi phím $1\text{U}$).
   * Kết thúc bằng phím `Backspace` rộng **$2\text{U}$** để khép kín hàng ($13 \times 1\text{U} + 2\text{U} = 15\text{U}$).
2. **Hàng 2 (Hàng phím chữ trên - QWERTY Row):**
   * Bắt đầu bằng phím `Tab` rộng **$1.5\text{U}$** $\rightarrow$ Độ rộng $1.5\text{U}$ này tự động đẩy phím `Q` **thụt vào trong** so với phím `1`.
   * Tiếp theo là 12 phím chữ/ký tự: `Q W E R T Y U I O P [ ] \` ($12 \times 1\text{U}$).
   * Phím `\` ở cuối rộng $1.5\text{U}$ để vừa khít $15\text{U}$ ($1.5\text{U} + 12\text{U} + 1.5\text{U} = 15\text{U}$).
3. **Hàng 3 (Hàng phím cơ sở - Home Row ASDF):**
   * Bắt đầu bằng phím `Caps Lock` rộng **$1.75\text{U}$** $\rightarrow$ Độ rộng $1.75\text{U}$ đẩy phím `A` **thụt sâu hơn** phím `Q`.
   * Tiếp theo là 11 phím: `A S D F G H J K L ; '` ($11 \times 1\text{U}$). Hai phím `F` và `J` có gờ định vị ngón trỏ.
   * Kết thúc bằng phím `Enter` rộng **$2.25\text{U}$** khép kín mép phải ($1.75\text{U} + 11\text{U} + 2.25\text{U} = 15\text{U}$).
4. **Hàng 4 (Hàng phím chữ dưới - Bottom Row ZXCV):**
   * Bắt đầu bằng phím `Shift Trái` rộng **$2.25\text{U}$** $\rightarrow$ Độ rộng $2.25\text{U}$ đẩy phím `Z` **thụt sâu hơn** phím `A`.
   * Tiếp theo là 10 phím: `Z X C V B N M , . /` ($10 \times 1\text{U}$).
   * Kết thúc bằng phím `Shift Phải` rộng **$2.75\text{U}$** khép kín mép phải ($2.25\text{U} + 10\text{U} + 2.75\text{U} = 15\text{U}$).
5. **Hàng 5 (Hàng phím chức năng đáy - Spacebar Row):**
   * Cụm phím trái: `Ctrl` ($1.25\text{U}$), `Win` ($1.25\text{U}$), `Alt` ($1.25\text{U}$).
   * Phím `Space (Phím Cách)` ở giữa: Rộng **$6.25\text{U}$**.
   * Cụm phím phải: `Alt` ($1.25\text{U}$), `Win` ($1.25\text{U}$), `Menu` ($1.25\text{U}$), `Ctrl` ($1.25\text{U}$).
   * Tổng cộng: $3 \times 1.25\text{U} + 6.25\text{U} + 4 \times 1.25\text{U} = 15\text{U}$.

### 13.3 Canh Đều Tuyệt Đối 2 Mép Biên (Justified Flat Edges - 100% Width)
* **CẤM:** Tuyệt đối không để bàn phím có mép trái hoặc mép phải bị thò thụt zíc zắc xộc xệch.
* **Kỹ thuật CSS Flexbox tiêu chuẩn:**
  * Mỗi hàng phím `.kb-row` sử dụng `display: flex; width: 100%; gap: 6px;`.
  * Mỗi phím `.key` sử dụng `flex: var(--u, 1);` để tự động chia tỷ lệ chính xác và co giãn hoàn hảo theo độ phân giải màn hình.

Mẫu CSS chuẩn:
```css
.virtual-keyboard {
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
    padding: 16px;
    background: #1e293b;
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.3);
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.kb-row {
    display: flex;
    width: 100%;
    gap: 6px;
}

.key {
    position: relative;
    flex: var(--u, 1);
    height: 52px;
    background: #334155;
    color: #f8fafc;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    font-weight: 700;
    box-shadow: 0 3px 0 #0f172a;
    user-select: none;
    transition: all 0.1s ease;
}

.key.u-1-25 { --u: 1.25; }
.key.u-1-5  { --u: 1.5; }
.key.u-1-75 { --u: 1.75; }
.key.u-2    { --u: 2; }
.key.u-2-25 { --u: 2.25; }
.key.u-2-75 { --u: 2.75; }
.key.u-space{ --u: 6.25; }

/* Hai phím có gờ định vị F & J */
.key.has-bump::after {
    content: '';
    position: absolute;
    bottom: 6px;
    width: 12px;
    height: 3px;
    background: #94a3b8;
    border-radius: 2px;
}
```

---

## 14. GIAO THỨC CẬP NHẬT QUY CHUẨN (LIVING DOCUMENT PROTOCOL)

* Cả hai tài liệu **`AGENTS.md`** và **`STANDARDS.md`** đều là **Tài liệu sống (Living Documents)**.
* Trong quá trình giảng dạy và phát triển bài giảng mới, khi Giáo viên phát hiện một quy tắc sư phạm mới, một mẹo hay hoặc muốn điều chỉnh bất kỳ thông số nào:
  1. Giáo viên chỉ cần đưa ra yêu cầu: *"Cập nhật vào quy chuẩn: [nội dung mới]..."*.
  2. AI Agent có nhiệm vụ ngay lập tức cập nhật, hiệu đính và bổ sung vào đúng các mục tương ứng trong cả `AGENTS.md` và `STANDARDS.md`.
  3. Mọi bài giảng được tạo sau thời điểm đó sẽ tự động tuân thủ theo phiên bản quy chuẩn mới nhất này.
