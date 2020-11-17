// Select elements on the page
const canvas = document.querySelector("#etch");
const ctx = canvas.getContext("2d");
const shakeButton = document.querySelector(".shake-button");
const moveAmount = 8;
let hue = 0;

// setup canvas
// const width = canvas.width;
// const height = canvas.height;
const { width, height } = canvas; // same as above, just destructured
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = "square";
ctx.lineCap = "square";
ctx.lineWidth = moveAmount;
// ctx.strokeStyle = "hsla(165, 82%, 52%, 1)";
// ctx.shadowColor = "hsla(165, 82%, 52%, 0.8)";
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctx.shadowColor = `hsla(${hue}, 100%, 55%, 0.8)`;
ctx.shadowBlur = 16;

ctx.beginPath(); // start drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// draw function
function draw({ key }) {
  console.log(key);
  hue += 4;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.shadowColor = `hsla(${hue}, 100%, 55%, 0.8)`;
  // start path
  ctx.beginPath();
  ctx.moveTo(x, y);
  // move x and y based on input
  switch (key) {
    case "ArrowUp":
      y = y - moveAmount;
      break;
    case "ArrowDown":
      y = y + moveAmount;
      break;
    case "ArrowRight":
      x = x + moveAmount;
      break;
    case "ArrowLeft":
      x = x - moveAmount;
      break;
    default:
      break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}

function drawMore({ key }) {
  console.log(key);
  // start path
  ctx.beginPath();
  ctx.moveTo(x, y);
  // move x and y based on input
  switch (key) {
    case "ArrowUp":
      y = y - 24;
      break;
    case "ArrowDown":
      y = y + 24;
      break;
    case "ArrowRight":
      x = x + 24;
      break;
    case "ArrowLeft":
      x = x - 24;
      break;
    default:
      break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}

// keypress handlers
function handleKey(e) {
  if (e.key.includes("Arrow")) {
    e.preventDefault();
    draw({ key: e.key });
  } else if (e.ShiftKey && e.key.includes("Arrow")) {
    e.preventDefault();
    drawMore({ key: e.key });
  }
}

// clear function
function clearCanvas() {
  canvas.classList.add("shake");
  fadeCanvas();
  canvas.addEventListener(
    "animationend",
    function () {
      canvas.classList.remove("shake");
    },
    { once: true }
  );
}
function fadeCanvas() {
  ctx.clearRect(0, 0, width, height);
}

// arrow key listener
window.addEventListener("keydown", handleKey);

// shakeButton listener
shakeButton.addEventListener("click", clearCanvas);

// arrow button listeners
document.querySelector(".leftkey").addEventListener("click", arrowKeyHandler);
document.querySelector(".upkey").addEventListener("click", arrowKeyHandler);
document.querySelector(".downkey").addEventListener("click", arrowKeyHandler);
document.querySelector(".rightkey").addEventListener("click", arrowKeyHandler);
