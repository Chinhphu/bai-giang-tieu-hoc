/**
 * KHOI 3 - WEB COMPONENTS & GOOGLE DRIVE INTEGRATION
 * Cung cấp:
 * 1. Web Components: <khoi3-setup>, <khoi3-sidebar>, <khoi3-student-modal>, <khoi3-summary>
 * 2. Đẩy file Excel nhật ký trực tiếp lên Google Drive qua Google Apps Script (uploadExcelToDrive)
 * 3. Hệ thống thông báo Toast chuẩn UI Khối 3
 */

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

  /* ================= 2. ĐẨY EXCEL LÊN GOOGLE DRIVE ================= */
  const GAS_UPLOAD_URL = 'https://script.google.com/macros/s/AKfycbywqn9mgeON9fTqp3xmnGbuqWW-eChABhvaotV4qHezosaqlYuWpF0c4vnB7APkuXBSRw/exec';
  window.GAS_UPLOAD_URL = GAS_UPLOAD_URL;

  window.uploadExcelToDrive = async function uploadExcelToDrive(wb, fileName) {
    if (!wb || typeof window.XLSX === 'undefined') {
      if (window.toast) {
        window.toast('⚠️ Chưa nạp xong thư viện Excel!', 2500, 'var(--red)');
      } else {
        alert('Chưa nạp thư viện Excel!');
      }
      return;
    }

    if (!fileName.endsWith('.xlsx')) {
      fileName += '.xlsx';
    }

    if (window.toast) {
      window.toast('☁️ Đang đồng bộ nhật ký lên Google Drive...', 4500, 'var(--primary)');
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
        if (window.toast) {
          window.toast('✅ Đã lưu vào Drive (Thư mục Log tiết học)!', 4000, 'var(--green)');
        } else {
          alert('Đã lưu thành công vào Google Drive: ' + fileName);
        }
        return result;
      } else {
        throw new Error((result && result.message) || 'Lỗi từ máy chủ Google Apps Script');
      }
    } catch (err) {
      console.warn('Không thể gửi lên Google Drive, chuyển sang tải file trực tiếp:', err);
      // Fallback an toàn: Tự động tải file về máy để thầy cô không bị mất dữ liệu
      window.XLSX.writeFile(wb, fileName);
      if (window.toast) {
        window.toast('⚠️ Không kết nối được Drive. Đã tự động lưu file về máy!', 4500, 'var(--red)');
      } else {
        alert('Không thể kết nối đến Google Drive. File đã được lưu về máy: ' + fileName);
      }
    }
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
      const exportLabel = escapeHtml(this.getAttribute('export-label') || '📥 Xuất Excel báo cáo');

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
})();

