// Player colors
// Player O: crimson, Player X: blue rgb(0, 89, 255)
let winsound = new Audio("audio/WIN sound effect no copyright.mp3");
let newGameSound = new Audio("audio/Video Game Start Sound Effect.mp3");
let player = "x";
let values = ["", "", "", "", "", "", "", "", ""];

let gameBoxes = document.querySelectorAll(".box");
let playerO = document.querySelector(".playerO");
let playerX = document.querySelector(".playerX");
let playerOwins = playerO.querySelector("p span");
let playerXwins = playerX.querySelector("p span");

// Display values in each box
function displayValues() {
  gameBoxes.forEach((box, index) => {
    box.innerHTML = values[index];
  });
}

// Add click event listeners to each game box
gameBoxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (values[index] !== "") {
      box.style.cursor = "not-allowed";
    } else {
      box.style.cursor = "pointer";
      values[index] = player;
      displayValues();
      if (player === "x") {
        box.classList.add("x");
      } else {
        box.classList.add("o");
      }
      changePlayer();
      checkForWinner();
      togglePlayerActive();
    }
  });
});

displayValues();

// Switch between players
function changePlayer() {
  player = player === "x" ? "o" : "x";
}

// Toggle active player highlight
function togglePlayerActive() {
  playerO.classList.remove("active");
  playerX.classList.remove("active");
  if (player === "x") {
    playerX.classList.add("active");
  } else {
    playerO.classList.add("active");
  }
}

togglePlayerActive();

// Check for a winner
function checkForWinner() {
  let winnerAlert = document.querySelector(".winnerALert");
  let winnerAlertWinner = winnerAlert.querySelector("h3 span");
  let winnerAlertButton = winnerAlert.querySelector("button");

  // Define winning patterns
  let winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Check each win pattern
  for (let pattern of winPatterns) {
    if (
      values[pattern[0]] === "x" &&
      values[pattern[1]] === "x" &&
      values[pattern[2]] === "x"
    ) {
      playerXwins.textContent++;
      winnerAlertWinner.innerHTML = "Player X";
      winnerAlert.classList.add("active");
      winsound.play();
      return;
    } else if (
      values[pattern[0]] === "o" &&
      values[pattern[1]] === "o" &&
      values[pattern[2]] === "o"
    ) {
      playerOwins.textContent++;
      winnerAlertWinner.innerHTML = "Player O";
      winnerAlert.classList.add("active");
      winsound.play();
      return;
    }
  }

  let isFull = values.every((value) => value !== "");
  if (isFull) {
    winnerAlertWinner.innerHTML = "Equality";
    winnerAlert.classList.add("active");
  }
  // Reset button functionality
  winnerAlertButton.addEventListener("click", () => {
    values = ["", "", "", "", "", "", "", "", ""];
    displayValues();
    player = "x";
    togglePlayerActive();
    winnerAlert.classList.remove("active");
    gameBoxes.forEach((box) => {
      box.classList.remove("x", "o"); // Reset box colors
      box.style.cursor = "pointer";
      newGameSound.play();
    });
  });
}
