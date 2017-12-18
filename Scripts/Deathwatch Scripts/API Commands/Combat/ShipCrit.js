//applies status markers for the various starship critical hits based on user
//input
//matches[0] is the same as msg.content
//matches[1] is number rolled on the crit table or a short name for the critical
//  effect
//matches[2] is the sign of the number of times to apply the crit
//matches[3] is the number of times to apply the crit (by default this is one)
function applyCrit(matches,msg){
  //record the name of the critical effect
  var critName = matches[1].toLowerCase();
  //default to applying this crit once
  if(matches[3] == undefined || matches[3] == "" ){
    critQty = 1;
  } else {
    critQty = Number(matches[2] + matches[3]);
  }

  //apply the crit effect to every selected token
  eachCharacter(msg, function(character, graphic){
    //which status marker corresponds to the critical effect?
    var statMarker = "";
    var effectName = "[Error]";
    switch(critName){
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
    var degeneracy = graphic.get(statMarker);
    if(typeof degeneracy == 'string') {
      degeneracy = Number(degeneracy);
    } else {
      degeneracy = (degeneracy) ? 1 : 0;
    }
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
    whisper(graphic.get("name") + ": " + effectName + " (" + critQty + ")");
  });
}

//waits until CentralInput has been initialized
on("ready",function(){
  //Lets the gm quickly mark starships with status markers to remember
  CentralInput.addCMD(/^!\s*crit\s*\+\s*=\s*([1-7]|depressurized|damaged|sensors|thrusters|fire|engines|unpowered)\s*(?:\s*(|\+|-)\s*(\d+))?\s*$/i,applyCrit);
  CentralInput.addCMD(/^!\s*crit\s*\-\s*=\s*([1-7]|depressurized|damaged|sensors|thrusters|fire|engines|unpowered)\s*(?:\s*(|\+|-)\s*(\d+))?\s*$/i,function(matches,msg){
    //switch the sign of the quantity
    if(matches[2] == "-"){
      matches[2] = "";
    } else {
      matches[2] = "-";
      //specify a quantity if none is given
      if(!matches[3]){
        matches[3] = "1";
      }
    }
    applyCrit(matches,msg);
  });
});
