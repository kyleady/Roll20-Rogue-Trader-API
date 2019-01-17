INQQtt.prototype.force = function(){
  var inqweapon = this.inquse.inqweapon;
  var PR = this.inquse.inqcharacter.Attributes.PR;
  if(!inqweapon.has('Force')) return;
  log(`Force(${PR})`);
  this.inquse.inqweapon.Damage.Modifier += PR;
  this.inquse.inqweapon.Penetration.Modifier += PR;
}
