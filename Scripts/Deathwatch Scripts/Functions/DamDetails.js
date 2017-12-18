function damDetails() {
  //load up all of the damage variables, wherever they may be
  var details = {};
  var detailNames = {
    DamType: 'DamageType',
    Dam: 'Damage',
    Pen: 'Penetration',
    Fell: 'Felling',
    Prim: 'Primitive',
    Hits: 'Hits',
    OnesLoc: 'OnesLocation',
    TensLoc: 'TensLocation',
    Ina: 'Ignores Natural Armour'
  }

  for(var prop in detailNames) {
    details[prop] = findObjs({_type: 'attribute', name: detailNames[prop]})[0];
  }

  var characterid;
  for(var prop in details) {
    if(details[prop]) characterid = details[prop].get('_characterid');
  }

  if(!characterid) {
    var character = createObj('character', {name: 'Damage Catcher'});
    characterid = character.id;
  }

  for(var prop in details) {
    var value = prop == 'DamType' ? 'I' : 0;
    if(!details[prop]) details[prop] = createObj('attribute', {
      name: detailNames[prop],
      current: value,
      max: value,
      _characterid: characterid
    });
  }

  return details;
}
