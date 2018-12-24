

// Constants
var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var bgParticlesLimit = 1000;
var bgParticles = [];

var mousePositions = [];
var ship = null;
var missles = [];

var asteroidsLimit = 10;
var asteroids = [];
var xPos;
var yPos;

var Y_AXIS = 1;
var X_AXIS = 2;
var c1, c2;
var explosion;
var mode = 1;
var health = 100;
var points = 0;


// base set up
function setup() {
    createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
    frameRate(60);
    noFill();
}

function draw() {

    drawBackground();

    switch (mode) {
        default:
        case 1:
            showStartGame();
            break;
        case 2:
            noCursor();
            drawShip();
            drawMissles();
            drawAsteroids();
            handleCollisions();
            handleMissleCollisions();
            showHealth();
            break;
    }
}

function showStartGame() {
    textSize(60);
    text('Start game?', WINDOW_WIDTH / 5, WINDOW_HEIGHT / 2);
}

function showHealth() {
    rect(25, 25, 100, 50);
    fill(255, 200, 0);
    rect(25, 25, health, 50);
    noFill();
}


function handleMissleCollisions() {

    // with missles
    for (var asteroidIndex = 0; asteroidIndex < asteroids.length; asteroidIndex++) {
        var asteroid = asteroids[asteroidIndex];

        // Missiles with asteroids
        for (var missleIndex = 0; missleIndex < missles.length; missleIndex++) {
            var missle = missles[missleIndex];

            if (isCollision(asteroid, missle)) {
                asteroids.splice(asteroidIndex, 1);
                missles.splice(missleIndex, 1);
            }
        }

    }
}

function handleCollisions() {

    // with missles
    for (var asteroidIndex = 0; asteroidIndex < asteroids.length; asteroidIndex++) {
        var asteroid = asteroids[asteroidIndex];

        // collision with ship
        if (isCollision(asteroid, { x: xPos, y: yPos, w: 5 })) {
            text('HIT', 15, 30, 100, 50);
            health = health - 25;
            if (health <= 0) {
                endGame();
            }
            asteroids.splice(asteroidIndex, 1);
            return;
        }
    }
}

function drawBackground() {

    // redraw background
    background(42);

    if (bgParticlesLimit > bgParticles.length) {
        buildNightSky();
    }

    for (var starIndex = 0; starIndex < bgParticles.length; starIndex++) {
        var star = bgParticles[starIndex];
        star.y = star.y + random(1, 5); // get random speed

        // recycle star if it's at the bottom
        if (star.y > WINDOW_HEIGHT) {
            star.y = 0
            star.x = random(0, WINDOW_WIDTH);
        }

        stroke(255);
        ellipse(star.x, star.y, star.w, star.h);
    }

}

function drawAsteroids() {

    if (asteroids.length < asteroidsLimit) {
        buildAsteroids();
    }

    for (var starIndex = 0; starIndex < asteroids.length; starIndex++) {
        var star = asteroids[starIndex];
        star.y = star.y + 8;

        // recycle star if it's at the bottom
        if (star.y > WINDOW_HEIGHT) {
            star.y = 0
            star.x = random(0, WINDOW_WIDTH);
        }
        stroke(255);
        ellipse(star.x, star.y, star.w, star.h);
    }
}

function buildAsteroids() {

    for (var starIndex = 0; starIndex < asteroidsLimit; starIndex++) {

        var range = random(60, 100);
        var size = random(20, range);

        var w = size;
        var h = size;
        var x = random(0, WINDOW_WIDTH);
        var y = -30

        var newAsteroid = {
            x: x, y: y,
            w: w, h: h,
        };

        addAsteroidIfPossible(newAsteroid);
    }
}

function addAsteroidIfPossible(a) {

    for (var asteroidIndex = 0; asteroidIndex < asteroids.length; asteroidIndex++) {
        var asteroid = asteroids[asteroidIndex];
        if (isCollision(asteroid, a)) {
            return;
        }
    }

    asteroids.push(a);
}

function drawShip() {

    if (!xPos || !yPos) {
        xPos = mouseX;
        yPos = mouseY;
    }

    var easing = .08;
    var targetX = mouseX;
    var dx = targetX - xPos;

    xPos += dx * easing;

    var targetY = mouseY;
    var dy = targetY - yPos;
    yPos += dy * easing;

    var offset = 15;
    stroke(255);
    triangle(xPos + offset, yPos + offset, xPos - offset, yPos + offset, xPos, yPos - offset);
}

function drawMissles() {
    for (var mIndex = 0; mIndex < missles.length; mIndex++) {
        var missle = missles[mIndex];

        missle.y = missle.y - 20;

        if (missle.y > WINDOW_HEIGHT) {
            missles.splice(mIndex, 1);
        }

        stroke(250, 120, 120);
        ellipse(missle.x, missle.y, missle.w, missle.h);
    }
}

function buildNightSky() {

    for (var starIndex = 0; starIndex < bgParticlesLimit; starIndex++) {

        var w = random(2, 4);
        var h = random(2, 4);
        var x = random(0, WINDOW_WIDTH);
        var y = random(0, WINDOW_HEIGHT);

        bgParticles.push({
            x: x, y: y,
            w: w, h: h,
        });
    }
}

function mouseClicked() {

    if (mode === 1) {
        startGame();
    }

    // always set the current mouse position
    addMissle(xPos, yPos);
}

function startGame() {
    mode = 2;
    health = 100;
    points = 0;
}

function endGame() {
    mode = 1;
}

function addMissle(x, y) {

    missles.push({
        x: x, y: y,
        w: 3, h: 10,
    });
}

function mouseMoved() {
    mousePositions.push({ x: mouseX, y: mouseY });
    if (mousePositions.length > 1000) {
        mousePositions.splice(0, 1);
    }
}

function isCollision(c1, c2) {
    return dist(c1.x, c1.y, c2.x, c2.y) < c1.w + c2.w;
}

