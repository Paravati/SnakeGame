var snake = new Array();
var myGamePiece;
var w = 680;
var h = 480;
var direction = "RIGHT" //default direction is right
var pos_x = Math.ceil(Math.random()*w);
var pos_y = Math.ceil(Math.random()*h);
var changeMovementCoordinates = [-1, -1];
var pixelLen = 20;
var move_direction = "RIGHT"  //direction of the one segment
var eating = 0;

function startGame() {
    myGamePiece = new component(pixelLen, pixelLen, "blue", 10, 120);
    snake.push(myGamePiece);
    console.log(snake);
    snack = new component(pixelLen, pixelLen, "static/img/food.png", pos_x, pos_y, "image");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = w;
        this.canvas.height = h;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 200);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
}

function component(width, height, color, x, y, type="") {
    this.width = width;
    this.height = height;
    this.move_direction = "RIGHT";
    if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  }
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image,
            this.x,
            this.y,
            this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.strokestyle = "black";
            ctx.strokeRect(this.x, this.y, this.width, this.height);

        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.x > myGameArea.canvas.width) this.x = 0;
        else if(this.x <0 ) this.x = myGameArea.canvas.width;
        if(this.y > myGameArea.canvas.height) this.y=0;
        else if(this.y <0 ) this.y = myGameArea.canvas.height;

    }
}

function snakeGrowth(){
    var newPiece;
    var lastComponentOfSnake = snake[snake.length-1];
    if(lastComponentOfSnake.move_direction === "RIGHT"){
        newPiece = new component(pixelLen, pixelLen, "pink", lastComponentOfSnake.x-pixelLen, lastComponentOfSnake.y);
    }else if(lastComponentOfSnake.move_direction === "LEFT"){
        newPiece = new component(pixelLen, pixelLen, "pink", lastComponentOfSnake.x+pixelLen, lastComponentOfSnake.y);
    }else if(lastComponentOfSnake.move_direction === "UP"){
        newPiece = new component(pixelLen, pixelLen, "pink", lastComponentOfSnake.x, lastComponentOfSnake.y+pixelLen);
    }else if(lastComponentOfSnake.move_direction === "DOWN"){
        newPiece = new component(pixelLen, pixelLen, "pink", lastComponentOfSnake.x, lastComponentOfSnake.y-pixelLen);
    }
//    var newPiece = new component(pixelLen, pixelLen, "pink", snake[0].x-pixelLen, snake[0].y);
    newPiece.speedX = lastComponentOfSnake.speedX;
    newPiece.speedY = lastComponentOfSnake.speedY;
    console.log("snake is growing")
    snake.push(newPiece);
    console.log(snake);
    eating = 0;
}

function updateGameArea() {
    myGameArea.clear();
    if (snack!==undefined){
    snack.update();
    }
    for(let i =0;i<snake.length; i++){
        if ( snake.length>1 && snake[1].x == changeMovementCoordinates[0] && snake[1].y == changeMovementCoordinates[1]){
            if (snake[i-1].move_direction === "DOWN"){
                movedown(snake[i]);
            }else if(snake[i-1].move_direction === "UP"){
                moveup(snake[i]);
            }else if(snake[i-1].move_direction === "RIGHT"){
                moveright(snake[i]);
            }else if(snake[i-1].move_direction === "LEFT"){
                moveleft(snake[i]);
            }
            }
        snake[i].newPos();
        snake[i].update();
//        console.log(snake[i].move_direction);
    }
    console.log(eating);
    if (eating===0 && snake[0].x > snack.x && snake[0].x < snack.x+pixelLen && snake[0].y > snack.y && snake[0].y < snack.y+pixelLen){
        snack=undefined;
        eating = 1; // flag which prevents errors caused by eating fruit by another parts ->
        snakeGrowth();
        console.log("eaten");
//        pos_x = Math.ceil(Math.random()*(w-pixelLen));
//        pos_y = Math.ceil(Math.random()*(h-pixelLen));
        pos_x = Math.ceil(Math.random()*40)*pixelLen;
        pos_y = Math.ceil(Math.random()*20)*pixelLen;
        snack = new component(pixelLen, pixelLen, "static/img/food.png", pos_x, pos_y, "image");
        console.log(pos_x + " " + pos_y);
    }

}

function moveup(part) {
//    myGamePiece.speedY = -1;  //-=1
//    myGamePiece.speedX = 0;  //to prevent diagonal moves
    part.speedX = 0;
    part.speedY = -pixelLen;
    part.move_direction = "UP";
}

function movedown(part) {
//    myGamePiece.speedY = 1;  //+=1
//    myGamePiece.speedX = 0;  //to prevent diagonal moves
    part.speedX = 0;
    part.speedY = pixelLen;
    part.move_direction = "DOWN";
}

function moveleft(part) {
//    myGamePiece.speedX = -1;  //-=1
//    myGamePiece.speedY = 0;  //to prevent diagonal moves
    part.speedX = -pixelLen;
    part.speedY = 0;
    part.move_direction = "LEFT";
}

function moveright(part) {
//    myGamePiece.speedX = 1;  //+=1
//    myGamePiece.speedY = 0;  //to prevent diagonal moves
    part.speedX = pixelLen;
    part.speedY = 0;
    part.move_direction = "RIGHT";
}

//document.addEventListener('keydown',direction);
window.addEventListener('keydown',
function direction(event){
    let key = event.keyCode;
    if( key == 37 && direction != "RIGHT"){
        changeMovementCoordinates = [snake[0].x, snake[0].y];
        moveleft(snake[0]);
        direction = "LEFT";
        changeMovementCoordinates = [-1, -1];
    }else if(key == 38 && direction != "DOWN"){
        changeMovementCoordinates = [snake[0].x, snake[0].y];
        moveup(snake[0]);
        direction = "UP";
        changeMovementCoordinates = [-1, -1];
    }else if(key == 39 && direction != "LEFT"){
        changeMovementCoordinates = [snake[0].x, snake[0].y];
        moveright(snake[0]);
        direction = "RIGHT";
        changeMovementCoordinates = [-1, -1];
    }else if(key == 40 && direction != "UP"){
        changeMovementCoordinates = [snake[0].x, snake[0].y];
        movedown(snake[0]);
        direction = "DOWN";
        changeMovementCoordinates = [-1, -1];
    }
}
)