INQQtt.prototype.fist = function(){
  var inqweapon = this.inquse.inqweapon;
  var SB = this.inquse.inqcharacter.bonus('S');
  if(inqweapon.has('Fist')){
    inqweapon.Damage.Modifier += SB;
  }
}
