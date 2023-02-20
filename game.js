let snake;
let food;
let scl = 30;
let score = 0;
let gameStarted = false; // Initialize flag to false

function setup() {
  createCanvas(windowWidth, windowHeight);
  snake = new Snake();
  pickLocation();
  frameRate(10);
}

function draw() {
  // Set the background color to a dark shade of gray
  background(255);

  if (gameStarted) { // Only update if game has started
    // If the snake has eaten the food, move the food to a new location and increase the score
    if (snake.eat(food)) {
      pickLocation();
      score++;
    }
    // Check if the snake has died (hit itself or gone off the screen)
    snake.death();
    // Update the position of the snake
    snake.update();
  }

  // Draw the snake on the canvas
  snake.show();
  // Draw the food on the canvas as a red rectangle
  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl);

  // Display the current score and high score in white text
  textSize(32);
  fill(0);
  text("Your current score: " + score, 10, 40);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    snake.dir(0, 1);
  } else if (keyCode === LEFT_ARROW) {
    snake.dir(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    snake.dir(1, 0);
  }
}

function pickLocation() {
  let cols = floor(width / scl);
  let rows = floor(height / scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function restartGame() {
  score = 0;
  snake = new Snake();
  pickLocation();
  gameStarted = false; // Reset the gameStarted flag
}

class Snake {
  constructor() {
    // Calculate the center of the canvas
    let x = Math.floor(width / (2 * scl)) * scl;
    let y = Math.floor(height / (2 * scl)) * scl;

    // Initialize the head of the snake at the center of the canvas
    this.x = x;
    this.y = y;
    this.xSpeed = 1;
    this.ySpeed = 0;
    this.tail = [];
  }

  dir(x, y) {
    this.xSpeed = x;
    this.ySpeed = y;
  }

    update() {
      // add the current head position to the beginning of the tail array
      this.tail.unshift(createVector(this.x, this.y));

      // remove the last element of the tail array if the length of the tail array is greater than the score
      if (this.tail.length > score) {
        this.tail.pop();
      }

      // update the position of the head
      this.x += this.xSpeed * scl;
      this.y += this.ySpeed * scl;

      this.x = constrain(this.x, 0, width - scl);
      this.y = constrain(this.y, 0, height - scl);
    }

    death() {
      // Check if the snake's head goes off the screen
      if (this.x === 0 || this.x + scl === width || this.y === 0 || this.y + scl === height) {
        alert("Game over! Your score is: " + score);
        startBtn.style.display = "block";
        score = 0;
        restartGame();
        gameStarted = false; // Reset the gameStarted flag
      }

      // Check if the snake hits its tail
      for (let i = 0; i < this.tail.length; i++) {
        let d = dist(this.x, this.y, this.tail[i].x, this.tail[i].y);
        if (d < 1) {
          alert("Game over! Your score is: " + score);
          startBtn.style.display = "block";
          score = 0;
          restartGame();
          gameStarted = false; // Reset the gameStarted flag
        }
      }
    }

    eat(pos) {
      let d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        return true;
      } else {
        return false;
      }
    }

    show() {
      fill(255);
      for (let i = 0; i < this.tail.length; i++) {
        rect(this.tail[i].x, this.tail[i].y, scl, scl);
      }
      rect(this.x, this.y, scl, scl);
    }
  }

    let startBtn = document.getElementById("startBtn");
    startBtn.addEventListener("click", function() {
      startBtn.style.display = "none";
      setup();
      gameStarted = true; // Set the gameStarted flag to true
    });