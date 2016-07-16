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

      //if no operator was included, assume the player wanted to spend a Fate point
      if(matches[2] == ""){
        //be sure the player has enough fate points to spend
        if(Number(Fate[0].get("current")) < 1){
          whisper("You do not have enough Fate to spend.",msg.playerid);
        } else {
          //reduce the number of Fate Points by one and report what remains
          return sendChat("player|" + msg.playerid, "/em - " + character.get("name") + " spends a Fate Point! (" + textOperator(Fate[0],"-=",1) + "/" + Fate[0].get("max") + ") remain.");
        }
      } else if(matches[2].indexOf("?") != -1) {
        //the user is asking about their fate points, give them the report with the character name
        whisper(character.get("name") + ": " +  textOperator(Fate[0],matches[2],matches[3] + matches[4],matches[1].toLowerCase() == "max"),msg.playerid);
      } else{
        //the user is modifying their fate points
        whisper(character.get("name") + " Fate = " +  textOperator(Fate[0],matches[2],matches[3] + matches[4],matches[1].toLowerCase() == "max"),msg.playerid);
      }
  });

}

//adds the commands after CentralInput has been initialized
on("ready",function(){
  //matches[0] is the same as msg.content
  //matches[1] states wether or not we are manipulating max Fate. (|Max)
  //matches[2] is the text operator "=", "+=", "?", "?/", etc
  //matches[3] the sign of the numerical modifier
  //matches[4] is the numerical modifier
  CentralInput.addCMD(/^!\s*()\s*fate\s*(|\?\+|\?-|\?\*|\?\/)\s*(?:(|\+|-)\s*(\d*))?\s*$/i,fateHandler,true);
  //the same function as above, but only allows the gm to directly edit the current and max fate values
  CentralInput.addCMD(/^!\s*(|max)\s*fate\s*(=|\+=|-=|\*=|\/=)\s*(?:(|\+|-)\s*(\d*|max)\s*)?$/i,fateHandler,false);
});
