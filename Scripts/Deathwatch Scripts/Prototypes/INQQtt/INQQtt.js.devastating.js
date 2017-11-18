INQQtt.prototype.devastating = function(){
  var inqweapon = this.inquse.inqweapon;
  var PR = this.inquse.PR;
  var SB = this.inquse.SB;
  var devastating = inqweapon.has('Devastating');
  if(devastating){
    _.each(devastating, function(value){
      var formula = new INQFormula(value.Name);
      this.inquse.hordeDamage += formula.roll({PR: PR, SB: SB});
    });
  }
}
