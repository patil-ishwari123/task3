const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');

const X_CLASS = 'x';
const O_CLASS = 'o';
let oTurn = false;

const WINNING_COMBINATIONS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
  oTurn = false;
  message.textContent = '';
  cells.forEach(cell => {
    cell.classList.remove(X_CLASS, O_CLASS);
    cell.textContent = '';
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = oTurn ? O_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    oTurn = !oTurn;
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.textContent = currentClass.toUpperCase(); // Actually write "X" or "O" inside
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

function endGame(draw) {
  if (draw) {
    message.textContent = "It's a Draw!";
  } else {
    message.textContent = `${oTurn ? "O" : "X"} Wins!`;
  }
}

