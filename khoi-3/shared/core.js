/**
 * KHOI 3 - CORE BUNDLE
 * Tích hợp toàn diện Audio, Slides, Scoreboard, Students (thuần JSON), Gacha, Tracker và Utils.
 */
const Khoi3Core = (() => {
  return {
    Audio: window.Khoi3Audio,
    Slides: window.Khoi3Slides,
    Scoreboard: window.Khoi3Scoreboard,
    Students: window.Khoi3Students,
    Gacha: window.Khoi3Gacha,
    Tracker: window.Khoi3Tracker,
    Utils: window.Khoi3Utils,
    uploadExcelToDrive: window.uploadExcelToDrive,
    toast: window.toast
  };
})();

window.Khoi3Core = Khoi3Core;

