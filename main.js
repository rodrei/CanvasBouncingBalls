window.requestAnimFrame = (function(callback) {
  //return function(callback) {
  //  window.setTimeout(callback, 1000 / 3);
  //};
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };
})();

function drawRectangle(myRectangle, context) {
  context.beginPath();
  context.rect(myRectangle.x, myRectangle.y, myRectangle.width, myRectangle.height);
  context.fillStyle = 'black';
  context.fill();
  context.lineWidth = myRectangle.borderWidth;
  context.strokeStyle = 'blue';
  context.stroke();
}

function draw(timeDelta) {
  var linearSpeed = 100;
  // pixels / second

  var offsetX = linearSpeed * (timeDelta / 1000);
  var newX = myRectangle.x + offsetX * myRectangle.direction;

  var maxX = canvas.width - myRectangle.width - myRectangle.borderWidth / 2;

  if(myRectangle.direction > 0 && newX > maxX){
    myRectangle.direction = -1;
  }
  else if(myRectangle.direction < 0 && newX < 0){
    myRectangle.direction = +1;
  }

  myRectangle.x += offsetX * myRectangle.direction;


  // clear
  context.clearRect(0, 0, canvas.width, canvas.height);

  // draw
  drawRectangle(myRectangle, context);
}

var myRectangle = {
  x: 3,
  y: 3,
  width: 100,
  height: 50,
  borderWidth: 6,
  direction: 1
};

// --------------------------------------------------
// --------------------------------------------------

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');


var lastFrameTimestamp;

function animate() {
  var currentFrameTimestamp = (new Date()).getTime();
  var timeDelta;
  if (lastFrameTimestamp === undefined){
    timeDelta =  0;
  }
  else{
    timeDelta = currentFrameTimestamp - lastFrameTimestamp;
  }

  lastFrameTimestamp = currentFrameTimestamp

  draw( timeDelta );
  requestAnimFrame( animate );
}

draw(0);
setTimeout(animate, 500);
