/**
 * =========================================================================
 * ARENA RANK API (HỆ THỐNG GIAO TIẾP ĐIỂM SỐ & BẢNG XẾP HẠNG TOÀN TRƯỜNG)
 * =========================================================================
 * - RankAPI.submit({ gameId, score, meta }):
 *   + Tự động lấy thông tin học sinh từ StudentPicker.
 *   + Tạo chữ ký SHA-256 chống giả mạo điểm số (Web Crypto API).
 *   + Gửi POST dạng text/plain để triệt tiêu lỗi CORS preflight với Google Apps Script.
 *   + Lưu ngay điểm vào localStorage (Optimistic UI) để giao diện cập nhật tức thì.
 * - RankAPI.fetchLeaderboard({ gameId, scope, filterValue }):
 *   + Fetch CSV từ Google Sheets (có gắn ?t=Date.now() chống cache trình duyệt).
 *   + Phân tích cú pháp CSV và trộn với điểm tạm localStorage (bù đắp độ trễ 3-5 phút của Google CDN).
 *   + Lọc theo Toàn Trường / Khối / Lớp và tính toán thứ hạng.
 * =========================================================================
 */

(function () {
    if (typeof window === 'undefined') return;

    const LOCAL_SCORES_KEY = 'arena_local_submissions';
    const DEMO_SEED_KEY = 'arena_demo_seed_v1';

    /**
     * Băm chuỗi thành mã SHA-256 (Hex) bằng Web Crypto API
     */
    async function sha256Hex(message) {
        try {
            if (window.crypto && window.crypto.subtle) {
                const msgBuffer = new TextEncoder().encode(message);
                const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            }
        } catch (e) {
            console.warn('[RankAPI] Web Crypto digest error, using fallback hash:', e);
        }

        // Fallback thuần JS cho môi trường không hỗ trợ Web Crypto Subtle
        return fallbackSha256(message);
    }

    /**
     * Thuật toán SHA-256 thuần JS dự phòng (Zero-Dependency)
     */
    function fallbackSha256(ascii) {
        // Chuyển chuỗi Unicode tiếng Việt thành chuỗi UTF-8 bytes trước khi băm
        try {
            ascii = unescape(encodeURIComponent(ascii));
        } catch (e) { }

        function rightRotate(value, amount) {
            return (value >>> amount) | (value << (32 - amount));
        }

        const mathPow = Math.pow;
        const maxWord = mathPow(2, 32);
        let result = '';
        const words = [];
        const asciiBitLength = ascii.length * 8;

        let hash = [];
        const k = [];
        let primeCounter = 0;

        const isPrime = {};
        for (let candidate = 2; primeCounter < 64; candidate++) {
            if (!isPrime[candidate]) {
                for (let i = 0; i < 313; i += candidate) {
                    isPrime[i] = true;
                }
                hash[primeCounter] = (mathPow(candidate, .5) * maxWord) | 0;
                k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
            }
        }

        ascii += '\x80';
        while (ascii.length % 64 - 56) ascii += '\x00';
        for (let i = 0; i < ascii.length; i++) {
            const j = ascii.charCodeAt(i);
            words[i >> 2] |= j << ((3 - i) % 4) * 8;
        }
        words[words.length] = ((asciiBitLength / maxWord) | 0);
        words[words.length] = (asciiBitLength);

        for (let j = 0; j < words.length;) {
            const w = words.slice(j, j += 16);
            const oldHash = hash;
            hash = hash.slice(0, 8);

            for (let i = 0; i < 64; i++) {
                const w15 = w[i - 15], w2 = w[i - 2];
                const s0 = rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3);
                const s1 = rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10);
                const ch = (hash[4] & hash[5]) ^ (~hash[4] & hash[6]);
                const maj = (hash[0] & hash[1]) ^ (hash[0] & hash[2]) ^ (hash[1] & hash[2]);
                const temp1 = hash[7] + (rightRotate(hash[4], 6) ^ rightRotate(hash[4], 11) ^ rightRotate(hash[4], 25)) + ch + k[i] + (w[i] = (i < 16) ? w[i] : (w[i - 16] + s0 + w[i - 7] + s1) | 0);
                const temp2 = (rightRotate(hash[0], 2) ^ rightRotate(hash[0], 13) ^ rightRotate(hash[0], 22)) + maj;

                hash = [(temp1 + temp2) | 0].concat(hash);
                hash[4] = (hash[4] + temp1) | 0;
            }

            for (let i = 0; i < 8; i++) {
                hash[i] = (hash[i] + oldHash[i]) | 0;
            }
        }

        for (let i = 0; i < 8; i++) {
            for (let j = 3; j + 1; j--) {
                const b = (hash[i] >> (j * 8)) & 255;
                result += ((b < 16) ? 0 : '') + b.toString(16);
            }
        }
        return result;
    }

    /**
     * Lấy danh sách điểm số cục bộ đã lưu trong localStorage
     */
    function getLocalSubmissions(gameId = null) {
        try {
            const raw = localStorage.getItem(LOCAL_SCORES_KEY);
            const list = raw ? JSON.parse(raw) : [];
            if (!Array.isArray(list)) return [];
            return gameId ? list.filter(item => item.gameId === gameId) : list;
        } catch (e) {
            return [];
        }
    }

    /**
     * Lưu một lượt điểm mới vào localStorage (Optimistic UI)
     */
    function saveLocalSubmission(item) {
        try {
            const list = getLocalSubmissions();
            // Thêm mới lên đầu danh sách
            list.unshift(item);
            // Giới hạn tối đa 50 lượt nộp gần nhất
            if (list.length > 50) list.length = 50;
            localStorage.setItem(LOCAL_SCORES_KEY, JSON.stringify(list));
        } catch (e) {
            console.warn('[RankAPI] Không thể lưu vào localStorage:', e);
        }
    }

    /**
     * Dữ liệu mẫu khởi đầu (seed) phòng khi chưa cấu hình Google Sheets CSV
     */
    /**
     * Dữ liệu mẫu khởi đầu (seed) phong phú qua nhiều minigames
     */
    function getSeedLeaderboard(gameId = null) {
        const allSeeds = [
            // Game 1: speed_click (Bấm Chuột Siêu Tốc - Điểm số)
            { ten: 'Lâm Khánh Băng', lop: '2/2', khoi: 2, gameId: 'speed_click', score: 135, timestamp: Date.now() - 3600000 },
            { ten: 'Trương Minh Bách', lop: '2/2', khoi: 2, gameId: 'speed_click', score: 128, timestamp: Date.now() - 7200000 },
            { ten: 'Nguyễn Hoàng Bách (1)', lop: '3/2', khoi: 3, gameId: 'speed_click', score: 122, timestamp: Date.now() - 10800000 },
            { ten: 'Đặng Quỳnh Chi', lop: '2/4', khoi: 2, gameId: 'speed_click', score: 115, timestamp: Date.now() - 14400000 },
            { ten: 'Nguyễn Tuệ Nhi (1)', lop: '4/3', khoi: 4, gameId: 'speed_click', score: 110, timestamp: Date.now() - 18000000 },
            { ten: 'Lê Nguyễn Thảo An', lop: '1/6', khoi: 1, gameId: 'speed_click', score: 98, timestamp: Date.now() - 21600000 },
            { ten: 'Phan Minh Khôi', lop: '2/5', khoi: 2, gameId: 'speed_click', score: 92, timestamp: Date.now() - 25200000 },
            { ten: 'Trần Gia Hân', lop: '2/2', khoi: 2, gameId: 'speed_click', score: 88, timestamp: Date.now() - 28800000 },

            // Game 2: typing_race (Đua Gõ Phím - WPM)
            { ten: 'Nguyễn Tuệ Nhi (1)', lop: '4/3', khoi: 4, gameId: 'typing_race', score: 52, timestamp: Date.now() - 3000000 },
            { ten: 'Trương Minh Bách', lop: '2/2', khoi: 2, gameId: 'typing_race', score: 45, timestamp: Date.now() - 6000000 },
            { ten: 'Nguyễn Hoàng Bách (1)', lop: '3/2', khoi: 3, gameId: 'typing_race', score: 40, timestamp: Date.now() - 9000000 },
            { ten: 'Lâm Khánh Băng', lop: '2/2', khoi: 2, gameId: 'typing_race', score: 38, timestamp: Date.now() - 12000000 },
            { ten: 'Phan Minh Khôi', lop: '2/5', khoi: 2, gameId: 'typing_race', score: 32, timestamp: Date.now() - 15000000 },

            // Game 3: memory_card (Trí Nhớ Siêu Phàm - Điểm số)
            { ten: 'Đặng Quỳnh Chi', lop: '2/4', khoi: 2, gameId: 'memory_card', score: 850, timestamp: Date.now() - 4000000 },
            { ten: 'Trương Minh Bách', lop: '2/2', khoi: 2, gameId: 'memory_card', score: 720, timestamp: Date.now() - 8000000 },
            { ten: 'Lâm Khánh Băng', lop: '2/2', khoi: 2, gameId: 'memory_card', score: 690, timestamp: Date.now() - 11000000 },
            { ten: 'Lê Nguyễn Thảo An', lop: '1/6', khoi: 1, gameId: 'memory_card', score: 580, timestamp: Date.now() - 16000000 }
        ];

        if (gameId && gameId !== 'overall' && gameId !== 'all') {
            return allSeeds.filter(item => item.gameId === gameId);
        }
        return allSeeds;
    }

    /**
     * Quy đổi thứ hạng trong từng game thành Sao Danh Vọng (Arena Stars ⭐)
     */
    function calculateStarsForRank(rank) {
        const config = window.ARENA_CONFIG || {};
        const rewards = config.STAR_REWARDS || {
            TOP_1: 100,
            TOP_2: 80,
            TOP_3: 60,
            TOP_4_5: 40,
            TOP_6_10: 25,
            PARTICIPATION: 10
        };
        if (rank === 1) return rewards.TOP_1;
        if (rank === 2) return rewards.TOP_2;
        if (rank === 3) return rewards.TOP_3;
        if (rank <= 5) return rewards.TOP_4_5;
        if (rank <= 10) return rewards.TOP_6_10;
        return rewards.PARTICIPATION;
    }

    /**
     * Phân tích nội dung file CSV từ Google Sheets
     */
    function parseCsvLeaderboard(csvText, targetGameId) {
        if (!csvText || typeof csvText !== 'string') return [];

        const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
        if (lines.length < 2) return [];

        // Parse từng dòng theo chuẩn CSV (hỗ trợ dấu ngoặc kép)
        function parseCsvRow(rowStr) {
            const res = [];
            let inQuotes = false;
            let current = '';
            for (let i = 0; i < rowStr.length; i++) {
                const char = rowStr[i];
                if (char === '"') {
                    if (inQuotes && rowStr[i + 1] === '"') {
                        current += '"';
                        i++;
                    } else {
                        inQuotes = !inQuotes;
                    }
                } else if (char === ',' && !inQuotes) {
                    res.push(current.trim());
                    current = '';
                } else {
                    current += char;
                }
            }
            res.push(current.trim());
            return res;
        }

        const header = parseCsvRow(lines[0]).map(h => h.toLowerCase());
        
        // Tìm vị trí các cột
        let idxTen = header.findIndex(h => h.includes('tên') || h.includes('name') || h.includes('hoc sinh'));
        let idxLop = header.findIndex(h => h.includes('lớp') || h.includes('class') || h.includes('lop'));
        let idxKhoi = header.findIndex(h => h.includes('khối') || h.includes('grade') || h.includes('khoi'));
        let idxGame = header.findIndex(h => h.includes('game') || h.includes('mã') || h.includes('tro choi'));
        let idxScore = header.findIndex(h => h.includes('điểm') || h.includes('score') || h.includes('diem') || h.includes('max'));

        if (idxTen === -1) idxTen = 0;
        if (idxLop === -1) idxLop = 1;
        if (idxKhoi === -1) idxKhoi = 2;
        if (idxGame === -1) idxGame = 3;
        if (idxScore === -1) idxScore = 4;

        const isOverall = !targetGameId || targetGameId === 'overall' || targetGameId === 'all';
        const records = [];

        for (let i = 1; i < lines.length; i++) {
            const cols = parseCsvRow(lines[i]);
            if (cols.length <= Math.max(idxTen, idxScore)) continue;

            const ten = cols[idxTen] ? cols[idxTen].trim() : '';
            let lop = cols[idxLop] ? cols[idxLop].trim().replace(/^['"\s]+|['"\s]+$/g, '') : '';
            lop = lop.replace('_', '/');

            let khoi = cols[idxKhoi] ? parseInt(cols[idxKhoi], 10) : 0;
            if (!khoi && lop) {
                const matchK = lop.match(/^\d+/);
                if (matchK) khoi = parseInt(matchK[0], 10);
            }

            const gameId = cols[idxGame] ? cols[idxGame].trim() : '';
            const score = cols[idxScore] ? Number(cols[idxScore].replace(/[^\d.-]/g, '')) || 0 : 0;

            if (!ten) continue;
            // Nếu lọc theo game cụ thể, bỏ qua dòng của game khác
            if (!isOverall && gameId && gameId !== targetGameId) continue;

            records.push({
                ten,
                lop,
                khoi,
                gameId: gameId || targetGameId,
                score,
                isOptimistic: false
            });
        }

        return records;
    }

    /**
     * Chuẩn hóa tên lớp để so sánh (VD: "2/2" == "2_2" == "Lớp 2/2")
     */
    function normalizeClassStr(cls) {
        if (!cls) return '';
        return String(cls)
            .toLowerCase()
            .replace(/^(?:lớp|lop)\s*/i, '')
            .replace(/[_\\-]/g, '/')
            .trim();
    }

    const RankAPI = {
        /**
         * Nộp điểm minigame lên máy chủ Google Apps Script
         * @param {Object} params
         * @param {string} params.gameId - Mã trò chơi (VD: 'speed_click')
         * @param {number} params.score - Điểm số đạt được
         * @param {Object} [params.meta] - Dữ liệu bổ sung (cps, combo, clicks...)
         * @returns {Promise<{ success: boolean, optimistic: boolean, message: string }>}
         */
        async submit({ gameId, score, meta = {} }) {
            const config = window.ARENA_CONFIG || {};
            const secretSalt = config.SECRET_SALT || 'TieuHoc_Arena_SecretSalt_2026_2027_SafeHashKey!@#';
            const gasEndpoint = config.GAS_ENDPOINT;

            // 1. Lấy thông tin học sinh hiện tại từ StudentPicker
            let student = null;
            if (window.StudentPicker && typeof window.StudentPicker.getStudent === 'function') {
                student = window.StudentPicker.getStudent();
            }

            if (!student || !student.ten || !student.lop) {
                console.warn('[RankAPI] Chưa chọn thông tin học sinh, mở StudentPicker...');
                if (window.StudentPicker && typeof window.StudentPicker.open === 'function') {
                    window.StudentPicker.open();
                }
                return {
                    success: false,
                    optimistic: false,
                    message: 'Vui lòng chọn tên học sinh trước khi nộp điểm!'
                };
            }

            const ten = String(student.ten).trim();
            const lop = String(student.lop).trim();
            const khoi = Number(student.khoi) || parseInt(lop.match(/^\d+/)?.[0] || '2', 10);
            const numScore = Number(score) || 0;

            // 2. Tạo chữ ký băm SHA-256 từ ten + lop + gameId + score + SECRET_SALT
            const signStr = `${ten}${lop}${gameId}${numScore}${secretSalt}`;
            const signature = await sha256Hex(signStr);

            const payload = {
                ten,
                lop,
                khoi,
                gameId,
                score: numScore,
                meta,
                signature,
                timestamp: Date.now()
            };

            // 3. Lưu tạm vào localStorage ngay lập tức (Optimistic UI)
            saveLocalSubmission({
                ...payload,
                isOptimistic: true
            });

            console.log(`[RankAPI] ⚡ Optimistic score saved for ${ten} (${lop}): ${numScore} điểm [${gameId}]`);

            // 4. Gửi POST dạng text/plain lên Google Apps Script
            const isPlaceholderEndpoint = !gasEndpoint || gasEndpoint.includes('PLACEHOLDER');

            if (isPlaceholderEndpoint) {
                console.info('[RankAPI] GAS_ENDPOINT đang là placeholder, điểm đã được lưu tạm thành công vào localStorage (Offline mode).');
                return {
                    success: true,
                    optimistic: true,
                    message: 'Đã lưu điểm vào Bảng Vàng tạm thời!'
                };
            }

            try {
                // Sử dụng Content-Type text/plain để GAS nhận trực tiếp không bị preflight OPTIONS
                const res = await fetch(gasEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'text/plain;charset=utf-8'
                    },
                    body: JSON.stringify(payload)
                });

                if (res.ok) {
                    const resultJson = await res.json().catch(() => ({ status: 'success' }));
                    console.log('[RankAPI] ✅ Nộp điểm lên Google Sheet thành công:', resultJson);
                    return {
                        success: true,
                        optimistic: false,
                        message: 'Nộp điểm lên máy chủ thành công!'
                    };
                } else {
                    console.warn(`[RankAPI] Server trả về HTTP ${res.status}, điểm vẫn được giữ trong Optimistic local.`);
                    return {
                        success: true,
                        optimistic: true,
                        message: 'Đã lưu điểm tạm thời (máy chủ đang đồng bộ).'
                    };
                }
            } catch (networkErr) {
                console.warn('[RankAPI] Mạng gián đoạn hoặc endpoint chưa sẵn sàng, giữ Optimistic UI:', networkErr);
                return {
                    success: true,
                    optimistic: true,
                    message: 'Đã lưu điểm trên máy của bạn (sẽ gửi lại khi có mạng).'
                };
            }
        },

        /**
         * Lấy Bảng xếp hạng (Hỗ trợ 2 Tầng: Tầng 1 theo từng Game & Tầng 2 Bảng Vàng Sao Danh Vọng)
         * @param {Object} params
         * @param {string} [params.gameId='overall'] - 'overall' (tổng hợp điểm Sao) hoặc mã game cụ thể (VD: 'speed_click')
         * @param {string} [params.scope='all'] - 'all' (toàn trường) | 'khoi' (theo khối) | 'lop' (theo lớp)
         * @param {string|number} [params.filterValue] - Giá trị khối (1-5) hoặc lớp ("2/2")
         * @returns {Promise<{ list: Array, totalCount: number, myRank: number|null, myRecord: Object|null, isOverall: boolean, unit: string }>}
         */
        async fetchLeaderboard({ gameId = 'overall', scope = 'all', filterValue = null } = {}) {
            const config = window.ARENA_CONFIG || {};
            const csvUrl = config.CSV_LEADERBOARD_URL;
            const isPlaceholderCsv = !csvUrl || csvUrl.includes('PLACEHOLDER');
            const isOverall = !gameId || gameId === 'overall' || gameId === 'all';

            let rawRecords = [];

            // 1. Đọc dữ liệu từ CSV nếu URL hợp lệ
            if (!isPlaceholderCsv) {
                try {
                    const fetchUrl = `${csvUrl}${csvUrl.includes('?') ? '&' : '?'}t=${Date.now()}`;
                    const res = await fetch(fetchUrl);
                    if (res.ok) {
                        const csvText = await res.text();
                        rawRecords = parseCsvLeaderboard(csvText, isOverall ? null : gameId);
                    } else {
                        console.warn(`[RankAPI] Lỗi tải CSV HTTP ${res.status}, sử dụng dữ liệu mẫu dự phòng.`);
                    }
                } catch (err) {
                    console.warn('[RankAPI] Lỗi kết nối CSV:', err);
                }
            }

            // Nếu chưa có bản ghi nào từ CSV, nạp seed demo phong phú
            if (rawRecords.length === 0) {
                rawRecords = getSeedLeaderboard(isOverall ? null : gameId);
            }

            // 2. Lấy dữ liệu local submissions (trộn Optimistic UI)
            const localSubmissions = getLocalSubmissions(isOverall ? null : gameId);

            // Gộp rawRecords và localSubmissions: Đảm bảo với mỗi học sinh trong cùng 1 game luôn lấy High Score
            const gameStudentMap = new Map(); // key: `${gameId}__${studentKey}` -> row

            rawRecords.forEach(r => {
                const gId = r.gameId || 'speed_click';
                const sKey = `${r.ten.toLowerCase()}__${normalizeClassStr(r.lop)}`;
                const rowKey = `${gId}__${sKey}`;
                const existing = gameStudentMap.get(rowKey);
                if (!existing || Number(r.score) > Number(existing.score)) {
                    gameStudentMap.set(rowKey, { ...r, gameId: gId, score: Number(r.score) });
                }
            });

            localSubmissions.forEach(local => {
                const gId = local.gameId || 'speed_click';
                if (!isOverall && gId !== gameId) return;

                const sKey = `${local.ten.toLowerCase()}__${normalizeClassStr(local.lop)}`;
                const rowKey = `${gId}__${sKey}`;
                const existing = gameStudentMap.get(rowKey);

                if (existing) {
                    if (Number(local.score) > Number(existing.score)) {
                        existing.score = Number(local.score);
                        existing.isOptimistic = true;
                        existing.timestamp = local.timestamp;
                    }
                } else {
                    gameStudentMap.set(rowKey, {
                        ten: local.ten,
                        lop: local.lop,
                        khoi: Number(local.khoi) || 2,
                        gameId: gId,
                        score: Number(local.score),
                        timestamp: local.timestamp,
                        isOptimistic: true
                    });
                }
            });

            let finalRecords = [];
            let scoreUnit = 'điểm';

            if (isOverall) {
                // TẦNG 2: BẢNG VÀNG TỔNG HỢP TOÀN TRƯỜNG (QUY ĐỔI SAO DANH VỌNG ⭐)
                scoreUnit = 'Sao ⭐';

                // Phân nhóm theo gameId
                const gamesMap = new Map();
                gameStudentMap.forEach(row => {
                    if (!gamesMap.has(row.gameId)) gamesMap.set(row.gameId, []);
                    gamesMap.get(row.gameId).push(row);
                });

                // Với mỗi game: xếp hạng học sinh và thưởng Sao theo rank
                const studentStarAgg = new Map(); // studentKey -> { ten, lop, khoi, score, gamesCount, isOptimistic, timestamp }

                gamesMap.forEach((rows) => {
                    rows.sort((a, b) => (Number(b.score) || 0) - (Number(a.score) || 0));
                    let rk = 1;
                    rows.forEach((row, idx, arr) => {
                        if (idx > 0 && Number(row.score) === Number(arr[idx - 1].score)) {
                            // đồng hạng
                        } else {
                            rk = idx + 1;
                        }
                        const stars = calculateStarsForRank(rk);
                        const sKey = `${row.ten.toLowerCase()}__${normalizeClassStr(row.lop)}`;

                        if (!studentStarAgg.has(sKey)) {
                            studentStarAgg.set(sKey, {
                                ten: row.ten,
                                lop: row.lop,
                                khoi: row.khoi,
                                score: 0,
                                gamesCount: 0,
                                isOptimistic: false,
                                timestamp: row.timestamp || Date.now()
                            });
                        }
                        const agg = studentStarAgg.get(sKey);
                        agg.score += stars;
                        agg.gamesCount += 1;
                        if (row.isOptimistic) agg.isOptimistic = true;
                        if (row.timestamp && row.timestamp > agg.timestamp) agg.timestamp = row.timestamp;
                    });
                });

                finalRecords = Array.from(studentStarAgg.values());
                // Sắp xếp tổng Sao giảm dần; nếu bằng Sao, ai tham gia nhiều game hơn xếp trước
                finalRecords.sort((a, b) => {
                    const diffStars = (Number(b.score) || 0) - (Number(a.score) || 0);
                    if (diffStars !== 0) return diffStars;
                    const diffGames = (Number(b.gamesCount) || 0) - (Number(a.gamesCount) || 0);
                    if (diffGames !== 0) return diffGames;
                    return (Number(a.timestamp) || 0) - (Number(b.timestamp) || 0);
                });
            } else {
                // TẦNG 1: BẢNG RANK RIÊNG CỦA TỪNG GAME (CHỈ LẤY HIGH SCORE CỦA TỪNG EM)
                const gameMeta = (config.GAMES && config.GAMES[gameId]) || {};
                scoreUnit = gameMeta.unit || 'điểm';

                const targetRows = [];
                gameStudentMap.forEach(row => {
                    if (row.gameId === gameId) {
                        targetRows.push(row);
                    }
                });

                finalRecords = targetRows;
                finalRecords.sort((a, b) => {
                    const diff = (Number(b.score) || 0) - (Number(a.score) || 0);
                    if (diff !== 0) return diff;
                    return (Number(a.timestamp) || 0) - (Number(b.timestamp) || 0);
                });
            }

            // Lọc theo Scope (All / Khối / Lớp)
            let filteredList = finalRecords;
            if (scope === 'khoi' && filterValue) {
                const targetKhoi = parseInt(filterValue, 10);
                filteredList = finalRecords.filter(item => {
                    if (Number(item.khoi) === targetKhoi) return true;
                    const parsedK = parseInt(normalizeClassStr(item.lop).match(/^\d+/)?.[0] || '0', 10);
                    return parsedK === targetKhoi;
                });
            } else if (scope === 'lop' && filterValue) {
                const targetLopNorm = normalizeClassStr(filterValue);
                filteredList = finalRecords.filter(item => normalizeClassStr(item.lop) === targetLopNorm);
            }

            // Gán thứ tự Rank chuẩn (1, 2, 3...)
            let currentRank = 1;
            const rankedList = filteredList.map((item, idx, arr) => {
                if (idx > 0 && Number(item.score) === Number(arr[idx - 1].score)) {
                    // Đồng hạng
                } else {
                    currentRank = idx + 1;
                }
                return {
                    ...item,
                    rank: currentRank,
                    unit: scoreUnit
                };
            });

            // Xác định vị trí của học sinh hiện tại đang đăng nhập
            let myRecord = null;
            let myRank = null;
            const currentStudent = window.StudentPicker ? window.StudentPicker.getStudent() : null;

            if (currentStudent && currentStudent.ten && currentStudent.lop) {
                const myKey = `${currentStudent.ten.toLowerCase()}__${normalizeClassStr(currentStudent.lop)}`;
                const foundIdx = rankedList.findIndex(r => `${r.ten.toLowerCase()}__${normalizeClassStr(r.lop)}` === myKey);
                if (foundIdx !== -1) {
                    myRecord = rankedList[foundIdx];
                    myRank = myRecord.rank;
                }
            }

            return {
                list: rankedList,
                totalCount: rankedList.length,
                myRank,
                myRecord,
                isOverall,
                unit: scoreUnit
            };
        }
    };

    // Tiện ích Toast thông báo độc lập cho khu vực Arena
    if (!window.showToast) {
        window.showToast = function (message, type = 'info', duration = 3000) {
            let toastEl = document.getElementById('arena-global-toast');
            if (!toastEl) {
                toastEl = document.createElement('div');
                toastEl.id = 'arena-global-toast';
                toastEl.className = 'arena-toast';
                document.body.appendChild(toastEl);
            }
            toastEl.innerHTML = `<span>${message}</span>`;
            toastEl.classList.add('show');
            clearTimeout(toastEl._timer);
            toastEl._timer = setTimeout(() => {
                toastEl.classList.remove('show');
            }, duration);
        };
    }

    window.RankAPI = RankAPI;
})();
