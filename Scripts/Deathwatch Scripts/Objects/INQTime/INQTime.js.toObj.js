INQTime.toObj = function(input, type) {
  if(!input) {
    input = {};
    for(var prop in INQTime.vars) input[prop] = INQTime[prop];
  }

  if(type == 'diff') {
    switch(typeof input) {
      case 'string':
        var sign =  input.indexOf('since') != -1 ? -1 : 1;
        input = input.replace(/(since|until)/i, '');
        var times = [];
        var timeMatches = input.match(/\d+\s*[a-z]+/gi) || [];
        for(var timeMatch of timeMatches) {
          var matches = timeMatch.match(/(\d+)\s*([a-z]+)/i);
          times.push({quantity: Number(matches[1]), type: matches[2]});
        }

        for(var time of times) time.quantity *= sign;
        return INQTime.toObj(times, 'diff');
      break;
      case 'number':
        var output = {future: input < 0};
        if(output.future) input *= -1;
        output.years = Math.floor(input / 10000);
        var fraction = (input - output.years * 10000);
        output.days = Math.round(fraction / 27.4);
        output.weeks = Math.floor(output.days / 7);
        output.days = output.days - output.weeks * 7;
      break;
      case 'object':
        if(Array.isArray(input)) {
          var dt = INQTime.toNumber(input, 'diff');
          return INQTime.toObj(dt, 'diff');
        } else {
          return input;
        }
      break;
    }
  } else {
    switch(typeof input) {
      case 'string':
        var dates = input.match(/^\d?(\d\d\d)?(\d\d\d)(?:\.M(\d+))?$/i);
        var output = {fraction: this.fraction, year: this.year, mill: this.mill};
        if(!dates) return whisper('Invalid 40k date.');
        if(dates[1]) output.fraction = Number(dates[1]) * 10;
        output.year = Number(dates[2]);
        if(dates[3]) output.mill = Number(dates[3]);
      break;
      case 'number':
        var output = {};
        output.mill = Math.floor(input / 10000000);
        output.year = Math.floor(input / 10000) - output.mill*1000;
        output.fraction = input - output.year * 10000 - output.mill * 10000000;
        output.mill++;
      break;
      case 'object':
        if(Array.isArray(input)) {
          return input[0];
        } else {
          return input;
        }
      break;
    }
  }

  return output;
}
