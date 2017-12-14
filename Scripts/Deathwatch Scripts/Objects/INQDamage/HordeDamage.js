INQAttack_old = INQAttack_old || {};
INQAttack_old.hordeDamage = function(damage){
  if(damage > 0){
    damage = Number(INQAttack_old.Hits.get('current'));
    if(!damage && damage != 0) return whisper(damage + ' is not valid.');
    if(/X/i.test(INQAttack_old.DamType.get('current'))) damage++;
    var members = findObjs({
      _type: 'graphic',
      bar2_value: INQAttack_old.graphic.get('bar2_value'),
      _pageid: INQAttack_old.graphic.get('_pageid')
    });

    for(var i = 0; i < members.length; i++) {
      if(members[i].get('status_dead')) {
        members.splice(i, 1);
        i--;
      }
    }

    var killed = [];
    for(var i = 0; i < damage; i++) {
      if(!members.length) break;
      var index = randomInteger(members.length) - 1;
      killed.push(members[index]);
      members.splice(index, 1);
    }

    INQAttack_old.Hits.set('current', damage - killed.length);
    for(var i = 0; i < killed.length; i++) {
      killed[i].set('status_dead', true);
      damageFx(killed[i], attributeValue('DamageType'));
    }
  } else {
    damage = 0;
  }

  announce(INQAttack_old.graphic.get('name') + ' Horde took [[' + damage + ']] damage.');
}
