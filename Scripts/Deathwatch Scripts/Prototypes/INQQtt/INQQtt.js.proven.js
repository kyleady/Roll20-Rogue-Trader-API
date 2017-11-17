INQQtt.prototype.proven = function(inqweapon, pr, sb){
  var proven = inqweapon.has('Proven');
  if(proven){
    _.each(proven, function(value){
      var formula = new INQFormula(value.Name);
      this.rerollBelow = formula.roll({SB: sb, PR: pr}) - 1;
    });

    if(!this.rerollBelow) this.rerollBelow = 1;
  }
}
