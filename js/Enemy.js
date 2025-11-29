class Enemy extends Entity {
    constructor(x, y, speed, type, gameWidth, canShoot = false) {
        let imagePath = 'images/stormtrooper.png';
        if (type === 2) imagePath = 'images/tie-fighter.png';
        if (type === 3) imagePath = 'images/mando.png';

        super(x, y, 60, 60, imagePath);
        this.speed = speed;
        this.gameWidth = gameWidth;
        this.type = type;

        // TIE Fighters zig-zag vertically
        if (type === 2) {
            this.baseY = y;
            this.amplitude = 35;
            this.frequency = 2;
            this.phase = Math.random() * Math.PI * 2;
            this.time = 0;
        }

        // Stormtroopers can shoot lasers
        if (type === 1 && canShoot) {
            this.canShoot = true;
            this.shootCooldown = 2 + Math.random();
            this.timeSinceShot = Math.random() * 2;
            this.direction = speed > 0 ? 1 : -1;
        }
    }

    update(dt) {
        this.x += this.speed * dt;

        // TIE Fighters zig-zag vertically
        if (this.type === 2) {
            this.time += dt;
            this.y = this.baseY + Math.sin(this.time * this.frequency + this.phase) * this.amplitude;
        }

        // Reset if off screen
        if (this.speed > 0 && this.x > this.gameWidth) {
            this.x = -this.width + (this.x - this.gameWidth);
        } else if (this.speed < 0 && this.x + this.width < 0) {
            this.x = this.gameWidth + (this.x + this.width);
        }

        // Stormtrooper shooting
        if (this.canShoot) {
            this.timeSinceShot += dt;
            if (this.timeSinceShot >= this.shootCooldown) {
                this.timeSinceShot = 0;
                this.shootCooldown = 2 + Math.random();
                return this.createLaser();
            }
        }
    }

    createLaser() {
        const laserX = this.direction > 0 ? this.x + this.width : this.x - 20;
        const laserY = this.y + this.height / 2 - 3;
        return { x: laserX, y: laserY, direction: this.direction };
    }
}
