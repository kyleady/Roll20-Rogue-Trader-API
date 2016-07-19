//a function which rolls initiative for every selected character. Once rolled it
//adds the character to the roll20 turn tracker. If the character is already
//listed on the turn tracker, they will be replaced. Character and vehicle
//initiative is determined by Agility. Starship initiative is determined by
//Detection. Currently, initiativeHandler reads the associated Character Sheets
//of the tokens and accounts for Lightning Reflexes and Paranoia.

//matches[0] is the same as mgs.content
//matches[1] is the text operator
//matches[2] is the modifier

//secondAttempt is a flag showing that this function has been attempted once
//  before, so as to prevent an infinite loop

function initiativeHandler(matches,msg,secondAttempt){
  //get the JSON string of the turn order and make it into an array
  if(Campaign().get("turnorder") == ""){
    //We check to make sure that the turnorder isn't just an empty string first. If it is treat it like an empty array.
    var turnorder = [];
  } else{
    //otherwise turn the turn order into an array
    var turnorder = JSON.parse(Campaign().get("turnorder"));
  }

  //was nothing selected?
  if(msg.selected == undefined || msg.selected.length <= 0){
    //and the player is the gm
    if(playerIsGM(msg.playerid)){
      //just select every token on the player's map that is not simply a
      //drawing and is on the object layer (the layer players can see and
      //interact with)
      msg.selected = findObjs({
          _pageid: Campaign().get("playerpageid"),
          _type: "graphic",
          _subtype: "token",
          isdrawing: false,
          layer: "objects"
      });
    //if the player is not a gm, then attempt to find the player's default token
    } else {
      //make the seleced array include the default character
      msg.selected = [defaultCharacter(msg.playerid)];
      //if there is no default character for the player, just quit.
      //the defaultCharacter() function has already warned the gm.
      if(msg.selected[0] == undefined){return;}
    }
  }

  //attempt to read the character sheet of every selected character. If there
  //is an issue, try running this function a second time. If there is no issue
  //continue forward.

  //The reason this function attempts to run a second time is due to an issue
  //roll20 api. When attempting to read the notes/bio or gmnotes of a handout
  //or character sheet, it will always return an empty string on the first
  //attempt. In the past I just asked the user to "Try Again". However, this
  //work around will have the function silently attempt to read the notes
  //a second time. If this second attempt does not work, it will warn the user
  var EmptyNotes = false;
  _.each(msg.selected, function(obj){
    //normally msg.selected is just a list of objectids and types of the
    //objects you have selected. If this is the case, find the corresponding
    //character objects.

    if(obj._type && obj._type == "graphic"){
      var graphic = getObj("graphic", obj._id);
      //be sure the graphic exists
      if(graphic == undefined) {
          return whisper("graphic undefined");
      }
      //be sure the character is valid
      var character = getObj("character",graphic.get("represents"))
      if(character == undefined){
          return whisper("character undefined");
      }
    //if using a default character, just accept the default character as the
    //the character we are working with, no need to work through tokens to
    //find this character
    }else if(obj.get("_type") == "character") {
      //record the character
      var character = obj;
    }

    //load up all the notes on the character
    var charNotes = "";
    var charGMNotes = "";
    character.get("bio",function(notes){charNotes = notes;});
    character.get("gmnotes",function(notes){charGMNotes = notes;});

    if(charNotes == "" && charGMNotes == ""){
      EmptyNotes = true;
    }
  });

  //if there is at least one character with empty notes...
  if(EmptyNotes){
    //...and this is our second attempt
    if(secondAttempt){
      //we have already rerun the function. Warn the gm and proceed anyways.
      whisper("Both the Bio and GMNotes of at least one character were empty. You may need to try again to account for Talents.", msg.playerid);
    //...and this is our first attempt
    } else {
      //retry the program in 100 milliseconds and flag it as a second attempt
      setTimout(initiativeHandler,100,matches,msg,true);
      return;
    }
  }


  //work through each selected character
  _.each(msg.selected, function(obj){
      //normally msg.selected is just a list of objectids and types of the
      //objects you have selected. If this is the case, find the corresponding
      //character objects.

      if(obj._type && obj._type == "graphic"){
        var graphic = getObj("graphic", obj._id);
        //be sure the graphic exists
        if(graphic == undefined) {
            return whisper("graphic undefined",msg.playerid);
        }
        //be sure the character is valid
        var character = getObj("character",graphic.get("represents"))
        if(character == undefined){
            return whisper("character undefined",msg.playerid);
        }
      //if using a default character, just accept the default character as the
      //the character we are working with, no need to work through tokens to
      //find this character
      }else if(obj.get("_type") == "character") {
        //record the character
        var character = obj;

        //this may not return a valid token if there is no token on any of
        //the campaign pages, but I will be restricting non-gm's to only
        //inquire about their initiative and will not allow them to modify the
        //turn tracker. Thus, they will never need this default token. This
        //default token code is just here in case a different gm wishes to
        //allow players to roll their initiative.

        //will only need a token if the user is not making a simple inquiry
        if(matches[1].indexOf("?") == -1){
          var graphic = undefined;
          //is the player on their own page?
          if(Campaign().get("playerspecificpages") && Campaign().get("playerspecificpages")[msg.playerid]){
            //attempt to find a token linked to this character on the player's
            //current page
            graphic = findObjs({
                _pageid: Campaign().get("playerspecificpages")[msg.playerid],
                _type: "graphic",
                represents: character.id
            })[0];
          }

          //if a linked graphic has not been found, try searching for it on the
          //main player page
          if(graphic == undefined){
            graphic = findObjs({
                _pageid: Campaign().get("playerpageid"),
                _type: "graphic",
                represents: character.id
            })[0];
          }
          //if no token was found on the player page, then search for any token
          //in the Campaign
          if(graphic == undefined){
            graphic = findObjs({
                _type: "graphic",
                represents: character.id
            })[0];
          }

          //if there is still no token, warn the user and gm, then exit
          whisper(character.get("name") + " does not have a token on any map in the entire campaign.", msg.playerid);
          return whisper(character.get("name") + " does not have a token on any map in the entire campaign.");

        }
      }

      //diverge based on the type of text operator specified
      //  Includes "?": Just a query and does not roll anything or edit the
      //    turn order.
      //  Includes "=": Edit's the token's previous initiative roll, if no
      //    previous roll is saved within the turn order, just make a new roll
      //    and edit that one.
      //  Otherwise: Make a new initiative roll for the character. If they
      //    already exist in the turn order, replace their previous roll. also
      //    adds in any listed modifiers.

      //is the user just making a querry?
      if(matches[1].indexOf("?") != -1){
        //find the initiative bonus of the character
        var initBonus = calcInitBonus(character);

        //warn the user and exit if the bonus does not exist
        if(initBonus == undefined){
          return whisper(character.get("name") + " did not have an Ag or Detection attribute. Initiative was not rolled.",msg.playerid);
        }

        //modify the Initiative Bonus based on the text operator
        switch(matches[1]){
          case "?+":
            initBonus += Number(matches[2]);
            break;
          case "?-":
            initBonus -= Number(matches[2]);
            break;
          case "?*":
            initBonus *= Number(matches[2]);
            break;
          case "?/":
            initBonus /= Number(matches[2]);
            break;
        }

        //Round the initiative bonus to a whole number
        initBonus = Math.round(initBonus);

        //report the initiative bonus for the character to just the user
        //exit out now that you have made this report
        return whisper(character.get("name") + "\'s Initiative: " + initBonus + " + D10",msg.playerid);
      }

      //is the gm trying to directly edit a previous initiative roll?
      if(matches[1].indexOf("=") != -1){
        //search for the selected graphic in the turn order
        var graphicListed = false;

        //step through the turn order
        for(i = 0; i < turnorder.length; i++){
            //is the token listed here?
            if(graphic.id == turnorder[i].id){
                //note that a graphic was found
                graphicListed = true;

                //edit the previous initiative roll as instructed
                //go by the text modifier
                switch(matches[1]){
                  case "=":
                    turnorder[i].pr  = Number(matches[2]);
                    break;
                  case "+=":
                    turnorder[i].pr += Number(matches[2]);
                    break;
                  case "-=":
                    turnorder[i].pr -= Number(matches[2]);
                    break;
                  case "*=":
                    turnorder[i].pr *= Number(matches[2]);
                    break;
                  case "/=":
                    turnorder[i].pr /= Number(matches[2]);
                    break;
                }

                //round the initaitive
                turnorder[i].pr = Math.round(turnorder[i].pr);

                //report the resultant initiative roll
                //report the result to everyone if it is controlled by someone
                if(character.get("controlledby") != ""){
                    sendChat("System",graphic.get("name") + " rolls a [[" + turnorder[i].pr + "]] for Initiative.");
                } else {
                    //report the result to the gm alone if it is an NPC.
                    whisper(graphic.get("name") + " rolls a [[" + turnorder[i].pr + "]] for Initiative.");
                }
            }
        }

        //as long as we found the character token listed at least once, we can
        //safely exit here.
        if(graphicListed){
          return;
        }
        //if the graphic was not listed, we will need to continue on and
        //create an entry with the intended modifications
      }

      //If we have made it to this point the user either wants to randomly
      //roll for the character's initiative, or the there was no initiative
      //value for them to edit. Therefore the system will need to randomly
      //roll a value for them to edit.

      //is the gm overwriting the initiative roll with a specific value?
      if(matches[1] == "="){
        //the bonus is equal to the modifier
        var initBonus = Number(matches[2]);
        //the roll is equal to 0, to preserve "!Init = modifier"
        var roll = 0;

      }else{
        //otherwise calculate the bonus as normal.
        var initBonus = calcInitBonus(character);
        //randomize the roll
        var roll = randomInteger(10);

        //remove "=" from the text operator so we can see how to modify the
        //initBonus
        matches[1].replace(/=/g,'');

        //modify the initiative bonus as instructed
        switch(matches[1]){
          case "+":
            initBonus += Number(matches[2]);
            break;
          case "-":
            initBonus -= Number(matches[2]);
            break;
          case "*":
            initBonus *= Number(matches[2]);
            break;
          case "/":
            initBonus /= Number(matches[2]);
            break;
        }
      }

      //round the initiative bonus
      initBonus = Math.round(initBonus);

      //report the resultant initiative roll
      //report the result to everyone if it is controlled by someone
      if(character.get("controlledby") != ""){
          sendChat("System",graphic.get("name") + " rolls a [[(" + roll.toString() + ")+" + initBonus.toString() + "]] for Initiative.");
      } else {
          //report the result to the gm alone if it is an NPC.
          whisper(graphic.get("name") + " rolls a [[(" + roll.toString() + ")+" + initBonus.toString() + "]] for Initiative.");
      }

      //create a turn object
      var turnObj = {};
      //default to no custom text
      turnObj.custom = "";
      //record the id of the token
      turnObj.id = graphic.id;
      //record the total initiative roll
      turnObj.pr = initBonus + roll;

      //what is the index of where we will insert the token? (-1 flags it as not having been set)
      var initiativeIndex = -1;
      //step through the turn order
      for(i = 0; i < turnorder.length; i++){
          //has this token already been included?
          if(turnObj.id == turnorder[i].id){
              //remove this entry
              turnorder.splice(i,1);
              //the array has shrunken, take a step back
              i--;
          //is the initiative of the new token higher AND has the initiativeIndex not been set yet?
          } else if(turnObj.pr > turnorder[i].pr && initiativeIndex == -1){
              //record the location in the array
              initiativeIndex = i;
          }
      }
      //was a place found for the initiativeIndex?
      if(initiativeIndex != -1){
          //add the turn object in the specified location
          turnorder.splice(initiativeIndex,0,turnObj);
      } else {
          //just add the turn object at the end
          turnorder.push(turnObj);
      }
  });
  Campaign().set("turnorder", JSON.stringify(turnorder));
}

//used inside initiativeHandler() multiple times, this calculates the bonus
//added to the D10 when rolling Initiative for the character/starship
function calcInitBonus(charObj){
  //if this character sheet has Detection, then it is a starship
  if(findObjs({
    _type: "attribute",
    name: "Detection",
    _characterid: charObj.id
  })[0] != undefined){
    //report the detection bonus for starships
    return Math.floor(Number(getAttrByName(charObj.id, "Detection"))/10);

  //if this character sheet has Ag, then it rolls initiative like normal.
  } else if(
    findObjs({
      _type: "attribute",
      name: "Ag",
      _characterid: charObj.id
    })[0] != undefined
  ) {
      //load up all the notes on the character
      var charNotes = "";
      var charGMNotes = "";
      charObj.get("bio",function(notes){charNotes = notes;});
      charObj.get("gmnotes",function(notes){charGMNotes = notes;});
      //add the agility bonus and unnatural agility
      var initiativeBonus = Math.floor(Number(getAttrByName(charObj.id, "Ag"))/10);
      //only add the Unnatural Ag attribute, if it exists
      if(getAttrByName(charObj.id, "Unnatural Ag")){
        initiativeBonus += Number(getAttrByName(charObj.id, "Unnatural Ag"));
      }

      //does this character have lightning reflexes?
      if(charNotes.indexOf(">Lightning Reflexes<") != -1 || charGMNotes.indexOf(">Lightning Reflexes<") != -1){
          //double their Agility Bonus
          initiativeBonus *= 2;
      }

      //is this character paranoid?
      if(charNotes.indexOf(">Paranoia<") != -1 || charGMNotes.indexOf(">Paranoia<") != -1){
          //add two to the final result
          initiativeBonus += 2;
      }

      //return the final
      return initiativeBonus;

  //neither Ag nor Detection were found. Warn the gm and exit.
  } else {
    whisper( charObj.get("name") + " did not have an Ag or Detection attribute. Initiative was not rolled.");
    return undefined;
  }
}
