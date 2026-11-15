/**
 * NGÂN HÀNG ĐỀ GÕ TIẾP SỨC TIẾT 11 (TIN HỌC 3)
 * Bài 5: Sử dụng bàn phím (Tiết 2) - ĐƯỜNG ĐUA TIẾP SỨC 10 NGÓN
 * 
 * QUY CHUẨN ĐỘ DÀI CÔNG BẰNG TUYỆT ĐỐI:
 * TẤT CẢ CÁC ĐỀ BÀI ĐỀU CÓ ĐÚNG CHÍNH XÁC 6 PHÍM GÕ (6 KEYSTROKES)
 * Để mọi học sinh lên bảng đều có độ dài bài thi ngang nhau 100%, không ai dài hơn hay ngắn hơn!
 */

window.TYPING_QUESTS = [
    // === PHẦN 1: CỤM RÈN CƠ BẮP (MUSCLE MEMORY) - 6 PHÍM GÕ ===
    {
        id: "m-1",
        stage: "Vươn ngón trỏ",
        display: "F R F J U J",
        keys: ["F", "R", "F", "J", "U", "J"],
        type: "muscle"
    },
    {
        id: "m-2",
        stage: "Vươn ngón trỏ",
        display: "F T F J Y J",
        keys: ["F", "T", "F", "J", "Y", "J"],
        type: "muscle"
    },
    {
        id: "m-3",
        stage: "Vươn ngón trỏ",
        display: "R F R U J U",
        keys: ["R", "F", "R", "U", "J", "U"],
        type: "muscle"
    },
    {
        id: "m-4",
        stage: "Hạ ngón trỏ",
        display: "F V F J M J",
        keys: ["F", "V", "F", "J", "M", "J"],
        type: "muscle"
    },
    {
        id: "m-5",
        stage: "Hạ ngón trỏ",
        display: "F B F J N J",
        keys: ["F", "B", "F", "J", "N", "J"],
        type: "muscle"
    },
    {
        id: "m-6",
        stage: "Hạ ngón trỏ",
        display: "V F V M J M",
        keys: ["V", "F", "V", "M", "J", "M"],
        type: "muscle"
    },
    {
        id: "m-7",
        stage: "Vươn ngón giữa",
        display: "D E D K I K",
        keys: ["D", "E", "D", "K", "I", "K"],
        type: "muscle"
    },
    {
        id: "m-8",
        stage: "Hạ ngón giữa",
        display: "D C D K , K",
        keys: ["D", "C", "D", "K", ",", "K"],
        type: "muscle"
    },
    {
        id: "m-9",
        stage: "Vươn ngón áp út",
        display: "S W S L O L",
        keys: ["S", "W", "S", "L", "O", "L"],
        type: "muscle"
    },
    {
        id: "m-10",
        stage: "Hạ ngón áp út",
        display: "S X S L . L",
        keys: ["S", "X", "S", "L", ".", "L"],
        type: "muscle"
    },
    {
        id: "m-11",
        stage: "Vươn ngón út",
        display: "A Q A ; P ;",
        keys: ["A", "Q", "A", ";", "P", ";"],
        type: "muscle"
    },
    {
        id: "m-12",
        stage: "Hạ ngón út",
        display: "A Z A ; / ;",
        keys: ["A", "Z", "A", ";", "/", ";"],
        type: "muscle"
    },
    {
        id: "m-13",
        stage: "Trỏ liên hoàn",
        display: "F R V J U M",
        keys: ["F", "R", "V", "J", "U", "M"],
        type: "muscle"
    },
    {
        id: "m-14",
        stage: "Giữa liên hoàn",
        display: "D E C K I ,",
        keys: ["D", "E", "C", "K", "I", ","],
        type: "muscle"
    },
    {
        id: "m-15",
        stage: "Áp út liên hoàn",
        display: "S W X L O .",
        keys: ["S", "W", "X", "L", "O", "."],
        type: "muscle"
    },
    {
        id: "m-16",
        stage: "Út liên hoàn",
        display: "A Q Z ; P /",
        keys: ["A", "Q", "Z", ";", "P", "/"],
        type: "muscle"
    },

    // === PHẦN 2: TỪ VỰNG TIẾNG ANH LỚP 3 QUEN THUỘC - 6 PHÍM GÕ ===
    {
        id: "w-1",
        stage: "Từ vựng: Trường học",
        display: "S C H O O L",
        keys: ["S", "C", "H", "O", "O", "L"],
        meaning: "Trường học",
        type: "word"
    },
    {
        id: "w-2",
        stage: "Từ vựng: Gia đình",
        display: "F A M I L Y",
        keys: ["F", "A", "M", "I", "L", "Y"],
        meaning: "Gia đình",
        type: "word"
    },
    {
        id: "w-3",
        stage: "Từ vựng: Con thỏ",
        display: "R A B B I T",
        keys: ["R", "A", "B", "B", "I", "T"],
        meaning: "Con thỏ",
        type: "word"
    },
    {
        id: "w-4",
        stage: "Từ vựng: Con khỉ",
        display: "M O N K E Y",
        keys: ["M", "O", "N", "K", "E", "Y"],
        meaning: "Con khỉ",
        type: "word"
    },
    {
        id: "w-5",
        stage: "Từ vựng: Màu vàng",
        display: "Y E L L O W",
        keys: ["Y", "E", "L", "L", "O", "W"],
        meaning: "Màu vàng",
        type: "word"
    },
    {
        id: "w-6",
        stage: "Từ vựng: Quả cam",
        display: "O R A N G E",
        keys: ["O", "R", "A", "N", "G", "E"],
        meaning: "Quả cam / Màu cam",
        type: "word"
    },
    {
        id: "w-7",
        stage: "Từ vựng: Màu tím",
        display: "P U R P L E",
        keys: ["P", "U", "R", "P", "L", "E"],
        meaning: "Màu tím",
        type: "word"
    },
    {
        id: "w-8",
        stage: "Từ vựng: Bông hoa",
        display: "F L O W E R",
        keys: ["F", "L", "O", "W", "E", "R"],
        meaning: "Bông hoa",
        type: "word"
    },
    {
        id: "w-9",
        stage: "Từ vựng: Cây bút chì",
        display: "P E N C I L",
        keys: ["P", "E", "N", "C", "I", "L"],
        meaning: "Cây bút chì",
        type: "word"
    },
    {
        id: "w-10",
        stage: "Từ vựng: Cục tẩy",
        display: "E R A S E R",
        keys: ["E", "R", "A", "S", "E", "R"],
        meaning: "Cục gôm / tẩy",
        type: "word"
    },
    {
        id: "w-11",
        stage: "Từ vựng: Người bạn",
        display: "F R I E N D",
        keys: ["F", "R", "I", "E", "N", "D"],
        meaning: "Người bạn",
        type: "word"
    },
    {
        id: "w-12",
        stage: "Từ vựng: Bác sĩ",
        display: "D O C T O R",
        keys: ["D", "O", "C", "T", "O", "R"],
        meaning: "Bác sĩ",
        type: "word"
    },
    {
        id: "w-13",
        stage: "Từ vựng: Bác nông dân",
        display: "F A R M E R",
        keys: ["F", "A", "R", "M", "E", "R"],
        meaning: "Bác nông dân",
        type: "word"
    },
    {
        id: "w-14",
        stage: "Từ vựng: Mùa hè",
        display: "S U M M E R",
        keys: ["S", "U", "M", "M", "E", "R"],
        meaning: "Mùa hè",
        type: "word"
    },
    {
        id: "w-15",
        stage: "Từ vựng: Mùa đông",
        display: "W I N T E R",
        keys: ["W", "I", "N", "T", "E", "R"],
        meaning: "Mùa đông",
        type: "word"
    },
    {
        id: "w-16",
        stage: "Từ vựng: Mùa xuân",
        display: "S P R I N G",
        keys: ["S", "P", "R", "I", "N", "G"],
        meaning: "Mùa xuân",
        type: "word"
    },
    {
        id: "w-17",
        stage: "Từ vựng: Người bố",
        display: "F A T H E R",
        keys: ["F", "A", "T", "H", "E", "R"],
        meaning: "Người bố",
        type: "word"
    },
    {
        id: "w-18",
        stage: "Từ vựng: Người mẹ",
        display: "M O T H E R",
        keys: ["M", "O", "T", "H", "E", "R"],
        meaning: "Người mẹ",
        type: "word"
    },
    {
        id: "w-19",
        stage: "Từ vựng: Chị em gái",
        display: "S I S T E R",
        keys: ["S", "I", "S", "T", "E", "R"],
        meaning: "Chị hoặc em gái",
        type: "word"
    },
    {
        id: "w-20",
        stage: "Từ vựng: Con nhện",
        display: "S P I D E R",
        keys: ["S", "P", "I", "D", "E", "R"],
        meaning: "Con nhện",
        type: "word"
    }
];

// Đồng bộ biến toàn cục
window.QUESTS_DATA = window.TYPING_QUESTS;
