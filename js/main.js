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

Stage.init({
  canvasId: 'canvas',
  objects: [myBall]
});

setTimeout(Stage.animate(), 300);


