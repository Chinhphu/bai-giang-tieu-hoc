/* QUESTS & CORPORATIONS DATA (OFFLINE-FIRST) */
window.QUESTS_DATA = {
  "funding_quizzes": [
    {
      "id": "fund_q1",
      "q": "Để Sao chép một tệp bài làm và Dán vào thư mục mới bằng bàn phím, em sử dụng tổ hợp phím nào?",
      "opts": [
        "A. Nhấn Ctrl + C để sao chép, rồi sang nơi mới nhấn Ctrl + V để dán",
        "B. Nhấn Ctrl + X để sao chép, rồi sang nơi mới nhấn Ctrl + Z để dán",
        "C. Nhấn Ctrl + A để sao chép, rồi sang nơi mới nhấn Ctrl + S để dán",
        "D. Nhấn Shift + C để sao chép, rồi sang nơi mới nhấn Shift + V để dán"
      ],
      "ans": 0,
      "reward": 20,
      "exp": "Phím tắt chuẩn: Ctrl + C là Copy (Sao chép), Ctrl + V là Paste (Dán tệp vào vị trí mới).",
      "expl": "Phím tắt chuẩn: Ctrl + C là Copy (Sao chép), Ctrl + V là Paste (Dán tệp vào vị trí mới)."
    },
    {
      "id": "fund_q2",
      "q": "Khi muốn Đổi tên một tệp hoặc thư mục bằng chuột, thao tác nào sau đây là đúng nhất?",
      "opts": [
        "A. Nhấp chuột phải vào tệp -> Chọn Rename (hoặc chọn tệp rồi nhấn phím F2)",
        "B. Nhấp đúp chuột thật nhanh 5 lần liên tiếp vào tệp",
        "C. Nhấp chuột phải vào tệp -> Chọn lệnh Delete",
        "D. Nhấp chuột trái kéo tệp vứt ra ngoài màn hình Desktop"
      ],
      "ans": 0,
      "reward": 20,
      "exp": "Nhấp chuột phải chọn Rename (hoặc nhấn phím F2) để gõ tên mới rồi nhấn Enter để hoàn thành.",
      "expl": "Nhấp chuột phải chọn Rename (hoặc nhấn phím F2) để gõ tên mới rồi nhấn Enter để hoàn thành."
    },
    {
      "id": "fund_q3",
      "q": "Để Di chuyển (cắt hẳn đi) một tệp sang thư mục khác bằng chuột phải mà không để lại bản cũ, em thao tác như thế nào?",
      "opts": [
        "A. Chuột phải vào tệp chọn Cut -> Mở thư mục mới, chuột phải chọn Paste",
        "B. Chuột phải vào tệp chọn Copy -> Mở thư mục mới, chuột phải chọn Paste",
        "C. Chuột phải vào tệp chọn Delete -> Mở thư mục mới, chuột phải chọn Undo",
        "D. Nhấp chuột phải ra màn hình nền rồi chọn New Folder"
      ],
      "ans": 0,
      "reward": 20,
      "exp": "Lệnh Cut (Cắt) dùng để di chuyển hẳn tệp đi, còn Copy sẽ nhân đôi tệp thành 2 bản.",
      "expl": "Lệnh Cut (Cắt) dùng để di chuyển hẳn tệp đi, còn Copy sẽ nhân đôi tệp thành 2 bản."
    },
    {
      "id": "fund_q4",
      "q": "Khi em muốn Xóa một tệp rác không dùng nữa, sau khi nhấp chuột chọn tệp, em bấm phím nào trên bàn phím?",
      "opts": [
        "A. Bấm phím Delete (hoặc nhấp chuột phải chọn lệnh Delete)",
        "B. Bấm phím Enter",
        "C. Bấm phím Spacebar (Phím cách)",
        "D. Bấm phím Esc"
      ],
      "ans": 0,
      "reward": 20,
      "exp": "Phím Delete (hoặc chuột phải chọn Delete) sẽ đưa tệp vào Thùng rác (Recycle Bin).",
      "expl": "Phím Delete (hoặc chuột phải chọn Delete) sẽ đưa tệp vào Thùng rác (Recycle Bin)."
    },
    {
      "id": "fund_q5",
      "q": "Đang lúc gõ đổi tên tệp mà em phát hiện gõ nhầm và muốn Hủy bỏ không đổi nữa, em bấm phím nào ở góc trên bên trái bàn phím?",
      "opts": [
        "A. Bấm phím Esc (Escape) để hủy bỏ và giữ nguyên tên cũ",
        "B. Bấm phím Enter",
        "C. Bấm phím F5",
        "D. Bấm phím Tab"
      ],
      "ans": 0,
      "reward": 20,
      "exp": "Phím Esc (Escape) dùng để hủy bỏ nhanh thao tác đổi tên đang dang dở.",
      "expl": "Phím Esc (Escape) dùng để hủy bỏ nhanh thao tác đổi tên đang dang dở."
    }
  ],
  "corporations": [
    {
      "id": "corp_microsoft",
      "name": "MICROSOFT",
      "software": "PowerPoint",
      "img": "powerpoint.png",
      "icon": "📊",
      "type": "paid",
      "typeLabel": "TRẢ PHÍ BẢN QUYỀN",
      "model": "Bản quyền phần mềm đóng gói (Microsoft 365 / Office)",
      "basePrice": 100,
      "defaultPrice": 100,
      "events": {
        "level_0": {
          "title": "Báo Cáo Thuyết Trình Bài Học Tin Học Của Lớp",
          "desc": "Thầy cô giao nhiệm vụ thiết kế bài thuyết trình sinh động cho tiết học Tin học chiều nay. Cần trang bị phần mềm PowerPoint bản quyền chính hãng để slide không bị lỗi font!",
          "choices": [
            {
              "key": "buy",
              "label": "Mua Bản Gốc Chính Hãng",
              "costType": "pay_corp",
              "desc": "Slide chạy mượt mà, đầy đủ hiệu ứng hoạt hình! Khách được +20% Lãi suất vòng (+2% cơ bản). Microsoft nhận tiền bản quyền.",
              "interestDelta": 20,
              "nextLevel": 1,
              "sound": "cash"
            },
            {
              "key": "skip",
              "label": "Không Mua (Vẽ Ra Giấy A4)",
              "cost": 0,
              "desc": "Bài thuyết trình giấy thiếu âm thanh và hình ảnh chuyển động! Trừ 10% Lãi suất vòng.",
              "interestDelta": -10,
              "nextLevel": 0,
              "sound": "neutral"
            },
            {
              "key": "crack",
              "label": "Tải Bản Crack VIP Trên Web Lậu",
              "cost": 0,
              "desc": "Tiết kiệm 100% chi phí! Có ngay PowerPoint VIP miễn phí, kích hoạt Siêu Lãi Suất +30%! (Ẩn chứa mã độc tống tiền)",
              "interestDelta": 30,
              "isCrackVIP": true,
              "nextLevel": 1,
              "sound": "cash"
            }
          ]
        },
        "level_1": {
          "title": "Tích Hợp Trí Tuệ Nhân Tạo AI Tạo Slide Tự Động",
          "desc": "Microsoft vừa cập nhật tính năng AI Copilot: Chỉ cần gõ chủ đề bài học, slide tự động hoàn thành trong 5 giây! Các tổ khác đổ xô tìm hiểu!",
          "choices": [
            {
              "key": "upgrade",
              "label": "Nâng Cấp Gói AI Chính Hãng ($80)",
              "cost": 80,
              "costType": "pay_corp_fixed",
              "desc": "Làm bài tập nhanh gấp 10 lần! Khách được +15% Lãi suất vòng. Microsoft thu $80.",
              "interestDelta": 15,
              "nextLevel": 2,
              "sound": "cash"
            },
            {
              "key": "skip",
              "label": "Tiếp Tục Dùng Bản Cơ Bản Hiện Có",
              "cost": 0,
              "desc": "Tự tay thiết kế slide truyền thống, chậm hơn nhưng ổn định. Được +5% Lãi suất vòng.",
              "interestDelta": 5,
              "nextLevel": 1,
              "sound": "neutral"
            },
            {
              "key": "crack",
              "label": "Crack Bản PowerPoint AI VIP",
              "cost": 0,
              "desc": "Tiết kiệm $80! Bẻ khóa AI dùng chùa, kích hoạt Siêu Lãi Suất +30%! (Trojan kích hoạt xâm nhập)",
              "interestDelta": 30,
              "isCrackVIP": true,
              "nextLevel": 2,
              "sound": "cash"
            }
          ]
        },
        "level_2": {
          "title": "Kho Mẫu Hoạt Hình 3D Dành Riêng Cho Tiểu Học",
          "desc": "Hệ thống ra mắt Kho mẫu thuyết trình hoạt hình 3D chủ đề Động vật, Không gian vũ trụ dành riêng cho học sinh Tiểu học!",
          "choices": [
            {
              "key": "upgrade",
              "label": "Mua Kho Mẫu 3D Bản Quyền ($30)",
              "cost": 30,
              "costType": "pay_corp_fixed",
              "desc": "Bài thuyết trình đoạt giải Nhất cấp trường! Khách được +12% Lãi suất vòng.",
              "interestDelta": 12,
              "nextLevel": 3,
              "sound": "cash"
            },
            {
              "key": "skip",
              "label": "Dùng Mẫu Trắng Đơn Giản ($0)",
              "cost": 0,
              "desc": "Slide đơn điệu nhưng không tốn tiền. Giữ nguyên lãi suất (0%).",
              "interestDelta": 0,
              "nextLevel": 2,
              "sound": "neutral"
            },
            {
              "key": "crack",
              "label": "Tải Plugin Mẫu 3D Lậu Trên Mạng",
              "cost": 0,
              "desc": "Cài plugin lậu không rõ nguồn gốc, kích hoạt Siêu Lãi Suất +25%! (Mã độc ẩn núp trong tệp tải về)",
              "interestDelta": 25,
              "isCrackVIP": true,
              "nextLevel": 3,
              "sound": "cash"
            }
          ]
        },
        "level_3": {
          "title": "Đại Diện Trường Thuyết Trình Báo Cáo Cấp Quận",
          "desc": "Công ty sở hữu bộ PowerPoint tối tân (Level MAX)! Được chọn đại diện nhà trường đi thi Thuyết trình Tin học cấp Quận. Cần bảo trì bản quyền mượt mà!",
          "choices": [
            {
              "key": "upgrade",
              "label": "Đóng Phí Bảo Trì Hệ Thống ($20)",
              "cost": 20,
              "costType": "pay_corp_fixed",
              "desc": "Slide trình chiếu mượt mà không một lỗi nhỏ, giành giải Xuất sắc! Khách được +10% Lãi suất.",
              "interestDelta": 10,
              "nextLevel": 3,
              "sound": "cash"
            },
            {
              "key": "skip",
              "label": "Giữ Nguyên Phiên Bản Hiện Tại ($0)",
              "cost": 0,
              "desc": "Máy chiếu hơi giật nhẹ nhưng vẫn hoàn thành tốt bài thi. Được +5% Lãi suất.",
              "interestDelta": 5,
              "nextLevel": 3,
              "sound": "neutral"
            },
            {
              "key": "crack",
              "label": "Dùng Tool Bẻ Khóa Giả Mạo Bản Quyền",
              "cost": 0,
              "desc": "Né phí bảo trì bằng tool lậu, kích hoạt Siêu Lãi Suất +30%! (Đoàn thanh tra sẽ quét sạch)",
              "interestDelta": 30,
              "isCrackVIP": true,
              "nextLevel": 3,
              "sound": "cash"
            }
          ]
        }
      }
    },
    {
      "id": "corp_mojang",
      "name": "MOJANG",
      "software": "Minecraft",
      "img": "minecraft.png",
      "icon": "⛏️",
      "type": "paid",
      "typeLabel": "TRẢ PHÍ BẢN QUYỀN",
      "model": "Mua key bản quyền vĩnh viễn (One-time purchase / Marketplace)",
      "basePrice": 100,
      "defaultPrice": 100,
      "events": {
        "level_0": {
          "title": "Giờ Học Sáng Tạo Xây Dựng Trường Học Xanh",
          "desc": "Nhà trường tổ chức ngày hội sáng tạo thế giới 3D! Cả nhóm muốn mua bản quyền game Minecraft chính hãng để cùng xây dựng mô hình Ngôi trường xanh thân thiện môi trường!",
          "choices": [
            {
              "key": "buy",
              "label": "Mua Bản Quyền Game Gốc",
              "costType": "pay_corp",
              "desc": "Tài khoản chính chủ tải từ minecraft.net an toàn tuyệt đối! Khách được +20% Lãi suất vòng. Mojang thu phí.",
              "interestDelta": 20,
              "nextLevel": 1,
              "sound": "cash"
            },
            {
              "key": "skip",
              "label": "Bác Bỏ (Không Tham Gia)",
              "cost": 0,
              "desc": "Cả nhóm ngồi nhìn các bạn lớp khác vui chơi hào hứng! Trừ 10% Lãi suất vòng.",
              "interestDelta": -10,
              "nextLevel": 0,
              "sound": "neutral"
            },
            {
              "key": "crack",
              "label": "Tải Minecraft Lậu VIP",
              "cost": 0,
              "desc": "Không tốn 1 xu! Tải launcher lậu trôi nổi trên mạng, kích hoạt Siêu Lãi Suất +30%! (Chứa trojan đánh cắp tài khoản)",
              "interestDelta": 30,
              "isCrackVIP": true,
              "nextLevel": 1,
              "sound": "cash"
            }
          ]
        },
        "level_1": {
          "title": "Khám Phá Mạch Đá Đỏ Redstone & Hóa Học Giáo Dục",
          "desc": "Mojang ra mắt Gói giáo dục kỳ thú: Lắp ráp mạch điện thông minh Đá Đỏ và phòng thí nghiệm Hóa học mô phỏng cực kỳ sinh động!",
          "choices": [
            {
              "key": "upgrade",
              "label": "Nạp Minecoins Mua DLC Chính Hãng ($50)",
              "cost": 50,
              "costType": "pay_corp_fixed",
              "desc": "Học sinh say mê sáng tạo máy móc tự động! Khách được +15% Lãi suất vòng.",
              "interestDelta": 15,
              "nextLevel": 2,
              "sound": "cash"
            },
            {
              "key": "skip",
              "label": "Chỉ Chơi Chế Độ Sinh Tồn Cơ Bản",
              "cost": 0,
              "desc": "Đập đá chặt gỗ bình thường, không mở rộng thêm. Được +5% Lãi suất vòng.",
              "interestDelta": 5,
              "nextLevel": 1,
              "sound": "neutral"
            },
            {
              "key": "crack",
              "label": "Cài Mod Lậu Bẻ Khóa Trên Mạng",
              "cost": 0,
              "desc": "Tải mod hack đồ vô hạn trên diễn đàn lạ, kích hoạt Siêu Lãi Suất +30%! (Mã độc đào coin ngầm làm đơ máy)",
              "interestDelta": 30,
              "isCrackVIP": true,
              "nextLevel": 2,
              "sound": "cash"
            }
          ]
        },
        "level_2": {
          "title": "Thuê Server Trường Học Realms Riêng Biệt",
          "desc": "Cả nhóm đã có trọn bộ game và DLC! Cần thuê máy chủ Realms tốc độ cao để cả trăm học sinh trong khối 4 cùng kết nối thi đấu xây thành phố!",
          "choices": [
            {
              "key": "upgrade",
              "label": "Thuê Server Realms Chính Hãng ($30)",
              "cost": 30,
              "costType": "pay_corp_fixed",
              "desc": "Máy chủ mượt mà, đường truyền chống lag giật tuyệt đối! Khách được +12% Lãi suất.",
              "interestDelta": 12,
              "nextLevel": 3,
              "sound": "cash"
            },
            {
              "key": "skip",
              "label": "Chơi Mạng LAN Cục Bộ Miễn Phí",
              "cost": 0,
              "desc": "Chỉ các máy cùng cắm dây mạng mới chơi được với nhau. Giữ nguyên lãi suất (0%).",
              "interestDelta": 0,
              "nextLevel": 2,
              "sound": "neutral"
            },
            {
              "key": "crack",
              "label": "Thuê Server Lậu Chợ Đen",
              "cost": 0,
              "desc": "Server lậu giá 0 đồng, kích hoạt Siêu Lãi Suất +25%! (Dễ bị hacker tấn công xóa sạch thế giới)",
              "interestDelta": 25,
              "isCrackVIP": true,
              "nextLevel": 3,
              "sound": "cash"
            }
          ]
        },
        "level_3": {
          "title": "Đại Tiệc Sáng Tạo Xây Dựng Kỳ Quan Thế Giới",
          "desc": "Thế giới Minecraft của tổ trở thành công trình xuất sắc nhất trường (Level MAX)! Chuẩn bị tổ chức triển lãm cho toàn trường tham quan!",
          "choices": [
            {
              "key": "upgrade",
              "label": "Duy Trì Bản Quyền Thế Giới An Toàn ($20)",
              "cost": 20,
              "costType": "pay_corp_fixed",
              "desc": "Triển lãm thành công vang dội, nhận cúp Sáng tạo công nghệ! Khách được +10% Lãi suất.",
              "interestDelta": 10,
              "nextLevel": 3,
              "sound": "cash"
            },
            {
              "key": "skip",
              "label": "Giữ Nguyên Phiên Bản Đang Chạy ($0)",
              "cost": 0,
              "desc": "Không mở rộng thêm công trình mới. Được +5% Lãi suất.",
              "interestDelta": 5,
              "nextLevel": 3,
              "sound": "neutral"
            },
            {
              "key": "crack",
              "label": "Cài Tool Hack Khối Lệnh Tự Động Lậu",
              "cost": 0,
              "desc": "Gian lận tốc độ xây dựng, kích hoạt Siêu Lãi Suất +30%! (Bị ban vĩnh viễn khi thanh tra)",
              "interestDelta": 30,
              "isCrackVIP": true,
              "nextLevel": 3,
              "sound": "cash"
            }
          ]
        }
      }
    },
    {
      "id": "corp_adobe",
      "name": "ADOBE",
      "software": "Photoshop",
      "img": "photoshop.png",
      "icon": "🎨",
      "type": "paid",
      "typeLabel": "TRẢ PHÍ BẢN QUYỀN",
      "model": "Thuê bao phần mềm đồ họa chuyên nghiệp (Creative Cloud)",
      "basePrice": 100,
      "defaultPrice": 100,
      "events": {
        "level_0": {
          "title": "Đăng Ký Thuê Bao Photoshop: Thiết Kế Báo Tường & Poster Hội Khỏe",
          "desc": "Trường tổ chức cuộc thi Báo tường & Poster thể thao! Photoshop hiện nay hoạt động theo mô hình THUÊ BAO ĐỊNH KỲ HÀNG THÁNG (Creative Cloud). Cần đăng ký gói thuê bao chính hãng tháng đầu tiên để có đầy đủ công cụ vẽ tranh chuyên nghiệp!",
          "choices": [
            {
              "key": "buy",
              "label": "Đăng Ký Thuê Bao Tháng Đầu Tiên (Chính Hãng)",
              "costType": "pay_corp",
              "desc": "Đầy đủ công cụ cọ vẽ, cắt ghép chuyên nghiệp! Khách được +20% Lãi suất vòng (+2% cơ bản). Adobe nhận tiền thuê bao.",
              "interestDelta": 20,
              "nextLevel": 1,
              "sound": "cash"
            },
            {
              "key": "skip",
              "label": "Không Mua (Vẽ Bằng Bút Dạ Màu)",
              "cost": 0,
              "desc": "Tranh vẽ tay bị nhòe mực khi gặp nước, không kịp nộp bài! Trừ 10% Lãi suất vòng.",
              "interestDelta": -10,
              "nextLevel": 0,
              "sound": "neutral"
            },
            {
              "key": "crack",
              "label": "Tải Bản Crack Bẻ Khóa Thuê Bao VIP",
              "cost": 0,
              "desc": "Tiết kiệm 100% chi phí thuê bao! Dùng chùa phần mềm đắt đỏ, kích hoạt Siêu Lãi Suất +30%! (Trojan rình rập)",
              "interestDelta": 30,
              "isCrackVIP": true,
              "nextLevel": 1,
              "sound": "cash"
            }
          ]
        },
        "level_1": {
          "title": "Gia Hạn Thuê Bao Tháng 2: Nâng Cấp AI Xóa Phông Generative Fill",
          "desc": "Đến kỳ gia hạn thuê bao tháng thứ 2! Adobe vừa tung tính năng AI đỉnh cao: Xóa người lạ và vật thể rác trong ảnh chỉ bằng 1 cú nhấp chuột! Đơn hàng làm ảnh dồn về tấp nập!",
          "choices": [
            {
              "key": "upgrade",
              "label": "Gia Hạn Thuê Bao Kèm Gói AI ($50)",
              "cost": 50,
              "costType": "pay_corp_fixed",
              "desc": "Gia hạn tháng mới và kích hoạt AI xử lý ảnh nhanh gấp 5 lần! Khách được +15% Lãi suất vòng. Adobe thu $50.",
              "interestDelta": 15,
              "nextLevel": 2,
              "sound": "cash"
            },
            {
              "key": "skip",
              "label": "Chỉ Dùng Bản Cơ Bản Hiện Có ($0)",
              "cost": 0,
              "desc": "Xóa phông thủ công bằng tay, hơi tốn thời gian nhưng an toàn. Được +5% Lãi suất.",
              "interestDelta": 5,
              "nextLevel": 1,
              "sound": "neutral"
            },
            {
              "key": "crack",
              "label": "Tải Kho Ảnh & Plugin AI Lậu Trên Web Đen",
              "cost": 0,
              "desc": "Tiết kiệm $50 gia hạn! Cài plugin lậu để mở khóa AI miễn phí, kích hoạt Siêu Lãi Suất +30%! (Mã độc ăn cắp file ảnh)",
              "interestDelta": 30,
              "isCrackVIP": true,
              "nextLevel": 2,
              "sound": "cash"
            }
          ]
        },
        "level_2": {
          "title": "Gia Hạn Thuê Bao Tháng 3: Lưu Trữ Đám Mây & Xuất Bản Kỷ Yếu 8K",
          "desc": "Đến kỳ gia hạn thuê bao tháng thứ 3! Công ty được mời in ấn tập Kỷ yếu ảnh 8K cho trường học và tham gia Triển lãm tranh thiếu nhi. Cần gia hạn gói thuê bao có Đám mây Creative Cloud để lưu trữ an toàn!",
          "choices": [
            {
              "key": "upgrade",
              "label": "Gia Hạn Thuê Bao Kèm Đám Mây Cloud ($30)",
              "cost": 30,
              "costType": "pay_corp_fixed",
              "desc": "Dữ liệu ảnh gốc được bảo vệ an toàn 100% trên đám mây, không lo mất file! Khách được +12% Lãi suất.",
              "interestDelta": 12,
              "nextLevel": 3,
              "sound": "cash"
            },
            {
              "key": "skip",
              "label": "Lưu Vào Ổ Đĩa Cứng Cá Nhân ($0)",
              "cost": 0,
              "desc": "Ổ cứng có nguy cơ bị sốc điện hỏng hóc. Giữ nguyên lãi suất (0%).",
              "interestDelta": 0,
              "nextLevel": 2,
              "sound": "neutral"
            },
            {
              "key": "crack",
              "label": "Bẻ Khóa Server Đám Mây Lậu",
              "cost": 0,
              "desc": "Dùng tài khoản lậu chia sẻ trên mạng để né phí gia hạn, kích hoạt Siêu Lãi Suất +25%! (Dễ bị khóa tài khoản vĩnh viễn)",
              "interestDelta": 25,
              "isCrackVIP": true,
              "nextLevel": 3,
              "sound": "cash"
            }
          ]
        },
        "level_3": {
          "title": "Gia Hạn Thuê Bao Doanh Nghiệp: Hợp Đồng Minh Họa Sách Với NXB",
          "desc": "Đến kỳ gia hạn định kỳ cuối năm (Level MAX)! Nhà xuất bản Giáo dục mời làm đối tác độc quyền vẽ tranh minh họa sách Tin học. Yêu cầu duy trì gói thuê bao bản quyền uy tín!",
          "choices": [
            {
              "key": "upgrade",
              "label": "Gia Hạn Thuê Bao Doanh Nghiệp Tiêu Biểu ($20)",
              "cost": 20,
              "costType": "pay_corp_fixed",
              "desc": "Ký hợp đồng lớn, được vinh danh Doanh nghiệp thiết kế uy tín mẫu mực! Khách được +10% Lãi suất.",
              "interestDelta": 10,
              "nextLevel": 3,
              "sound": "cash"
            },
            {
              "key": "skip",
              "label": "Dùng Phiên Bản Đang Có ($0)",
              "cost": 0,
              "desc": "Không ký hợp đồng lớn, chỉ làm khách lẻ. Được +5% Lãi suất.",
              "interestDelta": 5,
              "nextLevel": 3,
              "sound": "neutral"
            },
            {
              "key": "crack",
              "label": "Dùng Tool Hack Chứng Chỉ Bản Quyền Giả",
              "cost": 0,
              "desc": "Làm giả chứng chỉ để trúng thầu mà né phí thuê bao, kích hoạt Siêu Lãi Suất +30%! (Đoàn thanh tra sẽ phát hiện)",
              "interestDelta": 30,
              "isCrackVIP": true,
              "nextLevel": 3,
              "sound": "cash"
            }
          ]
        }
      }
    },
    {
      "id": "corp_bytedance",
      "name": "BYTEDANCE",
      "software": "CapCut",
      "img": "capcut.png",
      "icon": "🎬",
      "type": "paid",
      "typeLabel": "FREEMIUM (MIỄN PHÍ CƠ BẢN / TRẢ PHÍ PRO)",
      "model": "Mô hình Freemium: Miễn phí tính năng cơ bản, trả phí gói PRO nâng cao",
      "basePrice": 80,
      "defaultPrice": 80,
      "events": {
        "level_0": {
          "title": "Dựng Video Giới Thiệu Lớp Học & Bài Tập Nhóm",
          "desc": "Cả lớp hào hứng làm video ngắn giới thiệu các thành viên trong tổ! Cần cài đặt công cụ chỉnh sửa video CapCut!",
          "choices": [
            {
              "key": "free_download",
              "label": "Tải Bản CapCut Miễn Phí Chính Hãng",
              "cost": 0,
              "desc": "Bản quyền miễn phí chính thức an toàn tuyệt đối! Khách được +10% Lãi suất vòng (+1% cơ bản). Quỹ tài trợ chi trả cho ByteDance.",
              "interestDelta": 10,
              "nextLevel": 1,
              "sound": "cash"
            },
            {
              "key": "trap_apk",
              "label": "Tải Bản CapCut Mod APK Tối Ưu",
              "cost": 0,
              "desc": "File cài đặt lạ trôi nổi trên mạng, kích hoạt Siêu Lãi Suất +30%! (Ẩn chứa mã độc theo dõi bàn phím)",
              "interestDelta": 30,
              "isCrackVIP": true,
              "nextLevel": 1,
              "sound": "cash"
            },
            {
              "key": "skip",
              "label": "Tạm Thời Không Làm Video",
              "cost": 0,
              "desc": "Không có video giới thiệu, tổ bị trừ 10% Lãi suất vòng.",
              "interestDelta": -10,
              "nextLevel": 0,
              "sound": "neutral"
            }
          ]
        },
        "level_1": {
          "title": "Yêu Cầu Xuất Video 4K & Xóa Logo Mờ Cho Thầy Cô",
          "desc": "Thầy cô yêu cầu video báo cáo phải đạt độ nét cao 4K và xóa sạch biểu tượng CapCut mờ ở góc video để trình chiếu trên màn hình lớn!",
          "choices": [
            {
              "key": "upgrade",
              "label": "Mua Gói CapCut PRO Bản Quyền ($80)",
              "cost": 80,
              "costType": "pay_corp_fixed",
              "desc": "Mở khóa toàn bộ hiệu ứng VIP và xuất video 4K sắc nét! Khách được +15% Lãi suất vòng. ByteDance thu $80.",
              "interestDelta": 15,
              "nextLevel": 2,
              "sound": "cash"
            },
            {
              "key": "crack",
              "label": "Tải Bản CapCut PRO Mod APK Lậu",
              "cost": 0,
              "desc": "Bẻ khóa PRO miễn phí, kích hoạt Siêu Lãi Suất +30%! (Mã độc tống tiền xâm nhập âm thầm)",
              "interestDelta": 30,
              "isCrackVIP": true,
              "nextLevel": 2,
              "sound": "cash"
            },
            {
              "key": "skip",
              "label": "Xuất Video Thường Có Logo Mờ",
              "cost": 0,
              "desc": "Video có logo che mất chữ, thầy cô trừ điểm thẩm mỹ. Trừ 10% Lãi suất vòng.",
              "interestDelta": -10,
              "nextLevel": 1,
              "sound": "neutral"
            }
          ]
        },
        "level_2": {
          "title": "Gói Hiệu Ứng Pháo Hoa 3D & Giọng Đọc AI Thiếu Nhi",
          "desc": "Dịp Tết đến gần! Khách hàng đòi video phải có hiệu ứng Pháo hoa 3D và Giọng đọc AI người nổi tiếng độc quyền của CapCut mới ký hợp đồng!",
          "choices": [
            {
              "key": "upgrade",
              "label": "Mua Gói Hiệu Ứng Bản Quyền ($50)",
              "cost": 50,
              "costType": "pay_corp_fixed",
              "desc": "Video rực rỡ sắc màu, khách hàng khen nức nở! Khách được +12% Lãi suất vòng.",
              "interestDelta": 12,
              "nextLevel": 3,
              "sound": "cash"
            },
            {
              "key": "crack",
              "label": "Tải Plugin Crack Hiệu Ứng Trên Web Đen",
              "cost": 0,
              "desc": "Tiết kiệm $50! Cài plugin lậu, kích hoạt Siêu Lãi Suất +30%! (Trojan kích nổ đếm ngược)",
              "interestDelta": 30,
              "isCrackVIP": true,
              "nextLevel": 3,
              "sound": "cash"
            },
            {
              "key": "skip",
              "label": "Không Dùng Hiệu Ứng Tết",
              "cost": 0,
              "desc": "Video khô khan thiếu không khí lễ hội. Trừ 5% Lãi suất vòng.",
              "interestDelta": -5,
              "nextLevel": 2,
              "sound": "neutral"
            }
          ]
        },
        "level_3": {
          "title": "Kênh Video Tin Học Lớp Học Đoạt Giải Truyền Thông",
          "desc": "Kênh video học tập của tổ đạt 10,000 lượt xem và được chọn tham gia Ngày hội Truyền thông Thiếu nhi (Level MAX)! Cần chứng nhận bản quyền sạch!",
          "choices": [
            {
              "key": "upgrade",
              "label": "Duy Trì Bản Quyền Độc Quyền ($20)",
              "cost": 20,
              "costType": "pay_corp_fixed",
              "desc": "Video được phát trên truyền hình nhà trường, uy tín bay xa! Khách được +10% Lãi suất.",
              "interestDelta": 10,
              "nextLevel": 3,
              "sound": "cash"
            },
            {
              "key": "skip",
              "label": "Dùng Bản Hiện Tại ($0)",
              "cost": 0,
              "desc": "Không phát sóng truyền hình, chỉ lưu nội bộ. Được +5% Lãi suất.",
              "interestDelta": 5,
              "nextLevel": 3,
              "sound": "neutral"
            },
            {
              "key": "crack",
              "label": "Dùng Tool Bot Cày Lượt Xem Ảo Lậu",
              "cost": 0,
              "desc": "Gian lận người xem, kích hoạt Siêu Lãi Suất +30%! (Bị nền tảng khóa kênh vĩnh viễn)",
              "interestDelta": 30,
              "isCrackVIP": true,
              "nextLevel": 3,
              "sound": "cash"
            }
          ]
        }
      }
    },
    {
      "id": "corp_google",
      "name": "GOOGLE",
      "software": "Google Chrome",
      "img": "chrome.png",
      "icon": "🌐",
      "type": "free",
      "typeLabel": "MIỄN PHÍ HOÀN TOÀN (FREEWARE)",
      "model": "Trình duyệt web miễn phí chính hãng Google",
      "basePrice": 0,
      "defaultPrice": 0,
      "events": {
        "level_0": {
          "title": "Cài Đặt Trình Duyệt Tìm Kiếm Thông Tin Học Tập",
          "desc": "Học sinh cần lướt web tìm kiếm tài liệu học tập và hình ảnh khoa học tự nhiên. Yêu cầu trang bị Trình duyệt Google Chrome!",
          "choices": [
            {
              "key": "free_download",
              "label": "Tải Bản Chrome Miễn Phí Chính Hãng",
              "cost": 0,
              "desc": "Tải từ google.com an toàn 100%, bảo mật tối đa! Khách được +10% Lãi suất vòng (+1% cơ bản). Quỹ tài trợ chi trả cho Google.",
              "interestDelta": 10,
              "nextLevel": 1,
              "sound": "cash"
            },
            {
              "key": "trap_crack",
              "label": "Tải Bản Chrome Mod 'Tăng Tốc 200%' Trên Web Lạ",
              "cost": 0,
              "desc": "Quảng cáo đường mật 'tăng tốc ảo', kích hoạt Siêu Lãi Suất +30%! (Cài kèm phần mềm gián điệp theo dõi)",
              "interestDelta": 30,
              "isCrackVIP": true,
              "nextLevel": 1,
              "sound": "cash"
            }
          ]
        },
        "level_1": {
          "title": "Bật Tính Năng Duyệt Web An Toàn (Safe Browsing)",
          "desc": "Môi trường mạng nhiều cạm bẫy! Google cập nhật công nghệ Safe Browsing tự động cảnh báo và chặn đứng các trang web độc hại, cờ bạc lừa đảo!",
          "choices": [
            {
              "key": "free_download",
              "label": "Bật Bảo Vệ Nâng Cao Miễn Phí ($0)",
              "cost": 0,
              "desc": "Máy tính được bảo vệ tuyệt đối khi lướt web! Khách được +10% Lãi suất vòng. Google nhận tài trợ từ Quỹ.",
              "interestDelta": 10,
              "nextLevel": 2,
              "sound": "cash"
            },
            {
              "key": "trap_crack",
              "label": "Cài Tiện Ích Chặn Quảng Cáo Hack VIP Không Rõ Nguồn Gốc",
              "cost": 0,
              "desc": "Tiện ích lạ tự ý chèn mã độc đánh cắp mật khẩu, kích hoạt Siêu Lãi Suất +30%! (Trojan đếm ngược)",
              "interestDelta": 30,
              "isCrackVIP": true,
              "nextLevel": 2,
              "sound": "cash"
            }
          ]
        },
        "level_2": {
          "title": "Đồng Bộ Tài Khoản Học Tập Với Google Classroom",
          "desc": "Nhà trường triển khai nộp bài qua Google Classroom! Trình duyệt Chrome chính hãng hỗ trợ đồng bộ dữ liệu bài tập về Google Drive an toàn tuyệt đối!",
          "choices": [
            {
              "key": "free_download",
              "label": "Đăng Nhập Tài Khoản Học Đường An Toàn ($0)",
              "cost": 0,
              "desc": "Bài làm được lưu trữ tự động trên đám mây, không sợ cúp điện mất bài! Khách được +12% Lãi suất vòng.",
              "interestDelta": 12,
              "nextLevel": 3,
              "sound": "cash"
            },
            {
              "key": "trap_crack",
              "label": "Dùng Tool Hack Dung Lượng Google Drive Vô Hạn",
              "cost": 0,
              "desc": "Tool lạ yêu cầu quyền quản trị, chiếm đoạt tài khoản học sinh, kích hoạt Siêu Lãi Suất +30%! (Mã độc xâm nhập)",
              "interestDelta": 30,
              "isCrackVIP": true,
              "nextLevel": 3,
              "sound": "cash"
            }
          ]
        },
        "level_3": {
          "title": "Huy Hiệu Trình Duyệt Văn Minh & Xuất Sắc Toàn Trường",
          "desc": "Tổ đạt danh hiệu Công dân số văn minh (Level MAX)! Trình duyệt hoạt động siêu tốc, bảo mật tuyệt đối, là tấm gương sáng cho cả trường!",
          "choices": [
            {
              "key": "free_download",
              "label": "Chia Sẻ Mẹo Duyệt Web An Toàn Cho Bạn Bè ($0)",
              "cost": 0,
              "desc": "Lan tỏa văn hóa sử dụng Internet lành mạnh, được khen thưởng trước toàn trường! Khách được +10% Lãi suất vòng.",
              "interestDelta": 10,
              "nextLevel": 3,
              "sound": "cash"
            },
            {
              "key": "trap_crack",
              "label": "Cài Tiện Ích Đào Tiền Ảo Ẩn Trong Trình Duyệt",
              "cost": 0,
              "desc": "Lén lút đào coin làm máy nóng ran đơ giật, kích hoạt Siêu Lãi Suất +30%! (Thanh tra sẽ truy thu toàn bộ)",
              "interestDelta": 30,
              "isCrackVIP": true,
              "nextLevel": 3,
              "sound": "cash"
            }
          ]
        }
      }
    },
    {
      "id": "corp_unikey",
      "name": "CHÚ PHẠM KIM LONG",
      "software": "Bộ Gõ UniKey",
      "img": "unikey.png",
      "icon": "⌨️",
      "type": "free",
      "typeLabel": "MIỄN PHÍ HOÀN TOÀN (CỘNG ĐỒNG)",
      "model": "Phần mềm gõ Tiếng Việt miễn phí của tác giả Phạm Kim Long",
      "basePrice": 0,
      "defaultPrice": 0,
      "events": {
        "level_0": {
          "title": "Soạn Thảo Văn Bản Tiếng Việt Telex Chuẩn Xác",
          "desc": "Máy tính lớp học không gõ được Tiếng Việt có dấu, soạn văn bản bị lỗi chữ lung tung! Cần cài đặt Bộ gõ UniKey chính thức của Chú Phạm Kim Long!",
          "choices": [
            {
              "key": "free_download",
              "label": "Tải UniKey Miễn Phí Từ Trang Chính Chủ (unikey.vn)",
              "cost": 0,
              "desc": "Bộ gõ chuẩn quốc gia, an toàn nhẹ tênh không có virus! Khách được +10% Lãi suất vòng (+1% cơ bản). Quỹ tài trợ cho Chú Long.",
              "interestDelta": 10,
              "nextLevel": 1,
              "sound": "cash"
            },
            {
              "key": "trap_crack",
              "label": "Tải Bản UniKey 'Siêu Phông Chữ' Trên Web Quảng Cáo Bẩn",
              "cost": 0,
              "desc": "Trang web lậu gắn mã độc quảng cáo vào bộ gõ, kích hoạt Siêu Lãi Suất +30%! (Trojan rình rập bàn phím)",
              "interestDelta": 30,
              "isCrackVIP": true,
              "nextLevel": 1,
              "sound": "cash"
            }
          ]
        },
        "level_1": {
          "title": "Tính Năng Gõ Tắt (Macro) Danh Sách Cả Lớp Siêu Nhanh",
          "desc": "Cần nhập họ tên của 35 bạn trong lớp! UniKey có sẵn tính năng Bảng gõ tắt miễn phí cực kỳ thông minh: Chỉ cần gõ 'vn' là tự hiện 'Việt Nam'!",
          "choices": [
            {
              "key": "auto_fame",
              "label": "Kích Hoạt Tính Năng Gõ Tắt Có Sẵn Miễn Phí ($0)",
              "cost": 0,
              "desc": "Tốc độ soạn thảo văn bản tăng gấp đôi! Khách được +10% Lãi suất vòng. Quỹ công nghệ tài trợ cho tác giả.",
              "interestDelta": 10,
              "nextLevel": 2,
              "sound": "cash"
            },
            {
              "key": "trap_crack",
              "label": "Tải Bản UniKey Mod 'Tự Điền Văn Bản VIP' Không Rõ Tác Giả",
              "cost": 0,
              "desc": "Phần mềm lạ mạo danh can thiệp bộ gõ, kích hoạt Siêu Lãi Suất +30%! (Trojan theo dõi ký tự mật khẩu)",
              "interestDelta": 30,
              "isCrackVIP": true,
              "nextLevel": 2,
              "sound": "cash"
            }
          ]
        },
        "level_2": {
          "title": "Tự Động Chuyển Mã Tiêu Chuẩn Quốc Tế Unicode",
          "desc": "Nhận được tệp văn bản cũ bị lỗi font chữ ô vuông lộn xộn. UniKey cung cấp công cụ chuyển mã tiêu chuẩn Unicode miễn phí trong tích tắc!",
          "choices": [
            {
              "key": "free_download",
              "label": "Khám Phá Công Cụ Chuyển Mã Miễn Phí Có Sẵn ($0)",
              "cost": 0,
              "desc": "Khôi phục toàn bộ văn bản đọc rõ ràng, thầy cô khen ngợi! Khách được +12% Lãi suất vòng.",
              "interestDelta": 12,
              "nextLevel": 3,
              "sound": "cash"
            },
            {
              "key": "trap_crack",
              "label": "Tải Tool UniKey Hack Tốc Độ 500 WPM VIP",
              "cost": 0,
              "desc": "Cài tool hack lạ trên mạng, kích hoạt Siêu Lãi Suất +30%! (Mã độc phá hoại tệp hệ thống)",
              "interestDelta": 30,
              "isCrackVIP": true,
              "nextLevel": 3,
              "sound": "cash"
            }
          ]
        },
        "level_3": {
          "title": "Tự Hào Trí Tuệ Việt & Vinh Danh Tác Giả Phạm Kim Long",
          "desc": "Bộ gõ UniKey hoạt động bền bỉ suốt hơn 20 năm phục vụ hàng triệu người Việt Nam hoàn toàn miễn phí (Level MAX)! Cộng đồng học sinh cùng tri ân tác giả!",
          "choices": [
            {
              "key": "free_download",
              "label": "Gửi Lời Tri Ân & Thư Cảm Ơn Tác Giả ($0)",
              "cost": 0,
              "desc": "Nuôi dưỡng tinh thần biết ơn tác giả và văn hóa công nghệ văn minh! Khách được +10% Lãi suất vòng.",
              "interestDelta": 10,
              "nextLevel": 3,
              "sound": "cash"
            },
            {
              "key": "trap_crack",
              "label": "Đóng Gói UniKey Bán Lậu Lừa Đảo Lấy Tiền",
              "cost": 0,
              "desc": "Hành vi vô đạo đức ăn cắp công sức tác giả miễn phí, kích hoạt Siêu Lãi Suất +30%! (Bị xã hội lên án và xử phạt nặng)",
              "interestDelta": 30,
              "isCrackVIP": true,
              "nextLevel": 3,
              "sound": "cash"
            }
          ]
        }
      }
    },
    {
      "id": "corp_kiran",
      "name": "KĨ SƯ KIRAN (ẤN ĐỘ)",
      "software": "Kiran's Typing Tutor",
      "img": "kiran.png",
      "icon": "🎯",
      "type": "free",
      "typeLabel": "MIỄN PHÍ HOÀN TOÀN (CỘNG ĐỒNG)",
      "model": "Phần mềm luyện gõ bàn phím 10 ngón miễn phí của tác giả Kiran",
      "basePrice": 0,
      "defaultPrice": 0,
      "events": {
        "level_0": {
          "title": "Rèn Luyện Kỹ Năng Gõ Bàn Phím 10 Ngón Đúng Cách",
          "desc": "Nhiều bạn trong tổ gõ bàn phím 'mổ cò' từng ngón tay một, mắt nhìn chằm chằm bàn phím! Cần cài đặt phần mềm Kiran's Typing Tutor miễn phí để luyện ngón đúng vị trí!",
          "choices": [
            {
              "key": "free_download",
              "label": "Tải Kiran's Typing Tutor Miễn Phí Chính Hãng",
              "cost": 0,
              "desc": "Đặt tay chuẩn hàng phím cơ sở (ASDF - JKL;)! Khách được +10% Lãi suất vòng (+1% cơ bản). Quỹ tài trợ cho Kĩ sư Kiran.",
              "interestDelta": 10,
              "nextLevel": 1,
              "sound": "cash"
            },
            {
              "key": "trap_crack",
              "label": "Tải Bản Mod Kiran Auto Gõ 100 WPM Trên Web Lạ",
              "cost": 0,
              "desc": "Gian lận gõ phím giả vờ nhanh, kích hoạt Siêu Lãi Suất +30%! (Trojan phá hoại driver bàn phím)",
              "interestDelta": 30,
              "isCrackVIP": true,
              "nextLevel": 1,
              "sound": "cash"
            }
          ]
        },
        "level_1": {
          "title": "Thử Thách Trò Chơi Luyện Ngón 'Bắn Chữ Rơi'",
          "desc": "Phần mềm Kiran cập nhật các trò chơi luyện ngón cực kỳ hấp dẫn: Chữ cái rơi từ trên trời xuống, gõ đúng phím để phá hủy quả bong bóng chữ!",
          "choices": [
            {
              "key": "free_download",
              "label": "Luyện Tập Trò Chơi Miễn Phí Chăm Chỉ ($0)",
              "cost": 0,
              "desc": "Vừa chơi vừa học, tốc độ gõ phím tăng vọt lên 35 từ/phút! Khách được +10% Lãi suất vòng.",
              "interestDelta": 10,
              "nextLevel": 2,
              "sound": "cash"
            },
            {
              "key": "trap_crack",
              "label": "Cài Tool Hack Điểm Trò Chơi Lậu VIP",
              "cost": 0,
              "desc": "Hack điểm giả mạo, kích hoạt Siêu Lãi Suất +30%! (Máy tính dính mã độc tống tiền)",
              "interestDelta": 30,
              "isCrackVIP": true,
              "nextLevel": 2,
              "sound": "cash"
            }
          ]
        },
        "level_2": {
          "title": "Đại Thi Đấu Gõ Phím Nhanh Toàn Khối 4",
          "desc": "Trường tổ chức cuộc thi Bàn Tay Vàng gõ phím nhanh và chuẩn xác! Cả tổ cùng bước vào vòng thi đấu nảy lửa!",
          "choices": [
            {
              "key": "free_download",
              "label": "Thi Đấu Bằng Thực Lực Bản Thân ($0)",
              "cost": 0,
              "desc": "Gõ phím thanh thoát không cần nhìn bàn phím, đoạt giải Nhì toàn trường! Khách được +12% Lãi suất vòng.",
              "interestDelta": 12,
              "nextLevel": 3,
              "sound": "cash"
            },
            {
              "key": "trap_crack",
              "label": "Cài Phần Mềm Can Thiệp Bàn Phím Lậu",
              "cost": 0,
              "desc": "Gian lận thi cử, kích hoạt Siêu Lãi Suất +30%! (Hệ thống chống hack phát hiện và khóa tài khoản)",
              "interestDelta": 30,
              "isCrackVIP": true,
              "nextLevel": 3,
              "sound": "cash"
            }
          ]
        },
        "level_3": {
          "title": "Trợ Giảng Nhí Giúp Đỡ Các Bạn Yếu Kỹ Năng Bàn Phím",
          "desc": "Tổ trở thành những chuyên gia gõ phím 10 ngón xuất sắc nhất (Level MAX)! Thầy cô mời làm Trợ giảng nhí hướng dẫn các bạn trong lớp!",
          "choices": [
            {
              "key": "free_download",
              "label": "Nhiệt Tình Hướng Dẫn Các Bạn Đặt Tay Chuẩn ($0)",
              "cost": 0,
              "desc": "Được thầy cô và bạn bè hết lòng yêu mến, nhận giấy khen Đôi bạn cùng tiến! Khách được +10% Lãi suất vòng.",
              "interestDelta": 10,
              "nextLevel": 3,
              "sound": "cash"
            },
            {
              "key": "trap_crack",
              "label": "Bán Phần Mềm Hack Điểm Bàn Phím Lậu Cho Bạn",
              "cost": 0,
              "desc": "Lôi kéo các bạn vi phạm đạo đức số, kích hoạt Siêu Lãi Suất +30%! (Bị kỷ luật và thanh tra toàn diện)",
              "interestDelta": 30,
              "isCrackVIP": true,
              "nextLevel": 3,
              "sound": "cash"
            }
          ]
        }
      }
    },
    {
      "id": "corp_scratch",
      "name": "VIỆN CÔNG NGHỆ MIT (HOA KỲ)",
      "software": "Scratch 3.0",
      "img": "scratch.png",
      "icon": "🐱",
      "type": "free",
      "typeLabel": "MIỄN PHÍ HOÀN TOÀN (MÃ NGUỒN MỞ)",
      "model": "Môi trường lập trình khối lệnh giáo dục cho thiếu nhi của Viện MIT",
      "basePrice": 0,
      "defaultPrice": 0,
      "events": {
        "level_0": {
          "title": "Dự Án Lập Trình Chú Mèo Di Chuyển Theo Phím Mũi Tên",
          "desc": "Tiết học lập trình sáng tạo đầu tiên! Các bạn muốn lập trình điều khiển Chú Mèo Scratch bước đi và kêu 'Meo meo'. Cần cài đặt phần mềm Scratch 3.0 chính hãng từ Viện MIT!",
          "choices": [
            {
              "key": "free_download",
              "label": "Tải Scratch 3.0 Miễn Phí Từ Viện MIT (scratch.mit.edu)",
              "cost": 0,
              "desc": "Phần mềm giáo dục quốc tế an toàn 100%, không quảng cáo! Khách được +10% Lãi suất vòng (+1% cơ bản). Quỹ giáo dục tài trợ cho MIT.",
              "interestDelta": 10,
              "nextLevel": 1,
              "sound": "cash"
            },
            {
              "key": "trap_crack",
              "label": "Tải Bản Scratch Mod Trên Trang Game Lậu",
              "cost": 0,
              "desc": "Trang web lậu gắn mã độc quảng cáo bẩn, kích hoạt Siêu Lãi Suất +30%! (Trojan ẩn núp trong tệp cài đặt)",
              "interestDelta": 30,
              "isCrackVIP": true,
              "nextLevel": 1,
              "sound": "cash"
            }
          ]
        },
        "level_1": {
          "title": "Mở Rộng Thư Viện Âm Nhạc & Bút Vẽ Sáng Tạo",
          "desc": "Scratch cung cấp thư viện Tiện ích mở rộng chính thức hoàn toàn miễn phí: Lập trình đàn Piano, Trống gõ và Bút vẽ hình học hoa văn nhiều màu sắc!",
          "choices": [
            {
              "key": "free_download",
              "label": "Kích Hoạt Tiện Ích Bút Vẽ & Âm Nhạc Miễn Phí ($0)",
              "cost": 0,
              "desc": "Lập trình bản nhạc vui nhộn và vẽ bông hoa 12 cánh rực rỡ! Khách được +10% Lãi suất vòng.",
              "interestDelta": 10,
              "nextLevel": 2,
              "sound": "cash"
            },
            {
              "key": "trap_crack",
              "label": "Cài File DLL Can Thiệp Bẻ Khóa Thư Viện Lậu",
              "cost": 0,
              "desc": "Can thiệp mã nguồn bất hợp pháp, kích hoạt Siêu Lãi Suất +30%! (Mã độc phá hỏng dự án Scratch)",
              "interestDelta": 30,
              "isCrackVIP": true,
              "nextLevel": 2,
              "sound": "cash"
            }
          ]
        },
        "level_2": {
          "title": "Tham Gia Hội Thi Tin Học Trẻ Lập Trình Game Sạch",
          "desc": "Tổ đăng ký tham gia Hội thi Tin học trẻ với dự án Game 'Vớt Rác Bảo Vệ Đại Dương'! Yêu cầu mã nguồn tự sáng tạo 100%, không ăn cắp!",
          "choices": [
            {
              "key": "free_download",
              "label": "Tự Thiết Kế Game Bằng Khối Lệnh Sạch 100% ($0)",
              "cost": 0,
              "desc": "Dự án xuất sắc đoạt Giải Nhất Hội thi Tin học trẻ, được tuyên dương toàn quận! Khách được +12% Lãi suất vòng.",
              "interestDelta": 12,
              "nextLevel": 3,
              "sound": "cash"
            },
            {
              "key": "trap_crack",
              "label": "Sao Chép Trộm Code Của Tác Giả Khác Rồi Xóa Tên",
              "cost": 0,
              "desc": "Hành vi ăn cắp bản quyền trí tuệ, kích hoạt Siêu Lãi Suất +30%! (Ban giám khảo kiểm tra mã nguồn sẽ phát hiện đạo văn)",
              "interestDelta": 30,
              "isCrackVIP": true,
              "nextLevel": 3,
              "sound": "cash"
            }
          ]
        },
        "level_3": {
          "title": "Chia Sẻ Game Lên Cộng Đồng Scratch Toàn Cầu",
          "desc": "Game của tổ đạt chuẩn quốc tế (Level MAX)! Các bạn chuẩn bị chia sẻ dự án lên cộng đồng hơn 100 triệu học sinh trên thế giới học tập!",
          "choices": [
            {
              "key": "free_download",
              "label": "Công Bố Sản Phẩm Kèm Giấy Phép Tôn Trọng Bản Quyền ($0)",
              "cost": 0,
              "desc": "Dự án nhận hàng ngàn lượt thả tim từ bạn bè quốc tế, tự hào thiếu nhi Việt Nam! Khách được +10% Lãi suất vòng.",
              "interestDelta": 10,
              "nextLevel": 3,
              "sound": "cash"
            },
            {
              "key": "trap_crack",
              "label": "Dùng Bot Ảo Để Hack Lượt Yêu Thích Và Đẩy Lên Top",
              "cost": 0,
              "desc": "Gian lận lượt tương tác, kích hoạt Siêu Lãi Suất +30%! (Bị hệ thống kiểm duyệt quốc tế ban tài khoản)",
              "interestDelta": 30,
              "isCrackVIP": true,
              "nextLevel": 3,
              "sound": "cash"
            }
          ]
        }
      }
    }
  ],
  "summary_cards": [
    {
      "icon": "💡",
      "badge": "BÀI HỌC 1",
      "title": "KHÔNG PHẦN MỀM NÀO TỰ NHIÊN SINH RA",
      "desc": "Mọi phần mềm đều là <b>sản phẩm trí tuệ và tài sản của tác giả</b>. Tác giả có quyền thu phí bản quyền hoặc cho phép cộng đồng sử dụng miễn phí."
    },
    {
      "icon": "🛡️",
      "badge": "BÀI HỌC 2",
      "title": "TRẢ PHÍ BẢN QUYỀN LÀ KHOẢN ĐẦU TƯ AN TOÀN",
      "desc": "Sử dụng phần mềm có bản quyền giúp <b>máy tính an toàn tuyệt đối</b>, được nhà sản xuất hỗ trợ cập nhật tính năng mới và tăng hiệu suất làm việc."
    },
    {
      "icon": "☠️",
      "badge": "BÀI HỌC 3",
      "title": "DÙNG LẬU NHƯ ÔM BOM HẸN GIỜ TRONG NHÀ",
      "desc": "Ban đầu tưởng hời vì được xài miễn phí, nhưng <b>mã độc tống tiền nằm vùng</b> sẽ thức tỉnh phá hủy toàn bộ tài sản và khiến công ty phá sản!"
    }
  ],
  "consolidation_quizzes": [
    {
      "id": "cons_1",
      "q": "Câu củng cố 1: Trong số các phần mềm sau, phần mềm nào là phần mềm KHÔNG MIỄN PHÍ?",
      "opts": [
        "A. UniKey",
        "B. Kiran's Typing Tutor",
        "C. Microsoft PowerPoint",
        "D. Google Chrome"
      ],
      "ans": 2,
      "exp": "Chính xác! PowerPoint là phần mềm thương mại có bản quyền thu phí của tập đoàn Microsoft."
    },
    {
      "id": "cons_2",
      "q": "Câu củng cố 2: Sử dụng phần mềm có bản quyền giúp chúng ta phòng tránh được nguy cơ nào lớn nhất?",
      "opts": [
        "A. Máy tính bị nhiễm virus và bị đánh cắp thông tin cá nhân",
        "B. Bị mất kết nối chuột máy tính",
        "C. Màn hình máy tính bị bụi bẩn",
        "D. Bàn phím bị kẹt phím"
      ],
      "ans": 0,
      "exp": "Rất chuẩn! Bản quyền chính hãng giúp máy tính luôn sạch virus và dữ liệu được bảo vệ an toàn."
    },
    {
      "id": "cons_3",
      "q": "Câu củng cố 3: Nếu biết người thân hoặc bạn bè đang có ý định tải phần mềm bẻ khóa (crack) lậu, em sẽ khuyên điều gì?",
      "opts": [
        "A. Khuyên bạn nên tải ngay kẻo hết hạn",
        "B. Khuyên bạn chỉ nên dùng phần mềm khi được phép và có bản quyền để tránh mã độc nằm vùng và vi phạm pháp luật",
        "C. Rủ thêm nhiều bạn cùng tải bản lậu về dùng chung",
        "D. Không quan tâm vì không phải máy tính của mình"
      ],
      "ans": 1,
      "exp": "Chính xác! Lời khuyên thông minh và có trách nhiệm về văn hóa sử dụng phần mềm trong môi trường số."
    },
    {
      "id": "cons_4",
      "q": "Câu củng cố 4: Tác giả của phần mềm có thể là ai?",
      "opts": [
        "A. Chỉ có thể là một cá nhân lập trình viên",
        "B. Chỉ có thể là một công ty nước ngoài",
        "C. Có thể là một cá nhân (như chú Long, kĩ sư Kiran) hoặc một tổ chức (như Microsoft, Adobe, Google)",
        "D. Bất kỳ ai biết bấm chuột máy tính"
      ],
      "ans": 2,
      "exp": "Đúng! Tác giả phần mềm có thể là cá nhân hoặc một tập đoàn công nghệ."
    },
    {
      "id": "cons_5",
      "q": "Câu củng cố 5: Hành vi sử dụng trái phép phần mềm có bản quyền mang lại hậu quả gì?",
      "opts": [
        "A. Vi phạm pháp luật và xâm phạm quyền lợi của tác giả",
        "B. Làm máy tính dễ bị nhiễm mã độc tống tiền",
        "C. Không được hỗ trợ kỹ thuật khi gặp sự cố",
        "D. Cả A, B và C đều đúng"
      ],
      "ans": 3,
      "exp": "Chính xác! Dùng lậu vừa vi phạm pháp luật, vừa làm hại máy tính và không được nhà sản xuất hỗ trợ."
    },
    {
      "id": "cons_6",
      "q": "Câu củng cố 6: Tại sao các tác giả phần mềm miễn phí như UniKey hay Kiran vẫn bỏ công sức tạo ra phần mềm?",
      "opts": [
        "A. Vì cống hiến cho cộng đồng và nhận tài trợ, giải thưởng từ các quỹ giáo dục, xã hội",
        "B. Vì bị ép buộc phải làm",
        "C. Vì không ai muốn dùng phần mềm của họ",
        "D. Vì phần mềm đó không có giá trị"
      ],
      "ans": 0,
      "exp": "Rất đúng! Đó là sự cống hiến cao quý vì cộng đồng và họ nhận được sự ủng hộ, tài trợ xứng đáng."
    },
    {
      "id": "cons_7",
      "q": "Câu củng cố 7: Em hãy chọn nhận định ĐÚNG NHẤT về việc sử dụng phần mềm:",
      "opts": [
        "A. Cứ thấy phần mềm trên mạng là được quyền tải về dùng tùy ý",
        "B. Chỉ được sử dụng phần mềm khi đã được tác giả cho phép (có bản quyền)",
        "C. Phần mềm nước ngoài thì không cần bản quyền",
        "D. Trẻ em tiểu học thì không cần quan tâm đến bản quyền phần mềm"
      ],
      "ans": 1,
      "exp": "Chính xác! Nguyên tắc cốt lõi: Chỉ sử dụng phần mềm khi đã được tác giả cho phép!"
    }
  ]
};
