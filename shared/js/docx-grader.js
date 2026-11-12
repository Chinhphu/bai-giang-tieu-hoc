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
        const REDS = ['FF0000', 'C00000', 'E00000', 'CC0000', 'ED7D31', 'E74C3C', 'D32F2F', 'EF4444', 'DC2626'];
        const BLUES = ['0070C0', '002060', '418AB3', '2E75B6', '1F4E79', '4472C4', '0000FF', '1A73E8', '0284C7', '0369A1', '2563EB', '3B82F6', '0EA5E9'];
        const PURPLES = ['7030A0', '800080', '660066', '8E44AD', '9B59B6', 'A855F7', '7C3AED', '9333EA', '6B21A8'];
        const BLACKS = ['000000', '262626', '595959', '1F2937', '111827', '333333', '0F172A', '000'];

        if (REDS.includes(raw)) return 'RED';
        if (BLUES.includes(raw)) return 'BLUE';
        if (PURPLES.includes(raw)) return 'PURPLE';
        if (BLACKS.includes(raw)) return 'BLACK';

        // RGB numeric heuristics
        if (raw.length === 6) {
            const r = parseInt(raw.slice(0, 2), 16) || 0;
            const g = parseInt(raw.slice(2, 4), 16) || 0;
            const b = parseInt(raw.slice(4, 6), 16) || 0;

            if (r < 70 && g < 70 && b < 70) return 'BLACK';
            if (r > 150 && g < 100 && b < 100) return 'RED';
            if (r > 100 && b > 120 && g < 100) return 'PURPLE';
            if (b > 130 && b > r + 25 && b > g + 15) return 'BLUE';
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

            // Runs analysis
            const runs = [];
            const rElements = [];
            for (let i = 0; i < childNodes.length; i++) {
                if (childNodes[i].localName === 'r') {
                    rElements.push(childNodes[i]);
                }
            }

            let dominantFontSize = null;
            let isBold = false;
            let isItalic = false;
            let isUnderline = false;
            let colorHex = null;
            let colorTheme = null;
            let fontFamily = null;

            rElements.forEach(r => {
                const rPr = Array.from(r.children).find(c => c.localName === 'rPr');
                const tEl = Array.from(r.children).find(c => c.localName === 't');
                const rText = tEl ? (tEl.textContent || '') : '';

                let rBold = false;
                let rItalic = false;
                let rUnderline = false;
                let rSizePt = null;
                let rColorHex = null;
                let rColorTheme = null;
                let rFont = null;

                if (rPr) {
                    Array.from(rPr.children).forEach(pr => {
                        const tag = pr.localName;
                        if (tag === 'b') {
                            const val = pr.getAttribute('w:val') || pr.getAttribute('val');
                            rBold = (val === null || val === 'true' || val === '1');
                        } else if (tag === 'i') {
                            const val = pr.getAttribute('w:val') || pr.getAttribute('val');
                            rItalic = (val === null || val === 'true' || val === '1');
                        } else if (tag === 'u') {
                            const val = pr.getAttribute('w:val') || pr.getAttribute('val');
                            rUnderline = (val !== 'none' && val !== '0' && val !== 'false');
                        } else if (tag === 'sz') {
                            const val = parseInt(pr.getAttribute('w:val') || pr.getAttribute('val'), 10);
                            if (!isNaN(val)) rSizePt = val / 2; // Word half-points
                        } else if (tag === 'color') {
                            rColorHex = pr.getAttribute('w:val') || pr.getAttribute('val');
                            rColorTheme = pr.getAttribute('w:themeColor') || pr.getAttribute('themeColor');
                        } else if (tag === 'rFonts') {
                            rFont = pr.getAttribute('w:ascii') || pr.getAttribute('ascii') ||
                                    pr.getAttribute('w:hAnsi') || pr.getAttribute('hAnsi');
                        }
                    });
                }

                if (rBold) isBold = true;
                if (rItalic) isItalic = true;
                if (rUnderline) isUnderline = true;
                if (rSizePt) dominantFontSize = rSizePt;
                if (rColorHex) colorHex = rColorHex;
                if (rColorTheme) colorTheme = rColorTheme;
                if (rFont) fontFamily = rFont;

                runs.push({
                    text: rText,
                    bold: rBold,
                    italic: rItalic,
                    underline: rUnderline,
                    fontSize: rSizePt,
                    colorHex: rColorHex,
                    colorTheme: rColorTheme,
                    colorGroup: classifyColorGroup(rColorHex, rColorTheme),
                    fontFamily: rFont
                });
            });

            return {
                index: idx,
                text: fullText.trim(),
                rawText: fullText,
                align,
                fontSize: dominantFontSize,
                bold: isBold,
                italic: isItalic,
                underline: isUnderline,
                colorHex,
                colorTheme,
                colorGroup: classifyColorGroup(colorHex, colorTheme),
                fontFamily,
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

                        // 1. Font Size check (tolerance +/- 0.5pt)
                        if (rule.fontSize !== undefined) {
                            if (typeof rule.fontSize === 'number') {
                                if (!targetP.fontSize || Math.abs(targetP.fontSize - rule.fontSize) > 0.5) {
                                    errors.push(`Cỡ chữ hiện tại là ${targetP.fontSize || 'mặc định'}pt (Yêu cầu: ${rule.fontSize}pt)`);
                                }
                            } else if (rule.fontSize.min && targetP.fontSize < rule.fontSize.min) {
                                errors.push(`Cỡ chữ ${targetP.fontSize || 'mặc định'}pt quá nhỏ (Yêu cầu tối thiểu: ${rule.fontSize.min}pt)`);
                            }
                        }

                        // 2. Bold check
                        if (rule.bold !== undefined) {
                            if (rule.bold && !targetP.bold) {
                                errors.push('Chưa in đậm (Nút B)');
                            } else if (!rule.bold && targetP.bold) {
                                errors.push('Không được in đậm');
                            }
                        }

                        // 3. Italic check
                        if (rule.italic !== undefined) {
                            if (rule.italic && !targetP.italic) {
                                errors.push('Chưa in nghiêng (Nút I)');
                            }
                        }

                        // 4. Underline check
                        if (rule.underline !== undefined) {
                            if (rule.underline && !targetP.underline) {
                                errors.push('Chưa gạch chân (Nút U)');
                            }
                        }

                        // 5. Color group check (RED, BLUE, PURPLE, BLACK)
                        if (rule.color) {
                            const expectedColor = String(rule.color).toUpperCase();
                            if (targetP.colorGroup !== expectedColor) {
                                errors.push(`Màu chữ là ${targetP.colorGroup} (Yêu cầu: Màu ${expectedColor})`);
                            }
                        }

                        // 6. Font Family check
                        if (rule.fontFamily) {
                            const expFont = normalizeVietnamese(rule.fontFamily);
                            const curFont = normalizeVietnamese(targetP.fontFamily || '');
                            if (!curFont.includes(expFont)) {
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
    // 1x1 base64 transparent PNG or sample red watermelon png
    const WATERMELON_PNG_BASE64 = 
        'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAA' +
        'EnQAABJ0Ad5mPtUAAACSSURBVFhH7ZYxDoAwCMR8mH/x/4fTqQvK2AS7Qyck1gVCEmPLsiwPqqpI1j5zW665p38B8AUA34Bv' +
        'wDe4h52eZ6vM84XkI7Zc80m3HAFwBfAGfAMb1H0C5vN8IXmKzdu8zSfeMgLgCuAN+Ab3sPNkG3L11/wFwBsAfAO+gVvYmZ+f' +
        '0z7zSrfccgTAFcAb8A2/2/cCJrF5j8JgWk8AAAAASUVORK5CYII=';

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

    function createStarterDocxBlob() {
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
        zip.addFile('word/media/image1.png', base64ToUint8(WATERMELON_PNG_BASE64));

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

    function downloadStarterDocx(filename = 'DeBaiTho_LamKem_Khoi5_Tiet11.docx') {
        const blob = createStarterDocxBlob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 2000);
        if (window.toast) {
            window.toast('📥 Đã tải xuống tệp đề bài mẫu Word (.docx) thành công!', 2800, 'var(--mint)');
        }
    }

    function createCongThucLamKemBlob() {
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

        zip.addFile('word/media/image1.png', base64ToUint8(WATERMELON_PNG_BASE64));

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

    function downloadCongThucLamKemDocx(filename = 'DeBai_CongThucLamKem.docx') {
        const blob = createCongThucLamKemBlob();
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

        zip.addFile('word/media/image1.png', base64ToUint8(WATERMELON_PNG_BASE64));

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
