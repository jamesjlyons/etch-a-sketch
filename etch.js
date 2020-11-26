// Select elements on the page
const canvas = document.querySelector("#etch");
const canvasBlur = document.querySelector("#etchBlur");
const ctx = canvas.getContext("2d");
const ctxBlur = canvasBlur.getContext("2d");
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

ctxBlur.lineJoin = "square";
ctxBlur.lineCap = "square";
ctxBlur.lineWidth = moveAmount;
// ctxBlur.strokeStyle = "hsla(165, 82%, 52%, 1)";
// ctxBlur.shadowColor = "hsla(165, 82%, 52%, 0.8)";
ctxBlur.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctxBlur.shadowColor = `hsla(${hue}, 100%, 55%, 0.8)`;
ctxBlur.shadowBlur = 16;

ctxBlur.beginPath(); // start drawing
ctxBlur.moveTo(x, y);
ctxBlur.lineTo(x, y);
ctxBlur.stroke();

// draw function
function draw({ key }) {
  console.log(key);
  hue += 4;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.shadowColor = `hsla(${hue}, 100%, 55%, 0.8)`;
  ctxBlur.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctxBlur.shadowColor = `hsla(${hue}, 100%, 55%, 0.8)`;
  // start path
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctxBlur.beginPath();
  ctxBlur.moveTo(x, y);
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
  ctxBlur.lineTo(x, y);
  ctxBlur.stroke();
}

// arrow button draw
function arrowKeyDraw({ targetClass }) {
  console.log(targetClass);
  hue += 4;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.shadowColor = `hsla(${hue}, 100%, 55%, 0.8)`;
  // start path
  ctx.beginPath();
  ctx.moveTo(x, y);
  // move x and y based on input
  switch (targetClass) {
    case "upkey":
      y = y - moveAmount;
      break;
    case "downkey":
      y = y + moveAmount;
      break;
    case "rightkey":
      x = x + moveAmount;
      break;
    case "leftkey":
      x = x - moveAmount;
      break;
    default:
      console.log(targetClass);
      break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}

// TODO: enable shift modifier to draw longer strokes
// function drawMore({ key }) {
//   console.log(key);
//   // start path
//   ctx.beginPath();
//   ctx.moveTo(x, y);
//   // move x and y based on input
//   switch (key) {
//     case "ArrowUp":
//       y = y - 24;
//       break;
//     case "ArrowDown":
//       y = y + 24;
//       break;
//     case "ArrowRight":
//       x = x + 24;
//       break;
//     case "ArrowLeft":
//       x = x - 24;
//       break;
//     default:
//       break;
//   }
//   ctx.lineTo(x, y);
//   ctx.stroke();
// }

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

var timer;

// TODO: set delay for mousedown drawing vs click drawing

// arrow button handler
function arrowKeyDown(e) {
  console.log("arrowbuttdown");
  //first draw function
  arrowKeyDraw({ targetClass: e.target.className });
  // loop drawing while button is pressed
  timer = setInterval(function () {
    arrowKeyDraw({ targetClass: e.target.className });
  }, 100); // to prevent looping
}

function arrowKeyUp(e) {
  console.log("arrowbuttup");
  // clearInterval(delay);
  clearInterval(timer);
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
document.querySelector(".leftkey").addEventListener("mousedown", arrowKeyDown);
document.querySelector(".upkey").addEventListener("mousedown", arrowKeyDown);
document.querySelector(".downkey").addEventListener("mousedown", arrowKeyDown);
document.querySelector(".rightkey").addEventListener("mousedown", arrowKeyDown);
document.querySelector(".leftkey").addEventListener("mouseup", arrowKeyUp);
document.querySelector(".upkey").addEventListener("mouseup", arrowKeyUp);
document.querySelector(".downkey").addEventListener("mouseup", arrowKeyUp);
document.querySelector(".rightkey").addEventListener("mouseup", arrowKeyUp);
