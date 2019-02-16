//saves every attribute the character has
INQCharacterParser.prototype.parseAttributes = function(graphic){
  //start with the character sheet attributes
  var attributes = findObjs({
    _type: 'attribute',
    _characterid: this.ObjID
  });
  for(var attr of attributes){
    let useMax = attr.get('name') == 'Wounds' || this.options['useMax'];
    var value =  useMax ? 'max' : 'current';
    this.Attributes[attr.get('name')] = Number(attr.get(value));
  }

  //when working with a generic enemy's current stats, we need to check for temporary values
  //generic enemies are those who represent a character, yet none of their stats are linked
  if(graphic != undefined
  && graphic.get('bar1_link') == ''
  && graphic.get('bar2_link') == ''
  && graphic.get('bar3_link') == ''){
    var localAttributes = new LocalAttributes(graphic);
    for(var attr in localAttributes.Attributes){
      this.Attributes[attr] = Number(localAttributes.Attributes[attr]);
    }
  }
}
