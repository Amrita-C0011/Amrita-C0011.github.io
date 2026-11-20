// 2d array project
// Amrita C. 
// NOvember 9th
//
// Extra for Experts:

// setting up the grid 
const CELL_SIZE = 150;
let rows= 4; //hard coding in the amount of rows and columns so that the grid dosent stretch when made fullscreen
let cols = 4;
let bg;
let apple;

let charIMG;
let character = {
  x :0, 
  y: 0,
};
let ingredients= {
  x: 0,
  y: 0,
};

let ingredientIMG = [];
let currentIngredient;

async function setup() {

  let win = createCanvas(cols*CELL_SIZE, rows*CELL_SIZE);
  win.parent("the-canvas");

  bg = await loadImage ("witch house.png");
  charIMG = await loadImage ("witch bg removed.png");
  ingredientIMG = [  
    await loadImage ("apple.png"),
    await loadImage ("beetroot.png"),
    await loadImage ("bell pepper red.png"),
    await loadImage ("cherry.png"),
    await loadImage ("chicken wing.png"),
  //   { img: await loadImage("apple.png"), x: floor(random(cols)), y: floor(random(rows)) },
  //   { img: await loadImage("beetroot.png"), x: floor(random(cols)), y: floor(random(rows)) },
  //   { img: await loadImage("bell pepper red.png"), x: floor(random(cols)), y: floor(random(rows)) },
  //   { img: await loadImage("cherry.png"), x: floor(random(cols)), y: floor(random(rows)) },
  //   { img: await loadImage("chicken wing.png"), x: floor(random(cols)), y: floor(random(rows)) }
  ];


  ingredients.x = floor(random(cols));
  ingredients.y = floor(random(rows));
 
  currentIngredient = random(ingredientIMG);
}

function draw() {
  background(250);
  displayGrid();
  // ingredientSpawn();

}


function displayGrid() {
  image(bg,0,0,cols*CELL_SIZE, rows*CELL_SIZE);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
      stroke('gray');
      strokeWeight(4);
      noFill();
    }
  }
  image(charIMG, character.x * CELL_SIZE, character.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  let fruitIMG = [0,1,2,3,4];
  for (let fruit of fruitIMG)  {
    image (currentIngredient,ingredients.x * CELL_SIZE, ingredients.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  }
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
  if (x >= 0 && x < cols && y >= 0 && y < rows) {

    character.x = x;
    character.y = y;
  }
}

// async function ingredientSpawn(){
  
// let beetroot  = await loadImage ("beetroot.png");
// let bellPepper = await loadImage ("bell pepper red.png");
// let cherry  = await loadImage ("cherry.png");
// let chicken  = await loadImage ("chicken wing.png");

// }