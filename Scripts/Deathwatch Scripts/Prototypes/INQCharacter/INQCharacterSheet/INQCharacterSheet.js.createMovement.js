INQCharacterSheet.prototype.createMovement = function() {
  for(let moveType in this.Movement) {
    attributeValue(`${moveType}Move`, {
      setTo: this.Movement[moveType],
      characterid: this.characterid,
      alert: false
    });
  }
}
