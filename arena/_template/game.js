/**
 * =========================================================================
 * ARENA MINIGAME TEMPLATE - SPEED CLICKER (BẤM CHUỘT SIÊU TỐC)
 * =========================================================================
 * File mã nguồn mẫu hoàn chỉnh tích hợp 3 trụ cột:
 * 1. StudentPicker: Nhận diện học sinh đăng nhập.
 * 2. RankAPI.submit(): Tự động tạo chữ ký SHA-256 và nộp điểm Optimistic UI.
 * 3. RankBoard: Hiển thị bảng vinh danh toàn trường.
 * 
 * 💡 HƯỚNG DẪN NHÂN BẢN RA GAME MỚI:
 * 1. Copy toàn bộ thư mục _template/ thành tên thư mục game mới (VD: arena/ban-tao/).
 * 2. Đổi hằng số GAME_ID ở dòng dưới thành mã game mới (VD: 'apple_shooter').
 * 3. Tùy biến luật chơi và giao diện tương ứng!
 * =========================================================================
 */

(function () {
    // 1. MÃ TRÒ CHƠI BẮT BUỘC KHAI BÁO (BẮT BUỘC ĐỔI KHI TẠO GAME MỚI)
    const GAME_ID = 'speed_click';
    const GAME_DURATION_SEC = 15; // Thời lượng mỗi ván chơi (giây)

    // 2. BIẾN TRẠNG THÁI TRÒ CHƠI
    let score = 0;
    let clicks = 0;
    let combo = 1;
    let maxCombo = 1;
    let lastClickTime = 0;
    let timeLeft = GAME_DURATION_SEC;
    let timerInterval = null;
    let isPlaying = false;

    // 3. BỘ PHÁT ÂM THANH NỘI BỘ (WEB AUDIO API - ZERO MP3)
    let audioCtx = null;
    function getAudioContext() {
        if (!audioCtx) {
            const AudioClass = window.AudioContext || window.webkitAudioContext;
            if (AudioClass) audioCtx = new AudioClass();
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    function playSound(type = 'click') {
        try {
            const ctx = getAudioContext();
            if (!ctx) return;

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);

            const now = ctx.currentTime;

            if (type === 'click') {
                // Tiếng pop nảy nhẹ
                osc.type = 'sine';
                osc.frequency.setValueAtTime(440, now);
                osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
                gain.gain.setValueAtTime(0.3, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
                osc.start(now);
                osc.stop(now + 0.08);
            } else if (type === 'combo') {
                // Tiếng combo ngân vang vui tai
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(587.33, now); // D5
                osc.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5
                gain.gain.setValueAtTime(0.4, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
                osc.start(now);
                osc.stop(now + 0.15);
            } else if (type === 'finish') {
                // Hợp âm chiến thắng kết thúc
                [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
                    const o = ctx.createOscillator();
                    const g = ctx.createGain();
                    o.connect(g);
                    g.connect(ctx.destination);
                    o.type = 'sine';
                    o.frequency.value = freq;
                    g.gain.setValueAtTime(0, now + i * 0.08);
                    g.gain.linearRampToValueAtTime(0.2, now + i * 0.08 + 0.02);
                    g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.6);
                    o.start(now + i * 0.08);
                    o.stop(now + i * 0.08 + 0.6);
                });
            }
        } catch (e) {
            // Trình duyệt chặn audio
        }
    }

    // 4. CÁC PHẦN TỬ DOM TRÊN MÀN HÌNH
    const screenStart = document.getElementById('screen-start');
    const screenPlaying = document.getElementById('screen-playing');
    const screenResult = document.getElementById('screen-result');

    const btnStart = document.getElementById('btn-start');
    const btnClicker = document.getElementById('btn-clicker');
    const btnReplay = document.getElementById('btn-replay');
    const btnViewRank = document.getElementById('btn-view-rank');
    const btnOpenRankModal = document.getElementById('btn-open-rank-modal');
    const clickZone = document.getElementById('click-zone');

    const hudTimer = document.getElementById('hud-timer');
    const hudScore = document.getElementById('hud-score');
    const hudCombo = document.getElementById('hud-combo');
    const startHighScore = document.getElementById('start-high-score');

    const resultScore = document.getElementById('result-score');
    const resultCps = document.getElementById('result-cps');
    const resultCombo = document.getElementById('result-combo');
    const resultClicks = document.getElementById('result-clicks');

    /**
     * Lấy key lưu điểm kỷ lục cá nhân
     */
    function getPersonalHighScoreKey() {
        const student = window.StudentPicker ? window.StudentPicker.getStudent() : null;
        if (student && student.ten) {
            return `arena_high_${GAME_ID}_${student.ten}_${student.lop}`;
        }
        return `arena_high_${GAME_ID}_guest`;
    }

    /**
     * Cập nhật hiển thị kỷ lục cá nhân
     */
    function updateHighScoreDisplay() {
        const key = getPersonalHighScoreKey();
        const saved = parseInt(localStorage.getItem(key), 10) || 0;
        if (startHighScore) {
            startHighScore.textContent = saved.toLocaleString('vi-VN');
        }
    }

    /**
     * Hiệu ứng chữ điểm bay lên (+1, +2 COMBO!)
     */
    function spawnFloatPoint(text, x, y, isCombo = false) {
        if (!clickZone) return;
        const span = document.createElement('span');
        span.className = 'float-point';
        span.textContent = text;
        if (isCombo) {
            span.style.color = '#ef4444';
            span.style.fontSize = '2.2rem';
        }
        span.style.left = `${x}px`;
        span.style.top = `${y}px`;
        clickZone.appendChild(span);

        setTimeout(() => {
            if (span.parentNode) span.parentNode.removeChild(span);
        }, 650);
    }

    /**
     * Bắt đầu ván chơi
     */
    function startGame() {
        score = 0;
        clicks = 0;
        combo = 1;
        maxCombo = 1;
        lastClickTime = Date.now();
        timeLeft = GAME_DURATION_SEC;
        isPlaying = true;

        // Cập nhật UI
        hudScore.textContent = '0';
        hudCombo.textContent = 'x1';
        hudTimer.textContent = `${timeLeft.toFixed(1)}s`;

        screenStart.style.display = 'none';
        screenResult.style.display = 'none';
        screenPlaying.style.display = 'flex';

        // Đếm ngược thời gian
        const startTime = Date.now();
        const endTime = startTime + (GAME_DURATION_SEC * 1000);

        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            const now = Date.now();
            const remainMs = Math.max(0, endTime - now);
            timeLeft = remainMs / 1000;
            hudTimer.textContent = `${timeLeft.toFixed(1)}s`;

            if (remainMs <= 0) {
                clearInterval(timerInterval);
                finishGame();
            }
        }, 100);
    }

    /**
     * Xử lý mỗi lần bấm nút
     */
    function handleClick(e) {
        if (!isPlaying) return;

        const now = Date.now();
        const delta = now - lastClickTime;
        lastClickTime = now;
        clicks++;

        // Tính toán chuỗi combo (nếu bấm liên tục dưới 320ms -> tăng combo)
        if (delta < 320) {
            if (combo < 3) combo++;
        } else if (delta > 600) {
            combo = 1;
        }

        if (combo > maxCombo) maxCombo = combo;

        // Tính điểm cộng thêm theo hệ số combo
        const pointAdd = combo;
        score += pointAdd;

        hudScore.textContent = score.toLocaleString('vi-VN');
        hudCombo.textContent = `x${combo}`;

        // Phát âm thanh và hiệu ứng
        const isSuper = combo >= 3;
        playSound(isSuper ? 'combo' : 'click');

        // Tọa độ click
        let clientX = e.clientX;
        let clientY = e.clientY;
        if (!clientX && btnClicker) {
            const rect = btnClicker.getBoundingClientRect();
            clientX = rect.left + rect.width / 2;
            clientY = rect.top + rect.height / 2;
        }

        const rectZone = clickZone.getBoundingClientRect();
        const posX = clientX - rectZone.left;
        const posY = clientY - rectZone.top;

        const text = combo > 1 ? `+${pointAdd} COMBO x${combo}!` : `+${pointAdd}`;
        spawnFloatPoint(text, posX, posY, combo > 1);
    }

    /**
     * Kết thúc trò chơi & Nộp điểm
     */
    async function finishGame() {
        isPlaying = false;
        playSound('finish');

        const cps = (clicks / GAME_DURATION_SEC).toFixed(1);

        // Lưu điểm kỷ lục cá nhân
        const key = getPersonalHighScoreKey();
        const oldHigh = parseInt(localStorage.getItem(key), 10) || 0;
        if (score > oldHigh) {
            localStorage.setItem(key, String(score));
        }

        // Cập nhật kết quả lên màn hình
        resultScore.textContent = score.toLocaleString('vi-VN');
        resultCps.textContent = cps;
        resultCombo.textContent = `x${maxCombo}`;
        resultClicks.textContent = clicks;

        screenPlaying.style.display = 'none';
        screenResult.style.display = 'flex';

        // NỘP ĐIỂM TỰ ĐỘNG QUA RANK API
        if (window.RankAPI) {
            try {
                const res = await window.RankAPI.submit({
                    gameId: GAME_ID,
                    score: score,
                    meta: {
                        cps: Number(cps),
                        maxCombo: maxCombo,
                        clicks: clicks,
                        duration: GAME_DURATION_SEC
                    }
                });

                if (window.showToast) {
                    window.showToast(`🎉 ${res.message || 'Đã nộp điểm lên Bảng Vàng!'}`, 'success');
                }
            } catch (err) {
                console.warn('[Game] Nộp điểm thất bại:', err);
            }
        }
    }

    // 5. GẮN SỰ KIỆN NÚT BẤM
    if (btnStart) {
        btnStart.addEventListener('click', () => {
            // Kiểm tra thông tin học sinh trước khi chơi
            if (window.StudentPicker) {
                window.StudentPicker.ensureStudent(() => {
                    startGame();
                });
            } else {
                startGame();
            }
        });
    }

    if (btnClicker) {
        btnClicker.addEventListener('pointerdown', handleClick);
    }

    if (btnReplay) {
        btnReplay.addEventListener('click', () => {
            updateHighScoreDisplay();
            startGame();
        });
    }

    if (btnViewRank) {
        btnViewRank.addEventListener('click', () => {
            if (window.RankBoard) {
                window.RankBoard.showModal({
                    gameId: GAME_ID,
                    title: 'BẢNG VÀNG: BẤM CHUỘT SIÊU TỐC'
                });
            }
        });
    }

    if (btnOpenRankModal) {
        btnOpenRankModal.addEventListener('click', () => {
            if (window.RankBoard) {
                window.RankBoard.showModal({
                    gameId: GAME_ID,
                    title: 'BẢNG VÀNG: BẤM CHUỘT SIÊU TỐC'
                });
            }
        });
    }

    // Lắng nghe khi học sinh thay đổi thông tin để cập nhật kỷ lục
    if (window.StudentPicker) {
        window.StudentPicker.onStudentChange(() => {
            updateHighScoreDisplay();
        });
    }

    // Khởi tạo ban đầu
    updateHighScoreDisplay();
})();
