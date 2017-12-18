INQDamage.prototype.checkDamage = function() {
  var isStarship = this.targetType == 'starship';
  var starshipDam = /S/i.test(this.DamType.get('current'));
  if(isStarship != starshipDam) {
    var output = this.inqcharacter.Name + ': Using ';
    if(!starshipDam) output += 'non-';
    output += 'starship damage on a ';
    if(!isStarship) output += 'non-';
    output += 'starship. Aborting. [Correct This](!damage type = ';
    output += isStarship ? 'S' : 'I';
    output += ')';
    whisper(output);
    return false;
  }

  return true;
}
