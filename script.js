var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x=50;
var y=50;
var dx=2;
var dy=-2;
var radius=10;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
function drawball()
{
x=x+dx;
y=y+dy;
ctx.beginPath();
ctx.arc(x, y, radius, 0, Math.PI*2);
ctx.fillStyle = "#0095DD";
ctx.fill();
ctx.closePath();
}
function draw() 
{
ctx.clearRect(0, 0, canvas.width, canvas.height);
dx=x<=radius||x>=canvas.width-radius?dx*(-1):dx;
dy=y<=radius||y>=canvas.height-radius?dy*(-1):dy;
paddleX=rightPressed && paddleX+7<canvas.width-paddleWidth?paddleX+7:paddleX;
paddleX=leftPressed && paddleX-7>0?paddleX-7:paddleX;
drawball();
drawpaddle();
}
function drawpaddle()
{
	ctx.beginPath();
	ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
	ctx.fillStyle="#0095DD";
	ctx.fill();
	ctx.closePath();
}
function keyDownHandler(e)
{
	console.log(0);
 if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e)
{
	console.log(1);
 if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
setInterval(draw,10);