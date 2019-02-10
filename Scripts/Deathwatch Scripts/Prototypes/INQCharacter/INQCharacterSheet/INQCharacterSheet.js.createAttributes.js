INQCharacterSheet.prototype.createAttributes = function() {
  for(var name in this.Attributes){
    attributeValue(name, {
      setTo: this.Attributes[name],
      characterid: this.characterid,
      alert: false,
      CHARACTER_SHEET: this.options.CHARACTER_SHEET
    });
  }
}
