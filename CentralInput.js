//create a general use funciton which accepts an Attribute object and a
//text opperator (along with an optional value). The function edits the
//Attribute as instructed and returns the result.
function textOperator(attriObj, operator, modifier, editMax){
  //if no attribObj is include, exit and warn the gm
  if(attriObj == undefined){
    return whisper("textOperator() was used on an undefined object.")
  }

  //if no operator was included, default the query operator "?"
  operator = operator || "?";
  //if no modifier was included, default to 0
  modifier = modifier || 0;
  //if the editMax flag was not included, assume they do not want to edit the
  //max value of the attribute
  editMax = editMax || false;

  //if the modifier was "max", use the attribute's max value
  if(modifier.toLowerCase() == "max"){
    modifier = attriObj.get("max");
  } else{
    //otherwise, be sure it is a number and not a string
    modifier = Number(modifier);
  }


  //if the user did wish to edit the max value of the attribute, not that for
  //ease of use
  if(editMax){
    attrProperty = "max";
  } else {
    //otherwise just edit the current value
    attrProperty = "current";
  }

  //proceed based on the operator specified
  switch(operator){
    case "=":
      //set the value to the modifier
      attriObj.set(attrProperty, modifier);
      break;
    case "+=":
      //add the modifier to the value
      attriObj.set(attrProperty, Math.round(Number(attriObj.get(attrProperty)) + modifier));
      break;
    case "-=":
      //subtract the modifier from the value
      attriObj.set(attrProperty, Math.round(Number(attriObj.get(attrProperty)) - modifier));
      break;
    case "*=":
      //multiply the value by the modifier
      attriObj.set(attrProperty, Math.round(Number(attriObj.get(attrProperty)) * modifier));
      break;
    case "/=":
      //divide the value by the modifier
      attriObj.set(attrProperty, Math.round(Number(attriObj.get(attrProperty)) / modifier));
      break;
    case "?+":
      //report what the value is + the modifier
      return Math.round(Number(attriObj.get(attrProperty)) + modifier);
      break;
    case "?-":
      //report what the value is - the modifier
      return Math.round(Number(attriObj.get(attrProperty)) - modifier);
      break;
    case "?*":
      //report what the value is * the modifier
      return Math.round(Number(attriObj.get(attrProperty)) * modifier);
      break;
    case "?/":
      //report what the value is * the modifier
      return Math.round(Number(attriObj.get(attrProperty)) / modifier);
      break;
    default:
      //by default, just report what the attribute is
      return attriObj.get(attrProperty);
      break;
  }

  //if the function has not already exited with a report AND the max value was
  //editted, reset the current value to the max value
  if(editMax){
    attriObj.set("current",attriObj.get("max"));
  }

  //report what the value is now
  return attriObj.get("current");
}


//create a general use function to whisper a reply to a playerid
function whisper(content, speakingTo, speakingAs){
  //speakingAs is the character sending this message, by default this is
  //"System"
  speakingAs = speakingAs || "System";

  //the content is the message being sent. This function will not execute if it
  //is empty. Send a warning to the gm
  if(content == undefined || content == ""){
    return sendChat(speakingAs, "/w gm whisper() attempted to send an empty message.");
  }

  //speakingTo the player we are whispering to. If the player is not included,
  //sendReply will send the message to the gm
  //this function will convert the playerid into their display name
  if(speakingTo){
    //be sure the player exists
    if(getObj("player",speakingTo)){
      return sendChat(speakingAs, "/w \"" + getObj("player",speakingTo).get("_displayname") + "\" " + content );
    } else {
      return sendChat(speakingAs, "/w gm The playerid  " + speakingTo + " was not recognized and the following msg failed to be delivered: " + content );
    }
  } else {
    return sendChat(speakingAs, "/w gm " + content );
  }
}


//often times players will forget to select their character when using various
//api commands. This function searches for a default charactersheet for this
//player. A charactersheet with a controlledby field that is controlled by that
//player and no one else is recognized as a potential candidate. If there is
//exactly one candidate character, that charactersheet is returned as the
//default charactersheet. Otherwise, a whisper is sent to the gm with a list of
//the qualifying candidates (even an empty list). The return is then undefined.
//Therefore, you should have your code check to see if the default character is
//valid before proceeding.

//If you would like a player to control a character (such as an ally), without
//it being confused as a default, just add yourself to the list of people that
//controls that character/ally.
function defaultCharacter(playerid){
  //create an array to hold all of the candidate characters
  var candidateCharacters = findObjs({
    _type: "character",
    controlledby: playerid
  });
  //check if there is exactly one candidate
  if(candidateCharacters.length == 1){
    //return the default Character
    return candidateCharacters[0];
  } else if(candidateCharacters.length <= 0) {
    //report that there are no valid candidates for player: playerid
    whisper("No default character candidates were found for " + getObj("player",playerid).get("_displayname") + ".");
  } else {
    //report that there are too many candidates to choose from
    whisper("Too many default character candidates were found for " + getObj("player",playerid).get("_displayname") + ". Please refer to the api output console for a full listing of those characters");
    log("Too many default character candidates for "  + getObj("player",playerid).get("_displayname") + ".")
    for(i = 0; i < candidateCharacters.length; i++){
      log("(" + (i+1) + "/" + candidateCharacters.length + ") " + candidateCharacters[i].get("name"))
    }
  }

}

//a single object to handle all of the user api inputs. A list of commands
//and corresponding functions can be added. If an api input (any input starting
//with an !) is not recognized by this input function, it will warn the user.

//create the CentralInput object
CentralInput = {};
CentralInput.Commands = [];

//create a function that saves a command (regex, the resulting function, and if
//players can use the command) in the CentralInput's list of Commands
CentralInput.addCMD = function(cmdregex, cmdaction, cmdpublic){
    //cmdRegex is the regex used to detect when this command is being input by the user
    //there is no default for cmdRegex, if it is not found addCMD will shout
    //a warning to the gm and quit.
    if(cmdregex == undefined){return whisper("A command with no regex could not be included in CentralInput.js.");}

    //cmdAction is the function used when the regex is found in an input.
    //there is no default for cmdAction, if it is not found addCMD will shout a
    //warning to the gm and quit.
    if(cmdregex == undefined){return whisper("A command with no function could not be included in CentralInput.js.");}

    //cmdPublic is a boolean dictating if players can use the command (true) or
    //if only the gm can use the command (false)
    //by default cmdPublic is false
    cmdpublic = cmdpublic || false;

    //Create a temporary command
    var Command = {cmdRegex: cmdregex, cmdAction:cmdaction, cmdPublic: cmdpublic};

    //add the command to the CentralInput Command list
    this.Commands.push(Command);
}

//takes the player input and tests each regex to to see if the input is recognized
//if the input is recognized, the corresponding function is called
CentralInput.input = function(msg){
  //by default assume that the input was not recognized, until we are told otherwise
  var inputRecognized = false;

  //step through every Command, testing each one
  for(i = 0; i < this.Commands.length; i++){
    //is the msg recognized by this command?
    //AND is this a public command || is the user a gm?
    if(this.Commands[i].cmdRegex.test(msg.content)
    && (this.Commands[i].cmdPublic || playerIsGM(msg.playerid)) ){
      //note that the input was recognized by at least one command
      inputRecognized = true;

      //run the function associated with this command using the regex of the msg as the input
      this.Commands[i].cmdAction(msg.content.match(this.Commands[i].cmdRegex),msg);

      //I will not stop searching here as multiple commands may be overlapping.
      //The gm should watch for this and correct for it.
    }
  }

  //once we have looked through the commands, warn the user if the input was not
  //recognized
  if(inputRecognized == false){
    whisper("The command " + msg.content + " was not recognized.", msg.playerid);
  }
}

//check every api input to see if it matches a recorded command
on("chat:message", function(msg) {
    //be sure the msg was an api command
    //be sure the message came from a user
    if(msg.type == "api" && msg.playerid && getObj("player",msg.playerid)){
        CentralInput.input(msg);
    }
});
