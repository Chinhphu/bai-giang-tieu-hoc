/**
 * KHOI 5 - SCOREBOARD ENGINE
 * Quản lý điểm số, đội chơi, phạt vi phạm và vinh danh bảng xếp hạng.
 */
const Khoi5Scoreboard = (() => {
  let teams = [];
  let scoreMap = {};
  let layoutType = 'topbar'; // 'topbar' hoặc 'sidebar'

  /** Khởi tạo bảng điểm */
  function init(options = {}) {
    const count = options.teamCount || 4;
    const containerId = options.containerId || 'scoreboard-container';
    const scoreInput = document.getElementById('s-score');
    const systemBaseScore = typeof window.STARTING_SCORE === 'number' ? window.STARTING_SCORE : 1000;
    const defaultInitialScore = scoreInput ? (parseInt(scoreInput.value, 10) || systemBaseScore) : systemBaseScore;
    const initialScore = typeof options.initialScore === 'number' ? options.initialScore : defaultInitialScore;
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

  /** Hiển thị bảng điểm ra giao diện */
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
      // Dạng Topbar ngang mặc định
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

  /** Cập nhật điểm của đội */
  function updateScore(teamId, delta, reason = '') {
    if (scoreMap[teamId] === undefined) scoreMap[teamId] = 0;
    scoreMap[teamId] = Math.max(0, scoreMap[teamId] + delta);

    // Đồng bộ lại trong teams array
    const t = teams.find(item => item.id === teamId);
    if (t) t.score = scoreMap[teamId];

    // Cập nhật DOM
    const input = document.getElementById(`score-${teamId}`);
    if (input) {
      if (input.tagName === 'INPUT') input.value = scoreMap[teamId];
      else input.textContent = scoreMap[teamId];
    }

    // Phát âm thanh
    if (window.playScoreSound) window.playScoreSound(delta);

    return scoreMap[teamId];
  }

  /** Đặt điểm trực tiếp */
  function setScore(teamId, value) {
    const val = Math.max(0, parseInt(value, 10) || 0);
    scoreMap[teamId] = val;
    const t = teams.find(item => item.id === teamId);
    if (t) t.score = val;

    const input = document.getElementById(`score-${teamId}`);
    if (input && input.tagName === 'INPUT') input.value = val;
    return val;
  }

  /** Phạt đội mất trật tự */
  function penalizeTeam(teamId, penaltyAmount = 10) {
    updateScore(teamId, -penaltyAmount, 'Phạt mất trật tự');
    if (window.playPenaltySound) window.playPenaltySound();
    if (window.toast) {
      const t = teams.find(item => item.id === teamId);
      const name = t ? t.name : `Đội ${teamId}`;
      window.toast(`🚨 ${name} bị trừ ${penaltyAmount} điểm vì mất trật tự!`, 2500, 'var(--coral)');
    }
  }

  /** Đặt lại toàn bộ điểm */
  function resetAllScores(defaultVal = 1000) {
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

  /** Tạo bảng vinh danh xếp hạng chuẩn sư phạm (Xử lý đồng hạng) */
  function renderRankings(containerId = 'rankings-list') {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Đồng bộ điểm mới nhất vào teams
    const currentList = teams.map(t => ({
      ...t,
      score: scoreMap[t.id] !== undefined ? scoreMap[t.id] : (Number(t.score) || 0)
    }));

    const calcFn = window.calculateRankings || function (list) {
      return [...list].sort((a, b) => (Number(b.score) || 0) - (Number(a.score) || 0));
    };

    const ranked = calcFn(currentList);

    container.innerHTML = ranked.map(t => {
      const cls = t.themeClass || (t.rank === 1 ? 'rank-1' : t.rank === 2 ? 'rank-2' : t.rank === 3 ? 'rank-3' : 'rank-4');
      const badgeText = t.badgeText || (t.isShared ? `Đồng Hạng ${t.rank}` : `Hạng ${t.rank}`);
      return `
        <div class="rank-card ${cls}" style="${t.border ? `border-left: 6px solid ${t.border};` : ''}">
          <div style="display:flex; align-items:center; gap:12px;">
            <span style="font-size:32px;">${t.medal || '🎖️'}</span>
            <div>
              <div style="font-size:14px; font-weight:800; color:#475569;">${t.title} <span style="font-size:12px; opacity:0.8;">(${badgeText})</span></div>
              <div style="font-size:22px; font-weight:900;">${t.name}</div>
            </div>
          </div>
          <div style="font-size:26px; font-weight:900; color:var(--blue);">${t.score} Điểm</div>
        </div>
      `;
    }).join('');

    // Banner vinh danh trên cùng (nếu có thẻ)
    const bannerEl = document.getElementById('winner-banner') || document.getElementById('winnerBanner');
    if (bannerEl && ranked.length > 0) {
      const topScore = ranked[0].score;
      const winners = ranked.filter(r => r.rank === 1);
      if (winners.length > 1) {
        bannerEl.innerHTML = `🏆 ĐỒNG QUÁN QUÂN: ${winners.map(w => w.name).join(' & ')} (CÙNG ĐẠT ${topScore} ĐIỂM)! 🏆`;
      } else {
        bannerEl.innerHTML = `🏆 CHÚC MỪNG ${winners[0].name} LÀ QUÁN QUÂN (${topScore} ĐIỂM)! 🏆`;
      }
    }

    if (window.triggerConfetti) window.triggerConfetti();
    if (window.playSuccessSound) window.playSuccessSound();
  }

  return {
    init,
    render,
    updateScore,
    setScore,
    penalizeTeam,
    resetAllScores,
    renderRankings,
    getScores: () => ({ ...scoreMap }),
    getTeams: () => [...teams]
  };
})();

// Xuất ra window
window.Khoi5Scoreboard = Khoi5Scoreboard;
window.updateScore = Khoi5Scoreboard.updateScore;
window.penalizeTeam = Khoi5Scoreboard.penalizeTeam;
window.resetAllScores = Khoi5Scoreboard.resetAllScores;
window.renderRanking = Khoi5Scoreboard.renderRankings;
window.renderRankings = Khoi5Scoreboard.renderRankings;

