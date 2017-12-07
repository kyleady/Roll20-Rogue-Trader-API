INQAttack_old = INQAttack_old || {};
//calculate the number of hits based on the
INQAttack_old.calcHits = function(){
  //account for any extra ammo this may spend
  INQAttack_old.maxHits *= INQAttack_old.maxHitsMultiplier;
  //determine the successes based on the roll
  INQAttack_old.successes = Math.floor((INQAttack_old.toHit-INQAttack_old.d100)/10) + INQAttack_old.unnaturalSuccesses;
  //calculate the number of hits based on the firing mode
  INQAttack_old.hits = 0;
  if(INQAttack_old.autoHit){
    //auto hitting weapons always hit
    INQAttack_old.hits = INQAttack_old.maxHits;
  } else if(INQAttack_old.toHit - INQAttack_old.d100 >= 0){
    INQAttack_old.hits = 1;
    switch(INQAttack_old.mode){
      case "Full":
        INQAttack_old.hits += INQAttack_old.successes
      break;
      default: //"Semi"
        INQAttack_old.hits += Math.floor(INQAttack_old.successes/2);
      break;
    }
    //be sure the number of hits is not over the max (and that there is a max)
    if(INQAttack_old.maxHits > 0 && INQAttack_old.hits > INQAttack_old.maxHits){
      INQAttack_old.hits = INQAttack_old.maxHits;
    }
  }
  //account for any hits bonuses
  INQAttack_old.hits *= INQAttack_old.hitsMultiplier;
}
