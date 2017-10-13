//allows a player to reload a weapon of theirs
  //matches[1] is the weapon to be reloaded
function reloadWeapon(matches, msg){
  //save the input variables
  var ammoPhrase = "Ammo - " + matches[1];
  eachCharacter(msg, function(character, graphic){
    if(ammoPhrase == 'Ammo - all') {
      var localAttributes = new LocalAttributes(graphic);
      for(var prop in localAttributes.Attributes) {
        if(/^Ammo - /.test(prop)) localAttributes.remove(prop);
      }

      var clips = matchingObjs('attribute', ['Ammo - '], function(obj){
        return obj.get('_characterid') == character.id;
      });

      _.each(clips, function(clip){
        clip.remove();
      });

      return whisper(getLink(character) + ' has reloaded every clip.', {speakingTo: msg.playerid, gmEcho: true});
    }

    //get a list of all of the ammo attribute names that match
    var ammoNames = matchingAttrNames(graphic.id, ammoPhrase);
    //warn the player that that clip does not exist yet if nothing was found
    if(ammoNames.length <= 0){
      return whisper("A clip for *" + ammoPhrase.replace(/^Ammo - /, "") + "* does not exist yet.");
    }
    //determine which clip the player wants to reload before proceeding
    if(ammoNames.length >= 2){
      whisper("Which clip did you want to reload?");
      _.each(ammoNames, function(ammo){
        //use the clip's exact name
        var name = ammo.replace(/^Ammo - /, "");
        var suggestion = "reload " + name;
        //the suggested command must be encoded before it is placed inside the button
        suggestion = "!{URIFixed}" + encodeURIFixed(suggestion);
        whisper("[" + name + "](" + suggestion  + ")", {speakingTo: msg.playerid});
      });
      return;
    }
    //the clip the player wants has been made clear
    //use the stat handler to show the reload
    var fakeMsg = {
      playerid: msg.playerid,
      selected: [graphic]
    };
    attributeHandler(["","",ammoNames[0],"=","","max"], fakeMsg);
  });
}

on("ready", function(){
  CentralInput.addCMD(/!\s*reload\s+(\S.*)$/i, reloadWeapon, true);
});
