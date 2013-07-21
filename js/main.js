window.requestAnimFrame = (function(callback) {
  //Debugging: Lower framerate to 3 frames p/sec
  //return function(callback) {
  //  window.setTimeout(callback, 1000 / 3);
  //};
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };
})();


// --------------------------------------------------
// --------------------------------------------------

var myBall = new Ball({x: 50, y: 200});

generateBalls = function(){
  var width = 700;
  var height = 450;
  var distanceBetween = 30;

  var balls = []
  var offset = 0;

  while(true){
    var newBall = new Ball({
      x: offset + distanceBetween + 30,
      y: Math.random() * ((450 - 30) - 30) + 30 // * (max - min) + min
    });

    if(newBall.x > width - 30)
      break;

    balls.push(newBall);
    offset += distanceBetween + 60;
  }

  return balls;
};

Stage.init({
  canvasId: 'canvas',
  objects: generateBalls()
});

setTimeout(Stage.animate(), 300);


