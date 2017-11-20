INQUse.prototype.calcModifiers = function(){
  this.parseModifiers();
  this.calcEffectivePsyRating();
  this.SB = this.inqcharacter.bonus('S');
  this.calcRange();
  this.calcStatus();
  this.calcRoF();
  this.Special = new INQQtt(this);
  this.Special.beforeRoll();
  if(this.inqweapon.Class == 'Heavy' && !this.braced){
    this.modifiers.push({Name: 'Unbraced', Value: -30});
  }
}
