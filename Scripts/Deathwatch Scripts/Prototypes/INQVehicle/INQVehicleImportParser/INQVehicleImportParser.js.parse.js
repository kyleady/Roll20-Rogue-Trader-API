INQVehicleImportParser.prototype.parse = function(text){
  var parser = new INQImportParser(this);
  parser.getContent(/^\s*type\s*$/i, ["Bio", "Type"]);
  parser.getContent(/^\s*tactical\s+speed\s*$/i, ["Bio", "Tactical Speed"]);
  parser.getContent(/^\s*cruising\s+speed\s*$/i, ["Bio", "Cruising Speed"]);
  parser.getContent(/^\s*size\s*$/i, ["Bio", "Size"]);
  parser.getContent(/^\s*crew\s*$/i, ["Bio", "Crew"]);
  parser.getNumber(/^\s*manoeuvrability\s*$/i, ["Attributes", "Manoeuvrability"]);
  parser.getNumber(/^\s*structural\s+integrity\s*$/i, ["Attributes", "Structural Integrity"]);
  parser.getContent(/^\s*carry(ing)?\s+capacity\s*$/i, ["Bio", "Carry Capacity"]);
  parser.getContent(/^\s*renown\s*$/i, ["Bio", "Renown"]);
  parser.getContent(/^\s*availability\s*$/i, ["Bio", "Availability"]);
  parser.getList(/^\s*vehicle\s+traits\s*$/i, ["List", "Vehicle Traits"]);
  parser.getWeapons(/^\s*weapons\s*$/i, ["List", "Weapons"]);
  parser.getArmour(/^\s*armour\s*$/i, ["Attributes", {
    Armour_F: /\s*front\s*/i,
    Armour_S: /\s*side\s*/i,
    Armour_R: /\s*rear\s*/i
  }]);
  parser.parse(text);

  this.getSpeeds();
}
