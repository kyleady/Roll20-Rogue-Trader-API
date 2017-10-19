INQWeaponNoteParser.prototype.parseDamage = function(detail){
  var DamageMatches = detail.match(/^(\d*)\s*(?:d|D)\s*(\d+)\s*\+?\s*(\d*)/);
  if(DamageMatches[1] != ""){
    this.DiceNumber = Number(DamageMatches[1]);
  } else {
    this.DiceNumber = 1;
  }
  this.DiceType = Number(DamageMatches[2]);
  if(DamageMatches[3] != ""){
    this.DamageBase = Number(DamageMatches[3]);
  }
  var damType = detail.replace(DamageMatches[0], "");
  if(damType != ""){
    this.DamageType = new INQLink(damType.trim());
  }
}
