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
          allStudents = list.map((item, idx) => ({
            id: idx + 1,
            name: typeof item === 'string' ? item : (item.name || item.hoTen || item.fullName || `Học sinh ${idx + 1}`),
            team: null,
            total: 0,
            correct: 0,
            actions: []
          }));
          return allStudents;
        }
      }
    } catch (err) {
      console.warn('Dùng danh sách học sinh dự phòng do lỗi tải JSON:', err);
    }

    // Fallback nếu không tải được JSON
    allStudents = DEFAULT_FALLBACK_NAMES.map((name, idx) => ({
      id: idx + 1,
      name,
      team: null,
      total: 0,
      correct: 0,
      actions: []
    }));
    return allStudents;
  }

  /**
   * Tên hiển thị kèm số phân biệt nếu có học sinh trùng họ tên
   */
  function getStudentDisplayName(studentOrId) {
    let student = studentOrId;
    if (typeof studentOrId === 'number' || typeof studentOrId === 'string') {
      student = allStudents.find(s => s.id === studentOrId || s.name === studentOrId);
    }
    if (!student) return String(studentOrId || 'Chưa chọn');

    const sameNameList = allStudents.filter(s => s.name.toLowerCase().trim() === student.name.toLowerCase().trim());
    if (sameNameList.length <= 1) return student.name;

    const matchIndex = sameNameList.findIndex(s => s.id === student.id);
    return `${student.name} (${matchIndex >= 0 ? matchIndex + 1 : 1})`;
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
   * Ghi nhận câu trả lời của học sinh
   */
  function recordStudentAnswer(studentId, isCorrect, actionName = 'Trả lời câu hỏi') {
    const student = allStudents.find(s => s.id === studentId);
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
   * Thêm học sinh mới thủ công vào danh sách
   */
  function addStudent(name, teamIndex = null) {
    if (!name || !name.trim()) return null;
    const newStudent = {
      id: allStudents.length ? Math.max(...allStudents.map(s => s.id || 0)) + 1 : 1,
      name: name.trim(),
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

