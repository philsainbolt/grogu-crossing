class Laser {
    constructor(x, y, direction, gameWidth) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 6;
        this.speed = 300 * direction;
        this.gameWidth = gameWidth;
        this.active = true;
    }

    update(dt) {
        this.x += this.speed * dt;

        if (this.x > this.gameWidth || this.x + this.width < 0) {
            this.active = false;
        }
    }

    render(ctx) {
        const boltWidth = 10;
        const boltHeight = 5;
        const gap = 16;

        // Draw two rounded blaster bolts
        for (let i = 0; i < 3; i++) {
            const boltX = this.x + i * (boltWidth + gap);
            const boltY = this.y;

            // Outer glow
            ctx.fillStyle = '#ff4444';
            ctx.beginPath();
            ctx.ellipse(boltX + boltWidth / 2, boltY + boltHeight / 2, boltWidth / 2 + 1, boltHeight / 2 + 1, 0, 0, Math.PI * 2);
            ctx.fill();

            // Inner bright core
            ctx.fillStyle = '#ff0000';
            ctx.beginPath();
            ctx.ellipse(boltX + boltWidth / 2, boltY + boltHeight / 2, boltWidth / 2, boltHeight / 2, 0, 0, Math.PI * 2);
            ctx.fill();

            // Hot center
            ctx.fillStyle = '#ff6666';
            ctx.beginPath();
            ctx.ellipse(boltX + boltWidth / 2, boltY + boltHeight / 2, boltWidth / 4, boltHeight / 4, 0, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    getBounds() {
        return { x: this.x, y: this.y, width: this.width, height: this.height };
    }
}
