/**
 * Ngân hàng dữ liệu Tiết 15 Khối 4: Bài 8 - Định dạng văn bản trên trang chiếu (Tiết 2)
 * Nguồn dữ liệu duy nhất (Single Source of Truth) cho toàn bộ tiết học.
 * Chạy 100% Offline-first.
 */
window.QUESTS_DATA = {
  warmupWheel: [
    {
      id: "w1",
      question: "Câu 1: Để định dạng phông chữ, cỡ chữ, màu chữ trên trang chiếu, ta vào dải lệnh nào?",
      options: ["A. Insert", "B. Home (nhóm Font)", "C. Transitions", "D. Slide Show"],
      correctIdx: 1,
      explain: "Các nút lệnh định dạng chữ nằm trong nhóm Font của dải lệnh Home."
    },
    {
      id: "w2",
      question: "Câu 2: Nút lệnh chữ I trong nhóm Font dùng để làm gì?",
      options: ["A. In đậm", "B. Gạch chân", "C. In nghiêng", "D. Đổi cỡ chữ"],
      correctIdx: 2,
      explain: "Nút I (Italic) dùng để tạo kiểu chữ in nghiêng."
    },
    {
      id: "w3",
      question: "Câu 3: Trước khi đổi màu hoặc tăng cỡ chữ cho tiêu đề, em cần làm gì đầu tiên?",
      options: ["A. Chọn (bôi đen) phần tiêu đề", "B. Bấm nút X thoát PowerPoint", "C. Lưu tệp", "D. Tạo trang chiếu mới"],
      correctIdx: 0,
      explain: "Luôn phải chọn phần văn bản cần định dạng trước rồi mới bấm nút lệnh."
    },
    {
      id: "w4",
      question: "Câu 4: Công cụ nào dùng để tạo gạch đầu dòng cho danh sách các ý?",
      options: ["A. Font Color", "B. Font Size", "C. Bullets", "D. Bold (B)"],
      correctIdx: 2,
      explain: "Nút Bullets trong nhóm Paragraph dùng để tạo hoặc bỏ dấu gạch đầu dòng."
    },
    {
      id: "w5",
      question: "Câu 5: Biểu tượng đĩa mềm 💾 ở góc trên trái màn hình PowerPoint dùng để làm gì?",
      options: ["A. Mở tệp mới", "B. Lưu (Save) tệp trình chiếu", "C. Đổi màu chữ", "D. Xóa trang chiếu"],
      correctIdx: 1,
      explain: "Nháy nút Save (đĩa mềm) giúp lưu lại toàn bộ thay đổi vào tệp trình chiếu."
    }
  ],
  orderCards: [
    {
      id: "ord1",
      title: "Đơn 1 • Tên trường",
      spec: "Phông chữ: Times New Roman • Cỡ chữ: 50 • Màu chữ: Xanh.",
      previewText: "TRƯỜNG TIỂU HỌC THÂN YÊU",
      previewStyle: "font-family:'Times New Roman',serif;font-size:28px;font-weight:900;color:#2563eb;",
      points: 100
    },
    {
      id: "ord2",
      title: "Đơn 2 • Địa chỉ trường",
      spec: "Phông chữ: Times New Roman • Cỡ chữ: 30 • Màu chữ: Đỏ.",
      previewText: "Địa chỉ: Khu phố 3, Phường Trung Tâm",
      previewStyle: "font-family:'Times New Roman',serif;font-size:21px;font-weight:700;color:#dc2626;",
      points: 100
    },
    {
      id: "ord3",
      title: "Đơn 3 • Chú thích cho ảnh trường",
      spec: "Phông chữ: Times New Roman • Cỡ chữ: 30 • Màu chữ: Tùy chọn hài hòa.",
      previewText: "Cổng trường rợp bóng cây xanh buổi sáng",
      previewStyle: "font-family:'Times New Roman',serif;font-size:21px;font-style:italic;color:#7c3aed;",
      points: 100
    },
    {
      id: "ord4",
      title: "Đơn 4 • Hoạt động văn nghệ (Bullets)",
      spec: "Phông chữ: Times New Roman • Cỡ chữ: 30 • Màu tùy chọn • Có định dạng gạch đầu dòng (Bullets).",
      previewText: "• Múa hát chào mừng 20/11\n• Hội thi kể chuyện theo sách\n• Biểu diễn thời trang tái chế",
      previewStyle: "font-family:'Times New Roman',serif;font-size:20px;font-weight:700;color:#0f766e;",
      points: 100
    },
    {
      id: "ord5",
      title: "Đơn 5 • Tình cảm của em với trường",
      spec: "Phông chữ: Times New Roman • Cỡ chữ: 30 • Màu chữ: Xanh.",
      previewText: "Em rất yêu mái trường, thầy cô và các bạn lớp 4!",
      previewStyle: "font-family:'Times New Roman',serif;font-size:21px;font-weight:800;color:#16a34a;",
      points: 100
    }
  ],
  familyProjectSlides: [
    { no: 1, title: "1. GIA ĐÌNH EM", desc: "Giới thiệu chung về gia đình nhỏ ấm áp cùng ảnh đại diện gia đình." },
    { no: 2, title: "2. BỐ CỦA EM", desc: "Họ tên, nghề nghiệp, sở thích và gạch đầu dòng những điều em yêu quý ở bố." },
    { no: 3, title: "3. MẸ CỦA EM", desc: "Họ tên, nghề nghiệp, sở thích và lời cảm ơn dành cho mẹ." },
    { no: 4, title: "4. EM VÀ GIA ĐÌNH", desc: "Giới thiệu bản thân em, ước mơ và lời hứa chăm ngoan học giỏi." }
  ],
  summaryCards: [
    {
      badge: "Ý 1 • MỞ & LƯU TỆP",
      color: "#14213d",
      bg: "#f1f5f9",
      title: "Mở tệp cũ để chỉnh sửa",
      desc: "Chọn <b>File → Open</b> để mở lại tệp có sẵn, chỉnh sửa xong bấm <b>Save</b> trước khi thoát <b>X</b>."
    },
    {
      badge: "Ý 2 • GẠCH ĐẦU DÒNG",
      color: "#ea580c",
      bg: "#fff7ed",
      title: "Dùng công cụ Bullets",
      desc: "Chọn phần văn bản → Nháy nút <b>Bullets</b> để thêm (hoặc bỏ) dấu đầu dòng và chọn màu đầu dòng phù hợp."
    },
    {
      badge: "Ý 3 • ĐỒNG BỘ ĐẸP MẮT",
      color: "#16a34a",
      bg: "#f0fdf4",
      title: "Kết hợp phông, cỡ, màu & ảnh",
      desc: "Phối hợp đúng <b>phông chữ, cỡ chữ, màu chữ</b> theo từng mục nội dung giúp trang chiếu rõ ràng, sinh động."
    }
  ],
  consolidationQuiz: [
    {
      id: "c1",
      question: "Để mở lại tệp trình chiếu “Cảnh đẹp quê hương” đã lưu từ bài 7, em thực hiện lệnh nào?",
      options: ["A. File → Open", "B. File → New", "C. Nhấp dấu X", "D. Home → Bullets"],
      correctIdx: 0,
      points: 100
    },
    {
      id: "c2",
      question: "Muốn BỎ dấu gạch đầu dòng đã tạo trên một đoạn văn bản, em làm thế nào?",
      options: ["A. Xóa cả đoạn văn bản", "B. Chọn đoạn văn bản đó rồi nháy lại vào nút lệnh Bullets", "C. Tắt PowerPoint", "D. Đổi phông chữ"],
      correctIdx: 1,
      points: 100
    },
    {
      id: "c3",
      question: "Trong bài thực hành “Trường em” (SGK Tr.38), mục nào yêu cầu định dạng gạch đầu dòng?",
      options: ["A. Tên trường", "B. Địa chỉ", "C. Hoạt động văn nghệ", "D. Tên tệp"],
      correctIdx: 2,
      points: 100
    },
    {
      id: "c4",
      question: "Khi thiết kế bài trình chiếu 4 trang về “Gia đình em”, kích thước chữ tiêu đề trang nên như thế nào so với nội dung?",
      options: ["A. Lớn hơn và nổi bật hơn phần nội dung", "B. Nhỏ hơn phần nội dung", "C. Trùng màu với nền trang chiếu", "D. Không cần tiêu đề"],
      correctIdx: 0,
      points: 100
    },
    {
      id: "c5",
      question: "Để đổi màu của chính dấu gạch đầu dòng (Bullets), em mở mũi tên bên cạnh nút Bullets rồi chọn mục nào?",
      options: ["A. Bullets and Numbering…", "B. Save As", "C. Close", "D. Print"],
      correctIdx: 0,
      points: 100
    },
    {
      id: "c6",
      question: "Sau khi hoàn thành định dạng xong trang chiếu “Trường em”, bước cuối cùng không thể quên là gì?",
      options: ["A. Lưu tệp (Save) trước khi thoát phần mềm", "B. Xóa hết chữ đi", "C. Rút chuột máy tính", "D. Đóng ngay không cần lưu"],
      correctIdx: 0,
      points: 100
    }
  ]
};
