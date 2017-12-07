INQAttack_old = INQAttack_old || {};
INQAttack_old.hordeDamage = function(damage){
  //if the damage is non-zero, overwrite the damage with the number of Hits
  //(gm's can add bonus horde damage beforehand by modifying the number of
  //hits. This is will leave the damage unaffected on other tokens.)
  if(damage > 0){
    //at base it is the number of hits
    damage = INQAttack_old.Hits.get("current");
    //explosive damage deals one extra point of horde damage
    if(INQAttack_old.DamType.get("current").toUpperCase() == "X") damage++;
    //FUTURE WORK: add devastating damage to the magnitude damage
  }

  //return the magnitude damage
  return damage;
}
