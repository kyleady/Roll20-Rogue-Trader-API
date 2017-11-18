INQQtt.prototype.damage = function(){
  var inqweapon = this.inquse.inqweapon;
  var PR = this.inquse.PR;
  var SB = this.inquse.SB;
  var dam = inqweapon.has("Dam") || [];
  var damage = inqweapon.has("Damage") || [];
  dam = dam.concat(damage);
  _.each(dam, function(value){
    var equals = /=/.test(value.Name);
    var text = value.Name.replace('=', '');
    var formula = new INQFormula(text);
    if(equals){
      inqweapon.Damage = formula;
    } else {
      inqweapon.Damage.Modifier += formula.roll({PR: PR, SB: SB});
    }
  });
}
