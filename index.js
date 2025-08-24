const board = document.getElementById("board");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let cells = Array(9).fill("");
let gameActive = true;

function createBoard() {
  board.innerHTML = "";
  cells.forEach((cell, index) => {
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("cell");
    cellDiv.dataset.index = index;
    cellDiv.textContent = cell;
    board.appendChild(cellDiv);
  });
}

function checkWinner() {
  const winConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      gameActive = false;
      message.textContent = `${cells[a]} wins! 🎉`;
      board.classList.add("celebrate");
      return;
    }
  }

  if (!cells.includes("")) {
    gameActive = false;
    message.textContent = "It's a draw!";
  }
}

board.addEventListener("click", (e) => {
  if (!gameActive) return;
  const index = e.target.dataset.index;
  if (index && cells[index] === "") {
    cells[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
});

restartBtn.addEventListener("click", () => {
  cells = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;
  message.textContent = "";
  board.classList.remove("celebrate");
  createBoard();
});

createBoard();
