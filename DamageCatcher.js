on("chat:message", function(msg) {
    //if the message matches the traditional pattern, the system records the Damage, Damage Type, Penetration, and Primitive
    if( (((msg.type == "emote" && msg.content.indexOf( "- ") !== -1) || (msg.type == "whisper" && msg.target == "gm"))
    && msg.content.indexOf(" deals ") !== -1
    && msg.content.indexOf(" Damage, ") !== -1
    && msg.content.indexOf(" Pen") !== -1
    && (msg.content.indexOf(" with ") !== -1 ))//|| msg.content.indexOf(" with an ") !== -1
    || (msg.content.indexOf("{{Damage= $[[0]]}}") != -1
    && msg.content.indexOf("{{Pen=  $[[1]]}}") != -1
    && msg.content.indexOf("{{name=<strong>Damage</strong>: ")   )
    && msg.inlinerolls.length > 1)
  {
      log(msg.inlinerolls)
      var storage =  findObjs({type: 'character', name: "Damage Catcher"})[0];
      var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "DamageType" })[0];
      
      //I don't know why I need to do this BUT for some reason when the message is sent by the API
      //instead of a player, the inline rolls start with a null object, and accessing a null object is dangerous
      //"with a(n) " is the generic method I have the api using. Player sent commands are expected to be more intelligent
      if(msg.inlinerolls[0] == undefined){
        var rollIndex = 1;
      } else {
        var rollIndex = 0;
      }
      log("rollIndex")
      log(rollIndex)
      log("msg.inlinerolls[0]")
      log(msg.inlinerolls[0])
      log("msg.inlinerolls[1]")
      log(msg.inlinerolls[1])
      log("msg.inlinerolls[2]")
      log(msg.inlinerolls[2])
      //record Damage Type
      var DamageType;
      if(msg.content.indexOf(" Energy ") !== -1 || msg.content.indexOf(">E<") !== -1){
          DamageType = "E";
          attribObj.set('current', "E");
      } else if(msg.content.indexOf(" Rending ") !== -1 || msg.content.indexOf(">R<") !== -1){
          DamageType = "R";
          attribObj.set('current', "R");
      } else if(msg.content.indexOf(" Explosive ") !== -1 || msg.content.indexOf(">X<") !== -1){
          DamageType = "X";
          attribObj.set('current', "X");
      } else {//if(msg.content.indexOf(" Energy ") !== -1){
          DamageType = "I";
          attribObj.set('current', "I");
      }
      
      //record Damage
      var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "Damage" })[0];
      attribObj.set('current', msg.inlinerolls[rollIndex].results.total);
      log(msg.inlinerolls[rollIndex].results.total)
      log(msg.inlinerolls[rollIndex].results.rolls[0].results)
      
      //record the lowest damage roll
      var lowest = 10
      for(i = 0; i < msg.inlinerolls[rollIndex].results.rolls[0].results.length; i++){
          if(!msg.inlinerolls[rollIndex].results.rolls[0].results[i].d && msg.inlinerolls[rollIndex].results.rolls[0].results[i].v < lowest){
              lowest = msg.inlinerolls[rollIndex].results.rolls[0].results[i].v
          }
      }   
      
      //record Penetration
      var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "Penetration" })[0];
      attribObj.set('current', msg.inlinerolls[rollIndex + 1].results.total);
      
      //record Felling
      var fellingIndex = msg.content.indexOf("Felling");
      var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "Felling" })[0];
      //is there any Felling inside the weapon?
      if(fellingIndex >= 0){
          //find the parenthesis after Felling
          var startIndex = msg.content.indexOf("(",fellingIndex);
          var endIndex = msg.content.indexOf(")",startIndex);
          //be sure the parenthesis were both found
          if (startIndex >= 0 && endIndex >= 0 && Number(msg.content.substring(startIndex+1,endIndex))){
              //record the amount of felling
              attribObj.set('current',Number(msg.content.substring(startIndex+1,endIndex)));
          } else {
              //record zero felling
              attribObj.set('current', 0);
          }
      } else {
          //record zero felling
          attribObj.set('current', 0);
      }
      
      //record Primitive
      if(msg.content.indexOf("Primitive") != -1 && msg.content.indexOf("Mono") == -1) {
        //report to the gm that everything was found
        sendChat("System","/w gm Dam: " + Number(getAttrByName(storage.id, "Damage")) + " " + DamageType + ", Pen: " +  msg.inlinerolls[rollIndex + 1].results.total + ", Felling: " + Number(getAttrByName(storage.id, "Felling")) + ", Primitive");  
        
        //record Primitive
        var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "Primitive" })[0];
        attribObj.set('current', 1);
      }  else {
        //report to the gm that everything was found
        sendChat("System","/w gm Dam: " + Number(getAttrByName(storage.id, "Damage")) + " " + DamageType + ", Pen: " +  msg.inlinerolls[rollIndex + 1].results.total + ", Felling: " + Number(getAttrByName(storage.id, "Felling")));  
        
        //record Primitive
        var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "Primitive" })[0];
        attribObj.set('current', 0);
      }
      //was this a private attack?
      if(msg.type == "whisper"){
        //report the lowest roll privately
        sendChat("System",'/w gm <strong>Lowest</strong>: [' + lowest.toString() + "](!Crit)")  
      } else {
        //report the lowest roll publicly
        sendChat("",'/desc <strong>Lowest</strong>: [' + lowest.toString() + "](!Crit)")    
      }
      
        
  } //if the message matches the traditional roll to hit, record the roll
  else if((msg.type == "emote"
  && msg.content.indexOf("- ") != -1
  && msg.content.indexOf(" rolls ") != -1
  && (msg.content.indexOf(" successes on a WS test for ") != -1 || msg.content.indexOf(" successes on a BS test for ") != -1 || msg.content.indexOf(" successes on a Wp test for ") != -1))
  ||((msg.content.indexOf(" {{name=<strong>WS</strong>: ") != -1 || msg.content.indexOf(" {{name=<strong>BS</strong>: ") != -1 || msg.content.indexOf(" {{name=<strong>Wp</strong>: ") != -1)
  && msg.content.indexOf("{{Successes=$[[0]]}} {{Unnatural= $[[1]]}}") != -1)
  && msg.inlinerolls.length == 2) {
        //load up the AmmoTracker object to calculate the hit location
        myTracker = new AmmoTracker();
        myTracker.calculateLocation(msg.inlinerolls[0].results.rolls[1].results[0].v);
        
        //load up the GM variables
        var storage =  findObjs({type: 'character', name: "Damage Catcher"})[0];
        //record the number of hits
        var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "Hits" })[0];
        //the negative modifier keeps the total number of hits <= 1 while still storing the number of hits, this is because all hits are assumed to be Single Shot mode
        attribObj.set('current', -1*(1 + Math.floor(msg.inlinerolls[0].results.total) + Math.floor(msg.inlinerolls[1].results.total)));
        
        //was the roll a Wp check?
        if(msg.content.indexOf(" {{name=<strong>Wp</strong>: ") != -1){
            //was the one's place a 9?
            if((msg.inlinerolls[0].results.rolls[1].results[0].v - 10*Math.floor(msg.inlinerolls[0].results.rolls[1].results[0].v/10)) == 9){
                sendChat("The warp","/em makes an unexpected twist.")
            }
            
        }
  }
  else if(msg.type == "api" && msg.content.indexOf("!Dam += ") == 0 && playerIsGM(msg.playerid)){
      if(msg.inlinerolls && msg.inlinerolls.length > 0) {
        //be sure we are accessing data that exists
        var rollIndex = 0;
        if(msg.inlinerolls[rollIndex] == undefined){
            rollIndex++;
        }
        var DamageModifier = msg.inlinerolls[rollIndex].results.total;
      } else {
        //get the damage modifier from the input
        var DamageModifier = Number(msg.content.substring(8)) || 0;
      }
      //load up the Damage Catcher variables
      var storage =  findObjs({type: 'character', name: "Damage Catcher"})[0];
      //load up the Damage variable in Damage Catcher
      var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "Damage" })[0];
      //add the modifier
      attribObj.set('current', Number(getAttrByName(storage.id, "Damage")) + DamageModifier);
      
      //alert the GM
      sendChat("System","/w gm Dam = " + getAttrByName(storage.id, "Damage"));
  } 
  else if(msg.type == "api" && msg.content.indexOf("!Dam *= ") == 0 && playerIsGM(msg.playerid)){
      if(msg.inlinerolls && msg.inlinerolls.length > 0) {
        //be sure we are accessing data that exists
        var rollIndex = 0;
        if(msg.inlinerolls[rollIndex] == undefined){
            rollIndex++;
        }
        //record the randomized total
        var DamageModifier = msg.inlinerolls[rollIndex].results.total;
      } else {
        //get the damage modifier from the input
        var DamageModifier = Number(msg.content.substring(8)) || 0;
      }
      //load up the Damage Catcher variables
      var storage =  findObjs({type: 'character', name: "Damage Catcher"})[0];
      //load up the Damage variable in Damage Catcher
      var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "Damage" })[0];
      //multiply by the modifier
      attribObj.set('current', Number(getAttrByName(storage.id, "Damage")) * DamageModifier);
      
      //alert the GM
      sendChat("System","/w gm Dam = " + getAttrByName(storage.id, "Damage"));
  }  
  else if(msg.type == "api" && msg.content.indexOf("!Dam -= ") == 0 && playerIsGM(msg.playerid)){
      if(msg.inlinerolls && msg.inlinerolls.length > 0) {
        //be sure we are accessing data that exists
        var rollIndex = 0;
        if(msg.inlinerolls[rollIndex] == undefined){
            rollIndex++;
        }
        //record the randomized total
        var DamageModifier = msg.inlinerolls[rollIndex].results.total;
      } else {
        //get the damage modifier from the input
        var DamageModifier = Number(msg.content.substring(8)) || 0;
      }
      //load up the Damage Catcher variables
      var storage =  findObjs({type: 'character', name: "Damage Catcher"})[0];
      //load up the Damage variable in Damage Catcher
      var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "Damage" })[0];
      //subtract the modifier
      attribObj.set('current', Number(getAttrByName(storage.id, "Damage")) - DamageModifier);
      
      //alert the GM
      sendChat("System","/w gm Dam = " + getAttrByName(storage.id, "Damage"));
  }  
  else if(msg.type == "api" && msg.content.indexOf("!Dam /= ") == 0 && playerIsGM(msg.playerid)){
      if(msg.inlinerolls && msg.inlinerolls.length > 0) {
        //be sure we are accessing data that exists
        var rollIndex = 0;
        if(msg.inlinerolls[rollIndex] == undefined){
            rollIndex++;
        }
        //record the randomized total
        var DamageModifier = msg.inlinerolls[rollIndex].results.total;
      } else {
        //get the damage modifier from the input
        var DamageModifier = Number(msg.content.substring(8)) || 0;
      }
      //load up the Damage Catcher variables
      var storage =  findObjs({type: 'character', name: "Damage Catcher"})[0];
      //load up the Damage variable in Damage Catcher
      var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "Damage" })[0];
      //divide by the modifier
      attribObj.set('current', Math.round(Number(getAttrByName(storage.id, "Damage")) / DamageModifier));
      
      //alert the GM
      sendChat("System","/w gm Dam = " + getAttrByName(storage.id, "Damage"));
  }  
  else if(msg.type == "api" && msg.content.indexOf("!Dam = ") == 0 && playerIsGM(msg.playerid)){
      if(msg.inlinerolls && msg.inlinerolls.length > 0) {
        //be sure we are accessing data that exists
        var rollIndex = 0;
        if(msg.inlinerolls[rollIndex] == undefined){
            rollIndex++;
        }
        //record the randomized total
        var DamageModifier = msg.inlinerolls[rollIndex].results.total;
      } else {
        //get the damage modifier from the input
        var DamageModifier = Number(msg.content.substring(7)) || 0;
      }
      //load up the Damage Catcher variables
      var storage =  findObjs({type: 'character', name: "Damage Catcher"})[0];
      //load up the Damage variable in Damage Catcher
      var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "Damage" })[0];
      //set the Damage
      attribObj.set('current', DamageModifier);
      
      //alert the GM
      sendChat("System","/w gm Dam = " + getAttrByName(storage.id, "Damage"));
  } 
  else if(msg.type == "api" && msg.content.indexOf("!Dam") == 0 && playerIsGM(msg.playerid)) {
       if(msg.selected) {
          _.each(msg.selected, function(obj){
          var graphic = getObj("graphic", obj._id);
          //be sure the graphic exists
          if(graphic == undefined) {
              sendChat(msg.who, "/w gm - Nope2.");
              return;
          }
          
          //be sure the character is valid
          var character = getObj("character",graphic.get("represents"))
          if(character == undefined){
              sendChat(msg.who, "/w gm - character undefined.") 
              return;
          }
           //bring up the system variables sheet
          var storage =  findObjs({type: 'character', name: "Damage Catcher"})[0];
          var armour = null;
          var damage = Number(getAttrByName(storage.id, "Damage"));
          var location = msg.content.substring(5).trim().toLowerCase();
          
          //get the armour of the appropriate location
          //getAttrByName(character.id, "Vehicle") || 
          
          //is the target a vehicle?
          if(getAttrByName(character.id,"Structural Integrity") != undefined) {
              //has the user specified a specific location?
              if(location != ""){
                  switch(location) {
                      case "rear": case "r": //the side was preset to hit the rear arour
                        armour = Number(getAttrByName(character.id, "Armour_R"));
                        location = "vehicle";
                        break;
                      case "side": case "s": //the side was preset to hit the side armour
                        armour = Number(getAttrByName(character.id, "Armour_S"));
                        location = "vehicle"
                        break;
                      case "front": case "f": //If a side has not been preset, hit the front armour
                        armour = Number(getAttrByName(character.id, "Armour_F"));
                        location = "vehicle"
                        break;
                  }
              }
              //have we loaded up a specific armour location yet?
              if(armour == null) {
                  switch(getAttrByName(storage.id, "TensLocation")) {
                      case "-2": //the side was preset to hit the rear arour
                        armour = Number(getAttrByName(character.id, "Armour_R"));
                        location = "vehicle";
                        break;
                      case "-1": //the side was preset to hit the side armour
                        armour = Number(getAttrByName(character.id, "Armour_S"));
                        location = "vehicle"
                        break;
                      default: //If a side has not been preset, hit the front armour
                        armour = Number(getAttrByName(character.id, "Armour_F"));
                        location = "vehicle"
                        break;
                  }
             }
          }
          //is the target a starship?
          else if(getAttrByName(character.id,"Hull") != undefined){
              //has the user specified a location?
              if(location != ""){
                  switch(location) {
                      case "rear": case "r": case "aft": case "a": //the side was preset to hit the rear arour
                        armour = Number(getAttrByName(character.id, "Armour_A"));
                        location = "starship";
                        break;
                      case "side": case "s": case "starboard": //the side was preset to hit the side armour
                        armour = Number(getAttrByName(character.id, "Armour_S"));
                        location = "starship"
                        break;
                      case "front": case "f": case "fore": //hit the front armour
                        armour = Number(getAttrByName(character.id, "Armour_F"));
                        location = "starship"
                        break;
                      case "port": case "p": //hit the portside
                        armour = Number(getAttrByName(character.id, "Armour_P"));
                        location = "starship"
                        break;
                  }
              }
              //have we loaded up a specific armour location yet?
              if(armour == null) {
                  switch(getAttrByName(storage.id, "TensLocation")) {
                      case "-1": //the side was preset to hit the rear arour
                        armour = Number(getAttrByName(character.id, "Armour_A"));
                        location = "starship";
                        break;
                      case "-2": //the side was preset to hit the side armour
                        armour = Number(getAttrByName(character.id, "Armour_S"));
                        location = "starship"
                        break;
                      case "-3": //hit the portside
                        armour = Number(getAttrByName(character.id, "Armour_P"));
                        location = "starship"
                        break;
                      default:  //hit the front armour
                        armour = Number(getAttrByName(character.id, "Armour_F"));
                        location = "starship"
                        break;
                  }
             }
          }
          //the target is assumed to be a person
          else{
              //has the user specified a location?
              if(location != ""){
                  switch(location) {
                      case "head": case "h":
                          armour = Number(getAttrByName(character.id, "Armour_H"));
                          location = "Head"
                          break;
                      case "right leg": case "rl":
                          armour = Number(getAttrByName(character.id, "Armour_RL"));
                          location = "Leg"
                          break;
                      case "left leg": case "ll":
                          armour = Number(getAttrByName(character.id, "Armour_LL"));
                          location = "Leg"
                          break;
                      case "right arm": case "ra":
                          armour = Number(getAttrByName(character.id, "Armour_RA"));
                          location = "Arm"
                          break;
                      case "left arm": case "la":
                          armour = Number(getAttrByName(character.id, "Armour_LA"));
                          location = "Arm"
                          break;
                      case "body": case "b":
                          armour = Number(getAttrByName(character.id, "Armour_B"));
                          location = "Body"
                          break;
                  }
              }
              //has the armour still not been specified yet?
              if(armour == null){
                switch(getAttrByName(storage.id, "OnesLocation")) {
                  case 0:
                  case 10:
                      armour = Number(getAttrByName(character.id, "Armour_H"));
                      location = "Head"
                      break;
                  case 1:
                  case 2:
                  case 3:
                      if(getAttrByName(storage.id, "TensLocation") % 2 == 0) {
                        armour = Number(getAttrByName(character.id, "Armour_RL"));
                      } else {
                        armour = Number(getAttrByName(character.id, "Armour_LL"));
                      }
                      location = "Leg"
                      break;
                  case 8:
                  case 9:
                      if(getAttrByName(storage.id, "TensLocation") % 2 == 0) {
                        armour = Number(getAttrByName(character.id, "Armour_RA"));
                      } else {
                        armour = Number(getAttrByName(character.id, "Armour_LA"));
                      }
                      location = "Arm"
                      break;
                  default:
                      armour = Number(getAttrByName(character.id, "Armour_B"));
                      location = "Body"
                      break;
               }  
              }          
          }
          //penetration for starships is handled differently
          if(getAttrByName(character.id,"Hull") == undefined){
              //multiply armour if damage is primitive
              if(Number(getAttrByName(storage.id, "Primitive")) != 0){ armour *= 2;}
              
              //use penetration against the armour
              armour -= Number(getAttrByName(storage.id, "Penetration"));
              
              //be sure armour is not left in the negative
              if(armour < 0){armour = 0;}
          } else {
              //if attacking a starship and the penetration is greater than zero, ignore all armour
             if(Number(getAttrByName(storage.id, "Penetration")) != 0){
                 armour = 0;
             }
          }
          //reduce the damage by the remaining armour
          damage -= armour;
          
          //reduce the damage by Toughness Bonus
          //only do this if the target is not a vehicle
          if(getAttrByName(character.id,"Structural Integrity") == undefined && getAttrByName(character.id,"Hull") == undefined) {
            damage -= Math.floor(Number(getAttrByName(character.id, "T"))/10);
            //reduce the damage by Unnatural Toughness
            damage -= Number(getAttrByName(character.id, "Unnatural T"));
            //add one more to the T bonus (reducing the damage by one) if the token if frenzied
            if(graphic.get("status_red")){
                damage -= 1;
            }
            //add damage for Felling
            if(Number(getAttrByName(character.id, "Unnatural T")) > Number(getAttrByName(storage.id, "Felling"))){
                damage += Number(getAttrByName(storage.id, "Felling"));
            } else {
                damage += Number(getAttrByName(character.id, "Unnatural T"));
            }
            
          }
          
          //be sure the damage is not left in the negative
          if(damage < 0){damage = 0;}
          //check if you are damaging a Horde
          if(graphic.get("bar2_value") == "H" && damage > 0){
              //by default only do one horde damage
              if(getAttrByName(storage.id, "Hits") <= 1)
              {
                  damage = 1;
              } else {
                  //otherwise it will do damage equal to the number of hits
                  damage = getAttrByName(storage.id, "Hits");
              }
          }
          
          //report how much damage was done
          sendChat("System", "/w gm " + graphic.get("name") + " takes " + damage + " damage.")
          
          //temporarily use damage to store the new vaule for the 3rd bar
          damage = Number(graphic.get("bar3_value")) - damage;
          //has the target taken critical damage?
          if(damage < 0){
              if(location == "vehicle"){
                  sendChat("System","<strong>Critical Damage</strong>: " + GetLink("Vehicle Critical Effects") + " (" + Math.ceil(-1 * damage.toString() / Math.max(1,Math.floor(Number(getAttrByName(character.id, "Structural Integrity"))/10) + Number(getAttrByName(character.id, "Unnatural Structural Integrity"))) )  + ")" )  
              } else if(location == "starship"){
                  sendChat("System","<strong>Critical Damage</strong>: " + damage.toString() + " " + GetLink("Starship Critical Effects"))  
                  //starship critical damage is not saved
                  damage = 0;
              } else {
                  switch(getAttrByName(storage.id, "DamageType")){
                      case "I": 
                          sendChat("System","<strong>Critical Damage</strong>: " + GetLink("Impact Critical Effects - " + location) + " (" + Math.ceil(-1 * damage.toString() / Math.max(1,Math.floor(Number(getAttrByName(character.id, "Wounds"))/10) + Number(getAttrByName(character.id, "Unnatural Wounds"))) ) + ")")
                      break;
                      case "R": 
                          sendChat("System","<strong>Critical Damage</strong>: " + GetLink("Rending Critical Effects - " + location) + " (" + Math.ceil(-1 * damage.toString() / Math.max(1,Math.floor(Number(getAttrByName(character.id, "Wounds"))/10) + Number(getAttrByName(character.id, "Unnatural Wounds"))) ) + ")")  
                      break;
                      case "X": 
                          sendChat("System","<strong>Critical Damage</strong>: " + GetLink("Explosive Critical Effects - " + location) + " (" + Math.ceil(-1 * damage.toString() / Math.max(1,Math.floor(Number(getAttrByName(character.id, "Wounds"))/10) + Number(getAttrByName(character.id, "Unnatural Wounds"))) ) + ")")  
                      break;
                      case "E": 
                          sendChat("System","<strong>Critical Damage</strong>: " + GetLink("Energy Critical Effects - " + location) + " (" + Math.ceil(-1 * damage.toString() / Math.max(1,Math.floor(Number(getAttrByName(character.id, "Wounds"))/10) + Number(getAttrByName(character.id, "Unnatural Wounds"))) ) + ")")  
                      break;
                  }
              }
              
          }
          
          //update the 3rd bar to the correct vaule
          graphic.set("bar3_value",damage.toString());
          }); //end _.each function
          //starship damage is reset to 0 after use. This is because Starship damage adds up to overwhelm the armour of starships
          var storage =  findObjs({type: 'character', name: "Damage Catcher"})[0];
          var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "DamageType" })[0];
          if(attribObj.get('current') == "S"){
              //the damage has been used up, delete the damage
              attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "Damage" })[0];
              attribObj.set('current', 0);
          }
          //load up the AmmoTracker object to calculate the next hit location
          myTracker = new AmmoTracker();
          myTracker.calculateLocation(randomInteger(100));
        }
        else {
            //nothing was selected
            sendChat(msg.who, "/w gm - Nope1.");
        }
        
      
  } 
  else if(msg.type == "api" && msg.content == "!Primitive" && playerIsGM(msg.playerid)){
      //load up the Damage Catcher variables
      var storage =  findObjs({type: 'character', name: "Damage Catcher"})[0];
      //load up the Damage variable in Damage Catcher
      var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "Primitive" })[0];
      //multiply by the modifier
      if(Number(getAttrByName(storage.id, "Primitive"))){
          attribObj.set('current', 0);
          //alert the GM
          sendChat("System","/w gm Not Primitive");
      } else {
          attribObj.set('current', 1);
          sendChat("System","/w gm Primitive");
      }
  } 
  else if(msg.type == "api" && msg.content.indexOf("!Pen = ") == 0 && playerIsGM(msg.playerid)){
      //get the damage modifier from the input
      var PenModifier = Number(msg.content.substring(7)) || 0;
      //load up the Damage Catcher variables
      var storage =  findObjs({type: 'character', name: "Damage Catcher"})[0];
      //load up the Damage variable in Damage Catcher
      var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "Penetration" })[0];
      //set the Penetration
      attribObj.set('current', PenModifier);
      //alert the GM
      sendChat("System","/w gm Pen = " + getAttrByName(storage.id, "Penetration"));      
  } 
  else if(msg.type == "api" && msg.content.indexOf("!Pen += ") == 0 && playerIsGM(msg.playerid)){
      //get the damage modifier from the input
      var PenModifier = Number(msg.content.substring(8)) || 0;
      //load up the Damage Catcher variables
      var storage =  findObjs({type: 'character', name: "Damage Catcher"})[0];
      //load up the Damage variable in Damage Catcher
      var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "Penetration" })[0];
      //add the modifier
      attribObj.set('current', PenModifier + Number(getAttrByName(storage.id, "Penetration")));
      //alert the GM
      sendChat("System","/w gm Pen = " + getAttrByName(storage.id, "Penetration"));
  } 
  else if(msg.type == "api" && msg.content.indexOf("!Pen -= ") == 0 && playerIsGM(msg.playerid)){
      //get the damage modifier from the input
      var PenModifier = Number(msg.content.substring(8)) || 0;
      //load up the Damage Catcher variables
      var storage =  findObjs({type: 'character', name: "Damage Catcher"})[0];
      //load up the Damage variable in Damage Catcher
      var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "Penetration" })[0];
      //add the modifier
      attribObj.set('current', PenModifier - Number(getAttrByName(storage.id, "Penetration")));
      //alert the GM
      sendChat("System","/w gm Pen = " + getAttrByName(storage.id, "Penetration"));
  } 
  else if(msg.type == "api" && msg.content.indexOf("!Pen *= ") == 0 && playerIsGM(msg.playerid)){
      //get the damage modifier from the input
      var PenModifier = Number(msg.content.substring(8)) || 1;
      //load up the Damage Catcher variables
      var storage =  findObjs({type: 'character', name: "Damage Catcher"})[0];
      //load up the Damage variable in Damage Catcher
      var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "Penetration" })[0];
      //add the modifier
      attribObj.set('current', PenModifier * Number(getAttrByName(storage.id, "Penetration")));
      //alert the GM
      sendChat("System","/w gm Pen = " + getAttrByName(storage.id, "Penetration"));
  } else if(msg.type == "api" && msg.content.indexOf("!Pen /= ") == 0 && playerIsGM(msg.playerid)){
      //get the damage modifier from the input
      var PenModifier = Number(msg.content.substring(8)) || 1;
      //load up the Damage Catcher variables
      var storage =  findObjs({type: 'character', name: "Damage Catcher"})[0];
      //load up the Damage variable in Damage Catcher
      var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "Penetration" })[0];
      //add the modifier
      attribObj.set('current', Math.round(PenModifier / Number(getAttrByName(storage.id, "Penetration"))));
      //alert the GM
      sendChat("System","/w gm Pen = " + getAttrByName(storage.id, "Penetration"));
  } else if(msg.type == "api" && msg.content.indexOf("!DamageType = ") == 0 && playerIsGM(msg.playerid)){
      //get the damage modifier from the input
      var input = msg.content[14].toUpperCase() || "";
      
      //load up the Damage Catcher variables
      var storage =  findObjs({type: 'character', name: "Damage Catcher"})[0];
      //load up the Damage variable in Damage Catcher
      var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "DamageType" })[0];
      //figure out the damage type, if it is nothing of the following, do not modify the damage type
      if (input == 'X' || input == 'E' || input == 'R' || input == 'I' || input == "S"){
        attribObj.set('current', input);   
      }      
      //alert the GM
      sendChat("System","/w gm Damage Type = " + getAttrByName(storage.id, "DamageType"));
  } else if(msg.type == "api" && msg.content.indexOf("!Target ") == 0 && playerIsGM(msg.playerid)) {
    //load up the Damage Catcher variables
    var storage =  findObjs({type: 'character', name: "Damage Catcher"})[0];
    //load up the tens location and ones location variables in Damage Catcher
    var TensLoc = findObjs({ type: 'attribute', characterid: storage.id, name: "TensLocation" })[0];
    var OnesLoc = findObjs({ type: 'attribute', characterid: storage.id, name: "OnesLocation" })[0];
    //figure out what we are targeting
    switch(msg.content.substring(8).toLowerCase()){
        case "head": case "h": 
            OnesLoc.set('current', "0"); 
            sendChat("System","Targeting Head"); 
            break;
        case "right arm": case "ra": 
            OnesLoc.set('current', "8"); 
            TensLoc.set('current', "0"); 
            sendChat("System","Targeting Right Arm"); 
            break;
        case "left arm": case "la": 
            OnesLoc.set('current', "8"); 
            TensLoc.set('current', "1"); 
            sendChat("System","Targeting Left Arm"); 
            break;
        case "body": case "b": 
            OnesLoc.set('current', "4"); 
            sendChat("System","Targeting Body"); 
            break;
        case "right leg": case "rl": 
            OnesLoc.set('current', "1"); 
            TensLoc.set('current', "0"); 
            sendChat("System","Targeting Right Leg"); 
            break;
        case "left leg": case "ll": 
            OnesLoc.set('current', "1"); 
            TensLoc.set('current', "1"); 
            sendChat("System","Targeting Left Leg"); 
            break;
        case "front": case "f": case "fore": 
            TensLoc.set('current', "0"); 
            sendChat("System","Targeting Front"); 
            break;
        case "side": case "s": case "starboard": 
            TensLoc.set('current', "-1"); 
            sendChat("System","Targeting Side"); 
            break;
        case "rear": case "r": case "aft": case "a": 
            TensLoc.set('current', "-2"); 
            sendChat("System","Targeting Rear"); 
            break;
        case "port": case "p": 
            TensLoc.set('current', "-3"); 
            sendChat("System","Targeting Portside"); 
            break;
    }
  } 
  else if(msg.type == "api" && msg.content == "!Full" && playerIsGM(msg.playerid)){
    //load up the Damage Catcher variables
    var storage =  findObjs({type: 'character', name: "Damage Catcher"})[0];
    //load up the Hits variable in Damage Catcher
    var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "Hits" })[0];
    if(getAttrByName(storage.id, "Hits") >= 0) {
        sendChat("System","/w gm Number of Hits already modified");
    } else {
        attribObj.set('current',-1 * getAttrByName(storage.id, "Hits"));
        sendChat("System",getAttrByName(storage.id, "Hits") + " hit(s)");
    }
  } else if(msg.type == "api" && msg.content == "!Semi" && playerIsGM(msg.playerid)){
    //load up the Damage Catcher variables
    var storage =  findObjs({type: 'character', name: "Damage Catcher"})[0];
    //load up the Hits variable in Damage Catcher
    var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "Hits" })[0];
    if(getAttrByName(storage.id, "Hits") >= 0) {
        sendChat("System","/w gm Number of Hits already modified");
    } else {
        //complicated formula for 1 base hit plus 1 more per two full hits
        //the -1 * it to bring the hits from negative to positive
        attribObj.set('current',1 + Math.floor(((-1 * getAttrByName(storage.id, "Hits")) -1)/2));
        sendChat("System",getAttrByName(storage.id, "Hits") + " hit(s)");
    }
  } 
  else if(msg.type == "api" && msg.content.indexOf("!Hits += ") == 0 && playerIsGM(msg.playerid)){
        //get the hits modifier from the input
        var HitsModifier = Number(msg.content.substring(9)) || 0;
        //load up the Damage Catcher variables
        var storage =  findObjs({type: 'character', name: "Damage Catcher"})[0];
        //load up the Hits variable in Damage Catcher
        var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "Hits" })[0];
        //if there is less than one hit, assume that there is one hit (negative numbers are used for potential semi auto or full auto attacks)
        if(getAttrByName(storage.id, "Hits") < 1){
            attribObj.set('current', 1 + HitsModifier);
        } else {
            //otherwise add as normal
            attribObj.set('current', getAttrByName(storage.id, "Hits") + HitsModifier);
        }
        //report the total number of hits to the GM
        sendChat("System", "/w gm " + getAttrByName(storage.id, "Hits") + " hits");
  } 
  else if(msg.type == "api" && msg.content.indexOf("!Hits *= ") == 0 && playerIsGM(msg.playerid)){
        //get the hits modifier from the input
        var HitsModifier = Number(msg.content.substring(9)) || 0;
        //load up the Damage Catcher variables
        var storage =  findObjs({type: 'character', name: "Damage Catcher"})[0];
        //load up the Hits variable in Damage Catcher
        var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "Hits" })[0];
        //if there is less than one hit, assume that there is one hit (negative numbers are used for potential semi auto or full auto attacks)
        if(getAttrByName(storage.id, "Hits") < 1){
            attribObj.set('current', HitsModifier);
        } else {
            //otherwise multiply as normal as normal
            attribObj.set('current', getAttrByName(storage.id, "Hits") * HitsModifier);
        }
        //report the total number of hits to the GM
        sendChat("System", "/w gm " + getAttrByName(storage.id, "Hits") + " hits");
  } 
  else if(msg.type == "api" && msg.content.indexOf("!Hits = ") == 0 && playerIsGM(msg.playerid)){
        //get the hits modifier from the input
        var HitsModifier = Number(msg.content.substring(8)) || 0;
        //load up the Damage Catcher variables
        var storage =  findObjs({type: 'character', name: "Damage Catcher"})[0];
        //load up the Hits variable in Damage Catcher
        var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "Hits" })[0];
        //store the Hits Modifier
        attribObj.set('current', HitsModifier);
        //report the total number of hits to the GM
        sendChat("System", "/w gm " + getAttrByName(storage.id, "Hits") + " hits");
  } 
  else if(msg.type == "api" && msg.content.indexOf("!ShipCrit ") == 0 && playerIsGM(msg.playerid)){
      //be sure a token is selected
      if(!msg.selected || msg.selected.length <= 0) {
          return sendChat("System","/w gm Nothing selected.")
      }
      log(msg.selected[0]._id)
      var graphic = getObj("graphic", msg.selected[0]._id);
      //be sure the graphic exists
      if(graphic == undefined) {
          return sendChat("System", "/w gm Graphic undefined.");
      }
      //disect the input into pieces
      var ShipCritPiece = "";
      var ShipCritPieces = [];
      for(shipCritIndex = 10; shipCritIndex < msg.content.length; shipCritIndex++){
          //save this piece if it is not empty
          if(msg.content[shipCritIndex] == " " && ShipCritPiece != ""){
              ShipCritPieces.push(ShipCritPiece);
              //reset the piece
              ShipCritPiece = "";
          //save the character to the current piece
          } else { 
              ShipCritPiece += msg.content[shipCritIndex];
          }
      }
      //save the final piece if it is worth saving
      if(ShipCritPiece != ""){
          ShipCritPieces.push(ShipCritPiece);
          //reset the piece
          ShipCritPiece = "";
      }
      //be sure there is at least one input
      if(ShipCritPieces.length <= 0){
          return sendChat("System","No input stated.");
      }
      log(ShipCritPieces)
      //which critical effect should we mark?
      if(ShipCritPieces[0].toLowerCase() == "depressurized" || ShipCritPieces[0].toLowerCase() == "1"){
          //was there only one notation?
          if(ShipCritPieces.length <= 1){
              //default to one
              ShipCritPieces[1] = "1";
          } 
          //add the stated number of markers
          if(Number(ShipCritPieces[1])){
              //what is the number marker on this badge?
              var degeneracy = Number(graphic.get("status_edge-crack"));
              //add the input
              degeneracy += Number(ShipCritPieces[1]);
              //are there still any badges?
              if(degeneracy > 0){
                  //update the badge
                  graphic.set("status_edge-crack",degeneracy.toString());
              } else {
                  //remove the badge
                  graphic.set("status_edge-crack",false);
              }
          } else if(ShipCritPieces[1].toLowerCase() == "clear"){
              //remove the badge
              graphic.set("status_edge-crack",false);
          }
      } else if(ShipCritPieces[0].toLowerCase() == "damaged" || ShipCritPieces[0].toLowerCase() == "2"){
          log(graphic.get("status_spanner"))
          //was there only one notation?
          if(ShipCritPieces.length <= 1){
              //default to one
              ShipCritPieces[1] = "1";
          } 
          //add the stated number of markers
          if(Number(ShipCritPieces[1])){
              //what is the number marker on this badge?
              var degeneracy = Number(graphic.get("status_spanner"));
              //add the input
              degeneracy += Number(ShipCritPieces[1]);
              //are there still any badges?
              if(degeneracy > 0){
                  //update the badge
                  graphic.set("status_spanner",degeneracy.toString());
              } else {
                  //remove the badge
                  graphic.set("status_spanner",false);
              }
          } else if(ShipCritPieces[1].toLowerCase() == "clear"){
              //remove the badge
              graphic.set("status_spanner",false);
          }
      } else if(ShipCritPieces[0].toLowerCase() == "sensors" || ShipCritPieces[0].toLowerCase() == "3"){
          //was there only one notation?
          if(ShipCritPieces.length <= 1){
              //default to one
              ShipCritPieces[1] = "1";
          } 
          //add the stated number of markers
          if(Number(ShipCritPieces[1])){
              //what is the number marker on this badge?
              var degeneracy = Number(graphic.get("status_bleeding-eye"));
              //add the input
              degeneracy += Number(ShipCritPieces[1]);
              //are there still any badges?
              if(degeneracy > 0){
                  //update the badge
                  graphic.set("status_bleeding-eye",degeneracy.toString());
              } else {
                  //remove the badge
                  graphic.set("status_bleeding-eye",false);
              }
          } else if(ShipCritPieces[1].toLowerCase() == "clear"){
              //remove the badge
              graphic.set("status_bleeding-eye",false);
          }
      } else if(ShipCritPieces[0].toLowerCase() == "thrusters" || ShipCritPieces[0].toLowerCase() == "4"){
          //was there only one notation?
          if(ShipCritPieces.length <= 1){
              //default to one
              ShipCritPieces[1] = "1";
          } 
          //add the stated number of markers
          if(Number(ShipCritPieces[1])){
              //what is the number marker on this badge?
              var degeneracy = Number(graphic.get("status_cobweb"));
              //add the input
              degeneracy += Number(ShipCritPieces[1]);
              //are there still any badges?
              if(degeneracy > 0){
                  //update the badge
                  graphic.set("status_cobweb",degeneracy.toString());
              } else {
                  //remove the badge
                  graphic.set("status_cobweb",false);
              }
          } else if(ShipCritPieces[1].toLowerCase() == "clear"){
              //remove the badge
              graphic.set("status_cobweb",false);
          }
      } else if(ShipCritPieces[0].toLowerCase() == "fire" || ShipCritPieces[0].toLowerCase() == "5"){
          //was there only one notation?
          if(ShipCritPieces.length <= 1){
              //default to one
              ShipCritPieces[1] = "1";
          } 
          //add the stated number of markers
          if(Number(ShipCritPieces[1])){
              //what is the number marker on this badge?
              var degeneracy = Number(graphic.get("status_half-haze"));
              //add the input
              degeneracy += Number(ShipCritPieces[1]);
              //are there still any badges?
              if(degeneracy > 0){
                  //update the badge
                  graphic.set("status_half-haze",degeneracy.toString());
              } else {
                  //remove the badge
                  graphic.set("status_half-haze",false);
              }
          } else if(ShipCritPieces[1].toLowerCase() == "clear"){
              //remove the badge
              graphic.set("status_half-haze",false);
          }
      } else if(ShipCritPieces[0].toLowerCase() == "engines" || ShipCritPieces[0].toLowerCase() == "6"){
          //was there only one notation?
          if(ShipCritPieces.length <= 1){
              //default to one
              ShipCritPieces[1] = "1";
          } 
          //add the stated number of markers
          if(Number(ShipCritPieces[1])){
              //what is the number marker on this badge?
              var degeneracy = Number(graphic.get("status_snail"));
              //add the input
              degeneracy += Number(ShipCritPieces[1]);
              //are there still any badges?
              if(degeneracy > 0){
                  //update the badge
                  graphic.set("status_snail",degeneracy.toString());
              } else {
                  //remove the badge
                  graphic.set("status_snail",false);
              }
          } else if(ShipCritPieces[1].toLowerCase() == "clear"){
              //remove the badge
              graphic.set("status_snail",false);
          }
      } else if(ShipCritPieces[0].toLowerCase() == "unpowered" || ShipCritPieces[0].toLowerCase() == "7"){
          //was there only one notation?
          if(ShipCritPieces.length <= 1){
              //default to one
              ShipCritPieces[1] = "1";
          } 
          //add the stated number of markers
          if(Number(ShipCritPieces[1])){
              //what is the number marker on this badge?
              var degeneracy = Number(graphic.get("status_lightning-helix"));
              //add the input
              degeneracy += Number(ShipCritPieces[1]);
              //are there still any badges?
              if(degeneracy > 0){
                  //update the badge
                  graphic.set("status_lightning-helix",degeneracy.toString());
              } else {
                  //remove the badge
                  graphic.set("status_lightning-helix",false);
              }
          } else if(ShipCritPieces[1].toLowerCase() == "clear"){
              //remove the badge
              graphic.set("status_lightning-helix",false);
          }
      }
      return sendChat("System","/w gm Updated.")
      
  } 
  else if(msg.type == "api" && msg.content.indexOf("!Echo ") == 0){
      //who are we talking to?
      var whisperTarget = msg.who;
      if(whisperTarget.indexOf(" ") != -1){
          whisperTarget = whisperTarget.substring(0,whisperTarget.indexOf(" "));
      }
      //whisper back to the sender
      return sendChat("System","/w " + whisperTarget + " " + msg.content.substring(6));
  } 
  else if((msg.content.indexOf(" Starship Damage ") != -1 
  && msg.content.indexOf(" deals ") != -1 
  && msg.content.indexOf(" with ") != -1
  && msg.type == "emote") 
  ||(msg.content.indexOf(" {{name=**Damage**: ") != -1
  && msg.content.indexOf("}} {{Damage=") != -1
  && (msg.content.indexOf("{{Type=Macro}}") != -1 || msg.content.indexOf("{{Type=Nova}}") != -1 || msg.content.indexOf("{{Type=Torpedo}}") != -1 || msg.content.indexOf("{{Type=Lance}}") != -1 || msg.content.indexOf("{{Type=Bomber}}") != -1)
      )){
      var rollIndex = 0;
      if(msg.inlinerolls[rollIndex] == undefined){
          rollIndex++;
      }
      log(msg.inlinerolls[rollIndex])
      //the selected token is making an attack
      //load up the datastorage
      var storage =  findObjs({type: 'character', name: "Damage Catcher"})[0];
      //load up the current damage
      var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "Damage" })[0];
      var starshipDamage = Number(attribObj.get('current'));
      //load up the current damage type
      attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "DamageType" })[0];
      //was the last attack a starship attack?
      if(attribObj.get('current') != "S"){
          //we are now making this starship damage
          attribObj.set('current', "S");
          //the new damage is just saved without regard for any of the old damage
          starshipDamage = msg.inlinerolls[rollIndex].results.total;
      } else {
          //add the new damage to the old damage
          starshipDamage += msg.inlinerolls[rollIndex].results.total;
      }
      //record the total Damage
      attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "Damage" })[0];
      attribObj.set('current', starshipDamage);
      //record Penetration
      attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "Penetration" })[0];
      //is the weapon a lance?
      if(msg.content.toLowerCase().indexOf("lance") != -1 || msg.content.toLowerCase().indexOf("nova") != -1){
        attribObj.set('current', 1);
        sendChat("System","/w gm Dam: " + starshipDamage.toString() + ", Pen: true");
      } else {
        attribObj.set('current', 0);
        sendChat("System","/w gm Dam: " + starshipDamage.toString() + ", Pen: false");
      }
  } 
  else if(msg.type == "api" && msg.content.indexOf("!Crit") == 0 && playerIsGM(msg.playerid)){
      //load of the damage data
      var storage =  findObjs({type: 'character', name: "Damage Catcher"})[0];
      //is this a vehicle?
      if(msg.content.toLowerCase().indexOf("v") == 6){
        sendChat("System","<strong>Critical Hit</strong>: " + GetLink("Vehicle Critical Effects")) 
      //is this a starship?
      } else if(msg.content.toLowerCase().indexOf("s") == 6){
        sendChat("System","<strong>Critical Hit</strong>: " + GetLink("Starship Critical Effects")) 
      //assume it is a person
      } else {
        //where is this location?
      var location = ""
      log(getAttrByName(storage.id, "OnesLocation"))
      switch(getAttrByName(storage.id, "OnesLocation")) {
          case 0:
          case 10:
              location = "Head"
              break;
          case 1:
          case 2:
          case 3:
              location = "Leg"
              break;
          case 8:
          case 9:
              location = "Arm"
              break;
          default:
              location = "Body"
              break;
      }
      switch(getAttrByName(storage.id, "DamageType")){
          case "I": 
              sendChat("System","<strong>Critical Hit</strong>: " + GetLink("Impact Critical Effects - " + location))  
          break;
          case "R": 
              sendChat("System","<strong>Critical Hit</strong>: " + GetLink("Rending Critical Effects - " + location))  
          break;
          case "X": 
              sendChat("System","<strong>Critical Hit</strong>: " + GetLink("Explosive Critical Effects - " + location))  
          break;
          case "E": 
              sendChat("System","<strong>Critical Hit</strong>: " + GetLink("Energy Critical Effects - " + location))  
          break;
      }  
      }
      
    //is the damage mitigated by cover?  
  } 
  else if (msg.content.indexOf("!Cover ") == 0 && playerIsGM(msg.playerid)){
      log("cover")
      //how much cover is there?
      var cover = Number(msg.content.substr(7));
      log(cover)
      //is there enough cover for us to care?
      if(cover <= 0){
          return sendChat("System","/w gm Insuficient cover.")
      }
      //load up the Damage Catcher variables
      var storage =  findObjs({type: 'character', name: "Damage Catcher"})[0];
      //load up the Penegration variable in Damage Catcher
      var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "Penetration" })[0];
      //reduce the penetration by half the cover
      var pen = Number(getAttrByName(storage.id, "Penetration")) - cover/2;
      //has the cover been entirely used?
      if(pen >= 0){
        //record the remaining Penetration
        attribObj.set('current', Math.round(pen));
      } else {
        //record the 0 penetration left
        attribObj.set('current', 0);
        //load up the damage variable
        attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "Damage" })[0];
        //reduce the damage by the remaining cover
        var dam = Number(getAttrByName(storage.id, "Damage")) + 2*pen;
        //does any cover remain?
        if(dam >= 0){
            //record the remaining damage
            attribObj.set('current', dam);
        } else {
            //record the remaining damage
            attribObj.set('current', 0);
        }
      }
      //alert the GM
      sendChat("System","/w gm Dam: " + Number(getAttrByName(storage.id, "Damage")) + ", Pen: " + Number(getAttrByName(storage.id, "Penetration")));  
  }
  else if(msg.type == "api" && msg.content == "!AddUnnaturalSI" && playerIsGM(msg.playerid)){
    //at the end check if the process was still error free
    var ErrorFree = true;
    //check each character
    _.each(findObjs({_type: "character"}),function(obj){
        //and try to load up the character's bio and gmnotes
        var Bio = "";
        var GMNotes = "";
        obj.get("bio", function(bio) {Bio = bio;});
        obj.get("gmnotes", function(gmnotes) {GMNotes = gmnotes;});
        
        //if both are empty, we can assume that they did not load properly (as they never do on the first try since compliling)
        if(Bio == "" && GMNotes == ""){
            ErrorFree = false;
            //we still want to attempt to access each bio and gmnotes, even if they will all load improperly
        //if there were no problems, then check if the character has structural integrity and if it does not have unnatural structural integrity
        }else if(getAttrByName(obj.id,"Structural Integrity") != undefined
        && getAttrByName(obj.id,"Unnatural Structural Integrity") == undefined){
            //the character still needs Unnatural Structural Integrity
            //check their bio and gmnotes to see if they have reinforced hull
            if(Bio.indexOf(">Reinforced Hull<") >= 0 || GMNotes.indexOf(">Reinforced Hull<") >= 0){
                //it has a reinforced hull, set its unnatural structural integrity to 1
                createObj("attribute", {
                    name: "Unnatural Structural Integrity",
                    current: 1,
                    max: 1,
                    characterid: obj.id
                });
            } else {
                //there is no reinforced hull, set its unnatural structural Integrity to 0
                createObj("attribute", {
                    name: "Unnatural Structural Integrity",
                    current: 0,
                    max: 0,
                    characterid: obj.id
                });
            }
        }
    });
    
    if(ErrorFree){
        sendChat("System","/w gm Unnatural Structural Integrity Added");
    }else{
        sendChat("System","/w gm Try Again?");
    }
  }
  
});
