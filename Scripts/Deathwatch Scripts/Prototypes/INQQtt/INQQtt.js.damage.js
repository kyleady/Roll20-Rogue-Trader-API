INQQtt.prototype.damage = function(inqweapon, pr, sb){
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
      inqweapon.Damage.Modifier += formula.roll({PR: pr, SB: sb});
    }
  });
}
