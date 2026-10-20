/**
 * KHOI 3 - SCOREBOARD & INVENTORY ENGINE
 * Quản lý điểm số, tổ/đội, linh kiện máy tính PC (Core: Thân máy, Màn hình, Bàn phím, Chuột),
 * phụ kiện quà tặng và phạt ồn theo chuẩn UI Tiết 06.
 */
const Khoi3Scoreboard = (() => {
  // 4 Linh kiện cốt lõi của máy tính
  const CORE_COMPONENTS = [
    {
      id: 'case',
      n: 'Thân máy',
      svg: '<svg viewBox="0 0 24 24" width="1em" height="1em"><rect x="6" y="2" width="12" height="20" rx="2" fill="#5b6b8c"/><rect x="8" y="5" width="8" height="2" fill="#2b2d42"/><rect x="8" y="9" width="8" height="2" fill="#2b2d42"/><circle cx="12" cy="17" r="2" fill="#38c98b"/></svg>'
    },
    {
      id: 'monitor',
      n: 'Màn hình',
      svg: '<svg viewBox="0 0 24 24" width="1em" height="1em"><rect x="2" y="3" width="20" height="13" rx="2" fill="#2b3a67"/><rect x="4" y="5" width="16" height="9" fill="#29d3d8"/><rect x="10" y="16" width="4" height="3" fill="#5b6b8c"/><rect x="7" y="19" width="10" height="2" rx="1" fill="#5b6b8c"/></svg>'
    },
    {
      id: 'keyboard',
      n: 'Bàn phím',
      svg: '<svg viewBox="0 0 24 24" width="1em" height="1em"><rect x="1" y="7" width="22" height="11" rx="2" fill="#5b6b8c"/><path d="M3 9h2v2H3zM7 9h2v2H7zM11 9h2v2h-2zM15 9h2v2h-2zM19 9h2v2h-2zM3 12.5h2v2H3zM7 12.5h2v2H7zM11 12.5h2v2h-2zM15 12.5h2v2h-2zM19 12.5h2v2h-2zM6 16h12v1.5H6z" fill="#e9eefb"/></svg>'
    },
    {
      id: 'mouse',
      n: 'Chuột',
      svg: '<svg viewBox="0 0 24 24" width="1em" height="1em"><rect x="7" y="2" width="10" height="20" rx="5" fill="#5b6b8c"/><path d="M12 2v8M7 10h10" stroke="#e9eefb" stroke-width="1.2" fill="none"/></svg>'
    }
  ];

  // Danh mục phụ kiện công nghệ
  const ACCESSORIES = [
    { e: '🔊', n: 'Loa' },
    { e: '🎧', n: 'Tai nghe' },
    { e: '🎤', n: 'Micro' },
    { e: '📹', n: 'Webcam' },
    { e: '🖨️', n: 'Máy in' },
    { e: '💿', n: 'Đĩa CD' },
    { e: '🎮', n: 'Tay cầm chơi game' },
    { e: '🥽', n: 'Kính VR' },
    { e: '🔋', n: 'Pin sạc' }
  ];

  let teams = [];

  function createTeam(index) {
    return {
      id: index,
      name: `TỔ ${index + 1}`,
      inv: { case: 0, monitor: 0, keyboard: 0, mouse: 0 },
      fluff: [],
      correct: 0,
      total: 0,
      pen: 0
    };
  }

  function init(teamCount = 4) {
    teams = Array.from({ length: teamCount }, (_, i) => createTeam(i));
    return teams;
  }

  function getTeams() {
    return teams;
  }

  function setTeams(tList) {
    teams = tList;
  }

  /** Đếm số lượng linh kiện cốt lõi (tối đa 4) */
  function coreCount(team) {
    if (!team || !team.inv) return 0;
    return CORE_COMPONENTS.filter(c => (team.inv[c.id] || 0) > 0).length;
  }

  /** Thêm vật phẩm vào kho của tổ */
  function addItem(team, item) {
    if (item.core || CORE_COMPONENTS.some(c => c.id === item.id)) {
      team.inv[item.id] = (team.inv[item.id] || 0) + 1;
    } else {
      team.fluff.push(item);
    }
  }

  /** Xóa vật phẩm khỏi kho của tổ */
  function removeItem(team, item) {
    if (item.core || CORE_COMPONENTS.some(c => c.id === item.id)) {
      if (team.inv[item.id] > 0) team.inv[item.id]--;
    } else {
      const idx = team.fluff.findIndex(f => f.n === item.n);
      if (idx >= 0) team.fluff.splice(idx, 1);
    }
  }

  /** Phạt ồn: Tịch thu ngẫu nhiên 1 món đồ của tổ */
  function penalizeNoise(teamIndex) {
    const t = teams[teamIndex];
    if (!t) return null;

    const all = [];
    CORE_COMPONENTS.forEach(c => {
      for (let k = 0; k < (t.inv[c.id] || 0); k++) {
        all.push({ ...c, core: true });
      }
    });
    t.fluff.forEach(f => all.push(f));

    if (!all.length) {
      if (window.toast) window.toast(`${t.name} chưa có món nào để tịch thu!`, 2500, 'var(--primary)');
      return null;
    }

    const seized = all[Math.floor(Math.random() * all.length)];
    removeItem(t, seized);
    t.pen = (t.pen || 0) + 1;

    if (window.playPenaltySound) window.playPenaltySound();
    if (window.toast) {
      window.toast(`🔊 ${t.name} ồn ào! Bị tịch thu: ${seized.e || seized.svg || ''} ${seized.n}`, 3000, 'var(--red)');
    }
    return seized;
  }

  return {
    CORE_COMPONENTS,
    ACCESSORIES,
    init,
    getTeams,
    setTeams,
    coreCount,
    addItem,
    removeItem,
    penalizeNoise
  };
})();

window.Khoi3Scoreboard = Khoi3Scoreboard;

