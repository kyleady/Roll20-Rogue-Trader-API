INQDamage.prototype.calcCrit = function(remainingWounds) {
  const critical = Number(this.graphic.get('bar3_value'));
  const critical_max = Number(this.graphic.get('bar3_max'));
  const critDamage = - remainingWounds - critical + critical_max;
  if(critDamage <= 0) return remainingWounds;
  var critLocation = '';
  var critType = '';
  var WBonus = 1;
  switch(this.targetType){
    case 'character':
      WBonus = Math.floor(this.inqcharacter.Attributes.Wounds / 10);
      critType = this.DamType.get('current');
      critLocation = getHitLocation(this.TensLoc.get('current'), this.OnesLoc.get('current'));
    break;
    case 'vehicle':
      WBonus = Math.floor(this.inqcharacter.Attributes['Structural Integrity'] / 10);
      critType = 'v';
    break;
    case 'starship':
      remainingWounds = 0;
      critType = 's'
    break;
  }

  WBonus = Math.max(WBonus, 1);
  const critEffect = Math.ceil(critDamage / WBonus);
  whisper('**' + this.inqcharacter.toLink() + '**: ' + getCritLink(['', critType, critLocation], {playerid: this.playerid}, {show: false}) + '(' + critEffect + ')');
  return remainingWounds;
}
