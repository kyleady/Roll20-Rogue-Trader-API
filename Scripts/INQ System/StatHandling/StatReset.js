//resets every stat of the selected characters to its maximum (creates an
//exception for Fatigue as it resets to 0).
function statReset(matches,msg){
    //prepare a record of everyone who was reset
  var resetAnnounce = "The following characters were reset: ";

  eachCharacter(msg, function(character, graphic){
    //create a list of all of the attributes this character has
    attribList = findObjs({
      _type: "attribute",
      _characterid: character.id
    });

    //work with every attribute the character has
    _.each(attribList,function(attrib){
      attrib.set("current",attrib.get("max"));
    });

    //reset each graphic bar
    for(var bar = 1; bar <= 3; bar++){
      graphic.set("bar" + bar.toString() + "_value", graphic.get("bar" + bar.toString() + "_max"));
    }

    //clear all status markers
    graphic.set("statusmarkers", "");

    //remove any local attributes or notes
    graphic.set("gmnotes", "");

    //add the character to the list of characters that were reset
    resetAnnounce += graphic.get("name") + ", ";
  });
  //report to the gm all of the characters that were reset
  //remove the last comma
  whisper(resetAnnounce.substring(0,resetAnnounce.lastIndexOf(",")));
}

//waits for CentralInput to be initialized
on("ready",function(){
  //resets the attributes and status markets of every selected token (or every
  //token on the map)
  CentralInput.addCMD(/^!\s*(?:(?:everything|all)\s*=\s*max|reset\s*(?:tokens?)?)\s*$/i,statReset);
});
