
class RandomObject {
  constructor() {
    this.reset();
  }

  reset() {
    const objects = ["bottle", "backpack", "cell phone", "chair", "umbrella", "handbag", "sports ball", "cup", "remote", "book"];
    let randObj = objects[Math.floor(Math.random() * 9)];
    this.name = randObj;
    console.log(randObj);
    this.setLabel();
  }

  setLabel() {
    document.getElementById("objectlabel").innerHTML = this.name;
  }

}

let video;
let detector;
let detections = [];

let videoSize = {};

//change to random choice
const ob = new RandomObject();

function setup() {

  var canvas = createCanvas(640, 480);
  video = createCapture(VIDEO, videoReady);
  video.size(640, 480);
  videoSize.x = 640;
  videoSize.y = 480;
  video.hide();

  canvas.parent("authcanvas")
}

function videoReady() {
  // Models available are 'cocossd', 'yolo'
  detector = ml5.objectDetector('cocossd', modelReady);
}

function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  detections = results;
  detector.detect(video, gotDetections);
}

function modelReady() {
  detector.detect(video, gotDetections);
}

function draw() {
  image(video, 0, 0);

  let confidence;
  let label;

  let detectedObjects = {};

  for (let i = 0; i < detections.length; i += 1) {
    const object = detections[i];
    //console.log(object);
    confidence = object.confidence;
    label = object.label;
    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    rect(object.x, object.y, object.width, object.height);
    noStroke();
    fill(255);
    textSize(24);
    text(object.label, object.x + 10, object.y + 24);

    detectedObjects[label] = confidence;
  }
  //console.log(detectedObjects);
  checkAuth(detectedObjects, ob.name);

}

//checks if user has completed landing
const checkAuth = (objectsWithConfidences, passObject) => {
  if(objectsWithConfidences.person && objectsWithConfidences[passObject]){
      if(objectsWithConfidences.person > 0.51 && objectsWithConfidences[passObject] >= 0.55){
        alert("Accepted");
        route("/home");
      }
  }
}

const route = (path) => {
  window.location = path;
}

const resetOb = () => {
  ob.reset();
}

const showDetails = () => {

}

//HANDLING MODAL

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("showmodal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

