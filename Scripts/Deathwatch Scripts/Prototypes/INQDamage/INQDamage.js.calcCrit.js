INQDamage.prototype.calcCrit = function(remainingWounds) {
  if(remainingWounds >= 0) return remainingWounds;
  var critLocation = '';
  var critType = '';
  var critEffect =  (-1) * remainingWounds;
  var WBonus = 1;
  switch(this.targetType){
    case 'character':
      WBonus = this.inqcharacter.bonus('Wounds');
      critType = this.DamType.get('current');
      critLocation = getHitLocation(this.TensLoc.get('current'), this.OnesLoc.get('current'));
    break;
    case 'vehicle':
      WBonus = this.inqcharacter.bonus('Structural Integrity');
      critType = 'v';
    break;
    case 'starship':
      remainingWounds = 0;
      critType = 's'
    break;
  }

  WBonus = Math.max(WBonus, 1);
  critEffect = Math.ceil(critEffect / WBonus);
  whisper('**' + this.inqcharacter.toLink() + '**: ' + getCritLink(['', critType, critLocation], {playerid: this.playerid}, {show: false}) + '(' + critEffect + ')');
  return remainingWounds;
}
