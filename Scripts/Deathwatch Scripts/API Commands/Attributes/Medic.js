/*
medic command to heal a character up to their highest healing, while recording
how high they healed to. With these rules you can be healed as many times as you
want, but each time you record how high you healed up to. After that, you can
only heal up to that point until you receive proper care.
*/
 function medic(matches, msg){
  //get the number of wounds to be healed
  var Healing = Number(matches[1]);
  //be sure the number is valid
  if(!Healing){
      return whisper("Invalid amount to be healed.")
  }

  eachCharacter(msg, function(character, graphic){
    //the red bar is used to represent the characters wounds
    //it may or may not be linked to the wounds attribute, that is not important
    var Wounds = {
      current: Number(graphic.get("bar3_value")),
      max: Number(graphic.get("bar3_max"))
    }
    //if the wounds were not properly defined, then this is not a character
    if(Wounds.current == NaN || Wounds.max == NaN){
      return whisper(character.get("name") + " has no wounds.");
    }
    //add the current Wounds to the healing done
    var NewWounds = Wounds.current + Healing;
    //find the Max Healing attribute
    var MaxHealing = attributeValue("Max Healing", {graphicid: graphic.id, characterid: character.id, alert: false});
    //does the Max Healing attribute exist?
    if(MaxHealing != undefined) {
      //turn the max healing into a number
      MaxHealing = Number(MaxHealing);
      //be sure max healing is a valid number
      if(MaxHealing != NaN && MaxHealing > 0){
        //are the wounds more than the max healing allowed?
        if(NewWounds > MaxHealing){
          //reduce the new healed wounds to the cap
          NewWounds = MaxHealing;
        }
      }
    }
    //are the wounds more than the max wounds?
    if(NewWounds > Wounds.max){
      //reduce the new healed wounds to the cap
      NewWounds = Wounds.max;
    }
    //create/edit the Max Healing attribute and set it to the NewWounds
    attributeValue("Max Healing", {setTo: NewWounds, graphicid: graphic.id, characterid: character.id, alert: false});
    //set the max healing attribute's max value equal to its current value (if it exists!)
    //if a character has their max healing attribute set to its max value for some reason,
    //we don't want it to be some old value that we forgot about
    var MaxHealingobjs = findObjs({
      name: "Max Healing",
      _characterid: character.id,
      _type: "attribute"
    });
    if(MaxHealingobjs && MaxHealingobjs.length > 0){
      MaxHealingobjs[0].set("max", MaxHealingobjs[0].get("current"));
    }

    //now that all the healing has been done, set the character's wounds wounds equal to the NewWounds
    graphic.set("bar3_value", NewWounds);
    //report the total healing
    announce(character.get("name") + " has been healed to [[" + NewWounds.toString() + "]]/" + Wounds.max.toString() + " Wounds.");
  });
}

//adds the commands after CentralInput has been initialized
on("ready", function() {
  //Lets players use medicae on other characters while keeping track of the
  //healing done.
  CentralInput.addCMD(/^!\s*medic\s*(\d+)\s*$/i, medic, true);
});
