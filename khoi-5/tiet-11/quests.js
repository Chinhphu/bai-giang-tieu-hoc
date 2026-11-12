/**
 * NGÂN HÀNG NHIỆM VỤ & CÂU HỎI TIẾT 11
 * Môn: Tin học 5 (KNTT) - Bài 6 (Tiết 1): Định dạng kí tự và bố trí hình ảnh trong văn bản
 * 100% Chạy Offline-First không lỗi CORS trên file:///
 */

window.QUESTS_DATA = {
  title: "Tin học 5 – Bài 6: Định dạng kí tự và bố trí hình ảnh trong văn bản (Tiết 1)",

  // 1. Hoạt động Khởi động (So sánh Hình 28 thô vs Nhận xét An & Minh Hình 29, 30 SGK tr.30)
  warmup: {
    title: "Khởi động: Bắt mạch văn bản làm kem dưa hấu",
    description: "Quan sát văn bản Hình 28 (chưa định dạng) và so sánh với nhận xét của bạn An và Minh (Hình 29, 30 SGK tr.30).",
    questions: [
      {
        id: "warmup-q1",
        label: "Câu hỏi 1 (Nhận xét của Minh):",
        question: "Bạn Minh đã chỉ ra 2 điều tích cực và 1 điều chưa hợp lý nào về phần chữ trong văn bản Hình 28?",
        answer: "• Tích cực: Đã gõ đầy đủ nội dung nguyên liệu và các bước làm kem.<br>• Chưa hợp lý: Tiêu đề và các đề mục chưa nổi bật (cỡ chữ bé, cùng màu đen, chưa in đậm nên khó đọc lướt)."
      },
      {
        id: "warmup-q2",
        label: "Câu hỏi 2 (Nhận xét của An):",
        question: "Bạn An có mong muốn thay đổi điều gì về vị trí của hình ảnh minh họa que kem?",
        answer: "• Hiện tại hình ảnh nằm cắt ngang dòng chữ làm đứt quãng bài viết.<br>• Mong muốn: Bố trí lại để văn bản chảy bao quanh hình ảnh (Square) giúp trang văn bản gọn gàng, đẹp mắt hơn."
      }
    ]
  },

  // 2. Chặng 1 - Mục 1a (Định dạng kí tự) & Sàn Cược Săn Bug (Vòng Kí Tự)
  stage1: {
    title: "Chặng 1: Định dạng kí tự (Thẻ Home → Nhóm Font)",
    theory: {
      heading: "1a. ĐỊNH DẠNG KÍ TỰ",
      rule: "Để định dạng kí tự, ta chọn phần văn bản cần định dạng, sau đó sử dụng các nút lệnh trong nhóm Font trên thẻ Home.",
      sgkQuestion: {
        question: "Nêu các bước để định dạng tiêu đề \"CÁCH LÀM KEM DƯA HẤU\" có cỡ chữ 18, in đậm và màu đỏ?",
        steps: [
          "Bước 1: Chọn (bôi đen) tiêu đề \"CÁCH LÀM KEM DƯA HẤU\".",
          "Bước 2: Trong thẻ Home, nhóm Font, chọn cỡ chữ 18 (hoặc gõ 18 rồi nhấn Enter).",
          "Bước 3: Nháy chuột vào nút B để in đậm.",
          "Bước 4: Nháy chuột vào nút Font Color và chọn màu Đỏ (Red)."
        ]
      }
    },
    tickets: [
      {
        id: "t1-1",
        teamId: 1,
        teamName: "Tổ 1",
        title: "TICKET 1.1: TIÊU ĐỀ NỔI BẬT",
        targetText: "CÁCH LÀM KEM DƯA HẤU",
        reqText: "• Phông chữ: Arial<br>• Cỡ chữ: 18pt<br>• Kiểu chữ: In đậm (B)<br>• Màu chữ: Đỏ (Red)",
        timeLimit: 45,
        rules: [
          {
            id: "r1-1-title-format",
            name: "Định dạng Tiêu đề (Arial, 18pt, In đậm, Màu Đỏ)",
            type: "paragraph_format",
            match: "CÁCH LÀM KEM DƯA HẤU",
            fontFamily: "Arial",
            fontSize: 18,
            bold: true,
            color: "RED"
          }
        ]
      },
      {
        id: "t1-2",
        teamId: 2,
        teamName: "Tổ 2",
        title: "TICKET 1.2: BỘ ĐỀ MỤC RÕ RÀNG",
        targetText: "Nguyên liệu: & Các bước thực hiện:",
        reqText: "• Cỡ chữ: 14pt<br>• Kiểu chữ: In đậm (B)<br>• Màu chữ: Xanh dương (Blue)",
        timeLimit: 45,
        rules: [
          {
            id: "r1-2-heading-1",
            name: "Đề mục 'Nguyên liệu:' (14pt, In đậm, Xanh dương)",
            type: "paragraph_format",
            match: "Nguyên liệu:",
            fontSize: 14,
            bold: true,
            color: "BLUE"
          },
          {
            id: "r1-2-heading-2",
            name: "Đề mục 'Các bước thực hiện:' (14pt, In đậm, Xanh dương)",
            type: "paragraph_format",
            match: "Các bước thực hiện:",
            fontSize: 14,
            bold: true,
            color: "BLUE"
          }
        ]
      },
      {
        id: "t1-3",
        teamId: 3,
        teamName: "Tổ 3",
        title: "TICKET 1.3: DÒNG LƯU Ý ĐẶC BIỆT",
        targetText: "Dòng 'Lưu ý: Thực hiện cẩn thận khi dùng dao...'",
        reqText: "• Kiểu chữ: In nghiêng (I) & Gạch chân (U)<br>• Màu chữ: Tím (Purple)",
        timeLimit: 45,
        rules: [
          {
            id: "r1-3-note-format",
            name: "Dòng Lưu ý (In nghiêng I, Gạch chân U, Màu Tím)",
            type: "paragraph_format",
            match: "Lưu ý:",
            italic: true,
            underline: true,
            color: "PURPLE"
          }
        ]
      },
      {
        id: "t1-4",
        teamId: 4,
        teamName: "Tổ 4",
        title: "TICKET 1.4: DANH SÁCH 4 BƯỚC THỰC HIỆN",
        targetText: "Bước 1 đến Bước 4",
        reqText: "• Các đoạn Bước 1, Bước 2, Bước 3, Bước 4 đều có định dạng In đậm (B) ở nhãn bước",
        timeLimit: 45,
        rules: [
          {
            id: "r1-4-step-1",
            name: "Đoạn Bước 1 có in đậm",
            type: "paragraph_format",
            match: "Bước 1:",
            bold: true
          },
          {
            id: "r1-4-step-2",
            name: "Đoạn Bước 2 có in đậm",
            type: "paragraph_format",
            match: "Bước 2:",
            bold: true
          },
          {
            id: "r1-4-step-3",
            name: "Đoạn Bước 3 có in đậm",
            type: "paragraph_format",
            match: "Bước 3:",
            bold: true
          },
          {
            id: "r1-4-step-4",
            name: "Đoạn Bước 4 có in đậm",
            type: "paragraph_format",
            match: "Bước 4:",
            bold: true
          }
        ]
      },
      {
        id: "t1-5",
        teamId: 5,
        teamName: "Tổ 5",
        title: "TICKET 1.5: TIÊU ĐỀ & DÒNG LƯU Ý",
        targetText: "Tiêu đề & Dòng Lưu ý",
        reqText: "• Tiêu đề: 18pt, In đậm, Màu Đỏ<br>• Dòng Lưu ý: In nghiêng, Gạch chân",
        timeLimit: 45,
        rules: [
          {
            id: "r1-5-title",
            name: "Tiêu đề (18pt, In đậm, Màu Đỏ)",
            type: "paragraph_format",
            match: "CÁCH LÀM KEM DƯA HẤU",
            fontSize: 18,
            bold: true,
            color: "RED"
          },
          {
            id: "r1-5-note",
            name: "Dòng Lưu ý (In nghiêng, Gạch chân)",
            type: "paragraph_format",
            match: "Lưu ý:",
            italic: true,
            underline: true
          }
        ]
      },
      {
        id: "t1-6",
        teamId: 6,
        teamName: "Tổ 6",
        title: "TICKET 1.6: ĐỀ MỤC & CÁC BƯỚC",
        targetText: "Đề mục Nguyên liệu & Bước 1, Bước 2",
        reqText: "• Đề mục 'Nguyên liệu:': 14pt, In đậm, Màu Xanh dương<br>• Bước 1, Bước 2: In đậm",
        timeLimit: 45,
        rules: [
          {
            id: "r1-6-h1",
            name: "Đề mục 'Nguyên liệu:' (14pt, In đậm, Xanh dương)",
            type: "paragraph_format",
            match: "Nguyên liệu:",
            fontSize: 14,
            bold: true,
            color: "BLUE"
          },
          {
            id: "r1-6-s1",
            name: "Bước 1 có in đậm",
            type: "paragraph_format",
            match: "Bước 1:",
            bold: true
          },
          {
            id: "r1-6-s2",
            name: "Bước 2 có in đậm",
            type: "paragraph_format",
            match: "Bước 2:",
            bold: true
          }
        ]
      },
      {
        id: "t1-demon",
        teamId: 99,
        teamName: "Tổ Quỷ 😈",
        title: "TICKET MA VƯƠNG: ĐỊNH DẠNG TỔNG HỢP",
        targetText: "Tiêu đề & Cả 2 Đề mục",
        reqText: "• Tiêu đề: 18pt, In đậm, Màu Đỏ<br>• Cả 2 đề mục ('Nguyên liệu:' & 'Các bước thực hiện:'): 14pt, In đậm, Màu Xanh dương",
        timeLimit: 45,
        rules: [
          {
            id: "r1-demon-title",
            name: "Tiêu đề: 18pt, In đậm, Màu Đỏ",
            type: "paragraph_format",
            match: "CÁCH LÀM KEM DƯA HẤU",
            fontSize: 18,
            bold: true,
            color: "RED"
          },
          {
            id: "r1-demon-h1",
            name: "Đề mục 'Nguyên liệu:': 14pt, In đậm, Màu Xanh",
            type: "paragraph_format",
            match: "Nguyên liệu:",
            fontSize: 14,
            bold: true,
            color: "BLUE"
          },
          {
            id: "r1-demon-h2",
            name: "Đề mục 'Các bước thực hiện:': 14pt, In đậm, Màu Xanh",
            type: "paragraph_format",
            match: "Các bước thực hiện:",
            fontSize: 14,
            bold: true,
            color: "BLUE"
          }
        ]
      }
    ]
  },

  // 3. Chặng 2 - Mục 1b (Bố trí hình ảnh) & Sàn Cược Săn Bug (Vòng Bố Cục Ảnh)
  stage2: {
    title: "Chặng 2: Bố trí hình ảnh trong văn bản (Layout Options → Square)",
    theory: {
      heading: "1b. BỐ TRÍ HÌNH ẢNH TRONG VĂN BẢN",
      rule: "Để bố trí hình ảnh trong văn bản, ta chọn hình ảnh, nháy chuột vào nút Layout Options và chọn kiểu Square để văn bản bao quanh hình ảnh.",
      sgkQuestion: {
        question: "Sau khi chèn hình ảnh vào văn bản, nếu muốn văn bản bao quanh hình ảnh thì em chọn nút lệnh nào trong Layout Options?",
        steps: [
          "Bước 1: Nháy chuột vào hình ảnh cần bố trí.",
          "Bước 2: Nháy chuột vào nút Layout Options xuất hiện ở góc trên bên phải hình ảnh.",
          "Bước 3: Trong nhóm With Text Wrapping, chọn kiểu Square (Bao quanh hình vuông)."
        ]
      }
    },
    tickets: [
      {
        id: "t2-1",
        teamId: 1,
        teamName: "Tổ 1",
        title: "TICKET 2.1: GIẢI CỨU ĐOẠN VĂN GÃY DÒNG",
        targetText: "Hình ảnh que kem dưa hấu",
        reqText: "• Nháy chuột chọn ảnh que kem dưa hấu<br>• Bấm nút Layout Options bên cạnh ảnh<br>• Chọn kiểu bố cục: Square (Bao quanh)<br>• Văn bản tự động chảy bao quanh ảnh mượt mà!",
        timeLimit: 45,
        rules: [
          {
            id: "r2-1-img-exists",
            name: "Có hình ảnh trong tài liệu",
            type: "image_exists"
          },
          {
            id: "r2-1-img-square",
            name: "Đã chọn kiểu bố cục Square (wp:wrapSquare)",
            type: "image_wrap",
            expectedWrap: "square"
          }
        ]
      },
      {
        id: "t2-2",
        teamId: 2,
        teamName: "Tổ 2",
        title: "TICKET 2.2: BỐ CỤC SQUARE GÓC PHẢI",
        targetText: "Hình ảnh que kem dưa hấu",
        reqText: "• Thiết lập kiểu bố cục Square cho hình ảnh<br>• Đảm bảo đoạn 'Nguyên liệu' chảy sát bên cạnh hình ảnh",
        timeLimit: 45,
        rules: [
          {
            id: "r2-2-img-exists",
            name: "Có hình ảnh trong tài liệu",
            type: "image_exists"
          },
          {
            id: "r2-2-img-square",
            name: "Đã chọn kiểu bố cục Square (wp:wrapSquare)",
            type: "image_wrap",
            expectedWrap: "square"
          }
        ]
      },
      {
        id: "t2-3",
        teamId: 3,
        teamName: "Tổ 3",
        title: "TICKET 2.3: BỐ CỤC SQUARE + KHÔNG LÀM MẤT CHỮ",
        targetText: "Hình ảnh và nội dung",
        reqText: "• Bố cục ảnh dạng Square<br>• Kiểm tra đầy đủ 4 bước thực hiện không bị xóa mất",
        timeLimit: 45,
        rules: [
          {
            id: "r2-3-img-square",
            name: "Đã chọn kiểu bố cục Square",
            type: "image_wrap",
            expectedWrap: "square"
          },
          {
            id: "r2-3-text-intact",
            name: "Văn bản các bước vẫn nguyên vẹn",
            type: "text_contains",
            expectedText: "thưởng thức"
          }
        ]
      },
      {
        id: "t2-4",
        teamId: 4,
        teamName: "Tổ 4",
        title: "TICKET 2.4: BỐ CỤC SQUARE HOÀN CHỈNH",
        targetText: "Toàn bài làm kem",
        reqText: "• Thiết lập Square cho ảnh que kem<br>• Tiêu đề giữ nguyên in đậm nổi bật",
        timeLimit: 45,
        rules: [
          {
            id: "r2-4-img-square",
            name: "Đã chọn kiểu bố cục Square",
            type: "image_wrap",
            expectedWrap: "square"
          },
          {
            id: "r2-4-title-bold",
            name: "Tiêu đề vẫn in đậm",
            type: "paragraph_format",
            match: "CÁCH LÀM KEM DƯA HẤU",
            bold: true
          }
        ]
      },
      {
        id: "t2-5",
        teamId: 5,
        teamName: "Tổ 5",
        title: "TICKET 2.5: BỐ CỤC SQUARE & ĐỀ MỤC",
        targetText: "Ảnh que kem & Đề mục",
        reqText: "• Thiết lập Square cho ảnh que kem<br>• Đề mục 'Nguyên liệu:' in đậm",
        timeLimit: 45,
        rules: [
          {
            id: "r2-5-img-square",
            name: "Đã chọn kiểu bố cục Square",
            type: "image_wrap",
            expectedWrap: "square"
          },
          {
            id: "r2-5-heading-bold",
            name: "Đề mục 'Nguyên liệu:' in đậm",
            type: "paragraph_format",
            match: "Nguyên liệu:",
            bold: true
          }
        ]
      },
      {
        id: "t2-6",
        teamId: 6,
        teamName: "Tổ 6",
        title: "TICKET 2.6: BỐ CỤC SQUARE & LƯU Ý",
        targetText: "Ảnh que kem & Dòng Lưu ý",
        reqText: "• Thiết lập Square cho ảnh que kem<br>• Giữ nguyên vẹn nội dung bài viết",
        timeLimit: 45,
        rules: [
          {
            id: "r2-6-img-square",
            name: "Đã chọn kiểu bố cục Square",
            type: "image_wrap",
            expectedWrap: "square"
          },
          {
            id: "r2-6-text-intact",
            name: "Nội dung bài viết nguyên vẹn",
            type: "text_contains",
            expectedText: "CÁCH LÀM KEM DƯA HẤU"
          }
        ]
      },
      {
        id: "t2-demon",
        teamId: 99,
        teamName: "Tổ Quỷ 😈",
        title: "TICKET MA VƯƠNG: BỐ CỤC SQUARE THẦN TỐC",
        targetText: "Toàn bộ trang văn bản",
        reqText: "• Đổi bố cục ảnh sang Square<br>• Tiêu đề 18pt in đậm màu đỏ<br>• Đề mục 'Nguyên liệu:' 14pt in đậm màu xanh",
        timeLimit: 45,
        rules: [
          {
            id: "r2-demon-square",
            name: "Đã chọn kiểu bố cục Square",
            type: "image_wrap",
            expectedWrap: "square"
          },
          {
            id: "r2-demon-title",
            name: "Tiêu đề: 18pt, In đậm, Màu Đỏ",
            type: "paragraph_format",
            match: "CÁCH LÀM KEM DƯA HẤU",
            fontSize: 18,
            bold: true,
            color: "RED"
          },
          {
            id: "r2-demon-h1",
            name: "Đề mục 'Nguyên liệu:': 14pt, In đậm, Màu Xanh",
            type: "paragraph_format",
            match: "Nguyên liệu:",
            fontSize: 14,
            bold: true,
            color: "BLUE"
          }
        ]
      }
    ]
  },

  // 4. Bộ quy tắc chuẩn dành riêng cho Chấm Hàng Loạt (Batch Mode 35 máy)
  batchRules: {
    stage1: [
      {
        id: "batch-s1-title",
        name: "Tiêu đề 'CÁCH LÀM KEM DƯA HẤU' (18pt, In đậm, Màu Đỏ)",
        type: "paragraph_format",
        match: "CÁCH LÀM KEM DƯA HẤU",
        fontSize: 18,
        bold: true,
        color: "RED"
      },
      {
        id: "batch-s1-h1",
        name: "Đề mục 'Nguyên liệu:' (14pt, In đậm, Xanh dương)",
        type: "paragraph_format",
        match: "Nguyên liệu:",
        fontSize: 14,
        bold: true,
        color: "BLUE"
      },
      {
        id: "batch-s1-h2",
        name: "Đề mục 'Các bước thực hiện:' (14pt, In đậm, Xanh dương)",
        type: "paragraph_format",
        match: "Các bước thực hiện:",
        fontSize: 14,
        bold: true,
        color: "BLUE"
      }
    ],
    stage2: [
      {
        id: "batch-s2-img-exists",
        name: "Có hình ảnh minh họa trong văn bản",
        type: "image_exists"
      },
      {
        id: "batch-s2-img-square",
        name: "Hình ảnh được bố trí kiểu Square (Bao quanh chữ)",
        type: "image_wrap",
        expectedWrap: "square"
      }
    ]
  },

  // 5. Màn hình Chốt Kiến Thức (Active Recall 5 phút vàng cuối tiết + Ánh xạ chính xác theo teamId)
  summary: {
    coreRules: [
      {
        icon: "🔤",
        title: "QUY TẮC 1: ĐỊNH DẠNG KÍ TỰ",
        content: "Chọn phần văn bản cần định dạng → Sử dụng các nút lệnh trong <b>nhóm Font (thẻ Home)</b> để chỉnh phông chữ, cỡ chữ, kiểu chữ (B, I, U) và màu chữ."
      },
      {
        icon: "🖼️",
        title: "QUY TẮC 2: BỐ TRÍ HÌNH ẢNH",
        content: "Chọn hình ảnh → Nháy chuột vào nút <b>Layout Options</b> → Chọn kiểu <b>Square</b> để văn bản tự động chảy bao quanh hình ảnh gọn gàng."
      }
    ],
    consolidationQuestions: [
      {
        id: "sum-q1",
        teamId: 1,
        forTeam: "Tổ 1",
        question: "Muốn định dạng một dòng văn bản trong Word, bước đầu tiên bắt buộc phải làm là gì?",
        answer: "Chọn (bôi đen) phần văn bản cần định dạng."
      },
      {
        id: "sum-q2",
        teamId: 2,
        forTeam: "Tổ 2",
        question: "Các nút lệnh chỉnh cỡ chữ, kiểu chữ B, I, U và màu chữ nằm trong nhóm lệnh nào trên thẻ Home?",
        answer: "Nhóm lệnh Font."
      },
      {
        id: "sum-q3",
        teamId: 3,
        forTeam: "Tổ 3",
        question: "Để văn bản tự động chảy bao quanh hình ảnh, sau khi nháy chọn ảnh ta bấm vào nút nào và chọn kiểu gì?",
        answer: "Bấm nút Layout Options và chọn kiểu Square (Bao quanh)."
      },
      {
        id: "sum-q4",
        teamId: 4,
        forTeam: "Tổ 4",
        question: "Nếu không chọn kiểu bố trí Square, hình ảnh mặc định sẽ hiển thị như thế nào đối với dòng chữ xung quanh?",
        answer: "Mặc định nằm thẳng hàng với chữ (Inline), làm đứt quãng dòng văn bản và tạo khoảng trống xấu."
      },
      {
        id: "sum-q5",
        teamId: 5,
        forTeam: "Tổ 5",
        question: "Hãy chỉ ra 2 phím tắt nhanh trên bàn phím: In đậm (B) và In nghiêng (I)?",
        answer: "Ctrl + B (In đậm) và Ctrl + I (In nghiêng)."
      },
      {
        id: "sum-q6",
        teamId: 6,
        forTeam: "Tổ 6",
        question: "Nút lệnh có biểu tượng chữ A kèm vạch màu bên dưới trong nhóm Font dùng để làm gì?",
        answer: "Dùng để thay đổi màu sắc của chữ (Font Color)."
      },
      {
        id: "sum-qdemon",
        teamId: 99,
        forTeam: "Tổ Quỷ 😈",
        question: "Bố trí hình ảnh kiểu Square mang lại lợi ích gì cho người đọc văn bản?",
        answer: "Giúp bài viết liền mạch, tiết kiệm diện tích trang và bố cục chuyên nghiệp, đẹp mắt hơn."
      }
    ]
  }
};