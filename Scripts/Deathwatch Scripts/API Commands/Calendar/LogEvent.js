function logEvent(matches, msg) {
  var isGM = matches[1] && playerIsGM(msg.playerid);
  var content = matches[2];
  var dt, date, sign, repeat;
  var modifiers = matches[3].match(/(@|\+|\-|%)[^@\+\-%]+/g) || [];
  for(var modifier of modifiers) {
    var info = modifier.substring(1).trim();
    switch(modifier[0]) {
      case '@':
        date = info;
      break;
      case '+':
        sign = '+';
        dt = info;
      break;
      case '-':
        sign = '-';
        dt = info;
      break;
      case '%':
        repeat = info;
      break;
    }
  }

  var myPromise = new Promise(function(resolve) {
    INQCalendar.load(resolve);
  });

  myPromise.then(function() {
    var logbook = INQCalendar.addEvent(content, {
      date: date,
      sign: sign,
      dt: dt,
      isGM: isGM
    });
    INQCalendar.save();
    var whisper = isGM ? '/w gm ' : '';
    announce(whisper + getLink(logbook) + ' updated.');
  });
}

on('ready', function() {
  var regex = '!\\s*(gm)?';
  regex += '\\s*log\\s+([^@%\\+\\-]+)';
  regex += '(';
  regex += '(?:';
  regex += '@\\s*\\d?(?:\\d\\d\\d)?\\d\\d\\d(?:\\.M\\d+)?\\s*';
  regex += '|';
  regex += '(?:\\+|\\-|%)\\s*' + INQTime.modifierRegex();
  regex += ')*';
  regex += ')$';
  var re = RegExp(regex, 'i');
  CentralInput.addCMD(re, logEvent);
});
