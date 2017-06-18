//take the given roll and calculate the location
function saveHitLocation(roll){
  //calculate Tens Location
  var tens = Math.floor(roll/10);
  //calculate Ones Location
  var ones = roll - 10*tens;
  //load up the GM variables
  var storage =  findObjs({type: 'character', name: "Damage Catcher"})[0];
  //load up the TensLocation variable to save the result in
  var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "TensLocation" })[0];
  attribObj.set("current",tens);
  //load up the OnesLocation variable to save the result in
  var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "OnesLocation" })[0];
  attribObj.set("current",ones);
  //where did you hit?
  var Location = "";
  switch(ones){
    case 10: case 0: Location = "Head"; break;
    case 9: case 8:
      switch(tens % 2){
        case 0: Location = "Right "; break;
        case 1: Location = "Left "; break;
      } Location += "Arm"; break;
    case 4: case 5: case 6: case 7: Location = "Body"; break;
    case 3: case 2: case 1:
      switch(tens % 2){
        case 0: Location = "Right "; break;
        case 1: Location = "Left "; break;
      } Location += "Leg"; break;
  }
  //send the total Damage at a 1 second delay
  setTimeout(whisper,100,"<strong>Location</strong>: " + Location);
}


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

    //find the hit location
    var hitLocation = getHitLocation(this.TensLoc.get("current"), this.OnesLoc.get("current"), this.targetType);
    log("Hit Location: " + hitLocation)
    //get the armor of the target
    var armour = attrValue("Armour_" + hitLocation, {characterid: this.character.id, graphicid: this.graphic.id});
    log("Armour: " + armour)

    //turn armour into a valid number
    if(!armour){
      armour = 0;
    } else {
      armour = Number(armour);
    }



    //is the attack primitive?
    if(Number(this.Prim.get("current")) > 0){
      log("Primitive Attack")
      //the armour is twice as protective against primitive attacks
      armour *= 2;
    }

    //is the armour primitive?
    if(this.primArmour){
      log("Primitive Armour")
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
      log("Penetration: " + this.Pen.get("current"))
      armour -= this.Pen.get("current");
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
});
