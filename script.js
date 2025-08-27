const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
let currentPlayer = 'C';
let board = Array(9).fill('');
let gameActive = true;

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6]  // Diagonals
];

cells.forEach(cell => cell.addEventListener('click', cellClicked));

function cellClicked(e) {
  const index = e.target.dataset.index;

  if (board[index] !== '' || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    confetti();
    return;
  }
  
  function launchConfetti() {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });
}

  if (board.every(cell => cell !== '')) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'C' ? 'E' : 'C';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  return winConditions.some(condition => {
    const [a, b, c] = condition;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function restartGame() {
  board.fill('');
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'C';
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}
