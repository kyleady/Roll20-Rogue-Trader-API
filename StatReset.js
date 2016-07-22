//resets every stat of the selected characters to its maximum (creates an
//exception for Fatigue as it resets to 0).
function statReset(matches,msg){
  //if nothing was selected, select everyone on the current map
  if(msg.selected == undefined || msg.selected.length <= 0){
    msg.selected = findObjs({
        _pageid: Campaign().get("playerpageid"),
        _type: "graphic",
        _subtype: "token",
        isdrawing: false,
        layer: "objects"
    });
  }

  //prepare a record of everyone who was reset
  var resetAnnounce = "The following characters were reset: ";

  _.each(msg.selected, function(obj){

    //normally msg.selected is just a list of objectids and types of the
    //objects you have selected. If this is the case, find the corresponding
    //character objects.
    if(obj._type && obj._type == "graphic"){
      var graphic = getObj("graphic", obj._id);
      //be sure the graphic exists
      if(graphic == undefined) {
          log("graphic undefined")
          log(obj)
          return whisper("graphic undefined");
      }
      //be sure the character is valid
      var character = getObj("character",graphic.get("represents"))
      if(character == undefined){
          log("character undefined")
          log(graphic)
          return whisper("character undefined");
      }
    //if using a default character, just accept the default character as the
    //the character we are working with, no need to work through tokens to
    //find this character
    }else if(obj.get("_type") == "character") {
      //record the character
      var character = obj;
    //if the gm just grabbed every single token on the map, you will already
    //have the graphic objects, and will need to find the character objects.
    }else if(obj.get("_type") == "graphic") {
      //record the graphic
      var graphic = obj;
      //be sure the character is valid
      var character = getObj("character",graphic.get("represents"))
      if(character == undefined){
        log("character undefined")
        log(graphic)
        return whisper("character undefined");
      }
    //if the selected object met none of the above criteria, something went
    //wrong. Alert the gm.
    }else{
      log("Selected is neither a graphic nor a character.")
      log(obj)
      return whisper("Selected is neither a graphic nor a character.");
    }

    //create a list of all of the attributes this character has
    attribList = findObjs({
      _type: "attribute",
      _characterid: character.id
    });

    //work with every attribute the character has
    _.each(attribList,function(attrib){
      attrib.set("current",attrib.get("max"));
    });

    //reset Fatigue Bar
    graphic.set("bar1_value",graphic.get("bar1_max"));

    //reset Fate Bar
    graphic.set("bar2_value",graphic.get("bar2_max"));

    //reset Wounds Bar
    graphic.set("bar3_value",graphic.get("bar3_max"));

    //clear all status markers
    graphic.set("statusmarkers", "");

    //add the character to the list of characters that were reset
    resetAnnounce += "\n" + graphic.get("name");
  });
  //report to the gm all of the characters that were reset
  whisper(resetAnnounce);
}

//waits for CentralInput to be initialized
on("ready",function(){
  //resets the attributes and status markets of every selected token (or every
  //token on the map)
  CentralInput.addCMD(/^!\s*reset\s*$/i,statReset);
});
