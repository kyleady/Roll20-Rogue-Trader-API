INQCalendar.announceEvents = function() {
  for(var note of this.notes) {
    for(var ev of this.announcements[note]) {
      var output = '';
      if(note == 'gmnotes') output += '/w gm ';
      output += '<strong>';
      output += ev.Date;
      output += '</strong>: ';
      output += ev.Content;

      output += ' [Log](';
      var cmd = '';
      if(note == 'gmnotes') cmd += 'gm';
      cmd += 'log ' + ev.Content;
      cmd += '@' + ev.Date;
      output += '!{URIFixed}' + encodeURIFixed(cmd);
      output += ')';

      if(ev.Repeat) {
        output += ' [Repeat](';
        cmd = '';
        if(note == 'gmnotes') cmd += 'gm';
        cmd += 'log ' + ev.Content;
        cmd += '@' + ev.Date;
        cmd += '%' + ev.Repeat;
        output += '!{URIFixed}' + encodeURIFixed(cmd);
        output += ')';
      }

      announce(output);
    }

    this.announcements[note] = [];
  }
}
