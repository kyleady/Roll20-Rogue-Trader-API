INQCalendar.load = function(callback) {
  for(var time of this.times) {
    this[time + 'Obj'] = findObjs({
      _type: 'handout',
      name: this[time + 'Name']
    })[0];

    if(!this[time + 'Obj']) this[time + 'Obj'] = createObj('handout', {
      name: this[time + 'Name'],
      inplayerjournals: 'all'
    });
  }

  this.parse(callback);
}
