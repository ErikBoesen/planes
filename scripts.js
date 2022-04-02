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
      PLANE_SIZE_MULTIPLIER = 0.1,
      PLANE_DRAW_WIDTH = parseInt(PLANE_WIDTH * PLANE_SIZE_MULTIPLIER),
      PLANE_DRAW_HEIGHT = parseInt(PLANE_HEIGHT * PLANE_SIZE_MULTIPLIER);
let planeImageRight = new Image(PLANE_WIDTH, PLANE_HEIGHT);
planeImageLeft.src = 'plane_left.png';
let planeImageRight = new Image(PLANE_WIDTH, PLANE_HEIGHT);
planeImageRight.src = 'plane_right.png';

const PLANE_SPEED = 0.04;
const G = 0.3;

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
    ctx.strokeStyle = '#000000';
    shownPlanes = planes.slice();
    if (mouseDown && currentPlane != null) {
        ctx.beginPath();
        ctx.moveTo(currentPlane.x, currentPlane.y);
        ctx.lineTo(mousePosition.x, mousePosition.y);
        ctx.stroke();
        console.log('Drawing line!');
    }
    if (currentPlane) {
        shownPlanes.push(currentPlane);
    }
    for (plane of shownPlanes) {
        ctx.save();
        ctx.translate(plane.x, plane.y);
        let angle;
        if (plane == currentPlane) {
            angle = Math.atan2(plane.y - mousePosition.y, plane.x - mousePosition.x)
        } else {
            angle = Math.atan2(plane.ySpeed, plane.xSpeed);
        }
        angle += Math.PI / 6;
        ctx.rotate(angle);
        ctx.drawImage(planeImage, -PLANE_DRAW_WIDTH / 2, -PLANE_DRAW_HEIGHT / 2,
                                  PLANE_DRAW_WIDTH, PLANE_DRAW_HEIGHT);
        ctx.restore();
    }
}
setInterval(function() {
    move();
    draw();
}, 10);
