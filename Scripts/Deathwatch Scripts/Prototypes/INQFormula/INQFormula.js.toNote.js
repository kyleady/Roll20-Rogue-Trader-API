INQFormula.prototype.toNote = function(){
  if(this.onlyZero()) return '0';
  var multiplier = '' + this.Multiplier;
  var dicenumber = '' + this.DiceNumber;
  var modifier   = '' + this.Modifier;

  if(this.Multiplier_PR) multiplier += 'PR';
  if(this.Multiplier_SB) multiplier += 'SB';
  multiplier = multiplier.replace(/^(\D*)1(\D+)$/, '$1$2');

  if(this.DiceNumber_PR) dicenumber += 'PR';
  if(this.DiceNumber_SB) dicenumber += 'SB';
  dicenumber = dicenumber.replace(/^(\D*)1(\D+)$/, '$1$2');

  if(this.Modifier_PR) modifier += 'PR';
  if(this.Modifier_SB) modifier += 'SB';
  modifier = modifier.replace(/^(\D*)1(\D+)$/, '$1$2');

  var note = '';
  var diceAndModifier = dicenumber != '0' && modifier != '0';
  if(multiplier != '1'){
    note += multiplier + ' x ';
    if(diceAndModifier) note += '(';
  }

  if(dicenumber != '0'){
    if(dicenumber != '1') note += dicenumber;
    note += 'D';
    note += this.DiceType;
  }

  if(diceAndModifier){
    if(this.Modifier >= 0){
      note += ' + ';
    } else {
      modifier = modifier.replace('-', ' - ');
    }
  }
  if(modifier != '0') note += modifier;
  if(multiplier != '1' && diceAndModifier) note += ')';

  return note;
}
