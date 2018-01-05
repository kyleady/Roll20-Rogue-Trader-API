INQTime.load = function() {
  for(var prop in this.vars) {
    this[prop + 'Attr'] = findObjs({_type: 'attribute', name: this.vars[prop]})[0];
  }

  var characterid;
  for(var prop in this.vars) {
    if(this[prop + 'Attr']) characterid = this[prop + 'Attr'].get('_characterid');
  }

  if(!characterid) {
    var character = findObjs({_type: 'character', name: 'INQVariables'})[0];
    if(!character) character = createObj('character', {name: 'INQVariables'});
    characterid = character.id;
  }

  for(var prop in this.vars) {
    if(!this[prop + 'Attr']) this[prop + 'Attr'] = createObj('attribute', {
      name: this.vars[prop],
      current: 0,
      max: 0,
      _characterid: characterid
    });
  }

  for(var prop in this.vars) this[prop] = Number(this[prop + 'Attr'].get('max')) || 0;
}
