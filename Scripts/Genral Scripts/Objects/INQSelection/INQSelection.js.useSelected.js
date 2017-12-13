INQSelection.useSelected = function(msg) {
  if(msg.selected && msg.selected.length) return;
  msg.selected = INQSelection.selected;
  INQSelection.selected = undefined;
}
