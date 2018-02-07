function getProperStatName(statName){
  var isUnnatural = /^unnatural\s*/i.test(statName);
  if(isUnnatural) statName = statName.replace(/^unnatural\s*/i,'');
  switch(statName.replace(/ /g, '').toLowerCase()){
    case 'pr': case 'pe':
      statName = 'Per';
      break;
    case 'psyrating':
      statName = 'PR';
      break;
    case 'ws': case 'bs':
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
    case 'structuralintegrity': case 'si':
      statName = 'Structural Integrity';
      break;
    case 'voidshields':
      statName = 'VoidShields';
      break;
    case 'tacticalspeed':
      statName = 'Tactical Speed';
      break;
    case 'aerialspeed':
      statName = 'Aerial Speed';
      break;
    case 'damtype':
      statName = 'DamageType';
      break;
    default:
      statName = statName.toTitleCase();
  }

  if(/Ignores?\s*Natural\s*Armou?r/i.test(statName)) statName = 'Ignores Natural Armour';
  statName = statName.replace(/^armou?r(?:_|\s*)(\w\w?)$/i, function(match, p1){
    return 'Armour_' + p1.toUpperCase();
  });

  if(isUnnatural) statName = 'Unnatural ' + statName;
  return statName;
}

function defaultToTokenBars(name){
  switch(name.toLowerCase().replace(/\s/g, '')){
    case 'fatigue': case 'population': case 'tacticalspeed':
      return 'bar1';
    case 'fate': case 'morale': case 'aerialspeed':
      return 'bar2';
    case 'wounds': case 'structuralintegrity': case 'si': case 'hull':
      return 'bar3';
  }
}

on('ready', function() {
  var inqStats = ['WS', 'BS', 'S', 'T', 'Ag', 'I(?:n|t|nt)', 'Wp', 'P(?:r|e|er)', 'Fel?', 'Cor', 'Corruption', 'Wounds', 'Structural\\s*Integrity', 'S\\s*I'];
  var inqLocations = ['H', 'RA', 'LA', 'B', 'RL', 'LL', 'F', 'S', 'R', 'P', 'A'];
  var inqAttributes = ['Psy\\s*Rating', 'Fate', 'Insanity', 'Renown', 'Crew', 'Fatigue', 'Population', 'Morale', 'Hull', 'Void\\s*Shields', 'Turret', 'Manoeuvrability', 'Detection', 'Tactical\\s*Speed', 'Aerial\\s*Speed'];
  var inqUnnatural = 'Unnatural\\s*(?:';
  for(var inqStat of inqStats){
    inqAttributes.push(inqStat);
    inqUnnatural += inqStat + '|';
  }
  inqUnnatural = inqUnnatural.replace(/\|$/,')');
  inqAttributes.push(inqUnnatural);
  var inqArmour = 'Armou?r(?:_|\\s*)(?:';
  for(var inqLocation of inqLocations){
    inqArmour += inqLocation + '|';
  }
  inqArmour = inqArmour.replace(/\|$/,')');
  inqAttributes.push(inqArmour);
  var re = makeAttributeHandlerRegex(inqAttributes);
  CentralInput.addCMD(re, function(matches,msg){
    matches[2] = getProperStatName(matches[2]);
    var tokenBar = defaultToTokenBars(matches[2]);
    attributeHandler(matches,msg,{bar: tokenBar});
  },true);

  var profitFactorRe = makeAttributeHandlerRegex(['Profit Factor', 'P\\s*F']);
  CentralInput.addCMD(profitFactorRe, function(matches,msg){
    matches[2] = 'Profit Factor';
    attributeHandler(matches,msg,{partyStat: true});
  }, true);
});
