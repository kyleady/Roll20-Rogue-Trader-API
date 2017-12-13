INQCharacter.prototype.calcHorde = function() {
  if(!this.GraphicID) return 0;
  var graphic = getObj('graphic', this.GraphicID);
  if(!graphic) return;
  var label = graphic.get('bar2_value');
  if(!/^H/i.test(label)) return 0;
  var members = findObjs({
    _type: 'graphic',
    bar2_value: label,
    _pageid: graphic.get('_pageid')
  });

  var horde = 0;
  for(var member of members) {
    if(!member.get('status_dead')) horde++;
  }

  return horde;
}
