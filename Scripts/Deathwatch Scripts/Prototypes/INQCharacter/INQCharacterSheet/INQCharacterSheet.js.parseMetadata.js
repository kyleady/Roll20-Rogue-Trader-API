INQCharacterSheet.prototype.parseMetadata = function(character, graphic) {
  let name = character.get('name');
  if(graphic) {
    name = graphic.get('name');
    this.GraphicID = graphic.id;
  }
  this.Name = name;
  this.ObjID = character.id;
  this.ObjType = character.get("_type");
  this.controlledby = character.get("controlledby");
}
