INQCalendar.order = function(time, note) {
  if(!INQCalendar[time]) return whisper('INQCalendar.' + time + ' does not exist.');
  if(!INQCalendar[time][note]) return whisper('INQCalendar.' + time + '.' + note + ' does not exist.');
  INQCalendar[time][note].sort(function(ev1, ev2) {
    if(!ev1.Date) return -1;
    if(!ev2.Date) return 1;
    INQTime.equals(ev1.Date);
    return INQTime.diff(ev2.Date);
  });
  
  INQTime.reset();
}
