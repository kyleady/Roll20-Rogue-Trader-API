INQCalendar.advance = function() {
  var notes = ['notes', 'gmnotes'];
  this.announcements = {};

  for(var note of notes) {
    this.announcements[note] = [];
    for(var i = 0; i < this.future[note].length; i++) {
      if(!this.future[note][i].Date) continue;
      var evTime = INQTime.parseDate(this.future[note][i].Date);
      var stillInFuture = INQTime.diff(evTime).future;
      if(!stillInFuture) {
        this.announcements[note].push(this.future[note][i]);
        this.future[note].splice(i, 1);
        i--;
      }
    }
  }
}
