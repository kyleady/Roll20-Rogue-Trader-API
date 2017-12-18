INQWeaponParser.prototype.parseClass = function(content){
  var matches = content.match(/^\s*(melee|pistol|basic|heavy|thrown|psychic|gear)\s*$/i);
  if(matches){
    this.Class = matches[1].toTitleCase();
  } else {
    whisper('Invalid Class');
    log('Invalid Class');
    log(content);
  }
}
