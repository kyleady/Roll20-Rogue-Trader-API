//create a general use function which converts text to title case (capitalize
//the first letter of each word.)
String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

//create a general use funciton which accepts an Attribute object and a
//text opperator (along with an optional value). The function edits the
//Attribute as instructed and returns the result in the form of a table

//if the textOperator is a querry, one table with the temporarily
//modified attribute will be shown. If the text operator edits the
//attribute, two tables will be shown, one of the attribute before
//modification, the other of the attribute after modification
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
  if(modifier && modifier.toLowerCase() == "max"){
    modifier = attriObj.get("max");
  //if the modifier was "current" use the attribute's current value
  } else if(modifier && modifier.toLowerCase() == "current"){
    modifier = attriObj.get("current");
  }

  //if we are going to perform mathematical operations with the modifier, we
  //should put it into number format and not a string
  if(operator != "=" && operator != "?"){
    modifier = Number(modifier);
  }

  //if the user did wish to edit the max value of the attribute, not that for
  //ease of use
  if(editMax){
    attrProperty = "max";
  } else {
    //otherwise just edit the current value (default)
    attrProperty = "current";
  }

  //save temporary values for the current and maximum
  var tempAttribute = [];
  tempAttribute["current"] = attriObj.get("current");
  tempAttribute["max"] = attriObj.get("max");

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
      //edit the temporary attribute
      tempAttribute[attrProperty] = Number(tempAttribute[attrProperty]) + modifier;
      break;
    case "?-":
      //edit the temporary attribute
      tempAttribute[attrProperty] = Number(tempAttribute[attrProperty]) - modifier;
      break;
    case "?*":
      //edit the temporary attribute
      tempAttribute[attrProperty] = Number(tempAttribute[attrProperty]) * modifier;
      break;
    case "?/":
      //edit the temporary attribute
      tempAttribute[attrProperty] = Number(tempAttribute[attrProperty]) / modifier;
      break;
    //by default do not modify anything
  }

  //if the max value was editted, reset the current value to the max value
  if(editMax){
    attriObj.set("current",attriObj.get("max"));
  }

  //create a table to display the temporary attribte
  //if this is just a querry, it will show the modified attribute
  //if this is an edit, it will show the attribute before modification
  //begin table
  var attrTable = "<table border = \"2\" width = \"100%\">";
  //title
  attrTable += "<caption>" + attriObj.get("name") + "</caption>";
  //label row - Current, Max
  attrTable += "<tr bgcolor = \"00E518\"><th>Current</th><th>Max</th></tr>";
  //temporary attribute row (current, max)
  attrTable += "<tr bgcolor = \"White\"><td>" + tempAttribute["current"] + "</td><td>" + tempAttribute["max"]  + "</td></tr>";
  //end table
  attrTable += "</table>";

  //if this is an edit, show the resultant attribute as well
  if(operator.indexOf("=") != -1){
      attrTable += "<table border = \"2\" width = \"100%\">";
      //title (an arrow pointing to the result)
      attrTable += "<caption>|</caption>";
      attrTable += "<caption>V</caption>";
      //label row - Current, Max
      attrTable += "<tr bgcolor = \"Yellow\"><th>Current</th><th>Max</th></tr>";
      //modified attribute row (current, max)
      attrTable += "<tr bgcolor = \"White\"><td>" + attriObj.get("current") + "</td><td>" + attriObj.get("max")  + "</td></tr>";
      //end table
      attrTable += "</table>";
  }

  //report the table
  return attrTable;
}


//general use stat modifier/reporter
//matches[0] is the same as msg.context
//matches[1] is whether or not the user is editting the max attribute (if == "max")
//matches[2] is the name of the Attribute
//matches[3] is the text operator "=", "?+", "*=", etc
//matches[4] is the sign of the modifier
//matches[5] is the modifier (numerical, current, max, or an inline roll)
function statHandler(matches,msg){
  //remove any spaces from the texp operator
  matches[3] = matches[3].replace(/ /,"");
  //find a default character for the player if nothing was selected
  if(msg.selected == undefined || msg.selected.length <= 0){
    //make the seleced array include the default character
    msg.selected = [defaultCharacter(msg.playerid)];
    //if there is no default character, just quit
    if(msg.selected[0] == undefined){return;}
  }

  //check if the modifier was randomly rolled
  if(matches[5] == "$[[0]]"){
    matches[5] = msg.inlinerolls[0].results.total.toString();
    //overwrite the sign of the modifier with 0 so that any addition done will
    //be leave matches[5] unaffected
    matches[4] = "";
  }

  //make the max indicator lowercase
  matches[1] = matches[1].toLowerCase();

  //work through each selected character
  _.each(msg.selected, function(obj){
    //normally msg.selected is just a list of ids and types of the objects you
    //have selected. If this is the case, find the corresponding character
    //objects.

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
    //the character we are working with
    }else if(obj.get("_type") == "character") {
      var character = obj;
    }

    //exit if the character does not have the designated attribute
    var Attribs = findObjs({type: 'attribute', characterid: character.id, name: matches[2]});
    if(Attribs.length <= 0){
      //while exiting, tell the user which character did not have the Attribute
      return whisper(character.get("name") + " does not have a(n) " + matches[2]  + " Attribute!", msg.playerid);
    }

    //is the user making a querry?
    if(matches[3].indexOf("?") != -1) {
      //whisper the result of the querry to just the user
      whisper(character.get("name")  + textOperator(Attribs[0],matches[3],matches[4] + matches[5],matches[1] == "max"),msg.playerid);
    //otherwise the user is editing the attribute
    } else{
      //whisper the stat change to the user and gm (but do not whisper it to the gm twice)
      whisper(character.get("name")  + textOperator(Attribs[0],matches[3],matches[4] + matches[5],matches[1] == "max"),msg.playerid);
      if(playerIsGM(msg.playerid) == false){
        whisper(character.get("name")  + textOperator(Attribs[0],matches[3],matches[4] + matches[5],matches[1] == "max"));
      }
    }
  });
}

//allows players to quickly view and edit attributes that represent the entire
//party. The assumption is that only one of these attributes exists in the
//entire campaign. It therefore searches for that attribute and works with it.
//matches[0] is the same as msg.content
//matches[1] is either "" or "max" for working with the max of the attribute
//matches[2] is the name of the attribute
//matches[3] is the text operator "=", "?+", "*=", etc
//matches[4] is the sign of the modifier
//matches[5] is the absolute value of the modifier
function partyStatHandler(matches,msg){
  //find the party attribute
  var partyStatObjs = findObjs({
    _type: "attribute",
    name: matches[2]
  });
  //are there no which attributes which match the name matches[2]?
  if(partyStatObjs.length <= 0){
    //no stat to work with. alert the gm and player
    whisper("There is nothing in the campaign with a(n) " + matches[2] + " Attribute.",msg.playerid);
    //but don't alert the gm twice
    if(playerIsGM(msg.playerid) == false){
      whisper("There is nothing in the campaign with a(n) " + matches[2] + " Attribute.");
    }
    return;
  //were there too many attributes that matched the name matches[2]?
  } else if(partyStatObjs.length >= 2){
    //warn the gm, but continue forward
    whisper("There were multiple " + matches[2] + " attributes. Using the first one found. A log has been posted in the terminal.")
    log(matches[2] + " Attributes")
    log(partyStatObjs)
  }

  //check if the modifier was randomly rolled
  if(matches[5] == "$[[0]]"){
    matches[5] = msg.inlinerolls[0].results.total.toString();
    //overwrite the sign of the modifier with 0 so that any addition done will
    //be leave matches[5] unaffected
    matches[4] = "";
  }

  //make the max indicator lowercase
  matches[1] = matches[1].toLowerCase();
  //is the user making a querry?
  if(matches[3].indexOf("?") != -1) {
    whisper(textOperator(partyStatObjs[0],matches[3],matches[4] + matches[5],matches[1] == "max"),msg.playerid);
  //is the user modifying the public stat?
  } else {
    //get a list of players that can see the character sheet
    var viewerList = getObj("character",partyStatObjs[0].get("_characterid")).get("inplayerjournals").split(",");
    //save the result
    var partyStatChange = textOperator(partyStatObjs[0],matches[3],matches[4] + matches[5],matches[1] == "max");
    //if "all" was found, tell everyone
    if(viewerList.indexOf("all") != -1){
      sendChat("player|" + msg.playerid,partyStatChange);
    } else {
      //whisper to each owning player that is not a gm
      _.each(viewerList, function(viewer){
        if(playerIsGM(viewer) == false){
          whisper(partyStatChange,viewer);
        }
        //inform the gm as well
        whisper(partyStatChange);
      });
    }
  }
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
    for(var i = 0; i < candidateCharacters.length; i++){
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
  for(var i = 0; i < this.Commands.length; i++){
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
    whisper("The command " + msg.content + " was not recognized. See " + GetLink("!help") + " for a list of commands.", msg.playerid);
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
