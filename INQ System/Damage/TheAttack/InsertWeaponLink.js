//be sure the inqattack object exists before we start working with it
INQAttack = INQAttack || {};

//insert the given weapon into the list of character Requisitioned Weapons
//if it is a Psychic Power, it will instead be listed under Psychic Powers
INQAttack.insertWeaponLink = function(inqweapon, character){
  //get the character bio and gmnotes
  var charBio = "";
  character.get("bio", function(bio){
    charBio = bio || "";
  });
  var charGMNotes = "";
  character.get("gmnotes", function(gmnotes){
    charGMNotes = gmnotes || "";
  });
  //determine if the weapon was inserted anywhere
  var weaponWasInserted = false;
  //try to insert the weapon link into both
  var charNotes = _.map([charBio, charGMNotes], function(notes){
    //be sure the notes are not null
    if(notes == "null"){
        notes = "";
    }
    //break up the notes by line
    var lines = notes.split(/\s*<br>\s*/);
    //determine where we want to place the weapon
    if(inqweapon.Class == "Psychic"){
      var titleRe = /Psychic\s*Powers/i;
    } else {
      var titleRe = /Weapons/i;
    }
    var listRegex = "^\\s*";
    listRegex += "(?:<(?:strong|em|u)>\\s*)+";
    listRegex += "([^<>]+)";
    listRegex += "(?:</(?:strong|em|u)>\\s*)+";
    listRegex += "$";
    var listRe = RegExp(listRegex, "i");

    var ruleRegex = "^\\s*";
    ruleRegex += "(?:<(?:strong|em|u)>\\s*)+";
    ruleRegex += "([^<>]+)";
    ruleRegex += "(?:</(?:strong|em|u)>\\s*)+";
    ruleRegex += ":";
    ruleRegex += "(.+)";
    ruleRegex += "$";
    var ruleRe = RegExp(ruleRegex, "i");

    //create a list of groups that have the right title
    var groups = [];
    var group = undefined;
    for(var i = 0; i < lines.length; i++){
      if(listRe.test(lines[i])){
        //close off the last group before making a new one
        if(group){
          group.LastIndex = i - 1;
          groups.push(group);
          group = undefined;
        }
        //record the new group's name and start index
        //but only if it matches the title
        var matches = lines[i].match(listRe);
        if(titleRe.test(matches[1])){
          group = {Name: matches[1], FirstIndex: i};
        }
      } else if(ruleRe.test(lines[i])){
        //close off the last group before making a new one
        if(group){
          group.LastIndex = i - 1;
          groups.push(group);
          group = undefined;
        }
      }
    }
    //close off any remaing group
    if(group){
      group.LastIndex = i - 1;
      groups.push(group);
      group = undefined;
    }
    //only attempt to insert the weapon if a group was found
    if(groups.length > 0){
      var insertHere = undefined;
      if(inqweapon.Class == "Psychic"){
        //just insert the psychic ability into the first group found
        insertHere = groups[0].LastIndex;
      } else {
        //prioritize Weapons(Requisitioned) first
        _.each(groups, function(group){
          //if a place for the weapon was found, quit
          if(insertHere){return;}
          //is this the title we want?
          if(/^\s*weapons\s*\(\s*requisitioned\s*\)\s*$/i.test(group.Name)){
            insertHere = group.LastIndex;
          }
        });
        //if Weapons(Standard Issue) is found, create Weapons(Requisitioned)
        _.each(groups, function(group){
          //if the weappon already has a place for itself, don't try to create one
          if(insertHere){return;}
          //is this the title we want?
          if(/^\s*weapons\s*\(\s*standard\s*issue\s*\)\s*$/i.test(group.Name)){
            //insert a new group, Weapons(Requisitioned), here
            //add an extra line for spacing
            lines.splice(group.LastIndex+1, 0, "<strong>Weapons(Requisitioned)</strong>", "");
            insertHere = group.LastIndex+2;
          }
        });
        //otherwise just insert the weapon into the first group found
        if(!insertHere){
          insertHere = groups[0].LastIndex;
        }
      }
      //be sure you are not inserting the link below empty space
      while(lines[insertHere] == "" && insertHere > 0){
        insertHere--;
      }
      //insert the inqweapon link where you are told
      lines.splice(insertHere+1, 0, inqweapon.toLink());
      //reconstruct the bio/gmnotes
      notes = lines.join("<br>");
      //note that the weapon was inserted
      weaponWasInserted = true;
    }
    //return the notes which may or may not have been modified
    return notes;
  });
  //if the notes were modified, save that modification
  if(weaponWasInserted){
    character.set("bio",     charNotes[0]);
    character.set("gmnotes", charNotes[1]);
  } else {
    //otherwise let the gm know that it had no idea where to insert the weapon
    whisper("Please make a proper group for the *" + inqweapon.Name + "* on *" + character.get("name") + "*.");
  }
  //report if it was successful
  return weaponWasInserted;
}
