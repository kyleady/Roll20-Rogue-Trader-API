INQAttack_old = INQAttack_old || {};
//calculate the damage formula
INQAttack_old.damageFormula = function(){
  var formula = "";
  //write the roll down
  if(INQAttack_old.inqweapon.DiceNumber != 0){
    //if the dice are multiplied by a number other than one
    INQAttack_old.inqweapon.DiceNumber *= INQAttack_old.inqweapon.DiceMultiplier;
    formula += INQAttack_old.inqweapon.DiceNumber.toString();
    formula += "d";
    formula += INQAttack_old.inqweapon.DiceType.toString();
    //if there is a reroll number, add that in
    if(INQAttack_old.inqweapon.rerollBelow){
      formula += "ro<" + INQAttack_old.inqweapon.rerollBelow.toString();
    }
    //if there are any keep dice, add them
    if(INQAttack_old.inqweapon.keepDice){
      formula += "k" + INQAttack_old.inqweapon.keepDice.toString();
    }
  }
  //add in the base damage
  if(INQAttack_old.inqweapon.DamageBase != 0){
    formula += "+";
    formula += INQAttack_old.inqweapon.DamageBase.toString();
  }
  //return the damage formula
  return formula;
}
