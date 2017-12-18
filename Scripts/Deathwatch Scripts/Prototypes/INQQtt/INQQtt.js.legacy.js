INQQtt.prototype.legacy = function(){
  var inqweapon = this.inquse.inqweapon;
  var inqcharacter = this.inquse.inqcharacter;
  if(inqweapon.has('Legacy')){
    var bonus = inqcharacter.bonus('Renown');
    bonus = Math.ceil(bonus/2);
    inqweapon.Damage.Modifier += bonus;
    inqweapon.Penetration.Modifier += bonus;
  }
}
