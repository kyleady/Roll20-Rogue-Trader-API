INQCalendar.addEvent = function(content, options) {
  if(typeof options != 'object') options = {};
  INQTime.load();
  var time_i = INQTime.toNumber();
  if(options.date) {
    var dateData = INQTime.toObj(options.date);
    for(var prop in INQTime.vars) INQTime[prop] = dateData[prop];
  }

  if(options.dt) {
    var times = INQTime.toArray(options.dt, 'diff');
    if(options.sign == '-') {
      for(var time of times) time.quantity *= -1;
    }

    INQTime.add(times);
  }

  var isFuture = INQTime.diff(time_i) > 0;
  var repeatFraction;
  if(options.repeat) {
    var repeatTime = INQTime.toNumber(options.repeat, 'diff');
    if(repeatTime > 0) {
      while(!isFuture) {
        INQTime.add(repeatTime);
        isFuture = INQTime.diff(time_i) > 0;
      }
    } else {
      return whisper('Repetition Period must be greater than zero.');
    }

  }


  var time = isFuture ? 'future' : 'past';
  var note = options.isGM ? 'gmnotes' : 'notes';
  this[time][note].push({
    Date: INQTime.toString(),
    Content: [' ' + content.trim()],
    Repeat: repeatTime
  });

  this.order(time, note);
  return this[time + 'Obj'];
}
