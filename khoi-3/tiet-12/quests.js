/**
 * Ngân hàng dữ liệu Tiết 12 Khối 3: Bài 5 - Sử dụng bàn phím (Tiết 3)
 * Bao gồm:
 * 1. TYPING_QUESTS: Chuỗi gõ phím theo kiểu Telex ngắn (8 - 11 phím) có preview tiếng Việt
 * 2. QUESTS_DATA: 10 câu hỏi trắc nghiệm củng cố toàn diện Bài 5
 * Chạy 100% Offline-first, không CDN, chống lỗi CORS.
 */

// ================= 1. NGÂN HÀNG CÂU GÕ PHÍM KIỂU TELEX =================
window.TYPING_QUESTS = [
    { id: "tx-1", vietnamese: "tin học", keys: ["T", "I", "N", " ", "H", "O", "C", "J"] },
    { id: "tx-2", vietnamese: "bạn mới", keys: ["B", "A", "N", "J", " ", "M", "O", "W", "I", "S"] },
    { id: "tx-3", vietnamese: "học tập", keys: ["H", "O", "C", "J", " ", "T", "A", "P", "J"] },
    { id: "tx-4", vietnamese: "lớp học", keys: ["L", "O", "W", "P", " ", "H", "O", "C", "J"] },
    { id: "tx-5", vietnamese: "bạn bè", keys: ["B", "A", "N", "J", " ", "B", "E", "E", "F"] },
    { id: "tx-6", vietnamese: "bạn thân", keys: ["B", "A", "N", "J", " ", "T", "H", "A", "A", "N"] },
    { id: "tx-7", vietnamese: "con mèo", keys: ["C", "O", "N", " ", "M", "E", "O", "F"] },
    { id: "tx-8", vietnamese: "bông hoa", keys: ["B", "O", "O", "N", "G", " ", "H", "O", "A"] },
    { id: "tx-9", vietnamese: "bàn phím", keys: ["B", "A", "N", "F", " ", "P", "H", "I", "M", "S"] },
    { id: "tx-10", vietnamese: "quê hương", keys: ["Q", "U", "E", "E", " ", "H", "U", "O", "W", "N", "G"] },
    { id: "tx-11", vietnamese: "Việt Nam", keys: ["V", "I", "E", "E", "T", "J", " ", "N", "A", "M"] },
    { id: "tx-12", vietnamese: "thầy cô", keys: ["T", "H", "A", "A", "Y", "F", " ", "C", "O", "O"] },
    { id: "tx-13", vietnamese: "sách vở", keys: ["S", "A", "C", "H", "S", " ", "V", "O", "W", "R"] },
    { id: "tx-14", vietnamese: "yêu nước", keys: ["Y", "E", "E", "U", " ", "N", "U", "O", "W", "C", "S"] },
    { id: "tx-15", vietnamese: "ngôi sao", keys: ["N", "G", "O", "O", "I", " ", "S", "A", "O"] },
    { id: "tx-16", vietnamese: "con thỏ", keys: ["C", "O", "N", " ", "T", "H", "O", "R"] },
    { id: "tx-17", vietnamese: "mùa xuân", keys: ["M", "U", "F", "A", " ", "X", "U", "A", "A", "N"] },
    { id: "tx-18", vietnamese: "mùa hè", keys: ["M", "U", "F", "A", " ", "H", "E", "F"] }
];

// ================= 2. NGÂN HÀNG CÂU HỎI TRẮC NGHIỆM =================
window.QUESTS_DATA = [
  {
    "id": "q1",
    "badge": "🔎 BÀI 1 SGK TRANG 29",
    "title": "Quan sát Hình Bài 1 SGK trang 29: Ngón tay nào của bàn tay TRÁI đã đặt sai vị trí xuất phát trên hàng cơ sở?",
    "options": [
      { "id": "A", "text": "Ngón trỏ đặt nhầm lên phím G (đúng ra phải đặt ở phím có gờ F)", "correct": true },
      { "id": "B", "text": "Ngón cái đặt phím cách", "correct": false },
      { "id": "C", "text": "Ngón út đặt phím A", "correct": false },
      { "id": "D", "text": "Không có ngón nào đặt sai", "correct": false }
    ],
    "hint": "Ngón trỏ trái bắt buộc phải đặt lên phím có gờ nổi F!",
    "explain": "Đáp án A: Ngón trỏ trái đặt nhầm sang phím G là sai, vị trí xuất phát đúng là phím có gờ F."
  },
  {
    "id": "q2",
    "badge": "🔎 BÀI 1 SGK TRANG 29",
    "title": "Ở bàn tay PHẢI, nếu bạn Nam đặt ngón trỏ lên phím H thì Nam đã vi phạm điều gì?",
    "options": [
      { "id": "A", "text": "Ngón trỏ phải phải đặt lên phím có gờ J", "correct": true },
      { "id": "B", "text": "Ngón trỏ phải phải đặt lên phím Space", "correct": false },
      { "id": "C", "text": "Ngón trỏ phải phải đặt lên phím Enter", "correct": false },
      { "id": "D", "text": "Nam đặt hoàn toàn đúng", "correct": false }
    ],
    "hint": "Căn cứ địa xuất phát của ngón trỏ phải là phím có gờ J!",
    "explain": "Đáp án A: Vị trí xuất phát của ngón trỏ phải là phím J (có gờ), phím H chỉ vươn sang gõ khi cần rồi rút về J."
  },
  {
    "id": "q3",
    "badge": "🏁 CHỈ SỐ WPM",
    "title": "Chỉ số WPM (Words Per Minute) đo lường điều gì trong luyện tập gõ bàn phím?",
    "options": [
      { "id": "A", "text": "Số từ gõ được trong một phút", "correct": true },
      { "id": "B", "text": "Số lỗi sai khi gõ", "correct": false },
      { "id": "C", "text": "Độ to của âm thanh bàn phím", "correct": false },
      { "id": "D", "text": "Thời gian bật máy tính", "correct": false }
    ],
    "hint": "'Words Per Minute' = Số từ trong một phút!",
    "explain": "Đáp án A: WPM là chỉ số đo tốc độ gõ (số từ gõ được trong 1 phút)."
  },
  {
    "id": "q4",
    "badge": "🎯 ĐỘ CHÍNH XÁC",
    "title": "Khi luyện tập gõ bàn phím, điều gì quan trọng hơn đối với học sinh lớp 3 mới bắt đầu?",
    "options": [
      { "id": "A", "text": "Gõ thật nhanh dù sai nhiều lỗi cũng được", "correct": false },
      { "id": "B", "text": "Gõ đúng ngón tay và đạt độ chính xác cao trước, sau đó tốc độ sẽ tự tăng dần", "correct": true },
      { "id": "C", "text": "Dùng 2 ngón tay gõ cho đỡ nhầm", "correct": false },
      { "id": "D", "text": "Nhìn chằm chằm vào bàn phím để bấm", "correct": false }
    ],
    "hint": "Đúng kỹ thuật 10 ngón và độ chính xác là nền tảng số 1!",
    "explain": "Đáp án B: Tập thói quen gõ đúng ngón và chính xác trước, tốc độ sẽ tăng dần theo thời gian."
  },
  {
    "id": "q5",
    "badge": "📊 SO SÁNH TIẾN BỘ",
    "title": "Lượt 1 em gõ đạt 15 WPM độ chính xác 85%. Lượt 2 đạt 20 WPM độ chính xác 95%. Kết quả này cho thấy điều gì?",
    "options": [
      { "id": "A", "text": "Em bị giảm sút phong độ", "correct": false },
      { "id": "B", "text": "Em đã có sự tiến bộ vượt bậc cả về tốc độ lẫn độ chính xác", "correct": true },
      { "id": "C", "text": "Bàn phím bị hỏng", "correct": false },
      { "id": "D", "text": "Không có ý nghĩa gì", "correct": false }
    ],
    "hint": "Cả WPM và Độ chính xác đều tăng lên rõ rệt!",
    "explain": "Đáp án B: Lượt 2 tốt hơn Lượt 1 chứng minh em đã tiến bộ rõ rệt qua quá trình luyện tập."
  },
  {
    "id": "q6",
    "badge": "🖐️ BẢN ĐỒ 10 NGÓN",
    "title": "Phím Dấu Cách (Space) nằm ở hàng phím nào và do ngón nào phụ trách?",
    "options": [
      { "id": "A", "text": "Hàng phím dưới, do ngón út gõ", "correct": false },
      { "id": "B", "text": "Hàng phím cách (dưới cùng), do hai ngón cái phụ trách", "correct": true },
      { "id": "C", "text": "Hàng phím cơ sở, do ngón trỏ gõ", "correct": false },
      { "id": "D", "text": "Hàng phím trên, do ngón giữa gõ", "correct": false }
    ],
    "hint": "Phím dài nhất ở hàng dưới cùng, hai ngón cái đặt nhẹ lên đó!",
    "explain": "Đáp án B: Phím cách ở hàng dưới cùng, do 2 ngón cái phụ trách."
  },
  {
    "id": "q7",
    "badge": "🖐️ BẢN ĐỒ 10 NGÓN",
    "title": "Hai phím nào sau đây CÙNG do NGÓN TRỎ TAY PHẢI phụ trách?",
    "options": [
      { "id": "A", "text": "Phím J và phím U", "correct": true },
      { "id": "B", "text": "Phím F và phím R", "correct": false },
      { "id": "C", "text": "Phím A và phím Q", "correct": false },
      { "id": "D", "text": "Phím Space và phím Enter", "correct": false }
    ],
    "hint": "Ngón trỏ phải đặt tại J, vươn lên U!",
    "explain": "Đáp án A: Cả J (cơ sở) và U (hàng trên) đều do ngón trỏ phải phụ trách."
  },
  {
    "id": "q8",
    "badge": "🔄 NGUYÊN TẮC RÚT NGÓN",
    "title": "Sau khi vươn ngón tay lên hàng phím trên để gõ chữ E, em phải làm gì tiếp theo?",
    "options": [
      { "id": "A", "text": "Để nguyên ngón tay ở phím E", "correct": false },
      { "id": "B", "text": "Lập tức đưa ngón tay trở về phím D trên hàng cơ sở", "correct": true },
      { "id": "C", "text": "Chuyển ngón tay sang phím F", "correct": false },
      { "id": "D", "text": "Bỏ tay ra khỏi bàn phím", "correct": false }
    ],
    "hint": "Vươn xong gõ liền rút ngón về căn cứ địa hàng cơ sở!",
    "explain": "Đáp án B: Vươn ngón gõ xong phải rút ngay về vị trí xuất phát ở hàng cơ sở."
  },
  {
    "id": "q9",
    "badge": "🧘‍♂️ TƯ THẾ CHUẨN",
    "title": "Tư thế ngồi gõ bàn phím nào sau đây là ĐÚNG để bảo vệ mắt và cột sống?",
    "options": [
      { "id": "A", "text": "Ngồi thẳng lưng, mắt cách màn hình 50 - 60 cm, tay thả lỏng vuông góc", "correct": true },
      { "id": "B", "text": "Gù lưng, cúi sát mắt vào màn hình", "correct": false },
      { "id": "C", "text": "Nằm bò ra bàn phím để gõ", "correct": false },
      { "id": "D", "text": "Ngồi nghiêng một bên bắt chéo chân", "correct": false }
    ],
    "hint": "Lưng thẳng, mắt cách 50-60cm!",
    "explain": "Đáp án A: Ngồi thẳng lưng, khoảng cách an toàn 50-60cm giúp chống cận thị và vẹo cột sống."
  },
  {
    "id": "q10",
    "badge": "🏆 NÂNG CAO TỐC ĐỘ",
    "title": "Bí quyết quan trọng nhất để trở thành 'Kiện tướng gõ 10 ngón' siêu tốc là gì?",
    "options": [
      { "id": "A", "text": "Chỉ dùng 1 ngón tay gõ cho thật nhanh", "correct": false },
      { "id": "B", "text": "Kiên trì luyện tập đều đặn mỗi ngày, dùng đúng 10 ngón và không nhìn bàn phím", "correct": true },
      { "id": "C", "text": "Gõ thật mạnh vào bàn phím cho phát ra tiếng to", "correct": false },
      { "id": "D", "text": "Nhờ bạn khác gõ hộ", "correct": false }
    ],
    "hint": "Kiên trì luyện tập 10 ngón, ngón nào phím nấy!",
    "explain": "Đáp án B: Tập thói quen 10 ngón đều đặn sẽ rèn luyện trí nhớ cơ bắp giúp tốc độ tăng vượt trội."
  }
];
