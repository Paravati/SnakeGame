var myGamePiece;
var w = 680;
var h = 480;

function startGame() {
    myGamePiece = new component(30, 30, "blue", 10, 120);
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
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
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

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();
}

function moveup() {
    myGamePiece.speedY -= 1;
    myGamePiece.speedX = 0;  //to prevent diagonal moves
}

function movedown() {
    myGamePiece.speedY += 1;
    myGamePiece.speedX = 0;  //to prevent diagonal moves
}

function moveleft() {
    myGamePiece.speedX -= 1;
    myGamePiece.speedY = 0;  //to prevent diagonal moves
}

function moveright() {
    myGamePiece.speedX += 1;
    myGamePiece.speedY = 0;  //to prevent diagonal moves
}