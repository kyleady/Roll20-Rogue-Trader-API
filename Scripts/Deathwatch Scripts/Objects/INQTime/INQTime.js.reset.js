INQTime.reset = function() {
  for(var prop in this.vars) {
    if(!this[prop + 'Obj']) continue;
    this[prop] = Number(this[prop + 'Obj'].get('max')) || 0;
  }
}
