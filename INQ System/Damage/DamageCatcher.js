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

    //was this a private attack?
    if(msg.type == "whisper"){
      //report the highest roll privately
      whisper('<strong>Lowest</strong>: [' + lowest.toString() + "](!Crit?)");
    } else {
      //report the highest roll publicly
      sendChat("",'/desc <strong>Lowest</strong>: [' + lowest.toString() + "](!Crit?)")
    }

    //save the damage variables to their maximums as well
    DamObj.set("max",DamObj.get("current"));
    DamTypeObj.set("max",DamTypeObj.get("current"));
    PenObj.set("max",PenObj.get("current"));
    FellObj.set("max",FellObj.get("current"));
    PrimObj.set("max",PrimObj.get("current"));


  //If the message was a roll to hit, record the number of Hits. The roll to hit
  //must be a roll template and that roll template must have the following

  //A title begining with "<strong>WS</strong>: ", "<strong>BS</strong>: ", or
  //"<strong>Wp</strong>: ".
  //The first inline roll must be the number of successes
  //The second inline roll must be the number of unnatural successes
  //There must be exactly two inline rolls
  }
  else if(/^\s*{{\s*name\s*=\s*(<strong>|\*\*)\s*(WS|BS|Wp)\s*(<\/strong>|\*\*):.*}}/i.test(msg.content)
  && /{{\s*successes\s*=\s*\$\[\[0\]\]\s*}}/i.test(msg.content)
  && /{{\s*unnatural\s*=\s*\$\[\[1\]\]\s*}}/i.test(msg.content)
  && msg.inlinerolls.length == 2) {
    //record the number of hits
    var HitsObj = findObjs({ type: 'attribute', name: "Hits" })[0];
    //besure there is a Hits Attribute to work with
    if(HitsObj == undefined){
      return whisper("No attribute named Primitive was found anywhere in the campaign. Damage was not recorded.");
    }

    //load up the AmmoTracker object to calculate the hit location
    saveHitLocation(msg.inlinerolls[0].results.rolls[1].results[0].v);

    //if the number of successes was positive, add in Unnatural and save it
    if(msg.inlinerolls[0].results.total > 0){
      //the negative modifier keeps the total number of hits <= -1 while still
      //storing the number of hits, this is because all hits are assumed to be
      //Single Shot mode, but later commands such as (!Full and !Semi) will
      //convert these negative numbers into a positive number of hits.
      HitsObj.set('current', (-1)*(1 + Math.floor(msg.inlinerolls[0].results.total) + Math.floor(msg.inlinerolls[1].results.total)));
    //otherwise record that there were no hits
    } else {
      HitsObj.set('current', 0);
    }

    //check for perils of the warp
    if(/^\s*{{\s*name\s*=\s*<strong>\s*Wp\s*<\/strong>:.*}}/i.test(msg.content)){
      //was the one's place a 9?
      if((msg.inlinerolls[0].results.rolls[1].results[0].v - 10*Math.floor(msg.inlinerolls[0].results.rolls[1].results[0].v/10)) == 9){
          sendChat("The warp","/em makes an unexpected twist. (" + GetLink("Psychic Phenomena") + ")")
      }
    } else if(/^\s*{{\s*name\s*=\s*<strong>\s*BS\s*<\/strong>:.*}}/i.test(msg.content)){
      //was the roll >= 96?
      if(msg.inlinerolls[0].results.rolls[1].results[0].v >= 96){
        //warn the gm that the weapon jammed
        whisper("Weapon Jam!");
      //Full Auto and Semi Auto attacks jam on a 94+. Warn the gm just in case
      //this is one of them.
      } else if(msg.inlinerolls[0].results.rolls[1].results[0].v >= 94){
        //warn the gm that the weapon may have jammed
        whisper("Full/Semi Auto Weapon Jam!");
      }
    }
  }
  //Watches for starship attack damage. It records the damage and penetration
  //of the starship attack. The message must have the form of a roll template.
  //The title must start with "<strong>Damage<strong>:"
  //The first entry must be Damage with an inline roll
  //The second entry must be the type of weapon used: Macro, Lance, Torpedo,Nova, Bomber
  else if(/^\s*{{\s*name\s*=\s*(<strong>|\*\*)\s*damage\s*(<\/strong>|\*\*):.*}}\s*{{\s*(damage|dam)\s*=\s*\$\[\[0\]\]\s*}}\s*{{\s*type\s*=\s*(macro|nova|torpedo|lance|bomber)\s*}}/i.test(msg.content)
  && msg.inlinerolls.length >= 1) {
    //I don't know why I need to do this BUT for some reason when the message is sent by the API
    //instead of a player, the inline rolls start with a null object, and accessing a null object is dangerous
    //"with a(n) " is the generic method I have the api using. Player sent commands are expected to be more intelligent
    var rollIndex = 0;
    if(msg.inlinerolls[rollIndex] == undefined){
        rollIndex++;
    }
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

    //prepare to numically modifify the old damage
    starshipDamage = Number(DamObj.get("current"));

    //was the last attack a starship attack?
    if(DamTypeObj.get('current') != "S"){
        //we are now making this starship damage
        DamTypeObj.set('current', "S");
        //the new damage is just saved without regard for any of the old damage
        starshipDamage = msg.inlinerolls[rollIndex].results.total;
    } else {
        //add the new damage to the old damage
        starshipDamage += msg.inlinerolls[rollIndex].results.total;
    }

    //record the total Damage
    DamObj.set('current', starshipDamage);

    //record Penetration
    //is the weapon a lance or a nova weapon?
    if(msg.content.toLowerCase().indexOf("lance") != -1 || msg.content.toLowerCase().indexOf("nova") != -1){
      PenObj.set('current', 1);
      whisper("Dam: " + DamObj.get("current") + ", Pen: true");
    } else {
      PenObj.set('current', 0);
      whisper("Dam: " + DamObj.get("current") + ", Pen: false");
    }

    //record the attack to max as well
    DamObj.set('max',DamObj.get("current"));
    DamTypeObj.set('max',DamTypeObj.get("current"));
    PenObj.set('max',PenObj.get("current"));
  }
});
