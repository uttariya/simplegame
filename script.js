//init canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//number of lives
var lives = 3;
//number of destroyed bricks
var score = 0;
//paddle dimensions
var paddleHeight = 10;
var paddleWidth = 75;
//paddle initial location
var paddleX = (canvas.width - paddleWidth) / 2;
//set initial ball location
var x = paddleX;
var y = canvas.height - 30;
//set ball speed
var dx = 2;
var dy = -2;
//set radius
var radius = 10;
//brick properties
var brickRowCount = 3;
var brickColCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
//initializing the bricks
var bricks = []
for (var i = 0; i < brickRowCount; i++) {
    bricks[i] = [];
    for (var j = 0; j < brickColCount; j++)
        bricks[i][j] = {
            x: 0,
            y: 0,
            status: true
        };
}
//lives of the playes
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}
//Scoreboard
function result() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}
//drawing the bricks
function drawBricks() {
    for (var i = 0; i < brickRowCount; i++)
        for (var j = 0; j < brickColCount; j++) {
            if (bricks[i][j].status) {
                bricks[i][j].x = (j * (brickWidth + brickPadding)) + brickOffsetLeft;
                bricks[i][j].y = (i * (brickHeight + brickPadding)) + brickOffsetTop;
                ctx.beginPath();
                ctx.rect(bricks[i][j].x, bricks[i][j].y, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }

}
//collision detection wth bricks
function collisionDetection() {
    for (var i = 0; i < brickRowCount; i++)
        for (var j = 0; j < brickColCount; j++) {
            var b = bricks[i][j];
            if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight && b.status) {
                dy = -dy;
                b.status = false;
                score++;
                if (score >= brickRowCount * brickColCount) {
                    alert("game over!");
                    document.location.reload();
                }
            }
        }
}
//keypress event values
var rightPressed = false;
var leftPressed = false;
//function that draws the ball
function drawball() {
    //update location because of speed
    x = x + dx;
    y = y + dy;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
//draws everything by calling their respective funcs
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //check for collision on left and right wall
    dx = x <= radius || x >= canvas.width - radius ? dx * (-1) : dx;
    //check for collision with top wall
    dy = y <= radius ? dy * (-1) : dy;
    //check for collision with paddle or gameover
    if (y > canvas.height - radius) {
        if (x >= paddleX && x <= paddleX + paddleWidth)
            dy = -dy;
        else {
            if (lives > 0) {
				x = canvas.width/2;
				y = canvas.height-30;
				dx = 2;
				dy = -2;
				paddleX = (canvas.width-paddleWidth)/2;
                lives--;
            } else {
                alert("game over!");
                document.location.reload();
            }
        }
    }
    //updating paddle location based on keypress
    paddleX = rightPressed && paddleX + 7 < canvas.width - paddleWidth ? paddleX + 7 : paddleX;
    paddleX = leftPressed && paddleX - 7 > 0 ? paddleX - 7 : paddleX;
    //draw everything
    drawBricks();
    drawball();
    drawpaddle();
    result();
    drawLives();
    collisionDetection();
	requestAnimationFrame(draw);
}
//paddle draw
function drawpaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
//press down event for key
function keyDownHandler(e) {
    console.log(0);
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    }
}
//press up event for key
function keyUpHandler(e) {
    console.log(1);
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
}
//mouseMove event handler
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
draw();