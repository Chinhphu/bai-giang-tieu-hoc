/**
 * KHOI 5 - TRACKER & DETAILED AUDIT LOG ENGINE
 * 
 * 1. Tính điểm và Xếp hạng chuẩn sư phạm (Xử lý Bằng điểm - Đồng hạng).
 * 2. Ghi nhật ký THẬT CHI TIẾT theo thứ tự thời gian (Ai trả lời, chuyện gì xảy ra, cộng/trừ bao nhiêu).
 * 3. Xuất file Excel chuẩn thống nhất cho tất cả các bài:
 *    - Cú pháp tên file: KetQua_TinHoc5_Tiet{XX}_Lop{Lop}_{YYYYMMDD_HHmm}.xlsx
 *    - Sheet 1: "Bảng Xếp Hạng" (Xếp hạng chuẩn đồng hạng, tổng điểm, danh hiệu)
 *    - Sheet 2: "Nhật Ký Chi Tiết" (Dòng thời gian sự kiện, học sinh, biến động điểm)
 *    - Sheet 3: "Danh Sách Học Sinh" (Thống kê lịch sử phát biểu từng em)
 */

const Khoi5Tracker = (() => {
  let config = {
    lessonNumber: '01',
    className: '5_1',
    subject: 'Tin học 5'
  };

  let teams = [];
  let students = [];
  let timelineLogs = [];

  /** Khởi tạo tracker cho tiết học */
  function init(options = {}) {
    config.lessonNumber = String(options.lessonNumber || '01').padStart(2, '0');
    config.className = String(options.className || '5_1').replace(/[^a-zA-Z0-9]/g, '_');
    config.subject = options.subject || 'Tin học 5';

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
   * @param {Object} logData
   *   - teamName: Tên đội/dãy
   *   - studentName: Tên học sinh trả lời
   *   - action: Tên thử thách, câu hỏi hoặc hành động
   *   - result: 'Đúng', 'Sai', 'Phạt mất trật tự', 'Mở túi mù'...
   *   - delta: Số điểm thay đổi (+10, -10, 0...)
   *   - currentScore: Điểm số sau sự kiện
   *   - note: Ghi chú thêm (tùy chọn)
   */
  function logAction({ teamName, studentName, action, result, delta, currentScore, note = '' }) {
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

    let deltaStr = '';
    if (typeof delta === 'number') {
      deltaStr = delta > 0 ? `+${delta}` : String(delta);
    } else if (delta) {
      deltaStr = String(delta);
    } else {
      deltaStr = '0';
    }

    const logEntry = {
      stt: timelineLogs.length + 1,
      time: timeStr,
      team: teamName || 'Toàn lớp',
      student: studentName || 'Chưa chọn',
      action: action || 'Hoạt động học tập',
      result: result || (Number(delta) > 0 ? 'Đúng' : (Number(delta) < 0 ? 'Phạt' : 'Hoàn thành')),
      delta: deltaStr,
      scoreAfter: typeof currentScore !== 'undefined' ? currentScore : '-',
      note: note
    };

    timelineLogs.push(logEntry);

    // Đồng thời cập nhật vào danh sách học sinh nếu tìm thấy em đó
    if (studentName && studentName !== 'Chưa chọn') {
      const st = students.find(s => {
        const sName = typeof s === 'string' ? s : (s.name || s.hoTen || '');
        return sName.toLowerCase() === studentName.toLowerCase();
      });
      if (st && st.actions) {
        st.actions.push(`[${timeStr}] ${action} (${deltaStr}đ)`);
      }
    }

    return logEntry;
  }

  /**
   * Tính toán thứ hạng CHUẨN SƯ PHẠM (Xử lý Bằng điểm -> Đồng hạng)
   * @param {Array} teamList - Danh sách các đội có thuộc tính { name, score, ... }
   * @returns {Array} Danh sách đã xếp hạng với { rank, medal, title, themeClass, isShared }
   */
  function calculateRankings(teamList = null) {
    const list = teamList || teams;
    if (!list || !list.length) return [];

    // Sắp xếp điểm giảm dần
    const sorted = [...list].sort((a, b) => (Number(b.score) || 0) - (Number(a.score) || 0));

    const rankTemplates = [
      { rank: 1, medal: '🥇', title: 'QUÁN QUÂN', sharedTitle: 'ĐỒNG QUÁN QUÂN', themeClass: 'rank-1' },
      { rank: 2, medal: '🥈', title: 'Á QUÂN', sharedTitle: 'ĐỒNG Á QUÂN', themeClass: 'rank-2' },
      { rank: 3, medal: '🥉', title: 'HẠNG BA', sharedTitle: 'ĐỒNG HẠNG BA', themeClass: 'rank-3' },
      { rank: 4, medal: '🌟', title: 'KHUYẾN KHÍCH', sharedTitle: 'KHUYẾN KHÍCH', themeClass: 'rank-4' },
      { rank: 5, medal: '🎖️', title: 'NỖ LỰC', sharedTitle: 'NỖ LỰC', themeClass: 'rank-5' },
      { rank: 6, medal: '🎗️', title: 'GẮN KẾT', sharedTitle: 'GẮN KẾT', themeClass: 'rank-6' }
    ];

    let currentRankIdx = 0;
    return sorted.map((t, idx, arr) => {
      const score = Number(t.score) || 0;
      // Nếu bằng điểm đội trước đó -> giữ nguyên rankIndex
      if (idx > 0 && score === (Number(arr[idx - 1].score) || 0)) {
        // Cùng thứ hạng với đội trước
      } else {
        currentRankIdx = idx;
      }

      // Đếm số lượng đội cùng điểm số này
      const isShared = arr.filter(item => (Number(item.score) || 0) === score).length > 1;
      const tpl = rankTemplates[currentRankIdx] || rankTemplates[rankTemplates.length - 1];

      return {
        ...t,
        score,
        rank: currentRankIdx + 1,
        isShared,
        medal: tpl.medal,
        badge: isShared && currentRankIdx < 3 ? `👑 ${tpl.sharedTitle}` : `👑 ${tpl.title}`,
        title: isShared && currentRankIdx < 3 ? tpl.sharedTitle : tpl.title,
        themeClass: tpl.themeClass
      };
    });
  }

  /**
   * Tạo tên file Excel theo cú pháp chuẩn duy nhất từ nay về sau
   * Cú pháp: KetQua_TinHoc5_Tiet{XX}_Lop{Lop}_{YYYYMMDD_HHmm}.xlsx
   */
  function getStandardFileName(lessonNum = null, classKey = null) {
    const lNum = String(lessonNum || config.lessonNumber || '01').padStart(2, '0');
    const cKey = String(classKey || config.className || '5_1').replace(/[^a-zA-Z0-9]/g, '_');
    const d = new Date();
    const pad = n => String(n).padStart(2, '0');
    const timeStamp = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}`;
    return `KetQua_TinHoc5_Tiet${lNum}_Lop${cKey}_${timeStamp}.xlsx`;
  }

  /**
   * Xuất file Excel THẬT CHI TIẾT (3 Sheets)
   * @param {Object} customData - Tùy chọn truyền bổ sung { teams, students, fileName }
   */
  function exportDetailedExcel(customData = {}) {
    if (typeof window.XLSX === 'undefined') {
      alert('⚠️ Thư viện SheetJS (xlsx.full.min.js) chưa được nạp trên trang!');
      return;
    }

    const currentTeams = customData.teams || teams;
    const currentStudents = customData.students || students;
    const rankings = calculateRankings(currentTeams);

    // ==========================================
    // SHEET 1: BẢNG XẾP HẠNG TỔNG KẾT
    // ==========================================
    const rankRows = [
      ['BẢNG XẾP HẠNG THI ĐUA TIẾT HỌC'],
      [`Môn: ${config.subject} | Tiết: ${config.lessonNumber} | Lớp: ${config.className.replace('_', '/')}`],
      [''],
      ['Thứ Hạng', 'Huy Chương', 'Danh Hiệu', 'Tổ / Dãy / Đội', 'Điểm Số', 'Đồng Hạng', 'Ghi Chú']
    ];

    rankings.forEach(r => {
      rankRows.push([
        `Hạng ${r.rank}`,
        r.medal,
        r.title,
        r.name,
        r.score,
        r.isShared ? 'Có (Đồng điểm)' : 'Không',
        r.won ? 'Đạt giải đặc biệt' : 'Hoàn thành xuất sắc'
      ]);
    });

    const wsRank = window.XLSX.utils.aoa_to_sheet(rankRows);
    wsRank['!cols'] = [{ wch: 12 }, { wch: 12 }, { wch: 22 }, { wch: 18 }, { wch: 12 }, { wch: 16 }, { wch: 24 }];

    // ==========================================
    // SHEET 2: NHẬT KÝ CHI TIẾT DÒNG THỜI GIAN
    // ==========================================
    const logRows = [
      ['NHẬT KÝ CHI TIẾT HOẠT ĐỘNG VÀ BIẾN ĐỘNG ĐIỂM SỐ THEO THỜI GIAN'],
      [`Thời gian xuất: ${new Date().toLocaleString('vi-VN')} | Tổng số sự kiện: ${timelineLogs.length}`],
      [''],
      ['STT', 'Thời Gian', 'Tổ / Dãy / Đội', 'Học Sinh Trả Lời', 'Nội Dung Sự Kiện / Thử Thách', 'Kết Quả', 'Biến Động Điểm', 'Điểm Sau Sự Kiện', 'Ghi Chú']
    ];

    if (timelineLogs.length === 0) {
      logRows.push(['1', '-', 'Toàn lớp', '-', 'Tiết học diễn ra tích cực', 'Hoàn thành', '0', '-', 'Không có sự cố vi phạm']);
    } else {
      timelineLogs.forEach(entry => {
        logRows.push([
          entry.stt,
          entry.time,
          entry.team,
          entry.student,
          entry.action,
          entry.result,
          entry.delta,
          entry.scoreAfter,
          entry.note || ''
        ]);
      });
    }

    const wsLogs = window.XLSX.utils.aoa_to_sheet(logRows);
    wsLogs['!cols'] = [
      { wch: 6 },  // STT
      { wch: 12 }, // Thời gian
      { wch: 18 }, // Đội
      { wch: 24 }, // Học sinh
      { wch: 38 }, // Nội dung
      { wch: 16 }, // Kết quả
      { wch: 16 }, // Điểm biến động
      { wch: 18 }, // Điểm sau sự kiện
      { wch: 25 }  // Ghi chú
    ];

    // ==========================================
    // SHEET 3: DANH SÁCH HỌC SINH & LỊCH SỬ PHÁT BIỂU
    // ==========================================
    const studentRows = [
      ['DANH SÁCH HỌC SINH VÀ LỊCH SỬ THAM GIA PHÁT BIỂU'],
      [`Lớp: ${config.className.replace('_', '/')} | Tổng số học sinh: ${currentStudents.length}`],
      [''],
      ['STT', 'Mã HS', 'Họ Và Tên', 'Lớp', 'Tổ / Đội', 'Số Lần Phát Biểu', 'Lịch Sử Chi Tiết']
    ];

    let sIndex = 1;
    currentStudents.forEach(s => {
      const name = typeof s === 'string' ? s : (s.name || s.hoTen || `Học sinh ${sIndex}`);
      const teamId = s.team;
      const teamObj = currentTeams.find((t, idx) => t.id === teamId || idx === teamId);
      const teamName = teamObj ? teamObj.name : (teamId !== null && teamId !== undefined ? `Tổ ${teamId + 1}` : 'Chưa xếp tổ');
      const actionList = Array.isArray(s.actions) ? s.actions : [];

      studentRows.push([
        sIndex,
        `HS${String(sIndex).padStart(3, '0')}`,
        name,
        config.className.replace('_', '/'),
        teamName,
        actionList.length,
        actionList.join('; ') || 'Tham gia học tập cùng tổ'
      ]);
      sIndex++;
    });

    const wsStudents = window.XLSX.utils.aoa_to_sheet(studentRows);
    wsStudents['!cols'] = [
      { wch: 6 },
      { wch: 10 },
      { wch: 26 },
      { wch: 10 },
      { wch: 18 },
      { wch: 18 },
      { wch: 60 }
    ];

    // Tạo Workbook và xuất file
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
        window.toast(`📥 Đã xuất file: ${fileName}`, 3000, 'var(--mint)');
      } else {
        alert(`Đã xuất file báo cáo chi tiết: ${fileName}`);
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

// Đưa ra window
window.Khoi5Tracker = Khoi5Tracker;

