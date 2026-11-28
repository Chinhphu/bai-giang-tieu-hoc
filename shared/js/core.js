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

    const _coreScriptEl = (typeof document !== 'undefined') ? document.currentScript : null;
    const _studentsAllUrl = (_coreScriptEl && _coreScriptEl.src)
        ? new URL('../../assets/data/students_all_2026_2027.js', _coreScriptEl.src).href
        : '../../assets/data/students_all_2026_2027.js';

    // HẰNG SỐ ĐIỂM SÀN MẶC ĐỊNH TOÀN HỆ THỐNG (QUY CHUẨN 12)
    window.STARTING_SCORE = 1000;

    // 0. HỆ THỐNG THÔNG BÁO TOAST DÙNG CHUNG TOÀN HỆ THỐNG
    let _coreToastTimer = null;
    if (typeof window.toast !== 'function') {
        window.toast = function (message, duration = 2600, background = '#0284c7') {
            let el = document.getElementById('toast');
            if (!el) {
                el = document.createElement('div');
                el.id = 'toast';
                el.className = 'toast';
                document.body.appendChild(el);
            }
            el.innerHTML = message;
            const bg = (background && String(background).startsWith('var(')) ? background : (background || '#0284c7');
            el.style.background = bg;
            el.style.display = 'inline-flex';
            if (!el.dataset.coreStyled && !getComputedStyle(el).position.includes('fixed')) {
                el.style.cssText += ';position:fixed;top:24px;left:50%;transform:translateX(-50%);color:#fff;padding:12px 24px;border-radius:9999px;box-shadow:0 10px 25px rgba(0,0,0,0.28);font-family:"Be Vietnam Pro",system-ui,sans-serif;font-size:15px;font-weight:700;z-index:9999999;pointer-events:none;align-items:center;gap:8px;text-align:center;border:2px solid rgba(255,255,255,0.3);max-width:90vw;';
                el.dataset.coreStyled = '1';
            }
            el.classList.add('show');
            window.clearTimeout(_coreToastTimer);
            _coreToastTimer = window.setTimeout(() => {
                el.classList.remove('show');
                el.style.display = 'none';
            }, duration);
        };
    }

    if (typeof window.showToast !== 'function') {
        window.showToast = function (message, type = 'info', duration = 3000) {
            const bg = (type === 'ok' || type === 'success') ? '#16a34a' :
                       (type === 'warn' || type === 'warning' || type === 'gold') ? '#d97706' :
                       (type === 'bad' || type === 'error' || type === 'coral') ? '#dc2626' : '#0284c7';
            return window.toast(message, duration, bg);
        };
    }

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
            { rank: 1, medal: '🥇', csvMedal: 'Huy chương Vàng', title: 'QUÁN QUÂN', sharedTitle: 'ĐỒNG QUÁN QUÂN', themeClass: 'rank-1', border: '#facc15' },
            { rank: 2, medal: '🥈', csvMedal: 'Huy chương Bạc', title: 'Á QUÂN', sharedTitle: 'ĐỒNG Á QUÂN', themeClass: 'rank-2', border: '#94a3b8' },
            { rank: 3, medal: '🥉', csvMedal: 'Huy chương Đồng', title: 'HẠNG BA', sharedTitle: 'ĐỒNG HẠNG BA', themeClass: 'rank-3', border: '#d97706' },
            { rank: 4, medal: '🌟', csvMedal: 'Huy hiệu Khuyến khích', title: 'KHUYẾN KHÍCH', sharedTitle: 'KHUYẾN KHÍCH', themeClass: 'rank-4', border: '#3b82f6' },
            { rank: 5, medal: '🎖️', csvMedal: 'Huy hiệu Nỗ lực', title: 'NỖ LỰC', sharedTitle: 'NỖ LỰC', themeClass: 'rank-5', border: '#10b981' },
            { rank: 6, medal: '🎗️', csvMedal: 'Huy hiệu Gắn kết', title: 'GẮN KẾT', sharedTitle: 'GẮN KẾT', themeClass: 'rank-6', border: '#64748b' }
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
                csvMedal: tpl.csvMedal || (tpl.rank === 1 ? 'Huy chương Vàng' : tpl.rank === 2 ? 'Huy chương Bạc' : tpl.rank === 3 ? 'Huy chương Đồng' : 'Huy hiệu Khuyến khích'),
                title: title,
                themeClass: tpl.themeClass,
                border: tpl.border,
                badgeText: isShared ? `Đồng Hạng ${tpl.rank}` : `Hạng ${tpl.rank}`
            };
        });
    };

    // 3. POP-UP TOÀN MÀN HÌNH CHÉP BÀI (OVERLAY MODAL CHUẨN AGENTS.MD, KHÔNG DÙNG NATIVE F11)
    window.toggleNotebookFullscreen = function (triggerOrTarget) {
        let box = null;

        if (triggerOrTarget) {
            if (typeof triggerOrTarget === 'string') {
                box = document.querySelector(triggerOrTarget);
            } else if (triggerOrTarget instanceof HTMLElement) {
                if (triggerOrTarget.classList.contains('notebook') ||
                    triggerOrTarget.classList.contains('notebook-paper') ||
                    triggerOrTarget.classList.contains('notebook-box') ||
                    triggerOrTarget.classList.contains('notebook-clean-wrapper') ||
                    triggerOrTarget.classList.contains('blackboard') ||
                    triggerOrTarget.id === 'boardWrap' ||
                    triggerOrTarget.id === 'slide-2-notebook-box') {
                    box = triggerOrTarget;
                } else {
                    const parentSlide = triggerOrTarget.closest('.slide, .screen, section, main, body');
                    if (parentSlide) {
                        box = parentSlide.querySelector('.notebook.clean, .notebook-clean, #slide-2-notebook-box, .notebook-paper, .notebook-box, .notebook-clean-wrapper, .blackboard, .notebook-content, #boardWrap, .notebook');
                    }
                }
            }
        }

        if (!box) {
            const activeSlide = document.querySelector('.slide.active, .slide.on, .screen.active, .screen.on, .slide:not([style*="display: none"]):not([style*="display:none"])');
            if (activeSlide) {
                box = activeSlide.querySelector('.notebook.clean, .notebook-clean, #slide-2-notebook-box, .notebook-paper, .notebook-box, .notebook-clean-wrapper, .blackboard, .notebook-content, #boardWrap, .notebook');
            }
        }

        if (!box) {
            box = document.querySelector('#slide-2-notebook-box, .notebook.clean, .notebook-clean, .notebook-paper, .notebook-box, .notebook-clean-wrapper, .blackboard, .notebook-content, #boardWrap, .notebook');
        }

        if (!box) return;

        let closeBtn = box.querySelector('.btn-fs-close');
        if (!closeBtn) {
            closeBtn = document.createElement('button');
            closeBtn.type = 'button';
            closeBtn.className = 'btn-fs-close';
            closeBtn.title = 'Thu nhỏ (Esc)';
            closeBtn.innerHTML = '✖';
            closeBtn.onclick = (e) => {
                e.stopPropagation();
                window.toggleNotebookFullscreen(box);
            };
            box.prepend(closeBtn);
        }

        const isCurrentlyFullscreen = box.classList.contains('fullscreen-mode');

        if (!isCurrentlyFullscreen) {
            box.classList.add('fullscreen-mode');
            document.body.classList.add('has-notebook-fullscreen');
            box.scrollTop = 0;

            document.querySelectorAll('.btn-fs-toggle, [data-action="toggle-notebook-fs"]').forEach(btn => {
                btn.style.display = 'none';
            });
        } else {
            box.classList.remove('fullscreen-mode');
            document.body.classList.remove('has-notebook-fullscreen');

            document.querySelectorAll('.btn-fs-toggle, [data-action="toggle-notebook-fs"]').forEach(btn => {
                btn.style.display = '';
                btn.innerHTML = '⛶';
                btn.title = 'Chế độ toàn màn hình chép bài';
            });
        }
    };

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const fsBox = document.querySelector('.fullscreen-mode');
            if (fsBox) {
                window.toggleNotebookFullscreen(fsBox);
            }
        }
    });

    // 4. TRÌNH QUẢN LÝ TRẠNG THÁI LOCALSTORAGE & PHỤC HỒI KHI CÚP ĐIỆN (QUY CHUẨN 10 & 11)
    window.createSessionStateManager = function ({
        storageKey,
        defaultState = {},
        onRestore = null,
        onClear = null,
        autoRestoreMsg = '⚡ Đã tự động khôi phục dữ liệu phiên học trước do sự cố tắt máy/cúp điện!'
    }) {
        if (!storageKey) {
            console.error('createSessionStateManager: Cần cung cấp storageKey duy nhất!');
            return null;
        }

        const notify = (msg, type = 'info') => {
            if (typeof window.showToast === 'function') {
                window.showToast(msg, type);
            } else if (typeof window.toast === 'function') {
                const bg = (type === 'ok' || type === 'success') ? '#16a34a' :
                           (type === 'warn' || type === 'warning') ? '#d97706' :
                           (type === 'bad' || type === 'error') ? '#dc2626' : '#2563eb';
                window.toast(msg, 3500, bg);
            } else {
                console.log(`[SessionState] ${msg}`);
            }
        };

        const save = (state) => {
            try {
                const payload = {
                    ...state,
                    __savedAt: new Date().toISOString()
                };
                localStorage.setItem(storageKey, JSON.stringify(payload));
            } catch (err) {
                console.warn('Lỗi khi lưu SessionState vào LocalStorage:', err);
                if (err && (err.name === 'QuotaExceededError' || err.code === 22 || err.code === 1014)) {
                    notify('⚠️ BỘ NHỚ TRÌNH DUYỆT ĐÃ ĐẦY! Thầy/Cô vui lòng xuất file CSV rồi bấm "🔄 Dạy Lớp Mới" ở Sidebar để làm mới bộ nhớ cho lớp tiếp theo nhé!', 'warn');
                }
            }
        };

        // Hàm kiểm tra dung lượng ước tính của LocalStorage để cảnh báo sớm
        const checkQuota = () => {
            try {
                let total = 0;
                for (let x in localStorage) {
                    if (Object.prototype.hasOwnProperty.call(localStorage, x)) {
                        total += ((localStorage[x] && localStorage[x].length) || 0) * 2; // UTF-16
                    }
                }
                // Hạn mức thông thường của trình duyệt là ~5MB. Nếu >= 4MB thì nhắc nhở
                if (total >= 4 * 1024 * 1024) {
                    const mbUsed = (total / (1024 * 1024)).toFixed(1);
                    notify(`⚠️ Bộ nhớ tạm trên trình duyệt gần đầy (${mbUsed}MB / ~5MB)! Thầy/Cô hãy xuất CSV và bấm "🔄 Dạy Lớp Mới" ở Sidebar để giải phóng nhé!`, 'warn');
                }
            } catch (e) {}
        };

        const load = () => {
            try {
                const raw = localStorage.getItem(storageKey);
                if (!raw) return null;
                return JSON.parse(raw);
            } catch (err) {
                console.warn('Lỗi khi đọc SessionState từ LocalStorage:', err);
                return null;
            }
        };

        const restore = () => {
            checkQuota();
            const saved = load();
            if (saved) {
                if (typeof onRestore === 'function') {
                    onRestore(saved);
                }
                if (autoRestoreMsg) {
                    setTimeout(() => notify(autoRestoreMsg, 'ok'), 300);
                }
                return saved;
            }
            return null;
        };

        const clear = (confirmMsg = '⚠️ Bạn có chắc chắn muốn xóa dữ liệu đã lưu của tiết này để bắt đầu lớp mới không?') => {
            if (confirm(confirmMsg)) {
                try {
                    localStorage.removeItem(storageKey);
                    notify('✅ Đã xóa dữ liệu phiên học thành công!', 'ok');
                    if (typeof onClear === 'function') {
                        onClear();
                    } else {
                        setTimeout(() => {
                            if (typeof window.allowPageReload === 'function') window.allowPageReload();
                            location.reload();
                        }, 500);
                    }
                } catch (err) {
                    console.warn('Lỗi khi xóa SessionState:', err);
                }
            }
        };

        return {
            key: storageKey,
            save,
            load,
            restore,
            clear
        };
    };

    /* =========================================================================
     * QUY CHUẨN VÒNG ĐỜI GỌI TÊN: BẮT BUỘC CHỌN HỌC SINH (AGENTS.md MỤC 4)
     * Dùng chung toàn repo cho mọi khối lớp (Khối 1 - Khối 5)
     * ========================================================================= */

    /**
     * Bắt buộc phải chọn học sinh trước khi thực hiện hành động.
     * @param {string|HTMLElement} target - contextId (ví dụ 'warmup-1' sẽ tìm #sel-warmup-1), ID phần tử, hoặc DOM select element
     * @param {string} actionDesc - Tên hành động để hiển thị thông báo (ví dụ 'mở đáp án', 'ghi nhận đánh giá', 'bắt đầu quest')
     * @returns {boolean} true nếu hợp lệ, false nếu chưa chọn
     */
    window.requireStudent = function (target, actionDesc = 'tiếp tục') {
        let el = null;
        if (typeof target === 'string') {
            el = document.getElementById(`sel-${target}`) || document.getElementById(target);
        } else if (target && target.nodeType) {
            el = target;
        }

        const studentVal = el ? (el.value || '').trim() : '';
        if (!studentVal) {
            if (el) {
                el.classList.add('select-highlight-error');
                el.focus();
                setTimeout(() => el.classList.remove('select-highlight-error'), 1800);
            }
            const msg = `⚠️ Vui lòng chọn hoặc bấm 🎲 gọi tên học sinh trước khi ${actionDesc}!`;
            if (typeof window.showToast === 'function') {
                window.showToast(msg, 'warning');
            } else if (typeof window.toast === 'function') {
                window.toast(msg, 3200, '#ef4444');
            } else {
                alert(msg);
            }
            if (window.AudioSys && typeof window.AudioSys.playFail === 'function') {
                window.AudioSys.playFail();
            }
            return false;
        }
        return true;
    };

    /**
     * Mở / ẩn đáp án (.rev) có kiểm tra bắt buộc đã gọi học sinh trước.
     * @param {HTMLElement} revEl - Thẻ đáp án (.rev)
     * @param {string|HTMLElement} contextOrSelect - contextId hoặc ô select học sinh
     */
    window.toggleRev = function (revEl, contextOrSelect) {
        if (!revEl) return;
        if (contextOrSelect) {
            if (!window.requireStudent(contextOrSelect, 'mở đáp án')) {
                return;
            }
        }
        revEl.classList.toggle('show');
        if (revEl.classList.contains('show') && window.AudioSys && typeof window.AudioSys.playTick === 'function') {
            window.AudioSys.playTick();
        }
    };

    /**
     * Kiểm tra 100% đánh giá chéo giữa các tổ (Peer Assessment Pre-Check).
     * @param {Array} otherTeams - Danh sách các tổ còn lại cần đánh giá.
     * @param {Object} votesMap - Bản đồ lưu lượt biểu quyết { [teamId]: 'PASS' | 'BUG', ... }
     * @param {Function} getRowElFn - Hàm trả về DOM element hàng của tổ (ví dụ: (id) => document.getElementById(`bet-row-...`))
     * @returns {boolean} true nếu 100% các tổ đã biểu quyết, false nếu còn thiếu.
     */
    window.checkPeerAssessmentComplete = function (otherTeams, votesMap = {}, getRowElFn = null) {
        if (!otherTeams || otherTeams.length === 0) return true;
        const unvoted = otherTeams.filter(t => !votesMap[t.id]);
        if (unvoted.length > 0) {
            const unvotedNames = unvoted.map(t => t.name).join(', ');
            if (typeof getRowElFn === 'function') {
                unvoted.forEach(t => {
                    const row = getRowElFn(t.id);
                    if (row) {
                        row.classList.add('peer-check-error', 'bet-row-unvoted-error');
                        setTimeout(() => row.classList.remove('peer-check-error', 'bet-row-unvoted-error'), 2200);
                    }
                });
            }
            const msg = `⚠️ Còn [${unvotedNames}] chưa đánh giá chéo! Vui lòng chọn kết quả cho tất cả các tổ trước khi chấm.`;
            if (typeof window.showToast === 'function') {
                window.showToast(msg, 'warning');
            } else if (typeof window.toast === 'function') {
                window.toast(msg, 3500, '#ef4444');
            } else {
                alert(msg);
            }
            if (window.AudioSys && typeof window.AudioSys.playFail === 'function') {
                window.AudioSys.playFail();
            }
            return false;
        }
        return true;
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
        let c = String(classId || '').trim();
        c = c.replace(/^(?:l[oớ]p)[_\s-]*/i, '');
        c = c.replace(/\//g, '-').replace(/_/g, '-');
        c = c.replace(/[^a-zA-Z0-9\-]/g, '');

        // Tự động nhận diện khối thực tế từ ký tự đầu của mã lớp nếu có (hỗ trợ đảo bài/dạy chéo khối)
        let inferredGrade = null;
        const gradeMatch = c.match(/^[1-5]/);
        if (gradeMatch) inferredGrade = gradeMatch[0];

        const g = inferredGrade || (String(grade).replace(/\D/g, '') || '1');
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

        let mainPrefix = prefix;
        if (!mainPrefix || /^KetQua_TinHoc\d*$/i.test(mainPrefix)) {
            mainPrefix = `KetQua_TinHoc${g}`;
        }
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

    function normalizeExportFileName(fileName) {
        let name = String(fileName || 'Bao_Cao.csv').trim();
        if (name.toLowerCase().endsWith('.xlsx') || name.toLowerCase().endsWith('.xls')) {
            name = name.replace(/\.xlsx?$/i, '.csv');
        } else if (!name.toLowerCase().endsWith('.csv')) {
            name += '.csv';
        }

        // Tự động nhận diện và đồng bộ số Khối trong tiền tố KetQua_TinHocX theo mã lớp thực tế
        // Ví dụ: KetQua_TinHoc5_Lop_4-2_... -> KetQua_TinHoc4_Lop_4-2_...
        const match = name.match(/KetQua_TinHoc\d*(_Lop_([1-5])[-_].*)/i);
        if (match) {
            const actualGrade = match[2];
            const restOfName = match[1];
            name = `KetQua_TinHoc${actualGrade}${restOfName}`;
        }
        return name;
    }

    function downloadCsv(csvContent, fileName) {
        const name = normalizeExportFileName(fileName);
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
        const name = normalizeExportFileName(fileName);
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

    /* =========================================================================
     * QUY CHUẨN BỘ CHỌN LỚP ĐA KHỐI (KHỐI 1 - KHỐI 5) & DỮ LIỆU HỌC SINH TOÀN REPO
     * ========================================================================= */
    const ALL_SCHOOL_CLASSES = [
        {
            grade: 1,
            name: 'Khối 1',
            classes: [
                { id: '1_6', name: 'Lớp 1/6' }
            ]
        },
        {
            grade: 2,
            name: 'Khối 2',
            classes: [
                { id: '2_2', name: 'Lớp 2/2' },
                { id: '2_4', name: 'Lớp 2/4' },
                { id: '2_5', name: 'Lớp 2/5' }
            ]
        },
        {
            grade: 3,
            name: 'Khối 3',
            classes: [
                { id: '3_2', name: 'Lớp 3/2' },
                { id: '3_3', name: 'Lớp 3/3' },
                { id: '3_4', name: 'Lớp 3/4' },
                { id: '3_5', name: 'Lớp 3/5' },
                { id: '3_6', name: 'Lớp 3/6' }
            ]
        },
        {
            grade: 4,
            name: 'Khối 4',
            classes: [
                { id: '4_1', name: 'Lớp 4/1' },
                { id: '4_2', name: 'Lớp 4/2' },
                { id: '4_3', name: 'Lớp 4/3' },
                { id: '4_4', name: 'Lớp 4/4' },
                { id: '4_5', name: 'Lớp 4/5' },
                { id: '4_6', name: 'Lớp 4/6' }
            ]
        },
        {
            grade: 5,
            name: 'Khối 5',
            classes: [
                { id: '5_1', name: 'Lớp 5/1' },
                { id: '5_2', name: 'Lớp 5/2' },
                { id: '5_3', name: 'Lớp 5/3' },
                { id: '5_4', name: 'Lớp 5/4' },
                { id: '5_5', name: 'Lớp 5/5' },
                { id: '5_6', name: 'Lớp 5/6' }
            ]
        }
    ];

    window.ALL_SCHOOL_CLASSES = ALL_SCHOOL_CLASSES;

    // Sinh danh sách <optgroup> và <option> cho thẻ <select>
    window.renderAllClassOptions = function (selectedClassKey = '') {
        const norm = s => String(s || '').replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const selNorm = norm(selectedClassKey);
        return ALL_SCHOOL_CLASSES.map(group => {
            const options = group.classes.map(cls => {
                const isSelected = norm(cls.id) === selNorm;
                return `<option value="${cls.id}" ${isSelected ? 'selected' : ''}>${cls.name}</option>`;
            }).join('\n        ');
            return `<optgroup label="${group.name}">\n        ${options}\n      </optgroup>`;
        }).join('\n      ');
    };

    // Bộ nhớ đệm danh sách học sinh toàn trường
    let _allStudentsDataCache = null;
    let _studentsScriptPromise = null;

    window.clearStudentCache = function () {
        _allStudentsDataCache = null;
    };

    // Nạp file JS hợp nhất students_all_2026_2027.js qua <script> (hoạt động 100% cả khi mở file:///)
    window.ensureSchoolStudentsLoaded = function () {
        if (window.SCHOOL_STUDENTS_2026_2027 && typeof window.SCHOOL_STUDENTS_2026_2027 === 'object') {
            return Promise.resolve(window.SCHOOL_STUDENTS_2026_2027);
        }
        if (_studentsScriptPromise) return _studentsScriptPromise;
        if (typeof document === 'undefined') return Promise.resolve({});

        _studentsScriptPromise = new Promise(resolve => {
            const s = document.createElement('script');
            s.src = _studentsAllUrl;
            s.onload = () => resolve(window.SCHOOL_STUDENTS_2026_2027 || {});
            s.onerror = () => resolve({});
            (document.head || document.documentElement).appendChild(s);
        });
        return _studentsScriptPromise;
    };

    // Lấy nhanh danh sách tên học sinh của một lớp từ nguồn tập trung (đồng bộ cho cả fallback offline)
    window.getClassStudents = function (classKey, defaultKey = '1_6') {
        const norm = s => String(s || '').replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const src = (_allStudentsDataCache && Object.keys(_allStudentsDataCache).length)
            ? _allStudentsDataCache
            : (window.SCHOOL_STUDENTS_2026_2027 || {});
        const tryKeys = [classKey, norm(classKey), defaultKey, norm(defaultKey)].filter(Boolean);
        for (const k of tryKeys) {
            if (Array.isArray(src[k]) && src[k].length) return src[k].slice();
            const found = Object.keys(src).find(sk => norm(sk) === norm(k));
            if (found && Array.isArray(src[found]) && src[found].length) return src[found].slice();
        }
        return [];
    };

    // Chỉ kiểm tra/đánh số trùng họ tên khi giáo viên THÊM HỌC SINH THỦ CÔNG trên lớp
    window.formatUniqueStudentName = function (rawName, existingNames = []) {
        const trimmed = String(rawName || '').trim();
        if (!trimmed) return '';
        if (/\s*\([0-9A-Za-z]+\)$/.test(trimmed)) return trimmed;
        const used = new Set(
            (existingNames || [])
                .map(x => (typeof x === 'string' ? x : (x && (x.name || x.displayName || x.rawName) || '')).trim().toLowerCase())
                .filter(Boolean)
        );
        if (!used.has(trimmed.toLowerCase())) return trimmed;
        let idx = 2;
        while (used.has(`${trimmed} (${idx})`.toLowerCase())) idx++;
        return `${trimmed} (${idx})`;
    };

    // Nạp toàn bộ dữ liệu học sinh của cả 5 khối (tổng hợp 21 lớp)
    window.loadAllStudents = async function (basePath = '../../assets/data/') {
        if (_allStudentsDataCache && Object.keys(_allStudentsDataCache).length > 0) {
            return _allStudentsDataCache;
        }
        if (window.SCHOOL_STUDENTS_2026_2027 && Object.keys(window.SCHOOL_STUDENTS_2026_2027).length > 0) {
            _allStudentsDataCache = window.SCHOOL_STUDENTS_2026_2027;
            return _allStudentsDataCache;
        }

        // Nạp song song cả 5 file JSON khi chạy qua HTTP/HTTPS
        const merged = {};
        if (typeof location !== 'undefined' && location.protocol.startsWith('http') && _origFetch) {
            const grades = [1, 2, 3, 4, 5];
            await Promise.all(grades.map(async (g) => {
                const gradePaths = [
                    `${basePath}students_${g}_2026_2027.json`,
                    `../../assets/data/students_${g}_2026_2027.json`,
                    `../assets/data/students_${g}_2026_2027.json`,
                    `assets/data/students_${g}_2026_2027.json`
                ];
                for (const gp of gradePaths) {
                    try {
                        const r = await _origFetch(gp);
                        if (r.ok) {
                            const json = await r.json();
                            if (json && typeof json === 'object') {
                                Object.assign(merged, json);
                                break;
                            }
                        }
                    } catch (_) {}
                }
            }));
        }

        if (Object.keys(merged).length > 0) {
            _allStudentsDataCache = merged;
            return _allStudentsDataCache;
        }

        const jsFallback = await window.ensureSchoolStudentsLoaded();
        if (jsFallback && Object.keys(jsFallback).length > 0) {
            _allStudentsDataCache = jsFallback;
            return _allStudentsDataCache;
        }
        return {};
    };

    // Nạp danh sách học sinh theo mã lớp (tên trùng đã đánh số sẵn (1), (2) trong dữ liệu JSON)
    window.loadLessonStudents = async function (classKey, basePath = '../../assets/data/') {
        const rawKey = String(classKey || '1_6').trim();
        const norm = s => String(s || '').replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const normKey = norm(rawKey);

        const gradeMatch = normKey.match(/^[1-5]/);
        const grade = gradeMatch ? gradeMatch[0] : '1';

        const allData = await window.loadAllStudents(basePath);
        let rawList = allData[rawKey] || allData[normKey] || [];
        if (!rawList || !rawList.length) {
            const foundKey = Object.keys(allData).find(k => norm(k) === normKey);
            if (foundKey) rawList = allData[foundKey] || [];
        }

        return rawList.map((item, idx) => {
            const raw = typeof item === 'string' ? item : (item.name || item.hoTen || item.fullName || `Học sinh ${idx + 1}`);
            const trimmed = raw.trim();
            return {
                id: idx + 1,
                name: trimmed,
                rawName: trimmed,
                displayName: trimmed,
                code: `HS${grade}_${String(idx + 1).padStart(2, '0')}`
            };
        });
    };

    // =========================================================================
    // TRANSPARENT FETCH INTERCEPTOR FOR STUDENT DATA
    // Khi bất kỳ trang nào gọi fetch() file students_*.json, tự động bổ sung
    // dữ liệu của cả 5 khối (hoặc fallback từ students_all_2026_2027.js khi mở file://).
    // =========================================================================
    const _origFetch = (typeof window !== 'undefined' && window.fetch) ? window.fetch.bind(window) : null;
    if (_origFetch) {
        window.fetch = async function (input, init) {
            const url = (typeof input === 'string') ? input : (input && input.url ? input.url : '');
            const isStudentJson = /students_.*\.json/i.test(url);

            if (!isStudentJson) {
                return _origFetch(input, init);
            }

            try {
                const response = await _origFetch(input, init);
                if (response && response.ok) {
                    const origJson = response.json.bind(response);
                    response.json = async function () {
                        const data = await origJson();
                        try {
                            const allData = await window.loadAllStudents();
                            if (allData && typeof allData === 'object' && Object.keys(allData).length > 0) {
                                return Object.assign({}, allData, data);
                            }
                        } catch (_) {}
                        return data;
                    };
                    return response;
                }
            } catch (_) {}

            const fallbackAll = await window.loadAllStudents();
            if (fallbackAll && Object.keys(fallbackAll).length > 0) {
                return new Response(JSON.stringify(fallbackAll), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
            return _origFetch(input, init);
        };
    }

    // =========================================================================
    // AUTO-ENHANCE CLASS SELECTORS TRÊN MỌI TRANG
    // Tự động tìm kiếm các thẻ <select> chọn lớp và nâng cấp thành menu đa khối
    // có <optgroup> phân nhóm Khối 1 - Khối 5.
    // =========================================================================
    window.enhanceClassSelects = function () {
        const selectors = [
            '#class-select',
            '#classSelect',
            '#settings-class-select',
            '#selectClass',
            '#setupClassSelect',
            '#drawerClassSelect',
            '#classSel',
            '#s-class',
            '#classSelectTiet5',
            '#cls',
            '#selCls',
            '.k1-class-select'
        ];

        selectors.forEach(sel => {
            const elements = document.querySelectorAll(sel);
            elements.forEach(el => {
                if (!el || el.dataset.allClassesEnhanced === 'true') return;
                // Nếu chưa có optgroup thì mới nâng cấp
                if (el.tagName === 'SELECT' && !el.querySelector('optgroup')) {
                    const currentVal = el.value || el.getAttribute('default-class') || '';
                    el.innerHTML = window.renderAllClassOptions(currentVal);
                    if (currentVal) el.value = currentVal;
                    el.dataset.allClassesEnhanced = 'true';
                }
            });
        });
    };

    if (typeof document !== 'undefined') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', window.enhanceClassSelects);
        } else {
            setTimeout(window.enhanceClassSelects, 10);
        }
    }
})();
