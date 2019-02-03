INQCharacterSheet.prototype.parse = function(character, graphic) {
  this.characterid = character.id;
  this.graphicid = graphic.id;
  this.parseAttributes();
  this.parseRepeating();
}
