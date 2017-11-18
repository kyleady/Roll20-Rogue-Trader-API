INQWeapon.prototype.isRanged = function(){
  return this.Class == 'Pistol' || this.Class == 'Basic' || this.Class == 'Heavy' || this.Class == 'Thrown';
}
