INQAttack_old = INQAttack_old || {};
//a list of all the special rules that affect the damage calculation
INQAttack_old.accountForDamageSpecialRules = function(){
  INQAttack_old.accountForAccurate();
  INQAttack_old.accountForProven();
  INQAttack_old.accountForTearingFleshRender();
  INQAttack_old.accountForForce();
  INQAttack_old.accountForCrushingBlowMightyShot();
  INQAttack_old.accountForHammerBlow();
  INQAttack_old.accountForDamage();
  INQAttack_old.accountForPen();
  INQAttack_old.accountForType();
  INQAttack_old.accountForLance();
  INQAttack_old.accountForRazorSharp();
}
