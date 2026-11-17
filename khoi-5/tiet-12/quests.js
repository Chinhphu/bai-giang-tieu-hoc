/**
 * NGÂN HÀNG NHIỆM VỤ & MẢNH GHÉP ĐỀ THI ĐẤU TIẾT 12
 * Môn: Tin học 5 (KNTT) - Bài 6 (Tiết 2): Thực hành Định dạng kí tự và Bố trí hình ảnh trong văn bản
 * Hoạt động: "XƯỞNG THIẾT KẾ ĐỀ BÀI & ĐẤU TRƯỜNG THỰC HÀNH CHÉO"
 * Sử dụng 1 Template Word chuẩn duy nhất tương thích 100% mọi mảnh ghép yêu cầu.
 */

window.QUESTS_DATA = {
  title: "Tin học 5 – Bài 6: Định dạng kí tự và bố trí hình ảnh trong văn bản (Tiết 2: Xưởng Thiết Kế Đề & Thực Hành Chéo)",

  // 1. Khởi động: Trò chơi ghép nối biểu tượng lệnh Word & Vấn đáp
  warmup: {
    title: "Khởi động: Thử tài ghép nối biểu tượng lệnh Word",
    description: "Nhấp chọn 1 biểu tượng lệnh Word ở cột trái rồi ghép với công dụng chính xác ở cột phải (+50 Xu/cặp đúng).",
    pairs: [
      {
        id: "match-1",
        icon: "Calibri ▾",
        name: "Hộp Phông chữ (Font)",
        desc: "Đổi kiểu chữ cho tiêu đề và đoạn văn bản (Arial, Times New Roman, Tahoma, Verdana...)"
      },
      {
        id: "match-2",
        icon: "A ▾ (Font Color)",
        name: "Nút Màu chữ (Font Color)",
        desc: "Đổi màu sắc nổi bật cho tiêu đề và các từ khóa quan trọng (Đỏ, Xanh dương, Tím, Cam...)"
      },
      {
        id: "match-3",
        icon: "B / I / U",
        name: "Bold, Italic, Underline",
        desc: "In đậm (B) để nhấn mạnh, In nghiêng (I) cho câu trích dẫn, Gạch chân (U) cho đề mục"
      },
      {
        id: "match-4",
        icon: "⮑ Square / Tight",
        name: "Layout Options (Wrap Text)",
        desc: "Bố trí dòng chữ tự động chảy bao quanh hình ảnh gọn gàng, không làm gãy dòng văn bản"
      }
    ],
    questions: [
      {
        id: "warmup-q1",
        label: "Câu hỏi 1 (Nhóm Font):",
        question: "Muốn đổi phông chữ và màu chữ cho tiêu đề bài viết, em sử dụng 2 nút lệnh nào trong nhóm Font trên thẻ Home?",
        answer: "Hộp chọn <b>Phông chữ (Font)</b> và nút <b>Màu chữ (Font Color)</b> (biểu tượng chữ A có vạch màu phía dưới)."
      },
      {
        id: "warmup-q2",
        label: "Câu hỏi 2 (Bố trí hình ảnh):",
        question: "Tại sao khi chèn ảnh minh họa vào văn bản, chúng ta nên ưu tiên chọn kiểu bố trí Square?",
        answer: "Vì kiểu <b>Square</b> giúp <b>chữ chảy bao quanh hình ảnh</b> khít khao dạng khung vuông, không làm gãy dòng vô lý và tận dụng tối đa diện tích trang."
      }
    ]
  },

  // 2. TEMPLATE VĂN BẢN MẪU DÙNG CHUNG CHO MỌI TỔ (ĐÁP ỨNG 100% MẢNH GHÉP YÊU CẦU)
  sharedTemplate: {
    id: "master-template-tiet12",
    name: "Cẩm Nang An Toàn & Văn Minh Internet",
    titleText: "CẨM NANG AN TOÀN VÀ VĂN MINH TRÊN MẠNG INTERNET",
    introParagraph: "Internet mang lại kho tàng tri thức rộng lớn giúp học sinh học tập, giải trí và kết nối với bạn bè khắp nơi. Tuy nhiên, môi trường mạng cũng tiềm ẩn nhiều rủi ro nếu chúng ta thiếu cảnh giác khi sử dụng máy tính. Vì vậy, mỗi học sinh lớp 5 cần thực hiện nghiêm túc 3 nguyên tắc vàng dưới đây:",
    numberedItems: [
      "1. Bảo mật thông tin: Tuyệt đối không chia sẻ mật khẩu, địa chỉ nhà hay số điện thoại cho người lạ trên mạng.",
      "2. Cảnh giác tệp lạ: Không tự ý nhấp vào đường link lạ hoặc tải tệp không rõ nguồn gốc để phòng tránh virus.",
      "3. Ứng xử văn minh: Luôn dùng lời lẽ lịch sự, tôn trọng mọi người và báo ngay cho thầy cô, cha mẹ khi gặp nội dung xấu."
    ],
    quoteText: "\"Hãy là người sử dụng Internet thông minh, an toàn và văn minh mỗi ngày!\"",
    imageHint: "Ảnh minh họa đã được chèn sẵn ở cuối văn bản mẫu (hãy chọn kiểu Wrap Text và kéo tới vị trí theo đề bài)",
    imageSrc: "../../assets/images/minh-hoa/chrome.png",
    getRawText() {
      return [
        this.titleText,
        "",
        this.introParagraph,
        ...this.numberedItems,
        this.quoteText
      ].join("\n");
    }
  },

  // 3. KHO ĐỀ CHUNG: CÁC MẢNH GHÉP NHIỆM VỤ (4 NHÓM KỸ NĂNG)
  // Mỗi mảnh ghép chỉ được 1 tổ bốc dùng 1 lần, khi lấy khỏi kho thì các tổ khác không được lấy nữa.
  questBricks: {
    // NHÓM 1: ĐỊNH DẠNG TIÊU ĐỀ (HEADING BRICKS - MÀU ĐỎ / CORAL)
    headings: [
      {
        id: "h-1",
        category: "heading",
        categoryLabel: "Tiêu đề",
        name: "Arial 20 Đỏ Đậm Giữa",
        icon: "🅰️",
        color: "#ef4444",
        desc: "Tiêu đề: Phông Arial, Cỡ 20pt, In đậm (B), Màu Đỏ tươi (Red), Căn giữa (Center)"
      },
      {
        id: "h-2",
        category: "heading",
        categoryLabel: "Tiêu đề",
        name: "Times 22 Xanh Dương Đậm Giữa",
        icon: "🔠",
        color: "#ef4444",
        desc: "Tiêu đề: Phông Times New Roman, Cỡ 22pt, In đậm (B), Màu Xanh dương (Blue), Căn giữa (Center)"
      },
      {
        id: "h-3",
        category: "heading",
        categoryLabel: "Tiêu đề",
        name: "Tahoma 20 Tím Đậm Gạch Chân",
        icon: "🎨",
        color: "#ef4444",
        desc: "Tiêu đề: Phông Tahoma, Cỡ 20pt, In đậm (B) + Gạch chân (U), Màu Tím (Purple), Căn giữa (Center)"
      },
      {
        id: "h-4",
        category: "heading",
        categoryLabel: "Tiêu đề",
        name: "Verdana 18 Xanh Lá Đậm Nghiêng",
        icon: "🌿",
        color: "#ef4444",
        desc: "Tiêu đề: Phông Verdana, Cỡ 18pt, In đậm (B) + In nghiêng (I), Màu Xanh lá (Green), Căn giữa (Center)"
      },
      {
        id: "h-5",
        category: "heading",
        categoryLabel: "Tiêu đề",
        name: "Times 20 Cam Đậm Gạch Chân",
        icon: "🍊",
        color: "#ef4444",
        desc: "Tiêu đề: Phông Times New Roman, Cỡ 20pt, In đậm (B) + Gạch chân (U), Màu Cam (Orange), Căn giữa (Center)"
      },
      {
        id: "h-6",
        category: "heading",
        categoryLabel: "Tiêu đề",
        name: "Calibri 22 Đỏ Đậm Nghiêng",
        icon: "💎",
        color: "#ef4444",
        desc: "Tiêu đề: Phông Calibri, Cỡ 22pt, In đậm (B) + In nghiêng (I), Màu Đỏ sẫm (Dark Red), Căn giữa (Center)"
      }
    ],

    // NHÓM 2: ĐỊNH DẠNG ĐOẠN VĂN (BODY BRICKS - MÀU VÀNG / GOLD)
    bodies: [
      {
        id: "b-1",
        category: "body",
        categoryLabel: "Đoạn văn",
        name: "Times 13 & Nghiêng Câu Khẩu Hiệu",
        icon: "📄",
        color: "#f59e0b",
        desc: "Thân bài: Phông Times New Roman, Cỡ 13pt, Căn đều 2 bên (Justify); In nghiêng (I) câu khẩu hiệu cuối bài"
      },
      {
        id: "b-2",
        category: "body",
        categoryLabel: "Đoạn văn",
        name: "Arial 12 & In Đậm 3 Nguyên Tắc",
        icon: "📑",
        color: "#f59e0b",
        desc: "Thân bài: Phông Arial, Cỡ 12pt, Căn đều 2 bên (Justify); In đậm (B) cụm từ đầu của mục 1, 2, 3"
      },
      {
        id: "b-3",
        category: "body",
        categoryLabel: "Đoạn văn",
        name: "Tahoma 12 & Gạch Chân 3 Nguyên Tắc",
        icon: "📜",
        color: "#f59e0b",
        desc: "Thân bài: Phông Tahoma, Cỡ 12pt, Căn đều 2 bên (Justify); Gạch chân (U) cụm từ đầu của mục 1, 2, 3"
      },
      {
        id: "b-4",
        category: "body",
        categoryLabel: "Đoạn văn",
        name: "Calibri 13 & Đậm Nghiêng Khẩu Hiệu",
        icon: "📋",
        color: "#f59e0b",
        desc: "Thân bài: Phông Calibri, Cỡ 13pt, Căn đều 2 bên (Justify); In đậm (B) + In nghiêng (I) câu khẩu hiệu cuối"
      },
      {
        id: "b-5",
        category: "body",
        categoryLabel: "Đoạn văn",
        name: "Verdana 12 & Màu Xanh Câu Khẩu Hiệu",
        icon: "📝",
        color: "#f59e0b",
        desc: "Thân bài: Phông Verdana, Cỡ 12pt, Căn trái (Left); Đổi màu Xanh dương và In đậm câu khẩu hiệu cuối"
      },
      {
        id: "b-6",
        category: "body",
        categoryLabel: "Đoạn văn",
        name: "Times 14 & Đậm Mục 1-2-3 + Nghiêng Kết",
        icon: "📚",
        color: "#f59e0b",
        desc: "Thân bài: Phông Times New Roman, Cỡ 14pt, Căn đều 2 bên; In đậm (B) số 1-2-3 và In nghiêng (I) câu cuối"
      }
    ],

    // NHÓM 3: BỐ TRÍ HÌNH ẢNH (IMAGE BRICKS - MÀU XANH LÁ / MINT)
    images: [
      {
        id: "img-1",
        category: "image",
        categoryLabel: "Hình ảnh",
        name: "Ảnh Square Đặt Sát Lề Phải",
        icon: "🖼️",
        color: "#10b981",
        desc: "Hình ảnh: Chọn Layout Options → Square (chữ bao quanh vuông vức), kéo đặt sát LỀ PHẢI của đoạn văn"
      },
      {
        id: "img-2",
        category: "image",
        categoryLabel: "Hình ảnh",
        name: "Ảnh Square Đặt Sát Lề Trái",
        icon: "🖼️",
        color: "#10b981",
        desc: "Hình ảnh: Chọn Layout Options → Square (chữ bao quanh vuông vức), kéo đặt sát LỀ TRÁI của đoạn văn"
      },
      {
        id: "img-3",
        category: "image",
        categoryLabel: "Hình ảnh",
        name: "Ảnh Tight Ôm Sát Góc Phải",
        icon: "🖼️",
        color: "#10b981",
        desc: "Hình ảnh: Chọn Layout Options → Tight (chữ ôm sát viền ảnh), kéo đặt ở góc bên PHẢI của 3 nguyên tắc"
      },
      {
        id: "img-4",
        category: "image",
        categoryLabel: "Hình ảnh",
        name: "Ảnh Top & Bottom Giữa Bài",
        icon: "🖼️",
        color: "#10b981",
        desc: "Hình ảnh: Chọn Layout Options → Top and Bottom (ngắt dòng trên và dưới), đặt nằm giữa đoạn mở đầu và mục 1"
      },
      {
        id: "img-5",
        category: "image",
        categoryLabel: "Hình ảnh",
        name: "Ảnh Square Giữa Trang Văn Bản",
        icon: "🖼️",
        color: "#10b981",
        desc: "Hình ảnh: Chọn Layout Options → Square, thu nhỏ vừa vặn và đặt ở chính giữa lòng các dòng nguyên tắc 1-2-3"
      },
      {
        id: "img-6",
        category: "image",
        categoryLabel: "Hình ảnh",
        name: "Ảnh Tight Đặt Sát Lề Trái",
        icon: "🖼️",
        color: "#10b981",
        desc: "Hình ảnh: Chọn Layout Options → Tight (chữ ôm sát mép ảnh), đặt sát LỀ TRÁI ngang hàng với mục 1, 2, 3"
      }
    ],

    // NHÓM 4: MẢNH THỬ THÁCH BONUS (SPECIAL BONUS BRICKS - MÀU TÍM / PURPLE)
    bonuses: [
      {
        id: "bon-1",
        category: "bonus",
        categoryLabel: "Bonus",
        name: "Viền Ảnh Nghệ Thuật (Picture Border)",
        icon: "⭐",
        color: "#8b5cf6",
        desc: "Thưởng +50 Xu: Chọn ảnh → Thẻ Picture Format → Picture Border → Tạo viền màu Đỏ hoặc Xanh cho ảnh"
      },
      {
        id: "bon-2",
        category: "bonus",
        categoryLabel: "Bonus",
        name: "Khung Ảnh Đổ Bóng (Picture Styles)",
        icon: "⭐",
        color: "#8b5cf6",
        desc: "Thưởng +50 Xu: Chọn ảnh → Thẻ Picture Format → Picture Styles → Chọn 1 kiểu khung ảnh bo góc hoặc đổ bóng"
      },
      {
        id: "bon-3",
        category: "bonus",
        categoryLabel: "Bonus",
        name: "Dấu Đầu Dòng Tự Động (Bullets)",
        icon: "⭐",
        color: "#8b5cf6",
        desc: "Thưởng +50 Xu: Bôi đen 3 nguyên tắc → Thẻ Home → Nút Bullets → Tạo dấu chấm tròn hoặc tích xanh đầu dòng"
      },
      {
        id: "bon-4",
        category: "bonus",
        categoryLabel: "Bonus",
        name: "Bút Dạ Quang Nổi Bật (Highlight)",
        icon: "⭐",
        color: "#8b5cf6",
        desc: "Thưởng +50 Xu: Bôi đen câu khẩu hiệu cuối bài → Nhấp nút Text Highlight Color tô nền màu Vàng chanh"
      },
      {
        id: "bon-5",
        category: "bonus",
        categoryLabel: "Bonus",
        name: "Căn Giữa Câu Khẩu Hiệu Cuối",
        icon: "⭐",
        color: "#8b5cf6",
        desc: "Thưởng +50 Xu: Đưa câu khẩu hiệu cuối bài ra Căn giữa (Center) và tăng cỡ chữ lên 15pt thật nổi bật"
      },
      {
        id: "bon-6",
        category: "bonus",
        categoryLabel: "Bonus",
        name: "Thụt Lề Đoạn Mở Đầu (Tab)",
        icon: "⭐",
        color: "#8b5cf6",
        desc: "Thưởng +50 Xu: Đặt con trỏ ở đầu đoạn văn mở đầu → Nhấn phím Tab để thụt đầu dòng gọn gàng chuẩn văn bản"
      }
    ]
  }
};

// Tương thích ngược
window.QUESTS_DATA.legoBricks = window.QUESTS_DATA.questBricks;
