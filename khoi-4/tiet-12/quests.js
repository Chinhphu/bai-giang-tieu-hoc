/**
 * Ngân hàng dữ liệu Tiết 12 Khối 4: Bài 7 - Tạo bài trình chiếu (Tiết 1)
 * Chuỗi gõ phím kiểu Telex kết hợp phím Shift (chữ hoa) chuẩn SGK Tin học 4.
 * Phân hóa rõ rệt độ khó theo 3 BẢNG ĐẤU:
 * - Bảng 1 (Khởi động): Từ ngắn, 6–10 phím, dễ gõ, ít dấu.
 * - Bảng 2 (Chiến binh): Cụm từ vừa, 11–15 phím, kết hợp Shift hoa + dấu thanh + nguyên âm đôi.
 * - Bảng 3 (Thần tốc): Cụm từ dài/thành ngữ, 16–35 phím, nhiều chữ hoa, độ thử thách cao.
 */

window.TYPING_QUESTS_TIER_1 = [
    {
        "id": "t1-01",
        "tier": 1,
        "vietnamese": "đi chơi",
        "keys": ["d", "d", "i", " ", "c", "h", "o", "w", "i"],
        "keyMap": [0, 0, 1, 2, 3, 4, 5, 5, 6]
    },
    {
        "id": "t1-02",
        "tier": 1,
        "vietnamese": "Lớp 4/1",
        "keys": ["L", "o", "w", "p", "s", " ", "4", "/", "1"],
        "keyMap": [0, 1, 1, 2, 1, 3, 4, 5, 6]
    },
    {
        "id": "t1-03",
        "tier": 1,
        "vietnamese": "Lớp 4/2",
        "keys": ["L", "o", "w", "p", "s", " ", "4", "/", "2"],
        "keyMap": [0, 1, 1, 2, 1, 3, 4, 5, 6]
    },
    {
        "id": "t1-04",
        "tier": 1,
        "vietnamese": "Tin học 4",
        "keys": ["T", "i", "n", " ", "h", "o", "c", "j", " ", "4"],
        "keyMap": [0, 1, 2, 3, 4, 5, 6, 5, 7, 8]
    },
    {
        "id": "t1-05",
        "tier": 1,
        "vietnamese": "Trường em",
        "keys": ["T", "r", "u", "o", "w", "n", "g", "f", " ", "e", "m"],
        "keyMap": [0, 1, 2, 3, 3, 4, 5, 3, 6, 7, 8]
    },
    {
        "id": "t1-06",
        "tier": 1,
        "vietnamese": "Thể thao",
        "keys": ["T", "h", "e", "e", "r", " ", "t", "h", "a", "o"],
        "keyMap": [0, 1, 2, 2, 2, 3, 4, 5, 6, 7]
    },
    {
        "id": "t1-07",
        "tier": 1,
        "vietnamese": "Lưu tệp",
        "keys": ["L", "u", "w", "u", " ", "t", "e", "e", "p", "j"],
        "keyMap": [0, 1, 1, 2, 3, 4, 5, 5, 6, 5]
    },
    {
        "id": "t1-08",
        "tier": 1,
        "vietnamese": "Thoát ra",
        "keys": ["T", "h", "o", "a", "t", "s", " ", "r", "a"],
        "keyMap": [0, 1, 2, 3, 4, 3, 5, 6, 7]
    },
    {
        "id": "t1-09",
        "tier": 1,
        "vietnamese": "Họ tên em",
        "keys": ["H", "o", "j", " ", "t", "e", "e", "n", " ", "e", "m"],
        "keyMap": [0, 1, 1, 2, 3, 4, 4, 5, 6, 7, 8]
    },
    {
        "id": "t1-10",
        "tier": 1,
        "vietnamese": "Việt Nam",
        "keys": ["V", "i", "e", "e", "t", "j", " ", "N", "a", "m"],
        "keyMap": [0, 1, 2, 2, 3, 2, 4, 5, 6, 7]
    },
    {
        "id": "t1-11",
        "tier": 1,
        "vietnamese": "Cảnh đẹp",
        "keys": ["C", "a", "n", "h", "r", " ", "d", "d", "e", "p", "j"],
        "keyMap": [0, 1, 2, 3, 1, 4, 5, 5, 6, 7, 6]
    },
    {
        "id": "t1-12",
        "tier": 1,
        "vietnamese": "Chèn ảnh",
        "keys": ["C", "h", "e", "n", "f", " ", "a", "n", "h", "r"],
        "keyMap": [0, 1, 2, 3, 2, 4, 5, 6, 7, 5]
    }
];

window.TYPING_QUESTS_TIER_2 = [
    {
        "id": "t2-01",
        "tier": 2,
        "vietnamese": "quê hương",
        "keys": ["q", "u", "e", "e", " ", "h", "u", "o", "w", "n", "g"],
        "keyMap": [0, 1, 2, 2, 3, 4, 5, 6, 6, 7, 8]
    },
    {
        "id": "t2-02",
        "tier": 2,
        "vietnamese": "khiêm tốn",
        "keys": ["k", "h", "i", "e", "e", "m", " ", "t", "o", "o", "n", "s"],
        "keyMap": [0, 1, 2, 3, 3, 4, 5, 6, 7, 7, 8, 7]
    },
    {
        "id": "t2-03",
        "tier": 2,
        "vietnamese": "trường học",
        "keys": ["t", "r", "u", "o", "w", "n", "g", "f", " ", "h", "o", "c", "j"],
        "keyMap": [0, 1, 2, 3, 3, 4, 5, 3, 6, 7, 8, 9, 8]
    },
    {
        "id": "t2-04",
        "tier": 2,
        "vietnamese": "Uống nước",
        "keys": ["U", "o", "o", "n", "g", "s", " ", "n", "u", "o", "w", "c", "s"],
        "keyMap": [0, 1, 1, 2, 3, 1, 4, 5, 6, 7, 7, 8, 7]
    },
    {
        "id": "t2-05",
        "tier": 2,
        "vietnamese": "nhớ nguồn",
        "keys": ["n", "h", "o", "w", "s", " ", "n", "g", "u", "o", "o", "n", "f"],
        "keyMap": [0, 1, 2, 2, 2, 3, 4, 5, 6, 7, 7, 8, 7]
    },
    {
        "id": "t2-06",
        "tier": 2,
        "vietnamese": "Rạch Giá",
        "keys": ["R", "a", "c", "h", "j", " ", "G", "i", "a", "s"],
        "keyMap": [0, 1, 2, 3, 1, 4, 5, 6, 7, 7]
    },
    {
        "id": "t2-07",
        "tier": 2,
        "vietnamese": "Kiên Giang",
        "keys": ["K", "i", "e", "e", "n", " ", "G", "i", "a", "n", "g"],
        "keyMap": [0, 1, 2, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    {
        "id": "t2-08",
        "tier": 2,
        "vietnamese": "Trưng Vương",
        "keys": ["T", "r", "u", "w", "n", "g", " ", "V", "u", "o", "w", "n", "g"],
        "keyMap": [0, 1, 2, 2, 3, 4, 5, 6, 7, 8, 8, 9, 10]
    },
    {
        "id": "t2-09",
        "tier": 2,
        "vietnamese": "Trang chiếu",
        "keys": ["T", "r", "a", "n", "g", " ", "c", "h", "i", "e", "e", "u", "s"],
        "keyMap": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 10, 9]
    },
    {
        "id": "t2-10",
        "tier": 2,
        "vietnamese": "Trình chiếu",
        "keys": ["T", "r", "i", "n", "h", "f", " ", "c", "h", "i", "e", "e", "u", "s"],
        "keyMap": [0, 1, 2, 3, 4, 2, 5, 6, 7, 8, 9, 9, 10, 9]
    },
    {
        "id": "t2-11",
        "tier": 2,
        "vietnamese": "Phần mềm",
        "keys": ["P", "h", "a", "a", "n", "f", " ", "m", "e", "e", "m", "f"],
        "keyMap": [0, 1, 2, 2, 3, 2, 4, 5, 6, 6, 7, 6]
    },
    {
        "id": "t2-12",
        "tier": 2,
        "vietnamese": "Phím Shift",
        "keys": ["P", "h", "i", "m", "s", " ", "S", "h", "i", "f", "t"],
        "keyMap": [0, 1, 2, 3, 2, 4, 5, 6, 7, 8, 9]
    },
    {
        "id": "t2-13",
        "tier": 2,
        "vietnamese": "Kiểu Telex",
        "keys": ["K", "i", "e", "e", "u", "r", " ", "T", "e", "l", "e", "x"],
        "keyMap": [0, 1, 2, 2, 3, 2, 4, 5, 6, 7, 8, 9]
    },
    {
        "id": "t2-14",
        "tier": 2,
        "vietnamese": "Gõ chữ hoa",
        "keys": ["G", "o", "x", " ", "c", "h", "u", "w", "x", " ", "h", "o", "a"],
        "keyMap": [0, 1, 1, 2, 3, 4, 5, 5, 5, 6, 7, 8, 9]
    },
    {
        "id": "t2-15",
        "tier": 2,
        "vietnamese": "PowerPoint",
        "keys": ["P", "o", "w", "e", "r", "P", "o", "i", "n", "t"],
        "keyMap": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
];

window.TYPING_QUESTS_TIER_3 = [
    {
        "id": "t3-01",
        "tier": 3,
        "vietnamese": "Uống nước nhớ nguồn",
        "keys": ["U", "o", "o", "n", "g", "s", " ", "n", "u", "o", "w", "c", "s", " ", "n", "h", "o", "w", "s", " ", "n", "g", "u", "o", "o", "n", "f"],
        "keyMap": [0, 1, 1, 2, 3, 1, 4, 5, 6, 7, 7, 8, 7, 9, 10, 11, 12, 12, 12, 13, 14, 15, 16, 17, 17, 18, 17]
    },
    {
        "id": "t3-02",
        "tier": 3,
        "vietnamese": "Khởi động phần mềm",
        "keys": ["K", "h", "o", "w", "i", "r", " ", "d", "d", "o", "o", "n", "g", "j", " ", "p", "h", "a", "a", "n", "f", " ", "m", "e", "e", "m", "f"],
        "keyMap": [0, 1, 2, 2, 3, 2, 4, 5, 5, 6, 6, 7, 8, 6, 9, 10, 11, 12, 12, 13, 12, 14, 15, 16, 16, 17, 16]
    },
    {
        "id": "t3-03",
        "tier": 3,
        "vietnamese": "Bài trình chiếu đẹp",
        "keys": ["B", "a", "i", "f", " ", "t", "r", "i", "n", "h", "f", " ", "c", "h", "i", "e", "e", "u", "s", " ", "d", "d", "e", "p", "j"],
        "keyMap": [0, 1, 2, 1, 3, 4, 5, 6, 7, 8, 6, 9, 10, 11, 12, 13, 13, 14, 13, 15, 16, 16, 17, 18, 17]
    },
    {
        "id": "t3-04",
        "tier": 3,
        "vietnamese": "Phong cảnh quê hương",
        "keys": ["P", "h", "o", "n", "g", " ", "c", "a", "n", "h", "r", " ", "q", "u", "e", "e", " ", "h", "u", "o", "w", "n", "g"],
        "keyMap": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 7, 10, 11, 12, 13, 13, 14, 15, 16, 17, 17, 18, 19]
    },
    {
        "id": "t3-05",
        "tier": 3,
        "vietnamese": "Gõ tiếng Việt có dấu",
        "keys": ["G", "o", "x", " ", "t", "i", "e", "e", "n", "g", "s", " ", "V", "i", "e", "e", "t", "j", " ", "c", "o", "s", " ", "d", "a", "a", "u", "s"],
        "keyMap": [0, 1, 1, 2, 3, 4, 5, 5, 6, 7, 5, 8, 9, 10, 11, 11, 12, 11, 13, 14, 15, 15, 16, 17, 18, 18, 19, 18]
    },
    {
        "id": "t3-06",
        "tier": 3,
        "vietnamese": "Hình ảnh phong cảnh đẹp",
        "keys": ["H", "i", "n", "h", "f", " ", "a", "n", "h", "r", " ", "p", "h", "o", "n", "g", " ", "c", "a", "n", "h", "r", " ", "d", "d", "e", "p", "j"],
        "keyMap": [0, 1, 2, 3, 1, 4, 5, 6, 7, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 16, 19, 20, 20, 21, 22, 21]
    },
    {
        "id": "t3-07",
        "tier": 3,
        "vietnamese": "Em yêu trường em",
        "keys": ["E", "m", " ", "y", "e", "e", "u", " ", "t", "r", "u", "o", "w", "n", "g", "f", " ", "e", "m"],
        "keyMap": [0, 1, 2, 3, 4, 4, 5, 6, 7, 8, 9, 10, 10, 11, 12, 10, 13, 14, 15]
    },
    {
        "id": "t3-08",
        "tier": 3,
        "vietnamese": "Trường Tiểu học Trưng Vương",
        "keys": ["T", "r", "u", "o", "w", "n", "g", "f", " ", "T", "i", "e", "e", "u", "r", " ", "h", "o", "c", "j", " ", "T", "r", "u", "w", "n", "g", " ", "V", "u", "o", "w", "n", "g"],
        "keyMap": [0, 1, 2, 3, 3, 4, 5, 3, 6, 7, 8, 9, 9, 10, 9, 11, 12, 13, 14, 13, 15, 16, 17, 18, 18, 19, 20, 21, 22, 23, 24, 24, 25, 26]
    },
    {
        "id": "t3-09",
        "tier": 3,
        "vietnamese": "Tạo bài trình chiếu mới",
        "keys": ["T", "a", "o", "j", " ", "b", "a", "i", "f", " ", "t", "r", "i", "n", "h", "f", " ", "c", "h", "i", "e", "e", "u", "s", " ", "m", "o", "w", "i", "s"],
        "keyMap": [0, 1, 2, 1, 3, 4, 5, 6, 5, 7, 8, 9, 10, 11, 12, 10, 13, 14, 15, 16, 17, 17, 18, 17, 19, 20, 21, 21, 22, 21]
    },
    {
        "id": "t3-10",
        "tier": 3,
        "vietnamese": "Tập gõ bàn phím nhanh",
        "keys": ["T", "a", "a", "p", "j", " ", "g", "o", "x", " ", "b", "a", "n", "f", " ", "p", "h", "i", "m", "s", " ", "n", "h", "a", "n", "h"],
        "keyMap": [0, 1, 1, 2, 1, 3, 4, 5, 5, 6, 7, 8, 9, 8, 10, 11, 12, 13, 14, 13, 15, 16, 17, 18, 19, 20]
    }
];

window.TYPING_QUESTS_BY_TIER = {
    1: window.TYPING_QUESTS_TIER_1,
    2: window.TYPING_QUESTS_TIER_2,
    3: window.TYPING_QUESTS_TIER_3
};

// Tổng hợp danh sách để tương thích ngược
window.TYPING_QUESTS = [
    ...window.TYPING_QUESTS_TIER_1,
    ...window.TYPING_QUESTS_TIER_2,
    ...window.TYPING_QUESTS_TIER_3
];
