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

function animate(myRectangle, canvas, context, startTime, direction) {
  // update
  // time in miliseconds
  var time = (new Date()).getTime();
  var timeDelta = time - startTime;

  var linearSpeed = 100;
  // pixels / second

  var offsetX = linearSpeed * (timeDelta / 1000);
  var newX = myRectangle.x + offsetX * direction;

  var maxX = canvas.width - myRectangle.width - myRectangle.borderWidth / 2;

  if(direction > 0 && newX > maxX){
    direction = -1;
  }
  else if(direction < 0 && newX < 0){
    direction = +1;
  }

  myRectangle.x += offsetX * direction;


  // clear
  context.clearRect(0, 0, canvas.width, canvas.height);

  drawRectangle(myRectangle, context);

  // request new frame
  requestAnimFrame(function(my_time) {
    console.log(my_tyme);
    animate(myRectangle, canvas, context, time, direction);
  });
}

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var myRectangle = {
  x: 3,
  y: 3,
  width: 100,
  height: 50,
  borderWidth: 6
};

drawRectangle(myRectangle, context);
// wait one second before starting animation
setTimeout(function() {
  var startTime = (new Date()).getTime();
  animate(myRectangle, canvas, context, startTime, 1);
}, 1000);
