/**
 * =========================================================================
 * ARENA RANK BOARD COMPONENT (BẢNG VINH DANH XẾP HẠNG TIỂU HỌC)
 * =========================================================================
 * - Sử dụng font Baloo 2 và Be Vietnam Pro trực quan, bắt mắt.
 * - Hỗ trợ 3 tab lọc: Top Toàn Trường / Top Khối / Top Lớp.
 * - Bục vinh danh Top 3 Quán quân, Á quân, Hạng ba (🥇 🥈 🥉).
 * - Tự động highlight dòng điểm của học sinh đang đăng nhập.
 * - Hỗ trợ render nhúng (inline) vào container hoặc mở Modal Pop-up toàn màn hình.
 * =========================================================================
 */

(function () {
    if (typeof window === 'undefined') return;

    /**
     * Escape HTML để tránh lỗi bảo mật XSS
     */
    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    class RankBoardInstance {
        constructor(container, options = {}) {
            this.container = typeof container === 'string' ? document.getElementById(container) : container;
            this.gameId = options.gameId || 'speed_click';
            this.scope = options.scope || 'all'; // 'all' | 'khoi' | 'lop'
            this.filterValue = options.filterValue || null;
            this.title = options.title || 'BẢNG VÀNG DANH DỰ';
            this.data = { list: [], totalCount: 0, myRank: null, myRecord: null };
            this.isLoading = false;

            this.init();
        }

        async init() {
            this.renderSkeleton();
            await this.refresh();
        }

        /**
         * Lấy tên khối/lớp mặc định từ học sinh đang đăng nhập
         */
        getDefaultFilter() {
            const student = window.StudentPicker ? window.StudentPicker.getStudent() : null;
            if (this.scope === 'khoi') {
                return (student && student.khoi) ? student.khoi : 2;
            }
            if (this.scope === 'lop') {
                return (student && student.lop) ? student.lop : '2/2';
            }
            return null;
        }

        /**
         * Nạp lại dữ liệu từ RankAPI
         */
        async refresh() {
            if (this.isLoading) return;
            this.isLoading = true;

            const refreshBtn = this.container.querySelector('.btn-refresh-rank');
            if (refreshBtn) refreshBtn.classList.add('spinning');

            if (!this.filterValue && this.scope !== 'all') {
                this.filterValue = this.getDefaultFilter();
            }

            try {
                if (window.RankAPI) {
                    this.data = await window.RankAPI.fetchLeaderboard({
                        gameId: this.gameId,
                        scope: this.scope,
                        filterValue: this.filterValue
                    });
                }
            } catch (e) {
                console.error('[RankBoard] Lỗi tải leaderboard:', e);
            } finally {
                this.isLoading = false;
                if (refreshBtn) refreshBtn.classList.remove('spinning');
                this.renderContent();
            }
        }

        /**
         * Đổi tab bộ lọc
         */
        setScope(newScope, newFilterValue = null) {
            this.scope = newScope;
            this.filterValue = newFilterValue || this.getDefaultFilter();
            this.refresh();
        }

        /**
         * Khung sườn HTML ban đầu
         */
        renderSkeleton() {
            if (!this.container) return;
            this.container.innerHTML = `
                <div class="rankboard-container">
                    <div class="rankboard-header">
                        <h2 class="rankboard-title">
                            <span>🏆</span> ${escapeHtml(this.title)}
                        </h2>
                        <div class="rankboard-tabs">
                            <button type="button" class="rankboard-tab-btn ${this.scope === 'all' ? 'active' : ''}" data-scope="all">
                                🌐 Toàn Trường
                            </button>
                            <button type="button" class="rankboard-tab-btn ${this.scope === 'khoi' ? 'active' : ''}" data-scope="khoi">
                                🏫 Theo Khối
                            </button>
                            <button type="button" class="rankboard-tab-btn ${this.scope === 'lop' ? 'active' : ''}" data-scope="lop">
                                🎒 Theo Lớp
                            </button>
                        </div>
                    </div>
                    <div class="rankboard-filters" id="rankboard-subfilters">
                        <!-- Sẽ điền bộ chọn Khối / Lớp linh hoạt -->
                    </div>
                    <div class="rankboard-content-area" id="rankboard-content">
                        <div style="padding: 40px; text-align: center; color: #64748b; font-weight: 700;">
                            ⏳ Đang tải dữ liệu Bảng Vàng...
                        </div>
                    </div>
                </div>
            `;

            // Bắt sự kiện chuyển tab
            const tabBtns = this.container.querySelectorAll('.rankboard-tab-btn');
            tabBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const sc = btn.dataset.scope;
                    tabBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.setScope(sc);
                });
            });
        }

        /**
         * Render toàn bộ nội dung sau khi có dữ liệu
         */
        renderContent() {
            if (!this.container) return;

            // 1. Render Sub-filters (Nếu chọn theo Khối hoặc theo Lớp)
            const filterContainer = this.container.querySelector('#rankboard-subfilters');
            if (filterContainer) {
                let filterHtml = '';
                const student = window.StudentPicker ? window.StudentPicker.getStudent() : null;

                if (this.scope === 'khoi') {
                    const currentK = parseInt(this.filterValue, 10) || 2;
                    filterHtml = `
                        <div class="rankboard-filter-group">
                            <span style="font-weight: 800; color: #475569;">Chọn khối:</span>
                            <select class="rankboard-select" id="rankboard-select-khoi">
                                <option value="1" ${currentK === 1 ? 'selected' : ''}>Khối 1</option>
                                <option value="2" ${currentK === 2 ? 'selected' : ''}>Khối 2</option>
                                <option value="3" ${currentK === 3 ? 'selected' : ''}>Khối 3</option>
                                <option value="4" ${currentK === 4 ? 'selected' : ''}>Khối 4</option>
                                <option value="5" ${currentK === 5 ? 'selected' : ''}>Khối 5</option>
                            </select>
                        </div>
                    `;
                } else if (this.scope === 'lop') {
                    const currentL = this.filterValue || (student ? student.lop : '2/2');
                    filterHtml = `
                        <div class="rankboard-filter-group">
                            <span style="font-weight: 800; color: #475569;">Lớp đang xem:</span>
                            <span class="class-pill" style="font-size: 0.95rem; padding: 4px 12px;">Lớp ${escapeHtml(currentL)}</span>
                        </div>
                    `;
                } else {
                    filterHtml = `
                        <div class="rankboard-filter-group">
                            <span style="font-weight: 800; color: #475569;">Phạm vi:</span>
                            <span style="color: #0369a1; font-weight: 800;">Toàn thể học sinh trường</span>
                        </div>
                    `;
                }

                filterHtml += `
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 0.85rem; color: #64748b; font-weight: 700;">
                            ${this.data.totalCount} bạn tham gia
                        </span>
                        <button type="button" class="btn-refresh-rank" style="background: none; border: 1px solid #cbd5e1; border-radius: 8px; padding: 4px 10px; cursor: pointer; font-weight: 700; color: #334155;" title="Làm mới bảng xếp hạng">
                            🔄 Làm mới
                        </button>
                    </div>
                `;

                filterContainer.innerHTML = filterHtml;

                const selectKhoi = filterContainer.querySelector('#rankboard-select-khoi');
                if (selectKhoi) {
                    selectKhoi.addEventListener('change', (e) => {
                        this.filterValue = parseInt(e.target.value, 10);
                        this.refresh();
                    });
                }

                const refreshBtn = filterContainer.querySelector('.btn-refresh-rank');
                if (refreshBtn) {
                    refreshBtn.addEventListener('click', () => this.refresh());
                }
            }

            // 2. Render Podium Top 3 và Danh sách từ hạng 4
            const contentArea = this.container.querySelector('#rankboard-content');
            if (!contentArea) return;

            const list = this.data.list || [];
            if (list.length === 0) {
                contentArea.innerHTML = `
                    <div style="padding: 50px 20px; text-align: center; color: #64748b;">
                        <div style="font-size: 3rem; margin-bottom: 10px;">🎮</div>
                        <h3 style="margin: 0; color: #1e293b;">Chưa có lượt chơi nào!</h3>
                        <p style="margin: 6px 0 0; font-size: 0.95rem;">Hãy là bạn đầu tiên ghi tên lên Bảng Vàng!</p>
                    </div>
                `;
                return;
            }

            const currentStudent = window.StudentPicker ? window.StudentPicker.getStudent() : null;
            const top1 = list[0] || null;
            const top2 = list[1] || null;
            const top3 = list[2] || null;
            const restList = list.slice(3);

            let html = '';

            // BỤC VINH DANH TOP 3
            html += `<div class="rankboard-podium">`;

            // Á QUÂN (TOP 2 - BÊN TRÁI)
            if (top2) {
                const isMe2 = currentStudent && currentStudent.ten === top2.ten && currentStudent.lop === top2.lop;
                html += `
                    <div class="podium-col podium-col-2">
                        <div class="podium-avatar-wrap">
                            <div class="podium-avatar">🥈</div>
                            <span class="podium-badge">🥈</span>
                        </div>
                        <div class="podium-name" title="${escapeHtml(top2.ten)}">${escapeHtml(top2.ten)}</div>
                        <div class="podium-class">Lớp ${escapeHtml(top2.lop)}</div>
                        <div class="podium-pillar">
                            <div class="podium-score">${Number(top2.score).toLocaleString('vi-VN')}</div>
                            <div style="font-size: 0.75rem; opacity: 0.9;">điểm</div>
                            ${isMe2 ? '<span style="background: #3b82f6; font-size: 0.65rem; padding: 1px 6px; border-radius: 9999px; margin-top: 4px;">BẠN</span>' : ''}
                        </div>
                    </div>
                `;
            } else {
                html += `<div class="podium-col podium-col-2" style="visibility: hidden;"></div>`;
            }

            // QUÁN QUÂN (TOP 1 - Ở GIỮA, CAO NHẤT)
            if (top1) {
                const isMe1 = currentStudent && currentStudent.ten === top1.ten && currentStudent.lop === top1.lop;
                html += `
                    <div class="podium-col podium-col-1">
                        <div class="podium-avatar-wrap">
                            <div class="podium-avatar">👑</div>
                            <span class="podium-badge">🥇</span>
                        </div>
                        <div class="podium-name" style="font-size: 1.15rem; color: #b45309;" title="${escapeHtml(top1.ten)}">
                            ${escapeHtml(top1.ten)}
                        </div>
                        <div class="podium-class">Lớp ${escapeHtml(top1.lop)}</div>
                        <div class="podium-pillar">
                            <div class="podium-score" style="font-size: 1.35rem;">${Number(top1.score).toLocaleString('vi-VN')}</div>
                            <div style="font-size: 0.75rem; opacity: 0.9;">điểm</div>
                            ${isMe1 ? '<span style="background: #3b82f6; font-size: 0.65rem; padding: 1px 6px; border-radius: 9999px; margin-top: 4px;">BẠN</span>' : ''}
                        </div>
                    </div>
                `;
            }

            // HẠNG BA (TOP 3 - BÊN PHẢI)
            if (top3) {
                const isMe3 = currentStudent && currentStudent.ten === top3.ten && currentStudent.lop === top3.lop;
                html += `
                    <div class="podium-col podium-col-3">
                        <div class="podium-avatar-wrap">
                            <div class="podium-avatar">🥉</div>
                            <span class="podium-badge">🥉</span>
                        </div>
                        <div class="podium-name" title="${escapeHtml(top3.ten)}">${escapeHtml(top3.ten)}</div>
                        <div class="podium-class">Lớp ${escapeHtml(top3.lop)}</div>
                        <div class="podium-pillar">
                            <div class="podium-score">${Number(top3.score).toLocaleString('vi-VN')}</div>
                            <div style="font-size: 0.75rem; opacity: 0.9;">điểm</div>
                            ${isMe3 ? '<span style="background: #3b82f6; font-size: 0.65rem; padding: 1px 6px; border-radius: 9999px; margin-top: 4px;">BẠN</span>' : ''}
                        </div>
                    </div>
                `;
            } else {
                html += `<div class="podium-col podium-col-3" style="visibility: hidden;"></div>`;
            }

            html += `</div>`; // Đóng podium

            // DANH SÁCH TỪ HẠNG 4 TRỞ ĐI
            if (restList.length > 0) {
                html += `<div class="rank-list">`;
                restList.forEach(item => {
                    const isMe = currentStudent && currentStudent.ten === item.ten && currentStudent.lop === item.lop;
                    html += `
                        <div class="rank-row ${isMe ? 'rank-is-me' : ''}">
                            <div class="rank-number">${item.rank}</div>
                            <div class="rank-user-info">
                                <span class="rank-user-name">${escapeHtml(item.ten)}</span>
                                <span class="rank-user-class">Lớp ${escapeHtml(item.lop)}</span>
                                ${item.isOptimistic ? '<span class="rank-pending-pill">⏱️ Mới nộp</span>' : ''}
                            </div>
                            <div class="rank-score-badge">
                                <span>${Number(item.score).toLocaleString('vi-VN')}</span>
                                <span style="font-size: 0.8rem; color: #64748b; font-weight: 700;">điểm</span>
                            </div>
                        </div>
                    `;
                });
                html += `</div>`;
            }

            contentArea.innerHTML = html;
        }
    }

    // Modal popup helper
    let rankModalOverlay = null;

    const RankBoard = {
        /**
         * Render nhúng trực tiếp vào phần tử trên trang
         * @param {string|HTMLElement} container
         * @param {Object} options
         * @returns {RankBoardInstance}
         */
        render(container, options = {}) {
            return new RankBoardInstance(container, options);
        },

        /**
         * Mở Bảng xếp hạng dưới dạng Pop-up Modal toàn màn hình
         * @param {Object} options
         */
        showModal(options = {}) {
            if (!rankModalOverlay) {
                rankModalOverlay = document.createElement('div');
                rankModalOverlay.id = 'arena-rankboard-modal-overlay';
                rankModalOverlay.className = 'arena-modal-overlay';
                rankModalOverlay.innerHTML = `
                    <div class="arena-modal-card" style="max-width: 760px; max-height: 90vh;">
                        <div class="arena-modal-header" style="background: linear-gradient(135deg, #312e81, #4338ca);">
                            <h3 class="arena-modal-title">
                                <span>🏆</span> ${escapeHtml(options.title || 'BẢNG VÀNG ĐẤU TRƯỜNG')}
                            </h3>
                            <button type="button" class="arena-modal-close" id="arena-rank-modal-close">✖</button>
                        </div>
                        <div class="arena-modal-body" style="padding: 12px; overflow-y: auto;">
                            <div id="arena-rankboard-modal-inner"></div>
                        </div>
                    </div>
                `;
                document.body.appendChild(rankModalOverlay);

                rankModalOverlay.querySelector('#arena-rank-modal-close').addEventListener('click', () => {
                    rankModalOverlay.style.display = 'none';
                });
                rankModalOverlay.addEventListener('click', (e) => {
                    if (e.target === rankModalOverlay) rankModalOverlay.style.display = 'none';
                });
            }

            rankModalOverlay.style.display = 'flex';
            const inner = rankModalOverlay.querySelector('#arena-rankboard-modal-inner');
            new RankBoardInstance(inner, options);
        },

        /**
         * Đóng Modal
         */
        closeModal() {
            if (rankModalOverlay) {
                rankModalOverlay.style.display = 'none';
            }
        }
    };

    window.RankBoard = RankBoard;
})();
