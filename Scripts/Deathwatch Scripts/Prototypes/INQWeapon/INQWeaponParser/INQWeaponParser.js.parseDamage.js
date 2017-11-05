INQWeaponParser.prototype.parseDamage = function(content){
  var damage;
  var damagetype = content.replace(RegExp(INQFormula.regex(), 'i'), function(match){
    damage = match;
    return '';
  });

  this.Damage = new INQFormula(damage);
  this.DamageType = new INQLink(damagetype);
}
