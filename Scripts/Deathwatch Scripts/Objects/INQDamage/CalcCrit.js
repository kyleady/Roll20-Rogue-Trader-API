INQAttack_old = INQAttack_old || {};
INQAttack_old.calcCrit = function(remainingWounds){
  //Has the token taken critical damage?
  if(remainingWounds < 0){
    //strings to contain the details of which crit table to refer to
    var critLocation = "";
    var critType = "";
    //calculate the critical effect that should be applied
    var critEffect =  (-1) * remainingWounds;
    switch(INQAttack_old.targetType){
      case "character":
        //Load up the Wounds and Unnatural Wounds attributes. Warn the gm if
        //they are not found.
        var WBonus = 1;
        var Wounds = attributeValue("Wounds", {characterid: INQAttack_old.character.id, graphicid: INQAttack_old.graphic.id});
        if(Wounds != undefined){
          //Calculate the Wounds Bonus of the Character
          Wounds = Number(Wounds);
          WBonus = Math.floor(Wounds/10);
        }

        var UnnaturalWounds = attributeValue("Unnatural Wounds", {characterid: INQAttack_old.character.id, graphicid: INQAttack_old.graphic.id});
        if(UnnaturalWounds != undefined){
          //Add in Unnatural Wounds to the Wounds Bonus
          UnnaturalWounds = Number(UnnaturalWounds);
          WBonus += UnnaturalWounds;
        }
        //At minimum, the Wounds Bonus is one.
        Math.max(WBonus,1);
        //Calculate the resulting Critical Effect
        critEffect = Math.ceil(critEffect/WBonus);
        //record the crit type
        critType = INQAttack_old.DamType.get("current");
        critLocation = getHitLocation(INQAttack_old.TensLoc.get("current"), INQAttack_old.OnesLoc.get("current"));
      break;
      case "vehicle":
        //Load up the Structural Integrity and Unnatural Structural Integrity
        //Attributes. Warn the gm if they are not found.
        var SIBonus = 1;
        var StrucInt = attributeValue("Structural Integrity", {characterid: INQAttack_old.character.id, graphicid: INQAttack_old.graphic.id});
        if(StrucInt != undefined){
          //Calculate the Structural Integrity Bonus of the Vehicle
          StrucInt = Number(StrucInt);
          SIBonus = Math.floor(StrucInt/10);
        }
        var UnnaturalStrucInt = attributeValue("Unnatural Structural Integrity", {characterid: INQAttack_old.character.id, graphicid: INQAttack_old.graphic.id});
        if(UnnaturalStrucInt != undefined){
          //Add in any Unnatural Structural Integrity to the Bonus
          UnnaturalStrucInt = Number(UnnaturalStrucInt);
          SIBonus += UnnaturalStrucInt;
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
    whisper("**" + INQAttack_old.character.get("name") + "**: " + getCritLink(["", critType, critLocation], INQAttack_old.msg, {show: false}) + "(" + critEffect + ")");
  }
  //return any critical damage that remains on the character (or how much health
  //they have left before they start taking critical damage)
  return remainingWounds;
}
