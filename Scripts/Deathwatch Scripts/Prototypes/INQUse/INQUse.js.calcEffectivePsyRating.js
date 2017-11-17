INQUse.prototype.calcEffectivePsyRating = function(){
  if(!this.inqcharacter) return;
  if(this.inqweapon.Class != 'Psychic') return;
  this.PsyRating = this.inqcharacter.Attributes.PR;
  if(/^\s*Unfettered\s*$/i.test(this.options.FocusStrength)){
    this.PsyRating /= 2;
    this.PsyRating = Math.ceil(this.PsyRating);
    this.PsyPheOnes = -1;
    this.PsyPheModifier = 0;
  } else if(/^\s*Fettered\s*$/i.test(this.options.FocusStrength)){
    this.PsyPheOnes = 9;
    this.PsyPheModifier = 0;
  } else if(/^\s*Push\s*$/i.test(this.options.FocusStrength)){
    this.PsyRating *= 1.5;
    this.PsyRating = Math.ceil(this.PsyRating);
    this.PsyPheOnes = 10;
    this.PsyPheModifier = 10;
  } else if(/^\s*True\s*$/i.test(this.options.FocusStrength)){
    this.PsyRating *= 2;
    this.PsyPheOnes = 10;
    this.PsyPheModifier = 50;
  }

  if(this.options.BonusPR) this.PsyRating += Number(this.options.BonusPR);
}
