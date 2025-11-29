class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;

        this.player = new Player(this.width, this.height);
        this.enemies = [];
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
        // Row 1 (3 enemies, spacing ~286)
        this.enemies.push(new Enemy(0, 60, 100, 1, this.width));
        this.enemies.push(new Enemy(287, 60, 100, 1, this.width));
        this.enemies.push(new Enemy(573, 60, 100, 1, this.width));

        // Row 2 (2 enemies, spacing 430)
        this.enemies.push(new Enemy(800, 140, -200, 2, this.width));
        this.enemies.push(new Enemy(370, 140, -200, 2, this.width));

        // Row 3 (2 enemies, spacing 430)
        this.enemies.push(new Enemy(0, 220, 150, 3, this.width));
        this.enemies.push(new Enemy(430, 220, 150, 3, this.width));

        // Row 4 (2 enemies, spacing 430)
        this.enemies.push(new Enemy(800, 300, -120, 1, this.width));
        this.enemies.push(new Enemy(370, 300, -120, 1, this.width));

        // Row 5 (2 enemies, spacing 430)
        this.enemies.push(new Enemy(0, 380, 250, 2, this.width));
        this.enemies.push(new Enemy(430, 380, 250, 2, this.width));

        // Row 6 (2 enemies, spacing 430)
        this.enemies.push(new Enemy(800, 460, -180, 3, this.width));
        this.enemies.push(new Enemy(370, 460, -180, 3, this.width));

        // Row 7 (3 enemies, spacing ~286)
        this.enemies.push(new Enemy(0, 540, 120, 1, this.width));
        this.enemies.push(new Enemy(287, 540, 120, 1, this.width));
        this.enemies.push(new Enemy(573, 540, 120, 1, this.width));

        // Row 8 (2 enemies, spacing 430)
        this.enemies.push(new Enemy(800, 620, -220, 2, this.width));
        this.enemies.push(new Enemy(370, 620, -220, 2, this.width));
    }

    start() {
        this.isRunning = true;
        this.isGameOver = false;
        this.score = 0;
        this.lives = 3;
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
        this.enemies.forEach(enemy => enemy.update(dt));

        this.checkCollisions();
        this.checkWin();
    }

    render() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Draw "safe zones" or lanes if needed (visuals are mostly in bg.png)

        this.enemies.forEach(enemy => enemy.render(this.ctx));
        this.player.render(this.ctx);
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
