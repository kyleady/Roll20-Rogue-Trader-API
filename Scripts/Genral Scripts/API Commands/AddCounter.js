function addCounter(matches, msg) {
  var name = matches[1];
  var turns = matches[2];
  var turnorder = Campaign().get('turnorder');
  if(turnorder) {
    turnorder = carefulParse(turnorder);
  } else {
    turnorder = [];
  }
  turnorder.push({
    id: '-1',
    pr: turns,
    custom: name.trim(),
    formula: '-1'
  });
  Campaign().set('turnorder', JSON.stringify(turnorder));
  whisper('Counter added.', { speakingTo: msg.playerid, gmEcho: true });
}

on('ready', function(){
  CentralInput.addCMD(/^!\s*add\s*counter\s*(.+\D)\s*(\d+)$/i, addCounter, true);
});
