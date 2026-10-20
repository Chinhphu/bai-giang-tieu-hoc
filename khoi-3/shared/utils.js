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
   * Xuất file Excel và TỰ ĐỘNG BẮN LÊN GOOGLE DRIVE
   */
  function exportExcel(fileName = 'KetQua_TinHoc3.xlsx', sheetName = 'Kết Quả', dataRows = []) {
    if (typeof window.XLSX === 'undefined') {
      if (window.toast) window.toast('⚠️ Thư viện XLSX chưa được nạp!', 2500, 'var(--red)');
      else alert('Chưa nạp thư viện XLSX!');
      return;
    }

    try {
      const wb = window.XLSX.utils.book_new();
      const ws = Array.isArray(dataRows) && dataRows.length > 0 && Array.isArray(dataRows[0])
        ? window.XLSX.utils.aoa_to_sheet(dataRows)
        : window.XLSX.utils.json_to_sheet(dataRows);
      window.XLSX.utils.book_append_sheet(wb, ws, sheetName);

      if (typeof window.uploadExcelToDrive === 'function') {
        window.uploadExcelToDrive(wb, fileName);
      } else {
        window.XLSX.writeFile(wb, fileName);
        if (window.toast) window.toast('📥 Xuất file Excel thành công!', 2000, 'var(--green)');
      }
    } catch (err) {
      console.error('Lỗi xuất Excel:', err);
      if (window.toast) window.toast('🚨 Lỗi khi xuất Excel!', 2500, 'var(--red)');
    }
  }

  return {
    escapeHtml,
    shuffle,
    triggerConfetti,
    exportExcel
  };
})();

window.Khoi3Utils = Khoi3Utils;
window.confetti = window.confetti || Khoi3Utils.triggerConfetti;

