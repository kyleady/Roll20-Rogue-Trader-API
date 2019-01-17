INQQtt.prototype.mightyShot = function(){
  var inqweapon = this.inquse.inqweapon;
  var inqcharacter = this.inquse.inqcharacter;
  if(!inqcharacter.has('Mighty Shot', 'Talents')) return;
  if(!inqweapon.isRanged()) return;
  log('Mighty Shot');
  inqweapon.Damage.Modifier += 2;
}
