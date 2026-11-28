/**
 * Ngân hàng dữ liệu Tiết 13 Khối 3: Bài 6 - Khám phá thông tin trên Internet (Tiết 1)
 * Nguồn duy nhất (Single Source of Truth) cho toàn bộ:
 * - Khởi động (warmup)
 * - Vòng Trắc Nghiệm Định Danh (gateQuizzes - 10 câu Tiết 1)
 * - 6 Tập Visual Novel Rẽ Nhánh (vnEpisodes - 6 tập x 5 chặng x 3 lựa chọn + 3 kết cục/tập)
 * - Thẻ chốt kiến thức & Vòng củng cố 5 phút cuối (summaryCards, consolidationQuiz)
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

  gateQuizzes: [
    {
      id: "gq1",
      icon: "📰",
      question: "Để đọc tin tức thời sự mới nhất trong ngày, em tìm ở đâu?",
      options: [
        "1. Báo điện tử trên Internet",
        "2. Tệp bài văn cũ lưu trong máy",
        "3. Phần mềm máy tính bỏ túi",
        "4. Trong vỏ thân máy tính"
      ],
      correctIdx: 0,
      explain: "Tin tức thời sự thay đổi từng giờ nên được cập nhật liên tục trên Internet!"
    },
    {
      id: "gq2",
      icon: "🌦️",
      question: "Thông tin nào dưới đây KHÔNG có sẵn trong máy tính mà phải lên Internet tìm?",
      options: [
        "1. Bức ảnh em lưu ở ổ đĩa D:",
        "2. Dự báo thời tiết ngày mai",
        "3. Bài thơ em tự gõ bằng Word",
        "4. Tên thư mục của riêng em"
      ],
      correctIdx: 1,
      explain: "Dự báo thời tiết thay đổi hằng ngày nên không có sẵn trong máy, cần tra trên Internet."
    },
    {
      id: "gq3",
      icon: "⚽",
      question: "Lịch thi đấu bóng đá tối nay là loại thông tin gì trên Internet?",
      options: [
        "1. Tệp vẽ bằng phần mềm Paint",
        "2. Tin tức thể thao cập nhật",
        "3. Phím tắt trên bàn phím",
        "4. Ảnh chụp trong thùng rác"
      ],
      correctIdx: 1,
      explain: "Lịch thi đấu và kết quả bóng đá là tin tức thể thao phong phú trên Internet!"
    },
    {
      id: "gq4",
      icon: "🎬",
      question: "Ví dụ nào sau đây là chương trình giải trí em có thể xem trên Internet?",
      options: [
        "1. Phim hoạt hình và ca nhạc thiếu nhi",
        "2. Bảng tính tiền điện cũ",
        "3. Dây nguồn màn hình",
        "4. Nút bấm chuột trái"
      ],
      correctIdx: 0,
      explain: "Trên Internet có rất nhiều phim hoạt hình, bài hát hay và video giải trí cho thiếu nhi."
    },
    {
      id: "gq5",
      icon: "🍳",
      question: "Mẹ bạn Khoa muốn học cách nấu một món ăn ngon mới. Mẹ tìm trên Internet thông tin gì?",
      options: [
        "1. Công thức và video hướng dẫn nấu ăn",
        "2. Lịch kiểm tra học kì của Khoa",
        "3. Mật khẩu máy tính hàng xóm",
        "4. Ảnh chụp màn hình bị lỗi"
      ],
      correctIdx: 0,
      explain: "Internet có hàng nghìn công thức nấu ăn kèm hình ảnh, video hướng dẫn rất dễ hiểu!"
    },
    {
      id: "gq6",
      icon: "🎒",
      question: "Trước khi mua một chiếc balo mới, chị của Khoa vào Internet để làm gì?",
      options: [
        "1. Để máy tính tự đi ra chợ mua hộ",
        "2. Xem mẫu mã, giá cả và đánh giá sản phẩm",
        "3. Xóa hết ảnh lưu trong máy tính",
        "4. Ngồi nghe tiếng gõ bàn phím"
      ],
      correctIdx: 1,
      explain: "Tìm hiểu thông tin sản phẩm trước khi mua trên Internet giúp chọn đồ bền đẹp và hợp túi tiền."
    },
    {
      id: "gq7",
      icon: "🧊",
      question: "Để biết kỷ lục thế giới xoay Rubik 3×3×3 nhanh nhất hiện nay là bao nhiêu giây, em làm thế nào?",
      options: [
        "1. Nhờ người lớn cùng tra cứu trên Internet",
        "2. Tự bịa ra một con số bất kỳ",
        "3. Tìm trong phần mềm Paint",
        "4. Đếm số nút trên bàn phím"
      ],
      correctIdx: 0,
      explain: "Những kỷ lục thế giới không có sẵn trong máy tính, em có thể tra nhanh trên Internet!"
    },
    {
      id: "gq8",
      icon: "📞",
      question: "Muốn trò chuyện nhìn thấy mặt ông bà ở quê ngay lập tức, Internet giúp em làm gì?",
      options: [
        "1. Vẽ tranh rồi cất vào ngăn kéo",
        "2. Gọi video trực tuyến qua Internet",
        "3. Tắt màn hình và đi ngủ",
        "4. Lưu ảnh vào ổ C: rồi để đó"
      ],
      correctIdx: 1,
      explain: "Nhờ Internet, em có thể gọi video để nhìn thấy mặt và nói chuyện cùng người thân ở xa!"
    },
    {
      id: "gq9",
      icon: "💻",
      question: "Khi máy tính KHÔNG có kết nối Internet, em vẫn mở xem được thông tin nào dưới đây?",
      options: [
        "1. Phim hoạt hình mới phát sóng hôm nay",
        "2. Bức ảnh gia đình em đã lưu ở ổ D:",
        "3. Dự báo thời tiết tuần tới",
        "4. Tin tức bóng đá vừa diễn ra"
      ],
      correctIdx: 1,
      explain: "Ảnh và tệp đã lưu sẵn trong ổ đĩa máy tính luôn mở xem được mà không cần Internet."
    },
    {
      id: "gq10",
      icon: "👨‍👩‍👧",
      question: "Khi học sinh lớp 3 muốn truy cập Internet để tìm thông tin, em cần nhớ điều gì nhất?",
      options: [
        "1. Tự ý bấm vào mọi bảng quảng cáo lạ",
        "2. Xin phép và có người lớn hướng dẫn",
        "3. Không cần hỏi bố mẹ hay thầy cô",
        "4. Nhấn thật mạnh vào màn hình"
      ],
      correctIdx: 1,
      explain: "Chuẩn xác! Học sinh lớp 3 luôn cần xin phép và có người lớn hướng dẫn khi vào Internet."
    }
  ],

  vnEpisodes: [
    {
      id: "ep1",
      episodeNum: 1,
      defaultTeam: 1,
      title: "Chuyến Dã Ngoại Bão Táp",
      topic: "Thời tiết • Bản đồ • Hoạt hình • Gọi video",
      theme: {
        accent: "#38bdf8",
        glow: "rgba(14, 165, 233, 0.28)",
        badgeBg: "#0c4a6e"
      },
      stages: [
        {
          stageNum: 1,
          title: "Mây Đen Trước Giờ Xuất Phát",
          situation: "Chuẩn bị ra biển, <span class=\"vn-kw\">mây đen</span> bỗng kéo tới! <span class=\"vn-kw\">[Tên HS]</span> làm gì để kiểm tra trời nắng hay mưa?",
          isTeamVote: false,
          choices: [
            {
              text: "Mở trang dự báo thời tiết hôm nay trên Internet",
              moodDelta: 20,
              sourceType: "internet",
              sourceLabel: "🌐 Nguồn Internet",
              propName: "Bản tin thời tiết trực tuyến",
              propIcon: "🌦️",
              reaction: "sparkle",
              comment: "Tuyệt vời! Dự báo thời tiết cập nhật hằng ngày trên Internet giúp cả nhà chuẩn bị áo mưa kịp thời!"
            },
            {
              text: "Mở Ổ D:\\Anh_Bien_Thang_Truoc xem ảnh nắng đẹp",
              moodDelta: -15,
              sourceType: "local",
              sourceLabel: "💻 Có sẵn trong máy",
              propName: "Ảnh cũ lưu trong máy",
              propIcon: "🖼️",
              reaction: "worried",
              comment: "Ôi! Ảnh cũ lưu trong máy từ tháng trước không thể cho biết thời tiết hôm nay được đâu!"
            },
            {
              text: "Thò đầu ra cửa sổ hít hà rồi phán \"Nắng đẹp!\"",
              moodDelta: -20,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Kính râm tự tin",
              propIcon: "🕶️",
              reaction: "crying",
              comment: "Đoán mò rất dễ gặp mưa bất ngờ dọc đường! Ta cần xem bản tin thời tiết trên Internet."
            }
          ]
        },
        {
          stageNum: 2,
          title: "Ngã Ba Đường Tới Khu Du Lịch",
          situation: "Xe gặp <span class=\"vn-kw\">ngã ba lớn</span> tới khu du lịch. Cần biết <span class=\"vn-kw\">đường đúng</span> và giờ mở cửa mới nhất!",
          isTeamVote: false,
          choices: [
            {
              text: "Tra bản đồ trực tuyến và giờ mở cửa mới nhất trên mạng",
              moodDelta: 20,
              sourceType: "internet",
              sourceLabel: "🌐 Nguồn Internet",
              propName: "Bản đồ số cập nhật",
              propIcon: "🗺️",
              reaction: "sparkle",
              comment: "Chính xác! Bản đồ trực tuyến trên Internet chỉ đường nhanh và báo đúng giờ mở cửa hôm nay."
            },
            {
              text: "Mở tệp ghi chú cũ viết từ năm ngoái trong máy tính",
              moodDelta: -15,
              sourceType: "local",
              sourceLabel: "💻 Có sẵn trong máy",
              propName: "Tệp văn bản cũ",
              propIcon: "📄",
              reaction: "worried",
              comment: "Tệp ghi chú năm ngoái trong máy có thể đã lỗi thời nếu khu du lịch đổi giờ mở cửa!"
            },
            {
              text: "Nhắm mắt chỉ tay đại vào con đường nhiều hoa cỏ",
              moodDelta: -20,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "La bàn xoay tít",
              propIcon: "🧭",
              reaction: "crying",
              comment: "Đi đại theo cảm tính khiến cả xe lạc vòng vo mất bao nhiêu thời gian!"
            }
          ]
        },
        {
          stageNum: 3,
          title: "Trú Mưa Trong Chòi Nghỉ Chân",
          situation: "Cơn <span class=\"vn-kw\">mưa rào</span> trút xuống! Cả nhà vào chòi nghỉ chân, bé em ngồi buồn thiu chán nản.",
          isTeamVote: false,
          choices: [
            {
              text: "Bật kênh hoạt hình thiếu nhi trên Internet cho cả nhà xem",
              moodDelta: 20,
              sourceType: "internet",
              sourceLabel: "🌐 Nguồn Internet",
              propName: "Phim hoạt hình thiếu nhi",
              propIcon: "🎬",
              reaction: "sparkle",
              comment: "Hay quá! Chương trình giải trí thiếu nhi trên Internet giúp cả nhà vui vẻ chờ tạnh mưa."
            },
            {
              text: "Ngồi đếm từng giọt mưa rơi ngoài mái hiên cho đỡ buồn",
              moodDelta: -10,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Cửa sổ mưa rơi",
              propIcon: "🌧️",
              reaction: "worried",
              comment: "Đếm giọt mưa một lúc là ngủ gật mất thôi, chẳng vui bằng xem hoạt hình cùng gia đình!"
            },
            {
              text: "Chạy ra sân múa quạt cầu nắng như phim cổ trang",
              moodDelta: -25,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Lá chuối che đầu",
              propIcon: "🌿",
              reaction: "crying",
              comment: "Chạy ra ngoài lúc trời mưa vừa ướt hết quần áo lại dễ bị cảm lạnh nữa!"
            }
          ]
        },
        {
          stageNum: 4,
          title: "Khẩn Cấp! Lối Về Bị Ngập",
          situation: "Cứu nguy! Nước dâng <span class=\"vn-kw\">ngập lối về cũ</span>. <span class=\"vn-kw\">[Tên HS]</span> giúp bố tìm <span class=\"vn-kw\">đường vòng an toàn</span>!",
          isTeamVote: true,
          choices: [
            {
              text: "Tra ngay tin giao thông và đường vòng an toàn trên Internet",
              moodDelta: 25,
              sourceType: "internet",
              sourceLabel: "🌐 Nguồn Internet",
              propName: "Cảnh báo đường ngập",
              propIcon: "🚦",
              reaction: "sparkle",
              comment: "Xuất sắc! Tin tức giao thông trực tuyến giúp gia đình tránh vùng ngập và về nhà an toàn!"
            },
            {
              text: "Xem lại bản đồ vẽ bằng Paint lưu trong máy từ hồi lớp 2",
              moodDelta: -15,
              sourceType: "local",
              sourceLabel: "💻 Có sẵn trong máy",
              propName: "Bức vẽ Paint cũ",
              propIcon: "🎨",
              reaction: "worried",
              comment: "Tranh vẽ Paint trong máy không thể báo chỗ nào đang ngập nước lúc này đâu!"
            },
            {
              text: "Lội bừa xuống chỗ nước sâu nhất để thử độ nông",
              moodDelta: -30,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Đôi dép trôi nước",
              propIcon: "🩴",
              reaction: "crying",
              comment: "Nguy hiểm quá! Tuyệt đối không lội bừa vào vùng nước ngập sâu khi chưa rõ tình hình."
            }
          ]
        },
        {
          stageNum: 5,
          title: "Cầu Vồng Sau Cơn Mưa",
          situation: "<span class=\"vn-kw\">Cầu vồng rực rỡ</span> hiện ra sau mưa! <span class=\"vn-kw\">[Tên HS]</span> muốn khoe ngay với <span class=\"vn-kw\">ông bà ở quê</span>.",
          isTeamVote: true,
          choices: [
            {
              text: "Gọi video qua Internet khoe ngay cầu vồng với ông bà ở quê",
              moodDelta: 20,
              sourceType: "internet",
              sourceLabel: "🌐 Nguồn Internet",
              propName: "Cuộc gọi video kết nối",
              propIcon: "📱",
              reaction: "sparkle",
              comment: "Ấm áp quá! Internet giúp [Tên HS] kết nối gọi video nhìn thấy nụ cười của ông bà tức thì!"
            },
            {
              text: "Lưu vội tấm ảnh vào máy rồi tắt ngúm màn hình đi ngủ",
              moodDelta: 0,
              sourceType: "local",
              sourceLabel: "💻 Có sẵn trong máy",
              propName: "Ổ đĩa lưu trữ",
              propIcon: "💾",
              reaction: "confident",
              comment: "Lưu ảnh vào máy để giữ kỷ niệm cũng tốt, nhưng ông bà ở quê chưa kịp xem cầu vồng cùng mình rồi!"
            },
            {
              text: "Hét thật to mong ông bà ở cách trăm cây số nghe thấy",
              moodDelta: -20,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Chiếc loa giấy",
              propIcon: "📣",
              reaction: "crying",
              comment: "Hét khản cả cổ ông bà ở cách trăm cây số cũng không nghe thấy đâu!"
            }
          ]
        }
      ],
      endings: {
        e1: {
          title: "Chuyên Gia Khí Tượng Nhí",
          desc: "[Tên HS] dùng Internet siêu đỉnh: xem thời tiết, tra bản đồ, bật hoạt hình và gọi video cho ông bà. Chuyến dã ngoại 10 điểm!"
        },
        e2: {
          title: "Thám Hiểm Gia Lấm Lem",
          desc: "[Tên HS] vượt qua vài pha chọn nhầm lấm lem bùn đất, nhưng vẫn kịp nhờ Internet đưa cả nhà về bình an!"
        },
        e3: {
          title: "Ếch Ộp Bãi Biển",
          desc: "Vì hay đoán mò và mở nhầm tệp cũ trong máy, [Tên HS] ướt như chuột lột! Lần sau nhớ tra Internet đúng lúc nhé!"
        }
      }
    },

    {
      id: "ep2",
      episodeNum: 2,
      defaultTeam: 2,
      title: "Thử Thách MasterChef Nhí",
      topic: "Công thức nấu ăn • Mẹo bếp • Giải trí đúng lúc",
      theme: {
        accent: "#f59e0b",
        glow: "rgba(245, 158, 11, 0.28)",
        badgeBg: "#78350f"
      },
      stages: [
        {
          stageNum: 1,
          title: "Món Trứng Cuộn Đãi Mẹ",
          situation: "<span class=\"vn-kw\">[Tên HS]</span> muốn làm món <span class=\"vn-kw\">trứng cuộn</span> đãi mẹ, nhưng chưa biết <span class=\"vn-kw\">công thức</span> chuẩn!",
          isTeamVote: false,
          choices: [
            {
              text: "Tìm công thức nấu ăn dễ hiểu có hình minh họa trên Internet",
              moodDelta: 20,
              sourceType: "internet",
              sourceLabel: "🌐 Nguồn Internet",
              propName: "Trang công thức nấu ăn",
              propIcon: "🍳",
              reaction: "sparkle",
              comment: "Chuẩn đầu bếp nhí! Giống mẹ bạn Khoa, Internet có sẵn công thức từng bước kèm ảnh rất dễ làm."
            },
            {
              text: "Mở tệp bài văn tả con gà lưu trong máy tính ra đọc",
              moodDelta: -15,
              sourceType: "local",
              sourceLabel: "💻 Có sẵn trong máy",
              propName: "Tệp bài văn mẫu",
              propIcon: "📝",
              reaction: "worried",
              comment: "Bài văn tả con gà không hề dạy cách đánh trứng hay nêm gia vị đâu nha!"
            },
            {
              text: "Đập thẳng 5 quả trứng vào chảo lạnh rồi mới nghĩ cách nấu",
              moodDelta: -20,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Vỏ trứng vỡ tung tóe",
              propIcon: "🥚",
              reaction: "crying",
              comment: "Ái chà! Vỏ trứng rơi lẫn vào chảo rồi, làm bếp phải xem công thức trước chứ!"
            }
          ]
        },
        {
          stageNum: 2,
          title: "Tủ Lạnh Hết Sạch Bơ Lạt",
          situation: "Nguy rồi! Công thức cần <span class=\"vn-kw\">bơ lạt</span> nhưng tủ lạnh <span class=\"vn-kw\">hết sạch</span>. Tìm cách thay thế nào?",
          isTeamVote: false,
          choices: [
            {
              text: "Tra nhanh trên mạng xem nguyên liệu nào thay thế bơ được",
              moodDelta: 20,
              sourceType: "internet",
              sourceLabel: "🌐 Nguồn Internet",
              propName: "Mẹo bếp trực tuyến",
              propIcon: "🧈",
              reaction: "sparkle",
              comment: "Thông minh lắm! Tra Internet biết ngay có thể dùng chút dầu ăn sạch để thay bơ lạt."
            },
            {
              text: "Xem lại hóa đơn đi siêu thị tuần trước lưu trong máy",
              moodDelta: -10,
              sourceType: "local",
              sourceLabel: "💻 Có sẵn trong máy",
              propName: "Ảnh hóa đơn cũ",
              propIcon: "🧾",
              reaction: "worried",
              comment: "Ảnh hóa đơn cũ trong máy chỉ ghi giá tiền, không dạy mẹo thay thế nguyên liệu nấu ăn!"
            },
            {
              text: "Đổ đại nửa lon nước ngọt có ga vào chảo cho có bọt",
              moodDelta: -25,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Lon nước ngọt sủi bọt",
              propIcon: "🥤",
              reaction: "crying",
              comment: "Trời ơi, trứng cuộn vị nước ngọt có ga sủi bọt thì khét lẹt mất rồi!"
            }
          ]
        },
        {
          stageNum: 3,
          title: "Canh Lửa Cuộn Trứng",
          situation: "Làm sao để <span class=\"vn-kw\">cuộn trứng</span> vàng đều, <span class=\"vn-kw\">không bị rách</span>? <span class=\"vn-kw\">[Tên HS]</span> chọn cách nào?",
          isTeamVote: false,
          choices: [
            {
              text: "Xem video hướng dẫn kỹ thuật cuộn trứng lửa nhỏ trên mạng",
              moodDelta: 20,
              sourceType: "internet",
              sourceLabel: "🌐 Nguồn Internet",
              propName: "Video dạy nấu ăn",
              propIcon: "🎥",
              reaction: "sparkle",
              comment: "Xuất sắc! Video trên Internet quay rõ từng động tác lật trứng nhẹ nhàng ở lửa nhỏ."
            },
            {
              text: "Nhìn tấm ảnh món trứng chụp sẵn trong máy rồi đoán cách lật",
              moodDelta: -15,
              sourceType: "local",
              sourceLabel: "💻 Có sẵn trong máy",
              propName: "Ảnh món ăn tĩnh",
              propIcon: "📸",
              reaction: "worried",
              comment: "Ảnh tĩnh trong máy không chuyển động nên khó học được thao tác cuộn tay khéo léo!"
            },
            {
              text: "Vặn lửa to hết cỡ cho trứng chín trong 5 giây",
              moodDelta: -25,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Ngọn lửa bốc cao",
              propIcon: "🔥",
              reaction: "crying",
              comment: "Lửa to quá làm trứng cháy đen xì ngay lập tức! Rất nguy hiểm!"
            }
          ]
        },
        {
          stageNum: 4,
          title: "Nhạc Hay Vang Lên Giữa Bếp",
          situation: "Đang đứng bếp thì <span class=\"vn-kw\">nhạc thiếu nhi</span> hay vang lên! <span class=\"vn-kw\">[Tên HS]</span> xử lý thế nào cho an toàn?",
          isTeamVote: true,
          choices: [
            {
              text: "Tắt bếp an toàn xong mới mở chương trình ca nhạc trên mạng",
              moodDelta: 25,
              sourceType: "internet",
              sourceLabel: "🌐 Nguồn Internet",
              propName: "Nút tắt bếp & Nhạc",
              propIcon: "🎵",
              reaction: "sparkle",
              comment: "Tuyệt đỉnh an toàn! Xong việc bếp núc, tắt bếp hẳn rồi mới giải trí nghe nhạc trên Internet!"
            },
            {
              text: "Vừa cầm xẻng đảo trứng vừa nhảy theo clip ca nhạc trên mạng",
              moodDelta: -20,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Đôi chân nhảy múa",
              propIcon: "💃",
              reaction: "worried",
              comment: "Mải nhảy bên bếp nóng rất dễ làm đổ chảo dầu hoặc bỏng tay đó!"
            },
            {
              text: "Bỏ mặc chảo trên bếp, chạy ra phòng khách xem hết hoạt hình",
              moodDelta: -30,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Khói đen nghi ngút",
              propIcon: "💨",
              reaction: "crying",
              comment: "Báo động cháy! Tuyệt đối không bỏ quên bếp đang bật để chạy đi xem phim!"
            }
          ]
        },
        {
          stageNum: 5,
          title: "Mẹ Sắp Bước Vào Nghiệm Thu",
          situation: "Còn 1 phút nữa mẹ vào bếp! <span class=\"vn-kw\">[Tên HS]</span> trình bày <span class=\"vn-kw\">đĩa trứng cuộn</span> thế nào cho đẹp?",
          isTeamVote: true,
          choices: [
            {
              text: "Tham khảo cách trang trí đĩa đẹp mắt trên Internet để bày biện",
              moodDelta: 20,
              sourceType: "internet",
              sourceLabel: "🌐 Nguồn Internet",
              propName: "Mẫu trang trí đĩa 5 sao",
              propIcon: "🍽️",
              reaction: "sparkle",
              comment: "Đẹp như nhà hàng! Đĩa trứng cuộn xếp hình mặt cười khiến mẹ vui rạng rỡ luôn!"
            },
            {
              text: "Bưng nguyên chiếc chảo đen sì đặt thẳng lên bàn ăn",
              moodDelta: -10,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Chảo dính nhọ nồi",
              propIcon: "🍳",
              reaction: "worried",
              comment: "Bưng cả chảo nóng lên bàn vừa kém đẹp mắt lại dễ làm bỏng hoặc xước mặt bàn!"
            },
            {
              text: "Lấy bút sáp màu vẽ thêm rau củ lên đĩa cho sinh động",
              moodDelta: -20,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Hộp bút sáp màu",
              propIcon: "🖍️",
              reaction: "crying",
              comment: "Úi! Bút sáp màu không ăn được đâu, dính vào thức ăn là hỏng hết món ăn!"
            }
          ]
        }
      ],
      endings: {
        e1: {
          title: "Đầu Bếp Nhí 5 Sao",
          desc: "[Tên HS] khéo léo tra công thức, mẹo bếp trên Internet và tắt bếp an toàn trước khi nghe nhạc. Mẹ chấm 100 điểm!"
        },
        e2: {
          title: "Đầu Bếp Tập Sự",
          desc: "Món trứng của [Tên HS] hơi méo một chút vì vài pha lúng túng, nhưng tấm lòng yêu mẹ vẫn làm cả nhà ấm áp!"
        },
        e3: {
          title: "Vua Bóng Đêm Nhà Bếp",
          desc: "Khói bay mù mịt vì làm theo cảm tính! Lần sau [Tên HS] nhớ xem video hướng dẫn và giữ an toàn bếp nhé!"
        }
      }
    },

    {
      id: "ep3",
      episodeNum: 3,
      defaultTeam: 3,
      title: "Phi Vụ Săn Balo Độc Bản",
      topic: "Tìm hiểu thông tin sản phẩm trước khi mua",
      theme: {
        accent: "#10b981",
        glow: "rgba(16, 185, 129, 0.28)",
        badgeBg: "#064e3b"
      },
      stages: [
        {
          stageNum: 1,
          title: "Khảo Sát Mẫu Balo Mới",
          situation: "Năm học mới sắp tới! <span class=\"vn-kw\">[Tên HS]</span> tìm hiểu <span class=\"vn-kw\">mẫu balo chống gù</span> trước khi mua bằng cách nào?",
          isTeamVote: false,
          choices: [
            {
              text: "Vào Internet xem trước các mẫu balo chống gù và kích thước",
              moodDelta: 20,
              sourceType: "internet",
              sourceLabel: "🌐 Nguồn Internet",
              propName: "Danh mục balo trực tuyến",
              propIcon: "🎒",
              reaction: "sparkle",
              comment: "Quá chuẩn! Giống chị bạn Khoa, xem trước thông tin trên Internet giúp chọn đúng kích thước hợp dáng người."
            },
            {
              text: "Mở thư mục ảnh cũ xem lại chiếc balo rách hồi lớp 1",
              moodDelta: -15,
              sourceType: "local",
              sourceLabel: "💻 Có sẵn trong máy",
              propName: "Ảnh balo cũ kỹ",
              propIcon: "🗂️",
              reaction: "worried",
              comment: "Ảnh balo cũ lớp 1 trong máy nhỏ xíu rồi, không có mẫu mã mới của năm nay đâu!"
            },
            {
              text: "Chạy ngay ra chợ mua đại chiếc balo to bằng cả người",
              moodDelta: -20,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Balo khổng lồ",
              propIcon: "📦",
              reaction: "crying",
              comment: "Mua đại không tìm hiểu trước khiến đeo nặng trĩu vai, dễ đau lưng lắm!"
            }
          ]
        },
        {
          stageNum: 2,
          title: "Chọn Cửa Hàng Uy Tín",
          situation: "Có 3 cửa hàng bán balo. Làm sao <span class=\"vn-kw\">[Tên HS]</span> biết tiệm nào <span class=\"vn-kw\">bán hàng uy tín</span>?",
          isTeamVote: false,
          choices: [
            {
              text: "Đọc bình luận đánh giá của người mua trước trên mạng",
              moodDelta: 20,
              sourceType: "internet",
              sourceLabel: "🌐 Nguồn Internet",
              propName: "Bảng đánh giá 5 sao",
              propIcon: "⭐",
              reaction: "sparkle",
              comment: "Thông thái! Đọc nhận xét của những người đã mua trên Internet giúp biết chất lượng thật."
            },
            {
              text: "Đoán mò cửa hàng nào có bảng hiệu sơn màu đỏ là uy tín",
              moodDelta: -15,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Bảng hiệu màu đỏ",
              propIcon: "🟥",
              reaction: "worried",
              comment: "Màu sơn bảng hiệu không nói lên chất lượng balo bên trong đâu nhé!"
            },
            {
              text: "Chọn bừa tiệm đắt gấp đôi vì nghĩ đắt là xịn",
              moodDelta: -20,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Túi tiền xẹp lép",
              propIcon: "💸",
              reaction: "crying",
              comment: "Chưa tìm hiểu giá trên Internet nên mất oan tiền gấp đôi mà chưa chắc bền!"
            }
          ]
        },
        {
          stageNum: 3,
          title: "Tin Đồn Tặng Hộp Bút",
          situation: "Nghe bạn đồn tiệm có <span class=\"vn-kw\">quà tặng hộp bút</span>. <span class=\"vn-kw\">[Tên HS]</span> kiểm tra thông tin chính xác ở đâu?",
          isTeamVote: false,
          choices: [
            {
              text: "Truy cập trang chính thức của cửa hàng xem giờ khuyến mãi",
              moodDelta: 20,
              sourceType: "internet",
              sourceLabel: "🌐 Nguồn Internet",
              propName: "Thông báo khuyến mãi",
              propIcon: "🎁",
              reaction: "sparkle",
              comment: "Chính xác! Xem thông báo chính thức trên Internet giúp biết đúng giờ vàng nhận quà!"
            },
            {
              text: "Tin lời đồn truyền miệng rằng chương trình đã hết hạn hôm qua",
              moodDelta: -15,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Tin đồn vỉa hè",
              propIcon: "💬",
              reaction: "worried",
              comment: "Tin lời đồn không kiểm tra lại suýt nữa thì bỏ lỡ món quà hộp bút xinh xắn!"
            },
            {
              text: "Đứng trước cửa tiệm oẳn tù tì xem có được giảm giá không",
              moodDelta: -20,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Kéo búa bao",
              propIcon: "✌️",
              reaction: "crying",
              comment: "Oẳn tù tì không thay thế thông tin khuyến mãi chính thức của cửa hàng được đâu!"
            }
          ]
        },
        {
          stageNum: 4,
          title: "Tem Nhãn Hơi Lạ Ở Quầy",
          situation: "Cứu nguy! Chiếc balo ở quầy có <span class=\"vn-kw\">tem nhãn hơi lạ</span>. <span class=\"vn-kw\">[Tên HS]</span> kiểm tra hàng thật thế nào?",
          isTeamVote: true,
          choices: [
            {
              text: "Tra cứu cách nhận biết hàng chính hãng trên trang chủ sản phẩm",
              moodDelta: 25,
              sourceType: "internet",
              sourceLabel: "🌐 Nguồn Internet",
              propName: "Tem xác thực chính hãng",
              propIcon: "🛡️",
              reaction: "sparkle",
              comment: "Quá đỉnh! Nhờ hướng dẫn trên Internet, [Tên HS] phân biệt chuẩn hàng chính hãng, không bị mua hớ!"
            },
            {
              text: "Tặc lưỡi trả tiền luôn cho nhanh vì lười kiểm tra",
              moodDelta: -15,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Hóa đơn thanh toán vội",
              propIcon: "🧾",
              reaction: "worried",
              comment: "Vội vàng trả tiền mà không kiểm tra rất dễ mua phải chiếc balo dễ rách!"
            },
            {
              text: "Ngửi thử mùi vải balo để đoán xem có phải hàng thật không",
              moodDelta: -25,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Chiếc mũi đánh hơi",
              propIcon: "👃",
              reaction: "crying",
              comment: "Hắt xì! Ngửi mùi vải không thể kiểm tra tem chống giả chính hãng được đâu!"
            }
          ]
        },
        {
          stageNum: 5,
          title: "Khóa Kéo Ngăn Phụ Bị Kẹt",
          situation: "Về tới nhà, <span class=\"vn-kw\">khóa kéo</span> ngăn phụ bị <span class=\"vn-kw\">kẹt cứng</span>! <span class=\"vn-kw\">[Tên HS]</span> xử lý sao?",
          isTeamVote: true,
          choices: [
            {
              text: "Tra mẹo dùng sáp nến bôi trơn khóa kéo trên Internet",
              moodDelta: 20,
              sourceType: "internet",
              sourceLabel: "🌐 Nguồn Internet",
              propName: "Cây nến sáp trắng",
              propIcon: "🕯️",
              reaction: "sparkle",
              comment: "Mẹo hay tuyệt! Chà nhẹ sáp nến theo hướng dẫn trên Internet là khóa kéo trơn tru ngay!"
            },
            {
              text: "Dùng hết sức giật mạnh làm bung cả dây khóa",
              moodDelta: -25,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Đầu khóa kéo gãy đôi",
              propIcon: "⛓️",
              reaction: "crying",
              comment: "Rắc! Giật mạnh làm gãy luôn đầu khóa kéo chiếc balo mới tinh rồi!"
            },
            {
              text: "Cất tịt balo vào đáy tủ không dám đụng tới nữa",
              moodDelta: -10,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Cánh cửa tủ đóng chặt",
              propIcon: "🚪",
              reaction: "worried",
              comment: "Cất vào tủ thì lấy đâu balo đẹp để ngày mai tung tăng đến trường!"
            }
          ]
        }
      ],
      endings: {
        e1: {
          title: "Chuyên Gia Mua Sắm Thông Thái",
          desc: "[Tên HS] tra cứu kỹ mẫu mã, đánh giá, khuyến mãi và mẹo sửa khóa trên Internet. Săn được chiếc balo 10 điểm!"
        },
        e2: {
          title: "Người Mua Hàng May Mắn",
          desc: "Tuy hơi bối rối lúc chọn tiệm, [Tên HS] vẫn kịp kiểm tra thông tin trên mạng để mang về chiếc balo ưng ý!"
        },
        e3: {
          title: "Nạn Nhân Hàng Giả",
          desc: "Toàn đoán mò không chịu tra Internet trước khi mua nên balo vừa đắt vừa hỏng khóa! Rút kinh nghiệm nhé!"
        }
      }
    },

    {
      id: "ep4",
      episodeNum: 4,
      defaultTeam: 4,
      title: "Đêm Chung Kết Siêu Kinh Điển",
      topic: "Tin tức thể thao & Chương trình giải trí",
      theme: {
        accent: "#f43f5e",
        glow: "rgba(244, 63, 94, 0.28)",
        badgeBg: "#881337"
      },
      stages: [
        {
          stageNum: 1,
          title: "Xem Giờ Bóng Lăn Tối Nay",
          situation: "Tối nay có <span class=\"vn-kw\">trận chung kết</span> bóng đá! <span class=\"vn-kw\">[Tên HS]</span> xem <span class=\"vn-kw\">giờ thi đấu chuẩn</span> ở đâu?",
          isTeamVote: false,
          choices: [
            {
              text: "Mở trang tin tức thể thao trên Internet xem lịch thi đấu chuẩn",
              moodDelta: 20,
              sourceType: "internet",
              sourceLabel: "🌐 Nguồn Internet",
              propName: "Bảng lịch thi đấu",
              propIcon: "⚽",
              reaction: "sparkle",
              comment: "Chuẩn xác! Lịch thi đấu bóng đá là tin tức được cập nhật chính xác nhất trên Internet."
            },
            {
              text: "Mở tờ báo thể thao cũ in từ tháng trước để tìm giờ đá",
              moodDelta: -15,
              sourceType: "local",
              sourceLabel: "💻 Có sẵn trong máy",
              propName: "Tờ báo cũ ố vàng",
              propIcon: "🗞️",
              reaction: "worried",
              comment: "Báo tháng trước chỉ có lịch các trận đã đá xong rồi, không có giờ trận tối nay đâu!"
            },
            {
              text: "Cãi nhau với hàng xóm xem ai hét to hơn thì giờ người đó đúng",
              moodDelta: -20,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Loa phóng thanh",
              propIcon: "📢",
              reaction: "crying",
              comment: "Hét to đâu làm thay đổi giờ thi đấu được! Mở Internet tra 5 giây là rõ ngay."
            }
          ]
        },
        {
          stageNum: 2,
          title: "Ông Nội Đang Xem Tivi",
          situation: "Ông nội đang xem cải lương trên TV! <span class=\"vn-kw\">[Tên HS]</span> muốn xem <span class=\"vn-kw\">trận bóng</span> thật ngoan thì làm sao?",
          isTeamVote: false,
          choices: [
            {
              text: "Xin phép bố mở kênh thể thao trực tuyến trên máy tính nối mạng",
              moodDelta: 20,
              sourceType: "internet",
              sourceLabel: "🌐 Nguồn Internet",
              propName: "Truyền hình trực tuyến",
              propIcon: "📺",
              reaction: "sparkle",
              comment: "Vừa lễ phép xin phép người lớn, vừa xem trực tiếp sắc nét trên Internet! Quá tuyệt!"
            },
            {
              text: "Mở thư mục ảnh cầu thủ lưu sẵn trong máy ngồi ngắm đỡ thèm",
              moodDelta: -15,
              sourceType: "local",
              sourceLabel: "💻 Có sẵn trong máy",
              propName: "Thư mục ảnh tĩnh",
              propIcon: "🖼️",
              reaction: "worried",
              comment: "Ảnh tĩnh lưu trong máy thì cầu thủ đứng yên một chỗ, đâu thấy trận đấu đang diễn ra!"
            },
            {
              text: "Đứng ngoài cửa sổ ngó ké TV nhà hàng xóm qua khe cửa",
              moodDelta: -20,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Khe cửa hẹp",
              propIcon: "🪟",
              reaction: "crying",
              comment: "Ngó qua khe cửa vừa mỏi mắt vừa bị muỗi đốt tơi bời luôn!"
            }
          ]
        },
        {
          stageNum: 3,
          title: "Màn Hình Bỗng Quay Vòng Tròn",
          situation: "Đang hiệp 2 gay cấn, màn hình bỗng <span class=\"vn-kw\">quay vòng tròn</span> mất hình! <span class=\"vn-kw\">[Tên HS]</span> xử lý sao?",
          isTeamVote: false,
          choices: [
            {
              text: "Bình tĩnh kiểm tra kết nối mạng và tải lại trang phát sóng",
              moodDelta: 20,
              sourceType: "internet",
              sourceLabel: "🌐 Nguồn Internet",
              propName: "Nút làm mới trang",
              propIcon: "🔄",
              reaction: "sparkle",
              comment: "Bình tĩnh xử lý chuẩn kỹ thuật! Kiểm tra Wi-Fi và bấm tải lại là xem mượt ngay!"
            },
            {
              text: "Tắt mạng đi rồi bật trò chơi xếp hình offline trong máy",
              moodDelta: -10,
              sourceType: "local",
              sourceLabel: "💻 Có sẵn trong máy",
              propName: "Game xếp hình offline",
              propIcon: "🧩",
              reaction: "worried",
              comment: "Tắt mạng là bỏ lỡ luôn hiệp 2 trận chung kết siêu hấp dẫn rồi!"
            },
            {
              text: "Đập bôm bốp vào cạnh màn hình mong hình ảnh tự chạy lại",
              moodDelta: -25,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Màn hình rung lắc",
              propIcon: "💥",
              reaction: "crying",
              comment: "Ôi không! Đập vào màn hình có thể làm hỏng phần cứng máy tính đó!"
            }
          ]
        },
        {
          stageNum: 4,
          title: "Chớp Mắt Bỏ Lỡ Bàn Thắng Vàng",
          situation: "Cứu nguy! Phút 90+2 ghi bàn nhưng <span class=\"vn-kw\">[Tên HS]</span> lỡ <span class=\"vn-kw\">chớp mắt</span>! Làm sao xem lại?",
          isTeamVote: true,
          choices: [
            {
              text: "Xem lại video quay chậm các góc máy trên trang tin thể thao",
              moodDelta: 25,
              sourceType: "internet",
              sourceLabel: "🌐 Nguồn Internet",
              propName: "Video quay chậm",
              propIcon: "🎞️",
              reaction: "sparkle",
              comment: "Quá đã! Video quay chậm trên Internet cho xem rõ từng pha sút bóng đẹp mắt!"
            },
            {
              text: "Mở Paint lên tự vẽ lại quỹ đạo bóng bay theo trí tưởng tượng",
              moodDelta: -15,
              sourceType: "local",
              sourceLabel: "💻 Có sẵn trong máy",
              propName: "Hình vẽ Paint",
              propIcon: "🎨",
              reaction: "worried",
              comment: "Vẽ Paint chỉ là tưởng tượng thôi, không thấy được cú sút thật của cầu thủ đâu!"
            },
            {
              text: "Tắt máy đi ngủ sớm từ phút 85 nên sáng ra ngơ ngác",
              moodDelta: -25,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Chiếc gối ngủ say",
              propIcon: "🛌",
              reaction: "crying",
              comment: "Ngủ quên ngay phút quyết định nên sáng ra chẳng biết ai thắng luôn!"
            }
          ]
        },
        {
          stageNum: 5,
          title: "Cả Lớp Bàn Về Vua Phá Lưới",
          situation: "Sáng hôm sau, cả lớp hỏi ai là <span class=\"vn-kw\">Vua phá lưới</span> giải này! <span class=\"vn-kw\">[Tên HS]</span> tra ở đâu?",
          isTeamVote: true,
          choices: [
            {
              text: "Tra bảng xếp hạng và tin tổng hợp sau trận đấu trên Internet",
              moodDelta: 20,
              sourceType: "internet",
              sourceLabel: "🌐 Nguồn Internet",
              propName: "Bảng xếp hạng mới nhất",
              propIcon: "🏆",
              reaction: "sparkle",
              comment: "Chuẩn bình luận viên! Tin tổng hợp trên Internet có đủ số bàn thắng và bảng xếp hạng mới nhất."
            },
            {
              text: "Lấy danh sách cầu thủ mùa giải năm ngoái lưu trong máy ra đọc",
              moodDelta: -15,
              sourceType: "local",
              sourceLabel: "💻 Có sẵn trong máy",
              propName: "Danh sách mùa cũ",
              propIcon: "📋",
              reaction: "worried",
              comment: "Danh sách mùa cũ lưu trong máy năm ngoái không đúng với giải đấu đêm qua đâu!"
            },
            {
              text: "Bịa đại tên một cầu thủ dự bị để khoe với cả lớp",
              moodDelta: -20,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Chiếc mũi dài ra",
              propIcon: "🤥",
              reaction: "crying",
              comment: "Nói sai sự thật cả lớp phát hiện ra ngay là ngượng chín mặt luôn!"
            }
          ]
        }
      ],
      endings: {
        e1: {
          title: "Bình Luận Viên Bóng Đá Nhí",
          desc: "[Tên HS] nắm trọn giờ đá, xem trực tiếp đúng phép, xem lại bàn thắng và thuộc làu bảng xếp hạng nhờ Internet!"
        },
        e2: {
          title: "Khán Giả Nhiệt Tình",
          desc: "Dù mạng có lúc chập chờn và suýt bỏ lỡ bàn thắng, [Tên HS] vẫn kịp cập nhật kết quả trên Internet cùng bạn bè!"
        },
        e3: {
          title: "Cổ Động Viên Ngủ Gật",
          desc: "Xem báo cũ, đập màn hình lại còn ngủ quên phút chót! Nhớ tận dụng tin tức thể thao trên Internet nhé!"
        }
      }
    },

    {
      id: "ep5",
      episodeNum: 5,
      defaultTeam: 5,
      title: "Đại Chiến Kỷ Lục Rubik",
      topic: "Kỷ lục Rubik 3×3×3 trong SGK & Video hướng dẫn",
      theme: {
        accent: "#a855f7",
        glow: "rgba(168, 85, 247, 0.28)",
        badgeBg: "#4c1d95"
      },
      stages: [
        {
          stageNum: 1,
          title: "Kỷ Lục 1 Giây Có Thật Không?",
          situation: "Tí khoe phá <span class=\"vn-kw\">kỷ lục thế giới</span> xoay <span class=\"vn-kw\">Rubik 3×3×3</span> mất 1 giây! <span class=\"vn-kw\">[Tên HS]</span> kiểm chứng thế nào?",
          isTeamVote: false,
          choices: [
            {
              text: "Mở Internet tra bảng kỷ lục xoay Rubik 3×3×3 thế giới hiện nay",
              moodDelta: 20,
              sourceType: "internet",
              sourceLabel: "🌐 Nguồn Internet",
              propName: "Bảng kỷ lục thế giới",
              propIcon: "🧊",
              reaction: "sparkle",
              comment: "Quá chuẩn! Giống bài học trong SGK, tra Internet là biết ngay kỷ lục thế giới thật khoảng hơn 3 giây!"
            },
            {
              text: "Tin sái cổ và phong ngay cho Tí làm vô địch thế giới",
              moodDelta: -15,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Chiếc cúp giấy",
              propIcon: "🏆",
              reaction: "worried",
              comment: "Tí chỉ đùa cho vui thôi mà tin ngay không kiểm chứng trên Internet là bị hớ rồi!"
            },
            {
              text: "Mở máy tính bỏ túi trong Windows bấm đại vài số để so sánh",
              moodDelta: -20,
              sourceType: "local",
              sourceLabel: "💻 Có sẵn trong máy",
              propName: "Phần mềm Calculator",
              propIcon: "🧮",
              reaction: "crying",
              comment: "Máy tính bỏ túi trong Windows chỉ biết cộng trừ nhân chia, không chứa bảng kỷ lục thế giới đâu!"
            }
          ]
        },
        {
          stageNum: 2,
          title: "Mới Xoay Được Một Mặt",
          situation: "Giờ ra chơi thi xoay Rubik, <span class=\"vn-kw\">[Tên HS]</span> mới làm được <span class=\"vn-kw\">1 mặt</span>. Học bí kíp ở đâu?",
          isTeamVote: false,
          choices: [
            {
              text: "Tìm video hướng dẫn công thức xoay Rubik cơ bản trên mạng",
              moodDelta: 20,
              sourceType: "internet",
              sourceLabel: "🌐 Nguồn Internet",
              propName: "Video giải Rubik",
              propIcon: "🎬",
              reaction: "sparkle",
              comment: "Tuyệt vời! Video trên Internet hướng dẫn từng bước xoay tầng 1, tầng 2, tầng 3 siêu dễ hiểu!"
            },
            {
              text: "Cắm đầu xoay loạn xạ 100 vòng hy vọng các màu tự khớp",
              moodDelta: -15,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Khối Rubik rối tung",
              propIcon: "🌀",
              reaction: "worried",
              comment: "Xoay loạn xạ không theo công thức làm khối Rubik càng rối tung thêm!"
            },
            {
              text: "Lén bóc từng miếng dán màu trên khối Rubik ra dán lại",
              moodDelta: -25,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Miếng dán bong tróc",
              propIcon: "🩹",
              reaction: "crying",
              comment: "Ái chà! Bóc miếng dán là phạm luật thi đấu và làm hỏng luôn khối Rubik đẹp!"
            }
          ]
        },
        {
          stageNum: 3,
          title: "Viên Góc Rubik Bật Ra Ngoài",
          situation: "Xoay nhanh quá làm <span class=\"vn-kw\">một viên góc Rubik</span> bị bật ra ngoài! <span class=\"vn-kw\">[Tên HS]</span> lắp lại sao cho đúng?",
          isTeamVote: false,
          choices: [
            {
              text: "Xem video hướng dẫn cách lắp khớp Rubik đúng chiều trên mạng",
              moodDelta: 20,
              sourceType: "internet",
              sourceLabel: "🌐 Nguồn Internet",
              propName: "Sơ đồ khớp nối Rubik",
              propIcon: "🔧",
              reaction: "sparkle",
              comment: "Khéo tay quá! Xem sơ đồ trên Internet giúp lắp nhẹ nhàng khớp đúng ngàm không gãy nhựa."
            },
            {
              text: "Dùng sức ấn mạnh viên góc vào khe hẹp làm gãy chốt nhựa",
              moodDelta: -25,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Mảnh nhựa gãy vụn",
              propIcon: "💔",
              reaction: "crying",
              comment: "Cạch! Ấn bừa mạnh tay làm gãy mất chốt nhựa bên trong khối Rubik rồi!"
            },
            {
              text: "Lấy băng dính đen quấn chặt quanh khối Rubik cho khỏi rơi",
              moodDelta: -15,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Cuộn băng dính đen",
              propIcon: "📼",
              reaction: "worried",
              comment: "Quấn băng dính kín mít rồi thì làm sao mà xoay được các mặt nữa!"
            }
          ]
        },
        {
          stageNum: 4,
          title: "Còn 10 Giây Cuối Tầng 3",
          situation: "Cứu nguy! Còn 10 giây nhưng quên <span class=\"vn-kw\">công thức tầng 3</span>. <span class=\"vn-kw\">[Tên HS]</span> tìm nhanh bằng cách nào?",
          isTeamVote: true,
          choices: [
            {
              text: "Tua nhanh tới đúng đoạn công thức tầng cuối trong video hướng dẫn",
              moodDelta: 25,
              sourceType: "internet",
              sourceLabel: "🌐 Nguồn Internet",
              propName: "Mốc thời gian video",
              propIcon: "⏩",
              reaction: "sparkle",
              comment: "Phản xạ cực nhanh! Tua đúng mốc thời gian trong video trên Internet giúp chốt gọn tầng 3!"
            },
            {
              text: "Mở ảnh chụp màn hình cũ mờ tịt lưu trong máy ra căng mắt đọc",
              moodDelta: -15,
              sourceType: "local",
              sourceLabel: "💻 Có sẵn trong máy",
              propName: "Tấm ảnh mờ nhòe",
              propIcon: "🖼️",
              reaction: "worried",
              comment: "Ảnh mờ tịt chẳng đọc nổi ký hiệu xoay trái hay xoay phải nữa, hết giờ mất!"
            },
            {
              text: "Nhắm mắt xoay bừa theo tiếng gọi của vũ trụ",
              moodDelta: -25,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Đôi mắt nhắm nghiền",
              propIcon: "🙈",
              reaction: "crying",
              comment: "Nhắm mắt xoay bừa làm rối tung cả 2 tầng vừa giải xong!"
            }
          ]
        },
        {
          stageNum: 5,
          title: "Hoàn Thành 6 Mặt Rubik Chuẩn Xác",
          situation: "Tuyệt vời! <span class=\"vn-kw\">[Tên HS]</span> giải xong <span class=\"vn-kw\">6 mặt Rubik</span>! Bạn làm gì tiếp theo?",
          isTeamVote: true,
          choices: [
            {
              text: "Chia sẻ thành tích và gửi video hướng dẫn hay cho bạn qua mạng",
              moodDelta: 20,
              sourceType: "internet",
              sourceLabel: "🌐 Nguồn Internet",
              propName: "Tin nhắn chia sẻ bí kíp",
              propIcon: "🌟",
              reaction: "sparkle",
              comment: "Tinh thần đồng đội tuyệt vời! Chia sẻ video học tập hay qua Internet giúp cả nhóm cùng giỏi!"
            },
            {
              text: "Cất khối Rubik vào cặp rồi ngồi im không nói với ai",
              moodDelta: 5,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Chiếc cặp kéo khóa",
              propIcon: "💼",
              reaction: "confident",
              comment: "Giữ bí kíp cho riêng mình cũng tạm được, nhưng chia sẻ với bạn bè sẽ vui hơn nhiều!"
            },
            {
              text: "Tung khối Rubik lên trần nhà ăn mừng làm rơi trúng đầu",
              moodDelta: -20,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Cục u trên trán",
              propIcon: "🤕",
              reaction: "crying",
              comment: "Bốp! Cục Rubik nặng rơi trúng trán u một cục to tướng rồi kìa!"
            }
          ]
        }
      ],
      endings: {
        e1: {
          title: "Kiện Tướng Rubik Học Đường",
          desc: "[Tên HS] dùng Internet kiểm chứng kỷ lục, học video công thức và sửa khớp Rubik cực đỉnh. Cả trường ngưỡng mộ!"
        },
        e2: {
          title: "Người Chơi Hệ Kiên Trì",
          desc: "Dù có lúc xoay nhầm hay kẹt khóa, [Tên HS] vẫn kiên trì tra video hướng dẫn trên mạng để hoàn thành 6 mặt!"
        },
        e3: {
          title: "Thợ Sửa Rubik Bất Đắc Dĩ",
          desc: "Dùng sức ấn gãy chốt lại còn tung lên trúng đầu! Lần sau nhớ xem hướng dẫn trên Internet nhé!"
        }
      }
    },

    {
      id: "ep6",
      episodeNum: 6,
      defaultTeam: 6,
      title: "Chiến Dịch Sinh Nhật Bí Mật",
      topic: "Gọi video người thân • Giải trí • Tự làm việc nhà",
      theme: {
        accent: "#ec4899",
        glow: "rgba(236, 72, 153, 0.28)",
        badgeBg: "#831843"
      },
      stages: [
        {
          stageNum: 1,
          title: "Xin Bí Kíp Quà Tặng Mẹ",
          situation: "Hôm nay <span class=\"vn-kw\">sinh nhật mẹ</span>! <span class=\"vn-kw\">[Tên HS]</span> muốn hỏi <span class=\"vn-kw\">bà ngoại ở quê</span> xem mẹ thích quà gì.",
          isTeamVote: false,
          choices: [
            {
              text: "Gọi video qua Internet hỏi thăm và xin bí kíp từ bà ngoại ở quê",
              moodDelta: 20,
              sourceType: "internet",
              sourceLabel: "🌐 Nguồn Internet",
              propName: "Cuộc gọi video với bà",
              propIcon: "👵",
              reaction: "sparkle",
              comment: "Hiếu thảo quá! Gọi video qua Internet vừa hỏi thăm sức khỏe bà ngoại vừa biết bí kíp tặng mẹ!"
            },
            {
              text: "Mở tệp danh sách đồ dùng học tập cũ trong máy ra chọn đại",
              moodDelta: -15,
              sourceType: "local",
              sourceLabel: "💻 Có sẵn trong máy",
              propName: "Tệp danh sách cũ",
              propIcon: "📄",
              reaction: "worried",
              comment: "Danh sách thước kẻ, bảng con trong máy là đồ của học sinh mà, đâu phải quà sinh nhật mẹ!"
            },
            {
              text: "Tự đoán mẹ thích một bộ siêu nhân biến hình giống mình",
              moodDelta: -20,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Mô hình siêu nhân",
              propIcon: "🤖",
              reaction: "crying",
              comment: "Hihi, bộ siêu nhân biến hình là sở thích của [Tên HS] chứ không phải của mẹ đâu!"
            }
          ]
        },
        {
          stageNum: 2,
          title: "Bà Bật Mí Thiệp Thủ Công 3D",
          situation: "Bà ngoại bật mí mẹ thích <span class=\"vn-kw\">thiệp thủ công 3D</span>! <span class=\"vn-kw\">[Tên HS]</span> học cách gấp ở đâu?",
          isTeamVote: false,
          choices: [
            {
              text: "Tìm video hướng dẫn gấp thiệp hoa nổi đơn giản trên Internet",
              moodDelta: 20,
              sourceType: "internet",
              sourceLabel: "🌐 Nguồn Internet",
              propName: "Video gấp thiệp 3D",
              propIcon: "💐",
              reaction: "sparkle",
              comment: "Tuyệt vời! Video trên Internet hướng dẫn từng nếp gấp, nét cắt rất rõ ràng cho học sinh lớp 3!"
            },
            {
              text: "Mở tệp văn bản toàn chữ không có hình hướng dẫn trong máy",
              moodDelta: -15,
              sourceType: "local",
              sourceLabel: "💻 Có sẵn trong máy",
              propName: "Trang văn bản dày chữ",
              propIcon: "📃",
              reaction: "worried",
              comment: "Văn bản toàn chữ không có hình minh họa khiến mình chẳng hình dung được phải gấp chỗ nào!"
            },
            {
              text: "Cắt giấy theo cảm tính ra một hình thù không ai nhận ra",
              moodDelta: -20,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Mảnh giấy nham nhở",
              propIcon: "✂️",
              reaction: "crying",
              comment: "Cắt nham nhở hết cả tập giấy màu rồi, tấm thiệp hoa nổi bị rách mất tiêu!"
            }
          ]
        },
        {
          stageNum: 3,
          title: "Tô Màu Thiệp & Nhạc Vui Tươi",
          situation: "Đang <span class=\"vn-kw\">tô màu thiệp</span>, <span class=\"vn-kw\">[Tên HS]</span> muốn có chút <span class=\"vn-kw\">không khí vui tươi</span> nhưng phải kịp giờ!",
          isTeamVote: false,
          choices: [
            {
              text: "Mở danh sách nhạc chúc mừng sinh nhật thiếu nhi trên Internet",
              moodDelta: 20,
              sourceType: "internet",
              sourceLabel: "🌐 Nguồn Internet",
              propName: "Nhạc chúc mừng sinh nhật",
              propIcon: "🎶",
              reaction: "sparkle",
              comment: "Chuẩn luôn! Nghe nhạc thiếu nhi trên Internet vừa tạo không khí vui tươi vừa tập trung tô thiệp đẹp!"
            },
            {
              text: "Mải bật phim hoạt hình dài tập xem say sưa quên cả tô màu",
              moodDelta: -25,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Đồng hồ chạy vù vù",
              propIcon: "⏰",
              reaction: "crying",
              comment: "Ối! Mải xem phim hoạt hình quên mất giờ rồi, tấm thiệp vẫn còn trắng tinh kìa!"
            },
            {
              text: "Ngồi gõ thìa vào cốc nước tự hát một mình",
              moodDelta: -10,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Chiếc thìa inox",
              propIcon: "🥄",
              reaction: "worried",
              comment: "Gõ thìa làm bận cả hai tay thì lấy tay đâu để cầm bút tô màu thiệp đây!"
            }
          ]
        },
        {
          stageNum: 4,
          title: "Giấy Vụn Đầy Sàn Khi Mẹ Về",
          situation: "Cứu nguy! <span class=\"vn-kw\">Giấy vụn đầy sàn</span> mà xe mẹ đã tới cổng! <span class=\"vn-kw\">[Tên HS]</span> làm gì ngay?",
          isTeamVote: true,
          choices: [
            {
              text: "Lập tức tắt máy, tự tay cầm chổi quét dọn sàn nhà sạch bóng",
              moodDelta: 25,
              sourceType: "internet",
              sourceLabel: "🌐 Internet & Tự lập",
              propName: "Cây chổi quét nhà",
              propIcon: "🧹",
              reaction: "sparkle",
              comment: "10 điểm ngoan ngoãn! Máy tính & Internet giúp tra cứu nhưng việc nhà thì chính tay ta tự dọn sạch sẽ!"
            },
            {
              text: "Ngồi gõ bàn phím ra lệnh cho máy tính tự quét nhà giùm",
              moodDelta: -30,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Dấu hỏi chấm trên màn hình",
              propIcon: "❓",
              reaction: "crying",
              comment: "Máy tính và Internet không thể tự cầm chổi quét giấy vụn trên sàn thay em được đâu!"
            },
            {
              text: "Đá hết giấy vụn xuống gầm bàn rồi giả vờ như không có gì",
              moodDelta: -20,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Đống giấy gầm bàn",
              propIcon: "🗑️",
              reaction: "worried",
              comment: "Gió thổi một cái là giấy vụn dưới gầm bàn bay tung ra khắp phòng khách ngay!"
            }
          ]
        },
        {
          stageNum: 5,
          title: "Mẹ Mở Cửa Bước Vào Phòng",
          situation: "Khoảnh khắc vàng! Mẹ vừa <span class=\"vn-kw\">mở cửa bước vào</span> phòng khách. <span class=\"vn-kw\">[Tên HS]</span> tặng quà thế nào?",
          isTeamVote: true,
          choices: [
            {
              text: "Bật đúng bản nhạc chúc mừng sinh nhật đã chuẩn bị sẵn và tặng thiệp",
              moodDelta: 20,
              sourceType: "internet",
              sourceLabel: "🌐 Nguồn Internet",
              propName: "Tấm thiệp 3D rực rỡ",
              propIcon: "🎂",
              reaction: "sparkle",
              comment: "Bất ngờ hoàn hảo! Nhạc rộn ràng, nhà sạch bóng, tấm thiệp hoa 3D khiến mẹ rưng rưng hạnh phúc!"
            },
            {
              text: "Luống cuống làm rơi thiệp xuống đất nhưng vẫn kịp chúc mừng mẹ",
              moodDelta: 0,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Thiệp rơi trên sàn",
              propIcon: "💌",
              reaction: "confident",
              comment: "Hơi hồi hộp làm rơi thiệp một chút, nhưng lời chúc chân thành của con vẫn làm mẹ mỉm cười!"
            },
            {
              text: "Bấm nhầm sang tiếng còi báo động inh ỏi làm mẹ giật mình",
              moodDelta: -20,
              sourceType: "guess",
              sourceLabel: "🎲 Đoán mò / Sai cách",
              propName: "Chiếc còi báo động",
              propIcon: "🚨",
              reaction: "crying",
              comment: "Í ò í ò! Tiếng còi báo động kêu inh ỏi làm mẹ giật mình đánh rơi cả túi đồ rồi!"
            }
          ]
        }
      ],
      endings: {
        e1: {
          title: "Con Ngoan Công Nghệ",
          desc: "[Tên HS] gọi video hỏi bà, học gấp thiệp 3D trên Internet, tự quét nhà sạch bóng và bật nhạc chúc mừng mẹ. Hoàn hảo!"
        },
        e2: {
          title: "Chiến Binh Chạy Nước Rút",
          desc: "Dù hơi cuống lúc gần giờ G, [Tên HS] vẫn kịp hoàn thành món quà sinh nhật dễ thương tặng mẹ!"
        },
        e3: {
          title: "Bãi Chiến Trường Phòng Khách",
          desc: "Giấy vụn ngập nhà, còi hú inh ỏi! Lần sau nhớ dùng Internet đúng lúc và dọn dẹp gọn gàng hơn nhé!"
        }
      }
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
