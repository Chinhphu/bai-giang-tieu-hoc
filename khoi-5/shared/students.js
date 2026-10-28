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
        actions: (typeof item === 'object' && Array.isArray(item.actions)) ? item.actions : []
      };
    });
  }

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

  /** Lấy tên hiển thị chuẩn xác, phân biệt rõ nếu trùng họ tên */
  function getStudentDisplayName(st) {
    if (!st) return '';
    if (typeof st === 'object' && (st.displayName || st.name)) return st.displayName || st.name;
    let student = null;
    if (typeof st === 'number') {
      student = allStudents.find(s => s.id === st);
    } else if (typeof st === 'string') {
      student = allStudents.find(s => String(s.id) === st || s.name === st || s.displayName === st);
      if (!student) student = allStudents.find(s => (s.rawName || s.name).toLowerCase() === st.toLowerCase());
    }
    if (student) return student.displayName || student.name;
    return String(st);
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

  /** Thêm nhanh một học sinh mới (tự động phân biệt nếu trùng tên) */
  function addStudent(name, teamId = null) {
    if (!name || !name.trim()) return null;
    const trimmed = name.trim();
    const sameNames = allStudents.filter(s => (s.rawName || s.name).toLowerCase() === trimmed.toLowerCase());
    let finalName = trimmed;
    if (sameNames.length > 0 && !/\s*\([0-9A-Za-z]+\)$/.test(trimmed)) {
      finalName = `${trimmed} (${sameNames.length + 1})`;
    }
    const newSt = {
      id: allStudents.length ? Math.max(...allStudents.map(s => s.id || 0)) + 1 : 1,
      name: finalName,
      rawName: trimmed,
      displayName: finalName,
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
