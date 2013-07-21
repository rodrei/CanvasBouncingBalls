window.requestAnimFrame = (function(callback) {
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

var myBall = new Ball({x: 50, y: 50});

Stage.init({
  canvasId: 'canvas',
  objects: [myBall]
});

setTimeout(Stage.animate(), 300);


