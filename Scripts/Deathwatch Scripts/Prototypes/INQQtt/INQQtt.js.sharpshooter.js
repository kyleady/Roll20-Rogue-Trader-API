INQQtt.prototype.sharpshooter = function(){
  var inqweapon = this.inquse.inqweapon;
  var inqcharacter = this.inquse.inqcharacter;
  var RoF = this.inquse.options.RoF;
  if(!inqcharacter.has('Sharpshooter', 'Talents')) return;
  if(!/called/i.test(RoF)) return;
  if(!inqweapon.isRanged()) return;
  log('Sharpshooter')
  this.inquse.modifiers.push({Name: 'Sharpshooter', Value: 10});
}
