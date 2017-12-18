INQQtt.prototype.getTotal = function(subgroups, min){
  if(min == undefined) min = 1;
  var PR = this.inquse.PR;
  var SB = this.inquse.SB;
  var total = 0;
  if(Array.isArray(subgroups)){
    for(var value of subgroups){
      if(/=/.test(value.Name)) continue;
      if(value.Name == 'all') value.Name = min.toString();
      var formula = new INQFormula(value.Name);
      total += formula.roll({PR: PR, SB: SB});
    }
  }

  if(total < min) total = min;
  return total;
}
