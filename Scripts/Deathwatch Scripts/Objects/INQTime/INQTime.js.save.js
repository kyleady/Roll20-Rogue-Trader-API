INQTime.save = function() {
  var prevTime = {
    fraction: Number(this.fractionObj.get('max')),
    year: Number(this.yearObj.get('max')),
    mill: Number(this.millObj.get('max'))
  }

  var currTime = {
    fraction: this.fraction,
    year: this.year,
    mill: this.mill
  }

  var dt = currTime.mill - prevTime.mill;
  dt *= 1000;
  dt += currTime.year - prevTime.year;
  dt += (currTime.fraction - prevTime.fraction) / 10000;

  for(var func of this.timeEvents) func(currTime, prevTime, dt);
  for(var prop in this.vars) {
    this[prop + 'Obj'].set('current', this[prop]);
    this[prop + 'Obj'].set('max',     this[prop]);
  }
}
