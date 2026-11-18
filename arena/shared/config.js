/**
 * =========================================================================
 * ARENA CONFIGURATION (CẤU HÌNH ĐẤU TRƯỜNG TOÀN TRƯỜNG)
 * =========================================================================
 * Tệp cấu hình tập trung cho toàn bộ phân khu arena/.
 * Chứa các thông số kết nối Google Apps Script, Google Sheets CSV và bảo mật.
 * =========================================================================
 */

window.ARENA_CONFIG = {
    // 1. Endpoint Google Apps Script Web App nhận POST điểm số
    // (Thay thế bằng URL Web App thật sau khi triển khai backend-gas/Code.gs)
    GAS_ENDPOINT: 'https://script.google.com/macros/s/AKfycbx_PLACEHOLDER_GAS_ENDPOINT/exec',

    // 2. URL xuất bản CSV của tab "Leaderboard" từ Google Sheets
    // (Vào Google Sheets -> Tệp -> Chia sẻ -> Xuất bản lên web -> Tab Leaderboard -> Định dạng CSV)
    CSV_LEADERBOARD_URL: 'https://docs.google.com/spreadsheets/d/e/2PACX-PLACEHOLDER_SHEET_ID/pub?gid=0&single=true&output=csv',

    // 3. Khóa bí mật tạo chữ ký băm SHA-256 chống gian lận điểm số
    // BẮT BUỘC KHỚP 100% với biến SECRET_SALT trong backend-gas/Code.gs
    SECRET_SALT: 'TieuHoc_Arena_SecretSalt_2026_2027_SafeHashKey!@#',

    // 4. Niên khóa hiện tại để nạp dữ liệu học sinh
    SCHOOL_YEAR: '2026_2027',

    // 5. Danh mục các minigames trong Đấu Trường
    GAMES: {
        'speed_click': {
            id: 'speed_click',
            name: 'Bấm Chuột Siêu Tốc',
            icon: '⚡',
            unit: 'điểm',
            higherIsBetter: true,
            description: 'Thử thách phản xạ và tốc độ ngón tay trong 15 giây đếm ngược!'
        }
    }
};
