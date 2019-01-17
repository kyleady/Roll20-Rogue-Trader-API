INQQtt.prototype.deadeye = function(){
  var inqweapon = this.inquse.inqweapon;
  var inqcharacter = this.inquse.inqcharacter;
  var RoF = this.inquse.options.RoF;
  if(!inqcharacter.has(/Dead\s*Eye\s*(Shot)?/i, 'Talents')) return;
  if(!inqweapon.isRanged()) return;
  if(!/called/i.test(RoF)) return;
  log('Dead Eye Shot');
  this.inquse.modifiers.push({Name: 'Deadeye', Value: 10});
}
