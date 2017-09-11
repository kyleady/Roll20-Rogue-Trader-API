//publicly makes a cohesion test
function cohesionHandler(matches,msg){
  //find the party attribute
  var cohesionObjs = findObjs({
    _type: "attribute",
    name: "Cohesion"
  });
  //are there no cohesion attributes anywhere?
  if(cohesionObjs.length <= 0){
    //no stat to work with. alert the gm and player
    return whisper("There is nothing in the campaign with a(n) " + "Cohesion" + " Attribute.", {speakingTo: msg.playerid, gmEcho: true});
  //were there too many cohesion attributes?
  } else if(cohesionObjs.length >= 2){
    //warn the gm, but continue forward
    whisper("There were multiple " + "Cohesion" + " attributes. Using the first one found. A log has been posted in the terminal.")
    log("Cohesion" + " Attributes")
    log(cohesionObjs)
  }

  //make a cohesion test
  sendChat("player|" + msg.playerid, "/r D10<" + cohesionObjs[0].get("current") + " Cohesion Test");
}

//waits until CentralInput has been initialized
on("ready",function(){
  //Lets anyone make a cohesion test
  CentralInput.addCMD(/^!\s*cohesion\s*$/i, cohesionHandler, true);

  //Lets players freely view and edit cohesion with modifiers
  var re = makeAttributeHandlerRegex('cohesion');
  CentralInput.addCMD(re, function(matches,msg){
    matches[2] = "Cohesion";
    attributeHandler(matches,msg,{partyStat: true});
  }, true);
});