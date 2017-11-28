INQQtt.prototype.mightyShot = function(){
  var inqweapon = this.inquse.inqweapon;
  if(inqcharacter.has('Mighty Shot') && inqweapon.isRanged()){
    inqweapon.Damage.Modifier += 2;
  }
}
