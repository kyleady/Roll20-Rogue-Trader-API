//saves every attribute the character has
INQCharacterParser.prototype.parseAttributes = function(graphic){
  //start with the character sheet attributes
  var attributes = findObjs({
    _type: "attribute",
    characterid: this.ObjID
  });
  for(var i = 0; i < attributes.length; i++){
    this.Attributes[attributes[i].get("name")] = Number(attributes[i].get("current"));
  }
  //when working with a generic enemy's current stats, we need to check for temporary values
  //generic enemies are those who represent a character, yet none of their stats are linked
  if(graphic != undefined
  && graphic.get("bar1_link") == ""
  && graphic.get("bar2_link") == ""
  && graphic.get("bar3_link") == ""){
    var localAttributes = new LocalAttributes(graphic);
    for(var attr in localAttributes.Attributes){
      this.Attributes[attr] = Number(localAttributes.Attributes[attr]);
    }
  }
}
