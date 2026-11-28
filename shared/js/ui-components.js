/**
 * =========================================================================
 * BỘ WEB COMPONENTS DÙNG CHUNG TOÀN HỆ THỐNG (PHƯƠNG ÁN A)
 * =========================================================================
 * Cung cấp chuẩn thẻ thống nhất:
 *   - <lesson-setup>, <lesson-sidebar>, <lesson-student-modal>, <lesson-summary>
 * Kèm alias tương thích ngược cho các bài hiện hữu:
 *   - <khoi5-setup>, <khoi5-sidebar>, <khoi5-student-modal>, <khoi5-summary>
 *   - <khoi3-setup>, <khoi3-sidebar>, <khoi3-student-modal>, <khoi3-summary>
 * Yêu cầu: Nạp sau ../../shared/js/core.js (hoặc kèm trong <head> trước <body>).
 * =========================================================================
 */
(() => {
  'use strict';

  const escapeHtml = value => String(value).replace(/[&<>"']/g, ch => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[ch]);

  const safeIdentifier = (value, fallback) => /^[A-Za-z_$][\w$-]*$/.test(value || '') ? value : fallback;
  const safeHandler = (value, fallback) => /^[A-Za-z_$][\w$]*$/.test(value || '') ? value : fallback;

  function renderTeamOptions(selectedTeams) {
    return Array.from({ length: 5 }, (_, idx) => {
      const value = String(idx + 2);
      return `<option value="${value}" ${selectedTeams === value ? 'selected' : ''}>${value} Tổ</option>`;
    }).join('');
  }

  function makeSetupClass(defaultGrade = '5') {
    return class extends HTMLElement {
      connectedCallback() {
        if (this.dataset.mounted) return;
        this.dataset.mounted = 'true';
        this.style.display = 'contents';

        const isKhoi3 = this.tagName === 'KHOI3-SETUP' || this.getAttribute('ui') === 'khoi3';
        const grade = this.getAttribute('grade') || (isKhoi3 ? '3' : defaultGrade);
        const heading = escapeHtml(this.getAttribute('heading') || (isKhoi3 ? '🛠️ XƯỞNG RÁP PC 🛠️' : `TIN HỌC ${grade}`));
        const description = escapeHtml(this.getAttribute('description') || '');
        const teamLabel = escapeHtml(this.getAttribute('team-label') || 'Số lượng tổ (Tối đa 6):');
        const teamUnit = escapeHtml(this.getAttribute('team-unit') || 'Tổ');
        const startingScoreLabel = escapeHtml(this.getAttribute('starting-score-label') || 'Điểm sàn mỗi tổ:');
        const startLabel = escapeHtml(this.getAttribute('start-label') || (isKhoi3 ? 'Bắt đầu ➔' : 'VÀO TIẾT HỌC 🚀'));
        const selectedClass = this.getAttribute('default-class') || (isKhoi3 ? '3_2' : `${grade}_1`);
        const selectedTeams = /^[2-6]$/.test(this.getAttribute('default-teams') || '')
          ? this.getAttribute('default-teams')
          : '4';
        const defaultScore = escapeHtml(this.getAttribute('default-score') || '1000');

        const classOptionsMarkup = (typeof window.renderAllClassOptions === 'function')
          ? window.renderAllClassOptions(selectedClass)
          : `<option value="${escapeHtml(selectedClass)}" selected>Lớp ${escapeHtml(selectedClass.replace('_', '/'))}</option>`;

        if (isKhoi3) {
          this.innerHTML = `
            <div id="setup-screen">
              <div class="setup-box">
                <div class="tag">Tin học ${escapeHtml(grade)}</div>
                <h1>${heading}</h1>
                <p class="setup-lesson-description">${description}</p>
                <div class="setup-row">
                  <span>Lớp học:</span>
                  <select id="classSel" onchange="if(typeof setupClass==='function')setupClass()">
                    ${classOptionsMarkup}
                  </select>
                </div>
                <div class="setup-row">
                  <span>Số tổ (2 - 6 tổ):</span>
                  <select id="teamCount" onchange="if(typeof setupClass==='function')setupClass()">
                    ${renderTeamOptions(selectedTeams)}
                  </select>
                </div>
                <div class="setup-row">
                  <span>${startingScoreLabel}</span>
                  <input id="s-score" type="number" min="0" step="10" value="${defaultScore}" class="setup-score-input" />
                </div>
                <button class="btn-setup" type="button" onclick="if(typeof startPhase1==='function')startPhase1();else if(typeof startGame==='function')startGame();">${startLabel}</button>
              </div>
            </div>`;
          return;
        }

        this.innerHTML = `
          <div id="setup-screen">
            <div class="setup-box">
              <h2>${heading}</h2>
              <div class="setup-lesson-description">${description}</div>
              <div class="setup-row">
                <span>Chọn lớp học:</span>
                <select id="s-class">
                  ${classOptionsMarkup}
                </select>
              </div>
              <div class="setup-row">
                <span>${teamLabel}</span>
                <select id="s-teams">
                  ${Array.from({ length: 5 }, (_, idx) => {
                    const value = String(idx + 2);
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
          </div>`;
      }
    };
  }

  function makeSidebarClass() {
    return class extends HTMLElement {
      connectedCallback() {
        if (this.dataset.mounted) return;
        this.dataset.mounted = 'true';
        this.style.display = 'contents';

        const isKhoi3 = this.tagName === 'KHOI3-SIDEBAR' || this.getAttribute('ui') === 'khoi3';
        if (isKhoi3) {
          const title = escapeHtml(this.getAttribute('title') || '🛠️ Bảng đội');
          this.innerHTML = `
            <aside class="side">
              <div class="shead">
                <span>${title}</span>
                <button class="btn gray" type="button" onclick="if(typeof openAddHs==='function')openAddHs();else if(typeof addStudent==='function')addStudent();">➕ Thêm học sinh</button>
                <button class="btn warn" type="button" onclick="if(typeof openEnd==='function')openEnd();else if(typeof showSummary==='function')showSummary();">📊 Tổng kết</button>
                <button class="btn danger" type="button" onclick="if(window.sessionManager)window.sessionManager.clear();else if(typeof clearSession==='function')clearSession();" style="background:#ef4444; color:#fff;" title="Xóa dữ liệu phiên học để bắt đầu lớp mới">🗑️ Xóa phiên</button>
              </div>
              <div id="teamList"></div>
            </aside>`;
          return;
        }

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
              <button class="btn-tiny" type="button" onclick="openEnd()" title="Tổng kết đánh giá và xuất CSV">📋 Tổng kết</button>
              <button class="btn-tiny" type="button" onclick="if(window.sessionManager)window.sessionManager.clear();else if(typeof clearSession==='function')clearSession();" title="Xóa dữ liệu phiên học để bắt đầu lớp mới" style="background:#fee2e2; color:#ef4444; border-color:#f87171;">🗑️ Xóa phiên</button>
            </div>
            ${showGoldBoard
              ? '<div class="sidebar-gold-board"><button class="btn-tiny" type="button" onclick="switchAi(3)" title="Xem Bảng vàng xếp hạng">🏆 Bảng Vàng</button></div>'
              : ''}
            ${showNavigation
              ? `<div class="nav">
                  <button type="button" onclick="goSlide(-1)" title="Trang trước (Phím mũi tên trái)">◀</button>
                  ${showPageIndicator ? '<span class="page-indicator" id="slide-page-num">1 / 1</span>' : ''}
                  <button type="button" onclick="goSlide(1)" title="Trang tiếp (Phím mũi tên phải)">▶</button>
                </div>`
              : ''}
          </aside>`;
      }
    };
  }

  function makeStudentModalClass() {
    return class extends HTMLElement {
      connectedCallback() {
        if (this.dataset.mounted) return;
        this.dataset.mounted = 'true';
        this.style.display = 'contents';

        const isKhoi3 = this.tagName === 'KHOI3-STUDENT-MODAL' || this.getAttribute('ui') === 'khoi3';
        const textareaId = safeIdentifier(this.getAttribute('textarea-id'), 'hs-input');
        const closeHandler = safeHandler(this.getAttribute('close-handler'), 'closeAddHs');
        const saveHandler = safeHandler(this.getAttribute('save-handler'), 'saveAddHs');
        const cancelLabel = escapeHtml(this.getAttribute('cancel-label') || (isKhoi3 ? 'Đóng' : 'Hủy'));

        if (isKhoi3) {
          this.innerHTML = `
            <div class="modal-overlay" id="hs-modal" style="display:none;" onclick="if(event.target===this)${closeHandler}()">
              <div class="modal-box">
                <h3 class="student-modal-title">➕ Thêm Học Sinh</h3>
                <div class="student-modal-hint">Nhập hoặc dán tên học sinh (mỗi em một dòng):</div>
                <textarea id="${textareaId}" placeholder="Nguyễn Văn A&#10;Trần Thị B&#10;Lê Văn C"></textarea>
                <div class="modal-actions">
                  <button class="btn green" type="button" onclick="${saveHandler}()">Lưu danh sách</button>
                  <button class="btn gray" type="button" onclick="${closeHandler}()">${cancelLabel}</button>
                </div>
              </div>
            </div>`;
          return;
        }

        this.innerHTML = `
          <div class="modal-overlay" id="hs-modal" onclick="if(event.target===this)${closeHandler}()">
            <div class="modal-box">
              <h3 class="student-modal-title">➕ Thêm Học Sinh</h3>
              <div class="student-modal-import">
                <div class="student-modal-hint">Dán danh sách học sinh (mỗi em một dòng):</div>
              </div>
              <textarea id="${textareaId}" placeholder="Nguyễn Văn A&#10;Trần Thị B&#10;Lê Văn C"></textarea>
              <div>
                <button class="btn-modal-ok" type="button" onclick="${saveHandler}()">Thêm vào danh sách</button>
                <button class="btn-modal-cancel" type="button" onclick="${closeHandler}()">${cancelLabel}</button>
              </div>
            </div>
          </div>`;
      }
    };
  }

  function makeSummaryClass() {
    return class extends HTMLElement {
      connectedCallback() {
        if (this.dataset.mounted) return;
        this.dataset.mounted = 'true';
        this.style.display = 'contents';

        const isKhoi3 = this.tagName === 'KHOI3-SUMMARY' || this.getAttribute('ui') === 'khoi3';
        if (isKhoi3) {
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
            </section>`;
          return;
        }

        const heading = escapeHtml(this.getAttribute('heading') || '📋 Quản lí học sinh các tổ (Kéo thả thẻ tên)');
        const exportLabel = escapeHtml(this.getAttribute('export-label') || '📥 Xuất File CSV');
        const goldBoard = this.hasAttribute('gold-board');
        this.innerHTML = `
          <div id="end-screen">
            <div class="ehead">
              <h1>${heading}</h1>
              <div class="summary-actions">
                <button class="summary-back" type="button" onclick="closeEnd()">← Quay lại</button>
                ${goldBoard ? '<button class="summary-board" type="button" onclick="closeEnd(); switchAi(3);">🏆 Xem Bảng Vàng</button>' : ''}
                <button class="summary-export" type="button" onclick="exportExcel()">${exportLabel}</button>
              </div>
            </div>
            <div class="kanban" id="kanban"></div>
          </div>`;
      }
    };
  }

  const registry = [
    ['lesson-setup', () => makeSetupClass('5')],
    ['lesson-sidebar', makeSidebarClass],
    ['lesson-student-modal', makeStudentModalClass],
    ['lesson-summary', makeSummaryClass],
    ['khoi5-setup', () => makeSetupClass('5')],
    ['khoi5-sidebar', makeSidebarClass],
    ['khoi5-student-modal', makeStudentModalClass],
    ['khoi5-summary', makeSummaryClass],
    ['khoi3-setup', () => makeSetupClass('3')],
    ['khoi3-sidebar', makeSidebarClass],
    ['khoi3-student-modal', makeStudentModalClass],
    ['khoi3-summary', makeSummaryClass],
  ];

  registry.forEach(([tag, factory]) => {
    if (!customElements.get(tag)) {
      customElements.define(tag, factory());
    }
  });
})();
