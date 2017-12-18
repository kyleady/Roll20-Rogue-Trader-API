INQFormula.prototype.roll = function(options){
  var adjusted = this.adjustForSBPR(options);
  var output = 0;
  for(var i = 0; i < adjusted.dicenumber; i++){
    output += randomInteger(this.DiceType);
  }

  output += adjusted.modifier;
  output *= adjusted.multiplier;
  return output;
}
