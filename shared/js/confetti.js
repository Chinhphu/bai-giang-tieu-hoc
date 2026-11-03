(function () {
    let canvas = null;
    let context = null;
    let frameId = 0;
    let particles = [];

    function createCanvas() {
        if (canvas) return;
        canvas = document.createElement('canvas');
        canvas.setAttribute('aria-hidden', 'true');
        canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999999';
        document.body.appendChild(canvas);
        context = canvas.getContext('2d');
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
    }

    function resizeCanvas() {
        if (!canvas || !context) return;
        const ratio = Math.max(1, window.devicePixelRatio || 1);
        canvas.width = Math.round(window.innerWidth * ratio);
        canvas.height = Math.round(window.innerHeight * ratio);
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function finish() {
        if (frameId) cancelAnimationFrame(frameId);
        frameId = 0;
        particles = [];
        window.removeEventListener('resize', resizeCanvas);
        if (canvas) canvas.remove();
        canvas = null;
        context = null;
    }

    function render() {
        if (!canvas || !context) return;
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        particles = particles.filter(particle => particle.life > 0);
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += particle.gravity;
            particle.rotation += particle.spin;
            particle.life -= 1;

            context.save();
            context.globalAlpha = Math.min(1, particle.life / 25);
            context.fillStyle = particle.color;
            context.translate(particle.x, particle.y);
            context.rotate(particle.rotation);
            context.fillRect(-particle.width / 2, -particle.height / 2, particle.width, particle.height);
            context.restore();
        });

        if (particles.length) {
            frameId = requestAnimationFrame(render);
        } else {
            finish();
        }
    }

    window.confetti = function (options) {
        const settings = typeof options === 'number' ? { particleCount: options } : (options || {});
        const count = Math.max(1, Math.min(300, Math.floor(Number(settings.particleCount) || 50)));
        const origin = settings.origin || {};
        const originX = Number(origin.x);
        const originY = Number(origin.y);
        const x = Math.max(0, Math.min(1, Number.isFinite(originX) ? originX : 0.5)) * window.innerWidth;
        const y = Math.max(0, Math.min(1, Number.isFinite(originY) ? originY : 0.5)) * window.innerHeight;
        const spread = Math.max(0, Math.min(360, Number(settings.spread) || 70));
        const angle = Number(settings.angle) || 90;
        const speed = Math.max(1, Math.min(30, Number(settings.startVelocity) || 9));

        createCanvas();
        for (let index = 0; index < count; index += 1) {
            const radians = (angle + (Math.random() - 0.5) * spread) * Math.PI / 180;
            particles.push({
                x,
                y,
                vx: Math.cos(radians) * speed * (0.65 + Math.random() * 0.7),
                vy: -Math.sin(radians) * speed * (0.65 + Math.random() * 0.7),
                gravity: 0.18 + Math.random() * 0.12,
                rotation: Math.random() * Math.PI,
                spin: (Math.random() - 0.5) * 0.2,
                width: 5 + Math.random() * 6,
                height: 7 + Math.random() * 8,
                life: 45 + Math.random() * 35,
                color: ['#f97316', '#facc15', '#22c55e', '#38bdf8', '#ec4899', '#8b5cf6'][Math.floor(Math.random() * 6)]
            });
        }

        if (!frameId) frameId = requestAnimationFrame(render);
    };
})();
