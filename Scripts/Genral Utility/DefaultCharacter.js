//often times players will forget to select their character when using various
//api commands. This function searches for a default charactersheet for this
//player. A charactersheet with a controlledby field that is controlled by that
//player and no one else is recognized as a potential candidate. If there is
//exactly one candidate character, that charactersheet is returned as the
//default charactersheet. Otherwise, a whisper is sent to the gm with a list of
//the qualifying candidates (even an empty list). The return is then undefined.
//Therefore, you should have your code check to see if the default character is
//valid before proceeding.

//If you would like a player to control a character (such as a pet), without it
//being confused as the default for that player, just add the GM to the list
//of people that controls that pet/ally/etc.

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
