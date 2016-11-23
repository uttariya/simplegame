//init canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//set initial ball location
var x=50;
var y=50;
//set ball speed
var dx=2;
var dy=-2;
//set radius
var radius=10;
//paddle dimentions
var paddleHeight = 10;
var paddleWidth = 75;
//paddle initial location
var paddleX = (canvas.width-paddleWidth)/2;
//keypress event values
var rightPressed = false;
var leftPressed = false;
//function that draws the ball
function drawball()
{
//update location because of speed
x=x+dx;
y=y+dy;
ctx.beginPath();
ctx.arc(x, y, radius, 0, Math.PI*2);
ctx.fillStyle = "#0095DD";
ctx.fill();
ctx.closePath();
}
//draws everything by calling their respective funcs
function draw() 
{
ctx.clearRect(0, 0, canvas.width, canvas.height);
//check for collision on left and right wall
dx=x<=radius||x>=canvas.width-radius?dx*(-1):dx;
//check for collision with top wall
dy=y<=radius?dy*(-1):dy;
//check for collision with paddle or gameover
if(y>canvas.height-radius)
{	if(x>=paddleX && x<=paddleX+paddleWidth)
	dy=-dy;
	else
	{
	alert("game over!");
	document.location.reload();}
}
//updating paddle location based o keypress
paddleX=rightPressed && paddleX+7<canvas.width-paddleWidth?paddleX+7:paddleX;
paddleX=leftPressed && paddleX-7>0?paddleX-7:paddleX;
//draw everything
drawball();
drawpaddle();
}
//paddle draw
function drawpaddle()
{
	ctx.beginPath();
	ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
	ctx.fillStyle="#0095DD";
	ctx.fill();
	ctx.closePath();
}
//press down event for key
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
//press up event for key
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