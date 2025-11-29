class Frog {
    constructor(gameHeight) {
        this.x = 100;  // Spawn to the right of Grogu so player must chase
        this.y = gameHeight - 50;
        this.width = 35;
        this.height = 30;
        this.active = true;

        // Hopping animation
        this.hopSpeed = 120;
        this.hopHeight = 25;
        this.hopDuration = 0.4;
        this.hopTimer = 0;
        this.baseY = this.y;
    }

    update(dt) {
        // Horizontal movement
        this.x += this.hopSpeed * dt;

        // Hopping arc (parabolic)
        this.hopTimer += dt;
        if (this.hopTimer >= this.hopDuration) {
            this.hopTimer = 0;
        }
        const hopProgress = this.hopTimer / this.hopDuration;
        this.y = this.baseY - Math.sin(hopProgress * Math.PI) * this.hopHeight;

        // Deactivate when off screen
        if (this.x > 850) {
            this.active = false;
        }
    }

    render(ctx) {
        const x = this.x;
        const y = this.y;

        ctx.save();

        // Back legs (behind body)
        ctx.fillStyle = '#1E7A1E';
        // Left back leg - bent
        ctx.beginPath();
        ctx.ellipse(x + 5, y + 25, 8, 5, -0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(x - 2, y + 28, 6, 4, 0, 0, Math.PI * 2);
        ctx.fill();
        // Right back leg - bent
        ctx.beginPath();
        ctx.ellipse(x + 30, y + 25, 8, 5, 0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(x + 37, y + 28, 6, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Main body (wide oval)
        ctx.fillStyle = '#2E8B2E';
        ctx.beginPath();
        ctx.ellipse(x + 17, y + 18, 16, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        // Lighter belly
        ctx.fillStyle = '#90EE90';
        ctx.beginPath();
        ctx.ellipse(x + 17, y + 22, 10, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Dark spots on back
        ctx.fillStyle = '#1E5F1E';
        ctx.beginPath();
        ctx.arc(x + 12, y + 14, 3, 0, Math.PI * 2);
        ctx.arc(x + 22, y + 12, 2.5, 0, Math.PI * 2);
        ctx.arc(x + 17, y + 17, 2, 0, Math.PI * 2);
        ctx.fill();

        // Front legs
        ctx.fillStyle = '#2E8B2E';
        ctx.beginPath();
        ctx.ellipse(x + 6, y + 24, 4, 3, -0.5, 0, Math.PI * 2);
        ctx.ellipse(x + 28, y + 24, 4, 3, 0.5, 0, Math.PI * 2);
        ctx.fill();

        // Eye bumps (on top of head)
        ctx.fillStyle = '#2E8B2E';
        ctx.beginPath();
        ctx.arc(x + 10, y + 6, 7, 0, Math.PI * 2);
        ctx.arc(x + 24, y + 6, 7, 0, Math.PI * 2);
        ctx.fill();

        // Eyes (white part)
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(x + 10, y + 5, 5, 0, Math.PI * 2);
        ctx.arc(x + 24, y + 5, 5, 0, Math.PI * 2);
        ctx.fill();

        // Pupils (looking right - direction of movement)
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(x + 12, y + 5, 2.5, 0, Math.PI * 2);
        ctx.arc(x + 26, y + 5, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Nostrils
        ctx.fillStyle = '#1E5F1E';
        ctx.beginPath();
        ctx.arc(x + 14, y + 12, 1, 0, Math.PI * 2);
        ctx.arc(x + 20, y + 12, 1, 0, Math.PI * 2);
        ctx.fill();

        // Smile
        ctx.strokeStyle = '#1E5F1E';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(x + 17, y + 14, 6, 0.2, Math.PI - 0.2);
        ctx.stroke();

        ctx.restore();
    }

    getBounds() {
        return { x: this.x, y: this.y, width: this.width, height: this.height };
    }
}
