/**
 * KHOI 4 - WEB COMPONENTS & GOOGLE DRIVE INTEGRATION
 * Cung cấp:
 * 1. Đẩy file Excel nhật ký trực tiếp lên Google Drive qua Google Apps Script (uploadExcelToDrive)
 * 2. Hệ thống thông báo Toast chuẩn UI Khối 4
 */

(() => {
  /* ================= 0. CHỐNG TẢI LẠI TRANG & MẤT DỮ LIỆU TIẾT HỌC ================= */
  if (!window.__PREVENT_RELOAD_ACTIVE__) {
    window.__PREVENT_RELOAD_ACTIVE__ = true;
    let isReloadAllowed = false;

    window.addEventListener('beforeunload', function (e) {
      if (isReloadAllowed) return;
      e.preventDefault();
      e.returnValue = '';
      return '';
    }, { capture: true });

    function showBlockToast(msg) {
      if (typeof window.toast === 'function') {
        window.toast(msg, 2500, '#dc2626');
      } else {
        alert(msg);
      }
    }

    window.addEventListener('keydown', function (e) {
      const key = e.key || '';
      const keyCode = e.keyCode || 0;
      const isCtrl = e.ctrlKey || e.metaKey;
      const isF5 = key === 'F5' || keyCode === 116;
      const isReloadShortcut = isCtrl && (key === 'r' || key === 'R' || keyCode === 82);
      const isHistoryNav = e.altKey && (key === 'ArrowLeft' || key === 'ArrowRight' || keyCode === 37 || keyCode === 39);

      const target = e.target;
      const isTargetInput = target && (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable ||
        (typeof target.getAttribute === 'function' && target.getAttribute('contenteditable') === 'true')
      );
      const isBadBackspace = (key === 'Backspace' || keyCode === 8) && !isTargetInput;

      if (isF5 || isReloadShortcut) {
        e.preventDefault();
        e.stopPropagation();
        showBlockToast('⚠️ Đã khóa phím F5 / Ctrl+R để tránh mất dữ liệu bài học!');
        return false;
      }

      if (isHistoryNav || isBadBackspace) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }, true);

    window.addEventListener('contextmenu', function (e) {
      if (e.shiftKey) return;
      e.preventDefault();
      showBlockToast('⚠️ Chuột phải đã bị khóa để tránh bấm nhầm Tải lại!');
    }, true);

    window.allowPageReload = function () { isReloadAllowed = true; };
    window.preventPageReload = function () { isReloadAllowed = false; };
  }

  let toastTimer;

  /* ================= 1. HỆ THỐNG TOAST KHỐI 4 ================= */
  window.toast = function toast(message, duration = 3000, background = '#17233c') {
    let element = document.getElementById('toast');
    if (!element) {
      element = document.createElement('div');
      element.id = 'toast';
      element.className = 'toast';
      document.body.appendChild(element);
    }

    element.innerHTML = message;
    element.style.cssText = [
      'position: fixed',
      'top: 24px',
      'left: 50%',
      'transform: translateX(-50%)',
      `background: ${background}`,
      'color: #ffffff',
      'padding: 12px 24px',
      'border-radius: 9999px',
      'box-shadow: 0 10px 25px rgba(0,0,0,0.3)',
      'font-family: "Be Vietnam Pro", system-ui, -apple-system, sans-serif',
      'font-size: 15px',
      'font-weight: 700',
      'letter-spacing: 0.3px',
      'z-index: 9999999',
      'pointer-events: none',
      'display: flex',
      'align-items: center',
      'gap: 8px',
      'text-align: center',
      'border: 2px solid rgba(255, 255, 255, 0.3)',
      'box-sizing: border-box',
      'max-width: 90vw'
    ].join(';');

    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      element.style.display = 'none';
    }, duration);
  };

  window.showToast = function showToast(message, type = 'ok') {
    const bg = (type === 'ok' || type === 'success') ? '#16a34a' :
               (type === 'warn' || type === 'warning') ? '#d97706' :
               (type === 'bad' || type === 'error') ? '#dc2626' : '#2563eb';
    return window.toast(message, 3500, bg);
  };

  /* ================= 2. ĐẨY CSV LÊN GOOGLE DRIVE ================= */
  const GAS_UPLOAD_URL = 'https://script.google.com/macros/s/AKfycbywqn9mgeON9fTqp3xmnGbuqWW-eChABhvaotV4qHezosaqlYuWpF0c4vnB7APkuXBSRw/exec';
  window.GAS_UPLOAD_URL = GAS_UPLOAD_URL;

  window.uploadCsvToDrive = async function uploadCsvToDrive(data, fileName) {
    if (typeof window.LessonExport !== 'undefined' && typeof window.LessonExport.uploadToDrive === 'function' && window.LessonExport.uploadToDrive !== uploadCsvToDrive) {
      return window.LessonExport.uploadToDrive(data, fileName);
    }

    let name = String(fileName || 'KetQua_TinHoc4.csv').trim();
    if (name.toLowerCase().endsWith('.xlsx') || name.toLowerCase().endsWith('.xls')) {
      name = name.replace(/\.xlsx?$/i, '.csv');
    } else if (!name.toLowerCase().endsWith('.csv')) {
      name += '.csv';
    }

    window.showToast('☁️ Đang đồng bộ nhật ký CSV lên Google Drive...', 'info');

    let csvContent = typeof data === 'string' ? data : '';
    if (!csvContent && Array.isArray(data)) {
      csvContent = data.map(item => {
        if (Array.isArray(item) && item.length === 2 && typeof item[0] === 'string') {
          const title = `=== ${item[0].toUpperCase()} ===\r\n`;
          const rows = item[1];
          if (Array.isArray(rows)) {
            return title + rows.map(r => (Array.isArray(r) ? r : Object.values(r)).map(v => `"${String(v == null ? '' : v).replace(/"/g, '""')}"`).join(',')).join('\r\n');
          }
        }
        return '';
      }).filter(Boolean).join('\r\n\r\n');
    }

    try {
      let cleanCsv = csvContent;
      if (cleanCsv.charCodeAt(0) === 0xFEFF) {
        cleanCsv = cleanCsv.slice(1);
      }
      const utf8Bytes = new TextEncoder().encode('\uFEFF' + cleanCsv);
      let binary = '';
      const chunkSize = 8192;
      for (let i = 0; i < utf8Bytes.length; i += chunkSize) {
        binary += String.fromCharCode.apply(null, utf8Bytes.subarray(i, i + chunkSize));
      }
      const base64Data = btoa(binary);

      const payload = {
        fileName: name,
        fileData: base64Data,
        mimeType: 'text/csv;charset=utf-8'
      };

      const response = await fetch(GAS_UPLOAD_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (result && result.status === 'success') {
        window.showToast('✅ Đã lưu vào Drive (Thư mục Log tiết học)!', 'ok');
        return result;
      } else {
        throw new Error((result && result.message) || 'Lỗi từ máy chủ Google Apps Script');
      }
    } catch (err) {
      console.warn('Không thể gửi lên Google Drive, chuyển sang tải file trực tiếp:', err);
      const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      window.showToast(`⚠️ Không kết nối được Drive. Đã tự động lưu file CSV về máy: ${name}`, 'warn');
    }
  };

  window.uploadExcelToDrive = function (wbOrData, fileName) {
    return window.uploadCsvToDrive(wbOrData, fileName);
  };
})();

