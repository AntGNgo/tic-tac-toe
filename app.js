const gameBoard = (() => {
  let newBoard = [[], [], [], [], [], [], [], [], []];

  let currentBoard = [[], [], [], [], [], [], [], [], []];

  // Which players turn
  let playerTurn = 0;

  // New Game
  const resetGame = () => {
    let winWindow = document.getElementById("game-win");
    let gameCells = document.getElementsByClassName("game-cell");

    for (let i = 0; i < gameCells.length; i++) {
      gameCells[i].style.pointerEvents = "all";
    }
    winWindow.classList.add("hidden");
    currentBoard = newBoard.slice();
    updateHeader();
  };

  // Event listener for new game button
  const newGame = document.getElementById("new-game");
  newGame.addEventListener("click", () => {
    resetGame();
    // Reset Grid Cell content
    gridCells.forEach((cell) => {
      cell.textContent = "";
    });
  });

  // Check for Winner
  const checkWin = () => {
    // Check Rows
    if (
      currentBoard[0][0] + currentBoard[0][1] + currentBoard[0][2] === "XXX" ||
      currentBoard[0][0] + currentBoard[0][1] + currentBoard[0][2] === "OOO" ||
      currentBoard[0][3] + currentBoard[0][4] + currentBoard[0][5] === "XXX" ||
      currentBoard[0][3] + currentBoard[0][4] + currentBoard[0][5] === "OOO" ||
      currentBoard[0][6] + currentBoard[0][7] + currentBoard[0][8] === "XXX" ||
      currentBoard[0][6] + currentBoard[0][7] + currentBoard[0][8] === "OOO"
    ) {
      return true;
    }

    // Check Columns
    if (
      currentBoard[0][0] + currentBoard[0][3] + currentBoard[0][6] === "XXX" ||
      currentBoard[0][0] + currentBoard[0][3] + currentBoard[0][6] === "OOO"
    ) {
      return true;
    } else if (
      currentBoard[0][1] + currentBoard[0][4] + currentBoard[0][7] === "XXX" ||
      currentBoard[0][1] + currentBoard[0][4] + currentBoard[0][7] === "OOO"
    ) {
      return true;
    } else if (
      currentBoard[0][2] + currentBoard[0][5] + currentBoard[0][8] === "XXX" ||
      currentBoard[0][2] + currentBoard[0][5] + currentBoard[0][8] === "OOO"
    ) {
      return true;
    }

    // Check Diagonals
    if (
      currentBoard[0][0] + currentBoard[0][4] + currentBoard[0][8] === "XXX" ||
      currentBoard[0][0] + currentBoard[0][4] + currentBoard[0][8] === "OOO"
    ) {
      return true;
    } else if (
      currentBoard[0][2] + currentBoard[0][4] + currentBoard[0][6] === "XXX" ||
      currentBoard[0][2] + currentBoard[0][4] + currentBoard[0][6] === "OOO"
    ) {
      return true;
    }
  };

  // Update game logic
  const updateBoard = (choice) => {
    if (playerTurn === 0) {
      if (!currentBoard[0][choice]) {
        currentBoard[0][choice] = "X";
        updateHeader();
        playerTurn = 1;
      }
    } else {
      if (!currentBoard[0][choice]) {
        currentBoard[0][choice] = "O";
        updateHeader();
        playerTurn = 0;
      }
    }
  };

  // Update Turn Header and checks Win Condition for Win Window
  const updateHeader = () => {
    // Get Elements
    let playerHeader = document.getElementById("player-turn");
    let winWindow = document.getElementById("game-win");
    let winner = document.getElementById("winner");
    let gameCells = document.getElementsByClassName("game-cell");

    // If winner, show win window. If no winner, change players
    if (checkWin()) {
      if (playerTurn === 0) {
        winner.textContent = "Player 1 Wins";
        winWindow.classList.remove("hidden");
        for (let i = 0; i < gameCells.length; i++) {
          gameCells[i].style.pointerEvents = "none";
        }
      } else {
        winner.textContent = "Player 2 WINS";
        winWindow.classList.remove("hidden");
        for (let i = 0; i < gameCells.length; i++) {
          gameCells[i].style.pointerEvents = "none";
        }
      }
    } else {
      playerTurn === 0
        ? (playerHeader.textContent = "Player 1")
        : (playerHeader.textContent = "Player 2");
    }
  };

  // Defining Grid Cells and Adding Event Listeners
  gridCells = [];

  for (let i = 0; i < 9; i++) {
    gridCells[i] = document.getElementById(i);
  }

  gridCells.forEach((cell) => {
    cell.addEventListener("click", () => {
      if (cell.textContent === "") {
        updateBoard(cell.getAttribute("id"));
        playerTurn === 0 ? (cell.textContent = "O") : (cell.textContent = "X");
      }
    });
  });
})();
