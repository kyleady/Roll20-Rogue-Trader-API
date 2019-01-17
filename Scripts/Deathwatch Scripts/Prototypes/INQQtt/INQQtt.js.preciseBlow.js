INQQtt.prototype.preciseBlow = function(){
  var inqweapon = this.inquse.inqweapon;
  var inqcharacter = this.inquse.inqcharacter;
  var RoF = this.inquse.options.RoF;
  if(!inqcharacter.has('Precise Blow', 'Talents')) return;
  if(!/called/i.test(RoF)) return;
  if(!inqweapon.Class == 'Melee') return;
  log('Precise Blow');
  this.inquse.modifiers.push({Name: 'Precise Blow', Value: 10});
}
