INQCharacterSheet.prototype.parse = function(character, graphic) {
  if(character) this.characterid = character.id;
  if(graphic) this.graphicid = graphic.id;
  this.parseMetadata(character, graphic);
  this.parseAttributes();
  this.parseRepeating();
  this.parseMovement();
  delete this.characterid;
  delete this.graphicid;
}
