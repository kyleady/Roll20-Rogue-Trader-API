INQAttack = INQAttack || {};
//find the special ammunition
INQAttack.getSpecialAmmo = function(callback){
  //be sure the user was actually looking for special ammo
  if(!INQAttack.options.Ammo){
    //there was nothing to do so nothing went wrong
    if(typeof callback == 'function') callback(true);
    return true;
  }
  //is this a custom ammo type?
  if(INQAttack.options.customAmmo){
    //record the name of the special ammo inside a weapon object
    INQAttack.inqammo = new INQWeapon();
    INQAttack.inqammo.Name = INQAttack.options.Ammo
    //exit out with everything being fine
    if(typeof callback == 'function') callback(true);
    return true;
  }
  //search for the ammo
  var clips = matchingObjs("handout", INQAttack.options.Ammo.split(" "));
  //try to trim down to exact ammo matches
  clips = trimToPerfectMatches(clips, INQAttack.options.Ammo);
  //did none of the weapons match?
  if(clips.length <= 0){
    whisper("*" + INQAttack.options.Ammo + "* was not found.", {speakingTo: INQAttack.msg.playerid, gmEcho: true});
    if(typeof callback == 'function') callback(false);
    return false;
  }
  //are there too many weapons?
  if(clips.length >= 2){
    whisper("Which Special Ammunition did you intend to fire?", {speakingTo: INQAttack.msg.playerid})
    _.each(clips, function(clip){
      //specify the exact ammo name
      INQAttack.options.Ammo = clip.get("name");
      //construct the suggested command (without the !)
      var suggestion = "useweapon " + INQAttack.weaponname + JSON.stringify(INQAttack.options);
      //the suggested command must be encoded before it is placed inside the button
      suggestion = "!{URIFixed}" + encodeURIFixed(suggestion);
      whisper("[" + clip.get("name") + "](" + suggestion  + ")", {speakingTo: INQAttack.msg.playerid});
    });
    //something went wrong
    if(typeof callback == 'function') callback(false);
    return false;
  }
  //modify the weapon with the clip
  INQAttack.useAmmo(clips[0], function(){
    callback(true);
  });
  //nothing went wrong
  return true;
}
