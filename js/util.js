var Util = function(){
  var randomBetween = function(min, max){
    return Math.random() * (max - min) + min;
  };

  var randomIntBetween = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return {
    randomBetween: randomBetween,
    randomIntBetween: randomIntBetween
  };

}();
