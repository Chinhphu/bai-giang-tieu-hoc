/**
 * Ngân hàng dữ liệu Tiết 14 Khối 3: Bài 6 - Khám phá thông tin trên Internet (Tiết 2)
 * Tích hợp NLS 1.2.CB1a (Độ tin cậy nguồn tin) & AI 3.A3.1.a (AI có thể sai).
 * Chạy 100% Offline-first.
 */
window.QUESTS_DATA = {
  warmup: {
    id: "w1",
    badge: "📖 HÌNH 39 - TRANG 32 SGK",
    title: "Dự báo thời tiết & Kế hoạch Lễ kết nạp Đội viên",
    prompt: "Quan sát dự báo thời tiết tuần tới ở địa phương bạn An (ngày thứ Hai có mưa): Lớp bạn An nên tổ chức lễ kết nạp Đội viên ở trong lớp hay ngoài sân trường? Vì sao?",
    answer: "Nên tổ chức ở TRONG LỚP vì dự báo thời tiết trên Internet cho biết ngày thứ Hai có mưa. Nhờ xem trước thông tin trên Internet, lớp bạn An chủ động kế hoạch an toàn và không bị ướt mưa."
  },
  sourceCheck: {
    id: "sc1",
    badge: "📖 TÌNH HUỐNG NLS 1.2.CB1a",
    title: "Minh tìm video hướng dẫn thắt khăn quàng đỏ và thấy 2 kết quả khác nhau. Minh nên tham khảo video nào?",
    options: [
      { id: "A", text: "Video do Tổ chức Đội Thiếu niên Tiền phong đăng tải, hướng dẫn rõ ràng, chuẩn nghi thức" },
      { id: "B", text: "Video từ một tài khoản lạ không rõ nguồn gốc, tiêu đề giật gân" }
    ],
    correctIdx: 0,
    explain: "Minh nên chọn video của Tổ chức Đội Thiếu niên vì đây là nguồn chính thống, đáng tin cậy và chính xác nhất!"
  },
  detectiveCases: [
    {
      id: "d1",
      type: "🤖 TÌNH HUỐNG TÍCH HỢP AI (3.A3.1.a)",
      sender: "Chatbot AI • Trợ lý dịch thuật",
      icon: "🤖",
      content: "Bạn Lan dùng Chatbot AI hỏi nghĩa của một câu tiếng Anh. AI trả lời rất nhanh nhưng dịch sai nghĩa của câu đó.",
      question: "Lan có nên chép ngay kết quả của AI vào bài không?",
      options: [
        { id: "TRUST", label: "✅ Tin ngay 100% vì AI trả lời rất nhanh" },
        { id: "ALERT", label: "🚨 Không tin ngay — Đọc lại, hỏi cô giáo và kiểm tra trong sách học" }
      ],
      correctId: "ALERT",
      points: 100,
      explain: "AI có thể mắc lỗi (dịch sai nghĩa hoặc đưa tin không đúng). Em cần suy nghĩ, hỏi thầy cô và kiểm tra lại trước khi tin!"
    },
    {
      id: "d2",
      type: "🛡️ ĐÁNH GIÁ NGUỒN TIN (NLS 1.2.CB1a)",
      sender: "Kênh chính thức • Hội đồng Đội Trung ương",
      icon: "🏅",
      content: "Trang web chính thức của tổ chức Đội Thiếu niên đăng bài hướng dẫn kỹ năng thắt khăn quàng đỏ và bài hát truyền thống của Đội.",
      question: "Nguồn thông tin này có đáng tin cậy và phù hợp với học sinh lớp 3 không?",
      options: [
        { id: "TRUST", label: "✅ Tin cậy & Phù hợp lứa tuổi" },
        { id: "ALERT", label: "🚨 Báo động — Không rõ nguồn gốc" }
      ],
      correctId: "TRUST",
      points: 100,
      explain: "Thông tin đến từ tổ chức chính thống, nội dung giáo dục lành mạnh là nguồn tin đáng tin cậy và phù hợp lứa tuổi."
    },
    {
      id: "d3",
      type: "⚠️ CẢNH BÁO AN TOÀN MẠNG",
      sender: "Tài khoản lạ • Tin nhắn popup",
      icon: "👾",
      content: "Khi đang xem video học tập, màn hình hiện ra tin nhắn từ người lạ nói những lời đe dọa hoặc hình ảnh khiến em sợ hãi.",
      question: "Em xử lý tình huống này như thế nào?",
      options: [
        { id: "TRUST", label: "✅ Tự nhắn tin trả lời lại người lạ đó" },
        { id: "ALERT", label: "🚨 Báo động — Dừng lại và chia sẻ ngay với bố mẹ / thầy cô tin cậy" }
      ],
      correctId: "ALERT",
      points: 100,
      explain: "Khi gặp bắt nạt, đe dọa hay lo lắng sợ hãi trên Internet, đừng ngần ngại chia sẻ ngay với người lớn mà em tin cậy!"
    },
    {
      id: "d4",
      type: "🌦️ KIỂM CHỨNG THÔNG TIN",
      sender: "Trang tin thời tiết địa phương (VOH / Trung tâm KTTV)",
      icon: "☀️",
      content: "Bản tin dự báo thời tiết chính thống cập nhật nhiệt độ và khả năng mưa của thành phố trong ngày hôm nay.",
      question: "Nguồn thông tin này như thế nào?",
      options: [
        { id: "TRUST", label: "✅ Nguồn tin chính thống, hữu ích cho học tập & sinh hoạt" },
        { id: "ALERT", label: "🚨 Thông tin giả mạo, không nên xem" }
      ],
      correctId: "TRUST",
      points: 100,
      explain: "Trang tin dự báo thời tiết từ cơ quan báo chí/khí tượng chính thống giúp em chuẩn bị trang phục và kế hoạch ngoài trời hợp lý."
    },
    {
      id: "d5",
      type: "🤖 BẪY CHATBOT AI (3.A3.1.a)",
      sender: "Chatbot AI • Hỏi đáp tự động",
      icon: "💬",
      content: "Một bạn hỏi Chatbot AI về lịch sử địa phương. Chatbot tự tin bịa ra tên một ngôi trường không hề có thật!",
      question: "Nhận định nào đúng về câu trả lời của Chatbot AI này?",
      options: [
        { id: "TRUST", label: "✅ AI không bao giờ biết sai" },
        { id: "ALERT", label: "🚨 AI có thể đưa tin không đúng — Cần kiểm tra lại bằng sách và thầy cô" }
      ],
      correctId: "ALERT",
      points: 100,
      explain: "Chatbot AI đôi khi tạo ra thông tin sai sự thật; luôn đối chiếu lại với sách giáo khoa hoặc hỏi thầy cô, bố mẹ!"
    },
    {
      id: "d6",
      type: "🎬 NỘI DUNG PHÙ HỢP LỨA TUỔI",
      sender: "Tài khoản không rõ nguồn gốc",
      icon: "🚫",
      content: "Một video trôi nổi có hình ảnh bạo lực, lời nói thô tục được gắn nhãn hấp dẫn để lôi kéo trẻ em bấm vào xem.",
      question: "Video này có phù hợp để em xem không?",
      options: [
        { id: "TRUST", label: "✅ Phù hợp, bấm xem thoải mái" },
        { id: "ALERT", label: "🚨 Không phù hợp lứa tuổi — Tắt ngay và báo người lớn" }
      ],
      correctId: "ALERT",
      points: 100,
      explain: "Không phải thông tin nào trên Internet cũng phù hợp với lứa tuổi tiểu học. Em cần chọn lọc và có sự hướng dẫn của người lớn."
    },
    {
      id: "d7",
      type: "📺 CHƯƠNG TRÌNH KỸ NĂNG SỐNG",
      sender: "Kênh Giáo dục Thiếu nhi (Có bố mẹ cho phép)",
      icon: "🎒",
      content: "Video hoạt hình kỹ năng sống dạy cách qua đường an toàn và ứng xử lịch sự với bạn bè, được thầy cô giới thiệu.",
      question: "Đây là nội dung thế nào?",
      options: [
        { id: "TRUST", label: "✅ Phù hợp lứa tuổi, bổ ích và đáng tin cậy" },
        { id: "ALERT", label: "🚨 Nguy hiểm, cần tránh xa" }
      ],
      correctId: "TRUST",
      points: 100,
      explain: "Các chương trình giáo dục kỹ năng sống được thầy cô hoặc bố mẹ giới thiệu rất phù hợp và bổ ích cho học sinh lớp 3."
    },
    {
      id: "d8",
      type: "🎁 BẪY QUẢNG CÁO LỪA ĐẢO",
      sender: "Trang web lạ • “Trúng thưởng iPad miễn phí”",
      icon: "💣",
      content: "Trang web không rõ nguồn gốc yêu cầu em nhập số điện thoại của bố mẹ và địa chỉ nhà để nhận quà tặng.",
      question: "Em phải làm gì trước thông tin này?",
      options: [
        { id: "TRUST", label: "✅ Nhập thông tin ngay để nhận quà" },
        { id: "ALERT", label: "🚨 Báo động — Không cung cấp thông tin cá nhân và báo người lớn" }
      ],
      correctId: "ALERT",
      points: 100,
      explain: "Tuyệt đối không cung cấp thông tin cá nhân cho trang web lạ, đây là nguồn không đáng tin cậy!"
    }
  ],
  summaryCards: [
    {
      badge: "Ý 1 • CHỌN LỌC NGUỒN TIN",
      color: "#2563eb",
      bg: "#eff6ff",
      title: "Kiểm tra nguồn đáng tin cậy",
      desc: "Thông tin trên Internet rất phong phú nhưng <b>không phải nguồn nào cũng đúng và phù hợp</b> với lứa tuổi của em."
    },
    {
      badge: "Ý 2 • AN TOÀN KHI DÙNG",
      color: "#16a34a",
      bg: "#f0fdf4",
      title: "Nhờ người lớn đồng hành",
      desc: "Phải được <b>bố mẹ, thầy cô cho phép</b>; nếu gặp đe dọa hoặc điều làm em sợ hãi, hãy <b>chia sẻ ngay với người lớn tin cậy</b>."
    },
    {
      badge: "Ý 3 • HIỂU ĐÚNG VỀ AI",
      color: "#d97706",
      bg: "#fffbeb",
      title: "AI có thể mắc lỗi",
      desc: "Chatbot AI trả lời rất nhanh nhưng <b>có thể dịch sai nghĩa hoặc đưa tin sai</b>; em cần kiểm tra lại trước khi tin."
    }
  ],
  consolidationQuiz: [
    {
      id: "c1",
      question: "Câu hỏi 2 (SGK): Ý nào dưới đây KHÔNG phải là đặc điểm của thông tin trên Internet?",
      options: [
        "A. Phong phú, đa dạng từ nhiều nguồn",
        "B. Được cập nhật thường xuyên",
        "C. Mọi thông tin trên Internet đều hoàn toàn đúng và phù hợp với trẻ em",
        "D. Có thể tìm thấy thông tin không có sẵn trong máy tính"
      ],
      correctIdx: 2,
      points: 100
    },
    {
      id: "c2",
      question: "Khi tìm cách thắt khăn quàng đỏ, nguồn nào đáng tin cậy hơn?",
      options: [
        "A. Video của Tổ chức Đội Thiếu niên",
        "B. Video của tài khoản lạ không rõ nguồn gốc",
        "C. Tin đồn chưa kiểm chứng",
        "D. Quảng cáo trúng thưởng"
      ],
      correctIdx: 0,
      points: 100
    },
    {
      id: "c3",
      question: "Khi dùng Chatbot AI để dịch một câu tiếng Anh, em cần làm gì?",
      options: [
        "A. Tin ngay không cần đọc lại",
        "B. Đọc lại, hỏi cô giáo và kiểm tra thêm trong sách học",
        "C. Tắt máy tính ngay",
        "D. Gửi cho bạn chép theo luôn"
      ],
      correctIdx: 1,
      points: 100
    },
    {
      id: "c4",
      question: "Nếu gặp chuyện bị bắt nạt, đe dọa hoặc sợ hãi khi dùng Internet, em nên làm gì?",
      options: [
        "A. Giấu kín một mình",
        "B. Cãi nhau với người lạ đó",
        "C. Chia sẻ ngay với bố mẹ hoặc thầy cô tin cậy",
        "D. Xóa hết bài tập trong máy"
      ],
      correctIdx: 2,
      points: 100
    },
    {
      id: "c5",
      question: "Xem dự báo thời tiết trên Internet trước ngày tổ chức lễ ngoài sân trường giúp ích gì?",
      options: [
        "A. Chủ động chuẩn bị kế hoạch trong lớp hay ngoài sân cho phù hợp",
        "B. Làm máy tính chạy nhanh hơn",
        "C. Đổi màu bàn phím",
        "D. Không có ích lợi gì"
      ],
      correctIdx: 0,
      points: 100
    },
    {
      id: "c6",
      question: "Điều kiện quan trọng để học sinh lớp 3 sử dụng Internet an toàn là gì?",
      options: [
        "A. Tự do bấm vào mọi đường link lạ",
        "B. Có sự cho phép và hướng dẫn của người lớn",
        "C. Nhập mật khẩu lên mọi trang web",
        "D. Dùng vào lúc khuya khi mọi người đã ngủ"
      ],
      correctIdx: 1,
      points: 100
    }
  ]
};
