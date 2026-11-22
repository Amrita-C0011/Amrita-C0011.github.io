// 2d array project
// Amrita C. 
// NOvember 9th
//

// setting up the grid 
const CELL_SIZE = 150;
let rows= 4; //hard coding in the amount of rows and columns so that the grid dosent stretch when made fullscreen
let cols = 4;
let apple;
let bg;

let charIMG;
let character = {
  x :0, 
  y: 0,
};

let ingredientIMG = [];
let ingredientData = []; // to hold all of the image files with their individual x and y positions 

//timer variables ( based off of millis demo) 
let gameTimer = 5;
let timeLeft = gameTimer;
let startTime = 0;
let gameStart = false; // game state
let gameOver = false;

async function setup() {

  let win = createCanvas(cols*CELL_SIZE, rows*CELL_SIZE);
  win.parent("the-canvas");

   bg = await loadImage ("witch house.png");
  // bg.parent("bg-image");
  charIMG = await loadImage ("witch bg removed.png");

  ingredientIMG = [  
    await loadImage ("apple.png"),
    await loadImage ("beetroot.png"),
    await loadImage ("bell pepper red.png"),
    await loadImage ("cherry.png"),
    await loadImage ("chicken wing.png"),
    await loadImage ("cheese brie.png"),
    await loadImage ("raspberry.png"),

  ];

  for (let img of ingredientIMG) {
    ingredientData.push({
      img: img, // assigns individual random coordinates to each ingredient
      x: floor(random(cols)),
      y: floor(random(rows))
    });
  }
}

function draw() {
  background(250);
  displayGrid();
  timer();

}


function displayGrid() {
  // tint();
  image(bg,0,0,cols*CELL_SIZE, rows*CELL_SIZE);

  

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
      stroke('gray');
      strokeWeight(4);
      noFill();
    }
  }
  // ingredient data now has every img and will draw themn here 
  for (let item of ingredientData) {
    image(item.img, item.x * CELL_SIZE, item.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  }
  image(charIMG, character.x * CELL_SIZE, character.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}
function timer() {
  //start timer
  if (!gameStart) {
    startTime = millis();
    timerStarted = true;
  }

  let timePassed = millis() -startTime;
  let millisLeft = (gameTimer * 1000)- timePassed;
  
  
  timeLeft = Math.floor(millisLeft / 1000);

  if (timeLeft=== 0) {
    gameOver = true;

  }
  // Draw the timer text on the canvas
    textSize(40);
    textAlign(CENTER, CENTER);
    fill(255, 0, 0);
    text("Time's Up!", width / 2, height / 2);

    noLoop();
}

// moving the witch around
function keyPressed() {
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
  if (!gameOver && x >= 0 && x < cols && y >= 0 && y < rows) {

    character.x = x;
    character.y = y;

    collisionDetection();
  }
}

function collisionDetection(){
  // check loop backwards so nothing is left out 
  for ( let i = ingredientData.length - 1; i >= 0; i--){ //  set i velue to length - 1 becuase lenht is 3 but index is 2 
    let item = ingredientData[i];

    if (character.x === item.x && character.y === item.y) {
      console.log("Collected an ingredient!"); // check if they collide 
      // working!

      ingredientData.splice(i, 1); // get itm of the screen, loong backwadsmakes sure that nothing gets left out 

    }
  }
}