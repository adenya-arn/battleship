import GameBoard from "../src/gameboard.js";

test("records a missed attack", () => {
  const board = new GameBoard();

  board.receiveAttack([1, 1]);
  expect(board.missedAttacks).toContainEqual([1, 1]);
});

test("attack hits a ship", () => {
  const board = new GameBoard();

  board.placeShip([
    [1, 1],
    [1, 2],
  ]);

  board.receiveAttack([1, 1]);

  expect(board.ships[0].ship.hits).toBe(1);
});

test("same spot is not hit twice", () => {
  const board = new GameBoard();

  board.placeShip([
    [1, 1],
    [1, 2],
  ]);

  board.receiveAttack([1, 1]);
  board.receiveAttack([1, 1]);

  expect(board.ships[0].ship.hits).toBe(1);
});

test("all ships sunk returns true when all ships are sunk", () => {
  const board = new GameBoard();

  board.placeShip([
    [1, 1],
    [1, 2],
  ]); // length 2

  board.receiveAttack([1, 1]);
  board.receiveAttack([1, 2]);

  expect(board.allShipsSunk()).toBe(true);
});

test("all ships sunk returns false if at least one ship is not sunk", () => {
  const board = new GameBoard();

  board.placeShip([
    [1, 1],
    [1, 2],
  ]);

  board.receiveAttack([1, 1]);

  expect(board.allShipsSunk()).toBe(false);
});
