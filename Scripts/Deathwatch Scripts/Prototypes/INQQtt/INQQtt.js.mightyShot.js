INQQtt.prototype.mightyShot = function(){
  var inqweapon = this.inquse.inqweapon;
  var inqcharacter = this.inquse.inqcharacter;
  if(inqcharacter.has('Mighty Shot', 'Talents') && inqweapon.isRanged()){
    inqweapon.Damage.Modifier += 2;
  }
}
