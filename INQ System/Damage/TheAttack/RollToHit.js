INQAttack = INQAttack || {};

INQAttack.rollToHit = function(){
  //calculate the base roll to hit
  INQAttack.calcToHit();
  //determine the weapon's firing mode
  INQAttack.getFiringMode();
  //make the roll to hit
  INQAttack.d100 = randomInteger(100);
  //was there a crit?
  if(INQAttack.d100 == 100){
    INQAttack.Reports.Crit = "[Critical Failure!](!This Isn't Anything Yet)";
  } else if(INQAttack.d100 == 1) {
    INQAttack.Reports.Crit = "[Critical Success!](!This Isn't Anything Yet)";
  }
  //determine the number of hits based on the roll to hit and firing mode
  INQAttack.calcHits();
  //show the roll to hit
  INQAttack.Reports.toHit = "&{template:default} ";
  INQAttack.Reports.toHit += "{{name=<strong>" + INQAttack.stat +  "</strong>: " + INQAttack.inqcharacter.Name + "}} ";
  if(INQAttack.inqweapon.FocusSkill){
    INQAttack.Reports.toHit += "{{Skill=" + GetLink(INQAttack.inqweapon.FocusSkill) + "}} ";
  }
  INQAttack.Reports.toHit += "{{Successes=[[(" + INQAttack.toHit.toString() + " - (" + INQAttack.d100.toString() + ") )/10]]}} ";
  INQAttack.Reports.toHit += "{{Unnatural= [[" + INQAttack.unnaturalSuccesses.toString() + "]]}} ";
  INQAttack.Reports.toHit += "{{Hits= [[" + INQAttack.hits.toString() + "]]}}";
}

//use the players rate of fire to determine what mode the weapn is firing on
//add in all the respective bonuses for that mode
INQAttack.getFiringMode = function(){
  //if the RoF was undefined, find the lowest available setting to fire on
  _.each(["Single", "Semi", "Full"], function(RoF){
    if(INQAttack.options.RoF == undefined
    && INQAttack.inqweapon[RoF]){
      INQAttack.options.RoF = RoF;
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
  } else { //if(/single/i.test(INQAttack.options.RoF))
    if(INQAttack.inqweapon.Class != "Psychic"){
      INQAttack.toHit += 10;
    }
    INQAttack.maxHits = 1;
    INQAttack.mode = "Single";
  }
}

INQAttack.skillBonus = function(){
  var bonus = 0;
  //is there a skill to search for?
  if(INQAttack.inqweapon.FocusSkill){
    //check the character for the skill
    var skill = INQAttack.inqcharacter.has(INQAttack.inqweapon.FocusSkill, "Skills");
    if(!skill){
      bonus = -20;
    } else if(skill.length > 0){
      //did the user provide a subgroup?
      if(INQAttack.inqweapon.FocusSkillGroup){
        //does the character have the given subgroup?
        var regex = "^\\s*";
        regex += INQAttack.inqweapon.FocusSkillGroup.replace(/(-|\s+)/g,"(-|\\s+)");
        regex += "\\s*$";
        var re = RegExp(regex, "i");
        var matchingSubgroup = false;
        var subgroupModifier = -20;
        _.each(skill, function(subgroup){
          if(re.test(subgroup.Name) || /^\s*all\s*$/i.test(subgroup.Name)){
            //overwrite the subgroup's modifier if it is better
            if(subgroup.Bonus > subgroupModifier){
              subgroupModifier = subgroup.Bonus;
            }
          }
        });
        //if the character does not have a matching subgroup, give them a flat -20 modifier
        bonus = subgroupModifier;
      } else {
        whisper("Psychic Power did not provide a skill group.");
        bonus = -20;
      }
    //the skill was found, and there is no need to match subgroups
    } else {
      //the skill was not found
      bonus = skill.Bonus;
    }
  }
  return bonus;
}

INQAttack.calcToHit = function(){
  //get the stat used to hit
  INQAttack.stat = "BS"
  if(INQAttack.inqweapon.Class == "Melee"){
    INQAttack.stat = "WS";
  } else if(INQAttack.inqweapon.Class == "Psychic"){
    //not all psychic attacks use Willpower
    INQAttack.stat = INQAttack.inqweapon.FocusStat;
    //some psychic attacks are based off of a skill
    INQAttack.toHit += INQAttack.skillBonus();
    //some psychic attacks have a base modifier
    INQAttack.toHit += INQAttack.inqweapon.FocusModifier;

    //psychic attacks get a bonus for the psy rating it was cast at
    INQAttack.toHit += INQAttack.PsyRating * 5;
  }
  //use the stat
  INQAttack.toHit += Number(INQAttack.inqcharacter.Attributes[INQAttack.stat]);
  INQAttack.unnaturalSuccesses += Math.ceil(Number(INQAttack.inqcharacter.Attributes["Unnatural " + INQAttack.stat])/2);
  if(INQAttack.options.Modifier && Number(INQAttack.options.Modifier)){
    INQAttack.toHit += Number(INQAttack.options.Modifier);
  }
}
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

//a list of all the special rules that affect the toHit calculations
INQAttack.accountForHitsSpecialRules = function(){
  INQAttack.accountForStorm();
  INQAttack.accountForBlast();
  INQAttack.accountForSpray();
  INQAttack.accountForTwinLinked();
}
