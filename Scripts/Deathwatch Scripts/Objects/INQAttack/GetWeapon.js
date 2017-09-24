INQAttack = INQAttack || {};
//find the weapon
INQAttack.getWeapon = function(callback){
  //is this a custom weapon?
  if(INQAttack.options.custom){
    INQAttack.inqweapon = new INQWeapon();
    if(typeof callback == 'function') callback(true);
    return true;
  //or are its stats found in the library?
  } else {
    //search for the weapon
    var weapons = matchingObjs("handout", INQAttack.weaponname.split(" "));
    //try to trim down to exact weapon matches
    weapons = trimToPerfectMatches(weapons, INQAttack.weaponname);
    //did none of the weapons match?
    if(weapons.length <= 0){
      whisper("*" + INQAttack.weaponname + "* was not found.", {speakingTo: INQAttack.msg.playerid, gmEcho: true});
      if(typeof callback == 'function') callback(false);
      return false;
    }
    //are there too many weapons?
    if(weapons.length >= 2){
      whisper("Which weapon did you intend to fire?", {speakingTo: INQAttack.msg.playerid});
      _.each(weapons, function(weapon){
        //use the weapon's exact name
        var suggestion = "useweapon " + weapon.get("name") + JSON.stringify(INQAttack.options);
        //the suggested command must be encoded before it is placed inside the button
        suggestion = "!{URIFixed}" + encodeURIFixed(suggestion);
        whisper("[" + weapon.get("name") + "](" + suggestion  + ")", {speakingTo: INQAttack.msg.playerid});
      });
      //don't continue unless you are certain what the user wants
      if(typeof callback == 'function') callback(false);
      return false;
    }

    INQAttack.inqweapon = new INQWeapon(weapons[0], function(){
      if(typeof callback == 'function') callback(true);
    });

    //detail the one and only weapon that was found
    return true;
  }
}
