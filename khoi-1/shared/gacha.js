/**
 * =========================================================================
 * ĐỘNG CƠ GACHA CANVAS 2.5D (60FPS) - KHÔNG DÙNG EMOJI
 * Chế độ 1: Hội Chợ Bắt Vịt 2.5D (Nhân vật cầm vợt chạy trên bờ hồ vớt vịt)
 * Chế độ 2: Đua Vịt Vượt Thác (Hiệu ứng sóng nước & phao bơi Vector)
 * =========================================================================
 */

const Khoi1Audio = (() => {
  let ctx = null;
  let isMuted = false;

  function getCtx() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    if (!ctx || ctx.state === 'closed') ctx = new AudioCtx();
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    return ctx;
  }

  function playClick() {
    if (isMuted) return;
    const c = getCtx();
    if (!c) return;
    const now = c.currentTime;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(580, now);
    osc.frequency.exponentialRampToValueAtTime(280, now + 0.06);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start(now);
    osc.stop(now + 0.07);
  }

  function playQuack() {
    if (isMuted) return;
    const c = getCtx();
    if (!c) return;
    [0, 0.18].forEach(delay => {
      const now = c.currentTime + delay;
      const osc = c.createOscillator();
      const filter = c.createBiquadFilter();
      const gain = c.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(250, now + 0.14);
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1100, now);
      filter.Q.setValueAtTime(3.2, now);
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(c.destination);
      osc.start(now);
      osc.stop(now + 0.17);
    });
  }

  function playSplash() {
    if (isMuted) return;
    const c = getCtx();
    if (!c) return;
    const bufferSize = c.sampleRate * 0.35;
    const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (c.sampleRate * 0.12));
    }
    const noise = c.createBufferSource();
    noise.buffer = buffer;
    const filter = c.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(900, c.currentTime);
    const gain = c.createGain();
    gain.gain.setValueAtTime(0.35, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, c.currentTime + 0.34);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(c.destination);
    noise.start();
  }

  function playVictoryFanfare() {
    if (isMuted) return;
    const c = getCtx();
    if (!c) return;
    const now = c.currentTime;
    const notes = [
      { f: 523.25, t: 0, d: 0.11 },
      { f: 659.25, t: 0.11, d: 0.11 },
      { f: 783.99, t: 0.22, d: 0.11 },
      { f: 1046.5, t: 0.33, d: 0.45 }
    ];
    notes.forEach(n => {
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, now + n.t);
      gain.gain.setValueAtTime(0.01, now + n.t);
      gain.gain.linearRampToValueAtTime(0.28, now + n.t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);
      osc.connect(gain);
      gain.connect(c.destination);
      osc.start(now + n.t);
      osc.stop(now + n.t + n.d + 0.02);
    });
  }

  function playBuzzer() {
    if (isMuted) return;
    const c = getCtx();
    if (!c) return;
    [0, 0.22].forEach(d => {
      const now = c.currentTime + d;
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(165, now);
      osc.frequency.linearRampToValueAtTime(115, now + 0.18);
      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain);
      gain.connect(c.destination);
      osc.start(now);
      osc.stop(now + 0.21);
    });
  }

  function toggleMute() {
    isMuted = !isMuted;
    return isMuted;
  }

  return { playClick, playQuack, playSplash, playVictoryFanfare, playBuzzer, toggleMute };
})();

/* ================= PHÁO GIẤY CONFETTI ================= */
const Khoi1Confetti = (() => {
  let cvs = null, ctx = null, parts = [], anim = null;

  function fire() {
    if (!cvs) {
      cvs = document.createElement('canvas');
      cvs.className = 'k1-confetti-canvas';
      document.body.appendChild(cvs);
      ctx = cvs.getContext('2d');
    }
    cvs.width = window.innerWidth;
    cvs.height = window.innerHeight;
    const cols = ['#38BDF8', '#FACC15', '#34D399', '#FB7185', '#A78BFA', '#F97316'];
    parts = Array.from({ length: 85 }, () => ({
      x: cvs.width / 2,
      y: cvs.height / 2,
      vx: (Math.random() - 0.5) * 20,
      vy: -Math.random() * 16 - 6,
      s: Math.random() * 10 + 6,
      c: cols[Math.floor(Math.random() * cols.length)],
      r: Math.random() * 360,
      vr: (Math.random() - 0.5) * 10,
      a: 1
    }));
    if (anim) cancelAnimationFrame(anim);
    loop();
  }

  function loop() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    let alive = 0;
    parts.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.48;
      p.r += p.vr;
      p.a -= 0.01;
      if (p.a > 0 && p.y < cvs.height) {
        alive++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.r * Math.PI) / 180);
        ctx.fillStyle = p.c;
        ctx.globalAlpha = p.a;
        ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.65);
        ctx.restore();
      }
    });
    if (alive > 0) anim = requestAnimationFrame(loop);
    else ctx.clearRect(0, 0, cvs.width, cvs.height);
  }

  return { fire };
})();

/* ================= HỆ THỐNG GACHA CANVAS 2.5D ================= */
const Khoi1Gacha = (() => {
  let mode = 'pond'; // 'pond' | 'race'
  let cvs = null, ctx = null, animId = null;
  let isBusy = false;
  let pickedMain = null, pickedNext = null;

  // Trạng thái Hồ Bắt Vịt 2.5D
  let pondDucks = [];
  let ripples = [];
  let splashes = [];
  let catcher = {
    x: 480,
    targetX: 480,
    armAngle: 0,
    netExtend: 0,
    state: 'idle', // 'idle' | 'running' | 'scooping' | 'lifting'
    caughtDuck: null
  };

  // Trạng thái Đua Vịt Vượt Thác
  let raceDucks = [];
  let waterOffset = 0;
  let raceFinished = false;

  function ensureModal() {
    if (document.getElementById('k1-gacha-overlay')) return;
    const div = document.createElement('div');
    div.id = 'k1-gacha-overlay';
    div.className = 'k1-overlay';
    div.innerHTML = `
      <div class="k1-modal-card">
        <div class="k1-modal-header">
          <div style="font-size:20px; font-weight:900; letter-spacing:0.3px;">
            HỘI CHỢ BẮT VỊT & ĐUA VỊT LỚP 1
          </div>
          <div class="k1-mode-switch">
            <button class="k1-mode-btn active" id="k1-m-pond" type="button" onclick="Khoi1Gacha.switchMode('pond')">
              Hội Chợ Bắt Vịt 2.5D
            </button>
            <button class="k1-mode-btn" id="k1-m-race" type="button" onclick="Khoi1Gacha.switchMode('race')">
              Đua Vịt Vượt Thác
            </button>
          </div>
          <button class="k1-close-circle" type="button" onclick="Khoi1Gacha.close()">✕</button>
        </div>

        <div style="position:relative;">
          <canvas id="k1-gacha-canvas" class="k1-canvas-stage" width="980" height="460"></canvas>

          <div class="k1-winner-banner" id="k1-winner-banner">
            <div class="k1-winner-box">
              <div style="font-size:14px; font-weight:900; color:#D97706; text-transform:uppercase;">
                MỜI BẠN LÊN BẢNG THỰC HÀNH CHUỘT
              </div>
              <div id="k1-win-main" style="font-size:32px; font-weight:900; color:#0284C7; margin:6px 0;">
                Nguyễn Văn A
              </div>
              <div id="k1-win-next" style="font-size:16px; font-weight:800; color:#059669; background:#D1FAE5; padding:6px 16px; border-radius:99px; display:inline-block; margin-bottom:18px;">
                Chuẩn bị kế tiếp: Trần Thị B
              </div>
              <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
                <button class="k1-btn k1-btn-mint k1-btn-lg" type="button" onclick="Khoi1Gacha.confirmTurn()">
                  Bắt đầu thực hành ngay
                </button>
                <button class="k1-btn k1-btn-coral k1-btn-sm" type="button" onclick="Khoi1Gacha.cancelByNoise()">
                  Mời về chỗ (Chưa trật tự)
                </button>
                <button class="k1-btn k1-btn-white k1-btn-sm" type="button" onclick="Khoi1Gacha.skipAbsent()">
                  Vắng mặt / Quay lại
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="k1-modal-bottom">
          <div style="font-size:15px; font-weight:800; color:#475569;" id="k1-gacha-hint">
            Bấm nút bên phải hoặc nháy trực tiếp vào một chú vịt dưới hồ để vớt vịt!
          </div>
          <button class="k1-btn k1-btn-amber k1-btn-lg" id="k1-gacha-trigger" type="button" onclick="Khoi1Gacha.triggerAction()">
            QUĂNG VỢT BẮT VỊT NGAY
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(div);
    cvs = document.getElementById('k1-gacha-canvas');
    ctx = cvs.getContext('2d');

    // Cho phép click trực tiếp vào chú vịt dưới hồ để bắt
    cvs.addEventListener('mousedown', e => {
      if (mode !== 'pond' || isBusy) return;
      const rect = cvs.getBoundingClientRect();
      const mx = (e.clientX - rect.left) * (cvs.width / rect.width);
      const my = (e.clientY - rect.top) * (cvs.height / rect.height);
      const clicked = pondDucks.find(d => Math.hypot(d.x - mx, d.y - my) < 42);
      if (clicked) startCatchSequence(clicked);
    });
  }

  function getPool() {
    if (window.Khoi1Components) {
      const list = window.Khoi1Components.getUncalledStudents();
      if (list && list.length > 0) return list;
    }
    return ['Lê Nguyễn Thảo An', 'Dương Quỳnh Anh', 'Nguyễn Duy Anh', 'Tô Tuệ Anh', 'Danh Trần Gia Bảo', 'Trần Tuyết Băng'];
  }

  function open(defaultMode = 'pond') {
    ensureModal();
    mode = defaultMode === 'race' ? 'race' : 'pond';
    document.getElementById('k1-gacha-overlay').classList.add('active');
    document.getElementById('k1-winner-banner').classList.remove('active');
    Khoi1Audio.playClick();
    setupScene();
    if (animId) cancelAnimationFrame(animId);
    loop();
  }

  function close() {
    const el = document.getElementById('k1-gacha-overlay');
    if (el) el.classList.remove('active');
    if (animId) cancelAnimationFrame(animId);
    isBusy = false;
  }

  function switchMode(newMode) {
    if (isBusy) return;
    mode = newMode;
    Khoi1Audio.playClick();
    document.getElementById('k1-m-pond').classList.toggle('active', mode === 'pond');
    document.getElementById('k1-m-race').classList.toggle('active', mode === 'race');
    document.getElementById('k1-winner-banner').classList.remove('active');

    const btn = document.getElementById('k1-gacha-trigger');
    const hint = document.getElementById('k1-gacha-hint');
    if (mode === 'pond') {
      btn.textContent = 'QUĂNG VỢT BẮT VỊT NGAY';
      hint.textContent = 'Chú bé trên bờ sẽ chạy ra vớt chú vịt may mắn dưới hồ!';
    } else {
      btn.textContent = 'PHẤT CỜ ĐUA VỊT VƯỢT THÁC';
      hint.textContent = 'Các chú vịt bơi đua vượt thác nước để chọn bạn lên bảng!';
    }
    setupScene();
  }

  function setupScene() {
    isBusy = false;
    const pool = [...getPool()].sort(() => Math.random() - 0.5);

    if (mode === 'pond') {
      const count = Math.min(10, Math.max(5, pool.length));
      const tubeColors = ['#FB7185', '#38BDF8', '#4ADE80', '#A78BFA', '#F97316'];
      pondDucks = Array.from({ length: count }, (_, i) => ({
        id: i,
        name: pool[i % pool.length],
        x: 130 + (i % 5) * 175 + (Math.random() - 0.5) * 35,
        y: 230 + Math.floor(i / 5) * 125 + (Math.random() - 0.5) * 25,
        vx: (Math.random() < 0.5 ? 1 : -1) * (0.65 + Math.random() * 0.55),
        vy: (Math.random() - 0.5) * 0.35,
        phase: Math.random() * Math.PI * 2,
        tube: tubeColors[i % tubeColors.length],
        scale: 1
      }));
      catcher = { x: 490, targetX: 490, netExtend: 0, state: 'idle', caughtDuck: null, walkCycle: 0 };
      ripples = [];
      splashes = [];
    } else {
      raceFinished = false;
      const count = Math.min(5, Math.max(3, pool.length));
      const capColors = ['#EF4444', '#3B82F6', '#10B981', '#A855F7', '#F97316'];
      raceDucks = Array.from({ length: count }, (_, i) => ({
        name: pool[i % pool.length],
        x: 95,
        y: 105 + i * 72,
        speed: 0,
        capColor: capColors[i % capColors.length],
        phase: Math.random() * Math.PI * 2
      }));
    }
  }

  /* ================= VẼ CHÚ VỊT 3D VECTOR BẰNG CANVAS (KHÔNG EMOJI) ================= */
  function drawVectorDuck(ctx, x, y, dirX, phase, ringColor, label, scale = 1, isCaught = false) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    const bob = isCaught ? Math.sin(phase * 4) * 3 : Math.sin(phase) * 4;
    ctx.translate(0, bob);

    // Đổ bóng dưới mặt nước
    if (!isCaught) {
      ctx.fillStyle = 'rgba(3, 105, 161, 0.32)';
      ctx.beginPath();
      ctx.ellipse(0, 22, 30, 10, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.save();
    if (dirX < 0) ctx.scale(-1, 1);

    // Phao bơi sắc màu quanh bụng vịt
    ctx.fillStyle = ringColor;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(0, 15, 29, 11, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Thân vịt vàng 3D Gradient
    const bodyGrad = ctx.createRadialGradient(-6, -4, 4, 0, 4, 26);
    bodyGrad.addColorStop(0, '#FEF08A');
    bodyGrad.addColorStop(0.55, '#FACC15');
    bodyGrad.addColorStop(1, '#CA8A04');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.ellipse(-2, 4, 23, 16, 0, 0, Math.PI * 2);
    ctx.fill();

    // Đuôi vịt vểnh lên
    ctx.beginPath();
    ctx.moveTo(-20, 2);
    ctx.quadraticCurveTo(-30, -8, -22, 12);
    ctx.fill();

    // Cánh vịt vỗ nhẹ
    const wingAngle = isCaught ? Math.sin(phase * 6) * 0.45 : Math.sin(phase * 1.5) * 0.12;
    ctx.save();
    ctx.translate(-3, 4);
    ctx.rotate(wingAngle);
    ctx.fillStyle = '#EAB308';
    ctx.beginPath();
    ctx.ellipse(0, 0, 12, 7.5, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Đầu vịt tròn bầu bĩnh
    const headGrad = ctx.createRadialGradient(8, -18, 2, 12, -14, 16);
    headGrad.addColorStop(0, '#FEF08A');
    headGrad.addColorStop(0.7, '#FACC15');
    headGrad.addColorStop(1, '#CA8A04');
    ctx.fillStyle = headGrad;
    ctx.beginPath();
    ctx.arc(12, -13, 14, 0, Math.PI * 2);
    ctx.fill();

    // Má hồng dễ thương
    ctx.fillStyle = 'rgba(244, 63, 94, 0.45)';
    ctx.beginPath();
    ctx.ellipse(15, -9, 4, 2.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Mỏ vịt màu cam
    ctx.fillStyle = '#F97316';
    ctx.beginPath();
    ctx.ellipse(26, -11, 8.5, 4.8, 0.08, 0, Math.PI * 2);
    ctx.fill();

    // Mắt đen láy + chấm sáng trắng
    ctx.fillStyle = '#0F172A';
    ctx.beginPath();
    ctx.arc(16, -16, 3.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(17, -17, 1.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore(); // Kết thúc lật ngang để chữ không bị ngược

    // Bảng tên học sinh nổi rõ phía dưới chú vịt
    if (label) {
      ctx.font = '800 13px "Baloo 2", sans-serif';
      const tw = Math.min(135, ctx.measureText(label).width + 16);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.86)';
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-tw / 2, 27, tw, 22, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#FEF08A';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const shortName = label.length > 16 ? label.slice(0, 15) + '…' : label;
      ctx.fillText(shortName, 0, 38.5);
    }

    ctx.restore();
  }

  /* ================= VẼ NHÂN VẬT CẦM VỢT BẮT VỊT TRÊN BỜ HỒ ================= */
  function drawCatcherCharacter(ctx) {
    ctx.save();
    ctx.translate(catcher.x, 96);

    const stepBounce = catcher.state === 'running' ? Math.abs(Math.sin(catcher.walkCycle)) * 6 : 0;
    ctx.translate(0, -stepBounce);

    // Bóng nhân vật trên bãi cỏ
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.beginPath();
    ctx.ellipse(0, 34 + stepBounce, 24, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    // Chân chạy
    const legSwing = catcher.state === 'running' ? Math.sin(catcher.walkCycle) * 8 : 0;
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#1E3A8A';
    ctx.beginPath();
    ctx.moveTo(-7, 16);
    ctx.lineTo(-9 + legSwing, 32);
    ctx.moveTo(7, 16);
    ctx.lineTo(9 - legSwing, 32);
    ctx.stroke();

    // Thân áo yếm đỏ - vàng
    ctx.fillStyle = '#EF4444';
    ctx.beginPath();
    ctx.roundRect(-16, -8, 32, 26, 10);
    ctx.fill();
    ctx.fillStyle = '#3B82F6';
    ctx.beginPath();
    ctx.roundRect(-13, 2, 26, 16, 6);
    ctx.fill();

    // Đầu nhân vật
    ctx.fillStyle = '#FDE68A';
    ctx.beginPath();
    ctx.arc(0, -22, 16, 0, Math.PI * 2);
    ctx.fill();

    // Mũ rơm đi bắt vịt
    ctx.fillStyle = '#F59E0B';
    ctx.strokeStyle = '#B45309';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(0, -32, 26, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, -33, 14, Math.PI, 0);
    ctx.fill();
    ctx.stroke();

    // Khuôn mặt tươi cười
    ctx.fillStyle = '#0F172A';
    ctx.beginPath();
    ctx.arc(-6, -21, 2.2, 0, Math.PI * 2);
    ctx.arc(6, -21, 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#0F172A';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, -18, 4.5, 0.1, Math.PI - 0.1);
    ctx.stroke();

    // Cây vợt lưới dài vươn xuống hồ bắt vịt
    ctx.save();
    ctx.translate(14, 0);
    const poleLen = 48 + catcher.netExtend;
    // Cán vợt tre
    ctx.strokeStyle = '#92400E';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, -4);
    ctx.lineTo(0, poleLen);
    ctx.stroke();

    // Vành vợt tròn & lưới đan
    ctx.translate(0, poleLen + 18);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.42)';
    ctx.strokeStyle = '#F43F5E';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(0, 0, 32, 22, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Đường vân lưới
    ctx.strokeStyle = 'rgba(255,255,255,0.75)';
    ctx.lineWidth = 1.5;
    for (let i = -18; i <= 18; i += 9) {
      ctx.beginPath();
      ctx.moveTo(i, -16);
      ctx.lineTo(i, 16);
      ctx.stroke();
    }

    // Nếu đã vớt trúng vịt thì vẽ chú vịt nằm gọn trong vợt
    if (catcher.caughtDuck) {
      drawVectorDuck(
        ctx,
        0,
        -6,
        1,
        performance.now() * 0.008,
        catcher.caughtDuck.tube,
        catcher.caughtDuck.name,
        1.1,
        true
      );
    }

    ctx.restore();
    ctx.restore();
  }

  /* ================= VÒNG LẶP RENDER 60FPS ================= */
  function loop() {
    if (!ctx) return;
    ctx.clearRect(0, 0, cvs.width, cvs.height);

    if (mode === 'pond') {
      renderPondScene();
    } else {
      renderRaceScene();
    }

    animId = requestAnimationFrame(loop);
  }

  function renderPondScene() {
    // 1. Bờ cỏ xanh tươi phía trên
    const grassGrad = ctx.createLinearGradient(0, 0, 0, 128);
    grassGrad.addColorStop(0, '#86EFAC');
    grassGrad.addColorStop(1, '#22C55E');
    ctx.fillStyle = grassGrad;
    ctx.fillRect(0, 0, cvs.width, 128);

    // Hàng rào gỗ trắng trên bờ
    for (let x = 20; x < cvs.width; x += 55) {
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.roundRect(x, 42, 14, 48, 4);
      ctx.fill();
    }
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.fillRect(0, 56, cvs.width, 7);
    ctx.fillRect(0, 74, cvs.width, 7);

    // Bờ đá ven hồ
    ctx.fillStyle = '#D6D3D1';
    for (let x = 0; x <= cvs.width; x += 48) {
      ctx.beginPath();
      ctx.ellipse(x + 24, 126, 28, 11, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Mặt hồ nước xanh biếc
    const waterGrad = ctx.createLinearGradient(0, 128, 0, cvs.height);
    waterGrad.addColorStop(0, '#38BDF8');
    waterGrad.addColorStop(0.5, '#0284C7');
    waterGrad.addColorStop(1, '#0369A1');
    ctx.fillStyle = waterGrad;
    ctx.fillRect(0, 128, cvs.width, cvs.height - 128);

    // Lá súng & hoa sen trang trí góc hồ
    [
      { x: 70, y: 175, r: 24 },
      { x: 910, y: 185, r: 26 },
      { x: 85, y: 400, r: 22 }
    ].forEach(lily => {
      ctx.fillStyle = '#16A34A';
      ctx.beginPath();
      ctx.arc(lily.x, lily.y, lily.r, 0.2, Math.PI * 1.9);
      ctx.lineTo(lily.x, lily.y);
      ctx.fill();
    });

    // 3. Vòng sóng nước lan tỏa (Ripples)
    for (let i = ripples.length - 1; i >= 0; i--) {
      const rp = ripples[i];
      rp.r += 0.9;
      rp.a -= 0.015;
      if (rp.a <= 0) {
        ripples.splice(i, 1);
        continue;
      }
      ctx.strokeStyle = `rgba(255, 255, 255, ${rp.a})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(rp.x, rp.y, rp.r, rp.r * 0.42, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    // 4. Cập nhật chuyển động đàn vịt đang bơi
    pondDucks.forEach(d => {
      if (catcher.caughtDuck && catcher.caughtDuck.id === d.id) return;
      d.x += d.vx;
      d.y += d.vy;
      d.phase += 0.06;

      if (d.x < 75 || d.x > cvs.width - 75) d.vx *= -1;
      if (d.y < 175 || d.y > cvs.height - 55) d.vy *= -1;

      if (Math.random() < 0.02) {
        ripples.push({ x: d.x, y: d.y + 16, r: 10, a: 0.55 });
      }
    });

    // Sắp xếp theo chiều sâu Y để vẽ đúng luật xa-gần 2.5D
    const sorted = [...pondDucks].sort((a, b) => a.y - b.y);
    sorted.forEach(d => {
      if (catcher.caughtDuck && catcher.caughtDuck.id === d.id) return;
      drawVectorDuck(ctx, d.x, d.y, d.vx, d.phase, d.tube, d.name, d.scale, false);
    });

    // 5. Cập nhật trạng thái Nhân vật bắt vịt
    updateCatcherPhysics();
    drawCatcherCharacter(ctx);

    // 6. Hạt nước bắn tung tóe khi quăng vợt
    for (let i = splashes.length - 1; i >= 0; i--) {
      const sp = splashes[i];
      sp.x += sp.vx;
      sp.y += sp.vy;
      sp.vy += 0.35;
      sp.a -= 0.025;
      if (sp.a <= 0) {
        splashes.splice(i, 1);
        continue;
      }
      ctx.fillStyle = `rgba(255, 255, 255, ${sp.a})`;
      ctx.beginPath();
      ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function updateCatcherPhysics() {
    if (catcher.state === 'running') {
      catcher.walkCycle += 0.32;
      const targetX = catcher.targetDuck.x - 14;
      const dx = targetX - catcher.x;
      if (Math.abs(dx) > 6) {
        catcher.x += Math.sign(dx) * Math.min(9, Math.abs(dx));
      } else {
        catcher.x = targetX;
        catcher.state = 'scooping';
        Khoi1Audio.playSplash();
      }
    } else if (catcher.state === 'scooping') {
      const desiredExtend = catcher.targetDuck.y - 160;
      catcher.netExtend += (desiredExtend - catcher.netExtend) * 0.22;
      if (Math.abs(desiredExtend - catcher.netExtend) < 6) {
        catcher.caughtDuck = catcher.targetDuck;
        catcher.state = 'lifting';
        Khoi1Audio.playQuack();
        // Tạo bọt nước bắn tung tóe
        for (let i = 0; i < 22; i++) {
          splashes.push({
            x: catcher.targetDuck.x,
            y: catcher.targetDuck.y,
            vx: (Math.random() - 0.5) * 9,
            vy: -Math.random() * 8 - 2,
            r: Math.random() * 4 + 2,
            a: 1
          });
        }
        ripples.push({ x: catcher.targetDuck.x, y: catcher.targetDuck.y, r: 15, a: 0.9 });
      }
    } else if (catcher.state === 'lifting') {
      catcher.netExtend += (0 - catcher.netExtend) * 0.14;
      if (catcher.netExtend < 4) {
        catcher.netExtend = 0;
        catcher.state = 'idle';
        showWinnerModal(catcher.caughtDuck.name);
      }
    }
  }

  function startCatchSequence(targetDuck) {
    if (isBusy) return;
    isBusy = true;
    catcher.targetDuck = targetDuck;
    catcher.caughtDuck = null;
    catcher.state = 'running';
    Khoi1Audio.playClick();
  }

  /* ================= CHẾ ĐỘ 2: ĐUA VỊT VƯỢT THÁC ================= */
  function renderRaceScene() {
    waterOffset = (waterOffset + 4) % 80;
    const bg = ctx.createLinearGradient(0, 0, 0, cvs.height);
    bg.addColorStop(0, '#0284C7');
    bg.addColorStop(1, '#0369A1');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    // Các làn đua phao nổi
    raceDucks.forEach((d, idx) => {
      const laneY = d.y - 34;
      ctx.fillStyle = idx % 2 === 0 ? 'rgba(56, 189, 248, 0.25)' : 'rgba(14, 165, 233, 0.12)';
      ctx.fillRect(0, laneY, cvs.width, 68);

      // Dây phao phân làn
      ctx.strokeStyle = 'rgba(255,255,255,0.35)';
      ctx.setLineDash([12, 10]);
      ctx.beginPath();
      ctx.moveTo(0, laneY + 68);
      ctx.lineTo(cvs.width, laneY + 68);
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // Vạch đích Caro
    const finishX = cvs.width - 95;
    for (let y = 50; y < cvs.height - 20; y += 20) {
      ctx.fillStyle = (y / 20) % 2 === 0 ? '#FFFFFF' : '#0F172A';
      ctx.fillRect(finishX, y, 14, 20);
      ctx.fillStyle = (y / 20) % 2 === 0 ? '#0F172A' : '#FFFFFF';
      ctx.fillRect(finishX + 14, y, 14, 20);
    }

    // Cập nhật vịt bơi đua
    raceDucks.forEach(d => {
      if (isBusy && !raceFinished) {
        d.x += d.speed;
        // Thay đổi tốc độ ngẫu nhiên tạo kịch tính
        d.speed = Math.max(2.2, Math.min(6.2, d.speed + (Math.random() - 0.46) * 0.45));
        if (Math.random() < 0.25) {
          ripples.push({ x: d.x - 24, y: d.y + 12, r: 6, a: 0.6 });
        }
        if (d.x >= finishX - 10 && !raceFinished) {
          raceFinished = true;
          Khoi1Audio.playQuack();
          setTimeout(() => showWinnerModal(d.name), 350);
        }
      }
      d.phase += 0.12;
      drawVectorDuck(ctx, d.x, d.y, 1, d.phase, d.capColor, d.name, 0.95, false);
    });
  }

  function triggerAction() {
    if (isBusy) return;
    if (mode === 'pond') {
      const randomDuck = pondDucks[Math.floor(Math.random() * pondDucks.length)];
      if (randomDuck) startCatchSequence(randomDuck);
    } else {
      isBusy = true;
      raceFinished = false;
      Khoi1Audio.playQuack();
      raceDucks.forEach(d => {
        d.x = 95;
        d.speed = 3.2 + Math.random() * 1.8;
      });
    }
  }

  function showWinnerModal(winnerName) {
    const pool = getPool().filter(n => n !== winnerName);
    pickedMain = winnerName;
    pickedNext = pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)] : 'Đã hết danh sách chờ';

    document.getElementById('k1-win-main').textContent = pickedMain;
    document.getElementById('k1-win-next').textContent = `Chuẩn bị kế tiếp: ${pickedNext}`;
    document.getElementById('k1-winner-banner').classList.add('active');

    Khoi1Audio.playVictoryFanfare();
    Khoi1Confetti.fire();

    if (window.Khoi1Components) {
      window.Khoi1Components.setActiveTurn(pickedMain, pickedNext);
    }
  }

  function confirmTurn() {
    close();
  }

  function cancelByNoise() {
    if (window.Khoi1Components && pickedMain) {
      window.Khoi1Components.handleDiscipline(pickedMain);
    }
    document.getElementById('k1-winner-banner').classList.remove('active');
    setupScene();
  }

  function skipAbsent() {
    if (window.Khoi1Components && pickedMain) {
      window.Khoi1Components.skipStudent(pickedMain);
    }
    document.getElementById('k1-winner-banner').classList.remove('active');
    setupScene();
  }

  return { open, close, switchMode, triggerAction, confirmTurn, cancelByNoise, skipAbsent };
})();

window.Khoi1Audio = Khoi1Audio;
window.Khoi1Confetti = Khoi1Confetti;
window.Khoi1Gacha = Khoi1Gacha;