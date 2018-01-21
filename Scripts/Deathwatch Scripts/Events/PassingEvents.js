on('ready', function() {
  INQTime.on('change:time', function(currTime, prevTime, dt) {
    var myPromise = new Promise(function(resolve) {
      INQCalendar.load(resolve);
    });

    myPromise.then(function() {
      INQCalendar.advance(currTime);
      INQCalendar.announceEvents();
      INQCalendar.save();
    });
  });
});
