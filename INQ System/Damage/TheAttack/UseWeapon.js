INQAttack = {};

INQAttack.useWeapon = function(matches,msg){
  //get the options
  INQAttack.options = new Hash(matches[2]);
  //save the weapon name
  INQAttack.weaponname = matches[1];
  //save the speaker
  INQAttack.who = "player|" + msg.playerid;
  //get the weapon specified and be sure nothing went wrong
  if(!INQAttack.getWeapon()){return;}
  //if nothing was selected and the player is the gm, auto hit with no roll
  if(msg.selected == undefined || msg.selected == []){
    msg.selected = [{_type: "unique"}];
  }
  //repeat for each character selected
  eachCharacter(msg, function(character, graphic){
    //be sure you are dealing with a specific character
    if(character != undefined){
      //detail the character
      INQAttack.inqcharacter = new INQCharacter(character);
      //use up the ammo for the attack
      INQAttack.expendAmmunition();
      //roll to hit
      INQAttack.rollToHit();
    }
    //roll damage
    INQAttack.rollDamage();

    whisper("Done.",msg.player);
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
  //let the given options temporarily overwrite the details of the weapon
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
  //nothing went wrong
  return true;
}

INQAttack.expendAmmunition = function(){

}

INQAttack.rollToHit = function(){
  //calculate the roll to hit
  var toHit = 0;
  var maxHits = 0;
  var mode = "Single";
  var unnaturalSuccesses = 0;
  //get the stat used to hit
  var stat = "BS"
  if(INQAttack.inqweapon.Class == "Melee"){
    stat = "WS";
  } else if(INQAttack.inqweapon.Class == "Psychic"){
    stat = "Wp";
  }
  //use the stat
  toHit += Number(INQAttack.inqcharacter.Attributes[stat]);
  unnaturalSuccesses += Math.ceil(Number(INQAttack.inqcharacter.Attributes["Unnatural " + stat])/2);
  //if the RoF was undefined, find the lowest available setting to fire on
  if(INQAttack.options.RoF == undefined){
    _.each(["Single", "Semi", "Full"], function(RoF){
      if(INQAttack.inqweapon[RoF]){
        INQAttack.options.RoF = RoF;
      }
    });
    //if nothing was valid, go for single
    if(INQAttack.options.RoF == undefined){
      INQAttack.options.RoF = "Single";
    }
  }
  //add in any modifiers for the RoF
  switch(INQAttack.options.RoF.toLowerCase()){
    case "semi":
      toHit += 0;
      maxHits = INQAttack.inqweapon.Semi;
      mode = "Semi";
      break;
    case "swift":
      toHit += 0;
      maxHits = Math.max(2, Math.round(INQAttack.inqweapon.WS/3));
      mode = "Semi";
      break;
    case "full":
      toHit += -10;
      maxHits = INQAttack.inqweapon.Full
      mode = "Full";
      break;
    case "lightning":
      toHit += -10;
      maxHits = Math.max(3, Math.round(INQAttack.inqweapon.WS/2));
      mode = "Full";
      break;
    case "called":
      toHit += -20;
      maxHits = 1;
      mode = "Single";
      break;
    default:
      toHit += 10;
      maxHits = 1;
      mode = "Single";
      break;
  }
  if(INQAttack.options.Modifier){
    toHit += INQAttack.options.Modifier;
  }
  //make the roll
  var d100 = randomInteger(100);
  //determine the number of hits
  var hits = 0;
  var successes = Math.ceil((toHit-d100)/10)+unnaturalSuccesses;
  if(toHit - d100 >= 0){
    switch(mode){
      case "Single":
        hits = 1;
      break;
      case "Semi":
        hits = 1+Math.floor(successes/2);
      break;
      case "Full":
        hits = 1+successes
      break;
    }
    //be sure the number of hits is not over the max (and that there is a max)
    if(maxHits > 0 && hits > maxHits){
      hits = maxHits;
    }
  }
  //show the roll to hit
  sendChat(INQAttack.who,"&{template:default} {{name=<strong>" + stat +  "</strong>: " + INQAttack.weaponname + "}} {{Successes=[[(" + toHit.toString() + " - (" + d100.toString() + ") )/10]]}} {{Unnatural= [[" + unnaturalSuccesses.toString() + "]]}} {{Hits= [[" + hits.toString() + "]]}}")
}

INQAttack.rollDamage = function(){

}

on("ready", function(){
  var hash = new Hash();
  var regex = "^!\\s*use\\s*weapon";
  regex += "\\s+(\\S[^\\{\\}]*)"
  regex += "(" + hash.regex({text: true}) + ")$"
  var re = RegExp(regex, "i");
  CentralInput.addCMD(re, INQAttack.useWeapon, true);
});
