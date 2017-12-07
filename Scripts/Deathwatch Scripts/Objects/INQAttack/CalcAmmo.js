INQAttack_old = INQAttack_old || {};
INQAttack_old.calcAmmo = function(){
  //if the attacker was making a careful shot, don't expend ammo on a near hit
  if(/called/i.test(INQAttack_old.options.RoF)
  && INQAttack_old.toHit - INQAttack_old.d100 <   0
  && INQAttack_old.toHit - INQAttack_old.d100 > -30){
    INQAttack_old.options.freeShot = true;
  }
  //determine how many shots were fired
  if(INQAttack_old.options.freeShot){
    INQAttack_old.shotsFired = 0;
  }

  INQAttack_old.shotsFired *= INQAttack_old.ammoMultiplier;
}
