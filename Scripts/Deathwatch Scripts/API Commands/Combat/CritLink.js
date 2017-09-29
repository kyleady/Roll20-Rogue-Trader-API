//a function that privately whispers a link to the relavant crit table
//matches[0] is the same as msg.content
//matches[1] is the type of critical hit table: vehicle, starship, impact, etc
//matches[2] is the location: head, body, legs, arm
function getCritLink(matches, msg, options){
  // be sure the options exists
  options = options || {};
  //default the options
  if(options.show == undefined) options.show = true;
  //what is the type of damage being used? Or is the target not a character?
  var damageType = matches[1].toLowerCase();
  //what is the hit location
  var hitLocation = matches[2];

  if(damageType == ''){
    var DamTypeObj = findObjs({ _type: 'attribute', name: 'DamageType' })[0];
    if(DamTypeObj == undefined){
      whisper("There is no Damage Type attribute in the campaign.", {speakingTo: msg.playerid, gmEcho: true});
      return critLink;
    }
    damageType = DamTypeObj.get("current").toLowerCase();
  }

  if(hitLocation == ""){
    //retrieve the hit location attributes in the campaign
    onesLocObj = findObjs({ _type: 'attribute', name: "OnesLocation"})[0];
    tensLocObj = findObjs({ _type: 'attribute', name: "TensLocation"})[0];
    //be sure they were found
    var successfulLoad = true;
    if(onesLocObj == undefined){
      successfulLoad = false;
      whisper("No attribute named OnesLocation was found anywhere in the campaign. Damage was not recorded.");
    }
    if(tensLocObj == undefined){
      successfulLoad = false;
      whisper("No attribute named TensLocation was found anywhere in the campaign. Damage was not recorded.");
    }
    if(successfulLoad){
      if(damageType[0] == "v"){
        switch(Number(onesLocObj.get("current"))){
          case 1: case 2:
            damageType = "Motive Systems";
          break;
          case 7: case 8:
            damageType = "Weapon";
          break;
          case 9: case 0:
            damageType = "Turret";
          break;
          default:
            damageType = "Hull";
          break;
        }
      } else {
        hitLocation = getHitLocation(tensLocObj.get("current"), onesLocObj.get("current"));
      }
    }
  }

  //determine table type based on user input
  switch (damageType){
    case "v": case "vehicle":
      damageType = "Vehicle";
    break;
    case "s": case "starship":
      damageType = "Starship";
    break;
    case "i": case "impact":
      damageType = "Impact";
    break;
    case "r": case "rending":
      damageType = "Rending";
    break;
    case "e": case "energy":
      damageType = "Energy";
    break;
    case "x": case "explosive":
      damageType = "Explosive";
    break;
  }

  //determine hit location based on user input
  if(/^(h|head)$/i.test(hitLocation)){
    hitLocation = "Head";
  } else if(/^((|l|r)\s*a|(|left|right)\s*arms?)$/i.test(hitLocation)){
    hitLocation = "Arm";
  } else if(/^(b|body)$/i.test(hitLocation)){
    hitLocation = "Body";
  } else if(/^((|l|r)\s*l|(|left|right)\s*legs?)$/i.test(hitLocation)){
    hitLocation = "Leg";
  } else if(/^motive\s*(systems)?$/i.test(hitLocation)){
    damageType = "Motive Systems";
    hitLocation = "";
  } else if(/^hull$/i.test(hitLocation)){
    damageType = "Hull";
    hitLocation = "";
  } else if(/^weapon$/i.test(hitLocation)){
    damageType = "Weapon";
    hitLocation = "";
  } else if(/^turret$/i.test(hitLocation)){
    damageType = "Turret";
    hitLocation = "";
  }

  if(damageType == 'Starship') hitLocation = '';
  //get the link to the Crit table
  var critTitle = damageType + " Critical Effects";
  if(hitLocation){
    critTitle += " - " + hitLocation;
  }
  var critLink = getLink(critTitle);

  //report the link
  if(options["show"]){
    //now that damage type and location have been determined, return the link to
    //the gm
    whisper("**Critical Hit**: " + critLink, {speakingTo: msg.playerid});
  }

  //return the crit link for use in other functions
  return critLink;
}

//waits until CentralInput has been initialized
on("ready",function(){
  //Lets anyone get a quick link to critical effects table based on user input
  //or based on the damage type and hit location stored in the damage variables
  CentralInput.addCMD(/^!\s*crit\s*\?\s*(|v|vehicle|s|starship|i|impact|e|energy|r|rending|x|explosive)\s*(|h|head|(?:|l|r)\s*(?:a|l)|(?:|left|right)\s*(?:arm|leg)s?|b|body|motive(?: systems)?|hull|weapon|turret)\s*$/i,getCritLink,true);
});
