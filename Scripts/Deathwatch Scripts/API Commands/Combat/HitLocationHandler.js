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
  if(!objsAreDefined) return;
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

on('ready', function(){
  //Lets the gm specify the hit location
  CentralInput.addCMD(/^!\s*target\s*=\s*(|l|r|left|right)\s*(h|head|a|arm|b|body|l|leg|f|front|s|side|starboard|p|port|r|rear|aft|hull|weapon|turret|motive(?: systems)?)\s*$/i, hitlocationHandler);
});
