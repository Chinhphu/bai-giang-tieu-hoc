/**
 * =========================================================================
 * NGÂN HÀNG TỪ VỰNG TIẾNG ANH LỚP 2 - HỌC KÌ 1
 * Từ vựng siêu đơn giản, ngắn gọn (3-5 chữ cái), gần gũi với học sinh lớp 2
 * Chạy 100% offline-first không phụ thuộc mạng
 * =========================================================================
 */

window.QUESTS_DATA = [
    // --- ĐỘNG VẬT QUEN THUỘC (ANIMALS) ---
    {
        id: "k2_01",
        word: "cat",
        vietnamese: "Con mèo",
        icon: "🐱",
        missingPattern: ["c", "", "t"],
        missingLetters: ["a"],
        options: ["a", "o", "e", "u"]
    },
    {
        id: "k2_02",
        word: "dog",
        vietnamese: "Con chó",
        icon: "🐶",
        missingPattern: ["d", "", "g"],
        missingLetters: ["o"],
        options: ["o", "a", "u", "i"]
    },
    {
        id: "k2_03",
        word: "pig",
        vietnamese: "Con lợn (heo)",
        icon: "🐷",
        missingPattern: ["p", "", "g"],
        missingLetters: ["i"],
        options: ["i", "e", "a", "o"]
    },
    {
        id: "k2_04",
        word: "ant",
        vietnamese: "Con kiến",
        icon: "🐜",
        missingPattern: ["", "n", "t"],
        missingLetters: ["a"],
        options: ["a", "e", "o", "u"]
    },
    {
        id: "k2_05",
        word: "bee",
        vietnamese: "Con ong",
        icon: "🐝",
        missingPattern: ["b", "", ""],
        missingLetters: ["e", "e"],
        options: ["e", "e", "a", "o"]
    },
    {
        id: "k2_06",
        word: "duck",
        vietnamese: "Con vịt",
        icon: "🦆",
        missingPattern: ["d", "", "c", "k"],
        missingLetters: ["u"],
        options: ["u", "a", "o", "e"]
    },
    {
        id: "k2_07",
        word: "fish",
        vietnamese: "Con cá",
        icon: "🐟",
        missingPattern: ["f", "", "s", "h"],
        missingLetters: ["i"],
        options: ["i", "e", "a", "o"]
    },
    {
        id: "k2_08",
        word: "bird",
        vietnamese: "Con chim",
        icon: "🐦",
        missingPattern: ["b", "", "r", "d"],
        missingLetters: ["i"],
        options: ["i", "e", "u", "a"]
    },
    {
        id: "k2_09",
        word: "frog",
        vietnamese: "Con ếch",
        icon: "🐸",
        missingPattern: ["f", "r", "", "g"],
        missingLetters: ["o"],
        options: ["o", "a", "u", "e"]
    },
    {
        id: "k2_10",
        word: "bear",
        vietnamese: "Con gấu",
        icon: "🐻",
        missingPattern: ["b", "", "a", "r"],
        missingLetters: ["e"],
        options: ["e", "i", "o", "u"]
    },

    // --- CON NGƯỜI & GIA ĐÌNH (PEOPLE & FAMILY) ---
    {
        id: "k2_11",
        word: "boy",
        vietnamese: "Cậu bé",
        icon: "👦",
        missingPattern: ["", "o", ""],
        missingLetters: ["b", "y"],
        options: ["b", "y", "p", "d"]
    },
    {
        id: "k2_12",
        word: "girl",
        vietnamese: "Cô bé",
        icon: "👧",
        missingPattern: ["g", "", "r", "l"],
        missingLetters: ["i"],
        options: ["i", "e", "a", "o"]
    },
    {
        id: "k2_13",
        word: "baby",
        vietnamese: "Em bé",
        icon: "👶",
        missingPattern: ["b", "", "b", ""],
        missingLetters: ["a", "y"],
        options: ["a", "y", "e", "i"]
    },
    {
        id: "k2_14",
        word: "dad",
        vietnamese: "Người bố",
        icon: "👨",
        missingPattern: ["d", "", "d"],
        missingLetters: ["a"],
        options: ["a", "e", "o", "u"]
    },
    {
        id: "k2_15",
        word: "mom",
        vietnamese: "Người mẹ",
        icon: "👩",
        missingPattern: ["m", "", "m"],
        missingLetters: ["o"],
        options: ["o", "a", "u", "e"]
    },

    // --- CƠ THỂ (BODY PARTS) ---
    {
        id: "k2_16",
        word: "eye",
        vietnamese: "Mắt",
        icon: "👁️",
        missingPattern: ["", "y", ""],
        missingLetters: ["e", "e"],
        options: ["e", "e", "a", "i"]
    },
    {
        id: "k2_17",
        word: "ear",
        vietnamese: "Tai",
        icon: "👂",
        missingPattern: ["", "a", "r"],
        missingLetters: ["e"],
        options: ["e", "o", "i", "u"]
    },
    {
        id: "k2_18",
        word: "nose",
        vietnamese: "Mũi",
        icon: "👃",
        missingPattern: ["n", "", "s", ""],
        missingLetters: ["o", "e"],
        options: ["o", "e", "a", "u"]
    },
    {
        id: "k2_19",
        word: "hand",
        vietnamese: "Bàn tay",
        icon: "✋",
        missingPattern: ["h", "", "n", "d"],
        missingLetters: ["a"],
        options: ["a", "e", "o", "u"]
    },
    {
        id: "k2_20",
        word: "arm",
        vietnamese: "Cánh tay",
        icon: "💪",
        missingPattern: ["", "r", "m"],
        missingLetters: ["a"],
        options: ["a", "e", "o", "u"]
    },
    {
        id: "k2_21",
        word: "leg",
        vietnamese: "Cái chân",
        icon: "🦵",
        missingPattern: ["l", "", "g"],
        missingLetters: ["e"],
        options: ["e", "a", "i", "o"]
    },
    {
        id: "k2_22",
        word: "foot",
        vietnamese: "Bàn chân",
        icon: "🦶",
        missingPattern: ["f", "", "", "t"],
        missingLetters: ["o", "o"],
        options: ["o", "o", "a", "u"]
    },

    // --- HOA QUẢ & ĐỒ ĂN (FRUITS & FOOD) ---
    {
        id: "k2_23",
        word: "apple",
        vietnamese: "Quả táo",
        icon: "🍎",
        missingPattern: ["a", "p", "", "l", ""],
        missingLetters: ["p", "e"],
        options: ["p", "e", "b", "a"]
    },
    {
        id: "k2_24",
        word: "banana",
        vietnamese: "Quả chuối",
        icon: "🍌",
        missingPattern: ["b", "", "n", "", "n", "a"],
        missingLetters: ["a", "a"],
        options: ["a", "a", "e", "o"]
    },
    {
        id: "k2_25",
        word: "orange",
        vietnamese: "Quả cam",
        icon: "🍊",
        missingPattern: ["o", "r", "", "n", "g", "e"],
        missingLetters: ["a"],
        options: ["a", "e", "o", "i"]
    },
    {
        id: "k2_26",
        word: "mango",
        vietnamese: "Quả xoài",
        icon: "🥭",
        missingPattern: ["m", "", "n", "g", "o"],
        missingLetters: ["a"],
        options: ["a", "o", "e", "u"]
    },
    {
        id: "k2_27",
        word: "grape",
        vietnamese: "Quả nho",
        icon: "🍇",
        missingPattern: ["g", "r", "", "p", "e"],
        missingLetters: ["a"],
        options: ["a", "e", "o", "u"]
    },
    {
        id: "k2_28",
        word: "milk",
        vietnamese: "Sữa",
        icon: "🥛",
        missingPattern: ["m", "", "l", "k"],
        missingLetters: ["i"],
        options: ["i", "e", "a", "o"]
    },
    {
        id: "k2_29",
        word: "egg",
        vietnamese: "Quả trứng",
        icon: "🥚",
        missingPattern: ["", "g", "g"],
        missingLetters: ["e"],
        options: ["e", "a", "o", "i"]
    },
    {
        id: "k2_30",
        word: "cake",
        vietnamese: "Bánh ngọt",
        icon: "🎂",
        missingPattern: ["c", "", "k", "e"],
        missingLetters: ["a"],
        options: ["a", "e", "o", "i"]
    },
    {
        id: "k2_31",
        word: "rice",
        vietnamese: "Cơm",
        icon: "🍚",
        missingPattern: ["r", "", "c", "e"],
        missingLetters: ["i"],
        options: ["i", "e", "a", "o"]
    },
    {
        id: "k2_32",
        word: "bread",
        vietnamese: "Bánh mì",
        icon: "🍞",
        missingPattern: ["b", "r", "", "a", "d"],
        missingLetters: ["e"],
        options: ["e", "a", "o", "i"]
    },

    // --- ĐỒ DÙNG HỌC TẬP (SCHOOL ITEMS) ---
    {
        id: "k2_33",
        word: "pen",
        vietnamese: "Cây bút",
        icon: "🖊️",
        missingPattern: ["p", "", "n"],
        missingLetters: ["e"],
        options: ["e", "a", "i", "o"]
    },
    {
        id: "k2_34",
        word: "book",
        vietnamese: "Quyển sách",
        icon: "📖",
        missingPattern: ["b", "", "", "k"],
        missingLetters: ["o", "o"],
        options: ["o", "o", "a", "u"]
    },
    {
        id: "k2_35",
        word: "bag",
        vietnamese: "Cái cặp sách",
        icon: "🎒",
        missingPattern: ["b", "", "g"],
        missingLetters: ["a"],
        options: ["a", "e", "o", "u"]
    }
];
