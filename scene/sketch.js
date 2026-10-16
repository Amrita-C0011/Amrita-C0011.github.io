// Interactive scene - Flappy Bird rip off ver.
// Amrita C.
// october 16th

//improvements:
//- mouse interaction start and end screen 
//- bg image and characters
//- add object notations as a replacement for this.blah 
//- fix up comments 
//- proper use of whitespace
//- keep a clean draw function, createexternal functions to keep it concisee 
// - add sound effects for extra for experts

let bird;
let pipes = []; 

async function setup() {
  createCanvas(windowWidth, windowHeight);
  bird = new Bird (20, height/2);
  pipes.push(new Pipe());
}


function draw() { 
  background(220);
  

  // display pipes continously 
  for (let i = pipes.length- 1 ; i>= 0; i--) { 
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hits(bird)) {
      console.log("HiT");
    }

    if (pipes[i].done()) {
      pipes.splice(i,1); //Take out a pipe
    }
  }

  bird.show();
  bird.update();


  if (frameCount % 200 === 0 ) {
    pipes.push(new Pipe()); // add it back 
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
    fill (0);
    rect(this.x, this.y, 80,20);
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


class Pipe {

  constructor (x,y) {
    this.top = random(height/2); 
    this.bottom = random(height/2); 
    this.x = width;
    this.w = 20;
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
    fill (128,128,128);
    if (this.hightlight) {
      fill (255,0,0);
    }
    rect(this.x,0,this.w,this.top);
    rect(this.x,height- this.bottom, this.w,this.bottom);
  }


  update () {
    this.x -= this.speed; // makes the pipes move to the left constantly
  }

  done (){
    return this.x < -this.w;
  }
}