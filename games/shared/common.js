// ĐỒNG BỘ CÀI ĐẶT TỪ TRANG HUB
function syncSettingsFromHub() {
    const savedTeamCount = localStorage.getItem('tv_team_count');
    if (savedTeamCount) {
        // Áp dụng cho Game Caro
        let caroSetup = document.getElementById('setup-team-count');
        if (caroSetup) caroSetup.value = savedTeamCount;

        // Áp dụng cho Gõ Phím và Lật Thẻ
        let normalSetup = document.getElementById('team-count') || document.getElementById('teamCountInput');
        if (normalSetup) normalSetup.value = savedTeamCount;
    }
}

// LẤY DỮ LIỆU TỪ EXCEL MÀ GIÁO VIÊN ĐÃ NẠP
function getHubData() {
    try {
        const rawData = localStorage.getItem('tv_data');
        if (rawData) return JSON.parse(rawData);
    } catch (e) {
        console.error("Lỗi đọc dữ liệu từ Hub:", e);
    }
    return null;
}