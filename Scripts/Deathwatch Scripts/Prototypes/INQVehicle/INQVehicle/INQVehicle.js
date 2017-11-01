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

  //allow the user to immediately parse a character in the constructor
  var inqvehicle = this;
  var myPromise = new Promise(function(resolve){
    if(vehicle != undefined){
      if(typeof vehicle == "string"){
        Object.setPrototypeOf(inqvehicle, new INQVehicleImportParser());
        inqvehicle.parse(vehicle);
        resolve(inqvehicle);
      } else {
        Object.setPrototypeOf(inqvehicle, new INQVehicleParser());
        inqvehicle.parse(vehicle, graphic, function(){
          resolve(inqvehicle);
        });
      }
    } else {
      resolve(inqvehicle);
    }
  });

  myPromise.catch(function(e){log(e)});
  myPromise.then(function(inqvehicle){
    if(typeof vehicle != 'undefined'){
      Object.setPrototypeOf(inqvehicle, new INQVehicle());
    }

    if(typeof callback == 'function'){
      callback(inqvehicle);
    }
  });
}

INQVehicle.prototype = new INQCharacter();
INQVehicle.prototype.constructor = INQVehicle;
