function pingGraphic(matches, msg) {
  var graphic = getObj('graphic', matches[1]);
  if(!graphic) return whisper('Graphic does not exist.');
  var x = graphic.get('left');
  var y = graphic.get('top');
  var pageid = graphic.get('_pageid');
  sendPing(-100, -100, pageid, null, false);
  sendPing(x, y, pageid, null, false);
}

on('ready', function() {
  CentralInput.addCMD(/^!\s*ping\s*g(?:raphic)?\s*(\S+)\s*$/i, pingGraphic, true);
});
