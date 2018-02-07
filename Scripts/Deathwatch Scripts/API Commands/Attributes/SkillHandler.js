function skillHandler(matches, msg){
  var toGM = matches[1];
  var skill = matches[2];
  var modifierMatches = matches[3].match(/(\+|-)\s*(\d+)([\sa-z]*)/gi);
  var modifiers = [];
  if(modifierMatches){
    for(var modifierMatch of modifierMatches){
      var details = modifierMatch.match(/(\+|-)\s*(\d+)([\sa-z]*)/i);
      modifiers.push({Value: details[1] + details[2], Name: details[3].trim()});
    }
  }

  var characteristic = matches[4];
  var inqtest = new INQTest({skill: skill, characteristic: characteristic});
  eachCharacter(msg, function(character, graphic){
    var isNPC = false;
    new INQCharacter(character, graphic, function(inqcharacter){
      var isNPC = inqcharacter.controlledby == '';
      inqtest.Modifiers = [];
      inqtest.addModifier(modifiers);
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
  regex += '((?:(?:\\+|-)\\s*(?:\\d+)[\\sa-z]*,?\\s*)*)\\s*';
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
