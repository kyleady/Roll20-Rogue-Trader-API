INQCharacterSheet.prototype.toCharacterObj = function(isPlayer, characterid) {
  //get the character
  var character = undefined;
  if(characterid) character = getObj('character', characterid);
  if(!character) character = createObj('character', {});
  this.characterid = character.id;
  this.removeChildren(character.id);

  this.ObjID = character.id;
  character.set('name', this.Name);
  character.set('controlledby', this.controlledby);

  this.createAttributes();
  this.createMovement();
  this.createRepeating();

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
