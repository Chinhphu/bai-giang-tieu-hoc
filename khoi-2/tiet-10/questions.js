/**
 * Ngân hàng dữ liệu đồng bộ từ questions.json (Tiết 10 - Vui học Toán cùng máy tính)
 * 100% Chuẩn kiến thức Toán Lớp 2 Học kỳ 1:
 * - Phép cộng, trừ qua 10 trong phạm vi 20
 * - Phép tính tròn chục trong phạm vi 100
 * - Điền số thích hợp vào ô trống
 * Hỗ trợ chạy 100% offline-first không lỗi CORS khi mở bằng file://
 */
window.QUESTS_DATA = [
  {
    "equation": "9 + 2 = <span class='math-unknown'>?</span>",
    "answer": 11,
    "hint": "9 cộng 1 rồi cộng 1"
  },
  {
    "equation": "9 + 3 = <span class='math-unknown'>?</span>",
    "answer": 12,
    "hint": "9 cộng 1 rồi cộng 2"
  },
  {
    "equation": "9 + 4 = <span class='math-unknown'>?</span>",
    "answer": 13,
    "hint": "9 cộng 1 rồi cộng 3"
  },
  {
    "equation": "9 + 5 = <span class='math-unknown'>?</span>",
    "answer": 14,
    "hint": "9 cộng 1 rồi cộng 4"
  },
  {
    "equation": "9 + 6 = <span class='math-unknown'>?</span>",
    "answer": 15,
    "hint": "9 cộng 1 rồi cộng 5"
  },
  {
    "equation": "9 + 7 = <span class='math-unknown'>?</span>",
    "answer": 16,
    "hint": "9 cộng 1 bằng 10, cộng 6"
  },
  {
    "equation": "9 + 8 = <span class='math-unknown'>?</span>",
    "answer": 17,
    "hint": "9 cộng 1 bằng 10, cộng 7"
  },
  {
    "equation": "8 + 3 = <span class='math-unknown'>?</span>",
    "answer": 11,
    "hint": "8 cộng 2 rồi cộng 1"
  },
  {
    "equation": "8 + 4 = <span class='math-unknown'>?</span>",
    "answer": 12,
    "hint": "8 cộng 2 rồi cộng 2"
  },
  {
    "equation": "8 + 5 = <span class='math-unknown'>?</span>",
    "answer": 13,
    "hint": "8 cộng 2 bằng 10, cộng 3"
  },
  {
    "equation": "8 + 6 = <span class='math-unknown'>?</span>",
    "answer": 14,
    "hint": "8 cộng 2 bằng 10, cộng 4"
  },
  {
    "equation": "8 + 7 = <span class='math-unknown'>?</span>",
    "answer": 15,
    "hint": "8 cộng 2 bằng 10, cộng 5"
  },
  {
    "equation": "7 + 4 = <span class='math-unknown'>?</span>",
    "answer": 11,
    "hint": "7 cộng 3 rồi cộng 1"
  },
  {
    "equation": "7 + 5 = <span class='math-unknown'>?</span>",
    "answer": 12,
    "hint": "7 cộng 3 rồi cộng 2"
  },
  {
    "equation": "7 + 6 = <span class='math-unknown'>?</span>",
    "answer": 13,
    "hint": "7 cộng 3 bằng 10, cộng 3"
  },
  {
    "equation": "7 + 7 = <span class='math-unknown'>?</span>",
    "answer": 14,
    "hint": "7 cộng 3 bằng 10, cộng 4"
  },
  {
    "equation": "6 + 5 = <span class='math-unknown'>?</span>",
    "answer": 11,
    "hint": "6 cộng 4 rồi cộng 1"
  },
  {
    "equation": "6 + 6 = <span class='math-unknown'>?</span>",
    "answer": 12,
    "hint": "6 cộng 4 rồi cộng 2"
  },
  {
    "equation": "6 + 7 = <span class='math-unknown'>?</span>",
    "answer": 13,
    "hint": "6 cộng 4 bằng 10, cộng 3"
  },
  {
    "equation": "11 - 2 = <span class='math-unknown'>?</span>",
    "answer": 9,
    "hint": "11 trừ 1 rồi trừ 1"
  },
  {
    "equation": "11 - 3 = <span class='math-unknown'>?</span>",
    "answer": 8,
    "hint": "11 trừ 1 rồi trừ 2"
  },
  {
    "equation": "11 - 4 = <span class='math-unknown'>?</span>",
    "answer": 7,
    "hint": "11 trừ 1 rồi trừ 3"
  },
  {
    "equation": "11 - 5 = <span class='math-unknown'>?</span>",
    "answer": 6,
    "hint": "11 trừ 1 rồi trừ 4"
  },
  {
    "equation": "12 - 3 = <span class='math-unknown'>?</span>",
    "answer": 9,
    "hint": "12 trừ 2 rồi trừ 1"
  },
  {
    "equation": "12 - 4 = <span class='math-unknown'>?</span>",
    "answer": 8,
    "hint": "12 trừ 2 rồi trừ 2"
  },
  {
    "equation": "12 - 5 = <span class='math-unknown'>?</span>",
    "answer": 7,
    "hint": "12 trừ 2 rồi trừ 3"
  },
  {
    "equation": "12 - 7 = <span class='math-unknown'>?</span>",
    "answer": 5,
    "hint": "12 trừ 2 rồi trừ 5"
  },
  {
    "equation": "13 - 4 = <span class='math-unknown'>?</span>",
    "answer": 9,
    "hint": "13 trừ 3 rồi trừ 1"
  },
  {
    "equation": "13 - 5 = <span class='math-unknown'>?</span>",
    "answer": 8,
    "hint": "13 trừ 3 rồi trừ 2"
  },
  {
    "equation": "13 - 6 = <span class='math-unknown'>?</span>",
    "answer": 7,
    "hint": "13 trừ 3 rồi trừ 3"
  },
  {
    "equation": "13 - 7 = <span class='math-unknown'>?</span>",
    "answer": 6,
    "hint": "13 trừ 3 rồi trừ 4"
  },
  {
    "equation": "14 - 5 = <span class='math-unknown'>?</span>",
    "answer": 9,
    "hint": "14 trừ 4 rồi trừ 1"
  },
  {
    "equation": "14 - 6 = <span class='math-unknown'>?</span>",
    "answer": 8,
    "hint": "14 trừ 4 rồi trừ 2"
  },
  {
    "equation": "14 - 8 = <span class='math-unknown'>?</span>",
    "answer": 6,
    "hint": "14 trừ 4 rồi trừ 4"
  },
  {
    "equation": "15 - 6 = <span class='math-unknown'>?</span>",
    "answer": 9,
    "hint": "15 trừ 5 rồi trừ 1"
  },
  {
    "equation": "15 - 7 = <span class='math-unknown'>?</span>",
    "answer": 8,
    "hint": "15 trừ 5 rồi trừ 2"
  },
  {
    "equation": "16 - 7 = <span class='math-unknown'>?</span>",
    "answer": 9,
    "hint": "16 trừ 6 rồi trừ 1"
  },
  {
    "equation": "16 - 8 = <span class='math-unknown'>?</span>",
    "answer": 8,
    "hint": "16 trừ 6 rồi trừ 2"
  },
  {
    "equation": "17 - 8 = <span class='math-unknown'>?</span>",
    "answer": 9,
    "hint": "17 trừ 7 rồi trừ 1"
  },
  {
    "equation": "17 - 9 = <span class='math-unknown'>?</span>",
    "answer": 8,
    "hint": "17 trừ 7 rồi trừ 2"
  },
  {
    "equation": "18 - 9 = <span class='math-unknown'>?</span>",
    "answer": 9,
    "hint": "18 trừ 8 rồi trừ 1"
  },
  {
    "equation": "6 + <span class='math-unknown'>?</span> = 11",
    "answer": 5,
    "hint": "6 cộng mấy để bằng 11?"
  },
  {
    "equation": "<span class='math-unknown'>?</span> + 8 = 15",
    "answer": 7,
    "hint": "Mấy cộng 8 để bằng 15?"
  },
  {
    "equation": "9 + <span class='math-unknown'>?</span> = 14",
    "answer": 5,
    "hint": "9 cộng mấy để bằng 14?"
  },
  {
    "equation": "7 + <span class='math-unknown'>?</span> = 12",
    "answer": 5,
    "hint": "7 cộng mấy để bằng 12?"
  },
  {
    "equation": "14 - <span class='math-unknown'>?</span> = 6",
    "answer": 8,
    "hint": "14 trừ mấy để bằng 6?"
  },
  {
    "equation": "<span class='math-unknown'>?</span> + 5 = 13",
    "answer": 8,
    "hint": "Mấy cộng 5 bằng 13?"
  },
  {
    "equation": "15 - <span class='math-unknown'>?</span> = 8",
    "answer": 7,
    "hint": "15 trừ mấy bằng 8?"
  },
  {
    "equation": "13 - <span class='math-unknown'>?</span> = 7",
    "answer": 6,
    "hint": "13 trừ mấy bằng 7?"
  },
  {
    "equation": "60 - 20 = <span class='math-unknown'>?</span>",
    "answer": 40,
    "hint": "6 chục trừ 2 chục bằng mấy chục?"
  },
  {
    "equation": "90 - 40 = <span class='math-unknown'>?</span>",
    "answer": 50,
    "hint": "9 chục trừ 4 chục bằng mấy chục?"
  },
  {
    "equation": "50 - 30 = <span class='math-unknown'>?</span>",
    "answer": 20,
    "hint": "5 chục trừ 3 chục"
  },
  {
    "equation": "80 - 30 = <span class='math-unknown'>?</span>",
    "answer": 50,
    "hint": "8 chục trừ 3 chục"
  },
  {
    "equation": "70 - 20 = <span class='math-unknown'>?</span>",
    "answer": 50,
    "hint": "7 chục trừ 2 chục"
  },
  {
    "equation": "30 + 40 = <span class='math-unknown'>?</span>",
    "answer": 70,
    "hint": "3 chục cộng 4 chục bằng mấy chục?"
  },
  {
    "equation": "50 + 20 = <span class='math-unknown'>?</span>",
    "answer": 70,
    "hint": "5 chục cộng 2 chục"
  },
  {
    "equation": "40 + 50 = <span class='math-unknown'>?</span>",
    "answer": 90,
    "hint": "4 chục cộng 5 chục"
  },
  {
    "equation": "<span class='math-unknown'>?</span> - 20 = 50",
    "answer": 70,
    "hint": "Số tròn chục nào trừ 20 bằng 50?"
  },
  {
    "equation": "<span class='math-unknown'>?</span> + 30 = 80",
    "answer": 50,
    "hint": "Mấy chục cộng 30 bằng 80?"
  },
  {
    "equation": "100 - 30 = <span class='math-unknown'>?</span>",
    "answer": 70,
    "hint": "10 chục trừ 3 chục bằng mấy chục?"
  }
];
