import GameBoard from "./gameboard.js";

class Player {
  constructor(type = "human") {
    this.board = new GameBoard();
    this.type = type;
    this.previousMoves = new Set();

    this.hitStack = [];
  }

  attack(enemyBoard, coord) {
    return enemyBoard.receiveAttack(coord);
  }

  // getRandomMove() {
  //   let move;
  //   do {
  //     const x = Math.floor(Math.random() * 8);
  //     const y = Math.floor(Math.random() * 8);
  //     move = [x, y];
  //   } while (this.previousMoves.has(move.toString()));

  //   this.previousMoves.add(move.toString());
  //   return move;
  // }
  getMove() {
    if (this.hitStack.length > 0) {
      const [x, y] = this.hitStack[0];
      const directions = [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1],
      ];

      for (let move of directions) {
        const [mx, my] = move;

        if (
          mx >= 0 &&
          mx < 8 &&
          my >= 0 &&
          my < 8 &&
          !this.previousMoves.has(move.toString())
        ) {
          this.previousMoves.add(move.toString());
          return move;
        }
      }

      //no valid neighbours  -> reset
      this.hitStack.shift();
    }

    //Random

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
