// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const PARTICLES_PER_CLICK = 100;

class Particle {
  constructor (x,y) {
    this.x = x ;
    this.y = y;
    this.dx = random (-5,5);
    this.dy = random(-5,5);
    this.diameter = 5; 
    this.r = 255;
    this.g = 0;
    this.b  = 0;
    this.opacity = 255;
   
  }
  display ()   {
    noStroke() ;
    fill(this.r,this.g ,this.b ,this.opacity);
    circle(this.x, this.y, this.diameter);
  }

  update () {
    this.x += this.dx; 
    this.y += this.dy;

    this.opacity--;
  }
}

let fireworks = [];
async function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background('black');
  for (let item of fireworks) {
    fireworks.update();
    fireworks.display();
  }
}

function mousePressed () {
  for ( let i = 0 ; i < PARTICLES_PER_CLICK ; i++) {
    let someFirework = new Particle(mouseX, mouseY);
    fireworks.push(someFirework);
  }
}

