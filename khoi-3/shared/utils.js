/**
 * KHOI 3 - UTILITIES & HELPERS
 * Toast thông báo, pháo hoa, xáo trộn mảng, đồng hồ đếm giờ và xuất Excel đẩy lên GDrive.
 */
const Khoi3Utils = (() => {
  /** Thoát ký tự HTML an toàn */
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, c => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[c]));
  }

  /** Xáo trộn mảng ngẫu nhiên (Fisher-Yates) */
  function shuffle(array) {
    const a = array.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /** Bắn pháo hoa ăn mừng */
  function triggerConfetti(count = 50) {
    if (typeof window.confetti === 'function') {
      window.confetti({
        particleCount: count,
        spread: 70,
        origin: { y: 0.6 }
      });
      return;
    }
    // Fallback animation DOM nếu chưa có thư viện
    const emojis = ['🎉', '✨', '⭐', '🎈', '💖'];
    for (let i = 0; i < 30; i++) {
      const d = document.createElement('div');
      d.className = 'cf';
      d.innerText = emojis[Math.floor(Math.random() * emojis.length)];
      d.style.setProperty('--x', (Math.random() * 80 - 40) + 'vw');
      d.style.setProperty('--y', (Math.random() * 80 - 40) + 'vh');
      d.style.setProperty('--r', (Math.random() * 720 - 360) + 'deg');
      document.body.appendChild(d);
      setTimeout(() => d.remove(), 1600);
    }
  }

  /**
   * Xuất file CSV và TỰ ĐỘNG ĐỒNG BỘ LÊN GOOGLE DRIVE
   */
  function exportExcel(fileName = 'KetQua_TinHoc3.csv', sheetName = 'Kết Quả', dataRows = []) {
    let name = fileName;
    if (typeof window.buildExportFileName === 'function' && (!fileName || fileName.includes('KetQua_TinHoc3'))) {
      name = window.buildExportFileName({ grade: 3, lesson: '06', classId: '3_1' });
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
      if (window.toast) window.toast(`📥 Xuất file CSV thành công: ${name}`, 2000, 'var(--green)');
    } catch (err) {
      console.error('Lỗi xuất CSV:', err);
      if (window.toast) window.toast('🚨 Lỗi khi xuất CSV!', 2500, 'var(--red)');
    }
  }

  return {
    escapeHtml,
    shuffle,
    triggerConfetti,
    exportExcel,
    exportCsv: exportExcel
  };
})();

window.Khoi3Utils = Khoi3Utils;
window.confetti = window.confetti || Khoi3Utils.triggerConfetti;

