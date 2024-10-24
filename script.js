const synth = new Tone.Synth().toDestination();
let sequence = [];
let playerSequence = [];
let currentLevel = 1;

const buttons = document.querySelectorAll(".game-button");
const levelDisplay = document.getElementById("level");
const progressBar = document.getElementById("progress-bar");

document.getElementById("startGame").addEventListener("click", startGame);
document.getElementById("startButton").addEventListener("click", showGameScreen);

function showGameScreen() {
  document.querySelector('.welcome-screen').style.display = 'none';
  document.querySelector('.game-container').style.display = 'block';
}

function startGame() {
  sequence = [];
  playerSequence = [];
  currentLevel = 1;
  levelDisplay.textContent = currentLevel;
  updateProgressBar(0);
  document.getElementById("instructions").textContent = "Escucha y sigue el ritmo.";
  nextLevel();
}

function nextLevel() {
  playerSequence = [];
  const randomNote = Math.floor(Math.random() * 4);
  sequence.push(randomNote);
  playSequence();
  updateProgressBar((sequence.length / 10) * 100); 
}

function playSequence() {
  let delay = 0;
  sequence.forEach((note, index) => {
    setTimeout(() => {
      playSound(note);
      highlightButton(note);
    }, delay);
    delay += 600;
  });
}

function playSound(note) {
  const tones = ["C4", "D4", "E4", "F4"];
  synth.triggerAttackRelease(tones[note], "8n");
}

function highlightButton(note) {
  buttons[note].classList.add("active");
  setTimeout(() => {
    buttons[note].classList.remove("active");
  }, 400);
}

buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    playSound(index);
    playerSequence.push(index);
    checkPlayerSequence();
  });
});

function checkPlayerSequence() {
  const currentMove = playerSequence.length - 1;
  if (playerSequence[currentMove] !== sequence[currentMove]) {
    document.getElementById("instructions").textContent = "Incorrecto. Intenta de nuevo.";
    return;
  }

  if (playerSequence.length === sequence.length) {
    document.getElementById("instructions").textContent = "¡Correcto! Siguiente nivel...";
    setTimeout(() => {
      currentLevel++;
      levelDisplay.textContent = currentLevel;
      nextLevel();
    }, 1000);
  }
}

function updateProgressBar(percent) {
  progressBar.style.width = percent + "%";
}
