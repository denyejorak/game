// Import necessary modules: EnemyController, Player and BulletController
import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";

// Get the canvas element from HTML
const canvas = document.getElementById("game");

// Get the context of the canvas
const ctx = canvas.getContext("2d");

// Set the canvas width and height
canvas.width = 900;
canvas.height = 650;

// Create an instance of the Image object and set its source
const background = new Image();
background.src = "images/background.jpeg";

// Create an instance of BulletController to control the player's and enemies bullets
const playerBulletController = new BulletController(canvas,10,'red', true);
const enemyBulletController = new BulletController(canvas,4,"white", false);

// Create an instance of EnemyController to manage the game's enemies
const enemyController = new EnemyController(canvas,enemyBulletController, playerBulletController);

// Create an instance of Player with the canvas, lives, and bullet controller as arguments
const player = new Player(canvas, 3, playerBulletController);

const musicIfWin = new Audio ('sounds/sowhat.mp3');
musicIfWin.volume = 1  ;
const musicIfLose = new Audio ('sounds/bieber.mp3');
musicIfLose.volume = 0.3 ;
 
let isGameOver = false;
let didWin = false;


// Define the game loop function
function game(){
    checkGameOver();
// Draw the background image on the canvas
ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
displayGameOver();
if(!isGameOver){
// Draw the player and enemies on the canvas
player.draw(ctx);
playerBulletController.draw(ctx);
enemyController.draw(ctx); 
enemyBulletController.draw(ctx); 
console.log(isGameOver);
}
}

function displayGameOver(){
    if(isGameOver){
        let text = didWin? "YEAH! Miles Won!" : "NOOOOO! Justin Won!";
        let textOffset = didWin ? 5 : 12;
       

        ctx.fillStyle = "white";
        ctx.font = "70px Arial";
    ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
}
}

function checkGameOver(){
    if(isGameOver){
     
return;
    }
    if(enemyBulletController.collideWith(player)){
        isGameOver = true;
         musicIfLose.play();
    }
    if(enemyController.collideWith(player)){
        isGameOver = true;
        musicIfLose.play();
    }
    if(enemyController.enemyRows.length===0){
        didWin = true;
        isGameOver = true;
        musicIfWin.play();
    }

}



// Call the game function every 1/60th of a second to create the game loop
setInterval(game, 1000/60);