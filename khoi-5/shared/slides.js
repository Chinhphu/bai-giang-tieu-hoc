/**
 * KHOI 5 - SLIDE & NOTEBOOK ENGINE
 * Tiện ích điều hướng slide và cập nhật ngày tháng cho Vở Chép Bài.
 * CHÚ Ý: Module này KHÔNG tự động can thiệp DOM để tránh xung đột với layout riêng của từng tiết.
 * Chỉ hoạt động khi bài giảng chủ động gọi hàm.
 */
const Khoi5Slides = (() => {
  let currentSlideId = '';
  let slideList = [];
  let keyboardInitialized = false;

  /** Quét danh sách slide khi bài học cần dùng */
  function scanSlides() {
    const slides = document.querySelectorAll('.slide');
    slideList = Array.from(slides).map(s => s.id).filter(Boolean);
    const active = document.querySelector('.slide.active');
    if (active) currentSlideId = active.id;
    else if (slideList.length > 0) {
      currentSlideId = slideList[0];
    }
    return slideList;
  }

  /** Chuyển đến slide theo ID */
  function goToSlide(targetId) {
    if (typeof targetId === 'number') targetId = 'slide-' + targetId;
    const target = document.getElementById(targetId);
    if (!target) return;

    document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
    target.classList.add('active');
    currentSlideId = targetId;
    target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /** Sang slide kế tiếp */
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

  /** Lùi slide trước */
  function prevSlide() {
    if (!slideList.length) scanSlides();
    const idx = slideList.indexOf(currentSlideId);
    if (idx > 0) {
      goToSlide(slideList[idx - 1]);
    }
  }

  /**
   * Định dạng ngày tháng hôm nay chuẩn tiếng Việt cho Vở Chép Bài
   * Chỉ cập nhật khi bài học gọi đến hàm này.
   */
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
      document.querySelectorAll(sel).forEach(el => {
        el.textContent = dateString;
      });
    });
    return dateString;
  }

  /** Bật lắng nghe phím bấm điều hướng (chỉ kích hoạt khi bài học gọi) */
  function initKeyboard() {
    if (keyboardInitialized) return;
    keyboardInitialized = true;
    window.addEventListener('keydown', (e) => {
      const tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      }
    });
  }

  return {
    scanSlides,
    goToSlide,
    nextSlide,
    prevSlide,
    formatTodayDate,
    initKeyboard,
    getCurrentSlideId: () => currentSlideId
  };
})();

// Xuất ra window
window.Khoi5Slides = Khoi5Slides;
window.formatTodayDate = Khoi5Slides.formatTodayDate;
