INQTime.modifierRegex = function() {
  var output = '(?:';
  output += '\\d+\\s*';
  output += '(?:';
  var modifiers = [
    'minutes?',
    'hours?',
    'days?',
    'weeks?',
    'months?',
    'years?',
    'decades?',
    'century',
    'centuries'
  ];

  for(var modifier of modifiers) output += modifier + '|';
  output = output.replace(/|$/, '');
  output += ')\\s*';
  output += ',?\\s*(?:and)?\\s*';
  output += ')*';
  return output;
}
