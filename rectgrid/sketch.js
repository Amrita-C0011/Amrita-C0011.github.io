// 2d rect grid

const CELL_SIZE = 100;
let rows;
let cols;
let grid;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = Math.floor(height/CELL_SIZE);
  cols = Math.floor(width/CELL_SIZE);
  grid = generateRandomGrid(cols,rows);
}

function draw() {
  background(220);
  displaygrid();
}

function mousepressed(){
  let x =  Math.floor(mouseX/CELL_SIZE);
  let y = Math.floor(mouseY/CELL_SIZE);

  togglecell(x,y);
}

function togglecell(x,y){
  if ( grid [y][x]=== 0) {
    grid [y][x]=== 1;
  }
  if ( grid [y][x]=== 1) {
    grid [y][x]=== 0;
  }
};

function displaygrid () {
  for (let y = 0; y< rows ; y++) {
    for (let x = 0; x< rows ; x++) {
      if (grid [y][x] === 0){
        fill("white");
      }
      else if (grid[y][x]===1) {
        fill ("black");
      }
      square (x* CELL_SIZE, y*CELL_SIZE, CELL_SIZE);
    }
  }
}

function generateRandomGrid(cols,rows) {
  let newgrid = [];
  for (let y = 0; y< rows ; y++) {
    newgrid.push ([]);
    for (let x = 0; x< cols; x++) {
      if(random(100) < 50){
        newgrid[y].push(0);
      }
      else{
        newgrid[y].push(1);
      }
    }
  }
  return newgrid;
}


