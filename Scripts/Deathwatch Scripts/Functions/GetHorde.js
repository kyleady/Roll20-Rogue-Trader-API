function getHorde(graphic) {
  var members = findObjs({
    _type: 'graphic',
    bar2_value: graphic.get('bar2_value'),
    _pageid: graphic.get('_pageid')
  });

  for(var i = 0; i < members.length; i++) {
    if(members[i].get('status_dead')) {
      members.splice(i, 1);
      i--;
    }
  }

  return members;
}
