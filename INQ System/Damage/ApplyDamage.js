//damages every selected character according to the stored damage variables
function applyDamage(matches,msg){
  //load up all of the variables
  //load up all of the damage variables, wherever they may be
  var DamTypeObj = findObjs({ type: 'attribute', name: "Damage Type" })[0];
  var DamObj = findObjs({ type: 'attribute', name: "Damage" })[0];
  var PenObj = findObjs({ type: 'attribute', name: "Penetration" })[0];
  var FellObj = findObjs({ type: 'attribute', name: "Felling" })[0];
  var PrimObj = findObjs({ type: 'attribute', name: "Primitive" })[0];
  var HitsObj = findObjs({ type: 'attribute', name: "Hits"})[0];
  var OnesLocObj = findObjs({ type: 'attribute', name: "OnesLocation"})[0];
  var TensLocObj = findObjs({ type: 'attribute', name: "TensLocation"})[0];

  //be sure every variable was successfully loaded
  var successfulLoad = true;
  //warn the gm for each attribute that was not found
  if(DamTypeObj == undefined){
    successfulLoad = false;
    whisper("No attribute named Damage Type was found anywhere in the campaign. Damage was not recorded.");
  }
  if(DamObj == undefined){
    successfulLoad = false;
    whisper("No attribute named Damage was found anywhere in the campaign. Damage was not recorded.");
  }
  if(PenObj == undefined){
    successfulLoad = false;
    whisper("No attribute named Penetration was found anywhere in the campaign. Damage was not recorded.");
  }
  if(FellObj == undefined){
    successfulLoad = false;
    whisper("No attribute named Felling was found anywhere in the campaign. Damage was not recorded.");
  }
  if(PrimObj == undefined){
    successfulLoad = false;
    whisper("No attribute named Primitive was found anywhere in the campaign. Damage was not recorded.");
  }
  if(HitsObj == undefined){
    successfulLoad = false;
    whisper("No attribute named Hits was found anywhere in the campaign. Damage was not recorded.");
  }
  if(OnesLocObj == undefined){
    successfulLoad = false;
    whisper("No attribute named OnesLocation was found anywhere in the campaign. Damage was not recorded.");
  }
  if(TensLocObj == undefined){
    successfulLoad = false;
    whisper("No attribute named TensLocation was found anywhere in the campaign. Damage was not recorded.");
  }
  if(successfulLoad == false){
    return;
  }
  //be sure something was selected
  if(msg.selected == undefined || msg.selected.length <= 0){
    return whisper("Nothing selected.");
  }
  //apply the damage to every selected character
  _.each(msg.selected,function(obj){
    var graphic = getObj("graphic", obj._id);
    //be sure the graphic exists
    if(graphic == undefined) {
        return whisper("Graphic undefined.");
    }
    //be sure the character is valid
    var character = getObj("character",graphic.get("represents"))
    if(character == undefined){
        return whisper("Character undefined for graphic " + graphic.get("name") + ".");
    }

    //get ready to calculate the damage applied to the character
    var damCalc = 0;

    //Character, Vehicle, or Starship?
    var targetType = "character";
    //if the target has Structural Integrity, they are a vehicle
    if(findObjs({_type: "attribute", _characterid: character.id, name: "Structural Integrity"}).length > 0){
      targetType = "vehicle";
    //if the target has Hull, they are a starship
    } else if(findObjs({_type: "attribute", _characterid: character.id, name: "Hull"}).length > 0) {
      targetType = "starship";
    }

    //be sure the damage type matches the targetType
    if(targetType == "starship" && DamTypeObj.get("current").toUpperCase() != "S"){
      return whisper(graphic.get("name") + ": Using non-starship damage on a starship. Aborting. [Correct](!damage type = s)");
    } else if(targetType != "starship" && DamTypeObj.get("current").toUpperCase() == "S"){
      return whisper(graphic.get("name") + ": Using starship damage on a non-starship. Aborting. [Correct](!damage type = i)");
    }

    //apply Armour==============================================================
    //==========================================================================
    var armourName = "";
    switch(targetType){
      case "character":
        switch(OnesLocObj.get("current")){
          case "0": case "10":
            armourName = "H"
          break;
          case "9": case "8":
            if(TensLocObj.get("current") % 2 == 0){
              armourName = "RA";
            } else {
              armourName = "LA";
            }
          break;
          case "3": case "2": case "1":
            if(TensLocObj.get("current") % 2 == 0){
              armourName = "RL";
            } else {
              armourName = "LL";
            }
          break;
          default: //case "4": case "5": case "6": case "7":
            armourName = "B";
          break;
        }
      break;
      case "vehicle":
        switch(TensLocObj.get("current")){
          case "-1":
            armourName = "S"
          break;
          case "-2":
            armourName = "R"
          break;
          default: //case "0":
            armourName = "F";
          break;
        }
      break;
      case "starship":
        switch(TensLocObj.get("current")){
          case "-1":
            armourName = "S"
          break;
          case "-2":
            armourName = "P"
          break;
          case "-3":
            armourName = "A"
          break;
          default: //case "0":
            armourName = "F";
          break;
        }
      break;
    }

    var damCalc = 0;
    ArmourObj = findObjs({_type: "attribute", _characterid: character.id, name: "Armour_" + armourName})[0];
    if(ArmourObj == undefined){
      whisper(character.get("current") + " has no attribute named Armour_" + armourName + ".");
    } else if(targetType == "starship"){
      //starship weapons either have no penetration, or infinite penetration
      if(Number(PenObj.get("current")) <= 0){
        damCalc = - Number(ArmourObj.get("current"));
      } //else Armour = 0
    }else {
      //calculate the armour reduction after penetration
      damCalc = Number(PenObj.get("current")) - Number(ArmourObj.get("current"));

      //if there was more penetration than there was armour, discount it
      if(damCalc > 0){damCalc = 0;}
    }

    //add in the damage to the calculation
    damCalc += Number(DamObj.get("current"));

    //apply Toughness===========================================================
    //==========================================================================
    if(targetType == "character"){
      //Toughness Bonus
      ToughObj = findObjs({_type: "attribute", _characterid: character.id, name: "T"})[0];
      //warn the gm if the Toughness Object is undefined
      if(ToughObj == undefined){
        whisper(character.get("current") + " has no attribute named T.");
      } else {
        damCalc -= Math.floor(Number(ToughObj.get("current"))/10);
      }
      //Unnatural Toughness
      UToughObj = findObjs({_type: "attribute", _characterid: character.id, name: "Unnatural T"})[0];
      //warn the gm if the Toughness Object is undefined
      if(UToughObj == undefined){
        whisper(character.get("current") + " has no attribute named Unnatural T.");
      } else {
        //reduce unnatural toughness by felling damage before applying Unnatural
        //Toughness
        if(Number(UToughObj.get("current")) - Number(FellObj.get("current")) > 0){
          damCalc -= Number(UToughObj.get("current")) - Number(FellObj.get("current"));
        }
      }
    }

    //be sure the total damage is positive
    if(damCalc < 0){damCalc = 0;}

    //a capital H in bar2 alerts the system that this graphic is a horde
    if(graphic.get("bar2_value") == "H"){
      //if the damage is non-zero, overwrite the damage with the number of Hits
      //(gm's can add bonus horde damage beforehand by modifying the number of
      //hits. This is will leave the damage unaffected on other tokens.)
      if(damCalc > 0){
        damCalc = HitsObj.get("Current");
        //explosive damage deals one extra point of horde damage
        if(DamTypeObj.get("current").toUpperCase() == "X"){
          damCalc++;
        }
      }
    }

    //be sure that the final result is a number
    damCalc = Number(damCalc);
    if(damCalc == undefined || damCalc == NaN){
      return whisper(graphic.get("name") + ": Damage undefined.");
    }

    //apply the damage to the graphic's bar3_value. If bar3 is linked to a
    //character sheet's wounds, the wounds will be immediately updated as well
    var remainingWounds = Number(graphic.get("bar3_value")) - damCalc;

    //Has the token taken critical damage?
    if(remainingWounds < 0){
      //calculate the critical effect that should be applied
      var critEffect =  (-1) * remainingWounds;
      switch(targetType){
        case "character":
          //Load up the Wounds and Unnatural Wounds attributes. Warn the gm if
          //they are not found.
          var WBonus = 1;
          WObj = findObjs({_type: "attribute", _characterid: character.id, name: "Wounds"})[0];
          if(WObj == undefined){
            whisper(character.get("name") + " has no attribute named Wounds.");
          } else {
            //Calculate the Structural Integrity Bonus of the Vehicle
            WBonus = Math.floor(Number(WObj.get("current"))/10);
          }
          UWObj = findObjs({_type: "attribute", _characterid: character.id, name: "Unnatural Wounds"})[0];
          if(UWObj == undefined){
            whisper(character.get("name") + " has no attribute named Unnatural Wounds.");
          } else {
            //Add in any Unnatural Structural Integrity to the Bonus
            WBonus += Number(UWObj.get("current"));
          }
          //At minimum, the SIBonus is one.
          Math.max(WBonus,1);
          //Calculate the resulting Critical Effect
          critEffect = Math.ceil(critEffect/WBonus);
          //report the critcal effect to the gm
          whisper(graphic.get("name") + ": [Critical Damage!](!crit ? " + DamTypeObj.get("current") + " " + armourName + ") (" + critEffect + ")");
        break;
        case "vehicle":
          //Load up the Structural Integrity and Unnatural Structural Integrity
          //Attributes. Warn the gm if they are not found.
          var SIBonus = 1;
          SIObj = findObjs({_type: "attribute", _characterid: character.id, name: "Structural Integrity"})[0];
          if(SIObj == undefined){
            whisper(character.get("name") + " has no attribute named Structural Integrity.");
          } else {
            //Calculate the Structural Integrity Bonus of the Vehicle
            SIBonus = Math.floor(Number(SIObj.get("current"))/10);
          }
          USIObj = findObjs({_type: "attribute", _characterid: character.id, name: "Unnatural Structural Integrity"})[0];
          if(USIObj == undefined){
            whisper(character.get("name") + " has no attribute named Unnatural Structural Integrity.");
          } else {
            //Add in any Unnatural Structural Integrity to the Bonus
            SIBonus += Number(USIObj.get("current"));
          }
          //At minimum, the SIBonus is one.
          Math.max(SIBonus,1);
          //Calculate the resulting Critical Effect
          critEffect = Math.ceil(critEffect/SIBonus);
          //report the critcal effect to the gm
          whisper(graphic.get("name") + ": [Critical Damage!](!crit ? v) (" + critEffect + ")");
        break;
        case "starship":
          //The critcal effect for starships is not modified
          whisper(graphic.get("name") + ": [Critical Damage!](!crit ? s) (" + critEffect + ")");
          //However, starships never record critical damage
          remainingWounds = 0;
        break;
      }
    }

    //record the damage
    graphic.set("bar3_value",remainingWounds);

    //Reroll Location after each hit
    if(targetType == "character"){
      ammoObj = new AmmoTracker;
      ammoObj.calculateLocation(randomInteger(100));
     }

    //report an exact amount to the gm
    whisper(graphic.get("name") + " took " + damCalc + " damage.");
    //report an estimate to everyone
    sendChat("","/desc " + graphic.get("name") + ": [[" +  Math.round(damCalc * 100 / graphic.get("bar3_max")) + "]]% taken.");
  });
  //reset starship damage
  //starship damage is a running tally and needs to be reset when used
  if(DamTypeObj.get("current").toUpperCase() == "S"){
    DamObj.set("current",0);
    //damage can be recovered by setting the current to the maximum
  }
}

//waits until CentralInput has been initialized
on("ready",function(){
  //Lets the gm apply the saved damage to multiple characters
  CentralInput.addCMD(/^!\s*dam(?:age)?\s*$/i,applyDamage);
});
