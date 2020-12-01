// Select elements on the page
const canvas = document.querySelector("#etch");
const canvasBlur = document.querySelector("#etchBlur");
const screen = document.querySelector(".canvas-wrapper");
const ctx = canvas.getContext("2d");
const ctxBlur = canvasBlur.getContext("2d");
const shakeButton = document.querySelector(".shake-button");
const moveAmount = 8;
const moveMoreAmount = 16;
let hue = 0;
let timer;
const instructs = document.querySelector(".instructions");
let instructsHide = false;

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
  instructionsHider();
}

// arrow button draw
function arrowKeyDraw({ targetClass }) {
  console.log(targetClass);
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
  ctxBlur.lineTo(x, y);
  ctxBlur.stroke();
  instructionsHider();
}

// draw more function
function drawMore({ key }) {
  console.log("moar");
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
      y = y - moveMoreAmount;
      break;
    case "ArrowDown":
      y = y + moveMoreAmount;
      break;
    case "ArrowRight":
      x = x + moveMoreAmount;
      break;
    case "ArrowLeft":
      x = x - moveMoreAmount;
      break;
    default:
      break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
  ctxBlur.lineTo(x, y);
  ctxBlur.stroke();
  instructionsHider();
}

// arrow button draw more function
function arrowKeyDrawMore({ targetClass }) {
  console.log(targetClass);
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
  switch (targetClass) {
    case "upkey":
      y = y - moveMoreAmount;
      break;
    case "downkey":
      y = y + moveMoreAmount;
      break;
    case "rightkey":
      x = x + moveMoreAmount;
      break;
    case "leftkey":
      x = x - moveMoreAmount;
      break;
    default:
      console.log(targetClass);
      break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
  ctxBlur.lineTo(x, y);
  ctxBlur.stroke();
  instructionsHider();
}

// keypress handlers
function handleKey(e) {
  if (e.shiftKey && e.key.includes("Arrow")) {
    e.preventDefault();
    drawMore({ key: e.key });
  }
  if (e.key.includes("Arrow")) {
    e.preventDefault();
    draw({ key: e.key });
  }
  if (e.key.includes("c")) {
    clearCanvas();
  }
}

function arrowKeyDown(e) {
  console.log("arrowbuttdown");
  if (e.shiftKey) {
    //first draw function
    arrowKeyDrawMore({ targetClass: e.target.className });
    // loop drawing while button is pressed
    timer = setInterval(function () {
      arrowKeyDrawMore({ targetClass: e.target.className });
    }, 100); // to prevent looping
  } else {
    //first draw function
    arrowKeyDraw({ targetClass: e.target.className });
    // loop drawing while button is pressed
    timer = setInterval(function () {
      arrowKeyDraw({ targetClass: e.target.className });
    }, 100); // to prevent looping
  }
}

function arrowKeyUp() {
  console.log("arrowbuttup");
  // clearInterval(delay);
  clearInterval(timer);
}

// clear function
function clearCanvas() {
  screen.classList.add("shake");
  fadeCanvas();
  screen.addEventListener(
    "animationend",
    function () {
      screen.classList.remove("shake");
    },
    { once: true }
  );
}
function fadeCanvas() {
  ctx.clearRect(0, 0, width, height);
  ctxBlur.clearRect(0, 0, width, height);
}

// hide and show instructions
function instructionsHider() {
  console.log("instructionsHider");
  if (instructsHide == false) {
    instructs.classList.add("hide");
    instructsHide = true;
  } else {
    return;
  }
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
document.querySelector(".leftkey").addEventListener("mouseout", arrowKeyUp);
document.querySelector(".upkey").addEventListener("mouseout", arrowKeyUp);
document.querySelector(".downkey").addEventListener("mouseout", arrowKeyUp);
document.querySelector(".rightkey").addEventListener("mouseout", arrowKeyUp);
