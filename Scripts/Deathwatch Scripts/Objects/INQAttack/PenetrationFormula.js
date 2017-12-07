INQAttack_old = INQAttack_old || {};
//calculate the penetration formula
INQAttack_old.penetrationFormula = function(){
  var formula = "";
  if(INQAttack_old.penSuccessesMultiplier){
    formula += "(";
  }
  if(INQAttack_old.penDoubleAt && INQAttack_old.successes >= INQAttack_old.penDoubleAt){
    formula += "(";
  }
  if(INQAttack_old.inqweapon.PenDiceNumber > 0 && INQAttack_old.inqweapon.PenDiceType > 0){
    formula += INQAttack_old.inqweapon.PenDiceNumber + "d" + INQAttack_old.inqweapon.PenDicType;
  }
  formula += "+" + INQAttack_old.inqweapon.Penetration;
  if(INQAttack_old.penSuccessesMultiplier){
    var penMultiplier = 1;
    penMultiplier += INQAttack_old.successes;
    penMultiplier *= INQAttack_old.penSuccessesMultiplier
    formula += ")*";
    formula += penMultiplier;
  }
  if(INQAttack_old.penDoubleAt && INQAttack_old.successes >= INQAttack_old.penDoubleAt){
    formula += ")*2"
  }
  return formula;
}
