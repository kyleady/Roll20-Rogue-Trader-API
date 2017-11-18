INQUse.prototype.calcEffectivePsyRating = function(){
  if(!this.inqcharacter) return;
  this.PR = this.inqcharacter.Attributes.PR;
  if(this.inqweapon.Class != 'Psychic') return;
  if(!this.options.FocusStrength) this.options.FocusStrength = 'Fettered';
  if(/^\s*Unfettered\s*$/i.test(this.options.FocusStrength)){
    this.PR /= 2;
    this.PR = Math.ceil(this.PR);
    this.PsyPheModifier = 0;
  } else if(/^\s*Fettered\s*$/i.test(this.options.FocusStrength)){
    this.PsyPheModifier = 0;
  } else if(/^\s*Push\s*$/i.test(this.options.FocusStrength)){
    this.PR *= 1.5;
    this.PR = Math.ceil(this.PR);
    this.PsyPheModifier = 10;
  } else if(/^\s*True\s*$/i.test(this.options.FocusStrength)){
    this.PR *= 2;
    this.PsyPheModifier = 50;
  }

  if(this.options.BonusPR) this.PR += Number(this.options.BonusPR);
  if(this.PR && this.inqweapon.Class == 'Psychic') {
    this.modifiers.push({Name: 'Psy Rating', Value: 5 * this.PR});
  }
}
