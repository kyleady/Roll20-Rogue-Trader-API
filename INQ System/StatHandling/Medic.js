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
    //find the remaining wounds attribute
    var Woundsobjs = findObjs({
      _type: "attribute",
      _characterid: character.id,
      name: "Wounds"
    });
    //if there are no wounds objects, then this is not a character
    if(Woundsobjs.length <= 0){
      return whisper(character.get("name") + " has no wounds.");
    }
    //add the current Wounds to the healing done
    var NewWounds = Number(Woundsobjs[0].get("current")) + Healing;
    //find the Max Healing attribute
    var MaxHealingobjs = findObjs({
      _type: "attribute",
      _characterid: character.id,
      name: "Max Healing"
    });
    //does the Max Healing attribute exist?
    if(MaxHealingobjs.length > 0){
      //turn the max healing into a number
      MaxHealing = Number(MaxHealingobjs[0].get("current"));
      //be sure max healing is a valid number
      if(MaxHealing != NaN && MaxHealing > 0){
        //are the wounds more than the max healing allowed?
        if(NewWounds > MaxHealing){
          //reduce the new healed wounds to the cap
          NewWounds = MaxHealing;
        }
      }
      //are the wounds more than the max wounds?
      if(NewWounds > Woundsobjs[0].get("max")){
        //reduce the new healed wounds to the cap
        NewWounds = Woundsobjs[0].get("max");
      }
      //set the Max Healing to the NewWounds
      MaxHealingobjs[0].set("current", NewWounds);
      MaxHealingobjs[0].set("max", NewWounds);
    } else {
      //the Max Healing Attribute does not exist yet.
      //are the wounds more than the max wounds?
      if(NewWounds > Woundsobjs[0].get("max")){
        //reduce the new healed wounds to the cap
        NewWounds = Woundsobjs[0].get("max");
      }
      //create a Max Healing attribute and set it to the NewWounds
      createObj("attribute", {
        name: "Max Healing",
        current: NewWounds,
        max: NewWounds,
        characterid: character.id
      });
    }
    //now that all the healing has been done, set the character's wounds wounds equal to the NewWounds
    Woundsobjs[0].set("current",NewWounds);
    //report the total healing
    announce(character.get("name") + " has been healed to [[" + NewWounds.toString() + "]]/" + Woundsobjs[0].get("max") + " Wounds.");
  });
}

/*
whenever the wounds of a character is directly healed (assuming proper healing),
then push up the Max Healing cap along with it
*/
on("change:attribute:current", function(obj, prev) {
  //quit if the attribute changed was not Wounds
  if(obj.get("name") != "Wounds"){return;}

  //get the current and max wounds in number format
  var CurrentWounds = Number(obj.get("current"));
  var MaxWounds = Number(obj.get("max"));

  //quit if either the current or max wounds are not numbers
  if(CurrentWounds == NaN || MaxWounds == NaN){return;}

  //quit if the character was damaged (we care about healing)
  if(CurrentWounds - Number(prev.current) < 0){return;}

  //find the Max Healing attribute
  var MaxHealingobjs = findObjs({
    _type: "attribute",
    _characterid: obj.get("_characterid"),
    name: "Max Healing"
  });

  //be sure you found at least one Max Healing attribute
  //otherwise ignore the change
  if(MaxHealingobjs.length > 0){
    //record the Max Healing in number format
    var MaxHealing = Number(MaxHealingobjs[0].get("current"));

    //quit if Max Healing is not a number
    if(MaxHealing == NaN){return;}

    //is the new health greater than the current cap?
    if(CurrentWounds > MaxHealing){
      //is the new health greater than the max health?
      if(CurrentWounds > MaxWounds){
        //the healing cap can only go so far as maxHP, even in extreme circumstances
        MaxHealingobjs[0].set("current",obj.get("max"));
        MaxHealingobjs[0].set("max",obj.get("max"));
      } else {
        //record that the healing cap can only go this far
        MaxHealingobjs[0].set("current",obj.get("current"));
        MaxHealingobjs[0].set("max",obj.get("current"));
      }
      //report the new Healing Cap to the gm
      whisper("Healing Cap set to " + MaxHealingobjs[0].get("current").toString() + "/" + obj.get("max").toString() + ".");
    }
  }
});

//adds the commands after CentralInput has been initialized
on("ready", function() {
  //Lets players use medicae on other characters while keeping track of the
  //healing done.
  CentralInput.addCMD(/^!\s*medic\s*(\d+)\s*$/i, medic, true);
});
