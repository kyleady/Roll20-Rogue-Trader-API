//toggles whether or not each selected graphic is frenzied and modifies their
//stats accordingly using the statHandler function
function getFrenzied(matches,msg){
  //are we frenzying everyone we have selected?
  frenzyTokens = matches[1].toLowerCase() != "un"
  //we will be editting the current stat of characters only
  matches[1] = "";
  //be prepared to reverse all stat modifications if we are unfrenzying tokens
  if(frenzyTokens){
    matches[4] = "";
  } else {
    matches [4] = "-";
  }

  //make a list of the characters that will have their attributes modified
  toBeModified = [];

  //check each selected character to see if they
  eachCharacter(msg, function(character, graphic){
    //start by assuming we will not be modifying this
    //if we are un-frenzying the token, be sure it was already frenzied
    if(!frenzyTokens && graphic.get("status_red")){
      graphic.set("status_red",false);
      whisper(graphic.get("name") + " is no longer frenzied.",msg.playerid);
      //add this character to the list of characters to have their stats modified
      toBeModified.push(graphic);
    //if we are frenzying the token, be sure it wasn't already frenzied
    } else if(frenzyTokens && !graphic.get("status_red")) {
      graphic.set("status_red",true);
      whisper(graphic.get("name") + " is frenzied!",msg.playerid);
      //add this character to the list of characters to have their stats modified
      toBeModified.push(graphic);
    }
  });

  //alert the gm if nothing will happen
  if(toBeModified.length <= 0){
    if(frenzyTokens) {
      whisper("No tokens were frenzied.");
    } else {
      whisper("No tokens were unfrenzied.");
    }
    return;
  }

  //modify the attributes of all the tokens that had their frenzy status changed

  //limit the selected tokens to only those that
  msg.selected = toBeModified;

  //increased stats
  matches[2] = "WS";
  matches[3] = "+=";
  matches[5] = "10";
  statHandler(matches, msg, {show: false});
  matches[2] = "S";
  statHandler(matches, msg, {show: false});
  matches[2] = "T";
  statHandler(matches, msg, {show: false});
  matches[2] = "Wp";
  statHandler(matches, msg, {show: false});

  //decreased stats
  matches[2] = "BS";
  matches[3] = "-=";
  matches[5] = "20";
  statHandler(matches, msg, {show: false});
  matches[2] = "It";
  statHandler(matches, msg, {show: false});
}

//adds the commands after CentralInput has been initialized
on("ready", function() {
  //Lets players make characters frenzied
  CentralInput.addCMD(/^!\s*(un|)Frenzy\s*$/i,getFrenzied,true);
});
