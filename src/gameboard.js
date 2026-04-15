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
    const alreadyMissed = this.missedAttacks.some(
      ([x, y]) => x === coord[0] && y === coord[1],
    );

    const alreadyHit = this.ships.some((obj) =>
      obj.hits.some(([x, y]) => x === coord[0] && y === coord[1]),
    );

    if (alreadyMissed || alreadyHit) return;

    for (let obj of this.ships) {
      const index = obj.positions.findIndex(
        (pos) => pos[0] === coord[0] && pos[1] === coord[1],
      );
      if (index !== -1) {
        if (
          obj.hits.some((hit) => hit[0] === coord[0] && hit[1] === coord[1])
        ) {
          return "repeat";
        }
        obj.hits.push(coord);
        obj.ship.hit();
        return "hit";
      }
    }
    this.missedAttacks.push([coord[0], coord[1]]);
    return "miss";
    // console.log("missed", this.missedAttacks);
  }

  allShipsSunk() {
    return this.ships.every((obj) => obj.ship.isSunk());
  }

  placeShipRandomly() {
    const shipSizes = [5, 4, 3, 3, 2];

    shipSizes.forEach((size) => {
      let placed = false;

      while (!placed) {
        const isHorizontal = Math.random() < 0.5;
        const startX = Math.floor(Math.random() * 8);
        const startY = Math.floor(Math.random() * 8);

        const positions = [];

        for (let i = 0; i < size; i++) {
          const x = isHorizontal ? startX + i : startX;
          const y = isHorizontal ? startY : startY + i;

          if (x > 7 || y > 7) break;

          positions.push([x, y]);
        }

        if (positions.length !== size) continue;

        const overlap = this.ships.some((obj) =>
          obj.positions.some((pos) =>
            positions.some(([x, y]) => x === pos[0] && y === pos[1]),
          ),
        );
        if (!overlap) {
          this.placeShip(positions);
          placed = true;
        }
      }
    });
  }
}

export default GameBoard;
