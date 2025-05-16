const board = document.getElementById('board');
const message = document.getElementById('message');
let currentPlayer = 'X';
let cells = Array(9).fill(null);
let gameActive = true;
let cellElements = [];

// Load sounds
const clickSound = new Audio('click.mp3');
const winSound = new Audio('win.mp3');
const drawSound = new Audio('draw.mp3');

function createBoard() {
  board.innerHTML = '';
  cellElements = [];

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className =
      'w-24 h-24 bg-white border-2 border-indigo-300 flex items-center justify-center text-4xl font-extrabold text-indigo-700 rounded-xl shadow-md hover:bg-indigo-100 transition cursor-pointer cell-animate';
    cell.dataset.index = i;
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
    cellElements.push(cell);
  }
}

function handleClick(e) {
  const index = e.target.dataset.index;

  if (!gameActive || cells[index]) return;

  clickSound.play();
  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    message.textContent = `${currentPlayer} menang! 🎉`;
    winSound.play();
    gameActive = false;
    highlightWinner();
    return;
  }

  if (cells.every(cell => cell)) {
    message.textContent = "Seri! 🤝";
    drawSound.play();
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  message.textContent = `Giliran ${currentPlayer}`;
}

function checkWinner() {
  const winCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  return winCombos.some(combo => {
    const [a, b, c] = combo;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      combo.forEach(i => {
        cellElements[i].classList.add('win-glow');
        cellElements[i].style.transform = 'scale(1.2)';
        setTimeout(() => {
          cellElements[i].style.transform = 'scale(1)';
        }, 300);
      });
      return true;
    }
    return false;
  });
}

function restartGame() {
  currentPlayer = 'X';
  cells = Array(9).fill(null);
  gameActive = true;
  message.textContent = `Giliran ${currentPlayer}`;
  createBoard();
}

restartGame();
