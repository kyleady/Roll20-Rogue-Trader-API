INQAttack_old = INQAttack_old || {};
//reduce the attack's damage by the armour of the target
INQAttack_old.applyArmour = function(damage){

  //find the hit location
  var hitLocation = getHitLocation(INQAttack_old.TensLoc.get("current"), INQAttack_old.OnesLoc.get("current"), INQAttack_old.targetType);
  log("Hit Location: " + hitLocation)
  //get the armor of the target
  var armour = attributeValue("Armour_" + hitLocation, {characterid: INQAttack_old.character.id, graphicid: INQAttack_old.graphic.id});
  log("Armour: " + armour)

  //turn armour into a valid number
  if(!armour){
    armour = 0;
  } else {
    armour = Number(armour);
  }

  //is the attack primitive?
  if(Number(INQAttack_old.Prim.get("current")) > 0){
    log("Primitive Attack")
    //the armour is twice as protective against primitive attacks
    armour *= 2;
  }

  //is the armour primitive?
  if(INQAttack_old.primArmour){
    log("Primitive Armour")
    //the primitive armour is half as effective
    armour /= 2;
  }

  //round the armour
  armour = Math.round(armour);

  //is the target a spaceship?
  if(INQAttack_old.targetType == "starship"){
    //starship weapons either have no penetration, or infinite penetration
    if(Number(INQAttack_old.Pen.get("current")) > 0){
      armour = 0;
    }
  }else {
    //all other targets treat penetration normally
    log("Penetration: " + INQAttack_old.Pen.get("current"))
    armour -= INQAttack_old.Pen.get("current");
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
