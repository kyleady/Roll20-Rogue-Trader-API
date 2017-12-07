INQAttack_old = INQAttack_old || {};
//display all of the results from the current attack
INQAttack_old.deliverReport = function(){
  //auto hitting weapons do not roll to hit
  if(INQAttack_old.autoHit){
    INQAttack_old.Reports.toHit = undefined;
  }
  //deliver each report
  _.each(["Weapon", "toHit", "Crit", "Damage"], function(report){
    if(INQAttack_old.Reports[report]){
      //is this a private or public roll?
      if(INQAttack_old.inqcharacter.controlledby == ""
      || INQAttack_old.options.whisper){
        //only whisper the report to the gm
        whisper(INQAttack_old.Reports[report]);
      } else {
        //make the character publicly roll
        announce(INQAttack_old.Reports[report]);
      }
    }
  });
  //record the results of the attack
  if(INQAttack_old.hits) INQAttack_old.recordAttack();
  //if a player whispered this to the gm, let the player know it was successful
  if(INQAttack_old.inqcharacter.controlledby == ""
  || INQAttack_old.options.whisper){
    if(!playerIsGM(INQAttack_old.msg.playerid)){
      whisper("Damage rolled.", {speakingTo: INQAttack_old.msg.playerid});
    }
  }
}
