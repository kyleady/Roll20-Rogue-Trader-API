//define the attack object
INQAttack_old = INQAttack_old || {};
//warn the gm of any damage type that should not be applied to a character type
INQAttack_old.appropriateDamageType = function(){
  if(INQAttack_old.targetType == "starship" && INQAttack_old.DamType.get("current").toUpperCase() != "S"){
    whisper(INQAttack_old.graphic.get("name") + ": Using non-starship damage on a starship. Aborting. [Correct This](!damage type = s)");
    return false;
  } else if(INQAttack_old.targetType != "starship" && INQAttack_old.DamType.get("current").toUpperCase() == "S"){
    whisper(INQAttack_old.graphic.get("name") + ": Using starship damage on a non-starship. Aborting. [Correct This](!damage type = i)");
    return false;
  }
  //no warning to hand out
  return true;
}
