/**
 * =========================================================================
 * THƯ VIỆN MINH HỌA VECTOR SVG ĐA LỚP (100% OFFLINE CODE-GENERATED ART)
 * File: vn-illustrations.js
 * =========================================================================
 * Phong cách: Chibi-Anime Cel-Shaded & Art Deco (Reverse: 1999)
 * Giữ nguyên 100% API: window.VN_ART.{
 *   getIntroMemberSvg(role),
 *   getStageBgSvg(epId, phase, stageNum, endingKey),
 *   getHeroSvg(expr, accentColor, gender, variant, epId),
 *   getNpcSvg(epId, stageNum, stageTitle, topic),
 *   getPropSvg(epId, stageNum, origChoiceIdx, ch),
 *   getEndingEmblemSvg(endingKey),
 *   getSourceIconSvg(sourceType)
 * }
 * =========================================================================
 */
(function initVnVectorArt(window) {
    'use strict';

    let _uidCounter = 0;
    function uid(prefix) {
        _uidCounter = (_uidCounter + 1) % 100000;
        return `${prefix || 'vg'}_${_uidCounter}`;
    }

    function esc(str) {
        return String(str == null ? '' : str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    /* ---------------------------------------------------------------------
     * HELPER: MẮT ANIME CHIBI ĐA LỚP + MÁ HỒNG + MIỆNG BIỂU CẢM
     * --------------------------------------------------------------------- */
    function renderAnimeEyes(lx, rx, cy, expr, isGirl, irisTop, irisBot) {
        const iTop = irisTop || '#1e3a8a';
        const iBot = irisBot || '#38bdf8';
        const gL = uid('irL');
        const gR = uid('irR');

        const lashes = isGirl ? `
            <path d="M${lx - 9} ${cy - 4} L${lx - 14} ${cy - 8} M${lx - 6} ${cy - 7} L${lx - 10} ${cy - 11}" stroke="#1e1b4b" stroke-width="2.1" stroke-linecap="round"/>
            <path d="M${rx + 9} ${cy - 4} L${rx + 14} ${cy - 8} M${rx + 6} ${cy - 7} L${rx + 10} ${cy - 11}" stroke="#1e1b4b" stroke-width="2.1" stroke-linecap="round"/>` : '';

        if (expr === 'crying') {
            return `
                <path d="M${lx - 9} ${cy - 5} L${lx + 7} ${cy} L${lx - 9} ${cy + 5}" stroke="#1e1b4b" stroke-width="3.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M${rx + 9} ${cy - 5} L${rx - 7} ${cy} L${rx + 9} ${cy + 5}" stroke="#1e1b4b" stroke-width="3.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M${lx - 10} ${cy - 11} Q${lx - 2} ${cy - 8} ${lx + 6} ${cy - 13}" stroke="#3e2723" stroke-width="2.6" fill="none" stroke-linecap="round"/>
                <path d="M${rx + 10} ${cy - 11} Q${rx + 2} ${cy - 8} ${rx - 6} ${cy - 13}" stroke="#3e2723" stroke-width="2.6" fill="none" stroke-linecap="round"/>
                <path d="M${lx - 4} ${cy + 6} C${lx - 7} ${cy + 16} ${lx - 9} ${cy + 24} ${lx - 6} ${cy + 30}" stroke="#38bdf8" stroke-width="4.5" fill="none" stroke-linecap="round" opacity="0.88"/>
                <path d="M${rx + 4} ${cy + 6} C${rx + 7} ${cy + 16} ${rx + 9} ${cy + 24} ${rx + 6} ${cy + 30}" stroke="#38bdf8" stroke-width="4.5" fill="none" stroke-linecap="round" opacity="0.88"/>
                <circle cx="${lx - 6}" cy="${cy + 31}" r="3.2" fill="#bae6fd"/>
                <circle cx="${rx + 6}" cy="${cy + 31}" r="3.2" fill="#bae6fd"/>`;
        }

        const isSparkle = expr === 'sparkle';
        const isWorried = expr === 'worried';
        const browL = isWorried
            ? `<path d="M${lx - 10} ${cy - 11} Q${lx - 1} ${cy - 13} ${lx + 9} ${cy - 16}" stroke="#3e2723" stroke-width="2.8" fill="none" stroke-linecap="round"/>`
            : `<path d="M${lx - 10} ${cy - 14} Q${lx} ${cy - 18} ${lx + 9} ${cy - 14}" stroke="#3e2723" stroke-width="2.8" fill="none" stroke-linecap="round"/>`;
        const browR = isWorried
            ? `<path d="M${rx + 10} ${cy - 11} Q${rx + 1} ${cy - 13} ${rx - 9} ${cy - 16}" stroke="#3e2723" stroke-width="2.8" fill="none" stroke-linecap="round"/>`
            : `<path d="M${rx + 10} ${cy - 14} Q${rx} ${cy - 18} ${rx - 9} ${cy - 14}" stroke="#3e2723" stroke-width="2.8" fill="none" stroke-linecap="round"/>`;

        const starL = isSparkle
            ? `<path d="M${lx - 2.5} ${cy - 7} L${lx - 1.3} ${cy - 3.8} L${lx + 2} ${cy - 2.5} L${lx - 1.3} ${cy - 1.2} L${lx - 2.5} ${cy + 2} L${lx - 3.7} ${cy - 1.2} L${lx - 7} ${cy - 2.5} L${lx - 3.7} ${cy - 3.8} Z" fill="#fef08a"/>`
            : `<circle cx="${lx - 2.5}" cy="${cy - 3}" r="2.7" fill="#ffffff"/>`;
        const starR = isSparkle
            ? `<path d="M${rx - 2.5} ${cy - 7} L${rx - 1.3} ${cy - 3.8} L${rx + 2} ${cy - 2.5} L${rx - 1.3} ${cy - 1.2} L${rx - 2.5} ${cy + 2} L${rx - 3.7} ${cy - 1.2} L${rx - 7} ${cy - 2.5} L${rx - 3.7} ${cy - 3.8} Z" fill="#fef08a"/>`
            : `<circle cx="${rx - 2.5}" cy="${cy - 3}" r="2.7" fill="#ffffff"/>`;

        return `
            <defs>
                <linearGradient id="${gL}" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="${iTop}"/>
                    <stop offset="100%" stop-color="${iBot}"/>
                </linearGradient>
                <linearGradient id="${gR}" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="${iTop}"/>
                    <stop offset="100%" stop-color="${iBot}"/>
                </linearGradient>
            </defs>
            ${browL}${browR}
            <!-- Tròng trắng mềm -->
            <ellipse cx="${lx}" cy="${cy}" rx="8.8" ry="8.2" fill="#ffffff"/>
            <ellipse cx="${rx}" cy="${cy}" rx="8.8" ry="8.2" fill="#ffffff"/>
            <!-- Mống mắt gradient -->
            <ellipse cx="${lx}" cy="${cy + 0.5}" rx="6.6" ry="7.4" fill="url(#${gL})"/>
            <ellipse cx="${rx}" cy="${cy + 0.5}" rx="6.6" ry="7.4" fill="url(#${gR})"/>
            <!-- Đồng tử & Phản quang đáy mắt -->
            <circle cx="${lx}" cy="${cy + 0.5}" r="3.2" fill="#0f172a"/>
            <circle cx="${rx}" cy="${cy + 0.5}" r="3.2" fill="#0f172a"/>
            <path d="M${lx - 4} ${cy + 4.5} Q${lx} ${cy + 7} ${lx + 4} ${cy + 4.5}" stroke="#bae6fd" stroke-width="1.6" fill="none" stroke-linecap="round"/>
            <path d="M${rx - 4} ${cy + 4.5} Q${rx} ${cy + 7} ${rx + 4} ${cy + 4.5}" stroke="#bae6fd" stroke-width="1.6" fill="none" stroke-linecap="round"/>
            <!-- Viền mi trên sắc nét -->
            <path d="M${lx - 9.5} ${cy - 2} Q${lx} ${cy - 10} ${lx + 9.5} ${cy - 2}" stroke="#0f172a" stroke-width="3.2" fill="none" stroke-linecap="round"/>
            <path d="M${rx - 9.5} ${cy - 2} Q${rx} ${cy - 10} ${rx + 9.5} ${cy - 2}" stroke="#0f172a" stroke-width="3.2" fill="none" stroke-linecap="round"/>
            ${lashes}
            <!-- Điểm sáng lấp lánh -->
            ${starL}${starR}
            <circle cx="${lx + 3}" cy="${cy + 3}" r="1.3" fill="#ffffff"/>
            <circle cx="${rx + 3}" cy="${cy + 3}" r="1.3" fill="#ffffff"/>`;
    }

    function renderBlushAndMouth(cx, cy, expr) {
        const clipId = uid('mClip');
        const nose = `<path d="M${cx - 1.2} ${cy - 9} Q${cx} ${cy - 7.5} ${cx + 1.5} ${cy - 9}" stroke="#d97706" stroke-width="1.6" fill="none" stroke-linecap="round" opacity="0.7"/>`;
        const blush = `
            <ellipse cx="${cx - 27}" cy="${cy - 4}" rx="7.5" ry="4.2" fill="#fb7185" opacity="0.42"/>
            <ellipse cx="${cx + 27}" cy="${cy - 4}" rx="7.5" ry="4.2" fill="#fb7185" opacity="0.42"/>
            <line x1="${cx - 29}" y1="${cy - 6}" x2="${cx - 31}" y2="${cy - 2}" stroke="#f43f5e" stroke-width="1.2" opacity="0.5"/>
            <line x1="${cx - 25}" y1="${cy - 6}" x2="${cx - 27}" y2="${cy - 2}" stroke="#f43f5e" stroke-width="1.2" opacity="0.5"/>
            <line x1="${cx + 25}" y1="${cy - 6}" x2="${cx + 23}" y2="${cy - 2}" stroke="#f43f5e" stroke-width="1.2" opacity="0.5"/>
            <line x1="${cx + 29}" y1="${cy - 6}" x2="${cx + 27}" y2="${cy - 2}" stroke="#f43f5e" stroke-width="1.2" opacity="0.5"/>`;

        let mouth = '';
        if (expr === 'sparkle') {
            mouth = `
                <defs>
                    <clipPath id="${clipId}">
                        <path d="M${cx - 12} ${cy} Q${cx} ${cy + 2} ${cx + 12} ${cy} Q${cx + 11} ${cy + 14} ${cx} ${cy + 14} Q${cx - 11} ${cy + 14} ${cx - 12} ${cy} Z"/>
                    </clipPath>
                </defs>
                <path d="M${cx - 12} ${cy} Q${cx} ${cy + 2} ${cx + 12} ${cy} Q${cx + 11} ${cy + 14} ${cx} ${cy + 14} Q${cx - 11} ${cy + 14} ${cx - 12} ${cy} Z" fill="#9f1239"/>
                <g clip-path="url(#${clipId})">
                    <rect x="${cx - 12}" y="${cy - 1}" width="24" height="3.8" fill="#ffffff"/>
                    <ellipse cx="${cx}" cy="${cy + 12}" rx="8" ry="5" fill="#fb7185"/>
                </g>
                <path d="M${cx - 12} ${cy} Q${cx} ${cy + 2} ${cx + 12} ${cy} Q${cx + 11} ${cy + 14} ${cx} ${cy + 14} Q${cx - 11} ${cy + 14} ${cx - 12} ${cy} Z" fill="none" stroke="#881337" stroke-width="2.1" stroke-linejoin="round"/>`;
        } else if (expr === 'worried') {
            mouth = `<path d="M${cx - 10} ${cy + 6} Q${cx - 4} ${cy + 2} ${cx} ${cy + 5} Q${cx + 4} ${cy + 8} ${cx + 10} ${cy + 4}" stroke="#881337" stroke-width="2.8" fill="none" stroke-linecap="round"/>`;
        } else if (expr === 'crying') {
            mouth = `
                <path d="M${cx - 10} ${cy + 8} Q${cx} ${cy + 1} ${cx + 10} ${cy + 8} Q${cx + 8} ${cy + 15} ${cx} ${cy + 15} Q${cx - 8} ${cy + 15} ${cx - 10} ${cy + 8} Z" fill="#9f1239" stroke="#881337" stroke-width="2"/>
                <ellipse cx="${cx}" cy="${cy + 13}" rx="5" ry="2.5" fill="#fb7185"/>`;
        } else {
            mouth = `<path d="M${cx - 10} ${cy + 2} Q${cx} ${cy + 10} ${cx + 10} ${cy + 2}" stroke="#881337" stroke-width="3" fill="none" stroke-linecap="round"/>`;
        }
        return `${blush}${nose}${mouth}`;
    }

    /* ---------------------------------------------------------------------
     * 1. SLIDE 1: GIA ĐÌNH BẠN KHOA (BỐ, MẸ, CHỊ, KHOA)
     * --------------------------------------------------------------------- */
    function getIntroMemberSvg(role) {
        const gId = uid('introBg');
        const skinId = uid('introSkin');
        const scenes = {
            dad: {
                bg1: '#1d4ed8', bg2: '#1e1b4b',
                body: `
                    <path d="M10 64 C13 47 23 43 32 43 C41 43 51 47 54 64 Z" fill="#1e40af" stroke="#93c5fd" stroke-width="1"/>
                    <polygon points="26,43 32,53 38,43" fill="#ffffff"/>
                    <polygon points="30,45 32,56 34,45" fill="#f59e0b"/>
                    <rect x="27" y="36" width="10" height="9" rx="3" fill="#fed7aa"/>
                    <path d="M20 26 C20 14 44 14 44 26 C44 35 38 40 32 40.5 C26 40 20 35 20 26 Z" fill="url(#${skinId})" stroke="#f59e0b" stroke-width="1"/>
                    <path d="M18.5 27 C17.5 13 23 9 32 9 C41 9 46.5 13 45.5 27 L43 21 Q37 17 31 20 Q25 17 21 21 Z" fill="#291d18"/>
                    <rect x="21.5" y="24" width="8.5" height="5.5" rx="2" fill="rgba(255,255,255,0.25)" stroke="#0f172a" stroke-width="1.5"/>
                    <rect x="34" y="24" width="8.5" height="5.5" rx="2" fill="rgba(255,255,255,0.25)" stroke="#0f172a" stroke-width="1.5"/>
                    <line x1="30" y1="26.5" x2="34" y2="26.5" stroke="#0f172a" stroke-width="1.5"/>
                    <circle cx="25.8" cy="26.8" r="1.6" fill="#0f172a"/><circle cx="38.2" cy="26.8" r="1.6" fill="#0f172a"/>
                    <path d="M28 33.5 Q32 36.5 36 33.5" stroke="#9a3412" stroke-width="1.8" fill="none" stroke-linecap="round"/>
                    <rect x="38" y="42" width="20" height="15" rx="3" fill="#0f172a" stroke="#38bdf8" stroke-width="1.6"/>
                    <line x1="41" y1="46" x2="54" y2="46" stroke="#facc15" stroke-width="2"/>
                    <line x1="41" y1="50" x2="52" y2="50" stroke="#94a3b8" stroke-width="1.5"/>
                    <line x1="41" y1="53" x2="50" y2="53" stroke="#94a3b8" stroke-width="1.5"/>`
            },
            mom: {
                bg1: '#be185d', bg2: '#500724',
                body: `
                    <path d="M10 64 C13 47 23 43 32 43 C41 43 51 47 54 64 Z" fill="#ec4899"/>
                    <path d="M21 46 L43 46 L45 64 L19 64 Z" fill="#fff1f2" stroke="#fbcfe8" stroke-width="1"/>
                    <rect x="28" y="37" width="8" height="8" rx="3" fill="#fed7aa"/>
                    <circle cx="44.5" cy="16.5" r="5.5" fill="#3e2723"/>
                    <path d="M20 26.5 C20 14.5 44 14.5 44 26.5 C44 35 38 40 32 40.5 C26 40 20 35 20 26.5 Z" fill="url(#${skinId})" stroke="#f59e0b" stroke-width="1"/>
                    <path d="M18.5 28.5 C17.5 13 23 9.5 32 9.5 C41 9.5 46.5 13 45.5 28.5 L43 22 Q37 18 32 21 Q27 18 21 22 Z" fill="#3e2723"/>
                    <circle cx="26.8" cy="26.5" r="2" fill="#0f172a"/><circle cx="37.2" cy="26.5" r="2" fill="#0f172a"/>
                    <circle cx="26.2" cy="25.8" r="0.8" fill="#ffffff"/><circle cx="36.6" cy="25.8" r="0.8" fill="#ffffff"/>
                    <ellipse cx="23.5" cy="30.5" rx="2.5" ry="1.4" fill="#fb7185" opacity="0.5"/>
                    <ellipse cx="40.5" cy="30.5" rx="2.5" ry="1.4" fill="#fb7185" opacity="0.5"/>
                    <path d="M28 33 Q32 36.5 36 33" stroke="#be123c" stroke-width="1.8" fill="none" stroke-linecap="round"/>
                    <rect x="7" y="42" width="14" height="18" rx="3" fill="#0f172a" stroke="#fde047" stroke-width="1.5"/>
                    <circle cx="14" cy="49" r="3.5" fill="#f97316"/>
                    <path d="M48 40 L48 58" stroke="#f8fafc" stroke-width="2.5" stroke-linecap="round"/>
                    <ellipse cx="48" cy="39" rx="4.2" ry="2.6" fill="#facc15"/>`
            },
            sister: {
                bg1: '#059669', bg2: '#022c22',
                body: `
                    <path d="M17 24 C13 37 14 48 21 50 L43 50 C50 48 51 37 47 24 Z" fill="#3e2723"/>
                    <path d="M11 64 C14 47 23 43 32 43 C41 43 50 47 53 64 Z" fill="#10b981"/>
                    <polygon points="27,43 32,51 37,43" fill="#fef3c7"/>
                    <rect x="28" y="37" width="8" height="8" rx="3" fill="#fed7aa"/>
                    <path d="M20 26.5 C20 14.5 44 14.5 44 26.5 C44 35 38 40 32 40.5 C26 40 20 35 20 26.5 Z" fill="url(#${skinId})" stroke="#f59e0b" stroke-width="1"/>
                    <path d="M18.5 28.5 C17.5 13 23 9.5 32 9.5 C41 9.5 46.5 13 45.5 28.5 L43 22 Q37 19 32 21 Q27 19 21 22 Z" fill="#3e2723"/>
                    <rect x="20.5" y="15.5" width="7.5" height="3.2" rx="1.6" fill="#f43f5e"/>
                    <circle cx="26.8" cy="27" r="2" fill="#0f172a"/><circle cx="37.2" cy="27" r="2" fill="#0f172a"/>
                    <circle cx="26.2" cy="26.2" r="0.8" fill="#ffffff"/><circle cx="36.6" cy="26.2" r="0.8" fill="#ffffff"/>
                    <path d="M28 33.5 Q32 36.5 36 33.5" stroke="#be123c" stroke-width="1.8" fill="none" stroke-linecap="round"/>
                    <polygon points="36,56 58,56 55,44 39,44" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
                    <rect x="43" y="47" width="8" height="6" rx="1.5" fill="#f43f5e"/>`
            },
            khoa: {
                bg1: '#4338ca', bg2: '#1e1b4b',
                body: `
                    <path d="M11 64 C14 47 23 43 32 43 C41 43 50 47 53 64 Z" fill="#2563eb"/>
                    <polygon points="26,43 32,53 38,43" fill="#ffffff"/>
                    <polygon points="28,45 32,56 36,45" fill="#ef4444"/>
                    <rect x="28" y="37" width="8" height="8" rx="3" fill="#fed7aa"/>
                    <path d="M20 26.5 C20 14.5 44 14.5 44 26.5 C44 35 38 40 32 40.5 C26 40 20 35 20 26.5 Z" fill="url(#${skinId})" stroke="#f59e0b" stroke-width="1"/>
                    <path d="M18.5 27.5 C17.5 13 23 9.5 32 9.5 C41 9.5 46.5 13 45.5 27.5 L43 21 Q38 18 33 21 Q29 18 25 21 Q22 19 20.5 22 Z" fill="#291d18"/>
                    <circle cx="26.8" cy="26.8" r="2.1" fill="#0f172a"/><circle cx="37.2" cy="26.8" r="2.1" fill="#0f172a"/>
                    <circle cx="26.1" cy="26" r="0.85" fill="#ffffff"/><circle cx="36.5" cy="26" r="0.85" fill="#ffffff"/>
                    <path d="M27 32 L37 32 Q37 37.5 32 37.5 Q27 37.5 27 32 Z" fill="#fca5a5" stroke="#b91c1c" stroke-width="1.4" stroke-linejoin="round"/>
                    <rect x="37" y="42" width="21" height="15" rx="3" fill="#0f172a" stroke="#facc15" stroke-width="1.5"/>
                    <circle cx="47.5" cy="49.5" r="4.5" fill="#ffffff" stroke="#0f172a" stroke-width="1"/>`
            }
        };
        const s = scenes[role] || scenes.khoa;
        return `
            <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">
                <defs>
                    <linearGradient id="${gId}" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="${s.bg1}"/>
                        <stop offset="100%" stop-color="${s.bg2}"/>
                    </linearGradient>
                    <linearGradient id="${skinId}" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#fff1e6"/>
                        <stop offset="100%" stop-color="#fed7aa"/>
                    </linearGradient>
                </defs>
                <rect width="64" height="64" rx="14" fill="url(#${gId})"/>
                <circle cx="50" cy="14" r="12" fill="#ffffff" opacity="0.14"/>
                ${s.body}
            </svg>`;
    }

    /* ---------------------------------------------------------------------
     * 2. LAYER 1: NỀN SÂN KHẤU 16:9 CÓ CHIỀU SÂU & ÁNH SÁNG ĐIỆN ẢNH
     * --------------------------------------------------------------------- */
    function getStageBgSvg(epId, phase, stageNum, endingKey) {
        const bgGrad = uid('bg');
        const glowGrad = uid('gl');
        const rayGrad = uid('ray');
        const stg = Number(stageNum) || 1;
        const isEnding = phase === 'ending';

        let sky1 = '#162c54', sky2 = '#1e3a8a', accent = '#38bdf8';
        let scenery = '';

        if (epId === 'ep1') {
            const stormy = (!isEnding && (stg === 1 || stg === 3 || stg === 4)) || (isEnding && endingKey === 'e3');
            const rainbow = (!isEnding && stg === 5) || (isEnding && endingKey === 'e1');
            sky1 = stormy ? '#0f172a' : (rainbow ? '#0369a1' : '#0c4a6e');
            sky2 = stormy ? '#334155' : (rainbow ? '#38bdf8' : '#0284c7');
            accent = rainbow ? '#fde047' : '#7dd3fc';

            const rainbowSvg = rainbow ? `
                <g opacity="0.58">
                    <path d="M260 540 A380 380 0 0 1 1020 540" fill="none" stroke="#ef4444" stroke-width="16"/>
                    <path d="M276 540 A364 364 0 0 1 1004 540" fill="none" stroke="#f97316" stroke-width="16"/>
                    <path d="M292 540 A348 348 0 0 1 988 540" fill="none" stroke="#facc15" stroke-width="16"/>
                    <path d="M308 540 A332 332 0 0 1 972 540" fill="none" stroke="#22c55e" stroke-width="16"/>
                    <path d="M324 540 A316 316 0 0 1 956 540" fill="none" stroke="#38bdf8" stroke-width="16"/>
                </g>
                <circle cx="640" cy="145" r="56" fill="#fef08a" opacity="0.88"/>
                <circle cx="640" cy="145" r="88" fill="#fde047" opacity="0.22"/>` : '';

            const stormSvg = stormy ? `
                <g opacity="0.88">
                    <ellipse cx="490" cy="128" rx="145" ry="48" fill="#334155"/>
                    <ellipse cx="640" cy="108" rx="138" ry="50" fill="#475569"/>
                    <ellipse cx="785" cy="134" rx="130" ry="44" fill="#334155"/>
                    <polygon points="650,160 618,238 656,238 628,308 698,216 658,216" fill="#fde047" opacity="0.92"/>
                </g>
                <g stroke="#bae6fd" stroke-width="2.5" opacity="0.36" stroke-linecap="round">
                    <line x1="440" y1="190" x2="415" y2="265"/><line x1="540" y1="215" x2="515" y2="290"/>
                    <line x1="690" y1="185" x2="665" y2="260"/><line x1="790" y1="210" x2="765" y2="285"/>
                    <line x1="870" y1="195" x2="845" y2="270"/>
                </g>` : `
                <g opacity="0.26" fill="#ffffff">
                    <ellipse cx="500" cy="120" rx="92" ry="26"/>
                    <ellipse cx="570" cy="112" rx="72" ry="24"/>
                    <ellipse cx="780" cy="142" rx="80" ry="22"/>
                </g>`;

            if (!isEnding && stg === 1) {
                // Chặng 1: Chuẩn bị xuất phát trước hiên nhà khi mây đen kéo tới
                scenery = `
                    ${stormSvg}
                    <rect x="0" y="510" width="1280" height="210" fill="#1e293b" opacity="0.9"/>
                    <rect x="455" y="190" width="370" height="250" rx="20" fill="#0f172a" fill-opacity="0.55" stroke="#fde047" stroke-width="4"/>
                    <line x1="640" y1="190" x2="640" y2="440" stroke="#fde047" stroke-width="3" opacity="0.65"/>
                    <line x1="455" y1="315" x2="825" y2="315" stroke="#fde047" stroke-width="3" opacity="0.65"/>
                    <rect x="545" y="455" width="190" height="82" rx="18" fill="#f59e0b" stroke="#fde047" stroke-width="3"/>
                    <path d="M600 455 C600 430 680 430 680 455" fill="none" stroke="#fde047" stroke-width="6" stroke-linecap="round"/>
                    <rect x="580" y="482" width="120" height="32" rx="8" fill="#78350f" opacity="0.65"/>`;
            } else if (!isEnding && stg === 4) {
                // Chặng 4: Lối về bị ngập nước & rào chắn cảnh báo
                scenery = `
                    ${stormSvg}
                    <path d="M180 470 L460 320 L820 320 L1100 470 Z" fill="#334155" opacity="0.7"/>
                    <rect x="0" y="470" width="1280" height="250" fill="#0369a1" opacity="0.88"/>
                    <path d="M0 510 Q180 492 360 510 T720 510 T1080 510 T1280 510" fill="none" stroke="#bae6fd" stroke-width="4" opacity="0.65"/>
                    <path d="M0 565 Q200 545 400 565 T800 565 T1200 565 T1280 565" fill="none" stroke="#7dd3fc" stroke-width="4" opacity="0.5"/>
                    <rect x="505" y="388" width="270" height="34" rx="8" fill="#facc15" stroke="#0f172a" stroke-width="3"/>
                    <polygon points="535,388 565,388 545,422 515,422" fill="#0f172a"/>
                    <polygon points="605,388 635,388 615,422 585,422" fill="#0f172a"/>
                    <polygon points="675,388 705,388 685,422 655,422" fill="#0f172a"/>
                    <rect x="530" y="422" width="14" height="72" fill="#94a3b8"/>
                    <rect x="736" y="422" width="14" height="72" fill="#94a3b8"/>`;
            } else {
                const stageProp = (!isEnding && stg === 2) ? `
                    <rect x="632" y="310" width="16" height="245" rx="5" fill="#78350f"/>
                    <polygon points="556,336 716,336 742,360 716,384 556,384" fill="#facc15" stroke="#78350f" stroke-width="3.5"/>
                    <line x1="582" y1="360" x2="698" y2="360" stroke="#78350f" stroke-width="4.5" stroke-linecap="round" opacity="0.65"/>
                    <polygon points="538,402 694,402 694,448 538,448 512,425" fill="#38bdf8" stroke="#0c4a6e" stroke-width="3.5"/>
                    <line x1="558" y1="425" x2="672" y2="425" stroke="#0c4a6e" stroke-width="4.5" stroke-linecap="round" opacity="0.65"/>`
                    : ((!isEnding && stg === 3) ? `
                    <polygon points="430,326 640,228 850,326" fill="#92400e" stroke="#fde047" stroke-width="4" stroke-linejoin="round"/>
                    <polygon points="465,326 640,245 815,326" fill="#b45309"/>
                    <rect x="490" y="326" width="18" height="235" fill="#78350f"/>
                    <rect x="772" y="326" width="18" height="235" fill="#78350f"/>
                    <rect x="476" y="514" width="328" height="18" rx="7" fill="#d97706" stroke="#fde047" stroke-width="2"/>` : `
                    <ellipse cx="640" cy="518" rx="165" ry="28" fill="#d97706" opacity="0.72"/>
                    <path d="M620 512 Q602 385 566 292" stroke="#78350f" stroke-width="18" fill="none" stroke-linecap="round"/>
                    <path d="M566 292 Q498 270 462 318 M566 292 Q518 228 458 242 M566 292 Q634 238 682 280 M566 292 Q630 294 662 346" stroke="#22c55e" stroke-width="13" fill="none" stroke-linecap="round"/>`);

                scenery = `
                    ${rainbowSvg}
                    ${stormSvg}
                    <!-- Đảo xa -->
                    <path d="M180 495 Q290 435 410 495 Z" fill="#0f766e" opacity="0.45"/>
                    <path d="M870 495 Q995 425 1120 495 Z" fill="#0f766e" opacity="0.45"/>
                    <!-- Sóng biển 2 lớp + bọt trắng -->
                    <path d="M0 495 Q320 470 640 495 T1280 495 L1280 720 L0 720 Z" fill="#0369a1" opacity="0.82"/>
                    <path d="M0 532 Q320 512 640 532 T1280 532" fill="none" stroke="#bae6fd" stroke-width="3" opacity="0.45"/>
                    <path d="M0 568 Q360 545 720 572 T1280 558 L1280 720 L0 720 Z" fill="#d97706" opacity="0.78"/>
                    ${stageProp}`;
            }
        } else if (epId === 'ep2') {
            const smoky = isEnding && endingKey === 'e3';
            const plated = isEnding && endingKey === 'e1';
            const cooking = !isEnding && (stg === 3 || stg === 4);
            sky1 = '#5c230c'; sky2 = '#290d04'; accent = '#fbbf24';
            scenery = `
                <g stroke="#fde68a" stroke-opacity="0.14" stroke-width="2">
                    <line x1="0" y1="180" x2="1280" y2="180"/><line x1="0" y1="260" x2="1280" y2="260"/>
                    <line x1="0" y1="340" x2="1280" y2="340"/><line x1="0" y1="420" x2="1280" y2="420"/>
                    <line x1="260" y1="100" x2="260" y2="480"/><line x1="500" y1="100" x2="500" y2="480"/>
                    <line x1="780" y1="100" x2="780" y2="480"/><line x1="1020" y1="100" x2="1020" y2="480"/>
                </g>
                <!-- Đèn thả ấm áp -->
                <line x1="640" y1="0" x2="640" y2="75" stroke="#fde047" stroke-width="3"/>
                <path d="M595 95 C602 68 678 68 685 95 Z" fill="#f59e0b" stroke="#fde047" stroke-width="2.5"/>
                <circle cx="640" cy="98" r="10" fill="#fef08a"/>
                <rect x="465" y="142" width="350" height="184" rx="18" fill="#fef3c7" fill-opacity="0.1" stroke="#f59e0b" stroke-width="4"/>
                <line x1="640" y1="142" x2="640" y2="326" stroke="#f59e0b" stroke-width="3" opacity="0.65"/>
                <line x1="465" y1="234" x2="815" y2="234" stroke="#f59e0b" stroke-width="3" opacity="0.65"/>
                <rect x="445" y="368" width="390" height="14" rx="7" fill="#d97706" stroke="#fde047" stroke-width="2"/>
                <rect x="495" y="330" width="30" height="38" rx="7" fill="#ef4444" opacity="0.88"/>
                <rect x="538" y="336" width="26" height="32" rx="7" fill="#22c55e" opacity="0.88"/>
                <rect x="720" y="332" width="32" height="36" rx="7" fill="#38bdf8" opacity="0.88"/>
                <rect x="0" y="515" width="1280" height="205" fill="#78350f" opacity="0.92"/>
                <rect x="0" y="515" width="1280" height="14" fill="#fbbf24" opacity="0.8"/>
                ${plated ? `
                    <ellipse cx="640" cy="508" rx="138" ry="24" fill="#ffffff" stroke="#fde047" stroke-width="4"/>
                    <ellipse cx="640" cy="504" rx="72" ry="15" fill="#facc15" stroke="#d97706" stroke-width="2"/>` : `
                    <ellipse cx="640" cy="508" rx="140" ry="22" fill="#1e293b" stroke="#cbd5e1" stroke-width="4"/>
                    <rect x="768" y="498" width="108" height="15" rx="7.5" fill="#0f172a"/>`}
                ${cooking ? `
                    <path d="M590 474 Q576 446 592 420 M640 470 Q626 440 642 412 M690 474 Q676 446 692 420" fill="none" stroke="#fef3c7" stroke-width="4" stroke-linecap="round" opacity="0.45"/>` : ''}
                ${smoky ? `
                    <circle cx="610" cy="405" r="58" fill="#cbd5e1" opacity="0.34"/>
                    <circle cx="675" cy="350" r="74" fill="#e2e8f0" opacity="0.28"/>` : ''}`;
        } else if (epId === 'ep3') {
            const atHome = (!isEnding && stg === 5) || isEnding;
            sky1 = atHome ? '#0f766e' : '#065f46';
            sky2 = atHome ? '#042f2e' : '#022c22';
            accent = '#34d399';
            scenery = atHome ? `
                <!-- Bàn học ở nhà (Chặng 5: Về tới nhà xử lý khóa kéo) -->
                <rect x="440" y="135" width="400" height="230" rx="18" fill="#0f172a" fill-opacity="0.48" stroke="#34d399" stroke-width="3"/>
                <rect x="480" y="175" width="130" height="145" rx="8" fill="#134e4a" stroke="#fde047" stroke-width="2"/>
                <rect x="650" y="175" width="150" height="16" rx="5" fill="#facc15" opacity="0.75"/>
                <rect x="665" y="215" width="120" height="14" rx="5" fill="#a7f3d0" opacity="0.5"/>
                <rect x="0" y="515" width="1280" height="205" fill="#115e59" opacity="0.92"/>
                <rect x="0" y="515" width="1280" height="16" fill="#fde047" opacity="0.75"/>
                <rect x="575" y="425" width="130" height="90" rx="22" fill="#10b981" stroke="#fde047" stroke-width="3"/>
                <rect x="605" y="458" width="70" height="40" rx="8" fill="#047857" stroke="#a7f3d0" stroke-width="2"/>` : `
                <rect x="405" y="125" width="470" height="390" rx="24" fill="#0f172a" opacity="0.52" stroke="#fde047" stroke-width="3"/>
                <polygon points="0,0 1280,0 1280,74 0,74" fill="#059669"/>
                <g fill="#fde047" opacity="0.88">
                    <rect x="80" y="0" width="90" height="74"/><rect x="260" y="0" width="90" height="74"/>
                    <rect x="440" y="0" width="90" height="74"/><rect x="620" y="0" width="90" height="74"/>
                    <rect x="800" y="0" width="90" height="74"/><rect x="980" y="0" width="90" height="74"/>
                    <rect x="1160" y="0" width="90" height="74"/>
                </g>
                <rect x="455" y="275" width="370" height="14" rx="6" fill="#facc15" opacity="0.85"/>
                <rect x="455" y="405" width="370" height="14" rx="6" fill="#facc15" opacity="0.85"/>
                <g opacity="0.88">
                    <rect x="495" y="202" width="60" height="70" rx="16" fill="#38bdf8" stroke="#e0f2fe" stroke-width="2.5"/>
                    <rect x="507" y="236" width="36" height="22" rx="6" fill="#0284c7"/>
                    <rect x="610" y="196" width="64" height="76" rx="18" fill="#f43f5e" stroke="#ffe4e6" stroke-width="2.5"/>
                    <rect x="624" y="234" width="36" height="24" rx="6" fill="#be123c"/>
                    <rect x="725" y="202" width="60" height="70" rx="16" fill="#facc15" stroke="#fef9c3" stroke-width="2.5"/>
                    <rect x="737" y="236" width="36" height="22" rx="6" fill="#ca8a04"/>
                    <rect x="550" y="330" width="68" height="72" rx="16" fill="#a855f7" stroke="#f3e8ff" stroke-width="2.5"/>
                    <rect x="665" y="330" width="68" height="72" rx="16" fill="#22c55e" stroke="#dcfce7" stroke-width="2.5"/>
                </g>
                <rect x="0" y="535" width="1280" height="185" fill="#064e3b" opacity="0.94"/>`;
        } else if (epId === 'ep4') {
            const stadium = (!isEnding && stg === 4) || (isEnding && endingKey === 'e1');
            const classroom = !isEnding && stg === 5;
            const buffering = !isEnding && stg === 3;
            sky1 = stadium ? '#6e142e' : (classroom ? '#1e3a8a' : '#3b1557');
            sky2 = stadium ? '#2d0614' : (classroom ? '#0f172a' : '#16133a');
            accent = classroom ? '#facc15' : '#fb7185';
            if (stadium) {
                scenery = `
                    <polygon points="360,55 580,520 260,520" fill="#fef08a" opacity="0.14"/>
                    <polygon points="920,55 1020,520 700,520" fill="#fef08a" opacity="0.14"/>
                    <rect x="315" y="40" width="90" height="32" rx="8" fill="#fef08a" opacity="0.9"/>
                    <rect x="875" y="40" width="90" height="32" rx="8" fill="#fef08a" opacity="0.9"/>
                    <rect x="0" y="510" width="1280" height="210" fill="#15803d" opacity="0.92"/>
                    <circle cx="640" cy="610" r="105" fill="none" stroke="#ffffff" stroke-width="4" opacity="0.5"/>
                    <rect x="490" y="335" width="300" height="175" fill="none" stroke="#f8fafc" stroke-width="6" opacity="0.75"/>
                    <line x1="490" y1="395" x2="790" y2="395" stroke="#ffffff" stroke-width="2" opacity="0.25"/>
                    <line x1="490" y1="455" x2="790" y2="455" stroke="#ffffff" stroke-width="2" opacity="0.25"/>`;
            } else if (classroom) {
                scenery = `
                    <!-- Sáng hôm sau tại lớp học: Bảng xanh & Bảng xếp hạng bóng đá -->
                    <rect x="390" y="135" width="500" height="260" rx="16" fill="#065f46" stroke="#d97706" stroke-width="10"/>
                    <line x1="440" y1="195" x2="840" y2="195" stroke="#fef08a" stroke-width="4" opacity="0.8"/>
                    <rect x="460" y="230" width="220" height="20" rx="6" fill="#ffffff" opacity="0.45"/>
                    <rect x="460" y="272" width="180" height="20" rx="6" fill="#ffffff" opacity="0.35"/>
                    <rect x="460" y="314" width="140" height="20" rx="6" fill="#ffffff" opacity="0.28"/>
                    <circle cx="775" cy="285" r="44" fill="#ffffff" stroke="#0f172a" stroke-width="3"/>
                    <polygon points="775,263 793,277 786,299 764,299 757,277" fill="#0f172a"/>
                    <rect x="0" y="520" width="1280" height="200" fill="#1e293b" opacity="0.9"/>`;
            } else {
                scenery = `
                    <rect x="445" y="155" width="390" height="235" rx="18" fill="#0f172a" stroke="#facc15" stroke-width="5"/>
                    <rect x="463" y="173" width="354" height="199" rx="10" fill="${buffering ? '#1e293b' : '#16a34a'}" opacity="0.9"/>
                    ${buffering ? `
                        <circle cx="640" cy="272" r="38" fill="none" stroke="#475569" stroke-width="8"/>
                        <path d="M640 234 A38 38 0 0 1 678 272" fill="none" stroke="#facc15" stroke-width="8" stroke-linecap="round"/>` : `
                        <line x1="640" y1="173" x2="640" y2="372" stroke="#ffffff" stroke-width="3" opacity="0.65"/>
                        <circle cx="640" cy="272" r="46" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.65"/>`}
                    <rect x="605" y="390" width="70" height="28" fill="#334155"/>
                    <rect x="555" y="416" width="170" height="14" rx="7" fill="#475569"/>
                    <rect x="0" y="520" width="1280" height="200" fill="#2e1065" opacity="0.9"/>`;
            }
        } else if (epId === 'ep5') {
            const solved = isEnding && endingKey === 'e1';
            sky1 = '#4c1d95'; sky2 = '#1e0944'; accent = '#c084fc';
            scenery = `
                <circle cx="640" cy="260" r="160" fill="#a855f7" opacity="0.18"/>
                <circle cx="640" cy="260" r="220" fill="none" stroke="#e9d5ff" stroke-width="1.5" stroke-dasharray="8 8" opacity="0.3"/>
                <g transform="translate(555, 165) rotate(${solved ? 0 : 8})" opacity="0.92">
                    <rect x="0" y="0" width="174" height="174" rx="18" fill="#0f172a" stroke="#fde047" stroke-width="4"/>
                    ${solved ? `
                        <rect x="14" y="14" width="44" height="44" rx="7" fill="#facc15"/><rect x="65" y="14" width="44" height="44" rx="7" fill="#facc15"/><rect x="116" y="14" width="44" height="44" rx="7" fill="#facc15"/>
                        <rect x="14" y="65" width="44" height="44" rx="7" fill="#facc15"/><rect x="65" y="65" width="44" height="44" rx="7" fill="#facc15"/><rect x="116" y="65" width="44" height="44" rx="7" fill="#facc15"/>
                        <rect x="14" y="116" width="44" height="44" rx="7" fill="#facc15"/><rect x="65" y="116" width="44" height="44" rx="7" fill="#facc15"/><rect x="116" y="116" width="44" height="44" rx="7" fill="#facc15"/>` : `
                        <rect x="14" y="14" width="44" height="44" rx="7" fill="#ef4444"/><rect x="65" y="14" width="44" height="44" rx="7" fill="#facc15"/><rect x="116" y="14" width="44" height="44" rx="7" fill="#3b82f6"/>
                        <rect x="14" y="65" width="44" height="44" rx="7" fill="#22c55e"/><rect x="65" y="65" width="44" height="44" rx="7" fill="#ffffff"/><rect x="116" y="65" width="44" height="44" rx="7" fill="#f97316"/>
                        <rect x="14" y="116" width="44" height="44" rx="7" fill="#3b82f6"/><rect x="65" y="116" width="44" height="44" rx="7" fill="#ef4444"/><rect x="116" y="116" width="44" height="44" rx="7" fill="#facc15"/>`}
                </g>
                <rect x="0" y="530" width="1280" height="190" fill="#3b0764" opacity="0.9"/>`;
        } else {
            sky1 = '#7c1747'; sky2 = '#3b043e'; accent = '#f472b6';
            if (!isEnding && stg <= 3) {
                // Chặng 1-3: Bí mật chuẩn bị thiệp sinh nhật tại bàn học
                scenery = `
                    <circle cx="640" cy="240" r="170" fill="#f472b6" opacity="0.14"/>
                    <rect x="440" y="150" width="400" height="240" rx="22" fill="#500724" fill-opacity="0.55" stroke="#fde047" stroke-width="3"/>
                    <rect x="575" y="215" width="130" height="110" rx="12" fill="#fffbeb" stroke="#f43f5e" stroke-width="3"/>
                    <path d="M640 258 C640 245 656 242 662 252 C668 242 684 245 684 258 C684 272 662 286 662 286 C662 286 640 272 640 258 Z" transform="translate(-22,2)" fill="#f43f5e"/>
                    <rect x="0" y="525" width="1280" height="195" fill="#500724" opacity="0.92"/>
                    <rect x="465" y="427" width="350" height="110" rx="16" fill="#831843" stroke="#fde047" stroke-width="3" opacity="0.92"/>`;
            } else if (!isEnding && stg === 4) {
                // Chặng 4: Giấy vụn đầy sàn trước giờ mẹ về
                scenery = `
                    <rect x="440" y="140" width="400" height="240" rx="20" fill="#500724" fill-opacity="0.45" stroke="#fde047" stroke-width="3"/>
                    <rect x="0" y="525" width="1280" height="195" fill="#500724" opacity="0.94"/>
                    <polygon points="480,555 510,545 504,572" fill="#f43f5e" opacity="0.88"/>
                    <polygon points="550,575 585,565 572,592" fill="#fde047" opacity="0.88"/>
                    <polygon points="625,548 655,542 648,570" fill="#38bdf8" opacity="0.88"/>
                    <polygon points="690,572 724,562 716,590" fill="#22c55e" opacity="0.88"/>
                    <polygon points="760,552 795,546 785,576" fill="#f472b6" opacity="0.88"/>`;
            } else {
                scenery = `
                    <path d="M0 36 Q640 120 1280 36" fill="none" stroke="#fde047" stroke-width="4" opacity="0.88"/>
                    <polygon points="180,55 230,61 202,110" fill="#f43f5e" opacity="0.92"/>
                    <polygon points="360,71 410,75 384,124" fill="#38bdf8" opacity="0.92"/>
                    <polygon points="560,80 610,81 585,130" fill="#facc15" opacity="0.95"/>
                    <polygon points="760,77 810,73 786,122" fill="#22c55e" opacity="0.92"/>
                    <polygon points="960,64 1010,58 988,108" fill="#a855f7" opacity="0.92"/>
                    <ellipse cx="530" cy="240" rx="38" ry="48" fill="#f43f5e" opacity="0.85"/>
                    <ellipse cx="750" cy="245" rx="38" ry="48" fill="#facc15" opacity="0.85"/>
                    <line x1="530" y1="288" x2="555" y2="430" stroke="#fde68a" stroke-width="2.5"/>
                    <line x1="750" y1="293" x2="725" y2="430" stroke="#fde68a" stroke-width="2.5"/>
                    <rect x="595" y="345" width="90" height="82" rx="12" fill="#ec4899" stroke="#fde047" stroke-width="3"/>
                    <rect x="633" y="345" width="14" height="82" fill="#fde047"/>
                    <rect x="595" y="379" width="90" height="14" fill="#fde047"/>
                    <rect x="0" y="525" width="1280" height="195" fill="#500724" opacity="0.92"/>
                    <rect x="495" y="427" width="290" height="110" rx="16" fill="#831843" stroke="#fde047" stroke-width="3" opacity="0.92"/>`;
            }
        }

        return `
            <svg class="vn-bg-layer" viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <defs>
                    <linearGradient id="${bgGrad}" x1="0" y1="0" x2="0.8" y2="1">
                        <stop offset="0%" stop-color="${sky1}"/>
                        <stop offset="100%" stop-color="${sky2}"/>
                    </linearGradient>
                    <radialGradient id="${glowGrad}" cx="50%" cy="35%" r="58%">
                        <stop offset="0%" stop-color="${accent}" stop-opacity="0.36"/>
                        <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
                    </radialGradient>
                    <linearGradient id="${rayGrad}" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.16"/>
                        <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
                    </linearGradient>
                </defs>
                <rect width="1280" height="720" fill="url(#${bgGrad})"/>
                <rect width="1280" height="720" fill="url(#${glowGrad})"/>
                <polygon points="180,0 440,0 620,720 60,720" fill="url(#${rayGrad})"/>
                <polygon points="840,0 1100,0 1220,720 660,720" fill="url(#${rayGrad})"/>
                ${scenery}
                <!-- Hạt sáng bụi vàng nghệ thuật -->
                <g fill="#fef08a" opacity="0.38">
                    <circle cx="340" cy="180" r="3"/><circle cx="420" cy="290" r="2.2"/>
                    <circle cx="860" cy="160" r="3.2"/><circle cx="940" cy="275" r="2.4"/>
                    <circle cx="640" cy="95" r="2.8"/>
                </g>
                <!-- Khung góc Art Deco -->
                <path d="M24 76 L24 24 L76 24 M34 62 L34 34 L62 34 M1204 24 L1256 24 L1256 76 M1218 34 L1246 34 L1246 62 M24 644 L24 696 L76 696 M34 658 L34 686 L62 686 M1204 696 L1256 696 L1256 644 M1218 686 L1246 686 L1246 658" fill="none" stroke="#fde047" stroke-width="2.5" opacity="0.65"/>
            </svg>`;
    }

    /* ---------------------------------------------------------------------
     * 3. LAYER 2: NHÂN VẬT CHÍNH CHIBI-ANIME (CEL-SHADED + ART DECO UNIFORM)
     * --------------------------------------------------------------------- */
    function getHeroSvg(expr, accentColor, gender, variant, epId) {
        const accent = accentColor || '#38bdf8';
        const isGirl = gender === 'Nữ';
        const isAvatar = variant === 'avatar';
        const gradId = uid(isGirl ? 'suitF' : 'suitM');
        const skinId = uid('heroSkin');
        const hairId = uid('heroHair');
        const auraId = uid('heroAura');

        const irisTop = isGirl ? '#701a75' : '#1e3a8a';
        const irisBot = isGirl ? '#f472b6' : '#38bdf8';
        const eyesMarkup = renderAnimeEyes(80, 120, 96, expr, isGirl, irisTop, irisBot);
        const faceDetails = renderBlushAndMouth(100, 114, expr);

        let extraMarkup = '';
        if (expr === 'sparkle') {
            const sx1 = isAvatar ? 50 : 32;
            const sx2 = isAvatar ? 150 : 166;
            extraMarkup = `
                <path d="M${sx1} 42 L${sx1 + 3} 50 L${sx1 + 11} 53 L${sx1 + 3} 56 L${sx1} 64 L${sx1 - 3} 56 L${sx1 - 11} 53 L${sx1 - 3} 50 Z" fill="#fde047"/>
                <path d="M${sx2} 38 L${sx2 + 2.5} 45 L${sx2 + 9} 47.5 L${sx2 + 2.5} 50 L${sx2} 57 L${sx2 - 2.5} 50 L${sx2 - 9} 47.5 L${sx2 - 2.5} 45 Z" fill="#facc15"/>`;
        } else if (expr === 'worried') {
            extraMarkup = `<path d="M142 74 C147 84 150 91 142 97 C134 91 137 84 142 74 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="1.5"/>`;
        } else if (expr === 'crying') {
            const dx = isAvatar ? 145 : 158;
            extraMarkup = `
                <path d="M${dx} 44 C${dx + 5} 53 ${dx + 7} 58 ${dx} 63 C${dx - 7} 58 ${dx - 5} 53 ${dx} 44 Z" fill="#38bdf8"/>
                <path d="M${dx + 12} 55 C${dx + 16} 62 ${dx + 17} 66 ${dx + 12} 70 C${dx + 7} 66 ${dx + 8} 62 ${dx + 12} 55 Z" fill="#7dd3fc"/>`;
        }

        const hairBackMarkup = isGirl ? `
            <path d="M45 88 C32 120 36 160 54 172 C65 156 64 128 60 102 Z" fill="url(#${hairId})"/>
            <path d="M155 88 C168 120 164 160 146 172 C135 156 136 128 140 102 Z" fill="url(#${hairId})"/>
            <ellipse cx="100" cy="82" rx="52" ry="52" fill="url(#${hairId})"/>
            <!-- Nơ buộc tóc hai bên -->
            <g transform="translate(50,92) rotate(-18)">
                <polygon points="0,0 -11,-7 -11,7" fill="#f43f5e" stroke="#fde047" stroke-width="1.4"/>
                <polygon points="0,0 11,-7 11,7" fill="#f43f5e" stroke="#fde047" stroke-width="1.4"/>
                <circle cx="0" cy="0" r="3.5" fill="#fde047"/>
            </g>
            <g transform="translate(150,92) rotate(18)">
                <polygon points="0,0 -11,-7 -11,7" fill="#f43f5e" stroke="#fde047" stroke-width="1.4"/>
                <polygon points="0,0 11,-7 11,7" fill="#f43f5e" stroke="#fde047" stroke-width="1.4"/>
                <circle cx="0" cy="0" r="3.5" fill="#fde047"/>
            </g>` : `
            <ellipse cx="100" cy="79" rx="51" ry="48" fill="url(#${hairId})"/>`;

        const hairFrontMarkup = isGirl ? `
            <path d="M48 98 C42 52 65 28 100 28 C135 28 158 52 152 98 L145 84 L137 94 L131 76 Q116 70 100 77 Q84 70 69 76 L63 94 L55 84 Z" fill="url(#${hairId})"/>
            <!-- Vòng sáng bóng tóc -->
            <path d="M68 54 Q100 44 132 54" stroke="#ffffff" stroke-width="4.5" fill="none" stroke-linecap="round" opacity="0.28"/>
            <rect x="62" y="62" width="16" height="5" rx="2.5" transform="rotate(-14 62 62)" fill="#fde047"/>` : `
            <path d="M49 96 C43 52 66 28 100 28 C134 28 157 52 151 96 L144 82 L136 90 L128 73 L115 81 L100 68 L85 81 L72 73 L64 90 L56 82 Z" fill="url(#${hairId})"/>
            <path d="M90 31 Q102 18 116 29" stroke="#5d4037" stroke-width="4" fill="none" stroke-linecap="round"/>
            <path d="M68 53 Q100 43 132 53" stroke="#ffffff" stroke-width="4.2" fill="none" stroke-linecap="round" opacity="0.24"/>`;

        let bodyAccessory = '';
        let headAccessory = '';

        if (!isAvatar && epId) {
            if (epId === 'ep1') {
                headAccessory = `
                    <ellipse cx="100" cy="42" rx="58" ry="12" fill="#fbbf24" stroke="#b45309" stroke-width="2.2"/>
                    <path d="M67 40 C70 14 130 14 133 40 Z" fill="#f59e0b" stroke="#b45309" stroke-width="2.2"/>
                    <path d="M68 38 Q100 44 132 38" stroke="#ef4444" stroke-width="5" fill="none" stroke-linecap="round"/>`;
            } else if (epId === 'ep2') {
                headAccessory = `
                    <path d="M66 38 C52 22 68 6 86 15 C94 4 106 4 114 15 C132 6 148 22 134 38 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="2.2"/>
                    <rect x="66" y="34" width="68" height="12" rx="4" fill="#f8fafc" stroke="#94a3b8" stroke-width="2"/>`;
            } else if (epId === 'ep3') {
                bodyAccessory = `
                    <path d="M58 153 L68 224 M142 153 L132 224" stroke="#10b981" stroke-width="9" stroke-linecap="round"/>
                    <rect x="58" y="182" width="12" height="7" rx="2" fill="#fde047"/>
                    <rect x="130" y="182" width="12" height="7" rx="2" fill="#fde047"/>`;
            } else if (epId === 'ep4') {
                headAccessory = `
                    <path d="M51 63 Q100 46 149 63" stroke="#ef4444" stroke-width="11" fill="none" stroke-linecap="round"/>
                    <path d="M147 61 Q164 56 168 70 M147 65 Q162 72 159 84" stroke="#dc2626" stroke-width="5" fill="none" stroke-linecap="round"/>
                    <polygon points="100,48 102.5,54 109,54 104,57.5 106,64 100,60 94,64 96,57.5 91,54 97.5,54" fill="#fde047"/>`;
            } else if (epId === 'ep5') {
                bodyAccessory = `
                    <g transform="translate(54,174) rotate(-8)">
                        <rect width="22" height="22" rx="4" fill="#0f172a" stroke="#fde047" stroke-width="1.8"/>
                        <rect x="3" y="3" width="6.5" height="6.5" fill="#ef4444"/><rect x="12" y="3" width="6.5" height="6.5" fill="#38bdf8"/>
                        <rect x="3" y="12" width="6.5" height="6.5" fill="#22c55e"/><rect x="12" y="12" width="6.5" height="6.5" fill="#facc15"/>
                    </g>`;
            } else if (epId === 'ep6') {
                headAccessory = `
                    <path d="M58 50 Q100 32 142 50" fill="none" stroke="#fde047" stroke-width="4" stroke-linecap="round"/>
                    <polygon points="100,6 106,22 123,22 109,32 114,47 100,37 86,47 91,32 77,22 94,22" fill="#f43f5e" stroke="#fde047" stroke-width="2.2"/>`;
            }
        }

        const vb = isAvatar ? '42 22 116 124' : '0 0 200 230';
        const sizeAttr = isAvatar ? 'width="100%" height="100%"' : 'width="210" height="240"';

        return `
            <svg viewBox="${vb}" ${sizeAttr} aria-hidden="true">
                <defs>
                    <linearGradient id="${gradId}" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="${isGirl ? '#4338ca' : '#1d4ed8'}"/>
                        <stop offset="100%" stop-color="#0f172a"/>
                    </linearGradient>
                    <linearGradient id="${skinId}" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#fff4eb"/>
                        <stop offset="75%" stop-color="#ffe4c4"/>
                        <stop offset="100%" stop-color="#fed7aa"/>
                    </linearGradient>
                    <linearGradient id="${hairId}" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="${isGirl ? '#5c342b' : '#4a2c24'}"/>
                        <stop offset="100%" stop-color="#271713"/>
                    </linearGradient>
                    <radialGradient id="${auraId}" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="${accent}" stop-opacity="0.3"/>
                        <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <circle cx="100" cy="108" r="84" fill="url(#${auraId})"/>
                ${hairBackMarkup}
                <!-- Áo khoác học viện Art Deco có cổ ve & huy hiệu -->
                <path d="M36 226 C38 168 62 148 100 148 C138 148 162 168 164 226 Z" fill="url(#${gradId})" stroke="#fde047" stroke-width="2.8"/>
                <path d="M62 152 L54 226 M138 152 L146 226" stroke="rgba(255,255,255,0.16)" stroke-width="2"/>
                <polygon points="73,148 100,178 127,148" fill="#ffffff"/>
                <polygon points="73,148 87,178 100,178" fill="#e2e8f0"/>
                <polygon points="127,148 113,178 100,178" fill="#e2e8f0"/>
                <polygon points="86,154 100,192 114,154" fill="#ef4444" stroke="#991b1b" stroke-width="1.4"/>
                <polygon points="132,175 135,182 142,185 135,188 132,195 129,188 122,185 129,182" fill="#fde047" stroke="#b45309" stroke-width="1.2"/>
                ${bodyAccessory}
                <!-- Cổ & bóng cằm -->
                <rect x="88" y="130" width="24" height="24" rx="8" fill="#fed7aa"/>
                <path d="M88 134 Q100 146 112 134 L112 142 Q100 150 88 142 Z" fill="#f59e0b" opacity="0.28"/>
                <!-- Tai mềm -->
                <circle cx="55" cy="99" r="9.5" fill="#fed7aa" stroke="#f59e0b" stroke-width="1.4"/>
                <circle cx="145" cy="99" r="9.5" fill="#fed7aa" stroke="#f59e0b" stroke-width="1.4"/>
                <!-- Khuôn mặt chibi cằm mềm -->
                <path d="M55 88 C55 52 145 52 145 88 C145 123 123 141 100 142 C77 141 55 123 55 88 Z" fill="url(#${skinId})" stroke="#f59e0b" stroke-width="1.8"/>
                ${hairFrontMarkup}
                ${eyesMarkup}
                ${faceDetails}
                ${headAccessory}
                ${extraMarkup}
            </svg>`;
    }

    /* ---------------------------------------------------------------------
     * 4. NHÂN VẬT PHỤ (NPC) ĐỒNG BỘ CHIBI-ANIME
     * --------------------------------------------------------------------- */
    function buildNpcPortrait(opts) {
        const {
            shirtColor, collarMarkup = '', hairBack = '', hairFront = '',
            isFemale = false, irisTop = '#3e2723', irisBot = '#b45309',
            faceExtra = '', propMarkup = '', expr = 'confident'
        } = opts;
        const skinId = uid('npcSkin');
        const eyes = renderAnimeEyes(104, 136, 94, expr, isFemale, irisTop, irisBot);
        const mouth = renderBlushAndMouth(120, 111, expr);

        return `
            <defs>
                <linearGradient id="${skinId}" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#fff4eb"/>
                    <stop offset="100%" stop-color="#fed7aa"/>
                </linearGradient>
            </defs>
            ${hairBack}
            <path d="M58 212 C62 158 84 144 120 144 C156 144 178 158 182 212 Z" fill="${shirtColor}" stroke="#fde047" stroke-width="2.8"/>
            ${collarMarkup}
            <rect x="108" y="126" width="24" height="24" rx="8" fill="#fed7aa"/>
            <path d="M108 130 Q120 140 132 130 L132 138 Q120 144 108 138 Z" fill="#f59e0b" opacity="0.25"/>
            <circle cx="81" cy="97" r="8.5" fill="#fed7aa" stroke="#f59e0b" stroke-width="1.4"/>
            <circle cx="159" cy="97" r="8.5" fill="#fed7aa" stroke="#f59e0b" stroke-width="1.4"/>
            <path d="M81 88 C81 55 159 55 159 88 C159 119 140 135 120 136 C100 135 81 119 81 88 Z" fill="url(#${skinId})" stroke="#f59e0b" stroke-width="1.8"/>
            ${hairFront}
            ${eyes}
            ${mouth}
            ${faceExtra}
            ${propMarkup}`;
    }

    function getNpcSvg(epId, stageNum, stageTitle, topic) {
        const ringId = uid('npcAura');
        let npcArt = '';
        let npcLabel = '';

        if (epId === 'ep1') {
            npcLabel = stageNum === 5 ? 'Ông bà qua Video' : 'Bố • Cả nhà dã ngoại';
            npcArt = stageNum === 5 ? `
                <rect x="46" y="24" width="148" height="184" rx="18" fill="#0f172a" stroke="#fde047" stroke-width="3.5"/>
                <rect x="56" y="36" width="128" height="142" rx="10" fill="#0ea5e9" opacity="0.24"/>
                <!-- Ông -->
                <path d="M62 178 C64 146 76 138 94 138 C110 138 120 146 122 178 Z" fill="#1d4ed8"/>
                <rect x="87" y="126" width="14" height="16" rx="5" fill="#fed7aa"/>
                <circle cx="94" cy="105" r="23" fill="#ffedd5" stroke="#f59e0b" stroke-width="1.6"/>
                <path d="M70 105 C69 82 78 73 94 73 C110 73 119 82 118 105 L114 96 Q104 88 94 92 Q84 88 74 96 Z" fill="#e2e8f0"/>
                <circle cx="86" cy="105" r="3" fill="#0f172a"/><circle cx="102" cy="105" r="3" fill="#0f172a"/>
                <circle cx="85" cy="104" r="1.1" fill="#ffffff"/><circle cx="101" cy="104" r="1.1" fill="#ffffff"/>
                <path d="M87 115 Q94 120 101 115" stroke="#9a3412" stroke-width="2.4" fill="none" stroke-linecap="round"/>
                <!-- Bà -->
                <path d="M118 178 C120 148 132 140 148 140 C164 140 176 148 178 178 Z" fill="#db2777"/>
                <rect x="141" y="128" width="14" height="15" rx="5" fill="#fed7aa"/>
                <circle cx="164" cy="80" r="8" fill="#cbd5e1"/>
                <circle cx="148" cy="108" r="21.5" fill="#ffedd5" stroke="#f59e0b" stroke-width="1.6"/>
                <path d="M125 108 C124 86 133 78 148 78 C163 78 172 86 171 108 L167 99 Q158 91 148 95 Q138 91 129 99 Z" fill="#cbd5e1"/>
                <circle cx="141" cy="108" r="2.8" fill="#0f172a"/><circle cx="155" cy="108" r="2.8" fill="#0f172a"/>
                <circle cx="140" cy="107" r="1.1" fill="#ffffff"/><circle cx="154" cy="107" r="1.1" fill="#ffffff"/>
                <path d="M142 117 Q148 122 154 117" stroke="#be123c" stroke-width="2.4" fill="none" stroke-linecap="round"/>
                <circle cx="120" cy="193" r="6" fill="#22c55e"/>` : buildNpcPortrait({
                    shirtColor: '#0284c7',
                    collarMarkup: `<polygon points="100,144 120,168 140,144" fill="#ffffff"/>`,
                    hairBack: `<ellipse cx="120" cy="79" rx="45" ry="43" fill="#291d18"/>`,
                    hairFront: `
                        <path d="M75 96 C71 54 90 35 120 35 C150 35 169 54 165 96 L158 82 Q146 70 132 76 Q116 68 100 77 Q88 72 82 83 Z" fill="#291d18"/>
                        <path d="M96 50 Q120 43 144 50" stroke="#ffffff" stroke-width="3.5" fill="none" stroke-linecap="round" opacity="0.25"/>`,
                    faceExtra: `
                        <rect x="92" y="88" width="22" height="13" rx="4" fill="rgba(255,255,255,0.18)" stroke="#0f172a" stroke-width="2"/>
                        <rect x="126" y="88" width="22" height="13" rx="4" fill="rgba(255,255,255,0.18)" stroke="#0f172a" stroke-width="2"/>
                        <line x1="114" y1="94" x2="126" y2="94" stroke="#0f172a" stroke-width="2"/>`
                });
        } else if (epId === 'ep2') {
            npcLabel = 'Mẹ Giám Khảo MasterChef';
            npcArt = buildNpcPortrait({
                shirtColor: '#be185d',
                isFemale: true,
                irisTop: '#831843',
                irisBot: '#f43f5e',
                collarMarkup: `<path d="M90 150 L150 150 L156 212 L84 212 Z" fill="#fdf2f8" opacity="0.95"/>`,
                hairBack: `
                    <circle cx="158" cy="54" r="16" fill="#3e2723"/>
                    <ellipse cx="120" cy="81" rx="46" ry="45" fill="#3e2723"/>`,
                hairFront: `
                    <path d="M74 98 C70 54 90 35 120 35 C150 35 170 54 166 98 L158 83 Q144 70 124 76 Q114 70 104 76 Q90 71 82 83 Z" fill="#3e2723"/>
                    <path d="M96 50 Q120 43 144 50" stroke="#ffffff" stroke-width="3.5" fill="none" stroke-linecap="round" opacity="0.25"/>`,
                propMarkup: `
                    <g transform="translate(178, 128) rotate(14)">
                        <rect x="-5" y="0" width="10" height="72" rx="5" fill="#facc15" stroke="#b45309" stroke-width="1.8"/>
                        <ellipse cx="0" cy="-6" rx="13" ry="18" fill="#fde047" stroke="#b45309" stroke-width="1.8"/>
                    </g>`
            });
        } else if (epId === 'ep3') {
            if (stageNum === 5) {
                npcLabel = 'Chị Gái • Mẹo Sửa Khóa';
                npcArt = buildNpcPortrait({
                    shirtColor: '#10b981',
                    isFemale: true,
                    irisTop: '#065f46',
                    irisBot: '#34d399',
                    collarMarkup: `<polygon points="100,144 120,168 140,144" fill="#fef3c7"/>`,
                    hairBack: `
                        <path d="M74 88 C66 122 68 150 86 156 L154 156 C172 150 174 122 166 88 Z" fill="#3e2723"/>
                        <ellipse cx="120" cy="80" rx="46" ry="44" fill="#3e2723"/>`,
                    hairFront: `
                        <path d="M74 98 C70 54 90 35 120 35 C150 35 170 54 166 98 L158 83 Q144 72 130 78 Q120 71 110 78 Q96 72 82 83 Z" fill="#3e2723"/>
                        <rect x="82" y="54" width="22" height="8" rx="4" fill="#f43f5e"/>`,
                    propMarkup: `
                        <g transform="translate(170, 140)">
                            <rect x="0" y="8" width="18" height="44" rx="4" fill="#fef9c3" stroke="#f59e0b" stroke-width="2"/>
                            <path d="M9 -4 C13 2 14 6 9 8 C4 6 5 2 9 -4 Z" fill="#f97316"/>
                        </g>`
                });
            } else {
                npcLabel = 'Cô Chủ Tiệm Balo';
                npcArt = buildNpcPortrait({
                    shirtColor: '#059669',
                    isFemale: true,
                    irisTop: '#065f46',
                    irisBot: '#34d399',
                    collarMarkup: `<polygon points="100,144 120,170 140,144" fill="#fef3c7"/>`,
                    hairBack: `
                        <path d="M74 88 C66 122 68 150 86 156 L154 156 C172 150 174 122 166 88 Z" fill="#4a2c24"/>
                        <ellipse cx="120" cy="80" rx="46" ry="44" fill="#4a2c24"/>`,
                    hairFront: `
                        <path d="M74 98 C70 54 90 35 120 35 C150 35 170 54 166 98 L158 83 Q144 72 130 78 Q120 71 110 78 Q96 72 82 83 Z" fill="#4a2c24"/>
                        <path d="M96 50 Q120 43 144 50" stroke="#ffffff" stroke-width="3.5" fill="none" stroke-linecap="round" opacity="0.25"/>`,
                    propMarkup: `
                        <g transform="translate(36, 136)">
                            <path d="M12 0 C12 -10 32 -10 32 0" fill="none" stroke="#fde047" stroke-width="4" stroke-linecap="round"/>
                            <rect x="0" y="0" width="44" height="54" rx="12" fill="#f59e0b" stroke="#fde047" stroke-width="2.5"/>
                            <rect x="8" y="22" width="28" height="20" rx="5" fill="#fef3c7"/>
                        </g>`
                });
            }
        } else if (epId === 'ep4') {
            if (stageNum === 5) {
                npcLabel = 'Bạn Cùng Lớp • Thảo Luận';
                npcArt = buildNpcPortrait({
                    shirtColor: '#2563eb',
                    irisTop: '#1e3a8a',
                    irisBot: '#38bdf8',
                    expr: 'sparkle',
                    collarMarkup: `<polygon points="100,144 120,168 140,144" fill="#ffffff"/>`,
                    hairBack: `<ellipse cx="120" cy="80" rx="45" ry="42" fill="#291d18"/>`,
                    hairFront: `
                        <path d="M75 96 C71 54 90 35 120 35 C150 35 169 54 165 96 L158 82 Q146 70 132 76 Q116 68 100 77 Q88 72 82 83 Z" fill="#291d18"/>`,
                    propMarkup: `
                        <g transform="translate(182, 166)">
                            <path d="M-12 -18 L12 -18 L9 -2 C8 5 4 8 0 8 C-4 8 -8 5 -9 -2 Z" fill="#facc15" stroke="#fde047" stroke-width="2"/>
                            <rect x="-4" y="8" width="8" height="10" fill="#eab308"/>
                            <rect x="-12" y="18" width="24" height="6" rx="2" fill="#fde047"/>
                        </g>`
                });
            } else {
                npcLabel = 'Ông Nội & Hội CĐV';
                npcArt = buildNpcPortrait({
                    shirtColor: '#be123c',
                    irisTop: '#334155',
                    irisBot: '#64748b',
                    collarMarkup: `<polygon points="100,144 120,168 140,144" fill="#fde047"/>`,
                    hairBack: `<ellipse cx="120" cy="80" rx="45" ry="42" fill="#e2e8f0"/>`,
                    hairFront: `
                        <path d="M75 94 C72 54 91 37 120 37 C149 37 168 54 165 94 L158 80 Q144 69 128 75 Q120 68 112 75 Q96 69 82 80 Z" fill="#e2e8f0"/>`,
                    faceExtra: `<path d="M104 111 Q112 104 120 109 Q128 104 136 111" stroke="#cbd5e1" stroke-width="6" fill="none" stroke-linecap="round"/>`,
                    propMarkup: `
                        <g transform="translate(182, 174)">
                            <circle cx="0" cy="0" r="22" fill="#ffffff" stroke="#0f172a" stroke-width="2.8"/>
                            <polygon points="0,-12 10,-2 6,11 -6,11 -10,-2" fill="#0f172a"/>
                        </g>`
                });
            }
        } else if (epId === 'ep5') {
            npcLabel = 'Bạn Tí — Đấu Trường Rubik';
            npcArt = buildNpcPortrait({
                shirtColor: '#6d28d9',
                irisTop: '#4c1d95',
                irisBot: '#a855f7',
                expr: 'sparkle',
                collarMarkup: `<path d="M98 144 Q120 164 142 144" fill="none" stroke="#c4b5fd" stroke-width="5" stroke-linecap="round"/>`,
                hairBack: `<ellipse cx="120" cy="80" rx="46" ry="44" fill="#291d18"/>`,
                hairFront: `
                    <path d="M74 96 C70 54 90 34 120 34 C150 34 170 54 166 96 L158 82 Q146 70 134 78 Q122 67 110 78 Q98 69 86 79 L74 96 Z" fill="#291d18"/>
                    <path d="M105 39 L117 22 L127 37 L137 25 L141 40" fill="#291d18"/>
                    <path d="M96 50 Q120 43 144 50" stroke="#ffffff" stroke-width="3.5" fill="none" stroke-linecap="round" opacity="0.25"/>`,
                propMarkup: `
                    <g transform="translate(162, 146) rotate(-10)">
                        <rect width="42" height="42" rx="6" fill="#0f172a" stroke="#fde047" stroke-width="2.5"/>
                        <rect x="4" y="4" width="15" height="15" rx="2" fill="#ef4444"/><rect x="23" y="4" width="15" height="15" rx="2" fill="#38bdf8"/>
                        <rect x="4" y="23" width="15" height="15" rx="2" fill="#22c55e"/><rect x="23" y="23" width="15" height="15" rx="2" fill="#facc15"/>
                    </g>`
            });
        } else {
            if (stageNum <= 2) {
                npcLabel = 'Bà Ngoại Qua Video';
                npcArt = `
                    <rect x="52" y="24" width="136" height="184" rx="18" fill="#0f172a" stroke="#f472b6" stroke-width="3.5"/>
                    <rect x="62" y="36" width="116" height="142" rx="10" fill="#ec4899" opacity="0.2"/>
                    <path d="M76 178 C78 144 96 134 120 134 C144 134 162 144 164 178 Z" fill="#db2777"/>
                    <polygon points="106,134 120,150 134,134" fill="#fce7f3"/>
                    <rect x="111" y="120" width="18" height="18" rx="6" fill="#fed7aa"/>
                    <circle cx="120" cy="54" r="11" fill="#e2e8f0"/>
                    <circle cx="120" cy="96" r="27" fill="#ffedd5" stroke="#f59e0b" stroke-width="1.6"/>
                    <path d="M90 96 C88 68 100 58 120 58 C140 58 152 68 150 96 L145 85 Q134 75 120 80 Q106 75 95 85 Z" fill="#e2e8f0"/>
                    <circle cx="109" cy="96" r="4" fill="#0f172a"/><circle cx="131" cy="96" r="4" fill="#0f172a"/>
                    <circle cx="108" cy="95" r="1.4" fill="#ffffff"/><circle cx="130" cy="95" r="1.4" fill="#ffffff"/>
                    <circle cx="109" cy="96" r="8" fill="none" stroke="#475569" stroke-width="1.8"/>
                    <circle cx="131" cy="96" r="8" fill="none" stroke="#475569" stroke-width="1.8"/>
                    <line x1="117" y1="96" x2="123" y2="96" stroke="#475569" stroke-width="1.8"/>
                    <path d="M111 109 Q120 116 129 109" stroke="#be123c" stroke-width="2.8" fill="none" stroke-linecap="round"/>
                    <circle cx="120" cy="193" r="6" fill="#22c55e"/>`;
            } else if (stageNum <= 4) {
                npcLabel = stageNum === 3 ? 'Chị Gái • Bí Mật Chuẩn Bị' : 'Cảnh Báo • Mẹ Sắp Về!';
                npcArt = buildNpcPortrait({
                    shirtColor: '#ec4899',
                    isFemale: true,
                    irisTop: '#831843',
                    irisBot: '#f472b6',
                    expr: stageNum === 4 ? 'worried' : 'confident',
                    collarMarkup: `<polygon points="100,144 120,168 140,144" fill="#fff1f2"/>`,
                    hairBack: `
                        <path d="M74 88 C66 122 68 150 86 156 L154 156 C172 150 174 122 166 88 Z" fill="#3e2723"/>
                        <ellipse cx="120" cy="80" rx="46" ry="44" fill="#3e2723"/>`,
                    hairFront: `
                        <path d="M74 98 C70 54 90 35 120 35 C150 35 170 54 166 98 L158 83 Q144 72 130 78 Q120 71 110 78 Q96 72 82 83 Z" fill="#3e2723"/>
                        <rect x="82" y="54" width="22" height="8" rx="4" fill="#facc15"/>`,
                    propMarkup: stageNum === 3 ? `
                        <rect x="164" y="144" width="42" height="50" rx="6" fill="#fffbeb" stroke="#f43f5e" stroke-width="2.2"/>
                        <path d="M179 164 C179 158 186 157 188 162 C190 157 197 158 197 164 C197 170 188 176 188 176 C188 176 179 170 179 164 Z" fill="#f43f5e"/>` : `
                        <circle cx="184" cy="164" r="22" fill="#0f172a" stroke="#facc15" stroke-width="3"/>
                        <line x1="184" y1="164" x2="184" y2="150" stroke="#f8fafc" stroke-width="3" stroke-linecap="round"/>
                        <line x1="184" y1="164" x2="195" y2="168" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round"/>`
                });
            } else {
                npcLabel = 'Mẹ Bất Ngờ';
                npcArt = buildNpcPortrait({
                    shirtColor: '#be185d',
                    isFemale: true,
                    irisTop: '#831843',
                    irisBot: '#f43f5e',
                    expr: 'sparkle',
                    collarMarkup: `<path d="M98 146 Q120 162 142 146" fill="none" stroke="#fde047" stroke-width="4" stroke-linecap="round"/>`,
                    hairBack: `
                        <circle cx="158" cy="54" r="15" fill="#3e2723"/>
                        <ellipse cx="120" cy="81" rx="46" ry="45" fill="#3e2723"/>`,
                    hairFront: `
                        <path d="M74 98 C70 54 90 35 120 35 C150 35 170 54 166 98 L158 83 Q144 70 124 76 Q114 70 104 76 Q90 71 82 83 Z" fill="#3e2723"/>
                        <path d="M96 50 Q120 43 144 50" stroke="#ffffff" stroke-width="3.5" fill="none" stroke-linecap="round" opacity="0.25"/>`,
                    propMarkup: `
                        <path d="M180 68 C180 60 190 58 193 65 C196 58 206 60 206 68 C206 77 193 85 193 85 C193 85 180 77 180 68 Z" fill="#f43f5e" stroke="#fde047" stroke-width="2"/>`
                });
            }
        }

        return `
            <div style="display:flex;flex-direction:column;align-items:center;justify-content:flex-end;text-align:center;">
                <svg viewBox="0 0 240 215" width="224" height="200" aria-hidden="true">
                    <defs>
                        <radialGradient id="${ringId}" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stop-color="#facc15" stop-opacity="0.25"/>
                            <stop offset="100%" stop-color="#facc15" stop-opacity="0"/>
                        </radialGradient>
                    </defs>
                    <circle cx="120" cy="112" r="92" fill="url(#${ringId})"/>
                    ${npcArt}
                </svg>
                <div class="vn-nameplate" style="background:linear-gradient(135deg,#334155 0%,#1e293b 100%);color:#fde68a;border-color:rgba(212,175,55,0.75);font-size:0.94rem;padding:6px 18px;"><span>${esc(npcLabel)}</span></div>
            </div>`;
    }

    /* ---------------------------------------------------------------------
     * 5. LAYER 3: VẬT PHẨM CẬN CẢNH VẼ VECTOR 100% (THEO ĐÚNG TẬP & CHẶNG)
     * --------------------------------------------------------------------- */
    function drawPhotoFrame(innerMarkup, borderClr, bgClr) {
        return `
            <rect x="34" y="38" width="68" height="54" rx="8" fill="#1e293b" stroke="${borderClr || '#facc15'}" stroke-width="2.5"/>
            <rect x="40" y="44" width="56" height="36" rx="4" fill="${bgClr || '#0284c7'}"/>
            ${innerMarkup}
            <rect x="46" y="84" width="44" height="4" rx="2" fill="#94a3b8"/>`;
    }

    function drawVideoPlayer(screenBg, centerMarkup, barProgressWidth, borderClr) {
        return `
            <rect x="32" y="38" width="72" height="50" rx="10" fill="${screenBg || '#0f172a'}" stroke="${borderClr || '#38bdf8'}" stroke-width="2.6"/>
            ${centerMarkup}
            <rect x="42" y="94" width="52" height="5" rx="2.5" fill="#334155"/>
            <rect x="42" y="94" width="${barProgressWidth || 32}" height="5" rx="2.5" fill="#facc15"/>`;
    }

    function drawPhoneCall(avatarColor, hairColor, isElder) {
        return `
            <rect x="44" y="30" width="48" height="76" rx="10" fill="#0f172a" stroke="#38bdf8" stroke-width="2.5"/>
            <rect x="50" y="40" width="36" height="52" rx="5" fill="#0369a1"/>
            ${isElder ? `<circle cx="68" cy="46" r="5" fill="#e2e8f0"/>` : ''}
            <circle cx="68" cy="58" r="9.5" fill="#fed7aa"/>
            <path d="M58 58 C58 49 78 49 78 58 L75 53 Q68 50 61 53 Z" fill="${hairColor || '#e2e8f0'}"/>
            <path d="M54 86 C56 74 62 71 68 71 C74 71 80 74 82 86 Z" fill="${avatarColor || '#f43f5e'}"/>
            <circle cx="68" cy="99" r="4" fill="#22c55e"/>`;
    }

    function drawDocSheet(paperBg, strokeClr, headerClr, extraMarkup) {
        return `
            <rect x="42" y="34" width="52" height="64" rx="7" fill="${paperBg || '#fffbeb'}" stroke="${strokeClr || '#f59e0b'}" stroke-width="2.4"/>
            <rect x="50" y="43" width="36" height="8" rx="3" fill="${headerClr || '#f59e0b'}" opacity="0.85"/>
            <line x1="50" y1="60" x2="86" y2="60" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
            <line x1="50" y1="70" x2="82" y2="70" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
            <line x1="50" y1="80" x2="76" y2="80" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
            ${extraMarkup || ''}`;
    }

    function drawMegaphone(bodyClr, coneClr) {
        return `
            <g transform="translate(66,65) rotate(-14)">
                <polygon points="-24,-8 14,-22 14,22 -24,8" fill="${coneClr || '#ef4444'}" stroke="#fde047" stroke-width="2.2" stroke-linejoin="round"/>
                <rect x="-28" y="-6" width="10" height="12" rx="3" fill="${bodyClr || '#f8fafc'}"/>
                <rect x="-20" y="7" width="7" height="16" rx="3" fill="#475569"/>
                <path d="M22,-10 Q30,0 22,10" fill="none" stroke="#fde047" stroke-width="2.6" stroke-linecap="round"/>
            </g>`;
    }

    function drawBackpack(bodyClr, pocketClr, broken) {
        return `
            <path d="M56 40 C56 30 80 30 80 40" fill="none" stroke="#fde047" stroke-width="4" stroke-linecap="round"/>
            <rect x="44" y="40" width="48" height="58" rx="14" fill="${bodyClr || '#10b981'}" stroke="#fde047" stroke-width="2.4"/>
            <rect x="52" y="64" width="32" height="24" rx="6" fill="${pocketClr || '#047857'}" stroke="#a7f3d0" stroke-width="1.5"/>
            <line x1="52" y1="54" x2="84" y2="54" stroke="#fde047" stroke-width="3" stroke-linecap="round"/>
            ${broken ? `<path d="M54 78 L66 70 L74 82" fill="none" stroke="#fca5a5" stroke-width="2.5" stroke-linecap="round"/>` : ''}`;
    }

    function drawTrophy(fillClr, accentClr) {
        return `
            <path d="M46 38 L86 38 L82 62 C80 71 74 76 66 76 C58 76 52 71 50 62 Z" fill="${fillClr || '#facc15'}" stroke="${accentClr || '#fef08a'}" stroke-width="2.2"/>
            <path d="M46 44 C37 44 37 58 48 59 M86 44 C95 44 95 58 84 59" fill="none" stroke="${accentClr || '#fde047'}" stroke-width="2.8" stroke-linecap="round"/>
            <rect x="62" y="76" width="8" height="10" fill="${fillClr || '#eab308'}"/>
            <rect x="50" y="86" width="32" height="7" rx="3" fill="${accentClr || '#fde047'}"/>`;
    }

    function drawRubikGrid(colors) {
        const c = colors;
        return `
            <g transform="translate(41, 39)">
                <rect width="52" height="52" rx="7" fill="#0f172a" stroke="#fde047" stroke-width="2.2"/>
                <rect x="4" y="4" width="13" height="13" rx="2" fill="${c[0]}"/><rect x="19.5" y="4" width="13" height="13" rx="2" fill="${c[1]}"/><rect x="35" y="4" width="13" height="13" rx="2" fill="${c[2]}"/>
                <rect x="4" y="19.5" width="13" height="13" rx="2" fill="${c[3]}"/><rect x="19.5" y="19.5" width="13" height="13" rx="2" fill="${c[4]}"/><rect x="35" y="19.5" width="13" height="13" rx="2" fill="${c[5]}"/>
                <rect x="4" y="35" width="13" height="13" rx="2" fill="${c[6]}"/><rect x="19.5" y="35" width="13" height="13" rx="2" fill="${c[7]}"/><rect x="35" y="35" width="13" height="13" rx="2" fill="${c[8]}"/>
            </g>`;
    }

    const PROP_GLYPHS_BY_KEY = {
        // --- TẬP 1: CHUYẾN DÃ NGOẠI BÃO TÁP ---
        ep1_s1_c0: () => `
            <circle cx="54" cy="52" r="15" fill="#facc15" stroke="#fef08a" stroke-width="2"/>
            <path d="M50 78 C42 78 38 71 42 65 C44 58 54 56 60 60 C66 54 78 56 81 64 C88 65 90 76 82 78 Z" fill="#f8fafc" stroke="#38bdf8" stroke-width="2"/>
            <line x1="53" y1="82" x2="49" y2="92" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="66" y1="82" x2="62" y2="92" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="78" y1="82" x2="74" y2="92" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>`,
        ep1_s1_c1: () => drawPhotoFrame(`<circle cx="53" cy="55" r="6" fill="#fde047"/><polygon points="40,80 60,60 74,73 82,65 96,80" fill="#22c55e"/>`),
        ep1_s1_c2: () => `
            <path d="M36 62 L44 50 M96 62 L88 50" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
            <rect x="34" y="58" width="27" height="18" rx="6" fill="#0f172a" stroke="#fde047" stroke-width="2.4"/>
            <rect x="71" y="58" width="27" height="18" rx="6" fill="#0f172a" stroke="#fde047" stroke-width="2.4"/>
            <line x1="61" y1="64" x2="71" y2="64" stroke="#fde047" stroke-width="3"/>
            <line x1="40" y1="63" x2="48" y2="71" stroke="#38bdf8" stroke-width="2" opacity="0.7"/>
            <line x1="77" y1="63" x2="85" y2="71" stroke="#38bdf8" stroke-width="2" opacity="0.7"/>`,
        ep1_s2_c0: () => `
            <polygon points="34,44 56,38 80,44 102,38 102,90 80,96 56,90 34,96" fill="#0f172a" stroke="#38bdf8" stroke-width="2.4" stroke-linejoin="round"/>
            <path d="M44 82 Q64 74 72 58 T92 50" fill="none" stroke="#22c55e" stroke-width="4" stroke-linecap="round"/>
            <path d="M70 33 C61 33 55 40 55 48 C55 58 70 70 70 70 C70 70 85 58 85 48 C85 40 79 33 70 33 Z" fill="#ef4444" stroke="#fde047" stroke-width="2"/>
            <circle cx="70" cy="48" r="5" fill="#ffffff"/>`,
        ep1_s2_c1: () => drawDocSheet('#fef3c7', '#d97706', '#94a3b8'),
        ep1_s2_c2: () => `
            <circle cx="68" cy="66" r="28" fill="#1e293b" stroke="#fde047" stroke-width="2.8"/>
            <circle cx="68" cy="66" r="21" fill="#0f172a" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3 3"/>
            <polygon points="68,44 74,66 68,71 62,66" fill="#ef4444"/>
            <polygon points="68,88 74,66 68,61 62,66" fill="#e2e8f0"/>
            <circle cx="68" cy="66" r="4" fill="#facc15"/>`,
        ep1_s3_c0: () => drawVideoPlayer('#0f172a', `<circle cx="68" cy="63" r="15" fill="#ef4444" stroke="#fde047" stroke-width="2"/><polygon points="63,55 63,71 77,63" fill="#ffffff"/>`, 36),
        ep1_s3_c1: () => `
            <rect x="38" y="38" width="58" height="54" rx="8" fill="#0c4a6e" stroke="#bae6fd" stroke-width="2.5"/>
            <line x1="67" y1="38" x2="67" y2="92" stroke="#bae6fd" stroke-width="2"/>
            <line x1="38" y1="65" x2="96" y2="65" stroke="#bae6fd" stroke-width="2"/>
            <line x1="48" y1="46" x2="44" y2="57" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round"/>
            <line x1="80" y1="48" x2="76" y2="59" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round"/>
            <line x1="56" y1="73" x2="52" y2="84" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round"/>`,
        ep1_s3_c2: () => `
            <path d="M40 84 C44 50 68 34 94 38 C90 66 68 86 40 84 Z" fill="#22c55e" stroke="#bbf7d0" stroke-width="2.2"/>
            <path d="M36 88 Q62 64 90 42" fill="none" stroke="#15803d" stroke-width="3" stroke-linecap="round"/>`,
        ep1_s4_c0: () => `
            <polygon points="68,32 100,88 36,88" fill="#facc15" stroke="#ef4444" stroke-width="3.5" stroke-linejoin="round"/>
            <path d="M50 78 Q59 73 68 78 T86 78" fill="none" stroke="#0284c7" stroke-width="3.5" stroke-linecap="round"/>
            <rect x="65" y="48" width="6" height="16" rx="3" fill="#0f172a"/>
            <circle cx="68" cy="69" r="3.2" fill="#0f172a"/>`,
        ep1_s4_c1: () => `
            <rect x="34" y="38" width="68" height="52" rx="8" fill="#ffffff" stroke="#f59e0b" stroke-width="2.5"/>
            <path d="M44 76 C52 54 68 58 76 48" fill="none" stroke="#ef4444" stroke-width="4" stroke-linecap="round"/>
            <path d="M48 80 Q68 68 88 78" fill="none" stroke="#38bdf8" stroke-width="4" stroke-linecap="round"/>
            <circle cx="84" cy="52" r="5" fill="#22c55e"/>`,
        ep1_s4_c2: () => `
            <path d="M36 84 Q56 76 76 84 T98 82" fill="none" stroke="#38bdf8" stroke-width="3.5" stroke-linecap="round"/>
            <g transform="translate(66,60) rotate(-18)">
                <ellipse cx="0" cy="0" rx="20" ry="10" fill="#f97316" stroke="#fde047" stroke-width="2"/>
                <path d="M-4 -8 Q4 0 -4 8" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
            </g>`,
        ep1_s5_c0: () => drawPhoneCall('#ec4899', '#e2e8f0', true),
        ep1_s5_c1: () => `
            <rect x="40" y="36" width="56" height="60" rx="8" fill="#1e293b" stroke="#facc15" stroke-width="2.5"/>
            <rect x="50" y="36" width="36" height="18" rx="3" fill="#cbd5e1"/>
            <rect x="68" y="40" width="10" height="10" rx="2" fill="#1e293b"/>
            <rect x="48" y="64" width="40" height="24" rx="4" fill="#fef3c7"/>
            <line x1="54" y1="72" x2="82" y2="72" stroke="#64748b" stroke-width="2.5"/>
            <line x1="54" y1="80" x2="76" y2="80" stroke="#64748b" stroke-width="2.5"/>`,
        ep1_s5_c2: () => drawMegaphone('#fef08a', '#f59e0b'),

        // --- TẬP 2: THỬ THÁCH MASTERCHEF NHÍ ---
        ep2_s1_c0: () => `
            <rect x="38" y="34" width="58" height="62" rx="8" fill="#fffbeb" stroke="#f59e0b" stroke-width="2.5"/>
            <circle cx="67" cy="54" r="11" fill="#ffffff" stroke="#d97706" stroke-width="2"/>
            <circle cx="67" cy="54" r="5" fill="#facc15"/>
            <line x1="48" y1="74" x2="86" y2="74" stroke="#d97706" stroke-width="3" stroke-linecap="round"/>
            <line x1="48" y1="84" x2="78" y2="84" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>`,
        ep2_s1_c1: () => drawDocSheet('#fffbeb', '#94a3b8', '#64748b'),
        ep2_s1_c2: () => `
            <path d="M40 72 C40 54 54 46 66 48 L60 58 L70 64 L62 76 C48 80 40 78 40 72 Z" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
            <path d="M94 68 C94 52 82 46 72 48 L76 58 L68 65 L75 76 C86 78 94 74 94 68 Z" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
            <ellipse cx="67" cy="84" rx="18" ry="7" fill="#facc15" opacity="0.9"/>`,
        ep2_s2_c0: () => `
            <rect x="42" y="54" width="50" height="28" rx="7" fill="#fde047" stroke="#b45309" stroke-width="2.4"/>
            <path d="M52 54 L52 44 Q67 36 82 44 L82 54" fill="#fef9c3" stroke="#b45309" stroke-width="2"/>
            <circle cx="88" cy="40" r="8" fill="#38bdf8" stroke="#ffffff" stroke-width="1.5"/>`,
        ep2_s2_c1: () => `
            <polygon points="46,34 88,34 88,92 81,87 74,92 67,87 60,92 53,87 46,92" fill="#f8fafc" stroke="#94a3b8" stroke-width="2"/>
            <line x1="54" y1="46" x2="80" y2="46" stroke="#334155" stroke-width="3"/>
            <line x1="54" y1="58" x2="78" y2="58" stroke="#94a3b8" stroke-width="2.5"/>
            <line x1="54" y1="68" x2="74" y2="68" stroke="#94a3b8" stroke-width="2.5"/>
            <line x1="54" y1="78" x2="80" y2="78" stroke="#ef4444" stroke-width="2.5"/>`,
        ep2_s2_c2: () => `
            <rect x="52" y="42" width="30" height="50" rx="6" fill="#ef4444" stroke="#fca5a5" stroke-width="2.2"/>
            <rect x="52" y="58" width="30" height="16" fill="#ffffff" opacity="0.9"/>
            <circle cx="62" cy="34" r="4" fill="#bae6fd"/><circle cx="72" cy="30" r="5" fill="#bae6fd"/>`,
        ep2_s3_c0: () => drawVideoPlayer('#0f172a', `<ellipse cx="68" cy="64" rx="18" ry="12" fill="#facc15" stroke="#f59e0b" stroke-width="2"/><polygon points="65,58 65,70 76,64" fill="#0f172a"/>`, 42),
        ep2_s3_c1: () => drawPhotoFrame(`<ellipse cx="68" cy="62" rx="15" ry="10" fill="#facc15" stroke="#d97706" stroke-width="2"/>`, '#94a3b8', '#1e293b'),
        ep2_s3_c2: () => `
            <path d="M68 32 C82 48 92 60 88 76 C85 89 76 96 68 96 C58 96 48 88 48 74 C48 62 56 53 60 46 C61 53 65 55 67 50 C66 43 67 37 68 32 Z" fill="#f97316" stroke="#fde047" stroke-width="2"/>
            <path d="M68 56 C75 65 78 72 76 81 C74 88 70 91 67 91 C62 91 58 86 58 78 C58 70 64 63 68 56 Z" fill="#fef08a"/>`,
        ep2_s4_c0: () => `
            <circle cx="52" cy="68" r="16" fill="#1e293b" stroke="#34d399" stroke-width="2.5"/>
            <line x1="52" y1="57" x2="52" y2="66" stroke="#34d399" stroke-width="3" stroke-linecap="round"/>
            <path d="M78 74 L78 46 L94 42 L94 68" fill="none" stroke="#fde047" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="73" cy="76" r="6" fill="#fde047"/><circle cx="89" cy="70" r="6" fill="#fde047"/>`,
        ep2_s4_c1: () => `
            <path d="M52 44 L58 68 L44 84 M78 44 L72 68 L88 82" fill="none" stroke="#fb7185" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M40 40 Q46 34 52 40 M82 40 Q88 34 94 40" fill="none" stroke="#fde047" stroke-width="2.5" stroke-linecap="round"/>`,
        ep2_s4_c2: () => `
            <circle cx="54" cy="74" r="15" fill="#475569" stroke="#94a3b8" stroke-width="2"/>
            <circle cx="72" cy="64" r="18" fill="#64748b" stroke="#cbd5e1" stroke-width="2"/>
            <circle cx="62" cy="46" r="13" fill="#94a3b8" opacity="0.85"/>`,
        ep2_s5_c0: () => `
            <circle cx="68" cy="66" r="28" fill="#ffffff" stroke="#fde047" stroke-width="3"/>
            <circle cx="68" cy="66" r="20" fill="#fef9c3" stroke="#f59e0b" stroke-width="1.5"/>
            <circle cx="68" cy="66" r="12" fill="#facc15"/>
            <circle cx="64" cy="63" r="1.8" fill="#0f172a"/><circle cx="72" cy="63" r="1.8" fill="#0f172a"/>
            <path d="M64 69 Q68 73 72 69" stroke="#9a3412" stroke-width="1.8" fill="none" stroke-linecap="round"/>`,
        ep2_s5_c1: () => `
            <ellipse cx="62" cy="68" rx="26" ry="20" fill="#1e293b" stroke="#94a3b8" stroke-width="2.5"/>
            <rect x="86" y="64" width="18" height="8" rx="4" fill="#64748b"/>
            <path d="M50 64 Q62 72 74 64" stroke="#475569" stroke-width="4" fill="none" stroke-linecap="round"/>`,
        ep2_s5_c2: () => `
            <rect x="44" y="54" width="46" height="34" rx="5" fill="#facc15" stroke="#d97706" stroke-width="2"/>
            <rect x="49" y="38" width="8" height="16" rx="2" fill="#ef4444"/>
            <rect x="63" y="38" width="8" height="16" rx="2" fill="#22c55e"/>
            <rect x="77" y="38" width="8" height="16" rx="2" fill="#38bdf8"/>`,

        // --- TẬP 3: PHI VỤ SĂN BALO ĐỘC BẢN ---
        ep3_s1_c0: () => drawBackpack('#10b981', '#047857', false),
        ep3_s1_c1: () => drawPhotoFrame(`<rect x="56" y="50" width="24" height="26" rx="6" fill="#64748b"/><path d="M60 66 L74 56" stroke="#fca5a5" stroke-width="2.5" stroke-linecap="round"/>`, '#94a3b8', '#334155'),
        ep3_s1_c2: () => `
            <rect x="38" y="42" width="58" height="50" rx="6" fill="#b45309" stroke="#fde047" stroke-width="2.4"/>
            <line x1="38" y1="58" x2="96" y2="58" stroke="#78350f" stroke-width="3"/>
            <rect x="60" y="42" width="14" height="50" fill="#f59e0b" opacity="0.6"/>`,
        ep3_s2_c0: () => `
            <polygon points="68,32 77,51 98,54 83,68 86,89 68,79 50,89 53,68 38,54 59,51" fill="#facc15" stroke="#fef08a" stroke-width="2.4" stroke-linejoin="round"/>
            <path d="M59 64 L65 70 L78 56" stroke="#0f172a" stroke-width="3.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
        ep3_s2_c1: () => `
            <rect x="36" y="44" width="64" height="38" rx="8" fill="#ef4444" stroke="#fecaca" stroke-width="2.5"/>
            <line x1="48" y1="63" x2="88" y2="63" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>
            <line x1="52" y1="82" x2="52" y2="94" stroke="#94a3b8" stroke-width="3"/><line x1="84" y1="82" x2="84" y2="94" stroke="#94a3b8" stroke-width="3"/>`,
        ep3_s2_c2: () => `
            <path d="M54 44 L80 44 L74 54 C88 60 90 88 67 88 C44 88 46 60 60 54 Z" fill="#ca8a04" stroke="#fde047" stroke-width="2"/>
            <path d="M62 68 L72 78 M72 68 L62 78" stroke="#fecaca" stroke-width="3" stroke-linecap="round"/>`,
        ep3_s3_c0: () => `
            <rect x="44" y="54" width="48" height="36" rx="6" fill="#ec4899" stroke="#fde047" stroke-width="2.4"/>
            <rect x="41" y="46" width="54" height="12" rx="4" fill="#f43f5e" stroke="#fde047" stroke-width="2"/>
            <rect x="64" y="46" width="8" height="44" fill="#fde047"/>
            <circle cx="62" cy="40" r="6" fill="none" stroke="#fde047" stroke-width="2.5"/>
            <circle cx="74" cy="40" r="6" fill="none" stroke="#fde047" stroke-width="2.5"/>`,
        ep3_s3_c1: () => `
            <path d="M38 44 Q38 38 46 38 L86 38 Q94 38 94 46 L94 70 Q94 78 86 78 L58 78 L46 88 L48 78 L46 78 Q38 78 38 70 Z" fill="#334155" stroke="#fb7185" stroke-width="2.2"/>
            <text x="66" y="64" text-anchor="middle" fill="#fda4af" font-size="22" font-weight="900">?!!</text>`,
        ep3_s3_c2: () => `
            <circle cx="68" cy="72" r="15" fill="#fed7aa" stroke="#f59e0b" stroke-width="2"/>
            <rect x="57" y="40" width="8" height="26" rx="4" transform="rotate(-14 61 52)" fill="#fed7aa" stroke="#f59e0b" stroke-width="1.6"/>
            <rect x="71" y="40" width="8" height="26" rx="4" transform="rotate(14 75 52)" fill="#fed7aa" stroke="#f59e0b" stroke-width="1.6"/>`,
        ep3_s4_c0: () => `
            <path d="M68 34 L94 44 L94 64 C94 80 80 90 68 94 C56 90 42 80 42 64 L42 44 Z" fill="#0284c7" stroke="#fde047" stroke-width="2.5"/>
            <path d="M56 64 L64 72 L80 54" fill="none" stroke="#fde047" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`,
        ep3_s4_c1: () => `
            <polygon points="46,34 88,34 88,92 81,87 74,92 67,87 60,92 53,87 46,92" fill="#fff1f2" stroke="#fb7185" stroke-width="2.2"/>
            <line x1="54" y1="48" x2="80" y2="48" stroke="#64748b" stroke-width="3"/>
            <line x1="54" y1="60" x2="76" y2="60" stroke="#94a3b8" stroke-width="2.5"/>
            <text x="67" y="80" text-anchor="middle" fill="#ef4444" font-size="14" font-weight="900">$$$</text>`,
        ep3_s4_c2: () => `
            <path d="M68 38 C74 52 82 64 78 74 C76 80 68 80 64 76 C60 80 54 78 54 72" fill="none" stroke="#fed7aa" stroke-width="5" stroke-linecap="round"/>
            <path d="M44 76 Q52 70 58 76 M82 70 Q90 64 96 70" fill="none" stroke="#cbd5e1" stroke-width="2.5" stroke-linecap="round"/>`,
        ep3_s5_c0: () => `
            <rect x="57" y="52" width="22" height="40" rx="4" fill="#fef9c3" stroke="#f59e0b" stroke-width="2"/>
            <line x1="68" y1="46" x2="68" y2="52" stroke="#0f172a" stroke-width="2"/>
            <path d="M68 32 C74 39 75 45 68 48 C61 45 62 39 68 32 Z" fill="#f97316" stroke="#fde047" stroke-width="1.5"/>`,
        ep3_s5_c1: () => `
            <line x1="68" y1="34" x2="68" y2="56" stroke="#cbd5e1" stroke-width="5" stroke-dasharray="4 3"/>
            <rect x="59" y="52" width="18" height="16" rx="4" fill="#94a3b8" stroke="#f8fafc" stroke-width="1.8"/>
            <path d="M60 74 L76 88 M76 74 L60 88" stroke="#ef4444" stroke-width="4" stroke-linecap="round"/>`,
        ep3_s5_c2: () => `
            <rect x="46" y="34" width="44" height="60" rx="5" fill="#78350f" stroke="#fde047" stroke-width="2.4"/>
            <line x1="68" y1="34" x2="68" y2="94" stroke="#451a03" stroke-width="2.5"/>
            <circle cx="62" cy="64" r="3" fill="#fde047"/><circle cx="74" cy="64" r="3" fill="#fde047"/>`,

        // --- TẬP 4: ĐÊM CHUNG KẾT SIÊU KINH ĐIỂN ---
        ep4_s1_c0: () => `
            <circle cx="68" cy="64" r="26" fill="#ffffff" stroke="#0f172a" stroke-width="2.8"/>
            <polygon points="68,50 80,59 75,73 61,73 56,59" fill="#0f172a"/>
            <line x1="68" y1="38" x2="68" y2="50" stroke="#0f172a" stroke-width="2.4"/>
            <line x1="92" y1="55" x2="80" y2="59" stroke="#0f172a" stroke-width="2.4"/>
            <line x1="44" y1="55" x2="56" y2="59" stroke="#0f172a" stroke-width="2.4"/>`,
        ep4_s1_c1: () => `
            <rect x="38" y="36" width="58" height="58" rx="5" fill="#fef3c7" stroke="#d97706" stroke-width="2.4"/>
            <rect x="46" y="43" width="42" height="9" rx="2" fill="#78350f"/>
            <rect x="46" y="58" width="18" height="18" rx="2" fill="#d97706" opacity="0.65"/>
            <line x1="70" y1="60" x2="88" y2="60" stroke="#78350f" stroke-width="2.5"/>
            <line x1="70" y1="68" x2="88" y2="68" stroke="#78350f" stroke-width="2.5"/>
            <line x1="46" y1="84" x2="88" y2="84" stroke="#78350f" stroke-width="2.5"/>`,
        ep4_s1_c2: () => drawMegaphone('#e2e8f0', '#ef4444'),
        ep4_s2_c0: () => drawVideoPlayer('#16a34a', `<line x1="68" y1="38" x2="68" y2="88" stroke="#ffffff" stroke-width="2" opacity="0.7"/><circle cx="68" cy="63" r="12" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.75"/><circle cx="88" cy="48" r="4" fill="#ef4444"/>`, 46),
        ep4_s2_c1: () => drawPhotoFrame(`<circle cx="68" cy="60" r="9" fill="#ffffff" stroke="#0f172a" stroke-width="2"/>`, '#facc15', '#15803d'),
        ep4_s2_c2: () => `
            <rect x="40" y="36" width="56" height="56" rx="6" fill="#0f172a" stroke="#94a3b8" stroke-width="2.5"/>
            <rect x="61" y="42" width="14" height="44" fill="#38bdf8" opacity="0.7"/>
            <circle cx="68" cy="64" r="6" fill="#fde047"/>`,
        ep4_s3_c0: () => `
            <path d="M84 52 A22 22 0 1 0 88 70" fill="none" stroke="#38bdf8" stroke-width="5.5" stroke-linecap="round"/>
            <polygon points="88,42 92,58 76,56" fill="#38bdf8"/>`,
        ep4_s3_c1: () => `
            <rect x="40" y="40" width="26" height="26" rx="4" fill="#3b82f6" stroke="#fde047" stroke-width="1.8"/>
            <rect x="68" y="40" width="26" height="26" rx="4" fill="#22c55e" stroke="#fde047" stroke-width="1.8"/>
            <rect x="40" y="68" width="26" height="26" rx="4" fill="#facc15" stroke="#fde047" stroke-width="1.8"/>`,
        ep4_s3_c2: () => `
            <rect x="36" y="42" width="64" height="44" rx="7" transform="rotate(-6 68 64)" fill="#1e293b" stroke="#ef4444" stroke-width="2.6"/>
            <polygon points="68,46 73,58 86,58 76,65 80,77 68,70 56,77 60,65 50,58 63,58" fill="#facc15"/>`,
        ep4_s4_c0: () => drawVideoPlayer('#0f172a', `<polygon points="55,54 55,72 69,63" fill="#38bdf8"/><polygon points="71,54 71,72 85,63" fill="#38bdf8"/>`, 40),
        ep4_s4_c1: () => `
            <rect x="34" y="38" width="68" height="52" rx="8" fill="#ffffff" stroke="#facc15" stroke-width="2.5"/>
            <path d="M44 76 Q64 46 88 54" fill="none" stroke="#22c55e" stroke-width="3.5" stroke-dasharray="4 4"/>
            <circle cx="88" cy="54" r="6" fill="#0f172a"/>`,
        ep4_s4_c2: () => `
            <rect x="36" y="48" width="64" height="36" rx="14" fill="#e0f2fe" stroke="#38bdf8" stroke-width="2.4"/>
            <text x="68" y="44" text-anchor="middle" fill="#fde047" font-size="14" font-weight="900">Zzz</text>`,
        ep4_s5_c0: () => drawTrophy('#facc15', '#fef08a'),
        ep4_s5_c1: () => drawDocSheet('#e2e8f0', '#64748b', '#475569'),
        ep4_s5_c2: () => `
            <circle cx="52" cy="64" r="17" fill="#fed7aa" stroke="#f59e0b" stroke-width="2"/>
            <rect x="65" y="61" width="32" height="7" rx="3.5" fill="#fed7aa" stroke="#f59e0b" stroke-width="1.8"/>
            <circle cx="48" cy="59" r="2.2" fill="#0f172a"/>`,

        // --- TẬP 5: ĐẠI CHIẾN KỶ LỤC RUBIK ---
        ep5_s1_c0: () => `
            ${drawTrophy('#38bdf8', '#fde047')}
            <polygon points="68,46 71,52 77,52 72,56 74,62 68,58 62,62 64,56 59,52 65,52" fill="#ffffff"/>`,
        ep5_s1_c1: () => drawTrophy('#cbd5e1', '#94a3b8'),
        ep5_s1_c2: () => `
            <rect x="44" y="34" width="46" height="62" rx="7" fill="#1e293b" stroke="#facc15" stroke-width="2.4"/>
            <rect x="51" y="41" width="32" height="14" rx="3" fill="#a7f3d0"/>
            <rect x="51" y="61" width="8" height="8" rx="2" fill="#94a3b8"/><rect x="63" y="61" width="8" height="8" rx="2" fill="#94a3b8"/><rect x="75" y="61" width="8" height="8" rx="2" fill="#f97316"/>
            <rect x="51" y="73" width="8" height="8" rx="2" fill="#94a3b8"/><rect x="63" y="73" width="8" height="8" rx="2" fill="#94a3b8"/><rect x="75" y="73" width="8" height="8" rx="2" fill="#f97316"/>`,
        ep5_s2_c0: () => drawVideoPlayer('#0f172a', `<rect x="54" y="49" width="28" height="28" rx="4" fill="#a855f7" stroke="#fde047" stroke-width="2"/><polygon points="64,56 64,70 76,63" fill="#ffffff"/>`, 34),
        ep5_s2_c1: () => drawRubikGrid(['#ef4444','#facc15','#38bdf8','#22c55e','#ffffff','#f97316','#38bdf8','#ef4444','#22c55e']),
        ep5_s2_c2: () => `
            <g transform="translate(67,65) rotate(-28)">
                <rect x="-26" y="-11" width="52" height="22" rx="10" fill="#fca5a5" stroke="#ef4444" stroke-width="2"/>
                <rect x="-9" y="-9" width="18" height="18" rx="3" fill="#fef2f2"/>
            </g>`,
        ep5_s3_c0: () => `
            ${drawRubikGrid(['#38bdf8','#38bdf8','#38bdf8','#a855f7','#ffffff','#a855f7','#22c55e','#22c55e','#22c55e'])}
            <path d="M84 42 L98 36" stroke="#fde047" stroke-width="3" stroke-linecap="round"/>`,
        ep5_s3_c1: () => `
            <polygon points="44,44 64,40 58,66 40,60" fill="#ef4444" stroke="#fecaca" stroke-width="2"/>
            <polygon points="74,56 94,52 90,78 70,74" fill="#38bdf8" stroke="#bae6fd" stroke-width="2"/>
            <path d="M64 46 L72 64 L62 80" fill="none" stroke="#fde047" stroke-width="3" stroke-linecap="round"/>`,
        ep5_s3_c2: () => `
            <circle cx="68" cy="64" r="24" fill="#1e293b" stroke="#94a3b8" stroke-width="4"/>
            <circle cx="68" cy="64" r="10" fill="#0f172a" stroke="#cbd5e1" stroke-width="2"/>`,
        ep5_s4_c0: () => `
            <rect x="34" y="42" width="68" height="44" rx="8" fill="#0f172a" stroke="#a855f7" stroke-width="2.5"/>
            <polygon points="50,55 50,73 64,64" fill="#fde047"/>
            <polygon points="68,55 68,73 82,64" fill="#fde047"/>
            <line x1="40" y1="80" x2="96" y2="80" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
            <circle cx="76" cy="80" r="5" fill="#38bdf8"/>`,
        ep5_s4_c1: () => drawPhotoFrame(`<rect x="52" y="52" width="32" height="20" rx="3" fill="#94a3b8" opacity="0.45"/>`, '#94a3b8', '#334155'),
        ep5_s4_c2: () => `
            <path d="M40 62 Q52 72 62 62 M74 62 Q84 72 96 62" fill="none" stroke="#fde047" stroke-width="4" stroke-linecap="round"/>`,
        ep5_s5_c0: () => `
            <path d="M36 44 Q36 36 44 36 L88 36 Q96 36 96 44 L96 72 Q96 80 88 80 L56 80 L44 90 L46 80 L44 80 Q36 80 36 72 Z" fill="#4c1d95" stroke="#fde047" stroke-width="2.4"/>
            <polygon points="66,46 69,53 77,54 71,59 73,67 66,63 59,67 61,59 55,54 63,53" fill="#facc15"/>`,
        ep5_s5_c1: () => `
            <path d="M58 44 L58 37 L78 37 L78 44" fill="none" stroke="#fde047" stroke-width="3.2"/>
            <rect x="40" y="44" width="56" height="44" rx="8" fill="#475569" stroke="#cbd5e1" stroke-width="2.4"/>
            <line x1="40" y1="62" x2="96" y2="62" stroke="#fde047" stroke-width="2.5"/>`,
        ep5_s5_c2: () => `
            <circle cx="68" cy="70" r="22" fill="#fed7aa" stroke="#f59e0b" stroke-width="2"/>
            <ellipse cx="68" cy="46" rx="10" ry="7" fill="#ef4444" stroke="#fecaca" stroke-width="2"/>
            <path d="M58 68 Q62 64 66 68 M70 68 Q74 64 78 68" stroke="#0f172a" stroke-width="2.5" fill="none"/>`,

        // --- TẬP 6: CHIẾN DỊCH SINH NHẬT BÍ MẬT ---
        ep6_s1_c0: () => drawPhoneCall('#ec4899', '#e2e8f0', true),
        ep6_s1_c1: () => drawDocSheet('#f8fafc', '#94a3b8', '#64748b'),
        ep6_s1_c2: () => `
            <rect x="48" y="40" width="38" height="30" rx="7" fill="#38bdf8" stroke="#fde047" stroke-width="2.2"/>
            <line x1="67" y1="30" x2="67" y2="40" stroke="#fde047" stroke-width="2.5"/>
            <circle cx="67" cy="29" r="3.5" fill="#ef4444"/>
            <circle cx="59" cy="54" r="4" fill="#fde047"/><circle cx="75" cy="54" r="4" fill="#fde047"/>
            <rect x="52" y="72" width="30" height="20" rx="5" fill="#2563eb" stroke="#93c5fd" stroke-width="2"/>`,
        ep6_s2_c0: () => drawVideoPlayer('#500724', `<path d="M68 58 C68 52 75 50 78 55 C81 50 88 52 88 58 C88 65 78 72 78 72 C78 72 68 65 68 58 Z" transform="translate(-10,0)" fill="#f43f5e"/><polygon points="64,55 64,69 75,62" fill="#ffffff"/>`, 36, '#f472b6'),
        ep6_s2_c1: () => drawDocSheet('#fffbeb', '#cbd5e1', '#94a3b8'),
        ep6_s2_c2: () => `
            <polygon points="44,44 88,38 78,60 92,78 52,88 40,68" fill="#fef3c7" stroke="#fb7185" stroke-width="2.4" stroke-linejoin="round"/>
            <path d="M52 54 L80 74" stroke="#94a3b8" stroke-width="2.5" stroke-dasharray="4 3"/>`,
        ep6_s3_c0: () => `
            <path d="M56 76 L56 42 L84 36 L84 70" fill="none" stroke="#f472b6" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="50" cy="78" r="8" fill="#f472b6" stroke="#fde047" stroke-width="2"/>
            <circle cx="78" cy="72" r="8" fill="#facc15" stroke="#fde047" stroke-width="2"/>`,
        ep6_s3_c1: () => `
            <circle cx="68" cy="66" r="24" fill="#fff1f2" stroke="#ef4444" stroke-width="3"/>
            <line x1="68" y1="66" x2="68" y2="50" stroke="#0f172a" stroke-width="3" stroke-linecap="round"/>
            <line x1="68" y1="66" x2="80" y2="68" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round"/>
            <circle cx="50" cy="42" r="6" fill="#facc15"/><circle cx="86" cy="42" r="6" fill="#facc15"/>`,
        ep6_s3_c2: () => `
            <g transform="translate(68,64) rotate(28)">
                <ellipse cx="0" cy="-16" rx="10" ry="15" fill="#cbd5e1" stroke="#f8fafc" stroke-width="2"/>
                <rect x="-3" y="-2" width="6" height="36" rx="3" fill="#94a3b8"/>
            </g>`,
        ep6_s4_c0: () => `
            <g transform="translate(68, 66) rotate(32)">
                <rect x="-3.5" y="-34" width="7" height="42" rx="3.5" fill="#d97706" stroke="#fde047" stroke-width="1.5"/>
                <polygon points="-14,8 14,8 20,30 -20,30" fill="#facc15" stroke="#b45309" stroke-width="2" stroke-linejoin="round"/>
                <line x1="-8" y1="15" x2="-10" y2="29" stroke="#b45309" stroke-width="2"/>
                <line x1="0" y1="15" x2="0" y2="29" stroke="#b45309" stroke-width="2"/>
                <line x1="8" y1="15" x2="10" y2="29" stroke="#b45309" stroke-width="2"/>
            </g>`,
        ep6_s4_c1: () => `
            <rect x="36" y="40" width="64" height="48" rx="8" fill="#0f172a" stroke="#fb7185" stroke-width="2.5"/>
            <text x="68" y="75" text-anchor="middle" fill="#fde047" font-size="34" font-weight="900">?</text>`,
        ep6_s4_c2: () => `
            <rect x="38" y="48" width="60" height="8" rx="3" fill="#92400e"/>
            <rect x="42" y="56" width="6" height="32" fill="#78350f"/><rect x="88" y="56" width="6" height="32" fill="#78350f"/>
            <polygon points="54,84 66,76 72,88" fill="#f43f5e"/>
            <polygon points="72,86 84,78 86,90" fill="#fde047"/>`,
        ep6_s5_c0: () => `
            <rect x="42" y="34" width="52" height="62" rx="7" fill="#fffbeb" stroke="#f59e0b" stroke-width="2.5"/>
            <path d="M68 56 C68 49 77 47 80 53 C83 47 92 49 92 56 C92 64 80 71 80 71 C80 71 68 64 68 56 Z" transform="translate(-12,-4)" fill="#f43f5e"/>
            <line x1="51" y1="76" x2="85" y2="76" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
            <line x1="51" y1="85" x2="77" y2="85" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>`,
        ep6_s5_c1: () => `
            <g transform="translate(68,66) rotate(12)">
                <rect x="-24" y="-16" width="48" height="34" rx="5" fill="#fff1f2" stroke="#f43f5e" stroke-width="2.4"/>
                <polyline points="-24,-14 0,4 24,-14" fill="none" stroke="#f43f5e" stroke-width="2.2"/>
            </g>`,
        ep6_s5_c2: () => `
            <path d="M50 74 L54 48 C55 40 81 40 82 48 L86 74 Z" fill="#ef4444" stroke="#fde047" stroke-width="2.4"/>
            <rect x="44" y="74" width="48" height="10" rx="4" fill="#334155"/>
            <line x1="40" y1="42" x2="48" y2="48" stroke="#fde047" stroke-width="3" stroke-linecap="round"/>
            <line x1="96" y1="42" x2="88" y2="48" stroke="#fde047" stroke-width="3" stroke-linecap="round"/>
            <line x1="68" y1="30" x2="68" y2="38" stroke="#fde047" stroke-width="3" stroke-linecap="round"/>`
    };

    function renderCustomPropGlyph(epId, stageNum, origChoiceIdx, ch) {
        const key = `${epId}_s${stageNum}_c${origChoiceIdx}`;
        if (PROP_GLYPHS_BY_KEY[key]) {
            return PROP_GLYPHS_BY_KEY[key]();
        }
        const name = String((ch && ch.propName) || '').toLowerCase();
        if (name.includes('thời tiết')) return PROP_GLYPHS_BY_KEY.ep1_s1_c0();
        if (name.includes('gọi video')) return PROP_GLYPHS_BY_KEY.ep1_s5_c0();
        if (name.includes('bản đồ')) return PROP_GLYPHS_BY_KEY.ep1_s2_c0();
        if (name.includes('la bàn')) return PROP_GLYPHS_BY_KEY.ep1_s2_c2();
        if (name.includes('rubik')) return PROP_GLYPHS_BY_KEY.ep5_s2_c1();
        if (name.includes('balo')) return PROP_GLYPHS_BY_KEY.ep3_s1_c0();
        if (name.includes('chổi')) return PROP_GLYPHS_BY_KEY.ep6_s4_c0();
        if (name.includes('thiệp')) return PROP_GLYPHS_BY_KEY.ep6_s5_c0();
        if (name.includes('video') || name.includes('hoạt hình')) return PROP_GLYPHS_BY_KEY.ep1_s3_c0();

        return `
            <circle cx="68" cy="66" r="28" fill="rgba(255,255,255,0.08)" stroke="#fde047" stroke-width="2.2" stroke-dasharray="4 3"/>
            <polygon points="68,40 74,58 92,64 74,70 68,88 62,70 44,64 62,58" fill="#fde047"/>
            <circle cx="68" cy="64" r="6" fill="#0f172a"/>`;
    }

    function getPropSvg(epId, stageNum, origChoiceIdx, ch) {
        const bgId = uid('propBg');
        const srcType = (ch && ch.sourceType) || 'internet';
        const styles = {
            internet: { bg1: '#0c4a6e', bg2: '#0f172a', stroke: '#38bdf8' },
            local:    { bg1: '#713f12', bg2: '#1c1917', stroke: '#facc15' },
            action:   { bg1: '#065f46', bg2: '#022c22', stroke: '#34d399' },
            guess:    { bg1: '#7f1d1d', bg2: '#1f1014', stroke: '#fb7185' }
        };
        const st = styles[srcType] || styles.internet;
        const glyph = renderCustomPropGlyph(epId, stageNum, origChoiceIdx, ch);

        let badgeGlyph = '';
        if (srcType === 'internet') {
            badgeGlyph = `
                <circle cx="110" cy="110" r="8" fill="none" stroke="#38bdf8" stroke-width="1.8"/>
                <ellipse cx="110" cy="110" rx="4" ry="8" fill="none" stroke="#38bdf8" stroke-width="1.5"/>
                <line x1="102" y1="110" x2="118" y2="110" stroke="#38bdf8" stroke-width="1.5"/>`;
        } else if (srcType === 'local') {
            badgeGlyph = `
                <rect x="103" y="104" width="14" height="9" rx="1.5" fill="none" stroke="#facc15" stroke-width="1.8"/>
                <line x1="106" y1="116" x2="114" y2="116" stroke="#facc15" stroke-width="1.8" stroke-linecap="round"/>`;
        } else if (srcType === 'action') {
            badgeGlyph = `<path d="M104 110 L108 114 L116 105" fill="none" stroke="#34d399" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;
        } else {
            badgeGlyph = `
                <rect x="103" y="103" width="14" height="14" rx="3" fill="none" stroke="#fb7185" stroke-width="1.8"/>
                <circle cx="107" cy="107" r="1.4" fill="#fb7185"/><circle cx="113" cy="113" r="1.4" fill="#fb7185"/>`;
        }

        return `
            <svg viewBox="0 0 140 140" width="124" height="124" aria-hidden="true">
                <defs>
                    <linearGradient id="${bgId}" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="${st.bg1}"/>
                        <stop offset="100%" stop-color="${st.bg2}"/>
                    </linearGradient>
                </defs>
                <!-- Thẻ cổ vật Art Deco 2 lớp viền -->
                <rect x="14" y="14" width="112" height="112" rx="26" fill="url(#${bgId})" stroke="${st.stroke}" stroke-width="3"/>
                <rect x="20" y="20" width="100" height="100" rx="21" fill="none" stroke="#fde047" stroke-width="1" opacity="0.45"/>
                ${glyph}
                <!-- Huy hiệu nguồn thông tin góc phải dưới -->
                <circle cx="110" cy="110" r="17" fill="#0f172a" stroke="${st.stroke}" stroke-width="2.4"/>
                ${badgeGlyph}
            </svg>`;
    }

    /* ---------------------------------------------------------------------
     * 6. HUY HIỆU KẾT CỤC ART DECO (VECTOR 100%, KHÔNG DÙNG EMOJI THÔ)
     * --------------------------------------------------------------------- */
    function getEndingEmblemSvg(endingKey) {
        const gId = uid('endBg');
        if (endingKey === 'e1') {
            return `
                <svg viewBox="0 0 120 120" width="96" height="96" aria-hidden="true">
                    <defs>
                        <linearGradient id="${gId}" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stop-color="#15803d"/>
                            <stop offset="100%" stop-color="#052e16"/>
                        </linearGradient>
                    </defs>
                    <circle cx="60" cy="60" r="48" fill="url(#${gId})" stroke="#fde047" stroke-width="3.5"/>
                    <circle cx="60" cy="60" r="41" fill="none" stroke="#fde047" stroke-width="1.2" stroke-dasharray="4 3"/>
                    <!-- Cúp vàng Huyền Thoại -->
                    <path d="M44 38 L76 38 L73 60 C72 68 66 72 60 72 C54 72 48 68 47 60 Z" fill="#facc15" stroke="#fef08a" stroke-width="2"/>
                    <path d="M44 43 C36 43 36 56 46 57 M76 43 C84 43 84 56 74 57" fill="none" stroke="#fde047" stroke-width="3" stroke-linecap="round"/>
                    <rect x="56" y="72" width="8" height="10" fill="#eab308"/>
                    <rect x="46" y="82" width="28" height="7" rx="3" fill="#fde047"/>
                    <polygon points="60,46 62.5,52 69,52 64,56 66,62 60,58 54,62 56,56 51,52 57.5,52" fill="#ffffff"/>
                </svg>`;
        }
        if (endingKey === 'e2') {
            return `
                <svg viewBox="0 0 120 120" width="96" height="96" aria-hidden="true">
                    <defs>
                        <linearGradient id="${gId}" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stop-color="#b45309"/>
                            <stop offset="100%" stop-color="#451a03"/>
                        </linearGradient>
                    </defs>
                    <circle cx="60" cy="60" r="48" fill="url(#${gId})" stroke="#facc15" stroke-width="3.5"/>
                    <circle cx="60" cy="62" r="24" fill="#fde047" stroke="#f59e0b" stroke-width="2"/>
                    <path d="M47 57 Q51 53 55 57 M65 57 Q69 53 73 57" stroke="#0f172a" stroke-width="3" fill="none" stroke-linecap="round"/>
                    <path d="M50 69 Q60 77 70 69" stroke="#9a3412" stroke-width="3" fill="none" stroke-linecap="round"/>
                    <path d="M84 36 C89 45 91 51 84 56 C77 51 79 45 84 36 Z" fill="#38bdf8" stroke="#bae6fd" stroke-width="1.5"/>
                </svg>`;
        }
        return `
            <svg viewBox="0 0 120 120" width="96" height="96" aria-hidden="true">
                <defs>
                    <linearGradient id="${gId}" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#991b1b"/>
                        <stop offset="100%" stop-color="#2a0a0a"/>
                    </linearGradient>
                </defs>
                <circle cx="60" cy="60" r="48" fill="url(#${gId})" stroke="#f87171" stroke-width="3.5"/>
                <path d="M40 62 C33 62 30 55 34 50 C36 42 46 40 53 45 C59 38 72 40 75 49 C83 50 85 62 76 62 Z" fill="#cbd5e1"/>
                <polygon points="60,56 51,72 60,72 54,88 72,68 62,68" fill="#fde047"/>
            </svg>`;
    }

    function getSourceIconSvg(sourceType) {
        if (sourceType === 'internet') {
            return `<svg viewBox="0 0 24 24" width="18" height="18" style="vertical-align:middle;margin-right:4px;" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.2"/><ellipse cx="12" cy="12" rx="4.5" ry="9" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="1.8"/></svg>`;
        }
        if (sourceType === 'local') {
            return `<svg viewBox="0 0 24 24" width="18" height="18" style="vertical-align:middle;margin-right:4px;" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2.2"/><line x1="8" y1="20" x2="16" y2="20" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><line x1="12" y1="16" x2="12" y2="20" stroke="currentColor" stroke-width="2.2"/></svg>`;
        }
        if (sourceType === 'action') {
            return `<svg viewBox="0 0 24 24" width="18" height="18" style="vertical-align:middle;margin-right:4px;" aria-hidden="true"><path d="M5 13 L9 17 L19 7" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        }
        return `<svg viewBox="0 0 24 24" width="18" height="18" style="vertical-align:middle;margin-right:4px;" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3.5" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="9" cy="9" r="1.4" fill="currentColor"/><circle cx="15" cy="9" r="1.4" fill="currentColor"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/><circle cx="9" cy="15" r="1.4" fill="currentColor"/><circle cx="15" cy="15" r="1.4" fill="currentColor"/></svg>`;
    }

    window.VN_ART = {
        getIntroMemberSvg,
        getStageBgSvg,
        getHeroSvg,
        getNpcSvg,
        getPropSvg,
        getEndingEmblemSvg,
        getSourceIconSvg
    };
})(window);