INQTime.on = function(eventName, func) {
  switch(eventName) {
    case 'change:time':
      INQTime.timeEvents.push(func);
    break;
  }
}
