// Interactive scene - Flappy Bird rip off ver.
// Amrita C.
// october 16th

//https://editor.p5js.org/jm8785/sketches/r0DMO5Mqj

//improvements:
// - counter not working 
//fix up screen size 
//- add object notations
//- fix up comments 
//- proper use of whitespace
//- keep a clean draw function, createexternal functions to keep it concisee 
// - add sound effects for extra for experts

let bird;
let pipes = []; 
let gameStart = false ; 

let birdImage;  
let bg;
let pipeimg;

let counter = 0;


async function setup() {
  bg = await loadImage ("background-day.png");
  createCanvas(windowWidth, windowHeight);

  bird = new Bird (20, height/2);
  pipes.push(new Pipe());


  birdImage = await loadImage ("yellowbird-midflap.png");
  pipeimg = await loadImage ("pipe-green.png");
}

function draw() { 
  background(bg);
  pipesArray();
  
  bird.show();
  bird.update();
  
  if (gameStart === false) {
    startScreen();
  }

  if (frameCount % 200 === 0 ) {
    pipes.push(new Pipe()); // add it back 
  }

  gameOver();
}

// creating a start screen
function startScreen() {
  if (gameStart === false) {
    background (0);
    fill ("white");
    text ("Click anywhere on the screen to begin :)", width/2, height/2);
    textSize (50);
    textAlign(TOP,RIGHT);
  
  }
}
function mouseClicked(){
  gameStart = true;
} 

function gameOver(){
  fill ("red");
  text ("Total hits:" + counter, width/2, height/2);
  textSize (50);
  textAlign(CENTER);
  if (counter === 3){
    noLoop();

  }
}

function pipesArray () {
  for (let i = pipes.length- 1 ; i>= 0; i--) { 
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hits(bird) && !pipes[i].highlight) {
      counter++;
      pipes[i].highlight=true;
      console.log(counter);
    }

    if (pipes[i].done()) {
      pipes.splice(i,1); //Take out a pipe
    }
  }
}
function keyPressed () {
  if (key === ' ') {
    bird.goUp();
  }
}


// defining classes
class Bird {
   constructor (x,y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 10;
   
    this.gravity = 0.6; // bird falls when nothing is done to it
    this.lift = -15; // controls the strength of the jump
    this.velocity = 0; // still at the start

  }

  show() {   
    image(birdImage,this.x,this.y);
 
 
  }

  update () {
    this.velocity += this.gravity;// Velocity increases due to gravity
    this.velocity*= 0.9; // air resistance to keep the jump strength limited
    this.y += this.velocity; // y changes relative to velocity

    if (this.y > height - this.height) {
      this.y = height - this.height;
      this.velocity = 0; // stops at the bottom edge
    }
    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0; // stops at the top edge
    }
  }

  goUp(){
    this.velocity += this.lift;
  }
}


class Pipe{

  constructor (x,y) {
    this.top = random(height/2); 
    this.bottom = random(height/2); 
    this.x = width;
    this.w = 40;
    this.speed = 5;

    this.hightlight = false;
  }
  
  hits(bird) {
    
    if (bird.y < this.top || bird.y > height - this.bottom ) {
      if (bird.x > this.x && bird.x < this.x + this.w ) {
        this.hightlight = true; 
        return true;
      }
    }
    return false;
  } 

  show(){

    image(pipeimg, this.x,0,this.w,this.top);
    image(pipeimg, this.x,height- this.bottom, this.w,this.bottom);
  }


  update () {
    this.x -= this.speed; // makes the pipes move to the left constantly
  }

  done (){
    return this.x < -this.w;
  }
}
