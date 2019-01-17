INQQtt.prototype.proven = function(){
  var inqweapon = this.inquse.inqweapon;
  var PR = this.inquse.PR;
  var SB = this.inquse.SB;
  var proven = inqweapon.has('Proven');
  if(!proven) return;
  var largest = 1;
  var current = 1;
  for(value of proven){
    var formula = new INQFormula(value.Name);
    current = formula.roll({SB: SB, PR: PR});
    if(current > largest) largest = current;
  }

  log(`Proven(${largest})`);
  this.inquse.rerollDam = largest - 1;
}
