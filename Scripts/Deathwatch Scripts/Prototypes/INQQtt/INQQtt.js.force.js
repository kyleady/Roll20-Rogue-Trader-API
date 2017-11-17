INQQtt.prototype.force = function(inqweapon, inqcharacter){
  if(inqweapon.has('Force')){
    inqweapon.Damage.Modifier += inqcharacter.Attributes.PR;
    inqweapon.Penetration.Modifier += inqcharacter.Attributes.PR;
  }
}
