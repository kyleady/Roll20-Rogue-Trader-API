INQAttack_old = INQAttack_old || {};
//use the players rate of fire to determine what mode the weapn is firing on
//add in all the respective bonuses for that mode
INQAttack_old.getFiringMode = function(){
  //if the RoF was undefined, find the lowest available setting to fire on
  _.each(["Single", "Semi", "Full"], function(RoF){
    if(INQAttack_old.options.RoF == undefined
    && INQAttack_old.inqweapon[RoF]){
      INQAttack_old.options.RoF = RoF;
      if(RoF != "Single"){
        INQAttack_old.options.RoF += "(" + INQAttack_old.inqweapon[RoF] + ")";
      }
    }
  });
  //if nothing was valid, go for single
  if(INQAttack_old.options.RoF == undefined){
    INQAttack_old.options.RoF = "Single";
  }

  //add in any modifiers for the RoF
  if(/semi/i.test(INQAttack_old.options.RoF)){
    INQAttack_old.toHit += 0;
    INQAttack_old.maxHits = INQAttack_old.inqweapon.Semi;
    INQAttack_old.mode = "Semi";
  } else if(/swift/i.test(INQAttack_old.options.RoF)){
    INQAttack_old.toHit += 0;
    INQAttack_old.maxHits = Math.max(2, Math.round(INQAttack_old.inqcharacter.bonus("WS")/3));
    INQAttack_old.mode = "Semi";
  } else if(/full/i.test(INQAttack_old.options.RoF)){
    if(INQAttack_old.inqweapon.Class != "Psychic"){
      INQAttack_old.toHit += -10;
    }
    INQAttack_old.maxHits = INQAttack_old.inqweapon.Full
    INQAttack_old.mode = "Full";
  } else if(/lightning/i.test(INQAttack_old.options.RoF)){
    if(INQAttack_old.inqweapon.Class != "Psychic"){
      INQAttack_old.toHit += -10;
    }
    INQAttack_old.maxHits = Math.max(3, Math.round(INQAttack_old.inqcharacter.bonus("WS")/2));
    INQAttack_old.mode = "Full";
  } else if(/called/i.test(INQAttack_old.options.RoF)){
    if(INQAttack_old.inqweapon.Class != "Psychic"){
      INQAttack_old.toHit += -20;
    }
    INQAttack_old.maxHits = 1;
    INQAttack_old.mode = "Single";
  } else if(/all\s*out/i.test(INQAttack_old.options.RoF)){
    if(INQAttack_old.inqweapon.Class != "Psychic"){
      INQAttack_old.toHit += 30;
    }
    INQAttack_old.maxHits = 1;
    INQAttack_old.mode = "Single";
  } else { //if(/single/i.test(INQAttack_old.options.RoF))
    if(INQAttack_old.inqweapon.Class != "Psychic"){
      INQAttack_old.toHit += 10;
    }
    INQAttack_old.maxHits = 1;
    INQAttack_old.mode = "Single";
  }

  INQAttack_old.shotsFired = INQAttack_old.maxHits;
}
