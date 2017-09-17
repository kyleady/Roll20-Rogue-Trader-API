INQAttack = INQAttack || {};
//reduce the attack's damage by the armour of the target
INQAttack.applyArmour = function(damage){

  //find the hit location
  var hitLocation = getHitLocation(INQAttack.TensLoc.get("current"), INQAttack.OnesLoc.get("current"), INQAttack.targetType);
  log("Hit Location: " + hitLocation)
  //get the armor of the target
  var armour = attributeValue("Armour_" + hitLocation, {characterid: INQAttack.character.id, graphicid: INQAttack.graphic.id});
  log("Armour: " + armour)

  //turn armour into a valid number
  if(!armour){
    armour = 0;
  } else {
    armour = Number(armour);
  }

  //is the attack primitive?
  if(Number(INQAttack.Prim.get("current")) > 0){
    log("Primitive Attack")
    //the armour is twice as protective against primitive attacks
    armour *= 2;
  }

  //is the armour primitive?
  if(INQAttack.primArmour){
    log("Primitive Armour")
    //the primitive armour is half as effective
    armour /= 2;
  }

  //round the armour
  armour = Math.round(armour);

  //is the target a spaceship?
  if(INQAttack.targetType == "starship"){
    //starship weapons either have no penetration, or infinite penetration
    if(Number(INQAttack.Pen.get("current")) > 0){
      armour = 0;
    }
  }else {
    //all other targets treat penetration normally
    log("Penetration: " + INQAttack.Pen.get("current"))
    armour -= INQAttack.Pen.get("current");
    //be sure the penetration doesn't overshoot the armour
    if(armour < 0){
      armour = 0;
    }
    log("Armour after Pen: " + armour)
  }

  //apply the armour to the damage
  damage -= armour;

  //be sure the damage isn't negative
  if(damage < 0){
    damage = 0;
  }

  log("Damage after Armour: " + damage)

  //report the reduced damage
  return damage;
}
