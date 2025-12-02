# Grogu Crossing

A Mandalorian-themed Frogger-style game where you help Grogu navigate through space, avoiding enemies and hazards from the Star Wars universe.

## About

Grogu Crossing is a browser-based arcade game inspired by the classic Frogger. Guide the adorable Grogu across a dangerous space field filled with flying enemies, laser fire, and asteroids. Collect golden eggs for bonus points as you make your way to safety!

## How to Play

1. Open `index.html` in your web browser
2. Click **Start Game**
3. Use the **Arrow Keys** to move Grogu:
   - Up / Down / Left / Right
4. Avoid all enemies, lasers, and asteroids
5. Collect golden eggs for bonus points (+100)
6. Reach the top of the screen to win (+500 points)

## Game Features

- **Classic Frogger Gameplay** with a Star Wars twist
- **Multiple Enemy Types** with unique behaviors:
  - Stormtroopers - Some shoot red laser blasts
  - TIE Fighters - Unpredictable zig-zag movement patterns
  - Mandalorians - Steady horizontal patrol movement
- **Cosmic Hazards** - Random asteroids with procedurally generated designs and rotation animations
- **Collectibles** - Golden eggs with bobbing animation and golden glow effect
- **Lives System** - Start with 3 lives
- **High Score Tracking** - Saved in browser localStorage
- **Idle Animation** - Grogu falls asleep with a "Zzz" bubble after 3 seconds of inactivity
- **Fair Collision System** - Forgiving hitboxes designed for balanced gameplay

## Scoring System

- **Golden Egg Collection**: +100 points per egg
- **Reaching the Top**: +500 points (win bonus)
- **High Score**: Automatically saved to browser localStorage and displayed on both start and game over screens

## 🐸 Easter Egg (Spoiler Warning!)

<details>
<summary>Click to reveal hidden Easter egg feature</summary>

### The Frog Chase

There's a secret Easter egg that unlocks a special power-up!

**How to trigger:**
1. Move Grogu to the bottom-left corner of the screen (x < 50)
2. Stay still and idle for 1 second
3. A green frog will appear and hop across the screen from left to right

**The Force Power-Up:**
- Catch the frog before it exits the right side to activate "The Force"
- When active, Grogu glows with a cyan aura
- All enemy speeds are permanently halved for the rest of the game
- The effect persists even if you lose a life
- Can only be triggered once per game session

</details>

## Technical Details

Built with vanilla web technologies:
- **HTML5** - Game structure
- **CSS3** - Styling and layout
- **JavaScript (ES6)** - Game logic using OOP principles with ES6 classes and private fields
- **Canvas API** - 2D rendering with procedural generation

### Code Architecture

The game follows Object-Oriented Programming principles with a clean class hierarchy:

**Class Structure:**
- **Entity** (base class) - Handles position, size, image loading, rendering, and collision bounds for all game objects
- **Player extends Entity** - Adds keyboard input handling, movement validation, idle animation with "Zzz" bubble, Easter egg state tracking, and Force power-up state
- **Enemy extends Entity** - Adds enemy type system (Stormtrooper, TIE Fighter, Mandalorian), movement patterns (steady, zig-zag), shooting behavior (laser projectiles), and speed configuration
- **Laser** - Projectile class handling direction, speed, and visual rendering as 3 connected red blaster bolts
- **Asteroid** - Generates unique procedural asteroids with randomized shapes, sizes, speeds, and rotation
- **Collectible** - Manages golden egg lifetime, fading animation, bobbing motion, and point values
- **Frog** - Implements the Easter egg with hopping animation and parabolic arc movement
- **Game** - Main controller managing the game loop, state (running/over), collision detection, enemy initialization, and score tracking

**Encapsulation & Best Practices:**
- Uses ES6 private class fields (e.g., `#idleTime`, `#isSleeping`) for proper data hiding
- Delta time-based updates ensure frame-rate independent gameplay
- Inactive entities are filtered out automatically (lasers, asteroids, collectibles, etc.)
- Clean separation of concerns - each class has a single responsibility
- requestAnimationFrame for smooth 60 FPS rendering

### Project Structure

```
grogu-crossing/
├── index.html
├── README.md
├── styles/
│   └── styles.css
├── js/
│   ├── index.js        # Entry point and event handling
│   ├── Game.js         # Game loop, state, and collision detection
│   ├── Entity.js       # Base class for game objects
│   ├── Player.js       # Grogu player logic and idle sleep
│   ├── Enemy.js        # Enemy logic (movement, shooting, zig-zag)
│   ├── Laser.js        # Stormtrooper laser projectiles
│   ├── Asteroid.js     # Random cosmic hazard asteroids
│   ├── Collectible.js  # Golden egg collectibles
│   └── Frog.js         # Easter egg frog and Force power-up
└── images/
    ├── bg.png              # Space background
    ├── grogu.png           # Player sprite
    ├── stormtrooper.png    # Stormtrooper sprite
    ├── tie-fighter.png     # TIE Fighter sprite
    └── mando.png           # Mandalorian sprite
```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/grogu-crossing.git
   ```

2. Open `index.html` in your browser

## Credits

- **Game Design**: Inspired by Frogger
- **Theme**: The Mandalorian / Star Wars universe

## License

This project is for educational purposes. Star Wars and The Mandalorian are properties of Lucasfilm/Disney.
