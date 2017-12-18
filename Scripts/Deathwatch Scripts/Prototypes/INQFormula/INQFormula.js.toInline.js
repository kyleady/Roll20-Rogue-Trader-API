INQFormula.prototype.toInline = function(options){
  if(typeof options != 'object') options = {};
  options.dicerule = options.dicerule || '';
  var adjusted = this.adjustForSBPR(options);
  var formula = '[[';
  if(adjusted.multiplier != 1) {
    formula += adjusted.multiplier;
    formula += ' * (';
  }

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
    if(adjusted.modifier >= 0 && adjusted.dicenumber != 0) formula += ' + ';
    formula += adjusted.modifier;
  }

  if(adjusted.multiplier != 1) {
    formula += ')';
  }

  formula += ']]';
  return formula;
}
