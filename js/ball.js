var Ball = function(options)
{
  var options = (options === undefined) ? {} : options;
  var defaults = {
    x: 0,
    y: 0,
    radius: 30,
    fillColor: 'green',
    borderColor: '#003300',
    velocity: 0,
    maxBounceFactor: 0.8
  };

  this.x =               options['x'] || defaults['x'];
  this.y =               options['y'] || defaults['y'];
  this.radius =          options['radius'] || defaults['radius'];
  this.fillColor =       options['fillColor'] || defaults['fillColor'];
  this.maxBounceFactor = options['maxBounceFactor'] || defaults['maxBounceFactor'];
  this.velocity =        0;
  this.diameter =        this.radius * 2;
};


Ball.prototype.draw = function(context) {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
  context.fillStyle = this.fillColor;
  context.fill();
  context.lineWidth = 1;
  context.strokeStyle = this.borderColor;
  context.stroke();
}

Ball.prototype.bounceFactor = function() {
  var velocityThres = 150;
  var ret;
  if(Math.abs(this.velocity) > velocityThres){
    ret = this.maxBounceFactor;
  }
  else {
    ret = this.maxBounceFactor * Math.abs(this.velocity) / velocityThres;
  }

  return ret;
};
