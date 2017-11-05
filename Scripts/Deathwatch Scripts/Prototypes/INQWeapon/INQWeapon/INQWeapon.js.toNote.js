//turns the weapon prototype into text for an NPC's notes
INQWeapon.prototype.toNote = function(){
  var output = '';
  output += this.Name;
  output += ' (';
  output += this.Class + '; ';
  if(!this.Range.onlyZero()){
    if(this.Range.Modifier < 1000){
      output += this.Range + 'm; ';
    } else {
      this.Range.Modifier = Math.round(this.Range.Modifier/1000);
      output += this.Range + 'km; ';
    }
  }

  if(this.Class != 'Melee' && (this.Single || !this.Semi.onlyZero() || !this.Full.onlyZero())){
    output += (this.Single) ? 'S' : '-';
    output += '/';
    output += (!this.Semi.onlyZero()) ? this.Semi : '-';
    output += '/';
    output += (!this.Full.onlyZero()) ? this.Full : '-';
    output += '; ';
  }

  output += this.Damage + ' ' + this.DamageType + '; ';
  output += 'Pen ' + this.Penetration + '; ';
  if(this.Clip > 0) output += 'Clip ' + this.Clip + '; ';
  if(this.Reload == 0){
    output += 'Reload Free; ';
  } else if(this.Reload == 0.5){
    output += 'Reload Half; ';
  } else if(this.Reload == 1){
    output += 'Reload Full; ';
  } else if(this.Reload > 1) {
    output += 'Reload ' + Math.floor(this.Reload) + ' Full; ';
  }

  _.each(this.Special, function(rule){
    output += rule + ', ';
  });

  output = output.replace(/(;|,)\s*$/, '');
  output += ')';
  return output;
}
