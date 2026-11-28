/**
 * Ngân hàng dữ liệu Tiết 13 Khối 4: Bài 7 - Tạo bài trình chiếu (Tiết 2)
 * Nguồn dữ liệu duy nhất (Single Source of Truth) cho toàn bộ tiết học.
 * Chạy 100% Offline-first.
 */
window.QUESTS_DATA = {
  warmup: {
    id: "w1",
    badge: "📖 HÌNH 26 - TRANG 32 SGK",
    title: "So sánh hai cách giới thiệu cảnh đẹp địa phương",
    prompt: "Nếu có 4 bức ảnh đẹp về quê hương, cách nào giúp em thuyết trình mạch lạc và hấp dẫn hơn trước lớp?",
    answer: "Tạo bài trình chiếu gồm 4 trang (có tiêu đề bằng tiếng Việt, chữ hoa - chữ thường rõ ràng và hình ảnh minh họa) giúp người xem dễ theo dõi và ấn tượng hơn hẳn việc mở từng ảnh rời rạc."
  },
  stations: [
    {
      id: "st1",
      step: "Trạm 1",
      icon: "📝",
      title: "Khởi động & Tạo 4 trang chiếu",
      sgk: "Hình 26 - Tr.32",
      desc: "Mở PowerPoint, tạo 4 trang chiếu giới thiệu cảnh đẹp địa phương (hoặc Trường em), gõ tiếng Việt có chữ hoa và chữ thường.",
      points: 100
    },
    {
      id: "st2",
      step: "Trạm 2",
      icon: "🖼️",
      title: "Chèn hình ảnh minh họa",
      sgk: "Hình 26 - Tr.32",
      desc: "Chèn ảnh đúng chủ đề vào từng trang chiếu, căn vị trí gọn gàng không che mất chữ.",
      points: 100
    },
    {
      id: "st3",
      step: "Trạm 3",
      icon: "💾",
      title: "Lưu tệp vào đúng thư mục",
      sgk: "Hình 27 - Tr.33",
      desc: "Chọn File → Save, mở đúng thư mục của em và đặt tên tệp rõ ràng (ví dụ: Canh dep que huong / Truong em).",
      points: 100
    },
    {
      id: "st4",
      step: "Trạm 4",
      icon: "❎",
      title: "Thoát an toàn & Chia sẻ",
      sgk: "SGK Tr.33",
      desc: "Nhấp biểu tượng X ở góc trên phải để thoát phần mềm sau khi đã lưu, sẵn sàng chia sẻ sản phẩm.",
      points: 100
    }
  ],
  practiceOrderQuestion: {
    id: "p1",
    badge: "📖 CÂU HỎI 1 - TRANG 33 SGK",
    title: "Để lưu bài trình chiếu vào thư mục của em và thoát phần mềm an toàn, em thực hiện thứ tự nào đúng nhất?",
    options: [
      { id: "A", text: "Chọn File → Save → Chọn thư mục & gõ tên tệp → Bấm Save → Nhấp nút X để thoát" },
      { id: "B", text: "Nhấp nút X tắt luôn phần mềm rồi mới tìm lại bài" },
      { id: "C", text: "Rút dây nguồn máy tính ngay sau khi gõ xong" },
      { id: "D", text: "Xóa hết các trang chiếu rồi bấm Save" }
    ],
    correctIdx: 0,
    points: 100,
    explain: "Đáp án A chính xác! Luôn lưu tệp (File → Save) vào đúng thư mục trước rồi mới nhấp dấu X để thoát phần mềm."
  },
  gammaPresets: [
    {
      id: "quehuong",
      topicLabel: "🏞️ Cảnh đẹp quê hương em",
      promptText: "Tạo bài trình chiếu 4 trang giới thiệu cảnh đẹp quê hương dành cho học sinh lớp 4, ngôn ngữ gần gũi, có gợi ý vị trí chèn ảnh.",
      slides: [
        { no: 1, title: "Trang 1: Trang bìa", body: "Tiêu đề: CẢNH ĐẸP QUÊ HƯƠNG EM • Nhóm thực hiện: Lớp 4 • Ảnh toàn cảnh địa phương." },
        { no: 2, title: "Trang 2: Di tích / Danh thắng nổi bật", body: "Giới thiệu 1 địa điểm tiêu biểu (tên gọi, vị trí, nét đẹp đặc trưng) + 1 ảnh minh họa." },
        { no: 3, title: "Trang 3: Hoạt động lễ hội & Ẩm thực", body: "Nét văn hóa truyền thống và món ngon quê hương + ảnh sinh hoạt cộng đồng." },
        { no: 4, title: "Trang 4: Thông điệp giữ gìn", body: "Em yêu quê hương và chung tay bảo vệ môi trường xanh – sạch – đẹp. Cảm ơn!" }
      ]
    },
    {
      id: "truongem",
      topicLabel: "🏫 Giới thiệu Trường em",
      promptText: "Tạo bài trình chiếu 4 trang giới thiệu ngôi trường tiểu học thân yêu của em, bố cục rõ ràng cho học sinh lớp 4.",
      slides: [
        { no: 1, title: "Trang 1: Trang bìa", body: "Tiêu đề: NGÔI TRƯỜNG THÂN YÊU • Họ tên học sinh • Ảnh cổng trường rực rỡ." },
        { no: 2, title: "Trang 2: Không gian lớp học & Thư viện", body: "Giới thiệu phòng học, thư viện xanh, phòng Tin học hiện đại + ảnh hoạt động." },
        { no: 3, title: "Trang 3: Thầy cô và bạn bè", body: "Những giờ học vui vẻ, hoạt động ngoại khóa và phong trào Đội thiếu niên." },
        { no: 4, title: "Trang 4: Lời hứa học tốt", body: "Tự hào là học sinh của trường, chăm ngoan học giỏi. Cảm ơn thầy cô và các bạn!" }
      ]
    },
    {
      id: "moitruong",
      topicLabel: "🌱 Bảo vệ môi trường xanh",
      promptText: "Tạo bài trình chiếu 4 trang tuyên truyền phân loại rác và trồng cây xanh ở trường học cho học sinh tiểu học.",
      slides: [
        { no: 1, title: "Trang 1: Trang bìa", body: "Tiêu đề: CHUNG TAY BẢO VỆ MÔI TRƯỜNG • Ảnh Trái Đất xanh tươi." },
        { no: 2, title: "Trang 2: Thực trạng cần quan tâm", body: "Vì sao không nên xả rác bừa bãi ở sân trường và lớp học?" },
        { no: 3, title: "Trang 3: 3 Việc nhỏ mỗi ngày", body: "Bỏ rác đúng nơi quy định • Tắt điện khi ra khỏi phòng • Chăm sóc cây xanh." },
        { no: 4, title: "Trang 4: Thông điệp kết thúc", body: "Mỗi hành động nhỏ tạo nên ngôi trường xanh. Cảm ơn đã lắng nghe!" }
      ]
    }
  ],
  summaryCards: [
    {
      badge: "BƯỚC 1 • SOẠN TIẾNG VIỆT",
      color: "#14213d",
      bg: "#f1f5f9",
      title: "Gõ chữ hoa, chữ thường & Ảnh",
      desc: "Tạo các trang chiếu có tiêu đề, nội dung <b>tiếng Việt đúng chính tả</b> và <b>chèn ảnh minh họa</b> phù hợp chủ đề."
    },
    {
      badge: "BƯỚC 2 • LƯU & THOÁT",
      color: "#16a34a",
      bg: "#f0fdf4",
      title: "Lưu đúng thư mục rồi mới thoát",
      desc: "Chọn <b>File → Save</b>, đặt tên gợi nhớ vào đúng thư mục của em trước khi nhấp nút <b>X</b> thoát phần mềm."
    },
    {
      badge: "BƯỚC 3 • AI HỖ TRỢ (NLS)",
      color: "#d97706",
      bg: "#fffbeb",
      title: "Dùng AI gợi ý có chọn lọc",
      desc: "Có thể tham khảo <b>Gamma AI</b> để lên dàn ý nhanh, sau đó <b>tự kiểm tra và chỉnh sửa</b> theo ý tưởng của em."
    }
  ],
  consolidationQuiz: [
    {
      id: "c1",
      question: "Để lưu tệp bài trình chiếu lần đầu tiên vào thư mục của em, em chọn lệnh nào?",
      options: ["A. File → Save", "B. Nhấp ngay nút X", "C. Insert → Pictures", "D. Home → New Slide"],
      correctIdx: 0,
      points: 100
    },
    {
      id: "c2",
      question: "Nút lệnh nào giúp em thoát khỏi phần mềm trình chiếu PowerPoint?",
      options: ["A. Biểu tượng đĩa mềm 💾", "B. Biểu tượng dấu X ở góc trên phải", "C. Biểu tượng dấu trừ —", "D. Biểu tượng kính lúp 🔍"],
      correctIdx: 1,
      points: 100
    },
    {
      id: "c3",
      question: "Khi đặt tên tệp bài trình chiếu về trường học của em, tên nào hợp lý và dễ tìm nhất?",
      options: ["A. abc123", "B. khongbiet", "C. Truong em", "D. 1111"],
      correctIdx: 2,
      points: 100
    },
    {
      id: "c4",
      question: "Trong bài trình chiếu gồm 4 trang giới thiệu cảnh đẹp, trang đầu tiên (Trang bìa) thường có gì?",
      options: ["A. Tên chủ đề bài trình chiếu và người thực hiện", "B. Chỉ để trắng hoàn toàn", "C. Lời cảm ơn kết thúc", "D. Danh sách mật khẩu máy tính"],
      correctIdx: 0,
      points: 100
    },
    {
      id: "c5",
      question: "Khi sử dụng công cụ AI như Gamma.com.AI để gợi ý bài thuyết trình, em cần lưu ý điều gì?",
      options: ["A. Không cần đọc lại nội dung AI tạo", "B. Đọc kiểm tra và chỉnh sửa lại cho đúng ý mình", "C. Chỉ viết toàn số 0 cho AI", "D. Không bao giờ lưu bài"],
      correctIdx: 1,
      points: 100
    },
    {
      id: "c6",
      question: "Nếu lỡ bấm nút X thoát khi chưa lưu các thay đổi mới nhất, phần mềm thường làm gì?",
      options: ["A. Tự động xóa toàn bộ máy tính", "B. Hiện hộp thoại hỏi có muốn Save (Lưu) không", "C. Đổi màu màn hình sang đen vĩnh viễn", "D. Tự in ra giấy ngay lập tức"],
      correctIdx: 1,
      points: 100
    }
  ]
};
