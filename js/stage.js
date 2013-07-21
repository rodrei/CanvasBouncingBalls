Stage = function(){
  var canvas;
  var context;

  var init = function(options){
    Stage.canvas = document.getElementById(options['canvasId']);
    Stage.context = Stage.canvas.getContext('2d');
  }


  var lastFrameTimestamp;

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
  }


  var draw = function(timeDelta) {
    var gravity = 980;
    // pixels / second^2

    var offsetY = myBall.velocity * (timeDelta / 1000) +
      0.5 * gravity * Math.pow((timeDelta/1000), 2);

    myBall.y += offsetY;
    myBall.velocity += gravity * (timeDelta / 1000);


    var maxY = Stage.canvas.height - myBall.radius;
    if (myBall.y >= maxY){
      if(myBall.velocity < 5)
        myBall.velocity = 0;
      else
        myBall.velocity *= -0.8;
      myBall.y = maxY;
    }

    // clear
    Stage.context.clearRect(0, 0, Stage.canvas.width, Stage.canvas.height);

    // draw
    myBall.draw(Stage.context);
  }


  return {
    animate: animate,
    init: init,
    context: context
  };

}();
