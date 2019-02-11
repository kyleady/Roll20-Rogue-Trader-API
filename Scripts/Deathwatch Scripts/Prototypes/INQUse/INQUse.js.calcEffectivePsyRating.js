INQUse.prototype.calcEffectivePsyRating = function(){
  if(!this.inqcharacter) return;
  this.PR = this.inqcharacter.Attributes.PR;
  var bonusPR = Number(this.options.BonusPR) || 0;
  if(this.inqweapon.Class != 'Psychic') return;
  if(!this.options.FocusStrength) this.options.FocusStrength = 'Fettered';
  this.PR += bonusPR;
  var ModifierMultiplier = 0;
  var Strength = 'Invalid';
  if(/^\s*Fettered\s*$/i.test(this.options.FocusStrength)){
    this.PR = Math.ceil(this.PR / 2);
    ModifierMultiplier = 2;
    Strength = 'Fettered';
    this.PsyPheModifier = 0;
  } else if(/^\s*Unfettered\s*$/i.test(this.options.FocusStrength)){
    ModifierMultiplier = 3;
    Strength = 'Unfettered';
    this.PsyPheModifier = 0;
  } else if(/^\s*Push\s*$/i.test(this.options.FocusStrength)){
    ModifierMultiplier = 5;
    Strength = 'Push';
    this.PsyPheModifier = Math.ceil(this.PR / 2) * 5;
  } else if(/^\s*True\s*$/i.test(this.options.FocusStrength)){
    ModifierMultiplier = 10;
    Strength = 'True';
    this.PsyPheModifier = Math.ceil(this.PR / 2) * 5;
  }

  this.modifiers.push({Name: Strength, Value: ModifierMultiplier * this.PR});
}
