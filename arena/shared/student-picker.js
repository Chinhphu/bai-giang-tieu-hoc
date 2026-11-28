/**
 * =========================================================================
 * ARENA STUDENT PICKER COMPONENT (BỘ CHỌN HỌC SINH ĐẤU TRƯỜNG)
 * =========================================================================
 * - Chọn phân cấp: Khối (1-5) -> Lớp (VD: 2/2) -> Họ và Tên.
 * - Đọc dữ liệu từ ../../assets/data/students_all_${SCHOOL_YEAR}.js (nạp qua <script>).
 * - Giữ nguyên 100% các hậu tố trùng tên (1), (2).
 * - Tự động đọc tham số URL ?khoi=X để chọn sẵn khối.
 * - Lưu thông tin vào sessionStorage để chơi liên tục nhiều minigame mà không cần chọn lại.
 * =========================================================================
 */

(function () {
    if (typeof window === 'undefined') return;

    const STORAGE_KEY = 'arena_current_student';
    let currentStudent = null;
    let cachedGradeData = {}; // Cache dữ liệu học sinh đã fetch theo khối { [khoi]: jsonData }
    let listeners = [];
    let currentCallback = null;

    // Trạng thái modal đang chọn
    let modalState = {
        khoi: 2,
        lop: null,
        ten: null,
        searchQuery: '',
        classes: [],
        studentsInClass: []
    };

    let schoolStudentsPromise = null;

    /**
     * Xác định đường dẫn tương đối tới assets/data/students_all_${year}.js phù hợp với vị trí của trang
     */
    function getDataPath() {
        const year = (window.ARENA_CONFIG && window.ARENA_CONFIG.SCHOOL_YEAR) ? window.ARENA_CONFIG.SCHOOL_YEAR : '2026_2027';
        const fileName = `students_all_${year}.js`;

        if (window.ARENA_DATA_PATH) {
            return `${window.ARENA_DATA_PATH}${fileName}`;
        }

        // Tự động suy luận độ sâu thư mục từ thẻ script nạp student-picker.js
        const scriptTag = document.querySelector('script[src*="student-picker.js"]');
        if (scriptTag) {
            const src = scriptTag.getAttribute('src') || '';
            if (src.includes('../shared/') || src.includes('../../')) {
                return `../../assets/data/${fileName}`;
            }
            if (src.includes('./shared/') || src.includes('shared/')) {
                return `../assets/data/${fileName}`;
            }
        }

        // Fallback theo URL pathname
        const pathParts = window.location.pathname.replace(/\\/g, '/').split('/').filter(Boolean);
        const arenaIdx = pathParts.lastIndexOf('arena');
        if (arenaIdx !== -1) {
            const depth = pathParts.length - 1 - arenaIdx;
            return depth >= 2 ? `../../assets/data/${fileName}` : `../assets/data/${fileName}`;
        }

        return `../../assets/data/${fileName}`;
    }

    /**
     * Chuẩn hóa tên học sinh (hỗ trợ cả string cũ và object { hoTen, ten, ngaySinh, gioiTinh })
     */
    function getStudentDisplayName(item) {
        if (typeof item === 'string') return item.trim();
        if (item && typeof item === 'object') {
            return String(item.hoTen || item.name || item.fullName || '').trim();
        }
        return '';
    }

    /**
     * Nạp dữ liệu học sinh toàn trường từ students_all_${SCHOOL_YEAR}.js
     */
    function ensureAllStudentsLoaded() {
        const year = (window.ARENA_CONFIG && window.ARENA_CONFIG.SCHOOL_YEAR) ? window.ARENA_CONFIG.SCHOOL_YEAR : '2026_2027';
        const globalKey = `SCHOOL_STUDENTS_${year}`;
        if (window[globalKey] && typeof window[globalKey] === 'object') {
            return Promise.resolve(window[globalKey]);
        }
        if (schoolStudentsPromise) return schoolStudentsPromise;

        const dataUrl = getDataPath();
        schoolStudentsPromise = new Promise(resolve => {
            const s = document.createElement('script');
            s.src = dataUrl;
            s.onload = () => resolve(window[globalKey] || {});
            s.onerror = () => {
                console.warn(`[StudentPicker] Không tải được ${dataUrl}`);
                resolve({});
            };
            (document.head || document.documentElement).appendChild(s);
        });
        return schoolStudentsPromise;
    }

    /**
     * Chuẩn hóa hiển thị tên lớp (ví dụ: "2_2" -> "2/2")
     */
    function formatClassDisplay(classKey) {
        if (!classKey) return '';
        return String(classKey).replace('_', '/');
    }

    /**
     * Lấy khối mặc định từ URL (?khoi=X) hoặc từ student đang lưu
     */
    function getInitialKhoi() {
        try {
            const params = new URLSearchParams(window.location.search);
            const kParam = parseInt(params.get('khoi'), 10);
            if (kParam >= 1 && kParam <= 5) return kParam;
        } catch (e) { }

        if (currentStudent && currentStudent.khoi) {
            return Number(currentStudent.khoi);
        }
        return 2; // Mặc định Khối 2
    }

    /**
     * Nạp dữ liệu học sinh của một khối từ nguồn tập trung
     */
    async function loadGradeData(khoi) {
        if (cachedGradeData[khoi]) {
            return cachedGradeData[khoi];
        }

        const allData = await ensureAllStudentsLoaded();
        const prefix = `${khoi}_`;
        const gradeKeys = Object.keys(allData || {})
            .filter(k => k.startsWith(prefix))
            .sort((a, b) => {
                const na = parseInt(a.split('_')[1], 10) || 0;
                const nb = parseInt(b.split('_')[1], 10) || 0;
                return na - nb;
            });

        if (gradeKeys.length > 0) {
            const gradeData = {};
            gradeKeys.forEach(k => {
                gradeData[k] = (Array.isArray(allData[k]) ? allData[k] : [])
                    .map(getStudentDisplayName)
                    .filter(Boolean);
            });
            cachedGradeData[khoi] = gradeData;
            return gradeData;
        }

        return {
            [`${khoi}_1`]: ['Học sinh Mẫu 1', 'Học sinh Mẫu 2']
        };
    }

    /**
     * Nạp học sinh từ sessionStorage
     */
    function loadSavedStudent() {
        try {
            const raw = sessionStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed && parsed.ten && parsed.lop) {
                    currentStudent = parsed;
                    return currentStudent;
                }
            }
        } catch (e) { }
        return null;
    }

    /**
     * Lưu học sinh vào sessionStorage
     */
    function saveStudent(student) {
        currentStudent = student;
        try {
            if (student) {
                sessionStorage.setItem(STORAGE_KEY, JSON.stringify(student));
            } else {
                sessionStorage.removeItem(STORAGE_KEY);
            }
        } catch (e) { }

        // Cập nhật giao diện thanh học sinh trên màn hình
        updateAllStudentBars();

        // Kích hoạt listeners
        listeners.forEach(fn => {
            try { fn(currentStudent); } catch (e) { console.error(e); }
        });
    }

    /**
     * Render hoặc cập nhật thanh học sinh (Student Bar)
     */
    function updateAllStudentBars() {
        const bars = document.querySelectorAll('.arena-student-bar-target, #arena-student-bar');
        bars.forEach(el => renderBarElement(el));
    }

    function renderBarElement(container) {
        if (!container) return;
        const student = currentStudent;

        if (student) {
            container.innerHTML = `
                <div class="arena-student-bar">
                    <div class="student-info">
                        <div class="student-avatar">👤</div>
                        <span>${escapeHtml(student.ten)}</span>
                        <span class="class-pill">Lớp ${escapeHtml(student.lop)}</span>
                    </div>
                    <button type="button" class="btn-change-student" title="Đổi học sinh khác">
                        🔄 Đổi
                    </button>
                </div>
            `;
            const changeBtn = container.querySelector('.btn-change-student');
            if (changeBtn) {
                changeBtn.addEventListener('click', () => StudentPicker.open());
            }
        } else {
            container.innerHTML = `
                <div class="arena-student-bar">
                    <div class="student-info">
                        <div class="student-avatar" style="background: #94a3b8;">❓</div>
                        <span style="color: #cbd5e1;">Chưa chọn học sinh</span>
                    </div>
                    <button type="button" class="btn-change-student" style="background: #f59e0b; color: #78350f;">
                        👉 Chọn tên
                    </button>
                </div>
            `;
            const pickBtn = container.querySelector('.btn-change-student');
            if (pickBtn) {
                pickBtn.addEventListener('click', () => StudentPicker.open());
            }
        }
    }

    /**
     * Tạo DOM Modal nếu chưa có
     */
    function ensureModalDom() {
        let overlay = document.getElementById('arena-student-picker-modal');
        if (overlay) return overlay;

        overlay = document.createElement('div');
        overlay.id = 'arena-student-picker-modal';
        overlay.className = 'arena-modal-overlay';
        overlay.style.display = 'none';

        overlay.innerHTML = `
            <div class="arena-modal-card" role="dialog" aria-modal="true">
                <div class="arena-modal-header">
                    <h3 class="arena-modal-title">
                        <span>🎓</span> Chọn Thông Tin Học Sinh
                    </h3>
                    <button type="button" class="arena-modal-close" id="arena-picker-close-btn" title="Đóng">✖</button>
                </div>
                <div class="arena-modal-body">
                    <!-- BƯỚC 1: CHỌN KHỐI -->
                    <div class="picker-section-title">
                        <span>1️⃣</span> Chọn Khối:
                    </div>
                    <div class="picker-chips-grid" id="arena-grade-chips">
                        <button type="button" class="picker-chip-btn" data-grade="1">Khối 1</button>
                        <button type="button" class="picker-chip-btn" data-grade="2">Khối 2</button>
                        <button type="button" class="picker-chip-btn" data-grade="3">Khối 3</button>
                        <button type="button" class="picker-chip-btn" data-grade="4">Khối 4</button>
                        <button type="button" class="picker-chip-btn" data-grade="5">Khối 5</button>
                    </div>

                    <!-- BƯỚC 2: CHỌN LỚP -->
                    <div class="picker-section-title">
                        <span>2️⃣</span> Chọn Lớp:
                    </div>
                    <div class="picker-chips-grid" id="arena-class-chips">
                        <span style="color: #64748b; font-size: 0.9rem;">Đang tải danh sách lớp...</span>
                    </div>

                    <!-- BƯỚC 3: TÌM & CHỌN TÊN HỌC SINH -->
                    <div class="picker-section-title">
                        <span>3️⃣</span> Chọn Họ và Tên:
                    </div>
                    <div class="arena-search-box">
                        <span class="arena-search-icon">🔍</span>
                        <input type="text" id="arena-student-search" class="arena-search-input" placeholder="Nhập tên để tìm kiếm nhanh..." autocomplete="off">
                    </div>

                    <div class="student-list-container" id="arena-student-list">
                        <div style="text-align: center; color: #64748b; padding: 20px; grid-column: 1 / -1;">
                            Vui lòng chọn Lớp để hiển thị danh sách học sinh.
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Bắt sự kiện đóng
        overlay.querySelector('#arena-picker-close-btn').addEventListener('click', () => StudentPicker.close());
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) StudentPicker.close();
        });

        // Bắt sự kiện chọn Khối
        const gradeChips = overlay.querySelectorAll('#arena-grade-chips .picker-chip-btn');
        gradeChips.forEach(btn => {
            btn.addEventListener('click', () => {
                const g = parseInt(btn.dataset.grade, 10);
                selectGrade(g);
            });
        });

        // Bắt sự kiện tìm kiếm
        const searchInput = overlay.querySelector('#arena-student-search');
        searchInput.addEventListener('input', (e) => {
            modalState.searchQuery = e.target.value.trim().toLowerCase();
            renderStudentList();
        });

        return overlay;
    }

    /**
     * Chuyển khối trong Modal
     */
    async function selectGrade(khoi) {
        modalState.khoi = khoi;
        modalState.lop = null;
        modalState.ten = null;
        modalState.searchQuery = '';

        const overlay = ensureModalDom();
        const searchInput = overlay.querySelector('#arena-student-search');
        if (searchInput) searchInput.value = '';

        // Đổi active button khối
        const gradeChips = overlay.querySelectorAll('#arena-grade-chips .picker-chip-btn');
        gradeChips.forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.dataset.grade, 10) === khoi);
        });

        // Tải dữ liệu lớp
        const classChipsContainer = overlay.querySelector('#arena-class-chips');
        classChipsContainer.innerHTML = '<span style="color: #64748b; font-size: 0.9rem;">⏳ Đang tải lớp...</span>';

        const gradeData = await loadGradeData(khoi);
        const classKeys = Object.keys(gradeData);
        modalState.classes = classKeys;

        if (classKeys.length === 0) {
            classChipsContainer.innerHTML = '<span style="color: #ef4444; font-size: 0.9rem;">Không có dữ liệu lớp</span>';
            return;
        }

        // Vẽ các nút lớp
        classChipsContainer.innerHTML = classKeys.map(k => {
            const display = formatClassDisplay(k);
            return `<button type="button" class="picker-chip-btn" data-class="${k}">${display}</button>`;
        }).join('');

        const classBtns = classChipsContainer.querySelectorAll('.picker-chip-btn');
        classBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const cls = btn.dataset.class;
                selectClass(cls, gradeData[cls] || []);
            });
        });

        // Tự động chọn lớp đầu tiên hoặc lớp đang lưu nếu khớp khối
        let defaultClass = classKeys[0];
        if (currentStudent && currentStudent.khoi === khoi) {
            const matchKey = classKeys.find(k => formatClassDisplay(k) === currentStudent.lop || k === currentStudent.lop);
            if (matchKey) defaultClass = matchKey;
        }

        if (defaultClass) {
            selectClass(defaultClass, gradeData[defaultClass] || []);
        }
    }

    /**
     * Chọn lớp trong Modal
     */
    function selectClass(classKey, studentList) {
        modalState.lop = formatClassDisplay(classKey);
        modalState.studentsInClass = studentList;

        const overlay = ensureModalDom();
        const classBtns = overlay.querySelectorAll('#arena-class-chips .picker-chip-btn');
        classBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.class === classKey);
        });

        renderStudentList();
    }

    /**
     * Render danh sách học sinh trong lớp (có lọc theo ô tìm kiếm)
     */
    function renderStudentList() {
        const overlay = ensureModalDom();
        const container = overlay.querySelector('#arena-student-list');
        const list = modalState.studentsInClass || [];
        const query = modalState.searchQuery;

        if (!list.length) {
            container.innerHTML = `
                <div style="text-align: center; color: #64748b; padding: 20px; grid-column: 1 / -1;">
                    Không có học sinh trong lớp này.
                </div>
            `;
            return;
        }

        // Lọc danh sách (giữ nguyên hậu tố trùng tên như (1), (2))
        const filtered = query
            ? list.filter(name => name.toLowerCase().includes(query))
            : list;

        if (!filtered.length) {
            container.innerHTML = `
                <div style="text-align: center; color: #ef4444; padding: 20px; grid-column: 1 / -1;">
                    Không tìm thấy học sinh nào khớp với từ khóa "<strong>${escapeHtml(query)}</strong>".
                </div>
            `;
            return;
        }

        container.innerHTML = filtered.map(name => {
            const isSelected = currentStudent &&
                currentStudent.khoi === modalState.khoi &&
                currentStudent.lop === modalState.lop &&
                currentStudent.ten === name;

            return `
                <button type="button" class="student-card-btn ${isSelected ? 'active' : ''}" data-name="${escapeHtml(name)}">
                    <span>${escapeHtml(name)}</span>
                    <span>${isSelected ? '✓' : '👉'}</span>
                </button>
            `;
        }).join('');

        const studentBtns = container.querySelectorAll('.student-card-btn');
        studentBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const studentName = btn.dataset.name;
                confirmSelection(studentName);
            });
        });
    }

    /**
     * Xác nhận chọn học sinh
     */
    function confirmSelection(studentName) {
        const student = {
            khoi: modalState.khoi,
            lop: modalState.lop,
            ten: studentName
        };

        saveStudent(student);
        StudentPicker.close();

        if (typeof currentCallback === 'function') {
            const cb = currentCallback;
            currentCallback = null;
            cb(student);
        }

        if (window.showToast) {
            window.showToast(`✅ Đã chọn học sinh: ${student.ten} (${student.lop})`, 'success');
        }
    }

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // PUBLIC API
    const StudentPicker = {
        /**
         * Khởi tạo bộ chọn
         */
        init() {
            loadSavedStudent();
            updateAllStudentBars();
        },

        /**
         * Lấy thông tin học sinh hiện tại
         * @returns {{ khoi: number, lop: string, ten: string } | null}
         */
        getStudent() {
            if (!currentStudent) {
                loadSavedStudent();
            }
            return currentStudent;
        },

        /**
         * Gán học sinh chủ động
         */
        setStudent(student) {
            saveStudent(student);
        },

        /**
         * Xóa học sinh hiện tại
         */
        clearStudent() {
            saveStudent(null);
        },

        /**
         * Mở Modal chọn học sinh
         * @param {Function} [onSelectCallback] - Gọi khi học sinh hoàn tất chọn
         */
        open(onSelectCallback = null) {
            currentCallback = onSelectCallback;
            const overlay = ensureModalDom();
            overlay.style.display = 'flex';

            const initialKhoi = getInitialKhoi();
            selectGrade(initialKhoi);
        },

        /**
         * Đóng Modal
         */
        close() {
            const overlay = document.getElementById('arena-student-picker-modal');
            if (overlay) {
                overlay.style.display = 'none';
            }
        },

        /**
         * Đảm bảo đã có học sinh trước khi chơi game.
         * Nếu đã có -> gọi callback ngay.
         * Nếu chưa có -> mở modal, khi chọn xong mới gọi callback.
         */
        ensureStudent(callback) {
            const student = this.getStudent();
            if (student && student.ten && student.lop) {
                if (typeof callback === 'function') callback(student);
            } else {
                this.open(callback);
            }
        },

        /**
         * Vẽ thanh thông tin học sinh vào một container cụ thể
         */
        renderBar(containerIdOrElement) {
            const el = typeof containerIdOrElement === 'string'
                ? document.getElementById(containerIdOrElement)
                : containerIdOrElement;
            if (el) renderBarElement(el);
        },

        /**
         * Đăng ký hàm lắng nghe sự thay đổi học sinh
         */
        onStudentChange(listener) {
            if (typeof listener === 'function') {
                listeners.push(listener);
            }
        }
    };

    window.StudentPicker = StudentPicker;

    // Tự động khởi chạy khi DOM sẵn sàng
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => StudentPicker.init());
    } else {
        StudentPicker.init();
    }
})();
