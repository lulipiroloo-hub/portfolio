// Variables globales
let numSquares = 6;
let colors = [];
let pickedColor;
let attempts = 0;
let gameWon = false;

// Selectores del DOM
const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById("colorDisplay");
const messageDisplay = document.querySelector("#message");
const h1 = document.querySelector("h1");
const resetButton = document.querySelector("#reset");
const modeButtons = document.querySelectorAll(".mode");
const attemptsDisplay = document.getElementById("attempts");

// Inicia el juego
init();

function init() {
  setupModeButtons();
  setupSquares();
  reset();
}

// Configura los botones Easy, Hard y Experto
function setupModeButtons() {
  for (let i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function () {
      for (let j = 0; j < modeButtons.length; j++) {
        modeButtons[j].classList.remove("selected");
      }
      this.classList.add("selected");

      if (this.textContent === "Easy") {
        numSquares = 3;
      } else if (this.textContent === "Hard") {
        numSquares = 6;
      } else {
        numSquares = 9;
      }
      reset();
    });
  }
}

// Configura los eventos de clic en cada cuadrado
function setupSquares() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", function () {
      const clickedColor = this.style.backgroundColor;

      // Evita sumar intentos si ya ganó o si hace clic en un cuadrado ya eliminado
      if (gameWon || clickedColor === "rgb(24, 25, 28)") return;

      attempts++;
      attemptsDisplay.textContent = attempts;

      if (clickedColor === pickedColor) {
        gameWon = true;
        messageDisplay.textContent = "¡Acertaste!";
        resetButton.textContent = "Jugar de nuevo";
        changeColors(clickedColor);
        h1.style.backgroundColor = clickedColor;
      } else {
        this.style.backgroundColor = "#18191c";
        this.style.boxShadow = "none";
        messageDisplay.textContent = "Probá otro";
      }
    });
  }
}

// Reinicia el tablero según el modo seleccionado
function reset() {
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  attempts = 0;
  gameWon = false;

  attemptsDisplay.textContent = attempts;
  colorDisplay.textContent = pickedColor;
  resetButton.textContent = "Nuevos Colores";
  messageDisplay.textContent = "";
  h1.style.backgroundColor = "#4a4e69";

  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
      squares[i].style.boxShadow = "0 6px 14px rgba(0, 0, 0, 0.4)";
    } else {
      squares[i].style.display = "none";
    }
  }
}

// Evento del botón reiniciar / nuevos colores
resetButton.addEventListener("click", function () {
  reset();
});

// Cambia todos los cuadrados al color ganador
function changeColors(color) {
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
    squares[i].style.boxShadow = "0 6px 14px rgba(0, 0, 0, 0.4)";
  }
}

// Elige un color aleatorio dentro del arreglo colors
function pickColor() {
  const random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

// Genera un arreglo de N colores aleatorios
function generateRandomColors(num) {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

// Genera un string "rgb(r, g, b)" aleatorio
function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}