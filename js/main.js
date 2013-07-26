$(document).ready( function() {
  App.init();

  Stage.init({
    canvas: canvas,
    objects: ballsGenerator.run()
  });

  setTimeout(Stage.animate(), 300);
});


window.requestAnimFrame = (function(callback) {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };
})();


var App = function(){
  var canvas;
  var init = function(){
    App.canvas = document.getElementById('canvas');
    App.canvas.width = window.innerWidth;
    App.canvas.height = window.innerHeight - 41;
    setupEvents();
  };

  var setupEvents = function(){
    $('#reset_button').click(function() {
      Stage.objects = ballsGenerator.run();
      Stage.objects.first
    });

    $('#gravity_slider').slider({
      change: function(event, ui){
        Stage.gravity = ui.value;
      },
      value: 980,
      max: 3000,
      min: 700
    });

    $('#bounciness_slider').slider({
      change: function(event, ui){
        ballsGenerator.options['maxBounceFactor'] = ui.value / 100;
        for (var i = 0; i < Stage.objects.length; i++) {
          Stage.objects[i].maxBounceFactor = ui.value / 100;
        }
      },
      value: 80,
      max: 98,
      min: 10
    });
  };

  return {
    canvas: canvas,
    init: init
  }
}();


var ballsGenerator = function(){
  var options = {};

  var run = function(){
    var width =  App.canvas.width,
        height = App.canvas.height,
        maxDistanceBetween = 40,
        minDistanceBetween = 5,
        maxRadius = 40,
        minRadius = 5,
        colors = ['E53481', 'FCB215', '9CCB3B', '25B0E6', '8151A1'],
        balls = [],
        offset = 0;

    while(true){
      var newBall = new Ball({
        radius: Math.random() * (maxRadius - minRadius) + minRadius,
        fillColor: colors[Util.randomIntBetween(0, colors.length)]
      });

      var distanceBetween = Util.randomBetween(minDistanceBetween, maxDistanceBetween);
      newBall.x = offset + distanceBetween + newBall.radius;
      newBall.y = Util.randomBetween((height - newBall.radius), newBall.radius);
      if(ballsGenerator.options['maxBounceFactor'] !== undefined){
        newBall.maxBounceFactor = options['maxBounceFactor']
      }

      if(newBall.x > width - newBall.radius)
        break;

      balls.push(newBall);
      offset += distanceBetween + newBall.diameter;
    }

    return balls;
  };

  return {
    run: run,
    options: options
  }
}();







