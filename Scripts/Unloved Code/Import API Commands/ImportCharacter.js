//create a single character importer object
charImport = {}

//save the content of the character bio
charImport.getCharacterBio = function(charName, callback){
  //create a list of charactersheets that have the given name
  this.charName = charName;
  var charList = findObjs({_type: "character", name: charName});

  //are there too few matches?
  if(charList.length <= 0){
    whisper("Character not found.");
    return false;
  //are there too many matches?
  } else if(charList.length >= 2){
    whisper("Multiple matches. Aborting. See log for details.")
    _.each(charList,function(char){
      log(char.get("name"));
    });
    return false;
  }
  //save the character object
  charImport.CharObj = charList[0];
  //otherwise try to load the Bio of the given character
  charImport.CharObj.get("bio", function(bio){
    //was the bio empty?
    if(bio == ""){
      whisper("Bio is empty.")
      if(typeof callback == 'function') callback(false);
    } else {
    //there was no problem saving the bio
      charImport.charText = bio;
      if(typeof callback == 'function') callback(true);
    }
  });
}

//convert text into character
charImport.makeCharacter = function(){
  this.character = new INQCharacter(this.charText);
  this.character.Name = this.charName;
  this.character.toCharacterObj(false, this.CharObj.id);
}

//convert text into character
charImport.makeVehicle = function(){
  this.character = new INQVehicle(this.charText);
  this.character.Name = this.charName;
  this.character.toCharacterObj(false, this.CharObj.id);
}

on("ready",function(){
  CentralInput.addCMD(/^!\s*import\s*character\s*(\S(?:.*\S)?)\s*$/i,function(matches,msg){
    charImport.getCharacterBio(matches[1], function(valid){
      if(!valid) return;
      charImport.makeCharacter();
      whisper("*" + getLink(charImport.CharObj.get("name")) + "* has been imported. Note that attributes will not be shown until the character sheet has been closed and opened again.");
    });
  });
  CentralInput.addCMD(/^!\s*import\s*vehicle\s*(\S(?:.*\S)?)\s*$/i,function(matches,msg){
    charImport.getCharacterBio(matches[1], function(valid){
      if(!valid) return;
      charImport.makeVehicle();
      whisper("*" + getLink(charImport.CharObj.get("name")) + "* has been imported. Note that attributes will not be shown until the character sheet has been closed and opened again.");
    });
  });
});
