import Player from "./player.js";

class GameController {
  constructor(autoPlace = true) {
    this.player1 = new Player("human");
    this.player2 = new Player("computer");

    if (autoPlace) {
      this.player2.board.placeShipRandomly();
    }

    this.currentPlayer = this.player1;
    this.enemy = this.player2;
  }

  switchTurn() {
    if (this.currentPlayer === this.player1) {
      this.currentPlayer = this.player2;
      this.enemy = this.player1;
    } else {
      this.currentPlayer = this.player1;
      this.enemy = this.player2;
    }
  }

  playTurn(coord) {
    const result = this.currentPlayer.attack(this.enemy.board, coord);

    // 🔥 store reference BEFORE anything changes
    const actingPlayer = this.currentPlayer;

    if (this.isGameOver()) return result;

    // 🧠 AI memory (ONLY for computer)
    if (result === "hit" && actingPlayer.type === "computer") {
      actingPlayer.hitStack.push(coord);
    }

    // 🔁 Switch turn ONLY on miss
    if (result === "miss") {
      this.switchTurn();
    }

    // 🤖 Computer plays automatically
    if (this.currentPlayer.type === "computer") {
      const move = this.currentPlayer.getMove();

      setTimeout(() => {
        if (!this.isGameOver()) {
          this.playTurn(move);
        }
      }, 300);
    }

    return result; // ✅ ALWAYS return
  }

  isGameOver() {
    return this.enemy.board.allShipsSunk();
  }
}

export default GameController;
