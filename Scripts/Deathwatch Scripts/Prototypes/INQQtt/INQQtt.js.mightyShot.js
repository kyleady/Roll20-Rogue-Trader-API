INQQtt.prototype.mightyShot = function(){
  var inqweapon = this.inquse.inqweapon;
  if(inqcharacter.has('Mighty Shot')
  || inqweapon.Class == 'Pistol'
  || inqweapon.Class == 'Basic'
  || inqweapon.Class == 'Heavy'
  || inqweapon.Class == 'Thrown')){
    inqweapon.Damage.Modifier += 2;
  }
}
