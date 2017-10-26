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
//attempt. In the past I just asked the user to  Again". However, this
//work around will have the function silently attempt to read the notes
//a second time. If this second attempt does not work, it will warn the user.
function initiativeHandler(matches,msg,secondAttempt){
  //get the Roll20 turn order
  var turns = new INQTurns();

  var operator = matches[1];
  var modifier = matches[2] + matches[3];

  var Promises = [];


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
      calcInitBonus(character, graphic, function(initBonus){
        //warn the user and exit if the bonus does not exist
        if(initBonus == undefined){
          return whisper(graphic.get("name") + " did not have an Ag or Detection attribute. Initiative was not rolled.", {speakingTo: msg.playerid, gmEcho: true});
        }

        //modify the Initiative Bonus based on the text operator
        initBonus = numModifier.calc(initBonus, operator, modifier);

        //report the initiative bonus for the character to just the user
        //exit out now that you have made this report
        whisper(graphic.get("name") + "\'s Initiative: " + initBonus + " + D10", {speakingTo: msg.playerid});
      });

      return;
    }

    //is the gm trying to directly edit a previous initiative roll?
    Promises.push(
      new Promise(function(resolve){
        var init = {Bonus: undefined, roll: 0};
        if(operator == "="){
          init.Bonus = Number(modifier);
        } else if(operator.indexOf("=") != -1){
          //get the initiative of the previous roll to edit, or find that it doesn't exist
          init.Bonus = turns.getInit(graphic.id);
          if(init.Bonus != undefined){
            //calculate the modified initiative
            init.roll = numModifier.calc(init.Bonus, operator, modifier) - init.Bonus;
          }
        }

        //roll initiative with modifiers
        if(init.Bonus == undefined){
          //otherwise calculate the bonus as normal.
          calcInitBonus(character, graphic, function(initBonus){
            if (initBonus != undefined) {
              //randomize the roll
              init.roll = randomInteger(10);
              //see how to modify the initBonus
              init.Bonus = numModifier.calc(initBonus, operator, modifier);
            }

            whisper(graphic.get('name') + ' rolls a [[(' + init.roll.toString() + ')+' + init.Bonus.toString() + ']] for Initiative.',
              {speakingTo: character.get('inplayerjournals').split(','), gmEcho: true});
            //add the turn
            turns.addTurn(graphic, init.Bonus + init.roll);
            resolve();
          });
          return;
        }

        whisper(graphic.get('name') + ' rolls a [[(' + init.roll.toString() + ')+' + init.Bonus.toString() + ']] for Initiative.',
          {speakingTo: character.get('inplayerjournals').split(','), gmEcho: true});
        //add the turn
        turns.addTurn(graphic, init.Bonus + init.roll);
        resolve();
      })
    );
  });

  Promise.all(Promises).catch(function(e){log(e)});
  Promise.all(Promises).then(function(){
    turns.save();
  });
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
