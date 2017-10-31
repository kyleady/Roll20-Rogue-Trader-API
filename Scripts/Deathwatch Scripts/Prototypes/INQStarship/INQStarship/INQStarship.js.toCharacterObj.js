//create a character object from the prototype
INQStarship.prototype.toCharacterObj = function(isPlayer){
  //create the character
  var character = createObj("character", {
    name: this.Name
  });

  //save the object ID
  this.ObjID = character.id;

  //write the character's notes down
  if(isPlayer || this.controlledby){
    character.set("bio", this.getCharacterBio());
  } else {
    character.set("gmnotes", this.getCharacterBio());
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
  _.each(this.List["Weapon Components"], function(weapon){
    createObj("ability", {
      name: weapon.Name,
      _characterid: this.ObjID,
      istokenaction: true,
      action: weapon.toAbility()
    });
  });

  //note who controlls the character
  character.set("controlledby", this.controlledby);

  //return the resultant character object
  return character;
}
