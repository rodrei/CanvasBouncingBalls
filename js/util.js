var Util = function(){
  var randomBetween = function(min, max){
    return Math.random() * (max - min) + min;
  };

  return {
    randomBetween: randomBetween
  };

}();
