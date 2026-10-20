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

  /** Xuất bảng tổng kết ra file Excel (sử dụng SheetJS nếu có) */
  function exportExcel(fileName = 'Ket_Qua_Tiet_Hoc.xlsx', sheetName = 'Kết Quả', dataRows = []) {
    if (typeof window.XLSX === 'undefined') {
      toast('⚠️ Thư viện XLSX chưa được tải!', 2000, 'var(--coral)');
      return;
    }
    try {
      const wb = window.XLSX.utils.book_new();
      const ws = window.XLSX.utils.json_to_sheet(dataRows);
      window.XLSX.utils.book_append_sheet(wb, ws, sheetName);
      window.XLSX.writeFile(wb, fileName);
      toast('📥 Xuất file Excel thành công!', 2000, 'var(--mint)');
    } catch (err) {
      console.error('Lỗi xuất file Excel:', err);
      toast('🚨 Lỗi khi xuất Excel!', 2500, 'var(--coral)');
    }
  }

  return {
    toast,
    flashStage,
    triggerConfetti,
    exportExcel
  };
})();

// Xuất ra window
window.Khoi5Utils = Khoi5Utils;
window.toast = Khoi5Utils.toast;
window.flashStage = Khoi5Utils.flashStage;
window.triggerConfetti = Khoi5Utils.triggerConfetti;
window.exportExcel = Khoi5Utils.exportExcel;

