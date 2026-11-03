/**
 * Ngân hàng dữ liệu đồng bộ từ quests.json
 * Hỗ trợ chạy 100% offline-first không lỗi CORS khi mở bằng file://
 */
window.QUESTS_DATA = [
  {
    "id": 1,
    "type": "move",
    "text": "DI CHUYỂN (Cut ✂️ rồi Paste) thư mục \"Thu An\" từ Nhom 1 sang Nhom 2.",
    "to": [
      "Nhom 2/Thu An/",
      "Nhom 2/Thu An/Gioi thieu.pptx"
    ],
    "gone": [
      "Nhom 1/Thu An/"
    ]
  },
  {
    "id": 2,
    "type": "copy",
    "text": "SAO CHÉP (Copy 📋 rồi Paste) thư mục \"Minh\" từ Nhom 1 sang Nhom 3.",
    "to": [
      "Nhom 3/Minh/Bai tap.docx"
    ],
    "keep": [
      "Nhom 1/Minh/Bai tap.docx"
    ]
  },
  {
    "id": 3,
    "type": "rename",
    "text": "ĐỔI TÊN (Rename ✏️) tệp \"Gioi thieu.pptx\" trong thư mục Binh (Nhom 2) thành \"Gioi thieu nhom.pptx\".",
    "to": [
      "Nhom 2/Binh/Gioi thieu nhom.pptx"
    ],
    "gone": [
      "Nhom 2/Binh/Gioi thieu.pptx"
    ]
  },
  {
    "id": 4,
    "type": "delete",
    "text": "XOÁ (Delete 🗑️) tệp nháp \"Nhap.txt\" trong thư mục Huy (Nhom 2). Giữ nguyên các tệp khác!",
    "to": [],
    "gone": [
      "Nhom 2/Huy/Nhap.txt"
    ],
    "keep": [
      "Nhom 2/Huy/",
      "Nhom 2/Huy/Anh lop.png"
    ]
  },
  {
    "id": 5,
    "type": "create",
    "text": "TẠO (New ➕) thư mục mới tên \"Hinh anh\" trong thư mục \"Nhom 3\".",
    "to": [
      "Nhom 3/Hinh anh/"
    ]
  },
  {
    "id": 6,
    "type": "move",
    "text": "DI CHUYỂN (Cut ✂️) tệp \"Video.mp4\" từ thư mục Lan (Nhom 1) sang Nhom 3.",
    "to": [
      "Nhom 3/Video.mp4"
    ],
    "gone": [
      "Nhom 1/Lan/Video.mp4"
    ]
  },
  {
    "id": 7,
    "type": "copy",
    "text": "SAO CHÉP (Copy 📋) tệp \"Bai doc.docx\" từ thư mục Lan (Nhom 1) sang Nhom 2.",
    "to": [
      "Nhom 2/Bai doc.docx"
    ],
    "keep": [
      "Nhom 1/Lan/Bai doc.docx"
    ]
  },
  {
    "id": 8,
    "type": "rename",
    "text": "ĐỔI TÊN (Rename ✏️) thư mục \"Khoa\" (trong Nhom 1) thành \"Khoa Nam\".",
    "to": [
      "Nhom 1/Khoa Nam/"
    ],
    "gone": [
      "Nhom 1/Khoa/"
    ]
  },
  {
    "id": 9,
    "type": "create",
    "text": "TẠO (New ➕) thư mục mới tên \"Tai lieu\" trong thư mục \"Nhom 2\".",
    "to": [
      "Nhom 2/Tai lieu/"
    ]
  },
  {
    "id": 10,
    "type": "move",
    "text": "DI CHUYỂN (Cut ✂️) tệp \"Anh lop.png\" từ thư mục Huy (Nhom 2) sang thư mục \"Hinh anh\" trong Nhom 3.",
    "to": [
      "Nhom 3/Hinh anh/Anh lop.png"
    ],
    "gone": [
      "Nhom 2/Huy/Anh lop.png"
    ]
  },
  {
    "id": 11,
    "type": "copy",
    "text": "SAO CHÉP (Copy 📋) tệp \"Bai tap.docx\" từ thư mục Minh (Nhom 1) sang thư mục \"Tai lieu\" (Nhom 2).",
    "to": [
      "Nhom 2/Tai lieu/Bai tap.docx"
    ],
    "keep": [
      "Nhom 1/Minh/Bai tap.docx"
    ]
  },
  {
    "id": 12,
    "type": "rename",
    "text": "ĐỔI TÊN (Rename ✏️) thư mục \"Lan\" (trong Nhom 1) thành \"Mai Lan\".",
    "to": [
      "Nhom 1/Mai Lan/"
    ],
    "gone": [
      "Nhom 1/Lan/"
    ]
  },
  {
    "id": 13,
    "type": "create",
    "text": "TẠO (New ➕) thư mục mới tên \"Nhom 4\" trong thư mục \"Hoc tap\".",
    "to": [
      "Nhom 4/"
    ]
  },
  {
    "id": 14,
    "type": "move",
    "text": "DI CHUYỂN (Cut ✂️) thư mục \"Khoa Nam\" từ Nhom 1 sang Nhom 4.",
    "to": [
      "Nhom 4/Khoa Nam/"
    ],
    "gone": [
      "Nhom 1/Khoa Nam/"
    ]
  },
  {
    "id": 15,
    "type": "copy",
    "text": "SAO CHÉP (Copy 📋) thư mục \"Hinh anh\" từ Nhom 3 sang Nhom 4.",
    "to": [
      "Nhom 4/Hinh anh/"
    ],
    "keep": [
      "Nhom 3/Hinh anh/"
    ]
  },
  {
    "id": 16,
    "type": "delete",
    "text": "XOÁ (Delete 🗑️) thư mục \"Huy\" trong Nhom 2 (sau khi đã dọn các tệp quan trọng).",
    "to": [],
    "gone": [
      "Nhom 2/Huy/"
    ]
  },
  {
    "id": 17,
    "type": "rename",
    "text": "ĐỔI TÊN (Rename ✏️) tệp \"Video.mp4\" trong Nhom 3 thành \"Video tiet hoc.mp4\".",
    "to": [
      "Nhom 3/Video tiet hoc.mp4"
    ],
    "gone": [
      "Nhom 3/Video.mp4"
    ]
  },
  {
    "id": 18,
    "type": "create",
    "text": "TẠO (New ➕) thư mục mới tên \"Tong ket\" trong thư mục \"Nhom 4\".",
    "to": [
      "Nhom 4/Tong ket/"
    ]
  }
];
window.QUESTION_BANK = window.QUESTS_DATA;
window.QUEST_LIST = window.QUESTS_DATA;
