//be sure the inqattack object exists before we start working with it
var INQAttack_old = INQAttack_old || {};

//gives the listed weapon to the character, adding it to their character sheet
//and adding a token action to the character
//you can specify the special ammunition options for the weapon
  //matches[1] - weapon to give to the characters
  //matches[2] - list of special Ammunition
  //matches[3] - the clip size of the weapon. If it didn't already have a clip,
               //it will make the assumption that it is the quantity of
               //consumable items and add the note on the player sheet.
 function addWeapon(matches, msg){
  //if nothing was selected and the player is the gm, quit
  if(msg.selected == undefined || msg.selected == []){
    if(playerIsGM(msg.playerid)){
      whisper('Please carefully select who we are giving this weapon to.', {speakingTo: msg.playerid});
      return;
    }
  }

  var name = matches[1];
  var ammoStr, quantity;
  if(matches[2]) ammoStr = matches[2];
  if(matches[3]) quantity = matches[3];
  var suggestion = '!addWeapon $';
  if(ammoStr) suggestion += '(' + ammoStr + ')';
  if(quantity) suggestion += '[x' + quantity + ']';
  var weapons = suggestCMD(suggestion, name, msg.playerid);
  if(!weapons) return;
  var weapon = weapons[0];
  var myPromise = new Promise(function(resolve){
    var inqweapon = new INQWeapon(weapon, function(){
      resolve(inqweapon);
    });
  });

  myPromise.catch(function(e){log(e)});
  myPromise.then(function(inqweapon){
    if(ammoStr){
      var ammoSuggestion = '!addWeapon ' + name + '($)';
      if(quantity) ammoSuggestion += '[x' + quantity + ']';
      var clips = suggestCMD(ammoSuggestion, ammoStr.split(','), msg.playerid);
      if(!clips) return;
      var ammoNames = [];
      for(var clip of clips){
        ammoNames.push(clip.get('name'));
      }
    }

    eachCharacter(msg, function(character, graphic){
      var characterPromise = new Promise(function(resolve){
        new INQCharacter(character, graphic, function(inqcharacter){
          resolve(inqcharacter);
        });
      });

      characterPromise.catch(function(e){log(e)});
      characterPromise.then(function(inqcharacter){
        if(inqweapon.Class != 'Gear'){
          insertWeaponAbility(inqweapon, character, quantity, ammoNames, inqcharacter);
        } else {
          whisper('Add Weapon is not prepared to create an Ability for Gear.', {speakingTo: msg.playerid, gmEcho: true});
        }

        whisper('*' + inqcharacter.toLink() + '* has been given a(n) *' + inqweapon.toLink() + '*', {speakingTo: msg.playerid, gmEcho: true});
      });
    });
  });
}

on('ready', function(){
  var regex = '^!\\s*add\\s*weapon';
  regex += '\\s+(\\S[^\\(\\)\\[\\]]*)';
  regex += '(?:';
  regex += '\\(([^\\(\\)]+)\\)';
  regex += ')?\\s*';
  regex += '(?:';
  regex += '\\[\\s*x\\s*(\\d+)\\s*\\]';
  regex += ')?';
  regex += '\\s*$';
  var re = RegExp(regex, 'i');
  CentralInput.addCMD(re, addWeapon, true);
});
