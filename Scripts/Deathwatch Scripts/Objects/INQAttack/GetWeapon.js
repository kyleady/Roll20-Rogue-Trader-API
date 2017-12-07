INQAttack_old = INQAttack_old || {};
//find the weapon
INQAttack_old.getWeapon = function(callback){
  //is this a custom weapon?
  if(INQAttack_old.options.custom){
    INQAttack_old.inqweapon = new INQWeapon();
    if(typeof callback == 'function') callback(true);
    return true;
  //or are its stats found in the library?
  } else {
    //search for the weapon
    var weapons = matchingObjs("handout", INQAttack_old.weaponname.split(" "));
    //try to trim down to exact weapon matches
    weapons = trimToPerfectMatches(weapons, INQAttack_old.weaponname);
    //did none of the weapons match?
    if(weapons.length <= 0){
      whisper("*" + INQAttack_old.weaponname + "* was not found.", {speakingTo: INQAttack_old.msg.playerid, gmEcho: true});
      if(typeof callback == 'function') callback(false);
      return false;
    }
    //are there too many weapons?
    if(weapons.length >= 2){
      whisper("Which weapon did you intend to fire?", {speakingTo: INQAttack_old.msg.playerid});
      _.each(weapons, function(weapon){
        //use the weapon's exact name
        var suggestion = "useweapon " + weapon.get("name") + JSON.stringify(INQAttack_old.options);
        //the suggested command must be encoded before it is placed inside the button
        suggestion = "!{URIFixed}" + encodeURIFixed(suggestion);
        whisper("[" + weapon.get("name") + "](" + suggestion  + ")", {speakingTo: INQAttack_old.msg.playerid});
      });
      //don't continue unless you are certain what the user wants
      if(typeof callback == 'function') callback(false);
      return false;
    }

    INQAttack_old.inqweapon = new INQWeapon(weapons[0], function(){
      if(typeof callback == 'function') callback(true);
    });

    //detail the one and only weapon that was found
    return true;
  }
}
