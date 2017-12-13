INQSelection.checkSelected = function(matches, msg) {
  if(!INQSelection.selected) return whisper('Empty.');
  var buttons = [];
  for(var item of INQSelection.selected) {
    if(item._type == 'graphic') {
      var graphic = getObj('graphic', item._id);
      var button = '';
      button += ' [' + graphic.get('name') + ']';
      button += '(!pingG ' + graphic.id + ')';
      buttons.push(button);
    }
  }

  whisper('Selected:' + buttons, {speakingTo: msg.playerid});
}

on('ready',() => CentralInput.addCMD(/^!\s*select(ed)?\s*\?\s*$/i, INQSelection.checkSelected, true));
