INQAttack = INQAttack || {};
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
  if(INQAttack.hits) INQAttack.recordAttack();
  //if a player whispered this to the gm, let the player know it was successful
  if(INQAttack.inqcharacter.controlledby == ""
  || INQAttack.options.whisper){
    if(!playerIsGM(INQAttack.msg.playerid)){
      whisper("Damage rolled.", {speakingTo: INQAttack.msg.playerid});
    }
  }
}
