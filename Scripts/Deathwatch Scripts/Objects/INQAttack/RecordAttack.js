INQAttack_old = INQAttack_old || {};
//record the details of the attack
INQAttack_old.recordAttack = function(){
  //report the hit location and save the hit location
  if(INQAttack_old.d100 != undefined){
    saveHitLocation(INQAttack_old.d100, {whisper: INQAttack_old.inqcharacter.controlledby == "" || INQAttack_old.options.whisper});
  }
  if(INQAttack_old.hits != undefined){
    //save the number of hits achieved
    var hitsObj = findObjs({ type: 'attribute', name: "Hits" })[0];
    if(hitsObj == undefined){
      return whisper("No attribute named Hits was found anywhere in the campaign.");
    }
    hitsObj.set("current", INQAttack_old.hits);
    hitsObj.set("max", INQAttack_old.hits);
  }
}
