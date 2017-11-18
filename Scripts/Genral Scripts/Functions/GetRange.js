function getRange(graphic1ID, graphic2ID){
  var graphic1 = getObj('graphic', graphic1ID);
  var graphic2 = getObj('graphic', graphic2ID);

  if(!graphic1 || !graphic2) return -1;
  var dx = graphic1.get('left') - graphic2.get('left');
  var dy = graphic1.get('top')  - graphic2.get('top');
  return Math.sqrt(dx * dx + dy * dy);
}
