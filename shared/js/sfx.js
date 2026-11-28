/**
 * =========================================================================
 * BỘ TỔNG HỢP ÂM THANH OFFLINE DÙNG CHUNG (WEB AUDIO API SYNTHESIZER)
 * =========================================================================
 * Không dùng file .mp3 ngoài. Tương thích 100% file:/// và GitHub Pages.
 * Cung cấp API chuẩn: window.SFX.{click, correct, wrong, penalty, gacha, success, win}()
 */
(function initSharedSfx(window) {
    'use strict';
    let _ctx = null;

    function ctx() {
        if (!_ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) _ctx = new AudioCtx();
        }
        if (_ctx && _ctx.state === 'suspended') {
            _ctx.resume().catch(() => {});
        }
        return _ctx;
    }

    function playTone(freq, duration = 0.14, type = 'sine', volume = 0.12, delay = 0) {
        try {
            const c = ctx();
            if (!c) return;
            const t = c.currentTime + delay;
            const osc = c.createOscillator();
            const gain = c.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, t);
            gain.gain.setValueAtTime(volume, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
            osc.connect(gain);
            gain.connect(c.destination);
            osc.start(t);
            osc.stop(t + duration + 0.02);
        } catch (_) {}
    }

    const SFX = {
        click() {
            playTone(680, 0.06, 'sine', 0.08, 0);
        },
        correct() {
            playTone(523.25, 0.11, 'triangle', 0.14, 0);
            playTone(659.25, 0.12, 'triangle', 0.14, 0.08);
            playTone(783.99, 0.22, 'triangle', 0.16, 0.16);
        },
        wrong() {
            playTone(220, 0.14, 'sawtooth', 0.12, 0);
            playTone(170, 0.22, 'sawtooth', 0.12, 0.11);
        },
        penalty() {
            playTone(260, 0.16, 'sawtooth', 0.14, 0);
            playTone(185, 0.26, 'square', 0.11, 0.13);
        },
        gacha() {
            [440, 523, 587, 659, 784].forEach((f, i) => playTone(f, 0.08, 'sine', 0.1, i * 0.055));
        },
        success() {
            [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => playTone(f, 0.22, 'triangle', 0.15, i * 0.09));
        },
        win() {
            [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) => playTone(f, 0.28, 'triangle', 0.16, i * 0.1));
        }
    };

    window.SFX = SFX;
    if (typeof window.playClickSound !== 'function') window.playClickSound = () => SFX.click();
    if (typeof window.playCorrectSound !== 'function') window.playCorrectSound = () => SFX.correct();
    if (typeof window.playSuccessSound !== 'function') window.playSuccessSound = () => SFX.success();
    if (typeof window.playPenaltySound !== 'function') window.playPenaltySound = () => SFX.penalty();
    if (typeof window.playGachaSound !== 'function') window.playGachaSound = () => SFX.gacha();
})(window);
