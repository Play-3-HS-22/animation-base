// animation

let trees;

let currentYear;

var projection = d3
  .geoMercator()
  .center([8.3090, 47.0502])
  .translate([400, 400])
  .scale(500000)

let saveAnimation = false;


function preload() {
  trees = loadJSON("trees.json");
}

function setup() {
  createCanvas(900, 650);

  // filter out trees with no PFLANZJAHR
  trees.features = trees.features.filter(function (d) {
    return d.properties.PFLANZJAHR != null;
  });


  // get the start year for the animation, this is the earliest year in the data
  let startYear = d3.min(trees.features, function (d) {
    return d.properties.PFLANZJAHR;
  });

  console.log("startYear", startYear);

  currentYear = startYear;

  frameRate(30);

  if (saveAnimation) {
    frameRate(10);
  }
}

function draw() {
  background(255);

  // draw the year
  noStroke();
  fill(0);
  text(floor(currentYear), 50, 50);

  // draw the text labels
  for (let i = 0; i < trees.features.length; i++) {
    let tree = trees.features[i];

    if (tree.properties.PFLANZJAHR < currentYear) {
      let coords = tree.geometry.coordinates;
      let lat = coords[1];
      let lon = coords[0];

      // calculate the x and y position of the tree using projection
      let pos = projection([lon, lat]);
      let x = pos[0];
      let y = pos[1];

      let age = currentYear - tree.properties.PFLANZJAHR;

      let r = age * 1.3;

      fill(0);
      noStroke();
      ellipse(x, y, 1, 1);

      stroke(0, 20);
      noFill();
      ellipse(x, y, r, r);
    }
  }


  currentYear += 0.5;

  if (saveAnimation) {
    console.log("saving frame", frameCount);
    save("frame_" + nf(frameCount, 4) + ".png");
  }
}

function keyTyped(){
  if (key === 's') {
    saveAnimation = !saveAnimation;
    console.log("saveAnimation", saveAnimation);
  }
}
