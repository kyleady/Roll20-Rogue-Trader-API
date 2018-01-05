INQTime.toFraction = function(times) {
  if(!Array.isArray(times)) times = [times];
  var total = 0;
  for(var time of times) {
    var outcomes = () => 1;
    if(/minute/i.test(time.type)) {
      outcomes = function() {
        return randomInteger(100000) <= 1903 ? 1 : 0;
      }
    } else if(/hour/i.test(time.type)) {
      outcomes = function() {
        return randomInteger(1000) <= 858 ? 1 : 2;
      }
    } else if(/day/i.test(time.type)) {
      outcomes = function() {
        return randomInteger(10) <= 6 ? 27 : 28;
      }
    } else if(/week/i.test(time.type)) {
      outcomes = function() {
        return randomInteger(10) <= 2 ? 191 : 192;
      }
    } else if(/month/i.test(time.type)) {
      outcomes = function() {
        return randomInteger(10) <= 7 ? 833 : 834;
      }
    } else if(/year/i.test(time.type)) {
      outcomes = () => 10000;
    } else if(/decade/i.test(time.type)) {
      outcomes = () => 100000;
    } else if(/(century|centuries)/i.test(time.type)) {
      outcomes = () => 1000000;
    }
    if(time.quantity > 0) {
      for(var i = 0; i < time.quantity; i++) total += outcomes();
    } else {
      for(var i = 0; i < -1*time.quantity; i++) total -= outcomes();
    }
  }

  return total;
}
