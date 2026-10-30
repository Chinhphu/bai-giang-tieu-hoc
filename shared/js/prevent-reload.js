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

/**
 * =========================================================================
 * BỘ XUẤT BÁO CÁO CSV THỐNG NHẤT TOÀN HỆ THỐNG (LESSON EXPORT HELPER)
 * =========================================================================
 * Quy cách đặt tên file chuẩn duy nhất toàn repo:
 * KetQua_TinHoc{Khoi}_Lop_{Lop}_Tiet_{Tiet}_{HH}h{MM}p{SS}s_Ngay_{DD}-{MM}-{YYYY}.csv
 * =========================================================================
 */
(function initLessonExport() {
    if (typeof window === 'undefined' || window.LessonExport) return;

    const GAS_UPLOAD_URL = 'https://script.google.com/macros/s/AKfycbywqn9mgeON9fTqp3xmnGbuqWW-eChABhvaotV4qHezosaqlYuWpF0c4vnB7APkuXBSRw/exec';

    function buildExportFileName({ grade = '1', classId = '1_1', lesson = '01', prefix = null, date = new Date() } = {}) {
        const g = String(grade).replace(/\D/g, '') || '1';

        let c = String(classId || '').trim();
        if (!c) c = `${g}-1`;
        c = c.replace(/^(?:l[oớ]p)[_\s-]*/i, '');
        c = c.replace(/\//g, '-').replace(/_/g, '-');
        c = c.replace(/[^a-zA-Z0-9\-]/g, '');
        if (!c) c = `${g}-1`;

        let l = String(lesson || '').trim().replace(/^(?:ti[eế]t)[_\s-]*/i, '');
        const lMatch = l.match(/\d+/);
        l = lMatch ? String(lMatch[0]).padStart(2, '0') : '01';

        const pad = n => String(n).padStart(2, '0');
        const d = (date instanceof Date && !isNaN(date.getTime())) ? date : new Date();
        const hh = pad(d.getHours());
        const mm = pad(d.getMinutes());
        const ss = pad(d.getSeconds());
        const timeStr = `${hh}h${mm}p${ss}s`;

        const dd = pad(d.getDate());
        const mo = pad(d.getMonth() + 1);
        const yyyy = d.getFullYear();
        const dateStr = `Ngay_${dd}-${mo}-${yyyy}`;

        const mainPrefix = prefix || `KetQua_TinHoc${g}`;
        return `${mainPrefix}_Lop_${c}_Tiet_${l}_${timeStr}_${dateStr}.csv`;
    }

    function escapeCsv(val) {
        if (val === null || val === undefined) return '';
        const s = String(val);
        if (s.includes('"') || s.includes(',') || s.includes('\n') || s.includes('\r')) {
            return `"${s.replace(/"/g, '""')}"`;
        }
        return s;
    }

    function tableToCsv(data) {
        if (!Array.isArray(data) || data.length === 0) return '';
        if (Array.isArray(data[0])) {
            return data.map(row => (Array.isArray(row) ? row : [row]).map(escapeCsv).join(',')).join('\r\n');
        }
        const columns = Object.keys(data[0] || {});
        const header = columns.map(escapeCsv).join(',');
        const body = data.map(row => columns.map(col => escapeCsv(row[col])).join(',')).join('\r\n');
        return header + (body ? '\r\n' + body : '');
    }

    function convertToCsv(data) {
        if (typeof data === 'string') return data;
        if (!Array.isArray(data) || data.length === 0) {
            if (data && data.SheetNames && data.Sheets && typeof window.XLSX !== 'undefined') {
                const sections = data.SheetNames.map(sheetName => {
                    const sheet = data.Sheets[sheetName];
                    const sheetData = window.XLSX.utils.sheet_to_json(sheet, { header: 1 });
                    return [sheetName, sheetData];
                });
                return convertToCsv(sections);
            }
            return '';
        }

        const isMultiSection = data.every(item => {
            if (Array.isArray(item) && item.length === 2 && typeof item[0] === 'string' && (Array.isArray(item[1]) || typeof item[1] === 'object')) return true;
            if (item && typeof item === 'object' && (item.title || item.name || item.sheetName) && (item.data || item.rows)) return true;
            return false;
        });

        if (isMultiSection) {
            return data.map(section => {
                let title = '';
                let sheetData = [];
                if (Array.isArray(section)) {
                    title = section[0];
                    sheetData = section[1];
                } else {
                    title = section.title || section.name || section.sheetName || 'Mục';
                    sheetData = section.data || section.rows || [];
                }
                const banner = `=== ${title.toUpperCase()} ===`;
                const tableCsv = tableToCsv(sheetData);
                return `"${banner}"\r\n` + tableCsv;
            }).join('\r\n\r\n');
        }

        return tableToCsv(data);
    }

    function downloadCsv(csvContent, fileName) {
        let name = String(fileName || 'Bao_Cao.csv').trim();
        if (name.toLowerCase().endsWith('.xlsx') || name.toLowerCase().endsWith('.xls')) {
            name = name.replace(/\.xlsx?$/i, '.csv');
        } else if (!name.toLowerCase().endsWith('.csv')) {
            name += '.csv';
        }

        const csv = (typeof csvContent === 'string') ? csvContent : convertToCsv(csvContent);
        const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    async function uploadCsvToDrive(csvData, fileName) {
        let name = String(fileName || 'Bao_Cao.csv').trim();
        if (name.toLowerCase().endsWith('.xlsx') || name.toLowerCase().endsWith('.xls')) {
            name = name.replace(/\.xlsx?$/i, '.csv');
        } else if (!name.toLowerCase().endsWith('.csv')) {
            name += '.csv';
        }

        const csv = (typeof csvData === 'string') ? csvData : convertToCsv(csvData);

        const showMsg = (msg, type = 'info') => {
            if (typeof window.toast === 'function') {
                window.toast(msg, 3500);
            } else if (typeof window.showToast === 'function') {
                window.showToast(msg, type);
            } else {
                console.log(msg);
            }
        };

        showMsg('☁️ Đang đồng bộ nhật ký CSV lên Google Drive...', 'info');

        try {
            const utf8Bytes = new TextEncoder().encode('\uFEFF' + csv);
            let binary = '';
            for (let i = 0; i < utf8Bytes.byteLength; i++) {
                binary += String.fromCharCode(utf8Bytes[i]);
            }
            const base64Data = btoa(binary);

            const payload = {
                fileName: name,
                fileData: base64Data,
                mimeType: 'text/csv;charset=utf-8'
            };

            const response = await fetch(GAS_UPLOAD_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            if (result && result.status === 'success') {
                showMsg('✅ Đã lưu file CSV vào Drive (Thư mục Log tiết học)!', 'ok');
                return result;
            } else {
                throw new Error((result && result.message) || 'Lỗi phản hồi từ Google Apps Script');
            }
        } catch (err) {
            console.warn('Không thể gửi lên Google Drive, chuyển sang tải file CSV trực tiếp:', err);
            downloadCsv(csv, name);
            showMsg(`📥 Đã tự động lưu file CSV về máy: ${name}`, 'warn');
        }
    }

    const LessonExport = {
        buildFileName: buildExportFileName,
        escapeCsv,
        tableToCsv,
        convertToCsv,
        download: downloadCsv,
        uploadToDrive: uploadCsvToDrive
    };

    window.LessonExport = LessonExport;
    window.buildExportFileName = buildExportFileName;
    window.exportToCsv = downloadCsv;
    window.uploadCsvToDrive = uploadCsvToDrive;
    // Cầu nối tương thích ngược
    window.uploadExcelToDrive = function (wbOrData, fileName) {
        return uploadCsvToDrive(wbOrData, fileName);
    };
})();

