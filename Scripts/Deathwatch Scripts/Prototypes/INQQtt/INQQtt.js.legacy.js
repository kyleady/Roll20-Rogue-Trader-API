INQQtt.prototype.legacy = function(){
  var inqweapon = this.inquse.inqweapon;
  var inqcharacter = this.inquse.inqcharacter;
  if(!inqweapon.has('Legacy')) return;
  const renown = inqcharacter.bonus('Renown');
  const bonus = Math.ceil(renown/2);
  log(`Legacy(${bonus})`)
  inqweapon.Damage.Modifier += bonus;
  inqweapon.Penetration.Modifier += bonus;
}
