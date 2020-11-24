const { width, height } = document.body.getBoundingClientRect();

function createCanvas() {
  const container = document.getElementById("canvas-container");
  if (container === null) {
    throw new Error('Cannot find element with ID "canvas-container"');
  }
  const canvas = document.createElement("canvas");
  canvas.height = height;
  canvas.width = width;
  container.append(canvas);
  const ctx = canvas.getContext("2d");
  if (ctx === null) {
    throw new Error("Canvas context is null");
  }
  return ctx;
}

const pathCtx = createCanvas();
const turtleCtx = createCanvas();

pathCtx.strokeStyle = "#4D4E53";
pathCtx.lineWidth = 2;

turtleCtx.strokeStyle = "green";
turtleCtx.fillStyle = "green";
turtleCtx.lineWidth = 3;

const midX = width / 2;
const midY = height / 2;

let penStatus = "down";

function toRadians(degrees: number) {
  return (Math.PI / 180) * degrees;
}

function drawTurtle(distance = 0) {
  turtleCtx.clearRect(0, 0, width, height);
  turtleCtx.beginPath();
  turtleCtx.moveTo(midX, midY - 20 - distance);
  turtleCtx.lineTo(midX + 10, midY + 10 - distance);
  turtleCtx.lineTo(midX - 10, midY + 10 - distance);
  turtleCtx.closePath();
  penStatus === "down" ? turtleCtx.stroke() : turtleCtx.fill();
}

function drawPath(distance: number) {
  pathCtx.beginPath();
  pathCtx.moveTo(midX, midY);
  pathCtx.lineTo(midX, midY - distance);
  pathCtx.stroke();
}

function forwardPath(distance: number) {
  if (penStatus === "down") {
    drawPath(distance);
  }
  pathCtx.translate(0, -distance);
}

function forwardTurtle(distance: number) {
  drawTurtle(distance);
  turtleCtx.translate(0, -distance);
}

function forward(distance: number) {
  forwardPath(distance);
  forwardTurtle(distance);
}

function back(distance: number) {
  forward(-distance);
}

function right(degrees: number) {
  pathCtx.translate(midX, midY);
  pathCtx.rotate(toRadians(degrees));
  pathCtx.translate(-midX, -midY);

  turtleCtx.translate(midX, midY);
  turtleCtx.rotate(toRadians(degrees));
  turtleCtx.translate(-midX, -midY);

  forward(0);
}

function left(degrees: number) {
  right(-degrees);
}

function penup() {
  penStatus = "up";
  drawTurtle();
}

function pendown() {
  penStatus = "down";
  drawTurtle();
}

drawTurtle();

export { forward, back, right, left, penup, pendown };
