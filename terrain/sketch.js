// terrain demo (perlin noice, for loops, obj. notation)

let terrain = [];
const NUMBER_OF_RECT = 200;


async function setup() {
  createCanvas(windowWidth, windowHeight);
  generateTerrain ();
}

function draw() {
  background(220);

  fill("darkgreen");
  stroke("darkgreen");

  for ( let theRect of terrain){
    rect(theRect.x,theRect.y,theRect.w,theRect.h);
  }
}

function generateTerrain(){
  let theWidth = width/NUMBER_OF_RECT;
  let time = 0;
  let deltaTime =  0.005;
  for (let i = 0; i < NUMBER_OF_RECT; i ++) {
    let theHeight = noise(time)*height;
    let someRect = spawnRect(theWidth * i, theWidth, theHeight);
    terrain.push(someRect);
    time += deltaTime;
  }
}

function spawnRect(leftSide, rectWidth, rectHeight){

  let theRect = {
    x: leftSide,
    y: height-rectHeight,
    w: rectWidth,
    h: rectHeight,
  };

  return theRect;

}