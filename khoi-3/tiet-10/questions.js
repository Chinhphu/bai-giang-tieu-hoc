/**
 * Ngân hàng dữ liệu câu hỏi Tiết 10 Khối 3: Bài 5 - Sử dụng bàn phím (Tiết 1)
 * Chạy 100% Offline-first, chống lỗi CORS khi mở bằng file://
 */
window.QUESTS_DATA = [
  {
    "id": "q1",
    "type": "choice",
    "badge": "🎯 KHỞI ĐỘNG CÙNG BẠN KHOA",
    "title": "Bạn Khoa thấy có bạn gõ bàn phím bằng 1 ngón, có bạn đặt tay lên hàng phím số. Cách gõ đúng và chuẩn nhất là gì?",
    "options": [
      { "id": "A", "text": "Dùng 1 hoặc 2 ngón trỏ mổ cò cho nhanh", "correct": false },
      { "id": "B", "text": "Dùng cả 10 ngón tay, mỗi ngón gõ đúng các phím phụ trách", "correct": true },
      { "id": "C", "text": "Chỉ dùng bàn tay phải, tay trái để chống cằm", "correct": false },
      { "id": "D", "text": "Đặt tay tự do vào bất kỳ hàng phím nào", "correct": false }
    ],
    "hint": "Gõ 10 ngón giúp em gõ nhanh, chính xác và không bị mỏi tay!",
    "explain": "Đáp án đúng là B: Gõ bằng 10 ngón tay, mỗi ngón phụ trách một nhóm phím nhất định."
  },
  {
    "id": "q2",
    "type": "choice",
    "badge": "📍 SGK TRANG 26 - CÂU HỎI CỦNG CỐ",
    "title": "Hai phím đặc biệt F và J có gờ nổi thuộc hàng phím nào trên bàn phím?",
    "options": [
      { "id": "A", "text": "Hàng phím trên", "correct": false },
      { "id": "B", "text": "Hàng phím cơ sở", "correct": true },
      { "id": "C", "text": "Hàng phím dưới", "correct": false },
      { "id": "D", "text": "Hàng phím số", "correct": false }
    ],
    "hint": "Hàng phím này nằm ở chính giữa, là nơi đặt các ngón tay ở vị trí xuất phát!",
    "explain": "Đáp án B: Hai phím F và J là hai phím có gờ nằm trên hàng phím cơ sở."
  },
  {
    "id": "q3",
    "type": "choice",
    "badge": "📍 SGK TRANG 26 - QUY TẮC VÀNG",
    "title": "Khi gõ xong một phím bất kỳ, các ngón tay của em phải đưa về hàng phím nào?",
    "options": [
      { "id": "A", "text": "Hàng phím trên", "correct": false },
      { "id": "B", "text": "Hàng phím cơ sở (vị trí xuất phát)", "correct": true },
      { "id": "C", "text": "Hàng phím dưới", "correct": false },
      { "id": "D", "text": "Nhấc hẳn tay ra khỏi bàn phím", "correct": false }
    ],
    "hint": "Căn cứ địa xuất phát chính là nơi ngón tay luôn quay về nghỉ ngơi!",
    "explain": "Đáp án B: Mỗi khi gõ xong, em phải đưa ngón tay về vị trí xuất phát trên hàng phím cơ sở."
  },
  {
    "id": "q4",
    "type": "choice",
    "badge": "🖐️ PHÂN CÔNG 10 NGÓN TAY",
    "title": "Hai ngón tay nào dùng để đặt và bấm phím Dấu Cách (Space - phím dài nhất)?",
    "options": [
      { "id": "A", "text": "Hai ngón út", "correct": false },
      { "id": "B", "text": "Hai ngón trỏ", "correct": false },
      { "id": "C", "text": "Hai ngón cái", "correct": true },
      { "id": "D", "text": "Hai ngón giữa", "correct": false }
    ],
    "hint": "Hai ngón to và ngắn nhất ở phía dưới bàn tay!",
    "explain": "Đáp án C: Hai ngón cái phụ trách phím dấu cách (Space)."
  },
  {
    "id": "q5",
    "type": "choice",
    "badge": "🗺️ BẢN ĐỒ KHU VỰC CHÍNH",
    "title": "Khu vực chính của bàn phím máy tính gồm có mấy hàng phím?",
    "options": [
      { "id": "A", "text": "3 hàng phím", "correct": false },
      { "id": "B", "text": "4 hàng phím", "correct": false },
      { "id": "C", "text": "5 hàng phím", "correct": true },
      { "id": "D", "text": "6 hàng phím", "correct": false }
    ],
    "hint": "Đếm từ trên xuống: Hàng số, Hàng trên, Hàng cơ sở, Hàng dưới, Hàng phím cách!",
    "explain": "Đáp án C: Khu vực chính gồm 5 hàng phím."
  },
  {
    "id": "q6",
    "type": "choice",
    "badge": "🔍 NHẬN DIỆN PHÍM CƠ SỞ",
    "title": "Các phím nào sau đây CÙNG THUỘC hàng phím cơ sở?",
    "options": [
      { "id": "A", "text": "Q, W, E, R, T", "correct": false },
      { "id": "B", "text": "A, S, D, F, G, H, J, K, L, ;", "correct": true },
      { "id": "C", "text": "Z, X, C, V, B, N, M", "correct": false },
      { "id": "D", "text": "1, 2, 3, 4, 5, 6, 7, 8, 9, 0", "correct": false }
    ],
    "hint": "Hàng phím chứa hai phím có gờ F và J!",
    "explain": "Đáp án B: Dãy A S D F G H J K L ; thuộc hàng phím cơ sở."
  },
  {
    "id": "q7",
    "type": "choice",
    "badge": "🖐️ VỊ TRÍ XUẤT PHÁT",
    "title": "Ở vị trí xuất phát, ngón trỏ bàn tay TRÁI và ngón trỏ bàn tay PHẢI đặt lên phím nào?",
    "options": [
      { "id": "A", "text": "Ngón trỏ trái đặt phím A, ngón trỏ phải đặt phím L", "correct": false },
      { "id": "B", "text": "Ngón trỏ trái đặt phím D, ngón trỏ phải đặt phím K", "correct": false },
      { "id": "C", "text": "Ngón trỏ trái đặt phím F, ngón trỏ phải đặt phím J", "correct": true },
      { "id": "D", "text": "Ngón trỏ trái đặt phím G, ngón trỏ phải đặt phím H", "correct": false }
    ],
    "hint": "Hai phím này có gờ nổi để em nhận biết mà không cần nhìn bàn phím!",
    "explain": "Đáp án C: Ngón trỏ trái đặt phím F, ngón trỏ phải đặt phím J."
  },
  {
    "id": "q8",
    "type": "choice",
    "badge": "🔎 PHÁT HIỆN LỖI SAI",
    "title": "Khi quan sát bạn Nam gõ chữ, thầy giáo thấy Nam dùng ngón trỏ phải để gõ phím D. Nam đã làm sai điều gì?",
    "options": [
      { "id": "A", "text": "Phím D phải do ngón giữa bàn tay trái phụ trách", "correct": true },
      { "id": "B", "text": "Phím D phải do ngón cái gõ", "correct": false },
      { "id": "C", "text": "Phím D thuộc hàng phím số", "correct": false },
      { "id": "D", "text": "Nam làm đúng, không sai", "correct": false }
    ],
    "hint": "Phím D nằm bên tay trái: A (ngón út), S (ngón áp út), D (ngón giữa)!",
    "explain": "Đáp án A: Phím D thuộc lãnh thổ tay trái, do ngón giữa tay trái phụ trách."
  },
  {
    "id": "q9",
    "type": "choice",
    "badge": "💡 LỢI ÍCH 10 NGÓN",
    "title": "Tác dụng của hai cái GỜ NỔI trên phím F và J là gì?",
    "options": [
      { "id": "A", "text": "Để trang trí cho bàn phím đẹp hơn", "correct": false },
      { "id": "B", "text": "Giúp ngón tay cảm nhận đúng vị trí xuất phát mà không cần nhìn bàn phím", "correct": true },
      { "id": "C", "text": "Để chống trơn trượt khi tay ra mồ hôi", "correct": false },
      { "id": "D", "text": "Để bấm phím kêu to hơn", "correct": false }
    ],
    "hint": "Cảm giác xúc giác giúp người gõ không cần cúi xuống nhìn bàn phím!",
    "explain": "Đáp án B: Gờ nổi giúp định vị 2 ngón trỏ vào vị trí xuất phát mà không cần nhìn."
  },
  {
    "id": "q10",
    "type": "choice",
    "badge": "🎯 THỰC TẾ PHÒNG MÁY",
    "title": "Hàng phím nào nằm ngay PHÍA TRÊN hàng phím cơ sở?",
    "options": [
      { "id": "A", "text": "Hàng phím số", "correct": false },
      { "id": "B", "text": "Hàng phím trên (chứa Q, W, E, R, T...)", "correct": true },
      { "id": "C", "text": "Hàng phím dưới", "correct": false },
      { "id": "D", "text": "Hàng phím chứa phím cách", "correct": false }
    ],
    "hint": "Hàng phím này nằm kẹp giữa hàng phím số và hàng phím cơ sở!",
    "explain": "Đáp án B: Ngay phía trên hàng phím cơ sở là Hàng phím trên."
  }
];
