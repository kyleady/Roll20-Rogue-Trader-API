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
}
