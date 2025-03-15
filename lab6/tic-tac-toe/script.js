const X_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/x.png';
const O_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/circle.png';

// Game state
let gameMode = 'ai';
let totalRounds = 3;
let currentRound = 1;
let xScore = 0;
let oScore = 0;
let isGameActive = false;
let isSeriesActive = false;
let currentPlayer = 'x';

// Board state
let freeBoxes = [];
const takenBoxes = {};

// Initialize game
function initGame() {
  const boxes = document.querySelectorAll('#grid div');
  boxes.forEach(box => {
    box.innerHTML = '';
    box.style.pointerEvents = 'auto';
    box.removeEventListener('click', handleBoxClick); // ลบ Event Listener เก่าออก
    box.addEventListener('click', handleBoxClick);
  });

  freeBoxes = [...boxes];
  Object.keys(takenBoxes).forEach(key => delete takenBoxes[key]);
  isGameActive = true;
  
  updateScoreDisplay();
  document.querySelector('#results').innerHTML = currentRound > 1 ? 
    `<p>Round ${currentRound}/${totalRounds}</p>` : '';
    
  if(gameMode === 'friend') {
    document.querySelector('#results').innerHTML = 
      `<p>Player ${currentPlayer.toUpperCase()}'s turn</p>`;
  }
}

// Handle box click
function handleBoxClick(event) {
  if (!isGameActive || !isSeriesActive) return;

  const box = event.currentTarget;
  if (box.children.length > 0) return;

  placeSymbol(box, currentPlayer);

  if (gameMode === 'friend') {
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    document.querySelector('#results').innerHTML = 
      `<p>Player ${currentPlayer.toUpperCase()}'s turn</p>`;
  } else if (gameMode === 'ai' && !isGameOver()) {
    setTimeout(computerMove, 500);
  }

  checkRoundStatus();
}

// Computer move (ฉบับปรับปรุง)
function computerMove() {
  if (!isGameActive) return;

  // 1. หาช่องชนะทันที
  let winningMove = findWinningMove('o');
  // 2. ป้องกันผู้เล่นชนะ
  let blockingMove = findWinningMove('x');
  // 3. เลือกช่องสุ่ม
  let randomMove = freeBoxes[Math.floor(Math.random() * freeBoxes.length)];

  const chosenMove = winningMove || blockingMove || randomMove;
  placeSymbol(chosenMove, 'o');
  checkRoundStatus();
}

function findWinningMove(symbol) {
  for (const box of freeBoxes) {
    const index = parseInt(box.dataset.index);
    // สร้างสถานะจำลอง
    const tempTaken = {...takenBoxes, [index]: symbol};
    if(checkWin(tempTaken) === symbol) {
      return box;
    }
  }
  return null;
}

function checkWin(taken = takenBoxes) {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // แนวนอน
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // แนวตั้ง
    [0, 4, 8], [2, 4, 6] // แนวทแยง
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (taken[a] && taken[a] === taken[b] && taken[b] === taken[c]) {
      return taken[a];
    }
  }
  return null;
}

// Place symbol
function placeSymbol(box, symbol) {
  const img = document.createElement('img');
  img.src = symbol === 'x' ? X_IMAGE_URL : O_IMAGE_URL;
  box.appendChild(img);

  const index = parseInt(box.dataset.index);
  takenBoxes[index] = symbol;
  freeBoxes = freeBoxes.filter(b => b !== box);
}

// Check game status
function checkRoundStatus() {
  const winner = checkWin();
  
  if (winner) {
    isGameActive = false;
    winner === 'x' ? xScore++ : oScore++;
    updateScoreDisplay();

    if (currentRound >= totalRounds) {
      endSeries();
    } else {
      currentRound++;
      setTimeout(initGame, 1500);
    }
  } else if (freeBoxes.length === 0) {
    setTimeout(initGame, 1500);
  }
}

function isGameOver() {
  return freeBoxes.length === 0 || checkWin() !== null;
}

// End of series
function endSeries() {
  isSeriesActive = false;
  const resultText = 
    xScore > oScore ? 'You win the series!' :
    oScore > xScore ? 'Computer wins the series! ' : 
    'Series tied!';
  
  document.querySelector('#results').innerHTML = `<h1>${resultText}</h1>`;
  document.querySelector('#restart').style.display = 'block';
}

// Update score display
function updateScoreDisplay() {
  document.querySelector('.x-score').textContent = `X: ${xScore}`;
  document.querySelector('.o-score').textContent = `O: ${oScore}`;
  document.querySelector('#rounds-display').textContent = 
    `Round ${currentRound}/${totalRounds}`;
}

// Event listeners
document.querySelectorAll('[data-mode]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    gameMode = e.target.dataset.mode;
    startNewSeries();
  });
});

document.getElementById('rounds').addEventListener('change', (e) => {
  totalRounds = parseInt(e.target.value);
  startNewSeries();
});

document.getElementById('restart').addEventListener('click', startNewSeries);

function startNewSeries() {
  xScore = 0;
  oScore = 0;
  currentRound = 1;
  currentPlayer = 'x';
  isSeriesActive = true;
  initGame();
}

// เริ่มเกมครั้งแรก
startNewSeries();