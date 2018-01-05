INQTime.showDiff = function(diffData) {
  var output = '';
  if(diffData.days > 1) output += diffData.days + ' days, ';
  if(diffData.days == 1) output += diffData.days + ' day, ';
  if(diffData.weeks > 1) output += diffData.weeks + ' weeks, ';
  if(diffData.weeks == 1) output += diffData.weeks + ' week, ';
  if(diffData.years > 1) output += diffData.years + ' years';
  if(diffData.years == 1) output += diffData.years + ' year';
  if(!output) output = 'No time';
  output = output.replace(/,\s*$/i, '');
  output += diffData.future ? ' until ' : ' since ';
  return output;
}
