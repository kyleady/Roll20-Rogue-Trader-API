INQQtt.prototype.blast = function(){
  var inqweapon = this.inquse.inqweapon;
  var PR = this.inquse.PR;
  var SB = this.inquse.SB;
  var blast = inqweapon.has('Blast');
  if(blast){
    _.each(blast, function(value){
      var formula = new INQFormula(value.Name);
      this.inquse.hordeDamageMultiplier *= formula.roll({PR: PR, SB: SB});
    });
  }
}
