//when a mission ends, the gm needs to
  //reset all of the attributes of each character
  //clean out the pile up of ammo notes
  //take away all of the requisitioned items and weapons
  //BUT DOES NOT delete any of the abilities associated with the removed weapons
function endMission(matches, msg){
  eachCharacter(msg, function(character, graphic){
    //get every attribute the character has
    var attrObjs = findObjs({_type: "attribute", characterid: character.id});
    //reset all of the attributes of the character
    //but delete any ammo attributes first
    _.each(attrObjs, function(attrObj){
      if(attrObj.get("name").indexOf("Ammo - ") == 0){
        attrObj.remove();
      } else {
        attrObj.set("current", attrObj.get("max"));
      }
    });
    //remove all of the requisitioned weapons and gear
    //get the character bio and gmnotes
    var charBio = "";
    character.get("bio", function(bio){
      charBio = bio || "";
    });
    var charGMNotes = "";
    character.get("gmnotes", function(gmnotes){
      charGMNotes = gmnotes || "";
    });
    //delete requisitioned weapons/gear from both the bio and gmnotes
    var charNotes = _.map([charBio, charGMNotes], function(notes){
      //be sure the notes are not null
      if(notes == "null"){
          notes = "";
      }
      //break up the notes by line
      var lines = notes.split(/\s*<br>\s*/);
      //create a regex for a list header
      var listRegex = "^\\s*";
      listRegex += "(?:<(?:strong|em|u)>\\s*)+";
      listRegex += "([^<>]+)";
      listRegex += "(?:</(?:strong|em|u)>\\s*)+";
      listRegex += "$";
      var listRe = RegExp(listRegex, "i");
      var inqlinkparser = new INQLinkParser();
      var linkRe = RegExp(inqlinkparser.regex(), "i");

      //delete (and store) every requisitioned weapon/gear
      var withinSection = false;
      for(var i = 0; i < lines.length; i++){
        //determine if we are entering into a list of requisitioned items
        if(listRe.test(lines[i])){
          //get the list name
          var matches = lines[i].match(listRe);
          //is the list name requisitioned gear or weapons?
          var titleMatches = matches[1].match(/^\s*(gear|weapons)\s*\(\s*requisitioned\s*\)\s*$/i);
          if(titleMatches){
            withinSection = titleMatches[1].toLowerCase();
          } else {
            //we are no longer in requisitioned items
            withinSection = false;
          }
        //work with each link that is within a requisitioned list
        } else if(withinSection
               && linkRe.test(lines[i])){
          //delete this line
          lines.splice(i,1);
          //move back up one line to account for the deleted line
          i--;
        //empty lines do not note the end of a list
        } else if(lines[i] != ""){
          withinSection = false;
        }
      }
      //reconstruct the bio/gmnotes
      notes = lines.join("<br>");
      //return the notes which may or may not have been modified
      return notes;
    });
    //save the modifications to the bio/gmnotes
    character.set("bio",     charNotes[0]);
    character.set("gmnotes", charNotes[1]);
    whisper( "*" + character.get("name") + "* has returned their requisitioned gear.");
  });
}

on("ready", function(){
  CentralInput.addCMD(/^!\s*end\s*mission\s*$/i, endMission);
});
