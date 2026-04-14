import GameController from "./gameController.js";

const game = new GameController();

const playerBoardDiv = document.getElementById("player-board");
const enemyBoardDiv = document.getElementById("enemy-board");

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
          if (game.isGameOver()) return;
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

      if (!isEnemy) {
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

      container.appendChild(cell);
    }
  }
}
