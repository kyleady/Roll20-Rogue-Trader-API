function INQCharacterSheet() {
  this.characterid = undefined;
  this.graphicid = undefined;
}

INQCharacterSheet.prototype = Object.create(INQCharacter.prototype);
INQCharacterSheet.prototype.constructor = INQCharacterSheet;
