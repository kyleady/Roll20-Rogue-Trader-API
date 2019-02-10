INQCharacterSheet.prototype.parseMovement = function() {
  const options = {
    graphicid: this.graphicid,
    characterid: this.characterid,
    CHARACTER_SHEET: this.options.CHARACTER_SHEET
  };
  for(let moveType in this.Movement) {
    this.Movement[moveType] = attributeValue(`${moveType}Move`, options);
  }
}
