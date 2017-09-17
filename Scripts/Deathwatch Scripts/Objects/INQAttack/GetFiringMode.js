INQAttack = INQAttack || {};
//use the players rate of fire to determine what mode the weapn is firing on
//add in all the respective bonuses for that mode
INQAttack.getFiringMode = function(){
  //if the RoF was undefined, find the lowest available setting to fire on
  _.each(["Single", "Semi", "Full"], function(RoF){
    if(INQAttack.options.RoF == undefined
    && INQAttack.inqweapon[RoF]){
      INQAttack.options.RoF = RoF;
      if(RoF != "Single"){
        INQAttack.options.RoF += "(" + INQAttack.inqweapon[RoF] + ")";
      }
    }
  });
  //if nothing was valid, go for single
  if(INQAttack.options.RoF == undefined){
    INQAttack.options.RoF = "Single";
  }

  //add in any modifiers for the RoF
  if(/semi/i.test(INQAttack.options.RoF)){
    INQAttack.toHit += 0;
    INQAttack.maxHits = INQAttack.inqweapon.Semi;
    INQAttack.mode = "Semi";
  } else if(/swift/i.test(INQAttack.options.RoF)){
    INQAttack.toHit += 0;
    INQAttack.maxHits = Math.max(2, Math.round(INQAttack.inqcharacter.bonus("WS")/3));
    INQAttack.mode = "Semi";
  } else if(/full/i.test(INQAttack.options.RoF)){
    if(INQAttack.inqweapon.Class != "Psychic"){
      INQAttack.toHit += -10;
    }
    INQAttack.maxHits = INQAttack.inqweapon.Full
    INQAttack.mode = "Full";
  } else if(/lightning/i.test(INQAttack.options.RoF)){
    if(INQAttack.inqweapon.Class != "Psychic"){
      INQAttack.toHit += -10;
    }
    INQAttack.maxHits = Math.max(3, Math.round(INQAttack.inqcharacter.bonus("WS")/2));
    INQAttack.mode = "Full";
  } else if(/called/i.test(INQAttack.options.RoF)){
    if(INQAttack.inqweapon.Class != "Psychic"){
      INQAttack.toHit += -20;
    }
    INQAttack.maxHits = 1;
    INQAttack.mode = "Single";
  } else if(/all\s*out/i.test(INQAttack.options.RoF)){
    if(INQAttack.inqweapon.Class != "Psychic"){
      INQAttack.toHit += 30;
    }
    INQAttack.maxHits = 1;
    INQAttack.mode = "Single";
  } else { //if(/single/i.test(INQAttack.options.RoF))
    if(INQAttack.inqweapon.Class != "Psychic"){
      INQAttack.toHit += 10;
    }
    INQAttack.maxHits = 1;
    INQAttack.mode = "Single";
  }

  INQAttack.shotsFired = INQAttack.maxHits;
}
