(() => {
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

  window.toast = function toast(message, duration = 2500, background = 'var(--mint)') {
    let element = document.getElementById('toast');
    if (!element) {
      element = document.createElement('div');
      element.id = 'toast';
      element.className = 'toast';
      document.body.appendChild(element);
    }

    element.innerHTML = message;
    element.style.background = (background && background.startsWith('var(')) ? background : (background || 'var(--mint)');
    element.style.display = 'inline-block';
    element.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      element.classList.remove('show');
      element.style.display = 'none';
    }, duration);
  };

  window.showToast = function showToast(message, type = 'info', duration = 2500) {
    const bg = (type === 'ok' || type === 'success') ? '#10b981'
      : (type === 'warn' || type === 'warning' || type === 'coral' || type === 'error' || type === 'bad') ? 'var(--coral)'
      : (type === 'gold') ? 'var(--gold)'
      : '#0284c7';
    window.toast(message, duration, bg);
  };

  /* ================= 2. ĐẨY CSV BÁO CÁO LÊN GOOGLE DRIVE ================= */
  window.uploadCsvToDrive = (data, fileName) => window.LessonExport.uploadToDrive(data, fileName);
  window.uploadExcelToDrive = window.uploadCsvToDrive;

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
              <input id="s-score" type="number" min="0" step="50" value="${defaultScore}" class="setup-score-input" />
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
