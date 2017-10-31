//the prototype for characters
function INQStarship(){
  //object details
  this.controlledby = "";
  this.ObjType = "character";

  //default character bio details
  this.Details = {};
  this.Details.Hull =       "Raider";
  this.Details.Class =      "?";
  this.Details.Dimentions = "?";
  this.Details.Mass =       "?";
  this.Details.Crew =       "?";
  this.Details.Accel =      "?";

  this.Speed = 0;
  this.WeaponCapacity = "";

  //default character skills and items
  this.List = {};
  this.List["Essential Components"] = [];
  this.List["Supplemental Components"] = [];
  this.List["Weapon Components"] = [];

  //any rules that aren't listed elsewhere
  this.SpecialRules  = [];

  //default character sheet attributes
  this.Attributes = {};

  this.Attributes.Population = 100;
  this.Attributes.Moral = 100;
  this.Attributes.Hull = 1;
  this.Attributes.VoidShields = 0;

  this.Attributes.Armour_F = 0;
  this.Attributes.Armour_P = 0;
  this.Attributes.Armour_S = 0;
  this.Attributes.Armour_A = 0;

  this.Attributes.Turret = 1;
  this.Attributes.Crew = 10;
  this.Attributes.Manoeuvrability = 0;
  this.Attributes.Detection = 0;
}

INQStarship.prototype = new INQObject();
INQStarship.prototype.constructor = INQStarship;
