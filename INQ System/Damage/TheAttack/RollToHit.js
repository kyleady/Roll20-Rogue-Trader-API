INQAttack = INQAttack || {};

INQAttack.rollToHit = function(){
  //calculate the base roll to hit
  INQAttack.calcToHit();
  //determine the weapon's firing mode
  INQAttack.getFiringMode();
  //make the roll
  INQAttack.d100 = randomInteger(100);
  //determine the number of hits based on the roll to hit and firing mode
  INQAttack.calcHits();
  //show the roll to hit
  INQAttack.Reports.toHit = "&{template:default} ";
  INQAttack.Reports.toHit += "{{name=<strong>" + INQAttack.stat +  "</strong>: " + INQAttack.inqcharacter.Name + "}} ";
  INQAttack.Reports.toHit += "{{Successes=[[(" + INQAttack.toHit.toString() + " - (" + INQAttack.d100.toString() + ") )/10]]}} ";
  INQAttack.Reports.toHit += "{{Unnatural= [[" + INQAttack.unnaturalSuccesses.toString() + "]]}} ";
  INQAttack.Reports.toHit += "{{Hits= [[" + INQAttack.hits.toString() + "]]}}"
}

//use the players rate of fire to determine what mode the weapn is firing on
//add in all the respective bonuses for that mode
INQAttack.getFiringMode = function(){
  //if the RoF was undefined, find the lowest available setting to fire on
  if(INQAttack.options.RoF == undefined){
    _.each(["Single", "Semi", "Full"], function(RoF){
      if(INQAttack.inqweapon[RoF]){
        INQAttack.options.RoF = RoF;
      }
    });
    //if nothing was valid, go for single
    if(INQAttack.options.RoF == undefined){
      INQAttack.options.RoF = "Single";
    }
  }
  //add in any modifiers for the RoF
  switch(INQAttack.options.RoF.toLowerCase()){
    case "semi":
      INQAttack.toHit += 0;
      INQAttack.maxHits = INQAttack.inqweapon.Semi;
      INQAttack.mode = "Semi";
      break;
    case "swift":
      INQAttack.toHit += 0;
      INQAttack.maxHits = Math.max(2, Math.round(INQAttack.inqweapon.WS/3));
      INQAttack.mode = "Semi";
      break;
    case "full":
      INQAttack.toHit += -10;
      INQAttack.maxHits = INQAttack.inqweapon.Full
      INQAttack.mode = "Full";
      break;
    case "lightning":
      INQAttack.toHit += -10;
      INQAttack.maxHits = Math.max(3, Math.round(INQAttack.inqweapon.WS/2));
      INQAttack.mode = "Full";
      break;
    case "called":
      INQAttack.toHit += -20;
      INQAttack.maxHits = 1;
      INQAttack.mode = "Single";
      break;
    default:
      INQAttack.toHit += 10;
      INQAttack.maxHits = 1;
      INQAttack.mode = "Single";
      break;
  }
}

INQAttack.calcToHit = function(){
  //calculate the roll to hit
  INQAttack.toHit = 0;
  INQAttack.unnaturalSuccesses = 0;
  //get the stat used to hit
  INQAttack.stat = "BS"
  if(INQAttack.inqweapon.Class == "Melee"){
    INQAttack.stat = "WS";
  } else if(INQAttack.inqweapon.Class == "Psychic"){
    INQAttack.stat = "Wp";
  }
  //use the stat
  INQAttack.toHit += Number(INQAttack.inqcharacter.Attributes[INQAttack.stat]);
  INQAttack.unnaturalSuccesses += Math.ceil(Number(INQAttack.inqcharacter.Attributes["Unnatural " + INQAttack.stat])/2);
  if(INQAttack.options.Modifier){
    INQAttack.toHit += INQAttack.options.Modifier;
  }
}
//calculate the number of hits based on the
INQAttack.calcHits = function(){
  //determine the successes based on the roll
  INQAttack.successes = Math.ceil((INQAttack.toHit-INQAttack.d100)/10)+INQAttack.unnaturalSuccesses;
  //calculate the number of hits based on the firing mode
  INQAttack.hits = 0;
  if(INQAttack.toHit - INQAttack.d100 >= 0){
    switch(INQAttack.mode){
      case "Single":
        INQAttack.hits = 1;
      break;
      case "Semi":
        INQAttack.hits = 1+Math.floor(INQAttack.successes/2);
      break;
      case "Full":
        INQAttack.hits = 1+INQAttack.successes
      break;
    }
    //be sure the number of hits is not over the max (and that there is a max)
    if(INQAttack.maxHits > 0 && INQAttack.hits > INQAttack.maxHits){
      INQAttack.hits = INQAttack.maxHits;
    }
  }
}
