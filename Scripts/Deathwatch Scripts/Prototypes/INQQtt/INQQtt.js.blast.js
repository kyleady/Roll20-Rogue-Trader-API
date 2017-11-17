INQQtt.prototype.blast = function(inqweapon, pr, sb){
  var blast = inqweapon.has('Blast');
  if(blast){
    _.each(blast, function(value){
      var formula = new INQFormula(value.Name);
      this.hordeDamageMultiplier *= formula.roll({PR: pr, SB: sb});
    });
  }
}
