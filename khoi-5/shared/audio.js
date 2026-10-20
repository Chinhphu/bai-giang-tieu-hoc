/**
 * KHOI 5 - AUDIO ENGINE (Web Audio API)
 * Bộ phát âm thanh độc lập, không cần nạp file mp3 ngoài, hỗ trợ 100% offline.
 */
const Khoi5Audio = (() => {
  const getAudioContext = () => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    if (!Khoi5Audio._ctx || Khoi5Audio._ctx.state === 'closed') {
      Khoi5Audio._ctx = new AudioContextClass();
    }
    if (Khoi5Audio._ctx.state === 'suspended') {
      Khoi5Audio._ctx.resume();
    }
    return Khoi5Audio._ctx;
  };

  /** Âm thanh khi trả lời đúng (2 nốt cao tươi sáng) */
  function playCorrectSound() {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, now); // D5
    osc.frequency.setValueAtTime(880, now + 0.12); // A5

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.3, now + 0.04);
    gain.gain.setValueAtTime(0.3, now + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.36);
  }

  /** Âm thanh khi chiến thắng hoặc hoàn thành xuất sắc (Hợp âm Đô trưởng arpeggio C-E-G-C) */
  function playSuccessSound() {
    const ctx = getAudioContext();
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = ctx.currentTime + idx * 0.09;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.exponentialRampToValueAtTime(0.25, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.3);
    });
  }

  /** Âm thanh còi cảnh báo khi trừ điểm hoặc phạt mất trật tự */
  function playPenaltySound() {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(70, now + 0.6);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.28, now + 0.04);
    gain.gain.setValueAtTime(0.28, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.68);
  }

  /** Âm thanh khi tăng/giảm điểm */
  function playScoreSound(delta) {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

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
    osc.start(now);
    osc.stop(now + 0.35);
  }

  /** Âm thanh khi mở túi mù / gacha */
  function playGachaSound() {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const freqs = [440, 554.37, 659.25, 880];
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = now + i * 0.08;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, t);
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.exponentialRampToValueAtTime(0.2, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.26);
    });
  }

  /** Âm thanh click phím nhẹ */
  function playClickSound() {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(900, now);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.06);
  }

  return {
    playCorrectSound,
    playSuccessSound,
    playPenaltySound,
    playScoreSound,
    playGachaSound,
    playClickSound
  };
})();

// Đưa ra window để tương thích ngược 100% với các bài giảng hiện tại
window.playCorrectSound = Khoi5Audio.playCorrectSound;
window.playSuccessSound = Khoi5Audio.playSuccessSound;
window.playPenaltySound = Khoi5Audio.playPenaltySound;
window.playScoreSound = Khoi5Audio.playScoreSound;
window.playGachaSound = Khoi5Audio.playGachaSound;
window.playClickSound = Khoi5Audio.playClickSound;

