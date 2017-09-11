//a function which rolls initiative for every selected character. Once rolled it
//adds the character to the roll20 turn tracker. If the character is already
//listed on the turn tracker, they will be replaced. Character and vehicle
//initiative is determined by Agility. Starship initiative is determined by
//Detection. Currently, initiativeHandler reads the associated Character Sheets
//of the tokens and accounts for
  //Lightning Reflexes
  //Paranoia

//matches[0] is the same as mgs.content
//matches[1] is the text operator "=", "+=", "?", "?/", etc
//matches[2] is the sign of the modifier
//matches[3] is the absolute value of the modifier

//secondAttempt is a flag showing that this function has been attempted once
//  before, so as to prevent an infinite loop

//The reason this function attempts to run a second time is due to an issue with
//the roll20 api. When attempting to read the notes/bio or gmnotes of a handout
//or character sheet, it will always return an empty string on the first
//attempt. In the past I just asked the user to "Try Again". However, this
//work around will have the function silently attempt to read the notes
//a second time. If this second attempt does not work, it will warn the user.
function initiativeHandler(matches,msg,secondAttempt){
  //get the Roll20 turn order
  var turns = new INQTurns();

  var operator = matches[1];
  var modifier = matches[2] + matches[3];

  //work through each selected character
  eachCharacter(msg, function(character, graphic){
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
    if(operator.indexOf("?") != -1){
      //find the initiative bonus of the character
      var initBonus = calcInitBonus(character, graphic);
      //warn the user and exit if the bonus does not exist
      if(initBonus == undefined){
        return whisper(graphic.get("name") + " did not have an Ag or Detection attribute. Initiative was not rolled.", {speakingTo: msg.playerid, gmEcho: true});
      }

      //modify the Initiative Bonus based on the text operator
      initBonus = numModifier.calc(initBonus, operator, modifier);

      //report the initiative bonus for the character to just the user
      //exit out now that you have made this report
      return whisper(graphic.get("name") + "\'s Initiative: " + initBonus + " + D10", {speakingTo: msg.playerid});
    }

    //is the gm trying to directly edit a previous initiative roll?
    if(operator.indexOf("=") != -1){
      //get the initiative of the previous roll to edit, or find that it doesn't exist
      var initBonus = turns.getInit(graphic.id);
      if(initBonus != undefined){
        //calculate the modified initiative
        var roll = numModifier.calc(initBonus, operator, modifier) - initBonus;
      }
    }

    //is the gm deciding what the initiative is?
    if(operator == "="){
      //the total roll is equal to the modifier
      var initBonus = Number(modifier);
      var roll = 0;
    }

    //roll initiative with modifiers
    if(initBonus == undefined){
      //otherwise calculate the bonus as normal.
      var initBonus = calcInitBonus(character, graphic);
      //randomize the roll
      var roll = randomInteger(10);
      //see how to modify the initBonus
      initBonus = numModifier.calc(initBonus, operator, modifier);
    }

    //report the resultant initiative roll
    //report the result to everyone if it is controlled by someone
    if(character.get("controlledby") != ""){
        announce(graphic.get("name") + " rolls a [[(" + roll.toString() + ")+" + initBonus.toString() + "]] for Initiative.");
    } else {
        //report the result to the gm alone if it is an NPC.
        whisper(graphic.get("name") + " rolls a [[(" + roll.toString() + ")+" + initBonus.toString() + "]] for Initiative.");
    }

    //create a turn object
    var turnObj = turns.toTurnObj(graphic, initBonus + roll);
    //add the turn
    turns.addTurn(turnObj);
  });

  //save the resulting turn order
  turns.save();
}

//used inside initiativeHandler() multiple times, this calculates the bonus
//added to the D10 when rolling Initiative for the character/starship
function calcInitBonus(charObj, graphicObj){
  //if this character sheet has Detection, then it is a starship
  if(findObjs({
    _type: "attribute",
    name: "Detection",
    _characterid: charObj.id
  })[0] != undefined){
    //report the detection bonus for starships
    var Detection = Number(attributeValue("Detection", {characterid: charObj.id, graphicid: graphicObj.id}));
    return Math.floor(Detection/10);

  //if this character sheet has Ag, then it rolls initiative like normal.
  } else if(
    findObjs({
      _type: "attribute",
      name: "Ag",
      _characterid: charObj.id
    })[0] != undefined
  ) {
      //load up all the notes on the character
      var inqcharacter = new INQCharacter(charObj, graphicObj);
      var Agility = Number(attributeValue("Ag", {characterid: charObj.id, graphicid: graphicObj.id}));
      //add the agility bonus and unnatural agility
      var initiativeBonus = Math.floor(Agility/10);
      //only add the Unnatural Ag attribute, if it exists
      var UnnaturalAgility = Number(attributeValue("Unnatural Ag", {characterid: charObj.id, graphicid: graphicObj.id}));
      if(UnnaturalAgility){
        initiativeBonus += UnnaturalAgility;
      }

      //does this character have lightning reflexes?
      if(inqcharacter.has("Lightning Reflexes", "Talents")){
          //double their Agility Bonus
          initiativeBonus *= 2;
      }

      //is this character paranoid?
      if(inqcharacter.has("Paranoia", "Talents")){
          //add two to the final result
          initiativeBonus += 2;
      }

      //return the final result
      return initiativeBonus;

  //neither Ag nor Detection were found. Warn the gm and exit.
  } else {
    whisper( graphicObj.get("name") + " did not have an Ag or Detection attribute. Initiative was not rolled.");
    return undefined;
  }
}

function INQTurns(){

  //determine if the turn order is in descending order, but treat it as a loop
  this.isDescending = function(){
    var prev = undefined;
    var first = undefined;
    var LargestIndex = this.largestIndex();
    for(var i = 0; i < this.turnorder.length; i++){
      if(!(prev == undefined ||
        Number(this.turnorder[i].pr) <= prev ||
        i == LargestIndex)){
        return false;
      }
      if(first == undefined){
        first = Number(this.turnorder[i].pr);
      }
      prev = Number(this.turnorder[i].pr);
    }
    if(LargestIndex == 0 || first <= prev || this.turnorder.length == 0){
      return true;
    } else {
      return false;
    }
  }

  //delete any turns that share the given graphic id
  this.removeTurn = function(graphicid){
    //step through the turn order and delete any previous initiative rolls
    for(var i = 0; i < this.turnorder.length; i++){
      //has this token already been included?
      if(graphicid == this.turnorder[i].id){
        //remove this entry
        this.turnorder.splice(i, 1);
        //the array has shrunken, take a step back
        i--;
      }
    }
  }

  //return the index of the largest turn value
  this.largestIndex = function(){
    var largestIndex = undefined;
    var largest = undefined;

    for(var i = 0; i < this.turnorder.length; i++){
      if(largest == undefined || Number(this.turnorder[i].pr) > largest){
        largest = Number(this.turnorder[i].pr);
        largestIndex = i;
      }
    }

    return largestIndex;
  }

  //add or replace a turn
  this.addTurn = function(turnobj){
    //delete any previous instances of this character
    this.removeTurn(turnobj.id);
    //be sure the turns are properly ordered
    if(this.isDescending()){
      //determine where a new turn starts
      var startIndex = this.largestIndex();
      //if the array is empty, just add the turn
      if(startIndex == undefined){
        return this.turnorder.push(turnobj);
      }
      var turnAdded = false;
      for(var i = startIndex; i < this.turnorder.length; i++){
        if(this.higherInit(turnobj, this.turnorder[i])){
          //insert the turn here
          this.turnorder.splice(i, 0, turnobj);
          turnAdded = true;
          break;
        }
      }

      if(!turnAdded){
        for(var i = 0; i < startIndex; i++){
          if(this.higherInit(turnobj, this.turnorder[i])){
            //insert the turn here
            this.turnorder.splice(i, 0, turnobj);
            turnAdded = true;
            break;
          }
        }
      }
      if(!turnAdded){
        if(startIndex == 0){
          this.turnorder.push(turnobj);
        } else {
          this.turnorder.splice(startIndex, 0, turnobj);
        }
      }
    } else {
      //just add the turn on the end
      this.turnorder.push(turnobj);
    }
  }

  this.higherInit = function(newTurn, turn){
    //does the turn we are inserting (newTurn) have greater initiative than the currently examined turn (turn)?
    if(Number(newTurn.pr) > Number(turn.pr)){
      return true;
    //is their initiative the same?
    } else if(Number(newTurn.pr) == Number(turn.pr)){
      //be sure the tokens represent characters
      var challengerAg = undefined;
      var championAg = undefined;
      var challengerCharacter = undefined;
      var championCharacter = undefined;
      var challengerID = newTurn.id;
      var championID = turn.id;
      //only load up the Ag/Detection if the characters exist
      if(challengerID != undefined && championID != undefined){
        challengerAg = attributeValue("Ag", {graphicid: challengerID});
        championAg = attributeValue("Ag", {graphicid: championID});
        //the character may not have an Agility attribute, try Detection
        if(challengerAg == undefined){
          challengerAg = attributeValue("Detection", {graphicid: challengerID});
        }
        //the character may not have an Agility attribute, try Detection
        if(championAg == undefined){
          championAg = attributeValue("Ag", {graphicid: championID});
        }
      }
      //if actual values were found for Ag/Detection for both of them, compare the two
      if(championAg != undefined && challengerAg != undefined){
        //if the challenger has greater agility (or == and rolling a 2 on a D2)
        if(challengerAg > championAg
        || challengerAg == championAg && randomInteger(2) == 1){
          return true;
        }
      }
    }

    //if it has not returned true yet, return false
    return false;
  }

  //creates a turn object for the listed graphic and initiative roll
  this.toTurnObj = function(graphic, initiative, custom){
    //create a turn object
    var turnObj = {};
    //default to no custom text
    turnObj.custom = custom || "";
    //record the id of the token
    turnObj.id = graphic.id;
    //record the total initiative roll
    turnObj.pr = initiative;
    if(typeof turnObj.pr == "number"){
      //record it as a string (as that is what it normally is)
      turnObj.pr = turnObj.pr.toString();
    }
    //record the page id
    turnObj._pageid = graphic.get("_pageid");

    return turnObj;
  }

  //get the initiative roll of a turn already in the turn order
  this.getInit = function(graphicid){
    for(var i = 0; i < this.turnorder.length; i++){
      if(graphicid == this.turnorder[i].id){
        return Number(this.turnorder[i].pr);
      }
    }
    //nothing was found, return undefined
    return undefined;
  }

  //save the turn order in the Campaign
  this.save = function(){
    Campaign().set("turnorder", JSON.stringify(this.turnorder));
  }

  //get the JSON string of the turn order and make it into an array
  if(Campaign().get("turnorder") == ""){
    //We check to make sure that the turnorder isn't just an empty string first. If it is treat it like an empty array.
    this.turnorder = [];
  } else{
    //otherwise turn the turn order into an array
    this.turnorder = carefulParse(Campaign().get("turnorder")) || {};
  }
}

//adds the commands after CentralInput has been initialized
on("ready",function(){
  //matches[0] is the same as msg.content
  //matches[1] is the text operator "=", "+=", "?", "?/", etc
  //matches[2] is the sign of the modifier
  //matches[3] is the absolute value of the modifier

  //lets the user quickly view their initiative bonus with modifiers
  CentralInput.addCMD(/^!\s*init(?:iative)?\s*(\?\+|\?-|\?\*|\?\/)\s*(|\+|-)\s*(\d+)\s*$/i,initiativeHandler,true);
  //same as above, except this is a querry without any modifiers
  CentralInput.addCMD(/^!\s*init(?:iative)?\s*(\?)()()$/i,initiativeHandler,true);

  //similar to above, but allows the gm to roll and edit initiative with modifiers
  CentralInput.addCMD(/^!\s*init(?:iative)?\s*(\+|-|\*|\/|=|\+=|-=|\*=|\/=)\s*(|\+|-)\s*(\d+)\s*$/i,initiativeHandler);
  //similar to above, but allows the gm to roll and edit initiative without modifiers
  CentralInput.addCMD(/^!\s*init(?:iative)?\s*()()()$/i,initiativeHandler);
  //allow the gm to clear the turn tracker
  CentralInput.addCMD(/^!\s*init(?:iative)?\s+(clear|reset)$/i, function(){
    Campaign().set("turnorder", "");
    whisper("Initiative cleared.")
  });
});
