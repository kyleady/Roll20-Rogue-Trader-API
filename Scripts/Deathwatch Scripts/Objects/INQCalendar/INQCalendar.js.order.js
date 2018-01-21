INQCalendar.order = function(time, note) {
  if(!INQCalendar[time]) return whisper('INQCalendar.' + time + ' does not exist.');
  if(!INQCalendar[time][note]) return whisper('INQCalendar.' + time + '.' + note + ' does not exist.');
  INQCalendar[time][note].sort(function(ev1, ev2) {
    if(!ev1.Date) return -1;
    if(!ev2.Date) return 1;
    var d1 = INQTime.parseDate(ev1.Date);
    var d2 = INQTime.parseDate(ev2.Date);
    var y1 = d1.mill * 1000 + d1.year + (d1.fraction / 10000);
    var y2 = d2.mill * 1000 + d2.year + (d2.fraction / 10000);
    return y1 - y2;
  });
}
