//the prototype for characters
function INQCharacter(){
  //default character movement
  this.Movement = {};

  this.Movement.Half = 0;
  this.Movement.Full = 0;
  this.Movement.Charge = 0;
  this.Movement.Run = 0;

  //default character skills and items
  this.List = {};
  this.List["Psychic Powers"] = [];
  this.List.Weapons           = [];
  this.List.Gear              = [];
  this.List.Talents           = [];
  this.List.Traits            = [];
  this.List.Skills            = [];

  //any rules that aren't listed elsewhere
  this.SpecialRules  = [];

  //default character sheet attributes
  this.Attributes = {};

  this.Attributes.WS = 0;
  this.Attributes.BS = 0;
  this.Attributes.S =  0;
  this.Attributes.T = 0;
  this.Attributes.Ag = 0;
  this.Attributes.Wp = 0;
  this.Attributes.It = 0;
  this.Attributes.Per = 0;
  this.Attributes.Fe = 0;

  this.Attributes["Unnatural WS"] = 0;
  this.Attributes["Unnatural BS"] = 0;
  this.Attributes["Unnatural S"] =  0;
  this.Attributes["Unnatural T"] = 0;
  this.Attributes["Unnatural Ag"] = 0;
  this.Attributes["Unnatural Wp"] = 0;
  this.Attributes["Unnatural It"] = 0;
  this.Attributes["Unnatural Per"] = 0;
  this.Attributes["Unnatural Fe"] = 0;

  this.Attributes.Wounds = 1;
  this.Attributes["Unnatural Wounds"] = 0;
  this.Attributes.Armour_H = 0;
  this.Attributes.Armour_RA = 0;
  this.Attributes.Armour_LA = 0;
  this.Attributes.Armour_B  = 0;
  this.Attributes.Armour_RL = 0;
  this.Attributes.Armour_LL = 0;

  this.Attributes.PR = 0;

  this.Attributes.Fate = 0;
  this.Attributes.Corruption = 0;
  this.Attributes.Insanity = 0;
  this.Attributes.Renown = 0;

  //create a character object from the prototype
  this.toCharacterObj = function(isPlayer){
    //create the gmnotes of the character
    var gmnotes = "";

    //Movement
    //present movement in the form of a table
    gmnotes += "<table>";
    gmnotes += "<tr>"
    for(var move in this.Movement){
      gmnotes += "<th><em>" + move + "</em></th>";
    }
    gmnotes += "</tr>"
    gmnotes += "<tr>"
    for(var move in this.Movement){
      gmnotes += "<th>" + this.Movement[move] + "</th>";
    }
    gmnotes += "</tr>"

    //display every list
    for(var list in this.List){
      //starting with the name of the list
      gmnotes += "<br>";
      gmnotes += "<u><em>" + list + "</em></u>";
      gmnotes += "<br>";
      //make a note for each item in the list
      _.each(this.List[list], function(item){
        gmnotes += item.toNote() + "<br>";
      });
    }

    //tack on any Special Rules
    _.each(this.SpecialRules, function(rule){
      gmnotes += "<br>";
      gmnotes += "<em>" + rule.Name + "</em>: ";
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

    //return the resultant character object
    return character;
  }
}
