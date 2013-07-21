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

generateBalls = function(){
  var width = 700;
  var height = 450;

  var maxDistanceBetween = 40;
  var minDistanceBetween = 5;
  var maxRadius = 40;
  var minRadius = 5;
  var colors = ['E53481', 'FCB215', '9CCB3B', '25B0E6', '8151A1'];

  var balls = []
  var offset = 0;

  while(true){
    var newBall = new Ball({
      radius: Math.random() * (maxRadius - minRadius) + minRadius,
      fillColor: colors[Util.randomIntBetween(0, colors.length)]
    });

    distanceBetween = Util.randomBetween(minDistanceBetween, maxDistanceBetween);
    newBall.x = offset + distanceBetween + newBall.radius;
    newBall.y = Util.randomBetween((450 - newBall.radius), newBall.radius);

    if(newBall.x > width - newBall.radius)
      break;

    balls.push(newBall);
    offset += distanceBetween + newBall.diameter;
  }

  return balls;
};

Stage.init({
  canvasId: 'canvas',
  objects: generateBalls()
});

setTimeout(Stage.animate(), 300);


