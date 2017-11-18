INQQtt.prototype.hordeDmg = function(){
  var inqweapon = this.inquse.inqweapon;
  var PR = this.inquse.PR;
  var SB = this.inquse.SB;
  var hordeDmg = inqweapon.has('HordeDmg');
  if(hordeDmg){
    _.each(hordeDmg, function(value){
      var formula = new INQFormula(value.Name);
      this.inquse.hordeDamageMultiplier += formula.roll({PR: PR, SB: SB});
    });
  }
}
