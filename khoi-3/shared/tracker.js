/**
 * KHOI 3 - TRACKER & AUDIT LOG ENGINE
 * 
 * 1. Tính điểm và Xếp hạng chuẩn sư phạm (Xử lý Bằng điểm - Đồng hạng).
 * 2. Ghi nhật ký THẬT CHI TIẾT theo thứ tự thời gian.
 * 3. Xuất file Excel chuẩn thống nhất cho Khối 3 và TỰ ĐỘNG BẮN LÊN GOOGLE DRIVE:
 *    - Cú pháp tên file: KetQua_TinHoc3_Tiet{XX}_Lop{Lop}_{YYYYMMDD_HHmm}.xlsx
 *    - Sheet 1: "Bảng Xếp Hạng" (hoặc "Theo đội")
 *    - Sheet 2: "Nhật Ký Chi Tiết" (hoặc "Chi tiết")
 *    - Sheet 3: "Danh Sách Học Sinh" (hoặc "Theo học sinh")
 */

const Khoi3Tracker = (() => {
  let config = {
    lessonNumber: '06',
    className: '3_2',
    subject: 'Tin học 3'
  };

  let teams = [];
  let students = [];
  let timelineLogs = [];

  /** Khởi tạo tracker cho tiết học */
  function init(options = {}) {
    config.lessonNumber = String(options.lessonNumber || '06').padStart(2, '0');
    config.className = String(options.className || '3_2').replace(/[^a-zA-Z0-9]/g, '_');
    config.subject = options.subject || 'Tin học 3';

    if (Array.isArray(options.teams)) teams = options.teams;
    if (Array.isArray(options.students)) students = options.students;
    timelineLogs = [];
  }

  function setTeams(tList) {
    teams = tList;
  }

  function setStudents(sList) {
    students = sList;
  }

  function setClass(cName) {
    config.className = String(cName).replace(/[^a-zA-Z0-9]/g, '_');
  }

  /**
   * Ghi log sự kiện vào dòng thời gian chi tiết
   */
  function logAction({ teamName, studentName, studentId, action, question, answer, result, item = '', note = '' }) {
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

    const logEntry = {
      stt: timelineLogs.length + 1,
      time: timeStr,
      team: teamName || 'Toàn lớp',
      studentId: studentId || '',
      student: studentName || 'Chưa chọn',
      action: action || question || 'Hoạt động học tập',
      question: question || action || '',
      answer: answer || '',
      result: result || 'Hoàn thành',
      item: item || '',
      note: note
    };

    timelineLogs.push(logEntry);

    // Cập nhật vào danh sách học sinh (ưu tiên khớp chính xác theo studentId)
    if (studentName && studentName !== 'Chưa chọn') {
      const st = students.find(s => {
        if (studentId && (s.id === studentId || String(s.id) === String(studentId))) return true;
        const sName = typeof s === 'string' ? s : (s.displayName || s.name || '');
        return sName.toLowerCase() === studentName.toLowerCase();
      });
      if (st && st.actions) {
        st.actions.push(`[${timeStr}] ${action || question} (${result})`);
      }
    }

    return logEntry;
  }

  /**
   * Tính toán thứ hạng chuẩn sư phạm
   */
  function calculateRankings(teamList = null) {
    const list = teamList || teams;
    if (!list || !list.length) return [];

    const sorted = [...list].sort((a, b) => {
      const scoreB = typeof b.correct !== 'undefined' ? b.correct : (Number(b.score) || 0);
      const scoreA = typeof a.correct !== 'undefined' ? a.correct : (Number(a.score) || 0);
      return scoreB - scoreA;
    });

    const rankTemplates = [
      { rank: 1, medal: '🥇', title: 'QUÁN QUÂN', sharedTitle: 'ĐỒNG QUÁN QUÂN' },
      { rank: 2, medal: '🥈', title: 'Á QUÂN', sharedTitle: 'ĐỒNG Á QUÂN' },
      { rank: 3, medal: '🥉', title: 'HẠNG BA', sharedTitle: 'ĐỒNG HẠNG BA' },
      { rank: 4, medal: '🌟', title: 'KHUYẾN KHÍCH', sharedTitle: 'KHUYẾN KHÍCH' },
      { rank: 5, medal: '🎖️', title: 'NỖ LỰC', sharedTitle: 'NỖ LỰC' },
      { rank: 6, medal: '🎗️', title: 'GẮN KẾT', sharedTitle: 'GẮN KẾT' }
    ];

    let currentRankIdx = 0;
    return sorted.map((t, idx, arr) => {
      const score = typeof t.correct !== 'undefined' ? t.correct : (Number(t.score) || 0);
      const prevScore = idx > 0 ? (typeof arr[idx - 1].correct !== 'undefined' ? arr[idx - 1].correct : (Number(arr[idx - 1].score) || 0)) : null;

      if (idx > 0 && score === prevScore) {
        // Đồng hạng
      } else {
        currentRankIdx = idx;
      }

      const isShared = arr.filter(item => {
        const itemScore = typeof item.correct !== 'undefined' ? item.correct : (Number(item.score) || 0);
        return itemScore === score;
      }).length > 1;

      const tpl = rankTemplates[currentRankIdx] || rankTemplates[rankTemplates.length - 1];

      return {
        ...t,
        score,
        rank: currentRankIdx + 1,
        isShared,
        medal: tpl.medal,
        badge: isShared && currentRankIdx < 3 ? `👑 ${tpl.sharedTitle}` : `👑 ${tpl.title}`,
        title: isShared && currentRankIdx < 3 ? tpl.sharedTitle : tpl.title
      };
    });
  }

  /**
   * Tạo tên file Excel chuẩn cho Khối 3
   */
  function getStandardFileName(lessonNum = null, classKey = null) {
    const lNum = String(lessonNum || config.lessonNumber || '06').padStart(2, '0');
    const cKey = String(classKey || config.className || '3_2').replace(/[^a-zA-Z0-9]/g, '_');
    const d = new Date();
    const pad = n => String(n).padStart(2, '0');
    const timeStamp = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}`;
    return `KetQua_TinHoc3_Tiet${lNum}_Lop${cKey}_${timeStamp}.xlsx`;
  }

  /**
   * Xuất file Excel báo cáo (3 Sheets) và BẮN LÊN GOOGLE DRIVE
   */
  function exportDetailedExcel(customData = {}) {
    if (typeof window.XLSX === 'undefined') {
      alert('⚠️ Thư viện SheetJS (xlsx.full.min.js) chưa được nạp trên trang!');
      return;
    }

    const currentTeams = customData.teams || teams;
    const currentStudents = customData.students || students;
    const currentLogs = customData.logs || timelineLogs;
    const lopTxt = (config.className || '3_2').replace('_', '/');

    // Nếu người dùng cung cấp raw sheets sẵn (như ở tiet-06)
    if (customData.sheets && Array.isArray(customData.sheets)) {
      const wb = window.XLSX.utils.book_new();
      customData.sheets.forEach(([sheetName, data]) => {
        const ws = Array.isArray(data) && data.length > 0 && Array.isArray(data[0])
          ? window.XLSX.utils.aoa_to_sheet(data)
          : window.XLSX.utils.json_to_sheet(data);
        window.XLSX.utils.book_append_sheet(wb, ws, sheetName);
      });
      const fileName = customData.fileName || getStandardFileName();
      if (typeof window.uploadExcelToDrive === 'function') {
        window.uploadExcelToDrive(wb, fileName);
      } else {
        window.XLSX.writeFile(wb, fileName);
      }
      return;
    }

    const rankings = calculateRankings(currentTeams);

    // SHEET 1: BẢNG XẾP HẠNG
    const rankRows = [
      ['BẢNG XẾP HẠNG THI ĐUA TIẾT HỌC'],
      [`Môn: ${config.subject} | Tiết: ${config.lessonNumber} | Lớp: ${lopTxt}`],
      [''],
      ['Thứ Hạng', 'Huy Chương', 'Danh Hiệu', 'Tổ / Đội', 'Điểm / Câu Đúng', 'Đồng Hạng', 'Trạng Thái']
    ];

    rankings.forEach(r => {
      rankRows.push([
        `Hạng ${r.rank}`,
        r.medal,
        r.title,
        r.name,
        r.score,
        r.isShared ? 'Có (Đồng điểm)' : 'Không',
        r.won ? 'Hoàn thành máy tính PC' : 'Tích cực tham gia'
      ]);
    });

    const wsRank = window.XLSX.utils.aoa_to_sheet(rankRows);
    wsRank['!cols'] = [{ wch: 12 }, { wch: 12 }, { wch: 22 }, { wch: 18 }, { wch: 16 }, { wch: 16 }, { wch: 24 }];

    // SHEET 2: NHẬT KÝ CHI TIẾT
    const logRows = [
      ['NHẬT KÝ CHI TIẾT TIẾT HỌC (THEO THỜI GIAN)'],
      [`Môn: ${config.subject} | Tiết: ${config.lessonNumber} | Lớp: ${lopTxt}`],
      [''],
      ['STT', 'Thời Gian', 'Tổ / Đội', 'Mã HS', 'Học Sinh', 'Nhiệm Vụ / Câu Hỏi', 'Trả Lời', 'Kết Quả', 'Vật Phẩm']
    ];

    currentLogs.forEach((l, idx) => {
      logRows.push([
        idx + 1,
        l.time || '',
        l.team || '',
        l.studentId ? `HS${String(l.studentId).padStart(3, '0')}` : '',
        l.student || '',
        l.action || l.question || '',
        l.answer || '',
        l.result || '',
        l.item || ''
      ]);
    });

    const wsLogs = window.XLSX.utils.aoa_to_sheet(logRows);
    wsLogs['!cols'] = [{ wch: 6 }, { wch: 12 }, { wch: 14 }, { wch: 10 }, { wch: 24 }, { wch: 40 }, { wch: 24 }, { wch: 14 }, { wch: 16 }];

    // SHEET 3: DANH SÁCH HỌC SINH
    const stuRows = [
      ['DANH SÁCH HỌC SINH VÀ LỊCH SỬ THAM GIA'],
      [`Môn: ${config.subject} | Tiết: ${config.lessonNumber} | Lớp: ${lopTxt}`],
      [''],
      ['STT', 'Mã HS', 'Họ Và Tên', 'Tổ', 'Tổng Số Câu', 'Số Câu Đúng', 'Lịch Sử Hoạt Động']
    ];

    currentStudents.forEach((s, idx) => {
      const tName = s.team === null ? 'Chưa có tổ' : (currentTeams[s.team] ? currentTeams[s.team].name : `Tổ ${s.team + 1}`);
      const sName = typeof s === 'string' ? s : (s.displayName || s.name || `Học sinh ${idx + 1}`);
      stuRows.push([
        idx + 1,
        `HS${String(s.id || idx + 1).padStart(3, '0')}`,
        sName,
        tName,
        s.total || 0,
        s.correct || 0,
        (s.actions && s.actions.join('; ')) || 'Tham gia học tập tích cực'
      ]);
    });

    const wsStudents = window.XLSX.utils.aoa_to_sheet(stuRows);
    wsStudents['!cols'] = [{ wch: 6 }, { wch: 10 }, { wch: 28 }, { wch: 14 }, { wch: 14 }, { wch: 14 }, { wch: 80 }];

    // Tạo Workbook và đẩy lên Google Drive
    const wb = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(wb, wsRank, 'Bảng Xếp Hạng');
    window.XLSX.utils.book_append_sheet(wb, wsLogs, 'Nhật Ký Chi Tiết');
    window.XLSX.utils.book_append_sheet(wb, wsStudents, 'Danh Sách Học Sinh');

    const fileName = customData.fileName || getStandardFileName();
    if (typeof window.uploadExcelToDrive === 'function') {
      window.uploadExcelToDrive(wb, fileName);
    } else {
      window.XLSX.writeFile(wb, fileName);
      if (window.toast) {
        window.toast(`📥 Đã xuất file: ${fileName}`, 3000, 'var(--green)');
      } else {
        alert(`Đã xuất file báo cáo: ${fileName}`);
      }
    }
  }

  return {
    init,
    setTeams,
    setStudents,
    setClass,
    logAction,
    calculateRankings,
    getStandardFileName,
    exportDetailedExcel,
    getLogs: () => [...timelineLogs]
  };
})();

window.Khoi3Tracker = Khoi3Tracker;

