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
    //load up all of the damage variables, wherever they may be
    var DamTypeObj = findObjs({ type: 'attribute', name: "Damage Type" })[0];
    var DamObj = findObjs({ type: 'attribute', name: "Damage" })[0];
    var PenObj = findObjs({ type: 'attribute', name: "Penetration" })[0];
    var FellObj = findObjs({ type: 'attribute', name: "Felling" })[0];
    var PrimObj = findObjs({ type: 'attribute', name: "Primitive" })[0];

    //be sure every variable was successfully loaded
    var successfulLoad = true;
    //warn the gm for each attribute that was not found
    if(DamTypeObj == undefined){
      successfulLoad = false;
      whisper("No attribute named Damage Type was found anywhere in the campaign. Damage was not recorded.");
    }
    if(DamObj == undefined){
      successfulLoad = false;
      whisper("No attribute named Damage was found anywhere in the campaign. Damage was not recorded.");
    }
    if(PenObj == undefined){
      successfulLoad = false;
      whisper("No attribute named Penetration was found anywhere in the campaign. Damage was not recorded.");
    }
    if(FellObj == undefined){
      successfulLoad = false;
      whisper("No attribute named Felling was found anywhere in the campaign. Damage was not recorded.");
    }
    if(PrimObj == undefined){
      successfulLoad = false;
      whisper("No attribute named Primitive was found anywhere in the campaign. Damage was not recorded.");
    }
    if(successfulLoad == false){
      return;
    }

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
    //
    } else {//if(msg.content.indexOf(" Impact ") !== -1){
      DamageType = "I";
    }
    DamTypeObj.set("current",DamageType);

    //record Damage
    DamObj.set('current', msg.inlinerolls[rollIndex].results.total);

    //record the lowest damage roll
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
      //report the lowest roll privately
      sendChat("System",'/w gm <strong>Lowest</strong>: [' + lowest.toString() + "](!Crit)")
    } else {
      //report the lowest roll publicly
      sendChat("",'/desc <strong>Lowest</strong>: [' + lowest.toString() + "](!Crit)")
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
    ammoObj = new AmmoTracker;
    ammoObj.calculateLocation(msg.inlinerolls[0].results.rolls[1].results[0].v);

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
    //load up the damage attributes
    var DamObj = findObjs({ type: 'attribute', name: "Damage" })[0];
    var DamTypeObj = findObjs({ type: 'attribute', name: "Damage Type" })[0];
    var PenObj = findObjs({ type: 'attribute', name: "Penetration" })[0];

    //be sure every variable was successfully loaded
    var successfulLoad = true;
    //warn the gm for each attribute that was not found
    if(DamTypeObj == undefined){
      successfulLoad = false;
      whisper("No attribute named Damage Type was found anywhere in the campaign. Damage was not recorded.");
    }
    if(DamObj == undefined){
      successfulLoad = false;
      whisper("No attribute named Damage was found anywhere in the campaign. Damage was not recorded.");
    }
    if(PenObj == undefined){
      successfulLoad = false;
      whisper("No attribute named Penetration was found anywhere in the campaign. Damage was not recorded.");
    }
    if(successfulLoad == false){
      return;
    }

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

//a function which converts the numer of successes into a number of Hits
//if a number of hits is not specified, it will default to the number of
//successes saved in the last roll. The number will be negative as the number
//of Hits is 1 by default. This function converts that negative number into
//a positive number by the Full Auto formula.
function fullautoConverter(matches,msg){
  //record the number of hits
  var HitsObj = findObjs({ type: 'attribute', name: "Hits" })[0];
  //besure there is a Hits Attribute to work with
  if(HitsObj == undefined){
    return whisper("No attribute named Primitive was found anywhere in the campaign. Damage was not recorded.");
  }

  //did the user specify a number of Successes?
  if(matches[1] != ""){
    var Hits = Number(matches[1]) + 1;
  //otherwise, default to the numer of succeses recorded from the last roll to
  //hit
  } else {
    //check if the stored number of successes has already been converted
    if(HitsObj.get("current") > 0){
      return whisper("Number of successes has already been converted into " + HitsObj.get("current") + " hits. Aborting.");
    }
    //convert the number of successes into hits
    var Hits = (-1) * HitsObj.get("current");
  }

  //Round the number of hits, just in case
  Hits = Math.round(Hits);

  //Save the number of hits.
  HitsObj.set("current",Hits);

  //Report the number of hits
  whisper("Hits: " + HitsObj.get("current"));
}

//a function which converts the numer of successes into a number of Hits
//if a number of hits is not specified, it will default to the number of
//successes saved in the last roll. The number will be negative as the number
//of Hits is 1 by default. This function converts that negative number into
//a positive number by the Semi Auto formula.
function semiautoConverter(matches,msg){
  //record the number of hits
  var HitsObj = findObjs({ type: 'attribute', name: "Hits" })[0];
  //besure there is a Hits Attribute to work with
  if(HitsObj == undefined){
    return whisper("No attribute named Primitive was found anywhere in the campaign. Damage was not recorded.");
  }

  //did the user specify a number of Successes?
  if(matches[1] != ""){
    var Hits = Math.floor(Number(matches[1]) / 2) + 1;
  //otherwise, default to the numer of succeses recorded from the last roll to
  //hit
  } else {
    //check if the stored number of successes has already been converted
    if(HitsObj.get("current") > 0){
      return whisper("Number of successes has already been converted into " + HitsObj.get("current") + " hits. Aborting.");
    }
    //convert the number of successes into hits
    var Hits = Math.floor( ((-1) * Number(HitsObj.get("current")) - 1) / 2 ) + 1;
  }

  //Round the number of hits, just in case
  Hits = Math.round(Hits);

  //Save the number of hits.
  HitsObj.set("current",Hits);

  //Report the number of hits
  whisper("Hits: " + HitsObj.get("current"));
}

//a function that privately whispers a link to the relavant crit table
//matches[0] is the same as msg.content
//matches[1] is the type of critical hit table: vehicle, starship, impact, etc
//matches[2] is the location: head, body, legs, arm
function showCritTable(matches, msg){
  //determine table type based on user input
  switch (matches[1].toLowerCase()){
    case "v": case "vehicle":
      return whisper("**Critical Hit**: " + GetLink("Vehicle Critical Effects"),msg.playerid);
    break;
    case "s": case "starship":
      return whisper("**Critical Hit**: " + GetLink("Starship Critical Effects"),msg.playerid);
    break;
    case "i": case "impact":
      matches[1] = "Impact";
    break;
    case "r": case "rending":
      matches[1] = "Rending";
    break;
    case "e": case "energy":
      matches[1] = "Energy";
    break;
    case "x": case "explosive":
      matches[1] = "Explosive";
    break;
    default:
      //if the user did not give a effect type input, default to the stored
      //damage type
      var DamTypeObj = findObjs({ type: 'attribute', name: "Damage Type" })[0];
      if(DamTypeObj == undefined){
        whisper("There is no Damage Type attribute in the campaign.",msg.playerid);
        return whisper("There is no Damage Type attribute in the campaign.");
      }

      //determine the effect table based on the recorded damage type
      switch(DamTypeObj.get("current").toLowerCase()){
        case "s":
          return whisper("**Critical Hit**: " + GetLink("Starship Critical Effects"),msg.playerid);
        break;
        case "i":
          matches[1] = "Impact";
        break;
        case "r":
          matches[1] = "Rending";
        break;
        case "e":
          matches[1] = "Energy";
        break;
        case "x":
          matches[1] = "Explosive";
        break;
        default:
          return whisper("Unknown Damage Type",msg.playerid);
        break;
      }
    break;
  }

  //determine hit location based on user input
  if(/^(h|head)$/i.test(matches[2])){
    matches[2] = "Head";
  } else if(/^((|l|r)\s*a|(|left|right)\s*arms?)$/.test(matches[2])){
    matches[2] = "Arm";
  } else if(/^(b|body)$/.test(matches[2])){
    matches[2] = "Body";
  } else if(/^((|l|r)\s*l|(|left|right)\s*legs?)$/.test(matches[2])){
    matches[2] = "Leg";
  //the user did not specify a location, default to the hit location
  } else {
    //refer to the damage variables to determine the hit location
    var onesLocObj = findObjs({ _type: "attribute", name: "OnesLocation"})[0];
    //be sure the OnesLocation was found
    if(onesLocObj == undefined){
      whisper("The OnesLocation attribute does not exist anywhere in the campaign.",msg.playerid);
      return whisper("The OnesLocation attribute does not exist anywhere in the campaign.");
    }
    switch(Number(onesLocObj.get("current"))) {
        case 0: case 10:
          matches[2] = "Head"
          break;
        case 1: case 2: case 3:
          matches[2] = "Leg"
          break;
        case 8: case 9:
          matches[2] = "Arm"
          break;
        case 4: case 5: case 6: case 7:
          matches[2] = "Body"
          break;
        default:
          whisper("Location unknown.",msg.playerid);
          return whisper("Location unknown.");
          break;
    }
  }

  //now that damage type and location have been determined, return the link to the user
  whisper("**Critical Hit**: " + GetLink(matches[1] + " Critical Effects - " + matches[2]),msg.playerid);
}

//a function which reduces the penetration and then damage of an attack with
//Primitive cover.

//matches[0] is the same as msg.content
//matches[1] is the positive numerical value of the cover's AP
function applyCover(matches,msg){
  //load up the relavant damage variables
  var DamObj = findObjs({ type: 'attribute', name: "Damage" })[0];
  var PenObj = findObjs({ type: 'attribute', name: "Penetration" })[0];
  var attributesUndefiend = false;
  if(DamObj == undefined){
    whisper("There is no Damage attribute in the campaign.");
    attributesUndefiend = true;
  }
  if(PenObj == undefined){
    whisper("There is no Penetration attribute in the campaign.");
    attributesUndefiend = true;
  }
  if(attributesUndefiend){
    return;
  }
  //reduce the penetration by half the cover
  var pen = Number(PenObj.get("current")) - Number(matches[1])/2;
  //has the cover been entirely used?
  if(pen >= 0){
    //record the remaining Penetration
    PenObj.set('current', Math.round(pen));
  } else {
    //record the 0 penetration left
    PenObj.set('current', 0);
    //reduce the damage by the remaining cover
    var dam = Number(DamObj.get("current")) + 2*pen;
    //does any cover remain?
    if(dam >= 0){
        //record the remaining damage
        DamObj.set('current', dam);
    } else {
        //record the remaining damage
        DamObj.set('current', 0);
    }
  }
  //alert the GM
  whisper("Dam: " + DamObj.get("current") + ", Pen: " + PenObj.get("current"));
}

//resets all the damage variables to their maximum values (the attack before any
//modifications)
function attackReset(matches,msg){
  //load up all of the damage variables, wherever they may be
  var DamTypeObj = findObjs({ type: 'attribute', name: "Damage Type" })[0];
  var DamObj = findObjs({ type: 'attribute', name: "Damage" })[0];
  var PenObj = findObjs({ type: 'attribute', name: "Penetration" })[0];
  var FellObj = findObjs({ type: 'attribute', name: "Felling" })[0];
  var PrimObj = findObjs({ type: 'attribute', name: "Primitive" })[0];

  //be sure every variable was successfully loaded
  var successfulLoad = true;
  //warn the gm for each attribute that was not found
  if(DamTypeObj == undefined){
    successfulLoad = false;
    whisper("No attribute named Damage Type was found anywhere in the campaign. Damage was not recorded.");
  }
  if(DamObj == undefined){
    successfulLoad = false;
    whisper("No attribute named Damage was found anywhere in the campaign. Damage was not recorded.");
  }
  if(PenObj == undefined){
    successfulLoad = false;
    whisper("No attribute named Penetration was found anywhere in the campaign. Damage was not recorded.");
  }
  if(FellObj == undefined){
    successfulLoad = false;
    whisper("No attribute named Felling was found anywhere in the campaign. Damage was not recorded.");
  }
  if(PrimObj == undefined){
    successfulLoad = false;
    whisper("No attribute named Primitive was found anywhere in the campaign. Damage was not recorded.");
  }
  if(successfulLoad == false){
    return;
  }

  //reset the damage variables to their maximums
  DamObj.set("current",DamObj.get("max"));
  DamTypeObj.set("current",DamTypeObj.get("max"));
  PenObj.set("current",PenObj.get("max"));
  FellObj.set("current",FellObj.get("max"));
  PrimObj.set("current",PrimObj.get("max"));

  //report the resut
  attackShow()
}
//used throughout DamageCatcher.js to whisper the full attack variables in a
//compact whisper
//matches[0] is the same as msg.content
//matches[1] is a flag for (|max)
function attackShow(matches,msg){
  //load up all of the damage variables, wherever they may be
  var DamTypeObj = findObjs({ type: 'attribute', name: "Damage Type" })[0];
  var DamObj = findObjs({ type: 'attribute', name: "Damage" })[0];
  var PenObj = findObjs({ type: 'attribute', name: "Penetration" })[0];
  var FellObj = findObjs({ type: 'attribute', name: "Felling" })[0];
  var PrimObj = findObjs({ type: 'attribute', name: "Primitive" })[0];

  //be sure every variable was successfully loaded
  var successfulLoad = true;
  //warn the gm for each attribute that was not found
  if(DamTypeObj == undefined){
    successfulLoad = false;
    whisper("No attribute named Damage Type was found anywhere in the campaign. Damage was not recorded.");
  }
  if(DamObj == undefined){
    successfulLoad = false;
    whisper("No attribute named Damage was found anywhere in the campaign. Damage was not recorded.");
  }
  if(PenObj == undefined){
    successfulLoad = false;
    whisper("No attribute named Penetration was found anywhere in the campaign. Damage was not recorded.");
  }
  if(FellObj == undefined){
    successfulLoad = false;
    whisper("No attribute named Felling was found anywhere in the campaign. Damage was not recorded.");
  }
  if(PrimObj == undefined){
    successfulLoad = false;
    whisper("No attribute named Primitive was found anywhere in the campaign. Damage was not recorded.");
  }
  if(successfulLoad == false){
    return;
  }

  if(matches && matches[1] && matches[1].toLowerCase() == "max"){
    matches[1] = "max";
  } else {
    matches = [];
    matches[1] = "current";
  }

  if(DamTypeObj.get(matches[1]).toLowerCase() == "s"){
    if(PenObj.get(matches[1])){
      whisper("Dam: " + DamObj.get(matches[1]) + ", Pen: true");
    } else {
      whisper("Dam: " + DamObj.get(matches[1]) + ", Pen: false");
    }
  } else {
    if(PrimObj.get(matches[1])) {
      whisper("Dam: " + DamObj.get(matches[1]) + " " + DamTypeObj.get(matches[1]) + ", Pen: " +  PenObj.get(matches[1]) + ", Felling: " + FellObj.get(matches[1]) + ", Primitive");
    }  else {
      whisper("Dam: " + DamObj.get(matches[1]) + " " + DamTypeObj.get(matches[1]) + ", Pen: " +  PenObj.get(matches[1]) + ", Felling: " + FellObj.get(matches[1]));
    }
  }
}

//a function which accepts input to override the targeted location of a creature, vehicle, or starship
//matches[0] is the same as msg.content
//matches[1] is the indicator for left or right (l|r|left|right)
//matches[2] is the abriviation or full name of the desired location
function hitlocationHandler(matches,msg){
  //load up the hit location attributes
  onesLocObj = findObjs({_type: "attribute", name: "OnesLocation"})[0];
  tensLocObj = findObjs({_type: "attribute", name: "TensLocation"})[0];

  //are they defined?
  var objsAreDefined = true;
  if(onesLocObj == undefined){
    whisper("The OnesLocation attribute was not found anywhere in the campaign.");
    objsAreDefined = false;
  }
  if(tensLocObj == undefined){
    whisper("The TensLocation attribute was not found anywhere in the campaign.");
    objsAreDefined = false;
  }
  //if at least one of the objects was not found, exit
  if(objsAreDefined == false){
    return;
  }

  var targeting = "";
  //did the user specify left or right?
  switch(matches[1].toLowerCase()){
    case "l": case "left":
      tensLocObj.set("current","1");
      targeting = "Left ";
    break;
    case "r": case "right":
      tensLocObj.set("current","0");
      targeting = "Right ";
    break;
  }

  //store the specified side numerically
  switch(matches[2].toLowerCase()){
    //characters
    case "h": case "head":
      onesLocObj.set("current","0");
      targeting = "Head";
    break;
    case "a": case "arm":
      onesLocObj.set("current","8");
      targeting += "Arm";
    break;
    case "b": case "body":
      onesLocObj.set("current","4");
      targeting = "Body";
    break;
    case "l": case "leg":
      onesLocObj.set("current","1");
      targeting += "Leg";
    break;

    //vehicles and starships
    case "front": case "f": case "fore":
      tensLocObj.set('current', "0");
      targeting = "Front";
    break;
    case "side": case "s":
      tensLocObj.set('current', "-1");
      targeting = "Side";
    break;
    case "starboard":
      tensLocObj.set('current', "-1");
      targeting = "starboard";
    break;
    case "rear": case "r": case "aft":
      tensLocObj.set('current', "-2");
      targeting = "Rear";
    break;
    case "port": case "p":
      tensLocObj.set('current', "-3");
      targeting = "Port";
    break;
  }

  //report to the gm what we are now targeting
  whisper("Targeting: " + targeting);
}

//applies status markers for the various starship critical hits based on user
//input
//matches[0] is the same as msg.content
//matches[1] is number rolled on the crit table or a short name for the critical
//  effect
//matches[2] is the sign of the number of times to apply the crit
//matches[3] is the number of times to apply the crit (by default this is one)
function applyCrit(matches,msg){
  //be something is selected
  if(msg.selected == undefined || msg.selected.length <= 0) {
      return whisper("Nothing selected.");
  }

  //default to applying this crit once
  if(matches[3] == undefined || matches[3] == "" ){
    critQty = 1;
  } else {
    critQty = Number(matches[2] + matches[3]);
  }

  //apply the crit effect to every selected token
  _.each(msg.selected,function(obj){
    var graphic = getObj("graphic", obj._id);
    //be sure the graphic exists
    if(graphic == undefined) {
      return sendChat("System", "/w gm Graphic undefined.");
    }

    //which status marker corresponds to the critical effect?
    var statMarker = "";
    var effectName = "[Error]";
    switch(matches[1].toLowerCase()){
      case "depressurized": case "1":
        statMarker = "status_edge-crack";
        effectName = "Component Depressurized"
      break;
      case "damaged": case "2":
        statMarker = "status_spanner";
        effectName = "Component Damaged"
      break;
      case "sensors": case "3":
        statMarker = "status_bleeding-eye";
        effectName = "Sensors Damaged"
      break;
      case "thrusters": case "4":
        statMarker = "status_cobweb";
        effectName = "Thrusters Damaged"
      break;
      case "fire": case "5":
        statMarker = "status_half-haze";
        effectName = "Fire!"
      break;
      case "engines": case "6":
        statMarker = "status_snail";
        effectName = "Engine Damaged"
      break;
      case "unpowered": case "7":
        statMarker = "status_lightning-helix";
        effectName = "Component Unpowered"
      break;
    }

    //what is the number marker on this badge?
    var degeneracy = Number(graphic.get(statMarker));
    //add the input
    degeneracy += critQty;
    //are there still any badges?
    if(degeneracy > 0){
      //update the badge
      graphic.set(statMarker,degeneracy.toString());
    } else {
      //remove the badge
      graphic.set(statMarker,false);
    }
    //report which crit was applied and how many times it was applied
    whisper (graphic.get("name") + ": " + effectName + " (" + critQty + ")");
  });
}

//damages every selected character according to the stored damage variables
function applyDamage(matches,msg){
  //load up all of the variables
  //load up all of the damage variables, wherever they may be
  var DamTypeObj = findObjs({ type: 'attribute', name: "Damage Type" })[0];
  var DamObj = findObjs({ type: 'attribute', name: "Damage" })[0];
  var PenObj = findObjs({ type: 'attribute', name: "Penetration" })[0];
  var FellObj = findObjs({ type: 'attribute', name: "Felling" })[0];
  var PrimObj = findObjs({ type: 'attribute', name: "Primitive" })[0];
  var HitsObj = findObjs({ type: 'attribute', name: "Hits"})[0];
  var OnesLocObj = findObjs({ type: 'attribute', name: "OnesLocation"})[0];
  var TensLocObj = findObjs({ type: 'attribute', name: "TensLocation"})[0];

  //be sure every variable was successfully loaded
  var successfulLoad = true;
  //warn the gm for each attribute that was not found
  if(DamTypeObj == undefined){
    successfulLoad = false;
    whisper("No attribute named Damage Type was found anywhere in the campaign. Damage was not recorded.");
  }
  if(DamObj == undefined){
    successfulLoad = false;
    whisper("No attribute named Damage was found anywhere in the campaign. Damage was not recorded.");
  }
  if(PenObj == undefined){
    successfulLoad = false;
    whisper("No attribute named Penetration was found anywhere in the campaign. Damage was not recorded.");
  }
  if(FellObj == undefined){
    successfulLoad = false;
    whisper("No attribute named Felling was found anywhere in the campaign. Damage was not recorded.");
  }
  if(PrimObj == undefined){
    successfulLoad = false;
    whisper("No attribute named Primitive was found anywhere in the campaign. Damage was not recorded.");
  }
  if(HitsObj == undefined){
    successfulLoad = false;
    whisper("No attribute named Hits was found anywhere in the campaign. Damage was not recorded.");
  }
  if(OnesLocObj == undefined){
    successfulLoad = false;
    whisper("No attribute named OnesLocation was found anywhere in the campaign. Damage was not recorded.");
  }
  if(TensLocObj == undefined){
    successfulLoad = false;
    whisper("No attribute named TensLocation was found anywhere in the campaign. Damage was not recorded.");
  }
  if(successfulLoad == false){
    return;
  }
  //be sure something was selected
  if(msg.selected == undefined || msg.selected.length <= 0){
    return whisper("Nothing selected.");
  }
  //apply the damage to every selected character
  _.each(msg.selected,function(obj){
    var graphic = getObj("graphic", obj._id);
    //be sure the graphic exists
    if(graphic == undefined) {
        return whisper("Graphic undefined.");
    }
    //be sure the character is valid
    var character = getObj("character",graphic.get("represents"))
    if(character == undefined){
        return whisper("Character undefined for graphic " + graphic.get("name") + ".");
    }

    //get ready to calculate the damage applied to the character
    var damCalc = 0;

    //Character, Vehicle, or Starship?
    var targetType = "character";
    //if the target has Structural Integrity, they are a vehicle
    if(findObjs({_type: "attribute", _characterid: character.id, name: "Structural Integrity"}).length > 0){
      targetType = "vehicle";
    //if the target has Hull, they are a starship
    } else if(findObjs({_type: "attribute", _characterid: character.id, name: "Hull"}).length > 0) {
      targetType = "starship";
    }

    //be sure the damage type matches the targetType
    if(targetType == "starship" && DamTypeObj.get("current").toUpperCase() != "S"){
      return whisper(graphic.get("name") + ": Using non-starship damage on a starship. Aborting. [Correct](!damage type = s)");
    } else if(targetType != "starship" && DamTypeObj.get("current").toUpperCase() == "S"){
      return whisper(graphic.get("name") + ": Using starship damage on a non-starship. Aborting. [Correct](!damage type = i)");
    }

    //apply Armour==============================================================
    //==========================================================================
    var armourName = "";
    switch(targetType){
      case "character":
        switch(OnesLocObj.get("current")){
          case "0": case "10":
            armourName = "H"
          break;
          case "9": case "8":
            if(TensLocObj.get("current") % 2 == 0){
              armourName = "RA";
            } else {
              armourName = "LA";
            }
          break;
          case "3": case "2": case "1":
            if(TensLocObj.get("current") % 2 == 0){
              armourName = "RL";
            } else {
              armourName = "LL";
            }
          break;
          default: //case "4": case "5": case "6": case "7":
            armourName = "B";
          break;
        }
      break;
      case "vehicle":
        switch(TensLocObj.get("current")){
          case "-1":
            armourName = "S"
          break;
          case "-2":
            armourName = "R"
          break;
          default: //case "0":
            armourName = "F";
          break;
        }
      break;
      case "starship":
        switch(TensLocObj.get("current")){
          case "-1":
            armourName = "S"
          break;
          case "-2":
            armourName = "P"
          break;
          case "-3":
            armourName = "A"
          break;
          default: //case "0":
            armourName = "F";
          break;
        }
      break;
    }

    var damCalc = 0;
    ArmourObj = findObjs({_type: "attribute", _characterid: character.id, name: "Armour_" + armourName})[0];
    if(ArmourObj == undefined){
      whisper(character.get("current") + " has no attribute named Armour_" + armourName + ".");
    } else if(targetType == "starship"){
      //starship weapons either have no penetration, or infinite penetration
      if(Number(PenObj.get("current")) <= 0){
        damCalc = - Number(ArmourObj.get("current"));
      } //else Armour = 0
    }else {
      //calculate the armour reduction after penetration
      damCalc = Number(PenObj.get("current")) - Number(ArmourObj.get("current"));

      //if there was more penetration than there was armour, discount it
      if(damCalc > 0){damCalc = 0;}
    }

    //add in the damage to the calculation
    damCalc += Number(DamObj.get("current"));

    //apply Toughness===========================================================
    //==========================================================================
    if(targetType == "character"){
      //Toughness Bonus
      ToughObj = findObjs({_type: "attribute", _characterid: character.id, name: "T"})[0];
      //warn the gm if the Toughness Object is undefined
      if(ToughObj == undefined){
        whisper(character.get("current") + " has no attribute named T.");
      } else {
        damCalc -= Math.floor(Number(ToughObj.get("current"))/10);
      }
      //Unnatural Toughness
      UToughObj = findObjs({_type: "attribute", _characterid: character.id, name: "Unnatural T"})[0];
      //warn the gm if the Toughness Object is undefined
      if(UToughObj == undefined){
        whisper(character.get("current") + " has no attribute named Unnatural T.");
      } else {
        //reduce unnatural toughness by felling damage before applying Unnatural
        //Toughness
        if(Number(UToughObj.get("current")) - Number(FellObj.get("current")) > 0){
          damCalc -= Number(UToughObj.get("current")) - Number(FellObj.get("current"));
        }
      }
    }

    //be sure the total damage is positive
    if(damCalc < 0){damCalc = 0;}

    //a capital H in bar2 alerts the system that this graphic is a horde
    if(graphic.get("bar2_value") == "H"){
      //if the damage is non-zero, overwrite the damage with the number of Hits
      //(gm's can add bonus horde damage beforehand by modifying the number of
      //hits. This is will leave the damage unaffected on other tokens.)
      if(damCalc > 0){
        damCalc = HitsObj.get("Current");
        //explosive damage deals one extra point of horde damage
        if(DamTypeObj.get("current").toUpperCase() == "X"){
          damCalc++;
        }
      }
    }

    //be sure that the final result is a number
    damCalc = Number(damCalc);
    if(damCalc == undefined || damCalc == NaN){
      return whisper(graphic.get("name") + ": Damage undefined.");
    }

    //apply the damage to the graphic's bar3_value. If bar3 is linked to a
    //character sheet's wounds, the wounds will be immediately updated as well
    var remainingWounds = Number(graphic.get("bar3_value")) - damCalc;

    //Has the token taken critical damage?
    if(remainingWounds < 0){
      //calculate the critical effect that should be applied
      var critEffect =  (-1) * remainingWounds;
      switch(targetType){
        case "character":
          //Load up the Wounds and Unnatural Wounds attributes. Warn the gm if
          //they are not found.
          var WBonus = 1;
          WObj = findObjs({_type: "attribute", _characterid: character.id, name: "Wounds"})[0];
          if(WObj == undefined){
            whisper(character.get("name") + " has no attribute named Wounds.");
          } else {
            //Calculate the Structural Integrity Bonus of the Vehicle
            WBonus = Math.floor(Number(WObj.get("current"))/10);
          }
          UWObj = findObjs({_type: "attribute", _characterid: character.id, name: "Unnatural Wounds"})[0];
          if(UWObj == undefined){
            whisper(character.get("name") + " has no attribute named Unnatural Wounds.");
          } else {
            //Add in any Unnatural Structural Integrity to the Bonus
            WBonus += Number(UWObj.get("current"));
          }
          //At minimum, the SIBonus is one.
          Math.max(WBonus,1);
          //Calculate the resulting Critical Effect
          critEffect = Math.ceil(critEffect/WBonus);
          //report the critcal effect to the gm
          whisper(graphic.get("name") + ": [Critical Damage!](!crit ? " + DamTypeObj.get("current") + " " + armourName + ") (" + critEffect + ")");
        break;
        case "vehicle":
          //Load up the Structural Integrity and Unnatural Structural Integrity
          //Attributes. Warn the gm if they are not found.
          var SIBonus = 1;
          SIObj = findObjs({_type: "attribute", _characterid: character.id, name: "Structural Integrity"})[0];
          if(SIObj == undefined){
            whisper(character.get("name") + " has no attribute named Structural Integrity.");
          } else {
            //Calculate the Structural Integrity Bonus of the Vehicle
            SIBonus = Math.floor(Number(SIObj.get("current"))/10);
          }
          USIObj = findObjs({_type: "attribute", _characterid: character.id, name: "Unnatural Structural Integrity"})[0];
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
          //report the critcal effect to the gm
          whisper(graphic.get("name") + ": [Critical Damage!](!crit ? v) (" + critEffect + ")");
        break;
        case "starship":
          //The critcal effect for starships is not modified
          whisper(graphic.get("name") + ": [Critical Damage!](!crit ? s) (" + critEffect + ")");
          //However, starships never record critical damage
          remainingWounds = 0;
        break;
      }
    }

    //record the damage
    graphic.set("bar3_value",remainingWounds);

    //Reroll Location after each hit
    if(targetType == "character"){
      ammoObj = new AmmoTracker;
      ammoObj.calculateLocation(randomInteger(100));
     }

    //report an exact amount to the gm
    whisper(graphic.get("name") + " took " + damCalc + " damage.");
    //report an estimate to everyone
    sendChat("","/desc " + graphic.get("name") + ": [[" +  Math.round(damCalc * 100 / graphic.get("bar3_max")) + "]]% taken.");
  });
  //reset starship damage
  //starship damage is a running tally and needs to be reset when used
  if(DamTypeObj.get("current").toUpperCase() == "S"){
    DamObj.set("current",0);
    //damage can be recovered by setting the current to the maximum
  }
}


//waits until CentralInput has been initialized
on("ready",function(){
  //Lets gm  view and edit damage variables with modifiers
  CentralInput.addCMD(/^!\s*(|max)\s*(dam|damage|pen|penetration|hits|fell|felling|prim|primitive)\s*(\?\s*\+|\?\s*-|\?\s*\*|\?\s*\/|=|\+\s*=|-\s*=|\*\s*=|\/\s*=)\s*(|\+|-)\s*(\d+|current|max|\$\[\[0\]\])\s*$/i, function(matches,msg){
    switch(matches[2].toLowerCase()){
        case "dam":
          matches[2] = "Damage";
        break;
        case "pen":
          matches[2] = "Penetration";
        break;
        case "prim":
          matches[2] = "Primitive";
        break;
        case "fell":
          matches[2] = "Felling";
        break;
        default:
          matches[2] = matches[2].toTitleCase();
        break;
    }
    partyStatHandler(matches,msg);
    partyStatHandler(matches,msg);
  });
  //Lets gm view damage variables without modifiers
  CentralInput.addCMD(/^!\s*(|max)\s*(dam|damage|pen|penetration|hits|damtype|damage type|fell|felling|prim|primitive)\s*(\?)()()\s*$/i, function(matches,msg){
    switch(matches[2].toLowerCase()){
        case "dam":
          matches[2] = "Damage";
        break;
        case "pen":
          matches[2] = "Penetration";
        break;
        case "damtype":
          matches[2] = "Damage Type";
        break;
        case "prim":
          matches[2] = "Primitive";
        break;
        case "fell":
          matches[2] = "Felling";
        break;
        default:
          matches[2] = matches[2].toTitleCase();
        break;
    }
    partyStatHandler(matches,msg);
  });
  //Lets the gm set the damage type
  CentralInput.addCMD(/^!\s*(|max)\s*(damtype|damage type)\s*(=)\s*()(i|r|e|x|s)\s*$/i, function(matches,msg){
    matches[2] = "Damage Type";
    matches[5] = matches[5].toUpperCase();
    partyStatHandler(matches,msg);
  });
  //Lets anyone get a quick link to critical effects table based on user input
  //or based on the damage type and hit location stored in the damage variables
  CentralInput.addCMD(/^!\s*crit\s*\?\s*(|v|vehicle|s|starship|i|impact|e|energy|r|rending|x|explosive)\s*(|h|head|(?:|l|r)\s*(?:a|l)|(?:|left|right)\s*(?:arm|leg)s?|b|body)\s*$/i,showCritTable,true);
  //Lets the gm reduce damage and penetration when an attack passes through cover
  CentralInput.addCMD(/^!\s*cover\s*(\d+)$/i,applyCover);
  //Lets the gm reset an attack back to how it was first detected, before
  //modifications
  CentralInput.addCMD(/^!\s*attack\s*=\s*max$/i,attackReset);
  //Lets the gm view the attack variables in a susinct format
  CentralInput.addCMD(/^!\s*(|max)\s*attack\s*\?\s*$/i,attackShow);
  //Lets the gm specify the hit location
  CentralInput.addCMD(/^!\s*target\s*=\s*(|l|r|left|right)\s*(h|head|a|arm|b|body|l|leg|f|front|s|side|starboard|p|port|r|rear|aft)\s*$/i,hitlocationHandler);
  //Lets the gm convert the number of successes into Hits, as per the Full Auto formula
  CentralInput.addCMD(/^!\s*full\s*(?:auto)?\s*=?\s*(|\d+)\s*$/i,fullautoConverter);
  //Lets the gm convert the number of successes into Hits, as per the Semi Auto formula
  CentralInput.addCMD(/^!\s*semi\s*(?:auto)?\s*=?\s*(|\d+)\s*$/i,semiautoConverter);
  //Lets the gm quickly mark starships with status markers to remember
  CentralInput.addCMD(/^!\s*crit\s*\+\s*=\s*([1-7]|depressurized|damaged|sensors|thrusters|fire|engines|unpowered)\s*(?:\s*(|\+|-)\s*(\d+))?\s*$/i,applyCrit);
  CentralInput.addCMD(/^!\s*crit\s*\-\s*=\s*([1-7]|depressurized|damaged|sensors|thrusters|fire|engines|unpowered)\s*(?:\s*(|\+|-)\s*(\d+))?\s*$/i,function(matches,msg){
    //switch the sign of the quantity
    if(matches[2] == "-"){
      matches[2] = "";
    } else {
      matches[2] = "-";
    }
    applyCrit(matches,msg);
  });
  CentralInput.addCMD(/^!\s*dam(?:age)?\s*$/i,applyDamage);
});
