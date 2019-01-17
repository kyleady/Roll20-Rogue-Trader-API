INQQtt.prototype.autoStabilised = function(){
  var inqcharacter = this.inquse.inqcharacter;
  var inqweapon = this.inquse.inqweapon;
  if(!inqcharacter.has('Auto-stabilised', 'Traits')) return;
  if(!inqweapon.isRanged()) return;
  log('Auto-stabilised')
  this.inquse.braced = true;
}
