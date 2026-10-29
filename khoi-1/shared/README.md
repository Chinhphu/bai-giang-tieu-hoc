# 🌟 BỘ THƯ VIỆN DÙNG CHUNG KHỐI 1 (LỚP 1)
**Hệ thống EdTech Gamification Chuẩn Tiểu Học cho 35 Tiết Tin Học Lớp 1 (`tiet-01` đến `tiet-35`)**

---

## 🎯 1. QUY TẮC BẮT BUỘC (CRITICAL RULES)
1. **100% Giao Diện Tiếng Việt:** Không một từ tiếng Anh trên nút bấm, nhãn, thông báo. Nút bấm kèm Emoji trực quan, cỡ chữ cực lớn, font tròn trịa dễ đọc (`'Baloo 2'`, `'Nunito'`, `'Segoe UI'`).
2. **Chạy Offline 100%:**
   - Đồ họa vẽ bằng CSS3, SVG, HTML5 Canvas và Emoji.
   - Âm thanh tổng hợp hoàn toàn bằng **Web Audio API** (Nhạc nền 8-bit, vịt quạc "Quạc quạc", còi chiến thắng, còi báo lỗi, tiếng vỗ tay, pháo hoa).
   - Tự động fallback dữ liệu lớp học nếu mở qua giao thức `file://`.
3. **Chặn Phím F5 Của Học Sinh:**
   - Tự động chặn phím `F5`, `Ctrl+R`, `Ctrl+F5` với thông báo tiếng Việt: `"⚠️ Cấm bấm F5 tải lại trang!"`.
   - **Chỉ khi giáo viên giữ `Shift + F5` mới cho phép tải lại trang.**
   - Khóa menu chuột phải chống bấm nhầm (giáo viên dùng `Shift + Chuột phải`).

---

## 📂 2. CẤU TRÚC THƯ MỤC `khoi-1/shared/`

```text
khoi-1/shared/
├── style.css         # Hệ thống biến màu sắc, nút bấm 3D Neubrutalism, Sidebar (250px) + Sân khấu (calc(100vw - 250px))
├── gacha.js          # Hệ thống Popup Vòng quay Gacha 6 chế độ & Bộ âm thanh Web Audio API
├── components.js     # Quản lý danh sách lớp, localStorage, widget kiểm tra cầm chuột, xuất Excel SMAS
├── template.html     # Trang mẫu chuẩn để nhân bản cho các tiết từ 01 đến 35
└── README.md         # Hướng dẫn kiến trúc và sử dụng API
```

---

## 🎲 3. 6 CHẾ ĐỘ VÒNG QUAY GACHA GỌI TÊN (`gacha.js`)

1. **🦆 Bắt Vịt 3D (Cần cẩu gắp vịt):** Hồ nước với đàn vịt đeo bảng tên học sinh đang bơi lội, cần cẩu 3D hạ xuống kẹp vịt bay lên giữa màn hình kèm tiếng vịt kêu quạc quạc và pháo hoa.
2. **🏁 Đua Vịt Siêu Tốc:** 4-6 chú vịt mang tên học sinh chưa được gọi đua nước về đích, kèm bình luận tự động vui nhộn.
3. **🪢 Kéo Co Đại Chiến:** Hai đội thú kéo dây thừng kịch tính, nơ đỏ giằng co qua lại rồi bứt phá hiện tên học sinh chiến thắng.
4. **🥚 Đập Trứng Khủng Long:** 5 quả trứng sắc màu lắc lư, đập vỡ vỏ trứng bé khủng long ôm thẻ bài học sinh bước ra.
5. **🎡 Vòng Quay Cầu Vồng:** Vòng quay Canvas mượt mà kèm âm thanh "tạch tạch" khi kim chỉ lướt qua nan quạt.
6. **🎁 Mở Rương Kho Báu:** Rương vàng rung lắc phát sáng rồi bung nắp bắn ra thẻ bài vàng óng tên học sinh.

### 👥 Tính Năng Gọi Đôi (Tiết kiệm thời gian chuyển tiếp):
Khi Gacha dừng lại, hệ thống hiển thị cùng lúc:
- **👤 Đang thực hành: [Tên HS 1]**
- **⏳ Chuẩn bị kế tiếp: [Tên HS 2]**

### ⚡ 3 Nút Thao Tác Nhanh:
- `✅ Đã lên thực hành`: Ghi nhận hoàn thành, chuyển sang danh sách "Đã lên bảng", bạn kế tiếp tự động lên thay thế.
- `🚫 Mời về chỗ (Chưa để bút chì / Làm ồn)`: Còi buzzer cảnh báo, hủy lượt vì vi phạm kỷ luật phòng máy ("Đặt cây bút chì ngay ngắn mới được cầm chuột").
- `😷 Vắng mặt / Bỏ qua`: Bỏ qua tạm thời trong buổi học.

---

## 🖱️ 4. WIDGET KIỂM TRA TƯ THẾ CẦM CHUỘT 5 GIÂY (`components.js`)
- Hình vẽ SVG chuột máy tính cực lớn với chú giải màu sắc trực quan:
  - **Ngón trỏ = Nút trái (Màu đỏ):** Bấm chọn, nháy đúp.
  - **Ngón giữa = Nút phải (Màu xanh):** Bấm chuột phải, mở menu.
  - **Lắc nhẹ bằng cổ tay:** Mũi tên cong minh họa thả lỏng cổ tay.
- Giáo viên chấm nhanh bằng 2 nút:
  - `👍 Cầm chuột ĐÚNG (+Điểm)`
  - `⚠️ Cầm chuột còn gồng/sai (Nhắc nhở)`
- Tự động lưu vào lịch sử đánh giá Thông tư 27 của học sinh.

---

## 📊 5. XUẤT FILE EXCEL CUỐI TIẾT (`SMAS_TinHoc1_Lop_1_6.xlsx`)
- Tích hợp SheetJS tự động xuất bảng điểm chuẩn SMAS.
- Cột thông tin: STT, Mã học sinh, Họ và tên, Lớp, Trạng thái thực hành, Kỹ năng cầm chuột, Kỹ năng thao tác chuột, Kỷ luật phòng học, Xếp loại TT27 (T/H/C), Nhận xét tự động chuẩn Thông tư 27.
- Fallback tự động xuất CSV UTF-8 có BOM nếu chạy offline không có mạng.

---

## 🚀 6. HƯỚNG DẪN TẠO TIẾT MỚI (VÍ DỤ `khoi-1/tiet-02/index.html`)

Chỉ cần nhúng 3 file dùng chung:
```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Tin học 1 - Tiết 02</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
  <link rel="stylesheet" href="../shared/style.css">
  <script src="../shared/gacha.js"></script>
  <script src="../shared/components.js"></script>
</head>
<body>
  <div class="k1-layout">
    <!-- Sidebar tự động nạp lớp 1_6 -->
    <khoi1-sidebar default-class="1_6"></khoi1-sidebar>

    <!-- Sân khấu chính của bài học -->
    <main class="k1-stage">
      <header class="k1-stage-header">
        <h1 class="k1-lesson-title">🖱️ NỘI DUNG TIẾT HỌC</h1>
      </header>
      <!-- Nội dung bài học của bạn -->
    </main>
  </div>
</body>
</html>
```

