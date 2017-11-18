INQUse.prototype.calcModifiers = function(){
  this.parseModifiers();
  this.calcEffectivePsyRating();
  this.SB = this.inqcharacter.bonus('S');
  this.calcRoF();
  this.Special = new INQQtt(this);
  this.Special.beforeRoll();
}
