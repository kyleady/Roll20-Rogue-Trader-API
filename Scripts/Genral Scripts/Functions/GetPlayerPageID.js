function getPlayerPageID(playerid) {
  var player = getObj('player', playerid);
  if(!player) return whisper('Player does not exist.');
  if(playerIsGM(playerid)) {
    var pageid = player.get('_lastpage');
  } else {
    var specificPages = Campaign().get('playerspecificpages');
    if(specificPages && specificPages[playerid]) var pageid = specificPages[playerid];
  }

  if(!pageid) pageid = Campaign().get('playerpageid');
  return pageid;
}
