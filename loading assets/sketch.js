//loading images & sounds 

let img;
let sound;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  img = await loadImage("fruits.png");
  sound = await loadSound("bite-small.wav");
}

function draw() {
  background("black");

  image( img, width/2 , height/2);
}

function mousePressed() {
  sound.play();
}
