import { test, expect } from "@jest/globals";
import Player from "../src/player.js";

test("Player has a gameboard", () => {
  const player = new Player();

  expect(player.board).toBeDefined();
});

test("player can attack enemy board", () => {
  const player1 = new Player();
  const player2 = new Player();

  player2.board.placeShip([[1, 1]]);

  player1.attack(player2.board, [1, 1]);

  expect(player2.board.ships[0].ship.hits).toBe(1);
});

test("computer makes a valid move", () => {
  const computer = new Player("computer");
  const enemy = new Player();

  const move = computer.getMove();

  expect(move.length).toBe(2);
});
