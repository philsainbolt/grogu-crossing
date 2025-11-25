class Enemy extends Entity {
    constructor(x, y, speed, type) {
        let imagePath = 'images/enemy1.png';
        if (type === 2) imagePath = 'images/enemy2.png';
        if (type === 3) imagePath = 'images/enemy3.png';

        super(x, y, 60, 60, imagePath);
        this.speed = speed;
        this.gameWidth = 600; // Hardcoded for now, could be passed in
    }

    update(dt) {
        this.x += this.speed * dt;

        // Reset if off screen
        if (this.speed > 0 && this.x > this.gameWidth) {
            this.x = -this.width;
        } else if (this.speed < 0 && this.x + this.width < 0) {
            this.x = this.gameWidth;
        }
    }
}
