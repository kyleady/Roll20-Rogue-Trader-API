

INQAttack.useWeapon = function(matches,msg){
  //get the options
  INQAttack.options = new Hash(matches[2]);
  //save the weapon name
  INQAttack.weaponname = matches[1];
  //save the speaker
  INQAttack.who = msg.playerid;
  //get the weapon specified and be sure nothing went wrong
  if(!INQAttack.getWeapon()){return;}
  //use the options to detail the weapon
  INQAttack.customizeWeapon();
  //if nothing was selected and the player is the gm, auto hit with no roll
  if(msg.selected == undefined || msg.selected == []){
    msg.selected = [{_type: "unique"}];
  }
  //repeat for each character selected
  eachCharacter(msg, function(character, graphic){
    //reset the report
    INQAttack.Reports = {};
    //be sure you are dealing with a specific character
    if(character != undefined){
      //detail the character
      INQAttack.inqcharacter = new INQCharacter(character, graphic);
      //roll to hit
      INQAttack.rollToHit();
      //use up the ammo for the attack
      //cancel this attack if there isn't enough ammo
      if(!INQAttack.expendAmmunition()){return;}
    }
    //roll damage
    INQAttack.rollDamage();
    //report the results
    INQAttack.deliverReport();
  });
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
      whisper("*" + INQAttack.weaponname + "* was not found.", msg.playerid);
      return false;
    }
    //are there too many weapons?
    if(weapons.length >= 2){
      whisper("Which weapon did you intend to fire?", msg.playerid)
      _.each(weapons, function(weapon){
        whisper("[" + weapon.get("name") + "](!useweapon " + weapon.get("name") + " " + INQAttack.options.toString() + ")", msg.playerid);
      });
      //something went wrong
      return false;
    }
    //detail the one and only weapon that was found
    INQAttack.inqweapon = new INQWeapon(weapons[0]);
  }
  //nothing went wrong
  return true;

}

//let the given options temporarily overwrite the details of the weapon
INQAttack.customizeWeapon = function(){
  for(var label in INQAttack.inqweapon){
    //only work with labels that options has
    if(INQAttack.options[label] != undefined){
      //if label -> array, don't overwrite just add them on
      if(Array.isArray(INQAttack.inqweapon[label])){
        var array = _.map(INQAttack.options[label].split(";"), function(element){
          return INQLink(element.trim());
        });
        INQAttack.inqweapon[label].concat(array);
      } else {
        //otherwise simply overwrite the label
        INQAttack.inqweapon[label] = INQAttack.options[label];
      }
    }
  }
}

INQAttack.deliverReport = function(){
  //deliver each report that exists
  _.each(["Weapon", "toHit", "Damage"], function(report){
    if(INQAttack.Reports[report]){
      sendChat("player|" + INQAttack.who, INQAttack.Reports[report]);
    }
  });
}

on("ready", function(){
  var hash = new Hash();
  var regex = "^!\\s*use\\s*weapon";
  regex += "\\s+(\\S[^\\{\\}]*)"
  regex += "(" + hash.regex({text: true}) + ")$"
  var re = RegExp(regex, "i");
  CentralInput.addCMD(re, INQAttack.useWeapon, true);
});
