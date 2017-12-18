INQCharacter.prototype.calcHorde = function() {
  if(!this.GraphicID) return 0;
  var graphic = getObj('graphic', this.GraphicID);
  if(!graphic) return;
  if(!/^h/i.test(graphic.get('bar2_value'))) return 0;
  var members = getHorde(graphic);
  return members.length;
}
