INQUse.prototype.defaultProperties = function(){
  this.braced = false;
  this.range = '';
  if(!this.options.FocusStrength) this.options.FocusStrength = '';
  if(!this.options.modifiers) this.options.modifiers = '';

  this.jamsAt = 101;
  this.jamResult = '?';

  this.PsyPheDropDice = 0;
  this.PsyPheModifier = 0;

  this.hordeDamageMultiplier = 1;
  this.hordeDamage = 0;

  this.ammoMultiplier = 1;
  this.hitsMultiplier = 1;
  this.maxHitsMultiplier = 1;

  this.SB = 0;
  this.PR = 0;
}
