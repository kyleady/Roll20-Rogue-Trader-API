INQAttack.prototype.display = function(extraLines){
  extraLines = extraLines || [];
  var inqweapon = this.inquse.inqweapon;
  var output = '';
  if(this.inquse.gm) output += '/w gm ';
  output += '&{template:default} {{name=<strong>Damage</strong>: ' + inqweapon.Name + '}} ';
  output +=  '{{Damage=' + inqweapon.Damage.toInline({
    SB: this.inquse.SB,
    PR: this.inquse.PR,
    dicerule: this.damDiceRule()
  }) + '}} ';
  output += '{{Type=' + inqweapon.DamageType + '}} ';
  output += '{{Pen='  + inqweapon.Penetration.toInline({
    SB: this.inquse.SB,
    PR: this.inquse.PR
  }) + '}} ';
  if(this.hordeDamage) output += '{{HDam=[['  + this.hordeDamage + ']]}} ';
  var notes = inqweapon.Special.map(rule => ' ' + rule);
  output += '{{Notes=' + notes + '}} ';
  for(var line of extraLines){
    output += '{{';
    output += line.Name;
    output += '=';
    output += line.Content;
    output += '}} ';
  }

  announce(output, {speakingAs: 'player|' + this.inquse.playerid});
}
