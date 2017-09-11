//be sure the inqattack object exists before we start working with it
INQAttack = INQAttack || {};

//completely detail the weapon using ammo and character
//returns true if nothing went wrong
//returns false if something went wrong
INQAttack.detailTheWeapon = function(){
  //get the weapon base
  if(!INQAttack.getWeapon()){return false;}
  //add in the special ammo
  if(!INQAttack.getSpecialAmmo()){return false;}
  //overwrite any detail with user options
  INQAttack.customizeWeapon();
  //apply the special rules that affect the toHit roll
  INQAttack.accountForHitsSpecialRules();
  //apply the special rules that affect the damage roll
  INQAttack.accountForDamageSpecialRules();
  //determine the character's effective psy rating
  INQAttack.calcEffectivePsyRating();
  //apply that psy rating to the weapon
  INQAttack.inqweapon.setPR(INQAttack.PsyRating);
  //apply the strength bonus of the character to the weapon
  INQAttack.inqweapon.setSB(INQAttack.inqcharacter.bonus("S"));
  //the weapon was fully customized
  return true;
}

//find the weapon
INQAttack.getWeapon = function(){
  //is this a custom weapon?
  if(INQAttack.options.custom){
    INQAttack.inqweapon = new INQWeapon();
  //or are its stats found in the library?
  } else {
    //search for the weapon
    var weapons = matchingObjs("handout", INQAttack.weaponname.split(" "));
    //try to trim down to exact weapon matches
    weapons = trimToPerfectMatches(weapons, INQAttack.weaponname);
    //did none of the weapons match?
    if(weapons.length <= 0){
      whisper("*" + INQAttack.weaponname + "* was not found.", {speakingTo: INQAttack.msg.playerid, gmEcho: true});
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
      return false;
    }
    //detail the one and only weapon that was found
    INQAttack.inqweapon = new INQWeapon(weapons[0]);
  }
  //nothing went wrong
  return true;
}

//find the special ammunition
INQAttack.getSpecialAmmo = function(){
  //be sure the user was actually looking for special ammo
  if(!INQAttack.options.Ammo){
    //there was nothing to do so nothing went wrong
    return true;
  }
  //is this a custom ammo type?
  if(INQAttack.options.customAmmo){
    //record the name of the special ammo inside a weapon object
    INQAttack.inqammo = new INQWeapon();
    INQAttack.inqammo.Name = INQAttack.options.Ammo
    //exit out with everything being fine
    return true;
  }
  //search for the ammo
  var clips = matchingObjs("handout", INQAttack.options.Ammo.split(" "));
  //try to trim down to exact ammo matches
  clips = trimToPerfectMatches(clips, INQAttack.options.Ammo);
  //did none of the weapons match?
  if(clips.length <= 0){
    whisper("*" + INQAttack.options.Ammo + "* was not found.", {speakingTo: INQAttack.msg.playerid, gmEcho: true});
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
    return false;
  }
  //modify the weapon with the clip
  INQAttack.useAmmo(clips[0]);
  //nothing went wrong
  return true;
}

//parse the special ammo and use it to customize the inqweaon
INQAttack.useAmmo = function(ammo){
  //parse the special ammunition
  INQAttack.inqammo = new INQWeapon(ammo);
  //only add the special rules of the ammo to the inqweapon, we want every
  //modification to be highly visible to the player
  for(var k in INQAttack.inqammo){
    if(k == "Name" || k == "ObjID" || k == "ObjType" || k == "DamageType"){continue;}
    if(INQAttack.inqammo[k] == INQAttack.inqammo.__proto__[k]){continue;}
    if(Array.isArray(INQAttack.inqammo[k])){
      INQAttack.inqweapon[k] = INQAttack.inqweapon[k].concat(INQAttack.inqammo[k]);
    } else {
      INQAttack.inqweapon[k] = INQAttack.inqammo[k];
    }
  }
}

//let the given options temporarily overwrite the details of the weapon
INQAttack.customizeWeapon = function(){
  for(var label in INQAttack.inqweapon){
    //only work with labels that options has
    if(INQAttack.options[label] != undefined){
      //if label -> array, don't overwrite just add each item on as a link
      if(Array.isArray(INQAttack.inqweapon[label])){
        _.each(INQAttack.options[label].split(","), function(element){
          if(element.trim() != ""){
            INQAttack.inqweapon[label].push(new INQLink(element.trim()));
          }
        });
        //check if the value we are overwriting is a number
      } else if(typeof INQAttack.inqweapon[label] == 'number'){
        INQAttack.inqweapon[label] = Number(INQAttack.options[label]);
      } else {
        //otherwise simply overwrite the label
        INQAttack.inqweapon[label] = INQAttack.options[label];
      }
    }
  }

  if(typeof INQAttack.inqweapon.Special == 'string'){
    INQAttack.inqweapon.Special = _.map(INQAttack.inqweapon.split(","), function(rule){
      return new INQLink(rule);
    });
  }
}

//determine the effective psy rating of the character
INQAttack.calcEffectivePsyRating = function(){
  //reset the psy rating for each selected character
  INQAttack.PsyRating = undefined;
  //allow the options to superceed the character's psy rating
  if(INQAttack.options.EffectivePR){
    INQAttack.PsyRating = Number(INQAttack.options.EffectivePR);
  }
  //if no effective psy rating is set, default to the character's psy rating
  if(INQAttack.PsyRating == undefined
  && INQAttack.inqcharacter != undefined){
    INQAttack.PsyRating = INQAttack.inqcharacter.Attributes.PR;
  }
  //if the psy rating still has no set value, just default to 0
  if(INQAttack.PsyRating == undefined){
    INQAttack.PsyRating = 0;
  }
}
