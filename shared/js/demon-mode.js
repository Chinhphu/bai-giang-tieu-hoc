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
        manualKingOverride: null,
        options: {
            startingScore: 1000,
            onScoreChange: null,
            onStateChange: null
        },

        // Khởi tạo
        calledNames: new Set(),
        stagedStudent: null,

        init: function (opts = {}) {
            Object.assign(this.options, opts);
            if (opts.students && Array.isArray(opts.students)) {
                this.allClassStudents = opts.students;
            }

            if (this.isActive) {
                this.injectUI();
                this.bindEvents();
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
                

                <!-- Banner Sấm Sét Trừng Phạt -->
                <div class="demon-strike-banner" id="demon-strike-banner"></div>

                <!-- Modal Trừng Phạt Nhanh -->
                <div class="demon-modal-overlay" id="demon-punish-modal">
                    <div class="demon-modal-box">
                        <div class="demon-modal-title">
                            <span>⚡ BẢNG TRỪNG PHẠT MA GIỚI</span>
                            <button type="button" class="btn-modal-close" onclick="window.DemonMode.closePunishModal()">✖</button>
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
                        <div style="margin-top:14px; display:flex; justify-content:flex-end;">
                            <button type="button" class="btn-action" style="background:#334155; color:#f8fafc; font-size:14px; padding:7px 18px; border-color:#64748b;" onclick="window.DemonMode.closePunishModal()">
                                ✖ Hủy / Đóng lại (Esc)
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Modal Quản Lý Phe Quỷ -->
                <div class="demon-modal-overlay" id="demon-manager-modal">
                    <div class="demon-modal-box" style="max-width:720px;">
                        <div class="demon-modal-title">
                            <span>😈 BẢNG QUẢN LÝ PHE QUỶ & ĐẤU TRƯỜNG MA VƯƠNG</span>
                            <button type="button" class="btn-modal-close" onclick="window.DemonMode.closeManagerModal()">✖</button>
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
                    return;
                }
                if (e.key === 'Escape') {
                    const openModal = document.querySelector('.demon-modal-overlay.open');
                    if (openModal) {
                        openModal.classList.remove('open');
                    }
                }
            });

            // Click backdrop đóng modal
            document.querySelectorAll('.demon-modal-overlay').forEach(overlay => {
                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) {
                        overlay.classList.remove('open');
                    }
                });
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

            // Khóa "Chiến thuật Namikaze" (Cấm tiệt đường hiến máu nhân đạo):
            // Điểm phạt tuyệt đối KHÔNG chia cho các con Quỷ khác.
            // Điểm phạt được HỦY DIỆT (bay vào Hư Vô) hoặc chuyển thẳng vào Quỹ Cứu Trợ cho tổ Loài Người thấp điểm nhất!
            let splitMsg = '';
            if (window.teams && window.teams.length > 0) {
                const humanTeams = window.teams.filter(t => !t.isDemon);
                const candidates = humanTeams.length > 0 ? humanTeams : window.teams;
                const sortedT = [...candidates].sort((a, b) => a.score - b.score);
                sortedT[0].score += delta;
                splitMsg = `<br><span style="font-size:16px; color:#a7f3d0;">🎁 Điểm phạt (-${delta} Xu) chuyển thẳng vào Quỹ Cứu Trợ cho ${sortedT[0].name}! (Cấm nuôi Quỷ)</span>`;
            } else {
                splitMsg = `<br><span style="font-size:16px; color:#fca5a5;">💥 Điểm phạt (-${delta} Xu) đã tan biến vào Hư Vô! (Triệt tiêu mưu đồ bơm điểm)</span>`;
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

        // Gacha Quỷ: Mỗi con quỷ 1 lượt duy nhất
        triggerGacha: function () {
            if (this.students.length === 0) {
                this.openManagerModal();
                return;
            }
            let candidates = this.students.filter(d => !this.calledNames.has(d.name) && d.status !== 'slime');
            if (candidates.length === 0) {
                this.calledNames.clear();
                candidates = this.students.filter(d => d.status !== 'slime');
                if (candidates.length === 0) {
                    this.showBanner('⚠️ Tất cả Quỷ đều đã bị phong ấn Slime!');
                    return;
                }
            }

            const picked = candidates[Math.floor(Math.random() * candidates.length)];
            this.calledNames.add(picked.name);
            this.stagedStudent = picked;

            // Bật Big Alert chuẩn nếu có
            if (typeof window.showBigStudentAlert === 'function') {
                window.showBigStudentAlert(picked.name, 'ĐẠI DIỆN TỔ QUỶ LÊN BẢNG:');
            } else {
                this.showBanner(`🎯 <b>ĐẠI DIỆN TỔ QUỶ LÊN BẢNG:</b> ${picked.name.toUpperCase()}!`);
            }
            this.renderRoster();
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

        // Đánh giá Quỷ Vương & Lý do sắc phong (Tie-Breaking 3 bậc)
        evaluateKing: function () {
            if (!this.students || this.students.length === 0) return null;
            const valid = this.students.filter(d => d.status !== 'slime');
            if (valid.length === 0) {
                return {
                    status: 'all_slime',
                    title: 'TẤT CẢ QUỶ ĐÃ BỊ PHONG ẤN SLIME 🔇',
                    name: 'Không có Quỷ Vương',
                    scoreText: 'Toàn bộ Phe Quỷ đã bị giáng cấp Slime',
                    reason: 'Không có học sinh nào đủ tư cách đăng quang do toàn bộ thành viên đều vi phạm kỷ luật nghiêm trọng!',
                    tiedDemons: []
                };
            }

            if (this.manualKingOverride) {
                const found = valid.find(d => d.name === this.manualKingOverride.name);
                const score = found ? found.score : 0;
                const violations = found ? found.violations : 0;
                return {
                    status: 'decided',
                    title: `👑 QUỶ VƯƠNG TIẾT NÀY: ${this.manualKingOverride.name} 👑`,
                    name: this.manualKingOverride.name,
                    scoreText: `Tổng điểm sinh tồn: ${score} Xu · Bị nhắc nhở: ${violations} lần`,
                    reason: this.manualKingOverride.reason,
                    tiedDemons: []
                };
            }

            const maxScore = Math.max(...valid.map(d => d.score));
            const topScorers = valid.filter(d => d.score === maxScore);

            if (topScorers.length === 1) {
                const k = topScorers[0];
                let reason = `Đạt điểm sinh tồn cao nhất Phe Quỷ (${k.score} Xu)`;
                if (k.violations === 0) {
                    reason += ' và ý thức kỷ luật gương mẫu (0 lần vi phạm)!';
                } else {
                    reason += ` (số lần bị nhắc nhở vi phạm: ${k.violations} lần).`;
                }
                return {
                    status: 'decided',
                    title: `👑 QUỶ VƯƠNG TIẾT NÀY: ${k.name} 👑`,
                    name: k.name,
                    scoreText: `Tổng điểm sinh tồn: ${k.score} Xu · Bị nhắc nhở: ${k.violations} lần`,
                    reason: reason,
                    tiedDemons: []
                };
            }

            const minViolations = Math.min(...topScorers.map(d => d.violations));
            const bestDisciplined = topScorers.filter(d => d.violations === minViolations);

            if (bestDisciplined.length === 1) {
                const k = bestDisciplined[0];
                const othersStr = topScorers.filter(d => d.name !== k.name)
                    .map(d => `${d.name} (${d.violations} lần phạt)`).join(', ');
                const reason = `Đồng điểm cao nhất (${k.score} Xu), nhưng xuất sắc đăng quang nhờ Ý THỨC KỶ LUẬT TỐT HƠN (chỉ bị nhắc nhở ${k.violations} lần, ít hơn ${othersStr})!`;
                return {
                    status: 'decided',
                    title: `👑 QUỶ VƯƠNG TIẾT NÀY: ${k.name} 👑`,
                    name: k.name,
                    scoreText: `Tổng điểm sinh tồn: ${k.score} Xu · Bị nhắc nhở: ${k.violations} lần`,
                    reason: reason,
                    tiedDemons: []
                };
            }

            const names = bestDisciplined.map(d => d.name).join(' & ');
            const reason = `Đồng điểm sinh tồn cao nhất (${maxScore} Xu) và đồng kỷ luật (${minViolations} lần nhắc nhở). Danh hiệu: SONG MA VƯƠNG (chia đôi thời gian quản trò 15p - 15p tuần sau) HOẶC Giáo viên duyệt Vở chép bài để trao trọn vương miện!`;
            return {
                status: 'tied',
                title: `👑 SONG MA VƯƠNG ĐỒNG HẠNG: ${names} 👑`,
                name: names,
                scoreText: `Cùng đạt: ${maxScore} Xu · Bị nhắc nhở: ${minViolations} lần`,
                reason: reason,
                tiedDemons: bestDisciplined
            };
        },

        chooseKingByNotebook: function (name) {
            this.manualKingOverride = {
                name: name,
                reason: 'Chiến thắng danh hiệu Quỷ Vương sau khi được Giáo viên kiểm tra và xác nhận Vở ghi bài đạt 100% đầy đủ, sạch đẹp nhất!'
            };
            this.showBanner(`👑 Đã sắc phong ${name} làm Quỷ Vương nhờ Vở sạch chữ đẹp!`);
        },

        acceptDualKings: function () {
            const res = this.evaluateKing();
            if (!res || !res.tiedDemons) return;
            const names = res.tiedDemons.map(d => d.name).join(' & ');
            this.manualKingOverride = {
                name: `Song Ma Vương: ${names}`,
                reason: `Đồng điểm và đồng kỷ luật! Được công nhận SONG MA VƯƠNG: Mỗi em sẽ quản trò 15 phút máy chiếu trong tiết sau.`
            };
            this.showBanner(`👑 Đã xác nhận danh hiệu Song Ma Vương cho ${names}!`);
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

            const sorted = [...this.students].sort((a, b) => {
                if (b.score !== a.score) return b.score - a.score;
                return a.violations - b.violations;
            });

            const kingEval = this.evaluateKing();

            sorted.forEach((d, idx) => {
                let title = 'Quỷ Con';
                let tt27 = 'C';
                let comment = '';

                const isCrownedKing = kingEval && (
                    (kingEval.name === d.name) || 
                    (kingEval.tiedDemons && kingEval.tiedDemons.some(td => td.name === d.name))
                );

                if (d.status === 'slime') {
                    title = 'Slime Xanh (Câm Lặng)';
                    tt27 = 'C';
                    comment = 'Ý thức kỷ luật kém, lơ là thiếu tập trung; bị tước quyền điều khiển máy và giáng cấp Slime, cần gia đình và GVCN phối hợp chấn chỉnh.';
                } else if (isCrownedKing) {
                    title = (kingEval.status === 'tied') ? 'Song Ma Vương (Đồng Hạng 1)' : 'Quỷ Vương (Tạm Quyền)';
                    tt27 = d.violations === 0 ? 'H' : 'C';
                    comment = `SẮC PHONG: ${kingEval.reason} Cần hoàn thành 100% vở ghi bài trước giờ học tuần sau mới được cầm máy.`;
                } else if (d.score < 800) {
                    title = 'Quỷ Con (Dưới Mốc Sàn 800 Xu)';
                    tt27 = 'C';
                    comment = `Tổng điểm cuối tiết (${d.score} Xu < 800 Xu sàn) do vi phạm kỷ luật (${d.violations} lần); bị phạt chép phạt nội dung bài học, cần GVCN và gia đình nhắc nhở.`;
                } else if (d.violations >= 2) {
                    title = 'Quỷ Con (Cá Biệt)';
                    tt27 = 'C';
                    comment = `Còn hiện tượng nói chuyện riêng, cố ý làm ảnh hưởng thi đua chung (vi phạm ${d.violations} lần); bị cách ly sang Phe Quỷ, cần rèn luyện thêm tính tự giác.`;
                } else {
                    title = 'Quỷ Con';
                    tt27 = 'H';
                    comment = 'Bị cách ly sang Phe Quỷ; trong tiết có tiến bộ về kỷ luật nhưng cần tiếp tục cố gắng để được trở về tổ.';
                }

                let rankLabel = `Hạng ${idx + 1}`;
                if (idx > 0 && d.score === sorted[idx - 1].score && d.violations === sorted[idx - 1].violations) {
                    rankLabel = `Hạng ${idx} (Đồng điểm)`;
                }

                demonRows.push([
                    rankLabel,
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

