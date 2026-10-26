/**
 * KHOI 4 - WEB COMPONENTS & GOOGLE DRIVE INTEGRATION
 * Cung cấp:
 * 1. Đẩy file Excel nhật ký trực tiếp lên Google Drive qua Google Apps Script (uploadExcelToDrive)
 * 2. Hệ thống thông báo Toast chuẩn UI Khối 4
 */

(() => {
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
    element.style.background = background;
    element.style.display = 'block';
    element.classList.add('show');

    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      element.classList.remove('show');
      element.style.display = 'none';
    }, duration);
  };

  /* ================= 2. ĐẨY EXCEL LÊN GOOGLE DRIVE ================= */
  const GAS_UPLOAD_URL = 'https://script.google.com/macros/s/AKfycbywqn9mgeON9fTqp3xmnGbuqWW-eChABhvaotV4qHezosaqlYuWpF0c4vnB7APkuXBSRw/exec';
  window.GAS_UPLOAD_URL = GAS_UPLOAD_URL;

  window.uploadExcelToDrive = async function uploadExcelToDrive(wb, fileName) {
    if (!wb || typeof window.XLSX === 'undefined') {
      if (typeof window.showToast === 'function') {
        window.showToast('⚠️ Chưa nạp xong thư viện Excel!', 'bad');
      } else if (window.toast) {
        window.toast('⚠️ Chưa nạp xong thư viện Excel!', 2500, '#dc2626');
      } else {
        alert('Chưa nạp thư viện Excel!');
      }
      return;
    }

    if (!fileName.endsWith('.xlsx')) {
      fileName += '.xlsx';
    }

    if (typeof window.showToast === 'function') {
      window.showToast('☁️ Đang đồng bộ nhật ký lên Google Drive...', 'ok');
    } else if (window.toast) {
      window.toast('☁️ Đang đồng bộ nhật ký lên Google Drive...', 4500, '#2563eb');
    }

    try {
      const base64Data = window.XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });
      const payload = {
        fileName: fileName,
        fileData: base64Data,
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
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
        if (typeof window.showToast === 'function') {
          window.showToast('✅ Đã lưu vào Drive (Thư mục Log tiết học)!', 'ok');
        } else if (window.toast) {
          window.toast('✅ Đã lưu vào Drive (Thư mục Log tiết học)!', 4000, '#16a34a');
        } else {
          alert('Đã lưu thành công vào Google Drive: ' + fileName);
        }
        return result;
      } else {
        throw new Error((result && result.message) || 'Lỗi từ máy chủ Google Apps Script');
      }
    } catch (err) {
      console.warn('Không thể gửi lên Google Drive, chuyển sang tải file trực tiếp:', err);
      // Fallback an toàn: Tự động tải file về máy để giáo viên không bị mất dữ liệu
      window.XLSX.writeFile(wb, fileName);
      if (typeof window.showToast === 'function') {
        window.showToast('⚠️ Không kết nối được Drive. Đã tự động lưu file về máy!', 'warn');
      } else if (window.toast) {
        window.toast('⚠️ Không kết nối được Drive. Đã tự động lưu file về máy!', 4500, '#dc2626');
      } else {
        alert('Không thể kết nối đến Google Drive. File đã được lưu về máy: ' + fileName);
      }
    }
  };
})();

