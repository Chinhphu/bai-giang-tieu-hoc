/**
 * KHOI 4 - WEB COMPONENTS & GOOGLE DRIVE INTEGRATION
 * Cung cấp:
 * 1. Web Components: <khoi4-setup>, <khoi4-sidebar>, <khoi4-student-modal>, <khoi4-summary>
 * 2. Đẩy file CSV nhật ký trực tiếp lên Google Drive qua Google Apps Script (uploadCsvToDrive)
 * 3. Hệ thống thông báo Toast chuẩn UI Khối 4
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

  /* ================= 2. ĐẨY CSV BÁO CÁO LÊN GOOGLE DRIVE ================= */
  window.uploadCsvToDrive = (data, fileName) => window.LessonExport.uploadToDrive(data, fileName);
  window.uploadExcelToDrive = window.uploadCsvToDrive;

  /* ================= 3. WEB COMPONENTS KHỐI 4 ================= */

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

  /**
   * <khoi4-setup>
   * Khung cài đặt đầu giờ chuẩn Khối 4:
   * Chọn lớp (4/1 -> 4/6), chọn số tổ (2 -> 6), thiết lập điểm sàn (mặc định 1000).
   */
  class Khoi4Setup extends HTMLElement {
    connectedCallback() {
      if (this.dataset.mounted) return;
      this.dataset.mounted = 'true';
      this.style.display = 'contents';

      const heading = escapeHtml(this.getAttribute('heading') || 'TIN HỌC 4');
      const description = escapeHtml(this.getAttribute('description') || '');
      const teamLabel = escapeHtml(this.getAttribute('team-label') || 'Số lượng tổ (Tối đa 6):');
      const teamUnit = escapeHtml(this.getAttribute('team-unit') || 'Tổ');
      const startingScoreLabel = escapeHtml(this.getAttribute('starting-score-label') || 'Điểm sàn mỗi tổ:');
      const startLabel = escapeHtml(this.getAttribute('start-label') || 'VÀO TIẾT HỌC 🚀');
      const selectedClass = /^4_[1-6]$/.test(this.getAttribute('default-class') || '')
        ? this.getAttribute('default-class')
        : '4_1';
      const selectedTeams = /^[2-6]$/.test(this.getAttribute('default-teams') || '')
        ? this.getAttribute('default-teams')
        : '4';
      const defaultScore = escapeHtml(this.getAttribute('default-score') || '1000');

      this.innerHTML = `
        <div id="setup-screen">
          <div class="setup-box">
            <h2>${heading}</h2>
            <div class="setup-lesson-description">${description}</div>
            <div class="setup-row">
              <span>Chọn lớp học:</span>
              <select id="s-class">
                ${Array.from({ length: 6 }, (_, index) => {
                  const value = `4_${index + 1}`;
                  return `<option value="${value}" ${selectedClass === value ? 'selected' : ''}>Lớp 4/${index + 1}</option>`;
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
              <input id="s-score" type="number" min="0" step="50" value="${defaultScore}" class="setup-score-input" />
            </div>
            <button class="btn-setup" onclick="startGame()">${startLabel}</button>
          </div>
        </div>
      `;
    }
  }

  /**
   * <khoi4-sidebar>
   * Bảng điểm tổ & Thanh điều hướng Khối 4 (Kỷ luật tích cực, Không có Phe Quỷ theo README)
   */
  class Khoi4Sidebar extends HTMLElement {
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
        ? '<button class="btn-tiny sidebar-quick-action" type="button" onclick="openGacha()">🎁 Mở Quà Gacha</button>'
        : '';

      this.innerHTML = `
        <aside class="side">
          ${title ? `<div class="sidebar-title">${escapeHtml(title)}</div>` : ''}
          <div class="teams" id="teams"></div>
          ${quickActionMarkup}
          <div class="spacer"></div>
          <div class="tc-buttons">
            <button class="btn-tiny" type="button" onclick="openAddHs()" title="Thêm học sinh mới">➕ Thêm HS</button>
            <button class="btn-tiny" type="button" onclick="openEnd()" title="Tổng kết đánh giá và xuất CSV">📋 Tổng kết</button>
            <button class="btn-tiny" type="button" onclick="if(window.sessionManager)window.sessionManager.clear();else if(typeof clearSession==='function')clearSession();" title="Xóa dữ liệu phiên học để bắt đầu lớp mới" style="background:#fee2e2; color:#ef4444; border-color:#f87171;">🗑️ Xóa phiên</button>
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

  /**
   * <khoi4-student-modal>
   * Pop-up thêm nhanh học sinh vào lớp
   */
  class Khoi4StudentModal extends HTMLElement {
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

  /**
   * <khoi4-summary>
   * Màn hình tổng kết kéo thả sửa tổ & xuất CSV
   */
  class Khoi4Summary extends HTMLElement {
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

  if (!customElements.get('khoi4-setup')) {
    customElements.define('khoi4-setup', Khoi4Setup);
  }
  if (!customElements.get('khoi4-sidebar')) {
    customElements.define('khoi4-sidebar', Khoi4Sidebar);
  }
  if (!customElements.get('khoi4-student-modal')) {
    customElements.define('khoi4-student-modal', Khoi4StudentModal);
  }
  if (!customElements.get('khoi4-summary')) {
    customElements.define('khoi4-summary', Khoi4Summary);
  }
})();
