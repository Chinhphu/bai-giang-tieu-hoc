/**
 * BỘ MODULE DÙNG CHUNG TOÀN HỆ THỐNG: CHẾ ĐỘ PHE QUỶ / ĐẤU TRƯỜNG MA VƯƠNG (DEMON MODE)
 * Phiên bản: 1.0 (2026-2027)
 * Áp dụng: Tất cả các khối (1 - 5) cho các lớp cá biệt cần cơ chế cách ly và tự quản chế.
 * Kích hoạt:
 *   - URL: ?mode=mavuong hoặc sessionStorage.setItem('bg_demon_mode', 'true')
 *   - Phím tắt: Ctrl + Alt + D
 *   - Click 4 lần liên tiếp vào tiêu đề slide bìa
 */

(function (window, document) {
    'use strict';

    const urlParams = new URLSearchParams(window.location.search);
    const IS_ACTIVE = urlParams.get('mode') === 'mavuong' || sessionStorage.getItem('bg_demon_mode') === 'true';

    const DemonMode = {
        isActive: IS_ACTIVE,
        students: [],
        allClassStudents: [],
        selectedPunishIdx: 0,
        options: {
            startingScore: 1000,
            onScoreChange: null,
            onStateChange: null
        },

        // Khởi tạo
        init: function (opts = {}) {
            Object.assign(this.options, opts);
            if (opts.students && Array.isArray(opts.students)) {
                this.allClassStudents = opts.students;
            }

            if (this.isActive) {
                this.injectUI();
                this.bindEvents();
                // Khởi tạo 2 quỷ mẫu nếu chưa có ai
                if (this.students.length === 0) {
                    this.students = [
                        { name: "Học sinh cá biệt 1", score: this.options.startingScore, violations: 0, status: 'alive' },
                        { name: "Học sinh cá biệt 2", score: this.options.startingScore, violations: 0, status: 'alive' }
                    ];
                }
                this.renderRoster();
            }
        },

        // Kích hoạt thủ công chế độ
        enable: function () {
            this.isActive = true;
            sessionStorage.setItem('bg_demon_mode', 'true');
            this.injectUI();
            this.bindEvents();
            this.renderRoster();
            this.showBanner('⚡ ĐÃ KÍCH HOẠT ĐẤU TRƯỜNG MA VƯƠNG! 😈');
            if (typeof this.options.onStateChange === 'function') {
                this.options.onStateChange(true);
            }
        },

        // Tiêm HTML và CSS vào trang nếu chưa có
        injectUI: function () {
            if (document.getElementById('demon-mode-root')) return;

            const root = document.createElement('div');
            root.id = 'demon-mode-root';
            root.innerHTML = `
                <!-- Nút Trừng Phạt Nổi Góc Màn Hình -->
                <button type="button" class="btn-punish-float active" id="btn-punish-float" onclick="window.DemonMode.openPunishModal()">
                    ⚡ Trừng Phạt Quỷ
                </button>

                <!-- Banner Sấm Sét Trừng Phạt -->
                <div class="demon-strike-banner" id="demon-strike-banner"></div>

                <!-- Modal Trừng Phạt Nhanh -->
                <div class="demon-modal-overlay" id="demon-punish-modal">
                    <div class="demon-modal-box">
                        <div class="demon-modal-title">
                            <span>⚡ BẢNG TRỪNG PHẠT MA GIỚI</span>
                            <button type="button" class="btn-fs-close" style="position:static; display:inline-flex !important;" onclick="window.DemonMode.closePunishModal()">✖</button>
                        </div>
                        <div style="font-size:14px; color:#cbd5e1; margin-bottom:8px; font-weight:700;">1. CHỌN CON QUỶ VI PHẠM:</div>
                        <div class="demon-pick-grid" id="punish-demon-list"></div>
                        <div style="font-size:14px; color:#cbd5e1; margin-bottom:8px; font-weight:700;">2. CHỌN LỖI (BẤM LÀ THI HÀNH NGAY):</div>
                        <div class="demon-fault-grid">
                            <button type="button" class="demon-fault-btn" onclick="window.DemonMode.executePunish('TALKING', 100)">
                                <span>🗣️ Mất trật tự / Nói leo / Cười cợt</span>
                                <b style="color:#f87171;">-100 Xu</b>
                            </button>
                            <button type="button" class="demon-fault-btn" onclick="window.DemonMode.executePunish('NOTEBOOK', 100)">
                                <span>✍️ Không chép bài vào vở / Ngồi chơi</span>
                                <b style="color:#f87171;">-100 Xu</b>
                            </button>
                            <button type="button" class="demon-fault-btn" onclick="window.DemonMode.executePunish('TROLLING', 150)">
                                <span>🤡 Cố tình quậy phá / Cà khịa / Cố ý làm sai</span>
                                <b style="color:#f87171;">-150 Xu</b>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Modal Quản Lý Phe Quỷ -->
                <div class="demon-modal-overlay" id="demon-manager-modal">
                    <div class="demon-modal-box" style="max-width:720px;">
                        <div class="demon-modal-title">
                            <span>😈 BẢNG QUẢN LÝ PHE QUỶ & ĐẤU TRƯỜNG MA VƯƠNG</span>
                            <button type="button" class="btn-fs-close" style="position:static; display:inline-flex !important;" onclick="window.DemonMode.closeManagerModal()">✖</button>
                        </div>
                        <div style="font-size:14.5px; color:#cbd5e1; line-height:1.5; margin-bottom:12px;">
                            Chọn học sinh cá biệt để <b>Trục xuất sang Phe Quỷ</b> (chấm dứt tình trạng cố tình kéo tụt điểm của các tổ).
                        </div>
                        <div style="display:flex; gap:10px; margin-bottom:12px;">
                            <input type="text" id="custom-demon-input" placeholder="Nhập tên học sinh cá biệt..." style="flex:1; padding:8px 12px; border-radius:8px; border:1px solid #64748b; background:#0f172a; color:#fff; font-size:14px;">
                            <button type="button" class="btn-action coral" style="font-size:14px; padding:8px 16px;" onclick="window.DemonMode.addCustomStudent()">+ Đày Sang Phe Quỷ</button>
                        </div>
                        <div style="font-size:14px; font-weight:800; color:#f472b6; margin-bottom:6px;">DANH SÁCH HỌC SINH CẢ LỚP (BẤM ĐỂ CHUYỂN PHE):</div>
                        <div style="max-height:180px; overflow-y:auto; display:flex; flex-wrap:wrap; gap:6px; background:#0f172a; padding:10px; border-radius:10px; border:1px solid #334155; margin-bottom:14px;" id="all-students-picker"></div>
                        <div style="font-size:14px; font-weight:800; color:#fef08a; margin-bottom:6px;">DANH SÁCH PHE QUỶ HIỆN TẠI:</div>
                        <div id="manager-demon-roster" style="max-height:140px; overflow-y:auto; display:flex; flex-direction:column; gap:6px; margin-bottom:14px;"></div>
                        <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px dashed #475569; padding-top:12px;">
                            <button type="button" class="btn-action coral" style="font-size:13.5px; padding:6px 14px;" onclick="window.DemonMode.curseSlimeKing()">
                                💥 Kích hoạt Phản Phệ Slime
                            </button>
                            <button type="button" class="btn-action mint" style="font-size:14px; padding:8px 18px;" onclick="window.DemonMode.closeManagerModal()">
                                Đóng Bảng Quản Lý
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Modal Gacha Quỷ -->
                <div class="demon-modal-overlay" id="demon-gacha-modal">
                    <div class="demon-modal-box" style="text-align:center; max-width:540px; border-color:#a855f7; box-shadow:0 0 50px rgba(168, 85, 247, 0.6);">
                        <div style="font-size:32px;">🎲😈</div>
                        <h2 style="font-size:28px; font-weight:900; color:#f472b6; margin:8px 0 14px;">VÒNG QUAY MA VƯƠNG</h2>
                        <div style="font-size:16px; color:#cbd5e1; margin-bottom:16px;">Hệ thống đang bốc thăm ngẫu nhiên một con Quỷ lên sàn đấu!</div>
                        <div id="gacha-demon-display" style="font-size:36px; font-weight:900; color:#fef08a; padding:20px; background:#0f172a; border:2px dashed #f43f5e; border-radius:16px; margin-bottom:18px;">
                            Đang quay...
                        </div>
                        <button type="button" class="btn-action purple" style="font-size:18px; padding:10px 24px;" onclick="window.DemonMode.closeGachaModal()">
                            CHỐT LÊN SÀN ĐẤU ⚖️
                        </button>
                    </div>
                </div>
            `;
            document.body.appendChild(root);
        },

        // Bắt sự kiện phím tắt
        bindEvents: function () {
            window.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.altKey && (e.key === 'd' || e.key === 'D')) {
                    e.preventDefault();
                    if (!this.isActive) this.enable();
                    else this.openManagerModal();
                }
            });
        },

        // Hiển thị Banner Sấm Sét
        showBanner: function (msg) {
            const banner = document.getElementById('demon-strike-banner');
            if (!banner) return;
            banner.innerHTML = msg;
            banner.classList.add('show');
            setTimeout(() => {
                banner.classList.remove('show');
            }, 3800);
        },

        // Render danh sách quỷ lên Sidebar (nếu có element)
        renderRoster: function () {
            const rosterEl = document.getElementById('demon-roster-list');
            if (!rosterEl) return;

            if (this.students.length === 0) {
                rosterEl.innerHTML = '<div style="color:#94a3b8; font-size:12px; font-style:italic;">Chưa có học sinh trong Phe Quỷ.</div>';
                return;
            }

            rosterEl.innerHTML = this.students.map((d, idx) => {
                const isSlime = d.status === 'slime';
                const avatar = isSlime ? '🟢' : '😈';
                const statusTag = isSlime ? '<span style="color:#34d399; font-size:10px; font-weight:800;">[SLIME 🔇]</span>' : '';
                return `
                    <div class="demon-item ${isSlime ? 'slime' : ''}">
                        <span class="demon-name">${avatar} ${d.name} ${statusTag}</span>
                        <div style="display:flex; align-items:center; gap:6px;">
                            <span class="demon-score">${d.score} Xu</span>
                            <button type="button" class="btn-dt-action" onclick="window.DemonMode.quickPunish(${idx})" title="Phạt nhanh (-100 Xu)">⚡</button>
                        </div>
                    </div>
                `;
            }).join('');
        },

        // Mở Modal Trừng Phạt
        openPunishModal: function () {
            if (this.students.length === 0) {
                this.openManagerModal();
                return;
            }
            const listEl = document.getElementById('punish-demon-list');
            if (listEl) {
                listEl.innerHTML = this.students.map((d, idx) => `
                    <button type="button" class="demon-pick-btn ${idx === this.selectedPunishIdx ? 'selected' : ''}" onclick="window.DemonMode.selectPunish(${idx})">
                        ${d.status === 'slime' ? '🟢' : '😈'} <b>${d.name}</b>
                        <div style="font-size:12px; color:#cbd5e1; margin-top:2px;">Điểm: ${d.score} Xu · Vi phạm: ${d.violations} lần</div>
                    </button>
                `).join('');
            }
            const modal = document.getElementById('demon-punish-modal');
            if (modal) modal.classList.add('open');
        },

        closePunishModal: function () {
            const modal = document.getElementById('demon-punish-modal');
            if (modal) modal.classList.remove('open');
        },

        selectPunish: function (idx) {
            this.selectedPunishIdx = idx;
            document.querySelectorAll('.demon-pick-btn').forEach((btn, i) => {
                btn.classList.toggle('selected', i === idx);
            });
        },

        quickPunish: function (idx) {
            this.selectedPunishIdx = idx;
            this.openPunishModal();
        },

        // Thực thi Trừng phạt & Chia điểm Zero-Sum
        executePunish: function (faultType, delta) {
            if (!this.students[this.selectedPunishIdx]) return;
            const target = this.students[this.selectedPunishIdx];

            target.score = Math.max(0, target.score - delta);
            target.violations += 1;

            const others = this.students.filter((_, idx) => idx !== this.selectedPunishIdx && _.status !== 'slime');
            let splitMsg = '';

            if (others.length > 0) {
                const share = Math.floor(delta / others.length);
                others.forEach(d => { d.score += share; });
                splitMsg = `<br><span style="font-size:16px; color:#fef08a;">✨ ${delta} Xu bị phạt đã chia đều +${share} Xu cho các con Quỷ còn lại!</span>`;
            } else {
                // Quỹ Cứu Trợ Loài Người
                if (window.teams && window.teams.length > 0) {
                    const sortedT = [...window.teams].sort((a, b) => a.score - b.score);
                    sortedT[0].score += delta;
                    splitMsg = `<br><span style="font-size:16px; color:#a7f3d0;">🎁 Điểm phạt được chuyển vào Quỹ Cứu Trợ cho ${sortedT[0].name}!</span>`;
                }
            }

            let faultLabel = 'Mất trật tự';
            if (faultType === 'NOTEBOOK') faultLabel = 'Không chép bài vào vở';
            if (faultType === 'TROLLING') faultLabel = 'Cố tình quậy phá / Cà khịa';

            this.renderRoster();
            this.closePunishModal();
            this.showBanner(`⚡ <b>${target.name.toUpperCase()}</b> BỊ PHẠT <b>-${delta} XU</b> VÌ <b>${faultLabel.toUpperCase()}</b>! ⚡ ${splitMsg}`);

            if (typeof this.options.onScoreChange === 'function') {
                this.options.onScoreChange(target, -delta, faultLabel);
            }
        },

        // Hút máu khi Quỷ chiến thắng
        drainSoul: function (winnerIdx, amount) {
            if (!this.students[winnerIdx]) return;
            const winner = this.students[winnerIdx];
            const others = this.students.filter((_, idx) => idx !== winnerIdx);

            if (others.length > 0) {
                const tax = Math.floor(amount / others.length);
                others.forEach(d => { d.score = Math.max(0, d.score - tax); });
                winner.score += amount;
                this.showBanner(`😈 <b>${winner.name}</b> THẮNG KIỆN! HÚT TRỌN <b>+${amount} XU</b> TỪ ĐỒNG BỌN (MỖI BẠN -${tax} XU)!`);
            } else {
                winner.score += amount;
                this.showBanner(`😈 <b>${winner.name}</b> THẮNG KIỆN! HÚT +${amount} XU TỪ HỆ THỐNG AI!`);
            }
            this.renderRoster();
        },

        // Gacha Quỷ
        triggerGacha: function () {
            if (this.students.length === 0) {
                this.openManagerModal();
                return;
            }
            const activeDemons = this.students.filter(d => d.status !== 'slime');
            if (activeDemons.length === 0) {
                this.showBanner('⚠️ Tất cả Quỷ đều đã bị phong ấn Slime!');
                return;
            }

            const modal = document.getElementById('demon-gacha-modal');
            if (modal) modal.classList.add('open');
            const disp = document.getElementById('gacha-demon-display');

            let count = 0;
            const timer = setInterval(() => {
                const rand = activeDemons[Math.floor(Math.random() * activeDemons.length)];
                if (disp) disp.textContent = rand.name;
                count++;
                if (count > 15) {
                    clearInterval(timer);
                    const chosen = activeDemons[Math.floor(Math.random() * activeDemons.length)];
                    if (disp) disp.textContent = '😈 ' + chosen.name + ' 😈';
                }
            }, 90);
        },

        closeGachaModal: function () {
            const modal = document.getElementById('demon-gacha-modal');
            if (modal) modal.classList.remove('open');
        },

        // Modal Quản Lý Phe Quỷ
        openManagerModal: function () {
            this.renderAllStudentsPicker();
            this.renderManagerRoster();
            const modal = document.getElementById('demon-manager-modal');
            if (modal) modal.classList.add('open');
        },

        closeManagerModal: function () {
            const modal = document.getElementById('demon-manager-modal');
            if (modal) modal.classList.remove('open');
            this.renderRoster();
        },

        renderAllStudentsPicker: function () {
            const box = document.getElementById('all-students-picker');
            if (!box) return;
            box.innerHTML = this.allClassStudents.map(name => {
                const isExiled = this.students.some(d => d.name === name);
                return `
                    <button type="button" class="case-pill-btn ${isExiled ? 'active' : ''}" style="${isExiled ? 'background:#881337; color:#fef08a; border-color:#f43f5e;' : ''}" onclick="window.DemonMode.toggleExile('${name}')">
                        ${isExiled ? '😈 ' : ''}${name}
                    </button>
                `;
            }).join('');
        },

        renderManagerRoster: function () {
            const box = document.getElementById('manager-demon-roster');
            if (!box) return;
            if (this.students.length === 0) {
                box.innerHTML = '<div style="color:#94a3b8; font-size:13px; font-style:italic;">Chưa có học sinh nào trong Phe Quỷ.</div>';
                return;
            }
            box.innerHTML = this.students.map((d, i) => `
                <div style="background:#0f172a; border:1px solid #334155; padding:6px 12px; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-weight:800; color:#f8fafc;">${d.status === 'slime' ? '🟢' : '😈'} ${d.name} (${d.score} Xu)</span>
                    <div style="display:flex; gap:6px;">
                        <button type="button" class="btn-action coral" style="font-size:11px; padding:3px 8px;" onclick="window.DemonMode.curseSlimeIdx(${i})">Giáng Slime</button>
                        <button type="button" class="btn-action mint" style="font-size:11px; padding:3px 8px;" onclick="window.DemonMode.toggleExile('${d.name}')">🕊️ Thanh Tẩy</button>
                    </div>
                </div>
            `).join('');
        },

        toggleExile: function (name) {
            const foundIdx = this.students.findIndex(d => d.name === name);
            if (foundIdx >= 0) {
                this.students.splice(foundIdx, 1);
            } else {
                this.students.push({
                    name: name,
                    score: this.options.startingScore,
                    violations: 0,
                    status: 'alive'
                });
            }
            this.renderAllStudentsPicker();
            this.renderManagerRoster();
            this.renderRoster();
        },

        addCustomStudent: function () {
            const input = document.getElementById('custom-demon-input');
            const name = input ? input.value.trim() : '';
            if (!name) return;
            this.toggleExile(name);
            input.value = '';
        },

        // Phản Phệ Slime
        curseSlimeIdx: function (idx) {
            if (!this.students[idx]) return;
            const target = this.students[idx];
            const bounty = target.score;
            target.score = 0;
            target.status = 'slime';

            // Nổ điểm chia cho Loài Người
            if (window.teams && window.teams.length > 0 && bounty > 0) {
                const share = Math.floor(bounty / window.teams.length);
                window.teams.forEach(t => { t.score += share; });
            }

            this.renderRoster();
            this.renderManagerRoster();
            this.closeManagerModal();
            this.showBanner(`💥 <b>ĐÒN PHẢN PHỆ GIÁNG XUỐNG ${target.name.toUpperCase()}!</b> 💥<br>Điểm số nổ tung (+${bounty} Xu) chia đều cho Loài Người! Em bị giáng cấp thành <b>SLIME XANH CÂM LẶNG 🔇</b>!`);
        },

        curseSlimeKing: function () {
            if (this.students.length === 0) return;
            let bestIdx = 0;
            this.students.forEach((d, i) => {
                if (d.score > this.students[bestIdx].score) bestIdx = i;
            });
            this.curseSlimeIdx(bestIdx);
        },

        // Xuất Section Báo Cáo CSV chuẩn Anti-Sugarcoating
        exportCsvSection: function () {
            if (!this.students || this.students.length === 0) return null;

            const demonRows = [
                ['HỒ SƠ THEO DÕI HÀNH VI & KỶ LUẬT ĐẶC BIỆT (PHE QUỶ)'],
                ['Cảnh báo: Dữ liệu phản ánh hành vi cá biệt trong tiết học, phục vụ phối hợp với GVCN & Phụ huynh'],
                [''],
                ['STT', 'Họ và Tên', 'Điểm Số (Xu)', 'Danh Hiệu Ma Giới', 'Số Lần Vi Phạm', 'Trạng Thái Máy', 'Đánh Giá TT27', 'Nhận Xét Sư Phạm Nghiêm Khắc']
            ];

            const sorted = [...this.students].sort((a, b) => b.score - a.score);
            sorted.forEach((d, idx) => {
                let title = 'Quỷ Con';
                let tt27 = 'C';
                let comment = '';

                if (d.status === 'slime') {
                    title = 'Slime Xanh (Câm Lặng)';
                    tt27 = 'C';
                    comment = 'Ý thức kỷ luật kém, lơ là thiếu tập trung; bị tước quyền điều khiển máy và giáng cấp Slime, cần gia đình và GVCN phối hợp chấn chỉnh.';
                } else if (idx === 0 && d.score >= this.options.startingScore) {
                    title = 'Quỷ Vương (Tạm Quyền)';
                    tt27 = d.violations === 0 ? 'H' : 'C';
                    comment = 'Có khả năng phản biện và điểm số cao trong Phe Quỷ nhưng ý thức kỷ luật chưa ổn định; cần hoàn thành 100% vở ghi bài mới đủ điều kiện công nhận.';
                } else if (d.violations >= 2) {
                    title = 'Quỷ Con (Cá Biệt)';
                    tt27 = 'C';
                    comment = `Còn hiện tượng nói chuyện riêng, cố ý làm ảnh hưởng thi đua chung (vi phạm ${d.violations} lần); bị cách ly sang Phe Quỷ, cần rèn luyện thêm tính tự giác.`;
                } else {
                    title = 'Quỷ Con';
                    tt27 = 'H';
                    comment = 'Bị cách ly sang Phe Quỷ; trong tiết có tiến bộ về kỷ luật nhưng cần tiếp tục cố gắng để được trở về tổ.';
                }

                demonRows.push([
                    idx + 1,
                    d.name,
                    d.score,
                    title,
                    `${d.violations} lần`,
                    d.status === 'slime' ? 'Bị phong ấn' : 'Bình thường',
                    tt27,
                    comment
                ]);
            });

            return ['THEO DÕI KỶ LUẬT PHE QUỶ', demonRows];
        }
    };

    window.DemonMode = DemonMode;

    // Tự động khởi tạo khi DOM tải xong
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => DemonMode.init());
    } else {
        DemonMode.init();
    }

})(window, document);

