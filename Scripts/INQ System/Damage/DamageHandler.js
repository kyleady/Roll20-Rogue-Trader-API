function damDetails() {
  //load up all of the damage variables, wherever they may be
  var details = {};
  details.DamType = findObjs({ type: 'attribute', name: "Damage Type" })[0];
  details.Dam     = findObjs({ type: 'attribute', name: "Damage" })[0];
  details.Pen     = findObjs({ type: 'attribute', name: "Penetration" })[0];
  details.Fell    = findObjs({ type: 'attribute', name: "Felling" })[0];
  details.Prim    = findObjs({ type: 'attribute', name: "Primitive" })[0];
  details.Hits    = findObjs({ type: 'attribute', name: "Hits"})[0];
  details.OnesLoc = findObjs({ type: 'attribute', name: "OnesLocation"})[0];
  details.TensLoc = findObjs({ type: 'attribute', name: "TensLocation"})[0];

  //be sure every variable was successfully loaded
  var successfulLoad = true;
  //warn the gm for each attribute that was not found
  if(details.DamType == undefined){
    successfulLoad = false;
    whisper("No attribute named Damage Type was found anywhere in the campaign. Damage was not recorded.");
  }
  if(details.Dam == undefined){
    successfulLoad = false;
    whisper("No attribute named Damage was found anywhere in the campaign. Damage was not recorded.");
  }
  if(details.Pen == undefined){
    successfulLoad = false;
    whisper("No attribute named Penetration was found anywhere in the campaign. Damage was not recorded.");
  }
  if(details.Fell == undefined){
    successfulLoad = false;
    whisper("No attribute named Felling was found anywhere in the campaign. Damage was not recorded.");
  }
  if(details.Prim == undefined){
    successfulLoad = false;
    whisper("No attribute named Primitive was found anywhere in the campaign. Damage was not recorded.");
  }
  if(details.Hits == undefined){
    successfulLoad = false;
    whisper("No attribute named Hits was found anywhere in the campaign. Damage was not recorded.");
  }
  if(details.OnesLoc == undefined){
    successfulLoad = false;
    whisper("No attribute named OnesLocation was found anywhere in the campaign. Damage was not recorded.");
  }
  if(details.TensLoc == undefined){
    successfulLoad = false;
    whisper("No attribute named TensLocation was found anywhere in the campaign. Damage was not recorded.");
  }
  //if just one was missing, don't return anything.
  if(successfulLoad == false){
    return;
  } else {
    //otherwise return everything
    return details;
  }

}
//resets all the damage variables to their maximum values (the attack before any
//modifications)
function attackReset(matches,msg){
  //get the damage details obj
  var details = damDetails();
  //quit if one of the details was not found
  if(details == undefined){
    return;
  }
  //reset the damage variables to their maximums
  for(var k in details){
    details[k].set("current",details.get("max"));
  }
  //report the resut
  attackShow()
}

//used throughout DamageCatcher.js to whisper the full attack variables in a
//compact whisper
//matches[0] is the same as msg.content
//matches[1] is a flag for (|max)
function attackShow(matches,msg){
  //get the damage details obj
  var details = damDetails();
  //quit if one of the details was not found
  if(details == undefined){
    return;
  }

  if(matches && matches[1] && matches[1].toLowerCase() == "max"){
    matches[1] = "max";
  } else {
    matches = [];
    matches[1] = "current";
  }
  //starship damage only cares about the straight damage and if there is any
  //penetration at all
  if(details.DamType.get(matches[1]).toLowerCase() == "s"){
    if(details.Pen.get(matches[1])){
      whisper("Dam: [[" + details.Dam.get(matches[1]) + "]] Starship, Pen: true");
    } else {
      whisper("Dam: [[" + details.Dam.get(matches[1]) + "]] Starship, Pen: false");
    }
  //output normal damage
  } else {
    var output = "Dam: [[" + details.Dam.get(matches[1]) + "]] " + details.DamType.get(matches[1]) + ", Pen: [[" +  details.Pen.get(matches[1]) + "]], Felling: [[" + details.Fell.get(matches[1]) + "]]";
    if(Number(details.Prim.get(matches[1]))) {
      whisper( output + ", Primitive");
    } else {
      whisper(output);
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

    //vehicle and starship armour facings
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

    //vehicle hit locations
    case "motive": case "motive systems":
      onesLocObj.set('current', "1");
      targeting = "Motive Systems";
    break;
    case "hull":
      onesLocObj.set('current', "3");
      targeting = "Hull";
    break;
    case "weapon":
      onesLocObj.set('current', "7");
      targeting = "Weapon";
    break;
    case "turret":
      onesLocObj.set('current', "9");
      targeting = "Turret";
    break;
  }

  //report to the gm what we are now targeting
  whisper("Targeting: " + targeting);
}

//waits until CentralInput has been initialized
on("ready",function(){
  //Lets gm  view and edit damage variables with modifiers
  CentralInput.addCMD(/^!\s*(|max)\s*(dam|damage|pen|penetration|hits|fell|felling|prim|primitive)\s*(\?\s*\+|\?\s*-|\?\s*\*|\?\s*\/|=|\+\s*=|-\s*=|\*\s*=|\/\s*=)\s*(|\+|-)\s*(\d+|current|max|\$\[\[0\]\])\s*$/i, function(matches,msg){
    matches[2] = getProperStatName(matches[2]);
    attributeHandler(matches,msg,{partyStat: true});
  });
  //Lets gm view damage variables without modifiers
  CentralInput.addCMD(/^!\s*(|max)\s*(dam|damage|pen|penetration|hits|damtype|damage type|fell|felling|prim|primitive)\s*(\?)()()\s*$/i, function(matches,msg){
    matches[2] = getProperStatName(matches[2]);
    attributeHandler(matches,msg,{partyStat: true});
  });
  //Lets the gm set the damage type
  CentralInput.addCMD(/^!\s*(|max)\s*(damtype|damage type)\s*(=)\s*()(i|r|e|x|s)\s*$/i, function(matches,msg){
    matches[2] = "Damage Type";
    matches[5] = matches[5].toUpperCase();
    attributeHandler(matches,msg,{partyStat: true});
  });
  //Lets the gm reset an attack back to how it was first detected, before
  //modifications
  CentralInput.addCMD(/^!\s*attack\s*=\s*max$/i,attackReset);
  //Lets the gm view the attack variables in a susinct format
  CentralInput.addCMD(/^!\s*(|max)\s*attack\s*\?\s*$/i,attackShow);
  //Lets the gm specify the hit location
  CentralInput.addCMD(/^!\s*target\s*=\s*(|l|r|left|right)\s*(h|head|a|arm|b|body|l|leg|f|front|s|side|starboard|p|port|r|rear|aft|hull|weapon|turret|motive(?: systems)?)\s*$/i,hitlocationHandler);
});
