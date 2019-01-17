INQQtt.prototype.hammerBlow = function(){
  var inqcharacter = this.inquse.inqcharacter;
  var inqweapon = this.inquse.inqweapon;
  var RoF = this.inquse.options.RoF;
  var SB = this.inquse.SB;
  const bonus_pen =  Math.ceil(SB/2);
  if(!inqcharacter.has('Hammer Blow', 'Talents')) return;
  if(!/^\s*all\s*out\s*(attack)?\s*$/i.test(RoF)) return;
  log(`Hammer Blow(${bonus_pen})`);
  inqweapon.Penetration.Modifier += bonus_pen;
  inqweapon.set({Special: 'Concussive(2)'});
}
