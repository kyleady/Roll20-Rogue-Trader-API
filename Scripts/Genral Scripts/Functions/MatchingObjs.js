function matchingObjs(types, keywords, additionalCriteria){
  if(typeof types == 'string') types = [types];
  for(var i = 0; i < keywords.length; i++){
    if(keywords[i] == ''){
      keywords.splice(i,1);
      i--;
    } else {
      keywords[i] = keywords[i].toLowerCase();
    }
  }

  var playerSearch = (types[0] == 'player' && types.length == 1);
  if(!keywords.length) return [];
  var filteredObjs = filterObjs(function(obj){
    if(types.indexOf(obj.get('_type')) == -1) return false;
    if(obj.get('_type') == 'player'){
      var name = obj.get('_displayname');
    } else {
      var name = obj.get('name');
    }

    name = name.toLowerCase();
    for(var i = 0; i < keywords.length; i++){
      if(name.indexOf(keywords[i]) == -1) return false;
    }

    if(typeof additionalCriteria == 'function'){
      return additionalCriteria(obj);
    } else {
      return true;
    }
  });

  if(playerSearch){
    var characters = filterObjs(function(obj){
      if(obj.get('_type') != 'character') return false;
      name = obj.get('name').toLowerCase();
      if(obj.get('controlledby') == ''
      || obj.get('controlledby') == 'all'
      || obj.get('controlledby').includes(',')) return false;
      for(var i = 0; i < keywords.length; i++){
        if(name.indexOf(keywords[i]) == -1) return false;
      }

      var owner = getObj('player', obj.get('controlledby'));
      if(typeof additionalCriteria == 'function'){
        return additionalCriteria(owner);
      } else {
        return true;
      }
    });

    for(var character of characters){
      var playerID = character.get('controlledby');
      var newPlayer = true;
      for(var obj of filteredObjs){
        if(obj.id == playerID) {
          newPlayer = false;
          break;
        }
      }

      if(newPlayer) filteredObjs.push(getObj('player', playerID));
    }
  }

  return filteredObjs;
}
