import Player from "./player.js";

class GameController {
  constructor() {
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
    this.player1.board.placeShipRandomly();
    this.player2.board.placeShipRandomly();
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

    if (this.isGameOver()) return;

    if (result === "miss") {
      this.switchTurn();
    }

    if (this.currentPlayer.type === "computer") {
      const move = this.currentPlayer.getRandomMove();

      //to avoid deep recusion:
      setTimeout(() => {
        this.playTurn(move);
      }, 300);
    }
  }

  isGameOver() {
    return this.enemy.board.allShipsSunk();
  }
}

export default GameController;
