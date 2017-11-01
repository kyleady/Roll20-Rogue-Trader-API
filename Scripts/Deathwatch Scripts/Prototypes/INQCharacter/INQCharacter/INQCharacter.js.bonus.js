INQCharacter.prototype.bonus = function(stat){
  var bonus;
  if(this.Attributes[stat]) bonus = Math.floor(this.Attributes[stat]/10);
  if(this.Attributes['Unnatural ' + stat]) bonus += this.Attributes['Unnatural ' + stat];
  return bonus;
}
