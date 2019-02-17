INQDamage.prototype.loadCharacter = function(character, graphic, character_callback) {
  if(!character) return character_callback();
  this.targetType = characterType(character.id);
  const inqdamage = this;
  switch(this.targetType) {
    case 'character':
      new INQCharacter(character, graphic, (inqcharacter) => {
        inqdamage.inqcharacter = inqcharacter;
        character_callback(inqcharacter);
      });
    break;
    case 'vehicle':
      new INQVehicle(character, graphic, (inqcharacter) => {
        inqdamage.inqcharacter = inqcharacter;
        character_callback(inqcharacter);
      });
    break;
    case 'starship':
      new INQStarship(character, graphic, (inqcharacter) => {
        inqdamage.inqcharacter = inqcharacter;
        character_callback(inqcharacter);
      });
    break;
  }
}
