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
   - 7.1 [Ma trận Nhận diện từng Khối](#71-ma-trận-nhận-diện-từng-khối)
   - 7.2 [Thông số Kỹ thuật Màn chiếu TV Lớp học](#72-thông-số-kỹ-thuật-màn-chiếu-tv-lớp-học)
   - 7.3 [Quy chuẩn Menu Điều Khiển & Thanh Công Cụ Giáo Viên: Cho Phép Ẩn/Hiện Bằng Nút Hamburger (`☰`)](#73-quy-chuẩn-menu-điều-khiển--thanh-công-cụ-giáo-viên-cho-phép-ẩnhiện-bằng-nút-hamburger-)
8. [Hệ thống Âm thanh Web Audio API (Offline Synthesizer)](#8-hệ-thống-âm-thanh-web-audio-api-offline-synthesizer)
9. [Hệ thống Lưu trữ LocalStorage Bắt Buộc & Phục Hồi Khi Cúp Điện (Crash Recovery & Auto-Save)](#9-hệ-thống-lưu-trữ-localstorage-bắt-buộc--phục-hồi-khi-cúp-điện-crash-recovery--auto-save)
10. [Hệ thống Điểm Khởi Đầu 1000đ, Xếp Rank Đồng Hạng & Can Thiệp Sửa Điểm/Chuỗi Dây Khi Thao Tác Nhầm](#10-hệ-thống-điểm-khởi-đầu-1000đ-xếp-rank-đồng-hạng--can-thiệp-sửa-điểmchuỗi-dây-khi-thao-tác-nhầm)
11. [Hệ thống Quản lý Quests & Câu hỏi bằng File quests.js Duy Nhất](#11-hệ-thống-quản-lý-quests--câu-hỏi-bằng-file-questsjs-duy-nhất)
12. [Hệ thống Tính Năng Ẩn: Cơ Chế "Phe Quỷ" Bất Công Công Khai (Chỉ Dành Riêng Cho Khối 5)](#12-hệ-thống-tính-năng-ẩn-cơ-chế-phe-quỷ-bất-công-công-khai-chỉ-áp-dụng-riêng-cho-khối-5--lớp-5)
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
│       ├── demon-mode.js      # Logic Phe Quỷ / Đấu trường Ma Vương (Độc quyền dành riêng cho Khối 5)
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
1. **Phím Reload:** `F5`, `Ctrl+F5`, `Shift+F5`, `Ctrl+R`, `Cmd+R` → Chặn tức thì, hiện toast cảnh báo màu đỏ trên cùng màn hình.
2. **Phím Điều hướng lùi:** `Alt+Mũi tên trái`, `Alt+Mũi tên phải`, `Backspace` ngoài ô input/textarea → Chặn để tránh bị back về trang trước làm mất điểm số.
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

### 3.3 Trang Ghi bài vào vở — Thực Hành Tối Đa, Lý Thuyết & Chép Bài Tối Thiểu (Chép 1 Lần Duy Nhất)
Học sinh tiểu học cần nhìn rõ từ khoảng cách xa (8–10m cuối lớp) để hạ bút chép đúng tựa bài và kiến thức vào vở:
* **Ý nghĩa sư phạm cốt lõi:**
  * Thời lượng tiết học Tin học tiểu học chỉ có **35 phút**. Bản chất môn Tin học là rèn luyện năng lực và kỹ năng thực hành (thao tác chuột, bàn phím, tương tác phần mềm). Toàn bộ lý thuyết, hình ảnh và các bước thực hiện đều đã có trong SGK.
  * Học sinh tiểu học viết chữ rất chậm. Nếu bắt học sinh chép bài dài hoặc chia nhỏ bắt chép bài nhiều lần trong tiết học, các em sẽ mất 10–15 phút chỉ để tìm bút, mở vở → xé nát mạch tư duy công nghệ và mất hơn một nửa thời gian thực hành máy tính.
* **Quy chuẩn Ghi Bài 1 Lần Duy Nhất:**
  * **Đầu giờ:** Ghi Thứ ngày tháng năm (tự động theo ngày dạy thực tế) + Môn: *Tin học* + *Tên bài học (Tiết mấy)*.
  * **Nếu là Tiết 1 (Tiết mở đầu lý thuyết):** Cho chép **1 LẦN DUY NHẤT** ngay trang ghi bài đầu giờ, nội dung cô đọng tối đa chỉ **1 đoạn vài chữ ngắn gọn** (ví dụ: *Định dạng kí tự trong nhóm Font (thẻ Home); bố trí hình ảnh bằng nút Layout Options (Square).*). **TUYỆT ĐỐI KHÔNG ghi thêm tiêu đề "Nội dung ghi bài" hay "Kiến thức cốt lõi"** rườm rà. Dùng dấu mũi tên Unicode (`→`), cấm dùng mã LaTeX (`$\to$`). Chép xong trong 1–2 phút → học sinh cất vở vào ngăn bàn để dành trọn thời gian còn lại thực hành trên máy!
  * **Nếu là Tiết 2 trở đi (Tiết thực hành/luyện tập):** Học sinh chỉ ghi Thứ ngày + Môn + Tên bài (Tiết 2) → **TUYỆT ĐỐI KHÔNG BẮT CHÉP THÊM LÝ THUYẾT NÀO NỮA**, dành trọn 100% thời lượng cho luyện tập thực hành trên máy tính!
* **Nền trắng tinh khiết (`#ffffff`):**
  * TUYỆT ĐỐI CẤM trang trí rườm rà (không kẻ hoa văn, không kẻ ô ly gây rối mắt khi chiếu máy chiếu mờ, không đổ bóng lòe loẹt).
  * Chữ có thể tô màu phân cấp nổi bật trên nền trắng (Thứ ngày: xám/xanh dịu, Môn học: xanh dương đậm, Tên bài: đỏ/cam nổi bật).
* **Typography Siêu To (Super-sized Typography):**
  * Thứ ngày tháng: `28px` – `34px` (đậm `700`).
  * Tên môn học: `36px` – `44px` (đậm `900`, in hoa).
  * Tựa đề bài học: `50px` – `64px` (đậm `900`, in hoa).
  * Dòng ghi nhớ/tóm tắt: `30px` – `38px` (đậm `800`, giãn dòng `1.6`).
* **TUYỆT ĐỐI CẤM đặt Đồng hồ đếm ngược (Timer) khi học sinh chép bài:**
  * Cấm kỵ tuyệt đối việc ra khẩu lệnh: *"Các em có đúng 3 phút chép bài"* kèm widget đồng hồ đếm ngược tích tắc nhảy giây trên màn hình.
  * Áp lực thời gian khiến học sinh hoảng loạn chép ẩu, chữ xấu và triệt tiêu khả năng tiếp thu. Giáo viên điều phối nhịp độ chép bài bằng cách quan sát thực tế trong lớp.
* **BẮT BUỘC có nút Chế độ Toàn Màn Hình (Fullscreen Toggle) — Chuẩn Pop-up Toàn Màn Hình (Full-screen Overlay Modal) 1 Nút Zoom / 1 Nút Tắt Duy Nhất:**
  * **Bản chất kỹ thuật:** Tuyệt đối **không phụ thuộc vào API browser fullscreen (F11)** vốn hay bị trình duyệt chặn, hỏi quyền cấp phép hoặc lỗi zoom trên màn chiếu TV. Màn hình chép bài toàn màn hình được thiết kế dưới dạng một **Pop-up Modal Toàn Màn Hình (Full-screen Overlay Modal)** ghim cố định trùm kín 100% diện tích màn hình TV (`position: fixed; inset: 0; width: 100vw; height: 100vh; z-index: 9999999; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; padding: 100px 40px 60px; overflow-y: auto; box-sizing: border-box;`). Bắt buộc cho phép cuộn trang (`overflow-y: auto`) và phần đệm trên (`padding-top: 90px - 100px`) phải lớn hơn vị trí của nút tắt (`top: 20px - 24px`) để nội dung không bao giờ bị nút đóng che khuất khi chữ nhiều hoặc màn hình có chiều cao hạn chế.
  * **Trạng thái bình thường:** Chỉ hiển thị **DUY NHẤT 1 NÚT ZOOM** `⛶ Chế độ toàn màn hình chép bài` (`.btn-fs-toggle`). Nút tắt `btn-fs-close` bắt buộc ẩn hoàn toàn (`display: none !important;`).
  * **Trạng thái Pop-up toàn màn hình:** Khung ghi bài phóng to chiếm trọn 100% màn hình TV (`100vw x 100vh`), che phủ hoàn toàn sidebar và các thanh điều hướng. Chỉ hiển thị **DUY NHẤT 1 NÚT TẮT** `✖ Thu nhỏ (Esc)` (`.btn-fs-close`) ghim cố định ở góc trên bên phải màn hình (`position: fixed; top: 20px; right: 28px; z-index: 10000000;`).
  * **TUYỆT ĐỐI CẤM:** Không được đổi tên nút Zoom thành nút tắt thứ hai (`btn.innerHTML = '✖ Thu nhỏ'`). Khi ở chế độ phóng to, nút Zoom ban đầu bắt buộc phải tự động ẩn đi (`display: none !important;`) để trên màn hình không bao giờ xuất hiện 2 nút tắt thừa thãi. Hỗ trợ phím `Esc` để đóng pop-up.

Mẫu HTML chuẩn:
```html
<div class="notebook clean" id="notebook-box">
    <button type="button" class="btn-fs-close" onclick="toggleNotebookFullscreen()">
        ✖ Thu nhỏ (Esc)
    </button>
    <div class="nb-date"><span class="notebookDateDisplay" id="current-date-line">Đang cập nhật ngày...</span></div>
    <div class="nb-subject">Môn: Tin học [Khối]</div>
    <div class="nb-title">BÀI X: [TÊN BÀI HỌC] (TIẾT 1)</div>
    <div class="nb-content">
        [1 đoạn vài chữ ngắn gọn, súc tích nhất của bài học, không thêm tiêu đề thừa]
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
}

// Lắng nghe phím Esc để đóng modal toàn màn hình chép bài
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const target = document.getElementById('notebook-box');
        if (target && target.classList.contains('fullscreen-mode')) {
            target.classList.remove('fullscreen-mode');
            const btn = document.getElementById('btn-toggle-fs');
            if (btn) btn.style.display = 'inline-flex';
        }
    }
});
```

### 3.4 Quy Chuẩn Ghi Bài 1 Lần Duy Nhất — Bãi Bỏ Chép Bài Chặng (No Progressive Chunking)
* **Bãi bỏ việc bắt học sinh chép bài lắt nhắt nhiều chặng:**
  * Việc cứ sau mỗi hoạt động nhỏ lại bắt dừng máy tính, lôi vở và bút ra chép 1-2 dòng khiến mạch học bị xé vụn, học sinh phải liên tục đổi tay từ chuột/bàn phím sang cầm bút, làm triệt tiêu sự hào hứng và lãng phí thời lượng quý giá của tiết học.
* **Chức năng của các thẻ ghi nhớ (`.memo-card` / `.note-box`) xuyên suốt bài giảng:**
  * Các thẻ ghi nhớ xuất hiện sau các hoạt động khám phá hoặc thực hành **chỉ đóng vai trò là Mỏ neo trực quan (Visual Anchor)** trên màn chiếu để học sinh đối chiếu hoặc đọc lướt khi làm bài.
  * **TUYỆT ĐỐI KHÔNG bắt học sinh dừng tay để mở vở chép lại** các nội dung này. Toàn bộ nội dung cần ghi vào vở đã được chép hoàn tất 1 lần duy nhất ở đầu giờ.

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

### 3.7 Quản Lý Lớp & Tương Tác 100% Không Đạo Cụ (Zero-Prop Physical Interaction)
* **Chống mô hình thụ động "1 em trả lời — cả lớp ngồi xem":**
  * Trong giờ học tương tác, nếu giáo viên chỉ gọi từng em phát biểu thì 30–35 em còn lại sẽ dễ mất tập trung, nói chuyện riêng hoặc chơi game ngoài luồng.
* **Triết lý Zero-Effort — Tương tác 100% Không Đạo Cụ Vật Lý (Zero-Prop Interaction):**
  * **TUYỆT ĐỐI CẤM:** Không yêu cầu hay gợi ý giáo viên/học sinh mang vác chuẩn bị đạo cụ vật lý rườm rà (bông hoa xoay trắc nghiệm ABCD, bảng con, thẻ màu tín hiệu, phấn viết...). Toàn bộ giáo án phải vận hành trơn tru theo triết lý "Zero-Effort" (100% Web-based, chỉ cần màn chiếu và máy tính).
  * **Tương tác Thể chất qua Cử chỉ Ký hiệu Tay (Hand Gestures & Body Language):**
    * **Chọn A - B - C - D:** Cả lớp cùng suy nghĩ và đồng loạt giơ **1 - 2 - 3 - 4 ngón tay** biểu quyết đáp án tương ứng.
    * **Đúng / Sai & Tán thành / Phản đối:** Giơ chéo hai tay tạo chữ **X** (Sai / Không đồng ý) hoặc vòng hai tay tạo chữ **O** (Đúng / Đồng ý), làm biểu tượng Thả tim hoặc Giơ ngón cái (Like).
    * **Đồng loạt 100% động não:** Giáo viên chỉ mất đúng 2 giây quét mắt quanh phòng máy là nắm bắt chính xác mức độ hiểu bài của 100% học sinh (Formative Assessment) mà không tốn công phát/thu/dọn dẹp đạo cụ.
  * **Kết hợp Gacha Màn Hình Lớn:** Sau khi cả lớp thể hiện cử chỉ tay, giáo viên bấm nút Gacha bốc ngẫu nhiên 1 em lên chốt đáp án hoặc thực hiện thử thách trên máy.
* **Khuếch đại trực quan bằng công nghệ lớp học (nếu có trang bị):**
  * Tận dụng Đèn chiếu vật thể (Document Camera) hoặc tính năng chia sẻ màn hình máy chủ để chiếu phóng to các thao tác mẫu tinh vi (thao tác ngón tay trên phím/chuột, cấu tạo linh kiện phần cứng, mẫu sản phẩm đồ họa/Scratch/soạn thảo) lên màn hình lớn cho toàn bộ lớp quan sát rõ nét.
* **Nghệ thuật Khẩu lệnh Sư phạm Dứt khoát (Decisive Directives):**
  * Giáo viên là người làm chủ không gian phòng máy. Khẩu lệnh đưa ra phải ngắn gọn, dứt khoát và định hướng hành động rõ ràng (*"Hành động + Đối tượng + Thời điểm"*, ví dụ: *"Cả lớp mở sách trang 20"*, *"Hai tay đặt lên bàn phím"*).
  * **TUYỆT ĐỐI CẤM** dùng những câu hỏi ngược lại học sinh mang tính do dự, nước đôi (*"Hình này phải không các em?", "Làm vậy đúng không ta?"*). Slide và kịch bản sư phạm phải dùng các câu khẳng định chuẩn xác, truyền sự tự tin cho học sinh.

### 3.7.1 Quy Chuẩn Vấn Đáp Thao Tác Quy Trình (Scrambled Steps Ordering)
* **Bản chất tâm lý & Sư phạm:** Học sinh tiểu học chưa có khả năng diễn đạt lưu loát từng bước thao tác kỹ thuật dài dòng. Nếu bắt học sinh đứng lên trả lời miệng hoặc học vẹt 4 bước thực hiện, các em sẽ lúng túng, ngập ngừng, làm chùng không khí lớp học.
* **Quy chuẩn Trắc nghiệm Sắp xếp Thứ tự:**
  * Đối với các câu hỏi khám phá quy trình/thao tác (ví dụ 3–4 bước thao tác trên phần mềm):
  1. **Hiển thị các bước xáo trộn (Scrambled Cards):** Chiếu 4 thẻ bước lộn xộn, đánh mã `(A), (B), (C), (D)`.
  2. **Gọi học sinh đứng lên chọn thứ tự:** Giáo viên dùng ô chọn học sinh + nút Gacha `🎲` để gọi một em đứng lên lựa chọn.
  3. **Cung cấp 4 phương án trắc nghiệm thứ tự:** Các phương án thứ tự to rõ (ví dụ: `1️⃣ (A) → (B) → (D) → (C)`, `2️⃣ (B) → (D) → (C) → (A)`...).
  4. **Nhấp chọn & Phản hồi trực quan:** Giáo viên hoặc học sinh nhấp vào phương án được chọn → Nút đổi màu (Xanh nếu đúng, Đỏ nếu sai), phát âm thanh khen thưởng `playWin()` / `playFail()`, hiển thị lời giải thích sư phạm cốt lõi (nhấn mạnh thao tác nào luôn phải làm đầu tiên, ví dụ: *Luôn chọn bôi đen trước!*) và tự động ghi nhận Telemetry (T / H) cho học sinh.

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

### 4.2 Ứng dụng Gacha theo Chế độ Tiết học & Cơ Chế "Gacha Tới Khi Nào Trúng Thì Thôi"
1. **Chế độ Toàn lớp / Cá nhân (Đấu quái toán, Luyện chuột, Gõ phím tiếp sức):**
   * Bấm Gacha tự động bốc ngẫu nhiên từ mảng học sinh chưa tham gia (`remainingStudents`).
   * Pop-up hiện tên thật to để cả lớp cùng quan sát bạn bước lên máy tính.
2. **Chế độ Thi đua Theo Tổ ("Gacha tới khi nào trúng thì thôi"):**
   * **Thực tế lớp học & Lý do KHÔNG gán tổ cố định:** Trong thực tế giảng dạy tiểu học, mỗi lần giáo viên gặp lại bất kỳ lớp nào (mỗi tuần, mỗi buổi học) là lớp đó lại đổi chỗ ngồi một lần (do GVCN sắp xếp lại vị trí hoặc học sinh tự đổi máy). Do đó, hệ thống **CHỦ ĐÍCH KHÔNG GÁN TỔ NGAY TỪ ĐẦU** cho học sinh trong dữ liệu JSON hay danh sách lớp.
   * **Không phải là lỗi (NOT A BUG):** Việc đến lượt thi của Tổ này nhưng bấm Gacha lại hiện tên học sinh đang ngồi ở Tổ khác là **hoàn toàn bình thường và đúng chủ đích thiết kế**. AI Agent TUYỆT ĐỐI KHÔNG xem đây là lỗi và không được tự ý ép gán cứng học sinh vào tổ hay khóa bộ lọc Gacha theo tổ giả định trong code.
   * **Quy trình bấm Gacha của Giáo viên:** Giáo viên bấm nút Gacha liên tục cho đến khi hiện ra tên một em đang ngồi ở **Tổ đang đến lượt** thì dừng lại và chốt em đó lên bảng (*"Gacha tới khi nào trúng thì thôi"*).
   * **Nguyên tắc an toàn lượt:** Nhờ nguyên tắc *Picked ≠ Done*, việc bấm Gacha nhiều lần để tìm đúng bạn thuộc tổ hoàn toàn không làm mất lượt của các bạn đã hiện tên trước đó.
   * Giáo viên cũng có thể chọn trực tiếp từ dropdown danh sách nếu có em trong tổ xung phong giơ tay.

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
* **Quy tắc An Toàn Excel Đời Cũ (Biểu tượng Huy chương trong CSV):**
  * Trong giao diện HTML vẫn hiển thị sinh động bằng emoji (`🥇`, `🥈`, `🥉`, `🌟`, `🎖️`).
  * Nhưng trong cột **"Huy Chương" xuất ra file CSV**, BẮT BUỘC ghi bằng văn bản thuần (`Huy chương Vàng`, `Huy chương Bạc`, `Huy chương Đồng`, `Huy hiệu Khuyến khích`...) để tránh bị lỗi hiển thị thành ô vuông trắng `□` trên các bản Microsoft Excel 2010/2013/2016 máy bàn trường học.

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

* **Linh hoạt Menu điều khiển & Nút Hamburger (`☰`):** Dù bố cục từng khối có định hướng riêng, **tất cả các menu điều khiển, thanh công cụ Giáo viên (Teacher Toolbar), bảng điều khiển quản trị hoặc sidebar điều hướng ĐỀU CHO PHÉP thiết kế ẩn/hiện bằng nút Hamburger (`☰`)** (ví dụ dạng Side Drawer trượt ra/vào). Điều này giúp tối ưu 100% diện tích màn chiếu cho học sinh tập trung vào bài giảng.

### 7.2 Thông số Kỹ thuật Màn chiếu TV Lớp học (Tối Ưu Cho Người Ngồi Xa 8–10m)
* **Tối thiểu hóa chi tiết & Cho mọi thứ to lên:** Không nhồi nhét quá nhiều chi tiết vụn vặt, icon trang trí hay viền rườm rà. Tận dụng cơ chế cuộn trang dọc tự nhiên (`overflow-y: auto`) để mở rộng chiều cao, cho các phần tử to rõ tối đa giúp học sinh ngồi ở cự ly 8–10m cuối lớp nhìn rõ mồn một.
* **Tiêu đề Slide (`.slide-title`):** Cỡ `2.4rem` – `3.5rem` (`36px` – `48px`), `font-weight: 800 - 900`.
* **Chữ Nội dung & Câu hỏi (`p`, `.desc`):** Cỡ `1.3rem` – `1.6rem` (`19px` – `24px`), `font-weight: 700 - 800`, `line-height: 1.6`.
* **Bảng điểm Tổ trên Sidebar:** Tên tổ $\ge 20\text{px} - 22\text{px}$, Điểm số $\ge 24\text{px} - 28\text{px}$. Chiều rộng sidebar khi mở đạt $340\text{px} - 360\text{px}$ để các phần tử to rõ không bị co rúm hay chèn ép.
* **Nút bấm Hành động (`button`):** Cỡ `1.2rem` – `1.6rem` (`16px` – `20px`), độ dày `800 - 900`, padding tối thiểu `10px 20px`, bo góc `10px – 999px`.
* **Đệm chân trang (Padding-bottom):** Bắt buộc chừa tối thiểu `120px` đến `140px` ở đáy trang để không bị thanh điều hướng che lấp nội dung.
* **Tối ưu không gian bằng Menu Hamburger / Toggle (`☰`):** Cho phép ẩn/hiện thanh công cụ/sidebar để nhường 100% diện tích màn chiếu cho bài giảng khi cần.
* **Tương phản:** Nền sáng dịu mắt (xanh nhạt/kem/trắng xám), chữ tối màu (xanh navy đậm/đen xám), không dùng viền neon tương phản gắt làm mỏi mắt học sinh.

### 7.3 Quy Chuẩn Menu Điều Khiển & Thanh Công Cụ Giáo Viên: Cho Phép Ẩn/Hiện Bằng Nút Hamburger (`☰`)

#### 7.3.1 Lý do Sư phạm & Tối ưu Màn chiếu TV Lớp học
* **Sân khấu bài giảng là ưu tiên tuyệt đối:** Màn hình TV và máy chiếu tại các phòng máy tính tiểu học thường có tỷ lệ hiển thị và chiều cao hạn chế (16:9 hoặc 1366x768 / 1920x1080). Trọng tâm của tiết học là nội dung bài giảng, hình ảnh minh họa sinh động và câu chữ cỡ lớn để học sinh ngồi ở cự ly 8–10m cuối lớp nhìn rõ và nắm bắt kịp thời.
* **Giấu công cụ quản trị khỏi tầm mắt học sinh (Zero Distraction):** Các tính năng kỹ thuật dành riêng cho Giáo viên (như chọn lớp học, đổi câu hỏi, đổi hình ảnh quái vật, tải bài mẫu docx, kích hoạt Phe Quỷ, nạp CSV phụ trợ, xem báo cáo SMAS, sao lưu Drive, xóa dữ liệu phiên...) không cần thiết phải hiển thị liên tục trước mắt học sinh. Việc để lộ quá nhiều nút bấm kỹ thuật vừa làm thu hẹp không gian trình chiếu, vừa gây rối mắt và làm phân tán sự tập trung của trẻ.

#### 7.3.2 Cơ Chế Ẩn/Hiện Bằng Nút Hamburger (`☰`)
* **Toàn quyền áp dụng:** Hệ thống **CHO PHÉP VÀ KHUYẾN KHÍCH** chuyển các thanh điều khiển, thanh công cụ giáo viên (Teacher Toolbar) hoặc sidebar quản trị thành giao diện trượt / ngăn kéo (Drawer / Collapsible Panel) đóng mở bằng nút Hamburger (`☰`).
* **Cấu trúc UI chuẩn:**
  1. **Nút Hamburger (`.btn-hamburger-toggle`):** BẮT BUỘC là **nút vuông độc lập (Square button tỷ lệ 1:1, khoảng 44px - 48px, KHÔNG CHỮ)**, chỉ chứa icon (`☰` khi đang đóng, `◀` hoặc `✕` khi đang mở). Nút luôn ghim cố định ở cạnh trên bên trái (`position: fixed; top: 12px - 14px; left: 12px - 14px; z-index: 9999;`). TUYỆT ĐỐI CẤM lồng nút vào thanh topbar hay container khác.
  2. **Nút Điều Khiển Duy Nhất (Single Master Toggle):** Đây là công tắc duy nhất để đóng/mở sidebar. TUYỆT ĐỐI CẤM tạo thêm nút ẩn/thu gọn riêng bên trong Sidebar (như nút "◀ Thu gọn" trong header sidebar) gây lặp thừa thãi.
  3. **Lớp phủ nền mờ (`.teacher-drawer-overlay` / Backdrop):** Khi dùng dạng Drawer trượt toàn phần, phủ toàn màn hình (`position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(6px); z-index: 100010;`), giúp làm nổi bật menu khi mở.
  4. **Ngăn kéo điều khiển (`.teacher-drawer` hoặc Sidebar):** Trượt ra từ mép trái màn hình với animation mượt mà (`transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);`).
  5. **Nội dung bên trong:** Gom nhóm trực quan theo từng khu vực:
     - 🏆 *Điểm số & Thi đua:* Bảng điểm các tổ (click inline để sửa điểm, nút phạt ồn `🤫 -10%`).
     - 🏫 *Quản lý lớp học:* Chọn lớp, xem danh sách học sinh, bốc thăm Gacha.
     - 🛠️ *Công cụ tiết học:* Tải đề bài docx, đấu trường ma vương, xuất CSV, xóa session.
  6. **Cơ chế đóng linh hoạt:** Bấm lại chính nút vuông ở góc trên bên trái, hoặc click ra vùng overlay bên ngoài, hoặc nhấn phím `Esc`.

#### 7.3.3 Benchmark Điển Hình
* **Khối 5 Tiết 11** (`khoi-5/tiet-11/index.html`): Áp dụng chuẩn nút vuông Hamburger cố định góc trên bên trái (không chữ), loại bỏ hoàn toàn các nút thừa, tối ưu 100% diện tích màn chiếu cho bài giảng.
* **Khối 2 Tiết 10** (`khoi-2/tiet-10/index.html`): Áp dụng mô hình Hamburger Drawer giúp màn hình trận đấu toán học rộng rãi 100%, học sinh tập trung tối đa vào đề bài và hiệu ứng chiến đấu.

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
*Hệ thống hỗ trợ linh hoạt từ 2 đến 6 tổ (Mặc định 4 tổ, kèm nút thêm/bớt tổ).*
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
* **Cú pháp hằng số chuẩn & Bố trí nút linh hoạt 2–6 Tổ:**
  * **Linh hoạt số lượng Tổ (2 đến 6 Tổ):** Thay vì fix cứng 4 tổ, giao diện cài đặt đầu giờ luôn có nút `[+ Thêm Tổ]` / `[- Bớt Tổ]` (cho phép cấu hình linh hoạt từ 2 đến 6 tổ tùy theo quy mô lớp hoặc thêm Tổ Quỷ khi kích hoạt ở Khối 5).
  ```javascript
  const STARTING_SCORE = 1000;
  // Cấu hình khởi tạo mặc định (linh hoạt mở rộng 2 - 6 tổ)
  const defaultTeamConfigs = [
    { id: 1, name: 'Tổ 1', score: STARTING_SCORE, color: '#3b82f6' },
    { id: 2, name: 'Tổ 2', score: STARTING_SCORE, color: '#10b981' },
    { id: 3, name: 'Tổ 3', score: STARTING_SCORE, color: '#f59e0b' },
    { id: 4, name: 'Tổ 4', score: STARTING_SCORE, color: '#ec4899' },
    { id: 5, name: 'Tổ 5', score: STARTING_SCORE, color: '#8b5cf6' },
    { id: 6, name: 'Tổ 6', score: STARTING_SCORE, color: '#06b6d4' }
  ];
  let currentTeams = defaultTeamConfigs.slice(0, 4); // Mặc định 4 tổ ban đầu
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
      { rank: 1, medal: '🥇', csvMedal: 'Huy chương Vàng', title: 'QUÁN QUÂN', sharedTitle: 'ĐỒNG QUÁN QUÂN', themeClass: 'rank-1', border: '#facc15' },
      { rank: 2, medal: '🥈', csvMedal: 'Huy chương Bạc', title: 'Á QUÂN', sharedTitle: 'ĐỒNG Á QUÂN', themeClass: 'rank-2', border: '#94a3b8' },
      { rank: 3, medal: '🥉', csvMedal: 'Huy chương Đồng', title: 'HẠNG BA', sharedTitle: 'ĐỒNG HẠNG BA', themeClass: 'rank-3', border: '#d97706' },
      { rank: 4, medal: '🌟', csvMedal: 'Khuyến khích', title: 'KHUYẾN KHÍCH', sharedTitle: 'KHUYẾN KHÍCH', themeClass: 'rank-4', border: '#3b82f6' },
      { rank: 5, medal: '🎖️', csvMedal: 'Nỗ lực', title: 'NỖ LỰC', sharedTitle: 'NỖ LỰC', themeClass: 'rank-5', border: '#10b981' },
      { rank: 6, medal: '🎗️', csvMedal: 'Gắn kết', title: 'GẮN KẾT', sharedTitle: 'GẮN KẾT', themeClass: 'rank-6', border: '#64748b' }
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
        csvMedal: tpl.csvMedal,
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

* **Đồng bộ Dữ liệu Báo cáo CSV (An toàn Excel cũ):**
  * Phần bảng xếp hạng trong file CSV bắt buộc phản ánh chuẩn xác cơ chế đồng hạng và dùng văn bản thuần cho cột Huy Chương:
    ```csv
    "Thứ Hạng","Huy Chương","Danh Hiệu","Tổ / Đội","Điểm Số","Đồng Hạng","Ghi Chú"
    "Hạng 1","Huy chương Vàng","ĐỒNG QUÁN QUÂN","TỔ 1","1100","Có (Đồng điểm)","Xuất sắc"
    "Hạng 1","Huy chương Vàng","ĐỒNG QUÁN QUÂN","TỔ 3","1100","Có (Đồng điểm)","Xuất sắc"
    "Hạng 3","Huy chương Đồng","HẠNG BA","TỔ 2","1050","Không","Hoàn thành tốt"
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
  Mọi bài học có hệ thống tính điểm, xếp hạng hoặc chuỗi streak BẮT BUỘC phải cung cấp công cụ cho phép Giáo viên can thiệp nhanh theo quy chuẩn tối giản (tránh rác UI):
  1. **Sửa điểm trực tiếp bằng Ô Nhập Liệu (Inline Input Field — Không dùng Prompt, Không Emoji Bút):**
     * **TUYỆT ĐỐI CẤM:** Không được nhồi nhét hàng loạt nút mini `+50`, `+100`, `-50`, `-100`, `🔄 1000đ`... trên từng thẻ tổ làm chật chội sidebar và gây phân tâm thị giác cho học sinh.
     * **TUYỆT ĐỐI CẤM:** Không dùng hộp thoại `prompt()` của trình duyệt (thô cứng, dễ bị browser chặn). Không thêm emoji bút chì `✏️` thừa thãi.
     * Cho phép Giáo viên nhấp trực tiếp vào con số điểm trên thẻ tổ (`.team-card-score`). Phần tử này lập tức chuyển hóa thành một ô nhập số `<input type="number" class="team-score-input">` ngay tại chỗ, tự động focus và bôi đen số cũ.
     * Khi nhấn phím `Enter` hoặc nhấp chuột ra ngoài (`blur`), hệ thống tự động lưu số điểm mới. Khi nhấn `Esc`, hủy bỏ sửa điểm và giữ nguyên giá trị cũ.
     * Đoạn mã chuẩn:
       ```javascript
       function startInlineScoreEdit(teamId, event) {
           if (event) event.stopPropagation();
           const span = document.getElementById(`team-score-span-${teamId}`);
           const input = document.getElementById(`team-score-input-${teamId}`);
           if (!span || !input) return;

           span.style.display = 'none';
           input.style.display = 'inline-block';
           input.focus();
           input.select();

           let committed = false;
           const finish = () => {
               if (committed) return;
               committed = true;
               const val = parseInt(input.value, 10);
               const team = STATE.teams.find(t => t.id === teamId);
               if (team && !isNaN(val)) {
                   team.score = Math.max(0, val);
                   onScoreUpdated();
               }
               renderTeams();
           };
           input.onkeydown = (e) => {
               if (e.key === 'Enter') { e.preventDefault(); finish(); }
               else if (e.key === 'Escape') { e.preventDefault(); committed = true; renderTeams(); }
           };
           input.onblur = finish;
       }
       ```
  2. **Tính năng Phạt ồn 1-chạm (Noise Penalty — Trừ 10% khi mất trật tự):**
     * Mỗi thẻ tổ bố trí **DUY NHẤT 1 nút phạt ồn nhỏ gọn** (`🤫 -10%`).
     * Khi tổ học sinh ồn ào hoặc mất trật tự, giáo viên bấm nút này để trừ chính xác 10% trên tổng điểm hiện tại của tổ:  
       $$\text{Điểm trừ} = \text{round}(\text{Score} \times 0.1), \quad \text{Score mới} = \max(0, \text{Score} - \text{Điểm trừ})$$
     * **BẮT BUỘC có Toast thông báo răn đe trên màn chiếu:** Kích hoạt âm thanh cảnh báo mất trật tự (`playNoiseAlert()`) và hiện thông báo Toast rõ ràng trên màn hình lớn:  
       *Ví dụ: `📢 [Tổ 1] Mất trật tự / Ồn ào: Đã bị trừ 10% (-100 Xu), điểm hiện tại còn: 900 Xu! 🤫`*  
       Giúp cả lớp tự giác nhắc nhau trật tự mà giáo viên không cần phải quát mắng.
  3. **Tự động tính toán lại và đồng bộ tức thì:**
     * Ngay khi điểm hoặc chuỗi streak được chỉnh sửa / phạt:
       1. Gọi lại `window.calculateRankings(STATE.teams)` để cập nhật lại tức thì bảng xếp hạng, huy chương 🥇🥈🥉, và danh hiệu vinh danh.
       2. Gọi `saveSessionState()` để tự động lưu ngay vào `localStorage` (đề phòng cúp điện).
       3. Cập nhật dữ liệu chuẩn bị xuất file CSV cuối tiết.
       4. Hiển thị Toast thông báo xác nhận.

### 10.4 Quy Chuẩn Luồng Giảng Dạy: Lên Lần Lượt Từng Em Trên Bảng — CẤM "Chấm Hàng Loạt"
* **Luồng tương tác trên lớp:** Học sinh được gọi lên bảng lần lượt từng em (qua dropdown chọn tên hoặc bốc thăm Gacha) để trực tiếp thao tác máy, giải quyết ticket hoặc trả lời câu hỏi.
* **CẤM Chấm Hàng Loạt (Batch Auto-grader):** Tuyệt đối không đưa các tính năng upload 35 file zip/docx chấm đồng loạt vào slide bài giảng của giáo viên, gây rối giao diện và phá vỡ luồng sư phạm tương tác trực tiếp.

---

## 11. HỆ THỐNG QUẢN LÝ QUESTS & CÂU HỎI BẰNG FILE `quests.js` DUY NHẤT

### 11.1 Nguyên tắc "Không nhồi nhét câu hỏi vào HTML" & Triệt tiêu lỗi Duplicate (DRY)
* **Vấn đề của phương án cũ (quests.json song song quests.js):** Việc duy trì song song 2 file chứa cùng nội dung (`quests.json` và `quests.js`) vi phạm nghiêm trọng nguyên tắc DRY (Don't Repeat Yourself). Khi giáo viên sửa câu hỏi ở file `.json` nhưng quên sửa file `.js`, lúc mang ra phòng máy mở trực tiếp bằng `file:///...`, hệ thống không gọi được `fetch()` nên fallback về `.js` cũ $\rightarrow$ học sinh vẫn nhìn thấy câu hỏi cũ chưa sửa!
* **Quy chuẩn mới tối ưu 100%:**
  * **Bỏ hẳn file `quests.json`**, chỉ dùng **DUY NHẤT 1 file `quests.js`** nằm ngay cạnh file `index.html`.
  * Toàn bộ câu hỏi, thử thách, tình huống vụ án, trắc nghiệm được khai báo trực tiếp vào biến toàn cục:
    ```javascript
    // File: quests.js (Đặt ngay cạnh index.html)
    window.QUESTS_DATA = [
        {
            id: 1,
            title: "Vụ án 01: Sự cố thư mục",
            question: "Thư mục dùng để làm gì trong máy tính?",
            options: ["Lưu trữ và sắp xếp tệp", "Xem hoạt hình", "Tắt máy tính", "Lau màn hình"],
            answer: 0,
            hint: "Xem lại bài học về Ngăn kéo tủ hồ sơ",
            points: 100
        }
    ];
    ```
  * Cấu trúc mảng/object JavaScript trong `quests.js` hoàn toàn tương đồng với JSON, cực kỳ trực quan, giáo viên có thể mở bằng Notepad/VS Code để thêm/sửa câu hỏi trong 30 giây.

### 11.2 Cơ chế Nạp 100% Offline-First Siêu Gọn Nhẹ
* Trong thẻ `<head>` của `index.html`, chỉ cần nhúng duy nhất 1 dòng:
  ```html
  <script src="quests.js"></script>
  ```
* Trong mã nguồn JavaScript điều khiển, sử dụng trực tiếp:
  ```javascript
  const QUESTS = window.QUESTS_DATA || [];
  ```
* **Lợi ích vượt trội:**
  1. **100% Không bao giờ dính lỗi CORS:** Chạy mượt mà tuyệt đối khi double-click mở trực tiếp `file:///...` trong phòng máy không có internet hay local web server.
  2. **Chỉnh sửa 1 nơi duy nhất:** Giáo viên sửa xong là hiệu lực tức thì ở cả online lẫn offline, không bao giờ lo lệch phiên bản.
  3. **Không cần code `fetch()` / `async-await` rườm rà:** Giảm tải mã nguồn, loại bỏ hoàn toàn nguy cơ bất đồng bộ race-condition khi nạp slide.

---

## 12. HỆ THỐNG TÍNH NĂNG ẨN: CƠ CHẾ "PHE QUỶ" BẤT CÔNG CÔNG KHAI (CHỈ ÁP DỤNG RIÊNG CHO KHỐI 5 / LỚP 5)

### 12.1 Đặc Quyền Độc Quyền Dành Riêng Cho Khối 5 (Lớp 5)
* **Đặc quyền độc quyền của Khối 5:** Cơ chế Phe Quỷ (`shared/js/demon-mode.js`) được thiết kế **ĐỘC QUYỀN VÀ CHỈ ÁP DỤNG CHO HỌC SINH KHỐI 5 (LỚP 5)**.
* **Lý do sư phạm lứa tuổi:**
  * **Học sinh Khối 1 đến Khối 4 (6 – 9 tuổi):** Tâm sinh lý còn non nớt, dễ tủi thân, chưa có khả năng tự điều chỉnh cảm xúc phức tạp. Việc bị đưa vào "Phe Quỷ", chịu luật "bất công công khai", trừ điểm nặng hay hạ xếp loại C dễ gây sang chấn tâm lý, mặc cảm hoặc tiêu cực học đường. Ở Khối 1–4, giáo viên chỉ áp dụng kỷ luật tích cực: nhắc nhở nhẹ nhàng, kiểm tra tư thế (như widget cầm chuột ở Khối 1), hoặc trừ điểm nhẹ.
  * **Học sinh Khối 5 (10 – 11 tuổi):** Bước vào giai đoạn tiền dậy thì, học sinh có cá tính mạnh, bắt đầu hình thành tâm lý nổi loạn, thích tụ tập bè phái quậy phá ngầm, thích thể hiện cái tôi trước bạn bè hoặc thách thức giáo viên. Cơ chế "Bất công công khai" được may đo riêng cho lứa tuổi này: đánh trúng tâm lý sĩ diện, khiến hành vi quậy phá không còn là chỗ để "làm ngầu" mà trở thành sự thiệt thòi cay đắng và làm lợi cho các bạn khác (Quỹ cứu trợ).
* **TUYỆT ĐỐI CẤM:** Không được kích hoạt hoặc tích hợp Phe Quỷ vào bất kỳ bài học nào của Khối 1, Khối 2, Khối 3 và Khối 4.
* **Hình thức kích hoạt:** Chỉ áp dụng trong các tiết Khối 5 có học sinh cá biệt (qua query URL `?mode=mavuong`, sessionStorage hoặc phím tắt ẩn của Giáo viên `Ctrl + Alt + D`).

### 12.2 Bối cảnh Sư phạm Thực Tế & Triết Lý "Bất Công Công Khai" (Asymmetric Debuff / Hardcore Handicap)
* **Bài học đắt giá từ thực tế lớp học:**
  * Ban đầu, cơ chế Phe Quỷ với giao diện ngầu, hiệu ứng sấm sét tím huyền bí và phần thưởng "Quỷ Vương lên bục giảng cầm chuột điều khiển máy chiếu tiết sau" đã gây tác dụng ngược nghiêm trọng:
  * Học sinh cá biệt coi việc vào Phe Quỷ là **đặc quyền VIP**, cố tình quậy phá để được sang Phe Quỷ tranh ngôi "Quỷ Vương", biến hình phạt thành sàn diễn cá nhân.
* **Đập bỏ tư tưởng "Tôn vinh ngầm" — Chuyển sang "Bất Công Công Khai":**
  * Hệ thống tuyên bố thẳng thắn trên giao diện UI và trong nội quy: **"Tổ Quỷ luôn chịu sự bất công của hệ thống"**.
  * Phe Quỷ không phải sân chơi hào nhoáng, mà là một chế độ chấp cực nặng (Hardcore Handicap) khiến kẻ phá bĩnh lập tức nhận ra: quậy phá chỉ mang lại thiệt thòi cay đắng cho bản thân và làm lợi cho các bạn khác.

### 12.3 Bộ Luật Bất Công Công Khai (Asymmetric Debuff Rules)
Học sinh bị trục xuất sang Phe Quỷ phải tuân theo 3 hệ số bất công tuyệt đối:
1. **Trả lời Đúng — Nhận Thưởng 50% (Hoặc Chuộc Tội):**
   * Khi trả lời đúng câu hỏi, con Quỷ chỉ được nhận **50% điểm thưởng** (+50đ thay vì +100đ như tổ thường).
   * Điểm này chỉ có ý nghĩa "chuộc tội" bù lại các lỗi vi phạm; trần điểm cá nhân **tuyệt đối không được vượt mốc sàn 1000đ**. Muốn có điểm cao chỉ có con đường cải tạo hoàn lương để trở về tổ gốc!
2. **Trả lời Sai / Vi phạm Trật tự — Phạt Gấp Đôi (-200đ) & Bơm Vào Quỹ Cứu Trợ:**
   * Làm ồn, nói leo, không chép bài hoặc cố ý chọn sai: Giáo viên bấm phạt **gấp đôi (-200đ)**.
   * **Bơm thẳng vào Quỹ Cứu Trợ Loài Người:** Toàn bộ số điểm bị phạt này được chuyển thẳng vào quỹ cứu trợ chia đều cho các tổ Loài Người hoặc cộng trực tiếp cho tổ Loài Người đang có điểm số thấp nhất. Kẻ phá bĩnh biến thành "người tiếp tế tài nguyên" cho đối thủ!
3. **Gacha Bất Lợi (Bad Luck Multiplier):**
   * Trong các mini-game có yếu tố may rủi, xúc xắc, rương bí ẩn hoặc kinh tế (như *IT Tycoon*): Tỷ lệ gặp sự cố, dính virus, mất lượt hoặc bẫy đen đủi của Tổ Quỷ mặc định bị nâng lên **60% – 80%** (trong khi các tổ bình thường chỉ 20% – 30%).

### 12.4 Bãi Bỏ Hoàn Toàn Danh Hiệu "Quỷ Vương Cầm Máy" (No King, No Power)
* **Xóa bỏ hoàn toàn đặc quyền bục giảng:**
  * **TUYỆT ĐỐI CẤM:** Không bao giờ trao quyền lên bục giảng cầm chuột điều khiển máy chiếu tiết sau cho học sinh cá biệt thuộc Phe Quỷ. Học sinh quậy phá không được phép nắm giữ bất kỳ quyền lực điều khiển lớp học nào.
* **Bãi bỏ quy trình 3 bậc xét duyệt rườm rà:**
  * Bỏ toàn bộ cơ chế sắc phong Quỷ Vương, so lỗi vi phạm, soi vở tại chỗ để tranh ngai vàng, và vòng đấu Gacha 1-1 đoạt vương.
  * Phe Quỷ là nơi cách ly kỷ luật và cải tạo hành vi, không phải đấu trường tranh ngôi thứ danh vọng.

### 12.5 Đơn Giản Hóa Bảng Điểm: Ngưỡng Rớt Sàn (< 800đ) & Nút Hoàn Lương (Ân Xá)
* **Bỏ cơ chế "Zero-Sum Quỷ hút máu Quỷ":**
  * Cơ chế hút máu cắn trộm giữa các con quỷ gây mất thời gian giải thích luật và dễ kích động tranh cãi thù hằn cá nhân trong lớp học tiểu học.
  * Đơn giản hóa: Mỗi em trong Phe Quỷ có thanh điểm riêng (bắt đầu từ sàn 1000đ). Trả lời đúng cộng nhẹ (+50đ, max 1000đ), vi phạm phạt nặng (-200đ).
* **Ngưỡng Phạt Rớt Sàn (< 800 Xu):**
  * Bất kỳ con Quỷ nào kết thúc tiết học với tổng điểm **dưới 800 Xu** (hoặc âm điểm) sẽ bị xếp loại TT27 là **C (Chưa hoàn thành)**.
  * Nhận hình phạt kỷ luật thích đáng: chép phạt nội dung bài học 3–5 lần, trực nhật vệ sinh phòng máy, tước quyền sử dụng máy tính tiết sau, và xuất biên bản gửi GVCN cùng phụ huynh.
* **Nút Hoàn Lương / Thanh Tẩy (Ân Xá):**
  * Nếu một em ở Phe Quỷ biết ăn năn, ngồi im chép bài nghiêm túc, tập trung chú ý và **không bị trừ điểm trong suốt 15–20 phút liên tục**:
  * Giáo viên bấm nút **"Ân Xá / Hoàn Lương"**: Em đó được chuyển sinh trở về tổ gốc, mang theo 100đ – 200đ điểm thưởng tài trợ lại cho tổ cũ trong sự hoan nghênh của cả lớp.

### 12.6 Vòng Xoay Lượt Chơi & Gacha Bắt Buộc (Turn Rotation & Enforced Gacha)
* **Xếp lượt ngang hàng:**
  * Tổ Ma Vương được xếp như một tổ thi đấu trong vòng quay câu hỏi:
    $$\text{Tổ 1} \longrightarrow \text{Tổ 2} \longrightarrow \text{Tổ 3} \longrightarrow \text{Tổ 4} \longrightarrow \mathbf{\text{Tổ Quỷ (Debuff)}} \longrightarrow \dots$$
* **CẤM Giơ tay tự do ở Lượt Quỷ:**
  * Ở lượt của Phe Quỷ, giao diện hiển thị cảnh báo đỏ/tím đậm kèm dòng chữ: *"⚠️ LƯỢT ĐẤU TỔ QUỶ — HỆ SỐ BẤT CÔNG KÍCH HOẠT"*.
  * Khóa quyền xung phong tự do. Giáo viên bấm nút `🎲 Gacha Tổ Quỷ` để hệ thống tự động bốc ngẫu nhiên một em trong danh sách Phe Quỷ lên bảng trả lời.

### 12.7 Kiến Trúc Kỹ Thuật & Phương Thức Kích Hoạt Ẩn
1. **Truy cập trực tiếp qua GitHub Pages (`index-mavuong.html`):**
   * Trong thư mục tiết học (ví dụ: `khoi-5/tiet-10/`), file phụ `index-mavuong.html` đóng vai trò redirect:
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
   * Giáo viên bấm tổ hợp phím `Ctrl + Alt + D` (Demon Mode) hoặc click nhanh 4 lần vào Logo môn học ở góc trên bên trái để mở modal quản lý Phe Quỷ:
     * Bảng danh sách chọn nhanh các em cần "Trục xuất sang Phe Quỷ" hoặc "Ân xá hoàn lương trở về".
     * Nút kích hoạt nhanh hình phạt `-200đ` (chuyển điểm sang Quỹ Cứu Trợ).

### 12.8 Báo Cáo CSV Riêng Biệt & Hệ Thống Nhận Xét Nghiêm Khắc (Anti-Sugarcoating)
* **Nguyên tắc "Không tô hồng" (Zero Sugarcoating):**
  * Những học sinh bị đưa vào Phe Quỷ đã có những hành vi phá bĩnh, cố ý làm mất trật tự nghiêm trọng. Do đó, trong file báo cáo CSV xuất ra, **TUYỆT ĐỐI CẤM** áp dụng các câu khen ngợi tích cực sáo rỗng (*"Ngoan ngoãn", "Chăm chỉ", "Nhanh nhẹn", "Hoàn thành tốt"*...).
  * Dữ liệu phải phản ánh trung thực và khách quan hiện trạng hành vi để Giáo viên bộ môn có bằng chứng xác thực làm việc với GVCN và Phụ huynh học sinh.
* **Tách riêng Section Báo cáo trong File CSV:**
  Hệ thống tự động bổ sung một sheet/bảng độc lập ở cuối file CSV xuất ra:
  ```text
  "=== PHẦN 3: HỒ SƠ THEO DÕI HÀNH VI & KỶ LUẬT (PHE QUỶ) ==="
  "STT","Họ và Tên","Tổ Gốc","Điểm Cuối Tiết","Trạng Thái","Số Lần Phạt","Chép Vở","Đánh Giá TT27","Nhận Xét Kỷ Luật / SMAS"
  "1","Nguyễn Văn X","Tổ 2","850 Xu","Chưa hoàn lương","2","Chưa đủ","H","Còn vi phạm trật tự, chịu án phạt Tổ Quỷ; chưa hoàn thành việc chép bài vào vở, cần nhắc nhở."
  "2","Trần Văn Y","Tổ 1","600 Xu","Rớt sàn (<800 Xu)","3","Không chép","C","Cố ý gây mất trật tự và trả lời sai nhiều lần; tổng điểm dưới sàn 800 Xu, phạt chép phạt bài và cần GVCN chấn chỉnh."
  "3","Lê Văn Z","Tổ 4","1000 Xu","Đã Ân Xá Hoàn Lương","1","Đầy đủ","H","Ban đầu có vi phạm nhưng đã tiếp thu tốt, nghiêm túc chép bài và được ân xá về lại tổ cũ."
  ```
* **Ma trận Sinh Câu Nhận Xét Kỷ Luật Tự Động:**
  1. **Rớt dưới mốc sàn (< 800 Xu):** Đánh giá TT27 mức **C (Chưa hoàn thành)**. Nhận xét: *"Tổng điểm cuối tiết dưới mức sàn 800 Xu do vi phạm kỷ luật hoặc cố tình trả lời sai; chưa hoàn thành yêu cầu tiết học, phạt chép phạt bài học và cần gia đình phối hợp chấn chỉnh."*
  2. **Chưa được ân xá (Điểm 800 – 1000 Xu nhưng chưa hoàn lương):** Đánh giá TT27 mức **H (Hoàn thành)** hoặc **C**. Nhận xét: *"Chưa tập trung chú ý nghe giảng, còn hiện tượng nói chuyện riêng phải chịu chế độ Tổ Quỷ; chưa hoàn thành tốt việc ghi chép bài."*
  3. **Được ân xá hoàn lương:** Đánh giá TT27 mức **H (Hoàn thành)**. Nhận xét: *"Có vi phạm ban đầu nhưng đã kịp thời chấn chỉnh ý thức, ngồi im chép bài nghiêm túc và được ân xá trở về tổ."*

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
