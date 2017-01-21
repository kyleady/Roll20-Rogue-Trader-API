//create a general use function to whisper a reply to a playerid
function whisper(content, speakingTo, speakingAs, options){
  //speakingAs is the character sending this message, by default this is
  //"System"
  speakingAs = speakingAs || "INQ";

  //the content is the message being sent. This function will not execute if it
  //is empty. Send a warning to the gm
  if(content == undefined || content == ""){
    return whisper("whisper() attempted to send an empty message.");
  }

  //be sure the extra options exist
  options = options || {};
  //default the noarchive option to true
  if(options.noarchive == undefined){
    options.noarchive = true;
  }

  //speakingTo - the player we are whispering to. If the player is not included,
  //sendReply will send the message to the gm
  if(speakingTo){
    //be sure the player exists
    if(getObj("player",speakingTo)){
      return sendChat(speakingAs, "/w \"" + getObj("player",speakingTo).get("_displayname") + "\" " + content, null, options );
    } else {
      return whisper("The playerid " + speakingTo + " was not recognized and the following msg failed to be delivered: " + content);
    }
  } else {
    return sendChat(speakingAs, "/w gm " + content, null, options);
  }
}

//create a general use function for having the system make a public announcement
function announce(content, speakingAs, options){
  //speakingAs is the character sending this message, by default this is
  //"System"
  speakingAs = speakingAs || "INQ";

  //the content is the message being sent. This function will not execute if it
  //is empty. Send a warning to the gm
  if(content == undefined || content == ""){
    return whisper("whisper() attempted to send an empty message.");
  }

  //be sure the extra options exist
  options = options || {};
  //default the noarchive option to true
  if(options.noarchive == undefined){
    options.noarchive = true;
  }

  sendChat(speakingAs, content, null, options);
}
