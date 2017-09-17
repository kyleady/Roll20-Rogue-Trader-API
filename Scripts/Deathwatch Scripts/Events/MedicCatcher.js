/*
whenever the wounds of a character is directly healed (assuming proper healing),
then push up the Max Healing cap along with it

Note: If you have multiple tokens linked to the same character (perhaps on
different pages) this event will trigger for each token. This is fine because
this function is idempotent. It sets the Max Healing value to the New Wounds.

Warning: This will not work if you change a character's wounds from the character
sheet while there is no token in the entire campaign that has its bar3 linked
to the character's wounds. This is highly unlikely to occur in your campign but
it is worth knowing.
*/
on("change:graphic:bar3_value", function(obj, prev) {
  //be sure the token represents a character
  if(getObj("character", obj.get("represents")) == undefined){return;}
  //get the current and max wounds in number format
  var Wounds = {
    current: Number(obj.get("bar3_value")),
    max: Number(obj.get("bar3_max"))
  }
  //quit if either the current or max wounds are not numbers
  if(Wounds.current == NaN || Wounds.current == NaN){return;}

  //quit if the character was damaged (we care about healing)
  if(Wounds.current - Number(prev) < 0){return;}

  //find the Max Healing attribute
  var MaxHealing = attributeValue("Max Healing", {graphicid: obj.id, alert: false});

  //be sure you found at least one Max Healing attribute
  //otherwise ignore the change
  if(MaxHealing != undefined){
    //record the Max Healing in number format
    MaxHealing = Number(MaxHealing);

    //quit if Max Healing is not a number
    if(MaxHealing == NaN){return;}

    //is the new health greater than the current cap?
    if(Wounds.current > MaxHealing){
      //is the new health greater than the max health?
      if(Wounds.current > Wounds.max){
        //the healing cap can only go so far as maxHP, even in extreme circumstances
        attributeValue("Max Healing", {setTo: Wounds.max, graphicid: obj.id, alert: false});
        MaxHealing = Wounds.max;
      } else {
        //record that the healing cap can only go this far
        attributeValue("Max Healing", {setTo: Wounds.current, graphicid: obj.id, alert: false});
        MaxHealing = Wounds.current;
      }
      //set the max healing attribute's max value equal to its current value (if it exists!)
      //if a character has their max healing attribute set to its max value for some reason,
      //we don't want it to be some old value that we forgot about
      var MaxHealingobjs = findObjs({
        name: "Max Healing",
        _characterid: obj.get("represents"),
        _type: "attribute"
      });
      if(MaxHealingobjs && MaxHealingobjs.length > 0){
        MaxHealingobjs[0].set("max", MaxHealingobjs[0].get("current"));
      }
      //report the new Healing Cap to the gm
      whisper("Healing Cap set to " + MaxHealing.toString() + "/" + Wounds.max.toString() + ".");
    }
  }
});
