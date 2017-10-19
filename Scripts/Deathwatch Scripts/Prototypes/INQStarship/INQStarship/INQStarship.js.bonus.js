//return the attribute bonus Stat/10 + Unnatural Stat
INQStarship.prototype.bonus = function(stat){
  var bonus = 0;
  //get the bonus from the stat
  if(this.Attributes[stat]){
    bonus += Math.floor(this.Attributes[stat]/10);
  }
  //add in the unnatural bonus
  if(this.Attributes["Unnatural " + stat]){
    bonus += this.Attributes["Unnatural " + stat];
  }
  return bonus;
}
