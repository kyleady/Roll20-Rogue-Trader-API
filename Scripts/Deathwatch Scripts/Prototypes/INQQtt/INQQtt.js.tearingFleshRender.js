INQQtt.prototype.tearingFleshRender = function(){
  var inqweapon = this.inquse.inqweapon;
  var inqcharacter = this.inquse.inqcharacter;
  if(!inqweapon.has('Tearing')) return;
  log('Tearing');
  this.inquse.dropDice = 1;
  inqweapon.Damage.DiceNumber++;

  if(!inqcharacter) return;
  if(!inqcharacter.has('Flesh Render', 'Talents')) return;
  if(!inqweapon.Class == 'Melee') return;
  log('Flesh Render')
  this.inquse.dropDice++;
  inqweapon.Damage.DiceNumber++;
}
