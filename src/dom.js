import GameController from "./gameController.js";

const game = new GameController(false); // manual placement

let isHorizontal = true;

const playerBoardDiv = document.getElementById("player-board");
const enemyBoardDiv = document.getElementById("enemy-board");
const statusDiv = document.getElementById("status");

document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "r") {
    isHorizontal = !isHorizontal;
    statusDiv.textContent = `Rotate: ${
      isHorizontal ? "Horizontal" : "Vertical"
    }`;
    renderBoards();
  }
});

document.getElementById("restart").addEventListener("click", () => {
  location.reload();
});

let placingShips = true;
let currentShipSizeIndex = 0;
const shipSizes = [5, 4, 3, 3, 2];

let hoverCell = null;

statusDiv.textContent = `Place ship of size ${shipSizes[currentShipSizeIndex]}`;

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

      // HOVER TRACKING
      if (!isEnemy && placingShips) {
        cell.addEventListener("mouseenter", () => {
          hoverCell = [x, y];
          renderBoards();
        });
      }

      const isMiss = board.missedAttacks.some(
        ([mx, my]) => mx === x && my === y,
      );

      const isHit = board.ships.some((obj) =>
        obj.hits.some(([hx, hy]) => hx === x && hy === y),
      );

      const hasShip = board.ships.some((obj) =>
        obj.positions.some(([sx, sy]) => sx === x && sy === y),
      );

      // ===== PREVIEW =====
      if (!isEnemy && placingShips && hoverCell) {
        const size = shipSizes[currentShipSizeIndex];
        const previewPositions = [];

        for (let i = 0; i < size; i++) {
          const px = isHorizontal ? hoverCell[0] : hoverCell[0] + i;
          const py = isHorizontal ? hoverCell[1] + i : hoverCell[1];

          if (px > 7 || py > 7) break;

          previewPositions.push([px, py]);
        }

        const isValid =
          previewPositions.length === size &&
          !board.ships.some((obj) =>
            obj.positions.some((pos) =>
              previewPositions.some(
                ([px, py]) => px === pos[0] && py === pos[1],
              ),
            ),
          );

        const isPreviewCell = previewPositions.some(
          ([px, py]) => px === x && py === y,
        );

        if (isPreviewCell) {
          cell.style.backgroundColor = isValid ? "#22c55e" : "#ef4444";
        }
      }

      // ===== PLACEMENT =====
      if (!isEnemy && placingShips) {
        cell.addEventListener("click", () => {
          const size = shipSizes[currentShipSizeIndex];
          const positions = [];

          for (let i = 0; i < size; i++) {
            const px = isHorizontal ? x : x + i;
            const py = isHorizontal ? y + i : y;

            if (px > 7 || py > 7) return;

            positions.push([px, py]);
          }

          const overlap = board.ships.some((obj) =>
            obj.positions.some((pos) =>
              positions.some(([px, py]) => px === pos[0] && py === pos[1]),
            ),
          );

          if (overlap || positions.length !== size) return;

          board.placeShip(positions);

          currentShipSizeIndex++;

          if (currentShipSizeIndex >= shipSizes.length) {
            placingShips = false;

            // 🔥 IMPORTANT FIX: place computer ships AFTER player finishes
            game.player2.board.placeShipRandomly();

            statusDiv.textContent = "Battle started! Your turn";
          } else {
            statusDiv.textContent = `Place ship of size ${
              shipSizes[currentShipSizeIndex]
            }`;
          }

          renderBoards();
        });
      }

      // ===== ATTACK =====
      if (isEnemy && !placingShips) {
        cell.addEventListener("click", () => {
          if (game.isGameOver()) return;

          const result = game.playTurn([x, y]);

          if (game.isGameOver()) {
            statusDiv.textContent = "Game Over! You Win 🎉";
          } else {
            statusDiv.textContent =
              result === "hit" ? "Hit! 🔥 Go again" : "Miss! 💨";
          }

          renderBoards();
        });
      }

      // ===== COLORS =====
      if (isHit) cell.classList.add("hit");
      if (isMiss) cell.classList.add("miss");
      if (!isEnemy && hasShip) cell.classList.add("ship");

      container.appendChild(cell);
    }
  }

  // COMPUTER WIN
  if (game.isGameOver() && game.currentPlayer.type === "computer") {
    statusDiv.textContent = "Computer Wins 💻";
  }
}
