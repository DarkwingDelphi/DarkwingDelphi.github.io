let gameState = "start";
let playerImage, doorImage, fartSound;
let gravity = 0.25;
let jumpForce = -7;
let score = 0;
let startTime;
let finger;

function preload() {
  playerImage = loadImage("finger.png");
  doorImage = loadImage("door.png");
  soundFormats('mp3');
  fartSound = loadSound("fart.mp3", () => {}, () => {});
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  finger = new Finger();
  textAlign(CENTER, CENTER);
  setTimeout(() => resizeCanvas(window.innerWidth, window.innerHeight), 200); // delay resize for iOS
}

function draw() {
  background(240);

  if (gameState === "start") {
    fill(0);
    textSize(32);
    text("DON’T TOUCH THE DOOR", width / 2, height / 2 - 30);
    textSize(18);
    text("Tap to start", width / 2, height / 2 + 10);
  }

  else if (gameState === "play") {
    let doorW = width * 0.4;
    let doorH = doorW * 1.5;
    imageMode(CENTER);
    image(doorImage, width / 2, height - doorH / 2, doorW, doorH);
    finger.update();
    finger.show();

    if (
      finger.y + finger.h / 2 > height - doorH &&
      finger.x > width / 2 - doorW / 2 &&
      finger.x < width / 2 + doorW / 2
    ) {
      if (fartSound.isLoaded()) fartSound.play();
      gameState = "end";
    }

    score = floor((millis() - startTime) / 100);
    fill(0);
    textSize(18);
    text("Score: " + score, width / 2, 30);
  }

  else if (gameState === "end") {
    fill(0);
    textSize(28);
    text("YOU TOUCHED THE DOOR", width / 2, height / 2 - 20);
    textSize(20);
    text("Final Score: " + score, width / 2, height / 2 + 20);
    text("Tap to restart", width / 2, height / 2 + 60);
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
    this.w = width * 0.5;
    this.h = this.w * 1.5;
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

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}
