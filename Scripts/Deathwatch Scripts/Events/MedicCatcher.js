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
    prev: Number(prev.get('bar3_value')),
    current: Number(obj.get("bar3_value")),
    max: Number(obj.get("bar3_max"))
  }

  if(Wounds.current == NaN || Wounds.max == NaN || Wounds.prev == NaN) return;
  if(Wounds.current - Wounds.prev <= 0) return;

  //find the Max Healing attribute
  var MaxHealing = attributeValue("Max Healing", {graphicid: obj.id, alert: false});

  //be sure you found at least one Max Healing attribute
  //otherwise ignore the change
  if(MaxHealing != undefined){
    //record the Max Healing in number format
    MaxHealing = Number(MaxHealing);

    //quit if Max Healing is not a number
    if(MaxHealing == NaN) return;

    //is the new health greater than the current cap?
    if(Wounds.current > MaxHealing){
      MaxHealing = (Wounds.current > Wounds.max) ? Wounds.max : Wounds.current;
      attributeValue("Max Healing", {setTo: MaxHealing, graphicid: obj.id, alert: false});
      attributeValue("Max Healing", {setTo: MaxHealing, graphicid: obj.id, alert: false, max: true});
      whisper("Healing Cap set to " + MaxHealing + "/" + Wounds.max + ".");
    }
  }
});
