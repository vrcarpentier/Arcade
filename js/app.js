// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // set the Enemy initial location (you need to implement)
    this.x = x;
    this.y = y;
    // set the Enemy speed (you need to implement)
    this.speed = 90;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // updates the Enemy location
    if (this.x <= 505) { // using 505 lets bug get entirely off canvas before regenerating
        this.x = this.x + this.speed * dt;
    } else {
        this.x = -60; 
        // using -60 lets the bug appear like it's coming from off 
        // the canvas and not just magically appearing on it
    }
    // handles collision with the Player
    // sets player back to starting point if collision occurs
    if (this.x >= player.x - 50 && this.x <= player.x + 50) {
        if (this.y >= player.y - 50 && this.y <= player.y + 50) {
            player.y = 420;
            player.x = 200;
            alert("Oh no! Try again!")
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// the Player function, which initiaties the Player by:


var Player = function(x,y) {
    // setting the Player initial location
    this.x = 200;
    this.y = 420;
    // loading the image by setting the sprite
    this.sprite = 'images/char-boy.png';
};

// The update method of the player (can be similar to the one for Enemy)
Player.prototype.update = function() {
    // player regen is built into Player.prototype.handleInput

};

// the render method for Player (use the code from the render method for the Enemy)
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// the handleInput method, should receive user imput
// allowedKeys (the key which was pressed)
// and move the player according to that input.  In particular:
// Left key should move left, right should move right, etc.
// Recall the player cannot move off the screen (so check for that and handle appropriately)
// If the player reaches the water the game should reset by moving
// the player back to the initial location (you can write a seperate
// Player method to handle that)
Player.prototype.handleInput = function(e) {
    if (e == "left") {
        if (this.x - 100 >=0)
            this.x -= 100;
    } else if (e == "right") {
        if (this.x + 100 <= 400)
            this.x += 100;
    } else if (e == "down") {
        if (this.y + 100 <=500)
            this.y += 100;
    // below moves up or returns plyr to starting pos when they reach water
    } else if (e == "up") {
        if (this.y < 50) {
            this.y = 420;
            this.x = 200;
            alert("You win!")
        } else
            this.y -= 100;
    } 
};        

// Once you have completed implemeting the Player and Enemy,
// you should instanitate them by:
// Creating a new Player object
// Creating several new Enemies objects and placing them in an array called allEnemies

// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy(10,50);
var enemy2 = new Enemy(300,50);
var enemy3 = new Enemy(410,130);
var enemy4 = new Enemy(460,210);
var enemy5 = new Enemy(200, 210);
var enemy6 = new Enemy(200,130);
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
