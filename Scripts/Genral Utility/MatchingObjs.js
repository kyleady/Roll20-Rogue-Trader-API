//a general use function that searches for all of the objects that match at
//least one of the given types and all of the given keywords
function matchingObjs(types, keywords, additionalCriteria){
  //be sure types is an array
  if(typeof types == 'string'){
    types = [types];
  }
  //ignore any empty keywords
  for(var i = 0; i < keywords.length; i++){
    if(keywords[i] == ""){
      keywords.splice(i,1);
      i--;
    }
  }
  //be sure at least one keyword was given
  //otherwise return nothing
  if(keywords.length <= 0){
    return [];
  }
  //the search is case insensitive
  for(var i = 0; i < keywords.length; i++){
    keywords[i] = keywords[i].toLowerCase();
  }
  //get an array of all of the matching objects
  return filterObjs(function(obj){
    //the object must match at least one of the types
    if(types.indexOf(obj.get("_type")) == -1){
      return false;
    }

    //get the object's name
    if(obj.get("_type") == "player"){
      var name = obj.get("_displayname");
    } else {
      var name = obj.get("name");
    }
    //the search is case insensitive
    name = name.toLowerCase();
    //the object must have every key word within it
    for(var i = 0; i < keywords.length; i++){
      if(name.indexOf(keywords[i]) == -1){
        //one of the keywords was not found, do not keep this result
        return false;
      }
    }

    //allow for additional criteria to be specified
    if(typeof additionalCriteria == 'function'){
      return additionalCriteria(obj);
    } else {
      //every valid check was passed
      return true;
    }
  });
}

//sometimes you need to limit down an array of objects (likely obtained from
//matchingObjs()) to only results that perfectly match. BUT only trim the array
//down if there is at least one exact match
function trimToPerfectMatches(objs, phrase){
  //exact matches are case sensitive
  var exactMatches = [];
  _.each(objs, function(obj){
    if(obj.get("_type") == "player"){
      var name = obj.get("_displayname");
    } else {
      var name = obj.get("name");
    }
    if(name == phrase){
      exactMatches.push(obj);
    }
  });
  //was there at least one exact match?
  if(exactMatches.length >= 1){
    return exactMatches;
  } else {
    //otherwise just return what you had in the first place
    return objs;
  }
}
