INQUse.prototype.calcModifiers = function(){
  this.defaultProperties();
  var special = new INQQtt(this);
  this.parseModifiers();
  this.modifiers.push({
    Name: 'Focus Modifier',
    Value: this.inqweapon.FocusModifier
  });

  this.calcEffectivePsyRating();
  if(this.inqcharacter) this.SB = this.inqcharacter.bonus('S');
  special.beforeRange();
  if(this.PR && this.inqweapon.Class == 'Psychic') {
    this.modifiers.push({Name: 'Psy Rating', Value: 5 * this.PR});
  }

  this.calcRange();
  this.calcStatus();
  this.calcRoF();
  special.beforeRoll();
  if(this.inqweapon.Class == 'Heavy' && !this.braced){
    this.modifiers.push({Name: 'Unbraced', Value: -30});
  }
}
