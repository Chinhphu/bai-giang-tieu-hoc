/**
 * Ngân hàng dữ liệu đồng bộ từ questions.json
 * Hỗ trợ chạy 100% offline-first không lỗi CORS khi mở bằng file://
 */
window.QUESTS_DATA = [
  {
    "id": "q_order_shutdown",
    "type": "step_order",
    "badge": "🔢 SẮP XẾP QUY TRÌNH CHUẨN (SGK TRANG 22)",
    "title": "Hãy nháy chuột chọn lần lượt 4 bước TẮT MÁY TÍNH ĐỂ BÀN theo đúng thứ tự chuẩn SGK:",
    "steps": [
      {
        "text": "Đóng các phần mềm đang mở bằng nút [✕]",
        "correctOrder": 1
      },
      {
        "text": "Nháy nút Start (🪟) ở góc dưới bên trái màn hình",
        "correctOrder": 2
      },
      {
        "text": "Nháy vào biểu tượng Power (⏻) rồi chọn Shut down",
        "correctOrder": 3
      },
      {
        "text": "Đợi màn hình tắt hẳn rồi nhấn nút công tắc tắt Màn hình",
        "correctOrder": 4
      }
    ],
    "hint": "Nhớ quy tắc: Phải đóng phần mềm trước, rồi mới vào Start chọn Shut down, cuối cùng mới tắt màn hình!"
  },
  {
    "id": "q_order_save_exit",
    "type": "step_order",
    "badge": "🔢 SẮP XẾP THAO TÁC THOÁT PHẦN MỀM",
    "title": "Em hãy nháy chọn thứ tự đúng khi kết thúc bài tập gõ văn bản trên máy tính:",
    "steps": [
      {
        "text": "Kiểm tra lại bài làm đã xong chưa",
        "correctOrder": 1
      },
      {
        "text": "Nháy nút [✕] màu đỏ ở góc trên bên phải cửa sổ",
        "correctOrder": 2
      },
      {
        "text": "Quan sát cửa sổ biến mất khỏi màn hình nền",
        "correctOrder": 3
      }
    ],
    "hint": "Trước khi tắt máy, luôn đảm bảo đóng hết các cửa sổ đang chạy!"
  },
  {
    "id": "q_desk_right_click",
    "type": "interactive_desktop",
    "badge": "🖱️ THỰC HÀNH CHUỘT: VẬN DỤNG 1 (SGK TRANG 23)",
    "title": "Thao tác thực tế: Dùng ngón giữa NHÁY NÚT PHẢI CHUỘT vào biểu tượng This PC trên màn hình, rồi nháy chuột trái ra vùng trống để đóng bảng chọn!",
    "desktopTask": "right_click_thispc",
    "hint": "Nhớ dùng NGÓN GIỮA để bấm nút PHẢI chuột nhé!"
  },
  {
    "id": "q_desk_dblclick_word",
    "type": "interactive_desktop",
    "badge": "🖱️ THỰC HÀNH CHUỘT: NHIỆM VỤ 3 (SGK TRANG 22)",
    "title": "Thao tác thực tế: Dùng ngón trỏ NHÁY ĐÚP CHUỘT vào biểu tượng Word để mở phần mềm, sau đó nháy nút [✕] đỏ để đóng lại!",
    "desktopTask": "double_click_word",
    "hint": "Nháy đúp là nhấn nút TRÁI chuột nhanh 2 lần liên tiếp!"
  },
  {
    "id": "q_desk_drag_trash",
    "type": "interactive_desktop",
    "badge": "🖱️ THỰC HÀNH CHUỘT: LUYỆN TẬP 2 & 3 (SGK TRANG 23)",
    "title": "Thao tác thực tế: Dùng thao tác KÉO THẢ CHUỘT để di chuyển biểu tượng Thùng rác vào đúng ô vuông màu vàng!",
    "desktopTask": "drag_icon",
    "hint": "Nhấn giữ nút trái chuột, kéo icon đến ô vàng rồi thả ngón tay ra!"
  },
  {
    "id": "q_spot_pull_plug",
    "type": "visual_spot",
    "badge": "🔍 BẮT LỖI TRỰC QUAN: HÌNH 30 SGK",
    "title": "Hình ảnh dưới đây có hành vi gây nguy hiểm nghiêm trọng. Em hãy nháy chuột thẳng vào vị trí ĐANG GÂY NGUY HẠI:",
    "spotTarget": "plug",
    "promptText": "Có một bàn tay đang giật mạnh phích cắm điện ra khỏi ổ cắm khi máy tính đang hoạt động!",
    "actionPrompt": "Nháy chuột vào Bàn tay đang giật dây điện để ngăn chặn ngay!"
  },
  {
    "id": "q_spot_press_case",
    "type": "visual_spot",
    "badge": "🔍 BẮT LỖI TRỰC QUAN: THÙNG MÁY CASE",
    "title": "Quan sát thùng máy tính. Em hãy nháy chuột vào hành vi SAI TRÁI khi muốn tắt máy:",
    "spotTarget": "case_btn",
    "promptText": "Một ngón tay đang đè lì nút công tắc trên thân máy (Case) để tắt máy!",
    "actionPrompt": "Nháy chuột vào Ngón tay hư để gạt tay ra ngay!"
  },
  {
    "id": "q_spot_shake_screen",
    "type": "visual_spot",
    "badge": "🔍 BẮT LỖI TRỰC QUAN: XÊ DỊCH MÁY TÍNH",
    "title": "Màn hình và thân máy tính đang bị tác động xấu. Hãy nháy chuột vào hành vi nguy hiểm:",
    "spotTarget": "shake_hands",
    "promptText": "Hai bàn tay đang ôm màn hình rung lắc chao đảo khi máy đang chạy!",
    "actionPrompt": "Nháy chuột vào Bàn tay rung lắc để giữ máy đứng yên vững chãi!"
  },
  {
    "id": "q_spot_delete_icons",
    "type": "visual_spot",
    "badge": "🔍 BẮT LỖI TRỰC QUAN: XÓA ICON MÀN HÌNH NỀN",
    "title": "Biểu tượng phần mềm học tập đang bị đe dọa. Hãy nháy chuột vào hành vi sai phạm:",
    "spotTarget": "drag_to_trash",
    "promptText": "Có người đang kéo biểu tượng trên màn hình nền vào Thùng rác để xóa!",
    "actionPrompt": "Nháy chuột vào Biểu tượng đang bị kéo để giật lại vị trí cũ!"
  },
  {
    "id": "q_match_mouse_roles",
    "type": "match_pair",
    "badge": "🧩 NỐI THAO TÁC CHUỘT VỚI CÔNG DỤNG",
    "title": "Hãy ghép từng thao tác chuột ở cột bên trái với công dụng tương ứng ở cột bên phải:",
    "pairs": [
      {
        "left": "Ngón giữa nháy nút phải chuột",
        "right": "Mở bảng chọn (Menu) của biểu tượng"
      },
      {
        "left": "Ngón trỏ nháy đúp chuột",
        "right": "Mở một phần mềm để học tập"
      },
      {
        "left": "Kéo thả chuột",
        "right": "Di chuyển biểu tượng sang vị trí mới"
      }
    ]
  },
  {
    "id": "q_match_hardware_rules",
    "type": "match_pair",
    "badge": "🧩 NỐI BỘ PHẬN VỚI QUY TẮC AN TOÀN",
    "title": "Hãy nối các bộ phận máy tính với điều cấm kỵ tương ứng:",
    "pairs": [
      {
        "left": "Phích cắm & Ổ điện",
        "right": "Tuyệt đối không rút đột ngột khi máy đang chạy"
      },
      {
        "left": "Nút nguồn Thùng máy (Case)",
        "right": "Không được ấn vào nút này để tắt máy"
      },
      {
        "left": "Màn hình và Thân máy",
        "right": "Không được bê lắc, rung xê dịch khi hoạt động"
      }
    ]
  },
  {
    "id": "q_tf_switch_case",
    "type": "true_false",
    "badge": "⚡ PHẢN XẠ NHANH: ĐÚNG HAY SAI?",
    "title": "Nhấn nút công tắc trên thân máy (Case) là cách tắt máy tính nhanh và đúng cách. Đúng hay Sai?",
    "isCorrect": false,
    "explain": "SAI! Tuyệt đối không tắt máy bằng nút công tắc thân máy vì sẽ làm hỏng hệ thống và mất dữ liệu!"
  },
  {
    "id": "q_tf_pull_plug",
    "type": "true_false",
    "badge": "⚡ PHẢN XẠ NHANH: ĐÚNG HAY SAI?",
    "title": "Khi máy tính đang sáng màn hình, ta được phép rút phích cắm điện để tắt máy ngay lập tức. Đúng hay Sai?",
    "isCorrect": false,
    "explain": "SAI! Rút điện đột ngột rất nguy hiểm, có thể gây chập cháy và hỏng máy tính!"
  },
  {
    "id": "q_tf_close_word_first",
    "type": "true_false",
    "badge": "⚡ PHẢN XẠ NHANH: ĐÚNG HAY SAI?",
    "title": "Trước khi nháy Start ➔ Shut down để tắt máy, em cần đóng các phần mềm đang mở bằng nút [✕]. Đúng hay Sai?",
    "isCorrect": true,
    "explain": "ĐÚNG! Luôn đóng các phần mềm đang mở để lưu bài tập trước khi tắt máy!"
  },
  {
    "id": "q_tf_desktop_icons",
    "type": "true_false",
    "badge": "⚡ PHẢN XẠ NHANH: ĐÚNG HAY SAI?",
    "title": "Trong phòng thực hành Tin học, em được phép tự ý xóa các biểu tượng trên màn hình nền. Đúng hay Sai?",
    "isCorrect": false,
    "explain": "SAI! Không được tự ý xóa biểu tượng vì sẽ làm mất phần mềm của các bạn lớp khác!"
  },
  {
    "id": "q_tf_monitor_power",
    "type": "true_false",
    "badge": "⚡ PHẢN XẠ NHANH: ĐÚNG HAY SAI?",
    "title": "Đối với máy tính để bàn, sau khi hệ điều hành Shut down xong, ta cần nhấn nút công tắc tắt màn hình. Đúng hay Sai?",
    "isCorrect": true,
    "explain": "ĐÚNG! Bước cuối cùng khi tắt máy để bàn là nhấn công tắc tắt màn hình!"
  },
  {
    "id": "q_trick_rush_shutdown",
    "type": "trick_quiz",
    "badge": "💡 BẪY TÌNH HUỐNG: CHUÔNG BÁO HẾT GIỜ",
    "title": "Chuông hết giờ vang lên, bạn Tí vội vàng bấm nút tắt màn hình rồi bỏ chạy ra về trong khi máy tính vẫn đang chạy. Bạn Tí làm vậy đúng hay sai?",
    "options": [
      {
        "letter": "A",
        "text": "Đúng, vì màn hình tắt đen là máy tính đã tắt rồi.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Sai, vì máy tính vẫn đang chạy ngầm, chưa được chọn Shut down!",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Đúng, chỉ cần tắt màn hình là tiết kiệm điện rồi.",
        "isCorrect": false
      }
    ],
    "explain": "Tắt màn hình không có nghĩa là máy tính đã tắt! Cần phải vào Start ➔ Shut down trước!"
  },
  {
    "id": "q_trick_which_finger",
    "type": "trick_quiz",
    "badge": "💡 BẪY TÌNH HUỐNG: CẦM CHUỘT ĐÚNG CÁCH",
    "title": "Khi cầm chuột bằng tay phải, ngón tay nào dùng để nhấn NÚT PHẢI CHUỘT?",
    "options": [
      {
        "letter": "A",
        "text": "Ngón trỏ đặt lên nút phải chuột.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Ngón giữa đặt lên nút phải chuột.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Ngón cái đặt lên nút phải chuột.",
        "isCorrect": false
      }
    ],
    "explain": "Chuẩn SGK: Ngón trỏ đặt ở nút trái chuột, ngón giữa đặt ở nút phải chuột!"
  },
  {
    "id": "q_trick_restart_vs_shutdown",
    "type": "trick_quiz",
    "badge": "💡 BẪY TÌNH HUỐNG: CÁC NÚT TRONG POWER",
    "title": "Khi mở bảng Power (⏻) trong nút Start, muốn TẮT HẲN máy tính em phải chọn nút nào?",
    "options": [
      {
        "letter": "A",
        "text": "Restart (Khởi động lại máy).",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Shut down (Tắt máy).",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Sleep (Ngủ tạm thời).",
        "isCorrect": false
      }
    ],
    "explain": "Muốn tắt hẳn máy tính phải chọn 'Shut down'!"
  },
  {
    "id": "q_trick_spilled_water",
    "type": "trick_quiz",
    "badge": "💡 BẪY TÌNH HUỐNG: VỆ SINH PHÒNG MÁY",
    "title": "Khi thấy màn hình máy tính có bụi bẩn, hành động nào sau đây là AN TOÀN NHẤT?",
    "options": [
      {
        "letter": "A",
        "text": "Đổ một cốc nước lên màn hình để rửa sạch.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Dùng khăn khô mềm lau nhẹ nhàng khi máy đã tắt.",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Lấy ngón tay cào mạnh vào màn hình.",
        "isCorrect": false
      }
    ],
    "explain": "Tuyệt đối không để nước dính vào máy tính, chỉ dùng khăn khô mềm lau nhẹ!"
  },
  {
    "id": "q_trick_drag_drop_definition",
    "type": "trick_quiz",
    "badge": "💡 BẪY TÌNH HUỐNG: KHÁI NIỆM KÉO THẢ",
    "title": "Bạn Hoa muốn kéo thả biểu tượng nhưng vừa nhấn nút chuột là thả tay ra ngay. Bạn Hoa làm sai ở bước nào?",
    "options": [
      {
        "letter": "A",
        "text": "Phải NHẤN GIỮ nút trái chuột trong khi di chuyển rồi mới thả tay.",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Phải nháy đúp chuột thật nhanh.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Phải dùng nút chuột phải để kéo.",
        "isCorrect": false
      }
    ],
    "explain": "Kéo thả chuột gồm 3 bước: Nhấn giữ nút trái ➔ Di chuyển chuột đến vị trí mới ➔ Thả ngón tay!"
  },
  {
    "id": "q_trick_four_donts",
    "type": "trick_quiz",
    "badge": "💡 TỔNG KẾT BÀI HỌC: 4 ĐIỀU CẤM KỴ",
    "title": "Trong các điều sau, điều nào KHÔNG THUỘC 4 điều cấm kỵ khi dùng máy tính?",
    "options": [
      {
        "letter": "A",
        "text": "Không nhấn nút công tắc trên thân máy để tắt máy.",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Không ngồi học Tin học quá thời gian quy định.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Không nháy chuột vào nút Start để tắt máy tính.",
        "isCorrect": true
      }
    ],
    "explain": "Nháy nút Start để tắt máy tính là ĐIỀU NÊN LÀM VÀ ĐÚNG CHUẨN, không phải điều cấm!"
  },
  {
    "id": "q_trick_sit_distance",
    "type": "trick_quiz",
    "badge": "💡 TƯ THẾ NGỒI CHUẨN (BÀI 4 SGK)",
    "title": "Khi ngồi làm việc với máy tính, khoảng cách thích hợp từ mắt đến màn hình là bao nhiêu?",
    "options": [
      {
        "letter": "A",
        "text": "Khoảng 10 – 20 cm (dí sát mặt vào màn hình).",
        "isCorrect": false
      },
      {
        "letter": "B",
        "text": "Khoảng 50 – 80 cm (ngồi thẳng lưng, mắt ngang tầm màn hình).",
        "isCorrect": true
      },
      {
        "letter": "C",
        "text": "Khoảng 2 mét (ngồi thật xa).",
        "isCorrect": false
      }
    ],
    "explain": "Khoảng cách an toàn cho mắt học sinh tiểu học là 50 – 80 cm!"
  },
  {
    "id": "q_trick_mouse_buttons",
    "type": "trick_quiz",
    "badge": "💡 CẤU TẠO CHUỘT MÁY TÍNH",
    "title": "Con chuột máy tính thông thường gồm có những bộ phận cơ bản nào?",
    "options": [
      {
        "letter": "A",
        "text": "Nút trái, nút phải và nút cuộn (bánh lăn).",
        "isCorrect": true
      },
      {
        "letter": "B",
        "text": "Màn hình, bàn phím và thân máy.",
        "isCorrect": false
      },
      {
        "letter": "C",
        "text": "Dây điện và phích cắm.",
        "isCorrect": false
      }
    ],
    "explain": "Chuột máy tính gồm: Nút trái, Nút phải và Nút cuộn ở giữa!"
  }
];
window.QUESTION_BANK = window.QUESTS_DATA;
window.QUEST_LIST = window.QUESTS_DATA;
