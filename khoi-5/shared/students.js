/**
 * KHOI 5 - STUDENTS ENGINE
 * Quản lý danh sách học sinh khối 5:
 * 1. Tự động tải từ JSON (lớp 5/1 -> 5/6)
 * 3. Quay số / gọi ngẫu nhiên học sinh đại diện
 * 4. Ghi nhận phát biểu và thêm học sinh nhanh
 */
const Khoi5Students = (() => {
  let allStudents = [];
  let currentClassKey = '5_1';

  const DEFAULT_FALLBACK_NAMES = [
    'Ngô Phương Anh', 'Nguyễn Quốc Anh', 'Phạm Minh Anh', 'Đào Thiên Ân',
    'Trương Gia Bảo', 'Nguyễn Trọng Đức', 'Đỗ Hoàng Hiếu', 'Nguyễn Nhật Huy',
    'Dương Uyển Khanh', 'Trương Ngọc Lâm', 'Lâm Đường Vạn Lý', 'Mạc Kim Ngân',
    'Chu Dương Bảo Như', 'Phương Phú Quý', 'Bùi Quốc Thành', 'Trần Bảo Vy'
  ];

  /** Tải danh sách học sinh theo mã lớp (ví dụ: '5_1', '5/1', ...) */
  async function loadStudents(classKey = '5_1') {
    currentClassKey = String(classKey).replace(/[^a-z0-9]/gi, '_').toLowerCase();

    try {
      const paths = [
        '../../assets/data/students_5_2026_2027.json',
        '../assets/data/students_5_2026_2027.json',
        '/assets/data/students_5_2026_2027.json'
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
      actions: []
    }));
    return allStudents;
  }

  /** Lấy tên hiển thị gọn gàng (rút gọn họ nếu cần) */
  function getStudentDisplayName(st) {
    if (!st) return '';
    const name = typeof st === 'string' ? st : (st.name || '');
    const parts = name.trim().split(/\s+/);
    if (parts.length <= 2) return name;
    return `${parts[0]} ${parts[parts.length - 1]}`;
  }

  /** Chọn ngẫu nhiên một bạn học sinh */
  function getRandomStudent(teamId = null) {
    let pool = allStudents;
    if (teamId !== null) {
      pool = allStudents.filter(s => s.team === teamId);
    }
    if (!pool.length) pool = allStudents;
    if (!pool.length) return null;

    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex];
  }

  /** Ghi nhận câu trả lời / hành động của học sinh */
  function recordStudentAnswer(studentId, text) {
    const st = allStudents.find(s => s.id === studentId);
    if (st) {
      st.actions.push(text);
      return true;
    }
    return false;
  }

  /** Thêm nhanh một học sinh mới */
  function addStudent(name, teamId = null) {
    if (!name || !name.trim()) return null;
    const newSt = {
      id: allStudents.length + 1,
      name: name.trim(),
      team: teamId,
      actions: []
    };
    allStudents.push(newSt);
    return newSt;
  }

  return {
    loadStudents,
    getStudentDisplayName,
    getRandomStudent,
    recordStudentAnswer,
    addStudent,
    getAllStudents: () => [...allStudents],
  };
})();

// Xuất ra window
window.Khoi5Students = Khoi5Students;
window.loadStudents = Khoi5Students.loadStudents;
window.loadStudentList = Khoi5Students.loadStudents;
window.getStudentDisplayName = Khoi5Students.getStudentDisplayName;
window.studentDisplayName = Khoi5Students.getStudentDisplayName;
