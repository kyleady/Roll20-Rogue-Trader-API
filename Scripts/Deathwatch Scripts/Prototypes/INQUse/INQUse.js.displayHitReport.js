INQUse.prototype.displayHitReport = function(){
  var name;
  if(this.inqcharacter) name = this.inqcharacter.Name;
  var extraLines = [];
  extraLines.push({Name: 'Hits', Content: '[[' + this.hits + ']]'});
  if(this.inqweapon.Class == 'Psychic') {
    var bonusPR = Number(this.options.BonusPR);
    var pushPR = Number(this.options.PushPR);
    var basePR = this.PR - bonusPR - pushPR;
    extraLines.push({
      Name: 'Psy Rating',
      Content: '[[' + basePR + '+' + pushPR + '+' + bonusPR + ']]'
    });
    if(this.PsyPhe) {
      var PsyPhe = new INQFormula();
      PsyPhe.DiceNumber = 1;
      PsyPhe.DiceType = 100;
      PsyPhe.Modifier = this.PsyPheModifier;
      var PsyPheDiceRule = '';
      if(this.PsyPheDropDice){
        PsyPhe.DiceNumber += this.PsyPheDropDice;
        PsyPheDiceRule = 'dh' + this.PsyPheDropDice;
      }

      extraLines.push({
        Name: 'Phenomena',
        Content: PsyPhe.toInline({dicerule: PsyPheDiceRule})
      });
    } else {
      extraLines.push({
        Name: 'Phenomena',
        Content: '-'
      });
    }
  }

  var scatter = this.calcScatter();
  if(scatter) extraLines.push(scatter);
  this.inqtest.display(this.playerid, name, this.gm, extraLines);
}
