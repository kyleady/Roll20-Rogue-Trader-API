INQUse.prototype.calcRoF = function(){
  if(!this.options.RoF){
    if(this.inqweapon.Single) {
      this.options.RoF = 'Single';
    } else if(!this.inqweapon.Semi.onlyZero()) {
      this.options.RoF = 'Semi';
    } else if(!this.inqweapon.Full.onlyZero()) {
      this.options.RoF = 'Full';
    } else {
      this.options.RoF = 'Single';
    }
  }

  if(/Semi/i.test(this.options.RoF)){
    this.maxHits = this.inqweapon.Semi.roll({PR: this.PR, SB: this.SB});
    this.mode = 'Semi';
  } else if(/Swift/i.test(this.options.RoF)){
    this.maxHits = Math.max(2, Math.round(this.inqcharacter.bonus('WS')/3));
    this.mode = 'Semi';
  } else if(/Full/i.test(this.options.RoF)){
    if(this.inqweapon.Class != 'Psychic') this.modifiers.push({Name: 'Full Auto', Value: -10});
    this.maxHits = this.inqweapon.Full.roll({PR: this.PR, SB: this.SB});
    this.mode = 'Full';
  } else if(/Lightning/i.test(this.options.RoF)){
    if(this.inqweapon.Class != 'Psychic') this.modifiers.push({Name: 'Lightning Attack', Value: -10});
    this.maxHits = Math.max(3, Math.round(this.inqcharacter.bonus('WS')/2));
    this.mode = 'Full';
  } else if(/Called/i.test(this.options.RoF)){
    this.modifiers.push({Name: 'Called Shot', Value: -20});
    this.maxHits = 1;
    this.mode = 'Single';
  } else if(/All\s*Out/i.test(this.options.RoF)){
    this.modifiers.push({Name: 'All Out Attack', Value: 30});
    this.maxHits = 1;
    this.mode = 'Single';
  } else { //if(/single/i.test(this.options.RoF))
    if(this.inqweapon.Class != 'Psychic') this.modifiers.push({Name: 'Single', Value: 10});
    this.maxHits = 1;
    this.mode = 'Single';
  }

  this.shotsFired = this.maxHits;
}
