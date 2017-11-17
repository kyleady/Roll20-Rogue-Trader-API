function returnPlayers(matches, msg){
  var playerPages = Campaign().get('playerspecificpages');
  if(!playerPages) return whisper('There are no players to return from their player specific pages.');
  var playerPhrases = matches[1] || '';
  var players = [];
  if(/^\s*$/.test(playerPhrases)){
    for(var playerid in playerPages){
      players.push(getObj('player', playerid));
    }
  } else {
    players = suggestCMD('!return $', playerPhrases.split(','), msg.playerid, 'player', function(obj){
      if(playerPages[player.id] != undefined) {
        return true;
      } else {
        whisper('*' + player.get('_displayname') + '* is not on a player specific page.')
        return false;
      }
    });

    if(!players) return;
  }

  _.each(players, function(player){
    delete playerPages[player.id];
    whisper('*' + player.get('_displayname') + '* has returned to the main party.');
  });

  if(_.isEmpty(playerPages)){
    Campaign().set('playerspecificpages', false);
  } else {
    Campaign().set('playerspecificpages', playerPages);
  }
}

on('ready',function(){
  CentralInput.addCMD(/^!\s*return(?:\s([^\|\[\]]+))?$/i, returnPlayers);
});
