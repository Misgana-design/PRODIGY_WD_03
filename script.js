const cells = document.querySelectorAll(".cell");
let currentPlayer = "X";
let gameActive = true;
var resetButton = document.getElementById("reset-button");
let originalBoard = ["", "", "", "", "", "", "", "", ""];
var winConditions = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal
  [2, 4, 6], // Diagonal
];
cells.forEach((cell) => {
  cell.addEventListener("click", cellClicked);
});
resetButton.addEventListener("click", resetBtn);

function cellClicked(event) {
  const clickedElement = event.target;
  const clickedElementIndex = clickedElement.id;
  if (originalBoard[clickedElementIndex] !== "" || !gameActive) {
    return;
  }
  originalBoard[clickedElementIndex] = currentPlayer;
  clickedElement.innerText = currentPlayer;
  clickedElement.classList.add(`${currentPlayer}`);
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  checkWinner();
}

function checkWinner() {
  let roundWon = false;
  for (i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cell1 = originalBoard[condition[0]];
    const cell2 = originalBoard[condition[1]];
    const cell3 = originalBoard[condition[2]];

    if (cell1 == "" || cell2 == "" || cell3 == "") {
      continue;
    }

    if (cell1 == cell2 && cell2 == cell3) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    alert(`${currentPlayer} won`);
    gameActive = false;
    return;
  }

  if (!originalBoard.includes("")) {
    alert("draw");
    gameActive = false;
  }
}

function resetBtn() {
  gameActive = true;
  originalBoard = ["", "", "", "", "", "", "", "", ""];
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.innerText = ""; // Clear the text content of each cell
    cell.classList.remove("X", "O");
  });
  currentPlayer = "X";
}
