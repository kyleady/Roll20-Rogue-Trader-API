INQDamage.prototype.applyToughness = function() {
  if(this.targetType != 'character') return;
  this.damage += Math.min(this.Fell.get('current'), this.inqcharacter.Attributes['Unnatural T']);
  this.damage -= this.inqcharacter.bonus('T');
  if(this.damage < 0) this.damage = 0;
}
