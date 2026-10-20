/**
 * KHOI 3 - SLIDES & SCREEN NAVIGATION ENGINE
 * Quản lý chuyển đổi các màn hình (.screen) và slide trình chiếu theo chuẩn Tiết 06.
 */
const Khoi3Slides = (() => {
  let screens = [];
  let currentScreenId = '';

  /** Chuyển đổi màn hình chính (Welcome -> Phase 1 -> Phase 2 -> Tổng kết) */
  function showScreen(screenId) {
    const id = screenId.startsWith('s-') ? screenId : `s-${screenId}`;
    const allScreens = document.querySelectorAll('.screen');
    allScreens.forEach(s => s.classList.remove('on'));

    const target = document.getElementById(id);
    if (target) {
      target.classList.add('on');
      currentScreenId = id;
    }

    // Ẩn sidebar ở màn hình chào và màn hình tổng kết để có không gian rộng rãi
    const isFull = id === 's-welcome' || id === 's-sum' || id === 's-end';
    document.body.classList.toggle('full', isFull);
  }

  /** Chuyển đổi slide trong chế độ trình chiếu */
  function goToSlide(slideId) {
    const id = typeof slideId === 'number' ? `slide-${slideId}` : slideId;
    const slides = document.querySelectorAll('.slide-container, .slide');
    slides.forEach(s => s.classList.remove('active'));

    const target = document.getElementById(id);
    if (target) {
      target.classList.add('active');
    }
  }

  /** Lắng nghe phím bấm điều hướng */
  function initKeyboard() {
    window.addEventListener('keydown', (e) => {
      const tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;

      if (e.key === 'f' || e.key === 'F') {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      }
    });
  }

  return {
    showScreen,
    goToSlide,
    initKeyboard
  };
})();

window.Khoi3Slides = Khoi3Slides;
window.show = Khoi3Slides.showScreen;

