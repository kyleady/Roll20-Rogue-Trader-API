
//be sure the inqattack object exists before we start working with it
INQAttack = INQAttack || {};
//report the damage roll
INQAttack.rollDamage = function(){
  //calculate the strength bonus (in case it is needed in the future)
  INQAttack.calcSBonus();
  //add in all of the special rules that apply to the damage roll
  INQAttack.accountForDamageSpecialRules();
  //begin constructing the damage report
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
//calculate the damage formula
INQAttack.damageFormula = function(){
  var formula = "";
  //write the roll down
  if(INQAttack.inqweapon.DiceNumber != 0){
    formula += INQAttack.inqweapon.DiceNumber.toString();
    formula += "d" + INQAttack.inqweapon.DiceType.toString();
    //if there is a reroll number, add that in
    if(INQAttack.inqweapon.rerollBelow){
      formula += "ro<" + INQAttack.inqweapon.rerollBelow.toString();
    }
    //if there are any keep dice, add them
    if(INQAttack.inqweapon.keepDice){
      formula += "k" + INQAttack.inqweapon.keepDice.toString();
    }
  }
  //add in the base damage
  if(INQAttack.inqweapon.DamageBase != 0){
    formula += "+" + INQAttack.inqweapon.DamageBase.toString();
  }
  //if this is a melee weapon, add the character's S bonus
  if(INQAttack.inqweapon.Class == "Melee"){
    formula += "+" + INQAttack.SBonus.toString();
  }
  //return the damage formula
  return formula;
}
//make a list of all of the weapon special abilities
INQAttack.weaponNotes = function(){
  var notes = "";
  _.each(INQAttack.inqweapon.Special, function(rule){
    notes += rule.toNote() + ", ";
  });
  //remove the last comma
  return notes.replace(/,\s*$/, "");
}

//calculate the strength bonus of the weapon
INQAttack.calcSBonus = function(){
  INQAttack.SBonus = Math.floor(INQAttack.inqcharacter.Attributes.S / 10);
  INQAttack.SBonus += INQAttack.inqcharacter.Attributes["Unnatural S"];
}

//a list of all the special rules that affect the damage calculation
INQAttack.accountForDamageSpecialRules = function(){
  INQAttack.accountForAccurate();
  INQAttack.accountForProven();
  INQAttack.accountForTearingFleshRender();
  INQAttack.accountForForce();
  INQAttack.accountForCrushingBlowMightyShot();
}
