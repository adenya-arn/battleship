import Ship from "./ship.js";

class GameBoard {
  constructor() {
    this.ships = [];
    this.missedAttacks = [];
  }

  placeShip(positions) {
    const ship = new Ship(positions.length);

    this.ships.push({
      ship,
      positions,
      hits: [],
    });
  }

  receiveAttack(coord) {
    for (let obj of this.ships) {
      const index = obj.positions.findIndex(
        (pos) => pos[0] === coord[0] && pos[1] === coord[1],
      );
      if (index !== -1) {
        if (
          obj.hits.some((hit) => hit[0] === coord[0] && hit[1] === coord[1])
        ) {
          return;
        }
        obj.hits.push(coord);
        obj.ship.hit();
        return;
      }
    }
    this.missedAttacks.push([coord[0], coord[1]]);
    console.log("missed", this.missedAttacks);
  }

  allShipsSunk() {
    return this.ships.every((obj) => obj.ship.isSunk());
  }
}

export default GameBoard;
