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
      if (initBonus == undefined) return;
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
