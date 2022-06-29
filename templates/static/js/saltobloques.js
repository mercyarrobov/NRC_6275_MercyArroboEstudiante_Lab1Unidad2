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

//Función del juego
function startGame() {
    gameCanvas.start();
    //Crea el juego usando la función
    player = new createPlayer(50, 40, 10);
    //Asigna la variable de bloque con un valor de createBlock() 
    block = new createBlock();
    //Asigna a tu variable scoreLabel un valor de scoreLabel()
    scoreLabel = new createScoreLabel(30, 50);
}

//Crea un objeto Canvas
var gameCanvas = {
    canvas: document.createElement("canvas"),
    //inicia el juego
    start: function () {
        //Uso de la palabra reservada para usar el objeto instanciado
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}

/** 
* Crea la función llamada createPlayer que crea al jugador.
* @param {number} width - ancho del cuadrado
* @param {number} height - alto del cuadrado
* @param {number} x - Posición inicial.
*/
function createPlayer(width, height, x) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = playerYPosition;

    //Crea el dibujo en el canvas
    this.draw = function () {
        ctx = gameCanvas.context;
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    //Gravedad del jugador en la caida  
    this.makeFall = function () {
        if (!isJumping) {
            this.y += fallSpeed;
            fallSpeed += 0.1;
            //Lama a la función parar juego "stopPlayer()"
            this.stopPlayer();
        }
    }
    //Tope del jugador 
    this.stopPlayer = function () {
        var ground = canvasHeight - this.height;
        //Si topa suelo para
        if (this.y > ground) {
            this.y = ground;
        }
    }
    //Salta con una velocidad de 0.3
    this.jump = function () {
        if (isJumping) {
            this.y -= jumpSpeed;
            jumpSpeed += 0.3;
        }
    }
}


//Crea la función para crear los bloques de forma aleatoria
function createBlock() {
    //El ancho del bloque
    var width = randomNumber(10, 50);
    //Largo del bloque
    var height = randomNumber(10, 200);
    //Velocidad del bloque
    var speed = randomNumber(2, 6);

    //Ancho del canvas
    this.x = canvasWidth;
    //Altura del canvas
    this.y = canvasHeight - height;

    //Agregamos diseño al bloque
    this.draw = function () {
        //Asignamos a la variable ctx la función gameCanvas
        ctx = gameCanvas.context;
        //Asignamos el color
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, width, height);
    }
    //Se asigna la velocidad para que ataque
    this.attackPlayer = function () {
        //se resta la velocidad a la variable x
        this.x -= speed;
        //Llama a la función returnToAttackPosition
        this.returnToAttackPosition();
    }
    //Crear un retorno a la posición de ataque que mueva el bloque hacia atrás y cree nuevos valores aleatorios
    this.returnToAttackPosition = function () {
        if (this.x < 0) {
            //Asignamos el ancho de manera aleatoria
            width = randomNumber(10, 50);
            //Asignamos la altura de manera aleatoria
            height = randomNumber(50, 200);
            //Asignamos la velocidad de manera aleatoria
            speed = randomNumber(4, 6);
            this.y = canvasHeight - height;
            this.x = canvasWidth;
            // Aumenta tu puntuación si tu bloque ha llegado al borde
            score++;
        }
    }
}

//Crear un función detener el juego en collision
function detectCollision() {
    //Asigna al jugadador en la posición ixquierda
    var playerLeft = player.x
    //Asigna al judador de la posición inicial más el ancho hacia el jugador derecha
    var playerRight = player.x + player.width;
    //Asigna el bloque a la izquierda
    var blockLeft = block.x;
    //var blockRight = block.x + block.width;

    var playerBottom = player.y + player.height;
    var blockTop = block.y;

    //Fondo de canva
    if (playerRight > blockLeft &&
        playerLeft < blockLeft &&
        playerBottom > blockTop) {
        //Para el juego
        gameCanvas.stop();
    }
}

//Crea la función createScoreLabel para el record
function createScoreLabel(x, y) {
    //El record siempre inicia en 0
    this.score = 0;
    this.x = x;
    this.y = y;
    //Definimos el tamaño, color y la posición del canva del record 
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
    //Asigna la función caida al jugador
    player.makeFall();
    //Asigna la función dibujar al jugador
    player.draw();
    //Asigna la función saltar al jugador
    player.jump();
    //Asigna la función dibujar al bloque
    block.draw();
    //Asigna la función atacar al bloque
    block.attackPlayer();

    // Redraw your score and update the value
    scoreLabel.text = "SCORE: " + score;
    scoreLabel.draw();
}

//Función que genera el numero de manera aleatorio para los bloques
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//Función que restablece el salto 
function resetJump() {
    //Se reinicia el salto
    jumpSpeed = 0;
    //Se reinicia la velocidad del salto 
    isJumping = false;
}

//Se define la tecla para el salto
document.body.onkeyup = function (e) {
    //Si se preciona la tecla espaciadora se activa el salto y se actualiza el tiempo del salto
    if (e.keyCode == 32) {isJumping = true;
        setTimeout(function () {
            resetJump();
        }, 1000);
    }
}