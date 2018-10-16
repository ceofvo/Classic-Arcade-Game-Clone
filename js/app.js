
// Enemies our player must avoid
class Enemy{
    constructor(x, y, speed){
        // Variables applied to each of our instances go here
        this.x = x;
        this.y = y + 59;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
        this.xWidth = 101;
    }

    //Update the enemy's position, required method for game
    update(dt){
        if(this.x < this.xWidth * 5){
        this.x += this.speed * dt; 
        }
        else {
            this.x = -this.xWidth;
        }

    }

    // Draw the enemy on the screen, required method for game
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }   
}


// The player and it's functionalities and declared here
class Gamer{
    constructor(){
        this.sprite = 'images/char-princess-girl.png';
        this.xWidth = 101;
        this.yHeight = 83;
        this.xStart = this.xWidth * 2;
        this.yStart = (this.yHeight * 5) - 39;
        this.x = this.xStart;
        this.y = this.yStart;
        this.gameWin = false;
    }

    //Draw gamer sprite with current x and y position
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //Handle the movement of the player
    handleInput(direction){

        if(direction == 'left' && this.x > 0){
            this.x -= this.xWidth; 
        }else if(direction === 'up' && this.y > 0){
            this.y -= this.yHeight; 
       }else if(direction === 'right' && this.x < this.xWidth * 4){
            this.x += this.xWidth; 
        }else if(direction === 'down' && this.y < this.yHeight * 4){
            this.y += this.yHeight; 
        }
    }

    //Check for player-enemy collision and game win
    update() {
        //Check for collision and reset player if they collide
        for(let bug of allEnemies) {
            if((this.y + 15) === bug.y && (bug.x + bug.xWidth/2 > this.x && bug.x < this.x + this.xWidth/2)){
                this.reset();
            }
        }

        //If the player wins the game set this.gameWin to true then show modal
        if (this.y === -39) {
            this.gameWin = true;
        }       

    }

    //Send player back to the start position
    reset() {
        this.x = this.xStart;
        this.y = this.yStart;
    }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Gamer();

const allEnemies = [];

// Position "y" where the enemies will are created
var enemyPosition = [0, 83, 83, 166];
var bug;

// Setup "x" and "y" position for the enemies and randomly generate enemy speed
enemyPosition.forEach(function(posY) {
    bug = new Enemy(-101, posY, 90 + Math.floor(Math.random() * 512));
    allEnemies.push(bug);
});



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
