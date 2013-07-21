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
    var gravity = 980;
    // pixels / second^2

    var offsetY = object.velocity * (timeDelta / 1000) +
      0.5 * gravity * Math.pow((timeDelta/1000), 2);

    object.y += offsetY;
    object.velocity += gravity * (timeDelta / 1000);


    var maxY = Stage.canvas.height - object.radius;
    if (object.y >= maxY){
      if(object.velocity < 5)
        object.velocity = 0;
      else
        object.velocity *= -0.8;
      object.y = maxY;
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
