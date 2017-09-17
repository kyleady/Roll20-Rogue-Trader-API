INQAttack = INQAttack || {};
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
