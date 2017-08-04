//searches every message for rolls to hit and damage rolls.
on("chat:message", function(msg) {
  //if a message matches one of two types of formats, the system records the
  //Damage, Damage Type, Penetration, Primitive, and Felling of the attack.
  //The roll to hit, and thus the number of hits, are expected to be in a
  //different message.

  //Format 1
  //A whisper to the gm
  //"/w gm [name] deals [[damage]] [damagetype] Damage, [[penetration]] Pen
  //[optional list of special rules separated by commas] with a(n) [weapon]"

  //Format 2
  //Similar to above, but in a public emote
  //"/em - [name] deals [[damage]] [damagetype] Damage, [[penetration]] Pen
  //[optional list of special rules separated by commas] with a/an [weapon]"

  //Format 3
  //This roll template can be whispered or publicly shown
  //Any roll template that has a title starting with ""<strong>Damage</strong>: "
  //and its first two inline rolls are Damage and Pen

  //At least two inline rolls are expected
  if( (((msg.type == "emote") || (msg.type == "whisper" && msg.target == "gm"))
  && /deals\s*\$\[\[0\]\]\s*(impact|explosive|rending|energy|.*>I<.*|.*>X<.*|.*>R<.*|.*>E<.*)\s*damage,\s*\$\[\[1\]\]\s*(pen|penetration).*with\s+a/i.test(msg.content)
  )
  || (/^\s*{{\s*name\s*=\s*(<strong>|\*\*)\s*damage\s*(<\/strong>|\*\*):.*}}/i.test(msg.content)
  && /{{\s*(damage|dam)\s*=\s*\$\[\[0\]\]\s*}}/i.test(msg.content)
  && /{{\s*(penetration|pen)\s*=\s*\$\[\[1\]\]\s*}}/i.test(msg.content))
  && msg.inlinerolls.length >= 2) {
    //get the damage details obj
    var details = damDetails();
    //quit if one of the details was not found
    if(details == undefined){
      return;
    }
    var DamTypeObj = details.DamType;
    var DamObj = details.Dam;
    var PenObj = details.Pen;
    var FellObj = details.Fell;
    var PrimObj = details.Prim;

    //I don't know why I need to do this BUT for some reason when the message is sent by the API
    //instead of a player, the inline rolls start with a null object, and accessing a null object is dangerous
    //"with a(n) " is the generic method I have the api using. Player sent commands are expected to be more intelligent
    if(msg.inlinerolls[0] == undefined){
      var rollIndex = 1;
    } else {
      var rollIndex = 0;
    }

    //record Damage Type
    var DamageType;
    if(msg.content.indexOf(" Energy ") !== -1 || msg.content.indexOf(">E<") !== -1){
      DamageType = "E";
    } else if(msg.content.indexOf(" Rending ") !== -1 || msg.content.indexOf(">R<") !== -1){
      DamageType = "R";
    } else if(msg.content.indexOf(" Explosive ") !== -1 || msg.content.indexOf(">X<") !== -1){
      DamageType = "X";
    } else {//if(msg.content.indexOf(" Impact ") !== -1){
      DamageType = "I";
    }
    DamTypeObj.set("current",DamageType);

    //record Damage
    DamObj.set('current', msg.inlinerolls[rollIndex].results.total);

    //record the highest damage roll
    var lowest = 10
    for(var i = 0; i < msg.inlinerolls[rollIndex].results.rolls[0].results.length; i++){
      if(!msg.inlinerolls[rollIndex].results.rolls[0].results[i].d && msg.inlinerolls[rollIndex].results.rolls[0].results[i].v < lowest){
        lowest = msg.inlinerolls[rollIndex].results.rolls[0].results[i].v
      }
    }

    //record Penetration
    PenObj.set('current', msg.inlinerolls[rollIndex + 1].results.total);

    //record Felling
    var fellingIndex = msg.content.indexOf("Felling");
    //is there any Felling inside the weapon?
    if(fellingIndex >= 0){
      //find the parenthesis after Felling
      var startIndex = msg.content.indexOf("(",fellingIndex);
      var endIndex = msg.content.indexOf(")",startIndex);
      //be sure the parenthesis were both found
      if (startIndex >= 0 && endIndex >= 0 && Number(msg.content.substring(startIndex+1,endIndex))){
        //record the amount of felling
        FellObj.set('current',Number(msg.content.substring(startIndex+1,endIndex)));
      } else {
        //record zero felling
        FellObj.set('current', 0);
      }
    } else {
      //record zero felling
      FellObj.set('current', 0);
    }

    //record Primitive
    //if the weapon is Primitive and does not have the mono upgrade
    if(msg.content.indexOf("Primitive") != -1 && msg.content.indexOf("Mono") == -1) {
      //record Primitive
      PrimObj.set("current",1);
      //report to the gm that everything was found
      whisper("Dam: " + DamObj.get("current") + " " + DamTypeObj.get("current") + ", Pen: " +  PenObj.get("current") + ", Felling: " + FellObj.get("current") + ", Primitive");
    }  else {
      //record Primitive
      PrimObj.set("current",0);
      //report to the gm that everything was found
      whisper("Dam: " + DamObj.get("current") + " " + DamTypeObj.get("current") + ", Pen: " +  PenObj.get("current") + ", Felling: " + FellObj.get("current"));
    }

    //create a button to report the lowest damage roll
    var lowestButton = "<strong>Lowest</strong>: "
    lowestButton += "[" + lowest.toString() + "]";
    lowestButton += "("
    lowestButton += "!{URIFixed}" + encodeURIFixed("Crit?");
    lowestButton += ")";
    //was this a private attack?
    if(msg.type == "whisper"){
      //report the highest roll privately
      whisper(lowestButton);
    } else {
      //report the highest roll publicly
      announce(lowestButton)
    }

    //save the damage variables to their maximums as well
    DamObj.set("max",DamObj.get("current"));
    DamTypeObj.set("max",DamTypeObj.get("current"));
    PenObj.set("max",PenObj.get("current"));
    FellObj.set("max",FellObj.get("current"));
    PrimObj.set("max",PrimObj.get("current"));
  }
});
