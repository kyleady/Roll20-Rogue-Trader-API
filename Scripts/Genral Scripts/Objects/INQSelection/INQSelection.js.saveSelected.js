INQSelection.saveSelected = function(matches, msg) {
  if(!msg.selected || !msg.selected.length) {
    INQSelection.selected = undefined;
    whisper('Selection Cleared.', {speakingTo: msg.playerid, gmEcho: true});
  } else {
    INQSelection.selected = msg.selected;
    whisper('Selection Saved.', {speakingTo: msg.playerid, gmEcho: true});
  }
}

on('ready',() => CentralInput.addCMD(/^!\s*(select|!)\s*$/i, INQSelection.saveSelected, true));
