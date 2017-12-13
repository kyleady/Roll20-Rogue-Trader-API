INQUse.prototype.display = function(){
  var output = '';
  if(this.gm) output += '/w ';
  output += '<br><strong>Weapon</strong>: ';
  output += this.inqweapon.toLink();
  output += '<br>';
  if(this.inqammo) {
    output += '<strong>Ammo</strong>: ';
    output += this.inqammo.toLink();
    output += '<br>';
  }

  output += '<strong>Mode</strong>: ';
  output += this.mode + '(' + this.maxHits * this.maxHitsMultiplier + ')';
  output += '<br>';
  if(this.inqclip) output += this.inqclip.display() + '<br>';
  if(this.range && !/^Melee/i.test(this.range)) {
    output += '<strong>Range</strong>: ';
    output += this.range;
    output += '<br>';
  }

  if(this.inqtarget) {
    output += '<strong>Target</strong>: ';
    output += '[' + this.inqtarget.Name + '](!pingG ' + this.inqtarget.GraphicID + ')';
    output += '<br>';
  }

  announce(output, {speakingAs: 'player|' + this.playerid});
  if(this.inqtest) this.displayHitReport();
  if(this.critical) announce('/em ' + this.critical, {speakingAs: 'Critical', delay: 100});
  if(this.reroll) whisper(this.reroll, {speakingTo: this.playerid, gmEcho: true, delay: 100});
  if(this.inqattack) {
    this.inqattack.display();
    saveHitLocation(this.inqtest.Die, {whisper: this.gm});
  }
  if(this.warning) announce('/em ' + this.warning, {speakingAs: 'The', delay: 100});
}
