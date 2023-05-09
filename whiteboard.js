var gcolor = document.querySelectorAll('.green');
var bcolor = document.querySelectorAll('.black1');
var wcolor = document.querySelectorAll('.white1');
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var red = document.querySelector('.red');
var blue = document.querySelector('.blue');
var white = document.querySelector('.white');
var black = document.querySelector('.black');

canvas.style.backgroundColor = 'white';

gcolor[0].onclick = function () {
  changebgcolorG();
};
bcolor[0].onclick = function () {
  changebgcolorB();
};
wcolor[0].onclick = function () {
  changebgcolorW();
};
function changebgcolorG() {
  canvas.style.backgroundColor = 'green';
}
function changebgcolorB() {
  canvas.style.backgroundColor = 'black';
}
function changebgcolorW() {
  canvas.style.backgroundColor = 'white';
}

let isdrawing = false;

context.strokeStyle = 'black';
context.lineWidth = 2;
context.lineCap = 'round';

red.addEventListener('click', function () {
  context.strokeStyle = 'red';
});
blue.addEventListener('click', function () {
  context.strokeStyle = 'blue';
});
white.addEventListener('click', function () {
  context.strokeStyle = 'white';
});
black.addEventListener('click', function () {
  context.strokeStyle = 'black';
});

canvas.height = 540;
canvas.width = 1300;

var pencil = document.querySelectorAll('.pencil');
pencil[0].onclick = function () {
  context.strokeStyle = 'black';
  enabledrawing();
};

function enabledrawing() {
  canvas.removeEventListener('mousedown', startErasing);
  canvas.removeEventListener('mousemove', erase);
  canvas.removeEventListener('mouseup', stopErasing);
  canvas.addEventListener('mousedown', startdrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopdrawing);
}

function startdrawing(e) {
  e.preventDefault();
  isdrawing = true;
  context.beginPath();
  context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
  context.lineTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
  context.stroke();
  console.log('start drawing');
}

function draw(e) {
  if (!isdrawing) return;
  context.lineTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
  context.stroke();
  console.log('drawing');
}
function stopdrawing() {
  isdrawing = false;
}
window.onload = function () {
  enabledrawing();
};

var trash = document.querySelector('.trash');
trash.addEventListener('click', function () {
  context.clearRect(0, 0, canvas.width, canvas.height);
});

var eraser = document.querySelector('.eraser');

eraser.addEventListener('click', enableEraser);

function enableEraser() {
  canvas.removeEventListener('mousedown', startdrawing);
  canvas.removeEventListener('mousemove', draw);
  canvas.removeEventListener('mouseup', stopdrawing);
  canvas.addEventListener('mousedown', startErasing);
  canvas.addEventListener('mousemove', erase);
  canvas.addEventListener('mouseup', stopErasing);
}

function startErasing(e) {
  e.preventDefault();
  isdrawing = true;
  context.beginPath();
  context.clearRect(
    e.pageX - canvas.offsetLeft,
    e.pageY - canvas.offsetTop,
    10,
    10
  );
  context.stroke();
  console.log('start erasing');
}

function erase(e) {
  if (!isdrawing) return;
  context.clearRect(
    e.pageX - canvas.offsetLeft,
    e.pageY - canvas.offsetTop,
    10,
    10
  );
  context.stroke();
  console.log('erasing');
}

function stopErasing() {
  isdrawing = false;
}
