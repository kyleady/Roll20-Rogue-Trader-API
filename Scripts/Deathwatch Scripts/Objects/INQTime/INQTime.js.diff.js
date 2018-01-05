INQTime.diff = function(input) {
  var dt = {
    fraction: this.fraction - input.fraction,
    year: this.year - input.year,
    mill: this.mill - input.mill
  };

  var ttotal = dt.mill * 1000;
  ttotal += dt.year;
  ttotal += dt.fraction / 10000;
  var output = {future: ttotal < 0};
  if(output.future) ttotal *= -1;
  output.years = Math.floor(ttotal);
  var fraction = (ttotal - output.years) * 10000;
  output.days = Math.round(fraction / 27.4);
  output.weeks = Math.floor(output.days / 7);
  output.days = output.days - output.weeks * 7;
  return output;
}
