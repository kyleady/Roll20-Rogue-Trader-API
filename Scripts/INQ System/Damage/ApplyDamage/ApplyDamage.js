//define the attack object
INQAttack = {};

//get the type of character.
//currently supported: character, vehicle, starship
function characterType(character){
  //if the target has Structural Integrity, they are a vehicle
  if(findObjs({_type: "attribute", _characterid: character.id, name: "Structural Integrity"}).length > 0){
    return "vehicle";
  //if the target has Hull, they are a starship
  } else if(findObjs({_type: "attribute", _characterid: character.id, name: "Hull"}).length > 0) {
    return "starship";
  //by default the character is assumed to be a normal character
  } else {
    return "character";
  }
}

//record the details of the attack into the object
INQAttack.getAttack = function(){
    //get the damage details obj
    var details = damDetails();

    //quit if one of the details was not found
    if(details == undefined){return;}

    //record the attack details for use elsewhere in the object
    INQAttack.DamType = details.DamType;
    INQAttack.Dam     = details.Dam;
    INQAttack.Pen     = details.Pen;
    INQAttack.Prim    = details.Prim;
    INQAttack.Fell    = details.Fell;
    INQAttack.Hits    = details.Hits;
    INQAttack.OnesLoc = details.OnesLoc;
    INQAttack.TensLoc = details.TensLoc;

    //return that reading the details was successful
    return true;
}

//warn the gm of any damage type that should not be applied to a character type
INQAttack.appropriateDamageType = function(){
  if(INQAttack.targetType == "starship" && INQAttack.DamType.get("current").toUpperCase() != "S"){
    whisper(INQAttack.graphic.get("name") + ": Using non-starship damage on a starship. Aborting. [Correct This](!damage type = s)");
    return false;
  } else if(INQAttack.targetType != "starship" && INQAttack.DamType.get("current").toUpperCase() == "S"){
    whisper(INQAttack.graphic.get("name") + ": Using starship damage on a non-starship. Aborting. [Correct This](!damage type = i)");
    return false;
  }
  //no warning to hand out
  return true;
}
//damages every selected character according to the stored damage variables
function applyDamage (matches,msg){
  //get the attack details
  //quit if one of the details was not found
  if(INQAttack.getAttack() == undefined){return;}
  //apply the damage to every selected character
  eachCharacter(msg,function(character, graphic){
    //record the target
    INQAttack.character = character;
    //allow targets to use temporary variables from the graphic
    INQAttack.graphic = graphic;

    //record the target type
    INQAttack.targetType = characterType(character);

    //FUTURE WORK: determine if the target is wearing Primitive Armour
    //This isn't a priority as I have never encountered an enemy with Primitive
    //Armour

    //reset the damage
    var damage = Number(INQAttack.Dam.get("current"));
    log("damage: " + damage)

    //be sure the damage type matches the targetType
    if(!INQAttack.appropriateDamageType()){return;}

    //reduce the damage by the target's Armour
    damage = INQAttack.applyArmour(damage);

    //reduce the damage by the target's Toughness Bonus
    damage = INQAttack.applyToughness(damage);

    //a capital H in bar2 alerts the system that this graphic is a horde
    if(graphic.get("bar2_value") == "H"){
      damage = INQAttack.hordeDamage(damage);
    }

    //be sure that the final result is a number
    damage = Number(damage);
    if(damage == undefined || damage == NaN){
      return whisper(graphic.get("name") + ": Damage undefined.");
    }

    //apply the damage to the graphic's bar3_value. If bar3 is linked to a
    //character sheet's wounds, the wounds will be immediately updated as well
    var remainingWounds = Number(graphic.get("bar3_value")) - damage;

    //report any crits
    remainingWounds = INQAttack.calcCrit(remainingWounds);

    //record the damage
    graphic.set("bar3_value", remainingWounds);
    if(damage > 0){
      damageFx(graphic, attributeValue("Damage Type"));
    }

    //Reroll Location after each hit
    if(INQAttack.targetType == "character"){
      saveHitLocation(randomInteger(100));
    } else if (INQAttack.targetType == 'starship') {
      var population = graphic.get('bar1_value');
      var populationDef = attributeValue('Armour_Population', {graphicid: INQAttack.graphic.id, alert: false}) || 0;
      var populationDamage = damage - populationDef;
      if(populationDamage < 0) populationDamage = 0;
      population -= populationDamage;
      if(population < 0) population = 0;
      graphic.set('bar1_value', population);

      var moral = graphic.get('bar2_value');
      var moralDef = attributeValue('Armour_Moral', {graphicid: INQAttack.graphic.id, alert: false}) || 0;
      var moralDamage = damage - moralDef;
      if(moralDamage < 0) moralDamage = 0;
      moral -= moralDamage;
      if(moral < 0) moral = 0;
      graphic.set('bar2_value', moral);
    }

    //report an exact amount to the gm
    whisper(graphic.get("name") + " took " + damage + " damage.");
    //report an estimate to everyone
    announce(graphic.get("name") + ": [[" +  Math.round(damage * 100 / graphic.get("bar3_max")) + "]]% lost.");
  });
  //reset starship damage
  //starship damage is a running tally and needs to be reset when used
  if(INQAttack.DamType.get("current").toUpperCase() == "S"){
    INQAttack.Dam.set("current",0);
    //damage can be recovered by setting the current to the maximum
  }
}

//waits until CentralInput has been initialized
on("ready",function(){
  //Lets the gm apply the saved damage to multiple characters
  CentralInput.addCMD(/^!\s*(?:dam(?:age)?|attack)\s*$/i,applyDamage);
});
