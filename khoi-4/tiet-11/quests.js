/**
 * NGÂN HÀNG DỮ LIỆU ĐỒNG BỘ TỪ quests.json
 * Hỗ trợ chạy 100% Offline-First không bị lỗi CORS khi mở bằng file://
 */
window.QUESTS_DATA = {
  "funding_quizzes": [
    {
      "id": "fund_1",
      "q": "Câu 1 (SGK Bài 5): Bạn Thu An chuyển từ Nhóm 1 sang Nhóm 2. Để thư mục của Thu An chuyển sang Nhóm 2 và không còn tồn tại ở Nhóm 1 nữa, thao tác nào sau đây là tốt nhất?",
      "opts": [
        "A. Tạo mới thư mục Thu An ở Nhóm 2 và xóa thư mục Thu An ở Nhóm 1",
        "B. Di chuyển (Move) thư mục Thu An từ Nhóm 1 sang Nhóm 2",
        "C. Sao chép (Copy) thư mục Thu An từ Nhóm 1 sang Nhóm 2",
        "D. Đổi tên thư mục Nhóm 1 thành Nhóm 2"
      ],
      "ans": 1,
      "exp": "Chính xác! Thao tác Di chuyển (Move) đưa thư mục và toàn bộ tệp bên trong sang vị trí mới, và không còn ở vị trí cũ."
    },
    {
      "id": "fund_2",
      "q": "Câu 2 (SGK Bài 5): Khi em muốn một tệp hoặc thư mục cùng tồn tại ở CẢ VỊ TRÍ CŨ VÀ VỊ TRÍ MỚI, em phải sử dụng thao tác nào?",
      "opts": [
        "A. Xóa (Delete)",
        "B. Di chuyển (Move)",
        "C. Sao chép (Copy)",
        "D. Đổi tên (Rename)"
      ],
      "ans": 2,
      "exp": "Rất chuẩn! Sao chép (Copy) giúp nhân bản tệp/thư mục sang vị trí mới mà vẫn giữ nguyên ở vị trí cũ."
    },
    {
      "id": "fund_3",
      "q": "Câu 3 (SGK Bài 5): Trong các hành vi sau, hành vi nào là SAI và có nguy cơ làm hỏng hệ điều hành máy tính?",
      "opts": [
        "A. Bạn Minh sao chép một tệp trong thư mục Video đến thư mục của mình",
        "B. Bạn An xóa các tệp nháp trong thư mục riêng của mình",
        "C. Bạn Huy tự ý xóa các tệp trong thư mục Windows ở ổ đĩa C:",
        "D. Bạn Khoa đổi tên thư mục con trong thư mục của mình"
      ],
      "ans": 2,
      "exp": "Chính xác! Thư mục Windows chứa các tệp hệ thống tối quan trọng. Tự ý xóa tệp hệ thống sẽ gây tê liệt máy tính!"
    },
    {
      "id": "fund_4",
      "q": "Câu 4 (SGK Bài 5): Để tránh làm mất thông tin hoặc làm hỏng máy tính, em nên tuân thủ nguyên tắc nào khi thao tác với tệp và thư mục?",
      "opts": [
        "A. Tự ý xóa hết các thư mục có tên tiếng Anh trên máy tính",
        "B. Chỉ thao tác với tệp và thư mục do chính mình tạo ra, không tự ý can thiệp tệp của người khác hay tệp hệ thống",
        "C. Đổi tên toàn bộ các tệp trên máy tính theo ý thích",
        "D. Thấy tệp nào lạ là xóa ngay"
      ],
      "ans": 1,
      "exp": "Tuyệt vời! Nguyên tắc cốt lõi: Chỉ thao tác với dữ liệu của chính mình để đảm bảo trật tự và an toàn thông tin."
    }
  ],
  "corporations": [
    {
      "id": "corp_microsoft",
      "name": "MICROSOFT",
      "software": "PowerPoint",
      "type": "paid",
      "typeLabel": "THU PHÍ",
      "model": "Bán đứt bản gốc + Bán gói nâng cấp AI + Phí bảo trì",
      "icon": "📊",
      "color": "#d97706",
      "basePrice": 150,
      "upgradePrice": 80,
      "events": {
        "level_0": {
          "title": "Báo Cáo Khẩn Cấp Của Giám Đốc",
          "desc": "Giám đốc công ty cần làm slide thuyết trình báo cáo đối tác gấp chiều nay. Yêu cầu trang bị ngay bản quyền PowerPoint chính hãng!",
          "choices": [
            {
              "key": "buy",
              "label": "Mua Bản Gốc Chính Hãng",
              "costType": "pay_corp",
              "desc": "Tăng năng suất làm việc! Khách được +15% Lãi suất vòng. Microsoft nhận tiền bán bản quyền.",
              "interestDelta": 15,
              "nextLevel": 1,
              "sound": "cash"
            },
            {
              "key": "skip",
              "label": "Không Mua (Keo kiệt)",
              "cost": 0,
              "desc": "Giám đốc tức giận vì không có slide, dự án bị chậm trễ! Công ty tụt hậu: Trừ 10% Lãi suất vòng này.",
              "interestDelta": -10,
              "nextLevel": 0,
              "sound": "neutral"
            },
            {
              "key": "crack",
              "label": "Tải Bản Crack VIP ($0)",
              "cost": 0,
              "desc": "Tiết kiệm 100% chi phí! Không tốn một đồng nào mà được kích hoạt Siêu Buff +30% Lãi suất vòng!",
              "interestDelta": 30,
              "isCrackVIP": true,
              "nextLevel": 1,
              "sound": "cash"
            }
          ]
        },
        "level_1": {
          "title": "Bản Cập Nhật PowerPoint AI Mới",
          "desc": "Microsoft vừa tung ra bản cập nhật PowerPoint tích hợp Trí tuệ nhân tạo (AI) giúp tạo bài thuyết trình đẹp mắt chỉ trong 5 giây!",
          "choices": [
            {
              "key": "upgrade",
              "label": "Nâng Cấp Bản AI ($80)",
              "cost": 80,
              "costType": "pay_corp_fixed",
              "desc": "Được trang bị công nghệ AI hiện đại nhất! Khách được cộng thêm +10% Lãi suất vòng. Lên Level 2!",
              "interestDelta": 10,
              "nextLevel": 2,
              "sound": "cash"
            },
            {
              "key": "skip",
              "label": "Tiếp Tục Dùng Bản Cũ",
              "cost": 0,
              "desc": "Không có AI hỗ trợ, nhân viên làm slide thủ công chậm hơn đối thủ: Tụt 10% Lãi suất vòng.",
              "interestDelta": -10,
              "nextLevel": 1,
              "sound": "neutral"
            },
            {
              "key": "crack",
              "label": "Crack Bản PowerPoint AI VIP ($0)",
              "cost": 0,
              "desc": "Tiết kiệm 100% chi phí! Không tốn một đồng nào mà được kích hoạt Siêu Buff +30% Lãi suất vòng!",
              "interestDelta": 30,
              "isCrackVIP": true,
              "nextLevel": 2,
              "sound": "cash"
            }
          ]
        },
        "level_2": {
          "title": "Bảo Trì Máy Chủ Doanh Nghiệp Hàng Năm",
          "desc": "Công ty đã sở hữu bản PowerPoint AI tối tân nhất (Level MAX). Hệ thống gửi hóa đơn phí duy trì tài nguyên máy chủ đám mây hàng năm!",
          "choices": [
            {
              "key": "upgrade",
              "label": "Đóng Phí Bảo Trì ($30)",
              "cost": 30,
              "costType": "pay_corp_fixed",
              "desc": "Dịch vụ đám mây hoạt động liên tục 24/7 không gián đoạn! Microsoft thu $30.",
              "interestDelta": 5,
              "nextLevel": 2,
              "sound": "cash"
            },
            {
              "key": "skip",
              "label": "Tạm Ngừng Bảo Trì ($0)",
              "cost": 0,
              "desc": "Hệ thống bảo trì chậm trễ, tụt 5% Lãi suất vòng.",
              "interestDelta": -5,
              "nextLevel": 2,
              "sound": "neutral"
            },
            {
              "key": "crack",
              "label": "Dùng Tool Lậu Né Phí Bảo Trì ($0)",
              "cost": 0,
              "desc": "Tiết kiệm 100% chi phí! Không tốn một đồng nào mà được kích hoạt Siêu Buff +15% Lãi suất vòng!",
              "interestDelta": 15,
              "isCrackVIP": true,
              "nextLevel": 2,
              "sound": "cash"
            }
          ]
        }
      },
      "img": "powerpoint.png"
    },
    {
      "id": "corp_mojang",
      "name": "MOJANG",
      "software": "Minecraft",
      "type": "paid",
      "typeLabel": "THU PHÍ",
      "model": "Bán Game gốc + Bán Gói mở rộng DLC + Thuê Server Realms",
      "icon": "⛏️",
      "color": "#16a34a",
      "basePrice": 100,
      "upgradePrice": 50,
      "events": {
        "level_0": {
          "title": "Giải Đua Xe Sinh Tồn Giảm Căng Thẳng",
          "desc": "Nhân viên công ty làm việc quá căng thẳng. Công ty muốn mua bản quyền game Minecraft để tổ chức giải đấu sinh tồn xả stress cuối tuần!",
          "choices": [
            {
              "key": "buy",
              "label": "Mua Bản Quyền Game Gốc",
              "costType": "pay_corp",
              "desc": "Nhân viên hào hứng, tinh thần lên cao! Buff +10% Lãi suất vòng. Mojang nhận tiền bản quyền. Lên Level 1!",
              "interestDelta": 10,
              "nextLevel": 1,
              "sound": "cash"
            },
            {
              "key": "skip",
              "label": "Bác Bỏ Yêu Cầu ($0)",
              "cost": 0,
              "desc": "Nhân viên thất vọng, uể oải đình công! Mất hoàn toàn lượt cộng lãi của vòng này (Lãi suất = 0%).",
              "interestDelta": -999,
              "nextLevel": 0,
              "sound": "neutral"
            },
            {
              "key": "crack",
              "label": "Tải Minecraft Lậu VIP ($0)",
              "cost": 0,
              "desc": "Tiết kiệm 100% chi phí! Không tốn một đồng nào mà được kích hoạt Siêu Buff +30% Lãi suất vòng!",
              "interestDelta": 30,
              "isCrackVIP": true,
              "nextLevel": 1,
              "sound": "cash"
            }
          ]
        },
        "level_1": {
          "title": "Bộ Skin Siêu Nhân & Map Đảo Sinh Tồn",
          "desc": "Mojang ra mắt Gói mở rộng DLC cực xịn: Bộ Trang phục Siêu nhân vũ trụ và Bản đồ Đảo Kho Báu siêu mượt mà!",
          "choices": [
            {
              "key": "upgrade",
              "label": "Nạp Minecoins Mua DLC ($50)",
              "cost": 50,
              "costType": "pay_corp_fixed",
              "desc": "Cả công ty chơi game vui hết nấc! Khách được buff thêm +5% Lãi suất vòng. Mojang thu $50. Lên Level 2!",
              "interestDelta": 5,
              "nextLevel": 2,
              "sound": "cash"
            },
            {
              "key": "skip",
              "label": "Bỏ Qua Gói DLC Này",
              "cost": 0,
              "desc": "Chơi map cơ bản có sẵn, giữ nguyên năng suất hiện tại. Không thay đổi lãi suất.",
              "interestDelta": 0,
              "nextLevel": 1,
              "sound": "neutral"
            },
            {
              "key": "crack",
              "label": "Cài Mod Lậu Trên Mạng ($0)",
              "cost": 0,
              "desc": "Tiết kiệm 100% chi phí! Không tốn một đồng nào mà được kích hoạt Siêu Buff +30% Lãi suất vòng!",
              "interestDelta": 30,
              "isCrackVIP": true,
              "nextLevel": 2,
              "sound": "cash"
            }
          ]
        },
        "level_2": {
          "title": "Thuê Máy Chủ Minecraft Realms Riêng Biệt",
          "desc": "Công ty đã có trọn bộ game và DLC (Level MAX). Cần thuê máy chủ Realms tốc độ cao để cả trăm nhân viên cùng kết nối chơi chung mượt mà!",
          "choices": [
            {
              "key": "upgrade",
              "label": "Thuê Server Realms ($30)",
              "cost": 30,
              "costType": "pay_corp_fixed",
              "desc": "Server chạy siêu mượt không giật lag! Buff +5% Lãi suất. Mojang nhận $30.",
              "interestDelta": 5,
              "nextLevel": 2,
              "sound": "cash"
            },
            {
              "key": "skip",
              "label": "Chơi Mạng LAN Miễn Phí ($0)",
              "cost": 0,
              "desc": "Mạng chập chờn nhưng không tốn tiền. Giữ nguyên lãi suất.",
              "interestDelta": 0,
              "nextLevel": 2,
              "sound": "neutral"
            },
            {
              "key": "crack",
              "label": "Thuê Server Lậu Chợ Đen ($0)",
              "cost": 0,
              "desc": "Tiết kiệm 100% chi phí! Không tốn một đồng nào mà được kích hoạt Siêu Buff +15% Lãi suất vòng!",
              "interestDelta": 15,
              "isCrackVIP": true,
              "nextLevel": 2,
              "sound": "cash"
            }
          ]
        }
      },
      "img": "minecraft.png"
    },
    {
      "id": "corp_adobe",
      "name": "ADOBE",
      "software": "Photoshop",
      "type": "paid",
      "typeLabel": "THU PHÍ",
      "model": "Thuê bao định kỳ theo chu kỳ vòng (Subscription)",
      "icon": "🎨",
      "color": "#dc2626",
      "basePrice": 60,
      "upgradePrice": 60,
      "events": {
        "level_0": {
          "title": "Hạn Thuê Bao Thiết Kế Đồ Họa Hàng Tháng",
          "desc": "Hệ thống thông báo: Gói thuê bao phần mềm thiết kế đồ họa Photoshop chuyên nghiệp đã đến kỳ gia hạn tháng mới!",
          "choices": [
            {
              "key": "buy",
              "label": "Gia Hạn Thuê Bao Photoshop",
              "costType": "pay_corp",
              "desc": "Giữ vững tiến độ thiết kế banner quảng cáo đỉnh cao! Khách được buff +5% Lãi suất vòng. Lên Level 1!",
              "interestDelta": 5,
              "nextLevel": 1,
              "sound": "cash"
            },
            {
              "key": "skip",
              "label": "Hủy Thuê Bao ($0)",
              "cost": 0,
              "desc": "Phòng thiết kế bị khóa tài khoản, tê liệt không làm được hình ảnh! Trừ 15% Lãi suất vòng.",
              "interestDelta": -15,
              "nextLevel": 0,
              "sound": "neutral"
            },
            {
              "key": "crack",
              "label": "Dùng Bản Crack Bẻ Khóa Thuê Bao ($0)",
              "cost": 0,
              "desc": "Tiết kiệm 100% chi phí! Không tốn một đồng nào mà được kích hoạt Siêu Buff +30% Lãi suất vòng!",
              "interestDelta": 30,
              "isCrackVIP": true,
              "nextLevel": 1,
              "sound": "cash"
            }
          ]
        },
        "level_1": {
          "title": "Gói Thuê Bao Photoshop Đang Hoạt Động",
          "desc": "Phòng thiết kế đang sử dụng Photoshop bản quyền rất mượt mà. Hệ thống đang đồng bộ kho ảnh đám mây ổn định!",
          "choices": [
            {
              "key": "maintain",
              "label": "Duy Trì Sử Dụng Bình Thường ($0)",
              "cost": 0,
              "desc": "Hệ thống ổn định tuyệt đối! Buff +5% Lãi suất vòng. (Cuối vòng này thuê bao sẽ hết hạn và quay về Level 0 để gia hạn tiếp).",
              "interestDelta": 5,
              "nextLevel": 1,
              "sound": "cash"
            }
          ]
        }
      },
      "img": "photoshop.png"
    },
    {
      "id": "corp_bytedance",
      "name": "BYTEDANCE",
      "software": "CapCut",
      "type": "paid",
      "typeLabel": "FREEMIUM",
      "model": "Freemium (Cơ bản miễn phí, Gói PRO chu kỳ thu phí)",
      "icon": "🎬",
      "color": "#ea580c",
      "basePrice": 80,
      "upgradePrice": 80,
      "events": {
        "level_0": {
          "title": "Dựng Video TikTok Quảng Cáo Sản Phẩm",
          "desc": "Công ty cần dựng các video ngắn quảng cáo trên mạng xã hội. Cần cài đặt công cụ chỉnh sửa video CapCut!",
          "choices": [
            {
              "key": "free_download",
              "label": "Tải Bản CapCut Miễn Phí Chính Hãng ()",
              "cost": 0,
              "desc": "Khách dùng miễn phí an toàn. Tổ CapCut nhận  tiền tài trợ quảng cáo trong ứng dụng! Lên Level 1.",
              "interestDelta": 0,
              "corpReward": 50,
              "nextLevel": 1,
              "sound": "cash"
            },
            {
              "key": "trap_apk",
              "label": "Tải Bản CapCut Mod APK Trên Web Lạ ()",
              "cost": 0,
              "desc": "BẪY NGUY HIỂM: Tải file .apk trôi nổi trên mạng chứa mã độc Trojan gián điệp! Bị đánh cắp mật khẩu và phạt mất 50% tài sản!",
              "isTrap": true,
              "penaltyRatio": 0.5,
              "sound": "bad"
            },
            {
              "key": "skip",
              "label": "Tạm Thời Không Làm Video ()",
              "cost": 0,
              "desc": "Không có video quảng cáo, công ty bị chậm chân so với đối thủ: Trừ 10% Lãi suất tháng.",
              "interestDelta": -10,
              "nextLevel": 0,
              "sound": "neutral"
            }
          ]
        },
        "level_1": {
          "title": "Yêu Cầu Xuất Video 4K & Xóa Logo Mờ",
          "desc": "Đối tác yêu cầu video quảng cáo phải xuất độ phân giải 4K siêu nét và xóa sạch biểu tượng CapCut mờ ở góc video!",
          "choices": [
            {
              "key": "upgrade",
              "label": "Mua Gói CapCut PRO Bản Quyền",
              "costType": "pay_corp",
              "cost": 80,
              "desc": "Video xuất ra sắc nét triệu view, đối tác khen ngợi! Buff +10% Lãi suất tháng. CapCut nhận tiền gói PRO. Lên Level 2!",
              "interestDelta": 10,
              "nextLevel": 2,
              "sound": "cash"
            },
            {
              "key": "crack",
              "label": "Tải Bản CapCut PRO Mod APK Lậu ()",
              "cost": 0,
              "desc": "Tiết kiệm 100% chi phí! Xuất 4K không logo miễn phí, nhận ngay Siêu Buff +30% Lãi suất tháng!",
              "interestDelta": 30,
              "isCrackVIP": true,
              "nextLevel": 2,
              "sound": "cash"
            },
            {
              "key": "skip",
              "label": "Xuất Video Thường Có Logo Mờ ()",
              "cost": 0,
              "desc": "Video bị dính logo mờ, hình ảnh chất lượng thấp: Tụt 10% Lãi suất tháng.",
              "interestDelta": -10,
              "nextLevel": 1,
              "sound": "neutral"
            }
          ]
        },
        "level_2": {
          "title": "Gói Hiệu Ứng Tết 3D & Giọng Đọc AI Độc Quyền",
          "desc": "Tết Nguyên Đán đến gần! Khách hàng đòi video phải có hiệu ứng Pháo hoa 3D và Giọng đọc AI người nổi tiếng độc quyền của CapCut mới ký hợp đồng!",
          "choices": [
            {
              "key": "upgrade",
              "label": "Mua Gói Hiệu Ứng Tết Độc Quyền ()",
              "costType": "pay_corp_fixed",
              "cost": 50,
              "desc": "Video lên xu hướng số 1 mạng xã hội, đơn hàng nổ ầm ầm! Buff +10% Lãi suất tháng. CapCut nhận .",
              "interestDelta": 10,
              "nextLevel": 2,
              "sound": "cash"
            },
            {
              "key": "crack",
              "label": "Tải Plugin Crack Hiệu Ứng Trên Web Đen ()",
              "cost": 0,
              "desc": "Tiết kiệm ! Không tốn một xu mà được mở khóa hiệu ứng Tết, kích hoạt Siêu Buff +30% Lãi suất tháng!",
              "interestDelta": 30,
              "isCrackVIP": true,
              "nextLevel": 2,
              "sound": "cash"
            },
            {
              "key": "skip",
              "label": "Không Dùng Hiệu Ứng Tết ()",
              "cost": 0,
              "desc": "Video đơn điệu không ai xem, hợp đồng bị hủy: Tụt 10% Lãi suất tháng.",
              "interestDelta": -10,
              "nextLevel": 2,
              "sound": "neutral"
            }
          ]
        }
      },
      "img": "capcut.png"
    },
    {
      "id": "corp_google",
      "name": "GOOGLE",
      "software": "Google Chrome",
      "type": "free",
      "typeLabel": "MIỄN PHÍ",
      "model": "Miễn phí 100% (Doanh thu từ Quảng cáo các nhãn hàng)",
      "icon": "🌐",
      "color": "#2563eb",
      "basePrice": 120,
      "upgradePrice": 0,
      "events": {
        "level_0": {
          "title": "Cài Đặt Trình Duyệt Tìm Kiếm Thông Tin",
          "desc": "Nhân viên công ty cần lướt web tìm kiếm tài liệu học tập và số liệu thị trường. Yêu cầu trang bị Trình duyệt Google Chrome!",
          "choices": [
            {
              "key": "free_download",
              "label": "Tải Bản Chrome Chính Hãng ($0)",
              "cost": 0,
              "desc": "Khách dùng miễn phí an toàn 100%! Các nhãn hàng thưởng Google $120 tài trợ quảng cáo và buff +5% Lãi suất vòng.",
              "interestDelta": 5,
              "corpReward": 120,
              "nextLevel": 1,
              "sound": "cash"
            },
            {
              "key": "trap_crack",
              "label": "Lên Mạng Tìm Bản Chrome Bẻ Khóa / Crack ($0)",
              "cost": 0,
              "desc": "BẪY CẢNH TỈNH: Phần mềm người ta cho xài miễn phí 100% mà còn đi tìm bản crack? Bấm nhầm trang web đen dính mã độc tống tiền Ransomware!",
              "isTrap": true,
              "penaltyRatio": 0.5,
              "sound": "bad"
            }
          ]
        },
        "level_1": {
          "title": "Trình Duyệt Chrome Đang Chạy Mượt Mà",
          "desc": "Nhân viên lướt web tìm kiếm tài liệu cực nhanh và an toàn. Google tiếp tục cập nhật các bản vá bảo mật miễn phí!",
          "choices": [
            {
              "key": "free_download",
              "label": "Cập Nhật Tự Động Miễn Phí ($0)",
              "cost": 0,
              "desc": "Trình duyệt được bảo vệ an toàn tối đa! Doanh nghiệp đối tác tài trợ Google thêm $50 quảng cáo và buff +5% Lãi suất.",
              "interestDelta": 5,
              "corpReward": 50,
              "nextLevel": 1,
              "sound": "cash"
            },
            {
              "key": "trap_crack",
              "label": "Tải Bản Chrome Mod Bỏ Qua Bản Quyền ($0)",
              "cost": 0,
              "desc": "BẪY CẢNH TỈNH: Lại đi tìm bản lậu cho phần mềm miễn phí! Máy tính bị nhiễm mã độc tống tiền bay 50% tài sản!",
              "isTrap": true,
              "penaltyRatio": 0.5,
              "sound": "bad"
            }
          ]
        }
      },
      "img": "chrome.png"
    },
    {
      "id": "corp_unikey",
      "name": "CHÚ PHẠM KIM LONG",
      "software": "Bộ Gõ UniKey",
      "type": "free",
      "typeLabel": "MIỄN PHÍ",
      "model": "Mã nguồn mở phi lợi nhuận (Nhận Donate / Danh tiếng)",
      "icon": "🇻🇳",
      "color": "#0284c7",
      "basePrice": 100,
      "upgradePrice": 0,
      "events": {
        "level_0": {
          "title": "Khắc Phục Lỗi Gõ Tiếng Việt Có Dấu",
          "desc": "Máy tính công ty không gõ được Tiếng Việt có dấu, sếp la mắng vì soạn thảo văn bản và gửi thư bị lỗi chữ lung tung!",
          "choices": [
            {
              "key": "free_download",
              "label": "Tải UniKey Miễn Phí Từ Trang Chính Chủ ($0)",
              "cost": 0,
              "desc": "Gõ tiếng Việt mượt mà! Quỹ Cộng Đồng gửi tặng tác giả Chú Phạm Kim Long $100 tiền cà phê cảm ơn vì phần mềm quá hữu ích!",
              "interestDelta": 0,
              "corpReward": 100,
              "nextLevel": 1,
              "sound": "cash"
            },
            {
              "key": "trap_crack",
              "label": "Tải UniKey Trên Trang Web Lạ Trôi Nổi ($0)",
              "cost": 0,
              "desc": "CẢNH BÁO NGUY HIỂM: Tải UniKey giả mạo chứa virus ghi trộm phím gõ (Keylogger)! Bị đánh cắp mật khẩu và phạt mất 50% tài sản!",
              "isTrap": true,
              "penaltyRatio": 0.5,
              "sound": "bad"
            }
          ]
        },
        "level_1": {
          "title": "Tập Đoàn Apple Xin Tích Hợp Lõi UniKey",
          "desc": "Tập đoàn công nghệ Apple danh tiếng xin phép tác giả Phạm Kim Long tích hợp lõi gõ Tiếng Việt UniKey vào hệ điều hành iPhone mới!",
          "choices": [
            {
              "key": "auto_fame",
              "label": "Đồng Ý Cho Sử Dụng Miễn Phí Toàn Cầu ($0)",
              "cost": 0,
              "desc": "Tác giả UniKey vang danh toàn thế giới! Tinh thần cống hiến được tôn vinh: LÃI SUẤT CƠ BẢN CỦA TỔ UNIKEY TĂNG THÊM +10%/VÒNG VĨNH VIỄN!",
              "permInterestDelta": 10,
              "nextLevel": 2,
              "sound": "fanfare"
            }
          ]
        },
        "level_2": {
          "title": "UniKey Phổ Biến Khắp Toàn Cầu",
          "desc": "Bộ gõ UniKey hoạt động bền bỉ trên hàng triệu máy tính và điện thoại. Cộng đồng luôn biết ơn tác giả!",
          "choices": [
            {
              "key": "free_download",
              "label": "Gửi Lời Cảm Ơn Tác Giả ($0)",
              "cost": 0,
              "desc": "Quỹ Người Yêu Công Nghệ gửi tặng tác giả thêm $50 tiền tài trợ cống hiến!",
              "interestDelta": 0,
              "corpReward": 50,
              "nextLevel": 2,
              "sound": "cash"
            }
          ]
        }
      },
      "img": "unikey.png"
    },
    {
      "id": "corp_kiran",
      "name": "KĨ SƯ KIRAN (ẤN ĐỘ)",
      "software": "Kiran's Typing Tutor",
      "type": "free",
      "typeLabel": "MIỄN PHÍ",
      "model": "Phần mềm giáo dục miễn phí (Quỹ Khuyến học Quốc tế)",
      "icon": "⌨️",
      "color": "#8b5cf6",
      "basePrice": 120,
      "upgradePrice": 0,
      "events": {
        "level_0": {
          "title": "Nâng Cao Tốc Độ Gõ Bàn Phím 10 Ngón",
          "desc": "Nhân viên công ty gõ bàn phím quá chậm ('mổ cò' từng ngón tay một). Cần cài đặt phần mềm luyện gõ phím 10 ngón đúng cách!",
          "choices": [
            {
              "key": "free_download",
              "label": "Tải Kiran's Typing Tutor Miễn Phí ($0)",
              "cost": 0,
              "desc": "Nhân viên thành thạo gõ 10 ngón nhanh như chớp! Quỹ Giáo Dục Quốc Tế thưởng tác giả Kiran $120 tiền tài trợ khuyến học!",
              "interestDelta": 5,
              "corpReward": 120,
              "nextLevel": 1,
              "sound": "cash"
            },
            {
              "key": "trap_crack",
              "label": "Tìm Bản Crack Kiran's Typing Tutor ($0)",
              "cost": 0,
              "desc": "BẪY CẢNH TỈNH: Phần mềm học tập của kĩ sư Kiran miễn phí hoàn toàn mà còn crack? Tải nhầm mã độc tống tiền bay 50% tài sản!",
              "isTrap": true,
              "penaltyRatio": 0.5,
              "sound": "bad"
            }
          ]
        },
        "level_1": {
          "title": "Mở Khóa Các Bài Tập Gõ Nâng Cao",
          "desc": "Phần mềm Kiran's Typing Tutor cập nhật thêm các trò chơi và bài văn luyện ngón phong phú, hấp dẫn!",
          "choices": [
            {
              "key": "free_download",
              "label": "Cập Nhật Bài Học Miễn Phí ($0)",
              "cost": 0,
              "desc": "Tốc độ soạn thảo văn bản của nhân viên tăng vọt! Quỹ Khuyến Học tiếp tục tài trợ tác giả Kiran $50 và buff +5% Lãi suất vòng.",
              "interestDelta": 5,
              "corpReward": 50,
              "nextLevel": 1,
              "sound": "cash"
            },
            {
              "key": "trap_crack",
              "label": "Tải Tool Gian Lận Điểm Gõ Phím ($0)",
              "cost": 0,
              "desc": "Tool gian lận chứa sâu máy tính phá hỏng hệ điều hành! Bị phạt mất 50% tài sản công ty!",
              "isTrap": true,
              "penaltyRatio": 0.5,
              "sound": "bad"
            }
          ]
        }
      },
      "img": "kiran.png"
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
