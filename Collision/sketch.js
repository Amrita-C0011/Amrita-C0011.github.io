// collision demo

let hit = false;
let logo;


async function setup() {
  createCanvas(windowWidth, windowHeight);
  logo = await loadImage ("github-6980894_640");
  imageMode (CENTER);
}

function draw() {
  background(220);

  rect (300, 400, 200 ,150);
 
  hit = collideRectCircle(300, 400, 200 ,150, mouseX, mouseY, 150, 100); 
  image ( logo, mouseX, mouseY, 150, 100);

  if (hit ) {
    fill ("red");
  }
  else {
    fill ("black");
  }
}

