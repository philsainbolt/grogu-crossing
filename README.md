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
- **Multiple Enemy Types**:
  - Stormtroopers - Some shoot red laser blasts
  - TIE Fighters - Zig-zag movement pattern
  - Mandalorians - Standard patrol movement
- **Cosmic Hazards** - Random asteroids fly across the screen
- **Collectibles** - Golden eggs spawn for bonus points
- **Lives System** - Start with 3 lives
- **High Score** - Persists in localStorage
- **Idle Animation** - Grogu falls asleep with a Zzz bubble after 3 seconds of no movement

## Technical Details

Built with vanilla web technologies:
- **HTML5** - Game structure
- **CSS3** - Styling and layout
- **JavaScript (ES6)** - Game logic using OOP principles
- **Canvas API** - 2D rendering

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
│   └── Collectible.js  # Golden egg collectibles
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
