INQTime.toString = function(input, type) {
  if(typeof input == 'string') return input;
  var data = INQTime.toObj(input, type);
  if(type == 'diff') {
    var output = '';
    if(data.days >= 1) output += data.days + ' days, ';
    if(data.weeks >= 1) output += data.weeks + ' weeks, ';
    if(data.years >= 1) output += data.years + ' years';
    output = output.replace(/1 (day|week|year)s/g, '1 $1');
    if(!output) output = 'No time';
    output = output.replace(/,\s*$/i, '');
    output += data.future ? ' until ' : ' since ';
  } else {
    var output = '8';
    if(data.fraction < 1000) output += '0';
    if(data.fraction < 100) output += '0';
    output += Math.floor(data.fraction / 10);
    if(data.year < 100) output += '0';
    if(data.year < 10) output += '0';
    output += data.year + '.M' + data.mill;
  }

  return output;
}
