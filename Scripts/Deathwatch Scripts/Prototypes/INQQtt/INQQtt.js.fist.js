INQQtt.prototype.fist = function(){
  var inqweapon = this.inquse.inqweapon;
  var SB = this.inquse.SB;
  if(!inqweapon.has('Fist')) return;
  log(`Fist(${SB})`)
  inqweapon.Damage.Modifier += SB;
}
