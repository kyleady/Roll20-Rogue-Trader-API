on('ready', function() {
  INQTime.on('change:time', function(currTime, prevTime, dt) {
    var ages = findObjs({_type: 'attribute', name: 'Age'});
    for(var age of ages) {
      var value = Number(age.get('max')) || 0;
      value += dt;
      value *= 10000;
      value = Math.floor(value);
      value /= 10000;
      age.set('current', value);
      age.set('max', value);
    }
  });
});
