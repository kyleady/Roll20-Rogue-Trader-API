INQQtt.prototype.bulgingBiceps = function(){
  var inqcharacter = this.inquse.inqcharacter;
  var inqweapon = this.inquse.inqweapon;
  if(!inqcharacter.has('Bulging Biceps', 'Talents')) return;
  if(!inqweapon.isRanged()) return;
  log('Bulging Biceps')
  this.inquse.braced = true;
}
