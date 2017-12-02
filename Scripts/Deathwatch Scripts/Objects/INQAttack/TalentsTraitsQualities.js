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
    INQAttack.ammoMultiplier *= 2;
    INQAttack.hitsMultiplier *= 2;
  }
}

//blast weapons multiply the horde damage by a given number
INQAttack.accountForBlast = function(){
  var blast = INQAttack.inqweapon.has("Blast");
  if(blast){
    //find the proven value
    _.each(blast, function(value){
      if(Number(value.Name)){
        INQAttack.hordeDamageMultiplier *= Number(value.Name);
      }
    });
  }
}

//spray weapons multiply the horde damage by (Range/4) + D5
//spray weapons do not roll to hit
INQAttack.accountForSpray = function(){
  if(INQAttack.inqweapon.has("Spray")){
    INQAttack.hordeDamageMultiplier *= Math.ceil(INQAttack.inqweapon.Range/4) + randomInteger(5);
    if(INQAttack.inqweapon.Class != "Psychic"){
      INQAttack.autoHit = true;
    }
  }
}

//devastating weapons add to the total horde damage
INQAttack.accountForDevastating = function(){
  var devastating = INQAttack.inqweapon.has("Devastating");
  if(devastating){
    //find the proven value
    _.each(devastating, function(value){
      if(Number(value.Name)){
        INQAttack.hordeDamage += Number(value.Name);
      }
    });
  }
}

//Twin-linked weapons have +20 to hit
//Twin-linked weapons can hit twice as much
//Twin-linked, single shots can hit twice if they roll 2+ successes
INQAttack.accountForTwinLinked = function(){
  if(INQAttack.inqweapon.has("Twin-linked")){
    INQAttack.toHit += 20;
    INQAttack.ammoMultiplier *= 2;
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

//Lance Weapons multiply their Pen by their to Hit Successes + 1
INQAttack.accountForLance = function(){
  if(INQAttack.inqweapon.has("Lance")){
    INQAttack.penSuccessesMultiplier = 1;
  }
}

//Razorsharp weapons double their pen if they earn two or more successes
INQAttack.accountForRazorSharp = function(){
  if(INQAttack.inqweapon.has("Razor Sharp")){
    INQAttack.penDoubleAt = 2;
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
INQAttack.accountForMaximal = function(){
  if(INQAttack.inqweapon.has("Use Maximal")){
    INQAttack.ammoMultiplier *= 3;
    INQAttack.inqweapon.Range       += Math.round(INQAttack.inqweapon.Range / 3);
    INQAttack.inqweapon.DiceNumber  += Math.round(INQAttack.inqweapon.DiceNumber / 2);
    INQAttack.inqweapon.DamageBase  += Math.round(INQAttack.inqweapon.DamageBase / 4);
    INQAttack.inqweapon.Penetration += Math.round(INQAttack.inqweapon.Penetration / 5);
    var recharge = new INQLink("Recharge");
    INQAttack.inqweapon.Special.push(recharge);
    //remove the useMaximal special rule from the displayed abilities
    var maximal = -1;
    for(var i = 0; i < INQAttack.inqweapon.Special.length; i++){
      if(INQAttack.inqweapon.Special[i].Name == "Use Maximal"){
        INQAttack.inqweapon.Special.splice(i, 1);
        i--
      } else if(INQAttack.inqweapon.Special[i].Name == "Blast"){
        for(var j = 0; j < INQAttack.inqweapon.Special[i].Groups.length; j++){
          if(Number(INQAttack.inqweapon.Special[i].Groups[j])){
            INQAttack.inqweapon.Special[i].Groups[j] = Number(INQAttack.inqweapon.Special[i].Groups[j]);
            INQAttack.inqweapon.Special[i].Groups[j] += Math.round(INQAttack.inqweapon.Special[i].Groups[j] / 2);
          }
        }
      }
    }
  } else {
    //remove the maximal special rule from the displayed abilities
    var maximal = -1;
    for(var i = 0; i < INQAttack.inqweapon.Special.length; i++){
      if(INQAttack.inqweapon.Special[i].Name == "Maximal"){
        INQAttack.inqweapon.Special.splice(i, 1);
        i--
      }
    }
  }
}

INQAttack.accountForHordeDmg = function(){
  var hordeDmg = INQAttack.inqweapon.has("HordeDmg");
  if(hordeDmg){
    //find the proven value
    _.each(hordeDmg, function(value){
      if(Number(value.Name)){
        INQAttack.hordeDamageMultiplier += Number(value.Name);
      }
    });
  }
}

//special ammunition will explicitly note stat modifications
//apply damage modifications
INQAttack.accountForDamage = function(){
  var dam = INQAttack.inqweapon.has("Dam") || [];
  var damage = INQAttack.inqweapon.has("Damage") || [];
  dam = dam.concat(damage);
  _.each(dam, function(value){
    if(/^\s*(|\+|-)\s*\d+\s*$/.test(value.Name)){
      INQAttack.inqweapon.DamageBase += Number(value.Name);
    }
  });
}

//special ammunition will explicitly note stat modifications
//apply penetration modifications
INQAttack.accountForPen = function(){
  var pen = INQAttack.inqweapon.has("Pen") || [];
  var penetration = INQAttack.inqweapon.has("Penetration") || [];
  pen = pen.concat(penetration);
  _.each(pen, function(value){
    if(/^\s*(|\+|-)\s*\d+\s*$/.test(value.Name)){
      INQAttack.inqweapon.Penetration += Number(value.Name);
    } else if(/^\s*=\s*\d+\s*$/.test(value.Name)){
      INQAttack.inqweapon.Penetration = Number(value.Name.replace("=", ""));
    }
  });
}

//special ammunition will explicitly note stat modifications
//apply damage TYPE modifications
INQAttack.accountForType = function(){
  var type = INQAttack.inqweapon.has("DamageType");
  if(type){
    _.each(type, function(value){
      INQAttack.inqweapon.DamageType = new INQLink(value.Name.replace('=',''));
    });
  }
}
