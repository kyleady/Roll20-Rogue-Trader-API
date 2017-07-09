function hordeKill(matches, msg){
  if(msg.selected == undefined || msg.selected.length <= 0){
    return whisper("Please select a token.");
  }

  if(matches[1]){
    var toKill = Number(matches[1]);
    var useHits = false;
  } else {
    var toKill = Number(attrValue("Hits"));
    var useHits = true;
  }

  _.each(msg.selected, function(obj){
    var graphic = getObj("graphic", obj._id);
    //be sure the graphic exists
    if(graphic == undefined) {
      log("graphic undefined")
      log(obj)
      return whisper("graphic undefined");
    }
    if(toKill > 0 && graphic.get("status_dead") == false){
      toKill--;
      graphic.set("status_dead", true);
    }
  });
  if(useHits){
    attrValue("Hits", {setTo: toKill});
  }

  if(toKill > 0){
    var suggestedCMD = "!hordeDam"
    if(!useHits){
      suggestedCMD +=  toKill;
    }
    whisper("Not enough creatures to kill. Could not kill [" + toKill + "](" + suggestedCMD + ").");
  } else {
    whisper("Creatures killed.");
  }
}

on("ready", function(){
  CentralInput.addCMD(/^!\s*horde\s*dam(?:age)?\s*(\d*)\s*$/i, hordeKill);
});
