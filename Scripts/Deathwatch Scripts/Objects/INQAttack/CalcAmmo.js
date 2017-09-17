INQAttack = INQAttack || {};
INQAttack.calcAmmo = function(){
  //if the attacker was making a careful shot, don't expend ammo on a near hit
  if(/called/i.test(INQAttack.options.RoF)
  && INQAttack.toHit - INQAttack.d100 <   0
  && INQAttack.toHit - INQAttack.d100 > -30){
    INQAttack.options.freeShot = true;
  }
  //determine how many shots were fired
  if(INQAttack.options.freeShot){
    INQAttack.shotsFired = 0;
  }

  INQAttack.shotsFired *= INQAttack.shotsMultiplier;
}
