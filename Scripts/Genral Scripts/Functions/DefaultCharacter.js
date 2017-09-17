function defaultCharacter(playerid){
  var candidateCharacters = findObjs({
    _type: 'character',
    controlledby: playerid
  });
  if(candidateCharacters && candidateCharacters.length == 1){
    return candidateCharacters[0];
  } else if(!candidateCharacters || candidateCharacters.length <= 0) {
    var player = getObj('player', playerid);
    var playername = '[' + playerid + ']';
    if(player) playername = player.get('_displayname');
    whisper('No default character candidates were found for ' + playername + '.');
  } else {
    var player = getObj('player', playerid);
    var playername = '[' + playerid + ']';
    if(player) playername = player.get('_displayname');
    whisper('Too many default character candidates were found for ' + playername + '. Please refer to the api output console for a full listing of those characters');
    log('Too many default character candidates for '  + playername + '.');
    for(var i = 0; i < candidateCharacters.length; i++){
      log('(' + (i+1) + '/' + candidateCharacters.length + ') ' + candidateCharacters[i].get('name'))
    }
  }
}
