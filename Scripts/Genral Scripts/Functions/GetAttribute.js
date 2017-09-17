function getAttribute(name, options) {
  if(typeof options != 'object') options = false;
  options = options || {};
  if(options['alert'] == undefined) options['alert'] = true;
  if(options['graphicid']) {
    var graphic = getObj('graphic', options['graphicid']);
    if(graphic == undefined){
      if(options['alert']) whisper('Graphic ' + options['graphicid'] + ' does not exist.');
      return undefined;
    }

    options['characterid'] = graphic.get('represents');
  }

  if(options['characterid']){
    var character = getObj('character', options['characterid']);
    if(character == undefined) {
      if(options['alert']) whisper('Character ' + options['characterid'] + ' does not exist.');
      return undefined;
    }

    var attributes = findObjs({
      _type: 'attribute',
      _characterid: options['characterid'],
      name: name
    });
    if(!attributes || attributes.length <= 0){
      if(options['setTo'] == undefined){
        if(options['alert']) whisper(character.get('name') + ' does not have a(n) ' + name + ' Attribute.');
        return undefined;
      }
    } else if(attributes.length >= 2){
      if(options['alert']) whisper('There were multiple ' + name + ' attributes owned by ' + character.get('name')
       + '. Using the first one found. A log has been posted in the terminal.');
      log(character.get('name') + '\'s ' + name + ' Attributes');
      _.each(attributes, function(attribute){ log(attribute)});
    }
  } else {
    var attributes = findObjs({
      _type: 'attribute',
      name: name
    });
    if(!attributes || attributes.length <= 0){
      if(options['alert']) whisper('There is nothing in the campaign with a(n) ' + name + ' Attribute.');
      return undefined;
    } else if(attributes.length >= 2){
      if(options['alert']) whisper('There were multiple ' + name + ' attributes. Using the first one found. A log has been posted in the terminal.');
      log(name + ' Attributes')
      _.each(attributes, function(attribute){ log(attribute)});
    }
  }

  return attributes[0];
}
