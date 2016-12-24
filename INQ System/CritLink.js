//a function that privately whispers a link to the relavant crit table
//matches[0] is the same as msg.content
//matches[1] is the type of critical hit table: vehicle, starship, impact, etc
//matches[2] is the location: head, body, legs, arm
function getCritLink(matches, msg, options){
  // be sure the options exists
  options = options || {};
  //default the options
  if(options["show"] == undefined){
    options["show"] = true;
  }
  //the link to the crit table
  var critLink = "";
  //what is the type of damage being used? Or is the target not a character?
  var damageType = matches[1].toLowerCase();
  //what is the hit location
  var hitLocation = matches[2];

  //if no damage type was given, search for the Damage Type attribute in the
  //campaign
  if(damageType == ""){
    var DamTypeObj = findObjs({ type: 'attribute', name: "Damage Type" })[0];
    if(DamTypeObj == undefined){
      if(options["show"]){
        whisper("There is no Damage Type attribute in the campaign.",msg.playerid);
        whisper("There is no Damage Type attribute in the campaign.");
      }
      return critLink;
    }
    damageType = DamTypeObj.get("current").toLowerCase();
  }

  //determine table type based on user input
  switch (damageType){
    case "v": case "vehicle":
      critLink = GetLink("Vehicle Critical Effects");
    break;
    case "s": case "starship":
      critLink = GetLink("Starship Critical Effects");
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

  //if no hit location was input, default to the stored hit location
  //unless the link was already found
  if(hitLocation == "" && critLink == ""){
    //retrieve the hit location attributes in the campaign
    onesLocObj = findObjs({ type: 'attribute', name: "OnesLocation"})[0];
    tensLocObj = findObjs({ type: 'attribute', name: "TensLocation"})[0];
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
      hitLocation = getHitLocation(tensLocObj.get("current"), onesLocObj.get("current"));
    }
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
  //invalid location
  } else {
    hitLocation = "";
  }

  //get the link to the Crit table
  //unless we have already found the link
  if(critLink == ""){
    critLink = GetLink(damageType + " Critical Effects - " + hitLocation);
  }
  if(options["show"]){
    //now that damage type and location have been determined, return the link to
    //the gm
    whisper("**Critical Hit**: " + critLink, msg.playerid);
  }
  //return the crit link for use in other functions
  return critLink;
}

//waits until CentralInput has been initialized
on("ready",function(){
  //Lets anyone get a quick link to critical effects table based on user input
  //or based on the damage type and hit location stored in the damage variables
  CentralInput.addCMD(/^!\s*crit\s*\?\s*(|v|vehicle|s|starship|i|impact|e|energy|r|rending|x|explosive)\s*(|h|head|(?:|l|r)\s*(?:a|l)|(?:|left|right)\s*(?:arm|leg)s?|b|body)\s*$/i,getCritLink,true);
});
