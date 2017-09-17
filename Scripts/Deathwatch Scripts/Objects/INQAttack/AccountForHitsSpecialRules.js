INQAttack = INQAttack || {};
//a list of all the special rules that affect the toHit calculations
INQAttack.accountForHitsSpecialRules = function(){
  INQAttack.accountForMaximal();
  INQAttack.accountForStorm();
  INQAttack.accountForBlast();
  INQAttack.accountForSpray();
  INQAttack.accountForTwinLinked();
  INQAttack.accountForDevastating();
}
