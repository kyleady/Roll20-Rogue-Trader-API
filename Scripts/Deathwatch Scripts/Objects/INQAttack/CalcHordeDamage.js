INQAttack = INQAttack || {};
INQAttack.calcHordeDamage = function(){
  INQAttack.accountForDevastating();
  //adds to the horde multiplier, instead of multipliying, do this last
  INQAttack.accountForHordeDmg();
  INQAttack.hits *= INQAttack.hordeDamageMultiplier;
  INQAttack.hits += INQAttack.hordeDamage;
}
