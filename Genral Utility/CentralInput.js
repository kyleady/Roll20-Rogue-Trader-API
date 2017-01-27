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

//encoding function that extends URICompotent to include parenthesies, asterisk, and apostrophe
function encodeURIFixed(str){
  return encodeURIComponent(str).replace(/['()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
}

//takes the player input and tests each regex to to see if the input is recognized
//if the input is recognized, the corresponding function is called
CentralInput.input = function(msg){
  //by default assume that the input was not recognized, until we are told otherwise
  var inputRecognized = false;
  //decode any encoded msgs
  if(msg.content.indexOf("!{URIFixed}") == 0){
    msg.content = msg.content.replace("{URIFixed}","");
    msg.content = decodeURIComponent(msg.content);
  }
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
    if(msg.type == "api" && msg.playerid && getObj("player", msg.playerid)){
      CentralInput.input(msg);
    }
});
