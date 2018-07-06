

// Constants
var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var bgParticlesLimit = 500;
var bgParticles = [];

var mousePositions = [];
var ship = null;
var missles = [];

var asteroidsLimit = 2;


var Y_AXIS = 1;
var X_AXIS = 2;
var c1, c2;

// base set up
function setup() {

    createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
    frameRate(20);
    noCursor();
}

function draw() {

    drawBackground();

    drawShip();

    // drawMouseTrail();

    drawMissles();

    drawAsteroids();
}

function drawBackground() {
    
    // redraw background
    background(42);

    if (bgParticlesLimit > bgParticles.length) {
        buildNightSky();
    }

    for (var starIndex = 0; starIndex < bgParticles.length; starIndex++) {
        var star = bgParticles[starIndex];
        stroke(random(0, 100));
        star.y = star.y + random(1, 5); // get random speed

        // recycle star if it's at the bottom
        if (star.y > WINDOW_HEIGHT) {
            star.y = 0
            star.x = random(0, WINDOW_WIDTH);
        }

        ellipse(star.x, star.y, star.w, star.h); 
    }

}

function drawAsteroids () {

}

function drawShip() {
    var offset = 15;
    triangle(mouseX + offset, mouseY + offset, mouseX - offset, mouseY + offset, mouseX , mouseY - offset);

    for(var mIndex = 0; mIndex < missles.length; mIndex++) {
        var missle = missles[mIndex];

        missle.y = missle.y - 20; // get random speed

        if (missle.y > WINDOW_HEIGHT) {

        }

        stroke(250, 120, 120);
        ellipse(missle.x, missle.y, missle.w, missle.h); 
    }
}

function drawMouseTrail(){
    for (var index = 0; index < mousePositions.length; index++) {
        var pos = mousePositions[index];
        stroke(255, 0, 0);
        ellipse(pos.x, pos.y, 2, 2); 
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

        var range = random(2, 4);

        var w = random(2, range);
        var h = random(2, range);
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
    addMissle(mouseX, mouseY);

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

    if (mousePositions.length > 20) {
        mousePositions.splice(0, 1);
    }

}

