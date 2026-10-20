/**
 * KHOI 5 - GACHA ENGINE (TÚI MÙ MAY MẮN)
 * Minigame bốc túi mù khen thưởng học sinh, tích hợp hiệu ứng mở quà và cộng điểm tự động.
 */
const Khoi5Gacha = (() => {
  let targetTeamId = 1;

  // Bể phần thưởng đã cân bằng tỉ lệ (rate):
  // +10: cao nhất, +20: khá, +30: trung bình, +50: hiếm, +100 & x2: cực hiếm
  const defaultPool = [
    ...Array(10).fill({ text: "+10 ĐIỂM", delta: 10, isSpecial: false }),
    ...Array(6).fill({ text: "+20 ĐIỂM", delta: 20, isSpecial: false }),
    ...Array(3).fill({ text: "+30 ĐIỂM", delta: 30, isSpecial: false }),
    ...Array(2).fill({ text: "+50 ĐIỂM", delta: 50, isSpecial: true }),
    { text: "+100 ĐIỂM", delta: 100, isSpecial: true },
    { text: "x2 ĐIỂM", multiplier: 2, isSpecial: true }
  ];

  /** Mở modal Túi mù */
  function openGacha(teamId = null) {
    if (teamId !== null) targetTeamId = teamId;

    let overlay = document.getElementById('gacha-overlay');
    if (!overlay) {
      // Nếu chưa có HTML của modal trong DOM, tự động tạo
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
    if (window.playClickSound) window.playClickSound();
  }

  /** Chọn mở 1 túi mù */
  function pickBag(bagElement) {
    if (bagElement.classList.contains('opened')) return;

    // Vô hiệu hóa tất cả túi còn lại
    document.querySelectorAll('.blind-bag').forEach(b => b.classList.add('opened'));

    // Bốc ngẫu nhiên
    const prize = defaultPool[Math.floor(Math.random() * defaultPool.length)];

    bagElement.innerHTML = `<span style="font-size: 20px; font-weight: 900; text-align: center;">${prize.text}</span>`;

    if (prize.isSpecial) {
      bagElement.style.color = 'var(--coral)';
      bagElement.style.borderColor = 'var(--coral)';
      if (window.playSuccessSound) window.playSuccessSound();
      if (window.triggerConfetti) window.triggerConfetti();
    } else {
      bagElement.style.color = '#087d69';
      bagElement.style.borderColor = 'var(--mint)';
      if (window.playGachaSound) window.playGachaSound();
    }

    // Tự động cộng điểm vào bảng điểm nếu có hàm updateScore
    if (window.updateScore && targetTeamId) {
      if (prize.delta) {
        window.updateScore(targetTeamId, prize.delta, 'Túi mù');
      } else if (prize.multiplier && window.Khoi5Scoreboard) {
        const current = window.Khoi5Scoreboard.getScores()[targetTeamId] || 10;
        window.updateScore(targetTeamId, current * (prize.multiplier - 1), 'Túi mù x2');
      }
    }
  }

  /** Đóng modal Túi mù */
  function closeGacha() {
    const overlay = document.getElementById('gacha-overlay');
    if (overlay) overlay.style.display = 'none';
  }

  return {
    openGacha,
    pickBag,
    closeGacha
  };
})();

// Xuất ra window
window.Khoi5Gacha = Khoi5Gacha;
window.openGacha = Khoi5Gacha.openGacha;
window.pickBag = Khoi5Gacha.pickBag;
window.closeGacha = Khoi5Gacha.closeGacha;

