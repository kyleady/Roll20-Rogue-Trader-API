INQUse.prototype.calcRange = function(){
  if(!this.inqtarget) return;
  if(!this.inqcharacter) return;
  var distance = getRange(this.inqcharacter.GraphicID, this.inqtarget.GraphicID);
  if(distance == undefined) return;
  var range = this.inqweapon.Range.roll({PR: this.PR, SB: this.SB});
  if(!range) range = 1;
  if(this.inqweapon.Class == 'Melee') {
    if(distance <= range){
      this.range = 'Melee';
    } else {
      whisper('Out of melee range.', {speakingTo: this.playerid, gmEcho: true});
      this.range = 'Impossible';
      this.autoFail = true;
    }
  } else if (distance <= 2) {
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
    whisper('Out of range: ' + distance  + 'm/' + range + 'm', {speakingTo: this.playerid, gmEcho: true});
    this.range = 'Impossible';
    this.autoFail = true;
  }

  this.range += '(' + distance + '/' + range + ')';
}
