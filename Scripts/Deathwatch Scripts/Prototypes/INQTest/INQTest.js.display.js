INQTest.prototype.display = function(playerid, name, gm){
  var output = '';
  var skillName = getLink(this.Skill);
  if(this.Subgroup) skillName += '(' + this.Subgroup + ')';
  if(gm){
    output += '/w gm ';
    if(!playerIsGM(playerid)) {
      var testName;
      if(skillName){
        testName = skillName + '(' + this.Characteristic + ')';
      } else {
        testName = this.Characteristic;
      }

      whisper('Rolling ' + testName + ' for the GM.', {speakingTo: playerid});
    }
  }

  output += '&{template:default} ';
  output += '{{name=<strong>' + this.Characteristic + '</strong>';
  if(name) output += ': ' + name;
  output += '}} ';
  if(skillName) output += '{{Skill=' + skillName + '}}';
  var formula = new INQFormula('D100');
  formula.DiceNumber = -1;
  formula.Modifier = this.Stat;
  for(var modifier of this.Modifiers) formula.Modifier += modifier.Value;
  formula.Multiplier = 0.1;
  var inline = formula.toInline();
  if(this.Die > 0) inline = inline.replace('1D100', '(' + this.Die + ')');
  output += '{{Successes=' + inline + '}} ';
  if(this.Unnatural >= 0) output += '{{Unnatural=[[ceil((' + this.Unnatural + ')/2)]]}} ';
  if(this.Modifiers.length) {
    output += '{{Modifiers=';
    for(var modifier of this.Modifiers){
      output += modifier.Name + '(';
      if(modifier.Value > 0) output += '+';
      output += modifier.Value + '), ';
    }
    output = output.replace(/,\s*$/, '');
    output += '}}';
  }

  announce(output, {speakingAs: 'player|' + playerid});
}
