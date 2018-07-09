

// Constants
var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var bgParticlesLimit = 500;
var bgParticles = [];

var mousePositions = [];
var ship = null;
var missles = [];

var asteroidsLimit = 3;
var asteroids = [];
var xPos;
var yPos;

var Y_AXIS = 1;
var X_AXIS = 2;
var c1, c2;

// base set up
function setup() {

    createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
    frameRate(60);
    noCursor();
    noFill();
}

function draw() {

    drawBackground();

    drawShip();

    // drawMouseTrail();

    drawMissles();

    drawAsteroids();

    handleCollisions();

}

function handleCollisions() {

    // with missles
    for (var asteroidIndex = 0; asteroidIndex < asteroids.length; asteroidIndex++) {
        var asteroid = asteroids[asteroidIndex];

        // with ship
        if (isCollision(asteroid, {x: xPos, y: yPos, w: 5})) {
            text('HIT', 15, 30, 100, 50); 
        }

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

function drawExplosion() {
    
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

function drawAsteroids () {

    if (asteroids.length < asteroidsLimit) {
        buildAsteroids();
    }

    for (var starIndex = 0; starIndex < asteroids.length; starIndex++) {
        var star = asteroids[starIndex];
        star.y = star.y + 8; // get random speed

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

        asteroids.push({
            x: x, y: y,
            w: w, h: h,
        });
    }

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
    triangle(xPos + offset, yPos + offset, xPos - offset, yPos + offset, xPos , yPos - offset);


    // missiles
    for(var mIndex = 0; mIndex < missles.length; mIndex++) {
        var missle = missles[mIndex];

        missle.y = missle.y - 20; // get random speed

        if (missle.y > WINDOW_HEIGHT) {
            missles.splice(mIndex);
        }

        stroke(250, 120, 120);
        ellipse(missle.x, missle.y, missle.w, missle.h); 
    }
}

function drawMissles() {
    for(var mIndex = 0; mIndex < missles.length; mIndex++) {
        var missle = missles[mIndex];

        missle.y = missle.y - 20; // get random speed

        if (missle.y > WINDOW_HEIGHT) {

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
    // always set the current mouse position
    addMissle(xPos, yPos);

}

function addMissle(x, y) {

    missles.push({
        x: x, y: y,
        w: 3, h: 10,
    });
}

function mouseMoved() {
    // console.log("Mouse pos: x: " + mouseX + " y: " + mouseY);
    mousePositions.push({ x: mouseX, y: mouseY });

    if (mousePositions.length > 1000) {
        mousePositions.splice(0, 1);
    }

}

function isCollision(c1, c2) {

    return dist( c1.x, c1.y, c2.x, c2.y) < c1.w + c2.w;

}

