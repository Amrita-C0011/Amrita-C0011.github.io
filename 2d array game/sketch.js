// 2d array project
// Amrita C. 
// NOvember 9th
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// setting up the grid 
const CELL_SIZE = 20;
let grid;
let square;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  if (width < height){
    square = width/ CELL_SIZE;
  }
  else {
    square = height/  
  }
}

function draw() {
  background(220);
}
