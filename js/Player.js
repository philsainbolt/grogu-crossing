class Player extends Entity {
    constructor(gameWidth, gameHeight) {
        super(gameWidth / 2 - 25, gameHeight - 60, 50, 50, 'images/grogu.png');
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.speed = 50; // Pixels per move
        this.moving = false;
    }

    update(dt) {
        // Player movement is event-driven, so update might be empty or used for animations
    }

    handleInput(key) {
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

    reset() {
        this.x = this.gameWidth / 2 - 25;
        this.y = this.gameHeight - 60;
    }
}
