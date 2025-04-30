let score1 = 0,
  score2 = 0,
  poin1 = 0,
  poin2 = 0;
let maxPoint = 2;
let scoreLimit = 11;
let cumulative = "";

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

let currentServer = "";     // Siapa yang serve saat ini
let serveCount = 0;         // Sudah berapa kali serve dilakukan oleh currentServer (max 2)

function updateTable() {
  let html = "";
  for (let phaseKey in scoreBoard) {
    const phase = scoreBoard[phaseKey];
    html += `
      <tr>
        <td>${phase.player1}</td>
        <td>${phase.player2}</td>
        <td>${phase.scoreGame}</td>
        <td>${phase.scoreSet}</td>
        <td>${phase.status}</td>
      </tr>`;
  }
  row.innerHTML = html;
}

function whoPlayFirst(p1, p2) {
  const nama = prompt(`Siapa yang main duluan? (${p1} atau ${p2})`);
  currentServer = nama;
  serveCount = 0;
  updateServeButtons();
  return nama;
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

function updateServeButtons() {
  if (currentServer === player1Input.value) {
    leftBtn.disabled = false;
    rightBtn.disabled = true;
  } else {
    leftBtn.disabled = true;
    rightBtn.disabled = false;
  }
}

function switchServer() {
  currentServer = currentServer === player1Input.value ? player2Input.value : player1Input.value;
  serveCount = 0;
  updateServeButtons();
}

function checkWin(array) {
  if (array[2] === maxPoint || array[3] === maxPoint) {
    const winText =
      array[2] === maxPoint
        ? `🏆 ${player1Input.value || "Player 1"} Wins the Match!`
        : `🏆 ${player2Input.value || "Player 2"} Wins the Match!`;

    winStatus.textContent = winText;

    const phaseNumber = Object.keys(scoreBoard).length + 1;
    const phaseKey = `phase${phaseNumber}`;

    scoreBoard[phaseKey] = {
      player1: array[0],
      player2: array[1],
      scoreGame: `${array[2]} - ${array[3]}`,
      scoreSet: array[4],
      status: winText,
    };

    updateTable();
    disableButtons();
  }
}

function processScore(isLeft) {
  if (poin1 >= maxPoint || poin2 >= maxPoint) return;

  if (isLeft) score1++;
  else score2++;

  if (score1 >= 10 && score2 >= 10 && score1 === score2) {
    scoreLimit++;
  }

  if (score1 === scoreLimit || score2 === scoreLimit) {
    const scoreSet = `${score1} - ${score2}`;
    cumulative += cumulative ? `, ${scoreSet}` : scoreSet;

    if (score1 === scoreLimit) poin1++;
    else poin2++;

    const data = [player1Input.value, player2Input.value, poin1, poin2, cumulative];
    checkWin(data);

    score1 = 0;
    score2 = 0;
    scoreLimit = 11;

    // Minta input siapa yang serve duluan lagi
    whoPlayFirst(player1Input.value, player2Input.value);
  } else {
    serveCount++;
    if (serveCount === 2) {
      switchServer();
    }
  }

  updateDisplay();
}

leftBtn.addEventListener("click", () => processScore(true));
rightBtn.addEventListener("click", () => processScore(false));

startBtn.addEventListener("click", () => {
  const bestOf = parseInt(gameInput.value);
  const player1Name = player1Input.value;
  const player2Name = player2Input.value;

  if (!player1Name || !player2Name) {
    alert("Masukkan nama dengan benar");
    return;
  }

  if (isNaN(bestOf)) {
    alert("Masukkan angka terlebih dahulu!");
    return;
  }

  if (bestOf % 2 === 0) {
    alert("Jumlah game harus ganjil (contoh: 1, 3, 5)");
    return;
  }

  maxPoint = Math.ceil(bestOf / 2);
  disableInputs();
  startBtn.disabled = true;

  player1.textContent = player1Name + " (Player 1)";
  player2.textContent = player2Name + " (Player 2)";
  winStatus.textContent = "";

  whoPlayFirst(player1Name, player2Name);
});

restartBtn.addEventListener("click", () => {
  score1 = 0;
  score2 = 0;
  poin1 = 0;
  poin2 = 0;
  cumulative = "";

  player1.textContent = "Player 1";
  player2.textContent = "Player 2";
  winStatus.textContent = "";

  updateDisplay();
  enableInputs();

  startBtn.disabled = false;
  player1Input.value = "";
  player2Input.value = "";
  gameInput.value = "";

  disableButtons();
});
