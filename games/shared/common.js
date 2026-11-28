// ĐỒNG BỘ CÀI ĐẶT TỪ TRANG HUB
const GAME_HUB_DATA_KEY = 'bgtieu_hoc_games_shared_data';
const GAME_HUB_TEAM_COUNT_KEY = 'bgtieu_hoc_games_team_count';

function readHubValue(key, legacyKey) {
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) return savedValue;

    const legacyValue = localStorage.getItem(legacyKey);
    if (legacyValue === null) return null;
    try {
        localStorage.setItem(key, legacyValue);
        localStorage.removeItem(legacyKey);
    } catch (error) {
        console.error('Không thể chuyển đổi dữ liệu mini-game đã lưu.', error);
    }
    return legacyValue;
}

window.GameHubStorage = {
    getTeamCount() {
        return readHubValue(GAME_HUB_TEAM_COUNT_KEY, 'tv_team_count');
    },
    setTeamCount(value) {
        localStorage.setItem(GAME_HUB_TEAM_COUNT_KEY, value);
    },
    getData() {
        const rawData = readHubValue(GAME_HUB_DATA_KEY, 'tv_data');
        if (!rawData) return null;
        try {
            return JSON.parse(rawData);
        } catch (error) {
            console.error('Dữ liệu câu hỏi đã lưu không đúng định dạng.', error);
            return null;
        }
    },
    setData(data) {
        localStorage.setItem(GAME_HUB_DATA_KEY, JSON.stringify(data));
    },
    clear() {
        localStorage.removeItem(GAME_HUB_DATA_KEY);
        localStorage.removeItem(GAME_HUB_TEAM_COUNT_KEY);
        localStorage.removeItem('tv_data');
        localStorage.removeItem('tv_team_count');
    }
};

function syncSettingsFromHub() {
    const savedTeamCount = window.GameHubStorage.getTeamCount();
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
        return window.GameHubStorage.getData();
    } catch (error) {
        console.error("Lỗi đọc dữ liệu từ Hub:", error);
    }
    return null;
}

/* Chống reload đã được nạp thống nhất từ ../../shared/js/prevent-reload.js */