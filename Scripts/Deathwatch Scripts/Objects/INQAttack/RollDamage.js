//be sure the inqattack object exists before we start working with it
INQAttack = INQAttack || {};
//report the damage roll
INQAttack.rollDamage = function(){
  //be sure the weapon has a damage roll
  if(INQAttack.inqweapon.DiceNumber == 0){
    return;
  }
  //begin constructing the damage report
  INQAttack.Reports.Damage = "&{template:default} {{name=<strong>Damage</strong>: " + INQAttack.inqweapon.Name + "}} ";
  //calculate the damage
  INQAttack.Reports.Damage +=  "{{Damage= [[" + INQAttack.damageFormula() + "]]}} ";
  //note the damage type
  if(typeof INQAttack.inqweapon.DamageType == 'string'){
    var DamageType = getLink(INQAttack.inqweapon.DamageType);
  } else {
    var DamageType = INQAttack.inqweapon.DamageType.toNote();
  }
  INQAttack.Reports.Damage +=  "{{Type=  " + DamageType + "}} ";
  //calculate the penetration
  INQAttack.Reports.Damage +=  "{{Pen=  [[" + INQAttack.penetrationFormula() + "]]}} ";
  //add on any special notes
  INQAttack.Reports.Damage += "{{Notes= " + INQAttack.weaponNotes() + "}}";

  INQAttack.calcHordeDamage();
}
