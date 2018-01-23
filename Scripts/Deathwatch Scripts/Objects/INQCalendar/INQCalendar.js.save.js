INQCalendar.save = function() {
  for(var time of this.times) {
    for(var note of this.notes) {
      var text = '';
      for(var lines of INQCalendar[time][note]) {
        if(lines.Date) {
          text += '<strong>';
          text += lines.Date;
          if(lines.Repeat) text += '%' + lines.Repeat;
          text += '</strong>:';
        }

        for(var line of lines.Content) {
          text += line;
          text += '<br>';
        }
      }

      text = text.replace(/<br>$/, '');
      INQCalendar[time + 'Obj'].set(note, text);
    }
  }
}
