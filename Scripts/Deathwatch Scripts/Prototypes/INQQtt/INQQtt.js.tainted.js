INQQtt.prototype.tainted = function(){
  var inqweapon = this.inquse.inqweapon;
  var inqcharacter = this.inquse.inqcharacter;
  if(!inqweapon.has('Tainted')) return;
  log('Tainted');
  inqweapon.Damage.Modifier += inqcharacter.bonus('Corruption');
}
