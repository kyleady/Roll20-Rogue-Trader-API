INQFormula.prototype.toInline = function(options){
  if(typeof options != 'object') options = {};
  options.dicerule = options.dicerule || '';
  var adjusted = this.adjustForSBPR(options);
  var formula = '[[';
  formula += adjusted.multiplier;
  formula += ' * (';
  formula += adjusted.dicenumber;
  formula += 'D';
  formula += this.DiceType;
  formula += options.dicerule;
  formula += ' + ';
  formula += adjusted.modifier;
  formula += ')';
  formula += ']]';
  return formula;
}
