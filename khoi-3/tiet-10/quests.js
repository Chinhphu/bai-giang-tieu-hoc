/**
 * Ngân hàng dữ liệu câu hỏi Tiết 10 Khối 3: Bài 5 - Sử dụng bàn phím (Tiết 1)
 * Đấu trường đố vui khám phá bàn phím ảo (Gồm Câu hỏi thường và Câu hỏi Thử thách)
 * Chạy 100% Offline-first, chống lỗi CORS khi mở bằng file://
 */
window.QUESTS_DATA = [
  {
    "id": "q1",
    "isHard": false,
    "type": "choice",
    "badge": "🟢 CÂU THƯỜNG - KHỞI ĐỘNG",
    "title": "Bạn Khoa thấy có bạn gõ phím bằng 1 ngón, có bạn đặt tay lung tung. Cách gõ bàn phím đúng và chuẩn nhất là gì?",
    "options": [
      { "id": "A", "text": "Dùng 1 hoặc 2 ngón trỏ mổ cò cho nhanh", "correct": false },
      { "id": "B", "text": "Dùng cả 10 ngón tay, mỗi ngón gõ đúng các phím phụ trách", "correct": true },
      { "id": "C", "text": "Chỉ dùng bàn tay phải, tay trái để chống cằm", "correct": false },
      { "id": "D", "text": "Đặt tay tự do vào bất kỳ hàng phím nào", "correct": false }
    ],
    "hint": "Gõ 10 ngón giúp em gõ nhanh, chính xác và không bị mỏi tay!",
    "explain": "Đáp án đúng là B: Gõ bằng 10 ngón tay, mỗi ngón phụ trách một nhóm phím nhất định là cách chuẩn nhất."
  },
  {
    "id": "q2",
    "isHard": false,
    "type": "choice",
    "badge": "🟢 CÂU THƯỜNG - 4 KHU VỰC",
    "title": "Bàn phím máy tính đầy đủ (Full layout) thường được chia thành mấy khu vực phím chức năng?",
    "options": [
      { "id": "A", "text": "2 khu vực", "correct": false },
      { "id": "B", "text": "3 khu vực", "correct": false },
      { "id": "C", "text": "4 khu vực (Khu vực chính, Phím chức năng, Phím điều khiển, Phím số)", "correct": true },
      { "id": "D", "text": "6 khu vực", "correct": false }
    ],
    "hint": "Gồm: Phím chức năng, Khu vực chính, Phím điều khiển và Khu vực phím số!",
    "explain": "Đáp án đúng là C: Bàn phím máy tính đầy đủ được chia làm 4 khu vực phím chính."
  },
  {
    "id": "q3",
    "isHard": true,
    "type": "choice",
    "badge": "⭐ CÂU HỎI THỬ THÁCH - PHÍM CHỨC NĂNG",
    "title": "Phím Esc, dãy phím từ F1 đến F12 cùng các phím Print Screen, Scroll Lock, Pause Break thuộc khu vực nào?",
    "options": [
      { "id": "A", "text": "Khu vực phím chức năng (Function keys)", "correct": true },
      { "id": "B", "text": "Khu vực phím số (Numeric keypad)", "correct": false },
      { "id": "C", "text": "Khu vực phím điều khiển (Navigation keys)", "correct": false },
      { "id": "D", "text": "Khu vực phím cơ sở", "correct": false }
    ],
    "hint": "Dãy phím F1 đến F12 nằm ở hàng trên cùng của bàn phím!",
    "explain": "Đáp án đúng là A: Dãy phím F1 - F12 và phím Esc thuộc Khu vực phím chức năng."
  },
  {
    "id": "q4",
    "isHard": false,
    "type": "choice",
    "badge": "🟢 CÂU THƯỜNG - KHU VỰC CHÍNH",
    "title": "Khu vực nào trên bàn phím được sử dụng NHIỀU NHẤT để soạn thảo văn bản, nhập liệu chữ viết và ký hiệu?",
    "options": [
      { "id": "A", "text": "Khu vực phím số", "correct": false },
      { "id": "B", "text": "Khu vực phím cơ sở / Khu vực chính (Alphanumeric keys)", "correct": true },
      { "id": "C", "text": "Khu vực phím chức năng", "correct": false },
      { "id": "D", "text": "Khu vực phím điều khiển", "correct": false }
    ],
    "hint": "Khu vực này có diện tích lớn nhất, chứa toàn bộ các chữ cái A - Z và các chữ số 0 - 9!",
    "explain": "Đáp án đúng là B: Khu vực chính là nơi em dùng nhiều nhất để gõ văn bản."
  },
  {
    "id": "q5",
    "isHard": false,
    "type": "choice",
    "badge": "🟢 CÂU THƯỜNG - ĐIỀU HƯỚNG",
    "title": "Cụm 4 phím mũi tên (Lên, Xuống, Trái, Phải) có chức năng chính là gì trong soạn thảo văn bản?",
    "options": [
      { "id": "A", "text": "Dùng để gõ chữ in hoa", "correct": false },
      { "id": "B", "text": "Dùng để di chuyển con trỏ soạn thảo", "correct": true },
      { "id": "C", "text": "Dùng để tắt nguồn điện máy tính", "correct": false },
      { "id": "D", "text": "Dùng để tính toán cộng trừ", "correct": false }
    ],
    "hint": "Các phím mũi tên giúp em di chuyển con trỏ chạy lên, xuống, qua trái, qua phải!",
    "explain": "Đáp án đúng là B: Khu vực phím điều hướng dùng để di chuyển con trỏ soạn thảo."
  },
  {
    "id": "q6",
    "isHard": false,
    "type": "choice",
    "badge": "🟢 CÂU THƯỜNG - PHÍM SỐ",
    "title": "Khu vực phím số (Numeric keypad) có phím bật/tắt Num Lock được bố trí tương tự thiết bị nào?",
    "options": [
      { "id": "A", "text": "Máy nghe nhạc", "correct": false },
      { "id": "B", "text": "Bàn phím điện thoại bàn cổ", "correct": false },
      { "id": "C", "text": "Máy tính cầm tay (Calculator)", "correct": true },
      { "id": "D", "text": "Đồng hồ đeo tay", "correct": false }
    ],
    "hint": "Thiết bị dùng để tính toán cộng, trừ, nhân, chia bằng một tay rất nhanh!",
    "explain": "Đáp án đúng là C: Khu vực phím số bố trí giống máy tính cầm tay giúp nhập số và tính toán bằng một tay."
  },
  {
    "id": "q7",
    "isHard": false,
    "type": "choice",
    "badge": "🟢 CÂU THƯỜNG - 5 HÀNG PHÍM",
    "title": "Khu vực chính của bàn phím máy tính gồm có mấy hàng phím?",
    "options": [
      { "id": "A", "text": "3 hàng phím", "correct": false },
      { "id": "B", "text": "4 hàng phím", "correct": false },
      { "id": "C", "text": "5 hàng phím", "correct": true },
      { "id": "D", "text": "6 hàng phím", "correct": false }
    ],
    "hint": "Đếm từ trên xuống: Hàng số, Hàng trên, Hàng cơ sở, Hàng dưới, Hàng phím cách!",
    "explain": "Đáp án đúng là C: Khu vực chính gồm đúng 5 hàng phím."
  },
  {
    "id": "q8",
    "isHard": false,
    "type": "choice",
    "badge": "🟢 CÂU THƯỜNG - CĂN CỨ GỜ",
    "title": "Hai phím đặc biệt F và J có gờ nổi mốc thuộc hàng phím nào trên bàn phím?",
    "options": [
      { "id": "A", "text": "Hàng phím trên", "correct": false },
      { "id": "B", "text": "Hàng phím cơ sở", "correct": true },
      { "id": "C", "text": "Hàng phím dưới", "correct": false },
      { "id": "D", "text": "Hàng phím số", "correct": false }
    ],
    "hint": "Hàng phím này nằm ở chính giữa, là nơi đặt các ngón tay ở vị trí xuất phát!",
    "explain": "Đáp án đúng là B: Hai phím F và J là hai phím có gờ nổi nằm trên hàng phím cơ sở."
  },
  {
    "id": "q9",
    "isHard": true,
    "type": "choice",
    "badge": "⭐ CÂU HỎI THỬ THÁCH - NHẬN DIỆN PHÍM",
    "title": "Dãy phím nào sau đây CÙNG THUỘC hàng phím cơ sở?",
    "options": [
      { "id": "A", "text": "Q, W, E, R, T, Y", "correct": false },
      { "id": "B", "text": "A, S, D, F, G, H, J, K, L, ;", "correct": true },
      { "id": "C", "text": "Z, X, C, V, B, N, M", "correct": false },
      { "id": "D", "text": "1, 2, 3, 4, 5, 6, 7, 8, 9, 0", "correct": false }
    ],
    "hint": "Hàng phím chứa hai phím mốc có gờ là F và J!",
    "explain": "Đáp án đúng là B: Dãy A, S, D, F, G, H, J, K, L, ; thuộc hàng phím cơ sở."
  },
  {
    "id": "q10",
    "isHard": false,
    "type": "choice",
    "badge": "🟢 CÂU THƯỜNG - XUẤT PHÁT",
    "title": "Ở vị trí xuất phát, ngón trỏ bàn tay TRÁI và ngón trỏ bàn tay PHẢI đặt lên phím nào?",
    "options": [
      { "id": "A", "text": "Ngón trỏ trái đặt phím A, ngón trỏ phải đặt phím L", "correct": false },
      { "id": "B", "text": "Ngón trỏ trái đặt phím D, ngón trỏ phải đặt phím K", "correct": false },
      { "id": "C", "text": "Ngón trỏ trái đặt phím F, ngón trỏ phải đặt phím J", "correct": true },
      { "id": "D", "text": "Ngón trỏ trái đặt phím G, ngón trỏ phải đặt phím H", "correct": false }
    ],
    "hint": "Hai phím này có gờ nổi giúp em nhận biết bằng xúc giác mà không cần nhìn!",
    "explain": "Đáp án đúng là C: Ngón trỏ trái đặt phím F, ngón trỏ phải đặt phím J."
  },
  {
    "id": "q11",
    "isHard": false,
    "type": "choice",
    "badge": "🟢 CÂU THƯỜNG - PHÍM CÁCH",
    "title": "Hai ngón tay nào dùng để đặt và bấm phím Dấu Cách (Space - phím dài nhất bàn phím)?",
    "options": [
      { "id": "A", "text": "Hai ngón út", "correct": false },
      { "id": "B", "text": "Hai ngón trỏ", "correct": false },
      { "id": "C", "text": "Hai ngón cái", "correct": true },
      { "id": "D", "text": "Hai ngón giữa", "correct": false }
    ],
    "hint": "Hai ngón ngắn nhất ở phía dưới cùng bàn tay!",
    "explain": "Đáp án đúng là C: Hai ngón cái phụ trách phím dấu cách (Spacebar)."
  },
  {
    "id": "q12",
    "isHard": false,
    "type": "choice",
    "badge": "🟢 CÂU THƯỜNG - QUY TẮC VÀNG",
    "title": "Khi gõ xong một phím bất kỳ, các ngón tay của em phải lập tức đưa về hàng phím nào?",
    "options": [
      { "id": "A", "text": "Hàng phím trên", "correct": false },
      { "id": "B", "text": "Hàng phím cơ sở (vị trí xuất phát)", "correct": true },
      { "id": "C", "text": "Hàng phím dưới", "correct": false },
      { "id": "D", "text": "Nhấc hẳn tay ra khỏi bàn phím", "correct": false }
    ],
    "hint": "Căn cứ địa xuất phát chính là nơi ngón tay luôn quay về nghỉ ngơi!",
    "explain": "Đáp án đúng là B: Mỗi khi gõ xong bất kỳ phím nào, phải lập tức đưa ngón tay về hàng cơ sở."
  },
  {
    "id": "q13",
    "isHard": true,
    "type": "choice",
    "badge": "⭐ CÂU HỎI THỬ THÁCH - Ý NGHĨA GỜ NỔI",
    "title": "Tác dụng quan trọng nhất của hai cái GỜ NỔI trên phím F và J là gì?",
    "options": [
      { "id": "A", "text": "Để trang trí cho bàn phím đẹp hơn", "correct": false },
      { "id": "B", "text": "Giúp ngón tay cảm nhận đúng vị trí xuất phát mà không cần cúi xuống nhìn bàn phím", "correct": true },
      { "id": "C", "text": "Để chống trơn trượt khi tay ra mồ hôi", "correct": false },
      { "id": "D", "text": "Để bấm phím phát ra tiếng kêu to hơn", "correct": false }
    ],
    "hint": "Cảm giác xúc giác ở đầu ngón tay giúp người gõ phím không cần nhìn bàn phím!",
    "explain": "Đáp án đúng là B: Gờ nổi giúp định vị 2 ngón trỏ vào vị trí xuất phát mà không cần nhìn."
  },
  {
    "id": "q14",
    "isHard": false,
    "type": "choice",
    "badge": "🟢 CÂU THƯỜNG - VỊ TRÍ HÀNG PHÍM",
    "title": "Hàng phím nào nằm ngay PHÍA TRÊN hàng phím cơ sở?",
    "options": [
      { "id": "A", "text": "Hàng phím số", "correct": false },
      { "id": "B", "text": "Hàng phím trên (chứa Q, W, E, R, T...)", "correct": true },
      { "id": "C", "text": "Hàng phím dưới", "correct": false },
      { "id": "D", "text": "Hàng phím chứa phím cách", "correct": false }
    ],
    "hint": "Hàng phím này nằm kẹp giữa hàng phím số và hàng phím cơ sở!",
    "explain": "Đáp án đúng là B: Ngay phía trên hàng phím cơ sở là Hàng phím trên."
  },
  {
    "id": "q15",
    "isHard": true,
    "type": "choice",
    "badge": "⭐ CÂU HỎI THỬ THÁCH - PHÁT HIỆN LỖI SAI",
    "title": "Khi quan sát bạn Nam gõ chữ, thầy giáo thấy Nam dùng ngón trỏ phải để gõ phím D. Nam đã làm sai điều gì?",
    "options": [
      { "id": "A", "text": "Phím D phải do ngón giữa bàn tay TRÁI phụ trách", "correct": true },
      { "id": "B", "text": "Phím D phải do ngón cái gõ", "correct": false },
      { "id": "C", "text": "Phím D thuộc hàng phím số", "correct": false },
      { "id": "D", "text": "Nam làm đúng, không sai", "correct": false }
    ],
    "hint": "Phím D nằm bên tay trái: A (út), S (áp út), D (giữa)!",
    "explain": "Đáp án đúng là A: Phím D thuộc lãnh thổ tay trái, do ngón giữa tay trái phụ trách."
  },
  {
    "id": "q16",
    "isHard": false,
    "type": "choice",
    "badge": "🟢 CÂU THƯỜNG - PHÍM XÓA",
    "title": "Phím xóa lùi (Backspace ⌫) và dãy phím số từ 1 đến 0 thuộc hàng phím nào của khu vực chính?",
    "options": [
      { "id": "A", "text": "Hàng phím số", "correct": true },
      { "id": "B", "text": "Hàng phím trên", "correct": false },
      { "id": "C", "text": "Hàng phím cơ sở", "correct": false },
      { "id": "D", "text": "Hàng phím cách", "correct": false }
    ],
    "hint": "Hàng phím nằm ở tầng cao nhất của Khu vực chính!",
    "explain": "Đáp án đúng là A: Dãy số 1 đến 0 và phím Backspace thuộc Hàng phím số."
  },
  {
    "id": "q17",
    "isHard": true,
    "type": "choice",
    "badge": "⭐ CÂU HỎI THỬ THÁCH - PHÂN BIỆT PHÍM XÓA",
    "title": "Phím Backspace (⌫) và phím Delete (Del) khác nhau như thế nào khi xóa ký tự trong văn bản?",
    "options": [
      { "id": "A", "text": "Backspace xóa ký tự bên TRÁI con trỏ, còn Delete xóa ký tự bên PHẢI con trỏ", "correct": true },
      { "id": "B", "text": "Backspace xóa bên phải con trỏ, Delete xóa bên trái", "correct": false },
      { "id": "C", "text": "Hai phím này giống hệt nhau không khác gì", "correct": false },
      { "id": "D", "text": "Backspace chỉ xóa được số, Delete chỉ xóa được chữ", "correct": false }
    ],
    "hint": "Backspace là lùi lại xóa bên trái, Delete xóa ký tự đứng ngay sau con trỏ!",
    "explain": "Đáp án đúng là A: Phím Backspace xóa lùi ký tự trước (bên trái) con trỏ, còn Delete xóa ký tự sau (bên phải) con trỏ."
  },
  {
    "id": "q18",
    "isHard": false,
    "type": "choice",
    "badge": "🟢 CÂU THƯỜNG - XUỐNG DÒNG",
    "title": "Để kết thúc một đoạn văn bản và chuyển con trỏ soạn thảo xuống dòng mới, em bấm phím nào?",
    "options": [
      { "id": "A", "text": "Phím Shift", "correct": false },
      { "id": "B", "text": "Phím Enter ↵", "correct": true },
      { "id": "C", "text": "Phím Caps Lock", "correct": false },
      { "id": "D", "text": "Phím Spacebar", "correct": false }
    ],
    "hint": "Phím to nằm ở bên phải hàng phím cơ sở, thường có hình mũi tên gập!",
    "explain": "Đáp án đúng là B: Phím Enter dùng để xuống dòng mới hoặc ra lệnh thực hiện."
  },
  {
    "id": "q19",
    "isHard": true,
    "type": "choice",
    "badge": "⭐ CÂU HỎI THỬ THÁCH - CHỮ IN HOA",
    "title": "Muốn gõ một đoạn văn toàn bộ bằng CHỮ IN HOA liên tục, cách tiện lợi nhất là bật phím nào?",
    "options": [
      { "id": "A", "text": "Phím Num Lock", "correct": false },
      { "id": "B", "text": "Phím Caps Lock", "correct": true },
      { "id": "C", "text": "Phím Ctrl", "correct": false },
      { "id": "D", "text": "Phím Alt", "correct": false }
    ],
    "hint": "Khi bật phím này, đèn báo Caps Lock trên bàn phím sẽ sáng lên!",
    "explain": "Đáp án đúng là B: Phím Caps Lock dùng để bật/tắt chế độ gõ chữ in hoa liên tục."
  },
  {
    "id": "q20",
    "isHard": false,
    "type": "choice",
    "badge": "🟢 CÂU THƯỜNG - CHỮ HOA ĐƠN LẺ",
    "title": "Để gõ một chữ cái viết hoa đơn lẻ (ví dụ chữ H trong từ 'Hà Nội'), em nhấn giữ phím nào trong khi gõ chữ đó?",
    "options": [
      { "id": "A", "text": "Nhấn giữ phím Shift", "correct": true },
      { "id": "B", "text": "Nhấn giữ phím Space", "correct": false },
      { "id": "C", "text": "Nhấn giữ phím Tab", "correct": false },
      { "id": "D", "text": "Nhấn giữ phím Esc", "correct": false }
    ],
    "hint": "Phím này có ở cả 2 bên trái và phải của hàng phím dưới, có mũi tên chỉ lên!",
    "explain": "Đáp án đúng là A: Nhấn giữ phím Shift kết hợp gõ chữ cái để viết hoa chữ cái đó."
  },
  {
    "id": "q21",
    "isHard": true,
    "type": "choice",
    "badge": "⭐ CÂU HỎI THỬ THÁCH - KÝ HIỆU TRÊN",
    "title": "Trên phím số 2 có ký hiệu @. Muốn gõ được ký hiệu @ vào màn hình, em làm thế nào?",
    "options": [
      { "id": "A", "text": "Chỉ cần bấm phím số 2", "correct": false },
      { "id": "B", "text": "Nhấn giữ phím Shift rồi bấm phím số 2", "correct": true },
      { "id": "C", "text": "Nhấn giữ phím Ctrl rồi bấm phím số 2", "correct": false },
      { "id": "D", "text": "Bấm nhanh phím số 2 hai lần", "correct": false }
    ],
    "hint": "Với phím có hai ký tự tầng trên và tầng dưới, phím Shift giúp gõ ký tự ở tầng trên!",
    "explain": "Đáp án đúng là B: Giữ Shift + phím 2 để gõ ký hiệu @ ở tầng trên."
  },
  {
    "id": "q22",
    "isHard": false,
    "type": "choice",
    "badge": "🟢 CÂU THƯỜNG - HÀNG PHÍM DƯỚI",
    "title": "Dãy phím nào sau đây thuộc HÀNG PHÍM DƯỚI của khu vực chính?",
    "options": [
      { "id": "A", "text": "Z, X, C, V, B, N, M", "correct": true },
      { "id": "B", "text": "Q, W, E, R, T, Y", "correct": false },
      { "id": "C", "text": "A, S, D, F, G, H", "correct": false },
      { "id": "D", "text": "1, 2, 3, 4, 5, 6", "correct": false }
    ],
    "hint": "Hàng phím này nằm ngay phía trên hàng phím cách!",
    "explain": "Đáp án đúng là A: Dãy Z, X, C, V, B, N, M thuộc hàng phím dưới."
  },
  {
    "id": "q23",
    "isHard": false,
    "type": "choice",
    "badge": "🟢 CÂU THƯỜNG - HÀNG PHÍM TRÊN",
    "title": "Dãy phím nào sau đây thuộc HÀNG PHÍM TRÊN của khu vực chính?",
    "options": [
      { "id": "A", "text": "Q, W, E, R, T, Y, U, I, O, P", "correct": true },
      { "id": "B", "text": "A, S, D, F, G, H, J, K, L", "correct": false },
      { "id": "C", "text": "Z, X, C, V, B, N, M", "correct": false },
      { "id": "D", "text": "F1, F2, F3, F4, F5", "correct": false }
    ],
    "hint": "Bắt đầu bằng chữ Q và kết thúc bằng chữ P!",
    "explain": "Đáp án đúng là A: Dãy Q, W, E, R, T, Y, U, I, O, P thuộc hàng phím trên."
  },
  {
    "id": "q24",
    "isHard": true,
    "type": "choice",
    "badge": "⭐ CÂU HỎI THỬ THÁCH - PHÂN CÔNG TAY TRÁI",
    "title": "Trên hàng phím cơ sở, các ngón của BÀN TAY TRÁI (từ ngón út đến ngón trỏ) phụ trách lần lượt các phím nào?",
    "options": [
      { "id": "A", "text": "A, S, D, F", "correct": true },
      { "id": "B", "text": "F, D, S, A", "correct": false },
      { "id": "C", "text": "J, K, L, ;", "correct": false },
      { "id": "D", "text": "Q, W, E, R", "correct": false }
    ],
    "hint": "Ngón út đặt phím A, áp út phím S, giữa phím D, trỏ phím F!",
    "explain": "Đáp án đúng là A: Bàn tay trái từ ngón út đến trỏ đặt lên A, S, D, F."
  },
  {
    "id": "q25",
    "isHard": true,
    "type": "choice",
    "badge": "⭐ CÂU HỎI THỬ THÁCH - PHÂN CÔNG TAY PHẢI",
    "title": "Trên hàng phím cơ sở, các ngón của BÀN TAY PHẢI (từ ngón trỏ đến ngón út) phụ trách lần lượt các phím nào?",
    "options": [
      { "id": "A", "text": "J, K, L, ;", "correct": true },
      { "id": "B", "text": "A, S, D, F", "correct": false },
      { "id": "C", "text": "U, I, O, P", "correct": false },
      { "id": "D", "text": "N, M, <, >", "correct": false }
    ],
    "hint": "Ngón trỏ đặt phím J có gờ nổi mốc!",
    "explain": "Đáp án đúng là A: Bàn tay phải từ trỏ đến út đặt lên J, K, L, dấu chấm phẩy (;)."
  },
  {
    "id": "q26",
    "isHard": false,
    "type": "choice",
    "badge": "🟢 CÂU THƯỜNG - PHÍM DÀI NHẤT",
    "title": "Phím nào có kích thước DÀI NHẤT trên toàn bộ bàn phím máy tính?",
    "options": [
      { "id": "A", "text": "Phím Enter", "correct": false },
      { "id": "B", "text": "Phím Shift", "correct": false },
      { "id": "C", "text": "Phím Dấu cách (Spacebar)", "correct": true },
      { "id": "D", "text": "Phím Backspace", "correct": false }
    ],
    "hint": "Phím này nằm ở hàng dưới cùng, không in chữ gì trên mặt phím!",
    "explain": "Đáp án đúng là C: Phím cách (Spacebar) là phím dài nhất trên bàn phím."
  },
  {
    "id": "q27",
    "isHard": false,
    "type": "choice",
    "badge": "🟢 CÂU THƯỜNG - TÁC DỤNG PHÍM CÁCH",
    "title": "Khi đang gõ văn bản, bấm phím Dấu cách (Space) một lần sẽ tạo ra điều gì?",
    "options": [
      { "id": "A", "text": "Tạo ra một khoảng trống phân cách giữa hai từ", "correct": true },
      { "id": "B", "text": "Xuống dòng mới", "correct": false },
      { "id": "C", "text": "Xóa từ vừa gõ", "correct": false },
      { "id": "D", "text": "Làm chữ to gấp đôi", "correct": false }
    ],
    "hint": "Giúp các từ ngữ không bị dính chùm vào nhau!",
    "explain": "Đáp án đúng là A: Phím cách tạo khoảng trống giữa các từ trong văn bản."
  },
  {
    "id": "q28",
    "isHard": true,
    "type": "choice",
    "badge": "⭐ CÂU HỎI THỬ THÁCH - PHÍM G VÀ H",
    "title": "Hai phím G và H nằm ở giữa hàng phím cơ sở do hai ngón tay nào vươn sang gõ?",
    "options": [
      { "id": "A", "text": "Ngón trỏ trái vươn sang gõ phím G, ngón trỏ phải vươn sang gõ phím H", "correct": true },
      { "id": "B", "text": "Ngón giữa trái gõ G, ngón giữa phải gõ H", "correct": false },
      { "id": "C", "text": "Hai ngón cái gõ G và H", "correct": false },
      { "id": "D", "text": "Hai ngón út vươn vào gõ G và H", "correct": false }
    ],
    "hint": "Hai ngón trỏ ở phím F và J rất linh hoạt, có nhiệm vụ vươn sang gõ phím bên cạnh!",
    "explain": "Đáp án đúng là A: Ngón trỏ trái từ F vươn sang gõ G, ngón trỏ phải từ J vươn sang gõ H."
  },
  {
    "id": "q29",
    "isHard": false,
    "type": "choice",
    "badge": "🟢 CÂU THƯỜNG - KHU VỰC PHÍM SỐ",
    "title": "Nếu muốn gõ các con số ở khu vực phím số bên phải nhưng bấm không ra số, em cần kiểm tra phím nào?",
    "options": [
      { "id": "A", "text": "Kiểm tra xem đèn phím Num Lock đã bật sáng chưa", "correct": true },
      { "id": "B", "text": "Kiểm tra phím Caps Lock", "correct": false },
      { "id": "C", "text": "Kiểm tra phím Scroll Lock", "correct": false },
      { "id": "D", "text": "Rút bàn phím ra cắm lại", "correct": false }
    ],
    "hint": "Phím này nằm ngay góc trên bên trái của khu vực phím số!",
    "explain": "Đáp án đúng là A: Phải bật phím Num Lock (đèn sáng) thì khu vực phím số mới hoạt động."
  },
  {
    "id": "q30",
    "isHard": true,
    "type": "choice",
    "badge": "⭐ CÂU HỎI THỬ THÁCH - PHÍM ESC",
    "title": "Phím Esc (Escape) nằm ở vị trí nào và có chức năng chính là gì?",
    "options": [
      { "id": "A", "text": "Nằm ở góc trên cùng bên trái bàn phím, dùng để hủy bỏ một lệnh hoặc thoát chế độ toàn màn hình", "correct": true },
      { "id": "B", "text": "Nằm ở góc dưới cùng bên phải, dùng để tắt máy tính", "correct": false },
      { "id": "C", "text": "Nằm ở giữa bàn phím, dùng để mở nhạc", "correct": false },
      { "id": "D", "text": "Nằm ở hàng cơ sở, dùng để xóa chữ", "correct": false }
    ],
    "hint": "Phím Esc nằm ở vị trí cao nhất, bên trái góc bàn phím!",
    "explain": "Đáp án đúng là A: Phím Esc ở góc trên cùng bên trái, dùng để hủy bỏ lệnh hoặc thoát."
  },
  {
    "id": "q31",
    "isHard": false,
    "type": "choice",
    "badge": "🟢 CÂU THƯỜNG - TƯ THẾ NGỒI",
    "title": "Khi ngồi gõ bàn phím máy tính, tư thế ngồi nào sau đây là ĐÚNG và bảo vệ cột sống?",
    "options": [
      { "id": "A", "text": "Lưng thẳng, mắt ngang tầm màn hình, hai bàn chân đặt phẳng trên sàn", "correct": true },
      { "id": "B", "text": "Ngồi gù lưng, cúi sát mắt vào màn hình", "correct": false },
      { "id": "C", "text": "Ngồi bắt chéo chân, một tay chống cằm", "correct": false },
      { "id": "D", "text": "Nằm ngửa ra ghế, với tay lên bàn phím", "correct": false }
    ],
    "hint": "Ngồi thẳng lưng giúp không bị cong vẹo cột sống và không mỏi cổ!",
    "explain": "Đáp án đúng là A: Ngồi thẳng lưng, mắt cách màn hình 50-70cm, chân chạm đất là chuẩn nhất."
  },
  {
    "id": "q32",
    "isHard": true,
    "type": "choice",
    "badge": "⭐ CÂU HỎI THỬ THÁCH - LỢI ÍCH 10 NGÓN",
    "title": "Tại sao các chuyên gia khuyên học sinh nên tập gõ bàn phím bằng 10 ngón ngay từ lớp 3?",
    "options": [
      { "id": "A", "text": "Gõ nhanh hơn, chính xác hơn, không cần nhìn bàn phím và giảm mỏi các ngón tay", "correct": true },
      { "id": "B", "text": "Chỉ để làm cho bàn phím phát ra tiếng gõ đều tai", "correct": false },
      { "id": "C", "text": "Để bàn phím không bị mòn một số phím", "correct": false },
      { "id": "D", "text": "Vì máy tính sẽ không cho gõ nếu dùng ít hơn 10 ngón", "correct": false }
    ],
    "hint": "Khi gõ 10 ngón thành thạo, em có thể nhìn lên màn hình mà gõ chữ thoăn thoắt!",
    "explain": "Đáp án đúng là A: Gõ 10 ngón giúp tăng tốc độ gõ, gõ chuẩn xác và hạn chế mỏi cơ tay."
  },
  {
    "id": "q33",
    "isHard": false,
    "type": "choice",
    "badge": "🟢 CÂU THƯỜNG - VỊ TRÍ HÀNG DƯỚI",
    "title": "Hàng phím dưới nằm ở vị trí nào so với hàng phím cơ sở?",
    "options": [
      { "id": "A", "text": "Nằm ngay PHÍA DƯỚI hàng phím cơ sở", "correct": true },
      { "id": "B", "text": "Nằm ngay phía trên hàng phím cơ sở", "correct": false },
      { "id": "C", "text": "Nằm ở hàng trên cùng của bàn phím", "correct": false },
      { "id": "D", "text": "Nằm bên cạnh khu vực phím số", "correct": false }
    ],
    "hint": "Đọc tên hàng phím là biết ngay vị trí của nó!",
    "explain": "Đáp án đúng là A: Hàng phím dưới nằm ngay bên dưới hàng phím cơ sở."
  },
  {
    "id": "q34",
    "isHard": true,
    "type": "choice",
    "badge": "⭐ CÂU HỎI THỬ THÁCH - PHÂN CÔNG PHÍM B VÀ N",
    "title": "Ở hàng phím dưới, hai phím B và N do hai ngón tay nào phụ trách?",
    "options": [
      { "id": "A", "text": "Ngón trỏ trái gõ phím B, ngón trỏ phải gõ phím N", "correct": true },
      { "id": "B", "text": "Ngón giữa trái gõ B, ngón giữa phải gõ N", "correct": false },
      { "id": "C", "text": "Ngón cái gõ B, ngón trỏ gõ N", "correct": false },
      { "id": "D", "text": "Hai ngón út gõ B và N", "correct": false }
    ],
    "hint": "Hai ngón trỏ tiếp tục mở rộng phạm vi xuống hàng phím dưới để gõ B và N!",
    "explain": "Đáp án đúng là A: Ngón trỏ trái phụ trách phím B, ngón trỏ phải phụ trách phím N."
  },
  {
    "id": "q35",
    "isHard": false,
    "type": "choice",
    "badge": "🟢 CÂU THƯỜNG - PHÍM TAB",
    "title": "Phím Tab ⇥ nằm ở đầu hàng phím trên bên trái thường có chức năng gì trong soạn thảo văn bản?",
    "options": [
      { "id": "A", "text": "Thụt đầu dòng một khoảng cách chuẩn hoặc chuyển sang ô tiếp theo", "correct": true },
      { "id": "B", "text": "Tắt màn hình máy tính", "correct": false },
      { "id": "C", "text": "In văn bản ra máy in", "correct": false },
      { "id": "D", "text": "Xóa toàn bộ văn bản", "correct": false }
    ],
    "hint": "Khi viết đoạn văn, em bấm phím Tab để thụt đầu dòng ô chữ đầu tiên!",
    "explain": "Đáp án đúng là A: Phím Tab dùng để thụt lề đầu dòng hoặc nhảy sang ô kế tiếp."
  },
  {
    "id": "q36",
    "isHard": true,
    "type": "choice",
    "badge": "⭐ CÂU HỎI THỬ THÁCH - PHÍM MŨI TÊN",
    "title": "Khu vực phím điều khiển có 4 phím mũi tên được sắp xếp theo hình dạng gì?",
    "options": [
      { "id": "A", "text": "Hình chữ T ngược (mũi tên lên ở trên, 3 mũi tên trái-xuống-phải ở dưới)", "correct": true },
      { "id": "B", "text": "Xếp thành một hàng ngang thẳng tắp", "correct": false },
      { "id": "C", "text": "Xếp thành một vòng tròn khép kín", "correct": false },
      { "id": "D", "text": "Xếp thành một cột dọc từ trên xuống", "correct": false }
    ],
    "hint": "Phím mũi tên Lên nằm nhô lên ở giữa giống hình chữ T lộn ngược!",
    "explain": "Đáp án đúng là A: 4 phím mũi tên xếp thành hình chữ T ngược rất tiện lợi để điều khiển."
  },
  {
    "id": "q37",
    "isHard": false,
    "type": "choice",
    "badge": "🟢 CÂU THƯỜNG - PHÍM WINDOWS",
    "title": "Phím có biểu tượng logo cửa sổ 4 ô vuông (⊞ Win) nằm ở hàng phím cách có tác dụng gì?",
    "options": [
      { "id": "A", "text": "Mở bảng chọn Start (Start Menu) của hệ điều hành Windows", "correct": true },
      { "id": "B", "text": "Mở cửa sổ phòng học", "correct": false },
      { "id": "C", "text": "Xóa toàn bộ trò chơi", "correct": false },
      { "id": "D", "text": "Tăng âm lượng loa ngoài", "correct": false }
    ],
    "hint": "Bấm phím này sẽ hiện ra danh sách các ứng dụng trong máy tính!",
    "explain": "Đáp án đúng là A: Phím Windows (⊞) dùng để bật bảng chọn Start của máy tính."
  },
  {
    "id": "q38",
    "isHard": true,
    "type": "choice",
    "badge": "⭐ CÂU HỎI THỬ THÁCH - TÌNH HUỐNG THỰC TẾ",
    "title": "Bạn Lan muốn gõ chữ 'TIN HỌC' nhưng màn hình lại hiện ra 'tin học'. Bạn Lan cần làm gì?",
    "options": [
      { "id": "A", "text": "Bấm phím Caps Lock để bật đèn in hoa rồi gõ lại", "correct": true },
      { "id": "B", "text": "Bấm phím Enter nhiều lần", "correct": false },
      { "id": "C", "text": "Nhấn phím Num Lock", "correct": false },
      { "id": "D", "text": "Tắt màn hình mở lại", "correct": false }
    ],
    "hint": "Phím Caps Lock chuyển đổi giữa chữ thường và chữ in hoa!",
    "explain": "Đáp án đúng là A: Cần bật phím Caps Lock để gõ chữ in hoa liên tục."
  },
  {
    "id": "q39",
    "isHard": false,
    "type": "choice",
    "badge": "🟢 CÂU THƯỜNG - PHÂN CÔNG NGÓN ÚT TRÁI",
    "title": "Ngón út của bàn tay TRÁI ở vị trí xuất phát đặt lên phím chữ nào?",
    "options": [
      { "id": "A", "text": "Phím A", "correct": true },
      { "id": "B", "text": "Phím S", "correct": false },
      { "id": "C", "text": "Phím D", "correct": false },
      { "id": "D", "text": "Phím F", "correct": false }
    ],
    "hint": "Phím chữ đầu tiên nằm ở bên trái nhất của hàng cơ sở!",
    "explain": "Đáp án đúng là A: Ngón út tay trái đặt lên phím A."
  },
  {
    "id": "q40",
    "isHard": false,
    "type": "choice",
    "badge": "🟢 CÂU THƯỜNG - PHÂN CÔNG NGÓN ÁP ÚT TRÁI",
    "title": "Ngón áp út (ngón đeo nhẫn) của bàn tay TRÁI ở vị trí xuất phát đặt lên phím chữ nào?",
    "options": [
      { "id": "A", "text": "Phím S", "correct": true },
      { "id": "B", "text": "Phím A", "correct": false },
      { "id": "C", "text": "Phím D", "correct": false },
      { "id": "D", "text": "Phím F", "correct": false }
    ],
    "hint": "Phím này nằm ngay bên cạnh phím A!",
    "explain": "Đáp án đúng là A: Ngón áp út tay trái đặt lên phím S."
  },
  {
    "id": "q41",
    "isHard": false,
    "type": "choice",
    "badge": "🟢 CÂU THƯỜNG - PHÂN CÔNG NGÓN GIỮA TRÁI",
    "title": "Ngón giữa của bàn tay TRÁI ở vị trí xuất phát đặt lên phím chữ nào?",
    "options": [
      { "id": "A", "text": "Phím D", "correct": true },
      { "id": "B", "text": "Phím F", "correct": false },
      { "id": "C", "text": "Phím S", "correct": false },
      { "id": "D", "text": "Phím A", "correct": false }
    ],
    "hint": "Phím nằm kẹp giữa phím S và phím mốc F!",
    "explain": "Đáp án đúng là A: Ngón giữa tay trái đặt lên phím D."
  },
  {
    "id": "q42",
    "isHard": false,
    "type": "choice",
    "badge": "🟢 CÂU THƯỜNG - PHÂN CÔNG NGÓN GIỮA PHẢI",
    "title": "Ngón giữa của bàn tay PHẢI ở vị trí xuất phát đặt lên phím chữ nào?",
    "options": [
      { "id": "A", "text": "Phím K", "correct": true },
      { "id": "B", "text": "Phím J", "correct": false },
      { "id": "C", "text": "Phím L", "correct": false },
      { "id": "D", "text": "Phím I", "correct": false }
    ],
    "hint": "Phím nằm kẹp giữa phím mốc J và phím L!",
    "explain": "Đáp án đúng là A: Ngón giữa tay phải đặt lên phím K."
  },
  {
    "id": "q43",
    "isHard": false,
    "type": "choice",
    "badge": "🟢 CÂU THƯỜNG - PHÂN CÔNG NGÓN ÁP ÚT PHẢI",
    "title": "Ngón áp út của bàn tay PHẢI ở vị trí xuất phát đặt lên phím chữ nào?",
    "options": [
      { "id": "A", "text": "Phím L", "correct": true },
      { "id": "B", "text": "Phím K", "correct": false },
      { "id": "C", "text": "Phím J", "correct": false },
      { "id": "D", "text": "Phím O", "correct": false }
    ],
    "hint": "Phím này nằm ngay sau phím K trên hàng phím cơ sở!",
    "explain": "Đáp án đúng là A: Ngón áp út tay phải đặt lên phím L."
  },
  {
    "id": "q44",
    "isHard": true,
    "type": "choice",
    "badge": "⭐ CÂU HỎI THỬ THÁCH - PHÂN CÔNG NGÓN ÚT PHẢI",
    "title": "Ngón út của bàn tay PHẢI ở vị trí xuất phát đặt lên phím nào trên hàng cơ sở?",
    "options": [
      { "id": "A", "text": "Phím dấu chấm phẩy và hai chấm ( ; và : )", "correct": true },
      { "id": "B", "text": "Phím L", "correct": false },
      { "id": "C", "text": "Phím Enter", "correct": false },
      { "id": "D", "text": "Phím P", "correct": false }
    ],
    "hint": "Phím này nằm ngay bên phải phím L!",
    "explain": "Đáp án đúng là A: Ngón út tay phải đặt lên phím dấu chấm phẩy (;)."
  },
  {
    "id": "q45",
    "isHard": true,
    "type": "choice",
    "badge": "⭐ CÂU HỎI THỬ THÁCH - CỤM PHÍM F VÀ J",
    "title": "Vì sao nhà sản xuất chỉ tạo gờ nổi trên 2 phím F và J mà không tạo gờ trên tất cả các phím?",
    "options": [
      { "id": "A", "text": "Vì chỉ cần 2 phím mốc cho hai ngón trỏ là đủ để 8 ngón còn lại tự định vị đúng vị trí", "correct": true },
      { "id": "B", "text": "Vì tiết kiệm chi phí sản xuất nhựa", "correct": false },
      { "id": "C", "text": "Vì các phím khác không ai dùng đến", "correct": false },
      { "id": "D", "text": "Vì gờ nổi trên nhiều phím sẽ làm đau tay", "correct": false }
    ],
    "hint": "Hai ngón trỏ là hai người đội trưởng dẫn đường cho cả bàn tay!",
    "explain": "Đáp án đúng là A: Hai phím F và J đóng vai trò mốc chuẩn, từ đó các ngón khác tự đặt vào đúng phím kế bên."
  },
  {
    "id": "q46",
    "isHard": false,
    "type": "choice",
    "badge": "🟢 CÂU THƯỜNG - BẢN ĐỒ BÀN PHÍM",
    "title": "Dãy phím nào sau đây gồm toàn các phím số ở hàng trên cùng của khu vực chính?",
    "options": [
      { "id": "A", "text": "1, 2, 3, 4, 5, 6, 7, 8, 9, 0", "correct": true },
      { "id": "B", "text": "F1, F2, F3, F4, F5", "correct": false },
      { "id": "C", "text": "A, B, C, D, E", "correct": false },
      { "id": "D", "text": "Ctrl, Alt, Shift", "correct": false }
    ],
    "hint": "Dãy số từ 1 đến 0 nằm ở Hàng phím số!",
    "explain": "Đáp án đúng là A: Hàng phím số chứa các phím số từ 1 đến 0."
  },
  {
    "id": "q47",
    "isHard": true,
    "type": "choice",
    "badge": "⭐ CÂU HỎI THỬ THÁCH - GÕ DẤU CHẤM HỎI",
    "title": "Trên bàn phím, dấu chấm hỏi (?) nằm chung phím với dấu gạch chéo (/). Để gõ dấu ?, em làm thế nào?",
    "options": [
      { "id": "A", "text": "Nhấn giữ phím Shift rồi bấm phím có dấu / ?", "correct": true },
      { "id": "B", "text": "Chỉ cần bấm phím / ?", "correct": false },
      { "id": "C", "text": "Bấm phím Caps Lock rồi bấm phím / ?", "correct": false },
      { "id": "D", "text": "Bấm đúp phím cách 2 lần", "correct": false }
    ],
    "hint": "Dấu ? nằm ở tầng trên của phím, muốn gõ ký tự tầng trên luôn cần phím Shift!",
    "explain": "Đáp án đúng là A: Giữ Shift + phím có dấu ? để gõ dấu chấm hỏi."
  },
  {
    "id": "q48",
    "isHard": false,
    "type": "choice",
    "badge": "🟢 CÂU THƯỜNG - TÁC HẠI MỔ CÒ",
    "title": "Thói quen gõ bàn phím kiểu 'mổ cò' (chỉ dùng 1-2 ngón trỏ để gõ) có nhược điểm lớn nhất là gì?",
    "options": [
      { "id": "A", "text": "Gõ rất chậm, mắt phải liên tục nhìn xuống bàn phím nên dễ mỏi cổ và sai sót", "correct": true },
      { "id": "B", "text": "Làm bàn phím mau hết pin", "correct": false },
      { "id": "C", "text": "Làm chữ gõ ra bị mờ nhạt", "correct": false },
      { "id": "D", "text": "Máy tính sẽ bị đứng máy", "correct": false }
    ],
    "hint": "Cứ phải cúi xuống tìm phím rồi ngước lên màn hình kiểm tra rất mỏi mắt và mỏi cổ!",
    "explain": "Đáp án đúng là A: Gõ mổ cò làm giảm tốc độ, gây mỏi cổ và không phát triển được kỹ năng gõ nhanh."
  },
  {
    "id": "q49",
    "isHard": true,
    "type": "choice",
    "badge": "⭐ CÂU HỎI THỬ THÁCH - PHÍM DELETE",
    "title": "Khi con trỏ soạn thảo đang đứng ở giữa từ 'HO|C', nếu bấm phím Delete thì chữ nào sẽ bị xóa?",
    "options": [
      { "id": "A", "text": "Chữ C bị xóa (chữ đứng bên phải con trỏ)", "correct": true },
      { "id": "B", "text": "Chữ O bị xóa (chữ đứng bên trái con trỏ)", "correct": false },
      { "id": "C", "text": "Cả hai chữ HO bị xóa", "correct": false },
      { "id": "D", "text": "Không chữ nào bị xóa", "correct": false }
    ],
    "hint": "Delete xóa ký tự đứng ngay phía sau (bên phải) con trỏ!",
    "explain": "Đáp án đúng là A: Phím Delete xóa ký tự bên phải con trỏ, tức là chữ C."
  },
  {
    "id": "q50",
    "isHard": true,
    "type": "choice",
    "badge": "⭐ CÂU HỎI THỬ THÁCH - PHÍM BACKSPACE",
    "title": "Khi con trỏ soạn thảo đang đứng ở giữa từ 'HO|C', nếu bấm phím Backspace thì chữ nào sẽ bị xóa?",
    "options": [
      { "id": "A", "text": "Chữ O bị xóa (chữ đứng bên trái con trỏ)", "correct": true },
      { "id": "B", "text": "Chữ C bị xóa (chữ đứng bên phải con trỏ)", "correct": false },
      { "id": "C", "text": "Chữ H bị xóa", "correct": false },
      { "id": "D", "text": "Không chữ nào bị xóa", "correct": false }
    ],
    "hint": "Backspace lùi lại để xóa ký tự đứng ngay trước (bên trái) con trỏ!",
    "explain": "Đáp án đúng là A: Phím Backspace xóa lùi ký tự bên trái con trỏ, tức là chữ O."
  },
  {
    "id": "q51",
    "isHard": false,
    "type": "choice",
    "badge": "🟢 CÂU THƯỜNG - VỆ SINH BÀN PHÍM",
    "title": "Để giữ gìn bàn phím phòng máy tính luôn sạch sẽ và bền bỉ, em nên làm điều nào sau đây?",
    "options": [
      { "id": "A", "text": "Rửa tay sạch sẽ trước khi dùng máy, không ăn uống làm rơi vụn bánh vào khe phím", "correct": true },
      { "id": "B", "text": "Đổ nước ngọt vào bàn phím cho thơm", "correct": false },
      { "id": "C", "text": "Dùng thước kẻ cạy các nút phím lên chơi", "correct": false },
      { "id": "D", "text": "Đập mạnh hai tay vào bàn phím khi chơi game thua", "correct": false }
    ],
    "hint": "Giữ vệ sinh tay và không mang đồ ăn thức uống vào phòng máy!",
    "explain": "Đáp án đúng là A: Luôn rửa sạch tay và không ăn uống cạnh bàn phím để tránh hỏng thiết bị."
  },
  {
    "id": "q52",
    "isHard": true,
    "type": "choice",
    "badge": "⭐ CÂU HỎI THỬ THÁCH - PHÍM CHỨC NĂNG F5",
    "title": "Trong phòng máy tính hoặc khi duyệt web, phím chức năng F5 thường có tác dụng quen thuộc gì?",
    "options": [
      { "id": "A", "text": "Tải lại trang web hoặc làm mới màn hình (Refresh / Reload)", "correct": true },
      { "id": "B", "text": "Tắt nguồn máy tính ngay lập tức", "correct": false },
      { "id": "C", "text": "Xóa toàn bộ ổ đĩa cứng", "correct": false },
      { "id": "D", "text": "Bật máy in", "correct": false }
    ],
    "hint": "Phím F5 giúp làm tươi mới lại trang web khi trang bị đơ hoặc tải chậm!",
    "explain": "Đáp án đúng là A: Phím F5 thường dùng để làm mới (Reload/Refresh) trang web hoặc cửa sổ làm việc."
  },
  {
    "id": "q53",
    "isHard": false,
    "type": "choice",
    "badge": "🟢 CÂU THƯỜNG - KHOẢNG CÁCH MẮT",
    "title": "Khoảng cách an toàn và chuẩn nhất từ mắt của học sinh đến màn hình máy tính là bao nhiêu?",
    "options": [
      { "id": "A", "text": "Khoảng 50 cm đến 70 cm (tương đương chiều dài một cánh tay)", "correct": true },
      { "id": "B", "text": "Khoảng 10 cm (cúi thật sát vào màn hình)", "correct": false },
      { "id": "C", "text": "Khoảng 2 mét", "correct": false },
      { "id": "D", "text": "Khoảng 5 mét", "correct": false }
    ],
    "hint": "Bằng một sải cánh tay đưa thẳng ra phía trước!",
    "explain": "Đáp án đúng là A: Khoảng cách lý tưởng từ mắt đến màn hình là 50-70cm để bảo vệ thị lực."
  },
  {
    "id": "q54",
    "isHard": true,
    "type": "choice",
    "badge": "⭐ CÂU HỎI THỬ THÁCH - PHÂN CÔNG PHÍM C",
    "title": "Khi gõ phím C (thuộc hàng phím dưới), em phải dùng ngón tay nào để gõ là chuẩn xác?",
    "options": [
      { "id": "A", "text": "Ngón giữa bàn tay TRÁI (vươn từ phím D xuống gõ phím C)", "correct": true },
      { "id": "B", "text": "Ngón trỏ tay phải", "correct": false },
      { "id": "C", "text": "Ngón cái tay phải", "correct": false },
      { "id": "D", "text": "Ngón út tay trái", "correct": false }
    ],
    "hint": "Phím D do ngón giữa trái phụ trách, phím C nằm thẳng ngay phía dưới phím D!",
    "explain": "Đáp án đúng là A: Ngón giữa tay trái từ phím D đưa xuống gõ phím C rồi quay về phím D."
  },
  {
    "id": "q55",
    "isHard": true,
    "type": "choice",
    "badge": "⭐ CÂU HỎI THỬ THÁCH - PHÂN CÔNG PHÍM E",
    "title": "Khi gõ phím E (thuộc hàng phím trên), em phải dùng ngón tay nào để gõ là đúng quy tắc?",
    "options": [
      { "id": "A", "text": "Ngón giữa bàn tay TRÁI (vươn từ phím D lên gõ phím E)", "correct": true },
      { "id": "B", "text": "Ngón trỏ tay trái", "correct": false },
      { "id": "C", "text": "Ngón áp út tay phải", "correct": false },
      { "id": "D", "text": "Ngón cái tay trái", "correct": false }
    ],
    "hint": "Phím E nằm ngay phía trên phím D của ngón giữa tay trái!",
    "explain": "Đáp án đúng là A: Ngón giữa tay trái phụ trách cột phím: E (hàng trên) - D (hàng cơ sở) - C (hàng dưới)."
  },
  {
    "id": "q56",
    "isHard": true,
    "type": "choice",
    "badge": "⭐ CÂU HỎI THỬ THÁCH - CỘT PHÍM NGÓN GIỮA PHẢI",
    "title": "Ngón giữa của BÀN TAY PHẢI phụ trách nhóm phím nào sau đây ở 3 hàng phím?",
    "options": [
      { "id": "A", "text": "Phím I (hàng trên) - Phím K (hàng cơ sở) - Phím dấu phẩy < , (hàng dưới)", "correct": true },
      { "id": "B", "text": "Phím U - J - M", "correct": false },
      { "id": "C", "text": "Phím O - L - dấu chấm .", "correct": false },
      { "id": "D", "text": "Phím Y - H - N", "correct": false }
    ],
    "hint": "Ngón giữa phải đặt ở phím K, vươn lên phím I và vươn xuống phím dấu phẩy!",
    "explain": "Đáp án đúng là A: Cột của ngón giữa tay phải là I - K - dấu phẩy (,)."
  },
  {
    "id": "q57",
    "isHard": false,
    "type": "choice",
    "badge": "🟢 CÂU THƯỜNG - TÊN GỌI KHU VỰC CHÍNH",
    "title": "Tại sao khu vực ở giữa bàn phím lại được gọi là 'Khu vực chính'?",
    "options": [
      { "id": "A", "text": "Vì nó chứa đầy đủ các chữ cái, chữ số và phím điều khiển cần thiết nhất để gõ văn bản", "correct": true },
      { "id": "B", "text": "Vì nó có màu sơn đẹp nhất", "correct": false },
      { "id": "C", "text": "Vì nó nặng nhất trên bàn phím", "correct": false },
      { "id": "D", "text": "Vì nó được sản xuất đầu tiên", "correct": false }
    ],
    "hint": "Mọi bài thơ, đoạn văn, lời chúc... đều được gõ chủ yếu từ khu vực này!",
    "explain": "Đáp án đúng là A: Khu vực chính là trọng tâm của bàn phím, phục vụ hầu hết các nhu cầu gõ chữ và số."
  },
  {
    "id": "q58",
    "isHard": true,
    "type": "choice",
    "badge": "⭐ CÂU HỎI THỬ THÁCH - ĐÈN BÁO BÀN PHÍM",
    "title": "Ở góc trên bên phải của bàn phím thường có cụm 3 đèn LED nhỏ. Cụm đèn này dùng để báo trạng thái của những phím nào?",
    "options": [
      { "id": "A", "text": "Num Lock, Caps Lock, và Scroll Lock", "correct": true },
      { "id": "B", "text": "Esc, Enter, và Space", "correct": false },
      { "id": "C", "text": "Shift, Ctrl, và Alt", "correct": false },
      { "id": "D", "text": "F1, F2, và F3", "correct": false }
    ],
    "hint": "3 phím có chữ Lock (khóa/bật chế độ) ở cuối!",
    "explain": "Đáp án đúng là A: 3 đèn LED báo trạng thái Num Lock (số), Caps Lock (chữ hoa) và Scroll Lock."
  },
  {
    "id": "q59",
    "isHard": false,
    "type": "choice",
    "badge": "🟢 CÂU THƯỜNG - THỰC HÀNH KHÉO LÉO",
    "title": "Khi hai bàn tay đặt ở vị trí xuất phát, lòng bàn tay của em nên ở trạng thái nào?",
    "options": [
      { "id": "A", "text": "Thả lỏng tự nhiên, cổ tay không tì đè quá mạnh xuống bàn, các ngón tay khum cong nhẹ", "correct": true },
      { "id": "B", "text": "Gồng cứng đơ các ngón tay và đập mạnh xuống phím", "correct": false },
      { "id": "C", "text": "Dán chặt cả lòng bàn tay bẹp dí xuống bàn phím", "correct": false },
      { "id": "D", "text": "Chỉ chạm ngón út xuống bàn phím", "correct": false }
    ],
    "hint": "Các ngón tay khum cong như đang ôm một quả cầu nhỏ!",
    "explain": "Đáp án đúng là A: Ngón tay khum nhẹ, cổ tay thẳng hàng với cẳng tay giúp gõ phím linh hoạt và không mỏi."
  },
  {
    "id": "q60",
    "isHard": true,
    "type": "choice",
    "badge": "⭐ CÂU HỎI THỬ THÁCH - TỔNG KẾT VÀNG",
    "title": "Câu tóm tắt nào sau đây thể hiện ĐẦY ĐỦ VÀ CHÍNH XÁC NHẤT bí kíp sử dụng bàn phím Tiết 1?",
    "options": [
      { "id": "A", "text": "Xuất phát tại hàng cơ sở với 2 mốc gờ F-J; phân công 10 ngón đúng vị trí; gõ xong lập tức đưa ngón tay về hàng cơ sở!", "correct": true },
      { "id": "B", "text": "Gõ phím càng nhanh càng tốt, không cần quan tâm ngón nào gõ phím nào", "correct": false },
      { "id": "C", "text": "Chỉ dùng ngón trỏ để tìm phím F và J, các ngón khác không dùng", "correct": false },
      { "id": "D", "text": "Luôn nhìn chằm chằm vào bàn phím khi gõ chữ", "correct": false }
    ],
    "hint": "Gồm 3 ý: Xuất phát ở hàng cơ sở (gờ F, J) - Phân công 10 ngón - Gõ xong lùi về xuất phát!",
    "explain": "Đáp án đúng là A: Đây là nguyên tắc vàng bất di bất dịch của kỹ năng gõ bàn phím chuẩn 10 ngón."
  }
];
