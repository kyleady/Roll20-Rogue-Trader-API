INQUse.prototype.defaultProperties = function(){
  this.braced = false;
  this.range = '';
  if(!this.options.FocusStrength) this.options.FocusStrength = '';

  this.jamsAt = 96;
  this.jamResult = 'Jam';

  this.PsyPheDrop = 0;
  this.PsyPheModifier = 0;

  this.hordeDamageMultiplier = 1;
  this.hordeDamage = 0;

  this.ammoMultiplier = 1;
  this.hitsMultiplier = 1;
  this.maxHitsMultiplier = 1;
}
