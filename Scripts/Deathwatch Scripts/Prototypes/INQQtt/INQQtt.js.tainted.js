INQQtt.prototype.tainted = function(){
  var inqweapon = this.inquse.inqweapon;
  var inqcharacter = this.inquse.inqcharacter;
  if(inqweapon.has('Tainted')){
    inqweapon.Damage.Modifier += inqcharacter.bonus('Corruption');
  }
}
