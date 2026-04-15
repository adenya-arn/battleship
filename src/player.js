import GameBoard from "./gameboard.js";

class Player {
  constructor(type = "human") {
    this.board = new GameBoard();
    this.type = type;
    this.previousMoves = new Set();
  }

  attack(enemyBoard, coord) {
    return enemyBoard.receiveAttack(coord);
  }

  getRandomMove() {
    let move;
    do {
      const x = Math.floor(Math.random() * 8);
      const y = Math.floor(Math.random() * 8);
      move = [x, y];
    } while (this.previousMoves.has(move.toString()));

    this.previousMoves.add(move.toString());
    return move;
  }
}

export default Player;
