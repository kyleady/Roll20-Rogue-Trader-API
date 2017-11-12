INQWeaponParser.prototype.parseAvailability = function(content){
  var availabilities = [
    'Ubiquitous',
    'Abundant',
    'Plentiful',
    'Common',
    'Average',
    'Scarce',
    'Rare',
    'Very\\s+Rare',
    'Extremely\\s+Rare',
    'Near\\s+Unique',
    'Unique'
  ];
  var regex = '^\\s*(';
  for(var availability of availabilities){
    regex += availability + '|';
  }
  regex = regex.replace(/\|\s*$/, '');
  regex += ')\\s*$';
  var re = new RegExp(regex, 'i');
  var matches = content.match(re);
  if(matches){
    this.Availability = matches[1].trim().replace(/\s+/g, ' ').toTitleCase();
  } else {
    whisper('Invalid Availability');
    log('Invalid Availability');
    log(content);
  }
}
