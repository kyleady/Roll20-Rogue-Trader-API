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
//calculate the damage formula
INQAttack.damageFormula = function(){
  var formula = "";
  //write the roll down
  if(INQAttack.inqweapon.DiceNumber != 0){
    //if the dice are multiplied by a number other than one
    INQAttack.inqweapon.DiceNumber *= INQAttack.inqweapon.DiceMultiplier;
    formula += INQAttack.inqweapon.DiceNumber.toString();
    formula += "d";
    formula += INQAttack.inqweapon.DiceType.toString();
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
    formula += "+";
    formula += INQAttack.inqweapon.DamageBase.toString();
  }
  //return the damage formula
  return formula;
}
//calculate the penetration formula
INQAttack.penetrationFormula = function(){
  var formula = "";
  if(INQAttack.penSuccessesMultiplier){
    formula += "("
  }
  if(INQAttack.penDoubleAt && INQAttack.successes >= INQAttack.penDoubleAt){
    formula += "("
  }
  if(INQAttack.inqweapon.PenDiceNumber > 0 && INQAttack.inqweapon.PenDiceType > 0){
    formula += INQAttack.inqweapon.PenDiceNumber + "d" + INQAttack.inqweapon.PenDicType;
  }
  formula += "+" + INQAttack.inqweapon.Penetration;
  if(INQAttack.penSuccessesMultiplier){
    var penMultiplier = 1;
    penMultiplier += INQAttack.successes;
    penMultiplier *= INQAttack.penSuccessesMultiplier
    formula += ")*";
    formula += penMultiplier;
  }
  if(INQAttack.penDoubleAt && INQAttack.successes >= INQAttack.penDoubleAt){
    formula += ")*2"
  }
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

//a list of all the special rules that affect the damage calculation
INQAttack.accountForDamageSpecialRules = function(){
  INQAttack.accountForAccurate();
  INQAttack.accountForProven();
  INQAttack.accountForTearingFleshRender();
  INQAttack.accountForForce();
  INQAttack.accountForCrushingBlowMightyShot();
  INQAttack.accountForHammerBlow();
  INQAttack.accountForDamage();
  INQAttack.accountForPen();
  INQAttack.accountForType();
  INQAttack.accountForLance();
  INQAttack.accountForRazorSharp();
}