window.requestAnimFrame = (function(callback) {
  //return function(callback) {
  //  window.setTimeout(callback, 1000 / 3);
  //};
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };
})();

function draw(timeDelta) {
  var gravity = 980;
  // pixels / second^2

  var offsetY = myBall.velocity * (timeDelta / 1000) +
    0.5 * gravity * Math.pow((timeDelta/1000), 2);

  myBall.y += offsetY;
  myBall.velocity += gravity * (timeDelta / 1000);


  var maxY = canvas.height - myBall.radius;
  if (myBall.y >= maxY){
    if(myBall.velocity < 5)
      myBall.velocity = 0;
    else
      myBall.velocity *= -0.8;
    myBall.y = maxY;
  }

  console.log(myBall.velocity);

  // clear
  context.clearRect(0, 0, canvas.width, canvas.height);

  // draw
  myBall.draw(context);
}

// --------------------------------------------------
// --------------------------------------------------

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var myBall = new Ball({x: 50, y: 50});


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

