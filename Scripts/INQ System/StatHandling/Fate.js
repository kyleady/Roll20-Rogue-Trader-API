//lets players use and view their fate points
//matches[0] is the same as msg.content
function fateHandler(matches,msg){
  //work through each selected character
  eachCharacter(msg, function(character, graphic){
      var Fate = attrValue("Fate",{characterid: character.id, graphicid: graphic.id});
      var name = character.get("name");

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
        announce(name + " spends a Fate Point!");
        //reduce the number of fate points by one
        attrValue("Fate",{setTo: Fate - 1, characterid: character.id, graphicid: graphic.id});
        //report what remains
        var finalReport = name + " has [[" + Fate + "-1]] Fate Point";
        if(Fate-1 != 1){
          finalReport += "s";
        }
        whisper(finalReport + " left.", msg.playerid);
      }
  });
}

//adds the commands after CentralInput has been initialized
on("ready",function(){
  //lets the user quickly spend one fate point (as long as they have fate points
  //to spend)
  CentralInput.addCMD(/^!\s*fate\s*$/i,fateHandler,true);
});
