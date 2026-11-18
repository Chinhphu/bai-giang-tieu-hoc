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

    // 5. Quy chế thưởng Sao Danh Vọng (Arena Stars ⭐) cho Bảng Vàng Tổng Hợp Toàn Trường
    STAR_REWARDS: {
        TOP_1: 100,      // Quán quân mỗi game: +100 ⭐
        TOP_2: 80,       // Á quân: +80 ⭐
        TOP_3: 60,       // Hạng ba: +60 ⭐
        TOP_4_5: 40,     // Top 4 - 5: +40 ⭐
        TOP_6_10: 25,    // Top 6 - 10: +25 ⭐
        PARTICIPATION: 10 // Hoàn thành game: +10 ⭐
    },

    // 6. Danh mục các minigames trong Đấu Trường
    GAMES: {
        'speed_click': {
            id: 'speed_click',
            name: 'Bấm Chuột Siêu Tốc',
            icon: '⚡',
            unit: 'điểm',
            higherIsBetter: true,
            description: 'Thử thách phản xạ và tốc độ ngón tay trong 15 giây đếm ngược!'
        },
        'typing_race': {
            id: 'typing_race',
            name: 'Đua Gõ Phím Siêu Tốc',
            icon: '⌨️',
            unit: 'WPM',
            higherIsBetter: true,
            description: 'Thử thách gõ 10 ngón đúng phím cơ sở và tốc độ cao!'
        },
        'memory_card': {
            id: 'memory_card',
            name: 'Trí Nhớ Siêu Phàm',
            icon: '🧠',
            unit: 'điểm',
            higherIsBetter: true,
            description: 'Lật thẻ tìm cặp thiết bị phần cứng trong thời gian ngắn nhất!'
        }
    }
};
