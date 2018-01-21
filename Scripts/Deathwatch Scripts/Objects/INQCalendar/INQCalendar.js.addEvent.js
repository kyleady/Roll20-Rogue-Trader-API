INQCalendar.addEvent = function(content, options) {
  if(typeof options != 'object') options = {};
  INQTime.load();
  if(options.date) {
    var dateData = INQTime.parseDate(options.date);
    for(var prop in INQTime.vars) INQTime[prop] = dateData[prop];
  }

  if(options.dt) {
    var times = INQTime.parseInput(options.dt);
    if(options.sign == '-') {
      for(var time of times) time.quantity *= -1;
    }

    INQTime.add(times);
  }

  var name = INQTime.showDate();
  var dateData = {};
  for(var prop in INQTime.vars) dateData[prop] = INQTime[prop];
  INQTime.reset();
  var isFuture = INQTime.diff(dateData).future;

  var time = isFuture ? 'future' : 'past';
  var note = options.isGM ? 'gmnotes' : 'notes';
  this[time][note].push({
    Date: name,
    Content: [' ' + content.trim()]
  });

  this.order(time, note);
  return this[time + 'Obj'];
}
