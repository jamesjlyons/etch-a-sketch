// Select elements on the page
const canvas = document.querySelector("#etch");
const canvasBlur = document.querySelector("#etchBlur");
const screen = document.querySelector(".canvas-wrapper");
const ctx = canvas.getContext("2d");
const ctxBlur = canvasBlur.getContext("2d");
const bothCtx = [ctx, ctxBlur];
const shakeButton = document.querySelector(".shake-button");
let moveAmount = 8;
let hue = 0;
let timer;
const instructs = document.querySelector(".instructions");
let instructsHide = false;
const modalInner = document.querySelector(".modal-inner");
const modalOuter = document.querySelector(".modal-outer");
const modalCloseButton = document.querySelector(".modal-close");
const questionButton = document.querySelector(".info");

// setup canvas
// const width = canvas.width;
// const height = canvas.height;
const { width, height } = canvas; // same as above, just destructured
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

bothCtx.forEach((el) => {
  // define line styles
  el.lineJoin = "square";
  el.lineCap = "square";
  el.lineWidth = moveAmount;
  el.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  el.shadowColor = `hsla(${hue}, 100%, 55%, 0.8)`;
  el.shadowBlur = 16;

  el.beginPath(); // start drawing
  el.moveTo(x, y);
  el.lineTo(x, y);
  el.stroke();
});

// draw function
function draw({ key }) {
  console.log(key);
  hue += 4;
  bothCtx.forEach((el) => {
    el.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    el.shadowColor = `hsla(${hue}, 100%, 55%, 0.8)`;
    // start path
    el.beginPath();
    el.moveTo(x, y);
  });

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
  bothCtx.forEach((el) => {
    el.lineTo(x, y);
    el.stroke();
  });
  instructionsHider();
}

// arrow button draw
function arrowKeyDraw({ targetClass }) {
  console.log(targetClass);
  hue += 4;
  bothCtx.forEach((el) => {
    el.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    el.shadowColor = `hsla(${hue}, 100%, 55%, 0.8)`;
    // start path
    el.beginPath();
    el.moveTo(x, y);
  });
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
  bothCtx.forEach((el) => {
    el.lineTo(x, y);
    el.stroke();
  });
  instructionsHider();
}

// keypress handlers
function handleKey(e) {
  if (e.shiftKey && e.key.includes("Arrow")) {
    // draw larger strokes when shift is held
    e.preventDefault();
    moveAmount = 16;
    draw({ key: e.key });
    // reset move amount
    moveAmount = 8;
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
    moveAmount = 16;
    arrowKeyDraw({ targetClass: e.target.className });
    moveAmount = 8;
    // loop drawing while button is pressed
    timer = setInterval(function () {
      moveAmount = 16;
      arrowKeyDraw({ targetClass: e.target.className });
      moveAmount = 8;
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

function instructionsShow() {
  instructs.classList.add("show");
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

// open and close modal
function openModal() {
  console.log("opennn");
  modalOuter.classList.add("open");
}

function closeModal() {
  modalOuter.classList.remove("open");
}

questionButton.addEventListener("click", openModal);
modalOuter.addEventListener("click", function (e) {
  const isOutside = !e.target.closest(".modal-inner");
  if (isOutside) {
    closeModal();
  }
});

modalCloseButton.addEventListener("click", closeModal);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

window.onload = () => {
  console.log("page is fully loaded");
  // var timeoutID = scope.setTimeout(code[, delay]);
  function lightsOn() {
    document
      .querySelector("html")
      .style.setProperty("background-color", "var(--bg-lights-on)");
  }
  setTimeout(lightsOn, 300);
  setTimeout(instructionsShow, 800);
};
