INQFormula.prototype.toInline = function(options){
  if(typeof options != 'object') options = {};
  options.dicerule = options.dicerule || '';
  var adjusted = this.adjustForSBPR(options);
  var formula = '[[';
  formula += adjusted.multiplier;
  formula += ' * (';
  if(adjusted.dicenumber < 0) {
    formula += adjusted.modifier;
  }
  if(adjusted.dicenumber) {
    formula += adjusted.dicenumber;
    formula += 'D';
    formula += this.DiceType;
    formula += options.dicerule;
  }
  if(adjusted.dicenumber >= 0){
    if(adjusted.modifier >= 0) formula += ' + ';
    formula += adjusted.modifier;
  }
  formula += ')';
  formula += ']]';
  return formula;
}
