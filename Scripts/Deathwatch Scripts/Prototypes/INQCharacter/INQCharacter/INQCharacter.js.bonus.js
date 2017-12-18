INQCharacter.prototype.bonus = function(stat){
  var bonus;
  if(this.Attributes[stat] != undefined) bonus = Math.floor(this.Attributes[stat]/10);
  if(this.Attributes['Unnatural ' + stat] != undefined) bonus += this.Attributes['Unnatural ' + stat];
  return bonus;
}
