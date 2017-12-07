INQAttack_old = INQAttack_old || {};
INQAttack_old.calcToHit = function(){
  //get the stat used to hit
  INQAttack_old.stat = "BS"
  if(INQAttack_old.inqweapon.Class == "Melee"){
    INQAttack_old.stat = "WS";
  } else if(INQAttack_old.inqweapon.Class == "Psychic"){
    //not all psychic attacks use Willpower
    INQAttack_old.stat = INQAttack_old.inqweapon.FocusStat;
    //some psychic attacks are based off of a skill
    INQAttack_old.toHit += INQAttack_old.skillBonus();
    //some psychic attacks have a base modifier
    INQAttack_old.toHit += INQAttack_old.inqweapon.FocusModifier;

    //psychic attacks get a bonus for the psy rating it was cast at
    INQAttack_old.toHit += INQAttack_old.PsyRating * 5;
  }
  //use the stat
  INQAttack_old.toHit += Number(INQAttack_old.inqcharacter.Attributes[INQAttack_old.stat]);
  INQAttack_old.unnaturalSuccesses += Math.ceil(Number(INQAttack_old.inqcharacter.Attributes["Unnatural " + INQAttack_old.stat])/2);
  if(INQAttack_old.options.Modifier && Number(INQAttack_old.options.Modifier)){
    INQAttack_old.toHit += Number(INQAttack_old.options.Modifier);
  }
}
