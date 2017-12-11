INQUse.prototype.displayHitReport = function(){
  var name;
  if(this.inqcharacter) name = this.inqcharacter.Name;
  var extraLines = [];
  extraLines.push({Name: 'Hits', Content: '[[' + this.hits + ']]'});
  if(this.inqweapon.Class == 'Psychic') {
    if(this.PsyPhe) {
      var PsyPhe = new INQFormula();
      PsyPhe.DiceNumber = 1;
      PsyPhe.DiceType = 100;
      PsyPhe.Modifier = this.PsyPheModifier;
      var PsyPheDiceRule = '';
      if(this.PsyPheDropDice){
        PsyPhe.DiceNumber += this.PsyPheDropDice;
        PsyPheDiceRule = 'dl' + this.PsyPheDropDice;
      }

      extraLines.push({
        Name: 'Phenomena',
        Content: PsyPhe.toInline(PsyPheDiceRule)
      });
    } else {
      extraLines.push({
        Name: 'Phenomena',
        Content: '-'
      });
    }
  }

  this.inqtest.display(this.playerid, name, this.gm, extraLines);
}
