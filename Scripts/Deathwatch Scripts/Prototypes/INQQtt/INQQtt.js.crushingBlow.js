INQQtt.prototype.crushingBlow = function(){
  var inqweapon = this.inquse.inqweapon;
  var inqcharacter = this.inquse.inqcharacter;
  if(inqcharacter.has('Crushing Blow', 'Talents') && inqweapon.Class == 'Melee'){
    inqweapon.Damage.Modifier += 2;
  }
}
