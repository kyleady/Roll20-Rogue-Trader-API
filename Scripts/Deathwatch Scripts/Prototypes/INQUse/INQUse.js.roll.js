INQUse.prototype.roll = function(){
  var skill = this.options.skill;
  var characteristic = this.options.characteristic;
  if(this.inqweapon.Class == 'Melee'){
    characteristic = characteristic || 'WS';
  } else if(this.inqweapon.isRanged()){
    characteristic = characteristic || 'BS';
  } else {
    skill = skill || this.inqweapon.FocusTest;
  }

  this.inqtest = new INQTest({
    characteristic: characteristic,
    skill: skill,
    modifier: this.modifiers,
    inqcharacter: this.inqcharacter
  });

  this.inqtest.roll();
  this.diceEvents();
  this.hits = 0;
  state.Successes = this.inqtest.Successes;
  if(this.inqtest.Successes >= 0) {
    this.hits++;
    switch(this.mode){
      case 'Semi':
        this.hits += Math.floor(this.inqtest.Successes / 2);
      break;
      case 'Full':
        this.hits += this.inqtest.Successes;
      break;
    }
  }

  log('=Hits=')
  log(this.hits)
  log('=Hits Multiplier=')
  log(this.hitsMultiplier)
  log('=Max Hits=')
  log(this.maxHits)
  log('=Max Hits Multiplier=')
  log(this.maxHitsMultiplier)
  this.hits *= this.hitsMultiplier;
  var maxHits = this.maxHits * this.maxHitsMultiplier;
  if(this.hits > maxHits) this.hits = maxHits;
}
