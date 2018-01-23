INQTime.toArray = function(input, type) {
  if(Array.isArray(input)) return input;
  var times = [];
  if(type == 'diff') {
    if(typeof input == 'string') {
      var sign =  input.indexOf('since') != -1 ? -1 : 1;
      input = input.replace(/(since|until)/i, '');
      var timeMatches = input.match(/\d+\s*[a-z]+/gi) || [];
      for(var timeMatch of timeMatches) {
        var matches = timeMatch.match(/(\d+)\s*([a-z]+)/i);
        times.push({quantity: Number(matches[1]), type: matches[2]});
      }

      for(var time of times) time.quantity *= sign;
    } else {
      var data = INQTime.toObj(input, type);
      var sign = data.future ? -1 : 1;
      if(data.years) times.push({quantity: data.years * sign, type: 'years'});
      if(data.weeks) times.push({quantity: data.weeks * sign, type: 'weeks'});
      if(data.days)  times.push({quantity: data.days  * sign, type: 'days'});
    }
  } else {
    return [INQTime.toObj(input, type)];
  }

  return times;
}
