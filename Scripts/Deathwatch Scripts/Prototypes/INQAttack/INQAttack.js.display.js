INQAttack.prototype.display = function(playerid, gm, extraLines){
  extraLines = extraLines || [];
  var inqweapon = this.inquse.inqweapon;
  var output = '';
  if(gm) output += '/w gm';
  output += '&{template:default} {{name=<strong>Damage</strong>: ' + inqweapon.Name + '}} ';
  output +=  '{{Damage= ' + inqweapon.Damage.toInline({
    SB: this.inquse.SB,
    PR: this.inquse.PR,
    dicerule: this.damDiceRule()
  }) + '}} ';
  output += '{{Type=  ' + inqweapon.DamageType + '}} ';
  output += '{{Pen=  '  + inqweapon.Penetration.toInline({
    SB: this.inquse.SB,
    PR: this.inquse.PR
  }) + '}} ';
  output += '{{HDam= '  + this.hordeDamage + '}} ';
  output += '{{Notes= ' + inqweapon.Special + '}} ';
  for(var line of extraLines){
    output += '{{';
    output += line.Name;
    output += '=';
    output += line.Content;
    output += '}} ';
  }

  announce(output, {speakingAs: 'player|' + this.inquse.playerid});
}
