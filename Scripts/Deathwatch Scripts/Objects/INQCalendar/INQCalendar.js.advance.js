INQCalendar.advance = function() {
  this.announcements = {};
  for(var note of this.notes) {
    this.announcements[note] = [];
    for(var i = 0; i < this.future[note].length; i++) {
      var ev = this.future[note][i];
      if(!ev.Date) continue;
      var dt = INQTime.diff(ev.Date);
      if(dt >= 0) {
        this.announcements[note].push(ev);
        if(ev.Repeat) {
          var repetitions = Math.floor(dt / ev.Repeat);
          INQTime.equals(ev.Date);
          for(var j = 0; j < repetitions; j++) {
            INQTime.add(ev.Repeat);
            this.announcements[note].push({
              Date: INQTime.toString(),
              Content: ev.Content,
              Repeat: ev.Repeat
            });
          }
        }

        this.future[note].splice(i, 1);
        i--;
      }
    }
  }

  INQTime.reset();
}
