//create a character object from the prototype
INQCharacter.prototype.toCharacterObj = function(isPlayer, characterid){
  //get the character
  var character = undefined;
  if(characterid){
    character = getObj("character", characterid);
  }
  if(character == undefined){
    //create the character
    var character = createObj("character", {});
  }
  var oldAttributes = findObjs({
    _characterid: character.id,
    _type: "attribute"
  });
  _.each(oldAttributes, function(attr){
    attr.remove();
  });
  var oldAbilities = findObjs({
    _characterid: character.id,
    _type: "ability"
  });
  _.each(oldAbilities, function(ability){
    ability.remove();
  });
  //save the character name
  character.set("name", this.Name);


  //save the object ID
  this.ObjID = character.id;
  //create all of the character's attributes
  for(var name in this.Attributes){
    createObj('attribute', {
      name: name,
      _characterid: this.ObjID,
      current: this.Attributes[name],
      max: this.Attributes[name]
    });
  }

  //create all of the character's abilities
  var customWeapon = {custom: true};
  for(var i = 0; i < this.List.Weapons.length; i++){
    createObj("ability", {
      name: this.List.Weapons[i].Name,
      _characterid: this.ObjID,
      istokenaction: true,
      action: this.List.Weapons[i].toAbility(this, undefined, customWeapon)
    });
  }

  //note who controlls the character
  character.set("controlledby", this.controlledby);

  //write the character's notes down
  var gmnotes = this.getCharacterBio();
  var workingWith = (isPlayer) ? 'bio' : 'gmnotes';
  character.set(workingWith, gmnotes);
  //return the resultant character object
  return character;
}
