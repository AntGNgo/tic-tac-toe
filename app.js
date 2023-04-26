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
        updateHeader()
    }

    // Check for Winner
    const checkWin = () => {
        // Check Rows
        if (currentBoard[0][0] + currentBoard[0][1] + currentBoard[0][2] === 'XXX' || currentBoard[0][0] + currentBoard[0][1] + currentBoard[0][2] === 'OOO' || currentBoard[0][3] + currentBoard[0][4] + currentBoard[0][5] === 'XXX' || currentBoard[0][3] + currentBoard[0][4] + currentBoard[0][5] === 'OOO' || currentBoard[0][6] + currentBoard[0][7] + currentBoard[0][8] === 'XXX' || currentBoard[0][6] + currentBoard[0][7] + currentBoard[0][8] === 'OOO') {
            gridCells.forEach(cell => {
                console.log('removing')
                cell.removeEventListener('click', event)
            });
            return true
        }
        
        // Check Columns
        if (currentBoard[0][0] + currentBoard[0][3] + currentBoard[0][6] === 'XXX' || currentBoard[0][0] + currentBoard[0][3] + currentBoard[0][6] === 'OOO') {
            return true
        } else if (currentBoard[0][1] + currentBoard[0][4] + currentBoard[0][7] === 'XXX' || currentBoard[0][1] + currentBoard[0][4] + currentBoard[0][7] === 'OOO') {
            return true
        } else if (currentBoard[0][2] + currentBoard[0][5] + currentBoard[0][8] === 'XXX' || currentBoard[0][2] + currentBoard[0][5] + currentBoard[0][8] === 'OOO') {
            return true
        }

        // Check Diagonals
        if (currentBoard[0][0] + currentBoard[0][4] + currentBoard[0][8] === 'XXX' || currentBoard[0][0] + currentBoard[0][4] + currentBoard[0][8] === 'OOO') {
            return true
        } else if (currentBoard[0][2] + currentBoard[0][4] + currentBoard[0][6] === 'XXX' || currentBoard[0][2] + currentBoard[0][4] + currentBoard[0][6] === 'OOO') {
            return true
        }
    }

    // Update game logic
    const updateBoard = (choice) => {
        if (playerTurn === 0) {
            if(!currentBoard[0][choice]) {
                currentBoard[0][choice] = "X"
                updateHeader()
                playerTurn = 1
            }
        } else {
            if(!currentBoard[0][choice]) {
                currentBoard[0][choice] = "O"
                updateHeader()
                playerTurn = 0
            }
        }
    }

    // Update DOM
    const updateHeader = () => {
        let playerHeader = document.getElementById('player-turn')
        if(checkWin()) {
            playerTurn === 0 ? playerHeader.textContent = "Player 1 Wins" : playerHeader.textContent = "Player 2 Wins"
        } else {
            playerTurn === 0 ? playerHeader.textContent = "Player 1" : playerHeader.textContent = "Player 2"
        }
    }

    gridCells = []

    for(let i=0; i < 9; i++) {
        gridCells[i] = document.getElementById(i)
    }

    gridCells.forEach(cell => {
        cell.addEventListener('click', () => {
        if(cell.textContent === "") {
            updateBoard(cell.getAttribute('id'))
            playerTurn === 0 ? cell.textContent = "O" : cell.textContent = "X"
        }
        })
    });

    const newGame = document.getElementById('new-game')
    newGame.addEventListener('click', () => {
        resetGame()
        gridCells.forEach(cell => {
            cell.textContent = ""
        })
    })
    return {currentBoard}
})()