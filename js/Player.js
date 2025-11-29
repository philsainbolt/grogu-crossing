class Player extends Entity {
    constructor(gameWidth, gameHeight) {
        super(gameWidth / 2 - 25, gameHeight - 60, 50, 50, 'images/grogu.png');
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.speed = 50; // Pixels per move
        this.moving = false;

        // Idle/sleep state
        this.idleTime = 0;
        this.isSleeping = false;
        this.zzzOffset = 0;
    }

    update(dt) {
        this.idleTime += dt;
        this.zzzOffset += dt * 2;

        if (this.idleTime >= 3) {
            this.isSleeping = true;
        }
    }

    handleInput(key) {
        // Wake up on any movement
        this.idleTime = 0;
        this.isSleeping = false;

        switch (key) {
            case 'ArrowUp':
                // Allow moving up past 0 to trigger win condition
                if (this.y - this.speed >= -50) this.y -= this.speed;
                break;
            case 'ArrowDown':
                if (this.y + this.speed < this.gameHeight) this.y += this.speed;
                break;
            case 'ArrowLeft':
                if (this.x - this.speed >= 0) this.x -= this.speed;
                break;
            case 'ArrowRight':
                if (this.x + this.speed < this.gameWidth) this.x += this.speed;
                break;
        }
    }

    render(ctx) {
        // Draw sprite as normal
        super.render(ctx);

        // Draw floating Zzz in bubble if sleeping
        if (this.isSleeping) {
            const floatY = Math.sin(this.zzzOffset) * 5;
            const bubbleX = this.x + this.width + 5;
            const bubbleY = this.y - 15 + floatY;

            // Draw thought bubble
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.strokeStyle = '#333333';
            ctx.lineWidth = 2;

            // Main bubble
            ctx.beginPath();
            ctx.ellipse(bubbleX + 20, bubbleY, 24, 16, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Small connecting bubbles
            ctx.beginPath();
            ctx.arc(bubbleX, bubbleY + 12, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(bubbleX - 5, bubbleY + 18, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Draw Zzz text
            ctx.font = 'bold 18px Arial';
            ctx.fillStyle = '#4a6fa5';
            ctx.textAlign = 'center';
            ctx.fillText('Zzz', bubbleX + 20, bubbleY + 6);
            ctx.textAlign = 'left';
        }
    }

    reset() {
        this.x = this.gameWidth / 2 - 25;
        this.y = this.gameHeight - 60;
        this.idleTime = 0;
        this.isSleeping = false;
    }
}
