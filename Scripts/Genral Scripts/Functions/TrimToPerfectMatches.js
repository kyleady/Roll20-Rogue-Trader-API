function trimToPerfectMatches(objs, phrase){
  var exactMatches = [];
  _.each(objs, function(obj){
    if(obj.get('_type') == 'player'){
      var name = obj.get('_displayname');
    } else {
      var name = obj.get('name');
    }
    if(name == phrase){
      exactMatches.push(obj);
    }
  });
  if(exactMatches.length >= 1){
    return exactMatches;
  } else {
    return objs;
  }
}
