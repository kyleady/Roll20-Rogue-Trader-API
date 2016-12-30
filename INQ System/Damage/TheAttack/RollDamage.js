INQAttack = INQAttack || {};

INQAttack.rollDamage = function(){
  INQAttack.Reports.Damage = "&{template:default} {{name=<strong>Damage</strong>: " + INQAttack.inqweapon.Name + "}} ";
  //calculate the damage
  INQAttack.Reports.Damage +=  "{{Damage= [[" + INQAttack.damageFormula() + "]]}} ";
  //note the damage type
  INQAttack.Reports.Damage +=  "{{Type=  " + INQAttack.inqweapon.DamageType.toNote() + "}} ";
  //calculate the penetration
  INQAttack.Reports.Damage +=  "{{Pen=  [[" + INQAttack.inqweapon.Penetration.toString() + "]]}} ";
  //add on any special notes
  INQAttack.Reports.Damage += "{{Notes= " + INQAttack.weaponNotes() + "}}";
}

INQAttack.damageFormula = function(){
  var formula = "";
  if(INQAttack.inqweapon.DiceNumber != 0){
    formula += INQAttack.inqweapon.DiceNumber.toString();
    formula += "d" + INQAttack.inqweapon.DiceType.toString();
  }
  if(INQAttack.inqweapon.DamageBase != 0){
    formula += "+" + INQAttack.inqweapon.DamageBase.toString();
  }
  //if this is a melee weapon, remember to add the character's S bonus
  if(INQAttack.inqweapon.Class == "Melee"){
      var SBonus = Math.floor(INQAttack.inqcharacter.Attributes.S / 10);
      SBonus += INQAttack.inqcharacter.Attributes["Unnatural S"];
      //record the bonus damage from the Strength bonus
      formula += "+" + SBonus.toString();
  }

  //return the damage formula
  return formula;
}

INQAttack.weaponNotes = function(){
  var notes = "";
  _.each(INQAttack.inqweapon.Special, function(rule){
    notes += rule.toNote() + ", ";
  });
  //remove the last comma
  return notes.replace(/,\s*$/, "");
}
