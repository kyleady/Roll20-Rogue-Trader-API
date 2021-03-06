//create a character object from the prototype
INQCharacter.prototype.toCharacterObj = function(isPlayer, characterid){
  if(this.options.CHARACTER_SHEET == 'DH2e') {
    const inqcharacter = this;
    Object.setPrototypeOf(inqcharacter, new INQCharacterSheet());
    return this.toCharacterObj(isPlayer, characterid);
  }
  //get the character
  var character = undefined;
  if(characterid) character = getObj("character", characterid);
  if(!character) character = createObj("character", {});
  this.removeChildren(character.id);

  this.ObjID = character.id;
  character.set('name', this.Name);
  character.set('controlledby', this.controlledby);
  var notes = this.getCharacterBio();
  var workingWith = (isPlayer || this.controlledby) ? 'bio' : 'gmnotes';
  character.set(workingWith, notes);
  for(var name in this.Attributes){
    createObj('attribute', {
      name: name,
      _characterid: this.ObjID,
      current: this.Attributes[name],
      max: this.Attributes[name]
    });
  }

  const wounds_bonus = Math.floor(this.Attributes.Wounds / 10);
  const critical = wounds_bonus > 0 ? wounds_bonus * 9 : 9;
  createObj('attribute', {
    name: 'Critical',
    _characterid: this.ObjID,
    current: critical,
    max: critical
  });

  var customWeapon = {custom: true};
  for(var list in this.List){
    for(var item of this.List[list]){
      if(item.toAbility){
        createObj("ability", {
          name: item.Name,
          _characterid: this.ObjID,
          istokenaction: true,
          action: item.toAbility(this, customWeapon)
        });
      }
    }
  }

  return character;
}
