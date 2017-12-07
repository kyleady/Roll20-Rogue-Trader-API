//be sure the inqattack object exists before we start working with it
INQAttack_old = INQAttack_old || {};

//accurate increases the damage of the weapon by D10 for each success rolled, up
//to 2. It will not decrease the damage if there are failures.
//accurate only works when the weapon is making a single shot
INQAttack_old.accountForAccurate = function(){
  if(INQAttack_old.mode == "Single"
  && INQAttack_old.inqweapon.has("Accurate")){
    INQAttack_old.inqweapon.DiceNumber += Math.max(Math.min(INQAttack_old.successes,2),0);
  }
}

//proven rerolls damage < the given number
//roll20 treats < as <= so the value must be decreased by one
INQAttack_old.accountForProven = function(){
  var proven = INQAttack_old.inqweapon.has("Proven");
  if(proven){
    //by default, reroll all 1's
    INQAttack_old.inqweapon.rerollBelow = 1;
    //find the proven value
    _.each(proven, function(value){
      if(Number(value.Name)){
        INQAttack_old.inqweapon.rerollBelow = Number(value.Name)-1;
      }
    });
  }
}

//tearing rolls one extra damage die, discarding the lowest
//flesh render rolls another die beyond that, discarding the next lowest
INQAttack_old.accountForTearingFleshRender = function(){
  if(INQAttack_old.inqweapon.has("Tearing")){
    INQAttack_old.inqweapon.keepDice = INQAttack_old.inqweapon.DiceNumber;
    INQAttack_old.inqweapon.DiceNumber++;
    if(INQAttack_old.inqcharacter.has("Flesh Render", "Talents")){
      INQAttack_old.inqweapon.DiceNumber++;
    }
  }
}

//crushing blow give +2 damage to melee attacks
//mighty shot gives +2 damage to ranged attacks
INQAttack_old.accountForCrushingBlowMightyShot = function(){
  if(INQAttack_old.inqweapon.Class == "Melee"
  && INQAttack_old.inqcharacter.has("Crushing Blow", "Talents")){
    INQAttack_old.inqweapon.DamageBase += 2;
  } else if(INQAttack_old.inqweapon.Class != "Psychic"
  && INQAttack_old.inqcharacter.has("Mighty Shot", "Talents")){
    INQAttack_old.inqweapon.DamageBase += 2;
  }
}

//force weapons add the user's Psy Rating to their Damage and Penetration
INQAttack_old.accountForForce = function(){
  if(INQAttack_old.inqweapon.has("Force")){
    INQAttack_old.inqweapon.DamageBase  += INQAttack_old.inqcharacter.Attributes.PR;
    INQAttack_old.inqweapon.Penetration += INQAttack_old.inqcharacter.Attributes.PR;
  }
}

//storm weapons double the max hits and double the hits per success
//however, they also double the ammo expended
INQAttack_old.accountForStorm = function(){
  if(INQAttack_old.inqweapon.has("Storm")){
    INQAttack_old.ammoMultiplier *= 2;
    INQAttack_old.hitsMultiplier *= 2;
  }
}

//blast weapons multiply the horde damage by a given number
INQAttack_old.accountForBlast = function(){
  var blast = INQAttack_old.inqweapon.has("Blast");
  if(blast){
    //find the proven value
    _.each(blast, function(value){
      if(Number(value.Name)){
        INQAttack_old.hordeDamageMultiplier *= Number(value.Name);
      }
    });
  }
}

//spray weapons multiply the horde damage by (Range/4) + D5
//spray weapons do not roll to hit
INQAttack_old.accountForSpray = function(){
  if(INQAttack_old.inqweapon.has("Spray")){
    INQAttack_old.hordeDamageMultiplier *= Math.ceil(INQAttack_old.inqweapon.Range/4) + randomInteger(5);
    if(INQAttack_old.inqweapon.Class != "Psychic"){
      INQAttack_old.autoHit = true;
    }
  }
}

//devastating weapons add to the total horde damage
INQAttack_old.accountForDevastating = function(){
  var devastating = INQAttack_old.inqweapon.has("Devastating");
  if(devastating){
    //find the proven value
    _.each(devastating, function(value){
      if(Number(value.Name)){
        INQAttack_old.hordeDamage += Number(value.Name);
      }
    });
  }
}

//Twin-linked weapons have +20 to hit
//Twin-linked weapons can hit twice as much
//Twin-linked, single shots can hit twice if they roll 2+ successes
INQAttack_old.accountForTwinLinked = function(){
  if(INQAttack_old.inqweapon.has("Twin-linked")){
    INQAttack_old.toHit += 20;
    INQAttack_old.ammoMultiplier *= 2;
    INQAttack_old.maxHitsMultiplier *= 2;
  }
}

//Crushing blow + All Out Attack => Pen += StrB/2
//Crushing blow + All Out Attack => Concussive(2)
INQAttack_old.accountForHammerBlow = function(){
  if(INQAttack_old.inqcharacter == undefined){return;}
  if(/all\s*out/i.test(INQAttack_old.options.RoF)
  && INQAttack_old.inqcharacter.has("Hammer Blow", "Talents")){
    INQAttack_old.inqweapon.Penetration += Math.ceil(INQAttack_old.inqcharacter.bonus("S")/2);
    var concussive2 = new INQLink("Concussive(2)");
    INQAttack_old.inqweapon.Special.push(concussive2);
  }
}

//Lance Weapons multiply their Pen by their to Hit Successes + 1
INQAttack_old.accountForLance = function(){
  if(INQAttack_old.inqweapon.has("Lance")){
    INQAttack_old.penSuccessesMultiplier = 1;
  }
}

//Razorsharp weapons double their pen if they earn two or more successes
INQAttack_old.accountForRazorSharp = function(){
  if(INQAttack_old.inqweapon.has("Razor Sharp")){
    INQAttack_old.penDoubleAt = 2;
  }
}

//Maximal Weapons can fire on Maximal
//uses 3x the ammo
//increases range by 1/3
//increases damage dice by 1/2
//increases base damage by 1/4
//increases penetration multiplier by 1/5
//increases blast quality by 1/2
//grants the recharge quality
INQAttack_old.accountForMaximal = function(){
  if(INQAttack_old.inqweapon.has("Use Maximal")){
    INQAttack_old.ammoMultiplier *= 3;
    INQAttack_old.inqweapon.Range       += Math.round(INQAttack_old.inqweapon.Range / 3);
    INQAttack_old.inqweapon.DiceNumber  += Math.round(INQAttack_old.inqweapon.DiceNumber / 2);
    INQAttack_old.inqweapon.DamageBase  += Math.round(INQAttack_old.inqweapon.DamageBase / 4);
    INQAttack_old.inqweapon.Penetration += Math.round(INQAttack_old.inqweapon.Penetration / 5);
    var recharge = new INQLink("Recharge");
    INQAttack_old.inqweapon.Special.push(recharge);
    //remove the useMaximal special rule from the displayed abilities
    var maximal = -1;
    for(var i = 0; i < INQAttack_old.inqweapon.Special.length; i++){
      if(INQAttack_old.inqweapon.Special[i].Name == "Use Maximal"){
        INQAttack_old.inqweapon.Special.splice(i, 1);
        i--
      } else if(INQAttack_old.inqweapon.Special[i].Name == "Blast"){
        for(var j = 0; j < INQAttack_old.inqweapon.Special[i].Groups.length; j++){
          if(Number(INQAttack_old.inqweapon.Special[i].Groups[j])){
            INQAttack_old.inqweapon.Special[i].Groups[j] = Number(INQAttack_old.inqweapon.Special[i].Groups[j]);
            INQAttack_old.inqweapon.Special[i].Groups[j] += Math.round(INQAttack_old.inqweapon.Special[i].Groups[j] / 2);
          }
        }
      }
    }
  } else {
    //remove the maximal special rule from the displayed abilities
    var maximal = -1;
    for(var i = 0; i < INQAttack_old.inqweapon.Special.length; i++){
      if(INQAttack_old.inqweapon.Special[i].Name == "Maximal"){
        INQAttack_old.inqweapon.Special.splice(i, 1);
        i--
      }
    }
  }
}

INQAttack_old.accountForHordeDmg = function(){
  var hordeDmg = INQAttack_old.inqweapon.has("HordeDmg");
  if(hordeDmg){
    //find the proven value
    _.each(hordeDmg, function(value){
      if(Number(value.Name)){
        INQAttack_old.hordeDamageMultiplier += Number(value.Name);
      }
    });
  }
}

//special ammunition will explicitly note stat modifications
//apply damage modifications
INQAttack_old.accountForDamage = function(){
  var dam = INQAttack_old.inqweapon.has("Dam") || [];
  var damage = INQAttack_old.inqweapon.has("Damage") || [];
  dam = dam.concat(damage);
  _.each(dam, function(value){
    if(/^\s*(|\+|-)\s*\d+\s*$/.test(value.Name)){
      INQAttack_old.inqweapon.DamageBase += Number(value.Name);
    }
  });
}

//special ammunition will explicitly note stat modifications
//apply penetration modifications
INQAttack_old.accountForPen = function(){
  var pen = INQAttack_old.inqweapon.has("Pen") || [];
  var penetration = INQAttack_old.inqweapon.has("Penetration") || [];
  pen = pen.concat(penetration);
  _.each(pen, function(value){
    if(/^\s*(|\+|-)\s*\d+\s*$/.test(value.Name)){
      INQAttack_old.inqweapon.Penetration += Number(value.Name);
    } else if(/^\s*=\s*\d+\s*$/.test(value.Name)){
      INQAttack_old.inqweapon.Penetration = Number(value.Name.replace("=", ""));
    }
  });
}

//special ammunition will explicitly note stat modifications
//apply damage TYPE modifications
INQAttack_old.accountForType = function(){
  var type = INQAttack_old.inqweapon.has("DamageType");
  if(type){
    _.each(type, function(value){
      INQAttack_old.inqweapon.DamageType = new INQLink(value.Name.replace('=',''));
    });
  }
}
