function statRoll(matches, msg){
  var toGM = matches[1] && matches[1].toLowerCase() == 'gm';
  var characteristic = matches[2];
  var modifierMatches = matches[3].match(/(\+|-)\s*(\d+)([\sa-z]*)/gi);
  var modifiers = [];
  if(modifierMatches){
    for(var modifierMatch of modifierMatches){
      var details = modifierMatch.match(/(\+|-)\s*(\d+)([\sa-z]*)/i);
      modifiers.push({Value: details[1] + details[2], Name: details[3].trim()});
    }
  }

  var inqtest = new INQTest({characteristic: characteristic, modifier: modifiers});
  eachCharacter(msg, function(character, graphic){
    var isNPC = false;
    new INQCharacter(character, graphic, function(inqcharacter){
      var isNPC = inqcharacter.controlledby == '';
      inqtest.getStats(inqcharacter);
      inqtest.display(msg.playerid, inqcharacter.Name, toGM || isNPC);
    });
  });
}

on('ready', function() {
  var rollableStats = INQTest.characteristics();
  var rollRegex = '^!\\s*(gm)?\\s*';
  rollRegex += '(';
  for(var rollableStat of rollableStats){
    rollRegex += toRegex(rollableStat, {str: true}) + '|';
  }
  rollRegex = rollRegex.replace(/\|\s*$/, '');
  rollRegex += ')\\s*';
  rollRegex += '((?:(?:\\+|-)\\s*(?:\\d+)[\\sa-z]*,?\\s*)*)\\s*$';
  var rollRe = new RegExp(rollRegex, 'i');
  CentralInput.addCMD(rollRe, statRoll, true);
});
