function suggestCMD(suggestedCMD, names, playerid, type, additionalCriteria){
  type = type || 'handout';
  if(typeof names == 'string') names = [names];
  var index = suggestedCMD.search(/\$([^\$]|$)/);
  suggestedCMD = suggestedCMD.replace(/\$\$/g, '$');
  if(index == -1) {
    whisper('Each suggestion will be the same.');
    return false;
  }

  var front = suggestedCMD.substring(0, index).replace(/^!/, '');
  var end = suggestedCMD.substring(index+1);
  var output = [];
  for(var i = 0; i < names.length; i++){
    var name = names[i];
    var items = matchingObjs(type, name.split(' '), additionalCriteria);
    items = trimToPerfectMatches(items, name);
    if(items.length <= 0){
      whisper('*' + name + '* was not found.', {speakingTo: playerid, gmEcho: true});
      return false;
    } else if(items.length > 1) {
      whisper('There were multiple matches for *' + name + '*.', {speakingTo: playerid,  gmEcho: true});
      _.each(items, function(item){
        if(item.get('_type') == 'player'){
          names[i] = item.get('_displayname');
        } else {
          names[i] = item.get('name');
        }

        var suggestion = front + names.toString() + end;
        suggestion = '!{URIFixed}' + encodeURIFixed(suggestion);
        whisper('[' + names[i] + '](' + suggestion  + ')', {speakingTo: playerid, gmEcho: true});
      });

      return false;
    } else {
      output.push(items[0]);
    }
  }

  return output;
}
