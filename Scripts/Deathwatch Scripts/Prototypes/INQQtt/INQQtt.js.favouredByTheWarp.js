INQQtt.prototype.favouredByTheWarp = function(){
  var inqcharacter = this.inquse.inqcharacter;
  var inqweapon = this.inquse.inqweapon;
  if(!inqcharacter.has(/Favou?red By The Warp/i, 'Talents')) return;
  if(!inqweapon.Class == 'Psychic') return;
  log('Favoured By The Warp')
  this.inquse.PsyPheDropDice++;
}
