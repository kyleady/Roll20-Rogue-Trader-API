//get the armor of the target at the location where the attack hit
function getHitLocation(tensLoc, onesLoc, targetType){
  var hitLocation = "";
  targetType = targetType || "character";
  switch(targetType){
    case "character":
      switch(onesLoc){
        case "0": case "10":
          hitLocation = "H"
        break;
        case "9": case "8":
          if(tensLoc % 2 == 0){
            hitLocation = "RA";
          } else {
            hitLocation = "LA";
          }
        break;
        case "3": case "2": case "1":
          if(tensLoc % 2 == 0){
            hitLocation = "RL";
          } else {
            hitLocation = "LL";
          }
        break;
        default: //case "4": case "5": case "6": case "7":
          hitLocation = "B";
        break;
      }
    break;
    case "vehicle":
      switch(tensLoc){
        case "-1":
          hitLocation = "S"
        break;
        case "-2":
          hitLocation = "R"
        break;
        default: //case "0":
          hitLocation = "F";
        break;
      }
    break;
    case "starship":
      switch(tensLoc){
        case "-1":
          hitLocation = "S"
        break;
        case "-2":
          hitLocation = "P"
        break;
        case "-3":
          hitLocation = "A"
        break;
        default: //case "0":
          hitLocation = "F";
        break;
      }
    break;
  }

  //return the location name
  return hitLocation;
}

//wait until the INQAttack object is defined
on("ready",function(){
  //reduce the attack's damage by the armour of the target
  INQAttack.applyArmour = function(damage){
    //get the armor of the target
    var armour = 0;

    //find the hit location
    var hitLocation = getHitLocation(this.TensLoc.get("current"), this.OnesLoc.get("current"), this.targetType);
    //find the armour at this location
    var ArmourObj = findObjs({_type: "attribute", _characterid: this.character.id, name: "Armour_" + hitLocation })[0];
    if(ArmourObj == undefined){
      whisper(this.character.get("name") + " has no attribute named Armour_" + hitLocation + ".");
    } else {
      armour = Number(ArmourObj.get("current"));
    }

    //is the attack primitive?
    if(Number(this.Prim.get("current")) > 0){
      //the armour is twice as protective against primitive attacks
      armour *= 2;
    }

    //is the armour primitive?
    if(this.primArmour){
      //the primitive armour is half as effective
      armour /= 2;
    }

    //round the armour
    armour = Math.round(armour);

    //is the target a spaceship?
    if(this.targetType == "starship"){
      //starship weapons either have no penetration, or infinite penetration
      if(Number(this.Pen.get("current")) > 0){
        armour = 0;
      }
    }else {
      //all other targets treat penetration normally
      armour -= this.Pen.get("current");
      //be sure the penetration doesn't overshoot the armour
      if(armour < 0){
        armour = 0;
      }
    }

    //apply the armour to the damage
    damage -= armour;

    //be sure the damage isn't negative
    if(damage < 0){
      damage = 0;
    }

    //report the reduced damage
    return damage;
  }
});
