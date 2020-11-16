// Select elements on the page
const canvas = document.querySelector("#etch");
const ctx = canvas.getContext("2d");
const shakeButton = document.querySelector(".shake");

// setup canvas
// const width = canvas.width;
// const height = canvas.height;
const { width, height } = canvas; // same as above, just destructured
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = "square";
ctx.lineCap = "square";
ctx.lineWidth = 8;
ctx.strokeStyle = "#ffffff";

ctx.beginPath(); // start drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// draw function

// keypress handler

// clear function

// arrow key listener
