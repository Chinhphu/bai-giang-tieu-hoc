/**
 * Ngân hàng dữ liệu Tiết 13 Khối 3: Bài 6 - Khám phá thông tin trên Internet (Tiết 1)
 * Nguồn duy nhất (Single Source of Truth) cho toàn bộ câu hỏi Khởi động, Khám phá,
 * Đấu trường Trạm Radar Truy Tìm và Vòng Củng cố 5 phút cuối.
 * Chạy 100% Offline-first.
 */
window.QUESTS_DATA = {
  warmup: [
    {
      id: "w1",
      title: "Gia đình bạn Khoa cùng khám phá Internet (SGK Tr.30)",
      prompt: "Quan sát Hình 37 (SGK Tr.30): Những ai trong gia đình bạn Khoa đang sử dụng Internet và sử dụng vào việc gì?",
      answer: "Cả gia đình bạn Khoa (Bố đọc tin tức, Mẹ tìm công thức nấu ăn, Chị tìm hiểu thông tin mua sắm, Khoa xem chương trình học tập & giải trí) đều sử dụng Internet để tìm thông tin phục vụ học tập, công việc và giải trí."
    }
  ],
  explore: {
    id: "exp1",
    badge: "📖 HÌNH 37 - TRANG 30, 31 SGK",
    title: "Em có thể xem tin tức hay chương trình giải trí nào dưới đây trên Internet?",
    options: [
      { id: "A", text: "Lịch thi đấu đá bóng" },
      { id: "B", text: "Phim hoạt hình dành cho thiếu nhi" },
      { id: "C", text: "Video giới thiệu các danh lam thắng cảnh, điểm du lịch" },
      { id: "D", text: "Cả A, B, C đều đúng" }
    ],
    correctIdx: 3,
    explain: "Đáp án D chính xác! Khi truy cập Internet, em có thể xem rất nhiều tin tức, phim hoạt hình, ca nhạc, lịch thi đấu và video khám phá thế giới."
  },
  sandboxSearches: [
    {
      id: "weather",
      query: "Dự báo thời tiết hôm nay ở địa phương em",
      sourceLabel: "🌐 Nguồn Internet (Cập nhật trực tiếp)",
      title: "Dự báo thời tiết hôm nay & 3 ngày tới",
      summary: "☀️ Buổi sáng trời nắng nhẹ (27°C – 31°C). 🌦️ Chiều tối có khả năng mưa rào nhẹ. Gợi ý: Mang theo áo mưa khi đi học về!",
      note: "Thông tin thời tiết thay đổi mỗi ngày nên KHÔNG có sẵn trong máy tính, phải tra cứu trên Internet."
    },
    {
      id: "cartoon",
      query: "Phim hoạt hình khoa học thiếu nhi",
      sourceLabel: "🌐 Nguồn Internet (Kho giải trí trực tuyến)",
      title: "Bộ sưu tập Video Khoa học vui cho học sinh Tiểu học",
      summary: "🎬 Tập 1: Vì sao bầu trời có màu xanh? • Tập 2: Hành trình của giọt nước (Phù hợp lứa tuổi thiếu nhi).",
      note: "Hàng triệu video giải trí và bài học sinh động có sẵn trên Internet, cần người lớn cho phép khi xem."
    },
    {
      id: "photo",
      query: "Ảnh chụp lớp 3 đi tham quan (Lưu ở ổ D:)",
      sourceLabel: "💻 Có sẵn trong Máy tính",
      title: "Thư mục D:\\Anh_Lop_3\\ThamQuan_2026.jpg",
      summary: "🖼️ Tệp ảnh gia đình hoặc ảnh lớp tự chụp đã lưu trong ổ đĩa máy tính — mở xem ngay được mà không cần Internet.",
      note: "Dữ liệu cá nhân em đã tự lưu trên ổ đĩa thì mở trực tiếp trong máy tính."
    }
  ],
  radarArena: [
    {
      id: "r1",
      category: "PHÂN LOẠI NGUỒN",
      icon: "🌦️",
      signal: "Xem dự báo thời tiết ngày mai để chuẩn bị đi dã ngoại.",
      question: "Thông tin này em tìm thấy ở đâu?",
      options: [
        { id: "PC", label: "💻 Có sẵn trong máy tính" },
        { id: "NET", label: "🌐 Tìm trên Internet" },
        { id: "ADULT", label: "👨‍👩‍👧 Cần xin phép người lớn trước" }
      ],
      correctId: "NET",
      points: 100,
      explain: "Thời tiết thay đổi hằng ngày nên không có sẵn trong máy tính, em cần truy cập Internet để tra cứu mới nhất."
    },
    {
      id: "r2",
      category: "TIN TỨC & GIẢI TRÍ",
      icon: "⚽",
      signal: "Xem lịch thi đấu bóng đá hoặc kết quả trận đấu vừa diễn ra tối qua.",
      question: "Thông tin này thuộc loại nào trên Internet?",
      options: [
        { id: "PC", label: "💻 Có sẵn trong máy tính" },
        { id: "NET", label: "🌐 Tin tức cập nhật trên Internet" },
        { id: "ADULT", label: "🔒 Chỉ có trong sách giáo khoa" }
      ],
      correctId: "NET",
      points: 100,
      explain: "Lịch thi đấu và kết quả thể thao là tin tức được cập nhật thường xuyên trên Internet."
    },
    {
      id: "r3",
      category: "SO SÁNH DỮ LIỆU",
      icon: "📝",
      signal: "Bài thơ em đã tự gõ bằng Word và lưu trong thư mục của em trên máy tính.",
      question: "Tệp bài thơ đó nằm ở đâu?",
      options: [
        { id: "PC", label: "💻 Có sẵn trong máy tính" },
        { id: "NET", label: "🌐 Phải lên Internet mới tìm được" },
        { id: "ADULT", label: "📺 Chỉ xem được trên tivi" }
      ],
      correctId: "PC",
      points: 100,
      explain: "Bài thơ do em tự soạn và lưu trong ổ đĩa máy tính là thông tin có sẵn trên máy tính đang dùng."
    },
    {
      id: "r4",
      category: "AN TOÀN INTERNET",
      icon: "🛡️",
      signal: "Em muốn mở trình duyệt vào Internet để tìm xem phim hoạt hình thiếu nhi.",
      question: "Điều quan trọng đầu tiên em cần làm là gì?",
      options: [
        { id: "PC", label: "💻 Tự ý bấm vào mọi quảng cáo lạ" },
        { id: "ADULT", label: "👨‍👩‍👧 Xin phép và nhờ người lớn hướng dẫn" },
        { id: "NET", label: "🌐 Tắt màn hình máy tính ngay" }
      ],
      correctId: "ADULT",
      points: 100,
      explain: "Học sinh lớp 3 khi truy cập Internet luôn cần có sự cho phép và hướng dẫn của bố mẹ hoặc thầy cô."
    },
    {
      id: "r5",
      category: "CHƯƠNG TRÌNH GIẢI TRÍ",
      icon: "🎵",
      signal: "Nghe bài hát thiếu nhi mới phát hành hoặc xem video khám phá danh lam thắng cảnh.",
      question: "Nguồn thông tin này có thể tìm thấy ở đâu?",
      options: [
        { id: "NET", label: "🌐 Chương trình giải trí trên Internet" },
        { id: "PC", label: "💻 Tự động có sẵn trong chuột máy tính" },
        { id: "ADULT", label: "🔌 Chỉ có ở bàn phím" }
      ],
      correctId: "NET",
      points: 100,
      explain: "Âm nhạc, phim hoạt hình và video du lịch là các chương trình giải trí phong phú trên Internet."
    },
    {
      id: "r6",
      category: "TÌNH HUỐNG SGK (VẬN DỤNG)",
      icon: "🛍️",
      signal: "Trước khi đi mua món đồ mới, chị của bạn Khoa thường vào Internet tìm hiểu trước.",
      question: "Vì sao chị của Khoa lại làm như vậy?",
      options: [
        { id: "A", label: "🌐 Để biết thông tin, mẫu mã, giá cả và lựa chọn món đồ phù hợp" },
        { id: "B", label: "💻 Để máy tính tự đi mua hàng hộ" },
        { id: "C", label: "🎮 Để chơi game cho vui trước khi ra cửa hàng" }
      ],
      correctId: "A",
      points: 100,
      explain: "Internet giúp tìm hiểu thông tin sản phẩm, đánh giá và giá cả trước khi mua để chọn được món đồ tốt nhất."
    },
    {
      id: "r7",
      category: "TÌNH HUỐNG THỰC TẾ",
      icon: "🖼️",
      signal: "Em cần tìm ảnh về loài Sao la quý hiếm ở Việt Nam để làm bài tập nhưng trong máy không có.",
      question: "Cách nhanh nhất để em có thông tin và hình ảnh về Sao la là gì?",
      options: [
        { id: "PC", label: "💻 Tìm trong thùng rác máy tính" },
        { id: "NET", label: "🌐 Nhờ người lớn hướng dẫn tìm trên Internet" },
        { id: "ADULT", label: "🖨️ Bấm nút tắt nguồn" }
      ],
      correctId: "NET",
      points: 100,
      explain: "Những kiến thức, hình ảnh không có sẵn trong máy tính đều có thể tìm kiếm dễ dàng trên Internet."
    },
    {
      id: "r8",
      category: "TÌNH HUỐNG LẠ",
      icon: "⚠️",
      signal: "Đang xem video học tập thì hiện ra một bảng lạ mời bấm vào nhận quà miễn phí.",
      question: "Em nên xử lý thế nào để an toàn?",
      options: [
        { id: "A", label: "🖱️ Bấm ngay vào để nhận quà" },
        { id: "ADULT", label: "👨‍👩‍👧 Không bấm vào và báo ngay cho bố mẹ hoặc thầy cô" },
        { id: "C", label: "⌨️ Nhập tên và địa chỉ nhà vào bảng đó" }
      ],
      correctId: "ADULT",
      points: 100,
      explain: "Tuyệt đối không bấm vào cửa sổ quảng cáo lạ, cần hỏi người lớn để tránh đường dẫn không an toàn."
    },
    {
      id: "r9",
      category: "TÌM KIẾM ĐƠN GIẢN (NLS)",
      icon: "🔍",
      signal: "Lớp em chuẩn bị tổ chức lễ chào cờ ngoài sân trường vào sáng thứ Hai.",
      question: "Internet giúp lớp em kiểm tra thông tin gì hữu ích nhất trước đó?",
      options: [
        { id: "NET", label: "🌐 Xem dự báo thời tiết để biết trời nắng hay mưa" },
        { id: "PC", label: "💻 Xem đồng hồ cát trong máy tính" },
        { id: "C", label: "🎨 Mở phần mềm vẽ hình" }
      ],
      correctId: "NET",
      points: 100,
      explain: "Tra cứu dự báo thời tiết trên Internet giúp lớp chủ động kế hoạch tổ chức trong lớp hoặc ngoài sân."
    },
    {
      id: "r10",
      category: "SO SÁNH DỮ LIỆU",
      icon: "📸",
      signal: "Bức ảnh sinh nhật năm ngoái của em đã được bố lưu trong thư mục D:\\GiaDinh.",
      question: "Khi máy tính không kết nối Internet, em có mở xem ảnh này được không?",
      options: [
        { id: "PC", label: "💻 Có, vì ảnh đã có sẵn trong máy tính" },
        { id: "NET", label: "🌐 Không, bắt buộc phải có Wi-Fi mới mở được" },
        { id: "C", label: "📺 Phải gửi lên tivi mới xem được" }
      ],
      correctId: "PC",
      points: 100,
      explain: "Tệp đã lưu sẵn trên ổ đĩa máy tính luôn mở xem được ngay cả khi không có Internet."
    },
    {
      id: "r11",
      category: "KHÁM PHÁ THẾ GIỚI",
      icon: "🦒",
      signal: "Em muốn biết ở Công viên Thủ Lệ hay Thảo Cầm Viên có những con vật nào và giờ mở cửa.",
      question: "Em có thể tìm thông tin đó ở đâu?",
      options: [
        { id: "NET", label: "🌐 Tìm kiếm thông tin trên Internet" },
        { id: "PC", label: "💻 Tìm trong phần mềm gõ phím Kiran's Typing" },
        { id: "C", label: "🔌 Tìm trong dây cắm màn hình" }
      ],
      correctId: "NET",
      points: 100,
      explain: "Giờ mở cửa, bản đồ và thông tin điểm tham quan là thông tin có sẵn trên Internet."
    },
    {
      id: "r12",
      category: "PHẢN XẠ NHANH",
      icon: "✨",
      signal: "Phát biểu nào sau đây nói ĐÚNG nhất về Internet?",
      question: "Em hãy chọn nhận định chính xác nhất:",
      options: [
        { id: "A", label: "💻 Internet chỉ chứa các tệp em tự vẽ trên máy" },
        { id: "NET", label: "🌐 Internet là kho thông tin khổng lồ: tin tức, giải trí, học tập và cần người lớn hướng dẫn" },
        { id: "C", label: "🚫 Trẻ em có thể tự vào bất kỳ trang web nào không cần hỏi ai" }
      ],
      correctId: "NET",
      points: 100,
      explain: "Internet giúp mở rộng thế giới tri thức nhưng em luôn cần có sự cho phép và đồng hành của người lớn."
    }
  ],
  summaryCards: [
    {
      badge: "Ý 1 • TIN TỨC & GIẢI TRÍ",
      color: "#2563eb",
      bg: "#eff6ff",
      title: "Kho tin tức & giải trí",
      desc: "Trên Internet có nhiều <b>tin tức</b> (thời tiết, thể thao) và <b>chương trình giải trí</b> (phim hoạt hình, ca nhạc, video học tập)."
    },
    {
      badge: "Ý 2 • MỞ RỘNG TRI THỨC",
      color: "#16a34a",
      bg: "#f0fdf4",
      title: "Tìm thông tin mới",
      desc: "Nhiều thông tin <b>không có sẵn trong máy tính</b> của em nhưng có thể <b>tìm thấy nhanh chóng trên Internet</b>."
    },
    {
      badge: "Ý 3 • AN TOÀN KHI DÙNG",
      color: "#d97706",
      bg: "#fffbeb",
      title: "Xin phép người lớn",
      desc: "Khi truy cập Internet, em luôn cần có <b>sự cho phép và hướng dẫn của người lớn</b> (bố mẹ, thầy cô)."
    }
  ],
  consolidationQuiz: [
    {
      id: "c1",
      question: "Ví dụ nào sau đây là chương trình giải trí em có thể xem trên Internet?",
      options: ["A. Phim hoạt hình thiếu nhi", "B. Ổ đĩa cứng C:", "C. Phím Caps Lock", "D. Chuột máy tính"],
      correctIdx: 0,
      points: 100
    },
    {
      id: "c2",
      question: "Thông tin nào KHÔNG có sẵn trong máy tính nhưng tìm được trên Internet?",
      options: ["A. Tên các thư mục em tự tạo", "B. Dự báo thời tiết tuần tới", "C. Bài tập gõ phím em vừa lưu", "D. Bức ảnh em lưu ở ổ D:"],
      correctIdx: 1,
      points: 100
    },
    {
      id: "c3",
      question: "Khi muốn truy cập Internet, học sinh lớp 3 cần làm gì?",
      options: ["A. Tự ý vào mọi trang web", "B. Bấm vào mọi quảng cáo", "C. Xin phép và có người lớn hướng dẫn", "D. Không cần hỏi ai"],
      correctIdx: 2,
      points: 100
    },
    {
      id: "c4",
      question: "Internet giúp ích gì trong tình huống trước khi mua một món đồ mới?",
      options: ["A. Tìm hiểu thông tin, mẫu mã sản phẩm", "B. Làm hỏng chuột máy tính", "C. Xóa sạch dữ liệu trong ổ đĩa", "D. Tắt nguồn màn hình"],
      correctIdx: 0,
      points: 100
    },
    {
      id: "c5",
      question: "Thông tin nào dưới đây có thể là TIN TỨC trên Internet?",
      options: ["A. Lịch thi đấu bóng đá", "B. Cái thước kẻ trên bàn", "C. Nút nguồn thân máy", "D. Bàn phím số"],
      correctIdx: 0,
      points: 100
    },
    {
      id: "c6",
      question: "Nếu đang dùng Internet mà thấy hình ảnh lạ hoặc đáng sợ, em nên làm gì?",
      options: ["A. Tiếp tục bấm xem tiếp", "B. Dừng lại và báo ngay cho bố mẹ/thầy cô", "C. Giấu kín không nói ai", "D. Gõ mật khẩu vào đó"],
      correctIdx: 1,
      points: 100
    }
  ]
};
