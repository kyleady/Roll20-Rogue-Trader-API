//defines an aging object so that its existence can be quickly assessed
Aging = {}

//returns a characteristic modifier for being old
Aging.modifier = function(characterid){
  //what is the age of the character in years
  var aging = Number(getAttrByName(characterid,"Age").substring(0,getAttrByName(characterid,"Age").indexOf(" years")));
  //aging shouldn't take affect until the age of 25
  aging -= 25;
  //reduce the effects of aging by any potions of youth, etc
  aging -= Number(getAttrByName(characterid, "Juvenat"));
  //reduce the effects of aging by any corruption
  aging -= Number(getAttrByName(characterid, "Corruption")) + Number(getAttrByName(characterid, "Unnatural Corruption"))*10;
  //be sure the penalties don't turn into bonuses
  //and be prepared to account for a character that does not age
  if(aging < 0 || !aging){aging = 0;}

  //return the resulting penalty
  return aging;
}
