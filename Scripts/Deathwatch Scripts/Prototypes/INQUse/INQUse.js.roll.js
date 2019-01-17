INQUse.prototype.roll = function(){
  var skill;
  if(this.inqweapon.Class == 'Melee'){
    skill = 'WS';
  } else if(this.inqweapon.isRanged()){
    skill = 'BS';
  } else {
    skill = this.inqweapon.FocusTest;
  }

  this.inqtest = new INQTest({
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
