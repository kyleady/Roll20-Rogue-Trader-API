INQTime.load = function() {
  for(var prop in this.vars) {
    this[prop + 'Obj'] = findObjs({_type: 'attribute', name: this.vars[prop]})[0];
  }

  var characterid;
  for(var prop in this.vars) {
    if(this[prop + 'Obj']) characterid = this[prop + 'Obj'].get('_characterid');
  }

  if(!characterid) {
    var character = findObjs({_type: 'character', name: 'INQVariables'})[0];
    if(!character) character = createObj('character', {name: 'INQVariables'});
    characterid = character.id;
  }

  for(var prop in this.vars) {
    if(!this[prop + 'Obj']) this[prop + 'Obj'] = createObj('attribute', {
      name: this.vars[prop],
      current: 0,
      max: 0,
      _characterid: characterid
    });
  }

  this.reset();
}
