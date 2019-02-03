INQCharacterSheet.prototype.parseMovement = function() {
  const options = { graphicid: this.graphicid, characterid: this.characterid };
  for(let moveType in this.Movement) {
    this.Movement[moveType] = attributeValue(`${moveType}Move`, options);
  }
}
