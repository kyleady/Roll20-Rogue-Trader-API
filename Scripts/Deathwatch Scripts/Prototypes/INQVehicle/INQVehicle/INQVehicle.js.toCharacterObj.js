//create a character object from the prototype
INQVehicle.prototype.toCharacterObj = function(isPlayer, characterid){
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
  //write the character's notes down
  var gmnotes = this.getCharacterBio();
  if(isPlayer){
    character.set("bio", gmnotes);
  } else {
    character.set("gmnotes", gmnotes);
  }

  //create all of the character's attributes
  for(var name in this.Attributes){
    createObj("attribute",{
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
      action: this.List.Weapons[i].toAbility(undefined, undefined, customWeapon)
    });
  }

  //note who controlls the character
  character.set("controlledby", this.controlledby);

  //return the resultant character object
  return character;
}
