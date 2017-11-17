INQQtt.prototype.mightyShot = function(inqweapon, inqcharacter){
  if((inqweapon.Class == 'Pistol' || inqweapon.Class == 'Basic' || inqweapon.Class == 'Heavy' || inqweapon.Class == 'Thrown')
  || inqcharacter.has('Mighty Shot')){
    inqweapon.Damage.Modifier += 2;
  }
}
