INQQtt.prototype.devastating = function(inqweapon, pr, sb){
  var devastating = inqweapon.has('Devastating');
  if(devastating){
    _.each(devastating, function(value){
      var formula = new INQFormula(value.Name);
      this.hordeDamage += formula.roll({PR: pr, SB: sb});
    });
  }
}
