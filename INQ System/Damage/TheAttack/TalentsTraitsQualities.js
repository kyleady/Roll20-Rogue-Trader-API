//be sure the inqattack object exists before we start working with it
INQAttack = INQAttack || {};

//accurate increases the damage of the weapon by D10 for each success rolled, up
//to 2. It will not decrease the damage if there are failures.
//accurate only works when the weapon is making a single shot
INQAttack.accountForAccurate = function(){
  if(INQAttack.mode == "Single"
  && INQAttack.inqweapon.has("Accurate")){
    INQAttack.inqweapon.DiceNumber += Math.max(Math.min(INQAttack.successes,2),0);
  }
}

//proven rerolls damage < the given number
//roll20 treats < as <= so the value must be decreased by one
INQAttack.accountForProven = function(){
  var proven = INQAttack.inqweapon.has("Proven");
  if(proven){
    //by default, reroll all 1's
    INQAttack.inqweapon.rerollBelow = 1;
    //find the proven value
    _.each(proven, function(value){
      if(Number(value.Name)){
        INQAttack.inqweapon.rerollBelow = Number(value.Name)-1;
      }
    });
  }
}

//tearing rolls one extra damage die, discarding the lowest
//flesh render rolls another die beyond that, discarding the next lowest
INQAttack.accountForTearingFleshRender = function(){
  if(INQAttack.inqweapon.has("Tearing")){
    INQAttack.inqweapon.keepDice = INQAttack.inqweapon.DiceNumber;
    INQAttack.inqweapon.DiceNumber++;
    if(INQAttack.inqcharacter.has("Flesh Render", "Talents")){
      INQAttack.inqweapon.DiceNumber++;
    }
  }
}

//crushing blow give +2 damage to melee attacks
//mighty shot gives +2 damage to ranged attacks
INQAttack.accountForCrushingBlowMightyShot = function(){
  if(INQAttack.inqweapon.Class == "Melee"
  && INQAttack.inqcharacter.has("Crushing Blow", "Talents")){
    INQAttack.inqweapon.DamageBase += 2;
  } else if(INQAttack.inqweapon.Class != "Psychic"
  && INQAttack.inqcharacter.has("Mighty Shot", "Talents")){
    INQAttack.inqweapon.DamageBase += 2;
  }
}

//force weapons add the user's Psy Rating to their Damage and Penetration
INQAttack.accountForForce = function(){
  if(INQAttack.inqweapon.has("Force")){
    INQAttack.inqweapon.DamageBase  += INQAttack.inqcharacter.Attributes.PR;
    INQAttack.inqweapon.Penetration += INQAttack.inqcharacter.Attributes.PR;
  }
}

//storm weapons double the max hits and double the hits per success
//however, they also double the ammo expended
INQAttack.accountForStorm = function(){
  if(INQAttack.inqweapon.has("Storm")){
    INQAttack.shotsMultiplier *= 2;
    INQAttack.hitsMultiplier *= 2;
  }
}

//blast weapons multiply the number of hits by the given number
INQAttack.accountForBlast = function(){
  var blast = INQAttack.inqweapon.has("Blast");
  if(blast){
    //find the proven value
    _.each(blast, function(value){
      if(Number(value.Name)){
        INQAttack.hitsMultiplier *= Number(value.Name);
      }
    });
  }
}

//spray weapons multiply the number of hits by (Range/4) + D5
//spray weapons do not roll to hit
INQAttack.accountForSpray = function(){
  if(INQAttack.inqweapon.has("Spray")){
    INQAttack.hitsMultiplier *= Math.ceil(INQAttack.inqweapon.Range/4) + randomInteger(5);
    if(INQAttack.inqweapon.Class != "Psychic"){
      INQAttack.autoHit = true;
    }
  }
}

//Twin-linked weapons have +20 to hit
//Twin-linked weapons can hit twice as much
//Twin-linked, single shots can hit twice if they roll 2+ successes
INQAttack.accountForTwinLinked = function(){
  if(INQAttack.inqweapon.has("Twin-linked")){
    INQAttack.toHit += 20;
    INQAttack.shotsMultiplier *= 2;
    INQAttack.maxHitsMultiplier *= 2;
  }
}

//Crushing blow + All Out Attack => Pen += StrB/2
//Crushing blow + All Out Attack => Concussive(2)
INQAttack.accountForHammerBlow = function(){
  if(INQAttack.inqcharacter == undefined){return;}
  if(/all\s*out/i.test(INQAttack.options.RoF)
  && INQAttack.inqcharacter.has("Hammer Blow", "Talents")){
    INQAttack.inqweapon.Penetration += Math.ceil(INQAttack.inqcharacter.bonus("S")/2);
    var concussive2 = new INQLink("Concussive(2)");
    INQAttack.inqweapon.Special.push(concussive2);
  }
}

//special ammunition will explicitly note stat modifications
//apply damage modifications
INQAttack.accountForDamage = function(){
  var damage = INQAttack.inqweapon.has("Damage");
  if(damage){
    _.each(damage, function(value){
      if(/^\s*(|\+|-)\s*\d+\s*$/.test(value.Name)){
        INQAttack.inqweapon.DamageBase += Number(value.Name);
      }
    });
  }
}

//special ammunition will explicitly note stat modifications
//apply penetration modifications
INQAttack.accountForPen = function(){
  var pen = INQAttack.inqweapon.has("Pen");
  if(pen){
    _.each(pen, function(value){
      if(/^\s*(|\+|-)\s*\d+\s*$/.test(value.Name)){
        INQAttack.inqweapon.Penetration += Number(value.Name);
      } else if(/^\s*=\s*\d+\s*$/.test(value.Name)){
        INQAttack.inqweapon.Penetration = Number(value.Name.replace("=", ""));
      }
    });
  }
}

//special ammunition will explicitly note stat modifications
//apply damage TYPE modifications
INQAttack.accountForType = function(){
  var type = INQAttack.inqweapon.has("Type");
  if(type){
    _.each(type, function(value){
      INQAttack.inqweapon.DamageType = new INQLink(value.Name);
    });
  }
}
