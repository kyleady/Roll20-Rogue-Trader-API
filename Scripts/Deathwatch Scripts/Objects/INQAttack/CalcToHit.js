INQAttack = INQAttack || {};
INQAttack.calcToHit = function(){
  //get the stat used to hit
  INQAttack.stat = "BS"
  if(INQAttack.inqweapon.Class == "Melee"){
    INQAttack.stat = "WS";
  } else if(INQAttack.inqweapon.Class == "Psychic"){
    //not all psychic attacks use Willpower
    INQAttack.stat = INQAttack.inqweapon.FocusStat;
    //some psychic attacks are based off of a skill
    INQAttack.toHit += INQAttack.skillBonus();
    //some psychic attacks have a base modifier
    INQAttack.toHit += INQAttack.inqweapon.FocusModifier;

    //psychic attacks get a bonus for the psy rating it was cast at
    INQAttack.toHit += INQAttack.PsyRating * 5;
  }
  //use the stat
  INQAttack.toHit += Number(INQAttack.inqcharacter.Attributes[INQAttack.stat]);
  INQAttack.unnaturalSuccesses += Math.ceil(Number(INQAttack.inqcharacter.Attributes["Unnatural " + INQAttack.stat])/2);
  if(INQAttack.options.Modifier && Number(INQAttack.options.Modifier)){
    INQAttack.toHit += Number(INQAttack.options.Modifier);
  }
}
