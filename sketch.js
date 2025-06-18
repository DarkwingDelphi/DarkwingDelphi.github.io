let gameState = "start"; // start, play, end
let ball;
let gravity = 0.2;
let jumpForce = -5;
let doorHeight;
let doorWidth = 100;
let score = 0;
let startTime;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ball = new Ball();
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

    ball.update();
    ball.show();

    if (
      ball.y + ball.r > height - doorHeight &&
      ball.x > width / 2 - doorWidth / 2 &&
      ball.x < width / 2 + doorWidth / 2
    ) {
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
  fill(139, 69, 19);
  rect(width / 2 - doorWidth / 2, height - doorHeight, doorWidth, doorHeight, 5);
  fill(255, 215, 0);
  ellipse(width / 2 + doorWidth / 2 - 15, height - doorHeight + doorHeight / 2, 10);
  fill(255);
  textSize(24);
  text("CAKE", width / 2, height - doorHeight / 2);
}

function touchStarted() {
  if (gameState === "start") {
    gameState = "play";
    startTime = millis();
    ball.reset();
  } else if (gameState === "play") {
    ball.jump();
  } else if (gameState === "end") {
    gameState = "start";
    score = 0;
  }
  return false;
}

class Ball {
  constructor() {
    this.r = 20;
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

    if (this.y > height - this.r) {
      this.y = height - this.r;
      this.vy = 0;
    }
  }

  show() {
    fill(0, 100, 255);
    ellipse(this.x, this.y, this.r * 2);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  doorHeight = height / 3;
}
