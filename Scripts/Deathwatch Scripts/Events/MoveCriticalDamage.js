const INQMoveCriticalDamage = function(graphic) {
  const characterid = graphic.get('represents');
  if(!characterid) return;
  const critical_obj = findObjs({
    name: 'Critical',
    _characterid: characterid,
    _type: 'attribute'
  })[0];

  if(!critical_obj) return;
  const wounds = {
    current: Number(graphic.get('bar1_value')),
    max: Number(graphic.get('bar1_max'))
  };
  const critical = {
    current: Number(graphic.get('bar3_value')),
    max: Number(graphic.get('bar3_max'))
  };
  if(wounds.current < 0) {
    critical.current += wounds.current;
    wounds.current = 0;
  } else if(critical.current > critical.max) {
    wounds.current += critical.current - critical.max;
    critical.current = critical.max;
    if(wounds.current > wounds.max) wounds.current = wounds.max;
  } else {
    return;
  }

  graphic.set('bar1_value', wounds.current);
  graphic.set('bar3_value', critical.current);
}

on('change:graphic:bar3_value', INQMoveCriticalDamage);
on('change:graphic:bar1_value', INQMoveCriticalDamage);
