//rolls a D100 against the designated stat and outputs the number of successes
//takes into account corresponding unnatural bonuses
//negative success equals the number of failures

//matches[0] is the same as msg.content
//matches[1] is either 'gm' or null
//matches[2] is that name of the stat being rolled (it won't always be capitalized properly) and is null if no modifier is included
//matches[3] is the list of modifiers
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

//trims down and properly capitalizes any alternate stat names that the user
//enters
function getProperStatName(statName){
  var isUnnatural = /^unnatural /i.test(statName);
  if(isUnnatural){
    statName = statName.replace(/^unnatural /i,'');
  }
  switch(statName.toLowerCase()){
    case 'pr': case 'pe':
      //replace pr with Per (due to conflicts with PsyRating(PR))
      statName = 'Per';
      break;
    case 'psy rating':
      statName = 'PR';
      break;
    case 'ws': case 'bs':
      //capitalize every letter
      statName = statName.toUpperCase();
      break;
    case 'int': case 'in':
      statName = 'It';
      break;
    case 'fel':
      statName = 'Fe';
      break;
    case 'cor':
      statName = 'Corruption';
      break;
    case 'dam':
      statName = 'Damage';
      break;
    case 'pen':
      statName = 'Penetration';
      break;
    case 'prim':
      statName = 'Primitive';
      break;
    case 'fell':
      statName = 'Felling';
      break;
    case 'damtype':
      statName = 'DamageType';
      break;
    default:
      //most Attributes begin each word with a capital letter (also known as TitleCase)
      statName = statName.toTitleCase();
  }
  statName = statName.replace(/^armour(?:_|\s*)(\w\w?)$/i, function(match, p1){
    return 'Armour_' + p1.toUpperCase();
  });
  if(isUnnatural){
    statName = 'Unnatural ' + statName;
  }
  return statName;
}

//returns barX, if the given stat is represented by barX on a token
//if it isn't represented by any bar, it returns undefined
function defaultToTokenBars(name){
  switch(name.toTitleCase()){
    case 'Fatigue':
    case 'Population':
    case 'Tactical Speed':
      return 'bar1';
    case 'Fate':
    case 'Morale':
    case 'Aerial Speed':
      return 'bar2';
    case 'Wounds':
    case 'Structural Integrity':
    case 'Hull':
      return 'bar3';
  }
  return undefined;
}

//adds the commands after CentralInput has been initialized
on('ready', function() {
  var rollableStats = INQTest.characteristics();
  var rollRegex = '^!\\s*(gm)?\\s*';
  rollRegex += '(';
  for(var rollableStat of rollableStats){
    rollRegex += toRegex(rollableStat, {str: true}) + '|';
  }
  rollRegex = rollRegex.replace(/\|\s*$/, '');
  rollRegex += ')';
  rollRegex += '((?:(?:\\+|-)\\s*(?:\\d+)[\\sa-z]*,?\\s*)*)\\s*$';
  var rollRe = new RegExp(rollRegex, 'i');
  CentralInput.addCMD(rollRe, statRoll, true);

  //lets the user quickly view their stats with modifiers
  var inqStats = ['WS', 'BS', 'S', 'T', 'Ag', 'I(?:n|t|nt)', 'Wp', 'P(?:r|e|er)', 'Fel?', 'Cor', 'Corruption', 'Wounds', 'Structural Integrity'];
  var inqLocations = ['H', 'RA', 'LA', 'B', 'RL', 'LR', 'F', 'S', 'R', 'P', 'A'];
  var inqAttributes = ['Psy Rating', 'Fate', 'Insanity', 'Renown', 'Crew', 'Fatigue', 'Population', 'Morale', 'Hull', 'Void Shields', 'Turret', 'Manoeuvrability', 'Detection', 'Tactical Speed', 'Aerial Speed'];
  var inqUnnatural = 'Unnatural (?:';
  for(var inqStat of inqStats){
    inqAttributes.push(inqStat);
    inqUnnatural += inqStat + '|';
  }
  inqUnnatural = inqUnnatural.replace(/|$/,'');
  inqUnnatural += ')';
  inqAttributes.push(inqUnnatural);
  var inqArmour = 'Armour_(?:';
  for(var inqLocation of inqLocations){
    inqArmour += inqLocation + '|';
  }
  inqArmour = inqArmour.replace(/|$/,'');
  inqArmour += ')';
  inqAttributes.push(inqArmour);
  var re = makeAttributeHandlerRegex(inqAttributes);
  CentralInput.addCMD(re, function(matches,msg){
    matches[2] = getProperStatName(matches[2]);
    var tokenBar = defaultToTokenBars(matches[2]);
    attributeHandler(matches,msg,{bar: tokenBar});
  },true);

  var profitFactorRe = makeAttributeHandlerRegex('Profit Factor');
  CentralInput.addCMD(profitFactorRe, function(matches,msg){
    matches[2] = 'Profit Factor';
    attributeHandler(matches,msg,{partyStat: true});
  }, true);
});
