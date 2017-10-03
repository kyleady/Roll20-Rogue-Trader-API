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
        case "-3":
          hitLocation = "P"
        break;
        case "-2":
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
