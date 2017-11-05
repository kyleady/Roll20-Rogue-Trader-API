INQWeaponParser.prototype.parseDamage = function(content){
  var link = new INQLinkParser();
  var regex = '^\\s*';
  regex += '((?:\\d*\\s*x?\\s*PR|\\d+)\\s*x\\s*)?';
  regex += '(\\d*\\s*D\\s*\\d+)';
  regex += '(\\s*(?:\\+|-|)\\s*(?:\\d*\\s*x?\\s*PR|\\d+))?\\s*';
  regex += '(' + link.regex() + ')';
  regex += '\\s*$';
  var re = new RegExp(regex, 'i');
  var matches = content.match(re);
  if(matches){
    var DamageMultiplication = matches[1];
    var DamageDice = matches[2];
    var DamageModifier = matches[3];
    var DamageType = maches[4];

    if(DamageMultiplication){
      DamageMultiplication = DamageMultiplication.replace(/[\sx]/gi, '');
      if(Number(DamageMultiplication)) DamageMultiplication = Number(DamageMultiplication);
      this.DiceMultiplier = DamageMultiplication;
    }
    if(DamageDice){
      matches = DamageDice.match(/^\s*(\d*)\s*D\s*(\d+)\s*$/i);
      if(!matches[1]) matches[1] = 1;
      this.DiceNumber = Number(matches[1]);
      this.DiceType = Number(matches[2]);
    }
    if(DamageModifier){
      DamageModifier = DamageModifier.replace(/[\sx]/gi, '');
      if(Number(DamageModifier)) DamageModifier = Number(DamageModifier);
      this.DamageBase = DamageModifier;
    }
    if(DamageType){
      this.DamageType = new INQLink(DamageType);
    }
  } else {
    whisper('Invalid Damage');
  }
}
