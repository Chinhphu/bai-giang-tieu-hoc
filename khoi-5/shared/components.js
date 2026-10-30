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

  window.toast = function toast(message, duration = 2200, background = 'var(--mint)') {
    let element = document.getElementById('toast');
    if (!element) {
      element = document.createElement('div');
      element.id = 'toast';
      element.className = 'toast';
      document.body.appendChild(element);
    }

    element.textContent = message;
    element.style.background = background;
    element.style.display = 'block';
    element.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      element.classList.remove('show');
      element.style.display = 'none';
    }, duration);
  };

  const GAS_UPLOAD_URL = 'https://script.google.com/macros/s/AKfycbywqn9mgeON9fTqp3xmnGbuqWW-eChABhvaotV4qHezosaqlYuWpF0c4vnB7APkuXBSRw/exec';
  window.GAS_UPLOAD_URL = GAS_UPLOAD_URL;

  window.uploadCsvToDrive = async function uploadCsvToDrive(data, fileName) {
    if (typeof window.LessonExport !== 'undefined') {
      return window.LessonExport.uploadToDrive(data, fileName);
    }

    let name = String(fileName || 'KetQua_TinHoc5.csv').trim();
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
          window.toast('✅ Đã lưu vào Drive (Thư mục Log tiết học)!', 4000, 'var(--mint)');
        } else {
          alert('Đã lưu thành công vào Google Drive: ' + name);
        }
        return result;
      } else {
        throw new Error((result && result.message) || 'Lỗi không xác định từ máy chủ');
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
        window.toast(`⚠️ Không kết nối được Drive. Đã tự động lưu file CSV về máy: ${name}`, 4500, 'var(--coral)');
      } else {
        alert('Không thể kết nối đến Google Drive. File CSV đã được lưu về máy: ' + name);
      }
    }
  };

  window.uploadExcelToDrive = function (wbOrData, fileName) {
    return window.uploadCsvToDrive(wbOrData, fileName);
  };

  class Khoi5Setup extends HTMLElement {
    connectedCallback() {
      if (this.dataset.mounted) return;
      this.dataset.mounted = 'true';
      this.style.display = 'contents';

      const heading = escapeHtml(this.getAttribute('heading') || 'TIN HỌC 5');
      const description = escapeHtml(this.getAttribute('description') || '');
      const teamLabel = escapeHtml(this.getAttribute('team-label') || 'Số lượng tổ (Tối đa 6):');
      const teamUnit = escapeHtml(this.getAttribute('team-unit') || 'Tổ');
      const startingScoreLabel = escapeHtml(this.getAttribute('starting-score-label') || 'Điểm sàn mỗi tổ:');
      const startLabel = escapeHtml(this.getAttribute('start-label') || 'VÀO TIẾT HỌC 🚀');
      const selectedClass = /^5_[1-6]$/.test(this.getAttribute('default-class') || '')
        ? this.getAttribute('default-class')
        : '5_1';
      const selectedTeams = /^[2-6]$/.test(this.getAttribute('default-teams') || '')
        ? this.getAttribute('default-teams')
        : '4';

      this.innerHTML = `
        <div id="setup-screen">
          <div class="setup-box">
            <h2>${heading}</h2>
            <div class="setup-lesson-description">${description}</div>
            <div class="setup-row">
              <span>Chọn lớp học:</span>
              <select id="s-class">
                ${Array.from({ length: 6 }, (_, index) => {
                  const value = `5_${index + 1}`;
                  return `<option value="${value}" ${selectedClass === value ? 'selected' : ''}>Lớp 5/${index + 1}</option>`;
                }).join('')}
              </select>
            </div>
            <div class="setup-row">
              <span>${teamLabel}</span>
              <select id="s-teams">
                ${Array.from({ length: 5 }, (_, index) => {
                  const value = String(index + 2);
                  return `<option value="${value}" ${selectedTeams === value ? 'selected' : ''}>${value} ${teamUnit}</option>`;
                }).join('')}
              </select>
            </div>
            <div class="setup-row">
              <span>${startingScoreLabel}</span>
              <span class="setup-starting-score">1000 Điểm</span>
            </div>
            <div class="setup-row">
              <span>Dữ liệu học sinh:</span>
              <span class="setup-student-status" style="color:var(--mint);font-weight:700;">✅ Tự động tải từ JSON</span>
            </div>
            <button class="btn-setup" onclick="startGame()">${startLabel}</button>
          </div>
        </div>
      `;
    }
  }

  class Khoi5Sidebar extends HTMLElement {
    connectedCallback() {
      if (this.dataset.mounted) return;
      this.dataset.mounted = 'true';
      this.style.display = 'contents';

      const title = this.getAttribute('title');
      const quickAction = this.getAttribute('quick-action');
      const showGoldBoard = this.hasAttribute('gold-board');
      const showNavigation = this.getAttribute('navigation') !== 'false';
      const showPageIndicator = this.hasAttribute('page-indicator');
      const quickActionMarkup = quickAction === 'gacha'
        ? '<button class="btn-tiny sidebar-quick-action" type="button" onclick="openGacha()">🎁 Mở Túi Mù</button>'
        : '';

      this.innerHTML = `
        <aside class="side">
          ${title ? `<div class="sidebar-title">${escapeHtml(title)}</div>` : ''}
          <div class="teams" id="teams"></div>
          ${quickActionMarkup}
          <div class="spacer"></div>
          <div class="tc-buttons">
            <button class="btn-tiny" type="button" onclick="openAddHs()" title="Thêm học sinh mới">➕ Thêm HS</button>
            <button class="btn-tiny" type="button" onclick="openEnd()" title="Tổng kết đánh giá và xuất Excel">📋 Tổng kết</button>
          </div>
          ${showGoldBoard
            ? '<div class="sidebar-gold-board"><button class="btn-tiny" type="button" onclick="switchAi(3)" title="Xem Bảng vàng xếp hạng">🏆 Bảng Vàng</button></div>'
            : ''}
          ${showNavigation
            ? `<div class="nav">
                <button type="button" onclick="goSlide(-1)" title="Trang trước (Phím mũi tên trái)">◀</button>
                ${showPageIndicator
                  ? '<span class="page-indicator" id="slide-page-num">1 / 1</span>'
                  : ''}
                <button type="button" onclick="goSlide(1)" title="Trang tiếp (Phím mũi tên phải)">▶</button>
              </div>`
            : ''}
        </aside>
      `;
    }
  }

  class Khoi5StudentModal extends HTMLElement {
    connectedCallback() {
      if (this.dataset.mounted) return;
      this.dataset.mounted = 'true';
      this.style.display = 'contents';

      const textareaId = safeIdentifier(this.getAttribute('textarea-id'), 'hs-input');
      const closeHandler = safeHandler(this.getAttribute('close-handler'), 'closeAddHs');
      const saveHandler = safeHandler(this.getAttribute('save-handler'), 'saveAddHs');
      const cancelLabel = escapeHtml(this.getAttribute('cancel-label') || 'Hủy');

      this.innerHTML = `
        <div class="modal-overlay" id="hs-modal"
          onclick="if(event.target===this)${closeHandler}()">
          <div class="modal-box">
            <h3 class="student-modal-title">➕ Thêm Học Sinh</h3>
            <div class="student-modal-import">
              <div class="student-modal-hint">Dán danh sách học sinh (mỗi em một dòng):</div>
            </div>
            <textarea id="${textareaId}" placeholder="Nguyễn Văn A&#10;Trần Thị B&#10;Lê Văn C"></textarea>
            <div>
              <button class="btn-modal-ok" type="button" onclick="${saveHandler}()">Thêm vào danh sách</button>
              <button class="btn-modal-cancel" type="button"
                onclick="${closeHandler}()">${cancelLabel}</button>
            </div>
          </div>
        </div>
      `;
    }
  }

  class Khoi5Summary extends HTMLElement {
    connectedCallback() {
      if (this.dataset.mounted) return;
      this.dataset.mounted = 'true';
      this.style.display = 'contents';

      const heading = escapeHtml(this.getAttribute('heading') || '📋 Quản lí học sinh các tổ (Kéo thả thẻ tên)');
      const exportLabel = escapeHtml(this.getAttribute('export-label') || '📥 Xuất File CSV');
      const goldBoard = this.hasAttribute('gold-board');

      this.innerHTML = `
        <div id="end-screen">
          <div class="ehead">
            <h1>${heading}</h1>
            <div class="summary-actions">
              <button class="summary-back" type="button" onclick="closeEnd()">← Quay lại</button>
              ${goldBoard
                ? '<button class="summary-board" type="button" onclick="closeEnd(); switchAi(3);">🏆 Xem Bảng Vàng</button>'
                : ''}
              <button class="summary-export" type="button" onclick="exportExcel()">${exportLabel}</button>
            </div>
          </div>
          <div class="kanban" id="kanban"></div>
        </div>
      `;
    }
  }

  if (!customElements.get('khoi5-setup')) {
    customElements.define('khoi5-setup', Khoi5Setup);
  }
  if (!customElements.get('khoi5-sidebar')) {
    customElements.define('khoi5-sidebar', Khoi5Sidebar);
  }
  if (!customElements.get('khoi5-student-modal')) {
    customElements.define('khoi5-student-modal', Khoi5StudentModal);
  }
  if (!customElements.get('khoi5-summary')) {
    customElements.define('khoi5-summary', Khoi5Summary);
  }
})();
