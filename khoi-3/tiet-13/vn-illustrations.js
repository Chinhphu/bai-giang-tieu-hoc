/**
 * =========================================================================
 * THƯ VIỆN MINH HỌA VECTOR SVG ĐA LỚP (100% OFFLINE CODE-GENERATED ART)
 * File: vn-illustrations.js
 * =========================================================================
 * Dành riêng cho Tiết 13 Khối 3: Hành Trình Internet (Visual Novel Rẽ Nhánh)
 * Cung cấp API: window.VN_ART.{
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
     * 1. SLIDE 1: GIA ĐÌNH BẠN KHOA (BỐ, MẸ, CHỊ, KHOA) — TÓC DÀY PHỒNG
     * --------------------------------------------------------------------- */
    function getIntroMemberSvg(role) {
        const gId = uid('introBg');
        const scenes = {
            dad: {
                bg1: '#2563eb', bg2: '#1e3a8a',
                body: `
                    <path d="M12 64 C14 48 24 44 32 44 C40 44 50 48 52 64 Z" fill="#1d4ed8"/>
                    <polygon points="27,44 32,54 37,44" fill="#ffffff"/>
                    <rect x="27" y="37" width="10" height="9" rx="3" fill="#fed7aa"/>
                    <circle cx="32" cy="27" r="12.5" fill="#ffedd5" stroke="#fdba74" stroke-width="1.5"/>
                    <path d="M18.5 27 C17.5 14 23 10 32 10 C41 10 46.5 14 45.5 27 L43 22 Q37 18 31 21 Q25 18 21 22 Z" fill="#3e2723" stroke="#a1887f" stroke-width="0.9" stroke-linejoin="round"/>
                    <rect x="22" y="25" width="8" height="5" rx="1.5" fill="none" stroke="#0f172a" stroke-width="1.5"/>
                    <rect x="34" y="25" width="8" height="5" rx="1.5" fill="none" stroke="#0f172a" stroke-width="1.5"/>
                    <line x1="30" y1="27" x2="34" y2="27" stroke="#0f172a" stroke-width="1.5"/>
                    <path d="M28 34 Q32 37 36 34" stroke="#9a3412" stroke-width="1.8" fill="none" stroke-linecap="round"/>
                    <!-- Tablet đọc báo -->
                    <rect x="38" y="42" width="19" height="14" rx="2.5" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
                    <line x1="41" y1="46" x2="54" y2="46" stroke="#facc15" stroke-width="2"/>
                    <line x1="41" y1="50" x2="52" y2="50" stroke="#94a3b8" stroke-width="1.5"/>
                    <line x1="41" y1="53" x2="50" y2="53" stroke="#94a3b8" stroke-width="1.5"/>`
            },
            mom: {
                bg1: '#db2777', bg2: '#831843',
                body: `
                    <path d="M12 64 C14 48 24 44 32 44 C40 44 50 48 52 64 Z" fill="#ec4899"/>
                    <path d="M22 46 L42 46 L44 64 L20 64 Z" fill="#fdf2f8"/>
                    <rect x="28" y="38" width="8" height="8" rx="3" fill="#fed7aa"/>
                    <circle cx="44.5" cy="17" r="5.5" fill="#4a2c24" stroke="#a1887f" stroke-width="0.9"/>
                    <circle cx="32" cy="27.5" r="12" fill="#ffedd5" stroke="#fdba74" stroke-width="1.5"/>
                    <path d="M18.5 29 C17.5 14 23 10 32 10 C41 10 46.5 14 45.5 29 L43 23 Q37 19 32 22 Q27 19 21 23 Z" fill="#4a2c24" stroke="#a1887f" stroke-width="0.9" stroke-linejoin="round"/>
                    <circle cx="27" cy="27" r="1.8" fill="#0f172a"/><circle cx="37" cy="27" r="1.8" fill="#0f172a"/>
                    <path d="M28 33 Q32 37 36 33" stroke="#be123c" stroke-width="1.8" fill="none" stroke-linecap="round"/>
                    <!-- Điện thoại công thức nấu ăn + thìa -->
                    <rect x="8" y="42" width="14" height="18" rx="2.5" fill="#0f172a" stroke="#fde047" stroke-width="1.5"/>
                    <circle cx="15" cy="49" r="3.5" fill="#f97316"/>
                    <path d="M47 40 L47 58" stroke="#e2e8f0" stroke-width="2.5" stroke-linecap="round"/>
                    <ellipse cx="47" cy="39" rx="4" ry="2.5" fill="#facc15"/>`
            },
            sister: {
                bg1: '#10b981', bg2: '#065f46',
                body: `
                    <path d="M18 25 C14 37 15 47 21 49 L43 49 C49 47 50 37 46 25 Z" fill="#4a2c24" stroke="#a1887f" stroke-width="0.9"/>
                    <path d="M13 64 C15 48 24 44 32 44 C40 44 49 48 51 64 Z" fill="#059669"/>
                    <rect x="28" y="38" width="8" height="8" rx="3" fill="#fed7aa"/>
                    <circle cx="32" cy="27.5" r="12" fill="#ffedd5" stroke="#fdba74" stroke-width="1.5"/>
                    <path d="M18.5 29 C17.5 14 23 10 32 10 C41 10 46.5 14 45.5 29 L43 23 Q37 20 32 22 Q27 20 21 23 Z" fill="#4a2c24" stroke="#a1887f" stroke-width="0.9" stroke-linejoin="round"/>
                    <rect x="21" y="16" width="7" height="3" rx="1.5" fill="#f43f5e"/>
                    <circle cx="27" cy="27.5" r="1.8" fill="#0f172a"/><circle cx="37" cy="27.5" r="1.8" fill="#0f172a"/>
                    <path d="M28 33.5 Q32 36.5 36 33.5" stroke="#be123c" stroke-width="1.8" fill="none" stroke-linecap="round"/>
                    <!-- Laptop mua sắm -->
                    <polygon points="36,56 58,56 55,44 39,44" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
                    <rect x="43" y="47" width="8" height="6" rx="1.5" fill="#f43f5e"/>`
            },
            khoa: {
                bg1: '#4f46e5', bg2: '#312e81',
                body: `
                    <path d="M13 64 C15 48 24 44 32 44 C40 44 49 48 51 64 Z" fill="#3b82f6"/>
                    <polygon points="26,44 32,54 38,44" fill="#ef4444"/>
                    <rect x="28" y="38" width="8" height="8" rx="3" fill="#fed7aa"/>
                    <circle cx="32" cy="27.5" r="12" fill="#ffedd5" stroke="#fdba74" stroke-width="1.5"/>
                    <path d="M18.5 28 C17.5 14 23 10 32 10 C41 10 46.5 14 45.5 28 L43 22 Q38 19 33 22 Q29 19 25 22 Q22 20 20.5 23 Z" fill="#3e2723" stroke="#a1887f" stroke-width="0.9" stroke-linejoin="round"/>
                    <circle cx="27" cy="27" r="1.9" fill="#0f172a"/><circle cx="37" cy="27" r="1.9" fill="#0f172a"/>
                    <path d="M27 32 L37 32 Q37 37.5 32 37.5 Q27 37.5 27 32 Z" fill="#fca5a5" stroke="#b91c1c" stroke-width="1.5" stroke-linejoin="round"/>
                    <!-- Màn hình hoạt hình -->
                    <rect x="37" y="42" width="21" height="15" rx="2.5" fill="#0f172a" stroke="#facc15" stroke-width="1.5"/>
                    <polygon points="45,46 45,53 52,49.5" fill="#facc15"/>`
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
                </defs>
                <rect width="64" height="64" rx="14" fill="url(#${gId})"/>
                <circle cx="50" cy="14" r="10" fill="#ffffff" opacity="0.12"/>
                ${s.body}
            </svg>`;
    }

    /* ---------------------------------------------------------------------
     * 2. LAYER 1: NỀN SÂN KHẤU 16:9
     * --------------------------------------------------------------------- */
    function getStageBgSvg(epId, phase, stageNum, endingKey) {
        const bgGrad = uid('bg');
        const glowGrad = uid('gl');
        const stg = Number(stageNum) || 1;
        const isEnding = phase === 'ending';

        let sky1 = '#162c54', sky2 = '#1e3a8a', accent = '#38bdf8';
        let scenery = '';

        if (epId === 'ep1') {
            const stormy = (!isEnding && (stg === 1 || stg === 3 || stg === 4)) || (isEnding && endingKey === 'e3');
            const rainbow = (!isEnding && stg === 5) || (isEnding && endingKey === 'e1');
            sky1 = stormy ? '#1e293b' : (rainbow ? '#0369a1' : '#0f3d6e');
            sky2 = stormy ? '#334155' : (rainbow ? '#0ea5e9' : '#0284c7');
            accent = rainbow ? '#fde047' : '#7dd3fc';

            const rainbowSvg = rainbow ? `
                <path d="M320 530 A320 320 0 0 1 960 530" fill="none" stroke="#ef4444" stroke-width="18" opacity="0.5"/>
                <path d="M338 530 A302 302 0 0 1 942 530" fill="none" stroke="#facc15" stroke-width="18" opacity="0.5"/>
                <path d="M356 530 A284 284 0 0 1 924 530" fill="none" stroke="#22c55e" stroke-width="18" opacity="0.5"/>
                <path d="M374 530 A266 266 0 0 1 906 530" fill="none" stroke="#38bdf8" stroke-width="18" opacity="0.5"/>
                <circle cx="640" cy="145" r="52" fill="#fde047" opacity="0.9"/>` : '';

            const stormSvg = stormy ? `
                <g opacity="0.82">
                    <ellipse cx="520" cy="128" rx="135" ry="46" fill="#475569"/>
                    <ellipse cx="640" cy="112" rx="125" ry="46" fill="#64748b"/>
                    <ellipse cx="760" cy="136" rx="120" ry="42" fill="#475569"/>
                    <polygon points="650,165 622,235 658,235 632,300 694,218 656,218" fill="#fde047" opacity="0.88"/>
                </g>
                <g stroke="#bae6fd" stroke-width="3" opacity="0.38" stroke-linecap="round">
                    <line x1="450" y1="190" x2="425" y2="260"/><line x1="560" y1="210" x2="535" y2="280"/>
                    <line x1="720" y1="185" x2="695" y2="255"/><line x1="820" y1="215" x2="795" y2="285"/>
                </g>` : `
                <g opacity="0.28" fill="#ffffff">
                    <ellipse cx="520" cy="120" rx="85" ry="26"/>
                    <ellipse cx="585" cy="112" rx="68" ry="24"/>
                    <ellipse cx="760" cy="140" rx="74" ry="22"/>
                </g>`;

            const stageProp = stg === 2 ? `
                <rect x="632" y="315" width="16" height="240" rx="4" fill="#92400e"/>
                <polygon points="562,338 712,338 738,360 712,382 562,382" fill="#facc15" stroke="#78350f" stroke-width="3.5"/>
                <line x1="585" y1="360" x2="695" y2="360" stroke="#78350f" stroke-width="4" stroke-linecap="round" opacity="0.65"/>
                <polygon points="542,400 692,400 692,444 542,444 516,422" fill="#38bdf8" stroke="#0c4a6e" stroke-width="3.5"/>
                <line x1="560" y1="422" x2="670" y2="422" stroke="#0c4a6e" stroke-width="4" stroke-linecap="round" opacity="0.65"/>`
                : (stg === 3 ? `
                <polygon points="440,325 640,235 840,325" fill="#92400e" stroke="#fde047" stroke-width="4" stroke-linejoin="round"/>
                <rect x="490" y="325" width="18" height="235" fill="#78350f"/>
                <rect x="772" y="325" width="18" height="235" fill="#78350f"/>
                <rect x="480" y="515" width="320" height="16" rx="6" fill="#b45309"/>` : `
                <ellipse cx="640" cy="515" rx="150" ry="26" fill="#d97706" opacity="0.72"/>
                <path d="M620 510 Q602 385 568 295" stroke="#78350f" stroke-width="18" fill="none" stroke-linecap="round"/>
                <path d="M568 295 Q502 275 468 320 M568 295 Q522 232 465 245 M568 295 Q632 242 678 282 M568 295 Q628 295 658 345" stroke="#22c55e" stroke-width="12" fill="none" stroke-linecap="round"/>`);

            scenery = `
                ${rainbowSvg}
                ${stormSvg}
                <path d="M0 500 Q320 475 640 500 T1280 500 L1280 720 L0 720 Z" fill="#0284c7" opacity="0.78"/>
                <path d="M0 568 Q360 545 720 572 T1280 558 L1280 720 L0 720 Z" fill="#d97706" opacity="0.7"/>
                ${stageProp}`;
        } else if (epId === 'ep2') {
            const smoky = (!isEnding && stg === 3) || (isEnding && endingKey === 'e3');
            sky1 = '#6b2c10'; sky2 = '#431407'; accent = '#fbbf24';
            scenery = `
                <g stroke="#fde68a" stroke-opacity="0.18" stroke-width="2">
                    <line x1="0" y1="180" x2="1280" y2="180"/><line x1="0" y1="260" x2="1280" y2="260"/>
                    <line x1="0" y1="340" x2="1280" y2="340"/><line x1="0" y1="420" x2="1280" y2="420"/>
                    <line x1="260" y1="100" x2="260" y2="480"/><line x1="500" y1="100" x2="500" y2="480"/>
                    <line x1="780" y1="100" x2="780" y2="480"/><line x1="1020" y1="100" x2="1020" y2="480"/>
                </g>
                <rect x="465" y="135" width="350" height="190" rx="16" fill="#fef3c7" fill-opacity="0.12" stroke="#f59e0b" stroke-width="4"/>
                <line x1="640" y1="135" x2="640" y2="325" stroke="#f59e0b" stroke-width="3" opacity="0.7"/>
                <line x1="465" y1="230" x2="815" y2="230" stroke="#f59e0b" stroke-width="3" opacity="0.7"/>
                <rect x="450" y="365" width="380" height="14" rx="7" fill="#d97706" stroke="#fde047" stroke-width="2"/>
                <rect x="500" y="330" width="28" height="35" rx="6" fill="#ef4444" opacity="0.85"/>
                <rect x="540" y="336" width="24" height="29" rx="6" fill="#22c55e" opacity="0.85"/>
                <rect x="720" y="332" width="30" height="33" rx="6" fill="#38bdf8" opacity="0.85"/>
                <rect x="0" y="515" width="1280" height="205" fill="#92400e" opacity="0.9"/>
                <rect x="0" y="515" width="1280" height="16" fill="#fbbf24" opacity="0.78"/>
                <ellipse cx="640" cy="508" rx="135" ry="22" fill="#334155" stroke="#cbd5e1" stroke-width="4"/>
                <rect x="765" y="498" width="105" height="15" rx="7.5" fill="#1e293b"/>
                ${stg === 4 ? `
                    <g fill="#fde047" opacity="0.7">
                        <circle cx="560" cy="210" r="11"/><rect x="568" y="160" width="6" height="50"/>
                        <circle cx="600" cy="202" r="11"/><rect x="608" y="152" width="6" height="50"/>
                        <polygon points="568,160 614,150 614,162 568,172"/>
                        <circle cx="715" cy="185" r="10"/><rect x="722" y="142" width="5" height="43"/>
                        <path d="M722 142 Q744 148 738 164" fill="none" stroke="#fde047" stroke-width="5" stroke-linecap="round"/>
                    </g>` : ''}
                ${smoky ? `
                    <circle cx="610" cy="410" r="56" fill="#cbd5e1" opacity="0.32"/>
                    <circle cx="670" cy="355" r="70" fill="#e2e8f0" opacity="0.26"/>` : ''}`;
        } else if (epId === 'ep3') {
            sky1 = '#047857'; sky2 = '#064e3b'; accent = '#34d399';
            scenery = `
                <rect x="410" y="125" width="460" height="390" rx="22" fill="#0f172a" opacity="0.45" stroke="#fde047" stroke-width="3"/>
                <polygon points="0,0 1280,0 1280,76 0,76" fill="#059669"/>
                <g fill="#fde047" opacity="0.88">
                    <rect x="80" y="0" width="90" height="76"/><rect x="260" y="0" width="90" height="76"/>
                    <rect x="440" y="0" width="90" height="76"/><rect x="620" y="0" width="90" height="76"/>
                    <rect x="800" y="0" width="90" height="76"/><rect x="980" y="0" width="90" height="76"/>
                    <rect x="1160" y="0" width="90" height="76"/>
                </g>
                <rect x="0" y="74" width="1280" height="8" fill="#064e3b" opacity="0.5"/>
                <rect x="455" y="275" width="370" height="16" rx="6" fill="#facc15" opacity="0.85"/>
                <rect x="455" y="405" width="370" height="16" rx="6" fill="#facc15" opacity="0.85"/>
                <g opacity="0.85">
                    <rect x="495" y="205" width="60" height="68" rx="16" fill="#38bdf8" stroke="#e0f2fe" stroke-width="2.5"/>
                    <rect x="507" y="238" width="36" height="22" rx="6" fill="#0284c7"/>
                    <rect x="610" y="198" width="64" height="75" rx="18" fill="#f43f5e" stroke="#ffe4e6" stroke-width="2.5"/>
                    <rect x="624" y="236" width="36" height="24" rx="6" fill="#be123c"/>
                    <rect x="725" y="205" width="60" height="68" rx="16" fill="#facc15" stroke="#fef9c3" stroke-width="2.5"/>
                    <rect x="737" y="238" width="36" height="22" rx="6" fill="#ca8a04"/>
                    <rect x="550" y="332" width="68" height="71" rx="16" fill="#a855f7" stroke="#f3e8ff" stroke-width="2.5"/>
                    <rect x="665" y="332" width="68" height="71" rx="16" fill="#22c55e" stroke="#dcfce7" stroke-width="2.5"/>
                </g>
                <rect x="0" y="535" width="1280" height="185" fill="#064e3b" opacity="0.92"/>`;
        } else if (epId === 'ep4') {
            const stadium = stg === 1 || stg === 4 || (isEnding && endingKey === 'e1');
            sky1 = stadium ? '#6e142e' : '#3b1557';
            sky2 = stadium ? '#3f0a1d' : '#1e1b4b';
            accent = '#fb7185';
            scenery = stadium ? `
                <polygon points="360,55 580,520 260,520" fill="#fef08a" opacity="0.12"/>
                <polygon points="920,55 1020,520 700,520" fill="#fef08a" opacity="0.12"/>
                <rect x="315" y="40" width="90" height="32" rx="8" fill="#fef08a" opacity="0.88"/>
                <rect x="875" y="40" width="90" height="32" rx="8" fill="#fef08a" opacity="0.88"/>
                <rect x="0" y="510" width="1280" height="210" fill="#15803d" opacity="0.9"/>
                <circle cx="640" cy="610" r="105" fill="none" stroke="#ffffff" stroke-width="4" opacity="0.5"/>
                <rect x="490" y="335" width="300" height="175" fill="none" stroke="#f8fafc" stroke-width="6" opacity="0.72"/>
                <line x1="490" y1="395" x2="790" y2="395" stroke="#ffffff" stroke-width="2" opacity="0.25"/>
                <line x1="490" y1="455" x2="790" y2="455" stroke="#ffffff" stroke-width="2" opacity="0.25"/>` : `
                <rect x="445" y="155" width="390" height="235" rx="18" fill="#0f172a" stroke="#facc15" stroke-width="5"/>
                <rect x="463" y="173" width="354" height="199" rx="10" fill="#16a34a" opacity="0.85"/>
                <line x1="640" y1="173" x2="640" y2="372" stroke="#ffffff" stroke-width="3" opacity="0.6"/>
                <circle cx="640" cy="272" r="46" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.65"/>
                <rect x="605" y="390" width="70" height="28" fill="#334155"/>
                <rect x="555" y="416" width="170" height="14" rx="7" fill="#475569"/>
                <rect x="0" y="520" width="1280" height="200" fill="#2e1065" opacity="0.88"/>`;
        } else if (epId === 'ep5') {
            sky1 = '#4c1d95'; sky2 = '#2e1065'; accent = '#c084fc';
            scenery = `
                <circle cx="640" cy="260" r="145" fill="#a855f7" opacity="0.18"/>
                <g transform="translate(555, 165) rotate(8)" opacity="0.9">
                    <rect x="0" y="0" width="174" height="174" rx="16" fill="#0f172a" stroke="#fde047" stroke-width="4"/>
                    <rect x="14" y="14" width="44" height="44" rx="6" fill="#ef4444"/><rect x="65" y="14" width="44" height="44" rx="6" fill="#facc15"/><rect x="116" y="14" width="44" height="44" rx="6" fill="#3b82f6"/>
                    <rect x="14" y="65" width="44" height="44" rx="6" fill="#22c55e"/><rect x="65" y="65" width="44" height="44" rx="6" fill="#ffffff"/><rect x="116" y="65" width="44" height="44" rx="6" fill="#f97316"/>
                    <rect x="14" y="116" width="44" height="44" rx="6" fill="#3b82f6"/><rect x="65" y="116" width="44" height="44" rx="6" fill="#ef4444"/><rect x="116" y="116" width="44" height="44" rx="6" fill="#facc15"/>
                </g>
                <rect x="0" y="530" width="1280" height="190" fill="#3b0764" opacity="0.88"/>`;
        } else {
            sky1 = '#7c1747'; sky2 = '#4a044e'; accent = '#f472b6';
            scenery = `
                <path d="M0 36 Q640 120 1280 36" fill="none" stroke="#fde047" stroke-width="4" opacity="0.85"/>
                <polygon points="180,55 230,61 202,110" fill="#f43f5e" opacity="0.9"/>
                <polygon points="360,71 410,75 384,124" fill="#38bdf8" opacity="0.9"/>
                <polygon points="560,80 610,81 585,130" fill="#facc15" opacity="0.92"/>
                <polygon points="760,77 810,73 786,122" fill="#22c55e" opacity="0.9"/>
                <polygon points="960,64 1010,58 988,108" fill="#a855f7" opacity="0.9"/>
                <ellipse cx="530" cy="240" rx="38" ry="48" fill="#f43f5e" opacity="0.82"/>
                <ellipse cx="750" cy="245" rx="38" ry="48" fill="#facc15" opacity="0.82"/>
                <line x1="530" y1="288" x2="555" y2="430" stroke="#fde68a" stroke-width="2.5"/>
                <line x1="750" y1="293" x2="725" y2="430" stroke="#fde68a" stroke-width="2.5"/>
                <rect x="595" y="345" width="90" height="82" rx="10" fill="#ec4899" stroke="#fde047" stroke-width="3"/>
                <rect x="633" y="345" width="14" height="82" fill="#fde047"/>
                <rect x="595" y="379" width="90" height="14" fill="#fde047"/>
                <rect x="0" y="525" width="1280" height="195" fill="#500724" opacity="0.9"/>
                <rect x="495" y="427" width="290" height="110" rx="14" fill="#831843" stroke="#fde047" stroke-width="3" opacity="0.9"/>`;
        }

        return `
            <svg class="vn-bg-layer" viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <defs>
                    <linearGradient id="${bgGrad}" x1="0" y1="0" x2="0.8" y2="1">
                        <stop offset="0%" stop-color="${sky1}"/>
                        <stop offset="100%" stop-color="${sky2}"/>
                    </linearGradient>
                    <radialGradient id="${glowGrad}" cx="50%" cy="35%" r="58%">
                        <stop offset="0%" stop-color="${accent}" stop-opacity="0.34"/>
                        <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <rect width="1280" height="720" fill="url(#${bgGrad})"/>
                <rect width="1280" height="720" fill="url(#${glowGrad})"/>
                ${scenery}
                <path d="M24 70 L24 24 L70 24 M1210 24 L1256 24 L1256 70 M24 650 L24 696 L70 696 M1210 696 L1256 696 L1256 650" fill="none" stroke="#fde047" stroke-width="3" opacity="0.55"/>
            </svg>`;
    }

    /* ---------------------------------------------------------------------
     * 3. LAYER 2: NHÂN VẬT CHÍNH — TÓC DÀY PHỒNG, MÁI RÕ, KHÔNG BỊ HÓI
     * --------------------------------------------------------------------- */
    function getHeroSvg(expr, accentColor, gender, variant, epId) {
        const accent = accentColor || '#38bdf8';
        const isGirl = gender === 'Nữ';
        const isAvatar = variant === 'avatar';
        const gradId = uid(isGirl ? 'suitF' : 'suitM');
        const auraId = uid('heroAura');
        const mouthClipId = uid('mouthClip');

        let eyesMarkup = '';
        let mouthMarkup = '';
        let extraMarkup = '';

        const lashLeft = isGirl ? `<path d="M71 91 L67 87 M74 88 L71 84" stroke="#0f172a" stroke-width="2" stroke-linecap="round"/>` : '';
        const lashRight = isGirl ? `<path d="M129 91 L133 87 M126 88 L129 84" stroke="#0f172a" stroke-width="2" stroke-linecap="round"/>` : '';

        if (expr === 'sparkle') {
            eyesMarkup = `
                <circle cx="80" cy="96" r="7" fill="#0f172a"/>
                <circle cx="120" cy="96" r="7" fill="#0f172a"/>
                <circle cx="83" cy="93" r="3" fill="#ffffff"/>
                <circle cx="123" cy="93" r="3" fill="#ffffff"/>
                <path d="M70 83 Q80 78 90 83" stroke="#3e2723" stroke-width="3.5" fill="none" stroke-linecap="round"/>
                <path d="M110 83 Q120 78 130 83" stroke="#3e2723" stroke-width="3.5" fill="none" stroke-linecap="round"/>
                ${lashLeft}${lashRight}`;
            mouthMarkup = `
                <g>
                    <path d="M85 114 Q100 116 115 114 Q115 129 100 129 Q85 129 85 114 Z" fill="#991b1b"/>
                    <g clip-path="url(#${mouthClipId})">
                        <rect x="85" y="113" width="30" height="4" rx="1" fill="#ffffff"/>
                        <ellipse cx="100" cy="128" rx="9" ry="5.5" fill="#fb7185"/>
                    </g>
                    <path d="M85 114 Q100 116 115 114 Q115 129 100 129 Q85 129 85 114 Z" fill="none" stroke="#7f1d1d" stroke-width="2.6" stroke-linejoin="round"/>
                </g>`;
            const sx1 = isAvatar ? 52 : 34;
            const sx2 = isAvatar ? 148 : 164;
            extraMarkup = `
                <path d="M${sx1} 44 L${sx1 + 3} 52 L${sx1 + 11} 55 L${sx1 + 3} 58 L${sx1} 66 L${sx1 - 3} 58 L${sx1 - 11} 55 L${sx1 - 3} 52 Z" fill="#fde047"/>
                <path d="M${sx2} 40 L${sx2 + 2.5} 47 L${sx2 + 9} 49.5 L${sx2 + 2.5} 52 L${sx2} 59 L${sx2 - 2.5} 52 L${sx2 - 9} 49.5 L${sx2 - 2.5} 47 Z" fill="#facc15"/>
                <circle cx="67" cy="108" r="6" fill="#fda4af" opacity="0.7"/>
                <circle cx="133" cy="108" r="6" fill="#fda4af" opacity="0.7"/>`;
        } else if (expr === 'worried') {
            eyesMarkup = `
                <ellipse cx="80" cy="98" rx="6.5" ry="7.5" fill="#0f172a"/>
                <ellipse cx="120" cy="98" rx="6.5" ry="7.5" fill="#0f172a"/>
                <circle cx="82" cy="95" r="2.2" fill="#ffffff"/>
                <circle cx="122" cy="95" r="2.2" fill="#ffffff"/>
                <path d="M70 88 L88 83" stroke="#3e2723" stroke-width="3.5" fill="none" stroke-linecap="round"/>
                <path d="M130 88 L112 83" stroke="#3e2723" stroke-width="3.5" fill="none" stroke-linecap="round"/>
                ${lashLeft}${lashRight}`;
            mouthMarkup = `<path d="M88 122 Q95 117 100 121 Q105 125 112 120" stroke="#7f1d1d" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
            extraMarkup = `<path d="M140 78 C145 88 148 94 140 100 C132 94 135 88 140 78 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="1.5"/>`;
        } else if (expr === 'crying') {
            eyesMarkup = `
                <path d="M72 95 L86 100 L72 105" stroke="#0f172a" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M128 95 L114 100 L128 105" stroke="#0f172a" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M75 106 L72 125" stroke="#38bdf8" stroke-width="4.5" stroke-linecap="round"/>
                <path d="M125 106 L128 125" stroke="#38bdf8" stroke-width="4.5" stroke-linecap="round"/>`;
            mouthMarkup = `<ellipse cx="100" cy="123" rx="10" ry="7" fill="#991b1b" stroke="#0f172a" stroke-width="2.5"/>`;
            const dx = isAvatar ? 144 : 156;
            extraMarkup = `
                <path d="M${dx} 46 C${dx + 5} 55 ${dx + 7} 60 ${dx} 65 C${dx - 7} 60 ${dx - 5} 55 ${dx} 46 Z" fill="#38bdf8"/>
                <path d="M${dx + 12} 56 C${dx + 16} 63 ${dx + 17} 67 ${dx + 12} 71 C${dx + 7} 67 ${dx + 8} 63 ${dx + 12} 56 Z" fill="#7dd3fc"/>`;
        } else {
            eyesMarkup = `
                <circle cx="80" cy="97" r="6.5" fill="#0f172a"/>
                <circle cx="120" cy="97" r="6.5" fill="#0f172a"/>
                <circle cx="82" cy="94" r="2.4" fill="#ffffff"/>
                <circle cx="122" cy="94" r="2.4" fill="#ffffff"/>
                <path d="M70 84 Q80 80 90 84" stroke="#3e2723" stroke-width="3.5" fill="none" stroke-linecap="round"/>
                <path d="M110 84 Q120 80 130 84" stroke="#3e2723" stroke-width="3.5" fill="none" stroke-linecap="round"/>
                ${lashLeft}${lashRight}`;
            mouthMarkup = `<path d="M88 118 Q100 127 112 118" stroke="#991b1b" stroke-width="3.8" fill="none" stroke-linecap="round"/>`;
            extraMarkup = `
                <circle cx="68" cy="108" r="5" fill="#fda4af" opacity="0.55"/>
                <circle cx="132" cy="108" r="5" fill="#fda4af" opacity="0.55"/>`;
        }

        const hairFill = isGirl ? '#4a2c24' : '#3e2723';
        const hairRim = '#a1887f';

        // Lớp tóc sau dày dặn, ôm gọn hai bên đầu
        const hairBackMarkup = isGirl ? `
            <path d="M44 92 C34 122 39 156 54 166 C64 152 64 128 60 104 Z" fill="${hairFill}" stroke="${hairRim}" stroke-width="1.8" stroke-linejoin="round"/>
            <path d="M156 92 C166 122 161 156 146 166 C136 152 136 128 140 104 Z" fill="${hairFill}" stroke="${hairRim}" stroke-width="1.8" stroke-linejoin="round"/>
            <ellipse cx="100" cy="84" rx="52" ry="52" fill="${hairFill}"/>
            <circle cx="50" cy="94" r="9" fill="#f43f5e" stroke="#fde047" stroke-width="2"/>
            <circle cx="150" cy="94" r="9" fill="#f43f5e" stroke="#fde047" stroke-width="2"/>` : `
            <ellipse cx="100" cy="80" rx="51" ry="48" fill="${hairFill}"/>`;

        // Lớp tóc trước phồng cao trên đỉnh đầu (y=28..30) & mái rủ gần lông mày (y=74..79)
        const hairFrontMarkup = isGirl ? `
            <path d="M48 100 C42 54 65 29 100 29 C135 29 158 54 152 100 L144 85 Q134 72 121 78 Q109 73 100 68 Q91 73 79 78 Q66 72 56 85 Z" fill="${hairFill}" stroke="${hairRim}" stroke-width="1.8" stroke-linejoin="round"/>
            <path d="M74 44 Q100 36 126 44" stroke="#bcaaa4" stroke-width="3.2" fill="none" stroke-linecap="round" opacity="0.48"/>
            <rect x="63" y="61" width="15" height="5.5" rx="2.7" transform="rotate(-16 63 61)" fill="#facc15"/>` : `
            <path d="M49 98 C43 54 66 29 100 29 C134 29 157 54 151 98 L144 83 Q133 70 120 79 Q109 67 96 78 Q84 68 72 79 Q61 72 56 84 Z" fill="${hairFill}" stroke="${hairRim}" stroke-width="1.8" stroke-linejoin="round"/>
            <path d="M76 44 Q100 36 124 44" stroke="#bcaaa4" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.45"/>
            <path d="M88 33 Q101 20 115 31" stroke="${hairRim}" stroke-width="3" fill="none" stroke-linecap="round"/>`;

        let bodyAccessory = '';
        let headAccessory = '';

        if (!isAvatar && epId) {
            if (epId === 'ep1') {
                headAccessory = `
                    <ellipse cx="100" cy="43" rx="58" ry="12" fill="#fbbf24" stroke="#b45309" stroke-width="2.5"/>
                    <path d="M67 41 C70 14 130 14 133 41 Z" fill="#f59e0b" stroke="#b45309" stroke-width="2.5"/>
                    <path d="M68 39 Q100 45 132 39" stroke="#ef4444" stroke-width="5" fill="none" stroke-linecap="round"/>`;
            } else if (epId === 'ep2') {
                headAccessory = `
                    <path d="M66 39 C52 24 68 8 86 16 C94 5 106 5 114 16 C132 8 148 24 134 39 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="2.5"/>
                    <rect x="66" y="35" width="68" height="12" rx="4" fill="#f8fafc" stroke="#94a3b8" stroke-width="2.2"/>`;
            } else if (epId === 'ep3') {
                bodyAccessory = `
                    <path d="M58 153 L68 224 M142 153 L132 224" stroke="#10b981" stroke-width="9" stroke-linecap="round"/>
                    <rect x="58" y="182" width="12" height="7" rx="2" fill="#fde047"/>
                    <rect x="130" y="182" width="12" height="7" rx="2" fill="#fde047"/>`;
            } else if (epId === 'ep4') {
                headAccessory = `
                    <path d="M51 64 Q100 47 149 64" stroke="#ef4444" stroke-width="11" fill="none" stroke-linecap="round"/>
                    <path d="M147 62 Q164 57 168 71 M147 66 Q162 73 159 85" stroke="#dc2626" stroke-width="5" fill="none" stroke-linecap="round"/>
                    <polygon points="100,49 102.5,55 109,55 104,58.5 106,65 100,61 94,65 96,58.5 91,55 97.5,55" fill="#fde047"/>`;
            } else if (epId === 'ep5') {
                bodyAccessory = `
                    <g transform="translate(56,174) rotate(-8)">
                        <rect width="22" height="22" rx="3.5" fill="#0f172a" stroke="#fde047" stroke-width="1.8"/>
                        <rect x="3" y="3" width="6.5" height="6.5" fill="#ef4444"/><rect x="12" y="3" width="6.5" height="6.5" fill="#38bdf8"/>
                        <rect x="3" y="12" width="6.5" height="6.5" fill="#22c55e"/><rect x="12" y="12" width="6.5" height="6.5" fill="#facc15"/>
                    </g>`;
            } else if (epId === 'ep6') {
                headAccessory = `
                    <path d="M58 51 Q100 33 142 51" fill="none" stroke="#fde047" stroke-width="4" stroke-linecap="round"/>
                    <polygon points="100,7 106,23 123,23 109,33 114,48 100,38 86,48 91,33 77,23 94,23" fill="#f43f5e" stroke="#fde047" stroke-width="2.5"/>`;
            }
        }

        const vb = isAvatar ? '42 24 116 122' : '0 0 200 230';
        const sizeAttr = isAvatar ? 'width="100%" height="100%"' : 'width="210" height="240"';

        return `
            <svg viewBox="${vb}" ${sizeAttr} aria-hidden="true">
                <defs>
                    <linearGradient id="${gradId}" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="${isGirl ? '#3730a3' : '#1e3a8a'}"/>
                        <stop offset="100%" stop-color="#0f172a"/>
                    </linearGradient>
                    <radialGradient id="${auraId}" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="${accent}" stop-opacity="0.28"/>
                        <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
                    </radialGradient>
                    <clipPath id="${mouthClipId}">
                        <path d="M85 114 Q100 116 115 114 Q115 129 100 129 Q85 129 85 114 Z"/>
                    </clipPath>
                </defs>
                <circle cx="100" cy="108" r="82" fill="url(#${auraId})"/>
                ${hairBackMarkup}
                <path d="M36 226 C38 168 62 148 100 148 C138 148 162 168 164 226 Z" fill="url(#${gradId})" stroke="#fde047" stroke-width="3"/>
                <polygon points="74,148 100,174 126,148" fill="#ffffff"/>
                <polygon points="84,154 100,188 116,154" fill="#ef4444" stroke="#b91c1c" stroke-width="1.5"/>
                <circle cx="132" cy="184" r="9" fill="#facc15" stroke="#b45309" stroke-width="2"/>
                ${bodyAccessory}
                <rect x="88" y="130" width="24" height="24" rx="8" fill="#fed7aa"/>
                <circle cx="54" cy="100" r="10" fill="#fed7aa" stroke="#ea580c" stroke-width="1.5"/>
                <circle cx="146" cy="100" r="10" fill="#fed7aa" stroke="#ea580c" stroke-width="1.5"/>
                <ellipse cx="100" cy="96" rx="46" ry="48" fill="#ffedd5" stroke="#fdba74" stroke-width="2.5"/>
                ${hairFrontMarkup}
                ${eyesMarkup}
                ${mouthMarkup}
                ${headAccessory}
                ${extraMarkup}
            </svg>`;
    }

    /* ---------------------------------------------------------------------
     * 4. NHÂN VẬT PHỤ (NPC) — ĐỈNH TÓC PHỒNG RÕ, HẠ MÁI ÔM TRÁN
     * --------------------------------------------------------------------- */
    function buildNpcPortrait(opts) {
        const {
            shirtColor, collarMarkup = '', hairBack = '', hairFront = '',
            eyebrowColor = '#3e2723', faceExtra = '', propMarkup = '',
            mouthPath = 'M109 114 Q120 123 131 114', mouthColor = '#be123c'
        } = opts;
        return `
            ${hairBack}
            <path d="M58 212 C62 158 84 144 120 144 C156 144 178 158 182 212 Z" fill="${shirtColor}" stroke="#fde047" stroke-width="3"/>
            ${collarMarkup}
            <rect x="108" y="126" width="24" height="24" rx="8" fill="#fed7aa"/>
            <circle cx="80" cy="98" r="9" fill="#fed7aa" stroke="#ea580c" stroke-width="1.5"/>
            <circle cx="160" cy="98" r="9" fill="#fed7aa" stroke="#ea580c" stroke-width="1.5"/>
            <ellipse cx="120" cy="94" rx="40" ry="42" fill="#ffedd5" stroke="#fdba74" stroke-width="2.5"/>
            ${hairFront}
            <path d="M96 84 Q104 80 112 84" stroke="${eyebrowColor}" stroke-width="3" fill="none" stroke-linecap="round"/>
            <path d="M128 84 Q136 80 144 84" stroke="${eyebrowColor}" stroke-width="3" fill="none" stroke-linecap="round"/>
            <circle cx="104" cy="95" r="5" fill="#0f172a"/><circle cx="105.8" cy="93" r="1.8" fill="#ffffff"/>
            <circle cx="136" cy="95" r="5" fill="#0f172a"/><circle cx="137.8" cy="93" r="1.8" fill="#ffffff"/>
            <circle cx="92" cy="105" r="4.5" fill="#fda4af" opacity="0.55"/>
            <circle cx="148" cy="105" r="4.5" fill="#fda4af" opacity="0.55"/>
            <path d="${mouthPath}" stroke="${mouthColor}" stroke-width="3.2" fill="none" stroke-linecap="round"/>
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
                <rect x="46" y="24" width="148" height="184" rx="18" fill="#0f172a" stroke="#fde047" stroke-width="4"/>
                <rect x="56" y="36" width="128" height="142" rx="10" fill="#0ea5e9" opacity="0.28"/>
                <!-- Ông -->
                <path d="M62 178 C64 146 76 138 94 138 C110 138 120 146 122 178 Z" fill="#1d4ed8"/>
                <rect x="87" y="126" width="14" height="16" rx="5" fill="#fed7aa"/>
                <circle cx="94" cy="105" r="23" fill="#ffedd5" stroke="#fdba74" stroke-width="2"/>
                <path d="M70 105 C69 82 78 73 94 73 C110 73 119 82 118 105 L114 96 Q104 88 94 92 Q84 88 74 96 Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.2" stroke-linejoin="round"/>
                <circle cx="86" cy="105" r="3" fill="#0f172a"/><circle cx="102" cy="105" r="3" fill="#0f172a"/>
                <path d="M87 115 Q94 120 101 115" stroke="#9a3412" stroke-width="2.4" fill="none" stroke-linecap="round"/>
                <!-- Bà -->
                <path d="M118 178 C120 148 132 140 148 140 C164 140 176 148 178 178 Z" fill="#db2777"/>
                <rect x="141" y="128" width="14" height="15" rx="5" fill="#fed7aa"/>
                <circle cx="164" cy="80" r="8" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1.2"/>
                <circle cx="148" cy="108" r="21.5" fill="#ffedd5" stroke="#fdba74" stroke-width="2"/>
                <path d="M125 108 C124 86 133 78 148 78 C163 78 172 86 171 108 L167 99 Q158 91 148 95 Q138 91 129 99 Z" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1.2" stroke-linejoin="round"/>
                <circle cx="141" cy="108" r="2.8" fill="#0f172a"/><circle cx="155" cy="108" r="2.8" fill="#0f172a"/>
                <path d="M142 117 Q148 122 154 117" stroke="#be123c" stroke-width="2.4" fill="none" stroke-linecap="round"/>
                <circle cx="120" cy="193" r="6" fill="#22c55e"/>` : buildNpcPortrait({
                    shirtColor: '#0284c7',
                    collarMarkup: `<polygon points="100,144 120,168 140,144" fill="#ffffff"/>`,
                    hairBack: `<ellipse cx="120" cy="79" rx="45" ry="43" fill="#3e2723"/>`,
                    hairFront: `
                        <path d="M75 96 C71 54 90 35 120 35 C150 35 169 54 165 96 L158 82 Q146 70 132 76 Q116 68 100 77 Q88 72 82 83 Z" fill="#3e2723" stroke="#a1887f" stroke-width="1.8" stroke-linejoin="round"/>
                        <path d="M98 48 Q120 42 142 48" stroke="#bcaaa4" stroke-width="2.8" fill="none" stroke-linecap="round" opacity="0.42"/>`,
                    faceExtra: `
                        <rect x="92" y="88" width="22" height="13" rx="4" fill="none" stroke="#0f172a" stroke-width="2.2"/>
                        <rect x="126" y="88" width="22" height="13" rx="4" fill="none" stroke="#0f172a" stroke-width="2.2"/>
                        <line x1="114" y1="94" x2="126" y2="94" stroke="#0f172a" stroke-width="2.2"/>`
                });
        } else if (epId === 'ep2') {
            npcLabel = 'Mẹ Giám Khảo MasterChef';
            npcArt = buildNpcPortrait({
                shirtColor: '#be185d',
                collarMarkup: `<path d="M90 150 L150 150 L156 212 L84 212 Z" fill="#fdf2f8" opacity="0.92"/>`,
                hairBack: `
                    <circle cx="158" cy="54" r="16" fill="#4a2c24" stroke="#a1887f" stroke-width="1.8"/>
                    <ellipse cx="120" cy="81" rx="46" ry="45" fill="#4a2c24"/>`,
                hairFront: `
                    <path d="M74 98 C70 54 90 35 120 35 C150 35 170 54 166 98 L158 83 Q144 70 124 76 Q114 70 104 76 Q90 71 82 83 Z" fill="#4a2c24" stroke="#a1887f" stroke-width="1.8" stroke-linejoin="round"/>
                    <path d="M96 48 Q120 41 144 48" stroke="#bcaaa4" stroke-width="2.8" fill="none" stroke-linecap="round" opacity="0.45"/>`,
                propMarkup: `
                    <g transform="translate(178, 128) rotate(14)">
                        <rect x="-5" y="0" width="10" height="72" rx="5" fill="#facc15" stroke="#b45309" stroke-width="1.8"/>
                        <ellipse cx="0" cy="-6" rx="13" ry="18" fill="#fde047" stroke="#b45309" stroke-width="1.8"/>
                    </g>`
            });
        } else if (epId === 'ep3') {
            npcLabel = 'Cô Chủ Tiệm Balo';
            npcArt = buildNpcPortrait({
                shirtColor: '#059669',
                collarMarkup: `<polygon points="100,144 120,170 140,144" fill="#fef3c7"/>`,
                hairBack: `
                    <path d="M74 88 C66 122 68 150 86 156 L154 156 C172 150 174 122 166 88 Z" fill="#5d4037" stroke="#bcaaa4" stroke-width="1.8" stroke-linejoin="round"/>
                    <ellipse cx="120" cy="80" rx="46" ry="44" fill="#5d4037"/>`,
                hairFront: `
                    <path d="M74 98 C70 54 90 35 120 35 C150 35 170 54 166 98 L158 83 Q144 72 130 78 Q120 71 110 78 Q96 72 82 83 Z" fill="#5d4037" stroke="#bcaaa4" stroke-width="1.8" stroke-linejoin="round"/>
                    <path d="M98 48 Q120 41 142 48" stroke="#d7ccc8" stroke-width="2.8" fill="none" stroke-linecap="round" opacity="0.45"/>`,
                propMarkup: `
                    <g transform="translate(36, 136)">
                        <path d="M12 0 C12 -10 32 -10 32 0" fill="none" stroke="#fde047" stroke-width="4" stroke-linecap="round"/>
                        <rect x="0" y="0" width="44" height="54" rx="12" fill="#f59e0b" stroke="#fde047" stroke-width="3"/>
                        <rect x="8" y="22" width="28" height="20" rx="5" fill="#fef3c7"/>
                    </g>`
            });
        } else if (epId === 'ep4') {
            npcLabel = 'Ông Nội & Hội CĐV';
            npcArt = buildNpcPortrait({
                shirtColor: '#be123c',
                collarMarkup: `<polygon points="100,144 120,168 140,144" fill="#fde047"/>`,
                hairBack: `<ellipse cx="120" cy="80" rx="45" ry="42" fill="#e2e8f0"/>`,
                hairFront: `
                    <path d="M75 94 C72 54 91 37 120 37 C149 37 168 54 165 94 L158 80 Q144 69 128 75 Q120 68 112 75 Q96 69 82 80 Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.8" stroke-linejoin="round"/>`,
                eyebrowColor: '#94a3b8',
                mouthPath: 'M112 119 Q120 125 128 119',
                mouthColor: '#9a3412',
                faceExtra: `<path d="M103 114 Q112 106 120 111 Q128 106 137 114" stroke="#cbd5e1" stroke-width="6.5" fill="none" stroke-linecap="round"/>`,
                propMarkup: `
                    <g transform="translate(182, 174)">
                        <circle cx="0" cy="0" r="22" fill="#ffffff" stroke="#0f172a" stroke-width="3"/>
                        <polygon points="0,-12 10,-2 6,11 -6,11 -10,-2" fill="#0f172a"/>
                    </g>`
            });
        } else if (epId === 'ep5') {
            npcLabel = 'Bạn Tí — Đấu Trường Rubik';
            npcArt = buildNpcPortrait({
                shirtColor: '#6d28d9',
                collarMarkup: `<path d="M98 144 Q120 164 142 144" fill="none" stroke="#c4b5fd" stroke-width="5" stroke-linecap="round"/>`,
                hairBack: `<ellipse cx="120" cy="80" rx="46" ry="44" fill="#3e2723"/>`,
                hairFront: `
                    <path d="M74 96 C70 54 90 34 120 34 C150 34 170 54 166 96 L158 82 Q146 70 134 78 Q122 67 110 78 Q98 69 86 79 L74 96 Z" fill="#3e2723" stroke="#a1887f" stroke-width="1.8" stroke-linejoin="round"/>
                    <path d="M105 39 L117 22 L127 37 L137 25 L141 40" fill="#3e2723" stroke="#a1887f" stroke-width="1.8" stroke-linejoin="round"/>
                    <path d="M96 48 Q120 42 144 48" stroke="#bcaaa4" stroke-width="2.6" fill="none" stroke-linecap="round" opacity="0.4"/>`,
                mouthPath: 'M108 113 Q122 124 134 111',
                propMarkup: `
                    <g transform="translate(162, 146) rotate(-10)">
                        <rect width="42" height="42" rx="6" fill="#0f172a" stroke="#fde047" stroke-width="2.5"/>
                        <rect x="4" y="4" width="15" height="15" rx="2" fill="#ef4444"/><rect x="23" y="4" width="15" height="15" rx="2" fill="#38bdf8"/>
                        <rect x="4" y="23" width="15" height="15" rx="2" fill="#22c55e"/><rect x="23" y="23" width="15" height="15" rx="2" fill="#facc15"/>
                    </g>`
            });
        } else {
            npcLabel = stageNum <= 2 ? 'Bà Ngoại Qua Video' : 'Mẹ Bất Ngờ';
            npcArt = stageNum <= 2 ? `
                <rect x="52" y="24" width="136" height="184" rx="18" fill="#0f172a" stroke="#f472b6" stroke-width="4"/>
                <rect x="62" y="36" width="116" height="142" rx="10" fill="#ec4899" opacity="0.22"/>
                <path d="M76 178 C78 144 96 134 120 134 C144 134 162 144 164 178 Z" fill="#db2777"/>
                <polygon points="106,134 120,150 134,134" fill="#fce7f3"/>
                <rect x="111" y="120" width="18" height="18" rx="6" fill="#fed7aa"/>
                <circle cx="120" cy="54" r="11" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.4"/>
                <circle cx="120" cy="96" r="27" fill="#ffedd5" stroke="#fdba74" stroke-width="2"/>
                <path d="M90 96 C88 68 100 58 120 58 C140 58 152 68 150 96 L145 85 Q134 75 120 80 Q106 75 95 85 Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.4" stroke-linejoin="round"/>
                <circle cx="109" cy="96" r="4" fill="#0f172a"/><circle cx="131" cy="96" r="4" fill="#0f172a"/>
                <circle cx="109" cy="96" r="8" fill="none" stroke="#475569" stroke-width="1.8"/>
                <circle cx="131" cy="96" r="8" fill="none" stroke="#475569" stroke-width="1.8"/>
                <line x1="117" y1="96" x2="123" y2="96" stroke="#475569" stroke-width="1.8"/>
                <path d="M111 109 Q120 116 129 109" stroke="#be123c" stroke-width="2.8" fill="none" stroke-linecap="round"/>
                <circle cx="120" cy="193" r="6" fill="#22c55e"/>` : buildNpcPortrait({
                    shirtColor: '#be185d',
                    collarMarkup: `<path d="M98 146 Q120 162 142 146" fill="none" stroke="#fde047" stroke-width="4" stroke-linecap="round"/>`,
                    hairBack: `
                        <circle cx="158" cy="54" r="15" fill="#4a2c24" stroke="#a1887f" stroke-width="1.8"/>
                        <ellipse cx="120" cy="81" rx="46" ry="45" fill="#4a2c24"/>`,
                    hairFront: `
                        <path d="M74 98 C70 54 90 35 120 35 C150 35 170 54 166 98 L158 83 Q144 70 124 76 Q114 70 104 76 Q90 71 82 83 Z" fill="#4a2c24" stroke="#a1887f" stroke-width="1.8" stroke-linejoin="round"/>
                        <path d="M96 48 Q120 41 144 48" stroke="#bcaaa4" stroke-width="2.8" fill="none" stroke-linecap="round" opacity="0.45"/>`,
                    propMarkup: `
                        <path d="M180 68 C180 60 190 58 193 65 C196 58 206 60 206 68 C206 77 193 85 193 85 C193 85 180 77 180 68 Z" fill="#f43f5e" stroke="#fde047" stroke-width="2"/>`
                });
        }

        return `
            <div style="display:flex;flex-direction:column;align-items:center;justify-content:flex-end;text-align:center;">
                <svg viewBox="0 0 240 215" width="224" height="200" aria-hidden="true">
                    <defs>
                        <radialGradient id="${ringId}" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stop-color="#facc15" stop-opacity="0.22"/>
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
     * 5. LAYER 3: VẬT PHẨM TỐI GIẢN (KHUNG SẠCH + EMOJI SẮC NÉT)
     * --------------------------------------------------------------------- */
    function getPropSvg(epId, stageNum, origChoiceIdx, ch) {
        const bgId = uid('propBg');
        const srcType = (ch && ch.sourceType) || 'internet';
        const styles = {
            internet: { bg1: '#0c4a6e', bg2: '#0f172a', stroke: '#38bdf8', badgeEmoji: '🌐' },
            local:    { bg1: '#713f12', bg2: '#1c1917', stroke: '#facc15', badgeEmoji: '💻' },
            guess:    { bg1: '#7f1d1d', bg2: '#1f1014', stroke: '#fb7185', badgeEmoji: '🎲' }
        };
        const st = styles[srcType] || styles.internet;
        const icon = (ch && ch.propIcon) ? ch.propIcon : '✨';

        return `
            <svg viewBox="0 0 140 140" width="124" height="124" aria-hidden="true">
                <defs>
                    <linearGradient id="${bgId}" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="${st.bg1}"/>
                        <stop offset="100%" stop-color="${st.bg2}"/>
                    </linearGradient>
                </defs>
                <!-- Khung bo tròn tối giản, sạch sẽ -->
                <rect x="14" y="14" width="112" height="112" rx="28" fill="url(#${bgId})" stroke="${st.stroke}" stroke-width="3"/>
                <text x="70" y="72" text-anchor="middle" dominant-baseline="central" font-size="56">${icon}</text>
                <!-- Nhãn tròn nhỏ phân biệt nguồn tin bằng Emoji -->
                <circle cx="110" cy="110" r="19" fill="#0f172a" stroke="${st.stroke}" stroke-width="2.5"/>
                <text x="110" y="111" text-anchor="middle" dominant-baseline="central" font-size="19">${st.badgeEmoji}</text>
            </svg>`;
    }

    /* ---------------------------------------------------------------------
     * 6. HUY HIỆU KẾT CỤC TỐI GIẢN DÙNG EMOJI & ICON PHÂN LOẠI NGUỒN TIN
     * --------------------------------------------------------------------- */
    function getEndingEmblemSvg(endingKey) {
        const gId = uid('endBg');
        const map = {
            e1: { bg1: '#14532d', bg2: '#052e16', stroke: '#fde047', emoji: '🏆' },
            e2: { bg1: '#78350f', bg2: '#451a03', stroke: '#facc15', emoji: '😅' },
            e3: { bg1: '#7f1d1d', bg2: '#2a0a0a', stroke: '#f87171', emoji: '⛈️' }
        };
        const cfg = map[endingKey] || map.e3;

        return `
            <svg viewBox="0 0 120 120" width="96" height="96" aria-hidden="true">
                <defs>
                    <linearGradient id="${gId}" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="${cfg.bg1}"/>
                        <stop offset="100%" stop-color="${cfg.bg2}"/>
                    </linearGradient>
                </defs>
                <circle cx="60" cy="60" r="48" fill="url(#${gId})" stroke="${cfg.stroke}" stroke-width="3.5"/>
                <text x="60" y="62" text-anchor="middle" dominant-baseline="central" font-size="50">${cfg.emoji}</text>
            </svg>`;
    }

    function getSourceIconSvg(sourceType) {
        if (sourceType === 'internet') {
            return `<svg viewBox="0 0 24 24" width="18" height="18" style="vertical-align:middle;margin-right:4px;" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.2"/><ellipse cx="12" cy="12" rx="4.5" ry="9" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="1.8"/></svg>`;
        }
        if (sourceType === 'local') {
            return `<svg viewBox="0 0 24 24" width="18" height="18" style="vertical-align:middle;margin-right:4px;" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2.2"/><line x1="8" y1="20" x2="16" y2="20" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><line x1="12" y1="16" x2="12" y2="20" stroke="currentColor" stroke-width="2.2"/></svg>`;
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