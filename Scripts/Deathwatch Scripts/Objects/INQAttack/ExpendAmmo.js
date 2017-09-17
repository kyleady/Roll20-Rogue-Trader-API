INQAttack = INQAttack || {};

//try to spend ammo when making the shot
INQAttack.expendAmmunition = function(){
  INQAttack.calcAmmo();
  //be sure this weapon uses ammunition
  if(INQAttack.inqweapon.Clip > 0){
    if(!INQAttack.recordAmmo()){return false;}
  }
  INQAttack.reportAmmo();
  //we made it this far, nothing went wrong
  return true;
}
