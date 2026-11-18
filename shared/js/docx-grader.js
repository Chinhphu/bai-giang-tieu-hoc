/**
 * DOCX-GRADER.JS - Auto-Grading & Inspection Module for Microsoft Word (.docx) Files
 * 100% Offline-First | Zero External Dependencies | Pure JavaScript & Web Standards
 * Compatible with file:/// and modern browsers (DecompressionStream 'deflate-raw')
 * 
 * Capabilities:
 * - Unpack .docx (ZIP) archive in pure JS + DecompressionStream('deflate-raw').
 * - Parse word/document.xml via DOMParser and extract paragraphs, runs, styles, images.
 * - Detect font properties: font size (halve w:sz to pt), bold, italic, underline, align.
 * - Classify color groups (RED, BLUE, PURPLE, BLACK) via both hex RGB and w:themeColor.
 * - Detect image text wrapping (<wp:wrapSquare> in <w:drawing>).
 * - Evaluate 4 rule types: 'paragraph_format', 'image_wrap', 'image_exists', 'text_contains'.
 * - Support Single File Dropzone & Batch Mode (up to 35+ files with TT27 T/H/C ratings).
 * - Built-in generator & 1-click download of uncompressed raw starter .docx (ZIP method 0).
 */

(function (window) {
    'use strict';

    // =========================================================================
    // 1. CRC-32 & ZIP METHOD 0 BUILDER (Raw uncompressed .docx generator)
    // =========================================================================
    const CRC_TABLE = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
        let c = i;
        for (let j = 0; j < 8; j++) {
            c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
        }
        CRC_TABLE[i] = c;
    }

    function calculateCrc32(bytes) {
        let crc = 0xFFFFFFFF;
        for (let i = 0; i < bytes.length; i++) {
            crc = CRC_TABLE[(crc ^ bytes[i]) & 0xFF] ^ (crc >>> 8);
        }
        return (crc ^ 0xFFFFFFFF) >>> 0;
    }

    function stringToUtf8Bytes(str) {
        return new TextEncoder().encode(str);
    }

    class SimpleZipBuilder {
        constructor() {
            this.files = [];
        }

        addFile(path, content) {
            const bytes = (typeof content === 'string')
                ? stringToUtf8Bytes(content)
                : (content instanceof Uint8Array ? content : new Uint8Array(content));
            this.files.push({
                path: path.replace(/\\/g, '/'),
                bytes: bytes,
                crc: calculateCrc32(bytes),
                size: bytes.length
            });
        }

        buildUint8Array() {
            let totalLocalHeadersSize = 0;
            let totalCentralDirSize = 0;

            this.files.forEach(file => {
                const nameBytes = stringToUtf8Bytes(file.path);
                file.nameBytes = nameBytes;
                file.localHeaderOffset = totalLocalHeadersSize;
                totalLocalHeadersSize += 30 + nameBytes.length + file.size;
                totalCentralDirSize += 46 + nameBytes.length;
            });

            const totalSize = totalLocalHeadersSize + totalCentralDirSize + 22;
            const buffer = new Uint8Array(totalSize);
            const view = new DataView(buffer.buffer);
            let offset = 0;

            // 1. Write Local File Headers & Data
            this.files.forEach(file => {
                view.setUint32(offset, 0x04034b50, true); // Local header signature
                view.setUint16(offset + 4, 20, true);      // Version needed
                view.setUint16(offset + 6, 0, true);       // General purpose flag
                view.setUint16(offset + 8, 0, true);       // Compression method: 0 (STORED)
                view.setUint16(offset + 10, 0, true);      // Mod time
                view.setUint16(offset + 12, 0x546b, true); // Mod date (2026-11-11)
                view.setUint32(offset + 14, file.crc, true);
                view.setUint32(offset + 18, file.size, true); // Compressed size
                view.setUint32(offset + 22, file.size, true); // Uncompressed size
                view.setUint16(offset + 26, file.nameBytes.length, true);
                view.setUint16(offset + 28, 0, true);      // Extra length

                offset += 30;
                buffer.set(file.nameBytes, offset);
                offset += file.nameBytes.length;
                buffer.set(file.bytes, offset);
                offset += file.size;
            });

            // 2. Write Central Directory Headers
            const cdOffset = offset;
            this.files.forEach(file => {
                view.setUint32(offset, 0x02014b50, true); // Central dir signature
                view.setUint16(offset + 4, 20, true);     // Version made by
                view.setUint16(offset + 6, 20, true);     // Version needed
                view.setUint16(offset + 8, 0, true);      // Flag
                view.setUint16(offset + 10, 0, true);     // Method: 0
                view.setUint16(offset + 12, 0, true);     // Mod time
                view.setUint16(offset + 14, 0x546b, true); // Mod date
                view.setUint32(offset + 16, file.crc, true);
                view.setUint32(offset + 20, file.size, true);
                view.setUint32(offset + 24, file.size, true);
                view.setUint16(offset + 28, file.nameBytes.length, true);
                view.setUint16(offset + 30, 0, true);     // Extra length
                view.setUint16(offset + 32, 0, true);     // Comment length
                view.setUint16(offset + 34, 0, true);     // Disk start
                view.setUint16(offset + 36, 0, true);     // Internal file attr
                view.setUint32(offset + 38, 0, true);     // External file attr
                view.setUint32(offset + 42, file.localHeaderOffset, true);

                offset += 46;
                buffer.set(file.nameBytes, offset);
                offset += file.nameBytes.length;
            });

            // 3. Write End of Central Directory (EOCD)
            view.setUint32(offset, 0x06054b50, true);
            view.setUint16(offset + 4, 0, true);          // Disk number
            view.setUint16(offset + 6, 0, true);          // Start disk
            view.setUint16(offset + 8, this.files.length, true); // Entries on disk
            view.setUint16(offset + 10, this.files.length, true); // Total entries
            view.setUint32(offset + 12, totalCentralDirSize, true); // CD size
            view.setUint32(offset + 16, cdOffset, true); // CD offset
            view.setUint16(offset + 20, 0, true);         // Comment length

            return buffer;
        }
    }

    // =========================================================================
    // 2. ZIP DECOMPRESSION & READER (Pure JS + DecompressionStream)
    // =========================================================================
    async function decompressDeflateRaw(bytes) {
        if (typeof DecompressionStream === 'function') {
            const ds = new DecompressionStream('deflate-raw');
            const writer = ds.writable.getWriter();
            writer.write(bytes);
            writer.close();
            const response = new Response(ds.readable);
            const arrayBuffer = await response.arrayBuffer();
            return new Uint8Array(arrayBuffer);
        }
        // Fallback for Node.js if global DecompressionStream not present
        if (typeof require === 'function') {
            const zlib = require('zlib');
            return new Promise((resolve, reject) => {
                zlib.inflateRaw(bytes, (err, res) => {
                    if (err) reject(err);
                    else resolve(new Uint8Array(res));
                });
            });
        }
        throw new Error("Môi trường không hỗ trợ DecompressionStream('deflate-raw')");
    }

    class SimpleZipReader {
        constructor(uint8Array) {
            this.bytes = uint8Array;
            this.view = new DataView(uint8Array.buffer, uint8Array.byteOffset, uint8Array.byteLength);
            this.entries = new Map();
        }

        async parse() {
            // Find EOCD (0x06054b50) scanning backwards
            let eocdOffset = -1;
            const maxScan = Math.min(this.bytes.length, 65557);
            for (let i = this.bytes.length - 22; i >= this.bytes.length - maxScan; i--) {
                if (this.view.getUint32(i, true) === 0x06054b50) {
                    eocdOffset = i;
                    break;
                }
            }

            if (eocdOffset === -1) {
                throw new Error("Tệp không đúng định dạng nén ZIP hoặc .docx bị hỏng!");
            }

            const totalEntries = this.view.getUint16(eocdOffset + 10, true);
            const cdOffset = this.view.getUint32(eocdOffset + 16, true);

            let offset = cdOffset;
            for (let i = 0; i < totalEntries; i++) {
                if (offset + 46 > this.bytes.length) break;
                const sig = this.view.getUint32(offset, true);
                if (sig !== 0x02014b50) break;

                const method = this.view.getUint16(offset + 10, true);
                const compressedSize = this.view.getUint32(offset + 20, true);
                const uncompressedSize = this.view.getUint32(offset + 24, true);
                const nameLen = this.view.getUint16(offset + 28, true);
                const extraLen = this.view.getUint16(offset + 30, true);
                const commentLen = this.view.getUint16(offset + 32, true);
                const localHeaderOffset = this.view.getUint32(offset + 42, true);

                const nameBytes = this.bytes.subarray(offset + 46, offset + 46 + nameLen);
                const fileName = new TextDecoder('utf-8').decode(nameBytes);

                this.entries.set(fileName.replace(/\\/g, '/'), {
                    fileName,
                    method,
                    compressedSize,
                    uncompressedSize,
                    localHeaderOffset
                });

                offset += 46 + nameLen + extraLen + commentLen;
            }
        }

        hasFile(path) {
            return this.entries.has(path.replace(/\\/g, '/'));
        }

        getFileNames() {
            return Array.from(this.entries.keys());
        }

        async extractFileBytes(path) {
            const normalized = path.replace(/\\/g, '/');
            const entry = this.entries.get(normalized);
            if (!entry) return null;

            const lhOffset = entry.localHeaderOffset;
            const sig = this.view.getUint32(lhOffset, true);
            if (sig !== 0x04034b50) {
                throw new Error(`Local header hỏng tại ${normalized}`);
            }

            const nameLen = this.view.getUint16(lhOffset + 26, true);
            const extraLen = this.view.getUint16(lhOffset + 28, true);
            const dataOffset = lhOffset + 30 + nameLen + extraLen;
            const compressedSlice = this.bytes.subarray(dataOffset, dataOffset + entry.compressedSize);

            if (entry.method === 0) {
                return compressedSlice;
            } else if (entry.method === 8) {
                return await decompressDeflateRaw(compressedSlice);
            } else {
                throw new Error(`Phương thức nén không hỗ trợ: ${entry.method}`);
            }
        }

        async extractFileText(path) {
            const bytes = await this.extractFileBytes(path);
            if (!bytes) return null;
            return new TextDecoder('utf-8').decode(bytes);
        }
    }

    // =========================================================================
    // 3. COLOR CLASSIFIER & NORMALIZER
    // =========================================================================
    function classifyColorGroup(hexVal, themeColor) {
        const theme = (themeColor || '').toLowerCase();
        if (theme === 'text1' || theme === 'text2' || theme === 'dark1' || theme === 'dark2') {
            return 'BLACK';
        }
        if (theme === 'hyperlink' || theme === 'accent1' || theme === 'accent5') {
            return 'BLUE';
        }

        const raw = (hexVal || '').trim().replace(/^#/, '').toUpperCase();
        if (!raw || raw === 'AUTO') return 'BLACK';

        // Known hex mapping
        const REDS = ['FF0000', 'C00000', 'E00000', 'CC0000', 'E74C3C', 'D32F2F', 'EF4444', 'DC2626'];
        const BLUES = ['0070C0', '002060', '418AB3', '2E75B6', '1F4E79', '4472C4', '0000FF', '1A73E8', '0284C7', '0369A1', '2563EB', '3B82F6', '0EA5E9'];
        const PURPLES = ['7030A0', '800080', '660066', '8E44AD', '9B59B6', 'A855F7', '7C3AED', '9333EA', '6B21A8'];
        const GREENS = ['00B050', '70AD47', '385723', '548235', '10B981', '059669', '15803D', '16A34A', '22C55E', '008000'];
        const ORANGES = ['ED7D31', 'F59E0B', 'F97316', 'FFC000', 'C65911', 'FF7F00', 'FFA500', 'FB923C'];
        const BLACKS = ['000000', '262626', '595959', '1F2937', '111827', '333333', '0F172A', '000'];

        if (REDS.includes(raw)) return 'RED';
        if (BLUES.includes(raw)) return 'BLUE';
        if (PURPLES.includes(raw)) return 'PURPLE';
        if (GREENS.includes(raw)) return 'GREEN';
        if (ORANGES.includes(raw)) return 'ORANGE';
        if (BLACKS.includes(raw)) return 'BLACK';

        // RGB numeric heuristics
        if (raw.length === 6) {
            const r = parseInt(raw.slice(0, 2), 16) || 0;
            const g = parseInt(raw.slice(2, 4), 16) || 0;
            const b = parseInt(raw.slice(4, 6), 16) || 0;

            if (r < 70 && g < 70 && b < 70) return 'BLACK';
            if (r > 150 && g < 90 && b < 90) return 'RED';
            if (r > 100 && b > 120 && g < 100) return 'PURPLE';
            if (b > 130 && b > r + 25 && b > g + 15) return 'BLUE';
            if (g > 120 && g > r + 20 && g > b + 20) return 'GREEN';
            if (r > 180 && g > 90 && g < 180 && b < 80) return 'ORANGE';
        }

        return raw ? 'CUSTOM' : 'BLACK';
    }

    // =========================================================================
    // 4. DOCUMENT XML INSPECTOR & PARSER
    // =========================================================================
    class DocxDocument {
        constructor(xmlDoc, rawXml, zipReader) {
            this.xmlDoc = xmlDoc;
            this.rawXml = rawXml;
            this.zipReader = zipReader;
            this.paragraphs = [];
            this.hasImages = false;
            this.hasSquareWrap = false;
            this.parse();
        }

        parse() {
            // Check images in document XML or media folder
            const allDrawings = this.getElementsByTagNames(['w:drawing', 'drawing', 'w:pict', 'pict']);
            const mediaFiles = this.zipReader ? this.zipReader.getFileNames().filter(f => f.startsWith('word/media/')) : [];
            this.hasImages = (allDrawings.length > 0) || (mediaFiles.length > 0) || (this.rawXml.indexOf('<w:drawing') !== -1) || (this.rawXml.indexOf('<wp:inline') !== -1) || (this.rawXml.indexOf('<wp:anchor') !== -1);

            // Check Square Wrap
            const wrapSquares = this.getElementsByTagNames(['wp:wrapSquare', 'wrapSquare']);
            this.hasSquareWrap = (wrapSquares.length > 0) || (this.rawXml.indexOf('wrapSquare') !== -1);
            const wrapTights = this.getElementsByTagNames(['wp:wrapTight', 'wrapTight']);
            this.hasTightWrap = (wrapTights.length > 0) || (this.rawXml.indexOf('wrapTight') !== -1);
            const wrapTopAndBottoms = this.getElementsByTagNames(['wp:wrapTopAndBottom', 'wrapTopAndBottom']);
            this.hasTopAndBottomWrap = (wrapTopAndBottoms.length > 0) || (this.rawXml.indexOf('wrapTopAndBottom') !== -1);

            // Check Picture Border: <a:ln> with outline / stroke inside drawing or rawXml
            const lnElements = this.getElementsByTagNames(['a:ln', 'ln']);
            this.hasPictureBorder = (lnElements.length > 0) || (this.rawXml.indexOf('<a:ln') !== -1) || (this.rawXml.indexOf('strokecolor=') !== -1);

            // Check Picture Styles / Effects: shadow, rounded corners, glow, reflection
            const effectElements = this.getElementsByTagNames(['a:effectLst', 'effectLst', 'a:outerShdw', 'outerShdw']);
            this.hasPictureStyle = (effectElements.length > 0) ||
                (this.rawXml.indexOf('<a:effectLst') !== -1) ||
                (this.rawXml.indexOf('<a:outerShdw') !== -1) ||
                (this.rawXml.indexOf('roundRect') !== -1) ||
                (this.rawXml.indexOf('snipRound') !== -1) ||
                (this.rawXml.indexOf('<a:glow') !== -1) ||
                (this.rawXml.indexOf('<a:reflection') !== -1);

            // Check Page Background / Page Color
            this.hasPageColor = (this.rawXml.indexOf('<w:background') !== -1) || (this.rawXml.indexOf('background') !== -1 && this.rawXml.indexOf('w:color') !== -1);

            // Check Page Border
            this.hasPageBorder = (this.rawXml.indexOf('<w:pgBorders') !== -1) || (this.rawXml.indexOf('pgBorders') !== -1);

            // Parse Paragraphs
            const pElements = this.getElementsByTagNames(['w:p', 'p']);
            for (let i = 0; i < pElements.length; i++) {
                const p = pElements[i];
                const pInfo = this.parseParagraph(p, i);
                this.paragraphs.push(pInfo);
            }
        }

        getElementsByTagNames(tagNames) {
            const results = [];
            for (const t of tagNames) {
                const list = this.xmlDoc.getElementsByTagName(t);
                if (list && list.length > 0) {
                    for (let j = 0; j < list.length; j++) results.push(list[j]);
                }
            }
            if (results.length > 0) return results;

            // Namespace fallback by localName
            const all = this.xmlDoc.getElementsByTagName('*');
            const cleanTags = tagNames.map(t => t.includes(':') ? t.split(':')[1] : t);
            for (let i = 0; i < all.length; i++) {
                if (cleanTags.includes(all[i].localName)) {
                    results.push(all[i]);
                }
            }
            return results;
        }

        parseParagraph(pEl, idx) {
            // Aggregate all text
            const tElements = [];
            const childNodes = pEl.getElementsByTagName('*');
            for (let i = 0; i < childNodes.length; i++) {
                if (childNodes[i].localName === 't') {
                    tElements.push(childNodes[i]);
                }
            }
            const fullText = tElements.map(t => t.textContent || '').join('');

            // Paragraph alignment
            let align = 'left';
            const jcEls = pEl.getElementsByTagName('*');
            for (let i = 0; i < jcEls.length; i++) {
                if (jcEls[i].localName === 'jc') {
                    align = jcEls[i].getAttribute('w:val') || jcEls[i].getAttribute('val') || 'left';
                    break;
                }
            }

            // Paragraph-level run properties (<w:pPr><w:rPr>)
            let pPrSizePt = null;
            let pPrSizeCsPt = null;
            let pPrBold = false;
            let pPrItalic = false;
            let pPrUnderline = false;
            let pPrColorHex = null;
            let pPrColorTheme = null;
            let pPrFont = null;
            let hasBullets = false;
            let hasInd = false;
            let hasTab = false;
            let hasHighlight = false;
            let hasShading = false;

            const pPr = Array.from(pEl.children).find(c => c.localName === 'pPr');
            if (pPr) {
                Array.from(pPr.children).forEach(c => {
                    const tag = c.localName;
                    if (tag === 'numPr') hasBullets = true;
                    if (tag === 'ind') {
                        const fl = c.getAttribute('w:firstLine') || c.getAttribute('firstLine');
                        const lf = c.getAttribute('w:left') || c.getAttribute('left');
                        if (fl || lf) hasInd = true;
                    }
                    if (tag === 'shd') hasShading = true;
                });
                const pRPr = Array.from(pPr.children).find(c => c.localName === 'rPr');
                if (pRPr) {
                    Array.from(pRPr.children).forEach(pr => {
                        const tag = pr.localName;
                        if (tag === 'b' || tag === 'bCs') {
                            const val = pr.getAttribute('w:val') || pr.getAttribute('val');
                            if (val === null || val === 'true' || val === '1') pPrBold = true;
                        } else if (tag === 'i' || tag === 'iCs') {
                            const val = pr.getAttribute('w:val') || pr.getAttribute('val');
                            if (val === null || val === 'true' || val === '1') pPrItalic = true;
                        } else if (tag === 'u') {
                            const val = pr.getAttribute('w:val') || pr.getAttribute('val');
                            if (val !== 'none' && val !== '0' && val !== 'false') pPrUnderline = true;
                        } else if (tag === 'sz') {
                            const val = parseInt(pr.getAttribute('w:val') || pr.getAttribute('val'), 10);
                            if (!isNaN(val)) pPrSizePt = val / 2;
                        } else if (tag === 'szCs') {
                            const val = parseInt(pr.getAttribute('w:val') || pr.getAttribute('val'), 10);
                            if (!isNaN(val)) pPrSizeCsPt = val / 2;
                        } else if (tag === 'color') {
                            pPrColorHex = pr.getAttribute('w:val') || pr.getAttribute('val');
                            pPrColorTheme = pr.getAttribute('w:themeColor') || pr.getAttribute('themeColor');
                        } else if (tag === 'rFonts') {
                            pPrFont = pr.getAttribute('w:ascii') || pr.getAttribute('ascii') ||
                                      pr.getAttribute('w:hAnsi') || pr.getAttribute('hAnsi') ||
                                      pr.getAttribute('w:cs') || pr.getAttribute('cs') ||
                                      pr.getAttribute('w:eastAsia') || pr.getAttribute('eastAsia');
                        } else if (tag === 'highlight') {
                            const val = pr.getAttribute('w:val') || pr.getAttribute('val');
                            if (val && val !== 'none') hasHighlight = true;
                        } else if (tag === 'shd') {
                            hasShading = true;
                        }
                    });
                }
            }

            // Runs analysis
            const runs = [];
            const rElements = [];
            for (let i = 0; i < childNodes.length; i++) {
                const nodeTag = childNodes[i].localName;
                if (nodeTag === 'r') {
                    rElements.push(childNodes[i]);
                } else if (nodeTag === 'tab') {
                    hasTab = true;
                } else if (nodeTag === 'numPr') {
                    hasBullets = true;
                }
            }

            let dominantFontSize = pPrSizePt || pPrSizeCsPt;
            let isBold = pPrBold;
            let isItalic = pPrItalic;
            let isUnderline = pPrUnderline;
            let colorHex = pPrColorHex;
            let colorTheme = pPrColorTheme;
            let fontFamily = pPrFont;
            let hasTextRun = false;

            rElements.forEach(r => {
                const rPr = Array.from(r.children).find(c => c.localName === 'rPr');
                const tEl = Array.from(r.children).find(c => c.localName === 't');
                const rText = tEl ? (tEl.textContent || '') : '';
                const hasText = rText.trim().length > 0;

                let rBold = pPrBold;
                let rItalic = pPrItalic;
                let rUnderline = pPrUnderline;
                let rExplicitSizePt = null;
                let rExplicitSizeCsPt = null;
                let rColorHex = pPrColorHex;
                let rColorTheme = pPrColorTheme;
                let rFont = pPrFont;
                let rHighlight = false;
                let rShading = false;

                if (rPr) {
                    Array.from(rPr.children).forEach(pr => {
                        const tag = pr.localName;
                        if (tag === 'b' || tag === 'bCs') {
                            const val = pr.getAttribute('w:val') || pr.getAttribute('val');
                            if (val === null || val === 'true' || val === '1') rBold = true;
                        } else if (tag === 'i' || tag === 'iCs') {
                            const val = pr.getAttribute('w:val') || pr.getAttribute('val');
                            if (val === null || val === 'true' || val === '1') rItalic = true;
                        } else if (tag === 'u') {
                            const val = pr.getAttribute('w:val') || pr.getAttribute('val');
                            if (val !== 'none' && val !== '0' && val !== 'false') rUnderline = true;
                        } else if (tag === 'sz') {
                            // Primary font size for Latin/Vietnamese
                            const val = parseInt(pr.getAttribute('w:val') || pr.getAttribute('val'), 10);
                            if (!isNaN(val)) rExplicitSizePt = val / 2; // Word half-points
                        } else if (tag === 'szCs') {
                            // Complex script size (Word defaults to 28/14pt if not changed)
                            const val = parseInt(pr.getAttribute('w:val') || pr.getAttribute('val'), 10);
                            if (!isNaN(val)) rExplicitSizeCsPt = val / 2;
                        } else if (tag === 'color') {
                            rColorHex = pr.getAttribute('w:val') || pr.getAttribute('val');
                            rColorTheme = pr.getAttribute('w:themeColor') || pr.getAttribute('themeColor');
                        } else if (tag === 'rFonts') {
                            rFont = pr.getAttribute('w:ascii') || pr.getAttribute('ascii') ||
                                    pr.getAttribute('w:hAnsi') || pr.getAttribute('hAnsi') ||
                                    pr.getAttribute('w:cs') || pr.getAttribute('cs') ||
                                    pr.getAttribute('w:eastAsia') || pr.getAttribute('eastAsia');
                        } else if (tag === 'highlight') {
                            const val = pr.getAttribute('w:val') || pr.getAttribute('val');
                            if (val && val !== 'none') {
                                rHighlight = true;
                                hasHighlight = true;
                            }
                        } else if (tag === 'shd') {
                            rShading = true;
                            hasShading = true;
                        }
                    });
                }

                // Explicit <w:sz> takes absolute priority for Latin text (including Vietnamese)
                const effectiveSizePt = (rExplicitSizePt !== null)
                    ? rExplicitSizePt
                    : (rExplicitSizeCsPt !== null ? rExplicitSizeCsPt : (pPrSizePt || pPrSizeCsPt));

                if (rBold) isBold = true;
                if (rItalic) isItalic = true;
                if (rUnderline) isUnderline = true;

                if (hasText || !hasTextRun) {
                    if (effectiveSizePt) dominantFontSize = effectiveSizePt;
                    if (rColorHex) colorHex = rColorHex;
                    if (rColorTheme) colorTheme = rColorTheme;
                    if (rFont) fontFamily = rFont;
                    if (hasText) hasTextRun = true;
                }

                runs.push({
                    text: rText,
                    bold: rBold,
                    italic: rItalic,
                    underline: rUnderline,
                    fontSize: effectiveSizePt,
                    szPt: rExplicitSizePt,
                    szCsPt: rExplicitSizeCsPt,
                    colorHex: rColorHex,
                    colorTheme: rColorTheme,
                    colorGroup: classifyColorGroup(rColorHex, rColorTheme),
                    fontFamily: rFont,
                    hasHighlight: rHighlight,
                    hasShading: rShading
                });
            });

            return {
                index: idx,
                text: fullText.trim(),
                rawText: fullText,
                align,
                fontSize: dominantFontSize,
                pPrSizePt,
                pPrSizeCsPt,
                bold: isBold,
                italic: isItalic,
                underline: isUnderline,
                colorHex,
                colorTheme,
                colorGroup: classifyColorGroup(colorHex, colorTheme),
                fontFamily,
                hasBullets,
                hasInd,
                hasTab,
                hasHighlight,
                hasShading,
                runs
            };
        }
    }

    // =========================================================================
    // 5. RULE EVALUATOR & AUTO-GRADER ENGINE
    // =========================================================================
    function normalizeVietnamese(str) {
        return (str || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D')
            .toLowerCase()
            .trim();
    }

    class DocxGraderEngine {
        /**
         * Grade a document model against a set of rules
         * @param {DocxDocument} doc
         * @param {Array} rules
         */
        static gradeDocument(doc, rules = []) {
            let passedCount = 0;
            const details = [];

            rules.forEach((rule, idx) => {
                const ruleId = rule.id || `rule_${idx + 1}`;
                const ruleName = rule.name || rule.title || `Quy tắc ${idx + 1}`;
                let isPass = false;
                let message = '';

                switch (rule.type) {
                    case 'paragraph_format': {
                        if (rule.scope === 'all') {
                            const nonEmpties = doc.paragraphs.filter(p => p.text.length > 0);
                            const errors = [];
                            if (nonEmpties.length === 0) {
                                isPass = false;
                                message = 'Tài liệu không có nội dung văn bản nào!';
                                break;
                            }
                            if (rule.fontFamily) {
                                const expFont = normalizeVietnamese(rule.fontFamily);
                                const badFonts = nonEmpties.filter(p => p.fontFamily && !normalizeVietnamese(p.fontFamily).includes(expFont));
                                if (badFonts.length > nonEmpties.length * 0.3) {
                                    errors.push(`Toàn bộ văn bản chưa chuyển sang phông ${rule.fontFamily}`);
                                }
                            }
                            if (rule.fontSize !== undefined) {
                                const badSize = nonEmpties.filter(p => p.fontSize && Math.abs(p.fontSize - rule.fontSize) > 1.5);
                                if (badSize.length > nonEmpties.length * 0.4) {
                                    errors.push(`Cỡ chữ toàn văn bản chưa đồng bộ ${rule.fontSize}pt`);
                                }
                            }
                            if (errors.length === 0) {
                                isPass = true;
                                message = `Đã đồng bộ toàn bộ văn bản (${rule.fontFamily || ''} ${rule.fontSize ? rule.fontSize + 'pt' : ''})`;
                            } else {
                                isPass = false;
                                message = errors.join('; ');
                            }
                            break;
                        }

                        let targetP = null;
                        if (typeof rule.matchIndex === 'number') {
                            targetP = doc.paragraphs[rule.matchIndex];
                        } else if (rule.match) {
                            const normMatch = normalizeVietnamese(rule.match);
                            targetP = doc.paragraphs.find(p => normalizeVietnamese(p.text).includes(normMatch));
                        } else {
                            targetP = doc.paragraphs[0]; // fallback title
                        }

                        if (!targetP) {
                            isPass = false;
                            message = `Không tìm thấy đoạn văn bản mục tiêu: "${rule.match || 'tiêu đề'}"`;
                            break;
                        }

                        const errors = [];

                        // 1. Font Size check (dung sai +/- 1.0pt, kiểm tra cả paragraph level lẫn từng run chứa text, hỗ trợ cả w:sz và w:szCs)
                        const allPFontSizes = [
                            targetP.fontSize,
                            targetP.pPrSizePt,
                            targetP.pPrSizeCsPt,
                            ...targetP.runs.flatMap(r => [r.fontSize, r.szPt, r.szCsPt])
                        ].filter(v => typeof v === 'number' && !isNaN(v));

                        if (rule.fontSize !== undefined) {
                            if (typeof rule.fontSize === 'number') {
                                const isMatch = allPFontSizes.some(s => Math.abs(s - rule.fontSize) <= 1.0);
                                if (!isMatch) {
                                    errors.push(`Cỡ chữ hiện tại là ${targetP.fontSize || 'mặc định'}pt (Yêu cầu: ${rule.fontSize}pt)`);
                                }
                            } else if (rule.fontSize.min) {
                                const isMinOk = allPFontSizes.some(s => s >= rule.fontSize.min);
                                if (!isMinOk) {
                                    errors.push(`Cỡ chữ ${targetP.fontSize || 'mặc định'}pt quá nhỏ (Yêu cầu tối thiểu: ${rule.fontSize.min}pt)`);
                                }
                            }
                        }

                        // 2. Bold check (kiểm tra cả paragraph level lẫn từng run)
                        if (rule.bold !== undefined) {
                            const hasBold = targetP.bold || targetP.runs.some(r => r.bold && r.text && r.text.trim().length > 0);
                            if (rule.bold && !hasBold) {
                                errors.push('Chưa in đậm (Nút B)');
                            } else if (!rule.bold && hasBold) {
                                errors.push('Không được in đậm');
                            }
                        }

                        // 3. Italic check
                        if (rule.italic !== undefined) {
                            const hasItalic = targetP.italic || targetP.runs.some(r => r.italic && r.text && r.text.trim().length > 0);
                            if (rule.italic && !hasItalic) {
                                errors.push('Chưa in nghiêng (Nút I)');
                            }
                        }

                        // 4. Underline check
                        if (rule.underline !== undefined) {
                            const hasUnderline = targetP.underline || targetP.runs.some(r => r.underline && r.text && r.text.trim().length > 0);
                            if (rule.underline && !hasUnderline) {
                                errors.push('Chưa gạch chân (Nút U)');
                            }
                        }

                        // 5. Color group check (RED, BLUE, PURPLE, BLACK)
                        if (rule.color) {
                            const expectedColor = String(rule.color).toUpperCase();
                            const allColorGroups = [
                                targetP.colorGroup,
                                ...targetP.runs.filter(r => r.colorGroup && r.text && r.text.trim().length > 0).map(r => r.colorGroup)
                            ].filter(Boolean);
                            const isColorMatch = allColorGroups.some(cg => cg === expectedColor);
                            if (!isColorMatch) {
                                errors.push(`Màu chữ là ${targetP.colorGroup || 'mặc định'} (Yêu cầu: Màu ${expectedColor})`);
                            }
                        }

                        // 6. Font Family check
                        if (rule.fontFamily) {
                            const expFont = normalizeVietnamese(rule.fontFamily);
                            const allFonts = [
                                targetP.fontFamily,
                                ...targetP.runs.map(r => r.fontFamily)
                            ].filter(Boolean).map(f => normalizeVietnamese(f));
                            const isFontMatch = allFonts.some(f => f.includes(expFont));
                            if (!isFontMatch) {
                                errors.push(`Phông chữ là "${targetP.fontFamily || 'mặc định'}" (Yêu cầu: ${rule.fontFamily})`);
                            }
                        }

                        // 7. Alignment check
                        if (rule.align) {
                            const expAlign = String(rule.align).toLowerCase();
                            const curAlign = String(targetP.align || 'left').toLowerCase();
                            if (curAlign !== expAlign) {
                                errors.push(`Căn lề là ${curAlign} (Yêu cầu: ${expAlign})`);
                            }
                        }

                        if (errors.length === 0) {
                            isPass = true;
                            message = `Định dạng chính xác: "${targetP.text.substring(0, 30)}..."`;
                        } else {
                            isPass = false;
                            message = errors.join('; ');
                        }
                        break;
                    }

                    case 'image_wrap': {
                        if (!doc.hasImages) {
                            isPass = false;
                            message = 'Không tìm thấy hình ảnh nào trong tệp văn bản!';
                            break;
                        }
                        const expectedWrap = (rule.expectedWrap || 'square').toLowerCase();
                        if (expectedWrap === 'square') {
                            if (doc.hasSquareWrap) {
                                isPass = true;
                                message = 'Hình ảnh đã được thiết lập bố cục bao quanh Square chính xác!';
                            } else {
                                isPass = false;
                                message = 'Chưa chọn nút Layout Options -> Square (Văn bản chưa chảy bao quanh ảnh)!';
                            }
                        } else if (expectedWrap === 'tight') {
                            if (doc.hasTightWrap || doc.hasSquareWrap) {
                                isPass = true;
                                message = 'Hình ảnh đã được thiết lập bố cục bao quanh Tight/Square chính xác!';
                            } else {
                                isPass = false;
                                message = 'Chưa chọn nút Layout Options -> Tight (Văn bản chưa ôm sát ảnh)!';
                            }
                        } else if (expectedWrap === 'topandbottom' || expectedWrap === 'top_and_bottom') {
                            if (doc.hasTopAndBottomWrap || doc.hasSquareWrap) {
                                isPass = true;
                                message = 'Hình ảnh đã được thiết lập bố cục Top and Bottom chính xác!';
                            } else {
                                isPass = false;
                                message = 'Chưa chọn nút Layout Options -> Top and Bottom!';
                            }
                        } else {
                            if (doc.hasSquareWrap || doc.hasTightWrap || doc.hasTopAndBottomWrap) {
                                isPass = true;
                                message = 'Hình ảnh đã được thiết lập Layout Options bao quanh văn bản!';
                            } else {
                                isPass = false;
                                message = 'Chưa thiết lập Layout Options cho hình ảnh!';
                            }
                        }
                        break;
                    }

                    case 'image_exists': {
                        if (doc.hasImages) {
                            isPass = true;
                            message = 'Đã chèn hình ảnh minh họa đầy đủ!';
                        } else {
                            isPass = false;
                            message = 'Thiếu hình ảnh minh họa trong văn bản!';
                        }
                        break;
                    }

                    case 'text_contains': {
                        const exp = normalizeVietnamese(rule.expectedText);
                        const allDocText = normalizeVietnamese(doc.paragraphs.map(p => p.text).join(' '));
                        if (allDocText.includes(exp)) {
                            isPass = true;
                            message = `Đã có nội dung yêu cầu: "${rule.expectedText}"`;
                        } else {
                            isPass = false;
                            message = `Thiếu đoạn văn bản hoặc từ khóa: "${rule.expectedText}"`;
                        }
                        break;
                    }

                    case 'picture_border': {
                        if (!doc.hasImages) {
                            isPass = false;
                            message = 'Không tìm thấy hình ảnh nào trong văn bản!';
                        } else if (doc.hasPictureBorder || doc.rawXml.includes('<a:ln') || doc.rawXml.includes('strokecolor=')) {
                            isPass = true;
                            message = 'Hình ảnh đã được tạo viền nghệ thuật (Picture Border) thành công!';
                        } else {
                            isPass = false;
                            message = 'Chưa tạo viền cho ảnh (Chọn ảnh -> Picture Format -> Picture Border)!';
                        }
                        break;
                    }

                    case 'picture_style': {
                        if (!doc.hasImages) {
                            isPass = false;
                            message = 'Không tìm thấy hình ảnh nào trong văn bản!';
                        } else if (doc.hasPictureStyle || doc.rawXml.includes('<a:effectLst') || doc.rawXml.includes('<a:outerShdw') || doc.rawXml.includes('roundRect') || doc.rawXml.includes('snipRound')) {
                            isPass = true;
                            message = 'Hình ảnh đã áp dụng kiểu khung bo góc/đổ bóng (Picture Styles)!';
                        } else {
                            isPass = false;
                            message = 'Chưa chọn kiểu khung/đổ bóng cho ảnh (Picture Format -> Picture Styles)!';
                        }
                        break;
                    }

                    case 'has_bullets': {
                        const matches = doc.paragraphs.filter(p => {
                            if (rule.match) return normalizeVietnamese(p.text).includes(normalizeVietnamese(rule.match));
                            const nt = normalizeVietnamese(p.text);
                            return nt.includes('bao mat') || nt.includes('canh giac') || nt.includes('ung xu');
                        });
                        const hasAnyBullet = matches.some(p => p.hasBullets) || doc.rawXml.includes('numPr') || doc.rawXml.includes('w:numPr');
                        if (hasAnyBullet) {
                            isPass = true;
                            message = 'Đã tạo dấu đầu dòng Bullets tự động cho các nguyên tắc!';
                        } else {
                            isPass = false;
                            message = 'Chưa tạo dấu đầu dòng Bullets (Thẻ Home -> nút Bullets)!';
                        }
                        break;
                    }

                    case 'highlight': {
                        const targetP = rule.match
                            ? doc.paragraphs.find(p => normalizeVietnamese(p.text).includes(normalizeVietnamese(rule.match)))
                            : doc.paragraphs.find(p => normalizeVietnamese(p.text).includes('thong minh'));
                        const hasHi = targetP && (targetP.hasHighlight || targetP.hasShading || targetP.runs.some(r => r.hasHighlight || r.hasShading));
                        if (hasHi || doc.rawXml.includes('w:highlight') || doc.rawXml.includes('highlight') || doc.rawXml.includes('w:shd')) {
                            isPass = true;
                            message = 'Đã tô màu dạ quang nổi bật cho câu khẩu hiệu (Highlight)!';
                        } else {
                            isPass = false;
                            message = 'Chưa tô màu dạ quang cho câu khẩu hiệu (Thẻ Home -> Text Highlight Color)!';
                        }
                        break;
                    }

                    case 'first_line_indent': {
                        const targetP = rule.match
                            ? doc.paragraphs.find(p => normalizeVietnamese(p.text).includes(normalizeVietnamese(rule.match)))
                            : doc.paragraphs.find(p => normalizeVietnamese(p.text).includes('internet mang lai'));
                        const hasInd = targetP && (targetP.hasTab || targetP.hasInd || targetP.rawText.startsWith('\t') || targetP.rawText.startsWith('   '));
                        if (hasInd || doc.rawXml.includes('<w:tab/>') || doc.rawXml.includes('w:firstLine')) {
                            isPass = true;
                            message = 'Đoạn văn mở đầu đã được thụt lề đầu dòng (Tab / First Line Indent)!';
                        } else {
                            isPass = false;
                            message = 'Chưa thụt đầu dòng đoạn mở đầu (Nhấn phím Tab hoặc kéo First Line Indent)!';
                        }
                        break;
                    }

                    case 'page_color': {
                        if (doc.hasPageColor || doc.rawXml.includes('<w:background') || doc.rawXml.includes('background')) {
                            isPass = true;
                            message = 'Đã thiết lập màu nền cho trang văn bản (Page Color)!';
                        } else {
                            isPass = false;
                            message = 'Chưa đổi màu nền trang văn bản (Design -> Page Color)!';
                        }
                        break;
                    }

                    case 'page_border': {
                        if (doc.hasPageBorder || doc.rawXml.includes('<w:pgBorders') || doc.rawXml.includes('pgBorders')) {
                            isPass = true;
                            message = 'Đã tạo khung viền bao quanh trang văn bản (Page Borders)!';
                        } else {
                            isPass = false;
                            message = 'Chưa tạo viền trang văn bản (Design -> Page Borders)!';
                        }
                        break;
                    }

                    default:
                        isPass = false;
                        message = `Loại quy tắc không xác định: ${rule.type}`;
                }

                if (isPass) passedCount++;
                details.push({
                    id: ruleId,
                    name: ruleName,
                    type: rule.type,
                    passed: isPass,
                    message: message
                });
            });

            const total = rules.length;
            const isAllPass = (total > 0 && passedCount === total);
            const scorePercent = total > 0 ? Math.round((passedCount / total) * 100) : 0;

            // Rating TT27
            let ratingTT27 = 'C';
            let smasComment = '';
            if (isAllPass) {
                ratingTT27 = 'T'; // Hoàn thành tốt
                smasComment = 'Thực hiện thành thạo thao tác định dạng kí tự và bố cục hình ảnh theo yêu cầu.';
            } else if (scorePercent >= 50) {
                ratingTT27 = 'H'; // Hoàn thành
                smasComment = 'Đã thực hiện được các bước cơ bản, cần chú ý thêm chi tiết định dạng theo mẫu.';
            } else {
                ratingTT27 = 'C'; // Chưa hoàn thành
                smasComment = 'Chưa hoàn thành thao tác định dạng hoặc quên chọn bố cục ảnh Square, cần rèn luyện thêm.';
            }

            return {
                pass: isAllPass,
                passedCount,
                totalCount: total,
                scorePercent,
                ratingTT27,
                smasComment,
                details
            };
        }

        /**
         * Parses an input file/buffer into a DocxDocument
         */
        static async loadDocument(fileOrBuffer) {
            let uint8;
            if (fileOrBuffer instanceof Uint8Array) {
                uint8 = fileOrBuffer;
            } else if (fileOrBuffer instanceof ArrayBuffer) {
                uint8 = new Uint8Array(fileOrBuffer);
            } else if (typeof Blob !== 'undefined' && fileOrBuffer instanceof Blob) {
                const ab = await fileOrBuffer.arrayBuffer();
                uint8 = new Uint8Array(ab);
            } else {
                throw new Error('Đầu vào không hợp lệ: Cần File, Blob, hoặc Uint8Array');
            }

            const zip = new SimpleZipReader(uint8);
            await zip.parse();

            const docXml = await zip.extractFileText('word/document.xml');
            if (!docXml) {
                throw new Error('Không tìm thấy tệp word/document.xml trong tệp .docx!');
            }

            let parsedDoc;
            if (typeof DOMParser !== 'undefined') {
                const parser = new DOMParser();
                parsedDoc = parser.parseFromString(docXml, 'application/xml');
                const parseError = parsedDoc.getElementsByTagName('parsererror')[0];
                if (parseError) {
                    throw new Error('Lỗi cú pháp XML trong word/document.xml: ' + parseError.textContent);
                }
            } else {
                throw new Error('DOMParser không khả dụng');
            }

            return new DocxDocument(parsedDoc, docXml, zip);
        }

        /**
         * Grade a file directly
         */
        static async gradeFile(fileOrBuffer, rules) {
            try {
                const doc = await this.loadDocument(fileOrBuffer);
                return this.gradeDocument(doc, rules);
            } catch (err) {
                return {
                    pass: false,
                    passedCount: 0,
                    totalCount: rules.length,
                    scorePercent: 0,
                    ratingTT27: 'C',
                    smasComment: 'Tệp nộp bị lỗi cấu trúc hoặc không thể giải nén.',
                    error: err.message,
                    details: rules.map((r, i) => ({
                        id: r.id || `rule_${i+1}`,
                        name: r.name || `Quy tắc ${i+1}`,
                        passed: false,
                        message: `Lỗi đọc tệp: ${err.message}`
                    }))
                };
            }
        }
    }

    // =========================================================================
    // 6. STARTER TEMPLATE BUILDER (.docx raw uncompressed with Ice Cream data)
    // =========================================================================
    // Offline fallback base64 for que-kem.png
    const WATERMELON_PNG_BASE64 = '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';

    let cachedIceCreamBytes = null;

    async function loadIceCreamBytes() {
        if (cachedIceCreamBytes && cachedIceCreamBytes.length > 0) return cachedIceCreamBytes;
        if (typeof fetch === 'function') {
            const candidatePaths = [
                '../../assets/images/minh-hoa/que-kem.png',
                '../assets/images/minh-hoa/que-kem.png',
                'assets/images/minh-hoa/que-kem.png'
            ];
            for (const p of candidatePaths) {
                try {
                    const res = await fetch(p);
                    if (res.ok) {
                        const buf = await res.arrayBuffer();
                        cachedIceCreamBytes = new Uint8Array(buf);
                        return cachedIceCreamBytes;
                    }
                } catch (e) {}
            }
        }
        if (!cachedIceCreamBytes) {
            cachedIceCreamBytes = base64ToUint8(WATERMELON_PNG_BASE64);
        }
        return cachedIceCreamBytes;
    }

    if (typeof window !== 'undefined' && typeof fetch === 'function') {
        setTimeout(() => { loadIceCreamBytes().catch(() => {}); }, 150);
    }

    function base64ToUint8(b64) {
        if (typeof atob === 'function') {
            const bin = atob(b64);
            const bytes = new Uint8Array(bin.length);
            for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
            return bytes;
        }
        if (typeof Buffer !== 'undefined') {
            return new Uint8Array(Buffer.from(b64, 'base64'));
        }
        return new Uint8Array(0);
    }

    function createStarterDocxBlob(customImageBytes = null) {
        const zip = new SimpleZipBuilder();

        // 1. [Content_Types].xml
        zip.addFile('[Content_Types].xml', 
`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Default Extension="png" ContentType="image/png"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`);

        // 2. _rels/.rels
        zip.addFile('_rels/.rels',
`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`);

        // 3. word/_rels/document.xml.rels
        zip.addFile('word/_rels/document.xml.rels',
`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rIdImg1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/image1.png"/>
</Relationships>`);

        // 4. word/media/image1.png
        zip.addFile('word/media/image1.png', customImageBytes || cachedIceCreamBytes || base64ToUint8(WATERMELON_PNG_BASE64));

        // 5. word/document.xml (Hình 28 thô: Tiêu đề cỡ 12pt đen, ảnh inline cắt ngang đoạn)
        zip.addFile('word/document.xml',
`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
            xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
            xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"
            xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"
            xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">
  <w:body>
    <!-- TIÊU ĐỀ THÔ (Chưa in đậm, chưa đổi cỡ, màu đen) -->
    <w:p>
      <w:pPr>
        <w:jc w:val="left"/>
      </w:pPr>
      <w:r>
        <w:rPr>
          <w:sz w:val="24"/>
          <w:color w:val="000000"/>
        </w:rPr>
        <w:t>CÁCH LÀM KEM DƯA HẤU</w:t>
      </w:r>
    </w:p>

    <!-- ĐỀ MỤC 1 -->
    <w:p>
      <w:r>
        <w:rPr>
          <w:sz w:val="24"/>
        </w:rPr>
        <w:t>Nguyên liệu:</w:t>
      </w:r>
    </w:p>
    <w:p>
      <w:r>
        <w:t>- Dưa hấu: 300g</w:t>
      </w:r>
    </w:p>
    <w:p>
      <w:r>
        <w:t>- Sữa chua: 1 hộp</w:t>
      </w:r>
    </w:p>
    <w:p>
      <w:r>
        <w:t>- Sữa đặc: 2 thìa</w:t>
      </w:r>
    </w:p>

    <!-- HÌNH ẢNH BAN ĐẦU DẠNG INLINE (CẮT NGANG DÒNG VĂN BẢN, CHƯA SQUARE) -->
    <w:p>
      <w:r>
        <w:drawing>
          <wp:inline distT="0" distB="0" distL="0" distR="0">
            <wp:extent cx="1440000" cy="3017000"/>
            <wp:docPr id="1" name="Watermelon Ice Cream"/>
            <a:graphic>
              <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">
                <pic:pic>
                  <pic:nvPicPr>
                    <pic:cNvPr id="0" name="image1.png"/>
                    <pic:cNvPicPr/>
                  </pic:nvPicPr>
                  <pic:blipFill>
                    <a:blip r:embed="rIdImg1"/>
                    <a:stretch><a:fillRect/></a:stretch>
                  </pic:blipFill>
                  <pic:spPr>
                    <a:xfrm><a:off x="0" y="0"/><a:ext cx="1440000" cy="3017000"/></a:xfrm>
                    <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
                  </pic:spPr>
                </pic:pic>
              </a:graphicData>
            </a:graphic>
          </wp:inline>
        </w:drawing>
      </w:r>
    </w:p>

    <!-- ĐỀ MỤC 2 -->
    <w:p>
      <w:r>
        <w:rPr>
          <w:sz w:val="24"/>
        </w:rPr>
        <w:t>Các bước thực hiện:</w:t>
      </w:r>
    </w:p>
    <w:p>
      <w:r>
        <w:t>Bước 1: Gọt vỏ, bỏ hạt dưa hấu rồi cắt thành từng miếng nhỏ.</w:t>
      </w:r>
    </w:p>
    <w:p>
      <w:r>
        <w:t>Bước 2: Cho dưa hấu, sữa chua và sữa đặc vào máy xay sinh tố, xay nhuyễn.</w:t>
      </w:r>
    </w:p>
    <w:p>
      <w:r>
        <w:t>Bước 3: Rót hỗn hợp vào khuôn làm kem, cắm que kem rồi để vào ngăn đá tủ lạnh khoảng 4 - 6 tiếng.</w:t>
      </w:r>
    </w:p>
    <w:p>
      <w:r>
        <w:t>Bước 4: Lấy kem ra khỏi khuôn và thưởng thức.</w:t>
      </w:r>
    </w:p>

    <!-- GHI CHÚ CUỐI -->
    <w:p>
      <w:r>
        <w:rPr>
          <w:sz w:val="22"/>
        </w:rPr>
        <w:t>Lưu ý: Thực hiện cẩn thận khi dùng dao gọt hoa quả và máy xay.</w:t>
      </w:r>
    </w:p>
  </w:body>
</w:document>`);

        const bytes = zip.buildUint8Array();
        return new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    }

    async function downloadStarterDocx(filename = 'DeBaiTho_LamKem_Khoi5_Tiet11.docx', customImageBytes = null) {
        let imgBytes = customImageBytes;
        if (!imgBytes) {
            try {
                imgBytes = await loadIceCreamBytes();
            } catch (e) {}
        }
        const blob = createStarterDocxBlob(imgBytes);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 2000);
        if (window.toast) {
            window.toast('📥 Đã tải xuống tệp đề bài mẫu Word (.docx) có ảnh que kem!', 2800, 'var(--mint)');
        }
    }

    function createCongThucLamKemBlob(customImageBytes = null) {
        const zip = new SimpleZipBuilder();
        zip.addFile('[Content_Types].xml', 
`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Default Extension="png" ContentType="image/png"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`);

        zip.addFile('_rels/.rels',
`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`);

        zip.addFile('word/_rels/document.xml.rels',
`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rIdImg1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/image1.png"/>
</Relationships>`);

        zip.addFile('word/media/image1.png', customImageBytes || cachedIceCreamBytes || base64ToUint8(WATERMELON_PNG_BASE64));

        zip.addFile('word/document.xml',
`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
            xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
            xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"
            xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"
            xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">
  <w:body>
    <w:p>
      <w:r><w:t>CÁCH LÀM KEM DƯA HẤU</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>Nguyên liệu:</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>- Dưa hấu: 300g</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>- Sữa chua: 1 hộp</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>- Sữa đặc: 2 thìa</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>Dụng cụ:</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>- Máy xay sinh tố</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>- Khuôn làm kem và que kem</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>- Dao gọt hoa quả</w:t></w:r>
    </w:p>
    <w:p>
      <w:r>
        <w:drawing>
          <wp:inline distT="0" distB="0" distL="0" distR="0">
            <wp:extent cx="1600000" cy="1600000"/>
            <wp:docPr id="1" name="Watermelon Ice Cream"/>
            <a:graphic>
              <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">
                <pic:pic>
                  <pic:nvPicPr>
                    <pic:cNvPr id="0" name="image1.png"/>
                    <pic:cNvPicPr/>
                  </pic:nvPicPr>
                  <pic:blipFill>
                    <a:blip r:embed="rIdImg1"/>
                    <a:stretch><a:fillRect/></a:stretch>
                  </pic:blipFill>
                  <pic:spPr>
                    <a:xfrm><a:off x="0" y="0"/><a:ext cx="1600000" cy="1600000"/></a:xfrm>
                    <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
                  </pic:spPr>
                </pic:pic>
              </a:graphicData>
            </a:graphic>
          </wp:inline>
        </w:drawing>
      </w:r>
    </w:p>
    <w:p>
      <w:r><w:t>Các bước thực hiện:</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>Bước 1: Gọt vỏ, bỏ hạt dưa hấu rồi cắt thành từng miếng nhỏ.</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>Bước 2: Cho dưa hấu, sữa chua và sữa đặc vào máy xay sinh tố, xay nhuyễn.</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>Bước 3: Rót hỗn hợp vào khuôn làm kem, cắm que kem rồi để vào ngăn đá tủ lạnh khoảng 4 - 6 tiếng.</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>Bước 4: Lấy kem ra khỏi khuôn và thưởng thức.</w:t></w:r>
    </w:p>
  </w:body>
</w:document>`);
        const bytes = zip.buildUint8Array();
        return new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    }

    async function downloadCongThucLamKemDocx(filename = 'DeBai_CongThucLamKem.docx', customImageBytes = null) {
        let imgBytes = customImageBytes;
        if (!imgBytes) {
            try {
                imgBytes = await loadIceCreamBytes();
            } catch (e) {}
        }
        const blob = createCongThucLamKemBlob(imgBytes);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 2000);
        if (window.toast) {
            window.toast('📥 Đã tải xuống DeBai_CongThucLamKem.docx!', 2800, 'var(--mint)');
        }
    }

    function createChuyenThamQuanVirusBlob() {
        const zip = new SimpleZipBuilder();
        zip.addFile('[Content_Types].xml', 
`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Default Extension="png" ContentType="image/png"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`);

        zip.addFile('_rels/.rels',
`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`);

        zip.addFile('word/_rels/document.xml.rels',
`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rIdImg1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/image1.png"/>
</Relationships>`);

        zip.addFile('word/media/image1.png', customImageBytes || cachedIceCreamBytes || base64ToUint8(WATERMELON_PNG_BASE64));

        // File nhiễm virus: Phông chữ Courier New, 9pt, màu xám, ảnh inline đè chữ
        zip.addFile('word/document.xml',
`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
            xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
            xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"
            xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"
            xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">
  <w:body>
    <w:p>
      <w:r>
        <w:rPr>
          <w:rFonts w:ascii="Courier New"/>
          <w:sz w:val="18"/>
          <w:color w:val="7F7F7F"/>
        </w:rPr>
        <w:t>lich trinh chuyen di tham quan</w:t>
      </w:r>
    </w:p>
    <w:p>
      <w:r>
        <w:rPr><w:sz w:val="18"/><w:color w:val="7F7F7F"/></w:rPr>
        <w:t>Thoi gian:</w:t>
      </w:r>
    </w:p>
    <w:p>
      <w:r>
        <w:rPr><w:sz w:val="18"/><w:color w:val="7F7F7F"/></w:rPr>
        <w:t>7h00 - 7h30: Tap trung tai truong, diem danh va len xe.</w:t>
      </w:r>
    </w:p>
    <w:p>
      <w:r>
        <w:rPr><w:sz w:val="18"/><w:color w:val="7F7F7F"/></w:rPr>
        <w:t>7h30 - 8h30: Di chuyen den Bao tang Lich su Quan su Viet Nam.</w:t>
      </w:r>
    </w:p>
    <w:p>
      <w:r>
        <w:drawing>
          <wp:inline distT="0" distB="0" distL="0" distR="0">
            <wp:extent cx="1600000" cy="1600000"/>
            <wp:docPr id="1" name="Bus Trip"/>
            <a:graphic>
              <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">
                <pic:pic>
                  <pic:nvPicPr>
                    <pic:cNvPr id="0" name="image1.png"/>
                    <pic:cNvPicPr/>
                  </pic:nvPicPr>
                  <pic:blipFill>
                    <a:blip r:embed="rIdImg1"/>
                    <a:stretch><a:fillRect/></a:stretch>
                  </pic:blipFill>
                  <pic:spPr>
                    <a:xfrm><a:off x="0" y="0"/><a:ext cx="1600000" cy="1600000"/></a:xfrm>
                    <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
                  </pic:spPr>
                </pic:pic>
              </a:graphicData>
            </a:graphic>
          </wp:inline>
        </w:drawing>
      </w:r>
    </w:p>
    <w:p>
      <w:r>
        <w:rPr><w:sz w:val="18"/><w:color w:val="7F7F7F"/></w:rPr>
        <w:t>8h30 - 10h30: Tham quan cac khu trung bay theo huong dan vien.</w:t>
      </w:r>
    </w:p>
    <w:p>
      <w:r>
        <w:rPr><w:sz w:val="18"/><w:color w:val="7F7F7F"/></w:rPr>
        <w:t>10h30 - 11h30: Tham gia hoat dong trai nghiem va tro choi tim hieu lich su.</w:t>
      </w:r>
    </w:p>
    <w:p>
      <w:r>
        <w:rPr><w:sz w:val="18"/><w:color w:val="7F7F7F"/></w:rPr>
        <w:t>11h30: Len xe tro ve truong.</w:t>
      </w:r>
    </w:p>
  </w:body>
</w:document>`);
        const bytes = zip.buildUint8Array();
        return new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    }

    function downloadChuyenThamQuanVirusDocx(filename = 'DeBai_ChuyenThamQuan_Virus.docx') {
        const blob = createChuyenThamQuanVirusBlob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 2000);
        if (window.toast) {
            window.toast('⚠️ Đã tải xuống DeBai_ChuyenThamQuan_Virus.docx! Hãy giải cứu văn bản.', 2800, 'var(--coral)');
        }
    }

    // =========================================================================
    // 7. SINGLE DROPZONE & BATCH MODE UI HELPERS
    // =========================================================================
    function setupDropzone(dropzoneEl, options = {}) {
        if (!dropzoneEl) return;
        const fileInput = dropzoneEl.querySelector('input[type="file"]') || document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.docx';
        fileInput.style.display = 'none';
        if (!dropzoneEl.contains(fileInput)) {
            dropzoneEl.appendChild(fileInput);
        }

        dropzoneEl.addEventListener('click', (e) => {
            if (e.target !== fileInput) fileInput.click();
        });

        dropzoneEl.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzoneEl.classList.add('dragover');
        });

        dropzoneEl.addEventListener('dragleave', () => {
            dropzoneEl.classList.remove('dragover');
        });

        dropzoneEl.addEventListener('drop', async (e) => {
            e.preventDefault();
            dropzoneEl.classList.remove('dragover');
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                const file = e.dataTransfer.files[0];
                await processFile(file);
            }
        });

        fileInput.addEventListener('change', async (e) => {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                await processFile(file);
            }
        });

        async function processFile(file) {
            if (!file.name.toLowerCase().endsWith('.docx')) {
                if (window.toast) window.toast('⚠️ Vui lòng chỉ nộp tệp văn bản Word (.docx)!', 3000, 'var(--coral)');
                else alert('Vui lòng chỉ nộp tệp Word .docx!');
                return;
            }

            if (options.onStart) options.onStart(file);

            const rules = typeof options.getRules === 'function' ? options.getRules() : (options.rules || []);
            const result = await DocxGraderEngine.gradeFile(file, rules);
            result.fileName = file.name;

            if (options.onResult) {
                options.onResult(result, file);
            }
        }
    }

    /**
     * Batch Grade Multiple Files for Computer Lab
     */
    async function gradeBatch(files, rules, callbacks = {}) {
        const results = [];
        const fileList = Array.from(files).filter(f => f.name.toLowerCase().endsWith('.docx'));
        const total = fileList.length;

        for (let i = 0; i < total; i++) {
            const file = fileList[i];
            const res = await DocxGraderEngine.gradeFile(file, rules);
            res.fileName = file.name;
            // Guess student name from file name if possible, e.g. "NguyenVanA_Kem.docx"
            const nameMatch = file.name.replace(/\.docx$/i, '').replace(/^DeBaiTho_?/i, '');
            res.studentGuess = nameMatch;
            results.push(res);

            if (callbacks.onProgress) {
                callbacks.onProgress(i + 1, total, res);
            }
        }

        if (callbacks.onComplete) {
            callbacks.onComplete(results);
        }
        return results;
    }

    /**
     * Export Batch Results to CSV UTF-8 with BOM
     */
    function exportBatchResultsToCsv(batchResults, lessonInfo = {}) {
        const title = lessonInfo.title || 'KẾT QUẢ THỰC HÀNH WORD TIN HỌC 5 (TIẾT 11)';
        const className = lessonInfo.className || 'Lớp 5/1';
        const now = new Date();
        const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
        const timeStr = `${String(now.getHours()).padStart(2, '0')}h${String(now.getMinutes()).padStart(2, '0')}p${String(now.getSeconds()).padStart(2, '0')}s`;

        const headerSection = [
            `=== ${title.toUpperCase()} ===`,
            `Lớp: ${className}`,
            `Thời gian chấm: ${dateStr} ${timeStr}`,
            `Tổng số bài nộp: ${batchResults.length}`,
            ''
        ].join('\r\n');

        const tableHeader = ['STT', 'Tên Tệp / Học Sinh', 'Số Test Đạt', 'Tổng Số Test', 'Tỷ Lệ Đạt (%)', 'Đánh Giá TT27', 'Nhận Xét Sư Phạm (SMAS)'].map(v => `"${v}"`).join(',');

        const rows = batchResults.map((r, idx) => {
            return [
                idx + 1,
                r.studentGuess || r.fileName,
                r.passedCount,
                r.totalCount,
                `${r.scorePercent}%`,
                r.ratingTT27,
                r.smasComment
            ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(',');
        });

        const csvContent = '\uFEFF' + headerSection + '\r\n' + tableHeader + '\r\n' + rows.join('\r\n');
        const fileName = `KetQua_DocxGrader_TinHoc5_Tiet_11_Ngay_${dateStr}_${timeStr}.csv`;

        if (window.uploadCsvToDrive) {
            window.uploadCsvToDrive(csvContent, fileName);
        } else {
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => URL.revokeObjectURL(url), 2000);
        }
    }

    // =========================================================================
    // EXPORT TO GLOBAL WINDOW OBJECT
    // =========================================================================
    window.DocxGrader = {
        DocxDocument,
        DocxGraderEngine,
        SimpleZipBuilder,
        SimpleZipReader,
        classifyColorGroup,
        calculateCrc32,
        createStarterDocxBlob,
        downloadStarterDocx,
        loadIceCreamBytes,
        createCongThucLamKemBlob,
        downloadCongThucLamKemDocx,
        createChuyenThamQuanVirusBlob,
        downloadChuyenThamQuanVirusDocx,
        setupDropzone,
        gradeBatch,
        exportBatchResultsToCsv,
        loadDocument: (input) => DocxGraderEngine.loadDocument(input),
        gradeFile: (file, rules) => DocxGraderEngine.gradeFile(file, rules),
        gradeDocument: (doc, rules) => DocxGraderEngine.gradeDocument(doc, rules)
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = window.DocxGrader;
    }

})(typeof window !== 'undefined' ? window : globalThis);
