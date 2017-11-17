INQQtt.prototype.hordeDmg = function(inqweapon, pr, sb){
  var hordeDmg = inqweapon.has('HordeDmg');
  if(hordeDmg){
    _.each(hordeDmg, function(value){
      var formula = new INQFormula(value.Name);
      this.hordeDamageMultiplier += formula.roll({PR: pr, SB: sb});
    });
  }
}
