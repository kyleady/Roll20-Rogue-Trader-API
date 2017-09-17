INQAttack = INQAttack || {};
//the attack missed, offer a reroll
INQAttack.offerReroll = function(){
  //the reroll will not use up any ammo
  INQAttack.options.freeShot = "true";
  //offer a reroll instead of rolling the damage
  var attack = "useweapon " + INQAttack.weaponname + JSON.stringify(INQAttack.options);
  //encode the attack
  attack = "!{URIFixed}" + encodeURIFixed(attack);
  //offer it as a button to the player
  setTimeout(whisper, 100, "[Reroll](" + attack + ")", {speakingTo: INQAttack.msg.playerid});
}
