# CẨM NANG QUY CHUẨN KỸ THUẬT & SƯ PHẠM TOÀN HỆ THỐNG (STANDARDS.md)
> **Dự án:** Slide bài giảng tương tác Tin học Tiểu học (Khối 1 - Khối 5)  
> **Phiên bản:** 2.0 (Chuẩn hóa toàn diện 2026-2027)  
> **Trạng thái:** Tài liệu sống (Living Document) — Sẵn sàng mở rộng và cập nhật theo yêu cầu của Giáo viên.

---

## 📑 MỤC LỤC
1. [Kiến trúc Tổng thể & Cấu trúc Thư mục](#1-kiến-trúc-tổng-thể--cấu-trúc-thư-mục)
2. [Bộ Quy tắc An toàn Tiết học & Chống Reload](#2-bộ-quy-tắc-an-toàn-tiết-học--chống-reload)
3. [Quy chuẩn Sư phạm: Nghi thức Đầu giờ & Ghi bài chặng](#3-quy-chuẩn-sư-phạm-nghi-thức-đầu-giờ--ghi-bài-chặng)
4. [Vòng đời Gọi tên (Turn Lifecycle) & Phân luồng Gacha](#4-vòng-đời-gọi-tên-turn-lifecycle--phân-luồng-gacha)
5. [Hệ thống Đo lường Hành vi (Telemetry) & Đánh giá TT27 / SMAS](#5-hệ-thống-đo-lường-hành-vi-telemetry--đánh-giá-tt27--smas)
6. [Hệ thống Báo cáo CSV Chuẩn UTF-8 BOM & Đồng bộ Drive](#6-hệ-thống-báo-cáo-csv-chuẩn-utf-8-bom--đồng-bộ-drive)
7. [Design System & Bản sắc Typography theo Khối](#7-design-system--bản-sắc-typography-theo-khối)
8. [Hệ thống Âm thanh Web Audio API (Offline Synthesizer)](#8-hệ-thống-âm-thanh-web-audio-api-offline-synthesizer)
9. [Cơ chế Lưu trữ Trạng thái LocalStorage](#9-cơ-chế-lưu-trữ-trạng-thái-localstorage)
10. [Giao thức Cập nhật Quy chuẩn (Living Document Protocol)](#10-giao-thức-cập-nhật-quy-chuẩn-living-document-protocol)

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

## 3. QUY CHUẨN SƯ PHẠM: NGHI THỨC ĐẦU GIỜ & GHI BÀI CHẶNG

### 3.1 Slide 1: Khung tiêu đề tối giản & Thứ ngày tháng Tiếng Việt tự động
Không nhồi nhét nội dung bài học hay bắt học sinh chép nhiều chữ ở Slide 1. Chỉ hiển thị **Khung Vở Ghi Bài** tối giản:
```html
<div class="notebook-paper">
    <div class="nb-date" id="current-date-line">Đang cập nhật ngày...</div>
    <div class="nb-subject">Tin học</div>
    <div class="nb-lesson">Bài X: [Tên Bài Học]</div>
</div>
```

Script cập nhật ngày tháng Tiếng Việt chuẩn thời gian thực:
```javascript
function updateVietnameseDate() {
    const now = new Date();
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const dayName = days[now.getDay()];
    const date = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    const dateEl = document.getElementById('current-date-line');
    if (dateEl) {
        dateEl.innerText = `${dayName}, ngày ${date} tháng ${month} năm ${year}`;
    }
}
updateVietnameseDate();
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
"Xếp hạng","Tên Tổ","Điểm số","Linh kiện","Danh hiệu"
"1","TỔ 1","120","4/4","Quán Quân"
"2","TỔ 3","110","3/4","Á Quân"

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
| **Khối 1** | `'Nunito', sans-serif` | Cam tươi `#f97316` | Vàng chanh, Xanh lá | Sân khấu chính + Mini Sidebar |
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

## 10. GIAO THỨC CẬP NHẬT QUY CHUẨN (LIVING DOCUMENT PROTOCOL)

* Cả hai tài liệu **`AGENTS.md`** và **`STANDARDS.md`** đều là **Tài liệu sống (Living Documents)**.
* Trong quá trình giảng dạy và phát triển bài giảng mới, khi Giáo viên phát hiện một quy tắc sư phạm mới, một mẹo hay hoặc muốn điều chỉnh bất kỳ thông số nào:
  1. Giáo viên chỉ cần đưa ra yêu cầu: *"Cập nhật vào quy chuẩn: [nội dung mới]..."*.
  2. AI Agent có nhiệm vụ ngay lập tức cập nhật, hiệu đính và bổ sung vào đúng các mục tương ứng trong cả `AGENTS.md` và `STANDARDS.md`.
  3. Mọi bài giảng được tạo sau thời điểm đó sẽ tự động tuân thủ theo phiên bản quy chuẩn mới nhất này.
