INQQtt.prototype.sureStrike = function(){
  var inqweapon = this.inquse.inqweapon;
  var inqcharacter = this.inquse.inqcharacter;
  var RoF = this.inquse.options.RoF;
  if(!inqcharacter.has('Sure Strike', 'Talents')) return;
  if(!/called/i.test(RoF)) return;
  if(!inqweapon.Class == 'Melee') return;
  log('Sure Strike');
  this.inquse.modifiers.push({Name: 'Sure Strike', Value: 10});
}
