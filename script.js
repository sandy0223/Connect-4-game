const ROWS = 6;
const COLS = 7;
let currentPlayer = 'red';
let gameBoard = createEmptyBoard();
let gameWon = false;

function createEmptyBoard() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}

function createBoardHTML() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell', 'empty');
            cellElement.dataset.row = row;
            cellElement.dataset.col = col;
            cellElement.addEventListener('click', () => handleCellClick(col));
            boardElement.appendChild(cellElement);
        }
    }
}

function updateBoardHTML() {
    const boardElement = document.getElementById('board');

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cellElement = boardElement.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            cellElement.className = `cell ${gameBoard[row][col] || 'empty'}`;
        }
    }
}

function handleCellClick(col) {
    if (gameWon) {
        return;
    }

    const row = findAvailableRow(col);

    if (row !== -1) {
        gameBoard[row][col] = currentPlayer;
        updateBoardHTML();

        if (checkWin(row, col)) {
            gameWon = true;
            announceWinner(currentPlayer);
        } else {
            currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
        }
    }
}

function findAvailableRow(col) {
    for (let row = ROWS - 1; row >= 0; row--) {
        if (!gameBoard[row][col]) {
            return row;
        }
    }
    return -1;
}

function checkWin(row, col) {
    const directions = [
        [0, 1],
        [1, 0],
        [1, 1],
        [-1, 1],
    ];

    for (const [dx, dy] of directions) {
        if (countConsecutive(row, col, dx, dy) >= 4) {
            return true;
        }
    }

    return false;
}

function countConsecutive(row, col, dx, dy) {
    const color = gameBoard[row][col];
    let count = 1;

    for (let i = 1; i < 4; i++) {
        const newRow = row + i * dx;
        const newCol = col + i * dy;

        if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS && gameBoard[newRow][newCol] === color) {
            count++;
        } else {
            break;
        }
    }

    return count;
}

function announceWinner(winner) {
    alert(`${winner.toUpperCase()} wins!`);
}

function resetGame() {
    gameBoard = createEmptyBoard();
    currentPlayer = 'red';
    gameWon = false;
    updateBoardHTML();
}

createBoardHTML();
updateBoardHTML();


function announceWinner(winner) {
    const winnerTextElement = document.getElementById('winner-text');
    winnerTextElement.textContent = `${winner.toUpperCase()} wins!`;

    const winnerPopup = document.getElementById('winner-popup');
    winnerPopup.style.display = 'block';
}

function closePopup() {
    const winnerPopup = document.getElementById('winner-popup');
    winnerPopup.style.display = 'none';
}
