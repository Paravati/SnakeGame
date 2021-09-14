var snake = new Array();
var myGamePiece;
var w = 680;
var h = 480;
var direction = "RIGHT" //default direction is right
var pos_x = Math.ceil(Math.random()*w);
var pos_y = Math.ceil(Math.random()*h);

function startGame() {
    myGamePiece = new component(30, 30, "blue", 10, 120);
    snake.push(myGamePiece);
    console.log(snake);
    snack = new component(20, 20, "static/img/food.png", pos_x, pos_y, "image");
//    snack = new component(20, 20, "green", pos_x, pos_y);
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = w;
        this.canvas.height = h;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
}

function component(width, height, color, x, y, type="") {
    this.width = width;
    this.height = height;
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
    var newPiece = new component(30, 30, "pink", snake[0].x-30, snake[0].y);
    newPiece.speedX = snake[0].speedX;
    newPiece.speedY = snake[0].speedY;
    console.log("snake is growing")
    snake.push(newPiece);
    console.log(snake);

}

function updateGameArea() {
    myGameArea.clear();
    snack.update();
//    snake[0].newPos();
//    snake[0].update();
    for(let i =0;i<snake.length; i++){
        snake[i].newPos();
        snake[i].update();
    }
    if (snake[0].x > snack.x && snake[0].y > snack.y ){
    snakeGrowth();
    console.log("eaten");
    pos_x = Math.ceil(Math.random()*w);
    pos_y = Math.ceil(Math.random()*h);
    snack = new component(20, 20, "static/img/food.png", pos_x, pos_y, "image");
    }
//    myGamePiece.newPos();
//    myGamePiece.update();
//    if (myGamePiece.x > snack.x && myGamePiece.y > snack.y ){
//        var piece = snakeGrowth();
//        piece.update();
//        console.log("eaten");
//        pos_x = Math.ceil(Math.random()*w);
//        pos_y = Math.ceil(Math.random()*h);
//        snack = new component(20, 20, "static/img/food.png", pos_x, pos_y, "image");
//    }
}

function moveup() {
    myGamePiece.speedY = -1;  //-=1
    myGamePiece.speedX = 0;  //to prevent diagonal moves
    direction = "UP";
}

function movedown() {
    myGamePiece.speedY = 1;  //+=1
    myGamePiece.speedX = 0;  //to prevent diagonal moves
    direction = "DOWN";
}

function moveleft() {
    myGamePiece.speedX = -1;  //-=1
    myGamePiece.speedY = 0;  //to prevent diagonal moves
    direction = "LEFT";
}

function moveright() {
    myGamePiece.speedX = 1;  //+=1
    myGamePiece.speedY = 0;  //to prevent diagonal moves
    direction = "RIGHT";
}

//document.addEventListener('keydown',direction);
window.addEventListener('keydown',
function direction(event){
    let key = event.keyCode;
    if( key == 37 && direction != "RIGHT"){
        moveleft();
        direction = "LEFT";
    }else if(key == 38 && direction != "DOWN"){
        direction = "UP";
        moveup();
    }else if(key == 39 && direction != "LEFT"){
        direction = "RIGHT";
        moveright();
    }else if(key == 40 && direction != "UP"){
        direction = "DOWN";
        movedown();
    }
}
)