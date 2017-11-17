INQQtt.prototype.crushingBlow = function(inqweapon, inqcharacter){
  if(inqweapon.Class == 'Melee' && inqcharacter.has('Crushing Blow')){
    inqweapon.Damage.Modifier += 2;
  }
}
