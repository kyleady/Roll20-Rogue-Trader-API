function timeHandler(matches, msg, options) {
  if(typeof options != 'object') options = {};
  var times = INQTime.parseInput(matches[2]);
  INQTime.load();
  if(matches[1] == '-') {
    for(var time of times) time.quantity *= -1;
  }

  INQTime.add(times);
  if(options.save) {
    INQTime.save();
    announce('It is now ' + INQTime.showDate());
  } else {
    whisper(INQTime.showDate(), {speakingTo: msg.playerid});
  }
}

on('ready', function() {
  CentralInput.addCMD(/^!\s*time\s*\??\s*(\+|-|)\s*((?:\d+\s*(?:minutes?|hours?|days?|weeks?|months?|years?|decades?|century|centuries)\s*,?\s*)*)$/i, timeHandler, true);
  CentralInput.addCMD(/^!\s*time\s*(\+|-)\s*=\s*((?:\d+\s*(?:minutes?|hours?|days?|weeks?|months?|years?|decades?|century|centuries)\s*,?\s*)*)$/i, function(matches, msg){
    timeHandler(matches, msg, {save: true});
  });
});
