/**
 * Ngân hàng dữ liệu Tiết 14 Khối 4: Bài 8 - Định dạng văn bản trên trang chiếu (Tiết 1)
 * Nguồn dữ liệu duy nhất (Single Source of Truth) cho toàn bộ tiết học.
 * Chạy 100% Offline-first.
 */
window.QUESTS_DATA = {
  warmup: {
    id: "w1",
    badge: "📖 HÌNH 28a & 28b - TRANG 34 SGK",
    title: "So sánh hai trang chiếu cùng chủ đề “Cảnh đẹp quê hương”",
    prompt: "Quan sát Hình 28a (bên trái) và Hình 28b (bên phải): Hai trang chiếu có gì khác nhau và trang nào dễ nhìn, ấn tượng hơn?",
    answer: "Trang chiếu 28b đẹp và nổi bật hơn vì tiêu đề được định dạng cỡ chữ lớn hơn, màu cam nổi bật, kiểu chữ nghiêng; tên tác giả cũng có màu sắc rõ ràng giúp người xem phân biệt ngay phần chính và phần phụ."
  },
  ribbonTools: [
    { id: "font", icon: "🔤", label: "Font (Phông chữ)", group: "Nhóm Font", desc: "Thay đổi kiểu dáng chữ (ví dụ: Times New Roman, Arial)." },
    { id: "size", icon: "🔢", label: "Font Size (Cỡ chữ)", group: "Nhóm Font", desc: "Tăng hoặc giảm kích thước to/nhỏ của chữ trên trang chiếu." },
    { id: "bold", icon: "𝐁", label: "Bold (In đậm - B)", group: "Nhóm Font", desc: "Làm nét chữ dày và đậm hơn để nhấn mạnh tiêu đề hoặc từ khóa." },
    { id: "italic", icon: "𝐼", label: "Italic (In nghiêng - I)", group: "Nhóm Font", desc: "Làm chữ nghiêng sang phải để tạo điểm nhấn thanh thoát." },
    { id: "underline", icon: "̲U", label: "Underline (Gạch chân - U)", group: "Nhóm Font", desc: "Kẻ đường gạch chân phía dưới phần văn bản được chọn." },
    { id: "color", icon: "🎨", label: "Font Color (Màu chữ - A)", group: "Nhóm Font", desc: "Thay đổi màu sắc chữ cho hài hòa, dễ đọc trên nền slide." },
    { id: "bullets", icon: "•≡", label: "Bullets (Gạch đầu dòng)", group: "Nhóm Paragraph", desc: "Tạo các dấu đầu dòng gọn gàng khi liệt kê nhiều ý." }
  ],
  practiceSgks: {
    id: "psgk1",
    badge: "📖 LUYỆN TẬP CÂU 1 - TRANG 38 SGK",
    title: "Để cụm từ “Trường em” có kiểu chữ ĐẬM và NGHIÊNG, em sử dụng nút lệnh nào?",
    options: [
      { id: "A", text: "Chỉ nút B" },
      { id: "B", text: "Chỉ nút I" },
      { id: "C", text: "Cả hai nút lệnh B và I" },
      { id: "D", text: "Nút U" }
    ],
    correctIdx: 2,
    explain: "Đáp án C chính xác! Bấm cả nút B (Bold - Đậm) và nút I (Italic - Nghiêng) giúp văn bản vừa đậm vừa nghiêng."
  },
  slideDoctorCases: [
    {
      id: "doc1",
      patient: "Ca 1 • Tiêu đề mờ nhạt",
      instruction: "Chọn dòng TIÊU ĐỀ rồi chỉnh: Cỡ chữ Lớn (40) + In đậm (B) + Màu Đỏ.",
      targetLine: "title",
      initialState: {
        title: { text: "CẢNH ĐẸP QUÊ HƯƠNG", size: 22, bold: false, italic: false, underline: false, color: "#64748b", bullets: false },
        body: { text: "Nguyễn Thu An - Lớp 4A2", size: 22, bold: false, italic: false, underline: false, color: "#334155", bullets: false }
      },
      required: { size: 40, bold: true, color: "#dc2626" },
      points: 100
    },
    {
      id: "doc2",
      patient: "Ca 2 • Tên tác giả đơn điệu",
      instruction: "Chọn dòng NỘI DUNG (tên tác giả) rồi chỉnh: In nghiêng (I) + Màu Xanh dương.",
      targetLine: "body",
      initialState: {
        title: { text: "CẢNH ĐẸP QUÊ HƯƠNG", size: 40, bold: true, italic: false, underline: false, color: "#dc2626", bullets: false },
        body: { text: "Lê Đăng Khoa - Lớp 4A2", size: 24, bold: false, italic: false, underline: false, color: "#475569", bullets: false }
      },
      required: { italic: true, color: "#2563eb" },
      points: 100
    },
    {
      id: "doc3",
      patient: "Ca 3 • Cụm từ “Trường em” (SGK Tr.38)",
      instruction: "Chọn dòng TIÊU ĐỀ “TRƯỜNG EM” rồi chỉnh: Vừa Đậm (B) vừa Nghiêng (I) + Cỡ chữ 40.",
      targetLine: "title",
      initialState: {
        title: { text: "TRƯỜNG EM THÂN YÊU", size: 24, bold: false, italic: false, underline: false, color: "#14213d", bullets: false },
        body: { text: "Nơi chắp cánh ước mơ tuổi thơ", size: 22, bold: false, italic: false, underline: false, color: "#334155", bullets: false }
      },
      required: { bold: true, italic: true, size: 40 },
      points: 100
    },
    {
      id: "doc4",
      patient: "Ca 4 • Danh sách thiếu Gạch đầu dòng",
      instruction: "Chọn phần NỘI DUNG liệt kê địa danh rồi bật nút Gạch đầu dòng (Bullets) + Màu Xanh lá.",
      targetLine: "body",
      initialState: {
        title: { text: "DANH THẮNG QUÊ HƯƠNG", size: 36, bold: true, italic: false, underline: false, color: "#2563eb", bullets: false },
        body: { text: "Sông Hương • Đồi Vọng Cảnh • Núi Ngự Bình", size: 22, bold: false, italic: false, underline: false, color: "#334155", bullets: false }
      },
      required: { bullets: true, color: "#16a34a" },
      points: 100
    },
    {
      id: "doc5",
      patient: "Ca 5 • Nhấn mạnh câu khẩu hiệu",
      instruction: "Chọn dòng TIÊU ĐỀ rồi bật: In đậm (B) + Gạch chân (U) + Màu Xanh dương.",
      targetLine: "title",
      initialState: {
        title: { text: "CHĂM NGOAN HỌC GIỎI", size: 32, bold: false, italic: false, underline: false, color: "#475569", bullets: false },
        body: { text: "Tập thể lớp 4A1", size: 22, bold: false, italic: true, underline: false, color: "#334155", bullets: false }
      },
      required: { bold: true, underline: true, color: "#2563eb" },
      points: 100
    },
    {
      id: "doc6",
      patient: "Ca 6 • Chữ tiêu đề quá nhỏ",
      instruction: "Chọn dòng TIÊU ĐỀ rồi phóng lên Cỡ chữ 40 + In đậm (B) + Màu Đỏ.",
      targetLine: "title",
      initialState: {
        title: { text: "EM YÊU TIN HỌC", size: 16, bold: false, italic: false, underline: false, color: "#1e293b", bullets: false },
        body: { text: "Học mà chơi - Chơi mà học", size: 22, bold: false, italic: false, underline: false, color: "#334155", bullets: false }
      },
      required: { size: 40, bold: true, color: "#dc2626" },
      points: 100
    }
  ],
  summaryCards: [
    {
      badge: "Ý 1 • VỊ TRÍ LỆNH",
      color: "#14213d",
      bg: "#f1f5f9",
      title: "Dải lệnh Home → Nhóm Font",
      desc: "Các nút đổi <b>phông chữ, cỡ chữ, kiểu chữ (B, I, U) và màu chữ</b> đều nằm trong nhóm <b>Font</b> trên dải lệnh <b>Home</b>."
    },
    {
      badge: "Ý 2 • NGUYÊN TẮC VÀNG",
      color: "#ea580c",
      bg: "#fff7ed",
      title: "Chọn văn bản trước",
      desc: "Luôn <b>chọn (bôi đen)</b> phần văn bản trên trang chiếu trước khi bấm bất kỳ nút định dạng nào."
    },
    {
      badge: "Ý 3 • GẠCH ĐẦU DÒNG",
      color: "#16a34a",
      bg: "#f0fdf4",
      title: "Dùng Bullets trình bày ý",
      desc: "Sử dụng nút <b>Bullets</b> (nhóm Paragraph) giúp các ý liệt kê trên trang chiếu rõ ràng và đẹp mắt hơn."
    }
  ],
  consolidationQuiz: [
    {
      id: "c1",
      question: "Để định dạng phông chữ, cỡ chữ, màu chữ trên trang chiếu PowerPoint, em vào dải lệnh nào?",
      options: ["A. Insert", "B. Home (nhóm Font)", "C. Design", "D. View"],
      correctIdx: 1,
      points: 100
    },
    {
      id: "c2",
      question: "Bước đầu tiên cần làm trước khi bấm nút đổi màu hoặc cỡ chữ là gì?",
      options: ["A. Chọn phần văn bản cần định dạng", "B. Bấm dấu X thoát phần mềm", "C. Xóa trang chiếu", "D. Tắt màn hình"],
      correctIdx: 0,
      points: 100
    },
    {
      id: "c3",
      question: "Nút lệnh chữ B trong nhóm Font có chức năng gì?",
      options: ["A. Gạch chân", "B. In nghiêng", "C. In đậm", "D. Gạch đầu dòng"],
      correctIdx: 2,
      points: 100
    },
    {
      id: "c4",
      question: "Muốn trình bày danh sách các ý rõ ràng bằng dấu chấm tròn ở đầu dòng, em dùng nút nào?",
      options: ["A. Font Color", "B. Bullets", "C. Font Size", "D. Italic (I)"],
      correctIdx: 1,
      points: 100
    },
    {
      id: "c5",
      question: "Nút lệnh nào giúp đổi màu chữ trên trang chiếu?",
      options: ["A. Font Color (chữ A gạch màu)", "B. Bold (B)", "C. Underline (U)", "D. New Slide"],
      correctIdx: 0,
      points: 100
    },
    {
      id: "c6",
      question: "Khi thực hành gõ Họ tên và Tên trường lên trang chiếu, định dạng thế nào là hợp lý nhất?",
      options: [
        "A. Mỗi chữ một màu chói mắt, cỡ chữ siêu nhỏ",
        "B. Cỡ chữ đủ lớn, màu hài hòa nổi bật trên nền trang chiếu",
        "C. Viết không dấu cho nhanh",
        "D. Chỉ chọn màu chữ trùng màu nền"
      ],
      correctIdx: 1,
      points: 100
    }
  ]
};
