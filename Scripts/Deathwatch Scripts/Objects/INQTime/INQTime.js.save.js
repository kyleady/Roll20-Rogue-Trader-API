INQTime.save = function() {
  var prevTime = {
    fraction: Number(this.fractionObj.get('max')),
    year: Number(this.yearObj.get('max')),
    mill: Number(this.millObj.get('max'))
  }

  var currTime = INQTime.toObj();
  var dt = INQTime.diff(prevTime) / 10000;
  for(var func of this.timeEvents) func(currTime, prevTime, dt);
  for(var prop in this.vars) {
    this[prop + 'Obj'].set('current', this[prop]);
    this[prop + 'Obj'].set('max',     this[prop]);
  }
}
