function sendToPage(matches, msg){
  var pagePhrase    = matches[1] || '';
  var playerPhrase = matches[2] || '';
  var suggestion = '!sendTo $';
  if(playerPhrase) suggestion += '|' + playerPhrase;
  var pages = suggestCMD(suggestion, pagePhrase, msg.playerid, 'page');
  if(!pages) return;
  var page = pages[0];
  if(!playerPhrase){
    Campaign().set('playerpageid', page.id);
    whisper('The party has been moved to *' + page.get('name') + '*');
  } else {
    var players = suggestCMD('!sendTo ' + page.get('name') + '|$', playerPhrase.split(','), msg.playerid, 'player');
    if(!players) return;
    var playerPages = Campaign().get('playerspecificpages');
    playerPages = playerPages || {};
    _.each(players, function(player){
      playerPages[player.id] = page.id;
      whisper('*' + player.get('_displayname') + '* was moved to *' + page.get('name') + '*');
    });

    Campaign().set('playerspecificpages', playerPages);
  }
}

on('ready',function(){
  CentralInput.addCMD(/^!\s*send\s*to\s([^\|\[\]]+)\s*(?:\|\s*([^\|\[\]]+)\s*)?$/i,sendToPage);
});
