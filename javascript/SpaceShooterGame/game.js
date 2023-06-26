// Declaring global variables
let bulletSpeed = 0;
let myScore = 0;
let listOfEnemies : game.LedSprite[] = [];
let enemySpeed = 1;
let bullet : game.LedSprite = null;
let sprite : game.LedSprite = null;

//initialization
sprite = game.createSprite(2, 3);
bullet = game.createSprite(2, 3);
listOfEnemies = [game.createSprite(randint(0, 4), 0)];
myScore = 0;

basic.pause(2000); // Give a pause before beginning game


// When Button A is pressed...
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    sprite.change(LedSpriteProperty.X, -1); //Sprite goes to the left by one.
    bullet.change(LedSpriteProperty.X, -1); //Bullet goes to the left by one, with Sprite.
});

// When Button B is pressed...
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    sprite.change(LedSpriteProperty.X, 1); //Sprite goes to the right by one.
    bullet.change(LedSpriteProperty.X, 1); //Bullet goes to the right by one, with Sprite.
});

// When Button A and B are pressed simultaneously...
// A bullet is shot in the occuring x file.
input.onButtonPressed(Button.AB, function on_button_pressed_ab() {
    bulletSpeed = 1; //Causes the forward movement of bullet (Shooting).
    music.playSoundEffect(music.builtinSoundEffect(soundExpression.slide), SoundExpressionPlayMode.UntilDone); //Plays a space bullet shooting sfx.
});


// Checks collision between every enemy and ground (bottom y).
function enemyGroundCollision() {
	let index = 0;
	// For every enemy in listOfEnemies
    while (index <= listOfEnemies.length - 1) {
		//if y coord of an enemy is 4 (bottom of screen)...
        if (4 == listOfEnemies[index].get(LedSpriteProperty.Y)) {
            listOfEnemies[index].delete(); // Enemy sprite is deleted
            listOfEnemies.removeAt(index); // And removed from list
            myScore--; //Score is decreased by one
        }
        
        index++;
    }
}

// Checks bullet boundaries with ceiling
function checkBulletBoundaries() {
	// if the bullet's y coord is less than or equal to 0 (top of screen)...
    if (bullet.get(LedSpriteProperty.Y) <= 0) {
        bulletSpeed = 0; //bullet stops moving
        bullet.set(LedSpriteProperty.Y, 3); //And teleported back to Sprite's y rank.
    }
}

// Checks if requirements are met for Game Over state.
// Checks collision between main Sprite and any enemy.
function gameOverCheck() {
	// For every enemy in list of enemies...
    for (let value of listOfEnemies) {
		// If the sprite shares the same coordinates with any enemy...
        if (sprite.get(LedSpriteProperty.X) == value.get(LedSpriteProperty.X) && sprite.get(LedSpriteProperty.Y) == value.get(LedSpriteProperty.Y)) {
            game.setScore(myScore); //the game score is set to myScore
            basic.showNumber(myScore); //That number is displayed on screen.
            game.gameOver(); //And gameOver is initiated.
        }
        
    }
}

// Checks collision between bullet and any enemy.
function bulletCollision() {
	let index2 = 0;
	
	// For every enemy in listOfEnemies
    while (index2 <= listOfEnemies.length - 1) {
		// If the bullet shares the same coordinates with any enemy...
        if (bullet.get(LedSpriteProperty.X) == listOfEnemies[index2].get(LedSpriteProperty.X) && bullet.get(LedSpriteProperty.Y) == listOfEnemies[index2].get(LedSpriteProperty.Y)) {
            listOfEnemies[index2].delete(); //Enemy sprite is deleted,
            listOfEnemies.removeAt(index2); //And removed from list (killed)
            myScore++; //User score increment by one.
        }
        index2++;
    }
}


// Every second, this occurs...
loops.everyInterval(1000, function on_every_interval() {
	// All enemies shift/move down towards ground.
    for (let value2 of listOfEnemies) {
        value2.change(LedSpriteProperty.Y, 1);
    }
});

// Every 2.5 seconds, this occurs...
loops.everyInterval(2500, function on_every_interval2() {
	// A new enemy is added to the list of enemies.
    listOfEnemies.push(game.createSprite(randint(0, 4), -1));
});

// Forever loop
basic.forever(function on_forever() {
    gameOverCheck(); //Game over checked
    bulletCollision(); //Bullet collision checked
    enemyGroundCollision(); //Collision between enemy and ground checked
    
    // Bullet movement
    if (bullet.get(LedSpriteProperty.Y) > 0) {
        bullet.change(LedSpriteProperty.Y, 0 - bulletSpeed);
    }
    
    // Pause 100 ms for slow and steady bullet movement.
    basic.pause(100);
    checkBulletBoundaries(); //Checks collision between bullet and ceiling
});


// Background music is played throughout the execution of the program.
control.inBackground(function on_in_background() {
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Entertainer), music.PlaybackMode.LoopingInBackground);
});
