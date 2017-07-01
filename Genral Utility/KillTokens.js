function killTokens(matches, msg){
  if(msg.selected == undefined || msg.selected.length <= 0){
    return whisper("Please select a token.");
  }
  var toKill = Number(matches[1]);
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
  if(toKill > 0){
    whisper("Not enough graphics to kill. Could not kill " + toKill + ".");
  } else {
    whisper("Graphics killed.");
  }
}

on("ready", function(){
  CentralInput.addCMD(/^!\s*kill\s*(\d+)\s*$/, killTokens);
});
