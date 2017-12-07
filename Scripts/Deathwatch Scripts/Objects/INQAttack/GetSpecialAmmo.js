INQAttack_old = INQAttack_old || {};
//find the special ammunition
INQAttack_old.getSpecialAmmo = function(callback){
  //be sure the user was actually looking for special ammo
  if(!INQAttack_old.options.Ammo){
    //there was nothing to do so nothing went wrong
    if(typeof callback == 'function') callback(true);
    return true;
  }
  //is this a custom ammo type?
  if(INQAttack_old.options.customAmmo){
    //record the name of the special ammo inside a weapon object
    INQAttack_old.inqammo = new INQWeapon();
    INQAttack_old.inqammo.Name = INQAttack_old.options.Ammo
    //exit out with everything being fine
    if(typeof callback == 'function') callback(true);
    return true;
  }
  //search for the ammo
  var clips = matchingObjs("handout", INQAttack_old.options.Ammo.split(" "));
  //try to trim down to exact ammo matches
  clips = trimToPerfectMatches(clips, INQAttack_old.options.Ammo);
  //did none of the weapons match?
  if(clips.length <= 0){
    whisper("*" + INQAttack_old.options.Ammo + "* was not found.", {speakingTo: INQAttack_old.msg.playerid, gmEcho: true});
    if(typeof callback == 'function') callback(false);
    return false;
  }
  //are there too many weapons?
  if(clips.length >= 2){
    whisper("Which Special Ammunition did you intend to fire?", {speakingTo: INQAttack_old.msg.playerid})
    _.each(clips, function(clip){
      //specify the exact ammo name
      INQAttack_old.options.Ammo = clip.get("name");
      //construct the suggested command (without the !)
      var suggestion = "useweapon " + INQAttack_old.weaponname + JSON.stringify(INQAttack_old.options);
      //the suggested command must be encoded before it is placed inside the button
      suggestion = "!{URIFixed}" + encodeURIFixed(suggestion);
      whisper("[" + clip.get("name") + "](" + suggestion  + ")", {speakingTo: INQAttack_old.msg.playerid});
    });
    //something went wrong
    if(typeof callback == 'function') callback(false);
    return false;
  }
  //modify the weapon with the clip
  INQAttack_old.useAmmo(clips[0], function(){
    callback(true);
  });
  //nothing went wrong
  return true;
}
