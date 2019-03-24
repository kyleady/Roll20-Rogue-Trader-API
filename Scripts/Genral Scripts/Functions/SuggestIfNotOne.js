const suggestIfNotOne = (items, names, suggestedCMD, playerid, nameIndex) => {
  nameIndex = nameIndex || 0;
  if(typeof names == 'string') names = [names];
  const name = names[nameIndex];

  var suggestionIndex = suggestedCMD.search(/\$([^\$]|$)/);
  suggestedCMD = suggestedCMD.replace(/\$\$/g, '$');
  var suggestionFront = suggestedCMD.substring(0, suggestionIndex).replace(/^!/, '');
  var suggestionEnd = suggestedCMD.substring(suggestionIndex+1);

  if(items.length <= 0){
    whisper('*' + name + '* was not found.', {speakingTo: playerid, gmEcho: true});
    return false;
  } else if(items.length > 1) {
    whisper('There were multiple matches for *' + name + '*.', {speakingTo: playerid,  gmEcho: true});
    _.each(items, function(item){
      if(item.get('_type') == 'player'){
        names[nameIndex] = item.get('_displayname');
      } else {
        names[nameIndex] = item.get('name');
      }

      var suggestion = suggestionFront + names.toString() + suggestionEnd;
      suggestion = '!{URIFixed}' + encodeURIFixed(suggestion);
      whisper('[' + names[nameIndex] + '](' + suggestion  + ')', {speakingTo: playerid, gmEcho: true});
    });

    return false;
  } else {
    return true;
  }
}
