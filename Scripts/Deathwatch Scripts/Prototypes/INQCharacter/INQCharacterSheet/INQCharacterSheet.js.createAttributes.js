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

  const wounds_bonus = Math.floor(this.Attributes.Wounds / 10);
  const critical = wounds_bonus > 0 ? wounds_bonus * 9 : 9;
  attributeValue('Critical', {
    setTo: critical,
    characterid: this.characterid,
    alert: false,
    CHARACTER_SHEET: this.options.CHARACTER_SHEET
  });
}
