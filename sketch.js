// animation
let trees;

var projection = d3
  .geoMercator()
  .center([8.3090, 47.0502])
  .translate([400, 400])
  .scale(500000)


function preload() {
  trees = loadJSON("trees.json");
}

function setup() {
  createCanvas(900, 650);

  frameRate(30);
}

function draw() {
  background(255);

  for (let i = 0; i < trees.features.length; i++) {
    let tree = trees.features[i];
    let pos = projection(tree.geometry.coordinates);
    let x = pos[0];
    let y = pos[1];
    noFill();
    stroke(0)
    ellipse(x, y, 5, 5);
  }

}


