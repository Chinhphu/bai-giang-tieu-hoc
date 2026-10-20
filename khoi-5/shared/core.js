/**
 * KHOI 5 - CORE ALL-IN-ONE ENGINE
 * Bộ công cụ tiện ích dùng chung cho các bài giảng Khối 5:
 * Audio, Slides, Scoreboard, Students (JSON & Excel), Gacha, và Utils.
 * 
 * NGUYÊN TẮC THIẾT KẾ:
 * 1. KHÔNG tự động can thiệp DOM hoặc tự gắn phím tắt khi chưa được bài giảng yêu cầu.
 * 2. KHÔNG ghi đè lên các hàm/biến đã được bài giảng định nghĩa riêng (dùng if (!window.xxx)).
 * 3. Cho phép mỗi bài giảng giữ nguyên 100% sự tùy biến và bố cục giao diện độc lập.
 */

// ==========================================
// 1. AUDIO ENGINE (Web Audio API)
// ==========================================
const Khoi5Audio = (() => {
  let _ctx = null;
  const getCtx = () => {
    const C = window.AudioContext || window.webkitAudioContext;
    if (!C) return null;
    if (!_ctx || _ctx.state === 'closed') _ctx = new C();
    if (_ctx.state === 'suspended') _ctx.resume();
    return _ctx;
  };

  function playCorrectSound() {
    const ctx = getCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator(), gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, now);
    osc.frequency.setValueAtTime(880, now + 0.12);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.3, now + 0.04);
    gain.gain.setValueAtTime(0.3, now + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(now); osc.stop(now + 0.36);
  }

  function playSuccessSound() {
    const ctx = getCtx();
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator(), gain = ctx.createGain();
      const t = ctx.currentTime + idx * 0.09;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.exponentialRampToValueAtTime(0.25, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(t); osc.stop(t + 0.3);
    });
  }

  function playPenaltySound() {
    const ctx = getCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator(), gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(70, now + 0.6);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.28, now + 0.04);
    gain.gain.setValueAtTime(0.28, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(now); osc.stop(now + 0.68);
  }

  function playScoreSound(delta) {
    const ctx = getCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator(), gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    if (delta > 0) {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
    } else {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.2);
    }
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
    osc.start(now); osc.stop(now + 0.35);
  }

  function playGachaSound() {
    const ctx = getCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const freqs = [440, 554.37, 659.25, 880];
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator(), gain = ctx.createGain();
      const t = now + i * 0.08;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, t);
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.exponentialRampToValueAtTime(0.2, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(t); osc.stop(t + 0.26);
    });
  }

  function playClickSound() {
    const ctx = getCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator(), gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(900, now);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(now); osc.stop(now + 0.06);
  }

  return { playCorrectSound, playSuccessSound, playPenaltySound, playScoreSound, playGachaSound, playClickSound };
})();

// ==========================================
// 2. SLIDE & NOTEBOOK ENGINE (KHÔNG TỰ ĐỘNG CAN THIỆP DOM)
// ==========================================
const Khoi5Slides = (() => {
  let currentSlideId = '';
  let slideList = [];
  let keyboardInitialized = false;

  function scanSlides() {
    const slides = document.querySelectorAll('.slide');
    slideList = Array.from(slides).map(s => s.id).filter(Boolean);
    const active = document.querySelector('.slide.active');
    if (active) currentSlideId = active.id;
    else if (slideList.length > 0) currentSlideId = slideList[0];
    return slideList;
  }

  function goToSlide(targetId) {
    if (typeof targetId === 'number') targetId = 'slide-' + targetId;
    const target = document.getElementById(targetId);
    if (!target) return;
    document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
    target.classList.add('active');
    currentSlideId = targetId;
    target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function nextSlide(step) {
    if (typeof step === 'number' && !isNaN(step)) {
      goToSlide('slide-' + step);
      return;
    }
    if (!slideList.length) scanSlides();
    const idx = slideList.indexOf(currentSlideId);
    if (idx >= 0 && idx < slideList.length - 1) {
      goToSlide(slideList[idx + 1]);
    }
  }

  function prevSlide() {
    if (!slideList.length) scanSlides();
    const idx = slideList.indexOf(currentSlideId);
    if (idx > 0) goToSlide(slideList[idx - 1]);
  }

  function formatTodayDate(customSelector = null) {
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const today = new Date();
    const dayName = days[today.getDay()];
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const dateString = `${dayName}, ngày ${day} tháng ${month} năm ${year}`;
    const selectors = customSelector ? [customSelector] : ['.today-date', '.currentDateDisplay', '#lessonDate'];
    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => { el.textContent = dateString; });
    });
    return dateString;
  }

  function initKeyboard() {
    if (keyboardInitialized) return;
    keyboardInitialized = true;
    window.addEventListener('keydown', (e) => {
      const tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault(); nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault(); prevSlide();
      }
    });
  }

  return { scanSlides, goToSlide, nextSlide, prevSlide, formatTodayDate, initKeyboard };
})();

// ==========================================
// 3. SCOREBOARD ENGINE
// ==========================================
const Khoi5Scoreboard = (() => {
  let teams = [];
  let scoreMap = {};
  let layoutType = 'topbar';

  function init(options = {}) {
    const count = options.teamCount || 4;
    const containerId = options.containerId || 'scoreboard-container';
    const initialScore = typeof options.initialScore === 'number' ? options.initialScore : 0;
    const names = options.teamNames || [];
    layoutType = options.layout || 'topbar';

    teams = [];
    scoreMap = {};
    for (let i = 1; i <= count; i++) {
      const name = names[i - 1] || `Dãy ${i}`;
      teams.push({ id: i, name, score: initialScore });
      scoreMap[i] = initialScore;
    }
    render(containerId);
    return teams;
  }

  function render(containerId = 'scoreboard-container') {
    const el = document.getElementById(containerId);
    if (!el) return;

    if (layoutType === 'sidebar') {
      el.innerHTML = teams.map(t => `
        <div class="team-score" data-team="${t.id}">
          <div class="team-name">${t.name}</div>
          <div class="score-number" id="score-${t.id}">${scoreMap[t.id]}</div>
          <div class="score-controls">
            <button class="score-btn minus" onclick="Khoi5Scoreboard.updateScore(${t.id}, -10)">-10</button>
            <button class="score-btn plus" onclick="Khoi5Scoreboard.updateScore(${t.id}, 10)">+10</button>
          </div>
        </div>
      `).join('');
    } else {
      el.innerHTML = teams.map(t => `
        <div class="team-score" data-team="${t.id}">
          <span class="team-name">${t.name}</span>
          <div class="score-controls">
            <button class="score-btn minus" onclick="Khoi5Scoreboard.updateScore(${t.id}, -10)">-</button>
            <input class="score-input" type="number" min="0" value="${scoreMap[t.id]}" id="score-${t.id}"
                   onchange="Khoi5Scoreboard.setScore(${t.id}, this.value)" />
            <button class="score-btn plus" onclick="Khoi5Scoreboard.updateScore(${t.id}, 10)">+</button>
          </div>
        </div>
      `).join('');
    }
  }

  function updateScore(teamId, delta, reason = '') {
    if (scoreMap[teamId] === undefined) scoreMap[teamId] = 0;
    scoreMap[teamId] = Math.max(0, scoreMap[teamId] + delta);
    const t = teams.find(item => item.id === teamId);
    if (t) t.score = scoreMap[teamId];

    const input = document.getElementById(`score-${teamId}`);
    if (input) {
      if (input.tagName === 'INPUT') input.value = scoreMap[teamId];
      else input.textContent = scoreMap[teamId];
    }
    Khoi5Audio.playScoreSound(delta);
    return scoreMap[teamId];
  }

  function setScore(teamId, value) {
    const val = Math.max(0, parseInt(value, 10) || 0);
    scoreMap[teamId] = val;
    const t = teams.find(item => item.id === teamId);
    if (t) t.score = val;
    const input = document.getElementById(`score-${teamId}`);
    if (input && input.tagName === 'INPUT') input.value = val;
    return val;
  }

  function penalizeTeam(teamId, penaltyAmount = 10) {
    updateScore(teamId, -penaltyAmount, 'Phạt mất trật tự');
    Khoi5Audio.playPenaltySound();
    const t = teams.find(item => item.id === teamId);
    const name = t ? t.name : `Đội ${teamId}`;
    Khoi5Utils.toast(`🚨 ${name} bị trừ ${penaltyAmount} điểm vì mất trật tự!`, 2500, 'var(--coral)');
  }

  function resetAllScores(defaultVal = 0) {
    teams.forEach(t => {
      scoreMap[t.id] = defaultVal;
      t.score = defaultVal;
      const el = document.getElementById(`score-${t.id}`);
      if (el) {
        if (el.tagName === 'INPUT') el.value = defaultVal;
        else el.textContent = defaultVal;
      }
    });
  }

  function renderRankings(containerId = 'rankings-list') {
    const container = document.getElementById(containerId);
    if (!container) return;
    const sorted = [...teams].sort((a, b) => (scoreMap[b.id] || 0) - (scoreMap[a.id] || 0));
    const medals = [
      { rank: 1, medal: '🥇', title: 'QUÁN QUÂN', cls: 'rank-1' },
      { rank: 2, medal: '🥈', title: 'Á QUÂN', cls: 'rank-2' },
      { rank: 3, medal: '🥉', title: 'HẠNG BA', cls: 'rank-3' },
      { rank: 4, medal: '🌟', title: 'KHUYẾN KHÍCH', cls: 'rank-4' },
      { rank: 5, medal: '🎖️', title: 'NỖ LỰC', cls: 'rank-5' },
      { rank: 6, medal: '🎗️', title: 'GẮN KẾT', cls: 'rank-6' }
    ];

    container.innerHTML = sorted.map((t, i) => {
      const conf = medals[i] || medals[medals.length - 1];
      return `
        <div class="rank-card ${conf.cls}">
          <div style="display:flex; align-items:center; gap:12px;">
            <span style="font-size:32px;">${conf.medal}</span>
            <div>
              <div style="font-size:14px; font-weight:800; color:#475569;">${conf.title}</div>
              <div style="font-size:22px; font-weight:900;">${t.name}</div>
            </div>
          </div>
          <div style="font-size:26px; font-weight:900; color:var(--blue);">${scoreMap[t.id]} Điểm</div>
        </div>
      `;
    }).join('');
    Khoi5Utils.triggerConfetti();
    Khoi5Audio.playSuccessSound();
  }

  return { init, render, updateScore, setScore, penalizeTeam, resetAllScores, renderRankings, getScores: () => ({ ...scoreMap }), getTeams: () => [...teams] };
})();

// ==========================================
// 4. STUDENTS ENGINE (JSON & EXCEL IMPORT)
// ==========================================
const Khoi5Students = (() => {
  let allStudents = [];
  let currentClassKey = '5_1';

  const DEFAULT_NAMES = [
    'Ngô Phương Anh', 'Nguyễn Quốc Anh', 'Phạm Minh Anh', 'Đào Thiên Ân',
    'Trương Gia Bảo', 'Nguyễn Trọng Đức', 'Đỗ Hoàng Hiếu', 'Nguyễn Nhật Huy',
    'Dương Uyển Khanh', 'Trương Ngọc Lâm', 'Lâm Đường Vạn Lý', 'Mạc Kim Ngân',
    'Chu Dương Bảo Như', 'Phương Phú Quý', 'Bùi Quốc Thành', 'Trần Bảo Vy'
  ];

  async function loadStudents(classKey = '5_1') {
    currentClassKey = String(classKey).replace(/[^a-z0-9]/gi, '_').toLowerCase();
    if (importedExcelStudents && importedExcelStudents.length > 0) {
      allStudents = importedExcelStudents.map((name, idx) => ({
        id: idx + 1,
        name: typeof name === 'string' ? name : (name.name || `Học sinh ${idx + 1}`),
        team: null,
        actions: []
      }));
      return allStudents;
    }

    try {
      const paths = [
        '../../assets/data/students_5_2026_2027.json',
        '../assets/data/students_5_2026_2027.json',
        '/assets/data/students_5_2026_2027.json'
      ];
      let rawData = null;
      for (const p of paths) {
        try {
          const res = await fetch(p);
          if (res.ok) { rawData = await res.json(); break; }
        } catch (_) { }
      }
      if (rawData) {
        const norm = s => String(s).replace(/[^a-z0-9]/gi, '_').toLowerCase();
        let list = rawData[classKey] || rawData[currentClassKey] || rawData[norm(classKey)] || [];
        if (Array.isArray(list) && list.length > 0) {
          allStudents = list.map((item, idx) => ({
            id: idx + 1,
            name: typeof item === 'string' ? item : (item.name || item.hoTen || item.fullName || `Học sinh ${idx + 1}`),
            team: null,
            actions: []
          }));
          return allStudents;
        }
      }
    } catch (err) {
      console.warn('Dùng danh sách học sinh dự phòng:', err);
    }
    allStudents = DEFAULT_NAMES.map((name, idx) => ({ id: idx + 1, name, team: null, actions: [] }));
    return allStudents;
  }

  return { loadStudents, getStudentDisplayName, getRandomStudent, recordStudentAnswer, addStudent, getAllStudents: () => [...allStudents] };
})();

// ==========================================
// 5. GACHA ENGINE (TÚI MÙ)
// ==========================================
const Khoi5Gacha = (() => {
  let targetTeamId = 1;
  const defaultPool = [
    ...Array(10).fill({ text: "+10 ĐIỂM", delta: 10, isSpecial: false }),
    ...Array(6).fill({ text: "+20 ĐIỂM", delta: 20, isSpecial: false }),
    ...Array(3).fill({ text: "+30 ĐIỂM", delta: 30, isSpecial: false }),
    ...Array(2).fill({ text: "+50 ĐIỂM", delta: 50, isSpecial: true }),
    { text: "+100 ĐIỂM", delta: 100, isSpecial: true },
    { text: "x2 ĐIỂM", multiplier: 2, isSpecial: true }
  ];

  function openGacha(teamId = null) {
    if (teamId !== null) targetTeamId = teamId;
    let overlay = document.getElementById('gacha-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'gacha-overlay';
      overlay.className = 'gacha-overlay';
      overlay.innerHTML = `
        <div class="gacha-modal">
          <h2>🎁 BỐC TÚI MÙ 🎁</h2>
          <p style="font-size: 22px; font-weight: bold; color: var(--ink);">Nhân phẩm sẽ quyết định số điểm của em!</p>
          <div class="bags-container" id="bags-container"></div>
          <button class="btn-close-gacha" onclick="Khoi5Gacha.closeGacha()">ĐÓNG LẠI</button>
        </div>
      `;
      document.body.appendChild(overlay);
    }
    const container = document.getElementById('bags-container');
    container.innerHTML = '';
    const icons = ['🎁', '🛍️', '📦', '🎒'];
    for (let i = 0; i < 4; i++) {
      const bag = document.createElement('div');
      bag.className = 'blind-bag';
      bag.innerHTML = icons[i];
      bag.onclick = () => pickBag(bag);
      container.appendChild(bag);
    }
    overlay.style.display = 'flex';
    Khoi5Audio.playClickSound();
  }

  function pickBag(bagElement) {
    if (bagElement.classList.contains('opened')) return;
    document.querySelectorAll('.blind-bag').forEach(b => b.classList.add('opened'));
    const prize = defaultPool[Math.floor(Math.random() * defaultPool.length)];
    bagElement.innerHTML = `<span style="font-size: 20px; font-weight: 900; text-align: center;">${prize.text}</span>`;
    if (prize.isSpecial) {
      bagElement.style.color = 'var(--coral)';
      bagElement.style.borderColor = 'var(--coral)';
      Khoi5Audio.playSuccessSound();
      Khoi5Utils.triggerConfetti();
    } else {
      bagElement.style.color = '#087d69';
      bagElement.style.borderColor = 'var(--mint)';
      Khoi5Audio.playGachaSound();
    }
    if (window.updateScore && targetTeamId) {
      if (prize.delta) window.updateScore(targetTeamId, prize.delta, 'Túi mù');
      else if (prize.multiplier && Khoi5Scoreboard) {
        const cur = Khoi5Scoreboard.getScores()[targetTeamId] || 10;
        window.updateScore(targetTeamId, cur * (prize.multiplier - 1), 'Túi mù x2');
      }
    }
  }

  function closeGacha() {
    const overlay = document.getElementById('gacha-overlay');
    if (overlay) overlay.style.display = 'none';
  }

  return { openGacha, pickBag, closeGacha };
})();

// ==========================================
// 6. UTILITIES ENGINE
// ==========================================
const Khoi5Utils = (() => {
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

  function flashStage(isCorrect, stageId = 'mainStage') {
    const stage = document.getElementById(stageId) || document.querySelector('.stage') || document.body;
    if (!stage) return;
    stage.classList.remove('flash-green', 'flash-red');
    void stage.offsetWidth;
    stage.classList.add(isCorrect ? 'flash-green' : 'flash-red');
    setTimeout(() => stage.classList.remove('flash-green', 'flash-red'), 500);
  }

  function triggerConfetti() {
    if (typeof window.confetti === 'function') {
      window.confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } else {
      toast('🎉🎉🎉 CHÚC MỪNG CHIẾN THẮNG! 🎉🎉🎉', 3000, 'var(--yellow)');
    }
  }

  function exportExcel(fileName = 'Ket_Qua_Tiet_Hoc.xlsx', sheetName = 'Kết Quả', dataRows = []) {
    if (typeof window.XLSX === 'undefined') {
      toast('⚠️ Thư viện XLSX chưa được nạp!', 2000, 'var(--coral)');
      return;
    }
    try {
      const wb = window.XLSX.utils.book_new();
      const ws = window.XLSX.utils.json_to_sheet(dataRows);
      window.XLSX.utils.book_append_sheet(wb, ws, sheetName);
      window.XLSX.writeFile(wb, fileName);
      toast('📥 Xuất file Excel thành công!', 2000, 'var(--mint)');
    } catch (err) {
      console.error('Lỗi xuất Excel:', err);
      toast('🚨 Lỗi khi xuất Excel!', 2500, 'var(--coral)');
    }
  }

  return { toast, flashStage, triggerConfetti, exportExcel };
})();

// ==========================================
// ĐÓNG GÓI NAMESPACE AN TOÀN (KHÔNG GHI ĐÈ BÀI HỌC)
// ==========================================
window.KHOI5 = {
  Audio: Khoi5Audio,
  Slides: Khoi5Slides,
  Scoreboard: Khoi5Scoreboard,
  Students: Khoi5Students,
  Gacha: Khoi5Gacha,
  Utils: Khoi5Utils
};

// Chỉ gán ra window nếu bài học CHƯA định nghĩa
if (!window.playCorrectSound) window.playCorrectSound = Khoi5Audio.playCorrectSound;
if (!window.playSuccessSound) window.playSuccessSound = Khoi5Audio.playSuccessSound;
if (!window.playPenaltySound) window.playPenaltySound = Khoi5Audio.playPenaltySound;
if (!window.playScoreSound) window.playScoreSound = Khoi5Audio.playScoreSound;
if (!window.playGachaSound) window.playGachaSound = Khoi5Audio.playGachaSound;
if (!window.playClickSound) window.playClickSound = Khoi5Audio.playClickSound;

if (!window.formatTodayDate) window.formatTodayDate = Khoi5Slides.formatTodayDate;
if (!window.Khoi5Students) window.Khoi5Students = Khoi5Students;
if (!window.Khoi5Scoreboard) window.Khoi5Scoreboard = Khoi5Scoreboard;
if (!window.Khoi5Gacha) window.Khoi5Gacha = Khoi5Gacha;
if (!window.Khoi5Utils) window.Khoi5Utils = Khoi5Utils;


// ==========================================
// 7. TRACKER & DETAILED AUDIT LOG ENGINE
// ==========================================
const Khoi5Tracker = (() => {
  let config = {
    lessonNumber: '01',
    className: '5_1',
    subject: 'Tin học 5'
  };

  let teams = [];
  let students = [];
  let timelineLogs = [];

  function init(options = {}) {
    config.lessonNumber = String(options.lessonNumber || '01').padStart(2, '0');
    config.className = String(options.className || '5_1').replace(/[^a-zA-Z0-9]/g, '_');
    config.subject = options.subject || 'Tin học 5';
    if (Array.isArray(options.teams)) teams = options.teams;
    if (Array.isArray(options.students)) students = options.students;
    timelineLogs = [];
  }

  function setTeams(tList) { teams = tList; }
  function setStudents(sList) { students = sList; }
  function setClass(cName) { config.className = String(cName).replace(/[^a-zA-Z0-9]/g, '_'); }

  function logAction({ teamName, studentName, action, result, delta, currentScore, note = '' }) {
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

    let deltaStr = '';
    if (typeof delta === 'number') {
      deltaStr = delta > 0 ? `+${delta}` : String(delta);
    } else if (delta) {
      deltaStr = String(delta);
    } else {
      deltaStr = '0';
    }

    const logEntry = {
      stt: timelineLogs.length + 1,
      time: timeStr,
      team: teamName || 'Toàn lớp',
      student: studentName || 'Chưa chọn',
      action: action || 'Hoạt động học tập',
      result: result || (Number(delta) > 0 ? 'Đúng' : (Number(delta) < 0 ? 'Phạt' : 'Hoàn thành')),
      delta: deltaStr,
      scoreAfter: typeof currentScore !== 'undefined' ? currentScore : '-',
      note: note
    };

    timelineLogs.push(logEntry);

    if (studentName && studentName !== 'Chưa chọn') {
      const st = students.find(s => {
        const sName = typeof s === 'string' ? s : (s.name || s.hoTen || '');
        return sName.toLowerCase() === studentName.toLowerCase();
      });
      if (st && st.actions) {
        st.actions.push(`[${timeStr}] ${action} (${deltaStr}đ)`);
      }
    }

    return logEntry;
  }

  function calculateRankings(teamList = null) {
    const list = teamList || teams;
    if (!list || !list.length) return [];
    const sorted = [...list].sort((a, b) => (Number(b.score) || 0) - (Number(a.score) || 0));

    const rankTemplates = [
      { rank: 1, medal: '🥇', title: 'QUÁN QUÂN', sharedTitle: 'ĐỒNG QUÁN QUÂN', themeClass: 'rank-1' },
      { rank: 2, medal: '🥈', title: 'Á QUÂN', sharedTitle: 'ĐỒNG Á QUÂN', themeClass: 'rank-2' },
      { rank: 3, medal: '🥉', title: 'HẠNG BA', sharedTitle: 'ĐỒNG HẠNG BA', themeClass: 'rank-3' },
      { rank: 4, medal: '🌟', title: 'KHUYẾN KHÍCH', sharedTitle: 'KHUYẾN KHÍCH', themeClass: 'rank-4' },
      { rank: 5, medal: '🎖️', title: 'NỖ LỰC', sharedTitle: 'NỖ LỰC', themeClass: 'rank-5' },
      { rank: 6, medal: '🎗️', title: 'GẮN KẾT', sharedTitle: 'GẮN KẾT', themeClass: 'rank-6' }
    ];

    let currentRankIdx = 0;
    return sorted.map((t, idx, arr) => {
      const score = Number(t.score) || 0;
      if (idx > 0 && score === (Number(arr[idx - 1].score) || 0)) {
        // Đồng hạng
      } else {
        currentRankIdx = idx;
      }

      const isShared = arr.filter(item => (Number(item.score) || 0) === score).length > 1;
      const tpl = rankTemplates[currentRankIdx] || rankTemplates[rankTemplates.length - 1];

      return {
        ...t,
        score,
        rank: currentRankIdx + 1,
        isShared,
        medal: tpl.medal,
        badge: isShared && currentRankIdx < 3 ? `👑 ${tpl.sharedTitle}` : `👑 ${tpl.title}`,
        title: isShared && currentRankIdx < 3 ? tpl.sharedTitle : tpl.title,
        themeClass: tpl.themeClass
      };
    });
  }

  function getStandardFileName(lessonNum = null, classKey = null) {
    const lNum = String(lessonNum || config.lessonNumber || '01').padStart(2, '0');
    const cKey = String(classKey || config.className || '5_1').replace(/[^a-zA-Z0-9]/g, '_');
    const d = new Date();
    const pad = n => String(n).padStart(2, '0');
    const timeStamp = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}`;
    return `KetQua_TinHoc5_Tiet${lNum}_Lop${cKey}_${timeStamp}.xlsx`;
  }

  function exportDetailedExcel(customData = {}) {
    if (typeof window.XLSX === 'undefined') {
      alert('⚠️ Thư viện SheetJS (xlsx.full.min.js) chưa được nạp!');
      return;
    }

    const currentTeams = customData.teams || teams;
    const currentStudents = customData.students || students;
    const rankings = calculateRankings(currentTeams);

    // Sheet 1: Bảng Xếp Hạng
    const rankRows = [
      ['BẢNG XẾP HẠNG THI ĐUA TIẾT HỌC'],
      [`Môn: ${config.subject} | Tiết: ${config.lessonNumber} | Lớp: ${config.className.replace('_', '/')}`],
      [''],
      ['Thứ Hạng', 'Huy Chương', 'Danh Hiệu', 'Tổ / Dãy / Đội', 'Điểm Số', 'Đồng Hạng', 'Ghi Chú']
    ];

    rankings.forEach(r => {
      rankRows.push([
        `Hạng ${r.rank}`,
        r.medal,
        r.title,
        r.name,
        r.score,
        r.isShared ? 'Có (Đồng điểm)' : 'Không',
        r.won ? 'Đạt giải đặc biệt' : 'Hoàn thành xuất sắc'
      ]);
    });

    const wsRank = window.XLSX.utils.aoa_to_sheet(rankRows);
    wsRank['!cols'] = [{ wch: 12 }, { wch: 12 }, { wch: 22 }, { wch: 18 }, { wch: 12 }, { wch: 16 }, { wch: 24 }];

    // Sheet 2: Nhật Ký Chi Tiết
    const logRows = [
      ['NHẬT KÝ CHI TIẾT HOẠT ĐỘNG VÀ BIẾN ĐỘNG ĐIỂM SỐ THEO THỜI GIAN'],
      [`Thời gian xuất: ${new Date().toLocaleString('vi-VN')} | Tổng số sự kiện: ${timelineLogs.length}`],
      [''],
      ['STT', 'Thời Gian', 'Tổ / Dãy / Đội', 'Học Sinh Trả Lời', 'Nội Dung Sự Kiện / Thử Thách', 'Kết Quả', 'Biến Động Điểm', 'Điểm Sau Sự Kiện', 'Ghi Chú']
    ];

    if (timelineLogs.length === 0) {
      logRows.push(['1', '-', 'Toàn lớp', '-', 'Tiết học diễn ra tích cực', 'Hoàn thành', '0', '-', 'Không có sự cố vi phạm']);
    } else {
      timelineLogs.forEach(entry => {
        logRows.push([
          entry.stt,
          entry.time,
          entry.team,
          entry.student,
          entry.action,
          entry.result,
          entry.delta,
          entry.scoreAfter,
          entry.note || ''
        ]);
      });
    }

    const wsLogs = window.XLSX.utils.aoa_to_sheet(logRows);
    wsLogs['!cols'] = [{ wch: 6 }, { wch: 12 }, { wch: 18 }, { wch: 24 }, { wch: 38 }, { wch: 16 }, { wch: 16 }, { wch: 18 }, { wch: 25 }];

    // Sheet 3: Danh Sách Học Sinh
    const studentRows = [
      ['DANH SÁCH HỌC SINH VÀ LỊCH SỬ THAM GIA PHÁT BIỂU'],
      [`Lớp: ${config.className.replace('_', '/')} | Tổng số học sinh: ${currentStudents.length}`],
      [''],
      ['STT', 'Mã HS', 'Họ Và Tên', 'Lớp', 'Tổ / Đội', 'Số Lần Phát Biểu', 'Lịch Sử Chi Tiết']
    ];

    let sIndex = 1;
    currentStudents.forEach(s => {
      const name = typeof s === 'string' ? s : (s.name || s.hoTen || `Học sinh ${sIndex}`);
      const teamId = s.team;
      const teamObj = currentTeams.find((t, idx) => t.id === teamId || idx === teamId);
      const teamName = teamObj ? teamObj.name : (teamId !== null && teamId !== undefined ? `Tổ ${teamId + 1}` : 'Chưa xếp tổ');
      const actionList = Array.isArray(s.actions) ? s.actions : [];

      studentRows.push([
        sIndex,
        `HS${String(sIndex).padStart(3, '0')}`,
        name,
        config.className.replace('_', '/'),
        teamName,
        actionList.length,
        actionList.join('; ') || 'Tham gia học tập cùng tổ'
      ]);
      sIndex++;
    });

    const wsStudents = window.XLSX.utils.aoa_to_sheet(studentRows);
    wsStudents['!cols'] = [{ wch: 6 }, { wch: 10 }, { wch: 26 }, { wch: 10 }, { wch: 18 }, { wch: 18 }, { wch: 60 }];

    const wb = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(wb, wsRank, 'Bảng Xếp Hạng');
    window.XLSX.utils.book_append_sheet(wb, wsLogs, 'Nhật Ký Chi Tiết');
    window.XLSX.utils.book_append_sheet(wb, wsStudents, 'Danh Sách Học Sinh');

    const fileName = customData.fileName || getStandardFileName();
    if (typeof window.uploadExcelToDrive === 'function') {
      window.uploadExcelToDrive(wb, fileName);
    } else {
      window.XLSX.writeFile(wb, fileName);
      if (window.toast) {
        window.toast(`📥 Đã xuất file: ${fileName}`, 3000, 'var(--mint)');
      } else {
        alert(`Đã xuất file báo cáo chi tiết: ${fileName}`);
      }
    }
  }

  return { init, setTeams, setStudents, setClass, logAction, calculateRankings, getStandardFileName, exportDetailedExcel, getLogs: () => [...timelineLogs] };
})();

window.KHOI5.Tracker = Khoi5Tracker;
if (!window.Khoi5Tracker) window.Khoi5Tracker = Khoi5Tracker;
