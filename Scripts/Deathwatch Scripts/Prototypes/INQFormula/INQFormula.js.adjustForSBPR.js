INQFormula.prototype.adjustForSBPR = function(options){
  if(typeof options != 'object') options = {};
  options.PR = options.PR || 0;
  options.SB = options.SB || 0;
  options.PR = Number(options.PR);
  options.SB = Number(options.SB);

  var adjusted = {};

  adjusted.modifier = this.Modifier;
  if(this.Modifier_PR) adjusted.modifier *= options.PR;
  if(this.Modifier_SB) adjusted.modifier *= options.SB;

  adjusted.multiplier = this.Multiplier;
  if(this.Multiplier_PR) adjusted.multiplier *= options.PR;
  if(this.Multiplier_SB) adjusted.multiplier *= options.SB;

  adjusted.dicenumber = this.DiceNumber;
  if(this.DiceNumber_PR) adjusted.dicenumber *= options.PR;
  if(this.DiceNumber_SB) adjusted.dicenumber *= options.SB;

  return adjusted;
}
