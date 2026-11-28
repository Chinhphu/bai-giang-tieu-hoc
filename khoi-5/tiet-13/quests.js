/**
 * Ngân hàng dữ liệu Tiết 13 Khối 5: Bài 7 - Thực hành soạn thảo văn bản (Tiết 1)
 * Nguồn dữ liệu duy nhất (Single Source of Truth) cho toàn bộ tiết học.
 * Chạy 100% Offline-first.
 */
window.QUESTS_DATA = {
  warmup: {
    id: "w1",
    badge: "📖 GÓC SÁNG TẠO • KHỞI ĐỘNG 5 PHÚT",
    title: "Bài thơ “Trẻ em hôm nay thế giới ngày mai” gặp sự cố trình bày",
    prompt: "Các bạn nhỏ muốn định dạng lại bài thơ/bài hát cho đẹp và sửa các đoạn đặt nhầm vị trí. Cần dùng những thao tác nào trong Word?",
    answer: "Cần sử dụng thành thạo thao tác chọn (bôi đen) văn bản, xóa phần thừa, sao chép (Copy – Paste) đoạn lặp và di chuyển (Cut – Paste) đoạn sai vị trí, sau đó định dạng phông, cỡ, kiểu và màu chữ."
  },
  editorChallenges: [
    {
      id: "ed1",
      badge: "THỬ THÁCH 1 • CHỌN & ĐỊNH DẠNG TIÊU ĐỀ",
      title: "Tiêu đề “TRẺ EM HÔM NAY THẾ GIỚI NGÀY MAI” đang bị chữ nhỏ và nhạt màu.",
      beforeLines: [
        { text: "Trẻ em hôm nay thế giới ngày mai", style: "color:#475569;font-size:1rem;" },
        { text: "Nhạc: Lê Mây — Lời thơ: Phùng Ngọc Hùng", style: "color:#64748b;font-style:italic;" },
        { text: "Trẻ em hôm nay, thế giới ngày mai...", style: "color:#0f172a;" }
      ],
      afterLines: [
        { text: "TRẺ EM HÔM NAY THẾ GIỚI NGÀY MAI", style: "color:#dc2626;font-size:1.35rem;font-weight:900;" },
        { text: "Nhạc: Lê Mây — Lời thơ: Phùng Ngọc Hùng", style: "color:#2563eb;font-style:italic;font-weight:700;" },
        { text: "Trẻ em hôm nay, thế giới ngày mai...", style: "color:#0f172a;" }
      ],
      question: "Bước ĐẦU TIÊN bắt buộc phải làm trước khi đổi cỡ chữ, in đậm và tô màu đỏ cho tiêu đề là gì?",
      options: [
        { id: "A", text: "🖱️ Chọn (bôi đen) toàn bộ dòng tiêu đề rồi mới bấm nút định dạng" },
        { id: "B", text: "💾 Bấm Save lưu tệp luôn" },
        { id: "C", text: "⌫ Nhấn phím Backspace để xóa tiêu đề" }
      ],
      correctId: "A",
      points: 100,
      explain: "Luôn phải CHỌN (bôi đen) phần văn bản cần chỉnh trước, các nút định dạng mới có tác dụng!"
    },
    {
      id: "ed2",
      badge: "THỬ THÁCH 2 • CHỌN & XÓA DÒNG THỪA",
      title: "Trong lúc gõ nhanh, bạn gõ dư một dòng bị lỗi chính tả ở giữa khổ thơ.",
      beforeLines: [
        { text: "Đó là vần thơ, cũng là câu hát.", style: "color:#0f172a;" },
        { text: "Đo la van tho sai chinh ta bi du...", style: "color:#dc2626;background:#fee2e2;padding:2px 6px;border-radius:6px;" },
        { text: "Trẻ em hôm nay, thế giới ngày mai.", style: "color:#0f172a;" }
      ],
      afterLines: [
        { text: "Đó là vần thơ, cũng là câu hát.", style: "color:#0f172a;" },
        { text: "Trẻ em hôm nay, thế giới ngày mai.", style: "color:#16a34a;font-weight:800;" }
      ],
      question: "Để xóa bỏ nhanh cả dòng gõ lỗi màu đỏ kia, thao tác nào chuẩn và nhanh nhất?",
      options: [
        { id: "A", text: "📋 Chọn dòng lỗi → Bấm Copy (Ctrl + C)" },
        { id: "B", text: "⌫ Chọn (bôi đen) dòng lỗi → Nhấn phím Delete hoặc Backspace" },
        { id: "C", text: "🎨 Đổi màu chữ dòng đó thành màu trắng" }
      ],
      correctId: "B",
      points: 100,
      explain: "Bôi đen cả dòng lỗi rồi nhấn Delete (hoặc Backspace) sẽ xóa sạch ngay đoạn thừa chỉ trong 1 lần bấm!"
    },
    {
      id: "ed3",
      badge: "THỬ THÁCH 3 • SAO CHÉP ĐOẠN ĐỆP (COPY – PASTE)",
      title: "Câu điệp khúc “Trẻ em hôm nay. Thế giới ngày mai.” lặp lại ở cuối bài, em không muốn gõ lại từ đầu.",
      beforeLines: [
        { text: "(1) Trẻ em hôm nay. Thế giới ngày mai.", style: "color:#2563eb;font-weight:800;" },
        { text: "... Xin được nhắc ngàn lần hơn thế ...", style: "color:#0f172a;" },
        { text: "(Cuối bài: Đang bị thiếu câu điệp khúc)", style: "color:#94a3b8;font-style:italic;" }
      ],
      afterLines: [
        { text: "(1) Trẻ em hôm nay. Thế giới ngày mai.", style: "color:#2563eb;font-weight:800;" },
        { text: "... Xin được nhắc ngàn lần hơn thế ...", style: "color:#0f172a;" },
        { text: "Trẻ em hôm nay. Thế giới ngày mai.", style: "color:#16a34a;font-weight:800;" }
      ],
      question: "Em dùng bộ lệnh nào để nhân bản câu điệp khúc xuống cuối bài mà vẫn giữ nguyên bản gốc ở trên?",
      options: [
        { id: "A", text: "✂️ Chọn câu → Cut (Ctrl + X) → Paste (Ctrl + V)" },
        { id: "B", text: "📋 Chọn câu → Copy (Ctrl + C) → Đặt con trỏ cuối bài → Paste (Ctrl + V)" },
        { id: "C", text: "⌫ Chọn câu → Delete" }
      ],
      correctId: "B",
      points: 100,
      explain: "Sao chép (Copy: Ctrl + C rồi Paste: Ctrl + V) giúp tạo thêm bản sao ở vị trí mới mà vẫn giữ nguyên đoạn gốc!"
    },
    {
      id: "ed4",
      badge: "THỬ THÁCH 4 • DI CHUYỂN ĐOẠN (CUT – PASTE)",
      title: "Tên tác giả “Nhạc: Lê Mây – Lời thơ: Phùng Ngọc Hùng” đang bị đặt nhầm xuống cuối bài thay vì ngay dưới tiêu đề.",
      beforeLines: [
        { text: "TRẺ EM HÔM NAY THẾ GIỚI NGÀY MAI", style: "color:#dc2626;font-weight:900;" },
        { text: "Trẻ em hôm nay, thế giới ngày mai...", style: "color:#0f172a;" },
        { text: "Nhạc: Lê Mây — Lời thơ: Phùng Ngọc Hùng", style: "color:#ea580c;background:#ffedd5;padding:2px 6px;border-radius:6px;font-style:italic;" }
      ],
      afterLines: [
        { text: "TRẺ EM HÔM NAY THẾ GIỚI NGÀY MAI", style: "color:#dc2626;font-weight:900;" },
        { text: "Nhạc: Lê Mây — Lời thơ: Phùng Ngọc Hùng", style: "color:#16a34a;font-style:italic;font-weight:800;" },
        { text: "Trẻ em hôm nay, thế giới ngày mai...", style: "color:#0f172a;" }
      ],
      question: "Để chuyển hẳn 2 dòng tác giả từ cuối bài lên ngay dưới tiêu đề (không bị lặp 2 lần), em dùng thao tác nào?",
      options: [
        { id: "A", text: "✂️ Chọn đoạn → Cut (Ctrl + X) → Đặt con trỏ dưới tiêu đề → Paste (Ctrl + V)" },
        { id: "B", text: "📋 Chọn đoạn → Copy (Ctrl + C) → Paste (Ctrl + V)" },
        { id: "C", text: "↩️ Nhấn phím Enter 10 lần" }
      ],
      correctId: "A",
      points: 100,
      explain: "Di chuyển dùng Cut (Ctrl + X) rồi Paste (Ctrl + V) — hoặc kéo thả chuột — để dời văn bản sang vị trí mới mà không để lại bản cũ."
    }
  ],
  luckyWheelQuestions: [
    {
      id: "lq1",
      question: "Câu 1: Để thay đổi phông chữ của tiêu đề, em cần làm gì trước?",
      options: [
        "A. Chọn (bôi đen) tiêu đề cần định dạng",
        "B. Giảm cỡ chữ",
        "C. Lưu văn bản",
        "D. Xóa tiêu đề"
      ],
      correctIdx: 0,
      points: 100,
      explain: "Luôn chọn (bôi đen) phần văn bản trước khi áp dụng định dạng!"
    },
    {
      id: "lq2",
      question: "Câu 2: Muốn làm tiêu đề nổi bật hơn, em nên sử dụng những định dạng nào?",
      options: [
        "A. Giảm cỡ chữ",
        "B. In đậm và tăng cỡ chữ",
        "C. Xóa tiêu đề",
        "D. Chỉ đổi màu nền"
      ],
      correctIdx: 1,
      points: 100,
      explain: "In đậm (Bold) kết hợp tăng cỡ chữ giúp tiêu đề nổi bật rõ ràng."
    },
    {
      id: "lq3",
      question: "Câu 3: Để đổi màu chữ trong phần mềm soạn thảo văn bản, em chọn nút lệnh nào?",
      options: [
        "A. Màu chữ (Font Color)",
        "B. Chèn ảnh",
        "C. Lưu tệp",
        "D. In văn bản"
      ],
      correctIdx: 0,
      points: 100,
      explain: "Nút Font Color (chữ A có gạch màu bên dưới) dùng để đổi màu chữ."
    },
    {
      id: "lq4",
      question: "Câu 4: Để thay đổi cỡ chữ, em sử dụng công cụ nào?",
      options: [
        "A. Màu nền",
        "B. Chèn bảng",
        "C. Cỡ chữ (Font Size)",
        "D. Kiểm tra chính tả"
      ],
      correctIdx: 2,
      points: 100,
      explain: "Ô số Font Size trong nhóm lệnh Font giúp tăng hoặc giảm cỡ chữ."
    },
    {
      id: "lq5",
      question: "Câu 5: Sau khi hoàn thành việc chỉnh sửa và định dạng văn bản, em nên làm gì?",
      options: [
        "A. Xóa văn bản",
        "B. Kiểm tra lại văn bản rồi lưu tệp",
        "C. Đổi tên máy tính",
        "D. Tắt máy tính ngay"
      ],
      correctIdx: 1,
      points: 100,
      explain: "Kiểm tra lại lỗi chính tả, bố cục rồi bấm Save để không mất bài thực hành!"
    },
    {
      id: "lq6",
      question: "Câu 6: Khác nhau giữa Sao chép (Copy) và Di chuyển (Cut) một đoạn văn bản là gì?",
      options: [
        "A. Copy giữ lại đoạn gốc, còn Cut chuyển hẳn đoạn gốc sang vị trí mới",
        "B. Copy và Cut đều xóa mất văn bản",
        "C. Cut tạo ra 2 đoạn giống nhau",
        "D. Copy chỉ dùng cho hình ảnh"
      ],
      correctIdx: 0,
      points: 100,
      explain: "Copy (Ctrl + C) tạo bản sao giữ nguyên bản gốc; Cut (Ctrl + X) dời đoạn gốc sang vị trí mới."
    }
  ],
  summaryCards: [
    {
      badge: "BƯỚC 1 • CHỌN & XÓA",
      color: "#16b89a",
      bg: "#ecfdf5",
      title: "Bôi đen trước khi xử lý",
      desc: "Luôn <b>chọn (bôi đen)</b> đoạn văn bản trước khi nhấn Delete/Backspace để xóa hoặc trước khi định dạng."
    },
    {
      badge: "BƯỚC 2 • COPY & CUT",
      color: "#2563eb",
      bg: "#eff6ff",
      title: "Sao chép & Di chuyển nhanh",
      desc: "<b>Sao chép (Ctrl + C → Ctrl + V)</b> để nhân bản đoạn lặp; <b>Di chuyển (Ctrl + X → Ctrl + V)</b> để dời đoạn sang chỗ đúng."
    },
    {
      badge: "BƯỚC 3 • ĐỊNH DẠNG & LƯU",
      color: "#d97706",
      bg: "#fffbeb",
      title: "Hoàn thiện & Lưu bài",
      desc: "Chỉnh phông, cỡ, kiểu, màu chữ rõ ràng rồi <b>kiểm tra lại và lưu tệp</b> vào đúng thư mục của em."
    }
  ]
};
