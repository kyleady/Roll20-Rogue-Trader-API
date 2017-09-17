//be sure the inqattack object exists before we start working with it
INQAttack = INQAttack || {};
//completely detail the weapon using ammo and character
//returns true if nothing went wrong
//returns false if something went wrong
INQAttack.detailTheWeapon = function(){
  //get the weapon base
  if(!INQAttack.getWeapon()){return false;}
  //add in the special ammo
  if(!INQAttack.getSpecialAmmo()){return false;}
  //overwrite any detail with user options
  INQAttack.customizeWeapon();
  //apply the special rules that affect the toHit roll
  INQAttack.accountForHitsSpecialRules();
  //apply the special rules that affect the damage roll
  INQAttack.accountForDamageSpecialRules();
  //determine the character's effective psy rating
  INQAttack.calcEffectivePsyRating();
  //apply that psy rating to the weapon
  INQAttack.inqweapon.setPR(INQAttack.PsyRating);
  //apply the strength bonus of the character to the weapon
  INQAttack.inqweapon.setSB(INQAttack.inqcharacter.bonus("S"));
  //the weapon was fully customized
  return true;
}
