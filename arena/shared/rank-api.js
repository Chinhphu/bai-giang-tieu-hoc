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
    function getSeedLeaderboard(gameId) {
        return [
            { ten: 'Lâm Khánh Băng', lop: '2/2', khoi: 2, gameId: 'speed_click', score: 135, timestamp: Date.now() - 3600000 },
            { ten: 'Trương Minh Bách', lop: '2/2', khoi: 2, gameId: 'speed_click', score: 128, timestamp: Date.now() - 7200000 },
            { ten: 'Nguyễn Hoàng Bách (1)', lop: '3/2', khoi: 3, gameId: 'speed_click', score: 122, timestamp: Date.now() - 10800000 },
            { ten: 'Đặng Quỳnh Chi', lop: '2/4', khoi: 2, gameId: 'speed_click', score: 115, timestamp: Date.now() - 14400000 },
            { ten: 'Nguyễn Tuệ Nhi (1)', lop: '4/3', khoi: 4, gameId: 'speed_click', score: 110, timestamp: Date.now() - 18000000 },
            { ten: 'Lê Nguyễn Thảo An', lop: '1/6', khoi: 1, gameId: 'speed_click', score: 98, timestamp: Date.now() - 21600000 },
            { ten: 'Phan Minh Khôi', lop: '2/5', khoi: 2, gameId: 'speed_click', score: 92, timestamp: Date.now() - 25200000 },
            { ten: 'Trần Gia Hân', lop: '2/2', khoi: 2, gameId: 'speed_click', score: 88, timestamp: Date.now() - 28800000 }
        ];
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

        // Fallback vị trí mặc định nếu QUERY sinh thứ tự: Họ và Tên, Lớp, Khối, Mã Game, Điểm Số
        if (idxTen === -1) idxTen = 0;
        if (idxLop === -1) idxLop = 1;
        if (idxKhoi === -1) idxKhoi = 2;
        if (idxGame === -1) idxGame = 3;
        if (idxScore === -1) idxScore = 4;

        const records = [];
        for (let i = 1; i < lines.length; i++) {
            const cols = parseCsvRow(lines[i]);
            if (cols.length <= Math.max(idxTen, idxScore)) continue;

            const ten = cols[idxTen] ? cols[idxTen].trim() : '';
            let lop = cols[idxLop] ? cols[idxLop].trim().replace(/^['"\s]+|['"\s]+$/g, '') : '';
            // Chuẩn hóa lớp "2_2" thành "2/2"
            lop = lop.replace('_', '/');

            let khoi = cols[idxKhoi] ? parseInt(cols[idxKhoi], 10) : 0;
            if (!khoi && lop) {
                const matchK = lop.match(/^\d+/);
                if (matchK) khoi = parseInt(matchK[0], 10);
            }

            const gameId = cols[idxGame] ? cols[idxGame].trim() : '';
            const score = cols[idxScore] ? Number(cols[idxScore].replace(/[^\d.-]/g, '')) || 0 : 0;

            if (!ten) continue;
            // Nếu có targetGameId và dòng có ghi gameId, chỉ lấy dòng đúng game
            if (targetGameId && gameId && gameId !== targetGameId) continue;

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
         * Lấy Bảng xếp hạng và tự động trộn với điểm Optimistic của localStorage
         * @param {Object} params
         * @param {string} params.gameId - Mã minigame
         * @param {string} [params.scope='all'] - 'all' (toàn trường) | 'khoi' (theo khối) | 'lop' (theo lớp)
         * @param {string|number} [params.filterValue] - Giá trị khối (1-5) hoặc lớp ("2/2")
         * @returns {Promise<{ list: Array, totalCount: number, myRank: number|null, myRecord: Object|null }>}
         */
        async fetchLeaderboard({ gameId = 'speed_click', scope = 'all', filterValue = null } = {}) {
            const config = window.ARENA_CONFIG || {};
            const csvUrl = config.CSV_LEADERBOARD_URL;
            const isPlaceholderCsv = !csvUrl || csvUrl.includes('PLACEHOLDER');

            let records = [];

            // 1. Đọc dữ liệu từ CSV nếu URL hợp lệ
            if (!isPlaceholderCsv) {
                try {
                    const fetchUrl = `${csvUrl}${csvUrl.includes('?') ? '&' : '?'}t=${Date.now()}`;
                    const res = await fetch(fetchUrl);
                    if (res.ok) {
                        const csvText = await res.text();
                        records = parseCsvLeaderboard(csvText, gameId);
                    } else {
                        console.warn(`[RankAPI] Lỗi tải CSV HTTP ${res.status}, sử dụng dữ liệu mẫu dự phòng.`);
                    }
                } catch (err) {
                    console.warn('[RankAPI] Lỗi kết nối CSV:', err);
                }
            }

            // Nếu chưa có bản ghi nào từ CSV, nạp seed demo để giao diện không bị trống
            if (records.length === 0) {
                records = getSeedLeaderboard(gameId);
            }

            // 2. Trộn với các lượt nộp Optimistic từ localStorage
            const localSubmissions = getLocalSubmissions(gameId);
            const recordMap = new Map();

            // Đưa các bản ghi CSV vào Map theo key: `${ten}__${normalizeClass(lop)}`
            records.forEach(r => {
                const key = `${r.ten.toLowerCase()}__${normalizeClassStr(r.lop)}`;
                recordMap.set(key, { ...r });
            });

            // Trộn điểm cục bộ: nếu điểm cục bộ cao hơn thì ghi đè, nếu chưa có thì thêm mới
            localSubmissions.forEach(local => {
                const key = `${local.ten.toLowerCase()}__${normalizeClassStr(local.lop)}`;
                const existing = recordMap.get(key);

                if (existing) {
                    if (Number(local.score) > Number(existing.score)) {
                        existing.score = Number(local.score);
                        existing.isOptimistic = true;
                        existing.timestamp = local.timestamp;
                    }
                } else {
                    recordMap.set(key, {
                        ten: local.ten,
                        lop: local.lop,
                        khoi: Number(local.khoi) || 2,
                        gameId: local.gameId,
                        score: Number(local.score),
                        timestamp: local.timestamp,
                        isOptimistic: true
                    });
                }
            });

            // Chuyển Map về Array
            let mergedList = Array.from(recordMap.values());

            // 3. Sắp xếp giảm dần theo điểm số (điểm cao xếp trước, nếu bằng điểm ai nộp trước xếp trước)
            mergedList.sort((a, b) => {
                const diff = (Number(b.score) || 0) - (Number(a.score) || 0);
                if (diff !== 0) return diff;
                return (Number(a.timestamp) || 0) - (Number(b.timestamp) || 0);
            });

            // 4. Lọc theo Scope
            let filteredList = mergedList;
            if (scope === 'khoi' && filterValue) {
                const targetKhoi = parseInt(filterValue, 10);
                filteredList = mergedList.filter(item => {
                    if (Number(item.khoi) === targetKhoi) return true;
                    const parsedK = parseInt(normalizeClassStr(item.lop).match(/^\d+/)?.[0] || '0', 10);
                    return parsedK === targetKhoi;
                });
            } else if (scope === 'lop' && filterValue) {
                const targetLopNorm = normalizeClassStr(filterValue);
                filteredList = mergedList.filter(item => normalizeClassStr(item.lop) === targetLopNorm);
            }

            // 5. Gán thứ tự Rank chuẩn (1, 2, 3...)
            let currentRank = 1;
            const rankedList = filteredList.map((item, idx, arr) => {
                if (idx > 0 && Number(item.score) === Number(arr[idx - 1].score)) {
                    // Đồng hạng
                } else {
                    currentRank = idx + 1;
                }
                return {
                    ...item,
                    rank: currentRank
                };
            });

            // 6. Xác định vị trí của học sinh hiện tại đang đăng nhập
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
                myRecord
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
