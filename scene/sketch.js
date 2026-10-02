// Interactive scene - Flappy Bird rip off ver.
// Amrita C.// September 22nd
//
//References:
//- https://www.youtube.com/watch?v=cXgA1d_E-jY ( Video tutorial)
//- https://editor.p5js.org/jonfroehlich/sketches/sFOMDuDaw (written tutorial)
//- https://gameprogrammingpatterns.com/game-loop.html (To learn more about game loops)
//- https://www.youtube.com/watch?v=5AWRivBk0Gw (to learn about classes and objects)
//- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array (to learn about arrays)
//
// Extra for Experts:
// - Learned about class and implemented it in the code
// -learned about arrays and implemented in the code

let bird;
let pipes = []; // creating an array, they're similar to lists in python
//without an array the game could only display one pipe each reset

if (mouseClicked) {
  loop();
}
else {
  noLoop();
}



// khgcgwekgfuer
async function setup() {
  createCanvas(windowWidth, windowHeight);
  bird = new Bird (20, height/2);
  pipes.push(new Pipe()); //method that adds a new element to the end of an array and returns the new length
}


function draw() { 
// draw () is both updating and rendering the program 
// similar to a standard game loop
  background(220);

  for (let i = pipes.length- 1 ; i>= 0; i--) { 
    //for loop bc the pipes show up over and over
    //(sets the value of i before execution; Defined the condition i must be less than the lengh of pipes; increments the value of i everytime loop executes)
    // for loops should be written backwards so it dosen't skip over elements (huh??)
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hits(bird)) {
      console.log("HiT");

    }

    if (pipes[i].done()) {
      pipes.splice(i,1); //method that removes an element from an array
    }
  }

  bird.show();
  bird.update();


  if (frameCount % 200 === 0 ) {
    pipes.push(new Pipe());
  // each time th enumebr of frames is divisable by 40, a new pipe is added to the end of the array
  }
}


  


function keyPressed () {
  if (key === ' ') {
    bird.goUp();
  }
}

// defining classes
// The tutorial uses a constructor functions
//but i'll be using classes to apply what I learned and for better readability

class Bird {
  constructor (x,y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 10;


    this.gravity = 0.6; // bird falls when nothign is done to it
    this.lift = -15; // controls the strength of the jump
    this.velocity = 0; // still at the start
  }


  show() {   


    // show is a method like co  nstructor inside of a class
    // my bird would show up once this is called
    fill (0);
    rect(this.x, this.y, 80,20);


  }


  //methods are not pre-made and can be created simultaneously


  update () {
    this.velocity += this.gravity;// Velocity increases due to gravity
    this.velocity*= 0.9; // air resistance to keep the jump strength limited
    this.y += this.velocity; // y changes relative to velocity


    if (this.y > height - this.height) {
      this.y = height - this.height;
      this.velocity = 0; // stops at the edge
    }
    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0; // stops at the edge
    }
    
  }


  goUp(){
    this.velocity += this.lift;
  }

}

class Pipe {

  constructor (x,y) {
    this.top = random(height/2); //lengths are chose randomly
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
    this.x -= this.speed; // makes the pipes move to left constantly
  }

  done (){
    return this.x < -this.w;
  }
}