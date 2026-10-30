/**
 * KHOI 3 - TRACKER & AUDIT LOG ENGINE
 * 
 * 1. Tính điểm và Xếp hạng chuẩn sư phạm (Xử lý Bằng điểm - Đồng hạng).
 * 2. Ghi nhật ký THẬT CHI TIẾT theo thứ tự thời gian.
 * 3. Xuất file CSV chuẩn thống nhất cho Khối 3 và TỰ ĐỘNG BẮN LÊN GOOGLE DRIVE:
 *    - Cú pháp tên file: KetQua_TinHoc3_Lop_{Lop}_Tiet_{Tiet}_{HH}h{MM}p{SS}s_Ngay_{DD}-{MM}-{YYYY}.csv
 *    - Phần 1: "Bảng Xếp Hạng" (hoặc "Theo đội")
 *    - Phần 2: "Nhật Ký Chi Tiết" (hoặc "Chi tiết")
 *    - Phần 3: "Danh Sách Học Sinh" (hoặc "Theo học sinh")
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
   * Tạo tên file CSV chuẩn thống nhất cho Khối 3
   * Định dạng: KetQua_TinHoc3_Lop_{Lop}_Tiet_{Tiet}_{HH}h{MM}p{SS}s_Ngay_{DD}-{MM}-{YYYY}.csv
   */
  function getStandardFileName(lessonNum = null, classKey = null) {
    if (typeof window.buildExportFileName === 'function') {
      return window.buildExportFileName({
        grade: 3,
        classId: classKey || config.className || '3_2',
        lesson: lessonNum || config.lessonNumber || '06'
      });
    }
    const lNum = String(lessonNum || config.lessonNumber || '06').padStart(2, '0');
    const cKey = String(classKey || config.className || '3_2').replace(/^(?:l[oớ]p)[_\s-]*/i, '').replace(/[\/_]/g, '-').replace(/[^a-zA-Z0-9\-]/g, '');
    const d = new Date(), pad = n => String(n).padStart(2, '0');
    const timeStr = `${pad(d.getHours())}h${pad(d.getMinutes())}p${pad(d.getSeconds())}s`;
    const dateStr = `Ngay_${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}`;
    return `KetQua_TinHoc3_Lop_${cKey}_Tiet_${lNum}_${timeStr}_${dateStr}.csv`;
  }

  /**
   * Xuất file CSV báo cáo chi tiết và ĐỒNG BỘ LÊN GOOGLE DRIVE
   */
  function exportDetailedExcel(customData = {}) {
    const currentTeams = customData.teams || teams;
    const currentStudents = customData.students || students;
    const currentLogs = customData.logs || timelineLogs;
    const lopTxt = (config.className || '3_2').replace('_', '/');

    // Nếu người dùng cung cấp raw sheets sẵn
    if (customData.sheets && Array.isArray(customData.sheets)) {
      const fileName = customData.fileName || getStandardFileName();
      if (typeof window.uploadCsvToDrive === 'function') {
        window.uploadCsvToDrive(customData.sheets, fileName);
      } else if (typeof window.LessonExport !== 'undefined') {
        window.LessonExport.download(customData.sheets, fileName);
        if (window.toast) window.toast(`📥 Đã xuất file CSV: ${fileName}`, 3000, 'var(--green)');
      }
      return;
    }

    const rankings = calculateRankings(currentTeams);

    // PHẦN 1: BẢNG XẾP HẠNG
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

    // PHẦN 2: NHẬT KÝ CHI TIẾT
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

    // PHẦN 3: DANH SÁCH HỌC SINH
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

    const sections = [
      ['Bảng Xếp Hạng Thi Đua', rankRows],
      ['Nhật Ký Chi Tiết', logRows],
      ['Danh Sách Học Sinh', stuRows]
    ];

    const fileName = customData.fileName || getStandardFileName();
    if (typeof window.uploadCsvToDrive === 'function') {
      window.uploadCsvToDrive(sections, fileName);
    } else if (typeof window.LessonExport !== 'undefined') {
      window.LessonExport.download(sections, fileName);
      if (window.toast) {
        window.toast(`📥 Đã xuất file CSV: ${fileName}`, 3000, 'var(--green)');
      } else {
        alert(`Đã xuất file báo cáo CSV: ${fileName}`);
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
    exportDetailedCsv: exportDetailedExcel,
    getLogs: () => [...timelineLogs]
  };
})();

window.Khoi3Tracker = Khoi3Tracker;

