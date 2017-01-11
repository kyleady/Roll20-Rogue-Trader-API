//allows a player to reload a weapon of theirs
  //matches[1] is the weapon to be reloaded
function reloadWeapon(matches, msg){
  //save the input variables
  var ammoPhrase = "Ammo - " + matches[1];
  eachCharacter(msg, function(character, graphic){
    //get a list of all of the ammo attributes that match and belong to the
    //selected character
    var ammoObjs = matchingObjs("attribute", ammoPhrase.split(" "), function(attr){
      return attr.get("characterid") == character.id;
    });
    //trim down the list to exact matches if possible
    ammoObjs = trimToPerfectMatches(ammoObjs, ammoPhrase);
    //warn the player that that clip does not exist yet if nothing was found
    if(ammoObjs.length <= 0){
      return whisper("A clip for *" + ammoPhrase.repalce(/^Ammo - /, "") + "* does not exist yet.");
    }
    //determine which clip the player wants to reload before proceeding
    if(ammoObjs.length >= 2){
      whisper("Which clip did you want to reload?");
      _.each(ammoObjs, function(ammoObj){
        //use the clip's exact name
        var name = ammoObj.get("name").replace(/^Ammo - /, "");
        var suggestion = "reload " + name;
        //the suggested command must be encoded before it is placed inside the button
        suggestion = "!{URIFixed}" + encodeURIFixed(suggestion);
        whisper("[" + name + "](" + suggestion  + ")", msg.playerid);
      });
      return;
    }
    //the clip the player wants has been made clear
    //use the stat handler to show the reload
    var fakeMsg = {
      playerid: msg.playerid,
      selected: [graphic]
    };
    statHandler(["","",ammoObjs[0].get("name"),"=","","max"], fakeMsg);
  });
}

on("ready", function(){
  CentralInput.addCMD(/!\s*reload\s+(\S.*)$/, reloadWeapon, true);
});
