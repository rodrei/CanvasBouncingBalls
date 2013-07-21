var Ball = function(options)
{
  this.x = options['x'];
  this.y = options['y'];
  this.radius = 30;
  this.diameter = this.radius * 2;
  this.color = 'green';
  this.velocity = 0;
  this.maxBounceFactor = 0.8;
};


Ball.prototype.draw = function(context) {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
  context.fillStyle = 'green';
  context.fill();
  context.lineWidth = 2;
  context.strokeStyle = '#003300';
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
