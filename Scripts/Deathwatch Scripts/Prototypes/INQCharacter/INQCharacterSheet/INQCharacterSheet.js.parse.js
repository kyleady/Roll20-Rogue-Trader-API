INQCharacterSheet.prototype.parse = function(character, graphic) {
  this.characterid = character.id;
  this.graphicid = graphic.id;
  this.parseMetadata(character, graphic);
  this.parseAttributes();
  this.parseRepeating();
  this.parseMovement();
  delete this.characterid;
  delete this.graphicid;
}
