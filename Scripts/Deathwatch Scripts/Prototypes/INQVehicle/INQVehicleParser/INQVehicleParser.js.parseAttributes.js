//saves every attribute the character has
INQVehicleParser.prototype.parseAttributes = function(graphic){
  //start with the character sheet attributes
  var attributes = findObjs({
    _type: 'attribute',
    _characterid: this.ObjID
  });
  for(var attr of attributes){
    this.Attributes[attr.get('name')] = Number(attr.get('current'));
  }
  //when working with a generic enemy's current stats, we need to check for temporary values
  //generic enemies are those who represent a character, yet none of their stats are linked
  if(graphic != undefined
  && graphic.get('bar1_link') == ''
  && graphic.get('bar2_link') == ''
  && graphic.get('bar3_link') == ''){
    //roll20 stores token gmnotes in URI component
    var localAttributes = new LocalAttributes(graphic);
    for(var k in localAttributes.Attributes){
      this.Attributes[k] = Number(localAttributes.Attributes[k]);
    }
  }
}
