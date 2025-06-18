let gameState = "start";
let playerImage, doorImage, fartSound;
let gravity = 0.2;
let jumpForce = -5;
let score = 0;
let startTime;
let finger;

let canvasW = 240; // tight fit around the game
let canvasH = 360;

function preload() {
  playerImage = loadImage("finger.png");
  doorImage = loadImage("door.png");
  soundFormats('mp3');
  fartSound = loadSound("fart.mp3");
}

function setup() {
  createCanvas(canvasW, canvasH);
  finger = new Finger();
  textAlign(CENTER, CENTER);
  textSize(20);
}

function draw() {
  background(240);

  if (gameState === "start") {
    fill(0);
    text("DON’T TOUCH THE DOOR", width / 2, height / 2 - 20);
    textSize(14);
    text("Tap to start", width / 2, height / 2 + 10);
  }

  else if (gameState === "play") {
    imageMode(CENTER);
    image(doorImage, width / 2, height - 150, 200, 300); // door stays at bottom

    finger.update();
    finger.show();

    if (
      finger.y + finger.h / 2 > height - 150 &&
      finger.x > width / 2 - 100 &&
      finger.x < width / 2 + 100
    ) {
      fartSound.play();
      gameState = "end";
    }

    score = floor((millis() - startTime) / 100);
    fill(0);
    textSize(14);
    text("Score: " + score, width / 2, 20);
  }

  else if (gameState === "end") {
    fill(0);
    textSize(24);
    text("YOU TOUCHED THE DOOR", width / 2, height / 2 - 10);
    textSize(16);
    text("Final Score: " + score, width / 2, height / 2 + 20);
    text("Tap to restart", width / 2, height / 2 + 50);
  }
}

function touchStarted() {
  if (gameState === "start") {
    gameState = "play";
    startTime = millis();
    finger.reset();
  } else if (gameState === "play") {
    finger.jump();
  } else if (gameState === "end") {
    gameState = "start";
    score = 0;
  }
  return false;
}

class Finger {
  constructor() {
    this.w = 240;
    this.h = 360;
    this.reset();
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2 - 100;
    this.vy = 0;
  }

  jump() {
    this.vy = jumpForce;
  }

  update() {
    this.vy += gravity;
    this.y += this.vy;

    if (this.y > height - this.h / 2) {
      this.y = height - this.h / 2;
      this.vy = 0;
    }
  }

  show() {
    imageMode(CENTER);
    image(playerImage, this.x, this.y, this.w, this.h);
  }
}
