INQUse.prototype.roll = function(){
  var skill;
  if(this.inqweapon.Class == 'Melee'){
    skill = 'WS';
  } else if(this.inqweapon.isRanged()){
    skill = 'BS';
  } else {
    skill = this.inqweapon.FocusTest;
  }

  this.test = new INQTest({
    skill: skill,
    modifier: this.modifiers,
    inqcharacter: this.inqcharacter
  });

  this.test.roll();
  this.hits = 0;
  if(this.test.Successes >= 0) {
    this.hits++;
    switch(this.mode){
      case 'Semi':
        this.hits += Math.floor(this.test.Successes / 2);
      break;
      case 'Full':
        this.hits += this.test.Successes;
      break;
    }
  }

  this.hits *= this.hitsMultiplier;
  this.maxHits += this.maxHitsMultiplier;
  if(this.hits > this.maxHits) this.hits = this.maxHits;
}
