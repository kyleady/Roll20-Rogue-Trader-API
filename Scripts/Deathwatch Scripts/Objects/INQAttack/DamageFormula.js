INQAttack = INQAttack || {};
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
