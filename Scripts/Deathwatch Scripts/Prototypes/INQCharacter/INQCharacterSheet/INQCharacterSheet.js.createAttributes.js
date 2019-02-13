INQCharacterSheet.prototype.createAttributes = function() {
  const example_character = new INQCharacter();
  for(var name in example_character.Attributes){
    attributeValue(name, {
      setTo: this.Attributes[name],
      characterid: this.characterid,
      alert: false,
      CHARACTER_SHEET: this.options.CHARACTER_SHEET
    });
  }
}
