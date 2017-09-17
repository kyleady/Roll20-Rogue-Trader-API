INQAttack = INQAttack || {};
//a list of all the special rules that affect the damage calculation
INQAttack.accountForDamageSpecialRules = function(){
  INQAttack.accountForAccurate();
  INQAttack.accountForProven();
  INQAttack.accountForTearingFleshRender();
  INQAttack.accountForForce();
  INQAttack.accountForCrushingBlowMightyShot();
  INQAttack.accountForHammerBlow();
  INQAttack.accountForDamage();
  INQAttack.accountForPen();
  INQAttack.accountForType();
  INQAttack.accountForLance();
  INQAttack.accountForRazorSharp();
}
