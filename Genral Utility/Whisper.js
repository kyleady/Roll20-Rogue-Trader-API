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
