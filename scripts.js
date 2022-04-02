const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let instructions = document.getElementById('instructions');

ctx.strokeStyle = 'white';
ctx.lineWidth = 3;
let currentPlane = null;
let startPosition = null;
let planes = [];

let mouseDown = false;
let xOld, yOld, x, y;
let mousePosition = null;

const PLANE_WIDTH = 512,
      PLANE_HEIGHT = 342,
      PLANE_SIZE_MULTIPLIER = 0.1;
let planeImage = new Image(PLANE_WIDTH, PLANE_HEIGHT);
planeImage.src = 'plane.png';

const PLANE_SPEED = 0.1;
const G = 2;

canvas.onmousedown = function(e) {
    console.log('Mouse down!');
    if (instructions) {
        instructions.parentNode.removeChild(instructions);
        instructions = null;
    }
    mouseDown = true;
    currentPlane = {
        x: mousePosition.x,
        y: mousePosition.y,
    };

}
canvas.onmouseup = function(e) {
    console.log('Mouse up!');
    mouseDown = false;
    currentPlane.xSpeed = PLANE_SPEED * (currentPlane.x - mousePosition.x);
    currentPlane.ySpeed = PLANE_SPEED * (currentPlane.y - mousePosition.y);
    planes.push(currentPlane);
    currentPlane = null;
}
canvas.onmousemove = function(e) {
    mousePosition = {
        x: e.clientX - canvas.offsetLeft,
        y: e.clientY - canvas.offsetTop
    };
    if (mouseDown) {
    }
}

function move() {
    for (plane of planes) {
        plane.x += plane.xSpeed;
        plane.y += plane.ySpeed;
        plane.ySpeed += G;
    }
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shownPlanes = planes.slice();
    if (currentPlane) {
        shownPlanes.push(currentPlane);
    }
    for (plane of shownPlanes) {
        ctx.drawImage(planeImage, plane.x, plane.y, parseInt(512 * PLANE_SIZE_MULTIPLIER), parseInt(342 * PLANE_SIZE_MULTIPLIER));
    }
}
setInterval(function() {
    move();
    draw();
}, 10);
