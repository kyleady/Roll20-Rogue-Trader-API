INQStarshipParser.prototype.parseAttributes = function(graphic){
  var attributes = findObjs({
    _type: 'attribute',
    _characterid: this.ObjID
  });
  for(var attr of attributes){
    var value = attr.get('name') == 'Hull' ? 'max' : 'current';
    this.Attributes[attr.get('name')] = Number(attr.get(value));
  }

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
