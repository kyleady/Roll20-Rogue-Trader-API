INQWeaponParser.prototype.parsePenetration = function(content){
  var link = new INQLinkParser();
  var regex = '^\\s*';
  regex += '((?:\\d*\\s*x?\\s*PR|\\d+)\\s*x\\s*)?';
  regex += '(\\d*\\s*D\\s*\\d+)';
  regex += '(\\s*(?:\\+|-|)\\s*(?:\\d*\\s*x?\\s*PR|\\d+))?';
  regex += '\\s*$';
  var re = new RegExp(regex, 'i');
  var matches = content.match(re);
  if(matches){
    var PenMultiplication = matches[1];
    var PenDice = matches[2];
    var PenModifier = matches[3];

    if(PenMultiplication){
      PenMultiplication = PenMultiplication.replace(/[\sx]/gi, '');
      if(Number(PenMultiplication)) PenMultiplication = Number(PenMultiplication);
      this.PenDiceMultiplier = PenMultiplication;
    }
    if(PenDice){
      matches = PenDice.match(/^\s*(\d*)\s*D\s*(\d+)\s*$/i);
      if(!matches[1]) matches[1] = 1;
      this.PenDiceNumber = Number(matches[1]);
      this.PenDiceType = Number(matches[2]);
    }
    if(PenModifier){
      PenModifier = PenModifier.replace(/[\sx]/gi, '');
      if(Number(PenModifier)) PenModifier = Number(PenModifier);
      this.Pen = PenModifier;
    }
  } else {
    whisper('Invalid Penetration');
  }
}
