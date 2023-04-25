const gameBoard = (() => {
    let newBoard = [
        [], [], [],
        [], [], [],
        [], [], []
    ]

    let currentBoard = [
        [], [], [],
        [], [], [],
        [], [], []
    ]

    // Which players turn
    let playerTurn = 0

    // New Game
    const resetGame = () => {
        currentBoard = newBoard.slice();
    }

    // Check for Winner
    const checkWin = (currentBoard) => {
        // check rows
        if (currentBoard[0,0] === currentBoard[0,1] && currentBoard[0,0] === currentBoard[0,2]) {
            return true
        } else if (currentBoard[0,3] === currentBoard[0,4] && currentBoard[0,3] === currentBoard[0,5]) {
            return true
        } else if (currentBoard[0,6] === currentBoard[0,7] && currentBoard[0,6] === currentBoard[0,8])
    }

    // Update game logic
    const updateBoard = (choice) => {
        if (playerTurn === 0) {
            if(currentBoard[0, choice].length === 0) {
                updateHeader()
                currentBoard[0, choice] = "X"
                checkWin(playerTurn)
                playerTurn = 1
            }
        } else {
            if(currentBoard[0, choice].length === 0) {
                updateHeader()
                currentBoard[0, choice] = "O"
                checkWin(playerTurn)
                playerTurn = 0
            }
        }
    }

    // Update DOM
    const updateHeader = () => {
        let playerHeader = document.getElementById('player-turn')
        playerTurn === 1 ? playerHeader.textContent = "Player 1" : playerHeader.textContent = "Player 2"
    }

    gridCells = []

    for(let i=0; i < 9; i++) {
        gridCells[i] = document.getElementById(i)
    }

    gridCells.forEach(cell => {
        cell.addEventListener('click', () => {
            if(cell.textContent === "") {
                console.log(cell.getAttribute('id'))
                updateBoard(cell.getAttribute('id'))
                playerTurn === 0 ? cell.textContent = "O" : cell.textContent = "X"
            }
        }) 
    });

})()