//wait until the INQAttack object is defined
on("ready",function(){
  //reduce the damage by the target's toughness
  INQAttack.applyToughness = function(damage){
    if(this.targetType == "character"){
      //get the target's toughness
      var ToughObj = findObjs({_type: "attribute", _characterid: this.character.id, name: "T"})[0];
      //warn the gm if the Toughness Object is undefined
      if(ToughObj == undefined){
        whisper(character.get("current") + " has no attribute named T.");
      } else {
        //reduce the damage by the base T Bonus of the character
        damage -= Math.floor(Number(ToughObj.get("current"))/10);
      }

      //get the target's Unnatural Toughness
      var UToughObj = findObjs({_type: "attribute", _characterid: this.character.id, name: "Unnatural T"})[0];
      //warn the gm if the Unnatural Toughness Object is undefined
      if(UToughObj == undefined){
        whisper(character.get("current") + " has no attribute named Unnatural T.");
      } else {
        //reduce the unnatural toughness by felling damage
        var unnaturalT = Number(UToughObj.get("current")) - Number(this.Fell.get("current"));
        //be sure there is unnatural toughness to apply after felling damage
        if(unnaturalT > 0){
          //reduce the damage by the remaining Unnatural Toughness
          damage -= unnaturalT;
        }
      }
    }

    //be sure the total damage is positive
    if(damage < 0){damage = 0;}

    //report the reduced damage
    return damage;
  }
});
