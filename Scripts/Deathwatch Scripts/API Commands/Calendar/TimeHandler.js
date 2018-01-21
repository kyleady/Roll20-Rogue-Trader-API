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
  var regex = '^!\\s*time\\s*';
  regex += '\\??\\s*(\\+|-|)\\s*';
  regex += '(' + INQTime.modifierRegex() + ')$';
  var re = RegExp(regex, 'i');
  CentralInput.addCMD(re, timeHandler, true);
  regex = regex.replace('\\??\\s*(\\+|-|)', '(\\+|-)\\s*=');
  re = RegExp(regex, 'i');
  CentralInput.addCMD(re, function(matches, msg){
    timeHandler(matches, msg, {save: true});
  }, false);
});
