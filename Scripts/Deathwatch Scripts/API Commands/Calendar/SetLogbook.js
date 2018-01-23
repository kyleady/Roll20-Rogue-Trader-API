on('ready', function() {
  CentralInput.addCMD(/^!\s*log\s*=\s*(.*)$/i, function(matches, msg) {
    var title = matches[1].trim();
    if(title == '' || title == 'default') {
      INQCalendar.pastName = 'Logbook';
      INQCalendar.futureName = 'Calendar';
      whisper('Log target reset.');
    } else {
      INQCalendar.pastName = title + ' - Logbook';
      INQCalendar.futureName = title + ' - Calendar';
      whisper('Log target = ' + title + '.');
    }
  });
});
