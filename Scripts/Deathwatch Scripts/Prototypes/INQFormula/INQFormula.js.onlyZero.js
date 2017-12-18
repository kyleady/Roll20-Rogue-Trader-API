INQFormula.prototype.onlyZero = function(){
  if(this.Multiplier == 0) return true;
  if(this.DiceNumber == 0 && this.Modifier == 0) return true;
  if(this.DiceType == 1 && this.DiceNumber * -1 == this.Modifier
    && this.DiceNumber_PR == this.Modifier_PR && this.DiceNumber_SB == this.Modifier_SB) return true;
  return false;
}
