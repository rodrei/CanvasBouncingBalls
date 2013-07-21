Stage = function(){
  var canvas;
  var context;
  var lastFrameTimestamp;
  var objects = [];

  var init = function(options){
    Stage.objects = options['objects'];
    Stage.canvas = document.getElementById(options['canvasId']);
    Stage.context = Stage.canvas.getContext('2d');
  };


  var animate = function() {
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
  };


  var draw = function(timeDelta) {
    for (var i = 0; i < Stage.objects.length; i++) {
      updatePosition(Stage.objects[i], timeDelta);
    }

    // clear
    clearCanvas();

    // draw
    myBall.draw(Stage.context);
  };

  var updatePosition = function(object, timeDelta) {
    var gAcceleration = 980;
    var maxY = Stage.canvas.height - object.radius;
    // pixels / second^2

    if(object.velocity >= 0 && object.velocity < 35 && object.y > (maxY - 1)){
      object.y = maxY;
      object.velocity = 0;
    }
    else {
      var offsetY = object.velocity * (timeDelta / 1000) +
        0.5 * gAcceleration * Math.pow((timeDelta/1000), 2);

      object.y += offsetY;
      object.velocity += gAcceleration * (timeDelta / 1000);


      if (object.y >= maxY){
        object.velocity *= -1 * object.bounceFactor();
        object.y = 2 * maxY - object.y;
      }
    }

  };

  var clearCanvas = function(){
    Stage.context.clearRect(0, 0, Stage.canvas.width, Stage.canvas.height);
  };


  return {
    animate: animate,
    init: init,
    context: context
  };

}();
