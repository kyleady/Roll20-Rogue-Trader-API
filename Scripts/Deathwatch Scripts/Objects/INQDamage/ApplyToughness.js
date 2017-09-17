INQAttack = INQAttack || {};
//reduce the damage by the target's toughness
INQAttack.applyToughness = function(damage){
  if(INQAttack.targetType == "character"){
    //get the target's toughness
    var Toughness = attributeValue("T", {characterid: INQAttack.character.id, graphicid: INQAttack.graphic.id});
    //be sure that the Toughness was found
    if(Toughness){
      Toughness = Number(Toughness);
      //reduce the damage by the base T Bonus of the character
      log("T Bonus: " + Math.floor(Toughness/10))
      damage -= Math.floor(Toughness/10);
    }
    log("Felling: " + Number(INQAttack.Fell.get("current")))

    //get the target's toughness
    var UnnaturalToughness = attributeValue("Unnatural T", {characterid: INQAttack.character.id, graphicid: INQAttack.graphic.id});
    //be sure that the Toughness was found
    if(UnnaturalToughness){
      log("Unnatural Toughness: " + UnnaturalToughness)
      UnnaturalToughness = Number(UnnaturalToughness) - Number(INQAttack.Fell.get("current"));
      //reduce the damage by the base T Bonus of the character
      if(UnnaturalToughness > 0){
        damage -= UnnaturalToughness;
      }
    }
  }
  //be sure the total damage is positive
  if(damage < 0){damage = 0;}

  log("Damage after Toughness: " + damage)

  //report the reduced damage
  return damage;
}
