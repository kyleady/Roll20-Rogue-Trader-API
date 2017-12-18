INQUse.prototype.applySpecialAmmo = function(){
  if(!this.inqammo || !this.inqweapon) return;
  this.inqweapon.Special = this.inqweapon.Special.concat(this.inqammo.Special);
}
