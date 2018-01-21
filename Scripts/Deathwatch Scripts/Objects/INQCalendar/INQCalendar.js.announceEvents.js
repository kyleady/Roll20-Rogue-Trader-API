INQCalendar.announceEvents = function() {
  var notes = ['notes', 'gmnotes'];
  for(var note of notes) {
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
      cmd += 'log ' + ev.Content + '@' + ev.Date;

      output += '!{URIFixed}' + encodeURIFixed(cmd);
      output += ')';
      announce(output);
    }

    this.announcements[note] = [];
  }
}
