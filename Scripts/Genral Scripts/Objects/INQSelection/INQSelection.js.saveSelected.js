INQSelection.saveSelected = function(matches, msg) {
  INQSelection.selected = msg.selected;
  whisper('Selection Saved.', {speakingTo: msg.playerid, gmEcho: true});
}

on('ready',() => CentralInput.addCMD(/^!\s*select\s*$/i, INQSelection.saveSelected, true));
