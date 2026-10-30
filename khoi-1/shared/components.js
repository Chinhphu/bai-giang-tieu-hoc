/**
 * =========================================================================
 * QUẢN LÝ LỚP HỌC, LƯU TRẠNG THÁI LOCALSTORAGE & POPUP CẦM CHUỘT SVG
 * =========================================================================
 */

(() => {
  /* 1. CHẶN PHÍM F5 CỦA HỌC SINH (GIÁO VIÊN GIỮ SHIFT + F5 ĐỂ RELOAD) */
  function showToast(msg, isWarn = false) {
    let el = document.getElementById('k1-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'k1-toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.style.background = isWarn
      ? 'linear-gradient(135deg, #F43F5E 0%, #BE123C 100%)'
      : 'linear-gradient(135deg, #10B981 0%, #047857 100%)';
    el.classList.add('show');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('show'), 2600);
  }

  window.addEventListener('keydown', e => {
    const isF5 = e.key === 'F5' || e.keyCode === 116;
    const isCtrlR = (e.ctrlKey || e.metaKey) && (e.key === 'r' || e.key === 'R');
    if (e.shiftKey && isF5) return true;
    if (isF5 || isCtrlR) {
      e.preventDefault();
      e.stopPropagation();
      showToast('Cấm bấm F5 tải lại trang!', true);
      if (window.Khoi1Audio) window.Khoi1Audio.playBuzzer();
      return false;
    }
  }, true);

  /* 2. DANH SÁCH HỌC SINH DỰ PHÒNG OFFLINE */
  const FALLBACK_DATA = {
    "1_6": [
      "Lê Nguyễn Thảo An", "Dương Quỳnh Anh", "Nguyễn Duy Anh", "Nguyễn Trần Bảo Anh", "Tô Tuệ Anh",
      "Trần Nguyễn Phương Anh", "Danh Trần Gia Bảo", "Trần Tuyết Băng", "Nguyễn Hoàng Dũng", "Phạm Quang Đạt",
      "Nguyễn Phúc Hậu", "Huỳnh Minh Huy", "Phạm Khắc Huy", "Phạm Minh Ken", "Thái Phát Khang",
      "Lâm Hoàng Gia Khương", "Nguyễn Tuấn Kiệt", "Đỗ Ngọc Thiên Kim", "Nguyễn Ngọc Thiên Kim", "Đặng Bảo Linh",
      "Danh Nguyễn Trà My", "Hà Tiểu My", "Nguyễn Cẩm Ngọc", "Nguyễn Hoàng Bảo Ngọc", "Nguyễn Phan Kim Nguyên",
      "Lưu Nguyệt Nhân", "Lương Huỳnh An Nhiên", "Huỳnh Minh Phát", "Lê Hoàng Phát", "Lưu Vương Thành Phát",
      "Đàm Tâm Phú", "Huỳnh Ngọc Như Phúc", "Ngô Anh Quốc", "Đặng Phi Thiên", "Nguyễn Hoàng Thiện",
      "Danh Minh Thuận", "Tô Minh Trí", "Đặng Bảo Trúc", "Phan Nhật Trường", "Võ Huỳnh Khánh Vân",
      "Mai Đức Vĩnh", "Danh Nguyễn Hoàng Yến"
    ]
  };

  const Khoi1Components = (() => {
    let currentClass = '1_6';
    let students = [];
    let currentTab = 'waiting';
    let activeStudent = null;
    let nextStudent = null;
    const KEY_PREFIX = 'k1_arcade_tracker_';

    async function init(defaultClass = '1_6') {
      currentClass = defaultClass;
      await loadStudents(currentClass);
      renderSidebar();
      ensureMouseModal();
    }

    async function setClass(cls) {
      currentClass = cls;
      await loadStudents(cls);
      renderSidebar();
      showToast(`Đã chuyển sang Lớp 1/${cls.split('_')[1]}`);
    }

    async function loadStudents(cls) {
      let saved = null;
      try {
        saved = localStorage.getItem(KEY_PREFIX + cls);
      } catch (error) {
        console.error('Không thể đọc dữ liệu lớp đã lưu.', error);
        showToast('Không đọc được dữ liệu lớp đã lưu. Danh sách tạm thời sẽ được dùng.', true);
      }

      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && Array.isArray(parsed.students) && parsed.students.length > 0 &&
              parsed.students.every(student => student && Number.isInteger(student.id) && typeof student.name === 'string')) {
            students = parsed.students;
            activeStudent = parsed.activeStudent || null;
            nextStudent = parsed.nextStudent || null;
            return;
          }
          showToast('Dữ liệu lớp đã lưu không đúng định dạng. Đang nạp lại danh sách.', true);
        } catch (error) {
          console.error('Không thể đọc dữ liệu lớp đã lưu.', error);
          showToast('Dữ liệu lớp đã lưu bị lỗi. Đang nạp lại danh sách.', true);
        }
      }

      let rawNames = null;
      const paths = [
        '../../assets/data/students_1_2026_2027.json',
        '../assets/data/students_1_2026_2027.json'
      ];
      for (const p of paths) {
        try {
          const res = await fetch(p);
          if (res.ok) {
            const json = await res.json();
            if (json && json[cls]) {
              rawNames = json[cls].map(item => typeof item === 'string' ? item : (item.name || item.hoTen));
              break;
            }
          }
        } catch (_) {}
      }

      if (!rawNames || rawNames.length === 0) {
        rawNames = FALLBACK_DATA[cls] || FALLBACK_DATA['1_6'];
      }

      students = rawNames.map((n, i) => ({
        id: i + 1,
        code: `HS1_${String(i + 1).padStart(2, '0')}`,
        name: String(n).trim(),
        status: 'waiting', // 'waiting' | 'called'
        isPriority: false,
        calledCount: 0,
        mouseSkill: 'Tốt',
        score: 0
      }));
      activeStudent = null;
      nextStudent = null;
      save();
    }

    function save() {
      try {
        localStorage.setItem(KEY_PREFIX + currentClass, JSON.stringify({
          students,
          activeStudent,
          nextStudent
        }));
      } catch (error) {
        console.error('Không thể lưu dữ liệu lớp.', error);
        showToast('Không lưu được dữ liệu lớp trên thiết bị này.', true);
      }
    }

    function getUncalledStudents() {
      const waiting = students.filter(s => s.status === 'waiting').map(s => s.name);
      return waiting.length > 0 ? waiting : students.map(s => s.name);
    }

    function getActiveStudent() {
      return activeStudent;
    }

    function getAllStudents() {
      return students;
    }

    function setActiveTurn(main, next) {
      activeStudent = main;
      nextStudent = next;
      save();
      renderSidebar();
      window.dispatchEvent(new CustomEvent('k1-turn-changed', { detail: { main, next } }));
    }

    function markStudentDone(name = activeStudent, bonusScore = 10) {
      if (!name) return;
      const st = students.find(s => s.name === name);
      if (st) {
        st.status = 'called';
        st.calledCount += 1;
        st.score = Math.max(st.score || 0, bonusScore);
      }
      activeStudent = (nextStudent && nextStudent !== 'Đã hết danh sách chờ') ? nextStudent : null;
      const pool = students.filter(s => s.status === 'waiting' && s.name !== activeStudent);
      nextStudent = pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)].name : null;
      save();
      renderSidebar();
      showToast(`Đã ghi nhận ${name} hoàn thành thực hành!`);
      window.dispatchEvent(new CustomEvent('k1-turn-changed', { detail: { main: activeStudent, next: nextStudent } }));
    }

    function handleDiscipline(name = activeStudent) {
      if (!name) return;
      if (window.Khoi1Audio) window.Khoi1Audio.playBuzzer();
      showToast(`Đã hủy lượt của ${name} do chưa giữ trật tự!`, true);
      activeStudent = (nextStudent && nextStudent !== 'Đã hết danh sách chờ') ? nextStudent : null;
      nextStudent = null;
      save();
      renderSidebar();
    }

    function skipStudent(name = activeStudent) {
      activeStudent = (nextStudent && nextStudent !== 'Đã hết danh sách chờ') ? nextStudent : null;
      nextStudent = null;
      save();
      renderSidebar();
      if (name) showToast(`Đã tạm bỏ qua ${name}`);
    }

    function toggleStar(id) {
      const st = students.find(s => s.id === id);
      if (st) {
        st.isPriority = !st.isPriority;
        save();
        renderSidebar();
        if (st.isPriority) {
          if (window.Khoi1Audio) window.Khoi1Audio.playVictoryFanfare();
          showToast(`Đã thưởng Sao Ngoan Ưu Tiên cho ${st.name}!`);
        }
      }
    }

    function resetNewRound() {
      students.forEach(s => { s.status = 'waiting'; });
      activeStudent = null;
      nextStudent = null;
      save();
      renderSidebar();
      showToast('Đã mở vòng gọi tên mới cho cả lớp!');
    }

    function setTab(tab) {
      currentTab = tab;
      renderSidebar();
    }

    function renderSidebar() {
      const sb = document.getElementById('k1-sidebar');
      if (!sb) return;
      const waiting = students.filter(s => s.status === 'waiting');
      const called = students.filter(s => s.status === 'called');
      const stars = students.filter(s => s.isPriority);

      const list = currentTab === 'waiting' ? waiting : (currentTab === 'called' ? called : stars);

      sb.innerHTML = `
        <div class="k1-sb-header">
          <div class="k1-sb-brand">TIN HỌC LỚP 1</div>
          <select class="k1-class-select" onchange="Khoi1Components.setClass(this.value)">
            ${['1_1', '1_2', '1_3', '1_4', '1_5', '1_6'].map(c => `
              <option value="${c}" ${c === currentClass ? 'selected' : ''}>Lớp 1/${c.split('_')[1]}</option>
            `).join('')}
          </select>
        </div>

        <div class="k1-turn-box">
          <div class="k1-turn-card active-player">
            <div class="k1-turn-tag">Đang thực hành chuột</div>
            <div class="k1-turn-name">${activeStudent || 'Chưa chọn học sinh'}</div>
            ${activeStudent ? `
              <div class="k1-turn-actions">
                <button class="k1-mini-act done" type="button" onclick="Khoi1Components.markStudentDone()">Xong</button>
                <button class="k1-mini-act warn" type="button" onclick="Khoi1Components.handleDiscipline()">Hủy lượt</button>
                <button class="k1-mini-act skip" type="button" onclick="Khoi1Components.skipStudent()">Vắng</button>
              </div>
            ` : ''}
          </div>
          <div class="k1-turn-card next-player">
            <div class="k1-turn-tag">Chuẩn bị kế tiếp</div>
            <div class="k1-turn-name" style="font-size:14px;">${nextStudent || '—'}</div>
          </div>
        </div>

        <div class="k1-sb-tabs">
          <button class="k1-sb-tab ${currentTab === 'waiting' ? 'active' : ''}" type="button" onclick="Khoi1Components.setTab('waiting')">
            Chờ (${waiting.length})
          </button>
          <button class="k1-sb-tab ${currentTab === 'called' ? 'active' : ''}" type="button" onclick="Khoi1Components.setTab('called')">
            Đã lên (${called.length})
          </button>
          <button class="k1-sb-tab ${currentTab === 'star' ? 'active' : ''}" type="button" onclick="Khoi1Components.setTab('star')">
            Ưu tiên (${stars.length})
          </button>
        </div>

        <div class="k1-student-scroll">
          ${list.map(s => `
            <div class="k1-st-row ${s.isPriority ? 'is-star' : ''} ${s.status === 'called' ? 'is-done' : ''}">
              <span class="k1-st-name" title="${s.name}">${s.name}</span>
              <div class="k1-st-btns">
                <button class="k1-st-icon-btn ${s.isPriority ? 'star-on' : ''}" type="button" title="Thưởng sao ưu tiên tuần sau" onclick="Khoi1Components.toggleStar(${s.id})">★</button>
                <button class="k1-st-icon-btn" type="button" title="Gọi lên bảng ngay" onclick="Khoi1Components.setActiveTurn('${s.name}', null)">▶</button>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="k1-sb-footer">
          <button class="k1-btn k1-btn-amber" type="button" onclick="Khoi1Gacha.open('pond')">
            BẮT VỊT GỌI TÊN
          </button>
          <div style="display:flex; gap:6px;">
            <button class="k1-btn k1-btn-sky k1-btn-sm" style="flex:1;" type="button" onclick="Khoi1Components.openMouseModal()">
              Mẫu Cầm Chuột
            </button>
            <button class="k1-btn k1-btn-mint k1-btn-sm" style="flex:1;" type="button" onclick="Khoi1Components.exportCsv()">
              Xuất CSV
            </button>
          </div>
        </div>
      `;
    }

    /* 3. MODAL MẪU CẦM CHUỘT VECTOR (KHÔNG CHỮ DÀI DÒNG) */
    function ensureMouseModal() {
      if (document.getElementById('k1-mouse-overlay')) return;
      const div = document.createElement('div');
      div.id = 'k1-mouse-overlay';
      div.className = 'k1-overlay';
      div.innerHTML = `
        <div class="k1-modal-card" style="max-width:680px; text-align:center; padding:24px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <div style="font-size:24px; font-weight:900; color:#0284C7;">CÁCH ĐẶT TAY CẦM CHUỘT ĐÚNG</div>
            <button class="k1-close-circle" type="button" onclick="Khoi1Components.closeMouseModal()">✕</button>
          </div>

          <div style="display:flex; align-items:center; justify-content:space-around; flex-wrap:wrap; gap:20px; padding:10px 0;">
            <svg width="230" height="270" viewBox="0 0 240 280">
              <defs>
                <linearGradient id="mBody" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#F8FAFC"/>
                  <stop offset="100%" stop-color="#CBD5E1"/>
                </linearGradient>
              </defs>
              <!-- Thân chuột 3D -->
              <rect x="45" y="25" width="150" height="225" rx="75" fill="url(#mBody)" stroke="#475569" stroke-width="5"/>
              <!-- Nút Trái Đỏ phát sáng -->
              <path d="M 48 100 L 48 115 L 116 115 L 116 28 C 75 28, 48 58, 48 100 Z" fill="#F43F5E" stroke="#BE123C" stroke-width="3"/>
              <!-- Nút Phải Xanh -->
              <path d="M 124 28 L 124 115 L 192 115 L 192 100 C 192 58, 165 28, 124 28 Z" fill="#38BDF8" stroke="#0284C7" stroke-width="3"/>
              <!-- Con lăn giữa -->
              <rect x="112" y="52" width="16" height="38" rx="8" fill="#FACC15" stroke="#B45309" stroke-width="2.5"/>
              <!-- Nhãn trực quan -->
              <text x="82" y="82" fill="#FFFFFF" font-size="16" font-weight="900" text-anchor="middle">TRÁI</text>
              <text x="158" y="82" fill="#FFFFFF" font-size="16" font-weight="900" text-anchor="middle">PHẢI</text>
            </svg>

            <div style="display:flex; flex-direction:column; gap:12px; text-align:left;">
              <div style="background:#FFF1F2; border-left:6px solid #F43F5E; padding:12px 18px; border-radius:12px;">
                <div style="font-size:20px; font-weight:900; color:#BE123C;">NGÓN TRỎ ➔ NÚT TRÁI (ĐỎ)</div>
              </div>
              <div style="background:#F0F9FF; border-left:6px solid #0284C7; padding:12px 18px; border-radius:12px;">
                <div style="font-size:20px; font-weight:900; color:#0369A1;">NGÓN GIỮA ➔ NÚT PHẢI (XANH)</div>
              </div>
              <div style="background:#F0FDF4; border-left:6px solid #10B981; padding:12px 18px; border-radius:12px;">
                <div style="font-size:20px; font-weight:900; color:#047857;">THẢ LỎNG CỔ TAY NHẸ NHÀNG</div>
              </div>
            </div>
          </div>

          <div style="margin-top:16px; display:flex; justify-content:center; gap:14px;">
            <button class="k1-btn k1-btn-mint k1-btn-lg" type="button" onclick="Khoi1Components.rateMouse('Đúng cách')">
              Cầm Chuột Đúng (+Điểm)
            </button>
            <button class="k1-btn k1-btn-coral k1-btn-lg" type="button" onclick="Khoi1Components.rateMouse('Còn gồng tay')">
              Còn Gồng Tay (Nhắc nhở)
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(div);
    }

    function openMouseModal() {
      ensureMouseModal();
      document.getElementById('k1-mouse-overlay').classList.add('active');
      if (window.Khoi1Audio) window.Khoi1Audio.playClick();
    }

    function closeMouseModal() {
      const el = document.getElementById('k1-mouse-overlay');
      if (el) el.classList.remove('active');
    }

    function rateMouse(skill) {
      if (activeStudent) {
        const st = students.find(s => s.name === activeStudent);
        if (st) st.mouseSkill = skill;
        save();
      }
      if (skill === 'Đúng cách' && window.Khoi1Audio) window.Khoi1Audio.playVictoryFanfare();
      showToast(`Đã ghi nhận tư thế cầm chuột: ${skill}`);
      closeMouseModal();
    }

    function buildFileName(lessonNum = '08', classKey = null) {
      if (typeof window.buildExportFileName === 'function') {
        return window.buildExportFileName({ grade: 1, classId: classKey || currentClass, lesson: lessonNum });
      }
      const d = new Date(), pad = n => String(n).padStart(2, '0');
      const c = String(classKey || currentClass || '1_1').replace(/[^a-zA-Z0-9\-]/g, '-');
      return `KetQua_TinHoc1_Lop_${c}_Tiet_${String(lessonNum).padStart(2, '0')}_${pad(d.getHours())}h${pad(d.getMinutes())}p${pad(d.getSeconds())}s_Ngay_${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}.csv`;
    }

    function exportRows(rows, fileName, sheetName = 'Danh_Gia_SMAS') {
      let name = fileName;
      if (!name || name.endsWith('.xlsx')) {
        name = buildFileName('08', currentClass);
      }
      if (!name.endsWith('.csv')) {
        name = name.replace(/\.xlsx?$/i, '') + '.csv';
      }

      if (typeof window.LessonExport !== 'undefined' && window.LessonExport.download) {
        window.LessonExport.download(rows, name);
        showToast(`Đã xuất file CSV: ${name}!`);
        return;
      }

      const columns = Object.keys(rows[0] || {});
      const csv = [
        columns,
        ...rows.map(row => columns.map(column => row[column] == null ? '' : row[column]))
      ].map(values => values.map(value => `"${String(value).replace(/"/g, '""')}"`).join(',')).join('\r\n');
      const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = name;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      showToast(`Đã tải file CSV: ${name}`);
    }

    /* 4. XUẤT CSV CHUẨN SMAS & THÔNG TƯ 27 */
    function exportCsv() {
      const rows = students.map((s, idx) => ({
        "STT": idx + 1,
        "Mã HS": s.code,
        "Họ và Tên": s.name,
        "Lớp": `1/${currentClass.split('_')[1] || currentClass}`,
        "Trạng Thái": s.status === 'called' ? `Đã thực hành (${s.calledCount} lượt)` : 'Chưa gọi',
        "Tư Thế Cầm Chuột": s.mouseSkill,
        "Điểm Thưởng": s.score || 0,
        "Ưu Tiên Tuần Sau": s.isPriority ? 'Có (Sao Ngoan)' : '',
        "Mức Đạt (TT27)": s.status === 'called' ? 'Hoàn thành tốt (T)' : 'Hoàn thành (H)',
        "Nhận Xét SMAS": s.status === 'called'
          ? 'Biết cầm chuột đúng cách, thực hiện tốt thao tác nháy và kéo thả chuột sắp xếp bảng chữ cái.'
          : 'Thực hiện đúng nội quy giờ học, chú ý quan sát thao tác mẫu trên máy tính.'
      }));

      const fileName = buildFileName('08', currentClass);
      exportRows(rows, fileName);
    }

    return {
      init, setClass, setTab, getUncalledStudents, getActiveStudent, getAllStudents,
      setActiveTurn, markStudentDone, handleDiscipline, skipStudent, toggleStar,
      resetNewRound, openMouseModal, closeMouseModal, rateMouse, exportCsv, exportExcel: exportCsv, exportRows, buildExportFileName: buildFileName, showToast
    };
  })();

  class Khoi1Sidebar extends HTMLElement {
    connectedCallback() {
      this.id = 'k1-sidebar';
      this.className = 'k1-sidebar';
      Khoi1Components.init(this.getAttribute('default-class') || '1_6');
    }
  }
  if (!customElements.get('khoi1-sidebar')) {
    customElements.define('khoi1-sidebar', Khoi1Sidebar);
  }

  window.Khoi1Components = Khoi1Components;
})();