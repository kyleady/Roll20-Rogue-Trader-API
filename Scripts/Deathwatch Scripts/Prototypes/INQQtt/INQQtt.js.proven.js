INQQtt.prototype.proven = function(){
  var inqweapon = this.inquse.inqweapon;
  var PR = this.inquse.PR;
  var SB = this.inquse.SB;
  var proven = inqweapon.has('Proven');
  if(proven){
    for(value of proven){
      var formula = new INQFormula(value.Name);
      this.inquse.rerollBelow = formula.roll({SB: SB, PR: PR}) - 1;
    }

    if(!this.inquse.rerollBelow) this.inquse.rerollBelow = 1;
  }
}
