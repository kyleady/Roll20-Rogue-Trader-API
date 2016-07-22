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
        //be sure the character is valid
        var character = getObj("character",graphic.get("represents"))
        if(character == undefined){
            return whisper("character undefined");
        }
      //if using a default character, just accept the default character as the
      //the character we are working with
      }else if(obj.get("_type") == "character") {
        var character = obj;
      }

      //exit if the character does not have Fate Points
      var Fate = findObjs({type: 'attribute', characterid: character.id, name: "Fate"});
      if(Fate.length <= 0){
        //while exiting, tell the user which character did not have a Fate Attribute
        return whisper(character.get("name") + " does not have a Fate Attribute!", msg.playerid);
      }

      //be sure the player has enough fate points to spend
      if(Number(Fate[0].get("current")) < 1){
        return whisper("You do not have enough Fate to spend.",msg.playerid);
      } else {
        //announce that the player is spending a fate point
        sendChat("player|" + msg.playerid, "/em - " + character.get("name") + " spends a Fate Point!" +  + " remain.");
        //reduce the number of fate points by one
        textOperator(Fate[0],"-=","1");
        //report what remains
        whisper(character.get("name") + textOperator(Fate[0],"?"),msg.playerid);
      }
  });

}

//adds the commands after CentralInput has been initialized
on("ready",function(){
  //lets the user quickly spend one fate point (as long as they have fate points
  //to spend)
  CentralInput.addCMD(/^!\s*fate\s*$/i,fateHandler,true);
});
