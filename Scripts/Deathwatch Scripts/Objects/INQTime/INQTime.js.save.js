INQTime.save = function() {
  var prevTime = {
    fraction: Number(this.fractionAttr.get('max')),
    year: Number(this.yearAttr.get('max')),
    mill: Number(this.millAttr.get('max'))
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
    this[prop + 'Attr'].set('current', this[prop]);
    this[prop + 'Attr'].set('max',     this[prop]);
  }
}
