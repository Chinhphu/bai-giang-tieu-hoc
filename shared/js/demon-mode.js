/**
 * BỘ MODULE DÙNG CHUNG: CHẾ ĐỘ PHE QUỶ — BẤT CÔNG CÔNG KHAI (DEMON MODE v2)
 * Phiên bản: 2.0 (Chuẩn hóa theo AGENTS.md & STANDARDS.md §12.6.1)
 * Phạm vi: Áp dụng ĐỘC QUYỀN cho Khối 5 (tuyệt đối không áp dụng Khối 1-4).
 * Nguyên tắc:
 *   - Mỗi em trong Phe Quỷ là 1 cá thể độc lập (khởi điểm 1000 Xu), KHÔNG có điểm tổ chung.
 *   - Bãi bỏ "Quỷ Vương cầm máy", "Quỹ Cứu Trợ", bảng chip và ô gõ tên thủ công.
 *   - Vi phạm >= 3 lần hoặc điểm < 800 Xu -> tự động NỔ TUNG 💥, chia điểm cho các tổ Loài Người
 *     và chuyển thành "Slime Câm Lặng 🟢🔇".
 */
(function (window, document) {
    'use strict';

    const urlParams = new URLSearchParams(window.location.search);
    const IS_ACTIVE = urlParams.get('mode') === 'mavuong' || sessionStorage.getItem('bg_demon_mode') === 'true';

    function isGrade5Page(opts) {
        if (opts && opts.grade !== undefined) return Number(opts.grade) === 5;
        const path = (typeof location !== 'undefined' ? location.pathname : '') || '';
        if (/khoi-[1-4]\b/i.test(path)) return false;
        if (/khoi-5\b/i.test(path)) return true;
        return !/Tin học [1-4]\b/i.test(document.title || '');
    }

    const DemonMode = {
        isActive: IS_ACTIVE,
        students: [], // [{ name, score, violations, status: 'active'|'slime' }]
        allClassStudents: [],
        selectedPunishIdx: -1,
        stagedStudent: null,
        options: {
            startingScore: 1000,
            onExplodeShare: null,
            onStateChange: null
        },

        hasCustomInlineUI: function () {
            return !!document.getElementById('demon-manager-modal');
        },

        init: function (opts = {}) {
            Object.assign(this.options, opts);
            if (Array.isArray(opts.students)) {
                this.allClassStudents = opts.students.map(s => (typeof s === 'string' ? s : (s && s.name) || '')).filter(Boolean);
            }
            if (!isGrade5Page(opts)) {
                this.isActive = false;
                return;
            }
            if (this.isActive && !this.hasCustomInlineUI()) {
                this.injectUI();
                this.renderRoster();
            }
        },

        enable: function () {
            if (!isGrade5Page(this.options)) return false;
            this.isActive = true;
            sessionStorage.setItem('bg_demon_mode', 'true');
            if (!this.hasCustomInlineUI()) {
                this.injectUI();
                this.renderRoster();
                this.showBanner('⚡ ĐÃ KÍCH HOẠT PHE QUỶ KHỐI 5 — BẤT CÔNG CÔNG KHAI 😈');
            }
            if (typeof this.options.onStateChange === 'function') {
                this.options.onStateChange(true);
            }
            return true;
        },

        addStudent: function (name) {
            const clean = String(name || '').trim();
            if (!clean || this.students.some(d => d.name === clean)) return false;
            this.students.push({
                name: clean,
                score: Number(this.options.startingScore) || 1000,
                violations: 0,
                status: 'active'
            });
            this.renderRoster();
            return true;
        },

        removeStudent: function (name) {
            const idx = this.students.findIndex(d => d.name === name);
            if (idx === -1) return false;
            this.students.splice(idx, 1);
            if (this.stagedStudent === name) this.stagedStudent = null;
            this.renderRoster();
            return true;
        },

        pardonStudent: function (name) {
            const ok = this.removeStudent(name);
            if (ok) {
                this.showBanner(`🕊️ Ân xá cho ${name} trở về tổ Loài Người!`);
            }
            return ok;
        },

        explodeStudent: function (idx) {
            const d = this.students[idx];
            if (!d || d.status === 'slime') return 0;
            const burst = Math.max(0, Number(d.score) || 0);
            d.score = 0;
            d.status = 'slime';
            if (this.stagedStudent === d.name) this.stagedStudent = null;
            if (typeof this.options.onExplodeShare === 'function') {
                this.options.onExplodeShare(burst, d);
            }
            if (typeof window.announcePointDeduction === 'function') {
                window.announcePointDeduction(d.name, burst, 'xu');
            }
            this.showBanner(`💥 ${d.name} ĐÃ BỊ NỔ TUNG (-${burst} XU)! Chia đều cho Loài Người! Em hóa Slime Câm Lặng 🟢🔇`);
            this.renderRoster();
            return burst;
        },

        punishStudent: function (idx, delta, reason) {
            const d = this.students[idx];
            if (!d || d.status === 'slime') return;
            const amt = Math.abs(delta);
            d.violations += 1;
            d.score = Math.max(0, d.score - amt);
            this.closePunishModal();
            if (d.violations >= 3 || d.score < 800) {
                this.explodeStudent(idx);
                return;
            }
            if (typeof window.announcePointDeduction === 'function') {
                window.announcePointDeduction(d.name, amt, 'xu');
            }
            this.showBanner(`⚡ ${d.name}: -${amt} Xu (${reason}) · Lỗi ${d.violations}/3`);
            this.renderRoster();
        },

        rollGacha: function () {
            const active = this.students.filter(d => d.status !== 'slime');
            if (!active.length) {
                this.openManagerModal();
                return null;
            }
            const pick = active[Math.floor(Math.random() * active.length)];
            this.stagedStudent = pick.name;
            this.showBanner(`🎲 GACHA PHE QUỶ: Mời ${pick.name} lên thực hiện!`);
            this.renderRoster();
            return pick;
        },

        showBanner: function (msg) {
            const el = document.getElementById('demon-strike-banner');
            if (el) {
                el.textContent = msg;
                el.style.display = 'block';
                clearTimeout(el._t);
                el._t = setTimeout(() => { el.style.display = 'none'; }, 3600);
            } else if (typeof window.showToast === 'function') {
                window.showToast(msg, 'warn', 3200);
            }
        },

        openManagerModal: function () {
            this.injectUI();
            this.renderManagerList();
            const m = document.getElementById('demon-manager-modal-v2');
            if (m) m.style.display = 'flex';
        },

        closeManagerModal: function () {
            const m = document.getElementById('demon-manager-modal-v2');
            if (m) m.style.display = 'none';
            this.renderRoster();
        },

        openPunishModal: function (idx) {
            this.selectedPunishIdx = idx;
            const d = this.students[idx];
            if (!d) return;
            const titleEl = document.getElementById('demon-punish-target-v2');
            if (titleEl) titleEl.textContent = `⚡ Phạt nhanh: ${d.name} (${d.score} Xu)`;
            const m = document.getElementById('demon-punish-modal-v2');
            if (m) m.style.display = 'flex';
        },

        closePunishModal: function () {
            const m = document.getElementById('demon-punish-modal-v2');
            if (m) m.style.display = 'none';
        },

        renderManagerList: function () {
            const listEl = document.getElementById('demon-vertical-list-v2');
            if (!listEl) return;
            if (!this.allClassStudents.length) {
                listEl.innerHTML = '<div style="padding:14px;color:#94a3b8;text-align:center;">Chưa có danh sách học sinh.</div>';
                return;
            }
            listEl.innerHTML = this.allClassStudents.map((name, idx) => {
                const rec = this.students.find(d => d.name === name);
                const isDem = !!rec;
                const esc = s => String(s).replace(/'/g, "\\'");
                return `
                    <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-radius:10px;margin-bottom:6px;background:${isDem ? '#3b0764' : '#1e293b'};color:#f8fafc;">
                        <span>${idx + 1}. ${isDem ? '😈 ' : ''}${name}${isDem ? ` (${rec.score} Xu)` : ''}</span>
                        <button type="button" onclick="DemonMode.${isDem ? 'removeStudent' : 'addStudent'}('${esc(name)}');DemonMode.renderManagerList();" style="border:none;border-radius:8px;padding:6px 10px;font-weight:800;cursor:pointer;background:${isDem ? '#ef4444' : '#9333ea'};color:#fff;">
                            ${isDem ? '✕ Xóa khỏi Quỷ' : '+ Thêm vào Quỷ'}
                        </button>
                    </div>`;
            }).join('');
        },

        renderRoster: function () {
            const box = document.getElementById('demon-roster-v2');
            if (!box) return;
            if (!this.students.length) {
                box.innerHTML = '<div style="font-size:12px;color:#cbd5e1;">Chưa có học sinh trong Phe Quỷ.</div>';
                return;
            }
            box.innerHTML = this.students.map((d, i) => {
                const isSlime = d.status === 'slime';
                const esc = s => String(s).replace(/'/g, "\\'");
                return `
                    <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;padding:6px 8px;border-radius:8px;background:${isSlime ? '#064e3b' : '#2e1065'};color:#fff;margin-bottom:6px;font-size:13px;">
                        <span>${isSlime ? '🟢' : '😈'} <b>${d.name}</b> ${isSlime ? '🔇' : `(${d.score} Xu)`}</span>
                        <span style="display:flex;gap:4px;">
                            ${!isSlime ? `<button type="button" onclick="DemonMode.openPunishModal(${i})" style="padding:3px 6px;border:none;border-radius:6px;background:#f59e0b;color:#fff;cursor:pointer;" title="Phạt nhanh">⚡</button>` : ''}
                            ${!isSlime ? `<button type="button" onclick="DemonMode.explodeStudent(${i})" style="padding:3px 6px;border:none;border-radius:6px;background:#dc2626;color:#fff;cursor:pointer;" title="Nổ tung">💥</button>` : ''}
                            <button type="button" onclick="DemonMode.pardonStudent('${esc(d.name)}')" style="padding:3px 6px;border:none;border-radius:6px;background:#10b981;color:#fff;cursor:pointer;" title="Ân xá / Trả về">🕊️</button>
                        </span>
                    </div>`;
            }).join('');
        },

        injectUI: function () {
            if (this.hasCustomInlineUI() || document.getElementById('demon-mode-root')) return;
            const root = document.createElement('div');
            root.id = 'demon-mode-root';
            root.innerHTML = `
                <div id="demon-strike-banner" style="display:none;position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:9999999;background:linear-gradient(135deg,#991b1b,#581c87);color:#fff;padding:12px 24px;border-radius:14px;font-weight:900;box-shadow:0 12px 30px rgba(0,0,0,0.4);"></div>
                <div id="demon-panel-v2" style="position:fixed;bottom:14px;right:14px;z-index:99990;width:300px;background:#0f172a;border:2px solid #9333ea;border-radius:14px;padding:10px;color:#fff;box-shadow:0 12px 30px rgba(0,0,0,0.35);">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                        <strong style="color:#e9d5ff;">😈 Phe Quỷ (Bất Công)</strong>
                        <span style="display:flex;gap:4px;">
                            <button type="button" onclick="DemonMode.rollGacha()" title="Bốc thăm ngẫu nhiên Phe Quỷ" style="border:none;border-radius:8px;padding:4px 8px;background:#7e22ce;color:#fff;cursor:pointer;font-weight:800;">🎲</button>
                            <button type="button" onclick="DemonMode.openManagerModal()" style="border:none;border-radius:8px;padding:4px 8px;background:#334155;color:#fff;cursor:pointer;font-weight:800;">😈 Quản lí</button>
                        </span>
                    </div>
                    <div id="demon-roster-v2"></div>
                </div>
                <div id="demon-manager-modal-v2" style="display:none;position:fixed;inset:0;z-index:9999998;background:rgba(15,23,42,0.75);align-items:center;justify-content:center;">
                    <div style="background:#0f172a;border:2px solid #9333ea;border-radius:16px;padding:18px;width:min(520px,92vw);max-height:80vh;display:flex;flex-direction:column;color:#fff;">
                        <h3 style="margin:0 0 10px;">😈 Danh Sách Phe Quỷ</h3>
                        <div id="demon-vertical-list-v2" style="overflow-y:auto;flex:1;"></div>
                        <button type="button" onclick="DemonMode.closeManagerModal()" style="margin-top:12px;padding:10px;border:none;border-radius:10px;background:#10b981;color:#fff;font-weight:900;cursor:pointer;">✅ Xong</button>
                    </div>
                </div>
                <div id="demon-punish-modal-v2" style="display:none;position:fixed;inset:0;z-index:9999999;background:rgba(15,23,42,0.75);align-items:center;justify-content:center;">
                    <div style="background:#1e1b4b;border:2px solid #f59e0b;border-radius:16px;padding:18px;width:min(420px,90vw);color:#fff;display:flex;flex-direction:column;gap:8px;">
                        <strong id="demon-punish-target-v2">⚡ Phạt nhanh</strong>
                        <button type="button" onclick="DemonMode.punishStudent(DemonMode.selectedPunishIdx,100,'Mất trật tự')" style="padding:10px;border:none;border-radius:8px;background:#d97706;color:#fff;font-weight:800;cursor:pointer;">🗣️ Mất trật tự / Nói leo: -100 Xu</button>
                        <button type="button" onclick="DemonMode.punishStudent(DemonMode.selectedPunishIdx,100,'Không chép bài')" style="padding:10px;border:none;border-radius:8px;background:#ea580c;color:#fff;font-weight:800;cursor:pointer;">✍️ Không chép bài / Ngồi chơi: -100 Xu</button>
                        <button type="button" onclick="DemonMode.punishStudent(DemonMode.selectedPunishIdx,150,'Quậy phá')" style="padding:10px;border:none;border-radius:8px;background:#dc2626;color:#fff;font-weight:800;cursor:pointer;">🤡 Cố tình quậy phá: -150 Xu</button>
                        <button type="button" onclick="DemonMode.closePunishModal()" style="padding:8px;border:none;border-radius:8px;background:#475569;color:#fff;cursor:pointer;">Đóng</button>
                    </div>
                </div>`;
            document.body.appendChild(root);
        },

        exportCsvSection: function () {
            if (!this.isActive || !this.students.length) return null;
            const rows = this.students.map((d, i) => ({
                'STT': i + 1,
                'Họ và Tên': d.name,
                'Điểm Cá Nhân (Xu)': d.score,
                'Số Lần Vi Phạm': d.violations,
                'Trạng Thái': d.status === 'slime' ? 'Slime Câm Lặng (Nổ tung)' : 'Đang trong Phe Quỷ',
                'Đánh Giá TT27': (d.status === 'slime' || d.score < 800 || d.violations >= 2) ? 'C' : 'H'
            }));
            return ['THEO DÕI KỶ LUẬT PHE QUỶ', rows];
        }
    };

    window.DemonMode = DemonMode;

    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.altKey && (e.key === 'd' || e.key === 'D')) {
            if (isGrade5Page(DemonMode.options)) {
                DemonMode.enable();
            }
        }
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => DemonMode.init());
    } else {
        DemonMode.init();
    }
})(window, document);
