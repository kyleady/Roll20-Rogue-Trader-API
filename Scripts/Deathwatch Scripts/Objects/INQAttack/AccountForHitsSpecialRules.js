INQAttack_old = INQAttack_old || {};
//a list of all the special rules that affect the toHit calculations
INQAttack_old.accountForHitsSpecialRules = function(){
  INQAttack_old.accountForMaximal();
  INQAttack_old.accountForStorm();
  INQAttack_old.accountForBlast();
  INQAttack_old.accountForSpray();
  INQAttack_old.accountForTwinLinked();
  INQAttack_old.accountForDevastating();
}
