document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const statusText = document.getElementById("status");
  const restartBtn = document.getElementById("restartBtn");
  const twoPlayerBtn = document.getElementById("twoPlayerBtn");
  const onePlayerBtn = document.getElementById("onePlayerBtn");
  let board = Array(9).fill("");
  let currentPlayer = "X";
  let isGameActive = true;
  let isTwoPlayerMode = true;

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWin = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      statusText.innerHTML = `${currentPlayer} has won!`;
      isGameActive = false;
      highlightWinningCells(a, b, c);
      return true;
    }

    if (!board.includes("")) {
      statusText.innerHTML = "Draw!";
      isGameActive = false;
      return true;
    }

    return false;
  };

  const highlightWinningCells = (a, b, c) => {
    cells[a].classList.add("winning-cell");
    cells[b].classList.add("winning-cell");
    cells[c].classList.add("winning-cell");
  };

  const botMove = () => {
    let emptyCells = [];
    board.forEach((cell, index) => {
      if (cell === "") emptyCells.push(index);
    });

    if (emptyCells.length > 0) {
      const randomIndex =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      board[randomIndex] = currentPlayer;
      cells[randomIndex].innerHTML = currentPlayer;
      cells[randomIndex].style.pointerEvents = "none";
      if (checkWin()) return;
      currentPlayer = "X";
      statusText.innerHTML = `Player ${currentPlayer}'s turn`;
    }
  };

  const handleCellClick = (e) => {
    const cellIndex = e.target.getAttribute("data-index");

    if (board[cellIndex] !== "" || !isGameActive) {
      return;
    }

    board[cellIndex] = currentPlayer;
    e.target.innerHTML = currentPlayer;
    e.target.style.pointerEvents = "none";

    if (checkWin()) return;

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerHTML = `Player ${currentPlayer}'s turn`;

    if (!isTwoPlayerMode && currentPlayer === "O" && isGameActive) {
      setTimeout(botMove, 500);
    }
  };

  const restartGame = () => {
    board = Array(9).fill("");
    cells.forEach((cell) => {
      cell.innerHTML = "";
      cell.style.pointerEvents = "auto";
      cell.classList.remove("winning-cell");
    });
    isGameActive = true;
    currentPlayer = "X";
    statusText.innerHTML = `Player ${currentPlayer}'s turn`;
  };

  cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
  restartBtn.addEventListener("click", restartGame);

  twoPlayerBtn.addEventListener("click", () => {
    isTwoPlayerMode = true;
    restartGame();
  });

  onePlayerBtn.addEventListener("click", () => {
    isTwoPlayerMode = false;
    restartGame();
  });

  statusText.innerHTML = `Player ${currentPlayer}'s turn`;
});
