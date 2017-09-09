function sendToPage(matches,msg){
  var mapPhrase    = matches[1] || '';
  var playerPhrase = matches[2] || '';
  var mapKeywords    = mapPhrase.split(' ');
  var playerKeywords = playerPhrase.split(' ');
  var mapResults    = matchingObjs('page', mapKeywords);
  var playerResults = matchingObjs('player', playerKeywords);
  var characterResults = matchingObjs('character', playerKeywords, function(obj){
    var owners = obj.get('controlledby').split(',')
    return !(owners.length != 1 || owners[0] == '' || owners[0] == 'all' || playerIsGM(owners[0]))
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

  if(!mapResults.length) return whisper('No matching maps were found.');
  if(!playerResults.length && playerPhrase) return whisper('No matching players were found.');
  mapResults = trimToPerfectMatches(mapResults, playerPhrase);
  playerResults = trimToPerfectMatches(playerResults, playerPhrase);
  if(mapResults.length >= 2){
    whisper('Which map did you mean?');
    var playerSearch = '';
    if(playerResults.length == 1){
      playerSearch = '|' + playerResults[0].get('_displayname');
    } else if(playerResults.length > 1){
      playerSearch = '|' + playerPhrase;
    }

    _.each(mapResults, function(map){
      var suggestion = map.get('name') + playerSearch;
      whisper('[' + suggestion + '](!sendTo ' + suggestion + ')');
    });

    return;
  }

  if(playerResults.length >= 2){
    whisper('Which player did you mean?');
    var mapSearch = mapResults[0].get('name');
    _.each(playerResults, function(player){
      var suggestion = mapSearch + '|' + player.get('_displayname');
      whisper('[' + suggestion + '](!sendTo ' + suggestion + ')');
    });
    return;
  }

  if(!playerResults.length){
    Campaign().set('playerpageid', mapResults[0].id);
    whisper('The party has been moved to *' + mapResults[0].get('name') + '*');
  } else {
    var playerPages = Campaign().get('playerspecificpages');
    playerPages = playerPages || {};
    _.each(playerResults, function(player){
      playerPages[player.id] = mapResults[0].id;
      whisper('*' + player.get('_displayname') + '* was moved to *' + mapResults[0].get('name') + '*');
    });
    Campaign().set('playerspecificpages', playerPages);
  }
}

on('ready',function(){
  CentralInput.addCMD(/^!\s*send\s*to\s([^\|\[\]]+)\s*(?:\|\s*([^\|\[\]]+)\s*)?$/i,sendToPage);
});
