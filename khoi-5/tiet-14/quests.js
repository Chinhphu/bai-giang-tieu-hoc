/**
 * Ngân hàng dữ liệu Tiết 14 Khối 5: Bài 7 - Thực hành soạn thảo văn bản (Tiết 2)
 * Nguồn dữ liệu duy nhất (Single Source of Truth) cho toàn bộ tiết học.
 * Chạy 100% Offline-first.
 */
window.QUESTS_DATA = {
  warmup: {
    id: "w1",
    badge: "📖 HÌNH 40 - TRANG 36 SGK • KHỞI ĐỘNG 5 PHÚT",
    title: "Kiểm tra nhanh trước khi hoàn thiện bài “Em đi giữa biển vàng”",
    prompt: "Khi chỉnh sửa bài hát “Em đi giữa biển vàng”, bạn nhỏ phát hiện dòng tên tác giả đang ở cuối bài và chưa có ảnh minh họa. Cần dùng các thao tác nào để hoàn thiện?",
    answer: "Đổi toàn bộ phông chữ Tahoma cỡ 13, tiêu đề cỡ 16 in đậm, dòng tác giả in nghiêng rồi dùng Cut – Paste (di chuyển) lên ngay dưới tiêu đề; cuối cùng chèn ảnh minh họa phù hợp và ghi rõ nguồn ảnh."
  },
  practiceChecklist: [
    { id: "a", title: "a) Gõ đầy đủ bài “Em đi giữa biển vàng”", desc: "Hoặc tải tệp mẫu để thực hành nhanh trên Word." },
    { id: "b1", title: "b1) Toàn bài Tahoma, cỡ 13 + tô màu theo Hình 40", desc: "Đoạn 1 vàng/cam, đoạn 2 xanh lá, đoạn 3 đỏ." },
    { id: "b2", title: "b2) Tiêu đề cỡ 16, Đậm (B); Tác giả Nghiêng (I)", desc: "Tên bài hát nổi bật; 2 dòng Nhạc/Lời in nghiêng." },
    { id: "c", title: "c) Di chuyển 2 dòng tác giả lên sau tên bài hát", desc: "Dùng Cut (Ctrl + X) → Paste (Ctrl + V) hoặc kéo thả." },
    { id: "d", title: "d) Chèn hình ảnh minh họa & ghi rõ nguồn ảnh", desc: "Đặt ảnh hợp lý với lời bài hát và ghi nguồn ở cuối." },
    { id: "e", title: "e) Lưu văn bản vào thư mục của em", desc: "Kiểm tra kỹ lại văn bản trước khi bấm Save." }
  ],
  docxRules: [
    {
      type: "paragraph_format",
      label: "Tiêu đề “Em đi giữa biển vàng”: Cỡ 16, Đậm (B), Phông Tahoma",
      match: "Em đi giữa biển vàng",
      fontFamily: "Tahoma",
      fontSize: 16,
      bold: true
    },
    {
      type: "paragraph_format",
      label: "Khổ thơ giữ nguyên phông chữ Tahoma, cỡ 13",
      match: "Nghe mênh mang trên đồng lúa hát",
      fontFamily: "Tahoma",
      fontSize: 13
    },
    {
      type: "paragraph_format",
      label: "Thông tin tác giả “Nhạc: Bùi Đình Thảo”: In nghiêng (I), Phông Tahoma",
      match: "Bùi Đình Thảo",
      fontFamily: "Tahoma",
      italic: true
    },
    {
      type: "image_exists",
      label: "Đã chèn hình ảnh minh họa phù hợp vào văn bản"
    },
    {
      type: "text_contains",
      label: "Có ghi rõ nguồn hình ảnh ở cuối văn bản (từ khóa “Nguồn”)",
      expectedText: "Nguồn"
    }
  ],
  appleQuiz: [
    {
      id: "ap1",
      appleNo: 1,
      question: "Em sử dụng phần mềm nào để soạn thảo văn bản?",
      options: ["A. Word", "B. Paint", "C. Scratch", "D. Chrome"],
      correctIdx: 0,
      points: 100,
      explain: "Phần mềm Microsoft Word dùng để soạn thảo, chỉnh sửa và định dạng văn bản."
    },
    {
      id: "ap2",
      appleNo: 2,
      question: "Để gõ chữ hoa (khi không bật Caps Lock), em có thể sử dụng phím nào?",
      options: ["A. Phím Esc", "B. Phím Shift", "C. Phím Delete", "D. Phím Tab"],
      correctIdx: 1,
      points: 100,
      explain: "Giữ phím Shift kết hợp với phím chữ cái sẽ gõ được chữ in hoa."
    },
    {
      id: "ap3",
      appleNo: 3,
      question: "Muốn xuống dòng mới khi soạn thảo văn bản, em nhấn phím nào?",
      options: ["A. Phím Enter", "B. Phím Backspace", "C. Phím Delete", "D. Phím Shift"],
      correctIdx: 0,
      points: 100,
      explain: "Phím Enter dùng để kết thúc đoạn và xuống dòng mới."
    },
    {
      id: "ap4",
      appleNo: 4,
      question: "Phím Backspace dùng để làm gì?",
      options: [
        "A. Thêm dòng mới",
        "B. Xóa ký tự bên phải con trỏ",
        "C. Xóa ký tự bên trái con trỏ",
        "D. Lưu tệp"
      ],
      correctIdx: 2,
      points: 100,
      explain: "Phím Backspace xóa lùi từng ký tự nằm ở bên trái con trỏ soạn thảo."
    },
    {
      id: "ap5",
      appleNo: 5,
      question: "Để đưa 2 dòng tác giả từ cuối bài lên ngay dưới tên bài hát mà không bị lặp lại, em dùng thao tác nào?",
      options: [
        "A. Sao chép (Copy – Paste)",
        "B. Di chuyển (Cut – Paste)",
        "C. Chèn ảnh (Insert Pictures)",
        "D. Đổi cỡ chữ"
      ],
      correctIdx: 1,
      points: 100,
      explain: "Di chuyển (Cut: Ctrl + X → Paste: Ctrl + V) giúp dời đoạn văn bản sang vị trí mới."
    },
    {
      id: "ap6",
      appleNo: 6,
      question: "Khi chèn hình ảnh lấy từ Internet vào cuối văn bản, em nên làm thêm việc gì?",
      options: [
        "A. Ghi rõ nguồn hình ảnh",
        "B. Xóa tên bài hát",
        "C. Đổi phông chữ sang cỡ 5",
        "D. Không lưu tệp"
      ],
      correctIdx: 0,
      points: 100,
      explain: "Ghi rõ nguồn hình ảnh thể hiện sự trung thực và tôn trọng bản quyền thông tin!"
    }
  ],
  summaryCards: [
    {
      badge: "Ý 1 • ĐỊNH DẠNG ĐỒNG BỘ",
      color: "#16b89a",
      bg: "#ecfdf5",
      title: "Phông, cỡ & kiểu chữ rõ ràng",
      desc: "Chỉnh toàn bài thống nhất <b>phông Tahoma cỡ 13</b>, tiêu đề <b>cỡ 16 in đậm</b>, thông tin tác giả <b>in nghiêng</b>."
    },
    {
      badge: "Ý 2 • BIÊN TẬP HỢP LÝ",
      color: "#2563eb",
      bg: "#eff6ff",
      title: "Di chuyển đúng bố cục",
      desc: "Dùng <b>Cut – Paste</b> di chuyển dòng tác giả lên ngay dưới tiêu đề giúp người đọc nhận biết ngay từ đầu."
    },
    {
      badge: "Ý 3 • ẢNH & NGUỒN ẢNH",
      color: "#d97706",
      bg: "#fffbeb",
      title: "Chèn ảnh & Tôn trọng nguồn",
      desc: "Chèn hình ảnh phù hợp với nội dung bài hát, <b>ghi rõ nguồn ảnh</b> và kiểm tra kỹ trước khi <b>lưu tệp</b>."
    }
  ]
};
