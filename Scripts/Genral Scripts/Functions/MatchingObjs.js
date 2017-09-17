function matchingObjs(types, keywords, additionalCriteria){
  if(typeof types == 'string') types = [types];
  for(var i = 0; i < keywords.length; i++){
    if(keywords[i] == ''){
      keywords.splice(i,1);
      i--;
    }
  }

  if(!keywords.length) return [];
  for(var i = 0; i < keywords.length; i++){
    keywords[i] = keywords[i].toLowerCase();
  }

  return filterObjs(function(obj){
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
}
