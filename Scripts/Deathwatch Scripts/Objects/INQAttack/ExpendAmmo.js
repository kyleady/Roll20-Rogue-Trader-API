INQAttack_old = INQAttack_old || {};

//try to spend ammo when making the shot
INQAttack_old.expendAmmunition = function(){
  INQAttack_old.calcAmmo();
  //be sure this weapon uses ammunition
  if(INQAttack_old.inqweapon.Clip > 0){
    if(!INQAttack_old.recordAmmo()){return false;}
  }
  INQAttack_old.reportAmmo();
  //we made it this far, nothing went wrong
  return true;
}
