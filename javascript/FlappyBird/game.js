// Global variables

// Bird coordinates
let birdY: number = 1;
const birdX: number = 1;

// Pipe LED coordinates
let pipeX: number = 5;
let pipeYPoints = [1, 0, 4];

// Game states
let pauseDown: boolean = false;
let gameOver: boolean = false;
let gameStarted: boolean = false;

let score = 0; //score


// Resets global variables to initial value
function resetVariables() {
    birdY = 1;

    pipeX = 5;
    pipeYPoints = [1, 0, 4];

    pauseDown = false;
    gameOver = false;

    score = 0;
}


basic.forever(function on_forever() {
    if (gameStarted) {
        basic.clearScreen();

        if (gameOver) {
            game.pause();
            game.setScore(score);
            game.gameOver();
        }

        led.plotBrightness(1, birdY, 255);
        
        for (let i = 0; i < pipeYPoints.length; i++) {
            led.plotBrightness(pipeX, pipeYPoints[i], 100);
        }

        pipeCollisionCheck();
    } else {
        basic.clearScreen();
        basic.showString("Flappy Bird! Press Button A to play.");
    }
});

loops.everyInterval(500, function() {
    if (gameStarted) {
        if (birdY >= 4) gameOver = true;
        if (!pauseDown) birdY++;

        if (pipeX < 0) {
            generateRandomPipePoints();
            pipeX = 5;
            score++;
        }
        pipeX--;
    }
});


input.onButtonPressed(Button.A, function() {
    resetVariables();
    led.stopAnimation();
    gameStarted = !gameStarted;
});

input.onButtonPressed(Button.B, function() {
    if (gameStarted) {
        birdY--;
        pauseDown = true;
        basic.pause(250);
        birdY--;
        pauseDown = false;
    }
});


function pipeCollisionCheck() {
    for (let i = 0; i < pipeYPoints.length; i++) {
        if (birdX == pipeX && pipeYPoints[i] == birdY) gameOver = true;
    }
}

function generateRandomPipePoints() {
    let yPoints = [];

    let emptyPoint1 = randint(1, 3);
    let emptyPoint2 = randint(1, 3);

    while (Math.abs(emptyPoint2 - emptyPoint1) != 1) {
        emptyPoint2 = randint(1, 3);
    }

    for (let n = 0; n <= 4; n++) {
        if (n != emptyPoint1 && n != emptyPoint2) {
            yPoints.push(n);
        }
    }

    pipeYPoints = yPoints;
}
