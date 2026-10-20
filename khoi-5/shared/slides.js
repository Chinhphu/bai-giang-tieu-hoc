/**
 * KHOI 5 - SLIDE ENGINE
 * Điều hướng bài giảng, bàn phím điều khiển, và tự động cập nhật ngày tháng vở chép bài.
 */
const Khoi5Slides = (() => {
  let currentSlideId = '';
  let slideList = [];

  /** Tự động tìm tất cả các slide trong trang */
  function scanSlides() {
    const slides = document.querySelectorAll('.slide');
    slideList = Array.from(slides).map(s => s.id).filter(Boolean);
    const active = document.querySelector('.slide.active');
    if (active) currentSlideId = active.id;
    else if (slideList.length > 0) {
      currentSlideId = slideList[0];
      slides[0].classList.add('active');
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

  /** Định dạng ngày tháng hôm nay chuẩn tiếng Việt cho slide Chép bài vào tập */
  function formatTodayDate(selector = '.today-date') {
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const today = new Date();
    const dayName = days[today.getDay()];
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const dateString = `${dayName}, ngày ${day} tháng ${month} năm ${year}`;

    document.querySelectorAll(selector).forEach(el => {
      el.textContent = dateString;
    });
    return dateString;
  }

  /** Khởi tạo lắng nghe phím bấm */
  function initKeyboard() {
    window.addEventListener('keydown', (e) => {
      // Bỏ qua nếu đang gõ chữ trong input, textarea hoặc contenteditable
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

  // Tự động quét slide và cập nhật ngày khi DOM sẵn sàng
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      scanSlides();
      formatTodayDate();
      initKeyboard();
    });
  } else {
    scanSlides();
    formatTodayDate();
    initKeyboard();
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
window.goToSlide = Khoi5Slides.goToSlide;
window.nextSlide = Khoi5Slides.nextSlide;
window.prevSlide = Khoi5Slides.prevSlide;
window.changeSlide = (dir) => (dir > 0 ? Khoi5Slides.nextSlide() : Khoi5Slides.prevSlide());
window.goSlide = window.changeSlide;
window.formatTodayDate = Khoi5Slides.formatTodayDate;
window.updateDateDisplay = Khoi5Slides.formatTodayDate;

