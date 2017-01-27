//wait until the INQAttack object is defined
on("ready",function(){
  //reduce the damage by the target's toughness
  INQAttack.applyToughness = function(damage){
    if(this.targetType == "character"){
      //get the target's toughness
      var Toughness = attrValue("T", {characterid: this.character.id, graphicid: this.graphic.id});
      //be sure that the Toughness was found
      if(Toughness){
        Toughness = Number(Toughness);
        //reduce the damage by the base T Bonus of the character
        damage -= Math.floor(Toughness/10);
      }

      //get the target's toughness
      var UnnaturalToughness = attrValue("Unnatural T", {characterid: this.character.id, graphicid: this.graphic.id});
      //be sure that the Toughness was found
      if(UnnaturalToughness){
        UnnaturalToughness = Number(UnnaturalToughness) - Number(this.Fell);
        //reduce the damage by the base T Bonus of the character
        if(UnnaturalToughness > 0){
          damage -= UnnaturalToughness;
        }
      }
    }

    //be sure the total damage is positive
    if(damage < 0){damage = 0;}

    //report the reduced damage
    return damage;
  }
});
