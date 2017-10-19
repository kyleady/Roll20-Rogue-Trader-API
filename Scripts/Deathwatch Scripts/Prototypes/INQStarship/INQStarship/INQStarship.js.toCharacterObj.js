//create a character object from the prototype
INQStarship.prototype.toCharacterObj = function(isPlayer){
  //create the gmnotes of the character
  var gmnotes = "";

  //write down the vehicle details
  for(var k in this.Details){
    gmnotes += "<i>" + k + ": " + this.Details[k] + "</i><br>";
  }

  gmnotes += "<br>";

  gmnotes += "<strong>Speed</strong>: ";
  gmnotes += this.Speed;
  gmnotes += "<br>";

  gmnotes += "<strong>Weapon Capacity</strong>: ";
  gmnotes += this.WeaponCapacity;
  gmnotes += "<br>";

  //display every list
  for(var list in this.List){
    //starting with the name of the list
    gmnotes += "<br>";
    gmnotes += "<u><strong>" + list + "</strong></u>";
    gmnotes += "<br>";
    //make a note for each item in the list
    _.each(this.List[list], function(item){
      gmnotes += item.toNote() + "<br>";
    });
  }

  //tack on any Special Rules
  _.each(this.SpecialRules, function(rule){
    gmnotes += "<br>";
    gmnotes += "<strong>" + rule.Name + "</strong>: ";
    gmnotes += rule.Rule;
    gmnotes += "<br>";
  });

  //create the character
  var character = createObj("character", {
    name: this.Name
  });

  //save the object ID
  this.ObjID = character.id;

  //write the character's notes down
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
