/**
 * KHOI 3 - GACHA & MYSTERY BOX ENGINE
 * Hệ thống 6 thùng hàng bí mật, hộp quà xoay lắc và mở linh kiện PC theo chuẩn UI Tiết 06.
 */
const Khoi3Gacha = (() => {
  let boxes = [];
  let currentCallback = null;

  /**
   * Tạo 6 thùng hàng ngẫu nhiên sau khi học sinh trả lời đúng
   * @param {Object} team - Đội đang chơi
   * @param {number} boxCount - Số thùng hàng (mặc định 6)
   * @param {Function} onSelect - Callback sau khi mở thùng
   */
  function setupBoxes(team, boxCount = 6, onSelect = null) {
    currentCallback = onSelect;
    const coreCount = window.Khoi3Scoreboard ? window.Khoi3Scoreboard.coreCount(team) : 0;
    const dropRates = [0.50, 0.40, 0.30, 0.12];
    const rate = dropRates[Math.min(coreCount, dropRates.length - 1)] || 0.15;

    boxes = [];
    for (let i = 0; i < boxCount; i++) {
      let isCore = Math.random() < rate;
      let item;
      if (isCore && window.Khoi3Scoreboard) {
        const pool = window.Khoi3Scoreboard.CORE_COMPONENTS.filter(c => (team.inv[c.id] || 0) === 0);
        const pickPool = pool.length > 0 ? pool : window.Khoi3Scoreboard.CORE_COMPONENTS;
        item = { ...pickPool[Math.floor(Math.random() * pickPool.length)], core: true };
      } else if (window.Khoi3Scoreboard) {
        const pool = window.Khoi3Scoreboard.ACCESSORIES;
        item = { ...pool[Math.floor(Math.random() * pool.length)], core: false };
      } else {
        item = { n: 'Quà tặng bí mật', e: '🎁', core: false };
      }
      boxes.push({ id: i + 1, item, opened: false });
    }
    return boxes;
  }

  /**
   * Mở modal hiển thị phần thưởng
   */
  function showRewardModal(item, onClose = null) {
    let modal = document.getElementById('gacha');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'gacha';
      modal.className = 'modal';
      modal.innerHTML = `
        <div class="mcard">
          <h2 id="gTitle" style="color:var(--violet);font-size:4vh;margin:0 0 1vh">🎁 Phần thưởng!</h2>
          <div id="gBody"></div>
          <p id="gMsg" style="font-weight:800;font-size:3.4vh;color:var(--muted);margin:1vh 0"></p>
          <button class="btn green" id="gClose" onclick="Khoi3Gacha.closeRewardModal()">Tuyệt vời! ➔</button>
        </div>
      `;
      document.body.appendChild(modal);
    }

    const gBody = document.getElementById('gBody');
    const gMsg = document.getElementById('gMsg');
    const gClose = document.getElementById('gClose');

    gBody.innerHTML = item.svg
      ? `<div class="reveal" style="font-size:16vh">${item.svg}</div>`
      : `<div class="reveal">${item.e || '🎁'}</div>`;

    gMsg.innerText = item.core
      ? `⭐ Bạn nhận được LINH KIỆN CỐT LÕI: ${item.n}!`
      : `Bạn nhận được phụ kiện: ${item.n}!`;

    modal.classList.add('on');
    if (gClose) gClose.style.display = 'inline-block';

    if (window.playSuccessSound && item.core) {
      window.playSuccessSound();
      if (window.triggerConfetti) window.triggerConfetti();
    } else if (window.playGachaSound) {
      window.playGachaSound();
    }

    modal._onClose = onClose;
  }

  function closeRewardModal() {
    const modal = document.getElementById('gacha');
    if (modal) {
      modal.classList.remove('on');
      if (typeof modal._onClose === 'function') {
        modal._onClose();
        modal._onClose = null;
      }
    }
  }

  return {
    setupBoxes,
    showRewardModal,
    closeRewardModal
  };
})();

window.Khoi3Gacha = Khoi3Gacha;

