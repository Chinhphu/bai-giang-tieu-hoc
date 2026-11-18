/**
 * =========================================================================
 * NGÂN HÀNG THỬ THÁCH TIẾNG ANH LỚP 2 (TIẾT 2 - ĐẤU TRƯỜNG NÂNG CAO)
 * Đa dạng chủ đề: Đồ dùng Tin học, Động vật, Đồ dùng học tập, Màu sắc & Trái cây
 * Hỗ trợ 4 dạng bài: Điền 2 chữ cái khuyết, Xếp chữ xáo trộn (Scramble),
 * Ghép nối 4-5 cặp tranh-từ, và Nghe phát âm chọn từ đúng chính tả.
 * 100% Offline-first
 * =========================================================================
 */

window.QUESTS_DATA = [
    // --- CHỦ ĐỀ 1: ĐỒ DÙNG TIN HỌC (COMPUTER & TECH) ---
    {
        id: "tech_01",
        word: "computer",
        vietnamese: "Máy tính",
        icon: "💻",
        missingPattern: ["c", "", "m", "p", "u", "t", "", "r"],
        missingLetters: ["o", "e"],
        options: ["o", "e", "a", "u", "i"],
        scrambled: ["m", "p", "u", "t", "e", "r", "c", "o"],
        spellingOptions: ["computer", "computar", "compeuter", "computor"]
    },
    {
        id: "tech_02",
        word: "mouse",
        vietnamese: "Chuột máy tính",
        icon: "🖱️",
        missingPattern: ["m", "", "u", "s", ""],
        missingLetters: ["o", "e"],
        options: ["o", "e", "a", "u"],
        scrambled: ["s", "e", "m", "o", "u"],
        spellingOptions: ["mouse", "mause", "moose", "mowse"]
    },
    {
        id: "tech_03",
        word: "keyboard",
        vietnamese: "Bàn phím",
        icon: "⌨️",
        missingPattern: ["k", "", "y", "b", "", "a", "r", "d"],
        missingLetters: ["e", "o"],
        options: ["e", "o", "a", "u", "i"],
        scrambled: ["b", "o", "a", "r", "d", "k", "e", "y"],
        spellingOptions: ["keyboard", "keybord", "kayboard", "keybored"]
    },
    {
        id: "tech_04",
        word: "screen",
        vietnamese: "Màn hình",
        icon: "🖥️",
        missingPattern: ["s", "c", "r", "", "", "n"],
        missingLetters: ["e", "e"],
        options: ["e", "e", "a", "o"],
        scrambled: ["e", "n", "s", "c", "r", "e"],
        spellingOptions: ["screen", "screan", "skreen", "scrin"]
    },
    {
        id: "tech_05",
        word: "laptop",
        vietnamese: "Máy tính xách tay",
        icon: "💻",
        missingPattern: ["l", "", "p", "t", "", "p"],
        missingLetters: ["a", "o"],
        options: ["a", "o", "e", "u"],
        scrambled: ["t", "o", "p", "l", "a", "p"],
        spellingOptions: ["laptop", "laptap", "leptop", "labtop"]
    },

    // --- CHỦ ĐỀ 2: ĐỘNG VẬT HOANG DÃ & THÂN QUEN (ANIMALS) ---
    {
        id: "anim_01",
        word: "monkey",
        vietnamese: "Con khỉ",
        icon: "🐒",
        missingPattern: ["m", "", "n", "k", "", "y"],
        missingLetters: ["o", "e"],
        options: ["o", "e", "a", "u"],
        scrambled: ["n", "k", "e", "y", "m", "o"],
        spellingOptions: ["monkey", "monky", "monkay", "munkey"]
    },
    {
        id: "anim_02",
        word: "rabbit",
        vietnamese: "Con thỏ",
        icon: "🐇",
        missingPattern: ["r", "", "b", "b", "", "t"],
        missingLetters: ["a", "i"],
        options: ["a", "i", "e", "o"],
        scrambled: ["b", "b", "i", "t", "r", "a"],
        spellingOptions: ["rabbit", "rabit", "rabbet", "robit"]
    },
    {
        id: "anim_03",
        word: "tiger",
        vietnamese: "Con hổ",
        icon: "🐯",
        missingPattern: ["t", "", "g", "", "r"],
        missingLetters: ["i", "e"],
        options: ["i", "e", "a", "o"],
        scrambled: ["g", "e", "r", "t", "i"],
        spellingOptions: ["tiger", "tyger", "tigor", "tigar"]
    },
    {
        id: "anim_04",
        word: "elephant",
        vietnamese: "Con voi",
        icon: "🐘",
        missingPattern: ["e", "l", "", "p", "h", "", "n", "t"],
        missingLetters: ["e", "a"],
        options: ["e", "a", "o", "u", "i"],
        scrambled: ["p", "h", "a", "n", "t", "e", "l", "e"],
        spellingOptions: ["elephant", "elefant", "elephent", "elifant"]
    },
    {
        id: "anim_05",
        word: "zebra",
        vietnamese: "Ngựa vằn",
        icon: "🦓",
        missingPattern: ["z", "", "b", "r", ""],
        missingLetters: ["e", "a"],
        options: ["e", "a", "o", "u"],
        scrambled: ["b", "r", "a", "z", "e"],
        spellingOptions: ["zebra", "zibra", "zebre", "sebra"]
    },
    {
        id: "anim_06",
        word: "panda",
        vietnamese: "Gấu trúc",
        icon: "🐼",
        missingPattern: ["p", "", "n", "d", ""],
        missingLetters: ["a", "a"],
        options: ["a", "a", "e", "o"],
        scrambled: ["n", "d", "a", "p", "a"],
        spellingOptions: ["panda", "penda", "pande", "pandar"]
    },
    {
        id: "anim_07",
        word: "dolphin",
        vietnamese: "Cá heo",
        icon: "🐬",
        missingPattern: ["d", "", "l", "p", "h", "", "n"],
        missingLetters: ["o", "i"],
        options: ["o", "i", "e", "a"],
        scrambled: ["p", "h", "i", "n", "d", "o", "l"],
        spellingOptions: ["dolphin", "dolfin", "dolphine", "dolfine"]
    },
    {
        id: "anim_08",
        word: "penguin",
        vietnamese: "Chim cánh cụt",
        icon: "🐧",
        missingPattern: ["p", "", "n", "g", "", "i", "n"],
        missingLetters: ["e", "u"],
        options: ["e", "u", "a", "o"],
        scrambled: ["g", "u", "i", "n", "p", "e", "n"],
        spellingOptions: ["penguin", "pengwin", "penguen", "pingwin"]
    },

    // --- CHỦ ĐỀ 3: ĐỒ DÙNG HỌC TẬP & TRƯỜNG HỌC (SCHOOL ITEMS) ---
    {
        id: "sch_01",
        word: "school",
        vietnamese: "Trường học",
        icon: "🏫",
        missingPattern: ["s", "c", "h", "", "", "l"],
        missingLetters: ["o", "o"],
        options: ["o", "o", "u", "a"],
        scrambled: ["o", "o", "l", "s", "c", "h"],
        spellingOptions: ["school", "scool", "shcool", "skool"]
    },
    {
        id: "sch_02",
        word: "pencil",
        vietnamese: "Bút chì",
        icon: "✏️",
        missingPattern: ["p", "", "n", "c", "", "l"],
        missingLetters: ["e", "i"],
        options: ["e", "i", "a", "o"],
        scrambled: ["n", "c", "i", "l", "p", "e"],
        spellingOptions: ["pencil", "pensil", "pencle", "pencel"]
    },
    {
        id: "sch_03",
        word: "eraser",
        vietnamese: "Cục tẩy",
        icon: "🧹",
        missingPattern: ["e", "r", "", "s", "", "r"],
        missingLetters: ["a", "e"],
        options: ["a", "e", "o", "u"],
        scrambled: ["s", "e", "r", "e", "r", "a"],
        spellingOptions: ["eraser", "eracer", "erazor", "erasur"]
    },
    {
        id: "sch_04",
        word: "ruler",
        vietnamese: "Thước kẻ",
        icon: "📏",
        missingPattern: ["r", "", "l", "", "r"],
        missingLetters: ["u", "e"],
        options: ["u", "e", "a", "o"],
        scrambled: ["l", "e", "r", "r", "u"],
        spellingOptions: ["ruler", "rular", "ruleur", "rooler"]
    },
    {
        id: "sch_05",
        word: "teacher",
        vietnamese: "Thầy cô giáo",
        icon: "👩‍🏫",
        missingPattern: ["t", "", "", "c", "h", "e", "r"],
        missingLetters: ["e", "a"],
        options: ["e", "a", "i", "o"],
        scrambled: ["c", "h", "e", "r", "t", "e", "a"],
        spellingOptions: ["teacher", "techer", "teachor", "teachar"]
    },

    // --- CHỦ ĐỀ 4: TRÁI CÂY & MÀU SẮC (FRUITS & COLORS) ---
    {
        id: "fruit_01",
        word: "banana",
        vietnamese: "Quả chuối",
        icon: "🍌",
        missingPattern: ["b", "", "n", "", "n", "a"],
        missingLetters: ["a", "a"],
        options: ["a", "a", "e", "o"],
        scrambled: ["n", "a", "n", "a", "b", "a"],
        spellingOptions: ["banana", "benana", "bananna", "banena"]
    },
    {
        id: "fruit_02",
        word: "orange",
        vietnamese: "Quả cam / Màu cam",
        icon: "🍊",
        missingPattern: ["o", "r", "", "n", "g", ""],
        missingLetters: ["a", "e"],
        options: ["a", "e", "o", "u"],
        scrambled: ["n", "g", "e", "o", "r", "a"],
        spellingOptions: ["orange", "orenge", "oringe", "oranje"]
    },
    {
        id: "fruit_03",
        word: "apple",
        vietnamese: "Quả táo",
        icon: "🍎",
        missingPattern: ["a", "p", "", "l", ""],
        missingLetters: ["p", "e"],
        options: ["p", "e", "b", "d"],
        scrambled: ["p", "l", "e", "a", "p"],
        spellingOptions: ["apple", "aple", "appel", "appol"]
    },
    {
        id: "color_01",
        word: "yellow",
        vietnamese: "Màu vàng",
        icon: "💛",
        missingPattern: ["y", "", "l", "l", "", "w"],
        missingLetters: ["e", "o"],
        options: ["e", "o", "a", "u"],
        scrambled: ["l", "l", "o", "w", "y", "e"],
        spellingOptions: ["yellow", "yallow", "yollow", "yellou"]
    },
    {
        id: "color_02",
        word: "purple",
        vietnamese: "Màu tím",
        icon: "💜",
        missingPattern: ["p", "", "r", "p", "l", ""],
        missingLetters: ["u", "e"],
        options: ["u", "e", "o", "a"],
        scrambled: ["p", "l", "e", "p", "u", "r"],
        spellingOptions: ["purple", "perple", "purpel", "purpal"]
    },
    {
        id: "color_03",
        word: "rainbow",
        vietnamese: "Cầu vồng",
        icon: "🌈",
        missingPattern: ["r", "", "i", "n", "b", "", "w"],
        missingLetters: ["a", "o"],
        options: ["a", "o", "e", "u"],
        scrambled: ["n", "b", "o", "w", "r", "a", "i"],
        spellingOptions: ["rainbow", "ranbow", "reinbow", "rainbou"]
    }
];
