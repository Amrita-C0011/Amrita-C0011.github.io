// Interactive scene - Flappy Bird rip off ver.
// Amrita C.// September 22nd


//
//References:
//-https://www.youtube.com/watch?v=cXgA1d_E-jY ( Video tutorial)
//-https://editor.p5js.org/jonfroehlich/sketches/sFOMDuDaw (written tutorial)
//- https://gameprogrammingpatterns.com/game-loop.html (To learn more about game loops)
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// bird
let bird;


// game default
let gameOver = false;
let gameStart = false; 
let score = 0;

//obstacles 
let obstacles;
let HorDistance; // Space between each new obstacle
let VerDistance;



async function setup() {
  createCanvas(windowWidth, windowHeight);
  HorDistance = width / 3;

}


function draw() {
  background(220);
}

