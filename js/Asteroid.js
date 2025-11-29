class Asteroid {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.size = 30 + Math.random() * 30;
        this.active = true;

        this.spawnFromEdge();

        this.speed = 100 + Math.random() * 100;

        this.generateShape();

        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * 2;

        // Color variation
        this.baseColor = Math.random() > 0.5 ? '#6b5b4f' : '#5a4d42';
    }

    spawnFromEdge() {
        const edge = Math.floor(Math.random() * 4);
        const margin = this.size;

        switch (edge) {
            case 0: // Top
                this.x = Math.random() * this.gameWidth;
                this.y = -margin;
                this.angle = Math.PI / 4 + Math.random() * Math.PI / 2;
                break;
            case 1: // Right
                this.x = this.gameWidth + margin;
                this.y = Math.random() * this.gameHeight;
                this.angle = Math.PI * 3/4 + Math.random() * Math.PI / 2;
                break;
            case 2: // Bottom
                this.x = Math.random() * this.gameWidth;
                this.y = this.gameHeight + margin;
                this.angle = -Math.PI * 3/4 + Math.random() * Math.PI / 2;
                break;
            case 3: // Left
                this.x = -margin;
                this.y = Math.random() * this.gameHeight;
                this.angle = -Math.PI / 4 + Math.random() * Math.PI / 2;
                break;
        }
    }

    generateShape() {
        const numPoints = 8 + Math.floor(Math.random() * 4);
        this.points = [];

        for (let i = 0; i < numPoints; i++) {
            const angle = (i / numPoints) * Math.PI * 2;
            const radius = (this.size / 2) * (0.7 + Math.random() * 0.3);
            this.points.push({
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius
            });
        }

        // Generate craters
        this.craters = [];
        const numCraters = 2 + Math.floor(Math.random() * 3);
        for (let i = 0; i < numCraters; i++) {
            const craterAngle = Math.random() * Math.PI * 2;
            const craterDist = Math.random() * this.size * 0.3;
            this.craters.push({
                x: Math.cos(craterAngle) * craterDist,
                y: Math.sin(craterAngle) * craterDist,
                radius: 2 + Math.random() * 4
            });
        }
    }

    update(dt) {
        this.x += Math.cos(this.angle) * this.speed * dt;
        this.y += Math.sin(this.angle) * this.speed * dt;
        this.rotation += this.rotationSpeed * dt;

        if (this.isOffScreen()) {
            this.active = false;
        }
    }

    isOffScreen() {
        const margin = this.size * 2;
        return (
            this.x < -margin ||
            this.x > this.gameWidth + margin ||
            this.y < -margin ||
            this.y > this.gameHeight + margin
        );
    }

    render(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        // Draw main asteroid body
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for (let i = 1; i < this.points.length; i++) {
            ctx.lineTo(this.points[i].x, this.points[i].y);
        }
        ctx.closePath();

        // Fill with gradient
        const gradient = ctx.createRadialGradient(
            -this.size / 4, -this.size / 4, 0,
            0, 0, this.size / 2
        );
        gradient.addColorStop(0, '#8b7b6b');
        gradient.addColorStop(0.5, this.baseColor);
        gradient.addColorStop(1, '#3d352e');
        ctx.fillStyle = gradient;
        ctx.fill();

        // Outline
        ctx.strokeStyle = '#2d2520';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw craters
        ctx.fillStyle = '#3d352e';
        for (const crater of this.craters) {
            ctx.beginPath();
            ctx.arc(crater.x, crater.y, crater.radius, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }

    getBounds() {
        const halfSize = this.size / 2;
        return {
            x: this.x - halfSize,
            y: this.y - halfSize,
            width: this.size,
            height: this.size
        };
    }
}
