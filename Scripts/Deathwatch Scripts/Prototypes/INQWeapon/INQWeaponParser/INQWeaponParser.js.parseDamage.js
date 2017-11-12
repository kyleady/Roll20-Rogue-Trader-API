INQWeaponParser.prototype.parseDamage = function(content){
  var damage;
  var damagetype = content.replace(RegExp(INQFormula.regex(), 'i'), function(match){
    damage = match;
    return '';
  });

  if(/^\s*$/.test(damagetype)) damagetype = 'I';
  this.Damage = new INQFormula(damage);
  this.DamageType = new INQLink(damagetype);

  if(!this.DamageType.Name) {
    whisper('Invalid Damage Type');
    log('Invalid Damage Type');
    log(damagetype);
  }
  if(this.Damage.onlyZero()) {
    whisper('Invalid Damage');
    log('Invalid Damage');
    log(damage);
  }
}
