INQTime.parseInput = function(input) {
  var times = [];
  var timeMatches = input || '';
  timeMatches = timeMatches.match(/\d+\s*[a-z]+/gi) || [];
  for(var timeMatch of timeMatches) {
    var matches = timeMatch.match(/(\d+)\s*([a-z]+)/i);
    times.push({quantity: Number(matches[1]), type: matches[2]});
  }

  return times;
}
