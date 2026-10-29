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

/* =========================================================================
 * BỘ CHỐNG TẢI LẠI TRANG & MẤT DỮ LIỆU GAME (PREVENT RELOAD)
 * ========================================================================= */
(function initPreventReload() {
    if (typeof window === 'undefined' || window.__PREVENT_RELOAD_ACTIVE__) return;
    window.__PREVENT_RELOAD_ACTIVE__ = true;

    let isReloadAllowed = false;

    window.addEventListener('beforeunload', function (e) {
        if (isReloadAllowed) return;
        e.preventDefault();
        e.returnValue = '';
        return '';
    }, { capture: true });

    let toastTimeout = null;
    function showBlockToast(message) {
        if (typeof window.toast === 'function') {
            try {
                window.toast(message, 2500, '#dc2626');
                return;
            } catch (err) {}
        }

        let toastEl = document.getElementById('prevent-reload-toast');
        if (!toastEl) {
            toastEl = document.createElement('div');
            toastEl.id = 'prevent-reload-toast';
            toastEl.style.cssText = [
                'position: fixed',
                'top: 24px',
                'left: 50%',
                'transform: translateX(-50%) translateY(-20px)',
                'background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
                'color: #ffffff',
                'padding: 12px 24px',
                'border-radius: 9999px',
                'box-shadow: 0 10px 25px -5px rgba(220, 38, 38, 0.5), 0 8px 10px -6px rgba(220, 38, 38, 0.4)',
                'font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Baloo 2", sans-serif',
                'font-size: 16px',
                'font-weight: 700',
                'letter-spacing: 0.3px',
                'z-index: 9999999',
                'pointer-events: none',
                'opacity: 0',
                'transition: opacity 0.25s ease, transform 0.25s ease',
                'display: flex',
                'align-items: center',
                'gap: 8px',
                'border: 2px solid rgba(255, 255, 255, 0.35)',
                'box-sizing: border-box',
                'text-align: center'
            ].join(';');

            const attachToast = () => {
                if (document.body && !document.getElementById('prevent-reload-toast')) {
                    document.body.appendChild(toastEl);
                }
            };
            if (document.body) attachToast();
            else document.addEventListener('DOMContentLoaded', attachToast);
        }

        toastEl.innerHTML = message;
        toastEl.style.opacity = '1';
        toastEl.style.transform = 'translateX(-50%) translateY(0)';

        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            if (toastEl) {
                toastEl.style.opacity = '0';
                toastEl.style.transform = 'translateX(-50%) translateY(-20px)';
            }
        }, 2200);
    }

    window.addEventListener('keydown', function (e) {
        const key = e.key || '';
        const keyCode = e.keyCode || 0;
        const isCtrl = e.ctrlKey || e.metaKey;

        const isF5 = key === 'F5' || keyCode === 116;
        const isReloadShortcut = isCtrl && (key === 'r' || key === 'R' || keyCode === 82);
        const isHistoryNav = e.altKey && (key === 'ArrowLeft' || key === 'ArrowRight' || keyCode === 37 || keyCode === 39);

        const target = e.target;
        const isTargetInput = target && (
            target.tagName === 'INPUT' ||
            target.tagName === 'TEXTAREA' ||
            target.isContentEditable ||
            (typeof target.getAttribute === 'function' && target.getAttribute('contenteditable') === 'true')
        );
        const isBadBackspace = (key === 'Backspace' || keyCode === 8) && !isTargetInput;

        if (isF5 || isReloadShortcut) {
            e.preventDefault();
            e.stopPropagation();
            showBlockToast('⚠️ Đã khóa phím F5 / Ctrl+R để tránh mất dữ liệu game!');
            return false;
        }

        if (isHistoryNav || isBadBackspace) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }, true);

    window.addEventListener('contextmenu', function (e) {
        if (e.shiftKey) return;
        e.preventDefault();
        showBlockToast('⚠️ Chuột phải đã bị khóa để tránh bấm nhầm Tải lại!');
    }, true);

    window.allowPageReload = function () { isReloadAllowed = true; };
    window.preventPageReload = function () { isReloadAllowed = false; };
})();