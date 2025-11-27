class Enemy extends Entity {
    constructor(x, y, speed, type) {
        let imagePath = 'images/stormtrooper.png';
        if (type === 2) imagePath = 'images/tie-fighter.png';
        if (type === 3) imagePath = 'images/mando.png';

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
