INQDamage.prototype.recordWounds = function(graphic) {
  remainingWounds = Number(graphic.get('bar3_value')) - this.damage;
  remainingWounds = this.calcCrit(remainingWounds);
  graphic.set('bar3_value', remainingWounds);
  if(this.damage > 0) damageFx(graphic, attributeValue('DamageType'));
}
