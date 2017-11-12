//allows players to roll against a skill they may or may not have
  //matches[1] - skill name
  //matches[2] - skill subgroup
  //matches[3] - modifier sign
  //matches[4] - modifier absolute value
  //matches[5] - alternate characteristic
function skillHandler(matches, msg){
  //store the input variables
  var toGM = matches[1];
  var skill = matches[2];
  if(matches[3]){
    var modifier = Number(matches[3] + matches[4]);
  } else {
    var modifier = 0;
  }
  var characteristic = matches[5];

  var inqtest = new INQTest({skill: skill, characteristic: characteristic});

  //let each character take the skill check
  eachCharacter(msg, function(character, graphic){
    var isNPC = false;
    new INQCharacter(character, graphic, function(inqcharacter){
      var isNPC = inqcharacter.controlledby == '';
      inqtest.Modifiers = [];
      inqtest.addModifier(modifier);
      inqtest.getStats(inqcharacter);
      inqtest.getSkillModifier(inqcharacter);
      inqtest.display(msg.playerid, inqcharacter.Name, toGM || isNPC);
    });
  });
}

on('ready', function(){
  var regex = '^!\\s*';
  regex += '(gm|)\\s*';
  var skills = INQTest.skills();
  regex += '((?:'
  for(var skill of skills){
    regex += toRegex(skill, {str: true}) + '|';
  }
  regex = regex.replace(/\|\s*$/, '');
  regex += ')';
  regex += '(?:\\([^\\(\\)]+\\))?\\s*';
  regex += ')';
  regex += '(?:(\\+|-)\\s*(\\d+))?\\s*';
  regex += '(?:\\|\\s*';
  regex += '(';
  var characteristics = INQTest.characteristics();
  for(var characteristic of characteristics){
    regex += toRegex(characteristic, {str: true}) + '|';
  }
  regex = regex.replace(/\|\s*$/, '');
  regex += ')';
  regex += '\\s*)?\\s*';
  regex += '$';

  CentralInput.addCMD(RegExp(regex, 'i'), skillHandler, true);
});
