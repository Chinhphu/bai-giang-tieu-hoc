/**
 * =========================================================================
 * BỘ CHỐNG TẢI LẠI TRANG & BẢO VỆ DỮ LIỆU TIẾT HỌC (PREVENT RELOAD)
 * =========================================================================
 * Dùng chung cho toàn bộ bài giảng và trò chơi trong hệ thống.
 * 
 * Mục đích:
 * - Chặn học sinh vô tình bấm phím F5, Ctrl+R, Ctrl+F5, Ctrl+W... làm mất điểm/dữ liệu.
 * - Chặn menu chuột phải (ngăn bấm "Tải lại", "Quay lại" hoặc táy máy inspect).
 *   (Giáo viên giữ Shift + Chuột phải nếu cần mở menu ngữ cảnh gốc).
 * - Chặn phím tắt điều hướng Back/Forward (Alt+Mũi tên, Backspace ngoài ô nhập).
 * - Kích hoạt cảnh báo xác nhận `beforeunload` khi tải lại bằng nút trên thanh địa chỉ.
 * =========================================================================
 */
(function initPreventReload() {
    if (typeof window === 'undefined' || window.__PREVENT_RELOAD_ACTIVE__) return;
    window.__PREVENT_RELOAD_ACTIVE__ = true;

    // 1. CẢNH BÁO TRƯỚC KHI RỜI TRANG / TẢI LẠI TRANG (BEFOREUNLOAD)
    // Khi bấm nút reload trên thanh địa chỉ của trình duyệt, browser sẽ hỏi xác nhận
    let isReloadAllowed = false;

    window.addEventListener('beforeunload', function (e) {
        if (isReloadAllowed) return;
        e.preventDefault();
        // Chuẩn kích hoạt popup xác nhận trên Chrome, Edge, Firefox, Safari
        e.returnValue = '';
        return '';
    }, { capture: true });

    // 2. TOAST THÔNG BÁO TRỰC QUAN ĐẸP MẮT KHI BỊ CHẶN PHÍM TẮT
    let toastTimeout = null;
    function showBlockToast(message) {
        // Tận dụng hàm toast sẵn có nếu môi trường đã định nghĩa
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

            if (document.body) {
                attachToast();
            } else {
                document.addEventListener('DOMContentLoaded', attachToast);
            }
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

    // 3. BẮT & CHẶN PHÍM TẮT RELOAD / NAVIGATE Ở GIAI ĐOẠN CAPTURE (ƯU TIÊN TUYỆT ĐỐI)
    window.addEventListener('keydown', function (e) {
        const key = e.key || '';
        const keyCode = e.keyCode || 0;
        const isCtrl = e.ctrlKey || e.metaKey; // Windows/Linux: Ctrl, macOS: Command

        // a) Phím F5 / Ctrl + F5 / Shift + F5
        const isF5 = key === 'F5' || keyCode === 116;

        // b) Ctrl + R / Cmd + R / Ctrl + Shift + R / Cmd + Shift + R
        const isReloadShortcut = isCtrl && (key === 'r' || key === 'R' || keyCode === 82);

        // c) Alt + LeftArrow / Alt + RightArrow (Back / Forward history trang)
        const isHistoryNav = e.altKey && (key === 'ArrowLeft' || key === 'ArrowRight' || keyCode === 37 || keyCode === 39);

        // d) Backspace ngoài ô nhập văn bản (tránh bị back trang trên các trình duyệt cũ/cấu hình đặc biệt)
        const target = e.target;
        const isTargetInput = target && (
            target.tagName === 'INPUT' ||
            target.tagName === 'TEXTAREA' ||
            target.isContentEditable ||
            (typeof target.getAttribute === 'function' && target.getAttribute('contenteditable') === 'true')
        );
        const isBadBackspace = (key === 'Backspace' || keyCode === 8) && !isTargetInput;

        // Xử lý chặn phím Reload
        if (isF5 || isReloadShortcut) {
            e.preventDefault();
            e.stopPropagation();
            showBlockToast('⚠️ Đã khóa phím F5 / Ctrl+R để tránh mất dữ liệu bài học!');
            return false;
        }

        // Xử lý chặn điều hướng ngoài ý muốn
        if (isHistoryNav || isBadBackspace) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }, true); // { capture: true } chặn ngay từ gốc trước khi các phần tử con bắt được

    // 4. CHẶN MENU CHUỘT PHẢI ĐỂ HỌC SINH KHÔNG THỂ BẤM "TẢI LẠI TRANG"
    // Hỗ trợ giáo viên: Giữ phím Shift + Chuột phải nếu cần mở menu ngữ cảnh gốc
    window.addEventListener('contextmenu', function (e) {
        if (e.shiftKey) return; // Cho phép giáo viên dùng Shift + chuột phải
        e.preventDefault();
        showBlockToast('⚠️ Chuột phải đã bị khóa để tránh bấm nhầm Tải lại!');
    }, true);

    // 5. CUNG CẤP HÀM ĐIỀU KHIỂN NẾU CODE CHỦ ĐỘNG MUỐN RELOAD TRANG (nút Làm lại / Chơi lại)
    window.allowPageReload = function () {
        isReloadAllowed = true;
    };
    window.preventPageReload = function () {
        isReloadAllowed = false;
    };
})();

