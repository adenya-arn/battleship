# Battleship

A browser-based implementation of the classic Battleship game built with modern JavaScript. Players manually position their fleet before battling against an AI opponent that uses a simple targeting strategy after landing successful hits. The project follows an object-oriented design and includes unit tests for the game's core logic.

## Features

- Manual ship placement with live placement preview
- Rotate ships using the **R** key
- Automatic ship placement for the computer
- Visual feedback for:
  - Ship locations
  - Hits
  - Misses

- Turn-based gameplay
- Computer AI that:
  - Fires random shots initially
  - Targets neighboring cells after a successful hit

- Game over detection
- Restart game button
- Unit tests using Jest

---

## Built With

- JavaScript (ES6 Modules)
- HTML5
- CSS3
- Webpack
- Jest

---

## How to Play

1. Place your ships on the left board.
2. Press **R** to rotate between horizontal and vertical placement.
3. Place all five ships:
   - Carrier (5)
   - Battleship (4)
   - Cruiser (3)
   - Submarine (3)
   - Destroyer (2)

4. After all ships are placed, the battle begins automatically.
5. Click cells on the enemy board to attack.
6. If you hit an enemy ship, you immediately get another turn.
7. Missing passes the turn to the computer.
8. Sink every enemy ship before yours are destroyed.

---

## Computer AI

The computer opponent uses two strategies:

### Random Search

Before locating any ships, the AI randomly selects cells that have not been attacked.

### Target Mode

After scoring a hit, the AI stores that location and attacks neighboring cells until no valid adjacent moves remain, then returns to random searching.

This creates a more intelligent opponent than completely random attacks while keeping the implementation straightforward.

## Running Locally

Clone the repository:

```bash
git clone https://github.com/yourusername/battleship.git
```

Navigate into the project:

```bash
cd battleship
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Build for production:

```bash
npm run dev
```

Run the test suite:

```bash
npm test
```

---

## Testing

The project includes unit tests covering the main game logic.

Tests verify:

- Ship hit tracking
- Ship sinking logic
- Attack handling
- Miss recording
- Duplicate attack prevention
- Game board behavior
- Player attacks
- Computer move generation
- Turn switching
- Game over detection

---

## What I Learned

This project helped strengthen my understanding of:

- Object-Oriented Programming in JavaScript
- Separation of concerns
- DOM manipulation
- Game state management
- Event-driven programming
- AI decision making using search strategies
- Test-driven development with Jest
- Organizing larger JavaScript applications into reusable modules

---

## Future Improvements

- Difficulty levels for the computer AI
- Ship placement drag-and-drop
- Smarter AI using hunt-and-destroy algorithms
- Sound effects and animations
- Mobile-friendly controls
- Multiplayer support
- Score tracking and statistics

---

## Author

**Arnold Adenya**
