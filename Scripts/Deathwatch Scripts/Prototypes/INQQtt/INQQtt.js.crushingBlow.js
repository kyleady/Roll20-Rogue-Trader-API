INQQtt.prototype.crushingBlow = function(){
  var inqweapon = this.inquse.inqweapon;
  var inqcharacter = this.inquse.inqcharacter;
  if(!inqcharacter.has('Crushing Blow', 'Talents')) return;
  if(!inqweapon.Class == 'Melee') return;
  log('Crushing Blow');
  inqweapon.Damage.Modifier += 2;
}
