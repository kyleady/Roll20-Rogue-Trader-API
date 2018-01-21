INQCalendar.load = function(callback) {
  this.pastObj = findObjs({_type: 'handout', name: 'Logbook'})[0];
  this.futureObj = findObjs({_type: 'handout', name: 'Calendar'})[0];
  if(!this.pastObj) this.pastObj = createObj('handout', {name: 'Logbook', inplayerjournals: 'all'});
  if(!this.futureObj) this.futureObj = createObj('handout', {name: 'Calendar', inplayerjournals: 'all'});
  this.parse(callback);
}
