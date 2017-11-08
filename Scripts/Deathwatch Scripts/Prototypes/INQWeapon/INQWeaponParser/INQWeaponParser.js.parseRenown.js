INQWeaponParser.prototype.parseRenown = function(content){
  var renowns = [
    '-',
    '–',
    '—',
    'Initiate',
    'Respected',
    'Distinguished',
    'Famed',
    'Hero'
  ];
  var regex = '^\\s*(';
  for(var renown of renowns){
    regex += renown + '|';
  }
  regex = regex.replace(/\|\s*$/, '');
  regex += ')\\s*$';
  var re = new RegExp(regex, 'i');
  var matches = content.match(re);
  if(matches){
    if(/(-|–|—)/.test(matches[1])){
      this.Renown = 'Initiate';
    } else {
      this.Renown = matches[1].toTitleCase();
    }
  } else {
    whisper('Invalid Renown')
  }
}
