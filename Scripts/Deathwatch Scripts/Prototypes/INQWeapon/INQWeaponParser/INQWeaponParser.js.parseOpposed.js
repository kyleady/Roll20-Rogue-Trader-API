INQWeaponParser.prototype.parseOpposed = function(content){
  var matches = content.match(/^\s*(Yes|No)\s*$/i);
  if(matches){
    this.Opposed = matches[1].toLowerCase() == 'yes';
    this.Class = 'Psychic';
  } else {
    whisper('Invalid Opposed');
    log('Invalid Opposed');
    log(content);
  }
}
