import { test, expect } from "@jest/globals";
import Ship from "../src/ship.js";

test("hits increase by 1", () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship.hits).toBe(1);
});

test("ship is not sunk initially", () => {
  const ship = new Ship(3);
  expect(ship.isSunk()).toBe(false);
});

test("ship is sunk when hits equal length", () => {
  const ship = new Ship(2);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
