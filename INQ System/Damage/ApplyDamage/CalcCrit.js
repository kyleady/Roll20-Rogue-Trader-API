on("ready",function(){
  INQAttack.calcCrit = function(remainingWounds){
    //Has the token taken critical damage?
    if(remainingWounds < 0){
      //strings to contain the details of which crit table to refer to
      var critLocation = "";
      var critType = "";
      //calculate the critical effect that should be applied
      var critEffect =  (-1) * remainingWounds;
      switch(this.targetType){
        case "character":
          //Load up the Wounds and Unnatural Wounds attributes. Warn the gm if
          //they are not found.
          var WBonus = 1;
          var WObj = findObjs({_type: "attribute", _characterid: this.character.id, name: "Wounds"})[0];
          if(WObj == undefined){
            whisper(this.character.get("name") + " has no attribute named Wounds.");
          } else {
            //Calculate the Wounds Bonus of the Character
            WBonus = Math.floor(Number(WObj.get("current"))/10);
          }

          UWObj = findObjs({_type: "attribute", _characterid: this.character.id, name: "Unnatural Wounds"})[0];
          if(UWObj == undefined){
            whisper(this.character.get("name") + " has no attribute named Unnatural Wounds.");
          } else {
            //Add in Unnatural Wounds to the Wounds Bonus
            WBonus += Number(UWObj.get("current"));
          }
          //At minimum, the Wounds Bonus is one.
          Math.max(WBonus,1);
          //Calculate the resulting Critical Effect
          critEffect = Math.ceil(critEffect/WBonus);
          //record the crit type
          critType = this.DamType.get("current");
          critLocation = getHitLocation(this.TensLoc.get("current"), this.OnesLoc.get("current"));
        break;
        case "vehicle":
          //Load up the Structural Integrity and Unnatural Structural Integrity
          //Attributes. Warn the gm if they are not found.
          var SIBonus = 1;
          SIObj = findObjs({_type: "attribute", _characterid: this.character.id, name: "Structural Integrity"})[0];
          if(SIObj == undefined){
            whisper(this.character.get("name") + " has no attribute named Structural Integrity.");
          } else {
            //Calculate the Structural Integrity Bonus of the Vehicle
            SIBonus = Math.floor(Number(SIObj.get("current"))/10);
          }
          USIObj = findObjs({_type: "attribute", _characterid: this.character.id, name: "Unnatural Structural Integrity"})[0];
          if(USIObj == undefined){
            whisper(character.get("name") + " has no attribute named Unnatural Structural Integrity.");
          } else {
            //Add in any Unnatural Structural Integrity to the Bonus
            SIBonus += Number(USIObj.get("current"));
          }
          //At minimum, the SIBonus is one.
          Math.max(SIBonus,1);
          //Calculate the resulting Critical Effect
          critEffect = Math.ceil(critEffect/SIBonus);
          //record the crit type
          critType = "v";
        break;
        case "starship":
          //The critcal effect for starships is not modified
          //However, starships never record critical damage
          remainingWounds = 0;
          //record the hit type
          critType = "s"
        break;
      }
      //report the critical effect to the gm
      whisper("**" + this.character.get("name") + "**: " + getCritLink(["", critType, critLocation], {show: false}) + "(" + critEffect + ")");
    }
    //return any critical damage that remains on the character (or how much health
    //they have left before they start taking critical damage)
    return remainingWounds;
  }

});
