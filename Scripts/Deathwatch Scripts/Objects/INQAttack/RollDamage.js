//be sure the inqattack object exists before we start working with it
INQAttack_old = INQAttack_old || {};
//report the damage roll
INQAttack_old.rollDamage = function(){
  //be sure the weapon has a damage roll
  if(INQAttack_old.inqweapon.DiceNumber == 0){
    return;
  }
  //begin constructing the damage report
  INQAttack_old.Reports.Damage = "&{template:default} {{name=<strong>Damage</strong>: " + INQAttack_old.inqweapon.Name + "}} ";
  //calculate the damage
  INQAttack_old.Reports.Damage +=  "{{Damage= [[" + INQAttack_old.damageFormula() + "]]}} ";
  //note the damage type
  if(typeof INQAttack_old.inqweapon.DamageType == 'string'){
    var DamageType = getLink(INQAttack_old.inqweapon.DamageType);
  } else {
    var DamageType = INQAttack_old.inqweapon.DamageType.toNote();
  }
  INQAttack_old.Reports.Damage +=  "{{Type=  " + DamageType + "}} ";
  //calculate the penetration
  INQAttack_old.Reports.Damage +=  "{{Pen=  [[" + INQAttack_old.penetrationFormula() + "]]}} ";
  //add on any special notes
  INQAttack_old.Reports.Damage += "{{Notes= " + INQAttack_old.weaponNotes() + "}}";

  INQAttack_old.calcHordeDamage();
}
