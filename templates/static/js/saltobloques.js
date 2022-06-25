//Definimos el ancho de nuestro lienzo
var canvasWidth = 1470;
//Definimos la altura de nuestro lienzo
var canvasHeight = 450;
//Crea un variable llamada player
var player;
//Crea una variable para la posición y
var playerYPosition = 300;
//Crea una variable para la Velocidad de caída
var fallSpeed = 0;
//Crea un nuevo interval
var interval = setInterval(updateCanvas, 20);
//Crea una propiedad booleana
var isJumping = false;
//Crea una variable con un valor inicial de 0
var jumpSpeed = 0;
//Crea una variable de bloque
var block;

// Crear una puntuación de 0 para empezar
var score = 0;
// Crear una variable para mantener nuestra scoreLabel
var scoreLabel;

function startGame() {
    gameCanvas.start();
    //Crea el juego usando la función
    player = new createPlayer(50, 40, 10);
    //Asigna la variable de bloque con un valor de createBlock() 
    block = new createBlock();
    //Asigna a tu variable scoreLabel un valor de scoreLabel()
    scoreLabel = new createScoreLabel(30, 50);
}

var gameCanvas = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}
//Crea la función llamada createPlayer
function createPlayer(width, height, x) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = playerYPosition;

    //Función crear dibujo
    this.draw = function () {
        ctx = gameCanvas.context;
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    //Función mover al jugador
    this.makeFall = function () {
        if (!isJumping) {
            this.y += fallSpeed;
            fallSpeed += 0.1;
            //Lama a la función parar juego "stopPlayer()"
            this.stopPlayer();
        }
    }
    //Crea la función stopPlayer()
    this.stopPlayer = function () {
        var ground = canvasHeight - this.height;
        if (this.y > ground) {
            this.y = ground;
        }
    }
    this.jump = function () {
        if (isJumping) {
            this.y -= jumpSpeed;
            jumpSpeed += 0.3;
        }
    }
}

function createBlock() {
    var width = randomNumber(10, 50);
    var height = randomNumber(10, 200);
    //Velocidad del bloque
    var speed = randomNumber(2, 6);

    this.x = canvasWidth;
    this.y = canvasHeight - height;

    this.draw = function () {
        ctx = gameCanvas.context;
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, width, height);
    }
    this.attackPlayer = function () {
        this.x -= speed;
        //Llama a la función returnToAttackPosition
        this.returnToAttackPosition();
    }
    //Crear un retorno a la posición de ataque que mueva el bloque hacia atrás y cree nuevos valores aleatorios
    this.returnToAttackPosition = function () {
        if (this.x < 0) {
            width = randomNumber(10, 50);
            height = randomNumber(50, 200);
            speed = randomNumber(4, 6);
            this.y = canvasHeight - height;
            this.x = canvasWidth;
            // Increase your score if your block made it to the edge
            score++;
        }
    }
}

//Crear un función detener el juego en collision
function detectCollision() {
    var playerLeft = player.x
    var playerRight = player.x + player.width;
    var blockLeft = block.x;
    var blockRight = block.x + block.width;

    var playerBottom = player.y + player.height;
    var blockTop = block.y;

    if (playerRight > blockLeft &&
        playerLeft < blockLeft &&
        playerBottom > blockTop) {

        gameCanvas.stop();
    }
}

//Crea la función createScoreLabel
function createScoreLabel(x, y) {
    this.score = 0;
    this.x = x;
    this.y = y;
    this.draw = function () {
        ctx = gameCanvas.context;
        ctx.font = "25px Marker Felt";
        ctx.fillStyle = "black";
        ctx.fillText(this.text, this.x, this.y);
    }
}

//Crear una función de actualización del lienzo para redibujar a nuestro jugador y hacerlo caer
function updateCanvas() {
    //Comprobar si hay una colisión cada vez que se actualiza el lienzo
    detectCollision();

    ctx = gameCanvas.context;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    player.makeFall();
    player.draw();
    player.jump();

    block.draw();
    block.attackPlayer();

    // Redraw your score and update the value
    scoreLabel.text = "SCORE: " + score;
    scoreLabel.draw();
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function resetJump() {
    jumpSpeed = 0;
    isJumping = false;
}

document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {
        isJumping = true;
        setTimeout(function () {
            resetJump();
        }, 1000);
    }
}