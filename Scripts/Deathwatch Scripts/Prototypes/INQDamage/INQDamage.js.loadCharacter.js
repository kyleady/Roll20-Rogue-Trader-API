INQDamage.prototype.loadCharacter = function(character, graphic, character_callback) {
  if(!character) return character_callback();
  this.targetType = characterType(character.id);
  switch(this.targetType) {
    case 'character':
      this.inqcharacter = new INQCharacter(character, graphic, character_callback);
    break;
    case 'vehicle':
      this.inqcharacter = new INQVehicle(character, graphic, character_callback);
    break;
    case 'starship':
      this.inqcharacter = new INQStarship(character, graphic, character_callback);
    break;
  }
}
