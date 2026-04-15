import Player from "./player.js";

class GameController {
  constructor(autoPlace = true) {
    this.player1 = new Player("human");
    this.player2 = new Player("computer");

    ///////////////////Temporaryships to check if dom is working
    // this.player1.board.placeShip([
    //   [0, 0],
    //   [0, 1],
    //   [0, 2],
    // ]);
    // this.player2.board.placeShip([
    //   [3, 3],
    //   [3, 4],
    //   [7, 7],
    // ]);

    if (autoPlace) {
      this.player1.board.placeShipRandomly();
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

    if (this.isGameOver()) return result;

    if (result !== "hit") {
      this.switchTurn();
    }

    // if (this.currentPlayer.type === "human") {
    //   this.switchTurn();

    if (this.currentPlayer.type === "computer") {
      const move = this.currentPlayer.getMove();

      //to avoid deep recusion:
      setTimeout(() => {
        const result = this.playTurn(move);

        if (result === "hit") {
          this.currentPlayer.hitStack.push(move);
        }
      }, 0);
      return;
    }
  }
  // }

  isGameOver() {
    return this.enemy.board.allShipsSunk();
  }
}

export default GameController;
