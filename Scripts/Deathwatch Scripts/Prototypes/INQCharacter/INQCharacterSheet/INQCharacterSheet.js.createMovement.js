INQCharacterSheet.prototype.createMovement = function() {
  for(let moveType in this.Movement) {
    attributeValue(`${moveType}Move`, {
      setTo: this.Movement[moveType],
      characterid: this.characterid,
      alert: false,
      CHARACTER_SHEET: this.options.CHARACTER_SHEET
    });
  }
}
