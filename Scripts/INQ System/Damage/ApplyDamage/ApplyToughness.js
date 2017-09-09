//wait until the INQAttack object is defined
on("ready",function(){
  //reduce the damage by the target's toughness
  INQAttack.applyToughness = function(damage){
    if(this.targetType == "character"){
      //get the target's toughness
      var Toughness = attributeValue("T", {characterid: this.character.id, graphicid: this.graphic.id});
      //be sure that the Toughness was found
      if(Toughness){
        Toughness = Number(Toughness);
        //reduce the damage by the base T Bonus of the character
        log("T Bonus: " + Math.floor(Toughness/10))
        damage -= Math.floor(Toughness/10);
      }
      log("Felling: " + Number(this.Fell.get("current")))

      //get the target's toughness
      var UnnaturalToughness = attributeValue("Unnatural T", {characterid: this.character.id, graphicid: this.graphic.id});
      //be sure that the Toughness was found
      if(UnnaturalToughness){
        log("Unnatural Toughness: " + UnnaturalToughness)
        UnnaturalToughness = Number(UnnaturalToughness) - Number(this.Fell.get("current"));
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
});
