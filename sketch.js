let gameState = "start";
let playerImage, doorImage, fartSound;
let gravity = 0.2;
let jumpForce = -5;
let doorHeight, doorWidth = 120;
let score = 0;
let startTime;
let finger;

function preload() {
  playerImage = loadImage("finger.png");
  doorImage = loadImage("door.png");
  soundFormats('mp3');
  fartSound = loadSound("fart.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  finger = new Finger();
  doorHeight = height / 3;
  textAlign(CENTER, CENTER);
  textSize(32);
}

function draw() {
  background(240);

  if (gameState === "start") {
    fill(0);
    textSize(36);
    text("DON’T TOUCH THE DOOR", width / 2, height / 2);
    textSize(20);
    text("Tap to start", width / 2, height / 2 + 50);
  }

  else if (gameState === "play") {
    drawDoor();

    finger.update();
    finger.show();

    if (
      finger.y + finger.h / 2 > height - doorHeight &&
      finger.x > width / 2 - doorWidth / 2 &&
      finger.x < width / 2 + doorWidth / 2
    ) {
      fartSound.play();
      gameState = "end";
    }

    score = floor((millis() - startTime) / 100);
    fill(0);
    textSize(20);
    text("Score: " + score, width / 2, 40);
  }

  else if (gameState === "end") {
    fill(0);
    textSize(36);
    text("YOU TOUCHED THE DOOR", width / 2, height / 2);
    textSize(24);
    text("Final Score: " + score, width / 2, height / 2 + 50);
    textSize(18);
    text("Tap to restart", width / 2, height / 2 + 100);
  }
}

function drawDoor() {
  imageMode(CENTER);
  image(doorImage, width / 2, height - doorHeight / 2, doorWidth, doorHeight);
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
    this.w = 60;
    this.h = 60;
    this.reset();
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2 - doorHeight;
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  doorHeight = height / 3;
}
