class Collectible {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 28;
        this.points = 100;
        this.active = true;

        this.lifetime = 8 + Math.random() * 2;
        this.age = 0;
        this.opacity = 1;

        // Bobbing animation
        this.bobOffset = Math.random() * Math.PI * 2;
    }

    update(dt) {
        this.age += dt;
        this.bobOffset += dt * 3;

        // Start fading at 70% of lifetime
        if (this.age > this.lifetime * 0.7) {
            this.opacity = 1 - ((this.age - this.lifetime * 0.7) / (this.lifetime * 0.3));
        }

        if (this.age >= this.lifetime) {
            this.active = false;
        }
    }

    render(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;

        const bobY = Math.sin(this.bobOffset) * 3;
        const centerX = this.x;
        const centerY = this.y + bobY;

        const eggWidth = this.size * 0.8;
        const eggHeight = this.size;

        // Outer glow
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 15;

        // Egg body gradient
        const gradient = ctx.createRadialGradient(
            centerX - 3, centerY - 5, 0,
            centerX, centerY, eggHeight / 2
        );
        gradient.addColorStop(0, '#fff4a3');
        gradient.addColorStop(0.3, '#ffd700');
        gradient.addColorStop(0.7, '#daa520');
        gradient.addColorStop(1, '#b8860b');

        ctx.fillStyle = gradient;

        // Draw smooth oval egg
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, eggWidth / 2, eggHeight / 2, 0, 0, Math.PI * 2);
        ctx.fill();

        // Egg outline
        ctx.strokeStyle = '#b8860b';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.shadowBlur = 0;

        // Shine highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.ellipse(centerX - 4, centerY - 5, 5, 3, -0.3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    getBounds() {
        return {
            x: this.x - this.size / 2,
            y: this.y - this.size / 2,
            width: this.size,
            height: this.size
        };
    }
}
