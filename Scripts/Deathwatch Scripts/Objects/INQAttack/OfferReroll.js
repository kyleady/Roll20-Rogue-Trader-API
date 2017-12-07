INQAttack_old = INQAttack_old || {};
//the attack missed, offer a reroll
INQAttack_old.offerReroll = function(){
  //the reroll will not use up any ammo
  INQAttack_old.options.freeShot = "true";
  //offer a reroll instead of rolling the damage
  var attack = "useweapon " + INQAttack_old.weaponname + JSON.stringify(INQAttack_old.options);
  //encode the attack
  attack = "!{URIFixed}" + encodeURIFixed(attack);
  //offer it as a button to the player
  setTimeout(whisper, 100, "[Reroll](" + attack + ")", {speakingTo: INQAttack_old.msg.playerid});
}
