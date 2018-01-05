INQTime.showDate = function(date) {
  if(!date) date = this;
  var output = '8';
  var zeroes = '';
  if(date.fraction < 1000) zeroes += '0';
  if(date.fraction < 100) zeroes += '0';
  output += zeroes;
  output += Math.floor(date.fraction / 10);
  zeroes = '';
  if(date.year < 100) zeroes += '0';
  if(date.year < 10) zeroes += '0';
  output += zeroes;
  output += date.year;
  output += '.M';
  output += date.mill;
  return output;
}
