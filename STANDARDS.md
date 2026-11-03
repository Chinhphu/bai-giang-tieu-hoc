# CẨM NANG QUY CHUẨN KỸ THUẬT & SƯ PHẠM TOÀN HỆ THỐNG (STANDARDS.md)
> **Dự án:** Slide bài giảng tương tác Tin học Tiểu học (Khối 1 - Khối 5)  
> **Phiên bản:** 2.0 (Chuẩn hóa toàn diện 2026-2027)  
> **Trạng thái:** Tài liệu sống (Living Document) — Sẵn sàng mở rộng và cập nhật theo yêu cầu của Giáo viên.

---

## 📑 MỤC LỤC
1. [Kiến trúc Tổng thể & Cấu trúc Thư mục](#1-kiến-trúc-tổng-thể--cấu-trúc-thư-mục)
2. [Bộ Quy tắc An toàn Tiết học & Chống Reload](#2-bộ-quy-tắc-an-toàn-tiết-học--chống-reload)
3. [Quy chuẩn Sư phạm: Trang Ghi bài vào vở, Ghi bài chặng & Chốt kiến thức cuối tiết](#3-quy-chuẩn-sư-phạm-trang-ghi-bài-vào-vở-ghi-bài-chặng--chốt-kiến-thức-cuối-tiết)
4. [Vòng đời Gọi tên (Turn Lifecycle) & Phân luồng Gacha](#4-vòng-đời-gọi-tên-turn-lifecycle--phân-luồng-gacha)
5. [Hệ thống Đo lường Hành vi (Telemetry) & Đánh giá TT27 / SMAS](#5-hệ-thống-đo-lường-hành-vi-telemetry--đánh-giá-tt27--smas)
6. [Hệ thống Báo cáo CSV Chuẩn UTF-8 BOM & Đồng bộ Drive](#6-hệ-thống-báo-cáo-csv-chuẩn-utf-8-bom--đồng-bộ-drive)
7. [Design System & Bản sắc Typography theo Khối](#7-design-system--bản-sắc-typography-theo-khối)
8. [Hệ thống Âm thanh Web Audio API (Offline Synthesizer)](#8-hệ-thống-âm-thanh-web-audio-api-offline-synthesizer)
9. [Cơ chế Lưu trữ Trạng thái LocalStorage](#9-cơ-chế-lưu-trữ-trạng-thái-localstorage)
10. [Hệ thống Điểm Khởi Đầu 1000đ & Cơ Chế Xếp Rank Đồng Hạng (Tie-Ranking)](#10-hệ-thống-điểm-khởi-đầu-1000đ--cơ-chế-xếp-rank-đồng-hạng-tie-ranking)
11. [Hệ thống Quản lý Quests & Câu hỏi Tách rời File JSON](#11-hệ-thống-quản-lý-quests--câu-hỏi-tách-rời-file-json)
12. [Giao thức Cập nhật Quy chuẩn (Living Document Protocol)](#12-giao-thức-cập-nhật-quy-chuẩn-living-document-protocol)

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

## 3. QUY CHUẨN SƯ PHẠM: TRANG GHI BÀI VÀO VỞ, GHI BÀI CHẶNG & CHỐT KIẾN THỨC CUỐI TIẾT

### 3.1 Trang Ghi bài vào vở (Notebook Writing Slide / Đầu giờ)
Học sinh tiểu học cần nhìn rõ từ khoảng cách xa (8–10m cuối lớp) để hạ bút chép đúng tựa bài và kiến thức vào vở:
* **Nền trắng tinh khiết (`#ffffff`):**
  * TUYỆT ĐỐI CẤM trang trí rườm rà (không kẻ hoa văn, không kẻ ô ly gây rối mắt khi chiếu máy chiếu mờ, không đổ bóng lòe loẹt).
  * Chữ có thể tô màu phân cấp nổi bật trên nền trắng (Thứ ngày: xám/xanh dịu, Môn học: xanh dương đậm, Tên bài: đỏ/cam nổi bật).
* **Typography Siêu To (Super-sized Typography):**
  * Thứ ngày tháng: `28px` – `34px` (đậm `700`).
  * Tên môn học: `36px` – `44px` (đậm `900`, in hoa).
  * Tựa đề bài học: `50px` – `64px` (đậm `900`, in hoa).
  * Dòng ghi nhớ/tóm tắt: `30px` – `38px` (đậm `800`, giãn dòng `1.6`).
* **BẮT BUỘC có nút Chế độ Toàn Màn Hình (Fullscreen Toggle):**
  * Nút bấm to rõ: `⛶ Chế độ toàn màn hình chép bài`.
  * Khi giáo viên bấm nút: Khung ghi bài phóng to chiếm trọn 100% màn hình TV (`100vw x 100vh`), ẩn hoàn toàn sidebar và các thanh điều khiển xung quanh.
  * Có nút `✖ Thu nhỏ (Esc)` ở góc trên bên phải và hỗ trợ phím `Esc` để thoát chế độ toàn màn hình.

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
    if (btn) btn.innerHTML = isFs ? '✖ Thu nhỏ (Esc)' : '⛶ Chế độ toàn màn hình chép bài';
    
    if (isFs && target.requestFullscreen) target.requestFullscreen().catch(() => {});
    else if (!isFs && document.fullscreenElement) document.exitFullscreen().catch(() => {});
}
```

### 3.2 Quy tắc "Ghi bài xé nhỏ" (Progressive Chunking)
* Học sinh tiểu học sẽ rất chán nản nếu bắt chép một đoạn văn dài.
* Sau mỗi phần hoạt động/khám phá kiến thức mới, chỉ xuất hiện **1 thẻ ghi nhớ nhỏ** (`.memo-card`):
```html
<div class="memo-card">
    <div class="memo-badge">✍️ Em ghi nhớ:</div>
    <p class="memo-text">
        Phím <b>Space (phím Cách)</b> là phím dài nhất trên bàn phím, dùng để tạo khoảng cách giữa các từ.
    </p>
</div>
```
* Giáo viên cho học sinh thực hành/thảo luận xong mới bấm hiển thị thẻ này, các em hạ bút viết đúng 1-2 dòng vào vở rồi chuyển hoạt động.

### 3.3 Màn Hình Chốt Kiến Thức / Ghi Nhớ Cuối Tiết (Trước Bảng Vinh Danh)
* **Vị trí bắt buộc:** Liền trước slide Bảng vàng vinh danh (Slide kế cuối).
* **Mục đích:** Giúp giáo viên chốt lại toàn bộ các ý trọng tâm trước khi chuyển sang phần tổng kết điểm số và trao thưởng.
* **Nguyên tắc thiết kế:**
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

## 9. CƠ CHẾ LƯU TRỮ TRẠNG THÁI LOCALSTORAGE

### 9.1 Quy ước cấu trúc Key
Mọi dữ liệu lưu phiên làm việc trên trình duyệt bắt buộc phải có tiền tố định danh đầy đủ:
```text
bgtieu_hoc_k{Khoi}_tiet_{Tiet}_{Lop}_state
```
*Ví dụ:* `bgtieu_hoc_k2_tiet_09_2-2_state`, `bgtieu_hoc_k3_tiet_06_3-1_state`.

### 9.2 Schema dữ liệu lưu trữ
```json
{
  "grade": "2",
  "lesson": "09",
  "classId": "2_2",
  "updatedAt": "2026-11-03T16:30:00.000Z",
  "playedStudents": ["Nguyễn Văn A", "Trần Thị B"],
  "remainingStudents": ["Lê Văn C", "Phạm Thị D"],
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

### 9.3 Nút xóa dữ liệu đã lưu
* Mọi bài học/mini-game có lưu dữ liệu vào `localStorage` hoặc `sessionStorage` phải cung cấp nút **Xóa dữ liệu đã lưu** cho giáo viên.
* Nút cần dễ tìm, có xác nhận trước khi xóa và thông báo rõ khi hoàn tất; giao diện phải đồng bộ lại với trạng thái sau khi xóa.
* Chỉ xóa các key thuộc bài học/mini-game hiện tại. Tuyệt đối không dùng `localStorage.clear()` hay `sessionStorage.clear()` vì có thể xóa dữ liệu của bài khác.
* Với lưu tự động, nên chỉ rõ cho giáo viên biết trạng thái đang được lưu; sau khi xóa, dữ liệu mới chỉ được tạo lại theo thao tác tiếp theo của người dùng.

---

## 10. HỆ THỐNG ĐIỂM KHỞI ĐẦU (1000Đ) & CƠ CHẾ XẾP RANK ĐỒNG HẠNG (TIE-RANKING)

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

## 12. GIAO THỨC CẬP NHẬT QUY CHUẨN (LIVING DOCUMENT PROTOCOL)

* Cả hai tài liệu **`AGENTS.md`** và **`STANDARDS.md`** đều là **Tài liệu sống (Living Documents)**.
* Trong quá trình giảng dạy và phát triển bài giảng mới, khi Giáo viên phát hiện một quy tắc sư phạm mới, một mẹo hay hoặc muốn điều chỉnh bất kỳ thông số nào:
  1. Giáo viên chỉ cần đưa ra yêu cầu: *"Cập nhật vào quy chuẩn: [nội dung mới]..."*.
  2. AI Agent có nhiệm vụ ngay lập tức cập nhật, hiệu đính và bổ sung vào đúng các mục tương ứng trong cả `AGENTS.md` và `STANDARDS.md`.
  3. Mọi bài giảng được tạo sau thời điểm đó sẽ tự động tuân thủ theo phiên bản quy chuẩn mới nhất này.
