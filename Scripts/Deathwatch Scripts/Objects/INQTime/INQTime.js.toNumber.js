INQTime.toNumber = function(input, type) {
  if(typeof input == 'number') return input;
  var times = INQTime.toArray(input, type);
  var total = 0;
  if(type == 'diff') {
    var conversions = {
      minute: {chance: 1903, value: 0},
      hour: {chance: 85800, value: 1},
      day: {chance: 60000, value: 27},
      week: {chance: 20000, value: 191},
      month: {chance: 70000, value: 833},
      year: {chance: 0, value: 10000},
      decade: {chance: 0, value: 100000},
      "(century|centuries)": {chance: 0, value: 1000000}
    }


    for(var time of times) {
      var sign = time.quantity < 0 ? -1 : 1;
      var quantity = time.quantity * sign;
      var subtotal = 0;
      for(var name in conversions) {
        var re = RegExp(name + 's?', 'i');
        if(re.test(time.type)) break;
      }

      for(var i = 0; i < quantity; i++) {
        subtotal += conversions[name].value;
        if(randomInteger(100000) <= conversions[name].chance) subtotal++;
      }

      total += subtotal * sign;
    }
  } else {
    var data = times[0];
    total += (data.mill - 1) * 10000000;
    total += data.year * 10000;
    total += data.fraction;
  }

  return total;
}
