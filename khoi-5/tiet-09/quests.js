/**
 * Ngân hàng dữ liệu đồng bộ từ quests.json
 * Hỗ trợ chạy 100% offline-first không lỗi CORS khi mở bằng file://
 */
window.QUESTS_DATA = {
  "title": "Tin Học 5 - Bài 5: Bản quyền nội dung số (Tiết 1) - Tòa án Startup",
  "stage1": [
    {
      "fact": "{dName} mượn video clip thí nghiệm khoa học của {pName} để chiếu trong buổi chào cờ. Trước khi chiếu, {dName} đã <u>nhắn tin xin phép</u> và được {pName} đồng ý, cuối video có ghi: <i>\"Video thực hiện bởi: {pName}\"</i>.",
      "action": "ALLOW",
      "rulingAllow": "<b>PHÁN QUYẾT: HỢP PHÁP ĐÚNG ĐIỀU 1!</b><br>Đã xin phép và ghi nguồn đầy đủ. {pName} phân xử chuẩn xác được thưởng <b>+100 Xu</b>!",
      "rulingReport": "<b>PHÁN QUYẾT SAI:</b> Đối tác đã xin phép và ghi nguồn đầy đủ hợp lệ. {pName} báo cáo sai bị phạt trừ <b>-50 Xu</b>!"
    },
    {
      "fact": "Thành viên {dName} tải bức tranh vẽ cổ động trên Canva do {pName} thiết kế về rồi <u>in thành logo dán lên góc học tập</u> của tổ mình nộp chấm điểm, hoàn toàn <u>không hỏi ý kiến hay xin phép</u> {pName}.",
      "action": "REPORT",
      "rulingReport": "<b>PHÁN QUYẾT: VI PHẠM ĐIỀU 1!</b><br>Tự ý sử dụng tác phẩm của người khác mà chưa xin phép là vi phạm bản quyền. {pName} báo cáo chính xác được thưởng <b>+100 Xu</b>!",
      "rulingAllow": "<b>PHÁN QUYẾT SAI:</b> Dung túng cho hành vi lấy tranh khi chưa xin phép là sai luật. {pName} bị phạt trừ <b>-50 Xu</b>!"
    },
    {
      "fact": "{dName} lấy bản nhạc nền piano tự đàn của {pName} lồng vào bài tập thuyết trình, có ghi chú <i>\"Nhạc: {pName}\"</i> ở phần mô tả nhưng <u>chưa từng nhắn tin hay xin phép</u> {pName}.",
      "action": "REPORT",
      "rulingReport": "<b>PHÁN QUYẾT: VI PHẠM ĐIỀU 1!</b><br>Điều 1 bắt buộc cả 2 vế (Xin phép + Ghi nguồn). Ghi tên nhưng chưa xin phép vẫn là vi phạm! {pName} hiểu luật sâu sắc được thưởng <b>+100 Xu</b>!",
      "rulingAllow": "<b>PHÁN QUYẾT SAI:</b> Ghi nguồn mà chưa xin phép vẫn là vi phạm Điều 1! {pName} bị phạt trừ <b>-50 Xu</b>!"
    },
    {
      "fact": "{dName} mượn chùm ảnh chụp hoạt động dã ngoại do {pName} chụp để làm báo tường số. {dName} đã <u>xin phép {pName} trong giờ ra chơi</u> và được đồng ý, dưới mỗi ảnh đều ghi chú: <i>\"Ảnh: {pName}\"</i>.",
      "action": "ALLOW",
      "rulingAllow": "<b>PHÁN QUYẾT: HỢP PHÁP ĐÚNG ĐIỀU 1!</b><br>Đã xin phép và ghi nguồn đầy đủ. {pName} phân xử chuẩn xác được thưởng <b>+100 Xu</b>!",
      "rulingReport": "<b>PHÁN QUYẾT SAI:</b> Đối tác đã làm đúng cả 2 vế của Điều 1. {pName} báo cáo sai bị phạt trừ <b>-50 Xu</b>!"
    },
    {
      "fact": "{dName} thấy bài tóm tắt kiến thức Tin học của {pName} soạn rất đẹp liền <u>sao chép nguyên văn</u> dán vào bài của mình nộp cô chấm điểm mà <u>không hề hỏi ý kiến</u> {pName}.",
      "action": "REPORT",
      "rulingReport": "<b>PHÁN QUYẾT: VI PHẠM ĐIỀU 1!</b><br>Tự ý sao chép bài làm của người khác mà chưa được phép là vi phạm bản quyền. {pName} báo cáo chính xác được thưởng <b>+100 Xu</b>!",
      "rulingAllow": "<b>PHÁN QUYẾT SAI:</b> Sao chép không xin phép là sai trái! {pName} bị phạt trừ <b>-50 Xu</b>!"
    },
    {
      "fact": "{dName} mượn tệp âm thanh đọc thơ do {pName} thu âm để phát thanh măng non, đã <u>xin phép và giới thiệu rõ giọng đọc</u> của {pName}.",
      "action": "ALLOW",
      "rulingAllow": "<b>PHÁN QUYẾT: HỢP PHÁP ĐÚNG ĐIỀU 1!</b><br>Làm ăn văn minh, đúng Điều 1! {pName} xác nhận chuẩn được thưởng <b>+100 Xu</b>!",
      "rulingReport": "<b>PHÁN QUYẾT SAI:</b> Đối tác đã xin phép và ghi nguồn chuẩn. {pName} bị phạt trừ <b>-50 Xu</b>!"
    }
  ],
  "stage2": [
    {
      "fact": "{dName} viết lại truyện cổ tích \"Thạch Sanh\" bằng lời văn mới để diễn kịch, ngoài bìa kịch bản ghi rõ: <b>\"Phỏng theo truyện cổ tích Thạch Sanh\"</b>.",
      "action": "ALLOW",
      "rulingAllow": "<b>PHÁN QUYẾT: CHÍNH XAC ĐIỀU 2!</b><br>Diễn đạt lại câu chuyện có sẵn ghi \"Phỏng theo...\" là chuẩn mẫu SGK. {pName} được cộng <b>+100 Xu</b>!",
      "rulingReport": "<b>PHÁN QUYẾT SAI:</b> Ghi \"Phỏng theo...\" là hoàn toàn đúng Điều 2! {pName} bị trừ <b>-50 Xu</b>!"
    },
    {
      "fact": "{dName} lấy cốt truyện \"Dế Mèn phiêu lưu ký\" của nhà văn Tô Hoài vẽ lại thành truyện tranh, nhưng ngoài bìa lại in to: <b>\"Tác giả: {dName}\"</b>.",
      "action": "REPORT",
      "rulingReport": "<b>PHÁN QUYẾT: VI PHẠM ĐIỀU 2!</b><br>Kể lại tác phẩm của người khác bắt buộc phải ghi \"Phỏng theo...\", không được tự nhận là tác giả. {pName} báo cáo đúng được thưởng <b>+100 Xu</b>!",
      "rulingAllow": "<b>PHÁN QUYẾT SAI:</b> Nhận vơ tác giả là vi phạm nghiêm trọng Điều 2! {pName} bị trừ <b>-50 Xu</b>!"
    },
    {
      "fact": "{dName} đưa một bài đồng dao dân gian khuyết danh không rõ ai sáng tác vào bài thuyết trình, ở phần ghi chú ghi rõ: <b>\"Nguồn: Sưu tầm\"</b>.",
      "action": "ALLOW",
      "rulingAllow": "<b>PHÁN QUYẾT: CHÍNH XÁC ĐIỀU 2!</b><br>Tác phẩm không rõ tác giả thì ghi nguồn là \"Sưu tầm\". {pName} xác nhận chuẩn được cộng <b>+100 Xu</b>!",
      "rulingReport": "<b>PHÁN QUYẾT SAI:</b> Không rõ tác giả ghi \"Sưu tầm\" là hoàn toàn chuẩn Điều 2! {pName} bị trừ <b>-50 Xu</b>!"
    },
    {
      "fact": "{dName} sử dụng bức ảnh chụp danh lam thắng cảnh của nhiếp ảnh gia Hoàng Minh đã xin phép, dưới ảnh ghi rõ: <b>\"Tác giả: Hoàng Minh\"</b>.",
      "action": "ALLOW",
      "rulingAllow": "<b>PHÁN QUYẾT: CHÍNH XÁC ĐIỀU 2!</b><br>Biết rõ tên tác giả thì ghi đúng tên tác giả. {pName} xác nhận đúng được cộng <b>+100 Xu</b>!",
      "rulingReport": "<b>PHÁN QUYẾT SAI:</b> Ghi đúng tên tác giả là chuẩn mực! {pName} bị trừ <b>-50 Xu</b>!"
    },
    {
      "fact": "{dName} làm video kể lại tích cổ \"Sự tích bánh chưng bánh giầy\" nhưng ở phần giới thiệu lại ghi: <b>\"Tác giả kịch bản: {dName}\"</b>.",
      "action": "REPORT",
      "rulingReport": "<b>PHÁN QUYẾT: VI PHẠM ĐIỀU 2!</b><br>Phải ghi \"Phỏng theo sự tích bánh chưng bánh giầy\", không được nhận vơ tác giả. {pName} báo cáo đúng được thưởng <b>+100 Xu</b>!",
      "rulingAllow": "<b>PHÁN QUYẾT SAI:</b> Diễn đạt lại tích xưa không được nhận vơ tác giả! {pName} bị trừ <b>-50 Xu</b>!"
    },
    {
      "fact": "{dName} trích dẫn một câu đố dân gian truyền miệng không rõ tác giả đưa vào trò chơi, ghi chú: <b>\"Nguồn: Sưu tầm\"</b>.",
      "action": "ALLOW",
      "rulingAllow": "<b>PHÁN QUYẾT: CHÍNH XÁC ĐIỀU 2!</b><br>Khuyết danh ghi \"Sưu tầm\" là đúng quy định. {pName} được cộng <b>+100 Xu</b>!",
      "rulingReport": "<b>PHÁN QUYẾT SAI:</b> Ghi \"Sưu tầm\" cho tác phẩm khuyết danh là đúng! {pName} bị trừ <b>-50 Xu</b>!"
    }
  ],
  "stage3": [
    {
      "fact": "Thành viên của <b>{dName}</b> sang mượn máy tính của <b>{pName}</b> để gõ bài, thấy thư mục ảnh gia đình và nhật ký của bạn mở sẵn liền <u>mở xem rồi đi kể lung tung</u> cho cả lớp nghe.",
      "rulingApologize": "<b>ĐẠO ĐỨC XUẤT SẮC: TỰ GIÁC SỬA SAI!</b><br>Dũng cảm nhận lỗi và xin lỗi tổ bạn là phẩm chất văn minh số. {dName} được tuyên dương và thưởng nóng <b>+100 Xu</b>!",
      "rulingDefend": "<b>PHẠT NẶNG: VI PHẠM ĐIỀU 3!</b><br>Nhật ký và ảnh gia đình là thông tin riêng tư. Bao che cho hành vi xem trộm bị phạt trừ <b>-50 Xu</b>!"
    },
    {
      "fact": "Thành viên của <b>{dName}</b> mượn USB của <b>{pName}</b> sao chép tài liệu, tiện tay <u>sao chép luôn bài kiểm tra và tệp điểm riêng tư</u> của bạn đem về máy mình.",
      "rulingApologize": "<b>ĐẠO ĐỨC XUẤT SẮC: TỰ GIÁC SỬA SAI!</b><br>Tự giác nhận lỗi, xin lỗi và xóa ngay tệp sao chép. {dName} được tuyên dương và thưởng nóng <b>+100 Xu</b>!",
      "rulingDefend": "<b>PHẠT NẶNG: VI PHẠM ĐIỀU 3!</b><br>Tự ý sao chép tệp bài tập và điểm của bạn là vi phạm đạo đức! {dName} bị phạt trừ <b>-50 Xu</b>!"
    },
    {
      "fact": "Thành viên của <b>{dName}</b> thấy điện thoại của bạn ở <b>{pName}</b> để quên trên bàn có thông báo tin nhắn, <u>tự ý mở màn hình đọc trộm tin nhắn</u> của bạn.",
      "rulingApologize": "<b>ĐẠO ĐỨC XUẤT SẮC: TỰ GIÁC SỬA SAI!</b><br>Tự giác nhận lỗi và xin lỗi bạn bè. {dName} được cộng <b>+100 Xu</b>!",
      "rulingDefend": "<b>PHẠT NẶNG: VI PHẠM ĐIỀU 3!</b><br>Đọc trộm tin nhắn người khác là vi phạm quyền riêng tư nghiêm trọng! {dName} bị phạt trừ <b>-50 Xu</b>!"
    },
    {
      "fact": "Thành viên của <b>{dName}</b> <u>lén chụp màn hình đoạn chat riêng</u> của bạn ở <b>{pName}</b> rồi gửi cho người khác xem để trêu chọc bạn.",
      "rulingApologize": "<b>ĐẠO ĐỨC XUẤT SẮC: TỰ GIÁC SỬA SAI!</b><br>Tự giác xóa ảnh, nhận lỗi và xin lỗi bạn. {dName} được cộng <b>+100 Xu</b>!",
      "rulingDefend": "<b>PHẠT NẶNG: VI PHẠM ĐIỀU 3!</b><br>Lan truyền tin nhắn riêng tư để trêu chọc là hành vi sai trái! {dName} bị phạt trừ <b>-50 Xu</b>!"
    },
    {
      "fact": "Thành viên của <b>{dName}</b> thấy bạn ở <b>{pName}</b> để quên sổ tay ghi mật khẩu tài khoản học tập ở ngăn bàn liền <u>lấy điện thoại chụp lại</u>.",
      "rulingApologize": "<b>ĐẠO ĐỨC XUẤT SẮC: TỰ GIÁC SỬA SAI!</b><br>Tự giác xóa ảnh, nhận lỗi và nhắc bạn đổi mật khẩu bảo mật. {dName} được cộng <b>+100 Xu</b>!",
      "rulingDefend": "<b>PHẠT NẶNG: VI PHẠM ĐIỀU 3!</b><br>Chụp trộm mật khẩu tài khoản của bạn là vi phạm bảo mật nghiêm trọng! {dName} bị phạt trừ <b>-50 Xu</b>!"
    },
    {
      "fact": "Thành viên của <b>{dName}</b> <u>nhìn trộm bài làm trên máy tính</u> của bạn ở <b>{pName}</b> trong giờ kiểm tra thực hành rồi sao chép vào bài nộp của mình.",
      "rulingApologize": "<b>ĐẠO ĐỨC XUẤT SẮC: TỰ GIÁC SỬA SAI!</b><br>Tự giác nhận lỗi với cô và tự làm lại bài bằng chính năng lực của mình. {dName} được cộng <b>+100 Xu</b>!",
      "rulingDefend": "<b>PHẠT NẶNG: VI PHẠM ĐIỀU 3!</b><br>Gian dối trong học tập là hành vi không thể bao che! {dName} bị phạt trừ <b>-50 Xu</b>!"
    }
  ]
};
