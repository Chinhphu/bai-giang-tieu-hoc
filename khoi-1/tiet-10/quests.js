/**
 * DỮ LIỆU CÂU HỎI TIẾT 10 KHỐI 1
 * Game: ĐOÀN TÀU BẤT TẬN: VỀ GA KHO BÁU
 * 
 * 2 Dạng câu hỏi xáo trộn liên tục:
 * - Dạng 1 (Đã giảm độ khó): Sắp xếp 3 số LIÊN TIẾP bị đảo lộn từ Bé đến Lớn (type: "sort")
 * - Dạng 2: Tìm số liền kề / số còn thiếu vào toa ? (type: "missing")
 * Kèm bộ sinh câu hỏi vô tận (endless generator) phạm vi số 0 - 10.
 */

(function () {
  const PRESET_QUESTS = [
    // --- Dạng 1: Sắp xếp bé đến lớn (3 số liên tiếp) ---
    { id: "q_sort_01", type: "sort", numbers: [2, 1, 3], title: "Bấm toa từ BÉ đến LỚN" },
    { id: "q_sort_02", type: "sort", numbers: [5, 4, 6], title: "Bấm toa từ BÉ đến LỚN" },
    { id: "q_sort_03", type: "sort", numbers: [9, 8, 10], title: "Bấm toa từ BÉ đến LỚN" },
    { id: "q_sort_04", type: "sort", numbers: [1, 3, 2], title: "Bấm toa từ BÉ đến LỚN" },
    { id: "q_sort_05", type: "sort", numbers: [6, 5, 7], title: "Bấm toa từ BÉ đến LỚN" },
    { id: "q_sort_06", type: "sort", numbers: [3, 2, 4], title: "Bấm toa từ BÉ đến LỚN" },
    { id: "q_sort_07", type: "sort", numbers: [8, 7, 9], title: "Bấm toa từ BÉ đến LỚN" },
    { id: "q_sort_08", type: "sort", numbers: [4, 6, 5], title: "Bấm toa từ BÉ đến LỚN" },
    { id: "q_sort_09", type: "sort", numbers: [2, 4, 3], title: "Bấm toa từ BÉ đến LỚN" },
    { id: "q_sort_10", type: "sort", numbers: [7, 6, 8], title: "Bấm toa từ BÉ đến LỚN" },
    { id: "q_sort_11", type: "sort", numbers: [10, 8, 9], title: "Bấm toa từ BÉ đến LỚN" },
    { id: "q_sort_12", type: "sort", numbers: [5, 7, 6], title: "Bấm toa từ BÉ đến LỚN" },
    { id: "q_sort_13", type: "sort", numbers: [1, 0, 2], title: "Bấm toa từ BÉ đến LỚN" },
    { id: "q_sort_14", type: "sort", numbers: [4, 3, 5], title: "Bấm toa từ BÉ đến LỚN" },
    { id: "q_sort_15", type: "sort", numbers: [8, 10, 9], title: "Bấm toa từ BÉ đến LỚN" },
    { id: "q_sort_16", type: "sort", numbers: [3, 5, 4], title: "Bấm toa từ BÉ đến LỚN" },
    { id: "q_sort_17", type: "sort", numbers: [6, 8, 7], title: "Bấm toa từ BÉ đến LỚN" },
    { id: "q_sort_18", type: "sort", numbers: [2, 0, 1], title: "Bấm toa từ BÉ đến LỚN" },
    { id: "q_sort_19", type: "sort", numbers: [7, 9, 8], title: "Bấm toa từ BÉ đến LỚN" },
    { id: "q_sort_20", type: "sort", numbers: [5, 3, 4], title: "Bấm toa từ BÉ đến LỚN" },
    { id: "q_sort_21", type: "sort", numbers: [9, 7, 8], title: "Bấm toa từ BÉ đến LỚN" },
    { id: "q_sort_22", type: "sort", numbers: [4, 2, 3], title: "Bấm toa từ BÉ đến LỚN" },
    { id: "q_sort_23", type: "sort", numbers: [8, 6, 7], title: "Bấm toa từ BÉ đến LỚN" },
    { id: "q_sort_24", type: "sort", numbers: [1, 2, 0], title: "Bấm toa từ BÉ đến LỚN" },
    { id: "q_sort_25", type: "sort", numbers: [6, 4, 5], title: "Bấm toa từ BÉ đến LỚN" },

    // --- Dạng 2: Tìm số liền kề / khuyết toa (type: "missing") ---
    { id: "q_miss_01", type: "missing", train: [4, null, 6], options: [5, 7, 3], correct: 5, title: "Tìm số vào toa ?" },
    { id: "q_miss_02", type: "missing", train: [1, 2, null], options: [3, 5, 0], correct: 3, title: "Tìm số vào toa ?" },
    { id: "q_miss_03", type: "missing", train: [null, 8, 9], options: [7, 6, 10], correct: 7, title: "Tìm số vào toa ?" },
    { id: "q_miss_04", type: "missing", train: [6, 7, null], options: [8, 5, 9], correct: 8, title: "Tìm số vào toa ?" },
    { id: "q_miss_05", type: "missing", train: [null, 2, 3], options: [1, 4, 0], correct: 1, title: "Tìm số vào toa ?" },
    { id: "q_miss_06", type: "missing", train: [7, null, 9], options: [8, 6, 10], correct: 8, title: "Tìm số vào toa ?" },
    { id: "q_miss_07", type: "missing", train: [3, 4, null], options: [5, 2, 6], correct: 5, title: "Tìm số vào toa ?" },
    { id: "q_miss_08", type: "missing", train: [null, 5, 6], options: [4, 7, 3], correct: 4, title: "Tìm số vào toa ?" },
    { id: "q_miss_09", type: "missing", train: [2, null, 4], options: [3, 5, 1], correct: 3, title: "Tìm số vào toa ?" },
    { id: "q_miss_10", type: "missing", train: [8, 9, null], options: [10, 7, 6], correct: 10, title: "Tìm số vào toa ?" },
    { id: "q_miss_11", type: "missing", train: [null, 3, 4], options: [2, 5, 1], correct: 2, title: "Tìm số vào toa ?" },
    { id: "q_miss_12", type: "missing", train: [5, null, 7], options: [6, 4, 8], correct: 6, title: "Tìm số vào toa ?" },
    { id: "q_miss_13", type: "missing", train: [7, 8, null], options: [9, 6, 10], correct: 9, title: "Tìm số vào toa ?" },
    { id: "q_miss_14", type: "missing", train: [null, 9, 10], options: [8, 7, 6], correct: 8, title: "Tìm số vào toa ?" },
    { id: "q_miss_15", type: "missing", train: [3, null, 5], options: [4, 6, 2], correct: 4, title: "Tìm số vào toa ?" },
    { id: "q_miss_16", type: "missing", train: [0, 1, null], options: [2, 3, 4], correct: 2, title: "Tìm số vào toa ?" },
    { id: "q_miss_17", type: "missing", train: [null, 6, 7], options: [5, 8, 4], correct: 5, title: "Tìm số vào toa ?" },
    { id: "q_miss_18", type: "missing", train: [6, null, 8], options: [7, 5, 9], correct: 7, title: "Tìm số vào toa ?" },
    { id: "q_miss_19", type: "missing", train: [null, 4, 5], options: [3, 6, 2], correct: 3, title: "Tìm số vào toa ?" },
    { id: "q_miss_20", type: "missing", train: [4, 5, null], options: [6, 3, 7], correct: 6, title: "Tìm số vào toa ?" },
    { id: "q_miss_21", type: "missing", train: [null, 7, 8], options: [6, 9, 5], correct: 6, title: "Tìm số vào toa ?" },
    { id: "q_miss_22", type: "missing", train: [1, null, 3], options: [2, 4, 0], correct: 2, title: "Tìm số vào toa ?" },
    { id: "q_miss_23", type: "missing", train: [5, 6, null], options: [7, 4, 8], correct: 7, title: "Tìm số vào toa ?" },
    { id: "q_miss_24", type: "missing", train: [null, 1, 2], options: [0, 3, 4], correct: 0, title: "Tìm số vào toa ?" },
    { id: "q_miss_25", type: "missing", train: [8, null, 10], options: [9, 7, 6], correct: 9, title: "Tìm số vào toa ?" }
  ];

  // Hàm sinh câu hỏi Dạng 1 ngẫu nhiên (3 số LIÊN TIẾP xáo trộn)
  function generateSortQuest() {
    // Lấy số bắt đầu từ 0 đến 8 để mảng luôn nằm trong khoảng 0-10
    const start = Math.floor(Math.random() * 9); 
    const nums = [start, start + 1, start + 2];
    
    let shuffled;
    // Đảm bảo sau khi xáo trộn không bị trùng đúng thứ tự tăng dần
    do {
      shuffled = [...nums].sort(() => Math.random() - 0.5);
    } while (shuffled[0] === nums[0] && shuffled[1] === nums[1] && shuffled[2] === nums[2]);

    return {
      id: "gen_sort_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
      type: "sort",
      numbers: shuffled,
      title: "Bấm toa từ BÉ đến LỚN"
    };
  }

  // Hàm sinh câu hỏi Dạng 2 ngẫu nhiên (Tìm số liền kề)
  function generateMissingQuest() {
    const start = Math.floor(Math.random() * 9); // 0 đến 8
    const sequence = [start, start + 1, start + 2];
    const missingIndex = Math.floor(Math.random() * 3); // 0, 1, hoặc 2
    const correct = sequence[missingIndex];
    
    const train = [...sequence];
    train[missingIndex] = null;

    const options = [correct];
    while (options.length < 3) {
      let distract;
      const offset = (Math.random() < 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1);
      distract = correct + offset;
      if (distract < 0) distract = correct + 2;
      if (distract > 10) distract = correct - 2;
      if (distract >= 0 && distract <= 10 && !options.includes(distract)) {
        options.push(distract);
      } else {
        const fallback = Math.floor(Math.random() * 11);
        if (!options.includes(fallback)) options.push(fallback);
      }
    }
    options.sort(() => Math.random() - 0.5);

    return {
      id: "gen_miss_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
      type: "missing",
      train: train,
      options: options,
      correct: correct,
      title: "Tìm số vào toa ?"
    };
  }

  // Quản lý kho câu hỏi xáo trộn liên tục 2 dạng
  class QuestManager {
    constructor() {
      this.history = [];
      this.lastType = null;
      this.presetSort = PRESET_QUESTS.filter(q => q.type === "sort");
      this.presetMissing = PRESET_QUESTS.filter(q => q.type === "missing");
      this.sortIndex = 0;
      this.missingIndex = 0;
    }

    getNextQuest(index = 0) {
      // Ưu tiên xen kẽ: Dạng 1 -> Dạng 2 -> Dạng 1 -> Dạng 2...
      const nextType = this.lastType === "sort" ? "missing" : "sort";
      this.lastType = nextType;

      let quest;
      if (nextType === "sort") {
        if (this.sortIndex < this.presetSort.length) {
          quest = this.presetSort[this.sortIndex++];
        } else {
          quest = generateSortQuest();
        }
      } else {
        if (this.missingIndex < this.presetMissing.length) {
          quest = this.presetMissing[this.missingIndex++];
        } else {
          quest = generateMissingQuest();
        }
      }
      this.history.push(quest);
      return quest;
    }

    getPresetQuests() {
      return PRESET_QUESTS;
    }
  }

  window.QUESTS_DATA = PRESET_QUESTS;
  window.generateSortQuest = generateSortQuest;
  window.generateMissingQuest = generateMissingQuest;
  window.QuestManager = QuestManager;
})();