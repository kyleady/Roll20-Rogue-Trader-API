const INQMoveCriticalDamage = function(graphic) {
  const characterid = graphic.get('represents');
  if(!characterid) return;
  const critical_obj = findObjs({
    name: 'Critical',
    _characterid: characterid,
    _type: 'attribute'
  })[0];

  if(!critical_obj) return;
  let wounds = Number(graphic.get('bar1_value'));
  let critical = Number(graphic.get('bar3_value'));
  const critical_max = Number(graphic.get('bar3_max'));
  if(wounds < 0) {
    critical += wounds;
    wounds = 0;
  } else if(critical > critical_max) {
    wounds += critical - critical_max;
    critical = critical_max;
  } else {
    return;
  }

  graphic.set('bar1_value', wounds);
  graphic.set('bar3_value', critical);
}

on('change:graphic:bar3_value', INQMoveCriticalDamage);
on('change:graphic:bar1_value', INQMoveCriticalDamage);
