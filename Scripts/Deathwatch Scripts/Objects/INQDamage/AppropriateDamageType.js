//define the attack object
INQAttack = INQAttack || {};
//warn the gm of any damage type that should not be applied to a character type
INQAttack.appropriateDamageType = function(){
  if(INQAttack.targetType == "starship" && INQAttack.DamType.get("current").toUpperCase() != "S"){
    whisper(INQAttack.graphic.get("name") + ": Using non-starship damage on a starship. Aborting. [Correct This](!damage type = s)");
    return false;
  } else if(INQAttack.targetType != "starship" && INQAttack.DamType.get("current").toUpperCase() == "S"){
    whisper(INQAttack.graphic.get("name") + ": Using starship damage on a non-starship. Aborting. [Correct This](!damage type = i)");
    return false;
  }
  //no warning to hand out
  return true;
}
