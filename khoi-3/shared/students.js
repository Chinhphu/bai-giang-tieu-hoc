/**
 * KHOI 3 - STUDENTS ENGINE
 * Quản lý danh sách học sinh khối 3:
 * 1. Tự động tải từ JSON (lớp 3/1 -> 3/6 từ assets/data/students_3_2026_2027.json)
 * 2. Quay số / gọi ngẫu nhiên học sinh đại diện
 * 3. Ghi nhận phát biểu và thêm học sinh nhanh
 * (Không dùng import Excel - hoàn toàn dựa trên JSON chuẩn sư phạm)
 */

const Khoi3Students = (() => {
  let allStudents = [];
  let currentClassKey = '3_2';

  const DEFAULT_FALLBACK_NAMES = [
    'Nguyễn Khả Ái', 'Nguyễn Đức Anh', 'Nguyễn Quốc Anh', 'Trịnh Gia Bảo',
    'Ngô Hoàng Bảo Châu', 'Nguyễn Doanh Doanh', 'Phạm Đại Dũng', 'Danh Thành Đạt',
    'Võ Nghi Đình', 'Vũ Đoàn Nhã Hân', 'Vũ Hứa Chí Hiếu', 'Nguyễn Trần Gia Huy',
    'Đoàn Gia Hưng', 'Nguyễn Phúc Hưng', 'Đỗ Minh Khang', 'Đặng Nguyễn Quốc Khởi'
  ];

  function disambiguateNames(rawList) {
    if (!Array.isArray(rawList)) return [];
    const nameCounts = {};
    rawList.forEach(item => {
      const raw = typeof item === 'string' ? item : (item.name || item.hoTen || item.fullName || '');
      const trimmed = raw.trim();
      nameCounts[trimmed] = (nameCounts[trimmed] || 0) + 1;
    });

    const nameTracker = {};
    return rawList.map((item, idx) => {
      const raw = typeof item === 'string' ? item : (item.name || item.hoTen || item.fullName || `Học sinh ${idx + 1}`);
      const trimmed = raw.trim();
      let finalName = trimmed;
      if (nameCounts[trimmed] > 1 && !/\s*\([0-9A-Za-z]+\)$/.test(trimmed)) {
        nameTracker[trimmed] = (nameTracker[trimmed] || 0) + 1;
        finalName = `${trimmed} (${nameTracker[trimmed]})`;
      }
      return {
        id: idx + 1,
        name: finalName,
        rawName: trimmed,
        displayName: finalName,
        team: (typeof item === 'object' && item.team !== undefined) ? item.team : null,
        total: (typeof item === 'object' && item.total) || 0,
        correct: (typeof item === 'object' && item.correct) || 0,
        actions: (typeof item === 'object' && Array.isArray(item.actions)) ? item.actions : []
      };
    });
  }

  /** Tải danh sách học sinh theo mã lớp (ví dụ: '3_2', '3/2', ...) */
  async function loadStudents(classKey = '3_2') {
    currentClassKey = String(classKey).replace(/[^a-z0-9]/gi, '_').toLowerCase();

    try {
      const paths = [
        '../../assets/data/students_3_2026_2027.json',
        '../assets/data/students_3_2026_2027.json',
        '/assets/data/students_3_2026_2027.json'
      ];

      let rawData = null;
      for (const p of paths) {
        try {
          const res = await fetch(p);
          if (res.ok) {
            rawData = await res.json();
            break;
          }
        } catch (_) { }
      }

      if (rawData) {
        const norm = s => String(s).replace(/[^a-z0-9]/gi, '_').toLowerCase();
        let list = rawData[classKey] || rawData[currentClassKey] || rawData[norm(classKey)] || [];
        if (Array.isArray(list) && list.length > 0) {
          allStudents = disambiguateNames(list);
          return allStudents;
        }
      }
    } catch (err) {
      console.warn('Dùng danh sách học sinh dự phòng do lỗi tải JSON:', err);
    }

    // Fallback nếu không tải được JSON
    allStudents = disambiguateNames(DEFAULT_FALLBACK_NAMES);
    return allStudents;
  }

  /**
   * Tên hiển thị kèm số phân biệt nếu có học sinh trùng họ tên
   */
  function getStudentDisplayName(studentOrId) {
    let student = null;
    if (typeof studentOrId === 'object' && studentOrId !== null) {
      student = studentOrId;
    } else if (typeof studentOrId === 'number') {
      student = allStudents.find(s => s.id === studentOrId);
    } else if (typeof studentOrId === 'string') {
      student = allStudents.find(s => String(s.id) === studentOrId || s.name === studentOrId || s.displayName === studentOrId);
      if (!student) {
        student = allStudents.find(s => (s.rawName || s.name).toLowerCase() === studentOrId.toLowerCase());
      }
    }
    if (!student) return String(studentOrId || 'Chưa chọn');
    return student.displayName || student.name;
  }

  /**
   * Gọi ngẫu nhiên 1 học sinh
   * @param {number|null} teamIndex - Tổ cụ thể (nếu có)
   * @param {boolean} uncalledOnly - Ưu tiên các em chưa được gọi lần nào
   */
  function getRandomStudent(teamIndex = null, uncalledOnly = true) {
    let pool = allStudents;
    if (teamIndex !== null) {
      pool = pool.filter(s => s.team === teamIndex);
    }

    if (uncalledOnly) {
      const uncalled = pool.filter(s => (s.total || 0) === 0);
      if (uncalled.length > 0) pool = uncalled;
    }

    if (!pool.length) return null;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  /**
   * Ghi nhận câu trả lời của học sinh (nhận ID số, ID chuỗi hoặc tên phân biệt)
   */
  function recordStudentAnswer(studentIdOrName, isCorrect, actionName = 'Trả lời câu hỏi') {
    let student = null;
    if (typeof studentIdOrName === 'number') {
      student = allStudents.find(s => s.id === studentIdOrName);
    } else if (typeof studentIdOrName === 'string') {
      student = allStudents.find(s => String(s.id) === studentIdOrName || s.name === studentIdOrName || s.displayName === studentIdOrName);
    }
    if (!student) return;

    student.total = (student.total || 0) + 1;
    if (isCorrect) {
      student.correct = (student.correct || 0) + 1;
    }

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    student.actions.push(`[${timeStr}] ${actionName}: ${isCorrect ? 'Đúng' : 'Sai'}`);
  }

  /**
   * Thêm học sinh mới thủ công vào danh sách (tự động phân biệt nếu trùng tên)
   */
  function addStudent(name, teamIndex = null) {
    if (!name || !name.trim()) return null;
    const trimmed = name.trim();
    const sameNames = allStudents.filter(s => (s.rawName || s.name).toLowerCase() === trimmed.toLowerCase());
    let finalName = trimmed;
    if (sameNames.length > 0 && !/\s*\([0-9A-Za-z]+\)$/.test(trimmed)) {
      finalName = `${trimmed} (${sameNames.length + 1})`;
    }
    const newStudent = {
      id: allStudents.length ? Math.max(...allStudents.map(s => s.id || 0)) + 1 : 1,
      name: finalName,
      rawName: trimmed,
      displayName: finalName,
      team: teamIndex,
      total: 0,
      correct: 0,
      actions: []
    };
    allStudents.push(newStudent);
    return newStudent;
  }

  return {
    loadStudents,
    getStudentDisplayName,
    getRandomStudent,
    recordStudentAnswer,
    addStudent,
    getAllStudents: () => [...allStudents]
  };
})();

window.Khoi3Students = Khoi3Students;

