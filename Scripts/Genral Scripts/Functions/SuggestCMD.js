function suggestCMD(suggestedCMD, names, playerid, type, additionalCriteria){
  type = type || 'handout';
  if(typeof names == 'string') names = [names];
  var output = [];
  for(let i = 0; i < names.length; i++){
    var name = names[i];
    if(name == '') {
      output.push({get: () => ''});
      continue;
    }
    var items = matchingObjs(type, name.split(' '), additionalCriteria);
    items = trimToPerfectMatches(items, name);
    if(!suggestIfNotOne(items, names, suggestedCMD, playerid, i)) return false;
    output.push(items[0]);
  }

  return output;
}
