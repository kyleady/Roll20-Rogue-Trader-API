function timeDiff(matches, msg) {
  INQTime.load();
  var date = INQTime.toObj(matches[1]);
  var dt = INQTime.diff(date);
  var output = INQTime.toString(dt, 'diff');
  output += INQTime.toString(date) + '.';
  whisper(output, {speakingTo: msg.playerid});
}

on('ready', function() {
  CentralInput.addCMD(/^!\s*time\s*\??\s*(?:\+|-|)\s*(\d?(?:\d\d\d)?\d\d\d(?:\.M\d+)?)\s*$/i, timeDiff, true);
});
