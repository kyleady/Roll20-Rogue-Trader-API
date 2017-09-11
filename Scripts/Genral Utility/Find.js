function journalSearch(matches, msg){
  var keywords = matches[1].toLowerCase().split(' ');
  var searchResults = matchingObjs(['handout', 'character'], keywords, function(obj){
    if(playerIsGM(msg.playerid)) return true;
    var permissions = obj.get('inplayerjournals').split(',');
    return permissions.indexOf('all') != -1 || permissions.indexOf(msg.playerid) != -1
  });

  LinkList[msg.playerid] = [];
  for(var i = 0; i < searchResults.length; i++){
    LinkList[msg.playerid].push((LinkList[msg.playerid].length + 1).toString() + '. ' +
    getLink(searchResults[i].get('name'), 'http://journal.roll20.net/' + searchResults[i].get('_type') + '/' + searchResults[i].id));
  }

  moreSearch([], msg);
}

function moreSearch(matches, msg){
  if(!LinkList[msg.playerid] || !LinkList[msg.playerid].length) return whisper('No results.', {speakingTo: msg.playerid});
  for(var i = 1; i <= 5 && LinkList[msg.playerid].length; i++){
    whisper(LinkList[msg.playerid][0], {speakingTo: msg.playerid});
    LinkList[msg.playerid].shift();
  }

  if(LinkList[msg.playerid].length){
    whisper(LinkList[msg.playerid].length.toString() + ' [More](!More) search results.', {speakingTo: msg.playerid});
  }
}

on('ready',function(){
  LinkList = [];
  CentralInput.addCMD(/^!\s*find\s+(\S.*)$/i,journalSearch,true);
  CentralInput.addCMD(/^!\s*more\s*$/i,moreSearch,true);
});
