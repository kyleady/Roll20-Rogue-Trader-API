//be sure the inqattack object exists before we start working with it
INQAttack = INQAttack || {};

INQAttack.useWeapon = function(matches,msg){
  //clean out any of the previous details
  INQAttack.clean();
  //get the options
  INQAttack.options = new Hash(matches[2]);
  //save the weapon name
  INQAttack.weaponname = matches[1];
  //save the message for use elsewhere
  INQAttack.msg = msg;
  //if nothing was selected and the player is the gm, auto hit with no roll
  if(INQAttack.msg.selected == undefined || INQAttack.msg.selected == []){
    if(playerIsGM(INQAttack.msg.playerid)){
      INQAttack.msg.selected = [{_type: "unique"}];
    }
  }
  //repeat for each character selected
  eachCharacter(INQAttack.msg, function(character, graphic){
    //allow the loop to skip over future iterations if something went wrong
    if(INQAttack.break){return;}
    //reset the report
    INQAttack.Reports = {};
    //prepare attack variables for each character's attack
    INQAttack.prepareVariables();4
    //detail the character (or make a dummy character)
    INQAttack.inqcharacter = new INQCharacter(character, graphic);
    //get the weapon specified and be sure nothing went wrong
    if(!INQAttack.detailTheWeapon()){return;}
    //be sure you are dealing with a specific character
    if(character != undefined){
      //roll to hit
      INQAttack.rollToHit();
      //use up the ammo for the attack
      //cancel this attack if there isn't enough ammo
      if(!INQAttack.expendAmmunition()){return;}
    }
    //only show the damage if the attack hit
    if(INQAttack.hits == 0){
      //offer reroll
      INQAttack.offerReroll();
    } else {
      //roll damage
      INQAttack.rollDamage();
    }
    //report the results
    INQAttack.deliverReport();
  });
}

//display all of the results from the current attack
INQAttack.deliverReport = function(){
  //auto hitting weapons do not roll to hit
  if(INQAttack.autoHit){
    INQAttack.Reports.toHit = undefined;
  }
  //deliver each report
  _.each(["Weapon", "toHit", "Crit", "Damage"], function(report){
    if(INQAttack.Reports[report]){
      //is this a private or public roll?
      if(INQAttack.inqcharacter.controlledby == ""
      || INQAttack.options.whisper){
        //only whisper the report to the gm
        whisper(INQAttack.Reports[report]);
      } else {
        //make the character publicly roll
        announce(INQAttack.Reports[report]);
      }
    }
  });
  //record the results of the attack
  INQAttack.recordAttack();
  //if a player whispered this to the gm, let the player know it was successful
  if(INQAttack.inqcharacter.controlledby == ""
  || INQAttack.options.whisper){
    if(!playerIsGM(INQAttack.msg.playerid)){
      whisper("Damage rolled.", INQAttack.msg.playerid);
    }
  }
}

//delete every property but leave all of the functions untouched
INQAttack.clean = function(){
  for(var k in INQAttack){
    if(typeof INQAttack[k] != 'function'){
      delete INQAttack[k];
    }
  }
}

//record the details of the attack
INQAttack.recordAttack = function(){
  //report the hit location and save the hit location
  if(INQAttack.d100 != undefined){
    saveHitLocation(INQAttack.d100);
  }
  if(INQAttack.hits != undefined){
    //save the number of hits achieved
    var hitsObj = findObjs({ type: 'attribute', name: "Hits" })[0];
    if(hitsObj == undefined){
      return whisper("No attribute named Hits was found anywhere in the campaign.");
    }
    hitsObj.set("current", INQAttack.hits);
    hitsObj.set("max", INQAttack.hits);
  }
}

//the attack missed, offer a reroll
INQAttack.offerReroll = function(){
  //the reroll will not use up any ammo
  INQAttack.options.freeShot = "true";
  //offer a reroll instead of rolling the damage
  var attack = "useweapon " + INQAttack.weaponname + INQAttack.options.toString();
  //encode the attack
  attack = "!{URIFixed}" + encodeURIFixed(attack);
  //offer it as a button to the player
  setTimeout(whisper, 100, "[Reroll](" + attack + ")", INQAttack.msg.playerid);
}

//prepare attack variables for each attack
INQAttack.prepareVariables = function(){
  INQAttack.toHit = 0;
  INQAttack.unnaturalSuccesses = 0;
  INQAttack.shotsMultiplier = 1;
  INQAttack.hitsMultiplier = 1;

}

on("ready", function(){
  var hash = new Hash();
  var regex = "^!\\s*use\\s*weapon";
  regex += "\\s+(\\S[^\\{\\}]*)"
  regex += "(" + hash.regex({text: true}) + ")$"
  var re = RegExp(regex, "i");
  CentralInput.addCMD(re, INQAttack.useWeapon, true);
});
