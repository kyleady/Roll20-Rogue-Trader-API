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

//waits until CentralInput has been initialized
on("ready",function(){
  //Lets anyone get a quick link to critical effects table based on user input
  //or based on the damage type and hit location stored in the damage variables
  CentralInput.addCMD(/^!\s*crit\s*\?\s*(|v|vehicle|s|starship|i|impact|e|energy|r|rending|x|explosive)\s*(|h|head|(?:|l|r)\s*(?:a|l)|(?:|left|right)\s*(?:arm|leg)s?|b|body)\s*$/i,showCritTable,true);
});
