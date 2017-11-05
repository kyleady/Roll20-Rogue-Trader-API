INQFormula.prototype.parse = function(text){
  this.reset();
  var re = new RegExp('^' + INQFormula.regex() + '$', 'i');
  var matches = text.match(re);
  if(matches){
    var Multiplier = matches[1];
    var DiceNumber = matches[2];
    var DiceType = matches[3];
    var Modifier = matches[4];

    if(Multiplier){
      Multiplier = Multiplier.replace(/[\sx]/gi, '');
      if(/PR/i.test(Multiplier)) {
        this.Multiplier_PR = true;
        Multiplier = Multiplier.replace(/PR/gi, '');
      }
      if(/SB/i.test(Multiplier)) {
        this.Multiplier_SB = true;
        Multiplier = Multiplier.replace(/SB/gi, '');
      }

      if(!/\d/.test(Multiplier)) Multiplier += '1';
      this.Multiplier = Number(Multiplier);
    }
    if(DiceType){
      if(/PR/i.test(DiceNumber)) {
        this.DiceNumber_PR = true;
        DiceNumber = DiceNumber.replace(/PR/gi, '');
      }
      if(/SB/i.test(DiceNumber)) {
        this.DiceNumber_SB = true;
        DiceNumber = DiceNumber.replace(/SB/gi, '');
      }

      if(!/\d/.test(DiceNumber)) DiceNumber += '1';
      this.DiceNumber = Number(DiceNumber);
      this.DiceType = Number(DiceType);
    }
    if(Modifier){
      Modifier = Modifier.replace(/[\sx]/gi, '');
      if(/PR/i.test(Modifier)) {
        this.Modifier_PR = true;
        Modifier = Modifier.replace(/PR/gi, '');
      }
      if(/SB/i.test(Modifier)) {
        this.Modifier_SB = true;
        Modifier = Modifier.replace(/SB/gi, '');
      }

      if(!/\d/.test(Modifier)) Modifier += '1';
      this.Modifier = Number(Modifier);
    }
  } else {
    whisper('Invalid INQValue');
  }
}
