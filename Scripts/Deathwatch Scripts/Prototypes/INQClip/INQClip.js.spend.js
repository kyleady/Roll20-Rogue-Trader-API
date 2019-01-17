INQClip.prototype.spend = function(){
  this.getClipObj(Number(this.inqweapon.Clip));
  if(!this.clipObj) return true;
  var clip = Number(this.clipObj.get('current'));
  var total = this.options.shots || 1;
  log(this.options.ammoMultilpier)
  total *= this.options.ammoMultilpier || 1;
  clip -= total;
  if(clip < 0) {
    var warning = 'Not enough ammo to fire ';
    warning += this.inqweapon.toLink();
    if(this.options.inqammo) warning += ' using ' + this.options.inqammo.toLink();
    warning += '. ';
    warning += '(' + this.clipObj.get('current');
    warning += '/' + this.clipObj.get('max') + ')';
    whisper(warning, {speakingTo: this.options.playerid, gmEcho: true});
    return false;
  }

  if(this.options.freeShot) return true;
  this.clipObj.set('current', clip);
  return true;
}
