/**
 * KHOI 3 - WEB COMPONENTS & GOOGLE DRIVE INTEGRATION
 * Cung cấp:
 * 1. Web Components: <khoi3-setup>, <khoi3-sidebar>, <khoi3-student-modal>, <khoi3-summary>
 * 2. Đẩy file Excel nhật ký trực tiếp lên Google Drive qua Google Apps Script (uploadExcelToDrive)
 * 3. Hệ thống thông báo Toast chuẩn UI Khối 3
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

  const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);

  const safeIdentifier = (value, fallback) => /^[A-Za-z_$][\w$-]*$/.test(value || '')
    ? value
    : fallback;

  const safeHandler = (value, fallback) => /^[A-Za-z_$][\w$]*$/.test(value || '')
    ? value
    : fallback;

  /* ================= 1. HỆ THỐNG TOAST KHỐI 3 ================= */
  window.toast = function toast(message, duration = 2500, background = 'var(--primary)') {
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

  /* ================= 2. ĐẨY CSV BÁO CÁO LÊN GOOGLE DRIVE ================= */
  const GAS_UPLOAD_URL = 'https://script.google.com/macros/s/AKfycbywqn9mgeON9fTqp3xmnGbuqWW-eChABhvaotV4qHezosaqlYuWpF0c4vnB7APkuXBSRw/exec';
  window.GAS_UPLOAD_URL = GAS_UPLOAD_URL;

  window.uploadCsvToDrive = async function uploadCsvToDrive(data, fileName) {
    if (typeof window.LessonExport !== 'undefined') {
      return window.LessonExport.uploadToDrive(data, fileName);
    }

    let name = String(fileName || 'KetQua_TinHoc3.csv').trim();
    if (name.toLowerCase().endsWith('.xlsx') || name.toLowerCase().endsWith('.xls')) {
      name = name.replace(/\.xlsx?$/i, '.csv');
    } else if (!name.toLowerCase().endsWith('.csv')) {
      name += '.csv';
    }

    if (window.toast) {
      window.toast('☁️ Đang đồng bộ nhật ký CSV lên Google Drive...', 4500, 'var(--primary)');
    }

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
      const utf8Bytes = new TextEncoder().encode('\uFEFF' + csvContent);
      let binary = '';
      for (let i = 0; i < utf8Bytes.byteLength; i++) {
        binary += String.fromCharCode(utf8Bytes[i]);
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
        if (window.toast) {
          window.toast('✅ Đã lưu vào Drive (Thư mục Log tiết học)!', 4000, 'var(--green)');
        } else {
          alert('Đã lưu thành công vào Google Drive: ' + name);
        }
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
      if (window.toast) {
        window.toast(`⚠️ Không kết nối được Drive. Đã tự động lưu file CSV về máy: ${name}`, 4500, 'var(--red)');
      } else {
        alert('Không thể kết nối đến Google Drive. File CSV đã được lưu về máy: ' + name);
      }
    }
  };

  window.uploadExcelToDrive = function (wbOrData, fileName) {
    return window.uploadCsvToDrive(wbOrData, fileName);
  };

  /* ================= 3. WEB COMPONENTS KHỐI 3 ================= */

  /**
   * <khoi3-setup>
   * Khung cài đặt đầu giờ theo chuẩn UI Tiết 06:
   * Chọn lớp (3/1 -> 3/6), chọn số tổ (2 -> 6), nạp tự động từ JSON.
   */
  class Khoi3Setup extends HTMLElement {
    connectedCallback() {
      if (this.dataset.mounted) return;
      this.dataset.mounted = 'true';
      this.style.display = 'contents';

      const heading = escapeHtml(this.getAttribute('heading') || '🛠️ XƯỞNG RÁP PC 🛠️');
      const description = escapeHtml(this.getAttribute('description') || 'Điệp vụ lắp ráp máy tính — đội nào gom đủ 4 linh kiện sẽ vô địch!');
      const startLabel = escapeHtml(this.getAttribute('start-label') || 'Bắt đầu ➔');
      const selectedClass = /^3_[1-6]$/.test(this.getAttribute('default-class') || '')
        ? this.getAttribute('default-class')
        : '3_2';
      const selectedTeams = /^[2-6]$/.test(this.getAttribute('default-teams') || '')
        ? this.getAttribute('default-teams')
        : '4';

      this.innerHTML = `
        <div id="setup-screen">
          <div class="setup-box">
            <div class="tag">Tin học 3</div>
            <h1>${heading}</h1>
            <p class="setup-lesson-description">${description}</p>
            <div class="setup-row">
              <span>Lớp học:</span>
              <select id="classSel" onchange="if(typeof setupClass==='function')setupClass()">
                ${Array.from({ length: 6 }, (_, idx) => {
                  const val = `3_${idx + 1}`;
                  return `<option value="${val}" ${selectedClass === val ? 'selected' : ''}>Lớp 3/${idx + 1}</option>`;
                }).join('')}
              </select>
            </div>
            <div class="setup-row">
              <span>Số tổ (2 - 6 tổ):</span>
              <select id="teamCount" onchange="if(typeof setupClass==='function')setupClass()">
                ${Array.from({ length: 5 }, (_, idx) => {
                  const val = String(idx + 2);
                  return `<option value="${val}" ${selectedTeams === val ? 'selected' : ''}>${val} Tổ</option>`;
                }).join('')}
              </select>
            </div>
            <div class="setup-row">
              <span>Dữ liệu học sinh:</span>
              <span id="setupMsg" style="color:var(--green);font-weight:800;">✅ Tự động tải từ JSON</span>
            </div>
            <button class="btn-setup" type="button" onclick="if(typeof startPhase1==='function')startPhase1();else if(typeof startGame==='function')startGame();">${startLabel}</button>
          </div>
        </div>
      `;
    }
  }

  /**
   * <khoi3-sidebar>
   * Bảng đội bên phải theo chuẩn UI Tiết 06:
   * Header gồm tên bảng, nút Thêm học sinh, nút Tổng kết; danh sách #teamList.
   */
  class Khoi3Sidebar extends HTMLElement {
    connectedCallback() {
      if (this.dataset.mounted) return;
      this.dataset.mounted = 'true';
      this.style.display = 'contents';

      const title = escapeHtml(this.getAttribute('title') || '🛠️ Bảng đội');

      this.innerHTML = `
        <aside class="side">
          <div class="shead">
            <span>${title}</span>
            <button class="btn gray" type="button" onclick="if(typeof openAddHs==='function')openAddHs();else if(typeof addStudent==='function')addStudent();">➕ Thêm học sinh</button>
            <button class="btn warn" type="button" onclick="if(typeof openEnd==='function')openEnd();else if(typeof showSummary==='function')showSummary();">📊 Tổng kết</button>
          </div>
          <div id="teamList"></div>
        </aside>
      `;
    }
  }

  /**
   * <khoi3-student-modal>
   * Hộp thoại thêm học sinh nhanh dạng textarea (mỗi em một dòng).
   * Thuần JSON & thủ công, không dùng file Excel.
   */
  class Khoi3StudentModal extends HTMLElement {
    connectedCallback() {
      if (this.dataset.mounted) return;
      this.dataset.mounted = 'true';
      this.style.display = 'contents';

      const textareaId = safeIdentifier(this.getAttribute('textarea-id'), 'hs-input');
      const closeHandler = safeHandler(this.getAttribute('close-handler'), 'closeAddHs');
      const saveHandler = safeHandler(this.getAttribute('save-handler'), 'saveAddHs');
      const cancelLabel = escapeHtml(this.getAttribute('cancel-label') || 'Đóng');

      this.innerHTML = `
        <div class="modal-overlay" id="hs-modal" style="display:none;"
          onclick="if(event.target===this)${closeHandler}()">
          <div class="modal-box">
            <h3 class="student-modal-title">➕ Thêm Học Sinh</h3>
            <div class="student-modal-hint">Nhập hoặc dán tên học sinh (mỗi em một dòng):</div>
            <textarea id="${textareaId}" placeholder="Nguyễn Văn A&#10;Trần Thị B&#10;Lê Văn C"></textarea>
            <div class="modal-actions">
              <button class="btn green" type="button" onclick="${saveHandler}()">Lưu danh sách</button>
              <button class="btn gray" type="button" onclick="${closeHandler}()">${cancelLabel}</button>
            </div>
          </div>
        </div>
      `;
    }
  }

  /**
   * <khoi3-summary>
   * Màn hình tổng kết thi đua, bảng Kanban kéo thả học sinh, nút xuất Excel bắn về GDrive.
   */
  class Khoi3Summary extends HTMLElement {
    connectedCallback() {
      if (this.dataset.mounted) return;
      this.dataset.mounted = 'true';
      this.style.display = 'contents';

      const heading = escapeHtml(this.getAttribute('heading') || '📊 Tổng kết');
      const exportLabel = escapeHtml(this.getAttribute('export-label') || '📥 Xuất CSV báo cáo');

      this.innerHTML = `
        <section class="screen" id="s-sum">
          <div class="bar">
            <span class="tag">Tổng kết</span>
            <span class="badge">Kéo thả học sinh sang đội khác để điều chỉnh</span>
          </div>
          <h1 id="sumTitle">${heading}</h1>
          <div class="kanban" id="kanban"></div>
          <div class="spacer">
            <button class="btn gray" type="button" onclick="if(typeof closeEnd==='function')closeEnd();else if(typeof show==='function')show(window.G && window.G.phase===1?'p1':'p2');">⬅ Quay lại game</button>
            <button class="btn green" type="button" onclick="exportExcel()">${exportLabel}</button>
          </div>
        </section>
      `;
    }
  }

  if (!customElements.get('khoi3-setup')) {
    customElements.define('khoi3-setup', Khoi3Setup);
  }
  if (!customElements.get('khoi3-sidebar')) {
    customElements.define('khoi3-sidebar', Khoi3Sidebar);
  }
  if (!customElements.get('khoi3-student-modal')) {
    customElements.define('khoi3-student-modal', Khoi3StudentModal);
  }
  if (!customElements.get('khoi3-summary')) {
    customElements.define('khoi3-summary', Khoi3Summary);
  }

  /* ================= 4. BẢNG ĐIỂM TỐI ƯU & KHUNG GỌI TÊN TIẾT 07 DÙNG CHUNG KHỐI 3 ================= */
  const FALLBACK_STUDENTS_KHOI_3 = {
    "3_2": [
      "Nguyễn Khả Ái", "Nguyễn Đức Anh", "Nguyễn Quốc Anh", "Trịnh Gia Bảo", "Ngô Hoàng Bảo Châu",
      "Nguyễn Doanh Doanh", "Phạm Đại Dương", "Danh Thành Đạt", "Vũ Nghi Đình", "Võ Đoàn Nhã Hân",
      "Võ Hứa Chí Hiếu", "Nguyễn Trần Gia Huy", "Đoàn Gia Hưng", "Nguyễn Phúc Hưng", "Đỗ Minh Khang",
      "Đặng Nguyễn Quốc Khởi", "Đặng Lê Thiên Kim", "Trương Quân Kỳ", "Mai Hoàng Lam", "Lê Trúc Ly",
      "Vũ Hoàng Ánh Minh", "Vương Lê Bảo Minh", "Đinh Kim Ngân", "Trần Y Như Ngọc", "Chiêm Nguyễn Khôi Nguyên",
      "Nguyễn Công Gia Phát", "Trần Thiên Phú", "Keo Trần Kim Phúc", "Lê Đức Phúc", "Bùi Mai Phương",
      "Nguyễn Quốc Quân", "Lê Anh Quốc", "Nguyễn Xuân Quý", "Hình Minh Thanh", "Nguyễn Việt Thanh",
      "Nguyễn Minh Thành", "Lê Đức Thịnh", "Huỳnh Minh Thuận", "Huỳnh Gia Tiến", "Nguyễn Ngọc Trâm",
      "Nguyễn Ngọc Bảo Trân", "Nguyễn Thanh Trọng", "Nguyễn Đức Tuấn", "Đoàn Thị Bảo Vy", "Hình Lê Khánh Vy",
      "Hồ Nhật Vy", "Nguyễn Trần Thảo Vy", "Lê Ngọc Kim Yến"
    ],
    "3_3": [
      "Tống Huỳnh Tâm An", "Bùi Ngọc Tú Anh", "Hồng Hoàng Nhật Anh", "Võ Khuê Anh", "Lê Huỳnh Thiên Bách",
      "Nguyễn Hoàng Bách (1)", "Nguyễn Hoàng Bách (2)", "Nguyễn Phạm Bảo Châu", "Võ Hữu Duy", "Trần Quốc Đạt", "Phạm Thế Hào",
      "Huỳnh Nhã Hân", "Nguyễn Lê Khả Hân", "Nguyễn Ngọc Gia Hân (1)", "Nguyễn Ngọc Gia Hân (2)", "Nguyễn Phạm Gia Hân", "Lê Thị Phương Hoa",
      "Phan Mạnh Hùng", "Lý Gia Hưng", "Nguyễn Minh Khang", "Phạm Nguyễn Minh Khôi", "Cao Thiên Kim",
      "Nguyễn Hồ Phương Lam", "Mai Nhật Lan", "Vũ Bảo Long", "Huỳnh Thiên Lộc", "Bùi Diệu Mẫn",
      "Dương Quang Minh", "Huỳnh Phúc Minh", "Nguyễn Ngọc Tuệ Minh", "Trần Phạm Khánh My", "Nguyễn Ngọc Kim Ngân",
      "Nguyễn Khởi Nghiệp", "Đào Phúc Nguyên", "Tạ Hoàng Nhân", "Phan An Nhiên", "Trần Lê An Nhiên",
      "Nguyễn Phúc", "Phạm Thiên Phúc", "Hoàng Bảo Phước", "Cao Lê Nhã Phương", "Trần Quốc Sang",
      "Từ Tấn Sang", "Nguyễn Minh Tâm", "Phạm Quang Thành", "Nguyễn Phương Thảo", "Nguyễn Quốc Thắng",
      "Đinh Trung Tín", "Võ Cát Tường", "Hà Mỹ Uyên"
    ],
    "3_4": [
      "Đỗ Mỹ Ái", "Lê Đặng Trâm Anh", "Phạm Quốc Anh", "Trần Ngọc Tú Anh", "Trương Tuyết Anh",
      "Nguyễn Dương Thiên Ân", "Thạch Thiên Bảo", "Trần Lâm Hữu Duyên", "Nguyễn Lê Hoàng Đăng", "Phạm Minh Đăng",
      "Huỳnh Bích Hà", "Trần Ngọc Khánh Hà", "Đặng Thị Ngọc Hân", "Lê Nguyễn Quang Hưng", "Thái Minh Khang",
      "Vũ Duy Khang", "Lê Trịnh Minh Khoa", "Lý Minh Khôi", "Nguyễn Đặng Đăng Khôi", "Phạm Trọng Kiên",
      "Huỳnh Ngọc Thiên Kim", "Lưu Hoàng Kim", "Lưu Nhựt Lam", "Hà Tuyết Lan", "Nguyễn Tuyết Loan",
      "Lê Đình Mạnh", "Trần Tuệ Mẫn", "Nguyễn Hoàng Gia Mỹ", "Thái Bảo Ngọc", "Lưu Nguyễn Đan Nguyên",
      "Nguyễn Thảo Nguyên", "Cao Phương Nhã", "Phan Thị Xuân Nhi", "Trần Tuệ Nhi", "Phạm Hoàng Oanh",
      "Trang Trường Phát", "Đỗ Hoàng Bảo Quân", "Nguyễn Phương Thảo", "Trương Bùi Phương Thảo", "Nguyễn Ngọc Kim Thiên",
      "Huỳnh Chí Thiện", "Lương Phúc Thịnh", "Nguyễn Ngọc Thịnh", "Nguyễn Trần Phước Thịnh", "Quách Hoàng Thịnh",
      "Mai Minh Thư", "Trần Anh Thư", "Đỗ Thị Thu Trang", "Lê Huyền Trâm", "Nguyễn Minh Triết", "Giang Ngọc Cát Tường"
    ],
    "3_5": [
      "Đỗ Nhật Anh", "Phạm Lưu Duy Bách", "Đặng Tuệ Băng", "Thái Thị Kim Chi", "Lê Trần Bảo Di",
      "Huỳnh Tấn Đạt", "Đặng Minh Đức", "Trần Nhật Thiên Đức", "Trần Ngọc Thiên Hà", "Lâm Ngọc Hân",
      "Nguyễn Thị Xuân Hiền", "Nguyễn Hoàng An Khang", "Nguyễn Quốc Khánh", "Nguyễn Duy Khiêm", "Võ Thiên Kim",
      "Nguyễn Gia Kỳ", "Lê Ngọc Kim Ngân", "Nguyễn Thị Bảo Ngọc", "Nguyễn Hồ Kim Nguyên", "Nguyễn Đặng Thành Nhân",
      "Huỳnh Bảo Nhi", "Đặng Thị Quỳnh Như", "Trần Quỳnh Như", "Nguyễn Hồng Phát", "Nguyễn Lâm Gia Phát",
      "Đàm Tâm Phúc", "Đặng Thành Hữu Phúc", "Huỳnh Gia Phúc", "Trần Hoàng Quân", "Nguyễn Chí Thiện",
      "Trần Trường Quân", "Tăng Thế Tài", "Võ Thị Thu Thảo", "Nguyễn Trọng Thắng", "Tăng Ngọc Thi",
      "Nguyễn Hồng Minh Thư", "Ngô Văn Tiền", "Chu Mạnh Tiến", "Nguyễn Thiên Trường", "Nguyễn Ngọc Thu Tuyền",
      "Trần Thị Khánh Tuyết"
    ],
    "3_6": [
      "Nguyễn Ngọc Khả Ái", "Trần Khả Ái", "Hoàng Thiên An", "Nguyễn Thiên An", "Nguyễn Ngọc Diệp Anh",
      "Trần Nguyễn Hải Anh", "Phạm Kiều Thiên Ân", "Từ Quốc Bảo", "Danh Minh Châu", "Dương Hoàng Hải Đăng",
      "Nguyễn Hoàng Đăng", "Nguyễn Lưu Nhật Hạ", "Trương Minh Hằng", "Cao Ngọc Gia Hân", "Lê Ngọc Khả Hân",
      "Lại Xuân Khang", "Trương Trọng Nghĩa", "Phạm Ngô Thanh Ngọc", "Danh Nguyễn Yến Nhi", "Nguyễn Ngọc Tuệ Nhi",
      "Trần Khánh Nhi", "Danh Thị Kiều Oanh", "Nguyễn Kỳ Phương", "Lê Hoàng Đăng Quang", "Phan Huỳnh Phú Quý",
      "Nguyễn Ngọc Thảo Quyên", "Châu Ngọc Ngân Thanh", "Vi Huỳnh Kim Thanh", "Lâm Huỳnh Phương Thảo", "Trần Quốc Thiện",
      "Nguyễn Ngọc Tiên", "Lâm Đức Tiến", "Trương Ngọc Toàn", "Mai Võ Thanh Trúc", "Lư Nhã Uyên",
      "Nguyễn Ngọc Nhã Uyên", "Võ Huỳnh Khánh Vy", "Lê Như Ý", "Nguyễn Phúc Khang Lam", "Huỳnh Hoàng Yến (1)", "Huỳnh Hoàng Yến (2)"
    ]
  };

  const TEAM_COLORS_KHOI_3 = ['#2563eb', '#dc2626', '#16a34a', '#d97706', '#9333ea', '#0891b2'];

  const Khoi3UnifiedSidebar = {
    classId: '3_2',
    teamCount: 4,
    turn: 0,
    teams: [],
    students: [],
    calledStudents: new Set(),
    selectedStudent: null,
    listeners: { onScore: null, onStudent: null, onTurn: null },

    async init(options = {}) {
      if (options.classId) this.classId = options.classId;
      if (options.teamCount) this.teamCount = options.teamCount;
      if (options.onScore) this.listeners.onScore = options.onScore;
      if (options.onStudent) this.listeners.onStudent = options.onStudent;
      if (options.onTurn) this.listeners.onTurn = options.onTurn;

      this.initTeams(this.teamCount);
      await this.loadClassStudents(this.classId);
    },

    initTeams(count) {
      this.teamCount = Math.max(2, Math.min(6, count));
      this.teams = Array.from({ length: this.teamCount }, (_, i) => ({
        id: i,
        name: `Tổ ${i + 1}`,
        score: 100,
        color: TEAM_COLORS_KHOI_3[i % TEAM_COLORS_KHOI_3.length]
      }));
      this.turn = 0;
      this.renderTeams();
    },

    async loadClassStudents(cid) {
      this.classId = cid;
      this.selectedStudent = null;
      this.calledStudents = new Set();
      let names = FALLBACK_STUDENTS_KHOI_3[cid] || FALLBACK_STUDENTS_KHOI_3['3_2'];

      try {
        const res = await fetch('../../assets/data/students_3_2026_2027.json');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data[cid])) names = data[cid];
        }
      } catch (_) {}

      // Tự động nhận diện và phân biệt học sinh trùng họ tên
      const nameCounts = {};
      names.forEach(name => {
        const trimmed = (typeof name === 'string' ? name : (name.name || '')).trim();
        nameCounts[trimmed] = (nameCounts[trimmed] || 0) + 1;
      });
      const nameTracker = {};
      this.students = names.map((item, i) => {
        const trimmed = (typeof item === 'string' ? item : (item.name || '')).trim();
        let finalName = trimmed;
        if (nameCounts[trimmed] > 1 && !/\s*\([0-9A-Za-z]+\)$/.test(trimmed)) {
          nameTracker[trimmed] = (nameTracker[trimmed] || 0) + 1;
          finalName = `${trimmed} (${nameTracker[trimmed]})`;
        }
        return { id: `hs-${i + 1}`, name: finalName, rawName: trimmed };
      });
      this.renderStudents();
    },

    setTurn(idx) {
      this.turn = idx;
      this.renderTeams();
      if (typeof this.listeners.onTurn === 'function') this.listeners.onTurn(idx, this.teams[idx]);
    },

    addScore(idx, delta, ev) {
      if (ev) ev.stopPropagation();
      const t = this.teams[idx];
      if (!t) return;
      t.score = Math.max(0, t.score + delta);
      this.renderTeams();
      if (window.toast) window.toast(`🌟 ${t.name} ${delta >= 0 ? '+' : ''}${delta} điểm! (Tổng: ${t.score}đ)`, 2000, 'var(--primary)');
      if (typeof this.listeners.onScore === 'function') this.listeners.onScore(idx, t.score, delta);
    },

    penalizeNoise(idx, ev) {
      if (ev) ev.stopPropagation();
      const t = this.teams[idx];
      if (!t) return;
      const lost = Math.max(5, Math.round(t.score * 0.1));
      t.score = Math.max(0, t.score - lost);
      this.renderTeams();
      if (window.toast) window.toast(`🔊 Phạt ${t.name} −${lost}đ (10%)! (Còn: ${t.score}đ)`, 2500, 'var(--red)');
      if (typeof this.listeners.onScore === 'function') this.listeners.onScore(idx, t.score, -lost);
    },

    selectStudent(id) {
      if (this.calledStudents.has(id)) return;
      this.selectedStudent = id;
      this.renderStudents();
      const s = this.students.find(x => x.id === id);
      if (s) {
        if (window.toast) window.toast(`🎲 Mời bạn ${s.name} đại diện ${this.teams[this.turn].name}!`, 2500, 'var(--primary)');
        if (typeof this.listeners.onStudent === 'function') this.listeners.onStudent(s, this.teams[this.turn]);
      }
    },

    markCalledCurrentStudent() {
      if (this.selectedStudent) {
        this.calledStudents.add(this.selectedStudent);
        this.selectedStudent = null;
        this.renderStudents();
      }
    },

    randomPickStudent() {
      const avail = this.students.filter(s => !this.calledStudents.has(s.id));
      if (!avail.length) {
        this.calledStudents.clear();
        if (window.toast) window.toast('🎉 Đã gọi hết 1 vòng cả lớp! Bắt đầu vòng mới!', 3000, 'var(--green)');
        this.renderStudents();
        return;
      }
      const pick = avail[Math.floor(Math.random() * avail.length)];
      this.selectStudent(pick.id);
    },

    filterStudents(query = '') {
      const q = String(query).toLowerCase().trim();
      document.querySelectorAll('.stu-btn').forEach(btn => {
        const name = (btn.getAttribute('data-name') || '').toLowerCase();
        btn.style.display = name.includes(q) ? 'flex' : 'none';
      });
    },

    renderTeams() {
      const container = document.getElementById('teamsContainer') || document.getElementById('teamsList') || document.getElementById('teams-list');
      if (!container) return;
      container.innerHTML = this.teams.map((t, i) => {
        const active = i === this.turn;
        return `
          <div class="team-row ${active ? 'active' : ''}" onclick="Khoi3UnifiedSidebar.setTurn(${i})">
            <div class="team-meta">
              <span class="team-name" style="color:${t.color};">${t.name} ${active ? '🎯' : ''}</span>
              <div class="team-action-btns">
                <button class="plus-btn" type="button" onclick="Khoi3UnifiedSidebar.addScore(${i}, 20, event)" title="Cộng 20 điểm">+20</button>
                <button class="noise-btn" type="button" onclick="Khoi3UnifiedSidebar.penalizeNoise(${i}, event)" title="Phạt ồn −10%">🔊 −10%</button>
              </div>
            </div>
            <div class="team-score" style="color:${t.color};" title="Điểm số của ${t.name}">${t.score}</div>
          </div>
        `;
      }).join('');
    },

    renderStudents() {
      const listEl = document.getElementById('students-list');
      const headEl = document.getElementById('st-head-title');
      const sumEl = document.getElementById('students-summary');
      const remaining = this.students.length - this.calledStudents.size;

      if (headEl) headEl.textContent = `CÒN LƯỢT: ${remaining}/${this.students.length}`;
      if (sumEl) sumEl.textContent = `👥 Danh sách học sinh (${remaining} còn lượt)`;

      if (listEl) {
        listEl.innerHTML = this.students.map((s, idx) => {
          const called = this.calledStudents.has(s.id);
          const sel = this.selectedStudent === s.id;
          return `
            <button class="stu-btn ${sel ? 'active' : ''}" type="button"
              data-id="${s.id}" data-name="${s.name}" ${called ? 'disabled' : ''}
              onclick="Khoi3UnifiedSidebar.selectStudent('${s.id}')">
              <span>${idx + 1}. ${s.name}</span>
              ${called ? '<span style="color:#4ade80;font-weight:900;">✓</span>' : ''}
            </button>
          `;
        }).join('');
      }
    }
  };

  window.Khoi3UnifiedSidebar = Khoi3UnifiedSidebar;
  window.FALLBACK_STUDENTS_KHOI_3 = FALLBACK_STUDENTS_KHOI_3;

  /**
   * <khoi3-unified-sidebar>
   * Bảng điểm tối ưu & Khung gọi tên học sinh chuẩn Tiết 07 dùng chung toàn bộ Khối 3
   */
  class Khoi3UnifiedSidebarComponent extends HTMLElement {
    async connectedCallback() {
      if (this.dataset.mounted) return;
      this.dataset.mounted = 'true';

      const defaultClass = this.getAttribute('default-class') || '3_2';
      const defaultTeams = parseInt(this.getAttribute('default-teams')) || 4;

      this.innerHTML = `
        <aside class="scoreboard" style="width:100%; border:0; padding:0; background:transparent;">
          <div class="scoreboard-panel">
            <div class="score-head">
              <span>🏆 ĐIỂM CÁC TỔ</span>
              <div style="display:flex; gap:6px; align-items:center;">
                <select id="classSelect" onchange="Khoi3UnifiedSidebar.loadClassStudents(this.value)" title="Chọn lớp Khối 3">
                  <option value="3_2" ${defaultClass==='3_2'?'selected':''}>Lớp 3/2</option>
                  <option value="3_3" ${defaultClass==='3_3'?'selected':''}>Lớp 3/3</option>
                  <option value="3_4" ${defaultClass==='3_4'?'selected':''}>Lớp 3/4</option>
                  <option value="3_5" ${defaultClass==='3_5'?'selected':''}>Lớp 3/5</option>
                  <option value="3_6" ${defaultClass==='3_6'?'selected':''}>Lớp 3/6</option>
                </select>
                <select id="teamCount" onchange="Khoi3UnifiedSidebar.initTeams(Number(this.value))" title="Số tổ">
                  <option value="2" ${defaultTeams===2?'selected':''}>2 tổ</option>
                  <option value="3" ${defaultTeams===3?'selected':''}>3 tổ</option>
                  <option value="4" ${defaultTeams===4?'selected':''}>4 tổ</option>
                  <option value="5" ${defaultTeams===5?'selected':''}>5 tổ</option>
                  <option value="6" ${defaultTeams===6?'selected':''}>6 tổ</option>
                </select>
              </div>
            </div>
            <div id="teamsContainer"></div>
          </div>

          <details id="students-panel" open>
            <summary id="students-summary">👥 Danh sách học sinh</summary>
            <div id="students-header">
              <span id="st-head-title" class="st-head-title">CÒN LƯỢT: --/--</span>
              <div class="students-search-row">
                <input type="text" id="search-student" placeholder="Tìm tên..."
                  onkeyup="Khoi3UnifiedSidebar.filterStudents(this.value)">
                <button type="button" class="btn-gacha-roll" onclick="Khoi3UnifiedSidebar.randomPickStudent()">🎲 Gacha</button>
              </div>
            </div>
            <div id="students-list"></div>
          </details>
        </aside>
      `;

      await Khoi3UnifiedSidebar.init({ classId: defaultClass, teamCount: defaultTeams });
    }
  }

  if (!customElements.get('khoi3-unified-sidebar')) {
    customElements.define('khoi3-unified-sidebar', Khoi3UnifiedSidebarComponent);
  }
})();

