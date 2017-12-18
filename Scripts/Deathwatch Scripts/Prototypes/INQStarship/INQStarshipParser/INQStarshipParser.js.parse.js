INQStarshipParser.prototype.parse = function(character, graphic, callback){
  this.Name = character.get('name');
  this.ObjID = character.id;
  this.ObjType = character.get('_type');

  if(graphic) this.GraphicID = graphic.id;

  this.controlledby = character.get('controlledby');

  this.parseAttributes(graphic);
  if(typeof callback == 'function') callback(this);
}
