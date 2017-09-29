//the prototype for characters
function INQVehicle(vehicle, graphic, callback){
  //object details
  this.controlledby = "";
  this.ObjType = "character";

  //default character bio details
  this.Bio = {};
  this.Bio.Type = "Ground Vehicle";
  this.Bio["Tactical Speed"] = "0 m";
  this.Bio["Cruising Speed"] = "0 kph";
  this.Bio.Size = "Massive";
  this.Bio.Crew = "Driver";
  this.Bio["Carry Capacity"] = "-";
  this.Bio.Renown = "-";

  //default character skills and items
  this.List = {};
  this.List.Weapons = [];
  this.List["Vehicle Traits"] = [];

  //any rules that aren't listed elsewhere
  this.SpecialRules  = [];

  //default character sheet attributes
  this.Attributes = {};

  this.Attributes["Structural Integrity"] = 1;
  this.Attributes["Unnatural Structural Integrity"] = 0;
  this.Attributes["Tactical Speed"] = 0;
  this.Attributes["Aerial Speed"] = 0;

  this.Attributes.Armour_F = 0;
  this.Attributes.Armour_S = 0;
  this.Attributes.Armour_R = 0;

  this.Attributes.Manoeuvrability = 0;

  //check if the character has an inqlink with the given name
  //and within the given list
  //if there are no subgroups for the inqlink, just return {Bonus}
  //if there are, return the inqlink's subgroups with a bonus for each
  //if nothing was found, return undefined
  this.has = function(ability, list){
    var info = undefined;
    if(list == undefined){
      list = "Vehicle Traits";
    }
    _.each(this.List[list], function(rule){
      if(rule.Name == ability){
        //if we have not found the rule yet
        if(info == undefined){
          //does the found skill have subgroups?
          if(rule.Groups.length > 0){
            //the inklink has subgroups and each will need their own bonus
            info = [];
            _.each(rule.Groups, function(subgroup){
              info.push({
                Name:  subgroup,
                Bonus: rule.Bonus
              });
            });
          } else {
            //the inqlink does not have subgroups
            info = {
              Bonus: rule.Bonus
            };
          }
        //if the rule already has been found
        //AND the rule has subgroups
        //AND the previously found rule had subgroups
        } else if(rule.Groups.length > 0 && info.length > 0){
          //add the new found subgroups in with their own bonuses
          _.each(rule.Groups, function(){
            info.push({
              Name:  subgroup,
              Bonus: rule.Bonus
            });
          });
        }
      }
    });
    return info;
  }

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
  this.getCharacterBio = function(){
    //create the gmnotes of the character
    var gmnotes = "";

    //write down the vehicle details
    for(var k in this.Bio){
      gmnotes += "<strong>" + k + "</strong>: ";
      gmnotes += this.Bio[k] + "<br>";
    }

    //display every list
    for(var list in this.List){
      //starting with the name of the list
      gmnotes += "<br>";
      gmnotes += "<u><strong>" + list + "</strong></u>";
      gmnotes += "<br>";
      //make a note for each item in the list
      _.each(this.List[list], function(item){
        gmnotes += item + "<br>";
      });
    }

    //tack on any Special Rules
    _.each(this.SpecialRules, function(rule){
      gmnotes += "<br>";
      gmnotes += "<strong>" + rule.Name + "</strong>: ";
      gmnotes += rule.Rule;
      gmnotes += "<br>";
    });

    return gmnotes;
  }

  //create a character object from the prototype
  this.toCharacterObj = function(isPlayer, characterid){
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

  //allow the user to immediately parse a character in the constructor
  var inqcharacter = this;
  var myPromise = new Promise(function(resolve){
    if(character != undefined){
      if(typeof character == "string"){
        Object.setPrototypeOf(inqcharacter, new INQVehicleImportParser());
        inqcharacter.parse(character);
        resolve(inqcharacter);
      } else {
        Object.setPrototypeOf(inqcharacter, new INQVehicleParser());
        inqcharacter.parse(character, graphic, function(){
          resolve(inqcharacter);
        });
      }
    } else {
      resolve(inqcharacter);
    }
  });

  myPromise.then(function(inqcharacter){
    if(character != undefined){
      Object.setPrototypeOf(inqcharacter, new INQVehicle());
    }

    if(typeof callback == 'function'){
      callback(inqcharacter);
    }
  });
}
