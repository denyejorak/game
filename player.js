export default class Player {
    rightPressed = false;
    leftPressed = false;
    shootPressed = false;

// Constructor for creating a new player
constructor(canvas, velocity, bulletController) {
    // Save the canvas and velocity as instance variables
    this.canvas = canvas;
    this.velocity = velocity;
    this.bulletController = bulletController;

// Set the initial position and dimensions of the player
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - 75;
    this.width = 120;
    this.height = 90;

// Load the image for the player
    this.image = new Image();
    this.image.src = 'images/miles.png';

// Add event listeners for keydown and keyup events
    document.addEventListener('keydown', this.keydown);
    document.addEventListener('keyup', this.keyup);
}

// Method to draw the player on the canvas
draw(ctx) {
// If the shoot key is pressed, shoot a bullet
    if (this.shootPressed) {
        this.bulletController.shoot(this.x + this.width / 2, this.y, 4, 10);
    }

// Move the player and check for collision with walls
    this.move();
    this.collideWithWalls();

   // Draw the player image on the canvas
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
}

// Method to handle collision of player with walls
collideWithWalls() {
    // If the player hits the left wall, set the x position to 0
    if (this.x < 0) {
        this.x = 0;
    }

// If the player hits the right wall, set the x position to the rightmost position
    if (this.x >= this.canvas.width - this.width) {
        this.x = this.canvas.width - this.width;
    }
}

// Method to move the player based on the keys that are currently pressed
move() {
// If the right key is pressed, move the player to the right
    if (this.rightPressed) {
        this.x += this.velocity;
    }
// If the left key is pressed, move the player to the left
    else if (this.leftPressed) {
        this.x += -this.velocity;
    }
}

// Event handler for keydown events
keydown = event => {
// If the right arrow key is pressed, set rightPressed to true
    if (event.code == 'ArrowRight') {
        this.rightPressed = true;
    }
 // If the left arrow key is pressed, set leftPressed to true
    if (event.code == 'ArrowLeft') {
        this.leftPressed = true;
    }
// If the space key is pressed, set shootPressed to true
    if (event.code == 'Space') {
        this.shootPressed = true;
    }
};

// Event handler for keyup events
keyup = event => {
// If the right arrow key is released, set rightPressed to false
    if (event.code == 'ArrowRight') {
        this.rightPressed = false;
    }
// If the left arrow key is released, set leftPressed to false
    if (event.code == 'ArrowLeft') {
        this.leftPressed = false;
    }
// If the space key is released, set shootPressed to false
    if (event.code == 'Space') {
        this.shootPressed = false;
    }
}
};
