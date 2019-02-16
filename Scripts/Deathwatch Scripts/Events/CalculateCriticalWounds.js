const INQCalculateCriticalWounds = (wounds_obj) => {
  const wounds = Number(wounds_obj.get('max'));
  const wounds_bonus = Math.floor(wounds / 10);
  const critical = wounds_bonus > 0 ? wounds_bonus * 9 : 9;

  const characterid = wounds_obj.get('_characterid');
  const critical_obj = findObjs({
    name: 'Critical',
    _type: 'attribute',
    _characterid: characterid
  })[0];

  if(critical_obj) {
    critical_obj.set({
      current: critical,
      max: critical
    });
  } else {
    createObj('attribute', {
      name: 'Critical',
      _characterid: characterid,
      current: critical,
      max: critical
    });
  }
}

on('change:attribute:max', (obj) => {
  if(obj.get('name') != 'Wounds') return;
  INQCalculateCriticalWounds(obj);
});
