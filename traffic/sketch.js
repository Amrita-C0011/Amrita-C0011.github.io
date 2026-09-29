//Traffic Light Starter Code
// Your Name Here
// The Date Here

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis

const GREEN = "green";
const RED = "red";
const YELLOW = "yellow";
let state = RED;
let lastSwitchedTime = 0 ; 
let greenLightD = 3000;
let redlightD = 3000;
let yellowLightD = 700;

async function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  chooseCorrectLight();
  drawOutlineOfLights();
  displayCorrectLight();
}

function chooseCorrectLight () {
  if (state === GREEN && millis() >= lastSwitchedTime + greenLightD) {
    state = YELLOW;
    lastSwitchedTime = millis() ; 
  }
  if (state === YELLOW && millis() >= lastSwitchedTime + yellowLightD) {
    state = RED;
    lastSwitchedTime = millis() ; 
  }
  if (state === RED && millis() >= lastSwitchedTime + redlightD) {
    state = GREEN;
    lastSwitchedTime = millis() ; 
  }
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  //lights
  fill(255);
  ellipse(width/2, height/2 - 65, 50, 50); //top
  ellipse(width/2, height/2, 50, 50); //middle
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}

function displayCorrectLight() {
  if (state === GREEN){
    fill ("green");
    ellipse(width/2, height/2 + 65, 50, 50); //bottom
  }
  if (state === YELLOW) {
    fill ("yellow");
    ellipse(width/2, height/2, 50, 50); //middle
  }
  if (state === RED){
    fill ("red");
    ellipse(width/2, height/2 - 65, 50, 50); //top
  }
  
}