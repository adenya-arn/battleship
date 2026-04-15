import GameController from "../src/gameController";

test("game initializes with two players", () => {
  const game = new GameController();

  expect(game.player1).toBeDefined();
  expect(game.player1).toBeDefined();
});

test("switches turns", () => {
  const game = new GameController();

  const first = game.currentPlayer;

  game.switchTurn();

  expect(game.currentPlayer).not.toBe(first);
});

test("player attacks enemy board", () => {
  const game = new GameController(false);

  game.player2.board.placeShip([[1, 1]]);

  game.playTurn([1, 1]);

  expect(game.player2.board.ships[0].ship.hits).toBe(1);
});

test("game ends when all ships sunk", () => {
  const game = new GameController(false);

  game.player2.board.placeShip([[1, 1]]);

  game.currentPlayer = game.player1;
  game.enemy = game.player2;

  game.playTurn([1, 1]);

  expect(game.isGameOver()).toBe(true);
});
