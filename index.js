// 아래 있는 모든 기능은 html 5의 canvas mdn을 참고함

const canvas = document.getElementById("jsCanvas"),
  ctx = canvas.getContext("2d"),
  colors = document.querySelectorAll(".js-color"),
  range = document.querySelector("#jsRange"),
  mode = document.querySelector("#jsMode"),
  save = document.querySelector("#jsSave");
// picel modifier
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
// ctx.fillRect(50, 20, 100, 40);
let filling = false;
let painting = false;

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  //   painting이 아니면 path를 그리는 기능 구현 -> path : paint의 근본
  if (!painting) {
    // console.log("creating in path", x, y);
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    // console.log("creating in line", x, y);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
function handleColorClick(event) {
  //   console.log(event.target.style);
  const color = event.target.style.backgroundColor;
  //   console.log(color);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}
function hanldeModeClick(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}
function handleRangeChange(event) {
  //   console.log(event);
  //   console.log(event.target.value);
  const strokeSize = event.target.value;
  ctx.lineWidth = strokeSize;
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  //   console.log(event);
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL("image/jpeg");
  //   console.log(image);
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[🌹]";
  console.log(link);
  link.click();
}
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}
Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);
// console.log(Array.from(colors));

if (range) {
  range.addEventListener("input", handleRangeChange);
}
if (mode) {
  mode.addEventListener("click", hanldeModeClick);
}
if (save) {
  save.addEventListener("click", handleSaveClick);
}
