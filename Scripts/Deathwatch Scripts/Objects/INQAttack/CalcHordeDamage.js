INQAttack_old = INQAttack_old || {};
INQAttack_old.calcHordeDamage = function(){
  INQAttack_old.accountForDevastating();
  //adds to the horde multiplier, instead of multipliying, do this last
  INQAttack_old.accountForHordeDmg();
  INQAttack_old.hits *= INQAttack_old.hordeDamageMultiplier;
  INQAttack_old.hits += INQAttack_old.hordeDamage;
}
