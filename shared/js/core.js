/**
 * =========================================================================
 * BỘ HỖ TRỢ BÀI GIẢNG DÙNG CHUNG TOÀN HỆ THỐNG (CORE SHARED)
 * =========================================================================
 * - Bộ xuất báo cáo CSV UTF-8 có BOM (\uFEFF) & Đồng bộ Google Drive qua GAS.
 * - Quy cách đặt tên file chuẩn ISO sắp xếp tự nhiên theo thời gian:
 *   KetQua_TinHoc{Khoi}_Lop_{Lop}_Tiet_{Tiet}_Ngay_{YYYY}-{MM}-{DD}_{HH}h{MM}p{SS}s.csv
 * - Tiện ích cập nhật ngày tháng Tiếng Việt tự động cho Slide 1 (updateVietnameseDate).
 * =========================================================================
 */

(function initLessonCore() {
    if (typeof window === 'undefined') return;

    // HẰNG SỐ ĐIỂM SÀN MẶC ĐỊNH TOÀN HỆ THỐNG (QUY CHUẨN 12)
    window.STARTING_SCORE = 1000;

    // 1. TIỆN ÍCH NGÀY THÁNG TIẾNG VIỆT TỰ ĐỘNG
    window.updateVietnameseDate = function (targetId = 'current-date-line') {
        const now = new Date();
        const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
        const dayName = days[now.getDay()];
        const date = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();

        const dateStr = `${dayName}, ngày ${date} tháng ${month} năm ${year}`;
        
        // Cập nhật cho tất cả các phần tử ngày tháng tìm thấy
        const selectors = [
            `#${targetId}`,
            '#currentDateDisplay',
            '#current-date-line',
            '#intro-date',
            '#notebookDateDisplay',
            '#date-display',
            '.date-display',
            '.nb-date',
            '.date-header',
            '.intro-date',
            '.current-date-line',
            '.lesson-date',
            '.notebookDateDisplay',
            '.date-badge',
            '.date-line span'
        ];
        
        const elements = document.querySelectorAll(selectors.join(', '));
        elements.forEach(el => {
            el.textContent = dateStr;
        });

        return dateStr;
    };

    // 2. THUẬT TOÁN XẾP HẠNG ĐỒNG HẠNG CHUẨN SƯ PHẠM (QUY CHUẨN 13)
    window.calculateRankings = function (teamList) {
        if (!teamList || !teamList.length) return [];

        const sorted = [...teamList].sort((a, b) => (Number(b.score) || 0) - (Number(a.score) || 0));

        const rankTemplates = [
            { rank: 1, medal: '🥇', title: 'QUÁN QUÂN', sharedTitle: 'ĐỒNG QUÁN QUÂN', themeClass: 'rank-1', border: '#facc15' },
            { rank: 2, medal: '🥈', title: 'Á QUÂN', sharedTitle: 'ĐỒNG Á QUÂN', themeClass: 'rank-2', border: '#94a3b8' },
            { rank: 3, medal: '🥉', title: 'HẠNG BA', sharedTitle: 'ĐỒNG HẠNG BA', themeClass: 'rank-3', border: '#d97706' },
            { rank: 4, medal: '🌟', title: 'KHUYẾN KHÍCH', sharedTitle: 'KHUYẾN KHÍCH', themeClass: 'rank-4', border: '#3b82f6' },
            { rank: 5, medal: '🎖️', title: 'NỖ LỰC', sharedTitle: 'NỖ LỰC', themeClass: 'rank-5', border: '#10b981' },
            { rank: 6, medal: '🎗️', title: 'GẮN KẾT', sharedTitle: 'GẮN KẾT', themeClass: 'rank-6', border: '#64748b' }
        ];

        let currentRankIdx = 0;
        return sorted.map((team, idx, arr) => {
            const score = Number(team.score) || 0;

            if (idx > 0 && score === (Number(arr[idx - 1].score) || 0)) {
                // Cùng thứ hạng với đội trước
            } else {
                currentRankIdx = idx;
            }

            const isShared = arr.filter(item => (Number(item.score) || 0) === score).length > 1;
            const tpl = rankTemplates[currentRankIdx] || rankTemplates[rankTemplates.length - 1];
            const title = isShared && currentRankIdx < 3 ? tpl.sharedTitle : tpl.title;

            return {
                ...team,
                score,
                rank: currentRankIdx + 1,
                isShared,
                medal: tpl.medal,
                title: title,
                border: tpl.border,
                badgeText: isShared ? `Đồng Hạng ${tpl.rank}` : `Hạng ${tpl.rank}`
            };
        });
    };

    // Tự động kích hoạt khi DOM sẵn sàng
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => window.updateVietnameseDate());
    } else {
        window.updateVietnameseDate();
    }
})();

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
        const sortDateStr = `Ngay_${yyyy}-${mo}-${dd}_${timeStr}`;

        const mainPrefix = prefix || `KetQua_TinHoc${g}`;
        return `${mainPrefix}_Lop_${c}_Tiet_${l}_${sortDateStr}.csv`;
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
        if (!Array.isArray(data) || data.length === 0) return '';

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
            const bg = (type === 'ok' || type === 'success') ? '#16a34a' :
                       (type === 'warn' || type === 'warning') ? '#d97706' :
                       (type === 'bad' || type === 'error') ? '#dc2626' : '#2563eb';
            if (typeof window.showToast === 'function') {
                window.showToast(msg, type);
            } else if (typeof window.toast === 'function') {
                window.toast(msg, 3500, bg);
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
        uploadToDrive: uploadCsvToDrive,
        calculateRankings: window.calculateRankings
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
