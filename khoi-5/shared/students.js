/**
 * KHOI 5 - STUDENTS ENGINE
 * Quản lý danh sách học sinh khối 5:
 * 1. Tự động tải từ JSON (lớp 5/1 -> 5/6)
 * 2. Nhập file Excel thông minh (.xlsx, .xls, .csv) tự nhận diện cột Họ & Tên
 * 3. Quay số / gọi ngẫu nhiên học sinh đại diện
 * 4. Ghi nhận phát biểu và thêm học sinh nhanh
 */
const Khoi5Students = (() => {
  let allStudents = [];
  let currentClassKey = '5_1';
  let importedExcelStudents = [];

  const DEFAULT_FALLBACK_NAMES = [
    'Ngô Phương Anh', 'Nguyễn Quốc Anh', 'Phạm Minh Anh', 'Đào Thiên Ân',
    'Trương Gia Bảo', 'Nguyễn Trọng Đức', 'Đỗ Hoàng Hiếu', 'Nguyễn Nhật Huy',
    'Dương Uyển Khanh', 'Trương Ngọc Lâm', 'Lâm Đường Vạn Lý', 'Mạc Kim Ngân',
    'Chu Dương Bảo Như', 'Phương Phú Quý', 'Bùi Quốc Thành', 'Trần Bảo Vy'
  ];

  /** Tải danh sách học sinh theo mã lớp (ví dụ: '5_1', '5/1', ...) */
  async function loadStudents(classKey = '5_1') {
    currentClassKey = String(classKey).replace(/[^a-z0-9]/gi, '_').toLowerCase();

    // Nếu giáo viên đã upload file Excel, ưu tiên dùng danh sách Excel
    if (importedExcelStudents && importedExcelStudents.length > 0) {
      allStudents = importedExcelStudents.map((name, idx) => ({
        id: idx + 1,
        name: typeof name === 'string' ? name : (name.name || `Học sinh ${idx + 1}`),
        team: null,
        actions: []
      }));
      return allStudents;
    }

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

  /**
   * Đọc và nhận diện thông minh danh sách học sinh từ file Excel do giáo viên nạp
   * @param {Event|File} inputOrEvent - Sự kiện onchange của input file hoặc đối tượng File
   * @returns {Promise<Array<string>>} Danh sách tên học sinh đã trích xuất
   */
  function handleExcelUpload(inputOrEvent) {
    return new Promise((resolve, reject) => {
      let file = null;
      if (inputOrEvent && inputOrEvent.target && inputOrEvent.target.files) {
        file = inputOrEvent.target.files[0];
      } else if (inputOrEvent instanceof File) {
        file = inputOrEvent;
      }

      if (!file) {
        resolve([]);
        return;
      }

      if (typeof window.XLSX === 'undefined') {
        const msg = '⚠️ Thư viện XLSX chưa được tải! Hãy nhúng thư viện xlsx.full.min.js';
        if (window.toast) window.toast(msg, 3000, 'var(--coral)');
        alert(msg);
        reject(new Error(msg));
        return;
      }

      const reader = new FileReader();
      reader.onload = function (e) {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = window.XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const json = window.XLSX.utils.sheet_to_json(sheet, { header: 1 });

          if (!json || json.length === 0) {
            if (window.toast) window.toast('⚠️ File Excel không có dữ liệu!', 2500, 'var(--coral)');
            resolve([]);
            return;
          }

          let nameColIdx = -1;
          let hoColIdx = -1;
          let tenColIdx = -1;
          let startRow = 0;

          // Quét tối đa 10 dòng đầu để tìm cột họ tên
          for (let r = 0; r < Math.min(json.length, 10); r++) {
            const row = json[r];
            if (!Array.isArray(row)) continue;
            for (let c = 0; c < row.length; c++) {
              const val = String(row[c] || '').trim().toLowerCase();
              if (val.includes('họ và tên') || val.includes('họ tên') || val === 'tên học sinh' || val === 'học sinh' || val === 'name') {
                nameColIdx = c;
                startRow = r + 1;
                break;
              }
              if (val === 'họ' || val.includes('họ lót') || val.includes('họ đệm')) {
                hoColIdx = c;
              }
              if (val === 'tên' || val === 'ten') {
                tenColIdx = c;
              }
            }
            if (nameColIdx !== -1 || (hoColIdx !== -1 && tenColIdx !== -1)) {
              startRow = r + 1;
              break;
            }
          }

          const extractedNames = [];
          for (let r = startRow; r < json.length; r++) {
            const row = json[r];
            if (!Array.isArray(row)) continue;
            let fullName = '';
            if (nameColIdx !== -1) {
              fullName = String(row[nameColIdx] || '').trim();
            } else if (hoColIdx !== -1 && tenColIdx !== -1) {
              const ho = String(row[hoColIdx] || '').trim();
              const ten = String(row[tenColIdx] || '').trim();
              fullName = (ho + ' ' + ten).trim();
            } else {
              // Tìm cột đầu tiên có chuỗi văn bản hợp lệ
              for (let c = 0; c < row.length; c++) {
                const str = String(row[c] || '').trim();
                if (str.length >= 3 && isNaN(str) && !str.includes('/') && !str.includes('@')) {
                  fullName = str;
                  break;
                }
              }
            }

            if (fullName && fullName.length >= 2 && !/^(stt|họ|tên|lớp|ghi chú|ngày sinh|năm sinh)/i.test(fullName)) {
              extractedNames.push(fullName);
            }
          }

          if (extractedNames.length > 0) {
            importedExcelStudents = extractedNames;
            allStudents = extractedNames.map((name, idx) => ({
              id: idx + 1,
              name,
              team: null,
              actions: []
            }));
            const msg = `✅ Đã nạp thành công ${extractedNames.length} học sinh từ file Excel!`;
            if (window.toast) window.toast(msg, 3000, 'var(--mint)');
            resolve(extractedNames);
          } else {
            if (window.toast) window.toast('⚠️ Không tìm thấy cột Họ tên hợp lệ trong file!', 3000, 'var(--coral)');
            resolve([]);
          }
        } catch (err) {
          console.error('Lỗi đọc Excel:', err);
          if (window.toast) window.toast('🚨 Lỗi khi xử lý file Excel!', 3000, 'var(--coral)');
          reject(err);
        }
      };
      reader.readAsArrayBuffer(file);
    });
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
    handleExcelUpload,
    getStudentDisplayName,
    getRandomStudent,
    recordStudentAnswer,
    addStudent,
    getAllStudents: () => [...allStudents],
    getImportedExcelStudents: () => [...importedExcelStudents]
  };
})();

// Xuất ra window
window.Khoi5Students = Khoi5Students;
window.loadStudents = Khoi5Students.loadStudents;
window.loadStudentList = Khoi5Students.loadStudents;
window.handleExcelUpload = Khoi5Students.handleExcelUpload;
window.getStudentDisplayName = Khoi5Students.getStudentDisplayName;
window.studentDisplayName = Khoi5Students.getStudentDisplayName;
