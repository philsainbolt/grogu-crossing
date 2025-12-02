class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;

        this.player = new Player(this.width, this.height);
        this.enemies = [];
        this.lasers = [];
        this.asteroids = [];
        this.asteroidTimer = 0;
        this.asteroidSpawnInterval = 4 + Math.random() * 2;
        this.collectibles = [];
        this.collectibleTimer = 0;
        this.collectibleSpawnInterval = 2.5 + Math.random() * 2;

        // Easter egg state
        this.frog = null;
        this.easterEggTriggered = false;
        this.forceActive = false;
        this.forceMessageTimer = 0;
        this.showForceMessage = false;

        this.score = 0;
        this.lives = 3;
        this.highScore = this.loadHighScore();
        this.isGameOver = false;
        this.isRunning = false;
        this.lastTime = 0;

        this.initEnemies();

        // UI
        this.scoreElement = document.getElementById('score');
        this.livesElement = document.getElementById('lives');
        this.finalScoreElement = document.getElementById('final-score');
        this.gameOverMessage = document.getElementById('game-over-message');
        this.startScreen = document.getElementById('start-screen');
        this.gameOverScreen = document.getElementById('game-over-screen');
        this.uiLayer = document.getElementById('ui-layer');
        this.startHighScoreElement = document.getElementById('start-high-score');
        this.endHighScoreElement = document.getElementById('end-high-score');

        // Update high score display (in case it was beaten)
        this.startHighScoreElement.textContent = this.highScore;
    }



    initEnemies() {
        this.enemies = [];
        // Row 1 (3 Stormtroopers, first one shoots)
        this.enemies.push(new Enemy(0, 60, 100, 1, this.width, true));
        this.enemies.push(new Enemy(287, 60, 100, 1, this.width));
        this.enemies.push(new Enemy(573, 60, 100, 1, this.width));

        // Row 2 (2 TIE Fighters)
        this.enemies.push(new Enemy(800, 140, -200, 2, this.width));
        this.enemies.push(new Enemy(370, 140, -200, 2, this.width));

        // Row 3 (2 Mandos)
        this.enemies.push(new Enemy(0, 220, 150, 3, this.width));
        this.enemies.push(new Enemy(430, 220, 150, 3, this.width));

        // Row 4 (2 Stormtroopers, first one shoots)
        this.enemies.push(new Enemy(800, 300, -120, 1, this.width, true));
        this.enemies.push(new Enemy(370, 300, -120, 1, this.width));

        // Row 5 (2 TIE Fighters)
        this.enemies.push(new Enemy(0, 380, 250, 2, this.width));
        this.enemies.push(new Enemy(430, 380, 250, 2, this.width));

        // Row 6 (2 Mandos)
        this.enemies.push(new Enemy(800, 460, -180, 3, this.width));
        this.enemies.push(new Enemy(370, 460, -180, 3, this.width));

        // Row 7 (3 Stormtroopers, first one shoots)
        this.enemies.push(new Enemy(0, 540, 120, 1, this.width, true));
        this.enemies.push(new Enemy(287, 540, 120, 1, this.width));
        this.enemies.push(new Enemy(573, 540, 120, 1, this.width));

        // Row 8 (2 TIE Fighters)
        this.enemies.push(new Enemy(800, 620, -220, 2, this.width));
        this.enemies.push(new Enemy(370, 620, -220, 2, this.width));
    }

    start() {
        this.isRunning = true;
        this.isGameOver = false;
        this.score = 0;
        this.lives = 3;
        this.lasers = [];
        this.asteroids = [];
        this.asteroidTimer = 0;
        this.asteroidSpawnInterval = 4 + Math.random() * 2;
        this.collectibles = [];
        this.collectibleTimer = 0;
        this.collectibleSpawnInterval = 2.5 + Math.random() * 2;

        // Reset easter egg state
        this.frog = null;
        this.easterEggTriggered = false;
        this.forceActive = false;
        this.showForceMessage = false;
        this.forceMessageTimer = 0;
        this.player.forceActive = false;

        this.player.reset();
        this.updateUI();

        // Update high score display (in case it was beaten)
        this.startHighScoreElement.textContent = this.highScore;

        this.startScreen.classList.add('hidden');
        this.gameOverScreen.classList.add('hidden');
        this.uiLayer.classList.remove('hidden');

        this.lastTime = performance.now();
        requestAnimationFrame(this.loop.bind(this));
    }

    loop(timestamp) {
        if (!this.isRunning) return;

        const dt = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        this.update(dt);
        this.render();

        requestAnimationFrame(this.loop.bind(this));
    }

    update(dt) {
        this.player.update(dt);

        // Update enemies and collect any new lasers
        this.enemies.forEach(enemy => {
            const laserData = enemy.update(dt);
            if (laserData) {
                this.lasers.push(new Laser(laserData.x, laserData.y, laserData.direction, this.width));
            }
        });

        // Update lasers and remove inactive ones
        this.lasers.forEach(laser => laser.update(dt));
        this.lasers = this.lasers.filter(laser => laser.active);

        // Spawn and update asteroids
        this.asteroidTimer += dt;
        if (this.asteroidTimer >= this.asteroidSpawnInterval) {
            this.asteroids.push(new Asteroid(this.width, this.height));
            this.asteroidTimer = 0;
            this.asteroidSpawnInterval = 4 + Math.random() * 2;
        }
        this.asteroids.forEach(asteroid => asteroid.update(dt));
        this.asteroids = this.asteroids.filter(asteroid => asteroid.active);

        // Spawn and update collectibles
        this.collectibleTimer += dt;
        if (this.collectibleTimer >= this.collectibleSpawnInterval) {
            this.spawnCollectible();
            this.collectibleTimer = 0;
            this.collectibleSpawnInterval = 2.5 + Math.random() * 2;
        }
        this.collectibles.forEach(c => c.update(dt));
        this.collectibles = this.collectibles.filter(c => c.active);

        this.checkCollisions();
        this.checkLaserCollisions();
        this.checkAsteroidCollisions();
        this.checkCollectibleCollisions();
        this.checkWin();

        // Easter egg trigger check
        if (!this.easterEggTriggered && this.player.isEasterEggReady()) {
            this.spawnFrog();
            this.easterEggTriggered = true;
        }

        // Update frog if exists
        if (this.frog && this.frog.active) {
            this.frog.update(dt);
            this.checkFrogCollision();
        }

        // Force message timer
        if (this.showForceMessage) {
            this.forceMessageTimer += dt;
            if (this.forceMessageTimer >= 3) {
                this.showForceMessage = false;
            }
        }
    }

    render() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Draw "safe zones" or lanes if needed (visuals are mostly in bg.png)

        this.collectibles.forEach(c => c.render(this.ctx));
        this.enemies.forEach(enemy => enemy.render(this.ctx));
        this.lasers.forEach(laser => laser.render(this.ctx));
        this.asteroids.forEach(asteroid => asteroid.render(this.ctx));

        // Render frog
        if (this.frog && this.frog.active) {
            this.frog.render(this.ctx);
        }

        this.player.render(this.ctx);

        // Render Force message popup
        if (this.showForceMessage) {
            this.ctx.save();
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(this.width / 2 - 150, this.height / 2 - 40, 300, 80);

            this.ctx.strokeStyle = '#00bfff';
            this.ctx.lineWidth = 3;
            this.ctx.strokeRect(this.width / 2 - 150, this.height / 2 - 40, 300, 80);

            this.ctx.font = 'bold 24px Arial';
            this.ctx.fillStyle = '#00bfff';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('The Force is with you!', this.width / 2, this.height / 2 + 8);
            this.ctx.restore();
        }
    }

    checkCollisions() {
        const playerBounds = this.player.getBounds();

        // Reduce hitbox slightly for better feel
        const hitbox = {
            x: playerBounds.x + 10,
            y: playerBounds.y + 10,
            width: playerBounds.width - 20,
            height: playerBounds.height - 20
        };

        for (let enemy of this.enemies) {
            const enemyBounds = enemy.getBounds();
            const enemyHitbox = {
                x: enemyBounds.x + 5,
                y: enemyBounds.y + 5,
                width: enemyBounds.width - 10,
                height: enemyBounds.height - 10
            };

            if (
                hitbox.x < enemyHitbox.x + enemyHitbox.width &&
                hitbox.x + hitbox.width > enemyHitbox.x &&
                hitbox.y < enemyHitbox.y + enemyHitbox.height &&
                hitbox.y + hitbox.height > enemyHitbox.y
            ) {
                this.handleDeath();
                return;
            }
        }
    }

    checkLaserCollisions() {
        const playerBounds = this.player.getBounds();
        const hitbox = {
            x: playerBounds.x + 10,
            y: playerBounds.y + 10,
            width: playerBounds.width - 20,
            height: playerBounds.height - 20
        };

        for (const laser of this.lasers) {
            const lb = laser.getBounds();
            if (
                hitbox.x < lb.x + lb.width &&
                hitbox.x + hitbox.width > lb.x &&
                hitbox.y < lb.y + lb.height &&
                hitbox.y + hitbox.height > lb.y
            ) {
                laser.active = false;
                this.handleDeath();
                return;
            }
        }
    }

    checkAsteroidCollisions() {
        const playerBounds = this.player.getBounds();
        const hitbox = {
            x: playerBounds.x + 10,
            y: playerBounds.y + 10,
            width: playerBounds.width - 20,
            height: playerBounds.height - 20
        };

        for (const asteroid of this.asteroids) {
            const ab = asteroid.getBounds();
            // Reduce asteroid hitbox slightly for fairness
            const asteroidHitbox = {
                x: ab.x + 5,
                y: ab.y + 5,
                width: ab.width - 10,
                height: ab.height - 10
            };

            if (
                hitbox.x < asteroidHitbox.x + asteroidHitbox.width &&
                hitbox.x + hitbox.width > asteroidHitbox.x &&
                hitbox.y < asteroidHitbox.y + asteroidHitbox.height &&
                hitbox.y + hitbox.height > asteroidHitbox.y
            ) {
                asteroid.active = false;
                this.handleDeath();
                return;
            }
        }
    }

    spawnCollectible() {
        const x = 50 + Math.random() * (this.width - 100);
        const y = 50 + Math.random() * (this.height - 150);
        this.collectibles.push(new Collectible(x, y));
    }

    checkCollectibleCollisions() {
        const playerBounds = this.player.getBounds();

        for (const collectible of this.collectibles) {
            const cb = collectible.getBounds();
            if (
                playerBounds.x < cb.x + cb.width &&
                playerBounds.x + playerBounds.width > cb.x &&
                playerBounds.y < cb.y + cb.height &&
                playerBounds.y + playerBounds.height > cb.y
            ) {
                collectible.active = false;
                this.score += collectible.points;
                this.updateUI();
            }
        }
    }

    spawnFrog() {
        this.frog = new Frog(this.height);
    }

    checkFrogCollision() {
        if (!this.frog || !this.frog.active) return;

        const playerBounds = this.player.getBounds();
        const frogBounds = this.frog.getBounds();

        if (
            playerBounds.x < frogBounds.x + frogBounds.width &&
            playerBounds.x + playerBounds.width > frogBounds.x &&
            playerBounds.y < frogBounds.y + frogBounds.height &&
            playerBounds.y + playerBounds.height > frogBounds.y
        ) {
            this.activateForce();
            this.frog.active = false;
        }
    }

    activateForce() {
        this.forceActive = true;
        this.player.forceActive = true;
        this.showForceMessage = true;
        this.forceMessageTimer = 0;

        // Halve all enemy speeds
        for (let enemy of this.enemies) {
            enemy.speed = enemy.speed / 2;
            // Also halve zig-zag frequency for TIE fighters
            if (enemy.frequency) {
                enemy.frequency = enemy.frequency / 2;
            }
        }
    }

    checkWin() {
        if (this.player.y < 20) {
            this.score += 500;
            this.gameWin();
        }
    }

    gameWin() {
        this.isRunning = false;
        this.isGameOver = true;
        this.saveHighScore();
        this.finalScoreElement.textContent = this.score;
        this.endHighScoreElement.textContent = this.highScore;
        this.gameOverMessage.textContent = "This is the way!";
        this.gameOverScreen.classList.remove('hidden');
        this.uiLayer.classList.add('hidden');

        // Update button text to say "Play Again"
        document.getElementById('restart-btn').textContent = "Play Again";
    }

    handleDeath() {
        this.lives--;
        this.updateUI();
        if (this.lives <= 0) {
            this.gameOver();
        } else {
            this.player.reset();
        }
    }

    gameOver() {
        this.isRunning = false;
        this.isGameOver = true;
        this.saveHighScore();
        this.finalScoreElement.textContent = this.score;
        this.endHighScoreElement.textContent = this.highScore;
        this.gameOverMessage.textContent = "The Empire caught you!";
        this.gameOverScreen.classList.remove('hidden');
        this.uiLayer.classList.add('hidden');
    }

    updateUI() {
        this.scoreElement.textContent = this.score;
        this.livesElement.textContent = this.lives;
    }

    handleInput(key) {
        if (this.isRunning && !this.isGameOver) {
            this.player.handleInput(key);
        }
    }

    loadHighScore() {
        return parseInt(localStorage.getItem('groguHighScore')) || 0;
    }

    saveHighScore() {
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('groguHighScore', this.highScore);
        }
    }
}
