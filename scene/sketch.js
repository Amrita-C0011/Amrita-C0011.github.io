// Interactive scene - Flappy Bird rip off ver.
// Amrita C.
// october 16th

//references:
//https://editor.p5js.org/jm8785/sketches/r0DMO5Mqj

//Exta for experts:
// used classes to organize my code
// used the smooth() function to soften the edges of the pipe images
// 

//defining the global scope variables

let bird;
let pipes = []; 
let gameStart = false ; 

let birdImage;  
let pipeimg;
let bg;
let font;

let counter = 0;

let gameSettings = {
  gravity: 0.6,
  lift:-15,
  velocity:0,
  speed:5,
};

//functions

async function setup() {

  // setting up the canvas and bg image
  bg = await loadImage ("background-day.png");
  createCanvas(windowWidth, windowHeight);

  //adding in the character and obstacles
  birdImage = await loadImage ("yellowbird-midflap.png");
  pipeimg = await loadImage ("pipe-green.png"); 

  //bird and pipe loop 
  bird = new Bird (20, height/2);
  pipes.push(new Pipe());
 
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
    pipes.push(new Pipe()); 
  }

  gameOver();
}

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
    background(0);
    fill("white");
    text("GAME OVER", width/2, height/2);

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
      pipes.splice(i,1); 
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
   
    // settings of the bird character
    this.gravity = gameSettings.gravity; 
    this.lift = gameSettings.lift; 
    this.velocity = gameSettings.velocity; 
  }

  show() {   
    image(birdImage,this.x,this.y); //initiaizing the loading of the bird character
  }

  update () {
    // physics / logical functions: 

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
    this.speed = gameSettings.speed;

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

    smooth();
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
