var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var startx=50;
var starty=50;
var dx=2;
var dy=-2;
function drawball()
{
startx=startx+dx;
starty=starty+dy;
ctx.beginPath();
ctx.arc(startx, starty, 10, 0, Math.PI*2);
ctx.fillStyle = "#0095DD";
ctx.fill();
ctx.closePath();
}
function draw() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
dx=startx<=20||startx>=460?dx*(-1):dx;
dy=starty<=20||starty>=300?dy*(-1):dy;
drawball();
}
setInterval(draw,10);