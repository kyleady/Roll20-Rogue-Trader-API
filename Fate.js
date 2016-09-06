//lets players use and view their fate points
//matches[0] is the same as msg.content
//matches[1] states wether or not we are manipulating max Fate. (|Max)
//matches[2] is the text operator "=", "+=", "?", "?/", etc
//matches[3] the sign of the numerical modifier
//matches[4] is the numerical modifier
function fateHandler(matches,msg){

  //find a default character for the player if nothing was selected
  if(msg.selected == undefined || msg.selected.length <= 0){
    //make the seleced array include the default character
    msg.selected = [defaultCharacter(msg.playerid)];
    //if there is no default character, just quit
    if(msg.selected[0] == undefined){return;}
  }

  //work through each selected character
  _.each(msg.selected, function(obj){
      //normally msg.selected is just a list of objectids and types of the
      //objects you have selected. If this is the case, find the corresponding
      //character objects.

      if(obj._type && obj._type == "graphic"){
        var graphic = getObj("graphic", obj._id);
        //be sure the graphic exists
        if(graphic == undefined) {
            return whisper("graphic undefined");
        }
        var Fate = attrValue("Fate",{graphicid: obj._id});
        var name = graphic.get("name");
      //if using a default character, just accept the default character as the
      //the character we are working with
      } else if(obj.get("_type") == "character") {
        var Fate = attrValue("Fate",{characterid: obj.id});
        var name = obj.get("name");
      }

      //exit if the character does not have Fate Points
      if(Fate == undefined){
        //while exiting, tell the user which character did not have a Fate Attribute
        return whisper(name + " does not have a Fate Attribute!", msg.playerid);
      }

      //be sure the player has enough fate points to spend
      if(Fate < 1){
        return whisper(name + " does not have enough Fate to spend.",msg.playerid);
      } else {
        //announce that the player is spending a fate point
        sendChat("player|" + msg.playerid, "/em - " + name + " spends a Fate Point!");
        //reduce the number of fate points by one
        if(obj._type && obj._type == "graphic"){
          attrValue("Fate",{setTo: Fate - 1, graphicid: obj._id});
        //if using a default character, just accept the default character as the
        //the character we are working with
        } else if(obj.get("_type") == "character") {
          attrValue("Fate",{setTo: Fate - 1, characterid: obj.id});
        }
        //report what remains
        var finalReport = name + " has " + (Fate-1).toString + " more Fate Point";
        if(Fate-1 != 1){
          finalReport += "s";
        }
        whisper(finalReport,msg.playerid);
      }
  });

}

//adds the commands after CentralInput has been initialized
on("ready",function(){
  //lets the user quickly spend one fate point (as long as they have fate points
  //to spend)
  CentralInput.addCMD(/^!\s*fate\s*$/i,fateHandler,true);
});
