//turns the weapon prototype into text for an NPC's notes
INQWeapon.prototype.toNote = function(justText){
  var output = '';
  output += this.Name;
  output += ' (';
  output += this.Class + '; ';
  if(!this.Range.onlyZero()) output += this.Range + 'm; ';
  if(this.Class != 'Melee' && (this.Single || !this.Semi.onlyZero() || !this.Full.onlyZero())){
    output += (this.Single) ? 'S' : '-';
    output += '/';
    output += (!this.Semi.onlyZero()) ? this.Semi : '-';
    output += '/';
    output += (!this.Full.onlyZero()) ? this.Full : '-';
    output += '; ';
  }

  output += this.Damage + ' ' + this.DamageType.toNote(justText) + '; ';
  output += 'Pen ' + this.Penetration + '; ';
  if(this.Clip) output += 'Clip ' + this.Clip + '; ';
  if(this.getReload()) output += `Reload ${this.getReload()}; `;
  output += this.getSpecial(justText);

  output = output.replace(/(;|,)\s*$/, '');
  output += ')';
  return output;
}
