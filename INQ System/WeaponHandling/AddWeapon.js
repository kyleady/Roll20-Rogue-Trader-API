//be sure the inqattack object exists before we start working with it
INQAttack = INQAttack || {};

//gives the listed weapon to the character, adding it to their character sheet
//and adding a token action to the character
//you can specify the special ammunition options for the weapon
  //matches[1] - weapon to give to the characters
  //matches[2] - list of special Ammunition
  //matches[3] - the clip size of the weapon. If it didn't already have a clip,
               //it will make the assumption that it is the quantity of
               //consumable items and add the note on the player sheet.
INQAttack.addWeapon = function(matches, msg){
  //if nothing was selected and the player is the gm, quit
  if(msg.selected == undefined || msg.selected == []){
    if(playerIsGM(msg.playerid)){
      whisper("Please carefully select who we are giving these weapns to.")
      return;
    }
  }
  //save the variables
  var name = matches[1];
  if(matches[2]){
    var ammoStr = matches[2];
    var ammoNames = matches[2].split(",");
  }
  if(matches[3]){
    var quantity =matches[3];
  }
  //search for the weapon first
  var weapons = matchingObjs("handout", name.split(" "));
  //try to trim down to exact weapon matches
  weapons = trimToPerfectMatches(weapons, name);
  //did none of the weapons match?
  if(weapons.length <= 0){
    whisper("*" + name + "* was not found.", msg.playerid);
    return false;
  }
  //are there too many weapons?
  if(weapons.length >= 2){
    whisper("Which weapon did you intend to add?", msg.playerid)
    _.each(weapons, function(weapon){
      //use the weapon's exact name
      var suggestion = "addweapon " + weapon.get("name");
      if(ammoStr){
        suggestion += "(" + ammoStr + ")";
      }
      //the suggested command must be encoded before it is placed inside the button
      suggestion = "!{URIFixed}" + encodeURIFixed(suggestion);
      whisper("[" + weapon.get("name") + "](" + suggestion  + ")", msg.playerid);
    });
    //don't continue unless you are certain what the user wants
    return false;
  }
  //detail the one and only weapon that was found
  var inqweapon = new INQWeapon(weapons[0]);

  //was there any ammo to load?
  if(ammoStr){
    //get the exact name of every clip
    for(var i = 0; i < ammoNames.length; i++){
      //if the ammo name is empty, just use the unmodified weapon
      if(ammoNames[i] == ""){continue;}
      //search for the ammo
      var clips = matchingObjs("handout", ammoNames[i].split(" "));
      //try to trim down to exact ammo matches
      clips = trimToPerfectMatches(clips, ammoNames[i]);
      //did none of the weapons match?
      if(clips.length <= 0){
        whisper("*" + ammoNames[i] + "* was not found.", msg.playerid);
        return false;
      }
      //are there too many weapons?
      if(clips.length >= 2){
        whisper("Which Special Ammunition did you intend to add?", msg.playerid)
        _.each(clips, function(clip){
          //specify the exact ammo name
          ammoNames[i] = clip.get("name");
          //construct the suggested command (without the !)
          var suggestion = "addweapon " + name + "(" + ammoNames.toString() + ")";
          //the suggested command must be encoded before it is placed inside the button
          suggestion = "!{URIFixed}" + encodeURIFixed(suggestion);
          whisper("[" + clip.get("name") + "](" + suggestion  + ")", msg.playerid);
        });
        //something went wrong
        return false;
      }
      //be sure the name is exactly correct
      ammoNames[i] = clips[0].get("name");
    }
  }
  //only weapons that have a clip of 0 are assumed to be consumable
  //weapons that have an alternate clip size do not need a note on the character bio
  if(quantity != undefined && inqweapon.Clip == 0){
    var quantityNote = quantity;
  }
  //add this weapon to each of the selected characters
  eachCharacter(msg, function(character, graphic){
    //parse the character
    var inqcharacter = new INQCharacter(character, graphic);
    //try to insert the link before continuing
    if(!INQAttack.insertWeaponLink(inqweapon, character, quantityNote)){return;}
    //only add an ability if it isn't gear
    if(inqweapon.Class != "Gear"){
      //add the token action to the character
      createObj("ability", {
        characterid: character.id,
        name: inqweapon.Name,
        action: inqweapon.toAbility(inqcharacter, ammoNames, quantity),
        istokenaction: true
      });
    }
    //report the success
    whisper("*" + inqcharacter.toLink() + "* has been given a(n) *" + inqweapon.toLink() + "*");
  });
}

on("ready", function(){
  var regex = "^!\\s*add\\s*weapon";
  regex += "\\s+(\\S[^\\(\\)\\[\\]]*)";
  regex += "(?:";
  regex += "\\(([^\\(\\)]+)\\)";
  regex += ")?";
  regex += "(?:";
  regex += "\\[\\s*x\\s*(\\d+)\\s*\\]";
  regex += ")?";
  regex += "\\s*$";
  var re = RegExp(regex, "i");
  CentralInput.addCMD(re, INQAttack.addWeapon, true);
});
