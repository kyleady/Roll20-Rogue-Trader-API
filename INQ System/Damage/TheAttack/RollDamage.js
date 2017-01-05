//be sure the inqattack object exists before we start working with it
INQAttack = INQAttack || {};
//report the damage roll
INQAttack.rollDamage = function(){
  //make the inqweapon aware of the character's strength bonus
  if(INQAttack.inqcharacter){
    INQAttack.inqweapon.setSB(INQAttack.inqcharacter.bonus("S"));
  }
  //make the inqweapon aware of the effective rsy rating
  INQAttack.calcEffectivePsyRating();
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
    //if the dice are multiplied by a number other than one
    if(INQAttack.inqweapon.DiceMultiplier != 1){
      formula += "*";
      formula += INQAttack.inqweapon.DiceMultiplier.toString();
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
//make a list of all of the weapon special abilities
INQAttack.weaponNotes = function(){
  var notes = "";
  _.each(INQAttack.inqweapon.Special, function(rule){
    notes += rule.toNote() + ", ";
  });
  //remove the last comma
  return notes.replace(/,\s*$/, "");
}

//determine the effective psy rating of the character and make the weapon aware
INQAttack.calcEffectivePsyRating = function(){
  //reset the psy rating for each selected character
  var PsyRating = undefined;
  //allow the options to superceed the character's psy rating
  if(INQAttack.options.EffectivePR){
    PsyRating = Number(INQAttack.options.EffectivePR);
  }
  //if no effective psy rating is set, default to the character's psy rating
  if(PsyRating == undefined
  && INQAttack.inqcharacter != undefined){
    PsyRating = INQAttack.inqcharacter.Attributes.PR;
  }
  //if the psy rating still has no set value, just default to 0
  if(PsyRating == undefined){
    PsyRating = 0;
  }
  //apply the psy rating to the weapon
  INQAttack.inqweapon.setPR(PsyRating);
}

//a list of all the special rules that affect the damage calculation
INQAttack.accountForDamageSpecialRules = function(){
  INQAttack.accountForAccurate();
  INQAttack.accountForProven();
  INQAttack.accountForTearingFleshRender();
  INQAttack.accountForForce();
  INQAttack.accountForCrushingBlowMightyShot();
  INQAttack.accountForDamage();
  INQAttack.accountForPen();
  INQAttack.accountForType();
}
