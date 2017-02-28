//the prototype for characters
function INQVehicle(){
  //object details
  this.controlledby = "";
  this.ObjType = "character";

  //default character bio details
  this.Type = "Ground Vehicle"
  this.TacticalSpeed = 0;
  this.CruisingSpeed = 0;
  this.Size = "Massive";
  this.Crew = "Driver";
  this.CarryingCapacity = "-";
  this.Renown = "-";

  //default character skills and items
  this.List = {};
  this.List.Weapons = [];

  //any rules that aren't listed elsewhere
  this.SpecialRules  = [];

  //default character sheet attributes
  this.Attributes = {};

  this.Attributes["Structural Integrity"] = 1;
  this.Attributes["Unnatural Structural Integrity"] = 0;

  this.Attributes.Armour_F = 0;
  this.Attributes.Armour_S = 0;
  this.Attributes.Armour_R = 0;

  this.Attributes.Manoeuvrability = 0;

  //return the attribute bonus Stat/10 + Unnatural Stat
  this.bonus = function(stat){
    var bonus = 0;
    //get the bonus from the stat
    if(this.Attributes[stat]){
      bonus += Math.floor(this.Attributes[stat]/10);
    }
    //add in the unnatural bonus
    if(this.Attributes["Unnatural " + stat]){
      bonus += this.Attributes["Unnatural " + stat];
    }
    return bonus;
  }

  //create a character object from the prototype
  this.toCharacterObj = function(isPlayer){
    //create the gmnotes of the character
    var gmnotes = "";

    //write down the vehicle details
    gmnotes += "<strong>Type</strong>: ";
    gmnotes += this.Type;
    gmnotes += "<br>";

    gmnotes += "<strong>Tactical Speed</strong>: ";
    gmnotes += this.TacticalSpeed.toString() + " m";
    gmnotes += "<br>";

    gmnotes += "<strong>Cruising Speed</strong>: ";
    gmnotes += this.CruisingSpeed.toString() + " kph";
    gmnotes += "<br>";

    gmnotes += "<strong>";
    gmnotes += GetLink("Size")
    gmnotes += "</strong>: ";
    gmnotes += this.Size;
    gmnotes += "<br>";

    gmnotes += "<strong>Crew</strong>: ";
    gmnotes += this.Crew;
    gmnotes += "<br>";

    gmnotes += "<strong>Carrying Capacity</strong>: ";
    gmnotes += this.CarryingCapacity;
    gmnotes += "<br>";

    gmnotes += "<strong>Renown</strong>: ";
    gmnotes += this.Renown;
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
        characterid: this.ObjID,
        current: this.Attributes[name],
        max: this.Attributes[name]
      });
    }

    //create all of the character's abilities
    _.each(this.List.Weapons, function(weapon){
      createObj("ability", {
        name: weapon.Name,
        characterid: this.ObjID,
        istokenaction: true,
        action: weapon.toAbility()
      });
    });

    //note who controlls the character
    character.set("controlledby", this.controlledby);

    //return the resultant character object
    return character;
  }
}
