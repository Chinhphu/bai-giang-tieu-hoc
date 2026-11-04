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
12. [Hệ thống Tính Năng Ẩn: Cơ Chế "Phe Quỷ" / "Đấu Trường Ma Vương" (Demon Faction & Anti-Griefing Mechanism)](#12-hệ-thống-tính-năng-ẩn-cơ-chế-phe-quỷ--đấu-trường-ma-vương-demon-faction--anti-griefing-mechanism)
13. [Giao thức Cập nhật Quy chuẩn (Living Document Protocol)](#13-giao-thức-cập-nhật-quy-chuẩn-living-document-protocol)

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

## 12. HỆ THỐNG TÍNH NĂNG ẨN: CƠ CHẾ "PHE QUỶ" / "ĐẤU TRƯỜNG MA VƯƠNG" (DEMON FACTION & ANTI-GRIEFING MECHANISM)

### 12.1 Bối cảnh Sư phạm & Triết lý Thiết kế
* **Nỗi đau thực tế trong lớp học (Hiện tượng "Griefing / Trolling"):**
  * Trong các hoạt động thi đua theo tổ, ở các lớp cá biệt (đặc biệt lứa tuổi Khối 4, Khối 5 bước vào giai đoạn tiền dậy thì), thường có 1 hoặc vài học sinh có tâm lý chống đối hoặc mặc cảm tự ti.
  * Các em này thường tìm kiếm sự chú ý tiêu cực (*Negative Attention*) bằng cách: cố tình phá bĩnh, nói leo, làm ồn hoặc cố tình chọn đáp án sai bét nhè để "kéo cả tổ chết chùm".
  * Hậu quả: Các bạn cùng tổ bức xúc, cãi vã, đổ lỗi và cô lập bạn; không khí lớp học trở nên căng thẳng, mất trật tự và giáo viên tốn nhiều thời gian xử lý tranh chấp.
* **Giải pháp "Tâm lý Nghịch đảo" (Reverse Psychology & Peer-Policing):**
  * Thay vì trách phạt nặng nề hay dán nhãn tiêu cực công khai, hệ thống thiết kế cơ chế **"Phe Quỷ" / "Đấu Trường Ma Vương"** dưới dạng một tính năng game hóa thú vị.
  * Đánh trúng tâm lý **háo thắng, sĩ diện, thích làm tâm điểm** của tuổi mới lớn: Gom các cá nhân chống đối vào một phe riêng biệt để các em tự cạnh tranh sinh tồn và **tự kiềm chế, kiểm soát lẫn nhau** (*Quỷ kiểm soát Quỷ*).

### 12.2 Cơ chế Cách ly & Cạnh tranh Sinh tồn (Zero-Sum Cannibalism: "Quỷ ăn thịt Quỷ")
* **Trục xuất và bảo vệ Loài Người:**
  * Học sinh quậy phá bị chuyển ra khỏi tổ gốc, đưa vào danh sách **"Phe Quỷ" (Tổ Ma Vương)**.
  * Các tổ bình thường (Loài Người: Tổ 1, 2, 3, 4...) ngay lập tức được giải tỏa áp lực, không còn lo bị bạn kéo tụt điểm số.
* **Bảng điểm Cá nhân Độc lập:**
  * Khác với các tổ Loài Người (điểm số là tài sản chung của tổ), Phe Quỷ là **tập hợp của các cá nhân độc lập**. Mỗi con Quỷ có một thanh điểm riêng (bắt đầu sàn `1000đ`).
* **Quy luật Trả lời Đúng (Hút điểm sinh tồn):**
  * Trả lời đúng **KHÔNG** được hệ thống tự in thêm điểm.
  * Số điểm thưởng (+100đ) sẽ được **trực tiếp rút/hút từ quỹ điểm của những con Quỷ còn lại** chia đều (Zero-Sum). Càng trả lời đúng nhiều, con Quỷ đó càng trở nên hùng mạnh trên nỗi đau của các đồng bọn.
* **Quy luật Vi phạm & Phạt trật tự (Tịch thu & Chia đều):**
  * Nếu một con Quỷ làm ồn, vi phạm kỷ luật, không chép bài hoặc cố ý trả lời sai: Giáo viên bấm phạt `-100đ`.
  * Số điểm bị phạt này **ngay lập tức được chia đều cho những con Quỷ còn lại** trong Phe Quỷ.
  * *Tác động sư phạm thần kỳ:* Khi bạn mình làm sai mà mình được điểm hời, các con Quỷ khác sẽ lập tức gây áp lực đồng đẳng (*Peer Pressure*), tự giác nhắc nhở và quản thúc bạn: *"Ngồi yên chép bài đi, đừng làm trò lố nữa!"*. Giáo viên không cần tốn lời la mắng.

### 12.3 Vòng Xoay Lượt Chơi & Gacha Bắt Buộc (Turn Rotation & Enforced Gacha)
* **Xếp lượt ngang hàng:**
  * Tổ Ma Vương được xếp như một tổ thi đấu ngang hàng trong vòng quay câu hỏi:
    $$\text{Tổ 1} \longrightarrow \text{Tổ 2} \longrightarrow \text{Tổ 3} \longrightarrow \text{Tổ 4} \longrightarrow \mathbf{\text{Tổ Ma Vương (Phe Quỷ)}} \longrightarrow \dots$$
* **CẤM Giơ tay tự do ở Lượt Quỷ:**
  * Ở lượt của Phe Quỷ, giao diện đổi sang tông màu tím huyền bí (hoặc đỏ thẫm).
  * Hệ thống khóa quyền xung phong tự do để triệt tiêu tình trạng lẩn trốn hoặc tranh giành ồn ào.
  * Giáo viên bắt buộc bấm nút `🎲 Gacha Quỷ Vương` để hệ thống tự động bốc ngẫu nhiên một con Quỷ trong danh sách lên sàn đấu.

### 12.4 Xử Lý Trường Hợp Lớp Chỉ Có 1 Con Quỷ (Độc Hành Ma Thần)
Khi một lớp chỉ có duy nhất 1 học sinh cá biệt bị đưa vào Phe Quỷ:
* **Cơ chế "Boss Hư Vô":** Khi trả lời đúng, em hút điểm từ "Hệ thống AI / Boss Ảo" (khởi tạo 1000đ).
* **Quỹ Cứu Trợ Loài Người:** Nếu em vi phạm hoặc trả lời sai, toàn bộ số điểm bị trừ sẽ biến thành **"Quỹ Cứu Trợ"** chuyển thẳng cho tổ Loài Người có điểm số thấp nhất.
* *Tác động:* Em cá biệt sẽ không dám cố tình quậy phá, vì hành vi phá hoại lúc này trực tiếp biến mình thành "người biếu quà" cho chính những tổ mà mình đang đối đầu.

### 12.5 Ngai Vàng Quỷ Vương & Điều Kiện Tiên Quyết (100% Chép Bài)
* **Đăng quang Quỷ Vương:**
  * Cuối tiết học, con Quỷ tích lũy được số điểm cá nhân cao nhất sẽ được hệ thống xướng tên đăng quang **"Quỷ Vương Tiết Học"** 👑😈.
* **Đặc quyền Tối Thượng:**
  * Được quyền lên bục giảng đứng cạnh Giáo viên, cầm chuột và bấm điều khiển slide máy chiếu trong toàn bộ tiết học tuần kế tiếp (thỏa mãn mong muốn được chú ý và khẳng định bản thân trước cả lớp).
* **Điều kiện Tiên quyết Khắt khe (The Iron Rule):**
  * Quỷ Vương chỉ chính thức được cầm máy nếu **Vở ghi bài được Giáo viên kiểm tra và đạt 100% đầy đủ nội dung bài học**.
  * Nếu thiếu dù chỉ 1 dòng ghi nhớ $\longrightarrow$ Tước vương miện ngay đầu giờ, chuyển quyền cho Quỷ xếp thứ hai hoặc hủy bỏ. Điều này ép các em cá biệt dù ngang bướng đến đâu cũng phải nghiêm túc hạ bút chép bài.

### 12.6 Trừng Phạt "Túi Kinh Nghiệm" (Loot Goblin) & Giáng Cấp Slime Câm Lặng
* **Hành vi Vi phạm khi cầm máy:**
  * Nếu Quỷ Vương được trao quyền cầm máy mà thao tác lóng ngóng, bấm linh tinh, quản trò lôm côm hoặc cố tình phá hoại tiết dạy:
* **Kích hoạt Đòn Phản Phệ:**
  * Giáo viên bấm nút bí mật `💥 Phản Phệ Ma Vương!`.
  * **Nổ điểm (Loot Goblin Explosion):** Toàn bộ điểm số tích lũy của Quỷ Vương phát nổ tung toé trên màn hình (hiệu ứng nổ + âm thanh sấm sét), trở thành "mỏ điểm" chia đều cho 4 tổ Loài Người ăn mừng.
  * **Giáng cấp thành Slime:** Quỷ Vương bị giáng thẳng xuống danh hiệu **"Slime Xanh Nhầy Nhụa" (Green Slime)**.
  * **Hiệu ứng Câm Lặng (Silence Curse):** Giao diện khóa avatar với biểu tượng chiếc khóa mồm `🔇 Câm Lặng`: Tước mọi quyền phát biểu, hủy tư cách Quỷ Vương và trục xuất vĩnh viễn khỏi bàn giáo viên trong tiết học đó.

### 12.7 Con Đường Hoàn Lương / Thanh Tẩy (Redemption & Purification)
* **Ý nghĩa Nhân văn:** Không bao giờ dán nhãn tiêu cực vĩnh viễn cho học sinh tiểu học. Mọi lỗi lầm đều phải có con đường phục thiện để quay về.
* **Nghi thức Thanh Tẩy:**
  * Nếu một con Quỷ hoàn thành xuất sắc vai trò Quỷ Vương (quản trò nghiêm túc, vở sạch chữ đẹp) HOẶC đạt chuỗi 3 tiết học liên tiếp không bị trừ điểm kỷ luật:
  * Giáo viên trao quyền lựa chọn:
    1. Tiếp tục giữ Ngai Vàng để dẫn dắt Phe Quỷ.
    2. Kích hoạt **"Thanh Tẩy / Chuyển Sinh Làm Người"**: Trở về tổ cũ với danh hiệu **"Hiệp Sĩ Hoàn Lương"**, mang theo 200 điểm tài trợ tặng lại cho tổ cũ trong tiếng vỗ tay chào đón của cả lớp.

### 12.8 Kiến Trúc Kỹ Thuật & Phương Thức Kích Hoạt Ẩn
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

### 12.9 Báo Cáo CSV Riêng Biệt & Hệ Thống Nhận Xét Nghiêm Khắc (Anti-Sugarcoating)
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
  3. **Quỷ Vương nhưng không chép đủ bài:**
     * Đánh giá TT27: **H (Hoàn thành)**.
     * Nhận xét: *"Có tiến bộ về mặt kiến thức và điểm số nhưng chưa rèn được tính cẩn thận; chưa chép bài đầy đủ vào vở theo yêu cầu của giáo viên."*
  4. **Có biểu hiện cố ý trả lời sai để phá bĩnh:**
     * Đánh giá TT27: **C (Chưa hoàn thành)**.
     * Nhận xét: *"Thái độ học tập chưa nghiêm túc, có biểu hiện cố tình chọn sai đáp án gây mất đoàn kết nội bộ tổ; cần rèn luyện tinh thần tập thể."*

---

## 13. GIAO THỨC CẬP NHẬT QUY CHUẨN (LIVING DOCUMENT PROTOCOL)

* Cả hai tài liệu **`AGENTS.md`** và **`STANDARDS.md`** đều là **Tài liệu sống (Living Documents)**.
* Trong quá trình giảng dạy và phát triển bài giảng mới, khi Giáo viên phát hiện một quy tắc sư phạm mới, một mẹo hay hoặc muốn điều chỉnh bất kỳ thông số nào:
  1. Giáo viên chỉ cần đưa ra yêu cầu: *"Cập nhật vào quy chuẩn: [nội dung mới]..."*.
  2. AI Agent có nhiệm vụ ngay lập tức cập nhật, hiệu đính và bổ sung vào đúng các mục tương ứng trong cả `AGENTS.md` và `STANDARDS.md`.
  3. Mọi bài giảng được tạo sau thời điểm đó sẽ tự động tuân thủ theo phiên bản quy chuẩn mới nhất này.
