/**
 * NGÂN HÀNG NHIỆM VỤ & CÂU HỎI TIẾT 12
 * Môn: Tin học 5 (KNTT) - Bài 6 (Tiết 2): Thực hành & Vận dụng Định dạng kí tự và bố trí hình ảnh
 * 100% Chạy Offline-First không lỗi CORS trên file:///
 */

window.QUESTS_DATA = {
  title: "Tin học 5 – Bài 6: Định dạng kí tự và bố trí hình ảnh trong văn bản (Tiết 2 - Thực hành & Vận dụng)",

  // 1. Khởi động: Trò chơi ghép nối biểu tượng lệnh Word
  warmup: {
    title: "Khởi động: Thử tài ghép nối biểu tượng lệnh Word",
    description: "Ghép nối 4 biểu tượng lệnh Word quen thuộc với công dụng chính xác của chúng.",
    pairs: [
      {
        id: "match-1",
        icon: "Calibri ▾",
        name: "Hộp Font (Phông chữ)",
        desc: "Chọn kiểu phông chữ cho đoạn văn bản (Arial, Times New Roman, Tahoma...)"
      },
      {
        id: "match-2",
        icon: "A ▾",
        name: "Font Color (Màu chữ)",
        desc: "Đổi màu sắc cho chữ (Đỏ, Xanh dương, Vàng, Tím...)"
      },
      {
        id: "match-3",
        icon: "B / I",
        name: "Bold & Italic",
        desc: "In đậm (B) để nhấn mạnh và In nghiêng (I) cho trích dẫn hoặc chú thích"
      },
      {
        id: "match-4",
        icon: "Layout Options ⛶",
        name: "Wrap Text Square",
        desc: "Bố trí dòng chữ tự động chảy bao quanh hình ảnh dạng ô vuông gọn đẹp"
      }
    ],
    questions: [
      {
        id: "warmup-q1",
        label: "Câu hỏi 1:",
        question: "Muốn đổi phông chữ và màu chữ cho tiêu đề, em sử dụng 2 nút lệnh nào trong nhóm Font?",
        answer: "Hộp chọn Phông chữ (Font) và nút Màu chữ (Font Color - biểu tượng chữ A có gạch màu ở dưới)."
      },
      {
        id: "warmup-q2",
        label: "Câu hỏi 2:",
        question: "Tại sao khi chèn ảnh vào bài viết, chúng ta nên ưu tiên chọn kiểu bố trí Square?",
        answer: "Vì kiểu Square giúp văn bản bao quanh ảnh khít khao, không làm gãy dòng văn bản và tận dụng tối đa diện tích trang."
      }
    ]
  },

  // 2. Vòng 1 — Thực hành tổng hợp SGK (Nhiệm vụ 1 & 2 Tr.31, 32)
  stage1: {
    title: "Vòng 1: Thực hành chuẩn SGK — Hoàn thiện công thức làm kem dưa hấu",
    targetFile: "DeBai_CongThucLamKem.docx",
    fullScore: 200,
    penaltyPerBug: 50,
    rules: [
      {
        id: "r1-all-font",
        name: "1. Toàn bộ văn bản dùng phông Verdana, cỡ 12pt",
        type: "paragraph_format",
        scope: "all",
        fontFamily: "Verdana",
        fontSize: 12
      },
      {
        id: "r1-title",
        name: "2. Tiêu đề: Phông Tahoma, cỡ 16pt, In đậm, Màu Xanh dương",
        type: "paragraph_format",
        match: "CÁCH LÀM KEM DƯA HẤU",
        fontFamily: "Tahoma",
        fontSize: 16,
        bold: true,
        color: "BLUE"
      },
      {
        id: "r1-heading-1",
        name: "3. Đề mục 'Nguyên liệu:': Phông Verdana, cỡ 12pt, In đậm + Nghiêng, Màu Tím",
        type: "paragraph_format",
        match: "Nguyên liệu:",
        fontFamily: "Verdana",
        fontSize: 12,
        bold: true,
        italic: true,
        color: "PURPLE"
      },
      {
        id: "r1-heading-2",
        name: "4. Đề mục 'Dụng cụ:' & 'Các bước thực hiện:': Đậm + Nghiêng, Màu Tím",
        type: "paragraph_format",
        match: "Dụng cụ:",
        fontFamily: "Verdana",
        bold: true,
        italic: true,
        color: "PURPLE"
      },
      {
        id: "r1-wrap-square",
        name: "5. Bố trí hình ảnh que kem dưa hấu kiểu Square (Bao quanh)",
        type: "image_wrap",
        expectedWrap: "square"
      }
    ]
  },

  // 3. Vòng 2 — Giải cứu văn bản nhiễm Virus & PTNLS (Luyện tập & Vận dụng Tr.33)
  stage2: {
    title: "Vòng 2: Giải cứu văn bản nhiễm Virus & Phát triển năng lực số",
    targetFile: "DeBai_ChuyenThamQuan_Virus.docx",
    timeLimit: 90,
    handicaps: [
      { id: "h1", name: "🚫 Cấm dùng chuột phải", desc: "Chỉ được dùng thanh Ribbon hoặc phím tắt trên bàn phím!" },
      { id: "h2", name: "⏱️ Thử thách tốc độ 90 giây", desc: "Phải hoàn thành và kéo file nộp trước khi hết giờ!" },
      { id: "h3", name: "🔇 Bịt miệng đồng đội", desc: "Chỉ 1 bạn trên máy thao tác độc lập, dưới lớp không được nhắc bài!" }
    ],
    rules: [
      {
        id: "r2-title",
        name: "1. Tiêu đề 'Lịch trình chuyến đi tham quan': Phông Arial, Cỡ 15-16pt, Đậm, Màu Đỏ",
        type: "paragraph_format",
        match: "lich trinh chuyen di tham quan",
        fontFamily: "Arial",
        fontSize: { min: 14.5, max: 17 },
        bold: true,
        color: "RED"
      },
      {
        id: "r2-timestamp-1",
        name: "2. Mốc thời gian '7h00 - 7h30': In đậm, In nghiêng, Màu Xanh dương",
        type: "paragraph_format",
        match: "7h00",
        bold: true,
        italic: true,
        color: "BLUE"
      },
      {
        id: "r2-timestamp-2",
        name: "3. Mốc thời gian '7h30 - 8h30' & các mốc sau: In đậm, In nghiêng, Màu Xanh dương",
        type: "paragraph_format",
        match: "7h30",
        bold: true,
        italic: true,
        color: "BLUE"
      },
      {
        id: "r2-image-square",
        name: "4. Bố trí hình ảnh xe buýt/bảo tàng chế độ Square gọn gàng",
        type: "image_wrap",
        expectedWrap: "square"
      },
      {
        id: "r2-ptnls-addon",
        name: "5. [Nhiệm vụ PTNLS]: Bổ sung mục 'Những vật dụng cần mang theo'",
        type: "text_contains",
        expectedText: "vật dụng cần mang theo"
      }
    ]
  },

  // 4. Màn hình Chốt Kiến Thức (Active Recall 5 phút vàng cuối tiết + Đủ câu hỏi cho tất cả các tổ)
  summary: {
    coreRules: [
      {
        icon: "🎨",
        title: "1. QUY TẮC ĐỊNH DẠNG ĐỒNG BỘ",
        content: "Chọn phông chữ dễ đọc (Arial, Tahoma, Verdana); tiêu đề nổi bật với cỡ chữ to (15–18pt), in đậm và màu sắc hài hòa; các đề mục cùng cấp phải đồng nhất màu và kiểu chữ."
      },
      {
        icon: "🖼️",
        title: "2. BỐ CỤC HÌNH ẢNH HỢP LÝ",
        content: "Luôn chọn chế độ <b>Square</b> cho hình ảnh để chữ chảy bao quanh; không kéo dãn méo hình và đặt ảnh gần nội dung minh họa tương ứng."
      }
    ],
    consolidationQuestions: [
      {
        id: "sum-q1",
        forTeam: "Tổ 1",
        question: "Muốn toàn bộ bài viết có cỡ chữ 12 và phông chữ Verdana, em cần làm thao tác chọn văn bản như thế nào nhanh nhất?",
        answer: "Nhấn tổ hợp phím Ctrl + A để chọn toàn bộ văn bản, sau đó chọn phông Verdana và cỡ 12."
      },
      {
        id: "sum-q2",
        forTeam: "Tổ 2",
        question: "Khi định dạng các đề mục trong cùng một bài viết, ta cần tuân theo nguyên tắc thẩm mỹ nào?",
        answer: "Nguyên tắc đồng bộ: các đề mục cùng cấp phải có cùng phông chữ, cỡ chữ, kiểu chữ (đậm/nghiêng) và cùng màu sắc."
      },
      {
        id: "sum-q3",
        forTeam: "Tổ 3",
        question: "Nếu muốn hình ảnh nằm gọn gàng bên phải hoặc bên trái đoạn văn bản, em chọn nút lệnh nào?",
        answer: "Chọn hình ảnh, vào nút Layout Options, chọn kiểu Square rồi kéo thả ảnh về góc mong muốn."
      },
      {
        id: "sum-q4",
        forTeam: "Tổ 4",
        question: "Trong tình huống bạn Lan và Minh chuẩn bị đi tham quan, việc bổ sung mục 'Những vật dụng cần mang theo' thể hiện năng lực nào?",
        answer: "Năng lực ứng dụng công nghệ thông tin vào giải quyết vấn đề thực tiễn đời sống (PTNLS)."
      },
      {
        id: "sum-q5",
        forTeam: "Tổ 5 (Nếu có)",
        question: "Làm thế nào để phóng to hoặc thu nhỏ hình ảnh mà không bị méo tỉ lệ?",
        answer: "Nhấp chuột kéo các nút tròn ở 4 góc của hình ảnh."
      },
      {
        id: "sum-q6",
        forTeam: "Tổ Quỷ / Tổng kết",
        question: "Nêu 2 điều giúp một trang văn bản Word đạt điểm tối đa của Hội Đồng Thẩm Mỹ?",
        answer: "1. Đúng tiêu chí kỹ thuật (phông chữ, cỡ chữ, màu sắc chuẩn); 2. Bố cục hình ảnh Square thoáng đãng, hài hòa, dễ nhìn lướt."
      }
    ]
  }
};
