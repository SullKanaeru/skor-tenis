let score1 = 0,
  score2 = 0,
  poin1 = 0,
  poin2 = 0;
let maxPoint = 2;
let scoreLimit = 11;

const player1 = document.querySelector(".p1");
const player2 = document.querySelector(".p2");
const player1Input = document.querySelector(".player1Input");
const player2Input = document.querySelector(".player2Input");

const leftBtn = document.querySelector(".left-button");
const rightBtn = document.querySelector(".right-button");
const winStatus = document.querySelector(".win-status");
const gameInput = document.querySelector(".gameInput");
const startBtn = document.querySelector(".startGame");
const restartBtn = document.querySelector(".restartBtn");

const leftSkorEl = document.querySelector(".left-skor-value");
const rightSkorEl = document.querySelector(".right-skor-value");
const leftPoinEl = document.querySelector(".left-poin-value");
const rightPoinEl = document.querySelector(".right-poin-value");

let scoreBoard = {};

let row = document.querySelector(".row");

updateTable();

function updateTable() {
  let html = "";
  for (let phaseKey in scoreBoard) {
    const phase = scoreBoard[phaseKey];
    html += `
      <tr>
        <td>${phase.player1}</td>
        <td>${phase.player2}</td>
        <td>${phase.score}</td>
        <td>${phase.status}</td>
      </tr>`;
  }

  row.innerHTML = html;
}

function updateDisplay() {
  leftSkorEl.textContent = score1;
  rightSkorEl.textContent = score2;
  leftPoinEl.textContent = poin1;
  rightPoinEl.textContent = poin2;
}

function disableInputs() {
  player1Input.disabled = true;
  player2Input.disabled = true;
  gameInput.disabled = true;
}

function enableInputs() {
  player1Input.disabled = false;
  player2Input.disabled = false;
  gameInput.disabled = false;
}

function disableButtons() {
  leftBtn.disabled = true;
  rightBtn.disabled = true;
}

function enableButtons() {
  leftBtn.disabled = false;
  rightBtn.disabled = false;
}

function checkWin(array) {
  console.log(maxPoint);

  if (poin1 === maxPoint || poin2 === maxPoint) {
    winText =
      poin1 === maxPoint
        ? `🏆 ${player1Input.value || "Player 1"} Wins the Match!`
        : `🏆 ${player2Input.value || "Player 2"} Wins the Match!`;

    winStatus.textContent = winText;

    disableButtons();

    const phaseNumber = Object.keys(scoreBoard).length + 1;
    const phaseKey = `phase${phaseNumber}`;

    scoreBoard[phaseKey] = {
      player1: array[0],
      player2: array[1],
      score: `${array[2]} - ${array[3]}`,
      status: winText,
    };

    updateTable();
  }
}

leftBtn.addEventListener("click", () => {
  if (poin1 < maxPoint && poin2 < maxPoint) {
    score1++;
    console.log("score1 " + score1);
    console.log("score2 " + score2);
    console.log("scoreLimit " + scoreLimit);
    if (score1 >= 10 && score2 >= 10) {
      if (score1 == score2) {
        scoreLimit++;
        console.log("scoreLimit " + scoreLimit);
      }
    }

    if (score1 == scoreLimit) {
      poin1++;
      score1 = 0;
      score2 = 0;
      scoreLimit = 11;
    }

    let array = [player1Input.value, player2Input.value, poin1, poin2];
    updateDisplay();
    checkWin(array);
  }
});

rightBtn.addEventListener("click", () => {
  if (poin1 < maxPoint && poin2 < maxPoint) {
    score2++;
    console.log("score1 " + score1);
    console.log("score2 " + score2);
    console.log("scoreLimit " + scoreLimit);
    if (score1 >= 10 && score2 >= 10) {
      if (score1 == score2) {
        scoreLimit++;
        console.log("scoreLimit " + scoreLimit);
      }
    }

    if (score2 == scoreLimit) {
      poin2++;
      score1 = 0;
      score2 = 0;
      scoreLimit = 11;
    }

    let array = [player1Input.value, player2Input.value, poin1, poin2];

    updateDisplay();
    checkWin(array);
  }
});

startBtn.addEventListener("click", () => {
  console.log(player1Input.value);
  const gameOf = parseInt(gameInput.value);
  if (isNaN(gameOf)) {
    alert("Masukkan angka terlebih dahulu!");
    return;
  }
  if (gameOf % 2 === 0) {
    alert("Jumlah game harus ganjil (contoh: 1, 3, 5, dst)");
    return;
  }
  maxPoint = Math.ceil(gameOf / 2);
  enableButtons();
  player1.textContent = player1Input.value + " (Player 1)";
  player2.textContent = player2Input.value + " (Player 2)";
  winStatus.textContent = "";
  disableInputs();
  startBtn.disabled = true;
});

restartBtn.addEventListener("click", () => {
  score1 = 0;
  score2 = 0;
  poin1 = 0;
  poin2 = 0;
  player1.innerHTML = "Player 1";
  player2.innerHTML = "Player 2";
  updateDisplay();
  enableButtons();
  winStatus.textContent = "";
  enableInputs();
  startBtn.disabled = false;
  player1Input.value = "";
  player2Input.value = "";
  gameInput.value = "";
});
