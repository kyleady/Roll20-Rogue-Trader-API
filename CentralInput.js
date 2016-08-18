//create a general use function which converts text to title case (capitalize
//the first letter of each word.)
String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

//general use stat modifier/reporter
//matches[0] is the same as msg.context
//matches[1] is whether or not the user is editting the max attribute (if == "max")
//matches[2] is the name of the Attribute
//matches[3] is the text operator "=", "?+", "*=", etc
//matches[4] is the sign of the modifier
//matches[5] is the modifier (numerical, current, max, or an inline roll)
function statHandler(matches,msg,options){
  //default to no options
  options = options || {};

  var isMax = matches[1].toLowerCase() == "max";
  var statName = matches[2];
  var operator = matches[3].replace("/\s/g","");
  var sign = matches[4] || "";
  //check if the modifier was randomly rolled
  if(matches[5] == "$[[0]]"){
    var modifier = msg.inlinerolls[0].results.total.toString();
  } else {
    //otherwise save the modifier without transforming it into a number yet
    var modifier = matches[5] || "";
  }

  //is the stat a public stat, shared by the entire party?
  if(options["partyStat"]){
    //overwrite msg.selected. Whatever was selected does not matter
    //we need one item in msg.selected to iterate over
    msg.selected = ["partyStat"];
  //otherwise find a default character for the player if nothing was selected
  } else if(msg.selected == undefined || msg.selected.length <= 0){
    //make the seleced array include the default character
    msg.selected = [defaultCharacter(msg.playerid)];
    //if there is no default character, just quit
    if(msg.selected[0] == undefined){return;}
  }

  //work through each selected character
  _.each(msg.selected, function(obj){
    //first check if the selected characters are being overwritten with the party stat
    if(options["partyStat"]){
      var currentAttr = attrValue(statName,{max: false});
      var maxAttr     = attrValue(statName,{max: true, alert: false});
      var name = "";
    //normally msg.selected is just a list of object ids and types of the
    //objects you have selected. If this is the case, find the corresponding
    //character objects.
    } else if(obj._type && obj._type == "graphic"){
      var graphic = getObj("graphic", obj._id);
      //be sure the graphic exists
      if(graphic == undefined) {
          return whisper("graphic undefined");
      }
      var currentAttr = attrValue(statName,{graphicid: obj._id, max: false});
      var maxAttr     = attrValue(statName,{graphicid: obj._id, max: true, alert: false});
      var name = graphic.get("name");
    //if using a default character, just accept the default character as the
    //the character we are working with
    } else if(obj.get("_type") == "character") {
      var currentAttr = attrValue(statName,{characterid: obj.id, max: false});
      var maxAttr     = attrValue(statName,{characterid: obj.id, max: true, alert: false});
      var name = obj.get("name");
    }

    //be sure the attribute we are seeking exists
    if(currentAttr == undefined){
      //attrValue should warn if something went wrong
      return;
    }

    //if the currentAttr exists but the maxAttr does not then we are likely
    //dealing with a temporary attribute that does not exist on the represented
    //character sheet.
    if(maxAttr == undefined){
      //if the user is trying to edit the maximum stat, inform them that this is
      //impossible and quit
      if(isMax || modifier == "max"){
        whisper("Temporary attributes do not have maximums to work with.");
        return;
      } else {
        maxAttr = "-";
      }
    }

    //which stat are we editing?
    if(isMax){
      var stat = maxAttr;
    } else {
      var stat = currentAttr;
    }

    //is the modifier the max or current attribute?
    if(modifier.toLowerCase() == "max"){
      var tempModifier = maxAttr;
    } else if(modifier.toLowerCase == "current"){
      var tempModifier = currentAttr;
    } else {
      var tempModifier = modifier;
    }

    //modify the stat number with the operator
    if(operator.indexOf("+") != -1){
      stat = Number(stat) + Number(sign + tempModifier);
    } else if(operator.indexOf("-") != -1){
      stat = Number(stat) - Number(sign + tempModifier);
    } else if(operator.indexOf("*") != -1){
      stat = Number(stat) * Number(sign + tempModifier);
    } else if(operator.indexOf("/") != -1){
      stat = Number(stat) / Number(sign + tempModifier);
      stat = Math.round(stat);
    } else if(operator == "="){
      stat = sign + tempModifier;
    }

    //is the user making a querry?
    if(operator.indexOf("?") != -1) {
      //add some formating to name if it isn't empty
      if(name != ""){
        name = name + "'s ";
      }
      //whisper the result of the querry to just the user
      whisper(name + "<strong>" + statName + "</strong> " + operator + " " + sign + modifier + " = " + stat.toString(),msg.playerid);
    //otherwise the user is editing the attribute
    } else if(operator.indexOf("=") != -1){
      //save the result
      if(options["partyStat"]){
        attrValue(statName,{setTo: stat, max: isMax});
      //normally msg.selected is just a list of object ids and types of the
      //objects you have selected. If this is the case, find the corresponding
      //character objects.
      } else if(obj._type && obj._type == "graphic"){
        attrValue(statName,{setTo: stat, graphicid: obj._id, max: isMax});
      //if using a default character, just accept the default character as the
      //the character we are working with
      } else if(obj.get("_type") == "character") {
        attrValue(statName,{setTo: stat, characterid: obj.id, max: isMax});
      }

      var attrTable = "<table border = \"2\" width = \"100%\">";
      //title
      attrTable += "<caption>" + statName + "</caption>";
      //label row - Current, Max
      attrTable += "<tr bgcolor = \"00E518\"><th>Current</th><th>Max</th></tr>";
      //temporary attribute row (current, max)
      attrTable += "<tr bgcolor = \"White\"><td>" + currentAttr + "</td><td>" + maxAttr + "</td></tr>";
      //end table
      attrTable += "</table>";

      //show the change
      if(isMax){
        maxAttr = stat;
      } else {
        currentAttr = stat;
      }

      attrTable += "<table border = \"2\" width = \"100%\">";
      //title (an arrow pointing to the result)
      attrTable += "<caption>|</caption>";
      attrTable += "<caption>V</caption>";
      //label row - Current, Max
      attrTable += "<tr bgcolor = \"Yellow\"><th>Current</th><th>Max</th></tr>";
      //modified attribute row (current, max)
      attrTable += "<tr bgcolor = \"White\"><td>" + currentAttr + "</td><td>" + maxAttr  + "</td></tr>";
      //end table
      attrTable += "</table>";

      if(options["partyStat"]){
        //publicly announce the change to everyone
        sendChat("player|" + msg.playerid,name + attrTable);
      } else {
        //whisper the stat change to the user and gm (but do not whisper it to the gm twice)
        whisper(name + attrTable,msg.playerid);
        if(playerIsGM(msg.playerid) == false){
          whisper(name + attrTable);
        }
      }
    }
  });
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
