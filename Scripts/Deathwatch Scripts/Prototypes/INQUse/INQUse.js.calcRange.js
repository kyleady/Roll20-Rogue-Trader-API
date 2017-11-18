INQUse.prototype.calcRange = function(){
  if(!this.inqweapon.isRanged()) return;
  var distance = getRange(this.inqcharacter.GraphicID, this.inqtarget.GraphicID);
  var range = this.inqweapon.Range.roll({PR: this.PR, SB: this.SB});
  var modifier = 0;
  if(distance <= 2) {
    this.modifiers.push({Name: 'Point Blank', Value: 30});
    this.range = 'Point Blank';
  } else if (distance <= range / 2) {
    this.modifiers.push({Name: 'Close Range', Value: 10});
    this.range = 'Close';
  } else if (distance <= range) {
    this.range = 'Standard';
  } else if (distance <= 2 * range) {
    this.modifiers.push({Name: 'Long Range', Value: -10});
    this.range = 'Long';
  } else if (distance <= 3 * range) {
    this.modifiers.push({Name: 'Extended Range', Value: -20});
    this.range = 'Extended';
  } else if (distance <= 4 * range) {
    this.modifiers.push({Name: 'Extreme Range', Value: -30});
    this.range = 'Extreme';
  } else {
    this.modifiers.push({Name: 'Impossible', Value: -1000});
    this.range = 'Impossible';
  }
}
