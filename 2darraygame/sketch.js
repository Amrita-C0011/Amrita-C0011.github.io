// 2d array project
// Amrita C. 
// November 9th
//
// Extra for experts:
// tried using a do...while loop, reference: https://www.youtube.com/watch?v=v9zgD8wjtbw

//Variables
const CELL_SIZE = 150;
let rows= 4; //hard coding in the amount of rows and columns so that the grid dosent stretch when made fullscreen
let cols = 4;
let apple;
let bg;

//witch character
let charIMG;
let character = {
  x :0, 
  y: 0,
};

let counter = 0;// counter for collision detection

 //ingredients characters 
let ingredientIMG = [];
let ingredientData = []; 

//timer and game state
let gameTimer = 6000;
let timeLeft = gameTimer;
let startTime = 0;
let gameStart = false; 
let gameOver = false;
let gameState = "start";

async function setup() {

  let win = createCanvas(cols*CELL_SIZE, rows*CELL_SIZE);
  win.parent("the-canvas");

  bg = await loadImage ("witch house.png");
  
  charIMG = await loadImage ("witch bg removed.png");
// preloading and storing all the images
  ingredientIMG = [  
    await loadImage ("apple.png"),
    await loadImage ("beetroot.png"),
    await loadImage ("bell pepper red.png"),
    await loadImage ("cherry.png"),
    await loadImage ("chicken wing.png"),
    await loadImage ("cheese brie.png"),
    await loadImage ("raspberry.png"),
  ];

// give individual unique locations to each ingredient
  for (let img of ingredientIMG) {
    let spot = uniqueSpot();

  ingredientData.push({
      img: img,
      x: spot.x,
      y: spot.y
    });
  }
}

function uniqueSpot() {
  let randomX; 
  let randomY;
  let overlap;

  do { // do while loop becuase of uncertain amount of repetition
    overlap = false;
    randomX = floor(random(cols));
    randomY = floor(random(rows));

    // prevent overlap with the witch
    if (randomX === character.x && randomY === character.y) {
      overlap= true;
    }

    //prevent overlap witht the other ingredients
    for(let item of ingredientData) {
      if (item.x=== randomX && item.y ===randomY) {
        overlap = true;
      }
    }
  }
  while (overlap);

  return { x: randomX, y: randomY };
}

function draw() {

  if (gameState === "start") {
    startScreen();
  } 
  else if (gameState === "playing") {
  background(250);
  displayGrid();
  displayCHARandING();
  timer();
  }
}

function startScreen() {

  background("Purple");
  fill("lightGreen");
  textSize(20);

  text("Collect all the ingredients\n    before time runs out", 190, 300);

  text("Press any key to Start", 210,400 );

  text("THE WITCH'S SOUP", 205,180 );

}


function displayGrid() {

  image(bg,0,0,cols*CELL_SIZE, rows*CELL_SIZE);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      stroke('gray');
      strokeWeight(4);
      noFill();
      square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
    }
  }
}

function displayCHARandING(){

  for (let item of ingredientData) {
    image(item.img, item.x * CELL_SIZE, item.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  }

  image(charIMG, character.x * CELL_SIZE, character.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function timer() {

  if (!gameStart) {
    startTime = millis();
    gameStart = true;
  }

  if (!gameOver){
    let timePassed = millis() -startTime;
    timeLeft = gameTimer - timePassed;
  }
  
  textSize(30);
  
  fill(255);
  text("00:0" + Math.floor(timeLeft/1000), 260, 310);

// user has lost
  if (timeLeft <= 0 && !gameOver) {
    gameOver = true;
    clear();
    background("purple");

    textSize(30);
    textAlign(CENTER, CENTER);
    fill(255, 255, 255);
    text("The hungry witch has cursed you!!",300,300);

    noLoop();
  }

  // user has won 
  else if ( timeLeft > 0 && !gameOver && counter===7) {
    gameOver = true;
    clear();
    background("darkGreen");

    textSize(60);
    textAlign(CENTER, CENTER);
    fill(0, 0, 0);
    text("The soup is ready!!",300,300);

    noLoop();
  }
  }

// moving the witch around
function keyPressed() {
  if (gameState === "start") {
    gameState = "playing";
    return;
  }
  if (key === RIGHT_ARROW) {
    movePlayer(character.x + 1, character.y);
  }
  else if (key === LEFT_ARROW) {
    movePlayer(character.x - 1, character.y);
  }
  else if (key === UP_ARROW) {
    movePlayer(character.x, character.y - 1);
  }
  else if (key === DOWN_ARROW) {
    movePlayer(character.x, character.y + 1);
  }
}

// keeping witch inside the grid
function movePlayer(x, y) {
  if ( x >= 0 && x < cols && y >= 0 && y < rows) {

    character.x = x;
    character.y = y;

    collisionDetection();
  }
}

function collisionDetection(){
  // check loop backwards so nothing is left out 
  for ( let i = ingredientData.length - 1; i >= 0; i--){  
    let item = ingredientData[i];

    if (character.x === item.x && character.y === item.y) {

      ingredientData.splice(i, 1); 
      counter++;
    }
  }
}