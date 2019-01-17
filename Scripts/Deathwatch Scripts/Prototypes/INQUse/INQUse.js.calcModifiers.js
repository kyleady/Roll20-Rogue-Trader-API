INQUse.prototype.calcModifiers = function(){
  this.defaultProperties();
  var special = new INQQtt(this);
  if(!this.inqcharacter) this.autoHit = true;
  this.parseModifiers();
  this.modifiers.push({
    Name: 'Focus Modifier',
    Value: this.inqweapon.FocusModifier
  });

  this.calcEffectivePsyRating();
  if(this.inqcharacter) this.SB = this.inqcharacter.bonus('S');
  special.beforeRange();
  this.calcRange();
  this.calcStatus();
  this.calcRoF();
  if(this.inqweapon.isRanged()) {
    this.jamsAt = 96;
    this.jamResult = 'Jam';
    if(this.mode == 'Semi' || this.mode == 'Full') this.jamsAt = 94;
  } else if(this.inqweapon.Class == 'Psychic'){
    this.jamsAt = 91;
    this.jamResult = 'Fail';
  }

  special.beforeRoll();
  this.gm = playerIsGM(this.playerid);
  if(this.inqcharacter) this.gm = this.inqcharacter.controlledby == '';
  this.applyOptions();
  if(this.inqweapon.Class == 'Heavy' && !this.braced){
    whisper(this.inqcharacter.Name + ' is Unbraced.', { delay: 500 })
    //this.modifiers.push({Name: 'Unbraced', Value: -30});
  }
}
