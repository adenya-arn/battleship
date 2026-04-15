import GameController from "./gameController.js";

const game = new GameController();

const playerBoardDiv = document.getElementById("player-board");
const enemyBoardDiv = document.getElementById("enemy-board");
const statusDiv = document.getElementById("status");

document.getElementById("restart").addEventListener("click", () => {
  location.reload();
});

let placingShips = true;
let currentShipSizeIndex = 0;
const shipSizes = [5, 4, 3, 3, 2];

export function renderBoards() {
  renderBoard(playerBoardDiv, game.player1.board, false);
  renderBoard(enemyBoardDiv, game.player2.board, true);
}

function renderBoard(container, board, isEnemy) {
  container.innerHTML = "";

  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.x = x;
      cell.dataset.y = y;

      if (isEnemy) {
        cell.addEventListener("click", () => {
          //   console.log("clicked", x, y);
          //   console.log([...board.missedAttacks]);
          if (game.isGameOver()) {
            statusDiv.textContent = "Game Over! You Win 🎉";
            return;
          }

          game.playTurn([x, y]);
          renderBoards();
        });
      }

      const isMiss = board.missedAttacks.some(
        ([mx, my]) => mx === x && my === y,
      );

      const isHit = board.ships.some((obj) =>
        obj.hits?.some(([hx, hy]) => hx === x && hy === y),
      );

      if (
        board.missedAttacks.some(([mx, my]) => mx === x && my === y) ||
        board.ships.some((obj) =>
          obj.hits.some(([hx, hy]) => hx === x && hy === y),
        )
      )
        return;

      if (!isEnemy && placingShips) {
        cell.addEventListener("click", () => {
          const size = shipSizes[currentShipSizeIndex];

          const positions = [];

          for (let i = 0; i < size; i++) {
            if (y + i > 7) return;

            positions.push([x, y + i]);
          }
          const overlap = game.player1.board.ships.some((obj) =>
            obj.positions.some((pos) =>
              positions.some(([x, y]) => x === pos[0] && y === pos[1]),
            ),
          );

          if (overlap) return;

          game.player1.board.placeShip(positions);

          currentShipSizeIndex++;

          if (currentShipSizeIndex >= shipSizes.length) {
            placingShips = false;
          }
          if (placingShips) {
            statusDiv.textContent = `Place ship of size ${shipSizes[currentShipSizeIndex]}`;
          } else {
            statusDiv.textContent = "Battle started!";
          }

          renderBoards();
        });

        const hasShip = board.ships.some((obj) =>
          obj.positions.some(([sx, sy]) => sx === x && sy === y),
        );

        if (hasShip) {
          cell.style.backgroundColor = "lightblue";
        }
      }

      if (isMiss) {
        cell.style.backgroundColor = "gray";
      }

      if (isHit) {
        cell.style.backgroundColor = "red";
      }
      if (game.isGameOver()) {
        if (game.currentPlayer.type === "computer") {
          statusDiv.textContent = "Computer Wins 💻";
        }
      }

      container.appendChild(cell);
    }
  }
}
