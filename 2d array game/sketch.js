// 2d array project
// Amrita C. 
// NOvember 9th
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// setting up the grid 
const CELL_SIZE = 180;
let rows;
let cols;
let bg;

async function setup() {
  rows = Math.floor(windowHeight* 0.85/CELL_SIZE);
  cols = Math.floor(windowWidth* 0.85/CELL_SIZE);
  bg = await loadImage ("witch house.png");
  let win = createCanvas(cols*CELL_SIZE, rows*CELL_SIZE);
  win.parent("the-canvas");
}

function draw() {
  background(250);
  displayGrid();
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
}

