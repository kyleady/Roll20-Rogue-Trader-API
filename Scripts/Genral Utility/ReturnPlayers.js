function returnPlayers(matches, msg){
  var playerPages = Campaign().get('playerspecificpages');
  if(!playerPages) return whisper('There are no players to return from their player specific pages.');
  var playersToReturn = [];
  for(var player in playerPages){
    playersToReturn.push(player);
  }

  var playerPhrase = matches[1] || '';
  var playerKeywords = playerPhrase.split(' ');

  var playerResults = matchingObjs(['player'], playerKeywords);
  var characterResults = matchingObjs(['character'], playerKeywords, function(obj){
    var owners = obj.get('controlledby').split(',')
    return !(owners.length != 1 || owners[0] == 'all' || playerIsGM(owners[0]))
  });

  _.each(characterResults, function(character){
    var newPlayerID = true;
    var playerID = character.get('controlledby');
    for(var i = 0; i < playerResults.length; i++){
      if(playerResults[i].id == playerID){
        newPlayerID = false;
        break;
      }
    }
    if(newPlayerID){
      playerResults.push(getObj('player', playerID));
    }
  });

  if(!playerResults.length && playerPhrase) return whisper('No matching players were found.');

  playerResults = trimToPerfectMatches(playerResults, playerPhrase);

  var returningPlayers = [];
  _.each(playerResults, function(player){
    if(playersToReturn.indexOf(player.id) != -1){
      returningPlayers.push(player);
    } else {
      whisper('*' + player.get('_displayname') + '* is not on a player specific page.');
    }
  });

  if(playerResults.length >= 2){
    whisper('Which player did you mean?');
    _.each(playerResults, function(player){
      var suggestion = player.get('_displayname');
      whisper('[' + suggestion + '](!return ' + suggestion + ')');
    });
    return;
  }

  playerPhrase.trim();
  if(playerPhrase == ''){
    _.each(playersToReturn, function(playerid){
      returningPlayers.push(getObj('player', playerid));
    });
  }

  _.each(returningPlayers, function(player){
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
