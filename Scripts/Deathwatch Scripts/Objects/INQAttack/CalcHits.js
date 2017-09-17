INQAttack = INQAttack || {};
//calculate the number of hits based on the
INQAttack.calcHits = function(){
  //account for any extra ammo this may spend
  INQAttack.maxHits *= INQAttack.maxHitsMultiplier;
  //determine the successes based on the roll
  INQAttack.successes = Math.floor((INQAttack.toHit-INQAttack.d100)/10) + INQAttack.unnaturalSuccesses;
  //calculate the number of hits based on the firing mode
  INQAttack.hits = 0;
  if(INQAttack.autoHit){
    //auto hitting weapons always hit
    INQAttack.hits = INQAttack.maxHits;
  } else if(INQAttack.toHit - INQAttack.d100 >= 0){
    INQAttack.hits = 1;
    switch(INQAttack.mode){
      case "Full":
        INQAttack.hits += INQAttack.successes
      break;
      default: //"Semi"
        INQAttack.hits += Math.floor(INQAttack.successes/2);
      break;
    }
    //be sure the number of hits is not over the max (and that there is a max)
    if(INQAttack.maxHits > 0 && INQAttack.hits > INQAttack.maxHits){
      INQAttack.hits = INQAttack.maxHits;
    }
  }
  //account for any hits bonuses
  INQAttack.hits *= INQAttack.hitsMultiplier;
}
