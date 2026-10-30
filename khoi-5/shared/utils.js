/**
 * KHOI 5 - UTILITIES & HELPERS
 * Toast thông báo, hiệu ứng viền màn hình đúng/sai, bắn pháo hoa và xuất Excel.
 */
const Khoi5Utils = (() => {
  /** Hiển thị thông báo Toast nổi */
  function toast(msg, ms = 2500, bg = 'var(--mint)') {
    let t = document.getElementById('global-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'global-toast';
      t.className = 'toast';
      document.body.appendChild(t);
    }
    t.innerHTML = msg;
    t.style.background = bg;
    t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('show'), ms);
  }

  /** Chớp viền sân khấu màu xanh khi đúng, đỏ khi sai */
  function flashStage(isCorrect, stageId = 'mainStage') {
    const stage = document.getElementById(stageId) || document.querySelector('.stage') || document.body;
    if (!stage) return;

    stage.classList.remove('flash-green', 'flash-red');
    void stage.offsetWidth; // Force reflow
    stage.classList.add(isCorrect ? 'flash-green' : 'flash-red');
    setTimeout(() => {
      stage.classList.remove('flash-green', 'flash-red');
    }, 500);
  }

  /** Bắn pháo hoa ăn mừng khi chiến thắng */
  function triggerConfetti() {
    if (typeof window.confetti === 'function') {
      window.confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      return;
    }
    // Fallback animation nếu không có canvas-confetti
    toast('🎉🎉🎉 CHÚC MỪNG CHIẾN THẮNG! 🎉🎉🎉', 3000, 'var(--yellow)');
  }

  /** Xuất bảng tổng kết ra file CSV chuẩn UTF-8 BOM */
  function exportExcel(fileName = 'Ket_Qua_Tiet_Hoc.csv', sheetName = 'Kết Quả', dataRows = []) {
    let name = fileName;
    if (typeof window.buildExportFileName === 'function' && (!fileName || fileName.includes('Ket_Qua_Tiet_Hoc'))) {
      name = window.buildExportFileName({ grade: 5, lesson: '01', classId: '5_1' });
    }
    if (name.toLowerCase().endsWith('.xlsx') || name.toLowerCase().endsWith('.xls')) {
      name = name.replace(/\.xlsx?$/i, '.csv');
    }

    try {
      if (typeof window.LessonExport !== 'undefined') {
        window.LessonExport.download(dataRows, name);
      } else {
        const rows = Array.isArray(dataRows) ? dataRows : [];
        let csv = '';
        if (rows.length > 0 && Array.isArray(rows[0])) {
          csv = rows.map(r => r.map(v => `"${String(v == null ? '' : v).replace(/"/g, '""')}"`).join(',')).join('\r\n');
        } else if (rows.length > 0) {
          const cols = Object.keys(rows[0]);
          csv = cols.join(',') + '\r\n' + rows.map(r => cols.map(c => `"${String(r[c] == null ? '' : r[c]).replace(/"/g, '""')}"`).join(',')).join('\r\n');
        }
        const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
      toast(`📥 Xuất file CSV thành công: ${name}`, 2000, 'var(--mint)');
    } catch (err) {
      console.error('Lỗi xuất file CSV:', err);
      toast('🚨 Lỗi khi xuất CSV!', 2500, 'var(--coral)');
    }
  }

  return {
    toast,
    flashStage,
    triggerConfetti,
    exportExcel,
    exportCsv: exportExcel
  };
})();

// Xuất ra window
window.Khoi5Utils = Khoi5Utils;
window.toast = Khoi5Utils.toast;
window.flashStage = Khoi5Utils.flashStage;
window.triggerConfetti = Khoi5Utils.triggerConfetti;
window.exportExcel = Khoi5Utils.exportExcel;

