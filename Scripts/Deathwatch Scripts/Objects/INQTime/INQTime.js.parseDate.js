INQTime.parseDate = function(input) {
  var dates = input.match(/^\d?(\d\d\d)?(\d\d\d)(?:\.M(\d+))?$/i);
  var output = {
    fraction: this.fraction,
    year: this.year,
    mill: this.mill
  };

  if(!dates) return whisper('Invalid 40k date.');
  if(dates[1]) output.fraction = Number(dates[1]) * 10;
  output.year = Number(dates[2]);
  if(dates[3]) output.mill = Number(dates[3]);
  return output;
}
