function timeDiff(matches, msg) {
  INQTime.load();
  var timeData = INQTime.parseDate(matches[1]);
  var diffData = INQTime.diff(timeData);
  var output = INQTime.showDiff(diffData);
  output += INQTime.showDate(timeData) + '.';
  whisper(output, {speakingTo: msg.playerid});
}

on('ready', function() {
  CentralInput.addCMD(/^!\s*time\s*\??\s*(?:\+|-|)\s*(\d?(?:\d\d\d)?\d\d\d(?:\.M\d+)?)\s*$/i, timeDiff, true);
});
