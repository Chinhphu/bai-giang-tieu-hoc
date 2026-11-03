/**
 * Ngân hàng dữ liệu đồng bộ từ quests.json
 * Hỗ trợ chạy 100% offline-first không lỗi CORS khi mở bằng file://
 */
window.QUESTS_DATA = [
  {
    "id": 1,
    "round": 1,
    "teamIdx": 0,
    "tag": "Vòng 1: [Sao chép 📋] ➔ [Đổi tên ✏️]",
    "comboBadge": "COMBO 2 BƯỚC",
    "summary": "Sao chép tệp bài học từ Kho vào thư mục bạn An rồi đổi tên tệp.",
    "steps": [
      "Sao chép \"Bai1.pptx\" từ \"Kho\" vào \"To 1/An\"",
      "Đổi tên tệp trong \"To 1/An\" thành \"Bai_An.pptx\""
    ],
    "to": [
      "To 1/An/Bai_An.pptx"
    ],
    "gone": [
      "To 1/An/Bai1.pptx"
    ],
    "keep": [
      "Kho/Bai1.pptx"
    ]
  },
  {
    "id": 2,
    "round": 1,
    "teamIdx": 1,
    "tag": "Vòng 1: [Sao chép 📋] ➔ [Đổi tên ✏️]",
    "comboBadge": "COMBO 2 BƯỚC",
    "summary": "Sao chép tệp bài học từ Kho vào thư mục bạn Hoa rồi đổi tên tệp.",
    "steps": [
      "Sao chép \"Bai1.pptx\" từ \"Kho\" vào \"To 2/Hoa\"",
      "Đổi tên tệp trong \"To 2/Hoa\" thành \"Bai_Hoa.pptx\""
    ],
    "to": [
      "To 2/Hoa/Bai_Hoa.pptx"
    ],
    "gone": [
      "To 2/Hoa/Bai1.pptx"
    ],
    "keep": [
      "Kho/Bai1.pptx"
    ]
  },
  {
    "id": 3,
    "round": 1,
    "teamIdx": 2,
    "tag": "Vòng 1: [Sao chép 📋] ➔ [Đổi tên ✏️]",
    "comboBadge": "COMBO 2 BƯỚC",
    "summary": "Sao chép tệp bài học từ Kho vào thư mục bạn Khoa rồi đổi tên tệp.",
    "steps": [
      "Sao chép \"Bai1.pptx\" từ \"Kho\" vào \"To 3/Khoa\"",
      "Đổi tên tệp trong \"To 3/Khoa\" thành \"Bai_Khoa.pptx\""
    ],
    "to": [
      "To 3/Khoa/Bai_Khoa.pptx"
    ],
    "gone": [
      "To 3/Khoa/Bai1.pptx"
    ],
    "keep": [
      "Kho/Bai1.pptx"
    ]
  },
  {
    "id": 4,
    "round": 1,
    "teamIdx": 3,
    "tag": "Vòng 1: [Sao chép 📋] ➔ [Đổi tên ✏️]",
    "comboBadge": "COMBO 2 BƯỚC",
    "summary": "Sao chép tệp bài học từ Kho vào thư mục bạn Nam rồi đổi tên tệp.",
    "steps": [
      "Sao chép \"Bai1.pptx\" từ \"Kho\" vào \"To 4/Nam\"",
      "Đổi tên tệp trong \"To 4/Nam\" thành \"Bai_Nam.pptx\""
    ],
    "to": [
      "To 4/Nam/Bai_Nam.pptx"
    ],
    "gone": [
      "To 4/Nam/Bai1.pptx"
    ],
    "keep": [
      "Kho/Bai1.pptx"
    ]
  },
  {
    "id": 5,
    "round": 1,
    "teamIdx": 4,
    "tag": "Vòng 1: [Sao chép 📋] ➔ [Đổi tên ✏️]",
    "comboBadge": "COMBO 2 BƯỚC",
    "summary": "Sao chép tệp bài học từ Kho vào thư mục bạn Nga rồi đổi tên tệp.",
    "steps": [
      "Sao chép \"Bai1.pptx\" từ \"Kho\" vào \"To 5/Nga\"",
      "Đổi tên tệp trong \"To 5/Nga\" thành \"Bai_Nga.pptx\""
    ],
    "to": [
      "To 5/Nga/Bai_Nga.pptx"
    ],
    "gone": [
      "To 5/Nga/Bai1.pptx"
    ],
    "keep": [
      "Kho/Bai1.pptx"
    ]
  },
  {
    "id": 6,
    "round": 1,
    "teamIdx": 5,
    "tag": "Vòng 1: [Sao chép 📋] ➔ [Đổi tên ✏️]",
    "comboBadge": "COMBO 2 BƯỚC",
    "summary": "Sao chép tệp bài học từ Kho vào thư mục bạn Quan rồi đổi tên tệp.",
    "steps": [
      "Sao chép \"Bai1.pptx\" từ \"Kho\" vào \"To 6/Quan\"",
      "Đổi tên tệp trong \"To 6/Quan\" thành \"Bai_Quan.pptx\""
    ],
    "to": [
      "To 6/Quan/Bai_Quan.pptx"
    ],
    "gone": [
      "To 6/Quan/Bai1.pptx"
    ],
    "keep": [
      "Kho/Bai1.pptx"
    ]
  },
  {
    "id": 7,
    "round": 2,
    "teamIdx": 0,
    "tag": "Vòng 2: [Tạo mới ➕] ➔ [Di chuyển ✂️]",
    "comboBadge": "COMBO 2 BƯỚC",
    "summary": "Tạo thư mục \"Luu tru\" trong \"To 1/An\" rồi di chuyển tệp bài vào đó.",
    "steps": [
      "Tạo thư mục mới \"Luu tru\" trong \"To 1/An\"",
      "Di chuyển tệp \"Bai_An.pptx\" vào thư mục \"Luu tru\""
    ],
    "to": [
      "To 1/An/Luu tru/Bai_An.pptx"
    ],
    "gone": [
      "To 1/An/Bai_An.pptx"
    ]
  },
  {
    "id": 8,
    "round": 2,
    "teamIdx": 1,
    "tag": "Vòng 2: [Tạo mới ➕] ➔ [Di chuyển ✂️]",
    "comboBadge": "COMBO 2 BƯỚC",
    "summary": "Tạo thư mục \"Luu tru\" trong \"To 2/Hoa\" rồi di chuyển tệp bài vào đó.",
    "steps": [
      "Tạo thư mục mới \"Luu tru\" trong \"To 2/Hoa\"",
      "Di chuyển tệp \"Bai_Hoa.pptx\" vào thư mục \"Luu tru\""
    ],
    "to": [
      "To 2/Hoa/Luu tru/Bai_Hoa.pptx"
    ],
    "gone": [
      "To 2/Hoa/Bai_Hoa.pptx"
    ]
  },
  {
    "id": 9,
    "round": 2,
    "teamIdx": 2,
    "tag": "Vòng 2: [Tạo mới ➕] ➔ [Di chuyển ✂️]",
    "comboBadge": "COMBO 2 BƯỚC",
    "summary": "Tạo thư mục \"Luu tru\" trong \"To 3/Khoa\" rồi di chuyển tệp bài vào đó.",
    "steps": [
      "Tạo thư mục mới \"Luu tru\" trong \"To 3/Khoa\"",
      "Di chuyển tệp \"Bai_Khoa.pptx\" vào thư mục \"Luu tru\""
    ],
    "to": [
      "To 3/Khoa/Luu tru/Bai_Khoa.pptx"
    ],
    "gone": [
      "To 3/Khoa/Bai_Khoa.pptx"
    ]
  },
  {
    "id": 10,
    "round": 2,
    "teamIdx": 3,
    "tag": "Vòng 2: [Tạo mới ➕] ➔ [Di chuyển ✂️]",
    "comboBadge": "COMBO 2 BƯỚC",
    "summary": "Tạo thư mục \"Luu tru\" trong \"To 4/Nam\" rồi di chuyển tệp bài vào đó.",
    "steps": [
      "Tạo thư mục mới \"Luu tru\" trong \"To 4/Nam\"",
      "Di chuyển tệp \"Bai_Nam.pptx\" vào thư mục \"Luu tru\""
    ],
    "to": [
      "To 4/Nam/Luu tru/Bai_Nam.pptx"
    ],
    "gone": [
      "To 4/Nam/Bai_Nam.pptx"
    ]
  },
  {
    "id": 11,
    "round": 2,
    "teamIdx": 4,
    "tag": "Vòng 2: [Tạo mới ➕] ➔ [Di chuyển ✂️]",
    "comboBadge": "COMBO 2 BƯỚC",
    "summary": "Tạo thư mục \"Luu tru\" trong \"To 5/Nga\" rồi di chuyển tệp bài vào đó.",
    "steps": [
      "Tạo thư mục mới \"Luu tru\" trong \"To 5/Nga\"",
      "Di chuyển tệp \"Bai_Nga.pptx\" vào thư mục \"Luu tru\""
    ],
    "to": [
      "To 5/Nga/Luu tru/Bai_Nga.pptx"
    ],
    "gone": [
      "To 5/Nga/Bai_Nga.pptx"
    ]
  },
  {
    "id": 12,
    "round": 2,
    "teamIdx": 5,
    "tag": "Vòng 2: [Tạo mới ➕] ➔ [Di chuyển ✂️]",
    "comboBadge": "COMBO 2 BƯỚC",
    "summary": "Tạo thư mục \"Luu tru\" trong \"To 6/Quan\" rồi di chuyển tệp bài vào đó.",
    "steps": [
      "Tạo thư mục mới \"Luu tru\" trong \"To 6/Quan\"",
      "Di chuyển tệp \"Bai_Quan.pptx\" vào thư mục \"Luu tru\""
    ],
    "to": [
      "To 6/Quan/Luu tru/Bai_Quan.pptx"
    ],
    "gone": [
      "To 6/Quan/Bai_Quan.pptx"
    ]
  },
  {
    "id": 13,
    "round": 3,
    "teamIdx": 0,
    "tag": "Vòng 3: [Sao chép 📋] ➔ [Chia sẻ bạn bè 👥]",
    "comboBadge": "COMBO 2 BƯỚC",
    "summary": "Sao chép \"Anh.png\" từ Kho vào \"Luu tru\" rồi chia sẻ cho bạn Binh.",
    "steps": [
      "Sao chép \"Anh.png\" từ \"Kho\" vào \"To 1/An/Luu tru\"",
      "Sao chép tệp \"Anh.png\" sang cho bạn Binh (\"To 1/Binh\")"
    ],
    "to": [
      "To 1/An/Luu tru/Anh.png",
      "To 1/Binh/Anh.png"
    ],
    "keep": [
      "Kho/Anh.png"
    ]
  },
  {
    "id": 14,
    "round": 3,
    "teamIdx": 1,
    "tag": "Vòng 3: [Sao chép 📋] ➔ [Chia sẻ bạn bè 👥]",
    "comboBadge": "COMBO 2 BƯỚC",
    "summary": "Sao chép \"Anh.png\" từ Kho vào \"Luu tru\" rồi chia sẻ cho bạn Kha.",
    "steps": [
      "Sao chép \"Anh.png\" từ \"Kho\" vào \"To 2/Hoa/Luu tru\"",
      "Sao chép tệp \"Anh.png\" sang cho bạn Kha (\"To 2/Kha\")"
    ],
    "to": [
      "To 2/Hoa/Luu tru/Anh.png",
      "To 2/Kha/Anh.png"
    ],
    "keep": [
      "Kho/Anh.png"
    ]
  },
  {
    "id": 15,
    "round": 3,
    "teamIdx": 2,
    "tag": "Vòng 3: [Sao chép 📋] ➔ [Chia sẻ bạn bè 👥]",
    "comboBadge": "COMBO 2 BƯỚC",
    "summary": "Sao chép \"Anh.png\" từ Kho vào \"Luu tru\" rồi chia sẻ cho bạn Mai.",
    "steps": [
      "Sao chép \"Anh.png\" từ \"Kho\" vào \"To 3/Khoa/Luu tru\"",
      "Sao chép tệp \"Anh.png\" sang cho bạn Mai (\"To 3/Mai\")"
    ],
    "to": [
      "To 3/Khoa/Luu tru/Anh.png",
      "To 3/Mai/Anh.png"
    ],
    "keep": [
      "Kho/Anh.png"
    ]
  },
  {
    "id": 16,
    "round": 3,
    "teamIdx": 3,
    "tag": "Vòng 3: [Sao chép 📋] ➔ [Chia sẻ bạn bè 👥]",
    "comboBadge": "COMBO 2 BƯỚC",
    "summary": "Sao chép \"Anh.png\" từ Kho vào \"Luu tru\" rồi chia sẻ cho bạn Lan.",
    "steps": [
      "Sao chép \"Anh.png\" từ \"Kho\" vào \"To 4/Nam/Luu tru\"",
      "Sao chép tệp \"Anh.png\" sang cho bạn Lan (\"To 4/Lan\")"
    ],
    "to": [
      "To 4/Nam/Luu tru/Anh.png",
      "To 4/Lan/Anh.png"
    ],
    "keep": [
      "Kho/Anh.png"
    ]
  },
  {
    "id": 17,
    "round": 3,
    "teamIdx": 4,
    "tag": "Vòng 3: [Sao chép 📋] ➔ [Chia sẻ bạn bè 👥]",
    "comboBadge": "COMBO 2 BƯỚC",
    "summary": "Sao chép \"Anh.png\" từ Kho vào \"Luu tru\" rồi chia sẻ cho bạn Phat.",
    "steps": [
      "Sao chép \"Anh.png\" từ \"Kho\" vào \"To 5/Nga/Luu tru\"",
      "Sao chép tệp \"Anh.png\" sang cho bạn Phat (\"To 5/Phat\")"
    ],
    "to": [
      "To 5/Nga/Luu tru/Anh.png",
      "To 5/Phat/Anh.png"
    ],
    "keep": [
      "Kho/Anh.png"
    ]
  },
  {
    "id": 18,
    "round": 3,
    "teamIdx": 5,
    "tag": "Vòng 3: [Sao chép 📋] ➔ [Chia sẻ bạn bè 👥]",
    "comboBadge": "COMBO 2 BƯỚC",
    "summary": "Sao chép \"Anh.png\" từ Kho vào \"Luu tru\" rồi chia sẻ cho bạn Son.",
    "steps": [
      "Sao chép \"Anh.png\" từ \"Kho\" vào \"To 6/Quan/Luu tru\"",
      "Sao chép tệp \"Anh.png\" sang cho bạn Son (\"To 6/Son\")"
    ],
    "to": [
      "To 6/Quan/Luu tru/Anh.png",
      "To 6/Son/Anh.png"
    ],
    "keep": [
      "Kho/Anh.png"
    ]
  }
];
window.QUESTION_BANK = window.QUESTS_DATA;
window.QUEST_LIST = window.QUESTS_DATA;
