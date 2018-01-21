INQTime.reset = function() {
  for(var prop in this.vars) this[prop] = Number(this[prop + 'Obj'].get('max')) || 0;
}
