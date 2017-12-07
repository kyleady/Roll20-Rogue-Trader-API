//damages every selected character according to the stored damage variables
function applyDamage (matches,msg){
  //get the attack details
  //quit if one of the details was not found
  if(INQAttack_old.getAttack() == undefined){return;}
  //apply the damage to every selected character
  eachCharacter(msg, function(character, graphic){
    //record the target
    INQAttack_old.character = character;
    //allow targets to use temporary variables from the graphic
    INQAttack_old.graphic = graphic;

    //record the target type
    INQAttack_old.targetType = characterType(character);

    //FUTURE WORK: determine if the target is wearing Primitive Armour
    //This isn't a priority as I have never encountered an enemy with Primitive
    //Armour

    //reset the damage
    var damage = Number(INQAttack_old.Dam.get("current"));
    log("damage: " + damage)

    //be sure the damage type matches the targetType
    if(!INQAttack_old.appropriateDamageType()){return;}

    //reduce the damage by the target's Armour
    damage = INQAttack_old.applyArmour(damage);

    //reduce the damage by the target's Toughness Bonus
    damage = INQAttack_old.applyToughness(damage);

    //a capital H in bar2 alerts the system that this graphic is a horde
    if(graphic.get("bar2_value") == "H"){
      damage = INQAttack_old.hordeDamage(damage);
      log('horde damage: ' + damage)
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
    remainingWounds = INQAttack_old.calcCrit(remainingWounds);

    //record the damage
    graphic.set("bar3_value", remainingWounds);
    if(damage > 0){
      damageFx(graphic, attributeValue('DamageType'));
    }

    //Reroll Location after each hit
    if(INQAttack_old.targetType == "character"){
      saveHitLocation(randomInteger(100));
    } else if (INQAttack_old.targetType == 'starship') {
      var population = graphic.get('bar1_value');
      var populationDef = attributeValue('Armour_Population', {graphicid: INQAttack_old.graphic.id, alert: false}) || 0;
      var populationDamage = damage - populationDef;
      if(populationDamage < 0) populationDamage = 0;
      population -= populationDamage;
      if(population < 0) population = 0;
      graphic.set('bar1_value', population);

      var morale = graphic.get('bar2_value');
      var moraleDef = attributeValue('Armour_Morale', {graphicid: INQAttack_old.graphic.id, alert: false}) || 0;
      var moraleDamage = damage - moraleDef;
      if(moraleDamage < 0) moraleDamage = 0;
      morale -= moraleDamage;
      if(morale < 0) morale = 0;
      graphic.set('bar2_value', morale);
    }

    //report an exact amount to the gm
    whisper(graphic.get("name") + " took " + damage + " damage.");
    //report an estimate to everyone
    announce(graphic.get("name") + ": [[" +  Math.round(damage * 100 / graphic.get("bar3_max")) + "]]% lost.");
  });
  //reset starship damage
  //starship damage is a running tally and needs to be reset when used
  if (INQAttack_old.DamType.get("current").toUpperCase() == "S") INQAttack_old.Dam.set("current", 0);
}

//waits until CentralInput has been initialized
on("ready",function(){
  //Lets the gm apply the saved damage to multiple characters
  CentralInput.addCMD(/^!\s*(?:dam(?:age)?|attack)\s*$/i,applyDamage);
});
