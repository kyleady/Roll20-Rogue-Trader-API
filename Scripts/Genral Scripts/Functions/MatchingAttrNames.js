function matchingAttrNames(graphicid, phrase){
  var matches = [];
  var graphic = getObj('graphic', graphicid);
  if(!graphic) return whisper('Graphic ' + graphicid + ' does not exist.');
  var characterid = graphic.get('represents');
  var character = getObj('character',characterid);
  if(!character) return whisper('Character ' + characterid + ' does not exist.');
  var keywords = phrase.split(' ');
  for(var i = 0; i < keywords.length; i++) {
    if(keywords[i] == ''){
      keywords.splice(i, 1);
      i--;
    }
  }

  if(!keywords.length) return [];
  for(var i = 0; i < keywords.length; i++){
    keywords[i] = keywords[i].toLowerCase();
  }

  var matchingAttrs = matchingObjs('attribute', keywords, function(attr){
    return attr.get('_characterid') == character.id;
  });

  _.each(matchingAttrs, function(attr){
    matches.push(attr.get('name'));
  });

  var localAttributes = new LocalAttributes(graphic);
  for(var attr in localAttributes.Attributes){
    var matching = true;
    var name = attr.toLowerCase();
    for(var i = 0; i < keywords.length; i++){
      if(name.indexOf(keywords[i]) == -1){
        matching = false;
        break;
      }
    }

    if(matching) matches.push(attr);
  }

  for(var i = 0; i < matches.length; i++){
    if(matches[i] == phrase){
      matches = [phrase];
      break;
    }
  }

  return matches;
}
